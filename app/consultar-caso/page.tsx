"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Search, FileText, Calendar, User, AlertCircle, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { CaseTimeline } from "@/components/cases/CaseTimeline";
import { CaseUpdate } from "@/types/case-update";

interface CaseData {
  case_number: string;
  title: string;
  client_name: string;
  case_type: string;
  status: "activo" | "finalizado" | "archivado";
  priority: "baja" | "media" | "alta" | "urgente";
  deadline?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  admin_name: string;
}

export default function ConsultarCasoPage() {
  const [caseNumber, setCaseNumber] = useState("");
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [caseUpdates, setCaseUpdates] = useState<CaseUpdate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCaseData(null);
    setCaseUpdates([]);

    if (!caseNumber.trim()) {
      setError("Por favor ingrese un código de caso");
      return;
    }

    setLoading(true);

    try {
      // Cargar datos del caso
      const response = await fetch(`/api/cases/public/${caseNumber.trim()}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError("Caso no encontrado. Verifique el código e intente nuevamente.");
        } else {
          setError("Error al consultar el caso. Intente más tarde.");
        }
        return;
      }

      const data = await response.json();
      setCaseData(data);

      // Cargar actualizaciones del caso
      try {
        const updatesResponse = await fetch(
          `/api/cases/public/${caseNumber.trim()}/updates`
        );
        if (updatesResponse.ok) {
          const updatesData = await updatesResponse.json();
          setCaseUpdates(updatesData);
        }
      } catch (updateErr) {
        console.error("Error loading updates:", updateErr);
        // No fallar si las actualizaciones no se cargan
      }
    } catch (err) {
      setError("Error de conexión. Intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      urgente: "bg-red-100 text-red-800 border-red-200",
      alta: "bg-orange-100 text-orange-800 border-orange-200",
      media: "bg-yellow-100 text-yellow-800 border-yellow-200",
      baja: "bg-blue-100 text-blue-800 border-blue-200",
    };
    const labels = {
      urgente: "Urgente",
      alta: "Alta",
      media: "Media",
      baja: "Baja",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          styles[priority as keyof typeof styles] || styles.media
        }`}
      >
        {labels[priority as keyof typeof labels] || priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      activo: "bg-green-100 text-green-800 border-green-200",
      finalizado: "bg-blue-100 text-blue-800 border-blue-200",
      archivado: "bg-gray-100 text-gray-800 border-gray-200",
    };
    const labels = {
      activo: "Activo",
      finalizado: "Finalizado",
      archivado: "Archivado",
    };
    const icons = {
      activo: <CheckCircle size={16} className="mr-1" />,
      finalizado: <CheckCircle size={16} className="mr-1" />,
      archivado: <AlertCircle size={16} className="mr-1" />,
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          styles[status as keyof typeof styles] || styles.activo
        }`}
      >
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return null;

    const date = new Date(deadline);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);

    let colorClass = "text-gray-700";
    let icon = <Calendar size={16} className="inline mr-1" />;
    let label = "";

    if (diffDays < 0) {
      colorClass = "text-red-600 font-semibold";
      icon = <AlertCircle size={16} className="inline mr-1" />;
      label = `Venció hace ${Math.abs(diffDays)} día${Math.abs(diffDays) !== 1 ? "s" : ""}`;
    } else if (diffDays === 0) {
      colorClass = "text-orange-600 font-semibold";
      icon = <Clock size={16} className="inline mr-1" />;
      label = "Vence hoy";
    } else if (diffDays <= 3) {
      colorClass = "text-orange-600 font-semibold";
      icon = <Clock size={16} className="inline mr-1" />;
      label = `Vence en ${diffDays} día${diffDays !== 1 ? "s" : ""}`;
    } else if (diffDays <= 7) {
      colorClass = "text-yellow-600";
      label = `Vence en ${diffDays} días`;
    } else {
      label = `Vence en ${diffDays} días`;
    }

    return (
      <div className={`flex items-center ${colorClass}`}>
        {icon}
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-sm">
            {date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>
      </div>
    );
  };

  const getCaseTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      penal: "Penal",
      civil: "Civil",
      laboral: "Laboral",
      familia: "Familia",
      comercial: "Comercial",
      administrativo: "Administrativo",
      constitucional: "Constitucional",
      otro: "Otro",
    };
    return types[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText size={32} />
              <div>
                <h1 className="text-2xl font-bold">Consultar Estado de Caso</h1>
                <p className="text-sm text-white/80 mt-1">iPROVA - Asesoría Legal</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline-light" size="sm">
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Search size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Ingrese su Código de Caso
            </h2>
            <p className="text-gray-600">
              Consulte el estado actual de su caso legal ingresando el código que le fue proporcionado
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ej: IPV-2024-001"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-lg uppercase"
                disabled={loading}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Consultando...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Consultar
                  </>
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 font-medium">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Case Details */}
        {caseData && (
          <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light text-white p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{caseData.case_number}</h3>
                {getStatusBadge(caseData.status)}
              </div>
              <h4 className="text-xl font-semibold">{caseData.title}</h4>
            </div>

            {/* Details */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Cliente
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <User size={18} />
                    <span className="font-medium">{caseData.client_name}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Tipo de Caso
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FileText size={18} />
                    <span className="font-medium">{getCaseTypeLabel(caseData.case_type)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Prioridad
                  </label>
                  {getPriorityBadge(caseData.priority)}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Responsable
                  </label>
                  <div className="flex items-center gap-2 text-gray-900">
                    <User size={18} />
                    <span className="font-medium">{caseData.admin_name}</span>
                  </div>
                </div>
              </div>

              {/* Deadline */}
              {caseData.deadline && (
                <div className="border-t pt-6">
                  <label className="block text-sm font-semibold text-gray-600 mb-3">
                    Fecha Límite
                  </label>
                  {formatDeadline(caseData.deadline)}
                </div>
              )}

              {/* Description */}
              {caseData.description && (
                <div className="border-t pt-6">
                  <label className="block text-sm font-semibold text-gray-600 mb-3">
                    Descripción
                  </label>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {caseData.description}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Fecha de Creación:</span>{" "}
                  {formatDate(caseData.created_at)}
                </div>
                <div>
                  <span className="font-medium">Última Actualización:</span>{" "}
                  {formatDate(caseData.updated_at)}
                </div>
              </div>

              {/* Timeline de Actualizaciones */}
              <div className="border-t pt-6">
                <CaseTimeline updates={caseUpdates} showEmpty={true} />
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t">
              <p className="text-sm text-gray-600 text-center">
                Para más información sobre su caso, contáctenos directamente
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
