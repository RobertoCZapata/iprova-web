import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { CreateCaseInput } from "@/types/case";

/**
 * GET /api/cases
 * Listar todos los casos (solo admins)
 */
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Obtener parámetros de búsqueda
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const caseType = searchParams.get("case_type");
    const search = searchParams.get("search");

    // Construir query
    let query = supabaseAdmin
      .from("cases")
      .select(`
        *,
        admin:users!cases_admin_id_fkey(name)
      `)
      .order("created_at", { ascending: false });

    // Aplicar filtros
    if (status) {
      query = query.eq("status", status);
    }

    if (caseType) {
      query = query.eq("case_type", caseType);
    }

    if (search) {
      query = query.or(
        `case_number.ilike.%${search}%,title.ilike.%${search}%,client_name.ilike.%${search}%`
      );
    }

    const { data: cases, error } = await query;

    if (error) {
      console.error("Error fetching cases:", error);
      return NextResponse.json(
        { error: "Error al obtener casos" },
        { status: 500 }
      );
    }

    // Formatear datos
    const formattedCases = cases?.map((caseItem: any) => ({
      ...caseItem,
      admin_name: caseItem.admin?.name,
      admin: undefined, // Remover objeto anidado
    }));

    return NextResponse.json(formattedCases || []);
  } catch (error) {
    console.error("Error in GET /api/cases:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cases
 * Crear un nuevo caso (solo admins)
 */
export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body: CreateCaseInput = await request.json();

    // Validaciones
    if (!body.title || !body.client_name || !body.case_type || !body.priority) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Generar número de caso automáticamente
    const { data: caseNumber, error: numberError } = await supabaseAdmin.rpc(
      "generate_case_number"
    );

    if (numberError || !caseNumber) {
      console.error("Error generating case number:", numberError);
      return NextResponse.json(
        { error: "Error al generar número de caso" },
        { status: 500 }
      );
    }

    // Crear caso
    const { data: newCase, error: insertError } = await supabaseAdmin
      .from("cases")
      .insert({
        case_number: caseNumber,
        title: body.title,
        client_name: body.client_name,
        client_email: body.client_email,
        client_phone: body.client_phone,
        case_type: body.case_type,
        priority: body.priority,
        deadline: body.deadline,
        description: body.description,
        admin_id: session.user.id,
        status: "activo",
      })
      .select(`
        *,
        admin:users!cases_admin_id_fkey(name)
      `)
      .single();

    if (insertError) {
      console.error("Error creating case:", insertError);
      return NextResponse.json(
        { error: "Error al crear caso" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedCase = {
      ...newCase,
      admin_name: newCase.admin?.name,
      admin: undefined,
    };

    return NextResponse.json(formattedCase, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cases:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
