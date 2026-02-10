# Guía de Refactorización - iPROVA Website

Este documento detalla las mejoras de código implementadas para aumentar la mantenibilidad, escalabilidad y reutilización del código.

## 📋 Tabla de Contenidos

1. [Componentes Reutilizables](#componentes-reutilizables)
2. [Constantes y Estilos](#constantes-y-estilos)
3. [Tipos Compartidos](#tipos-compartidos)
4. [Hooks Personalizados](#hooks-personalizados)
5. [Ejemplos de Uso](#ejemplos-de-uso)
6. [Beneficios](#beneficios)

---

## 🧩 Componentes Reutilizables

### 1. SectionHeader

Componente para títulos de sección con línea decorativa consistente.

**Ubicación:** `components/ui/SectionHeader.tsx`

**Props:**
```typescript
interface SectionHeaderProps {
  title: string | ReactNode;      // Título principal
  subtitle?: string;                // Etiqueta superior opcional
  description?: string | ReactNode; // Descripción
  centered?: boolean;               // Centrar texto (default: true)
  size?: "sm" | "md" | "lg" | "xl"; // Tamaño (default: "md")
  className?: string;               // Clases adicionales
}
```

**Uso:**
```tsx
<SectionHeader
  title="Nuestro Equipo"
  subtitle="Profesionales"
  description="Un equipo integrado de abogados e investigadores"
  size="lg"
/>
```

**Beneficios:**
- ✅ Títulos consistentes en todas las secciones
- ✅ Reduce duplicación de código
- ✅ Fácil de actualizar estilos globalmente

---

### 2. Section

Componente wrapper para secciones con estilos predefinidos.

**Ubicación:** `components/ui/Section.tsx`

**Props:**
```typescript
interface SectionProps {
  children: ReactNode;
  id?: string;                                    // ID para navegación
  container?: "narrow" | "default" | "wide" | "full"; // Ancho contenedor
  padding?: "sm" | "md" | "lg" | "xl";           // Espaciado vertical
  background?: "white" | "gray" | "primary" | "gradient"; // Fondo
  className?: string;                             // Clases adicionales
}
```

**Uso:**
```tsx
<Section
  id="nosotros"
  container="narrow"
  background="gray"
  padding="lg"
>
  {/* Contenido de la sección */}
</Section>
```

**Beneficios:**
- ✅ Estructura consistente de secciones
- ✅ Elimina repetición de clases CSS
- ✅ Facilita cambios de diseño globales

---

### 3. AnimatedSection

Wrapper para animaciones de Framer Motion reutilizables.

**Ubicación:** `components/ui/AnimatedSection.tsx`

**Props:**
```typescript
interface AnimatedSectionProps {
  children: ReactNode;
  variant?: "fadeIn" | "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scale";
  duration?: "fast" | "default" | "slow";
  delay?: number;
  className?: string;
  once?: boolean; // Animar solo una vez (default: true)
}
```

**Uso:**
```tsx
<AnimatedSection variant="fadeInUp" duration="default" delay={0.2}>
  <Card>Contenido animado</Card>
</AnimatedSection>
```

**Beneficios:**
- ✅ Animaciones consistentes
- ✅ Código más limpio
- ✅ Fácil de modificar animaciones globalmente

---

### 4. Card

Componente para tarjetas reutilizables con estilos consistentes.

**Ubicación:** `components/ui/Card.tsx`

**Props:**
```typescript
interface CardProps {
  children: ReactNode;
  variant?: "base" | "hover" | "interactive";
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  onClick?: () => void;
}
```

**Uso:**
```tsx
<Card variant="interactive" padding="lg">
  <h3>Título de Card</h3>
  <p>Contenido...</p>
</Card>
```

**Beneficios:**
- ✅ Cards consistentes en todo el sitio
- ✅ Manejo de interactividad centralizado
- ✅ Fácil de actualizar estilos

---

## 🎨 Constantes y Estilos

### Constantes de Estilos

**Ubicación:** `lib/constants/styles.ts`

Centraliza todos los estilos repetitivos en constantes reutilizables:

```typescript
// Contenedores
SECTION_CONTAINERS = {
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
}

// Espaciados
SECTION_PADDING = {
  sm: "py-12",
  md: "py-16 lg:py-20",
  lg: "py-20 lg:py-24",
}

// Backgrounds
SECTION_BACKGROUNDS = {
  white: "bg-white",
  gray: "bg-gray-50",
  primary: "bg-primary",
}

// Grids
GRID_COLS = {
  "1-2": "grid-cols-1 md:grid-cols-2",
  "1-3": "grid-cols-1 md:grid-cols-3",
  "1-2-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}

// Animaciones
MOTION_VARIANTS = {
  fadeIn: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
  fadeInUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
  // ...
}
```

**Uso:**
```tsx
import { SECTION_PADDING, GRID_COLS } from "@/lib/constants";

<section className={SECTION_PADDING.lg}>
  <div className={`grid ${GRID_COLS["1-2-3"]} gap-8`}>
    {/* Grid items */}
  </div>
</section>
```

**Beneficios:**
- ✅ Single source of truth para estilos
- ✅ Fácil de actualizar diseño globalmente
- ✅ Previene inconsistencias
- ✅ Mejor autocompletado en IDE

---

## 📦 Tipos Compartidos

**Ubicación:** `lib/types/common.ts`

Define tipos reutilizables para evitar duplicación:

```typescript
// Item con icono (servicios, features, etc.)
export interface IconItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// Contenido de sección básico
export interface SectionContent {
  title: string;
  description?: string;
  subtitle?: string;
}

// Métrica o estadística
export interface Metric {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
}

// Testimonio básico
export interface TestimonialBase {
  quote: string;
  author: string;
  role?: string;
  company?: string;
}
```

**Beneficios:**
- ✅ Tipos consistentes en toda la app
- ✅ Reduce duplicación de código
- ✅ Mejor type safety
- ✅ Autocompletado mejorado

---

## 🪝 Hooks Personalizados

### useScrollToSection

Hook para scroll suave a secciones.

**Ubicación:** `lib/hooks/useScrollToSection.ts`

**Uso:**
```tsx
import { useScrollToSection } from "@/lib/hooks/useScrollToSection";

function MyComponent() {
  const scrollToSection = useScrollToSection({ offset: 80 });

  return (
    <button onClick={() => scrollToSection("contacto")}>
      Ir a Contacto
    </button>
  );
}
```

**Beneficios:**
- ✅ Lógica reutilizable
- ✅ Configuración centralizada
- ✅ Código más limpio

---

## 💡 Ejemplos de Uso

### Antes vs Después

#### ANTES (37 líneas):
```tsx
export function AboutUsSection() {
  return (
    <section className="py-20 bg-gray-50" id="nosotros">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-primary mb-3">
            {aboutUsContent.title}
          </h2>
          <div className="h-1 w-24 bg-secondary mx-auto" />
        </div>
        <div className="space-y-6 text-lg">
          {/* Contenido... */}
        </div>
      </div>
    </section>
  );
}
```

#### DESPUÉS (22 líneas):
```tsx
import { Section, SectionHeader } from "@/components/ui";

export function AboutUsSection() {
  return (
    <Section id="nosotros" container="narrow" background="gray">
      <SectionHeader title={aboutUsContent.title} size="lg" />
      <div className="space-y-6 text-lg">
        {/* Contenido... */}
      </div>
    </Section>
  );
}
```

**Mejoras:**
- ✅ 41% menos líneas de código
- ✅ Más legible y mantenible
- ✅ Elimina duplicación
- ✅ Más fácil de testear

---

## 🎯 Beneficios Generales

### Mantenibilidad
- ✅ **Single Responsibility**: Cada componente tiene un propósito claro
- ✅ **DRY Principle**: No hay código duplicado
- ✅ **Separation of Concerns**: Estilos, lógica y datos separados

### Escalabilidad
- ✅ **Componentes Composables**: Fácil combinar componentes
- ✅ **Configuración Centralizada**: Cambios globales en un solo lugar
- ✅ **Extensibilidad**: Fácil agregar nuevas variantes

### Calidad de Código
- ✅ **Type Safety**: TypeScript bien tipado
- ✅ **Consistencia**: Estilos y comportamientos uniformes
- ✅ **Documentación**: Interfaces bien documentadas

### Developer Experience
- ✅ **Autocompletado Mejorado**: Props bien tipadas
- ✅ **Código más Limpio**: Menos boilerplate
- ✅ **Rápido de Usar**: Componentes listos para usar

---

## 🚀 Próximos Pasos Recomendados

1. **Migrar secciones existentes** a usar los nuevos componentes
2. **Crear más hooks personalizados** (ej: useMediaQuery, useForm)
3. **Agregar Storybook** para documentar componentes
4. **Implementar testing** con Jest y React Testing Library
5. **Optimizar performance** con React.memo donde sea necesario

---

## 📚 Recursos

- [React Best Practices](https://react.dev/learn/thinking-in-react)
- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Tailwind CSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)

---

## 🤝 Contribución

Al agregar nuevas secciones o componentes:

1. ✅ Usar componentes reutilizables existentes cuando sea posible
2. ✅ Extraer patrones repetidos en nuevos componentes
3. ✅ Agregar tipos TypeScript apropiados
4. ✅ Documentar props con JSDoc
5. ✅ Mantener consistencia con el diseño existente
