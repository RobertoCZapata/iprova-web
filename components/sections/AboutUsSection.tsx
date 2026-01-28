import Image from "next/image";
import { aboutUsContent } from "@/lib/data";

export function AboutUsSection() {
  return (
    <section className="py-20 bg-white" id="nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column - Image */}
          <div className="lg:w-1/2">
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
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

          {/* Right Column - Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-extrabold text-primary mb-6">
              {aboutUsContent.title}
            </h2>
            <div className="h-1 w-20 bg-secondary mb-6" />
            <p className="text-gray-600 leading-relaxed mb-4">
              {aboutUsContent.description}
            </p>
            {aboutUsContent.extendedDescription && (
              <p className="text-gray-600 leading-relaxed mb-6">
                {aboutUsContent.extendedDescription}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

