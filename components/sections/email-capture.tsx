"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { content } from "@/lib/content";

/**
 * Captura de email — SOLO UI. No hay backend todavía: el submit se intercepta
 * y muestra la confirmación en local. Para conectarlo, reemplazar el cuerpo
 * de handleSubmit por el POST correspondiente.
 */
export function EmailCapture() {
  const { emailCapture } = content;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="email" className="bg-brand-tint py-section md:py-section-lg">
      <div className="container max-w-2xl text-center">
        <h2 className="text-title">{emailCapture.heading}</h2>
        <p className="mt-3 text-body text-muted-foreground">
          {emailCapture.subheading}
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-8 flex items-center justify-center gap-2 text-body font-semibold text-brand-ink"
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
              className="h-12 flex-1 bg-background text-body"
            />
            <Button type="submit" size="lg" className="h-12 text-body font-semibold">
              {emailCapture.buttonLabel}
            </Button>
          </form>
        )}

        <p className="mt-4 text-body-sm text-muted-foreground">
          {emailCapture.disclaimer}
        </p>
      </div>
    </section>
  );
}
