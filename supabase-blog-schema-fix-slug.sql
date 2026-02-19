-- ============================================
-- FIX: Función generate_slug sin dependencia de UNACCENT
-- ============================================

-- Reemplazar la función generate_slug con una versión que no requiere la extensión unaccent
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convertir a minúsculas
  base_slug := LOWER(title);

  -- Reemplazar acentos manualmente con TRANSLATE
  base_slug := TRANSLATE(
    base_slug,
    'áéíóúàèìòùäëïöüâêîôûãõñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÃÕÑÇ',
    'aeiouaeiouaeiouaeiouaoncAEIOUAEIOUAEIOUAEIOUAONC'
  );

  -- Reemplazar espacios con guiones y eliminar caracteres especiales
  base_slug := REGEXP_REPLACE(
    REGEXP_REPLACE(
      base_slug,
      '[^a-z0-9\s-]', '', 'g'
    ),
    '\s+', '-', 'g'
  );

  -- Eliminar guiones duplicados y al inicio/final
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  base_slug := TRIM(BOTH '-' FROM base_slug);

  -- Verificar unicidad
  final_slug := base_slug;

  WHILE EXISTS (SELECT 1 FROM blog_posts WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;
