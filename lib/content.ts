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
  /** Descuento respecto del MSRP futuro. */
  discountNote: string;
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

/**
 * Grupo de la ficha técnica. `note` es para aclaraciones legales al pie del
 * grupo (ej. que la flotabilidad no lo convierte en salvavidas certificado).
 * `layout: "chips"` renderiza los valores como etiquetas en vez de lista.
 */
export interface SpecGroup {
  label: string;
  values: string[];
  note?: string;
  layout?: "list" | "chips";
  /** true = dato pendiente de confirmación del cliente */
  pending?: boolean;
}

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
const DELIVERY_DATE: string | null = null;

/**
 * Arranque de la primera tanda de produccion. Es el unico compromiso de
 * fecha que la marca asume hoy: la entrega se estima por unidad recien
 * cuando entra en produccion, por eso DELIVERY_DATE queda en null.
 */
const PRODUCTION_START = "September 2026";

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
  pendingSpecNote: string;
  marqueePause: string;
  marqueePlay: string;
  emailToastTitle: string;
  emailToastDescription: string;
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
  /** Prefijo de la línea de entrega bajo los planes. */
  deliveryShipsLabel: string;
  /** Arranque de produccion — se muestra mientras no haya fecha de entrega. */
  productionStart: string;
  productionLabel: string;
  ui: UiCopy;
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
    filmCaption: string;
    loopCaption: string;
    /** Loop ambiente, sin audio; autoreproduce en todos los tamanos. */
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
  /** Kit completo: la foto oficial mas la lista confirmada por el cliente. */
  included: {
    heading: string;
    subheading: string;
    /** Contenido del kit, confirmado por el cliente. */
    items: string[];
    image: ImageAsset;
  };
  specs: {
    heading: string;
    subheading: string;
    /** Los 4 datos que la gente busca primero, sacados de `groups`. */
    highlights: { value: string; label: string }[];
    groups: SpecGroup[];
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
  /** Redes oficiales. `icon` mapea al componente en SocialLinks. */
  social: {
    heading: string;
    body: string;
    links: { label: string; href: string; icon: SocialIcon }[];
  };
  contact: { company: string; location: string; email: string };
  /** Paginas legales. El slug resuelve /legal/[slug]. */
  legal: { label: string; slug: string }[];
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
  productionStart: PRODUCTION_START,
  productionLabel: "First production batch begins",

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
    pendingSpecNote:
      "Awaiting final confirmation from Cmax System. We publish the exact figure here the day it is signed off.",
    marqueePause: "Pause logo animation",
    marqueePlay: "Resume logo animation",
    emailToastTitle: "You're on the list.",
    emailToastDescription:
      "We'll email you when production starts and when your unit ships.",
  },

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
        date: PRODUCTION_START,
        title: "First production batch",
        description:
          "The first batch is limited. Reservations are fulfilled in the order they were received.",
        status: "upcoming",
      },
      {
        // Sin fecha a proposito: cae al texto neutro hasta que la marca
        // comprometa una. La estimacion es por unidad, no global.
        date: DELIVERY_DATE,
        title: "Delivery worldwide",
        description:
          "You get an estimated delivery date as soon as your unit enters production.",
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
    filmCaption: "The full presentation film - 30 seconds, with sound.",
    loopCaption: "Studio, interior and open water - 11 seconds on loop.",
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
        discountNote: "50% off the future MSRP",
        priceToday: 1295,
        priceTodayLabel: "Pay today",
        priceTotal: 1295,
        priceNote: "One payment. Nothing left to pay.",
        rows: [
          { label: "Total cost", value: "$1,295", tone: "good" },
          { label: "Production queue", value: "First in line", tone: "good" },
          { label: "Cancellation", value: "Non-refundable", tone: "warn" },
        ],
        extras: [
          "Free US shipping, VAT included",
          "Founder's Edition serial number",
          "Priority fulfillment",
          "Production updates by email",
          "15% off your next Cmax purchase",
        ],
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
        discountNote: "40% off the future MSRP",
        priceToday: 299,
        priceTodayLabel: "Deposit today",
        priceTotal: 1554,
        priceNote: "$299 now + $1,255 balance before shipping.",
        rows: [
          { label: "Total cost", value: "$1,554" },
          { label: "Production queue", value: "Standard" },
          {
            label: "Cancellation",
            value: "Refundable until production",
            tone: "good",
          },
        ],
        extras: ["Choose your color before production"],
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
    subheading:
      "Everything you need to get on the water, in one bag. No extras to buy.",
    items: [
      "AeroCabin™ Cmax Air X2",
      "2 adjustable carbon fiber paddles",
      "Dual-action pump",
      "Cmax orange carry bag",
      "Repair kit",
      "Safety leash",
      "3 removable fins",
    ],
    image: {
      src: "/images/whats-include-cmax-air-x2.png",
      alt: "The Cmax Air X2 kit laid out: the AeroCabin shown from two angles, two paddles, a hand pump, a rolled carry bag, a repair kit, a coiled leash and three fins",
    },
  },

  specs: {
    heading: "Tech specs",
    subheading:
      "Need more info? Explore the core specifications behind the Cmax Air X2 — advanced drop-stitch technology, engineered for mobility, comfort and rapid deployment.",
    // Cada destacado repite EXACTAMENTE un dato de `groups`. Si cambia un
    // grupo, cambiar tambien el destacado que le corresponde.
    highlights: [
      { value: "40 kg", label: "Weight" },
      { value: "2 + 2", label: "Adults + kids" },
      { value: "10 bar", label: "Max inflation pressure" },
      { value: "2 years", label: "Cabin warranty" },
    ],
    groups: [
      {
        label: "Dimensions",
        values: ['98" × 49" × 53"', "248 cm × 125 cm × 135 cm"],
      },
      {
        label: "Structure",
        values: [
          "High-pressure drop-stitch inflatable walls",
          "8 cm reinforced structural thickness",
          "Thermal welded seams",
        ],
      },
      {
        label: "Capacity",
        values: [
          "Designed for up to 2 adults and 2 kids",
          "Spacious panoramic interior",
        ],
      },
      {
        label: "Weight",
        values: ["Approx. 40 kg / 88 lbs", "Portable and compact when packed"],
      },
      {
        label: "Inflation",
        values: [
          "Rapid inflation system",
          "Single front inflation valve",
          "Compatible with electric and manual pumps",
          "Max inflation 10 bar",
        ],
      },
      {
        label: "Floating capability",
        values: [
          "Buoyant inflatable structure",
          "Designed to float during flood situations",
        ],
        // Aclaracion legal del cliente. No quitar ni suavizar.
        note: "Not a certified life-saving device. Certified life jackets should always be used.",
      },
      {
        label: "Materials",
        values: [
          "Reinforced PVC drop-stitch fabric",
          "UV and weather resistant components",
          "High-durability outdoor construction",
        ],
      },
      {
        label: "Portability",
        values: [
          "Deflates into a compact transport bag",
          "Easy to carry, store and deploy",
          "Packed: 130 × 52 × 32 cm / 51.18 × 20.47 × 12.60 in",
        ],
      },
      {
        label: "Warranty",
        values: [
          "2 years on the cabin, inflatable system and structural components",
          "1 year on accessories and non-structural components",
          "Replacements and repairs carry the remaining period of the original warranty",
        ],
      },
      {
        label: "Use cases",
        layout: "chips",
        values: [
          "Camping",
          "Overlanding",
          "Concerts",
          "Fishing",
          "Emergency preparedness",
          "Flood response",
          "Remote exploration",
        ],
      },
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
        question:
          "What's the difference between the $299 deposit and paying in full?",
        answer:
          "Paying in full gets you the Launch Price of USD 1,295 — 50% off the future MSRP — plus priority fulfillment, a Founder's Edition serial number, production updates by email and 15% off your next Cmax purchase. The USD 299 refundable deposit secures your place in the production queue and locks in the Pre-Order Price of USD 1,554 (40% off the future MSRP). Before production begins you complete the remaining USD 1,255 balance and choose your color.",
      },
      {
        question: "Is the $299 deposit refundable?",
        answer:
          "Yes, until you confirm your order and your AeroCabin™ enters production. Once you select your color and pay the remaining balance, your unit is assigned exclusively to you and the deposit becomes non-refundable. Refunds are processed within 5–10 business days. Stripe's card processing fee (approximately USD 13) is non-refundable.",
      },
      {
        question: "Does my deposit apply toward the final price?",
        answer:
          "Yes. The USD 299 deposit is part of the USD 1,554 total. Before production begins you are invited to choose your color and pay the remaining USD 1,255 balance. Once full payment is received, your AeroCabin™ is assigned exclusively to you and your order enters production.",
      },
      {
        question: "What if I pay in full and change my mind?",
        answer:
          "Full payment orders are non-refundable: your unit is scheduled for production immediately, which is what guarantees priority fulfillment. If your circumstances change, your payment converts to store credit for a future Cmax purchase. If you prefer flexibility, choose the USD 299 refundable deposit instead.",
      },
      {
        question: "What's included in the $1,295 price?",
        answer:
          "For US customers: free shipping, VAT included and warranty included. No hidden fees — USD 1,295 is the final price delivered to your door. For international customers, shipping costs and applicable taxes are confirmed at the time of fulfillment based on your location.",
      },
      {
        question: "When will I receive my Air X2?",
        answer:
          "The first production batch begins in September 2026. Reservations are fulfilled in the order they are received. As soon as your unit enters production we give you an estimated delivery date and keep you updated through manufacturing and shipping.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes. Shipping availability and costs for international orders are confirmed closer to fulfillment. We do not guarantee shipping costs or delivery timelines outside the US, since customs, taxes and courier rates vary by country.",
      },
      {
        question: "I'm a Cmax investor. Do I get a special price?",
        answer:
          "Yes. Cmax investors get an exclusive price of USD 1,100 with free US shipping included. Use the discount code sent to your registered email — if you don't have it, request it at info@cmaxsystem.com.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. All payments are processed through Stripe, the same infrastructure used by Amazon, Google and Apple. Your card data is never stored on our servers.",
      },
      {
        question: "How many people fit inside?",
        answer:
          "The Cmax Air X2 is designed for up to 2 adults and 2 kids. Do not exceed the recommended occupant capacity or weight limits: doing so affects stability, flotation and structural performance.",
      },
      {
        question: "Does it really float?",
        answer:
          "Yes. The high-pressure drop-stitch chambers make the cabin buoyant, and it is designed to float during flood situations. Important: it is not a certified life-saving device — it is not certified by the US Coast Guard or any international authority as a rescue craft, lifeboat or survival craft. Always wear an approved flotation device near or on water, and never rely on it as your only means of rescue or evacuation.",
      },
      {
        question: "What warranty does it have?",
        answer:
          "The cabin, inflatable system and structural components are covered for 2 years from the purchase date. Accessories and non-structural components are covered for 1 year. Replacements and repaired components carry the remaining period of the original warranty. The warranty covers manufacturing defects, not normal wear, punctures, misuse or improper storage.",
      },
    ],
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
    email: "info@cmaxsystem.com",
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
