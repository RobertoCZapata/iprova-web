/**
 * Results Section Content
 * Contenido de la sección de indicadores de trabajo
 */

import { Briefcase, Users, FileCheck, RotateCcw, type LucideIcon } from "lucide-react";

export interface WorkIndicator {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AreaResult {
  title: string;
  cases: string;
  success: string;
  label?: string; // Para casos especiales como "empresas | retención"
}

export interface FeaturedCase {
  title: string;
  description: string;
  result: string;
  resultDetail: string;
  testimonial: string;
  client: string;
  year: string;
}

export const resultsContent = {
  title: "Indicadores de Trabajo",
  description:
    "Medimos nuestra gestión por método, oportunidad y calidad técnica.",
  workIndicators: [
    {
      icon: Briefcase,
      title: "Casos gestionados",
      description: "Defensa e investigación en asuntos penales, disciplinarios y sancionatorios.",
    },
    {
      icon: Users,
      title: "Experiencia combinada",
      description: "ZAPATA & PEDRAZA: más de dos décadas de trayectoria acumulada.",
    },
    {
      icon: FileCheck,
      title: "Gestión probatoria",
      description: "Plan de acreditación, trazabilidad documental y preparación de audiencias.",
    },
    {
      icon: RotateCcw,
      title: "Clientes recurrentes",
      description: "Relaciones de largo plazo basadas en confianza y consistencia profesional.",
    },
  ] as WorkIndicator[],
  areaResults: [
    {
      title: "Defensa Judicial",
      cases: "150",
      success: "92%",
    },
    {
      title: "Lesiones Personales",
      cases: "200",
      success: "94%",
    },
    {
      title: "Asesoría Corporativa",
      cases: "100",
      success: "98%",
      label: "empresas | retención",
    },
  ] as AreaResult[],
  featuredCase: {
    title: "Ejecutivo investigado por presunto fraude financiero",
    description:
      "El cliente enfrentaba una investigación compleja con alto impacto reputacional. Diseñamos teoría del caso, delimitamos hechos jurídicamente relevantes y estructuramos un plan de acreditación probatoria. La defensa se apoyó en análisis documental y verificación de información para controvertir la hipótesis de la contraparte y preparar la audiencia.",
    result: "RESULTADO",
    resultDetail: "Cargos completamente desestimados - Libertad total",
    testimonial:
      "Me ayudaron a entender el caso, a organizar la evidencia y a tomar decisiones con claridad. Su método y discreción marcaron la diferencia.",
    client: "Cliente iPROVA (autorizado)",
    year: "2025",
  } as FeaturedCase,
  cta: {
    label: "Ver Más Casos de Éxito",
    href: "#contacto",
  },
} as const;
