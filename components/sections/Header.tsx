"use client";

import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { navItems } from "@/lib/data";

export function Header() {
  return (
    <nav className="fixed w-full z-50 bg-primary/90 backdrop-blur-sm shadow-lg border-b border-gray-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Link href="#inicio" className="flex items-center space-x-3">
                <div className="w-10 h-10 border border-secondary rounded flex items-center justify-center">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-2xl tracking-[0.2em] leading-none">
                    iPROVA
                  </span>
                  <span className="text-secondary text-[0.65rem] tracking-wider uppercase">
                    Abogados e Investigadores
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors ${
                    item.label === "Contacto"
                      ? "bg-secondary text-white hover:bg-white hover:text-primary px-6 rounded-sm font-bold"
                      : "text-white hover:text-secondary"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded="false"
              className="bg-primary-light inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

