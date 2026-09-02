/**
 * Documentos legales de Cmax System Inc., transcritos del texto que entrego
 * el cliente. NO reescribir la redaccion: es texto legal y cualquier cambio
 * puede alterar su alcance. Solo se estructuro en secciones para que sea
 * legible en pantalla.
 *
 * Los renderiza app/legal/[slug]/page.tsx. El slug de cada uno vive en
 * content.legal y es lo que enlaza el footer.
 */

export interface LegalSection {
  title?: string;
  body?: string[];
  list?: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  intro?: string[];
  sections: LegalSection[];
}

const CONTACT_BODY = ["Cmax System Inc., Washington, DC, USA"];
const CONTACT_LIST = [
  "Email: info@cmaxsystem.com",
  "Website: https://cmaxsystem.com",
];

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "May 28, 2026",
    intro: [
      "Welcome to Cmax System Inc. (“Cmax”, “we”, “our”, or “us”).",
      "This Privacy Policy explains how we collect, use, disclose, and protect your information when you access our website, purchase products such as the Cmax Air X2™, submit reservations or pre-orders, subscribe to communications, or otherwise interact with our services. By using this website, you agree to the practices described in this Privacy Policy.",
    ],
    sections: [
      {
        title: "1. Information we collect",
        body: ["Personal information you voluntarily provide may include:"],
        list: [
          "Full name",
          "Email address",
          "Phone number",
          "Billing and shipping address",
          "Company or organization name",
          "Payment information",
          "Purchase and reservation history",
          "Customer support communications",
          "Marketing preferences",
        ],
      },
      {
        title: "Automatically collected information",
        body: [
          "When you visit our website, certain information may be collected automatically:",
        ],
        list: [
          "IP address",
          "Browser type and version",
          "Device information",
          "Operating system",
          "Geographic region",
          "Referral URLs",
          "Website interaction data",
          "Cookies and analytics information",
        ],
      },
      {
        title: "2. How we use your information",
        list: [
          "Process purchases, reservations, and pre-orders",
          "Deliver products and services",
          "Provide customer support",
          "Communicate regarding orders and updates",
          "Improve website functionality and user experience",
          "Analyze website traffic and performance",
          "Prevent fraud and unauthorized transactions",
          "Send marketing and promotional communications",
          "Comply with legal obligations",
          "Protect the security and integrity of our business",
        ],
      },
      {
        title: "3. Payment processing",
        body: [
          "Payments on this website are securely processed through trusted third-party payment providers, including Stripe. Cmax System Inc. does not store complete credit card numbers or sensitive payment credentials on its servers.",
          "Payment information is encrypted and processed directly by Stripe in accordance with PCI-DSS security standards and Stripe’s own privacy and security policies.",
          "By submitting payment information, you authorize Cmax System Inc. and its payment providers to process charges related to purchases, pre-orders, deposits, taxes, shipping fees, and other applicable charges.",
          "To help prevent fraud and unauthorized activity, payment providers may perform identity verification, fraud analysis, and transaction monitoring. Cmax reserves the right to refuse, suspend, or cancel any transaction suspected of fraud, abuse, unauthorized activity, or violation of our Terms & Conditions.",
        ],
      },
      {
        title: "4. Pre-orders and reservations",
        body: [
          "Certain products, including future production models or limited releases, may be offered through reservation or pre-order systems.",
          "Estimated delivery dates are approximate and subject to change due to manufacturing schedules, logistics, supplier availability, regulatory approvals, force majeure events, or product development updates.",
          "Product specifications, materials, colors, features, and accessories may evolve before final production. Additional terms governing pre-orders, deposits, cancellations, and refunds may apply and will be presented separately where applicable.",
        ],
      },
      {
        title: "5. Cookies and tracking technologies",
        body: ["We use cookies and similar technologies to:"],
        list: [
          "Remember user preferences",
          "Improve website functionality",
          "Analyze traffic and visitor behavior",
          "Personalize content and advertising",
          "Measure marketing effectiveness",
        ],
      },
      {
        body: [
          "You may disable cookies through your browser settings; however, some portions of the website may not function properly.",
        ],
      },
      {
        title: "6. Marketing communications",
        body: [
          "If you subscribe to our newsletter or marketing communications, we may send product announcements, launch updates, promotional offers, investor or company updates, and emergency preparedness and outdoor innovation content.",
          "You may unsubscribe at any time by using the unsubscribe link included in our emails.",
        ],
      },
      {
        title: "7. Sharing of information",
        body: [
          "Cmax does not sell personal information. We may share information with trusted third parties including:",
        ],
        list: [
          "Payment processors",
          "Shipping and logistics providers",
          "Website hosting providers",
          "Analytics and marketing platforms",
          "Customer support services",
          "Fraud prevention providers",
        ],
      },
      {
        body: [
          "We may also disclose information to comply with legal obligations, to protect our legal rights, to prevent fraud or security threats, or in connection with a merger, acquisition, or business transfer.",
        ],
      },
      {
        title: "8. International data transfers",
        body: [
          "Your information may be processed and stored in the United States or other jurisdictions where our service providers operate. By using our website and services, you consent to such transfers.",
        ],
      },
      {
        title: "9. Data retention",
        body: [
          "We retain personal information only as long as reasonably necessary for fulfilling orders and services, accounting and tax obligations, legal compliance, fraud prevention, dispute resolution, and business operations.",
        ],
      },
      {
        title: "10. Your privacy rights",
        body: ["Depending on your jurisdiction, you may have rights including:"],
        list: [
          "Access to personal information",
          "Correction of inaccurate data",
          "Deletion requests",
          "Restriction of processing",
          "Objection to certain processing activities",
          "Withdrawal of consent",
          "Data portability",
        ],
      },
      {
        body: ["To exercise these rights, contact us at info@cmaxsystem.com."],
      },
      {
        title: "11. GDPR compliance",
        body: [
          "If you are located within the European Economic Area (EEA), we process personal data in accordance with the General Data Protection Regulation (GDPR). Legal bases for processing may include contract fulfillment, legitimate business interests, consent, and legal obligations.",
        ],
      },
      {
        title: "12. California privacy rights (CCPA)",
        body: [
          "California residents may request access to collected personal information, deletion of personal information, and information regarding categories of collected data. Cmax does not sell personal information.",
        ],
      },
      {
        title: "13. Security",
        body: [
          "We implement commercially reasonable technical, administrative, and organizational safeguards designed to protect personal information. However, no electronic transmission or storage system can be guaranteed to be completely secure.",
        ],
      },
      {
        title: "14. Children’s privacy",
        body: [
          "Our products and services are not directed toward children under the age of 18. We do not knowingly collect personal information from minors.",
        ],
      },
      {
        title: "15. Third-party links",
        body: [
          "Our website may contain links to third-party websites or services. Cmax is not responsible for the privacy practices, policies, or content of third-party websites.",
        ],
      },
      {
        title: "16. Changes to this Privacy Policy",
        body: [
          "We may update this Privacy Policy periodically. Changes become effective immediately upon posting on this page. Your continued use of the website constitutes acceptance of any revised Privacy Policy.",
        ],
      },
      {
        title: "17. Contact information",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },

  {
    slug: "terms",
    title: "Terms & Conditions",
    updated: "May 28, 2026",
    sections: [
      {
        title: "1. Acceptance of terms",
        body: [
          "By accessing this website, placing an order, making a reservation, or purchasing any Cmax product, you agree to these Terms & Conditions and all related policies referenced herein.",
        ],
      },
      {
        title: "2. Products, orders & pricing",
        body: [
          "Cmax reserves the right to modify product specifications, pricing, availability, colors, materials, and features without prior notice.",
          "All orders are subject to acceptance and availability. Product images are provided for illustrative purposes and may differ slightly from final delivered products.",
        ],
      },
      {
        title: "3. Payments, reservations & pre-orders",
        body: [
          "Payments may be processed through Stripe and other authorized payment providers. Certain products may be offered through reservation or pre-order programs.",
          "Estimated delivery dates are provided as good-faith estimates only and are not guaranteed. Cmax shall not be responsible for delays caused by manufacturing, logistics, regulatory approvals, force majeure events, supplier delays, or circumstances beyond its reasonable control.",
        ],
      },
      {
        title: "4. Shipping, returns & warranty",
        body: [
          "Shipping, return eligibility, warranty coverage, and related policies are governed by the separate Shipping & Returns Policy and Warranty Policy, which are incorporated into these Terms by reference.",
        ],
      },
      {
        title: "5. Product safety & user responsibility",
        body: [
          "Certain Cmax products involve outdoor, expeditionary, inflatable, emergency preparedness, shelter, and water-related activities.",
          "Users assume responsibility for understanding and following all applicable safety guidelines, operating instructions, and product-specific warnings. Product-specific safety notices, including the Cmax Air X2™ Safety & Usage Guidelines, form part of these Terms.",
        ],
      },
      {
        title: "6. Intellectual property",
        body: [
          "All trademarks, logos, product names, designs, photographs, videos, graphics, and website content are the property of Cmax System Inc. and may not be copied, reproduced, distributed, or used without prior written permission.",
        ],
      },
      {
        title: "7. Limitation of liability",
        body: [
          "To the maximum extent permitted by law, Cmax System Inc. shall not be liable for indirect, incidental, consequential, special, or punitive damages arising from the use, misuse, purchase, delivery, or operation of its products or services. Cmax’s total liability shall not exceed the purchase price of the product giving rise to the claim.",
        ],
      },
      {
        title: "8. Governing law",
        body: [
          "These Terms shall be governed by the laws of the District of Columbia, United States. Any disputes arising from these Terms shall be resolved in the courts located within the District of Columbia unless otherwise required by applicable law.",
        ],
      },
      {
        title: "9. Changes to these Terms",
        body: [
          "Cmax may update these Terms & Conditions from time to time. Continued use of the website following publication of updated Terms constitutes acceptance of the revised Terms.",
        ],
      },
      {
        title: "10. Contact information",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },

  {
    slug: "warranty",
    title: "Limited Warranty Policy",
    updated: "May 28, 2026",
    intro: [
      "Cmax System Inc. warrants that its products will be free from defects in materials and workmanship under normal and intended use during the applicable warranty period described below.",
      "This Limited Warranty applies only to products purchased directly from Cmax or from authorized distributors and resellers.",
    ],
    sections: [
      {
        title: "1. Warranty coverage",
        body: [
          "Cmax warrants that covered products will perform substantially as intended when properly used, maintained, stored, and operated according to the applicable instructions and guidelines.",
          "This warranty applies solely to manufacturing defects and workmanship defects. Normal wear and tear is not considered a defect.",
        ],
      },
      {
        title: "2. Warranty period",
        body: ["Unless otherwise stated for a specific product:"],
        list: [
          "Shelters, inflatable systems and structural components: two (2) years from the original purchase date.",
          "Accessories and non-structural components: one (1) year from the original purchase date.",
          "Replacement products or repaired components assume the remaining warranty period of the original product.",
        ],
      },
      {
        title: "3. What is covered",
        body: ["Examples of covered defects may include manufacturing defects in:"],
        list: [
          "Materials",
          "Seams",
          "Structural components",
          "Valves",
          "Hardware",
          "Any defect affecting intended performance",
        ],
      },
      {
        body: [
          "Coverage is determined solely by Cmax following inspection and evaluation.",
        ],
      },
      {
        title: "4. What is not covered",
        body: ["This warranty does not cover:"],
        list: [
          "Normal wear and tear",
          "Cosmetic imperfections, scratches, scuffs, discoloration or fading",
          "UV degradation",
          "Improper storage, transportation, inflation or installation",
          "Negligence, misuse, abuse or accidents",
          "Punctures, cuts or tears caused by external objects",
          "Damage caused by dragging the product across rough surfaces",
          "Exposure to chemicals, mold or mildew",
          "Unauthorized repairs or modifications",
          "Commercial use beyond intended applications",
          "Acts of nature: floods, hurricanes, tornadoes, lightning, extreme weather, fire",
          "Theft and vandalism",
          "Wind damage resulting from improper anchoring or installation",
          "Damage caused by unauthorized heaters, stoves, open flames or heat sources",
          "Damage resulting from failure to follow product instructions, safety guidelines or maintenance requirements",
        ],
      },
      {
        title: "5. Demonstration, used, clearance and final sale products",
        body: [
          "Unless expressly stated otherwise in writing, demonstration units, display units, used products, clearance products, liquidation inventory, and final sale products are sold AS IS. Such products are generally not covered under this Limited Warranty. Any exceptions must be confirmed in writing by Cmax.",
        ],
      },
      {
        title: "6. Warranty claims",
        body: ["To submit a warranty claim, customers must provide:"],
        list: [
          "Proof of purchase",
          "Product serial number (if applicable)",
          "Description of the issue",
          "Photographs of the affected area",
          "Additional information reasonably requested by Cmax",
        ],
      },
      {
        body: ["Cmax may require additional inspection prior to approving a claim."],
      },
      {
        title: "7. Warranty remedies",
        body: [
          "If Cmax determines that a covered defect exists, Cmax may, at its sole discretion:",
        ],
        list: [
          "Repair the product",
          "Replace the affected component",
          "Replace the product",
          "Provide a comparable replacement product",
          "Provide a partial or full credit toward future purchases",
        ],
      },
      {
        body: [
          "The specific remedy will be determined based on product condition, product availability, and the nature of the defect.",
        ],
      },
      {
        title: "8. Limitation of warranty",
        body: [
          "This Limited Warranty is the exclusive warranty provided by Cmax. To the fullest extent permitted by law, Cmax disclaims all other warranties, whether express or implied, including warranties of merchantability and fitness for a particular purpose.",
        ],
      },
      {
        title: "9. Limitation of liability",
        body: [
          "Cmax shall not be liable for indirect, incidental or consequential damages, lost profits, lost business opportunities, property damage, personal injury, emergency response costs, travel expenses or third-party costs. Cmax’s maximum liability shall not exceed the original purchase price of the affected product.",
        ],
      },
      {
        title: "10. Contact information",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },

  {
    slug: "shipping-returns",
    title: "Shipping & Returns Policy",
    updated: "May 28, 2026",
    intro: [
      "Cmax System Inc. is committed to delivering innovative shelters, inflatable systems, and related products efficiently and transparently. This policy explains how orders are processed, shipped, returned, and refunded.",
    ],
    sections: [
      {
        title: "1. Order processing",
        body: [
          "Orders are typically processed within a reasonable timeframe after payment confirmation. Processing times may vary depending on product availability, manufacturing schedules, inventory levels, product customization, regulatory requirements and shipping destination.",
          "Cmax reserves the right to delay processing when additional verification is required.",
        ],
      },
      {
        title: "2. Shipping",
        body: [
          "Cmax ships domestically within the United States and internationally to select markets.",
          "Shipping costs, duties, customs fees, taxes, import charges, brokerage fees, and local governmental fees are the responsibility of the purchaser unless otherwise stated. Delivery estimates are provided as a convenience only and are not guaranteed.",
          "Cmax is not responsible for delays resulting from freight carriers, customs inspections, port congestion, weather conditions, government actions, supply chain disruptions or force majeure events.",
        ],
      },
      {
        title: "3. Risk of loss",
        body: [
          "Ownership and risk of loss transfer to the purchaser upon delivery of the shipment to the designated carrier, unless otherwise required by applicable law.",
          "Customers are responsible for inspecting shipments upon arrival and reporting visible shipping damage as soon as reasonably possible.",
        ],
      },
      {
        title: "4. Pre-orders and reservations",
        body: [
          "Certain products may be offered through reservation or pre-order programs. Estimated delivery dates are projections only and may change due to product development, manufacturing schedules, supplier availability, transportation conditions, or other factors beyond Cmax’s control.",
          "Product specifications, accessories, colors, materials, and features may evolve during development and production. Cmax reserves the right to implement improvements and modifications without prior notice.",
        ],
      },
      {
        title: "5. Return eligibility",
        body: [
          "New products purchased directly from Cmax may be eligible for return within thirty (30) days of delivery, subject to the conditions below. To qualify for a return:",
        ],
        list: [
          "Product must be unused",
          "Product must be in original condition",
          "Product must include all accessories",
          "Product must be returned in original packaging whenever reasonably possible",
          "Customer must obtain return authorization from Cmax before shipping",
        ],
      },
      {
        body: ["Returns sent without authorization may be refused."],
      },
      {
        title: "6. Non-returnable items",
        body: ["The following items are generally not eligible for return:"],
        list: [
          "Customized products",
          "Special-order products",
          "Clearance items and liquidation inventory",
          "Final sale products",
          "Demonstration and display units",
          "Used and open-box products",
          "Promotional sale products",
          "Products damaged through misuse or negligence",
        ],
      },
      {
        body: [
          "Unless otherwise required by applicable law, these sales are final.",
        ],
      },
      {
        title: "7. Refunds",
        body: [
          "Once an approved return is received and inspected, Cmax will determine eligibility for refund. Approved refunds will generally be issued to the original payment method.",
          "Original shipping charges are non-refundable unless the return results from a verified manufacturing defect or shipping error attributable to Cmax.",
        ],
      },
      {
        title: "8. Return shipping costs",
        body: [
          "Unless the return is due to a verified manufacturing defect or shipping error, customers are responsible for all return shipping costs. Cmax recommends using insured and trackable shipping services. Cmax is not responsible for items lost or damaged during return transit.",
        ],
      },
      {
        title: "9. Damaged or defective products",
        body: [
          "Customers should inspect products promptly upon delivery. If a product arrives damaged or appears to contain a manufacturing defect, contact Cmax as soon as possible and provide:",
        ],
        list: [
          "Order number",
          "Description of the issue",
          "Photographs of the product",
          "Photographs of packaging, when applicable",
        ],
      },
      {
        body: [
          "Cmax will review the claim and determine the appropriate resolution under the applicable warranty policy.",
        ],
      },
      {
        title: "10. Contact information",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },

  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "May 28, 2026",
    intro: [
      "This Cookie Policy explains how Cmax System Inc. uses cookies and similar technologies when you visit our website. By continuing to use our website, you consent to the use of cookies as described in this Policy, subject to your browser and consent preferences.",
    ],
    sections: [
      {
        title: "1. What are cookies?",
        body: [
          "Cookies are small text files stored on your device when you visit a website. Cookies help websites function properly, improve user experience, remember preferences, analyze website traffic, and support marketing activities.",
        ],
      },
      {
        title: "2. How we use cookies",
        body: ["Cmax uses cookies and similar technologies to:"],
        list: [
          "Operate and maintain the website",
          "Improve website functionality and performance",
          "Remember user preferences",
          "Understand how visitors interact with the website",
          "Measure marketing effectiveness",
          "Improve products, services, and customer experience",
          "Protect against fraud and unauthorized activity",
        ],
      },
      {
        title: "3. Types of cookies we use",
        body: [
          "Essential cookies are necessary for the website to function properly and cannot be disabled through our systems. Examples include security functions, shopping cart functionality, checkout processes, user session management and fraud prevention.",
          "Analytics cookies help us understand how visitors use our website — for example Google Analytics, website performance monitoring and traffic analysis tools. Information collected is generally aggregated and does not directly identify individual visitors.",
          "Functional cookies allow the website to remember user preferences such as language, region settings and previously selected options.",
          "Marketing cookies may be used to deliver relevant advertising and measure campaign effectiveness — for example Meta (Facebook) Pixel, Google advertising services, retargeting platforms and social media integrations.",
        ],
      },
      {
        title: "4. Third-party services",
        body: [
          "Certain third-party providers may place cookies through our website, including providers involved in website analytics, payment processing, advertising, social media integrations and customer support services. These providers operate under their own privacy and cookie policies.",
        ],
      },
      {
        title: "5. Managing cookies",
        body: [
          "Most web browsers allow users to manage, block, or delete cookies through browser settings. Please note that disabling certain cookies may impact website functionality and user experience.",
        ],
      },
      {
        title: "6. Do Not Track signals",
        body: [
          "Our website may not respond to browser-based “Do Not Track” signals because no consistent industry standard currently exists.",
        ],
      },
      {
        title: "7. Changes to this Cookie Policy",
        body: [
          "Cmax may update this Cookie Policy periodically. Any changes become effective upon posting on this page. Your continued use of the website after updates are posted constitutes acceptance of the revised Policy.",
        ],
      },
      {
        title: "8. Contact information",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },

  {
    slug: "safety",
    title: "Cmax Air™ Safety & Usage Guidelines",
    updated: "May 28, 2026",
    intro: [
      "The Cmax Air™ product family is designed for outdoor recreation, camping, expeditionary activities, temporary shelter, emergency preparedness, and resilience applications.",
      "Cmax Air™ products may be used in a variety of environments, including certain flooding and emergency scenarios. However, no portable shelter or inflatable structure can eliminate the risks associated with severe weather, natural disasters, water environments, or rapidly changing conditions.",
      "Users are responsible for understanding the capabilities and limitations of their specific model and selecting the appropriate product for their intended use. By using any Cmax Air™ product, you acknowledge and accept the following safety guidelines, operational limitations, and user responsibilities.",
    ],
    sections: [
      {
        title: "Model selection & emergency applications",
        body: [
          "Cmax Air™ products are available in multiple configurations designed for different environments and applications. Not all models provide the same level of environmental protection. Users should carefully evaluate their intended use before selecting a model.",
          "Cmax Air X2™ HD (Heavy Duty) is designed to provide the highest level of protection within the family. Its construction prioritizes durability, weather resistance, and emergency preparedness applications where increased protection may be required. For disaster preparedness, flood preparedness, resilience planning or adverse weather conditions, the HD model is generally the recommended option. Approximate weight: 49 kg (108 lbs).",
          "Cmax Air X2™ S (Standard) offers a balance between protection, portability and comfort. It provides increased weather protection compared to lightweight configurations while maintaining a manageable transport weight. Approximate weight: 40 kg (88 lbs).",
          "Cmax Air X2™ L (Lightweight) is optimized primarily for camping, recreation, travel and expedition use. While it may be used on water under appropriate conditions, it is not intended to provide the same level of environmental protection as the Standard or Heavy Duty models. The Lightweight model is not a fully sealed or watertight shelter: water intrusion may occur from rain, splashing, condensation, wave action or other environmental conditions. Its inflatable drop-stitch floor provides a comfortable elevated sleeping platform on land and also enables flotation on calm water. Flotation capability does not imply waterproof performance or complete protection from water ingress. Approximate weight: 18 kg (40 lbs).",
        ],
      },
      {
        title: "Water safety",
        body: [
          "Certain Cmax Air™ models are capable of floating on water and may be used on calm lakes, slow-moving waterways, flooded areas, and similar environments when appropriate precautions are taken. Users are responsible for evaluating water conditions, weather conditions, environmental hazards, and operational risks before use.",
          "For maximum safety:",
        ],
        list: [
          "Always wear approved personal flotation devices (PFDs)",
          "Never exceed recommended weight capacity",
          "Inspect the product before every use",
          "Use caution near moving water",
          "Avoid alcohol or drugs while operating near water",
          "Follow all applicable local laws and regulations",
        ],
      },
      {
        body: [
          "Water conditions may change rapidly and unpredictably. Users should exercise sound judgment at all times.",
        ],
      },
      {
        title: "Weather conditions",
        body: [
          "Cmax Air™ products are intended to provide temporary shelter, comfort, and preparedness support in a variety of outdoor environments. However, no portable inflatable shelter can guarantee protection from severe weather or natural disasters.",
          "Users should avoid operation in conditions that exceed the capabilities of the product or the experience level of the user, including:",
        ],
        list: [
          "Hurricane-force winds",
          "Tornado conditions",
          "Severe lightning storms",
          "Breaking surf and large ocean waves",
          "Fast-moving flood currents",
          "Situations requiring professional rescue equipment",
        ],
      },
      {
        title: "Emergency preparedness disclaimer",
        body: [
          "Cmax Air™ products are designed to support emergency preparedness, temporary shelter, evacuation planning, and resilience applications. They are intended to provide an additional preparedness tool for individuals, families, organizations, and communities.",
          "Cmax Air™ products are not a substitute for professional rescue equipment, government emergency response systems, official evacuation procedures, emergency services or certified survival craft.",
          "Cmax System Inc. makes no guarantee regarding rescue outcomes, survival, evacuation success, or performance during disasters or emergency situations. Users should always follow instructions issued by local authorities and emergency management agencies.",
        ],
      },
      {
        title: "Not a certified lifesaving device",
        body: [
          "Cmax Air™ products are not certified by the United States Coast Guard or any international authority as rescue craft, lifeboats, survival craft, or certified lifesaving devices.",
          "While certain models may float and may support preparedness activities in flooding scenarios, they should not be relied upon as the sole means of rescue, flotation, evacuation, or survival. Appropriate safety equipment should always be used when operating near or on water.",
        ],
      },
      {
        title: "Inflation & maintenance",
        body: ["Before each use:"],
        list: [
          "Inspect valves, seams, zippers, attachment points and accessories",
          "Confirm proper inflation pressure",
          "Verify that all components are securely attached",
          "Ensure the product is free from punctures, tears or visible damage",
        ],
      },
      {
        body: [
          "Improper inflation, poor maintenance, improper storage, or unauthorized modifications may compromise safety and performance. Store products in a clean, dry environment away from excessive heat, prolonged UV exposure, chemicals, and sharp objects.",
        ],
      },
      {
        title: "Capacity & weight limits",
        body: [
          "Do not exceed the recommended occupant capacity or weight limits specified by Cmax System Inc. Exceeding capacity limits may negatively affect stability, flotation, structural performance, maneuverability and user safety. Weight should be distributed as evenly as possible across the platform.",
        ],
      },
      {
        title: "Children & supervision",
        body: [
          "Children should never use Cmax Air™ products without continuous adult supervision. Parents and guardians are solely responsible for ensuring safe operation and compliance with all safety recommendations. Children should always wear properly fitted flotation devices when operating near or on water.",
        ],
      },
      {
        title: "User responsibility",
        body: [
          "Users assume full responsibility for the transportation, storage, maintenance, operation, and use of Cmax Air™ products. Outdoor activities, water-based activities, camping, and emergency preparedness activities involve inherent risks that cannot be completely eliminated.",
          "Failure to follow safety guidelines may result in injury, property damage, serious harm, or death.",
        ],
      },
      {
        title: "Contact",
        body: CONTACT_BODY,
        list: CONTACT_LIST,
      },
    ],
  },
];

export function getLegalDoc(slug: string): LegalDoc | undefined {
  return legalDocs.find((doc) => doc.slug === slug);
}
