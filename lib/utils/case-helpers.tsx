import { AlertCircle, Clock } from "lucide-react";

/**
 * Estilos para badges de prioridad
 */
export const PRIORITY_BADGE_STYLES = {
  urgente: "bg-red-100 text-red-800 border-red-200",
  alta: "bg-orange-100 text-orange-800 border-orange-200",
  media: "bg-yellow-100 text-yellow-800 border-yellow-200",
  baja: "bg-blue-100 text-blue-800 border-blue-200",
} as const;

/**
 * Estilos para badges de estado
 */
export const STATUS_BADGE_STYLES = {
  activo: "bg-green-100 text-green-800 border-green-200",
  finalizado: "bg-blue-100 text-blue-800 border-blue-200",
  archivado: "bg-gray-100 text-gray-800 border-gray-200",
} as const;

/**
 * Obtiene las clases CSS para el badge de prioridad
 */
export function getPriorityBadgeStyle(priority: string): string {
  return PRIORITY_BADGE_STYLES[priority as keyof typeof PRIORITY_BADGE_STYLES] || PRIORITY_BADGE_STYLES.media;
}

/**
 * Obtiene las clases CSS para el badge de estado
 */
export function getStatusBadgeStyle(status: string): string {
  return STATUS_BADGE_STYLES[status as keyof typeof STATUS_BADGE_STYLES] || STATUS_BADGE_STYLES.activo;
}

/**
 * Capitaliza la primera letra de un string
 */
export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
