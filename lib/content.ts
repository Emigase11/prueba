/**
 * Contenido de la landing Cmax Air X2 — única fuente de verdad.
 *
 * Reglas:
 * - Ningún componente hardcodea copy, precios, specs ni rutas de imagen.
 * - `deliveryDate` es LA única fecha de entrega de toda la página. Mientras
 *   sea null, las secciones que la mencionan muestran su `fallback` neutro.
 * - Los valores "To be confirmed" son datos que el cliente aún no pasó
 *   (medidas exactas, materiales). No inventar.
 * - Copy en inglés: el sitio y el mercado de Cmax System son en inglés.
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
export interface PlanRow {
  label: string;
  value: string;
  tone?: "good" | "warn";
}

export interface PricingPlan {
  id: "founders" | "preorder";
  name: string;
  tagline: string;
  /** Pago exigido hoy, en USD */
  priceToday: number;
  priceTodayLabel: string;
  /** Costo total del plan, en USD */
  priceTotal: number;
  priceNote: string;
  rows: PlanRow[];
  /** Beneficios exclusivos de este plan. Vacío = sin extras. */
  extras: string[];
  cta: Cta;
  recommended: boolean;
  /** Ahorro vs. el otro plan, en USD (solo el recomendado) */
  savings?: number;
}

export interface SpecRow {
  label: string;
  value: string;
  /** true = dato pendiente de confirmación del cliente */
  pending?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  brand: {
    name: string;
    productName: string;
    logo: ImageAsset;
  };
  /** Única fecha de entrega de la página. null = aún sin confirmar. */
  deliveryDate: string | null;
  deliveryDateFallback: string;
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    image: ImageAsset;
    launchPrice: number;
    msrp: number;
    priceLabel: string;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
  };
  steps: {
    heading: string;
    subheading: string;
    items: { title: string; description: string; image: ImageAsset }[];
  };
  /** Barra fija inferior en mobile. */
  stickyBar: {
    priceLabel: string;
    cta: Cta;
  };
  pricing: {
    heading: string;
    subheading: string;
    recommendedLabel: string;
    savingsLabel: string;
    plans: PricingPlan[];
  };
  useCases: {
    heading: string;
    subheading: string;
    items: { title: string; description: string; image: ImageAsset }[];
  };
  tech: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    image: ImageAsset;
  };
  specs: {
    heading: string;
    rows: SpecRow[];
  };
  emailCapture: {
    heading: string;
    subheading: string;
    placeholder: string;
    buttonLabel: string;
    disclaimer: string;
  };
  press: {
    heading: string;
    logos: ImageAsset[];
  };
  impact: {
    heading: string;
    body: string;
    ratioLabel: string;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
}

