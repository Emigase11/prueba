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

export interface TimelineItem {
  /** null en el marcador "estás acá". */
  date: string | null;
  title: string;
  description?: string;
  status: "done" | "now" | "upcoming";
}

/**
 * ÚNICA fecha de entrega de la página.
 *
 * Tomada de la timeline del sitio actual de Cmax (cmaxsystem.com/cmax-air-x2),
 * que publica "SEPTEMBER 2026 — Delivery Worldwide". PENDIENTE DE CONFIRMAR
 * con el cliente.
 *
 * La usan dos lugares —la línea bajo los planes y el último hito de la
 * timeline— y ambos leen de acá, así que nunca pueden contradecirse.
 * Poner null para volver al texto neutro.
 */
const DELIVERY_DATE: string | null = "September 2026";

export interface SiteContent {
  brand: {
    name: string;
    productName: string;
    logo: ImageAsset;
  };
  /** Única fecha de entrega de la página. null = aún sin confirmar. */
  deliveryDate: string | null;
  deliveryDateFallback: string;
  /** Prefijo de la línea de entrega bajo los planes. */
  deliveryShipsLabel: string;
  timeline: {
    heading: string;
    subheading: string;
    items: TimelineItem[];
  };
  /** Enlaces de la barra fija superior (desktop). */
  nav: { label: string; href: string }[];
  hero: {
    eyebrow: string;
    headline: string;
    /** Remate del titular, renderizado con el brillo animado. */
    headlineAccent?: string;
    subheadline: string;
    scrollCueLabel: string;
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
  video: {
    eyebrow: string;
    heading: string;
    subheading: string;
    playLabel: string;
    /** Loop ambiente, sin audio. Solo desktop: en mobile se muestra el poster. */
    loopSrc: string;
    /** Film completo con audio. preload="none": solo baja si el usuario le da play. */
    filmSrc: string;
    filmDuration: string;
    loopPoster: ImageAsset;
    filmPoster: ImageAsset;
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
  /** Kit completo. El copy no enumera piezas: las muestra la foto oficial. */
  included: {
    heading: string;
    subheading: string;
    image: ImageAsset;
  };
  specs: {
    heading: string;
    subheading: string;
    /** Los 4 datos que la gente busca primero, sacados de `rows`. */
    highlights: { value: string; label: string }[];
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

  deliveryDate: DELIVERY_DATE,
  deliveryDateFallback: "Delivery date to be announced",
  deliveryShipsLabel: "Ships",

  timeline: {
    heading: "Where we are",
    subheading:
      "From the first prototype to your door. Two milestones done, two to go.",
    items: [
      {
        date: "May 2025",
        title: "Prototypes designed and built",
        description: "Designed in the jungles of Bali. Engineered for the world.",
        status: "done",
      },
      {
        date: "September 2025",
        title: "Tested in extreme conditions",
        description:
          "Frozen lakes, ocean water, jungle humidity, heavy rain, desert heat, sand and rock — pushing insulation, durability and weather resistance to the limit.",
        status: "done",
      },
      {
        date: null,
        title: "You are here",
        status: "now",
      },
      {
        date: "August 2026",
        title: "Mass production begins",
        description: "The first production batch is limited.",
        status: "upcoming",
      },
      {
        date: DELIVERY_DATE,
        title: "Delivery worldwide",
        status: "upcoming",
      },
    ],
  },

  nav: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Video", href: "#video" },
    { label: "Pricing", href: "#pricing" },
    { label: "Timeline", href: "#timeline" },
    { label: "Specs", href: "#specs" },
    { label: "FAQ", href: "#faq" },
  ],

  hero: {
    eyebrow: "Inflatable AeroCabin",
    headline: "A cabin that goes anywhere.",
    headlineAccent: "Even on water.",
    scrollCueLabel: "Scroll down to see how it works",
    subheadline:
      "The Cmax Air X2 is an inflatable AeroCabin for camping, overlanding and flood emergencies. Choose a surface, inflate, and you're in.",
    image: {
      src: "/images/cmax-air-X2-water.png",
      alt: "Two people sit on top of the Cmax Air X2 AeroCabin as it floats on a calm mountain lake at sunset",
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
          alt: "Step 1: a person kneels beside the folded Cmax Air X2 panel laid flat on the ground",
        },
      },
      {
        title: "Inflate",
        description: "High-pressure drop-stitch chambers give it a rigid structure.",
        image: {
          src: "/images/cmax-air-step-2-1.png",
          alt: "Step 2: a person inflates the Cmax Air X2 with a hand pump as the cabin takes shape",
        },
      },
      {
        title: "Move in",
        description: "A rigid, insulated cabin — no poles, no frame.",
        image: {
          src: "/images/cmax-air-step-3-1.png",
          alt: "Step 3: the Cmax Air X2 fully inflated, with a person opening the side door",
        },
      },
    ],
  },

