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
            iPROVA es una firma de abogados e investigadores privados liderada por sus socios fundadores,{" "}
            <a href="#equipo" className="text-primary hover:text-primary-dark font-semibold hover:underline">
              ZAPATA & PEDRAZA
            </a>
            . Integramos defensa en{" "}
            <a href="#servicios" className="text-primary hover:text-primary-dark font-semibold hover:underline">
              escenarios sancionatorios
            </a>{" "}
            (penal, disciplinario, responsabilidad fiscal y derecho administrativo sancionador) con investigación privada profesional para fortalecer la acreditación probatoria y orientar decisiones estratégicas.
          </p>

          {aboutUsContent.extendedDescription && (
            <p className="text-gray-700 leading-relaxed">
              Para nosotros, Inteligencia Jurídica es la capacidad de traducir un problema complejo en una ruta técnica: delimitar hechos jurídicamente relevantes, estructurar teoría del caso, priorizar riesgos y ejecutar un plan de{" "}
              <a href="#servicios" className="text-primary hover:text-primary-dark font-semibold hover:underline">
                investigación y litigación
              </a>{" "}
              con método. Combinamos criterio experto con herramientas tecnológicas —incluida inteligencia artificial como apoyo— siempre bajo dirección profesional y con estándares de confidencialidad.
            </p>
          )}

          {aboutUsContent.complementaryFocus && (
            <p className="text-gray-700 leading-relaxed">
              Complementamos este enfoque con un área empresarial en derecho comercial y laboral, orientada a prevenir conflictos, gestionar riesgos y proteger el patrimonio y la operación de{" "}
              <a href="#resultados" className="text-primary hover:text-primary-dark font-semibold hover:underline">
                nuestros clientes
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
