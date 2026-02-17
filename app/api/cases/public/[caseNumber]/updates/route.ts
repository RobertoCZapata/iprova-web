import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/cases/public/[caseNumber]/updates
 * Endpoint público para obtener actualizaciones visibles de un caso
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ caseNumber: string }> }
) {
  try {
    const { caseNumber } = await params;

    if (!caseNumber) {
      return NextResponse.json(
        { error: "Número de caso requerido" },
        { status: 400 }
      );
    }

    // Primero buscar el caso por número
    const { data: caseData, error: caseError } = await supabaseAdmin
      .from("cases")
      .select("id")
      .eq("case_number", caseNumber)
      .single();

    if (caseError || !caseData) {
      return NextResponse.json(
        { error: "Caso no encontrado" },
        { status: 404 }
      );
    }

    // Obtener actualizaciones visibles para el cliente
    const { data: updates, error } = await supabaseAdmin
      .from("case_updates")
      .select(
        `
        id,
        title,
        description,
        update_type,
        created_at,
        admin:users!case_updates_created_by_fkey(name)
      `
      )
      .eq("case_id", caseData.id)
      .eq("is_visible_to_client", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching public case updates:", error);
      return NextResponse.json(
        { error: "Error al obtener actualizaciones" },
        { status: 500 }
      );
    }

    // Formatear respuesta con solo información pública
    const publicUpdates = updates?.map((update: any) => ({
      id: update.id,
      title: update.title,
      description: update.description,
      update_type: update.update_type,
      created_at: update.created_at,
      admin_name: update.admin?.name || "iPROVA",
    }));

    return NextResponse.json(publicUpdates || []);
  } catch (error) {
    console.error("Error in GET /api/cases/public/[caseNumber]/updates:", error);
    return NextResponse.json(
      { error: "Error al obtener actualizaciones" },
      { status: 500 }
    );
  }
}
