"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { content, formatUsd } from "@/lib/content";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Barra de navegación fija. Aparece cuando el hero termina de pasar.
 *
 * En desktop muestra los enlaces con indicador de sección activa; en mobile
 * la misma barra queda en 56px con un botón de menú que abre un panel
 * lateral. Antes en mobile no había navegación de ningún tipo —solo la
 * StickyBuyBar de abajo—, así que desde cualquier punto de la página había
 * que hacer scroll a mano para llegar a otra sección.
 *
 * Usa posición de scroll en vez de IntersectionObserver para mostrarse: el
 * cálculo por rect es directo de verificar y no depende de que el
 * compositor esté activo. La sección activa sí usa IntersectionObserver,
 * que es la herramienta correcta para "qué se está viendo ahora".
 */
export function SiteHeader() {
  const { brand, nav, stickyBar, hero, ui } = content;
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById("hero");
      const heroBottom = heroEl?.getBoundingClientRect().bottom ?? 0;
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

  // Sección activa: se marca la última que cruzó la banda superior de la
  // pantalla, así el indicador coincide con lo que el usuario está leyendo.
  useEffect(() => {
    const sections = nav
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActiveId(hit.target.id);
      },
      // La banda va del 20% al 65% del alto: una sección "es la activa"
      // cuando ocupa el centro de la pantalla, no cuando apenas asoma.
      { rootMargin: "-20% 0px -35% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [nav]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/90 backdrop-blur transition-transform duration-300",
        visible ? "translate-y-0" : "-translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="container flex h-14 items-center justify-between gap-8 md:h-16">
        <Link
          href="#hero"
          aria-label={`${brand.name} — back to top`}
          tabIndex={visible ? 0 : -1}
        >
          <Image src={logo} alt={brand.logo.alt} className="h-7 w-auto" />
        </Link>

        <nav aria-label="Sections" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active = activeId === item.href.slice(1);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    tabIndex={visible ? 0 : -1}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      // El subrayado se dibuja con un pseudo-elemento de alto
                      // fijo para que el texto no salte al activarse.
                      "relative py-2 text-body-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand after:transition-transform after:duration-300 after:content-['']",
                      active
                        ? "text-foreground after:scale-x-100"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button
          asChild
          className="hidden font-semibold md:inline-flex"
          tabIndex={visible ? 0 : -1}
        >
          <Link href={stickyBar.cta.href}>{stickyBar.cta.label}</Link>
        </Button>

        {/* Menú mobile */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              tabIndex={visible ? 0 : -1}
              aria-label={ui.menuLabel}
            >
              <Menu aria-hidden className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[86vw] max-w-sm">
            <SheetHeader className="text-left">
              <SheetTitle className="font-heading text-subtitle">
                {ui.menuTitle}
              </SheetTitle>
              <SheetDescription>{ui.menuDescription}</SheetDescription>
            </SheetHeader>

            <nav aria-label="Sections" className="mt-6">
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const active = activeId === item.href.slice(1);
                  return (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex items-center justify-between border-l-2 py-3 pl-4 text-body font-medium transition-colors",
                            active
                              ? "border-brand text-brand-ink"
                              : "border-transparent text-muted-foreground hover:text-foreground",
                          )}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Separator className="my-6" />

            <div className="space-y-3">
              <p className="text-body-sm text-muted-foreground">
                {stickyBar.priceLabel}{" "}
                <span className="font-semibold text-foreground">
                  {formatUsd(hero.launchPrice)}
                </span>
              </p>
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full font-semibold">
                  <Link href={stickyBar.cta.href}>{stickyBar.cta.label}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
