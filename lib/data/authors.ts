/**
 * Autores del Blog iPROVA
 */

import { Author } from "@/lib/types/blog";

export const authors: Record<string, Author> = {
  henryZapata: {
    id: "henry-zapata",
    name: "Henry Zapata Reyes",
    slug: "henry-zapata",
    role: "Socio Fundador - Abogado Penalista",
    bio: "Especialista en teoría del caso, defensa sancionatoria y contrainterrogatorio con más de 20 años de experiencia. Experto en defensa penal estratégica y litigación oral.",
    image: "/images/team/henry-zapata.jpg",
    specialties: [
      "Derecho Penal",
      "Derecho Disciplinario",
      "Contrainterrogatorio",
      "Teoría del Caso",
    ],
    email: "abogados@iprova.com.co",
    linkedin: "#",
  },
  javierPedraza: {
    id: "javier-pedraza",
    name: "Javier Pedraza",
    slug: "javier-pedraza",
    role: "Socio Fundador - Investigador Privado",
    bio: "Especialista en investigación privada, recolección de evidencia y análisis forense. Líder en investigación corporativa y casos complejos con más de 15 años de trayectoria.",
    image: "/images/team/javier-pedraza.jpg",
    specialties: [
      "Investigación Privada",
      "Evidencia Forense",
      "Investigación Corporativa",
      "Seguridad",
    ],
    email: "investigadores@iprova.com.co",
    linkedin: "#",
  },
  hernanZapata: {
    id: "hernan-zapata",
    name: "Hernán Darío Zapata Villar",
    slug: "hernan-zapata",
    role: "Asociado - Derecho Comercial y Laboral",
    bio: "Especialista en derecho comercial, laboral y derecho de familia. Asesor estratégico en contratación empresarial y relaciones laborales con enfoque preventivo.",
    image: "/images/team/hernan-dario.webp",
    specialties: [
      "Derecho Comercial",
      "Derecho Laboral",
      "Derecho de Familia",
      "Contratos",
    ],
    email: "abogados@iprova.com.co",
    linkedin: "#",
  },
};

export const getAuthorBySlug = (slug: string): Author | undefined => {
  return Object.values(authors).find((author) => author.slug === slug);
};

export const getAllAuthors = (): Author[] => {
  return Object.values(authors);
};
