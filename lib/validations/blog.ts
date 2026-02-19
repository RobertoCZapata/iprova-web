import { z } from "zod";

// Schema de validación para blog post
export const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(255, "El título no puede exceder 255 caracteres"),
  slug: z
    .string()
    .min(1, "El slug es requerido")
    .max(255, "El slug no puede exceder 255 caracteres")
    .regex(/^[a-z0-9-]+$/, "El slug solo puede contener letras minúsculas, números y guiones"),
  excerpt: z
    .string()
    .min(1, "El extracto es requerido")
    .max(500, "El extracto no puede exceder 500 caracteres"),
  content: z
    .string()
    .min(50, "El contenido debe tener al menos 50 caracteres"),
  featured_image: z
    .string()
    .url("URL de imagen inválida")
    .optional()
    .or(z.literal("")),
  category: z.enum([
    "Derecho Penal",
    "Derecho Laboral",
    "Derecho Comercial",
    "Derecho Disciplinario",
    "Investigación Privada",
    "Noticias",
  ]),
  featured: z.boolean().default(false),
  meta_title: z
    .string()
    .max(60, "El meta título no puede exceder 60 caracteres")
    .optional()
    .or(z.literal("")),
  meta_description: z
    .string()
    .max(160, "La meta descripción no puede exceder 160 caracteres")
    .optional()
    .or(z.literal("")),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).max(10, "Máximo 10 tags permitidos").optional(),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;
