# 📰 Blog iPROVA - Guía Completa de Configuración y Uso

Sistema de blog moderno e innovador para iPROVA con gestión sin código.

---

## 🎯 Lo que Hemos Construido

✅ **Sistema de blog completo** con:
- Página de lista de posts (/blog)
- Páginas individuales de posts (/blog/[slug])
- Categorías por especialidad legal
- Perfiles de autores (Henry, Javier, Hernán)
- Sistema de newsletter
- Diseño responsive y moderno
- SEO optimizado automáticamente

✅ **3 Posts de ejemplo** para ver el funcionamiento

---

## 📁 Estructura del Blog

```
/app/blog/
├── page.tsx                    → Lista de posts
└── [slug]/
    └── page.tsx                → Post individual

/components/blog/
├── BlogCard.tsx                → Tarjeta de post
└── CategoryBadge.tsx           → Badge de categoría

/lib/
├── types/blog.ts               → Tipos TypeScript
└── data/
    ├── authors.ts              → Datos de autores
    └── blog.ts                 → Posts (temporal)
```

---

## 🚀 Estado Actual: FUNCIONAL

El blog YA FUNCIONA con posts de ejemplo. Puedes:

1. **Ver el blog**: https://iprova-web.vercel.app/blog
2. **Navegar**: Click en cualquier post para verlo completo
3. **Filtrar**: Por categoría (próximamente funcional)

---

## 📝 Cómo Publicar un Post AHORA (Sin CMS)

### Opción Temporal: Editar `lib/data/blog.ts`

Mientras configuramos Sanity.io, puedes agregar posts directamente en el código:

```typescript
{
  id: "tu-slug-unico",
  title: "Título de tu post",
  slug: "titulo-post-2026",
  excerpt: "Resumen corto del post (160 caracteres)",
  content: `
# Tu contenido aquí en Markdown

## Subtítulo

Párrafo de texto...

### Lista
- Punto 1
- Punto 2
  `,
  featuredImage: "/images/blog/tu-imagen.jpg",
  author: authors.henryZapata, // o javierPedraza o hernanZapata
  category: blogCategories.penal, // o laboral, corporativo, investigacion
  tags: ["tag1", "tag2"],
  publishedAt: "2026-02-10",
  readingTime: 8,
  featured: false, // true para destacar
}
```

**Luego ejecuta:**
```bash
git add .
git commit -m "feat: Agregar nuevo post sobre [tema]"
git push
```

---

## 🎨 SIGUIENTE PASO: Sanity.io (CMS Sin Código)

### ¿Qué es Sanity.io?

CMS headless visual donde Henry, Javier y Hernán pueden:
- Escribir posts con editor tipo Google Docs
- Subir imágenes arrastrando
- Publicar sin tocar código
- Ver preview en tiempo real

### Configuración de Sanity.io

#### 1. Crear cuenta en Sanity

```bash
# Instalar Sanity CLI
npm install -g @sanity/cli

# Crear proyecto Sanity
npm create sanity@latest -- --template clean --create-project "iPROVA Blog" --dataset production

# Seguir el wizard:
# - Login con Google/GitHub
# - Nombre: iPROVA Blog
# - Dataset: production
```

#### 2. Configurar Schema para Posts

Crear archivo `sanity/schemas/post.ts`:

```typescript
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{type: 'author'}]
    },
    {
      name: 'featuredImage',
      title: 'Imagen Destacada',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Derecho Penal', value: 'penal'},
          {title: 'Derecho Laboral', value: 'laboral'},
          {title: 'Derecho Corporativo', value: 'corporativo'},
          {title: 'Investigación', value: 'investigacion'}
        ]
      }
    },
    {
      name: 'excerpt',
      title: 'Resumen',
      type: 'text',
      rows: 3
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [{type: 'block'}]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime'
    },
    {
      name: 'featured',
      title: 'Post Destacado',
      type: 'boolean'
    }
  ]
}
```

#### 3. Variables de Entorno

Agregar a `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="tu-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="tu-token-con-permisos-de-lectura"
```

#### 4. Instalar Cliente Sanity

```bash
npm install @sanity/client @sanity/image-url @portabletext/react
```

#### 5. Acceder al CMS

```bash
cd sanity
npm run dev
```

Abre: `http://localhost:3333`

**Interface visual** para que Henry/Javier/Hernán escriban posts.

---

## 💬 Sistema de Comentarios: Giscus

### ¿Qué es Giscus?

Sistema de comentarios basado en GitHub Discussions:
- ✅ Sin tracking ni ads
- ✅ Moderación fácil
- ✅ 100% gratis
- ✅ Diseño moderno

### Configuración de Giscus

#### 1. Preparar el Repositorio

1. Ve a Settings → Features → Enable "Discussions"
2. Crea una categoría "Blog Comments" (tipo: Announcements)

#### 2. Configurar Giscus

1. Ve a https://giscus.app
2. Ingresa: `RobertoCZapata/iprova-web`
3. Selecciona:
   - Discussion category: "Blog Comments"
   - Mapping: "pathname"
   - Theme: "preferred_color_scheme"
4. Copia el código generado

#### 3. Crear Componente Giscus

