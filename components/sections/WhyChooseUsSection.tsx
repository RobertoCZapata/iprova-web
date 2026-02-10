"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Award } from "lucide-react";
import { whyChooseUsContent } from "@/lib/data";

export function WhyChooseUsSection() {
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
    <section className="py-20 bg-white" id="por-que-elegirnos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-extrabold text-primary mb-3">
              {whyChooseUsContent.title}
            </h2>
            <div className="h-1 w-24 bg-secondary mb-6" />
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {whyChooseUsContent.description}
            </p>

            <div className="space-y-4">
              {whyChooseUsContent.reasons.map((reason, index) => {
                // Resaltar ZAPATA & PEDRAZA en azul
                const parts = reason.split(/(ZAPATA & PEDRAZA)/g);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="text-primary flex-shrink-0 mt-1"
                      size={24}
                    />
                    <span className="text-gray-700">
                      {parts.map((part, i) =>
                        part === "ZAPATA & PEDRAZA" ? (
                          <span key={i} className="text-primary font-bold">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <motion.button
              onClick={handleScrollToContact}
              className="mt-8 bg-primary text-white px-8 py-3 rounded-sm hover:bg-primary-light transition-all duration-300 font-semibold uppercase tracking-wide"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {whyChooseUsContent.cta.label}
            </motion.button>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                alt="Equipo profesional de abogados"
                width={800}
                height={500}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-lg shadow-xl max-w-xs border border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {whyChooseUsContent.floatingCard.value}
                  </div>
                  <div className="text-sm text-gray-600">
                    {whyChooseUsContent.floatingCard.label}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
