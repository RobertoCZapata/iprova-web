"use client";

/**
 * AnimatedSection Component
 * Wrapper reutilizable para animaciones de Framer Motion
 */

import { motion, Variant } from "framer-motion";
import { ReactNode } from "react";
import { MOTION_VARIANTS, ANIMATION_DURATION } from "@/lib/constants/styles";

interface AnimatedSectionProps {
  children: ReactNode;
  /** Tipo de animación */
  variant?: keyof typeof MOTION_VARIANTS;
  /** Duración de la animación */
  duration?: keyof typeof ANIMATION_DURATION;
  /** Delay antes de iniciar la animación */
  delay?: number;
  /** Clases CSS adicionales */
  className?: string;
  /** Animar solo una vez */
  once?: boolean;
}

export function AnimatedSection({
  children,
  variant = "fadeIn",
  duration = "default",
  delay = 0,
  className = "",
  once = true,
}: AnimatedSectionProps) {
  const selectedVariant = MOTION_VARIANTS[variant];

  return (
    <motion.div
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once }}
      transition={{
        duration: ANIMATION_DURATION[duration],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
