"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPostForm } from "@/components/admin/blog/BlogPostForm";
import type { BlogPostDB } from "@/lib/types/blog";

export default function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { data: session, status } = useSession();
  const [postData, setPostData] = useState<
    (BlogPostDB & { tags?: string[] }) | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setPostId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const fetchPost = async () => {
    if (!postId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${postId}`);

      if (response.ok) {
        const data = await response.json();
        setPostData(data);
      } else {
        toast.error("Error al cargar artículo");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Error al cargar artículo");
    } finally {
      setLoading(false);
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

  if (!postData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Artículo no encontrado</p>
          <Link
            href="/admin/blog"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Volver a artículos
          </Link>
        </div>
      </div>
    );
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
            Editar Artículo
          </h1>
          <p className="text-sm text-gray-600 mt-1">{postData.title}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-8">
        <BlogPostForm
          mode="edit"
          initialData={postData}
          postId={postId || undefined}
        />
      </main>
    </div>
  );
}
