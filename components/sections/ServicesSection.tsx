import { services, servicesSectionContent } from "@/lib/data";

export function ServicesSection() {
  return (
    <section className="py-24 bg-gray-50" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl mb-3">
            {servicesSectionContent.title}
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
          <p className="mt-6 max-w-2xl text-lg text-gray-600 mx-auto">
            {servicesSectionContent.description}
          </p>
        </div>

        {/* Grid de 2 columnas en desktop para dar más espacio a las descripciones largas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isLast = index === services.length - 1;
            const isOddTotal = services.length % 2 !== 0;

            return (
              <article
                key={service.title}
                className={`group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1 flex flex-col ${
                  isLast && isOddTotal ? 'lg:col-span-2' : ''
                }`}
              >
                <div className={isLast && isOddTotal ? 'lg:max-w-3xl lg:mx-auto w-full' : ''}>
                  {/* Header: Icono + Título */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-light group-hover:scale-110 transition-all duration-300 shadow-md">
                      <Icon
                        className="w-8 h-8 text-primary group-hover:text-white transition-all duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-primary leading-tight flex-1 pt-1">
                      {service.title}
                    </h3>
                  </div>

                  {/* Descripción larga */}
                  <p className="text-gray-700 text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
