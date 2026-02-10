import { aboutUsContent } from "@/lib/data";

export function AboutUsSection() {
  return (
    <section className="py-20 bg-gray-50" id="nosotros">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título con línea decorativa */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary mb-3">
            {aboutUsContent.title}
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
        </div>

        {/* Contenido */}
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
      </div>
    </section>
  );
}
