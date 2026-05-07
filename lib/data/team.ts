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
  isStrategicAlly?: boolean;
  linkedIn?: string;
}

export const teamMembers: TeamMember[] = [
  // Socios Fundadores
  {
    name: "Javier PEDRAZA",
    title: "Socio fundador | Penal | Investigación privada",
    focus: "Investigación y evidencia",
    image: "/images/team/javier-pedraza.jpg",
    isFounding: true,
    linkedIn: "",
  },
  // Aliados Estratégicos
  {
    name: "Henry ZAPATA REYES",
    title: "Aliado Estratégico | Penal, Disciplinario y Contrainterrogatorio",
    focus: "Teoría del caso y defensa sancionatoria",
    image: "/images/team/henry-zapata.jpg",
    isFounding: false,
    isStrategicAlly: true,
    linkedIn: "",
  },
  // Socios Fundadores
  {
    name: "Hernán Darío ZAPATA VILLAR",
    title: "Socio fundador | Comercial y laboral",
    focus: "Contratos, laboral e insolvencia",
    image: "/images/team/hernan-dario.jpg",
    isFounding: true,
    linkedIn: "",
  },
];

// Team Section Content
export const teamSectionContent = {
  title: "Nuestro Equipo",
  description:
    "Un equipo integrado de abogados e investigadores, con método, técnica y rigor probatorio.",
} as const;

// Strategic Allies Content
export const strategicAlliesContent = {
  title: "Aliados Estratégicos",
  description:
    "iPROVA cuenta con alianzas estratégicas con profesionales de alto nivel que nos brindan servicios dedicados y exclusivos en áreas especializadas del derecho. Estos aliados trabajan en coordinación estrecha con nuestro equipo, garantizando la excelencia en cada caso.",
} as const;
