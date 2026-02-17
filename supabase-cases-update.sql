-- ============================================
-- Actualización de tablas CASES y USERS
-- Agregar campos: priority, deadline, avatar_url
-- ============================================

-- TABLA CASES: Agregar columna priority
ALTER TABLE cases
ADD COLUMN IF NOT EXISTS priority VARCHAR(50) DEFAULT 'media'
CHECK (priority IN ('baja', 'media', 'alta', 'urgente'));

-- TABLA CASES: Agregar columna deadline
ALTER TABLE cases
ADD COLUMN IF NOT EXISTS deadline DATE;

-- TABLA CASES: Crear índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_cases_priority ON cases(priority);
CREATE INDEX IF NOT EXISTS idx_cases_deadline ON cases(deadline);

-- TABLA CASES: Actualizar casos existentes con prioridad por defecto
UPDATE cases
SET priority = 'media'
WHERE priority IS NULL;

-- TABLA USERS: Agregar columna avatar_url
ALTER TABLE users
ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);

-- Comentarios
COMMENT ON COLUMN cases.priority IS 'Prioridad del caso: baja, media, alta, urgente';
COMMENT ON COLUMN cases.deadline IS 'Fecha límite para el caso';
COMMENT ON COLUMN users.avatar_url IS 'URL de la foto de perfil del usuario';

-- Verificar cambios en cases
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'cases'
AND column_name IN ('priority', 'deadline');

-- Verificar cambios en users
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users'
AND column_name = 'avatar_url';
