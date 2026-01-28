/**
 * Statistics and Testimonials
 * Métricas de éxito y testimonios
 */

import {
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Users,
  Calendar,
  type LucideIcon,
} from "lucide-react";

// Statistics / Success Metrics
export interface Statistic {
  value: string;
  label: string;
  icon: LucideIcon;
  suffix?: string; // Para porcentajes o símbolos
}

export const statistics: Statistic[] = [
  {
    value: "95",
    label: "Porcentaje de Éxito",
    icon: TrendingUp,
    suffix: "%",
  },
  {
    value: "500",
    label: "Total de Casos",
    icon: Briefcase,
    suffix: "+",
  },
  {
    value: "475",
    label: "Casos Exitosos",
    icon: CheckCircle2,
    suffix: "+",
  },
  {
    value: "98",
    label: "Clientes Satisfechos",
    icon: Users,
    suffix: "%",
  },
  {
    value: "20",
    label: "Años de Experiencia",
    icon: Calendar,
    suffix: "+",
  },
] as const;

// Testimonials / Social Proof
export interface Testimonial {
  case: string;
  result: string;
  initials: string;
  type: "penal" | "civil" | "corporativo" | "investigacion";
}

export const testimonials: Testimonial[] = [
  {
    case: "Caso de Derecho Penal",
    result: "Absuelto",
    initials: "J.M.",
    type: "penal",
  },
  {
    case: "Investigación Corporativa",
    result: "Caso resuelto exitosamente",
    initials: "C.F.",
    type: "corporativo",
  },
  {
    case: "Defensa de Lesiones",
    result: "Indemnización obtenida",
    initials: "A.R.",
    type: "civil",
  },
  {
    case: "Investigación Privada",
    result: "Evidencia clave encontrada",
    initials: "M.P.",
    type: "investigacion",
  },
] as const;
