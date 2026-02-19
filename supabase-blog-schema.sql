-- ============================================
-- SCHEMA: Sistema de Gestión de Blog iPROVA
-- ============================================
-- Este script crea las tablas, índices, políticas RLS,
-- triggers y funciones para el sistema de blog
-- ============================================

-- ============================================
-- TABLA: blog_posts
-- ============================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id UUID REFERENCES users(id) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  reading_time INTEGER,
  views INTEGER DEFAULT 0,

  -- SEO fields
  meta_title VARCHAR(255),
  meta_description TEXT,
  keywords TEXT[],

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('draft', 'published', 'archived')),
  CONSTRAINT valid_category CHECK (category IN ('Derecho Penal', 'Derecho Laboral', 'Derecho Corporativo', 'Investigación'))
);

-- ============================================
-- TABLA: blog_post_tags
-- ============================================
CREATE TABLE IF NOT EXISTS blog_post_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE NOT NULL,
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Evitar tags duplicados para el mismo post
  UNIQUE(post_id, tag)
);

-- ============================================
-- ÍNDICES
-- ============================================

-- Índices para búsquedas y filtros
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_views ON blog_posts(views DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- Índices para tags
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_post_id ON blog_post_tags(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_tags_tag ON blog_post_tags(tag);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS en ambas tablas
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLÍTICAS RLS: blog_posts - ADMIN
-- ============================================

-- Admins pueden ver todos los posts
CREATE POLICY "Admins can view all blog posts"
ON blog_posts FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Admins pueden insertar posts
CREATE POLICY "Admins can insert blog posts"
ON blog_posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Admins pueden actualizar posts
CREATE POLICY "Admins can update blog posts"
ON blog_posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- Admins pueden eliminar posts
CREATE POLICY "Admins can delete blog posts"
ON blog_posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================
-- POLÍTICAS RLS: blog_posts - PÚBLICO
-- ============================================

-- Público puede ver solo posts publicados
CREATE POLICY "Public can view published blog posts"
ON blog_posts FOR SELECT
USING (status = 'published');

-- ============================================
-- POLÍTICAS RLS: blog_post_tags - ADMIN
-- ============================================

-- Admins pueden gestionar todos los tags
CREATE POLICY "Admins can manage all blog post tags"
ON blog_post_tags FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

-- ============================================
-- POLÍTICAS RLS: blog_post_tags - PÚBLICO
-- ============================================

-- Público puede ver tags de posts publicados
CREATE POLICY "Public can view tags of published posts"
ON blog_post_tags FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM blog_posts
    WHERE blog_posts.id = blog_post_tags.post_id
    AND blog_posts.status = 'published'
  )
);

-- ============================================
-- FUNCIONES HELPER
-- ============================================

-- Función para auto-generar slug desde título
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  -- Convertir a minúsculas, eliminar acentos y caracteres especiales
  base_slug := LOWER(
    REGEXP_REPLACE(
      REGEXP_REPLACE(
        UNACCENT(title),
        '[^a-zA-Z0-9\s-]', '', 'g'
      ),
      '\s+', '-', 'g'
    )
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

-- Función para calcular tiempo de lectura
CREATE OR REPLACE FUNCTION calculate_reading_time(content TEXT)
RETURNS INTEGER AS $$
DECLARE
  word_count INTEGER;
BEGIN
  -- Contar palabras (dividiendo por espacios)
  word_count := array_length(regexp_split_to_array(content, '\s+'), 1);

  -- Calcular minutos (200 palabras por minuto)
  -- Mínimo 1 minuto
  RETURN GREATEST(1, ROUND(word_count::NUMERIC / 200));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Función para incrementar vistas
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE slug = post_slug AND status = 'published';
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger para auto-actualizar updated_at
-- (Reutiliza la función update_updated_at_column de users)
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para auto-setear published_at cuando se publica
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- Si el estado cambia a 'published' y no tenía published_at
  IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at = NOW();
  END IF;

  -- Si el estado cambia de 'published' a otra cosa, limpiar published_at
  IF NEW.status != 'published' AND OLD.status = 'published' THEN
    NEW.published_at = NULL;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_set_published_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- Trigger para auto-calcular reading_time antes de insert/update
CREATE OR REPLACE FUNCTION auto_calculate_reading_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.reading_time := calculate_reading_time(NEW.content);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_reading_time_on_save
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION auto_calculate_reading_time();

-- ============================================
-- COMENTARIOS (DOCUMENTATION)
-- ============================================

COMMENT ON TABLE blog_posts IS 'Artículos del blog de iPROVA';
COMMENT ON TABLE blog_post_tags IS 'Tags asociados a artículos del blog';

COMMENT ON COLUMN blog_posts.slug IS 'URL-friendly identifier para el artículo';
COMMENT ON COLUMN blog_posts.content IS 'Contenido en formato Markdown';
COMMENT ON COLUMN blog_posts.status IS 'Estado del artículo: draft (borrador), published (publicado), archived (archivado)';
COMMENT ON COLUMN blog_posts.category IS 'Categoría: Derecho Penal, Derecho Laboral, Derecho Corporativo, Investigación';
COMMENT ON COLUMN blog_posts.featured IS 'Si el artículo es destacado en la página principal';
COMMENT ON COLUMN blog_posts.reading_time IS 'Tiempo estimado de lectura en minutos (auto-calculado)';
COMMENT ON COLUMN blog_posts.views IS 'Contador de vistas del artículo';
COMMENT ON COLUMN blog_posts.keywords IS 'Array de keywords para SEO';

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Mostrar tablas creadas
SELECT 'Tablas creadas:' AS info;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'blog%';

-- Mostrar índices creados
SELECT 'Índices creados:' AS info;
SELECT indexname FROM pg_indexes WHERE schemaname = 'public' AND tablename LIKE 'blog%';

-- Mostrar políticas RLS creadas
SELECT 'Políticas RLS creadas:' AS info;
SELECT tablename, policyname FROM pg_policies WHERE schemaname = 'public' AND tablename LIKE 'blog%';

-- Mostrar funciones creadas
SELECT 'Funciones creadas:' AS info;
SELECT proname FROM pg_proc WHERE proname LIKE '%blog%' OR proname IN ('generate_slug', 'calculate_reading_time', 'increment_post_views');
