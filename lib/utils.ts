import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/*
 * tailwind-merge resuelve conflictos entre clases mirando el nombre, no la
 * config de Tailwind. Nuestra escala tipografica usa nombres propios
 * (text-display, text-title, text-subtitle, text-body, text-body-sm) que el
 * merge no reconoce como tamanos: los toma por colores y descarta el color que
 * venia antes en el mismo className.
 *
 * El sintoma es silencioso y feo: un boton escrito como
 *   <Button className="text-body font-semibold">
 * perdia el text-primary-foreground de su variante y terminaba heredando el
 * color del contenedor. En el hero claro eso daba texto oscuro sobre el naranja.
 *
 * Declarando las cinco clases como font-size, cada una convive con su color.
 *
 * Lo mismo pasa con nuestras texturas de fondo. bg-tech-grid y bg-dots pintan
 * un background-image, no un color, pero el merge las lee como color y las
 * descarta contra bg-foreground o bg-muted. Asi desaparecio la grilla de la
 * seccion de impacto cuando paso a construir su clase con cn(): quedaba
 * bg-foreground sola y el fondo salia liso. Declaradas como background-image,
 * conviven con el color.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display", "title", "subtitle", "body", "body-sm"] }],
      "bg-image": [{ bg: ["tech-grid", "dots"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
