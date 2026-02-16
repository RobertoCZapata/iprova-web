"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FileText, Briefcase, LogOut, User } from "lucide-react";

export default function AdminDashboard() {
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Panel de Administración
              </h1>
              <p className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                <User size={16} className="text-primary" />
                <span>
                  Bienvenido, <strong>{session?.user?.name}</strong>
                </span>
              </p>
            </div>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            ¿Qué deseas administrar?
          </h2>
          <p className="text-gray-600">
            Selecciona el módulo que necesitas gestionar
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card: Gestión de Casos */}
          <Link
            href="/admin/casos"
            className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Briefcase
                    size={40}
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Principal
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                Gestión de CASOS
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Administra casos legales, agrega notas del abogado y asistente,
                crea tareas, sube documentos y controla el estado de cada caso.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Crear y editar casos
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Notas del abogado y asistente
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Gestión de tareas y documentos
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Finalizar y archivar casos
                </li>
              </ul>

              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Ir a Casos</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* Card: Gestión de Artículos (Blog) */}
          <Link
            href="/admin/blog"
            className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-primary"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="bg-primary/10 p-4 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <FileText
                    size={40}
                    className="text-primary group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Marketing
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                Gestión de ARTÍCULOS
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                Crea, edita y publica artículos en el blog de iPROVA.
                Gestiona contenido legal educativo para atraer clientes.
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Crear artículos con editor visual
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Subir imágenes destacadas
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Categorías y etiquetas
                </li>
                <li className="flex items-center text-sm text-gray-700">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                  Publicación automática en web
                </li>
              </ul>

              <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span>Ir a Artículos</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Stats Summary (Optional) */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Resumen del Sistema
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">✓</p>
              <p className="text-sm text-gray-600 mt-1">Autenticación</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-400">-</p>
              <p className="text-sm text-gray-600 mt-1">Casos Activos</p>
              <p className="text-xs text-gray-500">(Fase 3)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-400">-</p>
              <p className="text-sm text-gray-600 mt-1">Artículos</p>
              <p className="text-xs text-gray-500">(Fase 2)</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{session?.user?.name?.split(" ")[0]}</p>
              <p className="text-sm text-gray-600 mt-1">Usuario</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
