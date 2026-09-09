"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { content, formatUsd, type Cta } from "@/lib/content";
import { cn } from "@/lib/utils";
import {
  isOnScreen,
  isScrolledPast,
  useScrollSignal,
} from "@/lib/use-scroll-signal";

/**
 * Barra de accion fija, solo mobile. Compartida entre productos.
 *
 * Aparece cuando el hero sale de vista y se oculta mientras la seccion
 * destino del CTA esta visible (ahi la pagina ya ofrece la accion y la barra
 * seria ruido que tapa contenido). `hideWhenVisible` es el id de esa
 * seccion: "pricing" en el Air X2, "pre-order" en el CX20.
 *
 * Por defecto muestra el precio de lanzamiento del Air X2.
 */
export function StickyBuyBar({
  eyebrow = content.stickyBar.priceLabel,
  headline = formatUsd(content.hero.launchPrice),
  cta = content.stickyBar.cta,
  hideWhenVisible = "pricing",
}: {
  eyebrow?: string;
  headline?: string;
  cta?: Cta;
  hideWhenVisible?: string;
}) {
  const visible = useScrollSignal(
    () => isScrolledPast("hero") && !isOnScreen(hideWhenVisible),
  );

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      // Fuera de pantalla no debe ser navegable por teclado ni lectores.
      aria-hidden={!visible}
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        <div>
          <p className="text-body-sm text-muted-foreground">{eyebrow}</p>
          <p className="text-subtitle leading-tight">{headline}</p>
        </div>
        <Button
          asChild
          size="lg"
          className="font-semibold"
          tabIndex={visible ? 0 : -1}
        >
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}
