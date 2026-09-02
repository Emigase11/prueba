import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SocialIconSvg } from "@/components/fx/social-icon";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Footer oscuro: ancla visual del final de la pagina, con la misma grilla
 * tecnica de las secciones oscuras.
 *
 * Repite la navegacion (quien llego hasta aca scrolleando no deberia volver
 * arriba para saltar a precios) y suma redes, legales y contacto.
 *
 * Los enlaces externos llevan rel="noopener noreferrer": target="_blank" sin
 * eso deja que la pagina destino acceda a window.opener.
 */
export function Footer() {
  const { brand, nav, social, legal, contact } = content;

  return (
    <footer className="bg-tech-grid bg-foreground py-12 text-background">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
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

          <div>
            <p className="text-body-sm text-background/70">{social.heading}</p>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-3">
              {social.links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-full border border-background/15 text-background/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <SocialIconSvg icon={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-background/15" />

        <div className="flex flex-col items-center gap-4 text-center">
          <nav aria-label="Policies">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {legal.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/legal/${item.slug}`}
                    className="text-body-sm text-background/60 underline-offset-4 transition-colors hover:text-brand-light hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic text-body-sm text-background/60">
            {contact.company} &middot; {contact.location} &middot;{" "}
            <a
              href={`mailto:${contact.email}`}
              className="underline-offset-4 transition-colors hover:text-brand-light hover:underline"
            >
              {contact.email}
            </a>
          </address>

          <p className="text-body-sm text-background/50">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
