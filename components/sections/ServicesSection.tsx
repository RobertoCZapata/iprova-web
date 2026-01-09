import { services, servicesSectionContent } from "@/lib/data";

export function ServicesSection() {
  return (
    <section className="py-24 bg-white dark:bg-background-dark" id="servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">
            {servicesSectionContent.title}
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            {servicesSectionContent.description}
          </p>
          {servicesSectionContent.detailedDescription && (
            <p className="mt-4 max-w-3xl text-base text-gray-600 dark:text-gray-300 mx-auto">
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
                className="group bg-white dark:bg-card-dark rounded-xl p-8 shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/30 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <Icon className="text-primary dark:text-blue-300 text-3xl group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
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
