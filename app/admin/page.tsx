"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Users,
  FileText,
} from "lucide-react";
import { Case } from "@/types/case";

interface DashboardStats {
  totalCases: number;
  activeCases: number;
  completedCases: number;
  pendingTasks: number;
  urgentTasks: number;
}

interface UpcomingTask {
  id: string;
  title: string;
  caseNumber: string;
  caseTitle: string;
  dueDate: string;
  priority: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<DashboardStats>({
    totalCases: 0,
    activeCases: 0,
    completedCases: 0,
    pendingTasks: 0,
    urgentTasks: 0,
  });
  const [recentCases, setRecentCases] = useState<Case[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetchDashboardData();
    }
  }, [status]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await fetch("/api/dashboard/stats");
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent cases (últimos 5)
      const casesResponse = await fetch("/api/cases");
      if (casesResponse.ok) {
        const casesData = await casesResponse.json();
        setRecentCases(casesData.slice(0, 5));
      }

      // Fetch upcoming tasks
      const upcomingResponse = await fetch("/api/dashboard/upcoming");
      if (upcomingResponse.ok) {
        const upcomingData = await upcomingResponse.json();
        setUpcomingTasks(upcomingData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysUntil = (dueDate: string) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffMs = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / 86400000);

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays < 7) return `En ${diffDays} días`;
    if (diffDays < 14) return "Próxima semana";
    return `En ${Math.ceil(diffDays / 7)} semanas`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgente":
        return "bg-red-50 text-red-600";
      case "alta":
        return "bg-orange-50 text-orange-600";
      case "media":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  if (status === "loading" || loading) {
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

  const getTimeAgo = (date: string) => {
    const now = new Date();
    const updated = new Date(date);
    const diffMs = now.getTime() - updated.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Hace ${diffMins} minutos`;
    if (diffHours < 24) return `Hace ${diffHours} horas`;
    if (diffDays === 1) return "Ayer";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return updated.toLocaleDateString("es-CO");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Bienvenido de nuevo, {session?.user?.name?.split(" ")[0]}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Cases */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Briefcase className="text-blue-600" size={24} />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Total
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.totalCases}
            </h3>
            <p className="text-sm text-gray-600">Casos Totales</p>
          </div>

          {/* Active Cases */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Clock className="text-green-600" size={24} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                Activos
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.activeCases}
            </h3>
            <p className="text-sm text-gray-600">Casos Activos</p>
            {stats.totalCases > 0 && (
              <div className="flex items-center mt-3 text-xs text-gray-500">
                <span>
                  {Math.round((stats.activeCases / stats.totalCases) * 100)}% del
                  total
                </span>
              </div>
            )}
          </div>

          {/* Completed Cases */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <CheckCircle2 className="text-purple-600" size={24} />
              </div>
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                Finalizados
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.completedCases}
            </h3>
            <p className="text-sm text-gray-600">Casos Completados</p>
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <span>Este mes</span>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="text-orange-600" size={24} />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
                Pendientes
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {stats.pendingTasks}
            </h3>
            <p className="text-sm text-gray-600">Tareas Pendientes</p>
            {stats.urgentTasks > 0 && (
              <div className="flex items-center mt-3 text-xs text-orange-600">
                <AlertCircle size={14} className="mr-1" />
                <span>
                  {stats.urgentTasks}{" "}
                  {stats.urgentTasks === 1
                    ? "requiere atención"
                    : "requieren atención"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Casos Recientes
                  </h2>
                  <Link
                    href="/admin/casos"
                    className="text-sm text-primary hover:text-primary-dark font-medium"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentCases.length === 0 ? (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <Briefcase size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No hay casos registrados</p>
                    <Link
                      href="/admin/casos"
                      className="text-sm text-primary hover:text-primary-dark font-medium mt-2 inline-block"
                    >
                      Crear primer caso
                    </Link>
                  </div>
                ) : (
                  recentCases.map((case_) => (
                    <Link
                      key={case_.id}
                      href={`/admin/casos/${case_.id}`}
                      className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-mono font-semibold text-gray-900">
                              {case_.case_number}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                case_.status === "activo"
                                  ? "bg-green-100 text-green-800"
                                  : case_.status === "finalizado"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {case_.status.charAt(0).toUpperCase() +
                                case_.status.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium text-gray-900 mb-1">
                            {case_.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center">
                              <Users size={12} className="mr-1" />
                              {case_.client_name}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {getTimeAgo(case_.updated_at)}
                            </span>
                          </div>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Upcoming */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h2>
              <div className="space-y-3">
                <Link
                  href="/admin/casos"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:shadow-lg transition-all">
                    <Briefcase
                      size={20}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nuevo Caso</p>
                    <p className="text-xs text-gray-500">Crear caso legal</p>
                  </div>
                </Link>
                <Link
                  href="/admin/blog"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:shadow-lg transition-all">
                    <FileText
                      size={20}
                      className="text-primary group-hover:text-white transition-colors"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nuevo Artículo</p>
                    <p className="text-xs text-gray-500">Publicar contenido</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Próximas Fechas
              </h2>
              <div className="space-y-3">
                {upcomingTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar size={40} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No hay tareas próximas</p>
                  </div>
                ) : (
                  upcomingTasks.map((task) => {
                    const priorityColors = {
                      urgente: { bg: "bg-red-50", text: "text-red-600" },
                      alta: { bg: "bg-orange-50", text: "text-orange-600" },
                      media: { bg: "bg-yellow-50", text: "text-yellow-600" },
                      baja: { bg: "bg-blue-50", text: "text-blue-600" },
                    };
                    const colors =
                      priorityColors[
                        task.priority as keyof typeof priorityColors
                      ] || priorityColors.media;

                    return (
                      <div key={task.id} className="flex items-start space-x-3">
                        <div className={`p-2 ${colors.bg} rounded-lg`}>
                          <Calendar size={16} className={colors.text} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {task.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {task.caseNumber} • {getDaysUntil(task.dueDate)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
