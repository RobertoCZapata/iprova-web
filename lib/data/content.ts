/**
 * Section Content
 * Contenido de las diferentes secciones del sitio
 */

// Hero Section Content - Interactive Route Selector
export const heroContent = {
  // Titular principal (compatible con ambos públicos)
  title: "Ocupamos su caso como una investigación: estrategia, evidencia y decisión.",
  // Subtitular (explica la doble área)
  subtitle: "iPROVA integra defensa penal y sancionatoria con investigación privada, y asesoría comercial estratégica para empresas y directivos.",

  // Rutas de servicio
  routes: {
    penal: {
      id: "penal",
      title: "Penal y sancionatorio",
      description: "Defensa + investigación + litigio estratégico.",
      bullets: [
        "Teoría del caso basada en evidencia verificable y trazable.",
        "Preparación de audiencias, recursos e impugnaciones con método.",
        "Investigación privada: entrevistas, análisis documental y digital.",
      ],
      cta: {
        primary: {
          label: "Evaluar mi caso (confidencial)",
          href: "#contacto",
        },
        secondary: {
          label: "Ver método de trabajo",
          href: "#servicios",
        },
      },
    },
    comercial: {
      id: "comercial",
      title: "Comercial y estratégico",
      description: "Contratos + riesgos + decisiones corporativas.",
      bullets: [
        "Diagnóstico de riesgos y soporte jurídico para decisiones de gerencia.",
        "Contratos, cumplimiento y gestión preventiva del conflicto.",
        "Estrategia para crisis y contingencias: respuesta rápida y documentada.",
      ],
      cta: {
        primary: {
          label: "Agendar diagnóstico empresarial",
          href: "#contacto",
        },
        secondary: {
          label: "Ver líneas de asesoría",
          href: "#servicios",
        },
      },
    },
  },

  // Franja de confianza
  trustBadges: [
    "Atención confidencial",
    "Cobertura nacional",
    "Equipo legal + investigación",
    "Enfoque en evidencia",
  ],
} as const;

// About Us Section Content - Nuestra Propuesta
export const aboutUsContent = {
  title: "Nuestra Propuesta",
  description:
    "iPROVA es una firma de abogados e investigadores privados liderada por sus socios fundadores, ZAPATA & PEDRAZA. Integramos defensa en escenarios sancionatorios (penal, disciplinario, responsabilidad fiscal y derecho administrativo sancionador) con investigación privada profesional para fortalecer la acreditación probatoria y orientar decisiones estratégicas.",
  extendedDescription:
    "Para nosotros, Inteligencia Jurídica es la capacidad de traducir un problema complejo en una ruta técnica: delimitar hechos jurídicamente relevantes, estructurar teoría del caso, priorizar riesgos y ejecutar un plan de investigación y litigación con método. Combinamos criterio experto con herramientas tecnológicas —incluida inteligencia artificial como apoyo— siempre bajo dirección profesional y con estándares de confidencialidad.",
  complementaryFocus:
    "Complementamos este enfoque con un área empresarial en derecho comercial y laboral, orientada a prevenir conflictos, gestionar riesgos y proteger el patrimonio y la operación de nuestros clientes.",
} as const;

// Why Choose Us Section Content
export const whyChooseUsContent = {
  title: "¿Por qué elegir iPROVA?",
  description:
    "En iPROVA integramos defensa jurídica e investigación privada para construir estrategias basadas en teoría del caso, hechos jurídicamente relevantes y acreditación probatoria. Trabajamos con método, técnica y comunicación clara de escenarios.",
  reasons: [
    "Equipo integrado de abogados e investigadores trabajando en una sola estrategia",
    "Liderazgo de socios fundadores: ZAPATA & PEDRAZA (más de dos décadas de experiencia combinada)",
    "Teoría del caso: hechos relevantes, hipótesis y ruta probatoria desde el inicio",
    "Confidencialidad y discreción con reserva profesional y protocolos de manejo de información",
    "Investigación y análisis digital como apoyo técnico (cuando aporta valor al caso)",
    "Reportes claros: escenarios, riesgos y próximos pasos, sin promesas de resultado",
  ],
  floatingCard: {
    value: "100%",
    label: "Tasa de Satisfacción",
  },
  cta: {
    label: "Conoce Más Sobre Nosotros",
    href: "#nosotros",
  },
} as const;

// Footer Content
export const footerContent = {
  brand: {
    name: "iPROVA",
    description:
      "Abogados e Investigadores comprometidos con la verdad y la justicia. Su confianza es nuestra mayor responsabilidad.",
  },
  copyright: "© 2023 iPROVA - Abogados e Investigadores. Todos los derechos reservados.",
} as const;
