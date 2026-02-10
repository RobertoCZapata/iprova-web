"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MessageSquare } from "lucide-react";
import { ctaContent, whatsappConfig, contactInfo } from "@/lib/data";

export function CtaSection() {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappConfig.phoneE164.replace("+", "")}?text=${encodeURIComponent(
      ctaContent.whatsapp.message,
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleScrollToContact = () => {
    const element = document.getElementById("contacto");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/90 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            {ctaContent.title}
          </h2>
          <div className="h-1 w-24 bg-white/40 mx-auto" />
          <p className="mt-6 text-xl text-white mb-12 max-w-2xl mx-auto leading-relaxed">
            {ctaContent.description} Conoce más sobre{" "}
            <a
              href="#servicios"
              className="text-white font-bold hover:text-white hover:underline"
              aria-label="Ir a la sección de servicios"
            >
              nuestros servicios
            </a>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Phone Button */}
            <motion.a
              href={ctaContent.phone.href}
              className="group bg-white text-primary px-8 py-4 rounded-sm flex items-center gap-3 hover:bg-white/95 transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[250px] justify-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Llamar ahora al ${ctaContent.phone.number}`}
            >
              <Phone
                className="group-hover:rotate-12 transition-transform"
                size={24}
              />
              <div className="text-left">
                <div className="text-xs text-primary uppercase tracking-wide">
                  {ctaContent.phone.label}
                </div>
                <div className="font-bold">{ctaContent.phone.number}</div>
              </div>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.button
              onClick={handleWhatsAppClick}
              className="group bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-sm flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl min-w-[250px] justify-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Enviar mensaje por WhatsApp a iPROVA"
            >
              <MessageSquare
                className="group-hover:scale-110 transition-transform"
                size={24}
              />
              <div className="text-left">
                <div className="text-xs text-white/90 uppercase tracking-wide">
                  {ctaContent.whatsapp.label}
                </div>
                <div className="font-bold">{ctaContent.whatsapp.action}</div>
              </div>
            </motion.button>

            {/* Email Button */}
            <motion.a
              href={ctaContent.email.href}
              className="group border-2 border-white text-white px-8 py-4 rounded-sm flex items-center gap-3 hover:bg-white/10 transition-all duration-300 min-w-[250px] justify-center font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Enviar correo electrónico a iPROVA"
            >
              <Mail size={24} />
              <div className="text-left">
                <div className="text-xs text-white uppercase tracking-wide">
                  {ctaContent.email.label}
                </div>
                <div className="font-bold">{ctaContent.email.action}</div>
              </div>
            </motion.a>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white text-sm mt-8"
          >
            <span className="font-semibold">{ctaContent.guarantee}</span> ·{" "}
            {ctaContent.freeConsultation}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
