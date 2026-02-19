"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Info } from "lucide-react";
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

// Componente helper para textos de ayuda
function HelpText({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-1.5 mt-2 text-xs text-gray-600">
      <Info size={14} className="text-primary mt-0.5 flex-shrink-0" />
      <span>{children}</span>
    </p>
  );
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
        status: status,
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
          router.push(`/admin/blog/${data.id}`);
        } else {
          toast.success("Artículo actualizado exitosamente");
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
                Título del Artículo <span className="text-red-500">*</span>
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
                placeholder="Ej: Nuevas Reformas en Derecho Laboral 2024"
              />
              <HelpText>
                Escribe un título claro y atractivo que resuma el tema del artículo. Este será el encabezado principal que verán los lectores.
              </HelpText>
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
                placeholder="Ej: Conoce las principales reformas laborales aprobadas en 2024 y cómo afectan a empleadores y trabajadores en Colombia..."
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {formData.excerpt.length} / 300
              </p>
              <HelpText>
                Resumen breve que aparece en las tarjetas del blog y en los resultados de búsqueda. Debe captar la atención y explicar de qué trata el artículo.
              </HelpText>
            </div>

            {/* Content - Markdown Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido del Artículo <span className="text-red-500">*</span>
              </label>
              <MarkdownEditor
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
              />
              <HelpText>
                Escribe el contenido completo usando Markdown. <strong>Tips:</strong> Usa ## para subtítulos, **texto** para negritas, *texto* para cursivas, - para listas.
              </HelpText>
            </div>

            {/* Featured Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen Destacada
              </label>
              <ImageUploader
                currentImage={formData.featured_image}
                onUpload={(url) => setFormData({ ...formData, featured_image: url })}
                onRemove={() => setFormData({ ...formData, featured_image: null })}
              />
              <HelpText>
                Imagen principal del artículo. Aparece en las tarjetas del blog y al abrir el artículo. Recomendado: 1200x630px en formato JPG o PNG.
              </HelpText>
            </div>

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
              <HelpText>
                Clasifica el artículo según su área temática. Los lectores pueden filtrar artículos por categoría en el blog.
              </HelpText>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (Etiquetas)
              </label>
              <TagsInput
                tags={formData.tags}
                onChange={(tags) => setFormData({ ...formData, tags })}
              />
              <HelpText>
                Palabras clave específicas del artículo. <strong>Ejemplos:</strong> reforma, 2024, contrato laboral, jurisprudencia. Máximo 10 tags.
              </HelpText>
            </div>

            {/* Featured */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary mt-0.5"
                />
                <div className="flex-1">
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-900 cursor-pointer">
                    Marcar como artículo destacado
                  </label>
                  <p className="text-xs text-gray-700 mt-1">
                    Los artículos destacados aparecen en la sección principal del blog y tienen prioridad visual para los lectores.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            {/* SEO Header */}
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-primary mb-1">
                Optimización para Motores de Búsqueda (SEO)
              </h3>
              <p className="text-xs text-gray-700">
                Estos campos ayudan a que tu artículo aparezca mejor posicionado en Google y otras búsquedas. Son opcionales, pero muy recomendados.
              </p>
            </div>

            {/* Meta Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title (Título SEO)
              </label>
              <input
                type="text"
                value={formData.meta_title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meta_title: e.target.value })
                }
                maxLength={60}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Ej: Reformas Laborales 2024 Colombia - Guía Completa | iPROVA"
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {(formData.meta_title || "").length} / 60
              </p>
              <HelpText>
                Este es el título que aparece en los resultados de Google. Incluye palabras clave y hazlo atractivo. Si no lo completas, se usa el título del artículo.
              </HelpText>
            </div>

            {/* Meta Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description (Descripción SEO)
              </label>
              <textarea
                value={formData.meta_description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, meta_description: e.target.value })
                }
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Ej: Descubre las nuevas reformas laborales en Colombia 2024. Análisis completo de cambios en contratos, despidos y prestaciones sociales por expertos de iPROVA."
              />
              <p className="text-xs text-gray-500 text-right mt-1">
                {(formData.meta_description || "").length} / 160
              </p>
              <HelpText>
                Descripción que aparece debajo del título en Google. Debe ser persuasiva e incluir palabras clave relevantes. Si no la completas, se usa el extracto.
              </HelpText>
            </div>

            {/* Keywords */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (Palabras Clave SEO)
              </label>
              <TagsInput
                tags={formData.keywords || []}
                onChange={(keywords) => setFormData({ ...formData, keywords })}
                placeholder="Agregar keyword y presionar Enter"
              />
              <HelpText>
                Palabras clave por las que quieres que se encuentre el artículo en buscadores. <strong>Ejemplos:</strong> derecho laboral colombia, reforma laboral 2024, despido injustificado.
              </HelpText>
            </div>

            {/* SEO Preview */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Vista Previa en Google:
              </p>
              <div className="space-y-1">
                <p className="text-blue-700 text-lg hover:underline cursor-pointer">
                  {formData.meta_title || formData.title || "Tu título aquí"}
                </p>
                <p className="text-green-700 text-xs">
                  iprova.com.co › blog › {formData.slug || "slug-del-articulo"}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {formData.meta_description || formData.excerpt || "Tu descripción aparecerá aquí..."}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "config" && (
          <div className="space-y-6">
            {/* Info Header */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Información del Artículo
              </h3>
              <p className="text-xs text-gray-600">
                Datos automáticos y estadísticas del artículo. Esta información es solo de lectura.
              </p>
            </div>

            {/* Display info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  ⏱️ Tiempo de lectura
                </label>
                <p className="text-2xl font-bold text-primary">
                  {initialData?.reading_time || "~5"} <span className="text-sm font-normal text-gray-600">minutos</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Calculado automáticamente según la cantidad de palabras
                </p>
              </div>

              {mode === "edit" && (
                <>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      👁️ Vistas
                    </label>
                    <p className="text-2xl font-bold text-primary">
                      {initialData?.views?.toLocaleString() || 0}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Número de veces que se ha leído este artículo
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      📅 Fecha de creación
                    </label>
                    <p className="text-sm font-semibold text-gray-900">
                      {initialData?.created_at
                        ? new Date(initialData.created_at).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })
                        : "-"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {initialData?.created_at
                        ? new Date(initialData.created_at).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : ""}
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                      🔄 Última actualización
                    </label>
                    <p className="text-sm font-semibold text-gray-900">
                      {initialData?.updated_at
                        ? new Date(initialData.updated_at).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                          })
                        : "-"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {initialData?.updated_at
                        ? new Date(initialData.updated_at).toLocaleTimeString("es-ES", {
                            hour: "2-digit",
                            minute: "2-digit"
                          })
                        : ""}
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
