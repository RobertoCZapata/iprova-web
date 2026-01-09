import Image from "next/image";
import { teamMembers, teamSectionContent } from "@/lib/data";

export function TeamSection() {
  return (
    <section className="py-24 bg-white dark:bg-background-dark" id="equipo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
            Profesionales
          </span>
          <h2 className="text-4xl font-extrabold text-primary dark:text-white tracking-tight mb-4">
            {teamSectionContent.title}
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mt-6" />
          <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300 mx-auto text-lg font-light">
            {teamSectionContent.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="group text-center flex flex-col items-center"
            >
              {/* Foto circular - Estándar moderno para perfiles profesionales */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Overlay sutil del color primario para integración con la marca */}
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-all duration-300" />
                </div>
              </div>

              {/* Información */}
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2 tracking-tight">
                {member.name}
              </h3>
              <p className="text-secondary text-sm font-medium uppercase tracking-wider">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
