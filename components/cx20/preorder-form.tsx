"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cx20 } from "@/lib/content/cx20";

/**
 * Pre-orden del CX20 — SOLO UI. No hay backend todavia (fase 3 del plan):
 * el submit se intercepta y muestra la confirmacion en local. Para
 * conectarlo, reemplazar el onSubmit por el POST correspondiente.
 *
 * Reemplaza al Google Form del sitio actual. Sin cobro: el CX20 no tiene
 * precio publicado, la venta se cierra por contacto.
 *
 * Seccion oscura con la grilla tecnica, como la captura de email del Air X2.
 * El select es nativo: no hay un componente de shadcn instalado para eso y
 * el nativo es lo mas accesible en mobile, que es donde mas se usa.
 */
const fieldClass =
  "h-12 w-full rounded-md border border-background/20 bg-background px-3 text-body text-foreground transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand focus-visible:shadow-[0_0_40px_-8px] focus-visible:shadow-brand/60";

export function PreorderForm() {
  const { preorder } = cx20;
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="pre-order"
      className="bg-tech-grid relative overflow-hidden bg-foreground py-section text-background md:py-section-lg"
    >
      <div aria-hidden className="glow-orb absolute -right-20 -top-16 size-64 bg-brand/50" />
      <div aria-hidden className="glow-orb absolute -bottom-24 -left-16 size-56 bg-brand/30" />

      <div className="container relative">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="text-title">{preorder.heading}</h2>
            <p className="mt-3 text-body text-background/70">{preorder.subheading}</p>
          </div>

          {submitted ? (
            <div role="status" className="mt-10 text-center">
              <p className="flex items-center justify-center gap-2 text-subtitle text-brand-light">
                <Check aria-hidden className="size-5" strokeWidth={3} />
                {preorder.successTitle}
              </p>
              <p className="mt-2 text-body text-background/70">{preorder.successBody}</p>
            </div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
                toast.success(preorder.successTitle, {
                  description: preorder.successBody,
                });
              }}
              className="mt-10 grid gap-4 md:grid-cols-2"
            >
              <div>
                <label htmlFor="po-name" className="mb-1.5 block text-body-sm text-background/70">
                  {preorder.nameLabel}
                </label>
                <Input id="po-name" name="name" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="po-email" className="mb-1.5 block text-body-sm text-background/70">
                  {preorder.emailLabel}
                </label>
                <Input id="po-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="po-org" className="mb-1.5 block text-body-sm text-background/70">
                  {preorder.orgLabel}
                </label>
                <Input id="po-org" name="organization" autoComplete="organization" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="po-use" className="mb-1.5 block text-body-sm text-background/70">
                  {preorder.useLabel}
                </label>
                <select id="po-use" name="use" required defaultValue="" className={fieldClass}>
                  <option value="" disabled>
                    &mdash;
                  </option>
                  {preorder.useOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="po-qty" className="mb-1.5 block text-body-sm text-background/70">
                  {preorder.quantityLabel}
                </label>
                <Input id="po-qty" name="quantity" type="number" min={1} defaultValue={1} required className={fieldClass} />
              </div>
              <div className="flex items-end">
                <Button type="submit" size="lg" className="h-12 w-full text-body font-semibold">
                  {preorder.buttonLabel}
                </Button>
              </div>
              <p className="text-body-sm text-background/60 md:col-span-2">
                {preorder.disclaimer}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
