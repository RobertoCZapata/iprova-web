"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useEffect, useState, useCallback, useMemo } from "react";
import { FileText, Search, Calendar, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Case, CASE_STATUSES } from "@/types/case";
import { CreateCaseModal } from "@/components/admin/casos/CreateCaseModal";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  getPriorityBadgeStyle,
  getStatusBadgeStyle,
  capitalizeFirst,
} from "@/lib/utils/case-helpers";
import { formatDeadline } from "@/lib/utils/date-helpers";
import { parseApiError } from "@/lib/utils/api-errors";

export default function AdminCasosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("activo");

  // Debounce del término de búsqueda para optimizar performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  /**
   * Obtiene los casos desde el API
   * Memoizado con useCallback para evitar recreaciones innecesarias
   */
  const fetchCases = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const response = await fetch(`/api/cases?${params.toString()}`);

      if (!response.ok) {
        const errorMessage = await parseApiError(response);
        toast.error(errorMessage);
        return;
      }

      const data = await response.json();
      setCases(data);
    } catch (error) {
      console.error("Error al obtener casos:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error al cargar los casos";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  // Efecto para cargar casos cuando el usuario está autenticado
  useEffect(() => {
    if (status === "authenticated") {
      fetchCases();
    }
  }, [status, fetchCases]);

  /**
   * Filtra casos por término de búsqueda
   * Memoizado para evitar recálculos innecesarios
   */
  const filteredCases = useMemo(() => {
    if (!debouncedSearchTerm) {
      return cases;
    }

    const searchLower = debouncedSearchTerm.toLowerCase();
    return cases.filter(
      (c) =>
        c.case_number.toLowerCase().includes(searchLower) ||
        c.title.toLowerCase().includes(searchLower) ||
        c.client_name.toLowerCase().includes(searchLower)
    );
  }, [cases, debouncedSearchTerm]);

  /**
   * Maneja la navegación a la página de detalle del caso
   */
  const handleNavigateToCase = useCallback(
    (caseId: string) => {
      router.push(`/admin/casos/${caseId}`);
    },
    [router]
  );

  // Loading state durante autenticación
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
            role="status"
            aria-label="Cargando"
          ></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirect si no está autenticado
  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

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
                  aria-hidden="true"
                />
                <input
                  type="text"
                  placeholder="Buscar por número, título o cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Buscar casos"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                aria-label="Filtrar por estado"
              >
                <option value="">Todos los estados</option>
                {CASE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {capitalizeFirst(status)}
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
              aria-label="Crear nuevo caso"
            >
              <FileText size={22} aria-hidden="true" />
              <span>Crear Caso</span>
            </Button>
          </div>
        </div>

        {/* Cases Table */}
        {loading ? (
          <div className="text-center py-12">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"
              role="status"
              aria-label="Cargando casos"
            ></div>
            <p className="text-gray-600">Cargando casos...</p>
          </div>
        ) : filteredCases.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay casos</h3>
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
                <FileText size={22} aria-hidden="true" />
                Crear Primer Caso
              </Button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <caption className="sr-only">
                  Tabla de casos legales. Total: {filteredCases.length} casos
                </caption>
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Título
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Líder Investigador
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Tipo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Prioridad
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Estatus
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCases.map((caseItem) => (
                    <tr
                      key={caseItem.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleNavigateToCase(caseItem.id)}
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
                          <span className="text-xs text-gray-500">{caseItem.client_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border-2 border-gray-200">
                            <User size={16} className="text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-sm text-gray-700">
                            {session?.user?.name || "Sin asignar"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">
                          {capitalizeFirst(caseItem.case_type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityBadgeStyle(
                            caseItem.priority
                          )}`}
                        >
                          {capitalizeFirst(caseItem.priority)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {formatDeadline(caseItem.deadline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadgeStyle(
                            caseItem.status
                          )}`}
                        >
                          {capitalizeFirst(caseItem.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          href={`/admin/casos/${caseItem.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary bg-primary/5 hover:bg-primary hover:text-white border border-primary/20 hover:border-primary rounded-lg transition-all duration-200"
                          aria-label={`Ver detalles del caso ${caseItem.case_number}`}
                        >
                          <Eye size={16} aria-hidden="true" />
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
