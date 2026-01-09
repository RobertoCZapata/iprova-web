"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HelpCircle,
  MessageSquare,
  Scale,
  Search,
  ShieldAlert,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "investigacion",
    title: "Investigación Privada",
    icon: <Search className="w-5 h-5" />,
    message:
      "Hola iPROVA, estoy interesado en servicios de Investigación Privada y Empresarial.",
  },
  {
    id: "legal",
    title: "Defensa Jurídica",
    icon: <Scale className="w-5 h-5" />,
    message:
      "Hola iPROVA, requiero asistencia legal y defensa jurídica urgente.",
  },
  {
    id: "seguridad",
    title: "Seguridad Corporativa",
    icon: <ShieldAlert className="w-5 h-5" />,
    message:
      "Hola iPROVA, quisiera consultar sobre análisis de riesgos y seguridad.",
  },
  {
    id: "general",
    title: "Consulta General",
    icon: <HelpCircle className="w-5 h-5" />,
    message: "Hola iPROVA, tengo una consulta general.",
  },
] as const;

const WHATSAPP_PHONE = "573182200086";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceClick = (message: string) => {
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
      message,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end space-y-3 space-y-reverse md:bottom-6 md:right-6">
      {/* Texto animado "¿En qué podemos ayudarte?" */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mb-3 mr-2 relative"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-primary text-white px-4 py-2.5 rounded-lg shadow-xl border border-white/10 backdrop-blur-sm"
            >
              <p className="text-xs font-medium whitespace-nowrap">
                ¿En qué podemos ayudarte?
              </p>
              {/* Flecha apuntando al botón */}
              <div className="absolute bottom-0 right-6 transform translate-y-full">
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-primary" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="widget"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[90vw] max-w-sm rounded-2xl bg-[#00184A] shadow-2xl shadow-black/40 border border-white/10 overflow-hidden text-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#00184A]/95">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-secondary">
                  iPROVA Concierge
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[0.7rem] font-medium text-green-500 uppercase tracking-wide">
                    En línea
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-[#020617]/80 backdrop-blur-sm">
              <ul className="flex flex-col divide-y divide-white/10">
                {services.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => handleServiceClick(service.message)}
                      className={cn(
                        "w-full px-4 py-3 flex items-center justify-between gap-3 text-left",
                        "text-slate-100 hover:text-white",
                        "bg-transparent hover:bg-white/5",
                        "transition-all duration-150",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-secondary">
                          {service.icon}
                        </div>
                        <span className="text-xs font-medium tracking-wide uppercase">
                          {service.title}
                        </span>
                      </div>
                      <span className="text-[0.6rem] text-slate-400 group-hover:text-slate-200">
                        Abrir chat
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
          "h-14 w-14 md:h-16 md:w-16 transition-all duration-200",
          isOpen
            ? "bg-primary/95 text-white hover:bg-primary"
            : "bg-primary text-white hover:bg-primary-light",
        )}
        aria-label={isOpen ? "Cerrar menú de WhatsApp" : "Abrir menú de WhatsApp iPROVA"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <X className="h-7 w-7" />
            </motion.span>
          ) : (
            <motion.span
              key="message"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="h-7 w-7" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse badge when closed - verde estándar de WhatsApp */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 ring-2 ring-primary" />
          </span>
        )}
      </button>
    </div>
  );
}


