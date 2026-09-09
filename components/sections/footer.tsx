import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SocialIconSvg } from "@/components/fx/social-icon";
import { content } from "@/lib/content";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Footer oscuro, comun a todas las paginas: ancla visual del final, con la
 * misma grilla tecnica de las secciones oscuras.
 *
 * Lleva la navegacion entre productos (no las anclas de una pagina: es el
 * mismo footer en la home, en el Air X2 y en las legales), redes, legales
 * y contacto completo con direccion y telefono.
 *
 * Los enlaces externos llevan rel="noopener noreferrer": target="_blank" sin
 * eso deja que la pagina destino acceda a window.opener.
 */
export function Footer() {
  const { brand, siteNav, social, legal, contact } = content;

  return (
    <footer className="bg-tech-grid bg-foreground py-12 text-background">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" aria-label={`${brand.name} — home`}>
            <Image src={logo} alt={brand.logo.alt} className="h-8 w-auto" sizes="170px" />
          </Link>

          <nav aria-label="Products">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {siteNav.map((item) => (
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
            <span className="block">{contact.company}</span>
            <span className="block">{contact.address}</span>
            <span className="block">
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="underline-offset-4 transition-colors hover:text-brand-light hover:underline"
              >
                {contact.phone}
              </a>
              {" · "}
              <a
                href={`mailto:${contact.email}`}
                className="underline-offset-4 transition-colors hover:text-brand-light hover:underline"
              >
                {contact.email}
              </a>
            </span>
          </address>

          <p className="text-body-sm text-background/50">
            &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
