import { AlertCircle, Clock } from "lucide-react";

/**
 * Constantes de tiempo
 */
export const MS_PER_SECOND = 1000;
export const MS_PER_MINUTE = MS_PER_SECOND * 60;
export const MS_PER_HOUR = MS_PER_MINUTE * 60;
export const MS_PER_DAY = MS_PER_HOUR * 24;

/**
 * Umbrales para deadlines
 */
export const DEADLINE_THRESHOLDS = {
  OVERDUE: 0,
  URGENT: 3,
  SOON: 7,
} as const;

/**
 * Interfaz para el resultado del formato de deadline
 */
export interface FormattedDeadline {
  text: string;
  colorClass: string;
  icon?: React.ReactNode;
  daysRemaining: number;
}

/**
 * Formatea un deadline mostrando la fecha y aplicando estilos según urgencia
 * @param deadline - String de fecha ISO o undefined
 * @returns JSX con fecha formateada y estilos
 */
export function formatDeadline(deadline?: string): React.ReactNode {
  if (!deadline) {
    return <span className="text-gray-400">Sin fecha</span>;
  }

  const date = new Date(deadline);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffMs = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / MS_PER_DAY);

  let colorClass = "text-gray-700";
  let icon: React.ReactNode = null;

  if (diffDays < DEADLINE_THRESHOLDS.OVERDUE) {
    colorClass = "text-red-600 font-semibold";
    icon = <AlertCircle size={14} className="inline mr-1" />;
  } else if (diffDays <= DEADLINE_THRESHOLDS.URGENT) {
    colorClass = "text-orange-600 font-semibold";
    icon = <Clock size={14} className="inline mr-1" />;
  } else if (diffDays <= DEADLINE_THRESHOLDS.SOON) {
    colorClass = "text-yellow-600";
  }

  return (
    <span className={colorClass}>
      {icon}
      {date.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>
  );
}

/**
 * Calcula los días restantes hasta un deadline
 * @param deadline - String de fecha ISO
 * @returns Número de días (negativo si ya pasó)
 */
export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);

  const diffMs = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diffMs / MS_PER_DAY);
}
