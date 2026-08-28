import Image from "next/image";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Footer oscuro: ancla visual del final de la pagina, con la misma grilla
 * tecnica de las secciones oscuras.
 */
export function Footer() {
  const { brand } = content;

  return (
    <footer className="bg-tech-grid bg-foreground py-12 text-background">
      <div className="container flex flex-col items-center gap-4 text-center">
        <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto" />
        <p className="text-body-sm text-background/60">
          &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
