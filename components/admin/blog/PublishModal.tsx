"use client";

import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { BlogPostDB } from "@/lib/types/blog";

interface PublishModalProps {
  post: Partial<BlogPostDB>;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

interface ValidationItem {
  label: string;
  valid: boolean;
  required: boolean;
}

export function PublishModal({
  post,
  onConfirm,
  onCancel,
  loading = false,
}: PublishModalProps) {
  // Validaciones
  const validations: ValidationItem[] = [
    {
      label: "Título completo",
      valid: !!post.title && post.title.length > 0,
      required: true,
    },
    {
      label: "Extracto presente",
      valid: !!post.excerpt && post.excerpt.length > 0,
      required: true,
    },
    {
      label: "Contenido (mínimo 50 caracteres)",
      valid: !!post.content && post.content.length >= 50,
      required: true,
    },
    {
      label: "Categoría seleccionada",
      valid: !!post.category,
      required: true,
    },
    {
      label: "Imagen destacada",
      valid: !!post.featured_image,
      required: false, // Recomendado pero no bloqueante
    },
    {
      label: "Meta descripción (SEO)",
      valid: !!post.meta_description && post.meta_description.length > 0,
      required: false, // Recomendado pero no bloqueante
    },
  ];

  const requiredValidations = validations.filter((v) => v.required);
  const optionalValidations = validations.filter((v) => !v.required);

  const allRequiredValid = requiredValidations.every((v) => v.valid);
  const canPublish = allRequiredValid;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Confirmar Publicación
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Verifica que todo esté listo antes de publicar
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Required validations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <span className="text-red-500">*</span>
              Campos Requeridos
            </h3>
            <div className="space-y-2">
              {requiredValidations.map((validation, index) => (
                <div key={index} className="flex items-center gap-2">
                  {validation.valid ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-600 flex-shrink-0"
                    />
                  ) : (
                    <XCircle
                      size={16}
                      className="text-red-600 flex-shrink-0"
                    />
                  )}
                  <span
                    className={`text-sm ${
                      validation.valid ? "text-gray-700" : "text-red-600"
                    }`}
                  >
                    {validation.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Optional validations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">
              Recomendado (opcional)
            </h3>
            <div className="space-y-2">
              {optionalValidations.map((validation, index) => (
                <div key={index} className="flex items-center gap-2">
                  {validation.valid ? (
                    <CheckCircle2
                      size={16}
                      className="text-green-600 flex-shrink-0"
                    />
                  ) : (
                    <AlertCircle
                      size={16}
                      className="text-orange-500 flex-shrink-0"
                    />
                  )}
                  <span
                    className={`text-sm ${
                      validation.valid ? "text-gray-700" : "text-orange-600"
                    }`}
                  >
                    {validation.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          {!canPublish && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Debes completar todos los campos requeridos antes de publicar.
              </p>
            </div>
          )}

          {/* Success message */}
          {canPublish && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                ✓ Listo para publicar
              </p>
              <p className="text-xs text-green-700 mt-1">
                El artículo será visible públicamente una vez publicado.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-center gap-4 rounded-b-lg">
          <Button
            onClick={onCancel}
            variant="outline"
            disabled={loading}
            className="min-w-[140px]"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            variant="primary"
            disabled={!canPublish || loading}
            className="min-w-[140px]"
          >
            {loading ? "Publicando..." : "Publicar Ahora"}
          </Button>
        </div>
      </div>
    </div>
  );
}
