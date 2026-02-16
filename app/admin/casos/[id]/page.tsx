"use client";

import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Edit, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CaseWithDetails } from "@/types/case";

export default function CaseDetailPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const router = useRouter();
  const [caseData, setCaseData] = useState<CaseWithDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"info" | "notes" | "tasks" | "docs">("info");

  useEffect(() => {
    if (status === "authenticated" && params.id) {
      fetchCaseDetail();
    }
  }, [status, params.id]);

  const fetchCaseDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cases/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setCaseData(data);
      } else {
        alert("Error al cargar caso");
        router.push("/admin/casos");
      }
    } catch (error) {
      console.error("Error fetching case:", error);
      alert("Error al cargar caso");
      router.push("/admin/casos");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando caso...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  if (!caseData) {
    return null;
  }

  const handleFinalize = async () => {
    if (!confirm("¿Estás seguro de finalizar este caso?")) return;

    try {
      const response = await fetch(`/api/cases/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...caseData,
          status: "finalizado",
        }),
      });

      if (response.ok) {
        fetchCaseDetail();
        alert("Caso finalizado exitosamente");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al finalizar caso");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/casos"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Volver a Casos</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {caseData.case_number}
                </h1>
                <p className="text-sm text-gray-600">{caseData.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  caseData.status === "activo"
                    ? "bg-green-100 text-green-800"
                    : caseData.status === "finalizado"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {caseData.status.charAt(0).toUpperCase() + caseData.status.slice(1)}
              </span>
              {caseData.status === "activo" && (
                <Button onClick={handleFinalize} variant="outline" size="sm">
                  <CheckCircle size={16} className="mr-1" />
                  Finalizar Caso
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b sticky top-[73px] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: "info", label: "Información" },
              { key: "notes", label: "Notas" },
              { key: "tasks", label: "Tareas" },
              { key: "docs", label: "Documentos" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "info" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Información del Caso
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Número de Caso
                </label>
                <p className="text-gray-900 font-mono">{caseData.case_number}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Tipo de Caso
                </label>
                <p className="text-gray-900">{caseData.case_type}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Cliente
                </label>
                <p className="text-gray-900">{caseData.client_name}</p>
              </div>
              {caseData.client_email && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Email
                  </label>
                  <p className="text-gray-900">{caseData.client_email}</p>
                </div>
              )}
              {caseData.client_phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Teléfono
                  </label>
                  <p className="text-gray-900">{caseData.client_phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Abogado Responsable
                </label>
                <p className="text-gray-900">{caseData.admin_name || "N/A"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Fecha de Creación
                </label>
                <p className="text-gray-900">
                  {new Date(caseData.created_at).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {caseData.finalized_at && (
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Fecha de Finalización
                  </label>
                  <p className="text-gray-900">
                    {new Date(caseData.finalized_at).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
              {caseData.description && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">
                    Descripción
                  </label>
                  <p className="text-gray-900 mt-1">{caseData.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notas del Caso
              </h2>
              <p className="text-gray-500 text-center py-8">
                Sistema de notas en desarrollo. Próximamente podrás agregar notas del abogado y asistente aquí.
              </p>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tareas
            </h2>
            <p className="text-gray-500 text-center py-8">
              Gestión de tareas en desarrollo. Próximamente podrás crear y gestionar tareas aquí.
            </p>
          </div>
        )}

        {activeTab === "docs" && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Documentos
            </h2>
            <p className="text-gray-500 text-center py-8">
              Sistema de documentos en desarrollo. Próximamente podrás subir y gestionar documentos aquí.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
