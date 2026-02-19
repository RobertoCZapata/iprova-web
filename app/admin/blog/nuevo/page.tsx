"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";

export default function NewBlogPostPage() {
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
      <header className="bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-semibold mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a artículos
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Nuevo Artículo
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Crea un nuevo artículo para el blog de iPROVA
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        <BlogPostForm mode="create" />
      </main>
    </div>
  );
}
