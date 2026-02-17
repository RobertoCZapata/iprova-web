import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";
import { CreateCaseUpdateInput } from "@/types/case-update";

/**
 * GET /api/cases/[id]/updates
 * Obtener todas las actualizaciones de un caso (solo admins)
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    const { data: updates, error } = await supabaseAdmin
      .from("case_updates")
      .select(
        `
        *,
        admin:users!case_updates_created_by_fkey(name)
      `
      )
      .eq("case_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching case updates:", error);
      return NextResponse.json(
        { error: "Error al obtener actualizaciones" },
        { status: 500 }
      );
    }

    // Formatear respuesta
    const formattedUpdates = updates?.map((update: any) => ({
      ...update,
      admin_name: update.admin?.name,
      admin: undefined,
    }));

    return NextResponse.json(formattedUpdates || []);
  } catch (error) {
    console.error("Error in GET /api/cases/[id]/updates:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cases/[id]/updates
 * Crear una nueva actualización para un caso (solo admins)
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const body: Omit<CreateCaseUpdateInput, "case_id"> = await request.json();

    // Validaciones
    if (!body.title || !body.description || !body.update_type) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear actualización
    const { data: newUpdate, error: insertError } = await supabaseAdmin
      .from("case_updates")
      .insert({
        case_id: id,
        title: body.title,
        description: body.description,
        update_type: body.update_type,
        is_visible_to_client: body.is_visible_to_client ?? true,
        created_by: session.user.id,
      })
      .select(
        `
        *,
        admin:users!case_updates_created_by_fkey(name)
      `
      )
      .single();

    if (insertError) {
      console.error("Error creating case update:", insertError);
      return NextResponse.json(
        { error: "Error al crear actualización" },
        { status: 500 }
      );
    }

    // Actualizar el campo updated_at del caso
    await supabaseAdmin
      .from("cases")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", id);

    // Formatear respuesta
    const formattedUpdate = {
      ...newUpdate,
      admin_name: newUpdate.admin?.name,
      admin: undefined,
    };

    return NextResponse.json(formattedUpdate, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/cases/[id]/updates:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
