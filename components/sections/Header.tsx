"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { LogoiProva } from "@/components/ui/LogoiProva";
import { useSession, signOut } from "next-auth/react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="iPROVA - Ir al inicio"
            >
              <LogoiProva
                width={240}
                height={75}
                className="h-16 md:h-20 w-auto transition-all duration-300"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Navegación principal">
            <Link
              href="/"
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir a Inicio"
            >
              Inicio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </Link>
            <button
              onClick={() => scrollToSection("servicios")}
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir a Servicios"
            >
              Servicios
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir a Nosotros"
            >
              Nosotros
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </button>
            <button
              onClick={() => scrollToSection("equipo")}
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir a Equipo"
            >
              Equipo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </button>
            <Link
              href="/blog"
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir al Blog"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </Link>
            <button
              onClick={() => scrollToSection("contacto")}
              className="relative text-gray-800 hover:text-primary transition-colors font-medium group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
              aria-label="Ir a Contacto"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
            </button>
          </nav>

          {/* CTA Buttons Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {status === "authenticated" && session?.user?.role === "admin" ? (
              <>
                <Link
                  href="/admin/blog"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors font-medium px-3 py-2 rounded-sm hover:bg-gray-50"
                  aria-label="Panel de Administración"
                >
                  <User size={18} />
                  <span className="text-sm">{session.user.name?.split(" ")[0]}</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors font-medium px-3 py-2 rounded-sm hover:bg-gray-50"
                  aria-label="Cerrar Sesión"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Salir</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="bg-primary text-white px-6 py-2.5 rounded-sm hover:bg-primary-light hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  aria-label="Agendar Consulta Legal"
                >
                  Agendar Consulta
                </button>
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors font-medium px-4 py-2 border border-gray-300 rounded-sm hover:border-primary"
                  aria-label="Iniciar Sesión"
                >
                  <User size={18} />
                  <span>Ingresar</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden pb-4 space-y-3"
            role="navigation"
            aria-label="Navegación móvil"
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir a Inicio"
            >
              Inicio
            </Link>
            <button
              onClick={() => scrollToSection("servicios")}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir a Servicios"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir a Nosotros"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("equipo")}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir a Equipo"
            >
              Equipo
            </button>
            <Link
              href="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir al Blog"
            >
              Blog
            </Link>
            <button
              onClick={() => scrollToSection("contacto")}
              className="block w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              aria-label="Ir a Contacto"
            >
              Contacto
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="w-full bg-primary text-white px-6 py-2.5 rounded-sm hover:bg-primary-light hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 font-semibold uppercase tracking-wide mt-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Agendar Consulta Legal"
            >
              Agendar Consulta
            </button>

            {/* Auth buttons mobile */}
            {status === "authenticated" && session?.user?.role === "admin" ? (
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                <Link
                  href="/admin/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 w-full text-left py-2 px-3 text-gray-800 hover:text-primary hover:bg-primary/5 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-label="Panel de Administración"
                >
                  <User size={18} />
                  <span>Panel Admin ({session.user.name?.split(" ")[0]})</span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center space-x-2 w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-label="Cerrar Sesión"
                >
                  <LogOut size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-2 w-full mt-3 px-6 py-2.5 border-2 border-primary text-primary rounded-sm hover:bg-primary hover:text-white transition-all duration-300 font-semibold uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Iniciar Sesión"
              >
                <User size={18} />
                <span>Ingresar</span>
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
