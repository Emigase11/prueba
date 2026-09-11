/**
 * Contenido de la home: Cmax System y la linea CX20 (vivienda plegable).
 *
 * Todo el copy y los datos salen del sitio actual (cmaxsystem.com) — nada
 * inventado. Donde el sitio se contradice (el programa de donacion aparece
 * como "1 cada 10" y como "11 a 1") se usa la version del brief: 1 cada 10.
 *
 * Las fotos estan en /public/images/cx20 y son activos del cliente traidos
 * de su sitio. Los alt describen lo que realmente muestra cada una.
 */

import type { Cta, FaqItem, ImageAsset } from "./shared";

export interface Cx20Content {
  /** Anclas de esta pagina para la barra fija. */
  nav: { label: string; href: string }[];
  /**
   * El Air X2 dentro del hero: es el lanzamiento, pero el principal de la
   * home es el CX20. Por eso entra como franja debajo del CX20 y no como
   * primer bloque.
   */
  hero: {
    headline: string;
    headlineAccent?: string;
    subheadline: string;
    /**
     * Las dos medidas del producto, para dibujarlas a escala real: el largo de
     * cada barra sale de `inches`, asi que su proporcion en pantalla es la
     * proporcion de verdad. `inches` es solo para el dibujo; lo que se lee es
     * `value`.
     *
     * OJO: el contenido no afirma que las dos medidas sean del mismo eje, asi
     * que el dibujo no traza un datum compartido. Si Cmax confirma que 37" es
     * el ancho plegado de esos mismos 14 ft, se pueden unir en una sola linea.
     */
    scale: { inches: number; value: string; label: string }[];
    image: ImageAsset;
    ctaPrimary: Cta;
    ctaSecondary: Cta;
  };
  /** Puente entre las dos lineas de producto. */
  productSwitch: {
    heading: string;
    body: string;
    cards: {
      name: string;
      tagline: string;
      href: string;
      ctaLabel: string;
      current?: boolean;
      /** Destaca la tarjeta como lanzamiento. */
      isNew?: boolean;
      badge?: string;
      /** contain para recortes PNG sobre tinte; cover para fotos. */
      fit?: "contain" | "cover";
      image: ImageAsset;
    }[];
  };
  facts: {
    heading: string;
    subheading: string;
    /** Los numeros que definen al producto; StatValue anima los digitos. */
    stats: { value: string; label: string }[];
    features: { title: string; description: string }[];
  };
  steps: {
    heading: string;
    subheading: string;
    items: { title: string; description: string; image: ImageAsset }[];
  };
  interior: {
    heading: string;
    subheading: string;
    paragraphs: string[];
    image: ImageAsset;
  };
  uses: {
    heading: string;
    subheading: string;
    items: { title: string; description: string; image: ImageAsset }[];
  };
  founder: {
    eyebrow: string;
    name: string;
    role: string;
    bio: string;
    image: ImageAsset;
    /**
     * La ruta: de Nicolas Garcia Mayor a Firas Kayal, un hito por parada.
     *
     * No hay fechas a proposito. Los lugares salen de los nombres de archivo
     * que puso Cmax (Leipzig, Haiti, ECOSOC, BID) y los premios de la bio, que
     * ya estaban en el sitio. Ninguna parada afirma un año, porque no los
     * tenemos: el orden es narrativo, no una cronologia verificada. Si Cmax
     * pasa las fechas, se agregan sin rehacer nada.
     *
     * `photos` con mas de una entra en el rotador (journey-photos.tsx), que las
     * pasa solas. `label` es el pie de cada foto dentro del grupo, para que se
     * sepa cual es cual.
     *
     * `quote` marca las paradas que son un testimonio: son el final del camino
     * y por eso van al cierre.
     */
    journeyHeading: string;
    journeyBody: string;
    stops: {
      place: string;
      title: string;
      body?: string;
      photos: (ImageAsset & { label: string })[];
      quote?: { text: string; name: string; role: string };
    }[];
  };
  impact: { heading: string; body: string; ratioLabel: string };
  glamp: { heading: string; body: string; cta: Cta; image: ImageAsset };
  preorder: {
    heading: string;
    subheading: string;
    nameLabel: string;
    emailLabel: string;
    orgLabel: string;
    useLabel: string;
    useOptions: string[];
    quantityLabel: string;
    buttonLabel: string;
    disclaimer: string;
    successTitle: string;
    successBody: string;
  };
  press: { heading: string; logos: ImageAsset[] };
  faq: { heading: string; items: FaqItem[] };
  stickyCta: { eyebrow: string; headline: string; cta: Cta };
}

