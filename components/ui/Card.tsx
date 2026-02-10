/**
 * Card Component
 * Componente reutilizable para tarjetas/cards con estilos consistentes
 */

import { ReactNode } from "react";
import { CARD_STYLES } from "@/lib/constants/styles";

interface CardProps {
  children: ReactNode;
  /** Tipo de card */
  variant?: "base" | "hover" | "interactive";
  /** Clases CSS adicionales */
  className?: string;
  /** Padding del contenido */
  padding?: "none" | "sm" | "md" | "lg";
  /** Hacer la card clickeable */
  onClick?: () => void;
}

const paddingSizes = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  children,
  variant = "base",
  className = "",
  padding = "md",
  onClick,
}: CardProps) {
  const baseStyles = CARD_STYLES[variant];
  const paddingStyles = paddingSizes[padding];
  const cursorStyle = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${paddingStyles} ${cursorStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
