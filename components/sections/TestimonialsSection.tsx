import { testimonials } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
            Prueba Social
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white mb-4">
            Casos de Éxito
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
          <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300 mx-auto">
            La confidencialidad es fundamental, pero nuestros resultados hablan por sí solos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-card-dark rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.initials}
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-semibold text-primary dark:text-blue-400 mb-1">
                    {testimonial.case}
                  </p>
                  <div className="flex items-center text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{testimonial.result}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals adicionales */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-extrabold text-primary dark:text-white mb-2">
              20+
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Años de experiencia
            </p>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary dark:text-white mb-2">
              95%
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Casos exitosos
            </p>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary dark:text-white mb-2">
              500+
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Casos resueltos
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
