import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase/server";

/**
 * PATCH /api/cases/[id]/updates/[updateId]
 * Actualizar una actualización específica (solo admins)
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string; updateId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id, updateId } = await params;
    const body = await request.json();

    // Campos permitidos para actualizar
    const allowedFields = [
      "title",
      "description",
      "update_type",
      "is_visible_to_client",
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

    // Actualizar la actualización
    const { data: updatedUpdate, error } = await supabaseAdmin
      .from("case_updates")
      .update(updateData)
      .eq("id", updateId)
      .eq("case_id", id)
      .select(
        `
        *,
        admin:users!case_updates_created_by_fkey(name)
      `
      )
      .single();

    if (error) {
      console.error("Error updating case update:", error);
      return NextResponse.json(
        { error: "Error al actualizar actualización" },
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
      ...updatedUpdate,
      admin_name: updatedUpdate.admin?.name,
      admin: undefined,
    };

    return NextResponse.json(formattedUpdate);
  } catch (error) {
    console.error("Error in PATCH /api/cases/[id]/updates/[updateId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/cases/[id]/updates/[updateId]
 * Eliminar una actualización (solo admins)
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; updateId: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id, updateId } = await params;

    // Eliminar actualización
    const { error } = await supabaseAdmin
      .from("case_updates")
      .delete()
      .eq("id", updateId)
      .eq("case_id", id);

    if (error) {
      console.error("Error deleting case update:", error);
      return NextResponse.json(
        { error: "Error al eliminar actualización" },
        { status: 500 }
      );
    }

    // Actualizar el campo updated_at del caso
    await supabaseAdmin
      .from("cases")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", id);

    return NextResponse.json({ message: "Actualización eliminada exitosamente" });
  } catch (error) {
    console.error("Error in DELETE /api/cases/[id]/updates/[updateId]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
