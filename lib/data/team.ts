/**
 * Team Configuration
 * Miembros del equipo iPROVA
 */

// Team Members
export interface TeamMember {
  name: string;
  title: string;
  focus: string;
  image: string;
  isFounding: boolean;
  linkedIn?: string;
}

export const teamMembers: TeamMember[] = [
  // Socios Fundadores
  {
    name: "Henry ZAPATA REYES",
    title: "Socio fundador | Penal y disciplinario | Contrainterrogatorio",
    focus: "Teoría del caso y defensa sancionatoria",
    image: "/images/team/henry-zapata.jpg",
    isFounding: true,
    linkedIn: "",
  },
  {
    name: "Javier PEDRAZA",
    title: "Socio fundador | Penal | Investigación privada",
    focus: "Investigación y evidencia",
    image: "/images/team/javier-pedraza.jpg",
    isFounding: true,
    linkedIn: "",
  },
  // Equipo / Asociados
  {
    name: "Hernán Darío ZAPATA VILLAR",
    title: "Asociado | Comercial y laboral",
    focus: "Contratos, laboral e insolvencia",
    image: "/images/team/hernan-dario.jpg",
    isFounding: false,
    linkedIn: "",
  },
];

// Team Section Content
export const teamSectionContent = {
  title: "Nuestro Equipo",
  description:
    "Un equipo integrado de abogados e investigadores, con método, técnica y rigor probatorio.",
} as const;
