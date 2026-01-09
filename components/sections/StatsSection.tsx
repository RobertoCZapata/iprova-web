import { statistics } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-10 transform rotate-45 translate-x-32 -translate-y-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary opacity-10 transform rotate-45 -translate-x-24 translate-y-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
            Resultados
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
            Nuestro Rendimiento
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {statistics.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group text-center p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-secondary/50"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary/20 rounded-full group-hover:bg-secondary/30 transition-colors duration-300">
                    <Icon className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl md:text-3xl font-bold text-secondary ml-1">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-300 uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
