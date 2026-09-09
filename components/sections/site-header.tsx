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
import { content, formatUsd, type Cta } from "@/lib/content";
import { isScrolledPast, useScrollSignal } from "@/lib/use-scroll-signal";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

type NavItem = { label: string; href: string };

/**
 * Barra de navegacion fija. Compartida entre productos: cada pagina le pasa
 * sus anclas y su CTA. Aparece cuando el hero termina de pasar.
 *
 * En desktop muestra los enlaces con indicador de seccion activa; en mobile
 * la misma barra queda en 56px con un boton de menu que abre un panel
 * lateral. El panel suma la navegacion entre productos (siteNav), asi desde
 * cualquier landing se llega a la otra.
 *
 * Usa posicion de scroll en vez de IntersectionObserver para mostrarse: el
 * calculo por rect es directo de verificar y no depende de que el
 * compositor este activo. La seccion activa si usa IntersectionObserver,
 * que es la herramienta correcta para "que se esta viendo ahora".
 */
export function SiteHeader({
  nav = content.nav,
  cta = content.stickyBar.cta,
  priceLine = {
    label: content.stickyBar.priceLabel,
    value: formatUsd(content.hero.launchPrice),
  },
}: {
  nav?: NavItem[];
  cta?: Cta;
  /** Linea de precio del panel mobile. null = sin precio (CX20). */
  priceLine?: { label: string; value: string } | null;
}) {
  const { brand, siteNav, ui } = content;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // 72px: la barra aparece recien cuando el hero termino de pasar por
  // debajo de su propia altura, no apenas empieza a salir.
  const visible = useScrollSignal(() => isScrolledPast("hero", 72));

  // Seccion activa: se marca la ultima que cruzo la banda superior de la
  // pantalla, asi el indicador coincide con lo que el usuario esta leyendo.
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
      // La banda va del 20% al 65% del alto: una seccion "es la activa"
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
          href="/"
          aria-label={`${brand.name} — home`}
          tabIndex={visible ? 0 : -1}
        >
          <Image src={logo} alt={brand.logo.alt} className="h-7 w-auto" sizes="170px" />
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
          <Link href={cta.href}>{cta.label}</Link>
        </Button>

        {/* Menu mobile */}
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

            {/* Navegacion entre productos */}
            <nav aria-label="Products">
              <ul className="flex flex-col gap-1">
                {siteNav.map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className="block py-2 pl-4 text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>

            <Separator className="my-6" />

            <div className="space-y-3">
              {priceLine && (
                <p className="text-body-sm text-muted-foreground">
                  {priceLine.label}{" "}
                  <span className="font-semibold text-foreground">
                    {priceLine.value}
                  </span>
                </p>
              )}
              <SheetClose asChild>
                <Button asChild size="lg" className="w-full font-semibold">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
