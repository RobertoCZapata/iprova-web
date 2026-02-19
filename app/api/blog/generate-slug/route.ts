import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * POST /api/blog/generate-slug
 * Genera un slug único desde un título (solo admin)
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

    // 2. Obtener título
    const { title } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Título requerido" },
        { status: 400 }
      );
    }

    // 3. Llamar a función SQL para generar slug único
    const { data: slug, error } = await supabaseAdmin.rpc("generate_slug", {
      title,
    });

    if (error || !slug) {
      console.error("Error generating slug:", error);
      return NextResponse.json(
        { error: "Error al generar slug" },
        { status: 500 }
      );
    }

    return NextResponse.json({ slug });
  } catch (error) {
    console.error("Error in POST /api/blog/generate-slug:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
