import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import type { CreateBlogPostInput, BlogPostDB } from "@/lib/types/blog";

/**
 * GET /api/blog
 * Lista todos los artículos del blog (solo admin)
 * Query params: status, category, author_id, featured, search
 */
export async function GET(request: Request) {
  try {
    // 1. Verificar autenticación y rol admin
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // 2. Extraer parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const authorId = searchParams.get("author_id");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    // 3. Construir query con relaciones
    let query = supabaseAdmin
      .from("blog_posts")
      .select(`
        *,
        author:users!blog_posts_author_id_fkey(id, name, email)
      `)
      .order("created_at", { ascending: false });

    // 4. Aplicar filtros condicionalmente
    if (status) {
      query = query.eq("status", status);
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (authorId) {
      query = query.eq("author_id", authorId);
    }

    if (featured === "true") {
      query = query.eq("featured", true);
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`
      );
    }

    // 5. Ejecutar query
    const { data: posts, error } = await query;

    if (error) {
      console.error("Error fetching blog posts:", error);
      return NextResponse.json(
        { error: "Error al obtener artículos" },
        { status: 500 }
      );
    }

    // 6. Formatear respuesta (flatten nested objects)
    const formattedPosts = posts?.map((post: any) => ({
      ...post,
      author_name: post.author?.name,
      author: undefined, // Remove nested object
    }));

    return NextResponse.json(formattedPosts || []);
  } catch (error) {
    console.error("Error in GET /api/blog:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Crea un nuevo artículo de blog (solo admin)
 */
export async function POST(request: Request) {
  try {
    // 1. Verificar autenticación y rol admin
    const session = await auth();
    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // 2. Parsear y validar body
    const body: CreateBlogPostInput = await request.json();

    // Validar campos requeridos
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: title, excerpt, content, category" },
        { status: 400 }
      );
    }

    // Validar categoría válida
    const validCategories = ['Derecho Penal', 'Derecho Laboral', 'Derecho Corporativo', 'Investigación'];
    if (!validCategories.includes(body.category)) {
      return NextResponse.json(
        { error: "Categoría inválida" },
        { status: 400 }
      );
    }

    // Validar longitud mínima de contenido
    if (body.content.length < 50) {
      return NextResponse.json(
        { error: "El contenido debe tener al menos 50 caracteres" },
        { status: 400 }
      );
    }

    // 3. Generar slug único desde el título
    const { data: slugData, error: slugError } = await supabaseAdmin
      .rpc("generate_slug", { title: body.title });

    if (slugError || !slugData) {
      console.error("Error generating slug:", slugError);
      return NextResponse.json(
        { error: "Error al generar slug" },
        { status: 500 }
      );
    }

    // 4. Validar status si se proporciona
    const validStatuses = ['draft', 'published', 'archived'];
    const status = body.status && validStatuses.includes(body.status)
      ? body.status
      : 'draft'; // Default a draft si no se proporciona

    // 5. Insertar post (reading_time se calcula automáticamente por trigger)
    const { data: newPost, error: insertError } = await supabaseAdmin
      .from("blog_posts")
      .insert({
        title: body.title,
        slug: slugData,
        excerpt: body.excerpt,
        content: body.content,
        featured_image: body.featured_image || null,
        author_id: session.user.id,
        category: body.category,
        status: status,
        featured: body.featured || false,
        meta_title: body.meta_title || null,
        meta_description: body.meta_description || null,
        keywords: body.keywords || null,
      })
      .select(`
        *,
        author:users!blog_posts_author_id_fkey(name, email)
      `)
      .single();

    if (insertError) {
      console.error("Error creating blog post:", insertError);
      return NextResponse.json(
        { error: "Error al crear artículo" },
        { status: 500 }
      );
    }

    // 6. Insertar tags si existen
    if (body.tags && body.tags.length > 0) {
      const tagsToInsert = body.tags.map((tag) => ({
        post_id: newPost.id,
        tag: tag.trim().toLowerCase(),
      }));

      const { error: tagsError } = await supabaseAdmin
        .from("blog_post_tags")
        .insert(tagsToInsert);

      if (tagsError) {
        console.error("Error inserting tags:", tagsError);
        // No fallar el request por error en tags
      }
    }

    // 7. Formatear y retornar con código 201
    const formattedPost = {
      ...newPost,
      author_name: newPost.author?.name,
      author: undefined,
    };

    return NextResponse.json(formattedPost, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/blog:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
