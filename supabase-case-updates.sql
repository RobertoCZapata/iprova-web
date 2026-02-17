-- ============================================
-- Sistema de Actualizaciones de Casos iPROVA
-- Agregar notas internas + línea de tiempo
-- ============================================

-- PASO 1: Agregar campo internal_notes a la tabla cases
ALTER TABLE cases
ADD COLUMN IF NOT EXISTS internal_notes TEXT;

COMMENT ON COLUMN cases.internal_notes IS 'Notas internas privadas, solo visibles para abogados';

-- PASO 2: Crear tabla case_updates para línea de tiempo
CREATE TABLE IF NOT EXISTS case_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  update_type VARCHAR(50) DEFAULT 'general' CHECK (update_type IN (
    'general',
    'documento',
    'audiencia',
    'resolucion',
    'pago',
    'estado',
    'otro'
  )),
  created_by UUID NOT NULL REFERENCES users(id),
  is_visible_to_client BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PASO 3: Crear índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_case_updates_case_id ON case_updates(case_id);
CREATE INDEX IF NOT EXISTS idx_case_updates_created_at ON case_updates(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_case_updates_visible ON case_updates(is_visible_to_client);

-- PASO 4: Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_case_updates_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- PASO 5: Crear trigger para updated_at
DROP TRIGGER IF EXISTS case_updates_updated_at_trigger ON case_updates;
CREATE TRIGGER case_updates_updated_at_trigger
  BEFORE UPDATE ON case_updates
  FOR EACH ROW
  EXECUTE FUNCTION update_case_updates_updated_at();

-- PASO 6: Habilitar Row Level Security (RLS)
ALTER TABLE case_updates ENABLE ROW LEVEL SECURITY;

-- PASO 7: Políticas de seguridad
-- Permitir a admins ver todas las actualizaciones
CREATE POLICY "Admins can view all updates"
  ON case_updates FOR SELECT
  USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Permitir a admins crear actualizaciones
CREATE POLICY "Admins can create updates"
  ON case_updates FOR INSERT
  WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- Permitir a admins actualizar sus propias actualizaciones
CREATE POLICY "Admins can update their own updates"
  ON case_updates FOR UPDATE
  USING (created_by = auth.uid());

-- Permitir a admins eliminar sus propias actualizaciones
CREATE POLICY "Admins can delete their own updates"
  ON case_updates FOR DELETE
  USING (created_by = auth.uid());

-- PASO 8: Comentarios descriptivos
COMMENT ON TABLE case_updates IS 'Registro de actualizaciones y eventos del caso (línea de tiempo)';
COMMENT ON COLUMN case_updates.title IS 'Título corto de la actualización';
COMMENT ON COLUMN case_updates.description IS 'Descripción detallada de la actualización';
COMMENT ON COLUMN case_updates.update_type IS 'Tipo de actualización: general, documento, audiencia, resolución, pago, estado, otro';
COMMENT ON COLUMN case_updates.is_visible_to_client IS 'Si true, el cliente puede ver esta actualización en su portal';
COMMENT ON COLUMN case_updates.created_by IS 'ID del admin que creó la actualización';

-- PASO 9: Verificar que todo se creó correctamente
SELECT
  'cases.internal_notes' AS campo,
  EXISTS(
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = 'cases'
    AND column_name = 'internal_notes'
  ) AS existe;

SELECT
  'case_updates table' AS tabla,
  EXISTS(
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'case_updates'
  ) AS existe;

SELECT
  'Total case_updates records' AS descripcion,
  COUNT(*) AS cantidad
FROM case_updates;

-- ✅ Script completado exitosamente
