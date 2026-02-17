import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/dashboard/stats
 * Obtener estadísticas del dashboard
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener total de casos
    const { count: totalCases } = await supabaseAdmin
      .from("cases")
      .select("*", { count: "exact", head: true });

    // Obtener casos activos
    const { count: activeCases } = await supabaseAdmin
      .from("cases")
      .select("*", { count: "exact", head: true })
      .eq("status", "activo");

    // Obtener casos finalizados este mes
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: completedCases } = await supabaseAdmin
      .from("cases")
      .select("*", { count: "exact", head: true })
      .eq("status", "finalizado")
      .gte("finalized_at", startOfMonth.toISOString());

    // Obtener tareas pendientes
    const { count: pendingTasks } = await supabaseAdmin
      .from("case_tasks")
      .select("*", { count: "exact", head: true })
      .in("status", ["pendiente", "en_progreso"]);

    // Obtener tareas urgentes
    const { count: urgentTasks } = await supabaseAdmin
      .from("case_tasks")
      .select("*", { count: "exact", head: true })
      .in("status", ["pendiente", "en_progreso"])
      .eq("priority", "urgente");

    return NextResponse.json({
      totalCases: totalCases || 0,
      activeCases: activeCases || 0,
      completedCases: completedCases || 0,
      pendingTasks: pendingTasks || 0,
      urgentTasks: urgentTasks || 0,
    });
  } catch (error) {
    console.error("Error in GET /api/dashboard/stats:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
