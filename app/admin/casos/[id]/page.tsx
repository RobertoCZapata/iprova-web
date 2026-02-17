"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
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
  ChevronRight,
  Edit,
  AlertCircle,
  CheckCircle2,
  Printer,
  Flag,
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
  const [activeTab, setActiveTab] = useState("details");

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
        setUpdateForm({
          title: "",
          description: "",
          update_type: "general",
          is_visible_to_client: true,
        });
        setShowUpdateForm(false);
        setEditingUpdate(null);
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

  const handleFinishCase = async () => {
    if (!confirm("¿Estás seguro de que deseas finalizar este caso? Esta acción marcará el caso como completado.")) {
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/cases/${caseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "finalizado" }),
      });

      if (response.ok) {
        alert("Caso finalizado exitosamente");
        fetchCaseData(); // Refrescar datos del caso
      } else {
        alert("Error al finalizar caso");
      }
    } catch (error) {
      console.error("Error finishing case:", error);
      alert("Error al finalizar caso");
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      activo: { bg: "bg-green-100", text: "text-green-700", label: "ACTIVO" },
      finalizado: { bg: "bg-blue-100", text: "text-blue-700", label: "FINALIZADO" },
      archivado: { bg: "bg-gray-100", text: "text-gray-700", label: "ARCHIVADO" },
    };
    return styles[status as keyof typeof styles] || styles.activo;
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      urgente: { bg: "bg-red-100", text: "text-red-700", label: "URGENTE" },
      alta: { bg: "bg-orange-100", text: "text-orange-700", label: "ALTA" },
      media: { bg: "bg-yellow-100", text: "text-yellow-700", label: "MEDIA" },
      baja: { bg: "bg-blue-100", text: "text-blue-700", label: "BAJA" },
    };
    return styles[priority as keyof typeof styles] || styles.media;
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

  const statusStyle = getStatusBadge(caseData.status);
  const priorityStyle = getPriorityBadge(caseData.priority);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-white px-8 py-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/casos"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Casos</span>
            <ChevronRight size={14} />
            <span>{caseData.case_type}</span>
            <ChevronRight size={14} />
            <span className="text-primary font-medium">{caseData.case_number}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Título y Acciones */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {caseData.case_number}
              </h2>
              <span
                className={`px-2.5 py-1 ${statusStyle.bg} ${statusStyle.text} text-[10px] font-bold uppercase rounded`}
              >
                {statusStyle.label}
              </span>
              <span
                className={`px-2.5 py-1 ${priorityStyle.bg} ${priorityStyle.text} text-[10px] font-bold uppercase rounded`}
              >
                PRIORIDAD {priorityStyle.label}
              </span>
            </div>
            <p className="text-gray-600">{caseData.title}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 min-w-[140px]">
              <Printer size={16} /> Imprimir
            </button>
            <button className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary-light transition-colors flex items-center justify-center gap-2 min-w-[140px]">
              <Edit size={16} /> Editar Caso
            </button>
            {caseData.status !== "finalizado" && (
              <button
                onClick={handleFinishCase}
                disabled={saving}
                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-2 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Flag size={16} /> {saving ? "Finalizando..." : "Terminar Caso"}
              </button>
            )}
          </div>
        </div>

        {/* Tabs de Navegación */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 text-sm font-bold whitespace-nowrap ${
                activeTab === "details"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Detalles del Caso
            </button>
            <button
              onClick={() => setActiveTab("timeline")}
              className={`pb-4 text-sm font-bold whitespace-nowrap flex items-center gap-2 ${
                activeTab === "timeline"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Actualizaciones del Caso
              {updates.length > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                  {updates.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-4 text-sm font-bold whitespace-nowrap ${
                activeTab === "notes"
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Notas Internas
            </button>
          </div>
        </div>

        {/* Contenido Principal - Grid de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === "details" && (
              <>
                {/* Card de Información del Cliente */}
                <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                      Información del Cliente
                    </h3>
                    <button className="text-primary text-xs font-bold hover:underline">
                      VER PERFIL
                    </button>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Cliente
                      </label>
                      <p className="text-sm text-gray-900 font-medium">
                        {caseData.client_name}
                      </p>
                    </div>
                    {caseData.client_email && (
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Email
                        </label>
                        <a
                          href={`mailto:${caseData.client_email}`}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          {caseData.client_email}
                        </a>
                      </div>
                    )}
                    {caseData.client_phone && (
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Teléfono
                        </label>
                        <a
                          href={`tel:${caseData.client_phone}`}
                          className="text-sm text-primary font-medium hover:underline"
                        >
                          {caseData.client_phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        ID Caso
                      </label>
                      <p className="text-sm text-gray-900 font-medium font-mono">
                        {caseData.case_number}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card de Detalles del Caso */}
                <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                      Detalles del Procedimiento
                    </h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Tipo de Caso
                      </label>
                      <p className="text-sm text-gray-900 font-medium">
                        {caseData.case_type}
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Estado
                      </label>
                      <p className="text-sm text-gray-900 font-medium capitalize">
                        {caseData.status}
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Prioridad
                      </label>
                      <p className="text-sm text-gray-900 font-medium capitalize">
                        {caseData.priority}
                      </p>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                        Días desde apertura
                      </label>
                      <p className="text-sm text-gray-900 font-bold">
                        {(() => {
                          const created = new Date(caseData.created_at);
                          const today = new Date();
                          // Resetear a medianoche para comparar solo fechas
                          created.setHours(0, 0, 0, 0);
                          today.setHours(0, 0, 0, 0);
                          const days = Math.max(
                            0,
                            Math.floor((today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24))
                          );
                          return days;
                        })()}{" "}
                        días
                      </p>
                    </div>
                    {caseData.amount && (
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Cuantía Estimada
                        </label>
                        <p className="text-sm text-gray-900 font-bold text-primary">
                          ${" "}
                          {new Intl.NumberFormat("es-CO", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          }).format(caseData.amount)}
                        </p>
                      </div>
                    )}
                    {caseData.deadline && (
                      <div>
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Deadline
                        </label>
                        <p className="text-sm text-gray-900 font-medium">
                          {new Date(caseData.deadline).toLocaleDateString("es-CO")}
                        </p>
                      </div>
                    )}
                    {caseData.description && (
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                          Descripción Pública
                        </label>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                          {caseData.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === "timeline" && (
              <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Actualizaciones del Caso
                  </h3>
                  <button
                    onClick={() => setShowUpdateForm(!showUpdateForm)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white text-xs font-bold rounded hover:bg-primary-light transition-colors"
                  >
                    <Plus size={14} />
                    NUEVA ACTUALIZACIÓN
                  </button>
                </div>

                <div className="p-6">
                  {showUpdateForm && (
                    <form
                      onSubmit={handleCreateUpdate}
                      className="bg-gray-50 border border-gray-200 rounded p-4 mb-6"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
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
                            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50">
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
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
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

                  <CaseTimeline
                    updates={updates}
                    showEmpty={true}
                    isAdmin={true}
                    onEdit={handleEditUpdate}
                    onDelete={handleDeleteUpdate}
                  />
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="bg-slate-50 border-2 border-slate-200 rounded shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                    <EyeOff size={20} className="text-slate-600" />
                    Notas Internas (Privadas)
                  </h3>
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
                <div className="p-6">
                  <textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    rows={12}
                    className="w-full px-4 py-3 border border-slate-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                    placeholder="Notas privadas para uso interno del equipo legal..."
                  />
                  <p className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                    <EyeOff size={12} />
                    Estas notas NO son visibles para el cliente
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Columna Derecha (1/3) - Sidebar */}
          <div className="space-y-8">
            {/* Card de Información Rápida */}
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                  Información Rápida
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FileText size={16} className="text-gray-400" />
                  <span>{updates.length} actualizaciones</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Creado</p>
                    <p className="text-gray-900">
                      {new Date(caseData.created_at).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Actualizado</p>
                    <p className="text-gray-900">
                      {new Date(caseData.updated_at).toLocaleDateString("es-CO")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de Progreso del Caso */}
            <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider text-center">
                  Progreso del Caso
                </h3>
              </div>
              <div className="p-6 relative">
                <div className="absolute left-9 top-6 bottom-6 w-[2px] bg-gray-100"></div>
                <div className="space-y-6">
                  <div className="flex gap-4 relative">
                    <div className="z-10 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white ring-4 ring-white">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase">
                        {new Date(caseData.created_at).toLocaleDateString("es-CO")}
                      </p>
                      <p className="text-xs font-bold text-gray-900">Caso Creado</p>
                    </div>
                  </div>
                  {updates.slice(0, 3).map((update, index) => (
                    <div key={update.id} className="flex gap-4 relative">
                      <div className="z-10 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white">
                        <Clock size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">
                          {new Date(update.created_at).toLocaleDateString("es-CO")}
                        </p>
                        <p className="text-xs font-bold text-gray-900">{update.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Próximos Vencimientos */}
            {caseData.deadline && (
              <div className="bg-white border-2 border-orange-200 rounded shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-orange-200 bg-orange-50 flex items-center gap-2">
                  <AlertCircle className="text-orange-600" size={20} />
                  <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">
                    Próximo Vencimiento
                  </h3>
                </div>
                <div className="p-6">
                  <div className="relative pl-6 border-l-2 border-orange-200 py-1">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-orange-500"></div>
                    <p className="text-[11px] font-bold text-orange-600 uppercase">
                      {new Date(caseData.deadline).toLocaleDateString("es-CO")}
                    </p>
                    <p className="text-sm font-bold text-gray-900">Deadline del Caso</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Faltan{" "}
                      <span className="font-bold text-orange-600">
                        {Math.ceil(
                          (new Date(caseData.deadline).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        días
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 px-8 py-3 bg-gray-50 flex items-center justify-between text-[11px] text-gray-500 font-medium">
        <div className="flex items-center gap-6">
          <span>Último cambio: {new Date(caseData.updated_at).toLocaleString("es-CO")}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>iPROVA Legal v1.0</span>
        </div>
      </footer>
    </div>
  );
}
