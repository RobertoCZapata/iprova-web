"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Users, Construction } from "lucide-react";

export default function ClientesPage() {
  const { status } = useSession();

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
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-sm text-gray-600 mt-1">
            Gestión de clientes de iPROVA
          </p>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
            <Users size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Módulo en Desarrollo</h2>
          <p className="text-gray-600 mb-4">
            La gestión de clientes estará disponible próximamente
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Construction size={16} />
            <span>En construcción</span>
          </div>
        </div>
      </main>
    </div>
  );
}
