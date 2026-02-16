"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Briefcase } from "lucide-react";

export default function AdminCasosPage() {
  const { data: session, status } = useSession();

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="text-sm font-medium">Volver al Dashboard</span>
              </Link>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Gestión de Casos
              </h1>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              size="sm"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-4">
              <Briefcase size={40} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Módulo de Gestión de Casos
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Este módulo será implementado en la <strong>Fase 3</strong>
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Funcionalidades Planificadas:
              </h3>
              <ul className="text-left space-y-2 text-blue-800">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Crear y editar casos legales</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Agregar notas del abogado</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Agregar notas del asistente</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Gestión de tareas pendientes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Subir y gestionar documentos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Marcar casos como finalizados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  <span>Portal para clientes (consulta con código)</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Estado Actual del Proyecto
              </h3>
              <div className="space-y-2 text-left text-green-800">
                <p className="flex items-center">
                  <span className="text-green-600 mr-2">✅</span>
                  <span><strong>Fase 1:</strong> Sistema de Autenticación - Completado</span>
                </p>
                <p className="flex items-center">
                  <span className="text-yellow-600 mr-2">🔄</span>
                  <span><strong>Fase 2:</strong> Blog con CRUD - En progreso</span>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-400 mr-2">⏳</span>
                  <span><strong>Fase 3:</strong> Gestión de Casos - Pendiente</span>
                </p>
                <p className="flex items-center">
                  <span className="text-gray-400 mr-2">⏳</span>
                  <span><strong>Fase 4:</strong> Portal de Clientes - Pendiente</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/admin">
              <Button variant="primary" size="lg">
                Volver al Dashboard Principal
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
