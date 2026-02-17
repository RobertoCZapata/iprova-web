import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { CreateTaskInput } from "@/types/case";

/**
 * POST /api/cases/[id]/tasks
 * Crear una nueva tarea en el caso
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

    const body: CreateTaskInput = await request.json();

    // Validaciones
    if (!body.title) {
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

    // Crear tarea
    const { data: newTask, error: insertError } = await supabaseAdmin
      .from("case_tasks")
      .insert({
        case_id: id,
        title: body.title,
        description: body.description,
        priority: body.priority || "media",
        due_date: body.due_date,
        assigned_to: body.assigned_to,
        status: "pendiente",
        created_by: session.user.id,
      })
      .select(`
        *,
        creator:users!case_tasks_created_by_fkey(name),
        assigned:users!case_tasks_assigned_to_fkey(name)
      `)
      .single();

    if (insertError) {
      console.error("Error creating task:", insertError);
      return NextResponse.json(
        { error: "Error al crear tarea" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedTask = {
      ...newTask,
      creator_name: newTask.creator?.name,
      assigned_name: newTask.assigned?.name,
      creator: undefined,
      assigned: undefined,
    };

    return NextResponse.json(formattedTask, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cases/[id]/tasks:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
