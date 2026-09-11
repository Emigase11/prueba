/**
 * Contenido compartido por TODO el sitio: marca, copy de interfaz, redes,
 * contacto, paginas legales y navegacion entre productos.
 *
 * Regla de reparto: si un texto aparece igual en las dos landings, vive aca;
 * si cambia segun el producto, vive en ./air-x2.ts o ./cx20.ts.
 * Ningun componente hardcodea copy: todo sale de estos archivos.
 */

export interface Cta {
  label: string;
  /** Ancla interna, ej. "#pricing" */
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

/**
 * Fila comparable entre planes. Las etiquetas y su orden son IDÉNTICOS en
 * ambos planes para que las tarjetas se lean en paralelo de un vistazo.
 * Solo se comparan datos que el brief define para AMBOS planes; los
 * beneficios exclusivos van en `extras` (no se afirma su ausencia en el otro).
 * `tone` colorea el valor: "good" verde, "warn" ámbar, undefined neutro.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export type SocialIcon =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "facebook"
  | "x"
  | "linkedin";

/**
 * Copy de los controles de interfaz (menu, galeria, avisos).
 * Vive aca por la misma regla que el resto: ningun componente hardcodea texto.
 */
export interface UiCopy {
  menuLabel: string;
  menuTitle: string;
  menuDescription: string;
  backToTopLabel: string;
  galleryLabel: string;
  galleryPrev: string;
  galleryNext: string;
  galleryOpenHint: string;
  galleryCounter: (current: number, total: number) => string;
  /** Rotador de fotos de la ruta: las etiquetas de sus controles. */
  photoPause: string;
  photoPlay: string;
  photoShow: (label: string) => string;
  pendingSpecNote: string;
  emailToastTitle: string;
  emailToastDescription: string;
}

export interface SharedContent {
  brand: {
    name: string;
    productName: string;
    logo: ImageAsset;
  };
  ui: UiCopy;
  /** Redes oficiales. `icon` mapea al componente en SocialLinks. */
  social: {
    heading: string;
    body: string;
    links: { label: string; href: string; icon: SocialIcon }[];
  };
  contact: {
    company: string;
    location: string;
    address: string;
    phone: string;
    email: string;
  };
  /** Navegacion entre productos, comun a todas las paginas (footer, menu). */
  siteNav: { label: string; href: string }[];
  /** Paginas legales. El slug resuelve /legal/[slug]. */
  legal: { label: string; slug: string }[];
  /** Copy de las paginas de 404 y de error (app/not-found.tsx, app/error.tsx). */
  errorPages: {
    notFound: { code: string; heading: string; body: string };
    failure: { heading: string; body: string; retryLabel: string };
    homeLabel: string;
    contactPrefix: string;
  };
}

export const shared: SharedContent = {
  brand: {
    name: "Cmax System",
    productName: "Cmax Air X2",
    logo: {
      src: "/images/logo-web-orange-cmax-system.png",
      alt: "Cmax System",
    },
  },
  ui: {
    menuLabel: "Menu",
    menuTitle: "Cmax Air X2",
    menuDescription: "Jump to any section of the page.",
    backToTopLabel: "Back to top",
    galleryLabel: "Use case gallery",
    galleryPrev: "Previous image",
    galleryNext: "Next image",
    galleryOpenHint: "View full size",
    galleryCounter: (current, total) => `${current} of ${total}`,
    photoPause: "Pause the photos",
    photoPlay: "Play the photos",
    photoShow: (label) => `Show: ${label}`,
    pendingSpecNote:
      "Awaiting final confirmation from Cmax System. We publish the exact figure here the day it is signed off.",
    emailToastTitle: "You're on the list.",
    emailToastDescription:
      "We'll email you when production starts and when your unit ships.",
  },
  social: {
    heading: "Follow us",
    body: "Latest innovations, global projects and behind-the-scenes moments from our work around the world.",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/cmaxsysteminc/",
        icon: "instagram",
      },
      {
        label: "TikTok",
        href: "https://www.tiktok.com/@cmaxsysteminc",
        icon: "tiktok",
      },
      {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UC2cYgU2kGWwa3NE0EB-4SpQ",
        icon: "youtube",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/cmaxsystem",
        icon: "facebook",
      },
      { label: "X", href: "https://x.com/cmaxsystem", icon: "x" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/cmax-system-inc./",
        icon: "linkedin",
      },
    ],
  },
  contact: {
    company: "Cmax System Inc.",
    location: "Washington, DC, USA",
    address: "1101 Pennsylvania Avenue NW, Suite 300, Washington, DC 20004",
    phone: "+1 (202) 649-0609",
    email: "info@cmaxsystem.com",
  },

  siteNav: [
    { label: "Cmax System", href: "/" },
    { label: "CX20 Series", href: "/#hero" },
    { label: "Cmax Air X2", href: "/air-x2" },
  ],
  errorPages: {
    notFound: {
      code: "404",
      heading: "This page does not exist",
      body: "The link may be out of date or the address mistyped. Everything else is one click away.",
    },
    failure: {
      heading: "Something went wrong",
      body: "An unexpected error stopped this page from loading. Trying again usually solves it.",
      retryLabel: "Try again",
    },
    homeLabel: "Go to the homepage",
    contactPrefix: "If it keeps happening, write to us at",
  },

  legal: [
    { label: "Privacy Policy", slug: "privacy" },
    { label: "Terms & Conditions", slug: "terms" },
    { label: "Limited Warranty", slug: "warranty" },
    { label: "Shipping & Returns", slug: "shipping-returns" },
    { label: "Cookie Policy", slug: "cookies" },
    { label: "Safety & Usage", slug: "safety" },
  ],
};

/** Formatea precios USD sin decimales: 1295 → "$1,295" */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
