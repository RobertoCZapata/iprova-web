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
} from "lucide-react";
import type { Icon } from "lucide-react";

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
  { label: "Contacto", href: "#contacto" },
] as const;

// Trust Values (Libertad, Defensa, Protección)
export interface TrustValue {
  title: string;
  description: string;
  icon: Icon;
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
  description: string;
  href: string;
  icon: Icon;
}

export const services: Service[] = [
  {
    title: "Defensa Judicial",
    description:
      "Representación experta en litigios y procesos judiciales, garantizando la defensa técnica de sus intereses.",
    href: "#servicios",
    icon: Scale,
  },
  {
    title: "Defensa de Lesiones",
    description:
      "Acompañamiento especializado en casos de lesiones personales, buscando la reparación integral.",
    href: "#servicios",
    icon: Gavel,
  },
  {
    title: "Asesoría Jurídica",
    description:
      "Consultoría legal preventiva y correctiva para personas naturales y empresas.",
    href: "#servicios",
    icon: School,
  },
  {
    title: "Investigación Judicial",
    description:
      "Recolección de elementos materiales probatorios y evidencia física con rigor técnico.",
    href: "#servicios",
    icon: Search,
  },
  {
    title: "Seguridad Laboral",
    description:
      "Gestión de riesgos y cumplimiento normativo en seguridad y salud en el trabajo.",
    href: "#servicios",
    icon: Shield,
  },
  {
    title: "Contra-Interrogación",
    description:
      "Técnicas avanzadas de litigación oral para la validación de testimonios.",
    href: "#servicios",
    icon: Mic,
  },
];

// Corporate Values (del Manual de Marca)
export interface CorporateValue {
  title: string;
  description: string;
  icon: Icon;
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
  title: {
    main: "Inteligencia Jurídica e",
    highlight: "Investigación Privada",
  },
  description:
    "Superar lo hecho es ir más allá. Asesoría, experiencia, compromiso y lealtad para nuestros clientes.",
  cta: {
    primary: {
      label: "Contáctanos",
      href: "#contacto",
    },
    secondary: {
      label: "Saber más",
      href: "#servicios",
    },
  },
} as const;

// Services Section Content
export const servicesSectionContent = {
  title: "Nuestros Servicios",
  description: "Soluciones integrales en derecho e investigación.",
} as const;

// About Us Section Content
export const aboutUsContent = {
  title: "Valores Corporativos",
  description:
    "La marca IPROVA trabaja incansablemente el proceso de construcción de su marca, para fortalecer la conexión con sus clientes y empleados, al mismo tiempo que impulsar su reconocimiento.",
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
