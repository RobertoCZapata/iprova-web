/**
 * Corporate and Trust Values
 * Valores corporativos y de confianza de iPROVA
 */

import { Scale, Gavel, Shield, Heart, Target, Award, type LucideIcon } from "lucide-react";

// Trust Values (Libertad, Defensa, Protección)
export interface TrustValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const trustValues: TrustValue[] = [
  {
    title: "Libertad",
    description: "Protegemos sus derechos fundamentales con integridad.",
    icon: Scale,
  },
  {
    title: "Defensa",
    description: "Representación legal robusta y estratégica.",
    icon: Gavel,
  },
  {
    title: "Protección",
    description: "Seguridad integral para usted y su patrimonio.",
    icon: Shield,
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
