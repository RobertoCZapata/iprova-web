-- Agregar campo de cuantía/costo estimado del caso
-- Script de migración para agregar el campo amount a la tabla cases

ALTER TABLE cases
ADD COLUMN IF NOT EXISTS amount DECIMAL(15, 2) DEFAULT 0;

-- Comentario para documentación
COMMENT ON COLUMN cases.amount IS 'Cuantía estimada o costo del caso en la moneda local';
