import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * PUT /api/cases/[id]/notes/[noteId]
 * Actualizar una nota existente
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  try {
    const session = await auth();
    const { id, noteId } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Verificar que la nota existe y pertenece al caso
    const { data: existingNote } = await supabaseAdmin
      .from("case_notes")
      .select("id, case_id")
      .eq("id", noteId)
      .eq("case_id", id)
      .single();

    if (!existingNote) {
      return NextResponse.json(
        { error: "Nota no encontrada" },
        { status: 404 }
      );
    }

    // Actualizar nota
    const { data: updatedNote, error } = await supabaseAdmin
      .from("case_notes")
      .update({
        title: body.title,
        content: body.content,
        note_type: body.note_type,
      })
      .eq("id", noteId)
      .select(`
        *,
        creator:users!case_notes_created_by_fkey(name)
      `)
      .single();

    if (error) {
      console.error("Error updating note:", error);
      return NextResponse.json(
        { error: "Error al actualizar nota" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedNote = {
      ...updatedNote,
      creator_name: updatedNote.creator?.name,
      creator: undefined,
    };

    return NextResponse.json(formattedNote);
  } catch (error) {
    console.error("Error in PUT /api/cases/[id]/notes/[noteId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cases/[id]/notes/[noteId]
 * Eliminar una nota
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; noteId: string }> }
) {
  try {
    const session = await auth();
    const { id, noteId } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar que la nota existe y pertenece al caso
    const { data: existingNote } = await supabaseAdmin
      .from("case_notes")
      .select("id, case_id")
      .eq("id", noteId)
      .eq("case_id", id)
      .single();

    if (!existingNote) {
      return NextResponse.json(
        { error: "Nota no encontrada" },
        { status: 404 }
      );
    }

    // Eliminar nota
    const { error } = await supabaseAdmin
      .from("case_notes")
      .delete()
      .eq("id", noteId);

    if (error) {
      console.error("Error deleting note:", error);
      return NextResponse.json(
        { error: "Error al eliminar nota" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Nota eliminada exitosamente" });
  } catch (error) {
    console.error("Error in DELETE /api/cases/[id]/notes/[noteId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
