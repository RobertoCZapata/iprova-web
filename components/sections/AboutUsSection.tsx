import Image from "next/image";
import { corporateValues, aboutUsContent } from "@/lib/data";

export function AboutUsSection() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column */}
          <div className="lg:w-1/3">
            <h2 className="text-4xl font-extrabold text-primary dark:text-white mb-6">
              {aboutUsContent.title}
            </h2>
            <div className="h-1 w-20 bg-secondary mb-6" />
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {aboutUsContent.description}
            </p>
            <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg mt-8">
              <Image
                alt="Team handshake"
                src="/images/handshake.jpg"
                fill
                className="object-cover"
              />
              {/* Overlay del color primario de la marca (PANTONE 5255 C / #00184A) para integración y legibilidad del texto */}
              <div className="absolute inset-0 bg-primary/70" />
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="lg:w-2/3 grid gap-10">
            {corporateValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="text-primary dark:text-blue-400 text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary dark:text-white mb-2 uppercase">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