export const content: SiteContent = {
  brand: {
    name: "Cmax System",
    productName: "Cmax Air X2",
    logo: {
      src: "/images/logo-web-orange-cmax-system.png",
      alt: "Cmax System",
    },
  },

  deliveryDate: null, // ← poner acá la fecha única cuando el cliente la confirme
  deliveryDateFallback: "Delivery date to be announced",

  hero: {
    eyebrow: "Inflatable AeroCabin",
    headline: "A cabin that goes anywhere. Even on water.",
    subheadline:
      "The Cmax Air X2 is an inflatable AeroCabin for camping, overlanding and flood emergencies. Choose a surface, inflate, and you're in.",
    image: {
      src: "/images/cmax-air-X2-water.png",
      alt: "Cmax Air X2 AeroCabin floating on open water",
    },
    launchPrice: 1295,
    msrp: 2590,
    priceLabel: "Launch price",
    ctaPrimary: { label: "Reserve yours", href: "#pricing" },
    ctaSecondary: { label: "See how it works", href: "#how-it-works" },
  },

  steps: {
    heading: "Ready in 3 steps",
    subheading: "No poles, no tools, no experience needed.",
    items: [
      {
        title: "Choose your surface",
        description: "Ground, truck bed, snow — or water.",
        image: {
          src: "/images/cmax-air-step-1-1.png",
          alt: "Step 1: choosing a surface for the Cmax Air X2",
        },
      },
      {
        title: "Inflate",
        description: "High-pressure drop-stitch chambers give it a rigid structure.",
        image: {
          src: "/images/cmax-air-step-2-1.png",
          alt: "Step 2: inflating the Cmax Air X2",
        },
      },
      {
        title: "Move in",
        description: "A solid, insulated cabin — set up in minutes.",
        image: {
          src: "/images/cmax-air-step-3-1.png",
          alt: "Step 3: the Cmax Air X2 fully set up",
        },
      },
    ],
  },

  stickyBar: {
    priceLabel: "Launch price",
    cta: { label: "Reserve yours", href: "#pricing" },
  },

  pricing: {
    heading: "Two ways to get yours",
    subheading: "Both options reserve a Cmax Air X2 from the first production run.",
    recommendedLabel: "Recommended",
    savingsLabel: "Save",
    plans: [
      {
        id: "founders",
        name: "Founder's Edition",
        tagline: "Pay in full, save the most.",
        priceToday: 1295,
        priceTodayLabel: "Pay today",
        priceTotal: 1295,
        priceNote: "One payment. Nothing left to pay.",
        rows: [
          { label: "Total cost", value: "$1,295", tone: "good" },
          { label: "Production queue", value: "First in line", tone: "good" },
          { label: "Cancellation", value: "Non-refundable", tone: "warn" },
        ],
        extras: ["Free shipping", "Numbered serial unit"],
        cta: { label: "Get Founder's Edition", href: "#" },
        recommended: true,
        savings: 259,
      },
      {
        id: "preorder",
        name: "Pre-order",
        tagline: "Small deposit, decide later.",
        priceToday: 299,
        priceTodayLabel: "Deposit today",
        priceTotal: 1554,
        priceNote: "$299 now + $1,255 balance before shipping.",
        rows: [
          { label: "Total cost", value: "$1,554" },
          { label: "Production queue", value: "Standard" },
          { label: "Cancellation", value: "Cancel anytime", tone: "good" },
        ],
        extras: [],
        cta: { label: "Pre-order for $299", href: "#" },
        recommended: false,
      },
    ],
  },

  useCases: {
    heading: "One cabin, every terrain",
    subheading: "Real photos of the Cmax Air X2 in the field.",
    items: [
      {
        title: "Lakes & calm water",
        description: "It floats. Anchor it and sleep on the water.",
        image: {
          src: "/images/cmax-air-X2-water.png",
          alt: "Cmax Air X2 floating on a lake",
        },
      },
      {
        title: "Mountain & basecamp",
        description: "Rigid walls stand up to wind and cold nights.",
        image: {
          src: "/images/montain-cmax-air-x2.png",
          alt: "Cmax Air X2 set up in the mountains",
        },
      },
      {
        title: "Truck bed",
        description: "Fits in a pickup bed and turns it into a camper.",
        image: {
          src: "/images/cmax-air-x2-cibertruk.png",
          alt: "Cmax Air X2 mounted on a pickup truck bed",
        },
      },
      {
        title: "Events & festivals",
        description: "Set up a private cabin anywhere in minutes.",
        image: {
          src: "/images/burning-man-Aerocabin-Cmax-X2.jpg",
          alt: "Cmax Air X2 AeroCabin at a festival",
        },
      },
      {
        title: "Flood preparedness",
        description: "A floating shelter when water rises. Designed with rescue in mind.",
        image: {
          src: "/images/flooding-cmax-air-x2.png",
          alt: "Cmax Air X2 used as a floating shelter in a flood",
        },
      },
    ],
  },

  tech: {
    heading: "Drop-stitch construction",
    subheading: "The same principle behind rigid inflatable paddleboards — scaled up to a cabin.",
    paragraphs: [
      "Thousands of internal threads connect the inner and outer walls of each panel. Under pressure — up to 10 bar — the chambers become rigid structural walls, not soft tubes.",
      "The result is a cabin that packs down small, inflates fast, and holds its shape in real conditions.",
    ],
    image: {
      src: "/images/cmax-air-x2-dropstitch-aerocabin.jpg",
      alt: "Close-up of the Cmax Air X2 drop-stitch panel construction",
    },
  },

  specs: {
    heading: "Specs",
    rows: [
      { label: "Dimensions", value: "To be confirmed", pending: true },
      { label: "Weight", value: "42 kg" },
      { label: "Capacity", value: "2 adults + 2 kids" },
      { label: "Inflation pressure", value: "Up to 10 bar" },
      { label: "Materials", value: "Drop-stitch construction — details to be confirmed", pending: true },
      { label: "Warranty", value: "3 years" },
    ],
  },

  emailCapture: {
    heading: "Be first to know",
    subheading: "Get notified when the Cmax Air X2 ships and when new colors drop.",
    placeholder: "Your email",
    buttonLabel: "Notify me",
    disclaimer: "No spam. One email when it matters.",
  },

  press: {
    heading: "As featured in",
    logos: [
      { src: "/images/Forbes-nico-garcia-mayor.png", alt: "Forbes" },
      { src: "/images/Fox-News-Nicolas-garcia-mayor-cmax-system.png", alt: "Fox News" },
      { src: "/images/CNN-Nico-garcia-mayor.png", alt: "CNN" },
      { src: "/images/Newsweek-nico-garcia-mayor-cmax-system.png", alt: "Newsweek" },
      { src: "/images/NBC-news-nicolas-garcia-mayor.png", alt: "NBC News" },
      { src: "/images/washington-Post-nicolas-garcia-mayor.png", alt: "The Washington Post" },
    ],
  },

  impact: {
    heading: "Buy one, protect a family",
    ratioLabel: "1 in 10",
    body: "For every 10 units sold, Cmax System donates 1 AeroCabin to families in flood-affected areas.",
  },

  faq: {
    heading: "Frequently asked questions",
    items: [
      {
        question: "What's the difference between Founder's Edition and Pre-order?",
        answer:
          "Founder's Edition is a single payment of USD 1,295 with free shipping, a numbered serial unit and first place in the production queue — it saves you USD 259, but it's non-refundable. Pre-order is a refundable USD 299 deposit plus a USD 1,255 balance before shipping (USD 1,554 total), in the standard queue, and you can cancel anytime.",
      },
      {
        question: "Is the deposit refundable?",
        answer:
          "The USD 299 pre-order deposit is fully refundable and you can cancel anytime. The Founder's Edition payment is non-refundable.",
      },
      {
        question: "How many people fit inside?",
        answer: "The Cmax Air X2 is designed for 2 adults and 2 kids.",
      },
      {
        question: "Does it really float?",
        answer:
          "Yes. The high-pressure drop-stitch chambers make the cabin buoyant, which is why it also works as a flood-preparedness shelter.",
      },
      {
        question: "When will it ship?",
        answer:
          "See the delivery date shown on this page. Founder's Edition units enter production first; pre-orders follow in the standard queue.",
      },
      {
        question: "What warranty does it have?",
        answer: "Every Cmax Air X2 comes with a 3-year warranty.",
      },
    ],
  },
};

/** Formatea precios USD sin decimales: 1295 → "$1,295" */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
