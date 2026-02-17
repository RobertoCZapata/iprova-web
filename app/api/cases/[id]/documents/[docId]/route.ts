import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * DELETE /api/cases/[id]/documents/[docId]
 * Eliminar un documento
 * TODO: También eliminar el archivo de Supabase Storage cuando se implemente
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; docId: string }> }
) {
  try {
    const session = await auth();
    const { id, docId } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar que el documento existe y pertenece al caso
    const { data: existingDoc } = await supabaseAdmin
      .from("case_documents")
      .select("id, case_id, file_path")
      .eq("id", docId)
      .eq("case_id", id)
      .single();

    if (!existingDoc) {
      return NextResponse.json(
        { error: "Documento no encontrado" },
        { status: 404 }
      );
    }

    // TODO: Eliminar archivo de Supabase Storage
    // const { error: storageError } = await supabase.storage
    //   .from('case-documents')
    //   .remove([existingDoc.file_path])

    // Eliminar registro de documento
    const { error } = await supabaseAdmin
      .from("case_documents")
      .delete()
      .eq("id", docId);

    if (error) {
      console.error("Error deleting document:", error);
      return NextResponse.json(
        { error: "Error al eliminar documento" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Documento eliminado exitosamente" });
  } catch (error) {
    console.error("Error in DELETE /api/cases/[id]/documents/[docId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
