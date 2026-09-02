"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Volver arriba. Aparece pasado el hero.
 *
 * Solo desde md: en mobile el borde inferior ya lo ocupa la StickyBuyBar y
 * un segundo botón flotante taparía contenido.
 *
 * Usa un <a> a #hero y no scrollTo(): así respeta el scroll-behavior de la
 * hoja de estilos, que a su vez respeta prefers-reduced-motion.
 */
export function BackToTop() {
  const { ui } = content;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("hero");
      setVisible((heroEl?.getBoundingClientRect().bottom ?? 0) <= 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <a
      href="#hero"
      aria-label={ui.backToTopLabel}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 hidden size-11 place-items-center rounded-full border bg-background/90 text-muted-foreground shadow-lg backdrop-blur transition-all duration-300 hover:text-brand-ink hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 md:grid",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUp aria-hidden className="size-5" />
    </a>
  );
}
