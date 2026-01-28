/**
 * Results Section Content
 * Contenido de la sección de resultados y casos destacados
 */

import { TrendingUp, CheckCircle, Briefcase, Users, type LucideIcon } from "lucide-react";

export interface GlobalStat {
  icon: LucideIcon;
  number: string;
  label: string;
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
  title: "Nuestros Resultados Hablan por Sí Solos",
  description:
    "En iPROVA nos medimos por resultados. Cada caso es una oportunidad para demostrar nuestro compromiso con la excelencia legal y la defensa inquebrantable de nuestros clientes.",
  globalStats: [
    {
      icon: TrendingUp,
      number: "500+",
      label: "CASOS GANADOS",
    },
    {
      icon: CheckCircle,
      number: "93%",
      label: "TASA DE ÉXITO",
    },
    {
      icon: Briefcase,
      number: "$25M+",
      label: "GANADO PARA CLIENTES",
    },
    {
      icon: Users,
      number: "20+",
      label: "AÑOS DE EXPERIENCIA",
    },
  ] as GlobalStat[],
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
    title: "Ejecutivo Acusado de Fraude por $2.5M",
    description:
      "Un alto ejecutivo enfrentaba cargos por presunto fraude financiero. A través de una investigación exhaustiva y defensa estratégica, logramos demostrar su inocencia.",
    result: "RESULTADO",
    resultDetail: "Cargos completamente desestimados - Libertad total",
    testimonial:
      "Gracias a iPROVA recuperé mi libertad y mi reputación. Sin ustedes, hoy estaría preso injustamente. Su profesionalismo salvó mi vida.",
    client: "Cliente iPROVA",
    year: "2025",
  } as FeaturedCase,
  cta: {
    label: "Ver Más Casos de Éxito",
    href: "#contacto",
  },
} as const;
