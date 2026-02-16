-- ============================================
-- SCHEMA: Sistema de Gestión de Casos Legales
-- ============================================

-- Tabla de casos legales
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number VARCHAR(50) UNIQUE NOT NULL, -- Ej: IPV-2024-001
  title VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255),
  client_phone VARCHAR(50),
  case_type VARCHAR(100) NOT NULL, -- Ej: Penal, Laboral, Civil, etc.
  status VARCHAR(50) NOT NULL DEFAULT 'activo', -- activo, finalizado, archivado
  description TEXT,
  admin_id UUID REFERENCES users(id) NOT NULL, -- Abogado responsable
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  finalized_at TIMESTAMP
);

-- Índices para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_admin_id ON cases(admin_id);
CREATE INDEX IF NOT EXISTS idx_cases_case_number ON cases(case_number);
CREATE INDEX IF NOT EXISTS idx_cases_created_at ON cases(created_at DESC);

-- Tabla de notas del caso
CREATE TABLE IF NOT EXISTS case_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  note_type VARCHAR(50) NOT NULL, -- 'abogado' o 'asistente'
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_case_notes_case_id ON case_notes(case_id);
CREATE INDEX IF NOT EXISTS idx_case_notes_type ON case_notes(note_type);
CREATE INDEX IF NOT EXISTS idx_case_notes_created_at ON case_notes(created_at DESC);

-- Tabla de tareas del caso
CREATE TABLE IF NOT EXISTS case_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pendiente', -- pendiente, en_progreso, completada
  priority VARCHAR(50) DEFAULT 'media', -- baja, media, alta, urgente
  due_date DATE,
  assigned_to UUID REFERENCES users(id),
  completed_at TIMESTAMP,
  created_by UUID REFERENCES users(id) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_case_tasks_case_id ON case_tasks(case_id);
CREATE INDEX IF NOT EXISTS idx_case_tasks_status ON case_tasks(status);
CREATE INDEX IF NOT EXISTS idx_case_tasks_due_date ON case_tasks(due_date);

-- Tabla de documentos del caso
CREATE TABLE IF NOT EXISTS case_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL, -- Path en Supabase Storage
  file_size INTEGER, -- En bytes
  file_type VARCHAR(50), -- PDF, DOCX, JPG, etc.
  description TEXT,
  uploaded_by UUID REFERENCES users(id) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_case_documents_case_id ON case_documents(case_id);
CREATE INDEX IF NOT EXISTS idx_case_documents_uploaded_at ON case_documents(uploaded_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en todas las tablas
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;

-- Políticas para CASOS
-- Los admins pueden ver y gestionar todos los casos
CREATE POLICY "Admins can view all cases"
ON cases FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can insert cases"
ON cases FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can update cases"
ON cases FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can delete cases"
ON cases FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Políticas para NOTAS
CREATE POLICY "Admins can manage all case notes"
ON case_notes FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Políticas para TAREAS
CREATE POLICY "Admins can manage all case tasks"
ON case_tasks FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Políticas para DOCUMENTOS
CREATE POLICY "Admins can manage all case documents"
ON case_documents FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================
-- TRIGGERS para updated_at
-- ============================================

-- Trigger para cases
CREATE TRIGGER update_cases_updated_at
BEFORE UPDATE ON cases
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para case_notes
CREATE TRIGGER update_case_notes_updated_at
BEFORE UPDATE ON case_notes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para case_tasks
CREATE TRIGGER update_case_tasks_updated_at
BEFORE UPDATE ON case_tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCIÓN HELPER: Generar siguiente número de caso
-- ============================================

CREATE OR REPLACE FUNCTION generate_case_number()
RETURNS TEXT AS $$
DECLARE
  current_year TEXT;
  last_number INTEGER;
  new_number TEXT;
BEGIN
  current_year := TO_CHAR(NOW(), 'YYYY');

  -- Obtener el último número del año actual
  SELECT COALESCE(
    MAX(CAST(SPLIT_PART(case_number, '-', 3) AS INTEGER)),
    0
  ) INTO last_number
  FROM cases
  WHERE case_number LIKE 'IPV-' || current_year || '-%';

  -- Generar nuevo número
  new_number := 'IPV-' || current_year || '-' || LPAD((last_number + 1)::TEXT, 3, '0');

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMENTARIOS
-- ============================================

COMMENT ON TABLE cases IS 'Tabla principal de casos legales';
COMMENT ON TABLE case_notes IS 'Notas del abogado y asistente para cada caso';
COMMENT ON TABLE case_tasks IS 'Tareas y pendientes relacionados con cada caso';
COMMENT ON TABLE case_documents IS 'Documentos adjuntos a los casos';
COMMENT ON FUNCTION generate_case_number() IS 'Genera automáticamente el siguiente número de caso en formato IPV-YYYY-XXX';
