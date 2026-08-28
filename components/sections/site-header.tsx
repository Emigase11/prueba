"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Barra de navegación fija, desktop.
 * Aparece cuando el hero termina de pasar. En mobile no se muestra: ahí la
 * acción vive en StickyBuyBar (abajo) y una barra arriba comería pantalla.
 *
 * Usa posición de scroll en vez de IntersectionObserver a propósito: el
 * cálculo por rect es directo de verificar y no depende de que el
 * compositor esté activo.
 */
export function SiteHeader() {
  const { brand, nav, stickyBar } = content;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0;
      setVisible(heroBottom <= 72);
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 hidden border-b bg-background/90 backdrop-blur transition-transform duration-300 md:block",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="container flex h-16 items-center justify-between gap-8">
        <Link
          href="#hero"
          aria-label={`${brand.name} — back to top`}
          tabIndex={visible ? 0 : -1}
        >
          <Image src={logo} alt={brand.logo.alt} className="h-7 w-auto" />
        </Link>

        <nav aria-label="Sections">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  tabIndex={visible ? 0 : -1}
                  className="text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button asChild className="font-semibold" tabIndex={visible ? 0 : -1}>
          <Link href={stickyBar.cta.href}>{stickyBar.cta.label}</Link>
        </Button>
      </div>
    </header>
  );
}
