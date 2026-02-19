"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ImageUploader } from "./ImageUploader";
import { TagsInput } from "./TagsInput";
import { SlugPreview } from "./SlugPreview";
import { MarkdownEditor } from "./MarkdownEditor";
import { PublishModal } from "./PublishModal";
import { Button } from "@/components/ui/Button";
import type {
  BlogPostDB,
  CreateBlogPostInput,
  UpdateBlogPostInput,
  BlogPostCategory,
} from "@/lib/types/blog";

interface BlogPostFormProps {
  mode: "create" | "edit";
  initialData?: Partial<BlogPostDB & { tags?: string[] }>;
  postId?: string;
}

export function BlogPostForm({ mode, initialData, postId }: BlogPostFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"content" | "seo" | "config">("content");
  const [saving, setSaving] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featured_image: initialData?.featured_image || null,
    category: initialData?.category || ("" as BlogPostCategory),
    featured: initialData?.featured || false,
    meta_title: initialData?.meta_title || null,
    meta_description: initialData?.meta_description || null,
    keywords: initialData?.keywords || [],
    tags: initialData?.tags || [],
  });

  // Auto-generate slug when title changes (only in create mode)
  useEffect(() => {
    if (mode === "create" && formData.title && !formData.slug) {
      generateSlug(formData.title);
    }
  }, [formData.title, mode]);

  const generateSlug = async (title: string) => {
    try {
      const response = await fetch("/api/blog/generate-slug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const { slug } = await response.json();
        setFormData((prev) => ({ ...prev, slug }));
      }
    } catch (error) {
      console.error("Error generating slug:", error);
    }
  };

  const handleSaveDraft = async () => {
    await handleSubmit("draft");
  };

  const handlePublish = () => {
    setShowPublishModal(true);
  };

  const confirmPublish = async () => {
    setShowPublishModal(false);

    if (mode === "edit" && postId) {
      // Si estamos editando, usar el endpoint de publish
      await publishPost(postId);
    } else {
      // Si estamos creando, guardar y luego publicar
      await handleSubmit("published");
    }
  };

  const publishPost = async (id: string) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/blog/${id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "publish" }),
      });

      if (response.ok) {
        toast.success("Artículo publicado exitosamente");
        router.push("/admin/blog");
      } else {
        const data = await response.json();
        toast.error(data.error || "Error al publicar artículo");
      }
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Error al publicar artículo");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setSaving(true);

    try {
      // Validaciones básicas
      if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
        toast.error("Por favor completa todos los campos requeridos");
        setSaving(false);
        return;
      }

      const endpoint = mode === "create" ? "/api/blog" : `/api/blog/${postId}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const body: CreateBlogPostInput | UpdateBlogPostInput = {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        featured_image: formData.featured_image,
        category: formData.category,
        status: status, // Enviar status tanto en create como en edit
        featured: formData.featured,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        keywords: formData.keywords,
        tags: formData.tags,
      };

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();

        if (status === "published") {
          toast.success("Artículo publicado exitosamente");
          router.push("/admin/blog");
        } else if (mode === "create") {
          toast.success("Artículo creado exitosamente");
          // Redirigir a edición del nuevo post
          router.push(`/admin/blog/${data.id}`);
        } else {
          toast.success("Artículo actualizado exitosamente");
          // Recargar datos o redirigir a lista
          router.push("/admin/blog");
        }
      } else {
        const data = await response.json();
        toast.error(data.error || "Error al guardar artículo");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error al guardar artículo");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "content", label: "Contenido" },
    { id: "seo", label: "SEO" },
    { id: "config", label: "Configuración" },
  ];

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <nav className="flex gap-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                maxLength={255}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Título del artículo"
              />
            </div>

            {/* Slug Preview */}
            {formData.slug && (
              <SlugPreview
                slug={formData.slug}
                baseUrl={process.env.NEXT_PUBLIC_SITE_URL || "https://iprova-web.vercel.app"}
                onSlugChange={(slug) => setFormData({ ...formData, slug })}
                isEditable={mode === "create"}
              />
            )}

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extracto <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                required
                maxLength={300}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Resumen corto del artículo (máx. 300 caracteres)"
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {formData.excerpt.length} / 300
              </p>
            </div>

            {/* Content - Markdown Editor */}
            <MarkdownEditor
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />

            {/* Featured Image */}
            <ImageUploader
              currentImage={formData.featured_image}
              onUpload={(url) => setFormData({ ...formData, featured_image: url })}
              onRemove={() => setFormData({ ...formData, featured_image: null })}
            />

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as BlogPostCategory,
                  })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Seleccionar categoría</option>
                <option value="Derecho Penal">Derecho Penal</option>
                <option value="Derecho Laboral">Derecho Laboral</option>
                <option value="Derecho Corporativo">Derecho Corporativo</option>
                <option value="Investigación">Investigación</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <TagsInput
                tags={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Marcar como artículo destacado
              </label>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title
              </label>
              <input
                type="text"
                value={formData.meta_title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
                maxLength={60}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Título para SEO (máx. 60 caracteres)"
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {(formData.meta_title || "").length} / 60
              </p>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                value={formData.meta_description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meta_description: e.target.value })
                }
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Descripción para SEO (máx. 160 caracteres)"
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {(formData.meta_description || "").length} / 160
              </p>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (SEO)
              </label>
              <TagsInput
                tags={formData.keywords || []}
                onChange={(keywords) => setFormData({ ...formData, keywords })}
                placeholder="Agregar keyword y presionar Enter"
              />
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="space-y-6">
            {/* Display info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                  Tiempo de lectura
                </label>
                <p className="text-sm text-gray-900">
                  {initialData?.reading_time || "Auto-calculado"} minutos
                </p>
              </div>

              {mode === "edit" && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Vistas
                    </label>
                    <p className="text-sm text-gray-900">
                      {initialData?.views?.toLocaleString() || 0}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Creado
                    </label>
                    <p className="text-sm text-gray-900">
                      {initialData?.created_at
                        ? new Date(initialData.created_at).toLocaleString("es-ES")
                        : "-"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
                      Última actualización
                    </label>
                    <p className="text-sm text-gray-900">
                      {initialData?.updated_at
                        ? new Date(initialData.updated_at).toLocaleString("es-ES")
                        : "-"}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button
          onClick={() => router.push("/admin/blog")}
          variant="outline"
          disabled={saving}
        >
          Cancelar
        </Button>

        <div className="flex gap-3">
          <Button
            onClick={handleSaveDraft}
            variant="outline"
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar Borrador"}
          </Button>

          <Button
            onClick={handlePublish}
            variant="primary"
            disabled={saving}
          >
            {saving ? "Procesando..." : mode === "edit" ? "Publicar" : "Crear y Publicar"}
          </Button>
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <PublishModal
          post={formData}
          onConfirm={confirmPublish}
          onCancel={() => setShowPublishModal(false)}
          loading={saving}
        />
      )}
    </form>
  );
}
