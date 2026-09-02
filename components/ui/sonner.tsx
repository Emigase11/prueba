"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * Toaster de sonner, adaptado a la landing.
 *
 * El componente original de shadcn lee el tema con next-themes. Acá no:
 * la página es light-only por decisión de diseño (ver globals.css), así que
 * el tema queda fijo en "light" y no se arrastra esa dependencia.
 */
const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-lg",
        title: "group-[.toast]:font-heading group-[.toast]:font-semibold",
        description: "group-[.toast]:text-muted-foreground",
        actionButton:
          "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
        cancelButton:
          "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        icon: "group-[.toast]:text-brand",
      },
    }}
    {...props}
  />
);

export { Toaster };
