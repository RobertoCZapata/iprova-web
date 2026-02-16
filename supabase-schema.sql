-- Schema de Base de Datos iPROVA
-- Ejecutar este script en Supabase SQL Editor

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índice para búsquedas rápidas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Comentarios para documentación
COMMENT ON TABLE users IS 'Usuarios del sistema (administradores y clientes)';
COMMENT ON COLUMN users.role IS 'admin = Henry/Javier/Hernán, client = clientes con casos';

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver su propia información
CREATE POLICY "Users can view own data"
ON users FOR SELECT
USING (auth.uid()::text = id::text);

-- Policy: Solo admins pueden insertar usuarios
CREATE POLICY "Admins can insert users"
ON users FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id::text = auth.uid()::text
    AND users.role = 'admin'
  )
);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar usuarios administradores iniciales (con contraseñas temporales)
-- Nota: Las contraseñas deben ser hasheadas con bcrypt antes de insertar
-- Estas son solo placeholders, se crearán vía API

-- Verificar que la tabla fue creada
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public' AND table_name = 'users';
