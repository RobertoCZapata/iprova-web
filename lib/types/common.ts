/**
 * Common Types
 * Tipos compartidos y reutilizables en toda la aplicación
 */

import { LucideIcon } from "lucide-react";

/**
 * Item con icono
 * Usado en servicios, indicadores, features, etc.
 */
export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * Contenido de sección básico
 */
export interface SectionContent {
  title: string;
  description?: string;
  subtitle?: string;
}

/**
 * Item de lista con check
 * Usado en listas de beneficios, características, etc.
 */
export interface CheckListItem {
  text: string;
  highlighted?: boolean;
}

/**
 * Enlace básico
 */
export interface Link {
  label: string;
  href: string;
}

/**
 * Contacto básico
 */
export interface ContactMethod {
  label: string;
  value: string;
  href: string;
}

/**
 * Estadística o métrica
 */
export interface Metric {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

/**
 * Miembro de equipo básico
 */
export interface Person {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

/**
 * Testimonio básico
 */
export interface TestimonialBase {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  rating?: number;
}

/**
 * Direcciones/ubicaciones
 */
export interface Address {
  street: string;
  city: string;
  state?: string;
  country: string;
  postalCode?: string;
}

/**
 * Propiedades comunes de componentes
 */
export interface BaseComponentProps {
  className?: string;
  id?: string;
}
