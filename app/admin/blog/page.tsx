"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, FileText, Wrench } from "lucide-react";

export default function AdminBlogPage() {
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
                Gestión de Artículos
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
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-12 text-center border border-gray-100">
          {/* Animated Icon */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full">
              <FileText size={60} className="text-primary" />
              <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2 shadow-lg animate-bounce">
                <Wrench size={20} className="text-white" />
              </div>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Módulo en Construcción
          </h2>

          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl text-gray-600 mb-4">
              Estamos trabajando en el sistema de gestión de artículos para el blog
            </p>
            <p className="text-gray-500">
              Este módulo incluirá un editor completo para crear y publicar contenido legal educativo
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Editor Visual</h4>
                  <p className="text-sm text-gray-600">Markdown con vista previa en tiempo real</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Gestión de Imágenes</h4>
                  <p className="text-sm text-gray-600">Upload y optimización automática</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">SEO Optimizado</h4>
                  <p className="text-sm text-gray-600">Metadatos y slugs automáticos</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 mb-1">Categorización</h4>
                  <p className="text-sm text-gray-600">Etiquetas y categorías flexibles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Priority Notice */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 text-left">
                <h3 className="text-sm font-semibold text-blue-900 mb-1">
                  Prioridad Actual: Sistema de Casos
                </h3>
                <p className="text-sm text-blue-800">
                  Nos estamos enfocando primero en el sistema de gestión de casos legales,
                  que es el core del negocio. El módulo de blog se implementará en la Fase 2.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/admin">
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Volver al Dashboard
              </Button>
            </Link>
            <Link href="/admin/casos">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Ir a Gestión de Casos
              </Button>
            </Link>
          </div>

          {/* Blog Public Link */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Mientras tanto, el blog público sigue funcionando
            </p>
            <Link
              href="/blog"
              target="_blank"
              className="text-primary hover:text-primary-light font-medium text-sm inline-flex items-center space-x-1"
            >
              <span>Ver Blog Público</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
