import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx20 } from "@/lib/content/cx20";

/**
 * Barra de anuncio del producto nuevo, arriba de todo.
 *
 * En su propio sitio, Cmax abre con "NEW Cmax Air X2": el lanzamiento es la
 * noticia, no una nota al pie. Antes el Air X2 solo aparecia como un enlace
 * chico en la esquina del hero, que es exactamente lo que nadie mira.
 *
 * Toda la barra es el enlace, no solo el texto final: en mobile un target de
 * ancho completo es mucho mas facil de tocar.
 */
export function Announcement() {
  const { announcement } = cx20;

  return (
    <Link
      href={announcement.href}
      className="group bg-tech-grid relative block bg-foreground text-background transition-colors hover:bg-foreground/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
    >
      <div
        aria-hidden
        className="glow-orb absolute -top-16 left-1/3 size-40 bg-brand/50"
      />

      <div className="container relative flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center">
        <span className="rounded-full bg-brand px-2.5 py-0.5 text-body-sm font-semibold uppercase tracking-wide leading-none text-white">
          {announcement.badge}
        </span>
        <span className="text-body-sm font-semibold">{announcement.headline}</span>
        <span className="hidden text-body-sm text-background/70 sm:inline">
          {announcement.body}
        </span>
        <span className="inline-flex items-center gap-1 text-body-sm font-semibold text-brand-light underline-offset-4 group-hover:underline">
          {announcement.linkLabel}
          <ArrowRight
            aria-hidden
            className="size-3.5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </span>
      </div>
    </Link>
  );
}
