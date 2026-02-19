import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { UpdateBlogPostInput } from "@/lib/types/blog";

/**
 * GET /api/blog/[id]
 * Obtiene un artículo específico con tags (solo admin)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación y rol admin
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 2. Obtener post con autor
    const { data: post, error: postError } = await supabaseAdmin
      .from("blog_posts")
      .select(`
        *,
        author:users!blog_posts_author_id_fkey(id, name, email)
      `)
      .eq("id", id)
      .single();

    if (postError || !post) {
      console.error("Error fetching blog post:", postError);
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    // 3. Obtener tags del post
    const { data: tags } = await supabaseAdmin
      .from("blog_post_tags")
      .select("*")
      .eq("post_id", id)
      .order("tag", { ascending: true });

    // 4. Formatear respuesta
    const response = {
      ...post,
      author_name: post.author?.name,
      author: undefined,
      tags: tags?.map((t) => t.tag) || [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/blog/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/blog/[id]
 * Actualiza parcialmente un artículo (solo admin)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación y rol admin
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body: UpdateBlogPostInput = await request.json();

    // 2. Verificar que el post existe
    const { data: existingPost } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingPost) {
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    // 3. Construir objeto de actualización
    const updateData: Record<string, any> = {};

    // Lista de campos permitidos
    const allowedFields = [
      "title",
      "excerpt",
      "content",
      "featured_image",
      "category",
      "status",
      "featured",
      "meta_title",
      "meta_description",
      "keywords",
    ];

    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field as keyof UpdateBlogPostInput];
      }
    }

    // Validar que hay algo que actualizar
    if (Object.keys(updateData).length === 0 && !body.tags) {
      return NextResponse.json(
        { error: "No hay campos para actualizar" },
        { status: 400 }
      );
    }

    // Validar categoría si se está actualizando
    if (updateData.category) {
      const validCategories = ['Derecho Penal', 'Derecho Laboral', 'Derecho Corporativo', 'Investigación'];
      if (!validCategories.includes(updateData.category)) {
        return NextResponse.json(
          { error: "Categoría inválida" },
          { status: 400 }
        );
      }
    }

    // Validar status si se está actualizando
    if (updateData.status) {
      const validStatuses = ['draft', 'published', 'archived'];
      if (!validStatuses.includes(updateData.status)) {
        return NextResponse.json(
          { error: "Estado inválido" },
          { status: 400 }
        );
      }
    }

    // 4. Si se actualiza el título, generar nuevo slug
    if (updateData.title) {
      const { data: newSlug, error: slugError } = await supabaseAdmin
        .rpc("generate_slug", { title: updateData.title });

      if (slugError || !newSlug) {
        console.error("Error generating slug:", slugError);
        return NextResponse.json(
          { error: "Error al generar slug" },
          { status: 500 }
        );
      }

      updateData.slug = newSlug;
    }

    // 5. Actualizar post
    let updatedPost = null;

    if (Object.keys(updateData).length > 0) {
      // El trigger auto_set_published_at se encargará de published_at
      // El trigger update_updated_at se encargará de updated_at
      // El trigger auto_calculate_reading_time se encargará de reading_time

      const { data, error: updateError } = await supabaseAdmin
        .from("blog_posts")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating blog post:", updateError);
        return NextResponse.json(
          { error: "Error al actualizar artículo" },
          { status: 500 }
        );
      }

      updatedPost = data;
    }

    // 6. Actualizar tags si se proporcionan
    if (body.tags !== undefined) {
      // Eliminar tags existentes
      await supabaseAdmin
        .from("blog_post_tags")
        .delete()
        .eq("post_id", id);

      // Insertar nuevos tags
      if (body.tags.length > 0) {
        const tagsToInsert = body.tags.map((tag) => ({
          post_id: id,
          tag: tag.trim().toLowerCase(),
        }));

        const { error: tagsError } = await supabaseAdmin
          .from("blog_post_tags")
          .insert(tagsToInsert);

        if (tagsError) {
          console.error("Error updating tags:", tagsError);
          // No fallar el request por error en tags
        }
      }
    }

    // 7. Obtener post actualizado con relaciones
    const { data: finalPost } = await supabaseAdmin
      .from("blog_posts")
      .select(`
        *,
        author:users!blog_posts_author_id_fkey(name, email)
      `)
      .eq("id", id)
      .single();

    const { data: tags } = await supabaseAdmin
      .from("blog_post_tags")
      .select("*")
      .eq("post_id", id);

    const response = {
      ...finalPost,
      author_name: finalPost.author?.name,
      author: undefined,
      tags: tags?.map((t) => t.tag) || [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in PATCH /api/blog/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blog/[id]
 * Elimina un artículo y sus tags (solo admin)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Verificar autenticación y rol admin
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // 2. Verificar que el post existe
    const { data: existingPost } = await supabaseAdmin
      .from("blog_posts")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingPost) {
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    // 3. Eliminar post (los tags se eliminan automáticamente por CASCADE)
    const { error: deleteError } = await supabaseAdmin
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting blog post:", deleteError);
      return NextResponse.json(
        { error: "Error al eliminar artículo" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Artículo eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error in DELETE /api/blog/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
