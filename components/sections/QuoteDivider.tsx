export function QuoteDivider() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary via-primary-light to-primary relative overflow-hidden">
      {/* Pattern de fondo sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Quote */}
        <blockquote className="text-white">
          <p className="text-2xl md:text-3xl lg:text-4xl font-light italic leading-relaxed mb-6">
            "Más que promesas: método, evidencia y estrategia"
          </p>
          <footer className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-12 bg-white/50" />
            <cite className="text-base md:text-lg font-semibold not-italic tracking-wider">
              iPROVA
            </cite>
            <div className="h-[1px] w-12 bg-white/50" />
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
