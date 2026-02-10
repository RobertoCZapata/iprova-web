/**
 * AboutUsSection - Ejemplo Refactorizado
 * Este archivo muestra cómo usar los componentes reutilizables
 *
 * ANTES: 37 líneas con código repetitivo
 * DESPUÉS: 22 líneas, más limpio y mantenible
 */

import { aboutUsContent } from "@/lib/data";
import { Section, SectionHeader } from "@/components/ui";

export function AboutUsSection() {
  return (
    <Section id="nosotros" container="narrow" background="gray">
      <SectionHeader
        title={aboutUsContent.title}
        size="lg"
        className="mb-12"
      />

      <div className="space-y-6 text-lg">
        <p className="text-gray-700 leading-relaxed">
          {aboutUsContent.description}
        </p>

        {aboutUsContent.extendedDescription && (
          <p className="text-gray-700 leading-relaxed">
            {aboutUsContent.extendedDescription}
          </p>
        )}

        {aboutUsContent.complementaryFocus && (
          <p className="text-gray-700 leading-relaxed">
            {aboutUsContent.complementaryFocus}
          </p>
        )}
      </div>
    </Section>
  );
}
