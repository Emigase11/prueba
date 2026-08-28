import type { Config } from "tailwindcss";

/**
 * Design tokens — Cmax Air X2 landing.
 *
 * Tipografía: EXACTAMENTE 3 tamaños de título (display, title, subtitle)
 * y 2 de cuerpo (body, body-sm). No usar text-xl/text-2xl/etc. sueltos:
 * todo texto de la página usa uno de estos cinco tokens.
 *
 * Color de marca: cambiar SOLO el hex en `brand.DEFAULT` (y sus derivados
 * hover/tint) + la variable --primary en globals.css cuando llegue el
 * hex definitivo. #F26522 es placeholder.
 */

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "72rem", // ancho máximo de contenido: 1152px
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // ——— Títulos (solo estos tres) ———
        // Hero únicamente. Fluido 36px → 60px.
        display: [
          "clamp(2.25rem, 1.4rem + 3.6vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "800" },
        ],
        // Título de sección. Fluido 28px → 40px.
        title: [
          "clamp(1.75rem, 1.35rem + 1.7vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        // Título de tarjeta / subtítulo. Fijo 20px.
        subtitle: [
          "1.25rem",
          { lineHeight: "1.4", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        // ——— Cuerpo (solo estos dos) ———
        body: ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
      },
      colors: {
        /**
         * Naranja Cmax — PLACEHOLDER hasta recibir el hex exacto.
         *
         * El naranja de marca tiene 3.1:1 contra blanco: sirve como FONDO y
         * para texto grande, pero NO para texto chico (AA pide 4.5:1). Por eso
         * hay dos variantes de texto:
         *   ink   → texto naranja sobre fondos claros (5.5:1 sobre blanco)
         *   light → texto naranja sobre fondos oscuros (5.4:1 sobre el hero)
         * Al cambiar el hex definitivo, recalcular estas dos.
         */
        brand: {
          DEFAULT: "#F26522",
          hover: "#D9531A", // estados hover/active de CTAs
          ink: "#B8430F", // texto de marca sobre claro
          light: "#FF9A66", // texto de marca sobre oscuro
          tint: "#FEF3EC", // fondos suaves de secciones destacadas
          ring: "#F26522",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: "hsl(var(--destructive))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      spacing: {
        // Ritmo vertical de secciones: py-section (mobile) / md:py-section-lg
        section: "3.5rem", // 56px
        "section-lg": "6rem", // 96px
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
