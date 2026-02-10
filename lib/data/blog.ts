/**
 * Contenido del Blog iPROVA
 * Posts de ejemplo - Estos serán reemplazados por Sanity.io en producción
 */

import { BlogCategory, BlogPost } from "@/lib/types/blog";
import { authors } from "./authors";

export const blogCategories: Record<string, BlogCategory> = {
  penal: {
    id: "derecho-penal",
    name: "Derecho Penal",
    slug: "derecho-penal",
    color: "red",
    description: "Defensa penal, estrategia legal y casos judiciales",
  },
  laboral: {
    id: "derecho-laboral",
    name: "Derecho Laboral",
    slug: "derecho-laboral",
    color: "blue",
    description: "Relaciones laborales, despidos y asesoría empresarial",
  },
  corporativo: {
    id: "derecho-corporativo",
    name: "Derecho Corporativo",
    slug: "derecho-corporativo",
    color: "green",
    description: "Contratos, compliance y asesoría empresarial",
  },
  investigacion: {
    id: "investigacion",
    name: "Investigación",
    slug: "investigacion",
    color: "yellow",
    description: "Investigación privada, evidencia y casos complejos",
  },
};

// Posts de ejemplo
export const blogPosts: BlogPost[] = [
  {
    id: "defensa-penal-guia-completa-2026",
    title: "Cómo defenderse de una acusación penal: Guía completa 2026",
    slug: "defensa-penal-guia-completa-2026",
    excerpt:
      "Guía práctica y legal sobre qué hacer si enfrentas una acusación penal en Colombia. Conoce tus derechos, el proceso y estrategias de defensa.",
    content: `# Introducción

Si te enfrentas a una acusación penal, es crucial actuar rápido y con conocimiento. Esta guía te explica paso a paso qué hacer.

## Tus derechos fundamentales

1. **Derecho a la defensa**: Tienes derecho a un abogado desde el primer momento
2. **Presunción de inocencia**: Eres inocente hasta que se demuestre lo contrario
3. **Derecho a guardar silencio**: No estás obligado a declarar contra ti mismo

## Qué hacer inmediatamente

### 1. Contacta un abogado penalista

No esperes. El tiempo es crítico en casos penales. Un abogado experimentado puede:

- Evaluar tu caso objetivamente
- Proteger tus derechos desde el inicio
- Evitar errores que comprometan tu defensa

### 2. No des declaraciones sin tu abogado

Muchas personas piensan que "no tienen nada que ocultar" y hablan libremente con las autoridades. **Esto es un error grave**. Incluso declaraciones inocentes pueden ser malinterpretadas.

## El proceso penal paso a paso

...

## Conclusión

La defensa penal requiere experiencia, estrategia y conocimiento profundo del sistema judicial. En iPROVA contamos con más de 20 años defendiendo exitosamente casos complejos.

**¿Necesitas asesoría inmediata?** Contáctanos ahora.`,
    featuredImage: "/images/blog/defensa-penal-2026.jpg",
    author: authors.henryZapata,
    category: blogCategories.penal,
    tags: ["defensa penal", "derechos", "proceso judicial", "colombia"],
    publishedAt: "2026-02-10",
    readingTime: 8,
    views: 1234,
    featured: true,
    seo: {
      metaTitle:
        "Defensa Penal: Guía Completa 2026 | Abogados Penalistas iPROVA",
      metaDescription:
        "Guía práctica sobre cómo defenderse de acusaciones penales en Colombia. Conoce tus derechos y el proceso judicial con abogados expertos.",
      keywords: [
        "defensa penal colombia",
        "abogado penalista",
        "derechos del acusado",
        "proceso penal",
      ],
    },
  },
  {
    id: "investigacion-privada-cuando-contratar",
    title:
      "Investigación privada: ¿Cuándo y por qué contratarla para tu empresa?",
    slug: "investigacion-privada-cuando-contratar",
    excerpt:
      "Descubre cuándo tu empresa necesita investigación privada, qué puede investigarse legalmente y cómo proteger tu negocio.",
    content: `# ¿Tu empresa necesita un investigador privado?

La investigación privada corporativa es una herramienta legal poderosa para proteger los intereses de tu empresa.

## Casos comunes donde se requiere investigación

### 1. Fraude interno

- Desfalcos
- Malversación de fondos
- Robo de información

### 2. Competencia desleal

- Espionaje industrial
- Violación de acuerdos de confidencialidad

...`,
    featuredImage: "/images/blog/investigacion-privada.jpg",
    author: authors.javierPedraza,
    category: blogCategories.investigacion,
    tags: ["investigación privada", "empresas", "seguridad corporativa"],
    publishedAt: "2026-02-03",
    readingTime: 6,
    views: 892,
  },
  {
    id: "despido-injustificado-que-hacer",
    title: "Despido injustificado: Tus derechos y cómo reclamarlos",
    slug: "despido-injustificado-que-hacer",
    excerpt:
      "Si fuiste despedido sin justa causa, tienes derechos. Aprende qué hacer, cómo calcular tu indemnización y cuándo demandar.",
    content: `# Despido Injustificado en Colombia

El despido sin justa causa es uno de los conflictos laborales más comunes. Conoce tus derechos.

## ¿Qué es un despido injustificado?

Un despido es injustificado cuando el empleador termina el contrato sin una causa justa establecida en el Código Sustantivo del Trabajo.

## Tus derechos

1. **Indemnización**: Calculada según tu salario y antigüedad
2. **Preaviso**: 15 días si no te avisaron
3. **Prestaciones sociales**: Cesantías, prima, vacaciones

...`,
    featuredImage: "/images/blog/despido-injustificado.jpg",
    author: authors.hernanZapata,
    category: blogCategories.laboral,
    tags: ["derecho laboral", "despido", "indemnización", "colombia"],
    publishedAt: "2026-01-27",
    readingTime: 7,
    views: 1567,
    featured: true,
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};

export const getBlogPostsByCategory = (
  categorySlug: string
): BlogPost[] => {
  return blogPosts.filter((post) => post.category.slug === categorySlug);
};

export const getBlogPostsByAuthor = (authorSlug: string): BlogPost[] => {
  return blogPosts.filter((post) => post.author.slug === authorSlug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};
