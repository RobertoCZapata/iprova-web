import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/blog/public
 * Lista artículos publicados (acceso público)
 * Query params: category, tag, featured, limit, offset
 */
export async function GET(request: Request) {
  try {
    // 1. Extraer parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // 2. Construir query base - SOLO posts publicados
    let query = supabaseAdmin
      .from("blog_posts")
      .select(`
        id,
        title,
        slug,
        excerpt,
        featured_image,
        category,
        reading_time,
        views,
        published_at,
        featured,
        author:users!blog_posts_author_id_fkey(name)
      `)
      .eq("status", "published")
      .order("published_at", { ascending: false });

    // 3. Aplicar filtros
    if (category) {
      query = query.eq("category", category);
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    // Filtro por tag (requiere join con blog_post_tags)
    if (tag) {
      const { data: postsWithTag } = await supabaseAdmin
        .from("blog_post_tags")
        .select("post_id")
        .eq("tag", tag.toLowerCase());

      if (postsWithTag && postsWithTag.length > 0) {
        const postIds = postsWithTag.map((t) => t.post_id);
        query = query.in("id", postIds);
      } else {
        // No hay posts con ese tag, retornar vacío
        return NextResponse.json([]);
      }
    }

    // Paginación
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        query = query.limit(limitNum);
      }
    }

    if (offset) {
      const offsetNum = parseInt(offset, 10);
      if (!isNaN(offsetNum) && offsetNum >= 0) {
        query = query.range(offsetNum, offsetNum + (limit ? parseInt(limit, 10) - 1 : 11));
      }
    }

    // 4. Ejecutar query
    const { data: posts, error } = await query;

    if (error) {
      console.error("Error fetching public blog posts:", error);
      return NextResponse.json(
        { error: "Error al obtener artículos" },
        { status: 500 }
      );
    }

    // 5. Formatear respuesta
    const formattedPosts = posts?.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featured_image: post.featured_image,
      author_name: post.author?.name || "iPROVA",
      category: post.category,
      reading_time: post.reading_time,
      views: post.views,
      published_at: post.published_at,
      featured: post.featured,
    }));

    return NextResponse.json(formattedPosts || []);
  } catch (error) {
    console.error("Error in GET /api/blog/public:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
