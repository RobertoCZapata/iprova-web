import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * POST /api/blog/[id]/publish
 * Publica o despublica un artículo (solo admin)
 * Body: { action: 'publish' | 'unpublish' }
 */
export async function POST(
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
    const body = await request.json();

    // 2. Validar action
    if (!body.action || !['publish', 'unpublish'].includes(body.action)) {
      return NextResponse.json(
        { error: "Acción inválida. Debe ser 'publish' o 'unpublish'" },
        { status: 400 }
      );
    }

    // 3. Obtener post actual
    const { data: currentPost, error: fetchError } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !currentPost) {
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    // 4. Si action es 'publish', validar campos requeridos
    if (body.action === "publish") {
      const errors: string[] = [];

      if (!currentPost.title) errors.push("título");
      if (!currentPost.excerpt) errors.push("extracto");
      if (!currentPost.content || currentPost.content.length < 50) {
        errors.push("contenido (mínimo 50 caracteres)");
      }
      if (!currentPost.category) errors.push("categoría");
      if (!currentPost.featured_image) {
        // Advertencia pero no es bloqueante
        console.warn("Publishing post without featured image");
      }
      if (!currentPost.meta_description) {
        // Advertencia pero no es bloqueante
        console.warn("Publishing post without meta description");
      }

      if (errors.length > 0) {
        return NextResponse.json(
          {
            error: "No se puede publicar el artículo",
            missing_fields: errors,
            message: `Faltan los siguientes campos requeridos: ${errors.join(", ")}`,
          },
          { status: 400 }
        );
      }

      // 5a. Publicar: cambiar status a 'published'
      // El trigger set_published_at() se encargará de setear published_at automáticamente
      const { data: publishedPost, error: publishError } = await supabaseAdmin
        .from("blog_posts")
        .update({ status: "published" })
        .eq("id", id)
        .select(`
          *,
          author:users!blog_posts_author_id_fkey(name, email)
        `)
        .single();

      if (publishError) {
        console.error("Error publishing post:", publishError);
        return NextResponse.json(
          { error: "Error al publicar artículo" },
          { status: 500 }
        );
      }

      const response = {
        ...publishedPost,
        author_name: publishedPost.author?.name,
        author: undefined,
        message: "Artículo publicado exitosamente",
      };

      return NextResponse.json(response);
    } else {
      // 5b. Despublicar: cambiar status a 'draft'
      // El trigger set_published_at() se encargará de limpiar published_at automáticamente
      const { data: unpublishedPost, error: unpublishError } =
        await supabaseAdmin
          .from("blog_posts")
          .update({ status: "draft" })
          .eq("id", id)
          .select(`
            *,
            author:users!blog_posts_author_id_fkey(name, email)
          `)
          .single();

      if (unpublishError) {
        console.error("Error unpublishing post:", unpublishError);
        return NextResponse.json(
          { error: "Error al despublicar artículo" },
          { status: 500 }
        );
      }

      const response = {
        ...unpublishedPost,
        author_name: unpublishedPost.author?.name,
        author: undefined,
        message: "Artículo despublicado exitosamente",
      };

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error in POST /api/blog/[id]/publish:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
