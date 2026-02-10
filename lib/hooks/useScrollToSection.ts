"use client";

/**
 * useScrollToSection Hook
 * Hook reutilizable para hacer scroll suave a una sección
 */

import { useCallback } from "react";

interface ScrollOptions {
  /** Offset desde el top (útil para headers fijos) */
  offset?: number;
  /** Comportamiento del scroll */
  behavior?: ScrollBehavior;
}

export function useScrollToSection(options: ScrollOptions = {}) {
  const { offset = 80, behavior = "smooth" } = options;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });
      }
    },
    [offset, behavior]
  );

  return scrollToSection;
}
