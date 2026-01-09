/**
 * Data Configuration File
 * 
 * Edit this file to easily update:
 * - Brand assets (logo, etc.)
 * - Navigation items
 * - Statistics / Trust values
 * - Services
 * - Corporate values
 * - Footer links
 * - Contact information
 * 
 * Basado en Manual de Marca IPROVA
 */

import {
  Scale,
  Gavel,
  Shield,
  School,
  Search,
  Mic,
  HeartHandshake,
  Handshake,
  Award,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  Users,
  Calendar,
  type LucideIcon,
} from "lucide-react";

// Brand Assets
export const brandAssets = {
  logo: "/images/iProva-logo.png",
  logoAlt: "iPROVA - Abogados e Investigadores",
} as const;

// Navigation
export const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
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

// Services (del Manual de Marca)
export interface Service {
  title: string;
  subtitle?: string; // Beneficio directo (UX Writing)
  description: string;
  href: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Defensa Judicial",
    subtitle: "Protegemos tu futuro tras un accidente",
    description:
      "No solo te representamos en el juzgado. Investigamos a fondo tu caso, recopilamos evidencia que otros pasan por alto y construimos una defensa sólida. Representación experta en litigios y procesos judiciales, garantizando la defensa técnica de sus intereses.",
    href: "#servicios",
    icon: Scale,
  },
  {
    title: "Defensa de Lesiones",
    subtitle: "Protegemos tu futuro tras un accidente",
    description:
      "Un accidente puede cambiar tu vida. Nosotros documentamos cada detalle, trabajamos con expertos médicos y peritos, y luchamos por la reparación integral que mereces. Acompañamiento especializado en casos de lesiones personales.",
    href: "#servicios",
    icon: Gavel,
  },
  {
    title: "Asesoría Jurídica",
    subtitle: "Evita problemas antes de que ocurran",
    description:
      "La mejor defensa es la prevención. Analizamos contratos, evaluamos riesgos y verificamos antecedentes antes de que tomes decisiones importantes. Consultoría legal preventiva y correctiva para personas naturales y empresas.",
    href: "#servicios",
    icon: School,
  },
  {
    title: "Investigación Judicial",
    subtitle: "Recolectamos la evidencia que otros pasan por alto",
    description:
      "No confiamos solo en lo que nos dicen. Investigamos, analizamos y presentamos pruebas sólidas. Recolección de elementos materiales probatorios y evidencia física con rigor técnico y metodología profesional.",
    href: "#servicios",
    icon: Search,
  },
  {
    title: "Seguridad Corporativa",
    subtitle: "Protege tu empresa antes de que sea tarde",
    description:
      "Tu empresa es vulnerable si no conoces los riesgos. Investigamos antecedentes, analizamos amenazas y diseñamos estrategias de protección. Gestión de riesgos y cumplimiento normativo en seguridad y salud en el trabajo.",
    href: "#servicios",
    icon: Shield,
  },
  {
    title: "Contra-Interrogación",
    subtitle: "Validamos testimonios con precisión forense",
    description:
      "Cada palabra cuenta en un juicio. Preparamos interrogatorios estratégicos, verificamos la veracidad de declaraciones y exponemos inconsistencias. Técnicas avanzadas de litigación oral para la validación de testimonios.",
    href: "#servicios",
    icon: Mic,
  },
];

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
      "Actuamos con honestidad, respeto, ética y transparencia en todas las interacciones y decisiones en favor de nuestros clientes.",
    icon: HeartHandshake,
  },
  {
    title: "Compromiso",
    description:
      "Nos esforzamos por cumplir nuestras promesas y superar las expectativas de nuestros clientes.",
    icon: Handshake,
  },
  {
    title: "Excelencia",
    description:
      "Desear ser el mejor en lo que se hace para ofrecer el mejor servicio a nuestros clientes.",
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

// Contact Information (del Manual de Marca)
export const contactInfo = {
  address: {
    street: "Calle 33 # 8-50",
    neighborhood: "Cañaveral - Floridablanca",
    city: "Santander - Colombia",
  },
  phones: ["+57 317 368 4975", "+57 318 220 0086"],
  emails: {
    abogados: "abogados@iprova.com.co",
    investigadores: "investigadores@iprova.com.co",
  },
  website: "www.iprova.com.co",
} as const;

// WhatsApp Configuration
export const whatsappConfig = {
  phoneE164: "+573182200086", // Número principal en formato E.164 (WhatsApp)
  displayPhone: "+57 318 220 0086",
  defaultMessage:
    "Hola, me gustaría agendar una consulta con iPROVA. Vengo desde el sitio web.",
} as const;

// Social Media Links
export const socialLinks = {
  facebook: "#",
  instagram: "#",
} as const;

// Hero Section Content
export const heroContent = {
  // Nuevo H1 directo al beneficio (UX Writing optimizado)
  title: {
    main: "No solo te defendemos,",
    highlight: "encontramos la verdad",
  },
  // Tagline diferenciador
  tagline: "Abogados e Investigadores en un solo lugar",
  // Descripción que elimina ansiedad del cliente
  description:
    "No necesitas contratar abogados y peritos por separado. En iPROVA, combinamos defensa jurídica experta con investigación privada profesional. Control total de tu caso, desde el análisis hasta la resolución.",
  // Beneficio emocional
  benefit:
    "Mientras otros solo defienden, nosotros investigamos, analizamos y construimos tu caso con evidencia sólida. Eso es ir más allá.",
  cta: {
    primary: {
      label: "Solicitar Evaluación de Caso",
      href: "#contacto",
    },
    secondary: {
      label: "Ver Nuestros Servicios",
      href: "#servicios",
    },
  },
} as const;

// Services Section Content
export const servicesSectionContent = {
  title: "Nuestros Servicios",
  description:
    "Soluciones integrales en derecho e investigación. Nuestros servicios de Inteligencia Jurídica e Investigación Privada están diseñados para proteger sus intereses y brindarle la tranquilidad que merece.",
  detailedDescription:
    "En iPROVA, ofrecemos un portafolio completo de servicios legales e investigativos. Nuestra experiencia en Inteligencia Jurídica nos permite anticipar riesgos y diseñar estrategias preventivas. Nuestros servicios de Investigación Privada incluyen investigación corporativa, análisis de riesgos, verificación de antecedentes y más. Cada servicio está respaldado por nuestro equipo multidisciplinario de abogados especializados.",
} as const;

// About Us Section Content
export const aboutUsContent = {
  title: "Valores Corporativos",
  description:
    "La marca IPROVA trabaja incansablemente el proceso de construcción de su marca, para fortalecer la conexión con sus clientes y empleados, al mismo tiempo que impulsar su reconocimiento.",
  extendedDescription:
    "Con más de dos décadas de experiencia en el sector legal colombiano, iPROVA se ha consolidado como una firma líder en Inteligencia Jurídica e Investigación Privada. Nuestro enfoque se basa en la integridad, la confidencialidad y la excelencia en cada caso que manejamos. Especializados en Investigación Privada corporativa y personal, así como en servicios de Inteligencia Jurídica estratégica, trabajamos con empresas, individuos y organizaciones que requieren soluciones legales e investigativas de alto nivel. Nuestro equipo multidisciplinario combina conocimientos legales profundos con técnicas avanzadas de investigación, garantizando resultados excepcionales en cada proyecto.",
} as const;

// Team Members
export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Henry Zapata Reyes",
    role: "Abogado Penalista",
    image: "/images/team/henry-zapata.jpg",
  },
  {
    name: "Javier Pedraza Lizarazo",
    role: "Abogado Investigador",
    image: "/images/team/javier-pedraza.jpg",
  },
  {
    name: "Maria Fernanda Gonzalez",
    role: "Abogada",
    image: "/images/team/maria-fernanda.jpg",
  },
  {
    name: "Hernan Dario Zapata",
    role: "Abogado Comercial",
    image: "/images/team/hernan-dario.jpg",
  },
];

// Team Section Content
export const teamSectionContent = {
  title: "Nuestro Equipo",
  description:
    "Profesionales comprometidos con la excelencia y la defensa de sus intereses.",
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
