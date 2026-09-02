"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { content } from "@/lib/content";

/**
 * Captura de email - SOLO UI. No hay backend todavia: el submit se intercepta
 * y muestra la confirmacion en local. Para conectarlo, reemplazar el onSubmit
 * por el POST correspondiente.
 *
 * Sección oscura con la grilla técnica, como specs y la timeline. El input
 * se mantiene con fondo claro a propósito: un campo de texto oscuro sobre
 * fondo oscuro se lee como deshabilitado.
 */
export function EmailCapture() {
  const { emailCapture, ui } = content;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="email"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div
        aria-hidden
        className="glow-orb absolute -right-20 -top-16 size-64 bg-brand/50"
      />
      <div
        aria-hidden
        className="glow-orb absolute -bottom-24 -left-16 size-56 bg-brand/30"
      />

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
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
                // El bloque inline reemplaza al formulario y queda fuera de
                // vista si la persona ya scrolleó; el toast confirma igual.
                toast.success(ui.emailToastTitle, {
                  description: ui.emailToastDescription,
                });
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
    </section>
  );
}
