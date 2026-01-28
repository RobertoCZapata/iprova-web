/**
 * Team Configuration
 * Miembros del equipo iPROVA
 */

// Team Members
export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Henry Zapata Reyes",
    role: "Abogado Penalista",
    image: "/images/team/henry-zapata.jpg",
  },
  {
    name: "Javier Pedraza Lizarazo",
    role: "Abogado Investigador",
    image: "/images/team/javier-pedraza.jpg",
  },
  {
    name: "Maria Fernanda Gonzalez",
    role: "Abogada",
    image: "/images/team/maria-fernanda.jpg",
  },
  {
    name: "Hernan Dario Zapata",
    role: "Abogado Comercial",
    image: "/images/team/hernan-dario.jpg",
  },
];

// Team Section Content
export const teamSectionContent = {
  title: "Nuestro Equipo",
  description:
    "Profesionales comprometidos con la excelencia y la defensa de sus intereses.",
} as const;
