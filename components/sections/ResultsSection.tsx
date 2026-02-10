"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { resultsContent } from "@/lib/data";

export function ResultsSection() {
  return (
    <section
      id="resultados"
      className="py-20 lg:py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
            {resultsContent.title}
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {resultsContent.description}{" "}
            <a href="#equipo" className="text-primary hover:text-primary-dark font-semibold hover:underline">
              Conoce a nuestro equipo
            </a>{" "}
            y{" "}
            <a href="#servicios" className="text-primary hover:text-primary-dark font-semibold hover:underline">
              nuestros servicios
            </a>.
          </p>
        </motion.div>

        {/* Work Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {resultsContent.workIndicators.map((indicator, index) => {
            const Icon = indicator.icon;
            // Dividir la descripción para resaltar ZAPATA & PEDRAZA
            const parts = indicator.description.split(/(ZAPATA & PEDRAZA)/g);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-6 lg:p-8 hover:shadow-xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-primary mb-3">
                  {indicator.title}
                </h3>
                <p className="text-sm lg:text-base text-gray-700 leading-relaxed">
                  {parts.map((part, i) =>
                    part === "ZAPATA & PEDRAZA" ? (
                      <span key={i} className="text-primary font-bold">
                        {part}
                      </span>
                    ) : (
                      part
                    )
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Area Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <h3 className="text-xl lg:text-2xl font-bold text-primary text-center mb-8 lg:mb-10">
            Desglose por Área de Práctica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {resultsContent.areaResults.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white border-2 border-primary/20 rounded-lg p-6 lg:p-8 hover:border-primary transition-colors"
              >
                <h4 className="text-lg lg:text-xl font-bold text-primary mb-4 lg:mb-6">
                  {area.title}
                </h4>

                <div className="space-y-3 lg:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm lg:text-base">
                      {area.label ? "Clientes" : "Casos"}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-primary">
                      {area.cases}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm lg:text-base">
                      {area.label ? "Retención" : "Tasa de Éxito"}
                    </span>
                    <span className="text-xl lg:text-2xl font-bold text-primary">
                      {area.success}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 lg:mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: area.success }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.15 + 0.3 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Case */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-primary text-white rounded-xl p-8 lg:p-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
              CASO DESTACADO
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
              {resultsContent.featuredCase.title}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8">
              <div>
                <p className="text-white text-base lg:text-lg leading-relaxed mb-6">
                  {resultsContent.featuredCase.description}
                </p>

                <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                  <CheckCircle
                    className="text-green-400 flex-shrink-0 mt-1"
                    size={24}
                  />
                  <div>
                    <div className="font-bold text-lg mb-1">
                      {resultsContent.featuredCase.result}
                    </div>
                    <div className="text-white">
                      {resultsContent.featuredCase.resultDetail}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 lg:p-8">
                <div className="text-6xl lg:text-7xl text-white/30 font-serif mb-4">
                  "
                </div>
                <p className="text-base lg:text-lg italic leading-relaxed mb-4">
                  {resultsContent.featuredCase.testimonial}
                </p>
                <div className="text-6xl lg:text-7xl text-white/30 font-serif mb-4 text-right">
                  "
                </div>
                <div className="text-sm text-white font-semibold">
                  — {resultsContent.featuredCase.client},{" "}
                  {resultsContent.featuredCase.year}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
