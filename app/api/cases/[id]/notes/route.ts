import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { CreateNoteInput } from "@/types/case";

/**
 * POST /api/cases/[id]/notes
 * Crear una nueva nota en el caso
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

    const body: CreateNoteInput = await request.json();

    // Validaciones
    if (!body.title || !body.content || !body.note_type) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    if (!["abogado", "asistente"].includes(body.note_type)) {
      return NextResponse.json(
        { error: "Tipo de nota inválido" },
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

    // Crear nota
    const { data: newNote, error: insertError } = await supabaseAdmin
      .from("case_notes")
      .insert({
        case_id: id,
        note_type: body.note_type,
        title: body.title,
        content: body.content,
        created_by: session.user.id,
      })
      .select(`
        *,
        creator:users!case_notes_created_by_fkey(name)
      `)
      .single();

    if (insertError) {
      console.error("Error creating note:", insertError);
      return NextResponse.json(
        { error: "Error al crear nota" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedNote = {
      ...newNote,
      creator_name: newNote.creator?.name,
      creator: undefined,
    };

    return NextResponse.json(formattedNote, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cases/[id]/notes:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
