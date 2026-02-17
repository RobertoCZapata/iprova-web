// Tipos para el sistema de gestión de casos legales

export interface Case {
  id: string;
  case_number: string; // IPV-2026-001
  title: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  case_type: string; // Penal, Laboral, Civil, etc.
  status: "activo" | "finalizado" | "archivado";
  priority: "baja" | "media" | "alta" | "urgente";
  deadline?: string;
  description?: string; // Descripción pública visible para el cliente
  internal_notes?: string; // Notas internas, solo para abogados
  amount?: number; // Cuantía estimada o costo del caso
  admin_id: string; // ID del abogado responsable
  created_at: string;
  updated_at: string;
  finalized_at?: string;
}

export interface CaseNote {
  id: string;
  case_id: string;
  note_type: "abogado" | "asistente";
  title: string;
  content: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CaseTask {
  id: string;
  case_id: string;
  title: string;
  description?: string;
  status: "pendiente" | "en_progreso" | "completada";
  priority: "baja" | "media" | "alta" | "urgente";
  due_date?: string;
  assigned_to?: string;
  completed_at?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CaseDocument {
  id: string;
  case_id: string;
  filename: string;
  file_path: string;
  file_size?: number;
  file_type?: string;
  description?: string;
  uploaded_by: string;
  uploaded_at: string;
}

// Tipos para formularios
export interface CreateCaseInput {
  title: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  case_type: string;
  priority: "baja" | "media" | "alta" | "urgente";
  deadline?: string;
  description?: string;
  amount?: number;
}

export interface CreateNoteInput {
  case_id: string;
  note_type: "abogado" | "asistente";
  title: string;
  content: string;
}

export interface CreateTaskInput {
  case_id: string;
  title: string;
  description?: string;
  priority?: "baja" | "media" | "alta" | "urgente";
  due_date?: string;
  assigned_to?: string;
}

// Tipos extendidos con relaciones
export interface CaseWithDetails extends Case {
  notes?: CaseNote[];
  tasks?: CaseTask[];
  documents?: CaseDocument[];
  admin_name?: string;
}

// Opciones de tipos de casos
export const CASE_TYPES = [
  "Penal",
  "Laboral",
  "Civil",
  "Comercial",
  "Familia",
  "Administrativo",
  "Disciplinario",
  "Otro",
] as const;

export type CaseType = (typeof CASE_TYPES)[number];

// Opciones de estados
export const CASE_STATUSES = ["activo", "finalizado", "archivado"] as const;

export type CaseStatus = (typeof CASE_STATUSES)[number];

// Opciones de prioridades (usadas para casos y tareas)
export const PRIORITIES = ["baja", "media", "alta", "urgente"] as const;

export type Priority = (typeof PRIORITIES)[number];

// Alias para compatibilidad
export const TASK_PRIORITIES = PRIORITIES;
export type TaskPriority = Priority;
