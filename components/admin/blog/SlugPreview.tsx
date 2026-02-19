"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Edit2, Check, X } from "lucide-react";

interface SlugPreviewProps {
  slug: string;
  baseUrl: string;
  onSlugChange?: (slug: string) => void;
  isEditable?: boolean;
}

export function SlugPreview({
  slug,
  baseUrl,
  onSlugChange,
  isEditable = true,
}: SlugPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(slug);

  const handleSave = () => {
    // Validar formato de slug
    const cleanSlug = editValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    if (!cleanSlug) {
      toast.error("El slug no puede estar vacío");
      return;
    }

    if (onSlugChange) {
      onSlugChange(cleanSlug);
    }
    setEditValue(cleanSlug);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(slug);
    setIsEditing(false);
  };

  const fullUrl = `${baseUrl}/blog/${slug}`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        URL del artículo
      </label>

      {!isEditing ? (
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex-1 overflow-hidden">
            <p className="text-xs text-gray-500 mb-1">Vista previa:</p>
            <p className="text-sm text-primary font-mono truncate">{fullUrl}</p>
          </div>

          {isEditable && onSlugChange && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded transition-colors"
              title="Editar slug"
            >
              <Edit2 size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {baseUrl}/blog/
            </span>
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
              placeholder="slug-del-articulo"
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-sm font-semibold rounded hover:bg-primary/90 transition-colors"
            >
              <Check size={14} />
              Guardar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-semibold rounded hover:bg-gray-300 transition-colors"
            >
              <X size={14} />
              Cancelar
            </button>
          </div>

          <p className="text-xs text-gray-500">
            Solo letras minúsculas, números y guiones. Los espacios se
            convertirán en guiones automáticamente.
          </p>
        </div>
      )}
    </div>
  );
}