export const cx20: Cx20Content = {
  nav: [
    { label: "Products", href: "#products" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Uses", href: "#uses" },
    { label: "Founder", href: "#founder" },
    { label: "Pre-order", href: "#pre-order" },
    { label: "FAQ", href: "#faq" },
  ],


  hero: {
    headline: "A shelter that ships flat.",
    headlineAccent: "And stands in eleven minutes.",
    subheadline:
      "It folds to 37 inches for transport and opens into a 14-foot living space for up to 8 people.",
    scale: [
      { inches: 168, value: "14 ft", label: "Deployed living space" },
      { inches: 37, value: "37 in", label: "Folded for transport" },
    ],
    image: {
      src: "/images/cx20/cx20-desert-wide.jpg",
      alt: "A CX20 unit deployed alone on a stony desert plain at sunset, its door open and lit from inside, with the sun low on the horizon behind it",
    },
    ctaPrimary: { label: "Pre-order the CX20", href: "#pre-order" },
    ctaSecondary: { label: "See how it works", href: "#how-it-works" },
  },

  productSwitch: {
    heading: "Two ways to shelter",
    body: "One folds flat and stands rigid on the ground. The other inflates and floats. Same mission: dignified shelter, anywhere, fast.",
    cards: [
      {
        name: "CX20 Series",
        tagline: "Foldable hard-shell unit for housing, clinics and camps.",
        href: "#how-it-works",
        ctaLabel: "You are here",
        current: true,
        fit: "contain",
        image: {
          src: "/images/cx20/Cmax-System-Folded.png",
          alt: "The CX20 unit folded flat, standing on its adjustable legs, showing the white end panel with the orange X-brace and the orange door frame",
        },
      },
      {
        name: "Cmax Air X2",
        tagline: "Inflatable AeroCabin for camping, overlanding and floods.",
        href: "/air-x2",
        ctaLabel: "See the Air X2",
        isNew: true,
        badge: "New",
        image: {
          src: "/images/cmax-air-X2-water.png",
          alt: "The Cmax Air X2 AeroCabin floating on a calm mountain lake at sunset",
        },
      },
    ],
  },

  facts: {
    heading: "Built to move, built to stay",
    subheading:
      "A rigid, raised unit that travels on any pickup and stores in a garage — then opens into a room you can stand up in.",
    stats: [
      { value: '37"', label: "Folded, for transport" },
      { value: "14 ft", label: "Living space, deployed" },
      { value: "8", label: "People it sleeps" },
      { value: "11 min", label: "Assembly, two people" },
    ],
    features: [
      {
        title: "Raised from the ground",
        description: "Telescopic legs lift the rigid floor off mud, water and uneven terrain.",
      },
      {
        title: "No tools needed",
        description: "Legs, sides and crossbar lock by hand. Nothing to lose, nothing to bring.",
      },
      {
        title: "Resistant to strong winds",
        description: "A rigid frame and raised floor that will not collapse the way a tent does.",
      },
      {
        title: "Ships and stores flat",
        description: "Folded, it fits in a pickup bed. Dozens stack in a single container.",
      },
      {
        title: "Biosecurity with nanotechnology",
        description: "Surfaces treated for clinical and isolation use.",
      },
      {
        title: "Lockable, powered, cooled",
        description: "Fit an A/C unit for hot climates, charge your devices, lock the door.",
      },
    ],
  },

  steps: {
    heading: "Tool-free assembly",
    subheading: "Two people, eleven minutes, no tools.",
    items: [
      {
        title: "Set the legs",
        description: "Install the legs and adjust each one to the ground — up to 60 mm of difference end to end.",
        image: {
          src: "/images/cx20/Cmax-System-Paso-1.png",
          alt: "Step 1: line drawing of the folded CX20 standing on its legs with a person adjusting one of them",
        },
      },
      {
        title: "Unfold the sides",
        description: "Release the side locks and swing the walls open.",
        image: {
          src: "/images/cx20/Cmax-System-Paso-2.png",
          alt: "Step 2: line drawing of two people unfolding the side walls of the CX20 outward from the rigid core",
        },
      },
      {
        title: "Lift the crossbar",
        description: "Raise the main crossbar and adjust it to the cover. The unit is ready.",
        image: {
          src: "/images/cx20/Cmax-System-Paso-3.png",
          alt: "Step 3: line drawing of the CX20 fully open with a person raising the roof crossbar into place",
        },
      },
    ],
  },

  interior: {
    heading: "Stand up straight inside",
    subheading: "Ceilings of about 7 feet, and windows that breathe.",
    paragraphs: [
      "Cmax units are tall enough for everyone to stand — the interior ceiling sits at about 7 feet. That extra height is usable: storage, a bunk, a workspace.",
      "Cross ventilation through the window openings keeps air moving without air conditioning, and lets in the daylight that would otherwise need lamps. Functional, comfortable, and cheaper to run.",
    ],
    image: {
      src: "/images/cx20/Inteior-Confort-scaled.jpg",
      alt: "Inside a deployed CX20: white walls and roof, a gray floor with orange markings, triangular side windows, and a person standing upright at the far wall fastening a window flap",
    },
  },

  uses: {
    heading: "One unit, many missions",
    subheading:
      "Foldable, mobile, reusable and fully equipped — the all-in-one box for a real, immediate response.",
    items: [
      {
        title: "Mobile clinics & pre-triage",
        description:
          "Screening, triage, isolation and treatment facilities, staff housing and mobile command centers.",
        image: {
          src: "/images/cx20/cmax-system-med.jpg",
          alt: "A CX20 configured as a medical isolation ward on a wet street, with a ramp at the door and two healthcare workers in protective gowns and face shields reviewing a clipboard outside",
        },
      },
      {
        title: "Intensive care",
        description:
          "When bed availability dwindles and hospitals operate in crisis mode, a rapid, affordable ward.",
        image: {
          src: "/images/cx20/44-cmax.jpg",
          alt: "Cutaway render of a CX20 as an intensive care unit: four hospital beds separated by green curtains, an access ramp and a wheelchair beside the entrance",
        },
      },
      {
        title: "Glamping & recreation",
        description: "The adaptability of a tent with the durability of a camper.",
        image: {
          src: "/images/cx20/cmax-system-Desert-glamping.jpeg",
          alt: "A CX20 unit at dusk in a desert, its door glowing from the light inside as the sun sets on the horizon",
        },
      },
      {
        title: "Events",
        description: "Lockable rooms for staff, storage or first aid, up in minutes.",
        image: {
          src: "/images/cx20/cmax-system-unfolded.jpg",
          alt: "A deployed CX20 unit numbered 11 in a warehouse, showing its white fabric walls, triangular windows and orange door",
        },
      },
      {
        title: "Industry & work sites",
        description: "Oil, construction and remote operations that need housing today, not next quarter.",
        image: {
          src: "/images/cx20/Cmax-system-flat-pack-nico-garcia-mayor.jpeg",
          alt: "A row of folded CX20 units lined up in a factory hall, white and gray end panels with X-braces, as a person walks past carrying a part",
        },
      },
      {
        title: "Transport",
        description: "Carried by any truck, stored in any garage.",
        image: {
          src: "/images/cx20/CMAX-pick-up.jpg",
          alt: "Render of a folded CX20 strapped upright in the bed of a black pickup truck",
        },
      },
    ],
  },

  founder: {
    eyebrow: "Founder & CEO",
    name: "Nicolás García Mayor",
    role: "Industrial designer and social innovator",
    bio: "Named one of JCI's Ten Outstanding Young Persons of the World for his contribution to children, world peace and human rights. Laureate industrial designer, Emmy nominee, Business for Peace honoree in Oslo, peacebuilder and TED speaker. Founder and CEO of Cmax System Inc.",
    image: {
      src: "/images/cx20/nicolas-garcia-mayor-united-nations-Slider-2.jpg",
      alt: "Nicolás García Mayor crouching outdoors beside a white shelter wall, surrounded by a group of smiling children who hug him",
    },
    journeyHeading: "A long road, and the people who walked part of it",
    journeyBody:
      "Cmax did not start as a product. It started as a drawing, and there were years of camps, stages and cargo holds before anyone could buy one.",
    stops: [
      {
        place: "The studio",
        title: "It begins on paper",
        body: "A rigid room that folds flat enough to ship. That was the problem, and it was worked out by hand first.",
        photos: [
          {
            src: "/images/cx20/journey/studio.jpg",
            alt: "Nicolas Garcia Mayor at his desk drawing shelter forms in pencil, with sheets of sketches of folded and unfolded units spread around him",
            label: "The studio",
          },
        ],
      },
      {
        place: "Haiti",
        title: "In the field, with the people it is for",
        body: "Camps are where a design gets corrected. What the shelter does today, it does because of what did not work there.",
        photos: [
          {
            src: "/images/cx20/journey/haiti.jpg",
            alt: "Nicolas Garcia Mayor holding a small child forehead to forehead in a camp street in Haiti, between rows of white shelter walls",
            label: "Haiti",
          },
          {
            src: "/images/cx20/nicolas-garcia-mayor-united-nations-Slider-2.jpg",
            alt: "Nicolas Garcia Mayor crouching outdoors beside a white shelter wall, surrounded by a group of smiling children who hug him",
            label: "Haiti",
          },
        ],
      },
      {
        place: "New York and Washington",
        title: "Taking it to the institutions",
        body: "The United Nations, ECOSOC and the Inter-American Development Bank: the rooms where shelter gets funded and deployed.",
        photos: [
          {
            src: "/images/cx20/journey/united-nations.jpg",
            alt: "Nicolas Garcia Mayor speaking from a rostrum beneath the United Nations emblem, alone in the hall",
            label: "United Nations",
          },
          {
            src: "/images/cx20/journey/un-ecosoc.jpg",
            alt: "Nicolas Garcia Mayor speaking at a panel table with his name on the desk display in front of him",
            label: "United Nations ECOSOC",
          },
          {
            src: "/images/cx20/journey/idb.jpg",
            alt: "Nicolas Garcia Mayor mid-gesture on stage, a UNHCR slide about refugees projected behind him",
            label: "Inter-American Development Bank",
          },
        ],
      },
      {
        place: "Anywhere",
        title: "Built to arrive",
        body: "Folded, the units palletise and fly. Deployed, they lay out as a camp with clinics, stores and streets.",
        photos: [
          {
            src: "/images/cx20/journey/airlift.jpg",
            alt: "A Cmax staff member in a branded shirt guiding a trailer of orange Cmax crates into the cargo hold of a military transport aircraft",
            label: "Loading for airlift",
          },
          {
            src: "/images/cx20/journey/camp.jpg",
            alt: "Render of a large camp of hundreds of orange and white Cmax units laid out on a desert plain, with helicopters lifting crated units in and medical and UN units among them",
            label: "Camp layout (render)",
          },
        ],
      },
      {
        place: "St. Peter's Square",
        title: "Pope Francis",
        photos: [
          {
            src: "/images/cx20/testimonials/pope-francis.jpg",
            alt: "Pope Francis and Nicolas Garcia Mayor smiling face to face as they embrace in St. Peter's Square",
            label: "St. Peter's Square",
          },
        ],
        quote: {
          text: "The Cmax has already been blessed by God. Nicolas, never lose your hope. God fills us with his grace when we pray with perseverance.",
          name: "Pope Francis",
          role: "",
        },
      },
      {
        place: "Jordan",
        title: "Princess Haya Bint Al Hussein",
        photos: [
          {
            src: "/images/cx20/testimonials/princess-haya.jpg",
            alt: "Nicolas Garcia Mayor presenting the shelter to Princess Haya Bint Al Hussein and her delegation at an exhibition stand",
            label: "Exhibition stand",
          },
        ],
        quote: {
          text: "We face a humanitarian crisis with the number of displaced people in Jordan, and we can improve the quality of life of millions of refugees with this innovative solution.",
          name: "Princess Haya Bint Al Hussein",
          role: "",
        },
      },
      {
        place: "UNHCR office",
        title: "Firas Kayal",
        photos: [
          {
            src: "/images/cx20/testimonials/firas-kayal.jpg",
            alt: "Firas Kayal and Nicolas Garcia Mayor shaking hands in front of the UNHCR logo at the UNHCR office",
            label: "UNHCR office",
          },
        ],
        quote: {
          text: "It's so easy to assemble and deploy the Cmax shelter in the field. Once you put this great innovation into production, not even the sky is the limit, you can dignify and care for the health of millions of children.",
          name: "Firas Kayal",
          role: "UNHCR",
        },
      },
    ],
  },
  impact: {
    heading: "Buy ten, house a family",
    ratioLabel: "1 in 10",
    body: "For every ten shelters sold, Cmax System donates one to a humanitarian organization or government. Our mission is to dignify lives.",
  },

  glamp: {
    heading: "Own land? Earn with Cmax Glamp",
    body: "Host nature lovers on your property. Cmax Glamp gets more people out under the stars, and Cmax System donates 10% of every Cmax Glamp experience to support displaced people.",
    cta: { label: "Ask about hosting", href: "mailto:info@cmaxsystem.com" },
    image: {
      src: "/images/cx20/multiporpuse.png",
      alt: "Three CX20 color variants stacked in a display: orange and cream, white with a red medical cross, and teal and white — each shown deployed next to its folded form",
    },
  },

  preorder: {
    heading: "Pre-order the CX20 Series",
    subheading:
      "Tell us what you need and we'll be in touch shortly to process and fulfill your order.",
    nameLabel: "Full name",
    emailLabel: "Email",
    orgLabel: "Organization (optional)",
    useLabel: "Intended use",
    useOptions: [
      "Glamping or recreation",
      "Events",
      "Mobile clinic or hospital",
      "Industry or work site",
      "Emergency response",
      "Other",
    ],
    quantityLabel: "Units",
    buttonLabel: "Request pre-order",
    disclaimer: "No payment now. If you run into any issue, write to info@cmaxsystem.com.",
    successTitle: "Request received.",
    successBody: "We'll email you shortly to confirm the details.",
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
      { src: "/images/cx20/Tednico-garcia-mayor.png", alt: "TED" },
      { src: "/images/cx20/untv-cmax-system.png", alt: "UNTV" },
      { src: "/images/cx20/CCTV-nico-garcia-mayor.png", alt: "CCTV" },
      { src: "/images/cx20/nicolas-garcia-mayor-telemundo.png", alt: "Telemundo" },
      { src: "/images/Univision-nico-garcia-mayor.png", alt: "Univision" },
    ],
  },

  faq: {
    heading: "Got questions?",
    items: [
      {
        question: "Can it be deployed on uneven ground?",
        answer:
          "Yes. The telescopic legs adjust independently, so the unit sits level on ground with a height difference of up to 60 mm (2.36 in) from one end to the other.",
      },
      {
        question: "What makes the CX20 different from tents and campers?",
        answer:
          "It's the best of both: the adaptability of a tent with the durability of a camper. You can fit an A/C unit for hot weather, charge your devices, and lock the door to keep your belongings safe and dry.",
      },
      {
        question: "How long does assembly take? Do I need tools?",
        answer:
          "Under eleven minutes, two people, no tools. Place the unit, remove the side locks, unfold the sides and adjust the inner sidebars to the cover. That's it.",
      },
      {
        question: "What is the donation program?",
        answer:
          "Cmax System works with the Cmax Foundation in support of the most vulnerable populations. For every ten units sold, one is donated to house a displaced family.",
      },
      {
        question: "How fast can I get units for an emergency response?",
        answer:
          "We arrange shipment as soon as possible according to the pre-order. The sooner you place it, the faster we can arrange it — write to info@cmaxsystem.com.",
      },
    ],
  },

  stickyCta: {
    eyebrow: "CX20 Series",
    headline: "Pre-order",
    cta: { label: "Request pre-order", href: "#pre-order" },
  },
};
