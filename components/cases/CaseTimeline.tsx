"use client";

import { CaseUpdate } from "@/types/case-update";
import {
  FileText,
  Calendar,
  CheckCircle,
  DollarSign,
  RefreshCw,
  FileCheck,
  Clock,
  Edit2,
  Trash2,
} from "lucide-react";

interface CaseTimelineProps {
  updates: CaseUpdate[];
  showEmpty?: boolean;
  isAdmin?: boolean;
  onEdit?: (update: CaseUpdate) => void;
  onDelete?: (updateId: string) => void;
}

export function CaseTimeline({
  updates,
  showEmpty = true,
  isAdmin = false,
  onEdit,
  onDelete,
}: CaseTimelineProps) {
  const getUpdateIcon = (type: string) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case "documento":
        return <FileCheck className={iconClass} />;
      case "audiencia":
        return <Calendar className={iconClass} />;
      case "resolucion":
        return <CheckCircle className={iconClass} />;
      case "pago":
        return <DollarSign className={iconClass} />;
      case "estado":
        return <RefreshCw className={iconClass} />;
      default:
        return <FileText className={iconClass} />;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case "documento":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "audiencia":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "resolucion":
        return "bg-green-100 text-green-700 border-green-200";
      case "pago":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "estado":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getUpdateTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      general: "General",
      documento: "Documento",
      audiencia: "Audiencia",
      resolucion: "Resolución",
      pago: "Pago",
      estado: "Cambio de Estado",
      otro: "Otro",
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return "Hace menos de una hora";
    } else if (diffHours < 24) {
      return `Hace ${diffHours} hora${diffHours !== 1 ? "s" : ""}`;
    } else if (diffDays === 1) {
      return "Ayer";
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString("es-CO", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  if (updates.length === 0 && !showEmpty) {
    return null;
  }

  if (updates.length === 0 && showEmpty) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <Clock size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Sin actualizaciones aún
        </h3>
        <p className="text-gray-500">
          Las actualizaciones del caso aparecerán aquí
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Clock size={20} className="text-primary" />
        Línea de Tiempo
      </h3>

      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Actualizaciones */}
        <div className="space-y-6">
          {updates.map((update, index) => (
            <div key={update.id} className="relative pl-14">
              {/* Icono */}
              <div
                className={`absolute left-0 top-0 w-12 h-12 rounded-full border-2 flex items-center justify-center ${getUpdateColor(
                  update.update_type
                )}`}
              >
                {getUpdateIcon(update.update_type)}
              </div>

              {/* Contenido */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getUpdateColor(
                          update.update_type
                        )}`}
                      >
                        {getUpdateTypeLabel(update.update_type)}
                      </span>
                      {!update.is_visible_to_client && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                          Privado
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {update.title}
                    </h4>
                  </div>
                  <time className="text-sm text-gray-500 whitespace-nowrap">
                    {formatDate(update.created_at)}
                  </time>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-3">
                  {update.description}
                </p>

                {/* Footer */}
                <div className="border-t pt-2 flex items-center justify-between">
                  {update.admin_name && (
                    <div className="text-xs text-gray-500">
                      Por: <span className="font-medium">{update.admin_name}</span>
                    </div>
                  )}

                  {/* Botones de acción (solo para admins) */}
                  {isAdmin && (onEdit || onDelete) && (
                    <div className="flex items-center gap-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(update)}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded transition-colors"
                          title="Editar actualización"
                        >
                          <Edit2 size={12} />
                          Editar
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => {
                            if (confirm("¿Estás seguro de eliminar esta actualización?")) {
                              onDelete(update.id);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded transition-colors"
                          title="Eliminar actualización"
                        >
                          <Trash2 size={12} />
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
