import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores del Manual de Marca IPROVA
        primary: "#00184A", // PANTONE 5255 C - Navy Blue principal
        secondary: "#8E9093", // PANTONE 423 C - Grey secundario
        "primary-light": "#364F8C", // Versión más clara para hover/gradientes
        // Colores de fondo
        "background-light": "#F8F9FA",
        "background-dark": "#121212",
        "card-dark": "#1E1E1E",
      },
      fontFamily: {
        // Montserrat como fuente principal (según código Stitch)
        sans: ["var(--font-montserrat)", "sans-serif"],
        body: ["var(--font-montserrat)", "sans-serif"],
        display: ["var(--font-montserrat)", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
      },
    },
  },
  plugins: [],
};
export default config;

