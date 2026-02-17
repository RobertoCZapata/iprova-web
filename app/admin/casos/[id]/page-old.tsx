"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Case } from "@/types/case";
import { CaseUpdate, UPDATE_TYPES, UpdateType } from "@/types/case-update";
import { CaseTimeline } from "@/components/cases/CaseTimeline";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  EyeOff,
  FileText,
  Calendar,
  User,
  Clock,
} from "lucide-react";

export default function CaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const caseId = params.id as string;
  const { data: session, status } = useSession();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [updates, setUpdates] = useState<CaseUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [internalNotes, setInternalNotes] = useState("");
  const [editingUpdate, setEditingUpdate] = useState<CaseUpdate | null>(null);

  // Estado del formulario de actualización
  const [updateForm, setUpdateForm] = useState({
    title: "",
    description: "",
    update_type: "general" as UpdateType,
    is_visible_to_client: true,
  });

  useEffect(() => {
    if (status === "authenticated" && caseId) {
      fetchCaseData();
      fetchUpdates();
    }
  }, [status, caseId]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  const fetchCaseData = async () => {
    try {
      const response = await fetch(`/api/cases/${caseId}`);
      if (response.ok) {
        const data = await response.json();
        setCaseData(data);
        setInternalNotes(data.internal_notes || "");
      }
    } catch (error) {
      console.error("Error fetching case:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpdates = async () => {
    try {
      const response = await fetch(`/api/cases/${caseId}/updates`);
      if (response.ok) {
        const data = await response.json();
        setUpdates(data);
      }
    } catch (error) {
      console.error("Error fetching updates:", error);
    }
  };

  const handleSaveNotes = async () => {
    if (!caseData) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ internal_notes: internalNotes }),
      });

      if (response.ok) {
        alert("Notas internas guardadas");
      } else {
        alert("Error al guardar notas");
      }
    } catch (error) {
      console.error("Error saving notes:", error);
      alert("Error al guardar notas");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingUpdate
        ? `/api/cases/${caseId}/updates/${editingUpdate.id}`
        : `/api/cases/${caseId}/updates`;
      const method = editingUpdate ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm),
      });

      if (response.ok) {
        // Resetear formulario
        setUpdateForm({
          title: "",
          description: "",
          update_type: "general",
          is_visible_to_client: true,
        });
        setShowUpdateForm(false);
        setEditingUpdate(null);
        // Recargar actualizaciones
        fetchUpdates();
        alert(
          editingUpdate
            ? "Actualización editada exitosamente"
            : "Actualización creada exitosamente"
        );
      } else {
        alert("Error al guardar actualización");
      }
    } catch (error) {
      console.error("Error saving update:", error);
      alert("Error al guardar actualización");
    } finally {
      setSaving(false);
    }
  };

  const handleEditUpdate = (update: CaseUpdate) => {
    setEditingUpdate(update);
    setUpdateForm({
      title: update.title,
      description: update.description,
      update_type: update.update_type,
      is_visible_to_client: update.is_visible_to_client,
    });
    setShowUpdateForm(true);
  };

  const handleDeleteUpdate = async (updateId: string) => {
    try {
      const response = await fetch(`/api/cases/${caseId}/updates/${updateId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchUpdates();
        alert("Actualización eliminada exitosamente");
      } else {
        alert("Error al eliminar actualización");
      }
    } catch (error) {
      console.error("Error deleting update:", error);
      alert("Error al eliminar actualización");
    }
  };

  const handleCancelEdit = () => {
    setEditingUpdate(null);
    setUpdateForm({
      title: "",
      description: "",
      update_type: "general",
      is_visible_to_client: true,
    });
    setShowUpdateForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando caso...</p>
        </div>
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Caso no encontrado</p>
          <Button onClick={() => router.push("/admin/casos")} className="mt-4">
            Volver a Casos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/admin/casos")}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft size={18} />
                Volver
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{caseData.case_number}</h1>
                <p className="text-sm text-gray-600 mt-1">{caseData.title}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del Caso */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Información del Caso
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Cliente:</span>
                  <p className="text-gray-900">{caseData.client_name}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Tipo:</span>
                  <p className="text-gray-900">{caseData.case_type}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Estado:</span>
                  <p className="text-gray-900 capitalize">{caseData.status}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Prioridad:</span>
                  <p className="text-gray-900 capitalize">{caseData.priority}</p>
                </div>
                {caseData.deadline && (
                  <div>
                    <span className="font-semibold text-gray-600">Deadline:</span>
                    <p className="text-gray-900">
                      {new Date(caseData.deadline).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                )}
              </div>

              {caseData.description && (
                <div className="mt-4 pt-4 border-t">
                  <span className="font-semibold text-gray-600 block mb-2">
                    Descripción Pública:
                  </span>
                  <p className="text-gray-700 whitespace-pre-wrap">{caseData.description}</p>
                </div>
              )}
            </div>

            {/* Notas Internas */}
            <div className="bg-amber-50 rounded-lg shadow-sm border-2 border-amber-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <EyeOff size={20} className="text-amber-600" />
                  Notas Internas (Privadas)
                </h2>
                <Button
                  onClick={handleSaveNotes}
                  disabled={saving}
                  size="sm"
                  className="gap-2"
                >
                  <Save size={16} />
                  {saving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                placeholder="Notas privadas para uso interno del equipo legal..."
              />
              <p className="text-xs text-amber-700 mt-2">
                ⚠️ Estas notas NO son visibles para el cliente
              </p>
            </div>

            {/* Línea de Tiempo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Actualizaciones del Caso</h2>
                <Button
                  onClick={() => setShowUpdateForm(!showUpdateForm)}
                  variant="primary"
                  size="sm"
                  className="gap-2"
                >
                  <Plus size={16} />
                  Nueva Actualización
                </Button>
              </div>

              {/* Formulario de Nueva/Editar Actualización */}
              {showUpdateForm && (
                <form
                  onSubmit={handleCreateUpdate}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6"
                >
                  <h3 className="font-semibold text-gray-900 mb-4">
                    {editingUpdate ? "Editar Actualización" : "Nueva Actualización"}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Título *
                      </label>
                      <input
                        type="text"
                        required
                        value={updateForm.title}
                        onChange={(e) =>
                          setUpdateForm({ ...updateForm, title: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Ej: Audiencia programada para el 15 de marzo"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tipo *
                        </label>
                        <select
                          value={updateForm.update_type}
                          onChange={(e) =>
                            setUpdateForm({
                              ...updateForm,
                              update_type: e.target.value as UpdateType,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                          {UPDATE_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Visibilidad
                        </label>
                        <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="checkbox"
                            checked={updateForm.is_visible_to_client}
                            onChange={(e) =>
                              setUpdateForm({
                                ...updateForm,
                                is_visible_to_client: e.target.checked,
                              })
                            }
                            className="w-4 h-4 text-primary"
                          />
                          <span className="text-sm">
                            {updateForm.is_visible_to_client ? (
                              <>
                                <Eye size={16} className="inline mr-1" />
                                Visible para cliente
                              </>
                            ) : (
                              <>
                                <EyeOff size={16} className="inline mr-1" />
                                Solo interno
                              </>
                            )}
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción *
                      </label>
                      <textarea
                        required
                        value={updateForm.description}
                        onChange={(e) =>
                          setUpdateForm({ ...updateForm, description: e.target.value })
                        }
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Describe la actualización del caso..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="submit" disabled={saving}>
                        {saving
                          ? editingUpdate
                            ? "Guardando..."
                            : "Creando..."
                          : editingUpdate
                          ? "Guardar Cambios"
                          : "Crear Actualización"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {/* Timeline */}
              <CaseTimeline
                updates={updates}
                showEmpty={true}
                isAdmin={true}
                onEdit={handleEditUpdate}
                onDelete={handleDeleteUpdate}
              />
            </div>
          </div>

          {/* Columna Lateral - Info Rápida */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Información Rápida</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <FileText size={16} />
                  <span>{updates.length} actualizaciones</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={16} />
                  <span>
                    Creado:{" "}
                    {new Date(caseData.created_at).toLocaleDateString("es-CO")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>
                    Actualizado:{" "}
                    {new Date(caseData.updated_at).toLocaleDateString("es-CO")}
                  </span>
                </div>
                {caseData.client_email && (
                  <div className="pt-3 border-t">
                    <span className="font-medium text-gray-700 block mb-1">Email:</span>
                    <a
                      href={`mailto:${caseData.client_email}`}
                      className="text-primary hover:underline"
                    >
                      {caseData.client_email}
                    </a>
                  </div>
                )}
                {caseData.client_phone && (
                  <div>
                    <span className="font-medium text-gray-700 block mb-1">Teléfono:</span>
                    <a
                      href={`tel:${caseData.client_phone}`}
                      className="text-primary hover:underline"
                    >
                      {caseData.client_phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
