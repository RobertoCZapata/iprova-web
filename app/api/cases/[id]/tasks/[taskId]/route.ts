import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * PUT /api/cases/[id]/tasks/[taskId]
 * Actualizar una tarea existente
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    const session = await auth();
    const { id, taskId } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    // Verificar que la tarea existe y pertenece al caso
    const { data: existingTask } = await supabaseAdmin
      .from("case_tasks")
      .select("id, case_id")
      .eq("id", taskId)
      .eq("case_id", id)
      .single();

    if (!existingTask) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    // Preparar datos de actualización
    const updateData: any = {
      title: body.title,
      description: body.description,
      priority: body.priority,
      due_date: body.due_date,
      assigned_to: body.assigned_to,
      status: body.status,
    };

    // Si se marca como completada, registrar la fecha
    if (body.status === "completada" && existingTask.status !== "completada") {
      updateData.completed_at = new Date().toISOString();
    }

    // Si se desmarca como completada, limpiar la fecha
    if (body.status !== "completada") {
      updateData.completed_at = null;
    }

    // Actualizar tarea
    const { data: updatedTask, error } = await supabaseAdmin
      .from("case_tasks")
      .update(updateData)
      .eq("id", taskId)
      .select(`
        *,
        creator:users!case_tasks_created_by_fkey(name),
        assigned:users!case_tasks_assigned_to_fkey(name)
      `)
      .single();

    if (error) {
      console.error("Error updating task:", error);
      return NextResponse.json(
        { error: "Error al actualizar tarea" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedTask = {
      ...updatedTask,
      creator_name: updatedTask.creator?.name,
      assigned_name: updatedTask.assigned?.name,
      creator: undefined,
      assigned: undefined,
    };

    return NextResponse.json(formattedTask);
  } catch (error) {
    console.error("Error in PUT /api/cases/[id]/tasks/[taskId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cases/[id]/tasks/[taskId]
 * Eliminar una tarea
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; taskId: string }> }
) {
  try {
    const session = await auth();
    const { id, taskId } = await params;

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Verificar que la tarea existe y pertenece al caso
    const { data: existingTask } = await supabaseAdmin
      .from("case_tasks")
      .select("id, case_id")
      .eq("id", taskId)
      .eq("case_id", id)
      .single();

    if (!existingTask) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    // Eliminar tarea
    const { error } = await supabaseAdmin
      .from("case_tasks")
      .delete()
      .eq("id", taskId);

    if (error) {
      console.error("Error deleting task:", error);
      return NextResponse.json(
        { error: "Error al eliminar tarea" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Tarea eliminada exitosamente" });
  } catch (error) {
    console.error("Error in DELETE /api/cases/[id]/tasks/[taskId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
