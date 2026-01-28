import { services, servicesSectionContent } from "@/lib/data";

export function ServicesSection() {
  return (
    <section className="py-24 bg-white" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-primary sm:text-4xl">
            {servicesSectionContent.title}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            {servicesSectionContent.description}
          </p>
          {servicesSectionContent.detailedDescription && (
            <p className="mt-4 max-w-3xl text-base text-gray-600 mx-auto">
              {servicesSectionContent.detailedDescription}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary group-hover:to-primary-light group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-md group-hover:shadow-xl">
                  <Icon
                    className="w-10 h-10 text-primary group-hover:text-white transition-all duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p className="text-primary font-semibold text-sm mb-3">
                    {service.subtitle}
                  </p>
                )}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
