# iPROVA - Website

Sitio web profesional para iPROVA, firma de abogados e investigación privada.

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build para Producción

```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx          # Layout principal con fuentes
│   ├── page.tsx             # Página principal
│   └── globals.css          # Estilos globales Tailwind
├── components/
│   ├── sections/            # Componentes de secciones
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── StatsStrip.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── WhyUsSection.tsx
│   │   ├── CtaSection.tsx
│   │   └── Footer.tsx
│   └── ui/
│       └── Button.tsx       # Componente de botón reutilizable
├── lib/
│   ├── data.ts              # ⭐ ARCHIVO PRINCIPAL PARA EDITAR CONTENIDO
│   └── utils.ts             # Utilidades (cn function)
└── public/
    └── images/              # Imágenes del sitio
```

## ✏️ Cómo Editar el Contenido

**Todo el contenido editable está centralizado en `lib/data.ts`**

### Editar Texto

1. Abre `lib/data.ts`
2. Modifica los objetos exportados:
   - `navItems` - Items de navegación
   - `stats` - Estadísticas (años, casos, etc.)
   - `services` - Servicios ofrecidos
   - `whyUsFeatures` - Características de "Por qué elegirnos"
   - `heroContent` - Contenido del hero
   - `contactInfo` - Información de contacto
   - `footerContent` - Contenido del footer

### Agregar/Quitar Servicios

En `lib/data.ts`, modifica el array `services`:

```typescript
export const services: Service[] = [
  {
    title: "Tu Nuevo Servicio",
    description: "Descripción del servicio",
    href: "#servicios",
    icon: Scale, // Usa cualquier icono de lucide-react
  },
  // ... más servicios
];
```

### Agregar/Quitar Miembros del Equipo

Cuando agregues la sección de equipo, simplemente crea un array en `lib/data.ts`:

```typescript
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Nombre Completo",
    role: "Abogado Senior",
    bio: "Descripción profesional...",
    image: "/images/team/member-1.jpg",
  },
  // ... más miembros
];
```

## 🎨 Sistema de Diseño

### Colores

- **Primary (Navy)**: `#0F172A` - `bg-primary` / `text-primary`
- **Gold (Accent)**: `#C5A059` - `bg-gold` / `text-gold`
- **Gold Light**: `#E5C565` - `bg-gold-light`

### Tipografías

- **Headings**: Playfair Display (`font-serif`)
- **Body**: Inter (`font-sans`)

### Componentes

- **Button**: Componente reutilizable con variantes (`primary`, `outline-light`, `ghost`)

## 🖼️ Imágenes y Assets

Coloca las imágenes en `public/images/`:

- `iProva-logo.png` - Logo principal de la marca (usado en Header y Footer)
- `hero-placeholder.jpg` - Imagen principal del hero
- Cualquier otra imagen referenciada en los componentes

### Organización de Assets

Para mejor organización, puedes crear subcarpetas si tienes muchos assets:
- `public/images/logos/` - Para múltiples logos
- `public/images/team/` - Para fotos del equipo
- `public/images/services/` - Para imágenes de servicios

**Nota**: Las rutas de imágenes están centralizadas en `lib/data.ts` en el objeto `brandAssets`.

## 📦 Dependencias Principales

- **Next.js 15** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **lucide-react** - Iconos
- **clsx** + **tailwind-merge** - Utilidades para clases CSS

## 🔧 Próximos Pasos

1. Reemplazar imágenes placeholder con imágenes reales
2. Agregar sección de Equipo (usando el mismo patrón de `lib/data.ts`)
3. Implementar menú móvil funcional
4. Agregar formulario de contacto
5. Optimizar SEO (meta tags, Open Graph, etc.)

## 📋 Reglas de Desarrollo

Este proyecto sigue reglas estrictas para mantener consistencia y calidad. **Lee siempre antes de codificar:**

- **`.cursorrules`** - Reglas completas para Cursor AI y desarrollo
- **`.cursorrules.md`** - Versión legible de las reglas

### Reglas Principales

1. **Centralización de Contenido**: TODO el contenido editable va en `lib/data.ts`
2. **TypeScript Estricto**: NUNCA usar `any`, siempre tipar props
3. **Sistema de Diseño**: Usar colores y tipografías del sistema (no valores hardcodeados)
4. **Mobile-First**: Siempre diseñar para mobile primero
5. **Componentes Modulares**: Cada componente en su propio archivo, reutilizable

### Checklist Rápido

Antes de commitear:
- [ ] ¿El contenido está en `lib/data.ts`?
- [ ] ¿Los componentes están tipados?
- [ ] ¿Es responsive?
- [ ] ¿Usa el sistema de diseño?
- [ ] ¿No hay código duplicado?

## 📝 Notas

- El código está diseñado para ser **escalable** y **fácil de mantener**
- Todo el contenido está separado de la lógica de presentación
- Los componentes son reutilizables y modulares
- Responsive design mobile-first
- **Siempre seguir las reglas en `.cursorrules`**

