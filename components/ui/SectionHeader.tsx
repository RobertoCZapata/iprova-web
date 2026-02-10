/**
 * SectionHeader Component
 * Componente reutilizable para títulos de sección con línea decorativa
 */

import { ReactNode } from "react";

interface SectionHeaderProps {
  /** Título principal de la sección */
  title: string | ReactNode;
  /** Subtítulo o etiqueta superior opcional */
  subtitle?: string;
  /** Descripción debajo del título */
  description?: string | ReactNode;
  /** Centrar el texto */
  centered?: boolean;
  /** Tamaño del título */
  size?: "sm" | "md" | "lg" | "xl";
  /** Espaciado inferior */
  className?: string;
}

const titleSizes = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
  xl: "text-4xl md:text-5xl lg:text-6xl",
};

const descriptionSizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-xl md:text-2xl",
};

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = true,
  size = "md",
  className = "mb-12",
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      {subtitle && (
        <span className="text-gray-700 font-bold tracking-widest uppercase text-sm mb-2 block">
          {subtitle}
        </span>
      )}

      <h2
        className={`${titleSizes[size]} font-extrabold text-primary tracking-tight mb-3`}
      >
        {title}
      </h2>

      <div className={`h-1 w-24 bg-secondary ${centered ? "mx-auto" : ""}`} />

      {description && (
        <p
          className={`mt-6 ${descriptionSizes[size]} text-gray-600 ${
            centered ? "max-w-3xl mx-auto" : "max-w-3xl"
          } leading-relaxed`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
