"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { content } from "@/lib/content";

/**
 * Captura de email - SOLO UI. No hay backend todavia: el submit se intercepta
 * y muestra la confirmacion en local. Para conectarlo, reemplazar el onSubmit
 * por el POST correspondiente.
 *
 * Panel oscuro con la grilla tecnica: es el CTA de cierre y tiene que
 * destacar del fondo claro que lo rodea.
 */
export function EmailCapture() {
  const { emailCapture } = content;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="email" className="py-section md:py-section-lg">
      <div className="container">
        <div className="bg-tech-grid relative overflow-hidden rounded-lg bg-foreground px-6 py-12 text-background md:px-16 md:py-16">
          <div
            aria-hidden
            className="glow-orb absolute -right-20 -top-20 size-64 bg-brand/50"
          />
          <div
            aria-hidden
            className="glow-orb absolute -bottom-24 -left-16 size-56 bg-brand/30"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-title">{emailCapture.heading}</h2>
            <p className="mt-3 text-body text-background/70">
              {emailCapture.subheading}
            </p>

            {submitted ? (
              <p
                role="status"
                className="mt-8 flex items-center justify-center gap-2 text-body font-semibold text-brand-light"
              >
                <Check aria-hidden className="size-5" strokeWidth={3} />
                You&apos;re on the list. We&apos;ll be in touch.
              </p>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="notify-email" className="sr-only">
                  {emailCapture.placeholder}
                </label>
                <Input
                  id="notify-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={emailCapture.placeholder}
                  className="h-12 flex-1 border-background/20 bg-background text-body text-foreground transition-shadow focus-visible:shadow-[0_0_40px_-8px] focus-visible:shadow-brand/60 focus-visible:ring-brand"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 text-body font-semibold"
                >
                  {emailCapture.buttonLabel}
                </Button>
              </form>
            )}

            <p className="mt-4 text-body-sm text-background/60">
              {emailCapture.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
