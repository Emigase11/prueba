import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { content, formatUsd, type PricingPlan } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Dos planes comparables de un vistazo: ambas tarjetas repiten la MISMA
 * estructura (precio → 3 filas comparables → extras → CTA) y las filas
 * usan las mismas etiquetas en el mismo orden, así el ojo compara en
 * horizontal. La grilla usa subgrid en desktop para que las filas queden
 * alineadas aunque el texto ocupe distinto alto.
 */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const { pricing } = content;

  return (
    <div
      className={cn(
        "relative grid rounded-lg border bg-card p-6 transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 md:row-span-5 md:grid-rows-subgrid md:gap-0 md:p-8",
        plan.recommended
          ? "border-brand shadow-xl shadow-brand/20 ring-1 ring-brand hover:shadow-2xl hover:shadow-brand/30"
          : "border-border hover:shadow-lg",
      )}
    >
      {/* 1. Encabezado */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-subtitle">{plan.name}</h3>
          {plan.recommended && (
            <span className="rounded-full bg-brand px-2.5 py-1 text-body-sm font-semibold leading-none text-white">
              {pricing.recommendedLabel}
            </span>
          )}
        </div>
        <p className="mt-2 text-body-sm text-muted-foreground">{plan.tagline}</p>
        <p className="mt-1 text-body-sm font-medium text-brand-ink">
          {plan.discountNote}
        </p>
      </div>

      {/* 2. Precio */}
      <div className="mt-6">
        <p className="text-body-sm font-medium text-muted-foreground">
          {plan.priceTodayLabel}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <span className="text-title">{formatUsd(plan.priceToday)}</span>
          {plan.savings ? (
            <span className="rounded bg-brand-tint px-2 py-0.5 text-body-sm font-semibold text-brand-ink">
              {pricing.savingsLabel} {formatUsd(plan.savings)}
            </span>
          ) : null}
        </p>
        <p className="mt-2 text-body-sm text-muted-foreground">{plan.priceNote}</p>
      </div>

      {/* 3. Filas comparables — mismas etiquetas y orden en ambos planes */}
      <dl className="mt-6 divide-y border-y">
        {plan.rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 py-3"
          >
            <dt className="text-body-sm text-muted-foreground">{row.label}</dt>
            <dd
              className={cn(
                "text-right text-body-sm font-semibold",
                row.tone === "good" && "text-emerald-700",
                row.tone === "warn" && "text-amber-700",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      {/* 4. Extras exclusivos del plan */}
      <ul className="mt-5 space-y-2">
        {plan.extras.length > 0 ? (
          plan.extras.map((extra) => (
            <li key={extra} className="flex items-center gap-2 text-body-sm">
              <Check
                aria-hidden
                className="size-4 shrink-0 text-brand-ink"
                strokeWidth={3}
              />
              {extra}
            </li>
          ))
        ) : (
          <li className="flex items-center gap-2 text-body-sm text-muted-foreground">
            <Minus aria-hidden className="size-4 shrink-0" />
            No extras included
          </li>
        )}
      </ul>

      {/* 5. CTA — alineado al fondo en ambas tarjetas */}
      <div className="mt-8 flex items-end">
        <Button
          asChild
          size="lg"
          variant={plan.recommended ? "default" : "outline"}
          className="w-full text-body font-semibold"
        >
          <Link href={plan.cta.href}>{plan.cta.label}</Link>
        </Button>
      </div>
    </div>
  );
}

export function Pricing() {
  const { pricing } = content;

  return (
    <section id="pricing" className="bg-muted/40 py-section md:py-section-lg">
      <div className="container">
        <h2 className="text-title">{pricing.heading}</h2>
        <p className="mt-3 max-w-xl text-body text-muted-foreground">
          {pricing.subheading}
        </p>

        {/* 5 filas explícitas: cada tarjeta las hereda con subgrid, así
            encabezado, precio, tabla, extras y CTA quedan alineados entre sí. */}
        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_auto]">
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Fecha de entrega. Sale del MISMO campo que el último hito de la
            timeline, así nunca pueden contradecirse. */}
        <p className="mt-6 text-center text-body-sm text-muted-foreground">
          {content.deliveryDate
            ? `${content.deliveryShipsLabel} ${content.deliveryDate}`
            : `${content.productionLabel} ${content.productionStart}`}
        </p>
      </div>
    </section>
  );
}
