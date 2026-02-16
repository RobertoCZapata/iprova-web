# 🚀 Plan de Implementación: Portal iPROVA
**Sistema de Blog + Portal de Clientes con Autenticación**

---

## 📋 Índice
1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura Técnica](#arquitectura-técnica)
3. [Plan de Implementación por Fases](#plan-de-implementación-por-fases)
4. [Especificaciones Técnicas](#especificaciones-técnicas)
5. [Costos y Recursos](#costos-y-recursos)
6. [Cronograma](#cronograma)
7. [Riesgos y Mitigación](#riesgos-y-mitigación)

---

## 🎯 Resumen Ejecutivo

### Objetivo
Crear dos sistemas integrados para iPROVA:
1. **Sistema de Blog** con administración para Henry, Javier y Hernán
2. **Portal de Clientes** para seguimiento de casos legales

### Valor de Negocio
- ✅ **Marketing**: Blog para SEO y captar clientes
- ✅ **Diferenciación**: Portal de casos único en el mercado legal colombiano
- ✅ **Eficiencia**: Clientes consultan estado sin llamar
- ✅ **Transparencia**: Clientes ven todo el progreso del caso
- ✅ **Profesionalismo**: Imagen moderna y tecnológica

### Usuarios
- **Administradores (3)**: Henry Zapata, Javier Pedraza, Hernán Zapata
- **Clientes (∞)**: Personas con casos activos

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

```
┌──────────────────────────────────────────────────┐
│                 FRONTEND (Next.js 15)             │
├──────────────────────────────────────────────────┤
│ - React 18 + TypeScript                          │
│ - Tailwind CSS                                    │
│ - NextAuth.js (autenticación)                    │
│ - React Hook Form (formularios)                  │
└──────────────────────────────────────────────────┘
                        ↕
┌──────────────────────────────────────────────────┐
│            API ROUTES (Next.js API)               │
├──────────────────────────────────────────────────┤
│ /api/auth/*        → NextAuth                    │
│ /api/blog/*        → CRUD posts                  │
│ /api/cases/*       → CRUD casos                  │
│ /api/upload/*      → Upload archivos             │
└──────────────────────────────────────────────────┘
                        ↕
┌──────────────────────────────────────────────────┐
│              BACKEND (Supabase)                   │
├──────────────────────────────────────────────────┤
│ - PostgreSQL (base de datos)                     │
│ - Supabase Auth (gestión usuarios)               │
│ - Supabase Storage (archivos)                    │
│ - Row Level Security (seguridad)                 │
└──────────────────────────────────────────────────┘
                        ↕
┌──────────────────────────────────────────────────┐
│            HOSTING (Vercel + Supabase)            │
├──────────────────────────────────────────────────┤
│ - Vercel: Frontend + API Routes                  │
│ - Supabase: Database + Storage                   │
│ - Dominio: iprova.com.co                         │
└──────────────────────────────────────────────────┘
```

### Base de Datos (PostgreSQL)

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'client')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de posts del blog
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id UUID REFERENCES users(id),
  category VARCHAR(50),
  tags TEXT[],
  published_at TIMESTAMP,
  reading_time INTEGER,
  views INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de casos legales
CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  case_number VARCHAR(100) UNIQUE,
  case_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  client_id UUID REFERENCES users(id) NOT NULL,
  admin_id UUID REFERENCES users(id) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de actuaciones (timeline del caso)
CREATE TABLE case_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
  update_date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  update_type VARCHAR(50),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de documentos
CREATE TABLE case_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_update_id UUID REFERENCES case_updates(id) ON DELETE CASCADE,
  filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_size INTEGER,
  file_type VARCHAR(50),
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
-- Los clientes solo pueden ver SUS casos
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can only view their own cases"
ON cases FOR SELECT
USING (
  auth.uid() = client_id OR
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);

CREATE POLICY "Admins can view all cases"
ON cases FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'admin'
  )
);
```

---

## 📅 Plan de Implementación por Fases

### **FASE 1: Sistema de Autenticación**
**Duración:** 2-3 horas
**Prioridad:** CRÍTICA (base para todo)

#### Tareas:
1. **Configurar Supabase** (30 min)
   - Crear proyecto en supabase.com
   - Obtener API keys
   - Configurar variables de entorno

2. **Instalar dependencias** (15 min)
   ```bash
   npm install next-auth @supabase/supabase-js bcryptjs
   npm install -D @types/bcryptjs
   ```

3. **Configurar NextAuth.js** (45 min)
   - Crear `/app/api/auth/[...nextauth]/route.ts`
   - Configurar providers (credentials)
   - Crear tipos TypeScript para sesión

4. **Crear tablas de usuarios** (30 min)
   - Ejecutar SQL en Supabase
   - Crear usuarios iniciales (Henry, Javier, Hernán)
   - Hash de contraseñas con bcrypt

5. **UI de Login** (45 min)
   - Página `/app/auth/login/page.tsx`
   - Formulario de login
   - Manejo de errores
   - Redirección post-login

#### Entregables:
- ✅ Login funcional en `/auth/login`
- ✅ Sesión persistente
- ✅ Protección de rutas
- ✅ 3 usuarios admin creados

---

### **FASE 2: Sistema de Blog con Admin**
**Duración:** 3-4 horas
**Prioridad:** ALTA

#### Tareas:

1. **Migrar datos actuales** (30 min)
   - Script para migrar posts de `lib/data/blog.ts` a Supabase
   - Verificar integridad de datos

2. **API Routes para Blog** (1 hora)
   - `POST /api/blog` → Crear post
   - `PUT /api/blog/[id]` → Editar post
   - `DELETE /api/blog/[id]` → Eliminar post
   - `GET /api/blog` → Listar posts (ya funciona)
   - Middleware de autenticación (solo admins)

3. **Upload de imágenes** (45 min)
   - `POST /api/upload/blog-image`
   - Configurar Supabase Storage bucket "blog-images"
   - Validación: solo PNG, JPG, WebP < 5MB
   - Compresión automática con Sharp

4. **Panel de Administración** (1 hora)
   - `/app/admin/blog/page.tsx` → Lista de posts con acciones
   - Botón "Crear Artículo"
   - Botones "Editar" y "Eliminar" por post
   - Solo visible para admins

5. **Editor de Posts** (45 min)
   - Modal o página `/app/admin/blog/create`
   - Campos: título, categoría, contenido (textarea markdown)
   - Upload de imagen destacada
   - Preview en tiempo real
   - Botón "Publicar"

#### Entregables:
- ✅ CRUD completo de posts
- ✅ Editor markdown funcional
- ✅ Upload de imágenes
- ✅ Panel admin en `/admin/blog`
- ✅ Posts guardados en Supabase

---

### **FASE 3: Portal de Casos - Vista Admin**
**Duración:** 3-4 horas
**Prioridad:** ALTA

#### Tareas:

1. **API Routes para Casos** (1.5 horas)
   - `POST /api/cases` → Crear caso
   - `PUT /api/cases/[id]` → Editar caso
   - `GET /api/cases` → Listar casos (con filtros)
   - `POST /api/cases/[id]/updates` → Agregar actuación
   - `POST /api/cases/[id]/documents` → Subir documento
   - Middleware: verificar que solo admins o dueño del caso accedan

2. **Dashboard de Casos (Admin)** (1 hora)
   - `/app/admin/cases/page.tsx`
   - Lista de todos los casos
   - Filtros: por estado, por cliente, por abogado
   - Búsqueda
   - Botón "Nuevo Caso"

3. **Crear/Editar Caso** (1 hora)
   - `/app/admin/cases/create` y `/app/admin/cases/[id]/edit`
   - Formulario: título, número de radicado, tipo, cliente (select), descripción
   - Validaciones
   - Crear usuario cliente si no existe

4. **Agregar Actuación** (30 min)
   - Modal en `/app/admin/cases/[id]`
   - Campos: fecha, tipo, título, descripción
   - Upload múltiple de archivos (arrastrar y soltar)
   - Vista previa de archivos antes de subir

#### Entregables:
- ✅ Admins pueden crear casos
- ✅ Agregar actuaciones con documentos
- ✅ Dashboard funcional en `/admin/cases`

---

### **FASE 4: Portal de Casos - Vista Cliente**
**Duración:** 2-3 horas
**Prioridad:** ALTA

#### Tareas:

1. **Página de Casos del Cliente** (1 hora)
   - `/app/portal/mis-casos/page.tsx`
   - Lista de SUS casos (Row Level Security)
   - Cards con info básica: título, abogado, estado
   - Botón "Ver Detalles"

2. **Vista Detallada del Caso** (1.5 horas)
   - `/app/portal/mis-casos/[id]/page.tsx`
   - Header con info del caso
   - **Timeline vertical** con actuaciones
   - Iconos por tipo de actuación
   - Documentos descargables
   - Diseño simple y claro

3. **Sistema de Notificaciones** (30 min - opcional)
   - Email cuando se agrega actuación
   - Badge "nuevo" en actuaciones no vistas

#### Entregables:
- ✅ Clientes ven solo sus casos
- ✅ Timeline visual e intuitivo
- ✅ Descarga de documentos
- ✅ Diseño mobile-first

---

### **FASE 5: Optimizaciones y Seguridad**
**Duración:** 1-2 horas
**Prioridad:** MEDIA

#### Tareas:

1. **Compresión de PDFs** (45 min)
   - Implementar pdf-lib para comprimir PDFs automáticamente
   - Objetivo: Reducir 5 MB → 500 KB
   - Mantener legibilidad

2. **Validaciones de Seguridad** (30 min)
   - Sanitizar inputs (prevenir XSS, SQL injection)
   - Rate limiting en upload de archivos
   - Verificar tipos MIME reales (no solo extensión)

3. **Optimización de Imágenes** (30 min)
   - Usar Sharp para redimensionar y comprimir
   - Generar thumbnails automáticamente
   - WebP para imágenes del blog

4. **Logging y Monitoreo** (15 min)
   - Log de acciones importantes (crear caso, subir documento)
   - Dashboard de uso en Supabase

#### Entregables:
- ✅ Archivos optimizados automáticamente
- ✅ Seguridad reforzada
- ✅ Monitoreo básico

---

## 🔧 Especificaciones Técnicas

### Variables de Entorno

Crear archivo `.env.local`:

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-muy-seguro-aqui

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

# URLs
NEXT_PUBLIC_SITE_URL=https://iprova.com.co
```

### Estructura de Carpetas

```
iProvaWeb/
├── app/
│   ├── auth/
│   │   └── login/
│   │       └── page.tsx                 # Login page
│   ├── admin/
│   │   ├── blog/
│   │   │   ├── page.tsx                 # Dashboard blog
│   │   │   └── create/
│   │   │       └── page.tsx             # Crear/editar post
│   │   └── cases/
│   │       ├── page.tsx                 # Dashboard casos
│   │       ├── create/
│   │       │   └── page.tsx             # Crear caso
│   │       └── [id]/
│   │           └── page.tsx             # Ver/editar caso
│   ├── portal/
│   │   └── mis-casos/
│   │       ├── page.tsx                 # Lista casos cliente
│   │       └── [id]/
│   │           └── page.tsx             # Detalle caso cliente
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts             # NextAuth config
│   │   ├── blog/
│   │   │   ├── route.ts                 # GET, POST blog
│   │   │   └── [id]/
│   │   │       └── route.ts             # PUT, DELETE blog
│   │   ├── cases/
│   │   │   ├── route.ts                 # GET, POST cases
│   │   │   └── [id]/
│   │   │       ├── route.ts             # PUT, DELETE
│   │   │       ├── updates/
│   │   │       │   └── route.ts         # POST actuación
│   │   │       └── documents/
│   │   │           └── route.ts         # POST documento
│   │   └── upload/
│   │       └── route.ts                 # Upload universal
│   └── blog/
│       └── [slug]/
│           └── page.tsx                 # Vista pública blog
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx                # Formulario login
│   ├── admin/
│   │   ├── BlogEditor.tsx               # Editor posts
│   │   ├── CaseForm.tsx                 # Form crear/editar caso
│   │   └── UpdateForm.tsx               # Form actuación
│   ├── portal/
│   │   ├── CaseCard.tsx                 # Card de caso
│   │   └── CaseTimeline.tsx             # Timeline actuaciones
│   └── ui/
│       ├── FileUpload.tsx               # Component upload
│       └── MarkdownEditor.tsx           # Editor markdown
├── lib/
│   ├── supabase/
│   │   ├── client.ts                    # Cliente Supabase
│   │   ├── server.ts                    # Server-side Supabase
│   │   └── queries.ts                   # Queries reusables
│   ├── auth/
│   │   └── auth-options.ts              # NextAuth config
│   └── utils/
│       ├── compress-pdf.ts              # Compresión PDFs
│       └── file-validation.ts           # Validación archivos
└── types/
    ├── blog.ts                          # Tipos blog
    ├── case.ts                          # Tipos casos
    └── user.ts                          # Tipos usuarios
```

### Roles y Permisos

| Acción | Admin | Client |
|--------|-------|--------|
| Ver blog público | ✅ | ✅ |
| Crear post | ✅ | ❌ |
| Editar post | ✅ | ❌ |
| Eliminar post | ✅ | ❌ |
| Ver todos los casos | ✅ | ❌ |
| Ver solo sus casos | ✅ | ✅ |
| Crear caso | ✅ | ❌ |
| Agregar actuación | ✅ | ❌ |
| Descargar documentos | ✅ | ✅ (solo sus casos) |
| Subir documentos | ✅ | ❌ |

---

## 💰 Costos y Recursos

### Costos de Servicios

| Servicio | Plan | Costo Mensual | Límites |
|----------|------|---------------|---------|
| **Vercel** | Hobby | $0 | 100 GB bandwidth |
| **Supabase** | Free | $0 | 500 MB DB, 1 GB storage |
| **Supabase** | Pro | $25 | 8 GB DB, 100 GB storage |
| **Dominio** | iprova.com.co | ~$3 | Anual $36 |

**Total Inicial:** $0/mes (6-12 meses)
**Total después:** $25-28/mes (cuando escale)

### Recursos Humanos

- **Desarrollador (Claude):** 11-15 horas
- **Testing (Henry/Javier/Hernán):** 2-3 horas
- **Capacitación usuarios:** 1 hora

---

## 📆 Cronograma

### Opción A: Todo de una vez
```
Día 1:  Fase 1 (Auth)          → 2-3 horas
Día 2:  Fase 2 (Blog Admin)    → 3-4 horas
Día 3:  Fase 3 (Casos Admin)   → 3-4 horas
Día 4:  Fase 4 (Casos Cliente) → 2-3 horas
Día 5:  Fase 5 (Optimización)  → 1-2 horas

Total: 5 días (~11-15 horas)
```

### Opción B: Por fases (Recomendado)
```
Semana 1: Fase 1 + Fase 2
          → Auth + Blog funcional
          → Testing con Henry/Javier/Hernán

Semana 2: Fase 3 + Fase 4
          → Portal de casos completo
          → Testing con 2-3 clientes piloto

Semana 3: Fase 5 + Ajustes
          → Optimizaciones
          → Correcciones de feedback
```

---

## ⚠️ Riesgos y Mitigación

### Riesgos Técnicos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Límite storage alcanzado | Media | Medio | Compresión de PDFs desde día 1 |
| Archivos muy pesados | Alta | Medio | Límite 5 MB por archivo + validación |
| Brecha de seguridad | Baja | Alto | Row Level Security + validaciones |
| Pérdida de datos | Muy baja | Alto | Backups automáticos Supabase |

### Riesgos de Negocio

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Clientes no adoptan portal | Media | Medio | UI super simple + capacitación |
| Admins no usan blog | Baja | Bajo | Editor fácil tipo Word |
| Necesidad de upgrade rápido | Media | Bajo | $25/mes es inversión mínima |

---

## ✅ Criterios de Éxito

### Fase 1 (Autenticación)
- ✅ 3 admins pueden hacer login
- ✅ Sesión persiste después de refresh
- ✅ Rutas protegidas funcionan

### Fase 2 (Blog Admin)
- ✅ Henry puede crear post en <5 minutos
- ✅ Post aparece en blog público inmediatamente
- ✅ Imágenes se suben correctamente

### Fase 3 (Casos Admin)
- ✅ Henry puede crear caso con cliente
- ✅ Puede agregar actuación con PDF
- ✅ Dashboard muestra todos los casos

### Fase 4 (Casos Cliente)
- ✅ Cliente ve solo SUS casos
- ✅ Timeline es claro y comprensible
- ✅ Puede descargar documentos

### Fase 5 (Optimización)
- ✅ PDFs se comprimen automáticamente
- ✅ No se pueden subir archivos maliciosos
- ✅ Storage bajo control

---

## 📞 Contacto y Soporte

**Desarrollador:** Claude (Anthropic)
**Cliente:** Roberto Zapata (iPROVA)
**Stakeholders:** Henry, Javier, Hernán

**Documentación:**
- [BLOG_SETUP.md](./BLOG_SETUP.md) → Guía del sistema de blog
- [.iprova-private.md](./.iprova-private.md) → Credenciales (privado)

---

## 🚀 Próximos Pasos

1. ✅ **Aprobación del plan** → Confirmar que todo está claro
2. 🔄 **Iniciar Fase 1** → Configurar Supabase + NextAuth
3. 📊 **Reunión de review** → Cada fase, validar con Henry

---

_Documento creado: 16 de febrero de 2026_
_Última actualización: 16 de febrero de 2026_
_Versión: 1.0_
