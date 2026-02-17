import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * GET /api/cases/public/[caseNumber]
 * Endpoint público para consultar el estado de un caso por su número
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

    // Buscar el caso por número
    const { data: caseData, error } = await supabaseAdmin
      .from("cases")
      .select(
        `
        case_number,
        title,
        client_name,
        case_type,
        status,
        priority,
        deadline,
        description,
        created_at,
        updated_at,
        admin:users!cases_admin_id_fkey(name)
      `
      )
      .eq("case_number", caseNumber)
      .single();

    if (error || !caseData) {
      return NextResponse.json(
        { error: "Caso no encontrado" },
        { status: 404 }
      );
    }

    // Formatear respuesta con solo información relevante para el cliente
    // NOTA: internal_notes NO se incluye (es privado para abogados)
    const publicCaseData = {
      case_number: caseData.case_number,
      title: caseData.title,
      client_name: caseData.client_name,
      case_type: caseData.case_type,
      status: caseData.status,
      priority: caseData.priority,
      deadline: caseData.deadline,
      description: caseData.description, // Descripción pública
      created_at: caseData.created_at,
      updated_at: caseData.updated_at,
      admin_name: caseData.admin?.name || "No asignado",
    };

    return NextResponse.json(publicCaseData);
  } catch (error) {
    console.error("Error in GET /api/cases/public/[caseNumber]:", error);
    return NextResponse.json(
      { error: "Error al obtener el caso" },
      { status: 500 }
    );
  }
}
