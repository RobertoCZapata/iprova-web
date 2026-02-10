/**
 * Corporate and Trust Values
 * Valores corporativos y de confianza de iPROVA
 */

import { Scale, Lock, Network, FileSearch, Heart, Target, Award, type LucideIcon } from "lucide-react";

// Core Principles - Principios Fundamentales (4 tarjetas principales)
export interface CorePrinciple {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const corePrinciples: CorePrinciple[] = [
  {
    title: "Integridad",
    description: "Actuamos con honestidad, independencia y transparencia. Delimitamos lo posible en derecho y lo comunicamos con claridad, sin promesas de resultado.",
    icon: Scale,
  },
  {
    title: "Confidencialidad",
    description: "Protegemos tu información con reserva profesional y protocolos de manejo de datos. La confianza se cuida en cada conversación, documento y actuación.",
    icon: Lock,
  },
  {
    title: "Teoría del caso y hechos relevantes",
    description: "Identificamos los hechos jurídicamente relevantes y construimos una teoría del caso coherente: qué ocurrió, qué se puede probar y qué consecuencias jurídicas se discuten.",
    icon: Network,
  },
  {
    title: "Método, técnica y acreditación probatoria",
    description: "Trabajamos con método: verificamos, contrastamos y organizamos evidencia para la acreditación (sustento) de los hechos. Técnica jurídica y rigor probatorio en cada etapa.",
    icon: FileSearch,
  },
] as const;

// Corporate Values (del Manual de Marca)
export interface CorporateValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const corporateValues: CorporateValue[] = [
  {
    title: "Integridad",
    description:
      "Actuamos con honestidad, respeto, ética y transparencia en cada caso. La confianza de nuestros clientes es nuestra base.",
    icon: Heart,
  },
  {
    title: "Compromiso",
    description:
      "Cumplimos nuestras promesas y superamos expectativas. Tu caso es nuestra prioridad y trabajamos incansablemente por tu éxito.",
    icon: Target,
  },
  {
    title: "Excelencia",
    description:
      "Nos esforzamos por ser los mejores en lo que hacemos, con pasión, calidad y dedicación profesional en cada servicio.",
    icon: Award,
  },
] as const;

// Value Proposition (Promesa de valor)
export const valueProposition = {
  description:
    "Para que los clientes elijan nuestra marca IPROVA sobre la competencia, debe ofrecer algo único y relevante.",
  promise: "Asesoría, Experiencia, Compromiso, Investigación, lealtad",
  highlight: "para ir...",
  tagline: "...más allá!",
} as const;
