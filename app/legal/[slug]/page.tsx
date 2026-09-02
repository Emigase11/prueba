import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { content } from "@/lib/content";
import { legalDocs, getLegalDoc } from "@/lib/legal";
import logo from "@/public/images/logo-web-orange-cmax-system.png";

/**
 * Una sola ruta para los seis documentos legales: el contenido vive en
 * lib/legal.ts y el slug lo resuelve. generateStaticParams los prerenderiza
 * a todos, asi salen estaticos como la landing.
 */
export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doc = getLegalDoc(params.slug);
  if (!doc) return {};
  return {
    title: `${doc.title} | ${content.brand.name}`,
    description: doc.intro?.[0] ?? doc.title,
  };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = getLegalDoc(params.slug);
  if (!doc) notFound();

  return (
    <>
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" aria-label={`${content.brand.name} — home`}>
            <Image src={logo} alt={content.brand.logo.alt} className="h-7 w-auto" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-body-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back to the Cmax Air X2
          </Link>
        </div>
      </header>

      <main className="py-section md:py-section-lg">
        <article className="container max-w-3xl">
          <h1 className="text-title">{doc.title}</h1>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Last updated: {doc.updated}
          </p>

          {doc.intro && (
            <div className="mt-6 space-y-4 border-l-2 border-brand pl-5">
              {doc.intro.map((paragraph) => (
                <p key={paragraph} className="text-body text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <div className="mt-10 space-y-8">
            {doc.sections.map((section, i) => (
              <section key={section.title ?? `s-${i}`}>
                {section.title && (
                  <h2 className="text-subtitle">{section.title}</h2>
                )}

                {section.body && (
                  <div className={section.title ? "mt-3 space-y-3" : "space-y-3"}>
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-body text-muted-foreground"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="mt-3 space-y-1.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-body text-muted-foreground"
                      >
                        <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <nav aria-label="Other policies" className="mt-14 border-t pt-8">
            <h2 className="text-body-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Other policies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {content.legal
                .filter((item) => item.slug !== doc.slug)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/legal/${item.slug}`}
                      className="text-body-sm text-muted-foreground underline-offset-4 hover:text-brand-ink hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </article>
      </main>
    </>
  );
}
