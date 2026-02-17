import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/cases/[id]
 * Obtener un caso específico con todas sus relaciones
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener caso con todas las relaciones
    const { data: caseData, error: caseError } = await supabaseAdmin
      .from("cases")
      .select(`
        *,
        admin:users!cases_admin_id_fkey(id, name, email)
      `)
      .eq("id", id)
      .single();

    if (caseError || !caseData) {
      return NextResponse.json({ error: "Caso no encontrado" }, { status: 404 });
    }

    // Obtener notas
    const { data: notes } = await supabaseAdmin
      .from("case_notes")
      .select(`
        *,
        creator:users!case_notes_created_by_fkey(name)
      `)
      .eq("case_id", id)
      .order("created_at", { ascending: false });

    // Obtener tareas
    const { data: tasks } = await supabaseAdmin
      .from("case_tasks")
      .select(`
        *,
        creator:users!case_tasks_created_by_fkey(name),
        assigned:users!case_tasks_assigned_to_fkey(name)
      `)
      .eq("case_id", id)
      .order("created_at", { ascending: false });

    // Obtener documentos
    const { data: documents } = await supabaseAdmin
      .from("case_documents")
      .select(`
        *,
        uploader:users!case_documents_uploaded_by_fkey(name)
      `)
      .eq("case_id", id)
      .order("uploaded_at", { ascending: false });

    // Formatear respuesta
    const response = {
      ...caseData,
      admin_name: caseData.admin?.name,
      admin: undefined,
      notes: notes?.map((note: any) => ({
        ...note,
        creator_name: note.creator?.name,
        creator: undefined,
      })),
      tasks: tasks?.map((task: any) => ({
        ...task,
        creator_name: task.creator?.name,
        assigned_name: task.assigned?.name,
        creator: undefined,
        assigned: undefined,
      })),
      documents: documents?.map((doc: any) => ({
        ...doc,
        uploader_name: doc.uploader?.name,
        uploader: undefined,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/cases/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/cases/[id]
 * Actualizar campos específicos de un caso (solo admins)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Campos permitidos para actualizar
    const allowedFields = [
      "title",
      "client_name",
      "client_email",
      "client_phone",
      "case_type",
      "status",
      "priority",
      "deadline",
      "description",
      "internal_notes",
      "amount",
    ];

    // Filtrar solo campos permitidos
    const updateData: Record<string, any> = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    // Validar que hay algo que actualizar
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No hay campos para actualizar" },
        { status: 400 }
      );
    }

    // Agregar updated_at
    updateData.updated_at = new Date().toISOString();

    // Si se finaliza el caso, agregar finalized_at
    if (updateData.status === "finalizado" && !updateData.finalized_at) {
      updateData.finalized_at = new Date().toISOString();
    }

    // Actualizar caso
    const { data: updatedCase, error } = await supabaseAdmin
      .from("cases")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating case:", error);
      return NextResponse.json(
        { error: "Error al actualizar caso" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error("Error in PATCH /api/cases/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/cases/[id]
 * Actualizar un caso completo
 */
export async function PUT(
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

    // Actualizar caso
    const { data: updatedCase, error } = await supabaseAdmin
      .from("cases")
      .update({
        title: body.title,
        client_name: body.client_name,
        client_email: body.client_email,
        client_phone: body.client_phone,
        case_type: body.case_type,
        description: body.description,
        status: body.status,
        priority: body.priority,
        deadline: body.deadline,
        internal_notes: body.internal_notes,
        amount: body.amount,
        finalized_at: body.status === "finalizado" ? new Date().toISOString() : null,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating case:", error);
      return NextResponse.json(
        { error: "Error al actualizar caso" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error("Error in PUT /api/cases/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cases/[id]
 * Eliminar un caso (solo si no tiene datos relacionados o usar cascada)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Eliminar caso (CASCADE eliminará notas, tareas y documentos automáticamente)
    const { error } = await supabaseAdmin.from("cases").delete().eq("id", id);

    if (error) {
      console.error("Error deleting case:", error);
      return NextResponse.json(
        { error: "Error al eliminar caso" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Caso eliminado exitosamente" });
  } catch (error) {
    console.error("Error in DELETE /api/cases/[id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
