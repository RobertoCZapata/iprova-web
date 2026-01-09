import { valueProposition } from "@/lib/data";

export function ValuePropositionSection() {
  return (
    <section className="bg-gray-50 dark:bg-card-dark py-16 border-y border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-extrabold text-primary dark:text-white mb-4">
              Promesa de valor
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              {valueProposition.description}
            </p>
          </div>
          <div className="hidden md:block w-px h-32 bg-secondary dark:bg-gray-600" />
          <div className="md:w-1/2 text-center md:text-left">
            <p className="text-gray-700 dark:text-gray-200 text-xl font-medium mb-2">
              {valueProposition.promise}{" "}
              <span className="font-bold text-primary dark:text-white">
                {valueProposition.highlight}
              </span>
            </p>
            <p className="text-5xl font-extrabold text-primary dark:text-blue-400 mt-4">
              {valueProposition.tagline}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

