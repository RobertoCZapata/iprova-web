"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileText, Search, AlertCircle, Clock, Calendar, User, CheckCircle, Copy, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Case, CASE_TYPES, CASE_STATUSES, PRIORITIES } from "@/types/case";

export default function AdminCasosPage() {
  const { data: session, status } = useSession();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("activo");

  useEffect(() => {
    if (status === "authenticated") {
      fetchCases();
    }
  }, [status, statusFilter]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);

      const response = await fetch(`/api/cases?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setCases(data);
      }
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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

  const filteredCases = cases.filter((c) =>
    searchTerm
      ? c.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.client_name.toLowerCase().includes(searchTerm.toLowerCase())
      : true
  );

  const getPriorityBadge = (priority: string) => {
    const styles = {
      urgente: "bg-red-100 text-red-800 border-red-200",
      alta: "bg-orange-100 text-orange-800 border-orange-200",
      media: "bg-yellow-100 text-yellow-800 border-yellow-200",
      baja: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return styles[priority as keyof typeof styles] || styles.media;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      activo: "bg-green-100 text-green-800 border-green-200",
      finalizado: "bg-blue-100 text-blue-800 border-blue-200",
      archivado: "bg-gray-100 text-gray-800 border-gray-200",
    };
    return styles[status as keyof typeof styles] || styles.activo;
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return <span className="text-gray-400">Sin fecha</span>;

    const date = new Date(deadline);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffMs = deadlineDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);

    let colorClass = "text-gray-700";
    let icon = null;

    if (diffDays < 0) {
      colorClass = "text-red-600 font-semibold";
      icon = <AlertCircle size={14} className="inline mr-1" />;
    } else if (diffDays <= 3) {
      colorClass = "text-orange-600 font-semibold";
      icon = <Clock size={14} className="inline mr-1" />;
    } else if (diffDays <= 7) {
      colorClass = "text-yellow-600";
    }

    return (
      <span className={colorClass}>
        {icon}
        {date.toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Casos</h1>
          <p className="text-sm text-gray-600 mt-1">
            Administra todos los casos legales de iPROVA
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Buscar por número, título o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Todos los estados</option>
                {CASE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Create Button */}
            <Button
              onClick={() => setShowCreateModal(true)}
              variant="primary"
              size="lg"
              className="gap-3 shadow-lg"
            >
              <FileText size={22} />
              <span>Crear Caso</span>
            </Button>
          </div>
        </div>

        {/* Cases Table */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando casos...</p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No hay casos
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? "No se encontraron casos con ese criterio"
                : "Comienza creando tu primer caso"}
            </p>
            {!searchTerm && (
              <Button
                onClick={() => setShowCreateModal(true)}
                variant="primary"
                size="lg"
                className="gap-3"
              >
                <FileText size={22} />
                Crear Primer Caso
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Líder Investigador
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Prioridad
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Estatus
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCases.map((caseItem: any) => (
                    <tr
                      key={caseItem.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/admin/casos/${caseItem.id}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-mono font-semibold text-primary">
                            {caseItem.case_number}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {caseItem.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {caseItem.client_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-gray-200">
                            <User size={16} className="text-primary" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {caseItem.admin_name || session?.user?.name || "Sin asignar"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {caseItem.case_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(
                            caseItem.priority
                          )}`}
                        >
                          {caseItem.priority.charAt(0).toUpperCase() +
                            caseItem.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatDeadline(caseItem.deadline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                            caseItem.status
                          )}`}
        >
                          {caseItem.status.charAt(0).toUpperCase() +
                            caseItem.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          href={`/admin/casos/${caseItem.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary hover:text-white border border-primary/20 hover:border-primary rounded-lg transition-all duration-200"
                        >
                          <Eye size={16} />
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <CreateCaseModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchCases();
          }}
        />
      )}
    </div>
  );
}

// Modal Component for Creating Case
function CreateCaseModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdCaseNumber, setCreatedCaseNumber] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    client_name: "",
    client_email: "",
    client_phone: "",
    case_type: "Penal",
    priority: "media" as "baja" | "media" | "alta" | "urgente",
    deadline: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCase = await response.json();
        setCreatedCaseNumber(newCase.case_number);
        setShowSuccess(true);
      } else {
        alert("Error al crear caso");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al crear caso");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(createdCaseNumber);
    alert("Código copiado al portapapeles");
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setCreatedCaseNumber("");
    onSuccess();
  };

  // Modal de éxito
  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Caso Creado Exitosamente!
            </h2>
            <p className="text-gray-600 mb-6">
              Comparte este código con tu cliente para que pueda consultar el estado de su caso
            </p>
          </div>

          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6 mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Código del Caso
            </label>
            <div className="flex items-center justify-center gap-3">
              <code className="text-3xl font-bold text-primary tracking-wider">
                {createdCaseNumber}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                title="Copiar código"
              >
                <Copy size={24} className="text-primary" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCloseSuccess}
              variant="primary"
              className="w-full"
            >
              Entendido
            </Button>
            <p className="text-sm text-gray-500">
              El cliente puede consultar su caso en:{" "}
              <span className="font-mono text-primary">iprova.com.co/consultar-caso</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Crear Nuevo Caso</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título del Caso *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ej: Defensa por hurto calificado"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente *
              </label>
              <input
                type="text"
                required
                value={formData.client_name}
                onChange={(e) =>
                  setFormData({ ...formData, client_name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Caso *
              </label>
              <select
                required
                value={formData.case_type}
                onChange={(e) =>
                  setFormData({ ...formData, case_type: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {CASE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridad *
              </label>
              <select
                required
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as "baja" | "media" | "alta" | "urgente",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Límite (Deadline)
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email del Cliente
              </label>
              <input
                type="email"
                value={formData.client_email}
                onChange={(e) =>
                  setFormData({ ...formData, client_email: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="email@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono del Cliente
              </label>
              <input
                type="tel"
                value={formData.client_phone}
                onChange={(e) =>
                  setFormData({ ...formData, client_phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="300 123 4567"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Detalles del caso..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button onClick={onClose} variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Creando..." : "Crear Caso"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
