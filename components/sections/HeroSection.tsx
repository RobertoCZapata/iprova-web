import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/lib/data";

export function HeroSection() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-start overflow-hidden pt-20 bg-primary"
      id="inicio"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          alt="Oficina iPROVA Bucaramanga - Abogados Penalistas y Detectives Privados en Santander Colombia - ZAPATA & PEDRAZA"
          src="/images/heroSectionImage.png"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Degradado azul primario para legibilidad y efecto corporativo */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary via-primary/95 to-primary/30 lg:via-primary/90 lg:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-left">
            <div className="inline-block px-3 py-1 border border-white/60 text-white/90 text-xs font-bold tracking-widest uppercase mb-6 rounded-sm bg-white/10 backdrop-blur-sm">
              Abogados e Investigadores
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
              {heroContent.title.main}{" "}
              <span className="text-gray-200">
                {heroContent.title.highlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 font-semibold mb-4 drop-shadow-md">
              {heroContent.tagline}
            </p>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-secondary" />
              <span className="text-white text-sm md:text-base font-bold tracking-widest uppercase whitespace-nowrap">
                {heroContent.leadership}
              </span>
              <div className="h-[2px] w-12 bg-secondary" />
            </div>
            <p className="mt-6 text-gray-100 text-lg md:text-xl font-medium max-w-2xl mb-4 drop-shadow-md leading-relaxed">
              {heroContent.description}
            </p>
            {heroContent.benefit && (
              <p className="mt-4 text-gray-100 text-base font-light max-w-2xl mb-10 drop-shadow-md italic border-l-4 border-white/40 pl-6">
                {heroContent.benefit}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="md"
                href={heroContent.cta.primary.href}
                className="px-8 py-4 uppercase tracking-wider group"
              >
                <span className="relative">
                  {heroContent.cta.primary.label}
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </span>
              </Button>
              <Button
                variant="outline-light"
                size="md"
                href={heroContent.cta.secondary.href}
                className="px-8 py-4 uppercase tracking-wider backdrop-blur-sm group"
              >
                <span className="relative">
                  {heroContent.cta.secondary.label}
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </span>
              </Button>
            </div>
          </div>

          {/* Right side vacío para respetar el layout geométrico del diseño */}
          <div className="hidden lg:block lg:w-2/5" />
        </div>
      </div>
    </div>
  );
}
