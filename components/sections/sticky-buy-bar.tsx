"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { content, formatUsd } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Barra de compra fija, solo mobile.
 * Aparece cuando el hero sale de vista y se oculta mientras la sección de
 * precios está visible (ahí las tarjetas ya ofrecen la acción y la barra
 * sería ruido que tapa contenido).
 */
export function StickyBuyBar() {
  const { hero, stickyBar } = content;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("hero");
    const pricingEl = document.getElementById("pricing");
    if (!heroEl || !pricingEl) return;

    const state = { heroVisible: true, pricingVisible: false };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === heroEl) state.heroVisible = entry.isIntersecting;
          if (entry.target === pricingEl)
            state.pricingVisible = entry.isIntersecting;
        }
        setVisible(!state.heroVisible && !state.pricingVisible);
      },
      { threshold: 0 },
    );

    observer.observe(heroEl);
    observer.observe(pricingEl);
    return () => observer.disconnect();
  }, []);

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
          <p className="text-body-sm text-muted-foreground">
            {stickyBar.priceLabel}
          </p>
          <p className="text-subtitle leading-tight">
            {formatUsd(hero.launchPrice)}
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="font-semibold"
          tabIndex={visible ? 0 : -1}
        >
          <Link href={stickyBar.cta.href}>{stickyBar.cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}
