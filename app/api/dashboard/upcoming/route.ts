import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/upcoming
 * Obtener tareas próximas con fecha límite
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // Próximos 30 días

    // Obtener tareas con fecha límite próxima
    const { data: tasks } = await supabaseAdmin
      .from("case_tasks")
      .select(
        `
        *,
        case:cases!case_tasks_case_id_fkey(case_number, title)
      `
      )
      .not("due_date", "is", null)
      .gte("due_date", now.toISOString().split("T")[0])
      .lte("due_date", futureDate.toISOString().split("T")[0])
      .in("status", ["pendiente", "en_progreso"])
      .order("due_date", { ascending: true })
      .limit(5);

    const formattedTasks = tasks?.map((task: any) => ({
      id: task.id,
      title: task.title,
      caseNumber: task.case?.case_number,
      caseTitle: task.case?.title,
      dueDate: task.due_date,
      priority: task.priority,
    }));

    return NextResponse.json(formattedTasks || []);
  } catch (error) {
    console.error("Error in GET /api/dashboard/upcoming:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
