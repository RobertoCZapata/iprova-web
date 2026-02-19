import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/blog/debug
 * Endpoint temporal de diagnóstico para ver todos los posts sin filtro
 */
export async function GET() {
  try {
    // Obtener TODOS los posts sin filtrar por status
    const { data: allPosts, error } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, status, created_at, published_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Contar por status
    const statusCounts = {
      draft: allPosts?.filter((p) => p.status === "draft").length || 0,
      published: allPosts?.filter((p) => p.status === "published").length || 0,
      archived: allPosts?.filter((p) => p.status === "archived").length || 0,
    };

    return NextResponse.json({
      total: allPosts?.length || 0,
      statusCounts,
      posts: allPosts || [],
    });
  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
