/**
 * Services Configuration
 * Servicios ofrecidos por iPROVA
 */

import {
  Scale,
  ShieldCheck,
  FileText,
  SearchCheck,
  Shield,
  Mic,
  type LucideIcon,
} from "lucide-react";

// Services (del Manual de Marca)
export interface Service {
  title: string;
  subtitle?: string; // Beneficio directo (UX Writing)
  description: string;
  href: string;
  icon: LucideIcon; // Deprecated - mantener por compatibilidad
  iconName: string; // Nombre del archivo SVG en /public/icons/
}

export const services: Service[] = [
  {
    title: "Defensa Judicial",
    subtitle: "Protegemos tu futuro tras un accidente",
    description:
      "No solo te representamos en el juzgado. Investigamos a fondo tu caso, recopilamos evidencia que otros pasan por alto y construimos una defensa sólida. Representación experta en litigios y procesos judiciales, garantizando la defensa técnica de sus intereses.",
    href: "#servicios",
    icon: Scale,
    iconName: "defensa-judicial",
  },
  {
    title: "Defensa de Lesiones",
    subtitle: "Protegemos tu futuro tras un accidente",
    description:
      "Un accidente puede cambiar tu vida. Nosotros documentamos cada detalle, trabajamos con expertos médicos y peritos, y luchamos por la reparación integral que mereces. Acompañamiento especializado en casos de lesiones personales.",
    href: "#servicios",
    icon: ShieldCheck,
    iconName: "defensa-de-lesiones",
  },
  {
    title: "Asesoría Jurídica",
    subtitle: "Evita problemas antes de que ocurran",
    description:
      "La mejor defensa es la prevención. Analizamos contratos, evaluamos riesgos y verificamos antecedentes antes de que tomes decisiones importantes. Consultoría legal preventiva y correctiva para personas naturales y empresas.",
    href: "#servicios",
    icon: FileText,
    iconName: "asesoria-juridica",
  },
  {
    title: "Investigación Judicial",
    subtitle: "Recolectamos la evidencia que otros pasan por alto",
    description:
      "No confiamos solo en lo que nos dicen. Investigamos, analizamos y presentamos pruebas sólidas. Recolección de elementos materiales probatorios y evidencia física con rigor técnico y metodología profesional.",
    href: "#servicios",
    icon: SearchCheck,
    iconName: "investigacion-judicial-y-criminal",
  },
  {
    title: "Seguridad Corporativa",
    subtitle: "Protege tu empresa antes de que sea tarde",
    description:
      "Tu empresa es vulnerable si no conoces los riesgos. Investigamos antecedentes, analizamos amenazas y diseñamos estrategias de protección. Gestión de riesgos y cumplimiento normativo en seguridad y salud en el trabajo.",
    href: "#servicios",
    icon: Shield,
    iconName: "Seguridad-laboral",
  },
  {
    title: "Contra-Interrogación",
    subtitle: "Validamos testimonios con precisión forense",
    description:
      "Cada palabra cuenta en un juicio. Preparamos interrogatorios estratégicos, verificamos la veracidad de declaraciones y exponemos inconsistencias. Técnicas avanzadas de litigación oral para la validación de testimonios.",
    href: "#servicios",
    icon: Mic,
    iconName: "contrainterrogacion",
  },
];

// Services Section Content
export const servicesSectionContent = {
  title: "Nuestros Servicios",
  description:
    "Soluciones integrales en derecho e investigación. Nuestros servicios de Inteligencia Jurídica e Investigación Privada están diseñados para proteger sus intereses y brindarle la tranquilidad que merece.",
  detailedDescription:
    "En iPROVA, ofrecemos un portafolio completo de servicios legales e investigativos. Nuestra experiencia en Inteligencia Jurídica nos permite anticipar riesgos y diseñar estrategias preventivas. Nuestros servicios de Investigación Privada incluyen investigación corporativa, análisis de riesgos, verificación de antecedentes y más. Cada servicio está respaldado por nuestro equipo multidisciplinario de abogados especializados.",
} as const;
