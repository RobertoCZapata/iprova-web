/**
 * Services Configuration
 * Servicios ofrecidos por iPROVA
 */

import {
  Scale,
  Gavel,
  FileCheck,
  Briefcase,
  RefreshCw,
  Mic,
  AlertTriangle,
  Building,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

// Services (Actualizado con contenido detallado)
export interface Service {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Defensa Penal",
    description:
      "Asumimos la defensa penal desde la etapa preliminar hasta el juicio y la ejecución de la sentencia. Partimos de una lectura técnica del caso: fijamos hechos jurídicamente relevantes, formulamos teoría del caso y diseñamos la ruta probatoria (qué debe acreditarse, con qué medios y en qué momento). Preparamos audiencias y escritos, y evaluamos alternativas procesales cuando sean pertinentes, con reserva, rigor y estrategia.",
    href: "#servicios",
    icon: Scale,
  },
  {
    title: "Defensa Disciplinaria",
    description:
      "Representamos a servidores públicos y particulares disciplinables ante Procuraduría y oficinas de control interno disciplinario. Analizamos la imputación disciplinaria, la ilicitud sustancial y la estructura del tipo, para construir una teoría del caso disciplinaria sólida. Acompañamos versiones, solicitudes probatorias, descargos, alegatos y recursos, con énfasis en debido proceso y técnica de controversia.",
    href: "#servicios",
    icon: Gavel,
  },
  {
    title: "Defensa ante Autoridades Administrativas",
    description:
      "Atendemos procedimientos sancionatorios ante entidades administrativas: respuesta a requerimientos, descargos, práctica y contradicción de prueba, alegatos y recursos. Enfocamos el trabajo en riesgos, acreditación de hechos y discusión jurídica (tipicidad, culpabilidad, proporcionalidad y motivación). Definimos una hoja de ruta por etapas para tomar decisiones informadas, sin improvisación.",
    href: "#servicios",
    icon: FileCheck,
  },
  {
    title: "Defensa Corporativa",
    description:
      "Acompañamos a empresas en la prevención y manejo de contingencias comerciales y laborales. En lo comercial: estructuración y revisión contractual, negociación y soporte en decisiones corporativas. En lo laboral: gestión de relaciones de trabajo, políticas internas, terminaciones, trámites ante autoridades y litigios. Priorizamos soluciones viables, alineadas con el riesgo y la operación.",
    href: "#servicios",
    icon: Briefcase,
  },
  {
    title: "Reorganización Empresarial, Insolvencia y Liquidación",
    description:
      "Asesoramos a empresas y empresarios en escenarios de crisis: diagnóstico, estructuración de estrategia y representación en procesos de reorganización e insolvencia. Acompañamos la negociación con acreedores, la elaboración de acuerdos, el manejo de contingencias y el cumplimiento de cargas durante el trámite. Cuando corresponde, orientamos liquidaciones con enfoque de orden, trazabilidad y protección jurídica del patrimonio.",
    href: "#servicios",
    icon: RefreshCw,
  },
  {
    title: "Contrainterrogatorio",
    description:
      "Diseñamos contrainterrogatorios con enfoque técnico: capítulos, objetivos precisos, control del relato y uso estratégico de declaraciones previas y documentos. Entrenamos la ejecución en audiencia (pregunta corta, control, ritmo, objeciones) para explorar credibilidad, percepción, memoria y sesgos, y para exhibir inconsistencias relevantes a la teoría del caso.",
    href: "#servicios",
    icon: Mic,
  },
  {
    title: "Asesoría e Identificación Temprana de Riesgos Penales y Disciplinarios",
    description:
      "Acompañamiento preventivo para ordenadores del gasto y equipos con funciones sensibles, especialmente en contratación estatal y gestión administrativa. Identificamos riesgos por acción u omisión, sugerimos controles y soportes (documentación, trazabilidad y justificación), y entregamos recomendaciones prácticas para reducir exposición penal y disciplinaria. Es asesoría estratégica; no reemplaza control interno ni funciones de auditoría.",
    href: "#servicios",
    icon: AlertTriangle,
  },
  {
    title: "Asesoría a Empresas del Sector Público y Privado",
    description:
      "Consultoría continua o por proyectos para estructurar decisiones y gestionar contingencias. En comercial: contratos, negociación, gobierno corporativo y prevención de disputas. En laboral: cumplimiento, manejo de conflictos, inspecciones, conciliaciones y litigios. El foco es anticipar riesgos y actuar con método, antes de que el problema crezca.",
    href: "#servicios",
    icon: Building,
  },
  {
    title: "Investigación Privada",
    description:
      "Desarrollamos investigación privada como soporte a la estrategia jurídica. Verificamos información, realizamos entrevistas y toma de versiones, practicamos inspecciones al lugar de los hechos y fijación técnica de escenas (registro y documentación), y reconstruimos líneas de tiempo. También apoyamos la recolección, preservación y análisis de evidencia digital, así como la revisión de áreas de interés para identificar vulnerabilidades en instalaciones físicas. El propósito es aportar insumos útiles para la acreditación probatoria, detectar inconsistencias y fortalecer la preparación del caso con hallazgos trazables y documentados.",
    href: "#servicios",
    icon: SearchCheck,
  },
];

// Services Section Content
export const servicesSectionContent = {
  title: "Nuestros Servicios",
  description:
    "Soluciones especializadas en defensa, asesoría e investigación con método, técnica y enfoque estratégico.",
} as const;
