/**
 * Style Constants
 * Constantes de estilos reutilizables para mantener consistencia
 */

// Contenedores de sección
export const SECTION_CONTAINERS = {
  narrow: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8",
  default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  wide: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
  full: "w-full px-4 sm:px-6 lg:px-8",
} as const;

// Espaciados de sección
export const SECTION_PADDING = {
  sm: "py-12",
  md: "py-16 lg:py-20",
  lg: "py-20 lg:py-24",
  xl: "py-24 lg:py-32",
} as const;

// Colores de fondo de sección
export const SECTION_BACKGROUNDS = {
  white: "bg-white",
  gray: "bg-gray-50",
  primary: "bg-primary",
  gradient: "bg-gradient-to-r from-primary to-primary/90",
} as const;

// Espaciados de grid
export const GRID_GAPS = {
  sm: "gap-4 lg:gap-6",
  md: "gap-6 lg:gap-8",
  lg: "gap-8 lg:gap-10",
  xl: "gap-10 lg:gap-12",
} as const;

// Configuraciones de grid
export const GRID_COLS = {
  "1": "grid-cols-1",
  "1-2": "grid-cols-1 md:grid-cols-2",
  "1-3": "grid-cols-1 md:grid-cols-3",
  "1-2-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  "1-2-4": "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
} as const;

// Cards
export const CARD_STYLES = {
  base: "bg-white border border-gray-200 rounded-lg overflow-hidden",
  hover: "hover:shadow-xl hover:border-primary/30 transition-all duration-300",
  interactive: "bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300",
} as const;

// Botones
export const BUTTON_SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
} as const;

// Transiciones comunes
export const TRANSITIONS = {
  fast: "transition-all duration-200",
  default: "transition-all duration-300",
  slow: "transition-all duration-500",
} as const;

// Animaciones de Framer Motion
export const MOTION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
  },
} as const;

// Duración de animaciones
export const ANIMATION_DURATION = {
  fast: 0.3,
  default: 0.6,
  slow: 0.9,
} as const;
