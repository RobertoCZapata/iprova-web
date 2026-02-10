/**
 * Section Component
 * Componente wrapper para secciones con estilos consistentes
 */

import { ReactNode } from "react";
import {
  SECTION_CONTAINERS,
  SECTION_PADDING,
  SECTION_BACKGROUNDS,
} from "@/lib/constants/styles";

interface SectionProps {
  children: ReactNode;
  /** ID de la sección para navegación */
  id?: string;
  /** Tamaño del contenedor */
  container?: keyof typeof SECTION_CONTAINERS;
  /** Espaciado vertical */
  padding?: keyof typeof SECTION_PADDING;
  /** Color de fondo */
  background?: keyof typeof SECTION_BACKGROUNDS;
  /** Clases CSS adicionales */
  className?: string;
}

export function Section({
  children,
  id,
  container = "default",
  padding = "lg",
  background = "white",
  className = "",
}: SectionProps) {
  const containerClass = SECTION_CONTAINERS[container];
  const paddingClass = SECTION_PADDING[padding];
  const backgroundClass = SECTION_BACKGROUNDS[background];

  return (
    <section
      id={id}
      className={`${paddingClass} ${backgroundClass} ${className}`}
    >
      <div className={containerClass}>{children}</div>
    </section>
  );
}
