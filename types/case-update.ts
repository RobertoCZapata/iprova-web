export const UPDATE_TYPES = [
  "general",
  "documento",
  "audiencia",
  "resolucion",
  "pago",
  "estado",
  "otro",
] as const;

export type UpdateType = (typeof UPDATE_TYPES)[number];

export interface CaseUpdate {
  id: string;
  case_id: string;
  title: string;
  description: string;
  update_type: UpdateType;
  created_by: string;
  is_visible_to_client: boolean;
  created_at: string;
  updated_at: string;
  admin_name?: string; // Populated by join
}

export interface CreateCaseUpdateInput {
  case_id: string;
  title: string;
  description: string;
  update_type: UpdateType;
  is_visible_to_client: boolean;
}

export interface UpdateCaseUpdateInput {
  title?: string;
  description?: string;
  update_type?: UpdateType;
  is_visible_to_client?: boolean;
}
