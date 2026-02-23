"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { heroContent } from "@/lib/data";
import { CheckCircle2 } from "lucide-react";

type RouteType = "penal" | "comercial";

export function HeroSection() {
  const [selectedRoute, setSelectedRoute] = useState<RouteType>("penal");
  const currentRoute = heroContent.routes[selectedRoute];

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
          className="object-cover hero-image-position"
          priority
          fetchPriority="high"
          quality={90}
          sizes="100vw"
        />
        {/* Degradado azul primario para legibilidad y efecto corporativo */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary via-primary/95 to-primary/30 lg:via-primary/90 lg:to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full py-16">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content */}
          <div className="w-full lg:w-3/5 text-left">
            {/* Titular principal */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
              {heroContent.title}
            </h1>

            {/* Subtitular */}
            <p className="text-lg md:text-xl text-gray-200 font-medium mb-8 drop-shadow-md leading-relaxed max-w-2xl">
              {heroContent.subtitle}
            </p>

            {/* Selector de Rutas - Tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {/* Tarjeta 1: Penal y sancionatorio */}
              <button
                onClick={() => setSelectedRoute("penal")}
                className={`
                  relative p-6 rounded-lg border-2 text-left transition-all duration-300 group
                  ${
                    selectedRoute === "penal"
                      ? "bg-white/95 border-white shadow-xl scale-105"
                      : "bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
                  }
                `}
                aria-pressed={selectedRoute === "penal"}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-xl font-bold transition-colors ${
                      selectedRoute === "penal"
                        ? "text-primary"
                        : "text-white group-hover:text-gray-100"
                    }`}
                  >
                    {heroContent.routes.penal.title}
                  </h3>
                  {selectedRoute === "penal" && (
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p
                  className={`text-sm transition-colors ${
                    selectedRoute === "penal"
                      ? "text-gray-700"
                      : "text-gray-200 group-hover:text-white"
                  }`}
                >
                  {heroContent.routes.penal.description}
                </p>
              </button>

              {/* Tarjeta 2: Comercial y estratégico */}
              <button
                onClick={() => setSelectedRoute("comercial")}
                className={`
                  relative p-6 rounded-lg border-2 text-left transition-all duration-300 group
                  ${
                    selectedRoute === "comercial"
                      ? "bg-white/95 border-white shadow-xl scale-105"
                      : "bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 backdrop-blur-sm"
                  }
                `}
                aria-pressed={selectedRoute === "comercial"}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3
                    className={`text-xl font-bold transition-colors ${
                      selectedRoute === "comercial"
                        ? "text-primary"
                        : "text-white group-hover:text-gray-100"
                    }`}
                  >
                    {heroContent.routes.comercial.title}
                  </h3>
                  {selectedRoute === "comercial" && (
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  )}
                </div>
                <p
                  className={`text-sm transition-colors ${
                    selectedRoute === "comercial"
                      ? "text-gray-700"
                      : "text-gray-200 group-hover:text-white"
                  }`}
                >
                  {heroContent.routes.comercial.description}
                </p>
              </button>
            </div>

            {/* Bullets dinámicos - Contenido que cambia según selección */}
            <div
              key={selectedRoute}
              className="mb-8 animate-fadeIn"
            >
              <ul className="space-y-3">
                {currentRoute.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-white"
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg font-medium drop-shadow-md">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs dinámicos */}
            <div
              key={`cta-${selectedRoute}`}
              className="flex flex-col sm:flex-row gap-4 mb-10 animate-fadeIn"
            >
              <Button
                variant="primary"
                size="md"
                href={currentRoute.cta.primary.href}
                className="px-8 py-4 font-semibold group shadow-xl"
              >
                <span className="relative">
                  {currentRoute.cta.primary.label}
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </span>
              </Button>
              <Button
                variant="outline-light"
                size="md"
                href={currentRoute.cta.secondary.href}
                className="px-8 py-4 font-semibold backdrop-blur-sm group"
              >
                <span className="relative">
                  {currentRoute.cta.secondary.label}
                  <span className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                    →
                  </span>
                </span>
              </Button>
            </div>

            {/* Franja de confianza */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20">
              {heroContent.trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-white/90 text-sm font-medium"
                >
                  {index > 0 && (
                    <span className="text-white/40 hidden sm:inline">|</span>
                  )}
                  <span className="drop-shadow-md">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side vacío para respetar el layout geométrico del diseño */}
          <div className="hidden lg:block lg:w-2/5" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
