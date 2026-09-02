import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Footer oscuro: ancla visual del final de la pagina, con la misma grilla
 * tecnica de las secciones oscuras.
 *
 * Repite la navegación: quien llegó hasta acá scrolleando la página entera
 * no debería tener que volver arriba para saltar a precios o specs.
 */
export function Footer() {
  const { brand, nav } = content;

  return (
    <footer className="bg-tech-grid bg-foreground py-12 text-background">
      <div className="container flex flex-col items-center gap-6 text-center">
        <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto" />

        <nav aria-label="Sections">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body-sm text-background/70 underline-offset-4 transition-colors hover:text-brand-light hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Separator className="max-w-xl bg-background/15" />

        <p className="text-body-sm text-background/60">
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
