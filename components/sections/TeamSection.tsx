import Image from "next/image";
import { Linkedin } from "lucide-react";
import { teamMembers, teamSectionContent } from "@/lib/data";

export function TeamSection() {
  const foundingMembers = teamMembers.filter((m) => m.isFounding);
  const associates = teamMembers.filter((m) => !m.isFounding);

  return (
    <section className="py-24 bg-white" id="equipo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">
            Profesionales
          </span>
          <h2 className="text-4xl font-extrabold text-primary tracking-tight mb-3">
            {teamSectionContent.title}
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
          <p className="mt-6 max-w-2xl text-gray-600 mx-auto text-lg font-light">
            {teamSectionContent.description}
          </p>
        </div>

        {/* Socios Fundadores */}
        {foundingMembers.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              Socios Fundadores
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(320px,384px))] gap-8 max-w-6xl justify-items-center auto-rows-fr">
              {foundingMembers.map((member) => (
                <article
                  key={member.name}
                  className="group bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col w-full max-w-sm h-full"
                >
                  {/* Foto */}
                  <div className="relative w-full h-80 overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      fill
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-primary mb-2">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed min-h-[3rem]">
                      {member.title}
                    </p>
                    <div className="mb-4 flex-1">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        Enfoque
                      </span>
                      <p className="text-sm text-gray-700 mt-1 min-h-[2.5rem]">
                        {member.focus}
                      </p>
                    </div>

                    {/* Enlaces */}
                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <button className="text-sm text-primary font-semibold hover:underline">
                        Ver perfil
                      </button>
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        )}

        {/* Equipo / Asociados */}
        {associates.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-primary text-center mb-8">
              Equipo / Asociados
            </h3>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(320px,384px))] gap-8 max-w-6xl justify-items-center auto-rows-fr">
              {associates.map((member) => (
                <article
                  key={member.name}
                  className="group bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col w-full max-w-sm h-full"
                >
                  {/* Foto */}
                  <div className="relative w-full h-80 overflow-hidden bg-gray-200 flex-shrink-0">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      fill
                      className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold text-primary mb-2">
                      {member.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed min-h-[3rem]">
                      {member.title}
                    </p>
                    <div className="mb-4 flex-1">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                        Enfoque
                      </span>
                      <p className="text-sm text-gray-700 mt-1 min-h-[2.5rem]">
                        {member.focus}
                      </p>
                    </div>

                    {/* Enlaces */}
                    <div className="flex items-center gap-3 mt-auto pt-2">
                      <button className="text-sm text-primary font-semibold hover:underline">
                        Ver perfil
                      </button>
                      {member.linkedIn && (
                        <a
                          href={member.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <Linkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