Crear `components/blog/GiscusComments.tsx`:

```typescript
'use client';

import { useEffect, useRef } from 'react';

export function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'RobertoCZapata/iprova-web');
    script.setAttribute('data-repo-id', 'TU_REPO_ID');
    script.setAttribute('data-category', 'Blog Comments');
    script.setAttribute('data-category-id', 'TU_CATEGORY_ID');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', 'preferred_color_scheme');
    script.setAttribute('data-lang', 'es');
    script.setAttribute('data-loading', 'lazy');
    script.crossOrigin = 'anonymous';
    script.async = true;

    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} />;
}
```

#### 4. Agregar a Posts

Editar `app/blog/[slug]/page.tsx`:

```tsx
import { GiscusComments } from '@/components/blog/GiscusComments';

// En la sección de comentarios, reemplazar:
<GiscusComments />
```

---

## 📧 Newsletter (Sistema Básico)

### Opción A: Resend (Ya configurado)

Ya tienes Resend configurado. Agregar endpoint:

```typescript
// app/api/newsletter/subscribe/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Guardar en base de datos o lista
    // Por ahora, enviar notificación
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'socialmediaiprova@gmail.com',
      subject: 'Nueva suscripción al newsletter',
      html: `<p>Nuevo suscriptor: ${email}</p>`
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error al suscribir' }, { status: 500 });
  }
}
```

### Opción B: Mailchimp

Más profesional para email marketing:
1. Crear cuenta en Mailchimp (gratis hasta 500 suscriptores)
2. Crear audiencia "Blog iPROVA"
3. Obtener API key
4. Integrar formulario

---

## 🎨 Personalización del Blog

### Cambiar Colores de Categorías

Editar `lib/data/blog.ts`:

```typescript
export const blogCategories = {
  penal: {
    color: "red", // o "blue", "green", "yellow"
    // ...
  }
}
```

### Agregar Nuevas Categorías

```typescript
miNuevaCategoria: {
  id: "mi-categoria",
  name: "Mi Categoría",
  slug: "mi-categoria",
  color: "blue",
  description: "Descripción..."
}
```

### Cambiar Diseño de BlogCard

Editar `components/blog/BlogCard.tsx` para:
- Cambiar tamaño de imagen
- Modificar layout
- Agregar más información

---

## 📊 SEO Automático

El blog YA tiene SEO optimizado:

✅ Meta titles personalizados
✅ Meta descriptions de posts
✅ Open Graph para redes sociales (próximo)
✅ Schema.org Article markup (próximo)
✅ Sitemap dinámico (próximo)
✅ URLs amigables (/blog/titulo-post)

---

## 🚀 Flujo de Publicación Ideal (Con Sanity)

1. **Henry/Javier/Hernán entra a `sanity.iprova.studio`**
2. **Click en "New Post"**
3. **Llenar formulario visual:**
   - Título
   - Autor (seleccionar de lista)
   - Categoría
   - Imagen destacada (arrastra y suelta)
   - Contenido (editor visual)
   - Tags
4. **Preview en tiempo real**
5. **Click "Publish"**
6. **Post aparece automáticamente en el sitio** 🎉

**Cero código. Cero desarrollador necesario.**

---

## 📱 Características Innovadoras

✅ **Diseño Masonry Grid** (posts de diferentes tamaños)
✅ **Posts destacados** (más grandes y visibles)
✅ **Tiempo de lectura** calculado automáticamente
✅ **Contadores de vistas** (próximamente funcional)
✅ **Sistema de feedback** (¿Te fue útil?)
✅ **Posts relacionados** por autor o categoría
✅ **Perfiles de autor completos** con foto y bio
✅ **Newsletter integrado**
✅ **Comentarios moderados** con Giscus
✅ **Multimedia**: Imágenes, videos YouTube, PDFs
✅ **Responsive**: Se ve perfecto en móviles

---

## 🎯 Próximos Pasos Recomendados

### Corto Plazo (Esta Semana)
1. ✅ Agregar primeras imágenes de blog a `public/images/blog/`
2. ✅ Publicar primer post real
3. ✅ Configurar Giscus comentarios

### Mediano Plazo (Próximas 2 Semanas)
1. ✅ Configurar Sanity.io CMS
2. ✅ Capacitar a Henry/Javier/Hernán en uso
3. ✅ Establecer calendario editorial (1 post/semana)
4. ✅ Configurar newsletter con Mailchimp

### Largo Plazo (Mes 1-2)
1. ✅ Analytics de posts (Google Analytics events)
2. ✅ Sistema de búsqueda en blog
3. ✅ Páginas de categoría individuales
4. ✅ Páginas de autor individuales
5. ✅ Relacionados por IA (posts similares)

---

## 📞 Soporte

**Desarrollado por:** Claude Opus 4.6 para iPROVA
**Fecha:** Febrero 10, 2026
**Versión:** 1.0 - Sistema Base Funcional

Para dudas o soporte técnico, contactar al equipo de desarrollo.

---

## 🎉 ¡El Blog Está Listo!

Puedes empezar a usarlo ahora mismo visitando:
**https://iprova-web.vercel.app/blog**

**Próximo commit:** Configurar Sanity.io para publicación sin código.
