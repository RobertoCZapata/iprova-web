import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * POST /api/cases/[id]/documents
 * Registrar un nuevo documento en el caso
 * TODO: Integrar con Supabase Storage para upload real de archivos
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Validaciones
    if (!body.filename || !body.file_path) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Verificar que el caso existe
    const { data: caseExists } = await supabaseAdmin
      .from("cases")
      .select("id")
      .eq("id", id)
      .single();

    if (!caseExists) {
      return NextResponse.json(
        { error: "Caso no encontrado" },
        { status: 404 }
      );
    }

    // Crear documento
    const { data: newDocument, error: insertError } = await supabaseAdmin
      .from("case_documents")
      .insert({
        case_id: id,
        filename: body.filename,
        file_path: body.file_path,
        file_size: body.file_size,
        file_type: body.file_type,
        description: body.description,
        uploaded_by: session.user.id,
      })
      .select(`
        *,
        uploader:users!case_documents_uploaded_by_fkey(name)
      `)
      .single();

    if (insertError) {
      console.error("Error creating document:", insertError);
      return NextResponse.json(
        { error: "Error al registrar documento" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedDocument = {
      ...newDocument,
      uploader_name: newDocument.uploader?.name,
      uploader: undefined,
    };

    return NextResponse.json(formattedDocument, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cases/[id]/documents:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