  video: {
    eyebrow: "See it in motion",
    heading: "Watch it become a cabin",
    // Ojo: el "30 segundos" es la duración del film, NO el tiempo de armado.
    // Tiene que quedar explícito o se lee como un claim del producto.
    subheading:
      "A 30-second film — from folded panel to floating shelter, doing what photos can't.",
    playLabel: "Watch the film",
    loopSrc: "/videos/cmax-air-x2-loop.mp4",
    filmSrc: "/videos/cmax-air-x2-film.mp4",
    filmDuration: "0:30",
    loopPoster: {
      src: "/images/video-loop-poster.jpg",
      alt: "The Cmax Air X2 AeroCabin lit in a dark studio, turning slowly",
    },
    filmPoster: {
      src: "/images/video-film-poster.jpg",
      alt: "Opening frame of the Cmax Air X2 film, showing the AeroCabin in a dark studio",
    },
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
        // Sin checkout todavía: apunta a la captura de email en vez de "#",
        // que saltaría al tope de la página y parecería roto.
        cta: { label: "Get Founder's Edition", href: "#email" },
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
          { label: "Cancellation", value: "Refundable, cancel anytime", tone: "good" },
        ],
        extras: [],
        cta: { label: "Pre-order for $299", href: "#email" },
        recommended: false,
      },
    ],
  },

  useCases: {
    heading: "One cabin, every terrain",
    // No decir "fotos reales": estas cinco imágenes son renders oficiales
    // de Cmax, no fotografías.
    subheading: "The same cabin, in five very different places.",
    items: [
      {
        title: "Lakes & calm water",
        description: "It floats. Anchor it and spend the night on the water.",
        image: {
          src: "/images/cmax-air-X2-water.png",
          alt: "The Cmax Air X2 floats on a calm mountain lake while two people fish from the top",
        },
      },
      {
        title: "Mountain & basecamp",
        description: "Rigid walls stand up to wind and cold nights.",
        image: {
          src: "/images/montain-cmax-air-x2.png",
          alt: "A person sits on top of the Cmax Air X2 at a mountain overlook at sunset",
        },
      },
      {
        title: "Truck bed",
        description: "Fits in a pickup bed and turns it into a camper.",
        image: {
          src: "/images/cmax-air-x2-cibertruk.png",
          alt: "The Cmax Air X2 inflated in the bed of a pickup truck beside a mountain lake",
        },
      },
      {
        title: "Events & festivals",
        description: "A private, lockable cabin in the middle of the desert.",
        image: {
          src: "/images/burning-man-Aerocabin-Cmax-X2.jpg",
          alt: "Several Cmax Air X2 AeroCabins set up at a desert festival at night, lit from inside",
        },
      },
      {
        title: "Flood preparedness",
        description: "A floating shelter when the water rises. Designed with rescue in mind.",
        image: {
          src: "/images/flooding-cmax-air-x2.png",
          alt: "A family boards a floating Cmax Air X2 on a flooded residential street at dusk",
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
      alt: "Cutaway view of the Cmax Air X2 with a wall panel peeled back, exposing the dense internal drop-stitch threads that run between the inner and outer layers",
    },
  },

  included: {
    heading: "What's in the box",
    subheading: "The complete Cmax Air X2 kit.",
    image: {
      src: "/images/whats-include-cmax-air-x2.png",
      alt: "The Cmax Air X2 kit laid out: the AeroCabin shown from two angles, two paddles, a hand pump, a rolled carry bag, a repair kit, a coiled leash and three fins",
    },
  },

  specs: {
    heading: "Specs",
    subheading: "The numbers that matter, and the full sheet below.",
    // Cada destacado repite EXACTAMENTE un dato de `rows`. Si cambia una
    // fila, cambiar también el destacado que le corresponde.
    highlights: [
      { value: "42 kg", label: "Weight" },
      { value: "2 + 2", label: "Adults + kids" },
      { value: "10 bar", label: "Max inflation pressure" },
      { value: "3 years", label: "Warranty" },
    ],
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
    subheading: "Get notified when production starts and when your unit ships.",
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
    // El brief solo define el ratio. No inventar quién recibe la donación.
    body: "For every 10 units sold, Cmax System donates 1 AeroCabin.",
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
        // Se arma desde DELIVERY_DATE para que no exista una segunda fecha
        // literal que pueda quedar desactualizada.
        answer: DELIVERY_DATE
          ? `Mass production begins August 2026 and delivery is scheduled for ${DELIVERY_DATE}. Founder's Edition units enter production first; pre-orders follow in the standard queue.`
          : "The delivery date hasn't been announced yet. Founder's Edition units enter production first; pre-orders follow in the standard queue.",
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
