import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/blog/public/[slug]
 * Obtiene un artículo publicado por slug (acceso público)
 * Incrementa el contador de vistas automáticamente
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Validar slug
    if (!slug) {
      return NextResponse.json(
        { error: "Slug requerido" },
        { status: 400 }
      );
    }

    // 2. Obtener post SOLO si está publicado
    const { data: post, error: postError } = await supabaseAdmin
      .from("blog_posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        content,
        featured_image,
        category,
        reading_time,
        views,
        published_at,
        featured,
        meta_title,
        meta_description,
        author:users!blog_posts_author_id_fkey(id, name, email)
      `)
      .eq("slug", slug)
      .eq("status", "published")
      .single();

    if (postError || !post) {
      console.error("Error fetching post by slug:", postError);
      return NextResponse.json(
        { error: "Artículo no encontrado" },
        { status: 404 }
      );
    }

    // 3. Obtener tags del post
    const { data: tags } = await supabaseAdmin
      .from("blog_post_tags")
      .select("tag")
      .eq("post_id", post.id)
      .order("tag", { ascending: true });

    // 4. Incrementar contador de vistas
    // Ejecutamos en paralelo para no retrasar la respuesta
    supabaseAdmin.rpc("increment_post_views", { post_slug: slug }).then(
      ({ error: viewError }) => {
        if (viewError) {
          console.error("Error incrementing views:", viewError);
        }
      }
    );

    // 5. Formatear respuesta pública
    // TypeScript fix: author puede ser inferido como array por Supabase
    const authorData: any = Array.isArray(post.author) ? post.author[0] : post.author;

    const response = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      author_name: authorData?.name || "iPROVA",
      author_email: authorData?.email,
      category: post.category,
      reading_time: post.reading_time,
      views: post.views + 1, // Mostrar el nuevo valor
      published_at: post.published_at,
      featured: post.featured,
      meta_title: post.meta_title,
      meta_description: post.meta_description,
      tags: tags?.map((t) => t.tag) || [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/blog/public/[slug]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
