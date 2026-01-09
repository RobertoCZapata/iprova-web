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
          alt="Modern law office with wooden panels"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuASdxDyikQZldrmsqA8yC2ml_Inw7ydkzsWVLIYPuhGu6TNoWoEO_x0J2sLHicNtQPaqykYEEVX6cr1bfLjWwbpwCsLI279G_EtkVY1graIVvgGO8Bi9oMXasm0DSR-vFESBf4EL8GJUIa9xlCPD58-wgLqcht85jIkhEMFc_CFE2E_c5JpJ7yjgm09emIURwx-wWmNFnZtuvSkynffMS1wkGLcP4eL6De2k_LJfAiUjk39rP9fJ2aWTPsfzdRpBaxXrGKgv73_RWw"
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
            <div className="inline-block px-3 py-1 border border-secondary text-secondary text-xs font-bold tracking-widest uppercase mb-6 rounded-sm bg-primary/20 backdrop-blur-sm">
              Abogados e Investigadores
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-4 drop-shadow-lg">
              {heroContent.title.main}{" "}
              <span className="text-secondary">
                {heroContent.title.highlight}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-semibold mb-6 drop-shadow-md">
              {heroContent.tagline}
            </p>
            <p className="mt-6 text-gray-100 text-lg md:text-xl font-medium max-w-2xl mb-4 drop-shadow-md leading-relaxed">
              {heroContent.description}
            </p>
            {heroContent.benefit && (
              <p className="mt-4 text-gray-300 text-base font-light max-w-2xl mb-10 drop-shadow-md italic border-l-4 border-secondary pl-6">
                {heroContent.benefit}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="md"
                href={heroContent.cta.primary.href}
                className="px-8 py-4 border border-secondary uppercase tracking-wider shadow-lg"
              >
                {heroContent.cta.primary.label}
              </Button>
              <Button
                variant="outline-light"
                size="md"
                href={heroContent.cta.secondary.href}
                className="px-8 py-4 border border-gray-400 uppercase tracking-wider backdrop-blur-sm bg-white/5 text-gray-200 hover:text-white hover:border-white"
              >
                {heroContent.cta.secondary.label}
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
