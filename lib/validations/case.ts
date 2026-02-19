import { z } from "zod";

// Schema de validación para creación de caso
export const createCaseSchema = z.object({
  title: z
    .string()
    .min(1, "El título del caso es requerido")
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(255, "El título no puede exceder 255 caracteres"),
  client_name: z
    .string()
    .min(1, "El nombre del cliente es requerido")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  client_email: z
    .string()
    .email("Email inválido")
    .toLowerCase()
    .optional()
    .or(z.literal("")),
  client_phone: z
    .string()
    .regex(/^[0-9+\-\s()]*$/, "Formato de teléfono inválido")
    .optional()
    .or(z.literal("")),
  case_type: z.enum(
    [
      "penal",
      "laboral",
      "comercial",
      "disciplinario",
      "investigacion",
      "consultoria",
    ],
    {
      errorMap: () => ({ message: "Selecciona un tipo de caso válido" }),
    }
  ),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(2000, "La descripción no puede exceder 2000 caracteres"),
  priority: z.enum(["baja", "media", "alta", "urgente"], {
    errorMap: () => ({ message: "Selecciona una prioridad válida" }),
  }),
  deadline: z.string().optional().or(z.literal("")),
});

export type CreateCaseFormData = z.infer<typeof createCaseSchema>;
