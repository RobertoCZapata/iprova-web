import { corePrinciples } from "@/lib/data";

export function TrustValuesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de sección */}
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              Nuestros Principios
            </h2>
            <div className="h-1 w-24 bg-secondary mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Los pilares que guían nuestro trabajo y garantizan la excelencia en cada caso
          </p>
        </div>

        {/* Lista vertical con línea lateral */}
        <div className="relative">
          {/* Línea vertical continua */}
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-secondary hidden md:block" />

          {/* Principios */}
          <div className="space-y-16">
            {corePrinciples.map((principle, index) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="relative pl-0 md:pl-16"
                >
                  {/* Número grande */}
                  <div className="absolute left-0 top-0 hidden md:flex items-center justify-center w-12 h-12 -translate-x-1/2 bg-white border-4 border-secondary rounded-full">
                    <span className="text-xl font-black text-primary">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    {/* Header: Número móvil + Icono + Título */}
                    <div className="flex items-center gap-4 mb-4">
                      {/* Número para móvil */}
                      <div className="md:hidden flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full flex-shrink-0">
                        <span className="text-xl font-black text-primary">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Icono */}
                      <div className="flex-shrink-0 group">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center group-hover:from-primary group-hover:to-primary-light group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Título */}
                      <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight flex-1">
                        {principle.title}
                      </h3>
                    </div>

                    {/* Descripción */}
                    <p className="text-gray-700 text-base leading-relaxed pl-0 md:pl-20">
                      {principle.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
