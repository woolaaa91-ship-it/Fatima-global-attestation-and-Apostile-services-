export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface OfficialPortalLink {
  label: string;
  url: string;
  authority: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface DedicatedPageSection {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: {
    stepNumber: number;
    heading: string;
    detail: string;
  }[];
  comparisonTable?: {
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  highlightNote?: {
    title: string;
    body: string;
  };
}

export interface DedicatedSeoPageData {
  slug: string;
  aliases?: string[];
  category: "service" | "country" | "guide" | "location";
  kicker: string;
  h1: string;
  seoTitle: string;
  metaDescription: string;
  targetKeywords: string[];
  intro: string;
  whatsappMessage: string;
  breadcrumbs: BreadcrumbItem[];
  officialLinks?: OfficialPortalLink[];
  sections: DedicatedPageSection[];
  faqs: FAQItem[];
  relatedLinks: {
    title: string;
    slug: string;
    category: string;
  }[];
}

export const DEDICATED_SEO_PAGES: DedicatedSeoPageData[] = [
  // 1. /services/apostille
  {
    slug: "/services/apostille",
    aliases: ["/apostille-services-india"],
    category: "service",
    kicker: "Hague Convention 1961 • MEA & e-Sanad Assistance",
    h1: "Apostille Services in India",
    seoTitle: "Apostille Services in India | Fatima Global Attestation",
    metaDescription:
      "Trusted MEA Apostille services in India by Fatima Global Attestation. Fast SDM, HRD & e-Sanad assistance for degree, birth, marriage & commercial papers.",
    targetKeywords: [
      "apostille services in india",
      "fatima global attestation",
      "mea apostille india",
      "e-sanad apostille assistance",
      "hague apostille convention india",
      "sdm hrd mea apostille process",
      "degree birth marriage certificate apostille india",
    ],
    intro:
      "Professional assistance with MEA Apostille for educational, personal, and commercial documents. We coordinate the process so you don't have to run between government offices.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with MEA Apostille Services in India.",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Apostille Services in India" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA)",
        label: "Ministry of External Affairs (MEA) - Apostille Guidelines",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "We recommend checking official government portals for the most current rules and fees.",
      },
      {
        authority: "HCCH",
        label: "HCCH - Apostille Convention Status Table",
        url: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
        description:
          "Official Hague Conference on Private International Law Apostille Section and member status table.",
      },
    ],
    sections: [
      {
        title: "What is an Apostille?",
        paragraphs: [
          "An Apostille is a stamp or sticker issued by the Ministry of External Affairs (MEA), Government of India, under the Hague Convention of 1961. It authenticates the origin of a public document for use in member countries. If your destination country is part of this convention, an Apostille is usually sufficient and replaces the need for embassy legalization.",
        ],
      },
      {
        title: "The General Process",
        steps: [
          {
            stepNumber: 1,
            heading: "Notarization & State Verification",
            detail:
              "For personal and educational documents, initial verification by a Notary, SDM, or State HRD is often required before MEA submission.",
          },
          {
            stepNumber: 2,
            heading: "e-Sanad (If Applicable)",
            detail:
              "For eligible digital documents, the process can be initiated online via the government e-Sanad portal.",
          },
          {
            stepNumber: 3,
            heading: "MEA Apostille",
            detail:
              "The final Apostille sticker is applied by the MEA in New Delhi.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "How much is the official MEA fee for an apostille?",
        answer:
          "As per official MEA guidelines, the government fee is ₹50 per document. Our service charges are separate and cover the coordination, document pickup, and delivery.",
      },
      {
        question: "Can I get an apostille directly from the MEA?",
        answer:
          "The MEA does not accept documents directly from individuals at its counter. You must go through designated Regional Authentication Centres (RACs) or the e-Sanad portal.",
      },
      {
        question: "How long does the apostille process take?",
        answer:
          "Timeframes vary based on the issuing state and document type. If state verification (HRD) is required first, it can take longer. We confirm the estimated timeline after reviewing your document.",
      },
      {
        question:
          "What is the difference between MEA Apostille and Embassy Attestation?",
        answer:
          "An MEA Apostille sticker is valid across all 120+ Hague Convention member countries (such as the UK, USA, Germany, Italy, France, Australia, Oman, and Saudi Arabia) without needing embassy legalization. Non-Hague countries (such as UAE, Qatar, and Kuwait) require further Embassy Attestation and MOFA verification.",
      },
      {
        question:
          "What documents are required to apply for an MEA Apostille in India?",
        answer:
          "Generally, you need the original certificate (Degree, Birth, Marriage, PCC, or Commercial document) along with a clear copy of the document holder's passport (front and back pages). For commercial documents, a company covering letter and Chamber of Commerce endorsement are required.",
      },
      {
        question:
          "Can NRIs living abroad get Indian documents apostilled through Fatima Global Attestation without visiting India?",
        answer:
          "Yes. NRIs in the UK, USA, Europe, Australia, Canada, GCC, and worldwide can send their Indian certificates via international courier or through a family member in India. Fatima Global Attestation coordinates the complete SDM/HRD and MEA Apostille process in New Delhi and dispatches the apostilled originals back via tracked international courier.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Degree Certificate Apostille",
        slug: "/services/degree-certificate-apostille",
        category: "Educational Service",
      },
      {
        title: "Commercial Document Attestation",
        slug: "/services/commercial-document-attestation",
        category: "Business & Export",
      },
      {
        title: "e-Sanad Guide: Application & Status",
        slug: "/guides/e-sanad",
        category: "Official Portal Guide",
      },
      {
        title: "Apostille Agent in Connaught Place, Delhi",
        slug: "/locations/apostille-agent-delhi",
        category: "New Delhi Office",
      },
    ],
  },

  // 2. /services/degree-certificate-apostille
  {
    slug: "/services/degree-certificate-apostille",
    aliases: ["/educational-document-attestation"],
    category: "service",
    kicker: "Educational Document Authentication • State HRD, MEA & e-Sanad",
    h1: "Degree Certificate Apostille & Educational Document Authentication",
    seoTitle:
      "Degree Certificate Apostille in India | State HRD & MEA Process",
    metaDescription:
      "Need to apostille your degree certificate for a Hague country? Learn the State HRD vs SDM routes, MEA fees (₹50), and e-Sanad eligibility for Indian universities.",
    targetKeywords: [
      "degree certificate apostille in india",
      "state hrd vs sdm route",
      "mea apostille fee 50",
      "e-sanad degree apostille",
      "educational document apostille india",
      "bachelor master degree apostille delhi",
      "consolidated marksheet apostille india",
      "provisional degree apostille",
    ],
    intro:
      "Guidance and assistance for authenticating your university degrees, diplomas, and mark sheets for overseas employment, higher education, or visa purposes. We help you navigate the State HRD, MEA, and e-Sanad processes.",
    whatsappMessage: "Hi, I need help with Degree Certificate Apostille",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Degree Certificate Apostille" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA)",
        label: "Ministry of External Affairs (MEA) — Official Apostille Guidelines",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "Official Government of India MEA rules, ₹50 sticker fee, and outsourced RAC agency list.",
      },
      {
        authority: "NIC / Ministry of External Affairs",
        label: "e-Sanad Portal — Online Digital Document Verification",
        url: "https://esanad.nic.in/",
        description:
          "Official online portal for digital repository verification and e-Apostille of integrated universities/boards.",
      },
      {
        authority: "HCCH",
        label: "HCCH — Official Hague Apostille Member Countries Status Table",
        url: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
        description:
          "Official list of 120+ Hague Convention countries accepting MEA Apostille on educational degrees.",
      },
    ],
    sections: [
      {
        title: "The Route Depends on Your University",
        paragraphs: [
          "There is no single universal process for every degree. The exact steps depend on the state where your university is located and the receiving authority's requirements.",
        ],
        steps: [
          {
            stepNumber: 1,
            heading: "The Delhi SDM Route",
            detail:
              "Fastest for many students. The degree is notarized, verified by an SDM in Delhi, and then sent to the MEA.",
          },
          {
            stepNumber: 2,
            heading: "The State HRD Route",
            detail:
              "If your university or foreign employer specifically asks for state verification. The Education/HRD department of the state where your university sits must verify the degree first.",
          },
          {
            stepNumber: 3,
            heading: "The e-Sanad Route",
            detail:
              "Only for universities/boards integrated with the government's online portal (e.g., CBSE, some central universities). The document must be in a digital repository.",
          },
        ],
      },
      {
        title: "Official MEA Fees & Timelines",
        bullets: [
          "MEA Government Fee: ₹50 per document (Apostille sticker).",
          "Outsourced Agency Fee: The MEA does not accept documents directly. Outsourced agencies charge a small service fee (approx. ₹18 for educational documents).",
          "Processing Time: Delhi SDM route usually takes 2-3 working days after submission. State HRD routes can take 6-10 working days depending on the university's response time.",
          "Mark Sheets are Separate: Each mark sheet and transcript is treated as a separate document. Each requires its own ₹50 MEA fee.",
        ],
      },
      {
        title: "Required Documents Checklist",
        bullets: [
          "Original Degree Certificate (or Provisional).",
          "Passport Copy (mandatory for e-Sanad and MEA submission).",
          "All Mark Sheets (if required by the receiving authority).",
          "Proof of University/State (for HRD routing).",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I use an MEA Apostille for a UAE work visa?",
        answer:
          "No. The UAE is not a member of the Hague Apostille Convention. An MEA Apostille is not accepted. You will need the full Embassy attestation route (State HRD → MEA → UAE Embassy → UAE MOFA).",
      },
      {
        question: "Is State HRD verification mandatory for a degree apostille?",
        answer:
          "It depends on the receiving authority. For many foreign universities and employers, the Delhi SDM route is accepted. However, if the destination specifically demands state verification, you must go through the State HRD department.",
      },
      {
        question: "Can I apostille a degree certificate through e-Sanad?",
        answer:
          "Only if your university or board has integrated with the e-Sanad portal and your document is available in their digital repository. Most state universities are still not fully integrated.",
      },
      {
        question: "How long does the apostille process take?",
        answer:
          "The Delhi SDM route is the fastest, usually taking 2-3 working days after submission. If your document requires State HRD verification first, it can take 6-10 working days depending on the university.",
      },
      {
        question:
          "Do I need a separate MEA Apostille sticker for my mark sheets and transcripts?",
        answer:
          "Yes. Under official MEA guidelines, each physical certificate (Degree Certificate, Consolidated Marksheet, Semester Marksheet, or Official Transcript) is treated as a separate public document and requires its own ₹50 MEA Apostille sticker.",
      },
      {
        question:
          "Can a Provisional Degree Certificate or Private University degree be apostilled?",
        answer:
          "Yes. A Provisional Degree Certificate issued by a UGC/AICTE-recognized Indian university can be apostilled (usually within 2–3 working days via the Delhi SDM route) if your final convocation degree has not yet been issued. Degrees from UGC-approved private and deemed universities are also eligible for MEA Apostille.",
      },
      {
        question:
          "Can NRIs or students already abroad get their Indian degree apostilled without visiting India?",
        answer:
          "Yes. You do not need to visit government offices in person. You can courier your original degree from abroad (or have a family member in India hand it over via doorstep pickup). Fatima Global Attestation coordinates the SDM/HRD and MEA Apostille in New Delhi and ships the apostilled degree back via tracked DHL/FedEx courier.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Apostille Services in India",
        slug: "/services/apostille",
        category: "Core Service",
      },
      {
        title: "e-Sanad Guide: Application & Status",
        slug: "/guides/e-sanad",
        category: "Portal Guide",
      },
      {
        title: "UAE MOFA Attestation from India",
        slug: "/countries/uae-mofa-attestation",
        category: "Country Guide",
      },
      {
        title: "Document Translation Services",
        slug: "/services/document-translation",
        category: "Certified Translation",
      },
    ],
  },

  // 3. /services/commercial-document-attestation
  {
    slug: "/services/commercial-document-attestation",
    aliases: [
      "/commercial-document-attestation",
      "/chamber-of-commerce-apostille",
      "/chamber-of-commerce-mea-attestation",
    ],
    category: "service",
    kicker: "Chamber + MEA + Embassy Route • Corporate & Export Compliance",
    h1: "Commercial Document Attestation for Business & Export",
    seoTitle:
      "Commercial Document Attestation in India | Fatima Global Attestation",
    metaDescription:
      "Commercial document attestation & MEA Apostille in India. Chamber of Commerce & Embassy legalization for invoices, POA, incorporation papers & trade certificates.",
    targetKeywords: [
      "commercial document attestation india",
      "chamber of commerce attestation",
      "export invoice attestation",
      "power of attorney apostille india",
      "certificate of origin legalization",
      "chamber of commerce mea apostille delhi",
      "commercial invoice embassy legalization india",
      "phdcci ficci assocham chamber attestation",
    ],
    intro:
      "Dedicated coordination for authenticating Indian corporate, trade, and export documents for international business setup, customs clearance, and overseas tenders. We manage Chamber of Commerce attestation, MEA Apostille, and Foreign Embassy legalization.",
    whatsappMessage:
      "Hi, I need help with Commercial Document Attestation",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Commercial Document Attestation" },
    ],
    officialLinks: [
      {
        authority: "DGFT / Ministry of Commerce, Govt. of India",
        label: "Trade Connect ePlatform (Certificate of Origin)",
        url: "https://www.trade.gov.in",
        description:
          "Official Ministry of Commerce & Industry / DGFT platform for export documentation and Certificates of Origin.",
      },
      {
        authority: "Ministry of External Affairs (MEA)",
        label: "Ministry of External Affairs (MEA) — Commercial Apostille & Attestation Rules",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "Official Government of India MEA rules, ₹50 commercial sticker/stamp fee, and Chamber of Commerce pre-verification guidelines.",
      },
      {
        authority: "HCCH",
        label: "HCCH — Official Hague Apostille Convention Member Countries Table",
        url: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
        description:
          "Official status table of 120+ Hague Convention member countries accepting MEA Commercial Apostille.",
      },
    ],
    sections: [
      {
        title: "Why Commercial Document Attestation is Needed",
        paragraphs: [
          "When an Indian company exports goods, opens a branch office abroad, registers pharmaceuticals or medical devices, or appoints an overseas representative via Power of Attorney, foreign customs and ministries require official proof that the company and its documents are genuine.",
          "Unlike personal or educational certificates, commercial documents must first be verified by a recognized Chamber of Commerce before they can be submitted to the Ministry of External Affairs (MEA) or a foreign embassy.",
        ],
      },
      {
        title: "The Step-by-Step Process",
        steps: [
          {
            stepNumber: 1,
            heading: "Corporate Execution & Authorized Signatory Stamp",
            detail:
              "Commercial documents are prepared on official company letterhead or stamp paper and signed by an authorized company director or signatory with the company seal.",
          },
          {
            stepNumber: 2,
            heading: "Chamber of Commerce Attestation",
            detail:
              "Before the MEA will accept a business document, it must first be authenticated by a recognized Chamber of Commerce (such as PHDCCI, FIEO, FICCI, ASSOCHAM, or a regional Chamber of Commerce).",
          },
          {
            stepNumber: 3,
            heading: "MEA Commercial Apostille or Normal Attestation",
            detail:
              "After Chamber of Commerce verification, the document is submitted to the Ministry of External Affairs (MEA) in New Delhi for an Apostille sticker (for Hague countries) or normal attestation stamp.",
          },
          {
            stepNumber: 4,
            heading: "Foreign Embassy Legalization (If Required)",
            detail:
              "For non-Hague destinations or countries requiring consular legalization for trade documents (such as UAE, Saudi Arabia, Qatar, Kuwait, Egypt, or Vietnam), the document is legalized by the respective Embassy in New Delhi.",
          },
        ],
      },
      {
        title: "Commercial Documents We Process",
        bullets: [
          "Export & Shipping Documents: Commercial Invoices, Packing Lists, Certificates of Origin (COO), Free Sale Certificates (FSC), and Health/Phytosanitary Certificates.",
          "Corporate & Legal Documents: Corporate Power of Attorney (POA), Board Resolutions, Memorandum & Articles of Association (MOA/AOA), and Certificates of Incorporation.",
          "Financial & Tender Documents: Audited Balance Sheets, Bank Solvency Certificates, GMP Certificates, and International Distribution or Agency Agreements.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Why is Chamber of Commerce attestation mandatory for commercial documents?",
        answer:
          "Unlike personal or educational certificates (which go through SDM or State HRD), the Ministry of External Affairs (MEA) requires all business, corporate, and export documents to be pre-verified by an authorized Chamber of Commerce in India before MEA submission.",
      },
      {
        question:
          "Do Commercial Invoices and Powers of Attorney require Embassy Legalization for the Middle East?",
        answer:
          "Yes. For GCC and Middle East countries (such as the UAE, Saudi Arabia, Qatar, Kuwait, Iraq, and Egypt), corporate Powers of Attorney, Commercial Invoices, Certificates of Origin, and Agency Agreements generally require Chamber of Commerce attestation, MEA attestation, and Embassy legalization.",
      },
      {
        question: "How are embassy fees calculated for commercial documents?",
        answer:
          "Embassy consular fees for commercial documents vary depending on the destination country's embassy rules. Some embassies charge a flat fee per document type, while others calculate fees based on the invoice amount. We confirm the exact official fee structure after reviewing your document.",
      },
      {
        question:
          "Can our company courier commercial documents from outside Delhi?",
        answer:
          "Yes. Exporters and corporate teams across India courier their signed commercial documents and supporting KYC copies to our Connaught Place, New Delhi desk for Chamber of Commerce, MEA, and Embassy processing.",
      },
      {
        question:
          "What is the official MEA government fee for commercial document apostille?",
        answer:
          "As per official Ministry of External Affairs (MEA) guidelines, the government fee for an MEA Apostille sticker on a commercial document is ₹50 per document (plus nominal outsourced RAC agency charges). Chamber of Commerce verification fees, foreign embassy consular fees, and our coordination charges are separate.",
      },
      {
        question:
          "Which Chambers of Commerce are recognized by the MEA for commercial attestation?",
        answer:
          "The MEA recognizes designated national and regional Chambers of Commerce registered with the Ministry of Commerce, including PHD Chamber of Commerce and Industry (PHDCCI), FICCI, ASSOCHAM, FIEO, and accredited state/regional Chambers of Commerce across India.",
      },
      {
        question:
          "Can a Commercial Invoice and Certificate of Origin (COO) be processed together?",
        answer:
          "Yes. In fact, many foreign embassies (such as the UAE, Qatar, Kuwait, Egypt, and Iraq embassies) require the Commercial Invoice and Certificate of Origin (COO) to be submitted together as a matched export set after Chamber of Commerce and MEA authentication.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Non-Hague Legalization",
      },
      {
        title: "Apostille Services in India",
        slug: "/services/apostille",
        category: "Hague Apostille",
      },
      {
        title: "UAE MOFA Attestation from India",
        slug: "/countries/uae-mofa-attestation",
        category: "UAE Export & Corporate",
      },
      {
        title: "Saudi Arabia Document Attestation",
        slug: "/countries/saudi-arabia-attestation",
        category: "Saudi Corporate Route",
      },
    ],
  },

  // 4. /services/embassy-legalization
  {
    slug: "/services/embassy-legalization",
    aliases: [
      "/embassy-legalisation-india",
      "/embassy-legalization-services",
    ],
    category: "service",
    kicker: "Consular Attestation Chain • Non-Hague Countries",
    h1: "Embassy Legalization: When You Need More Than an Apostille",
    seoTitle:
      "Embassy Legalization Services | Attestation for Foreign Countries",
    metaDescription:
      "Learn the difference between apostille and embassy legalization. Assistance for non-Hague countries and consular attestation from India.",
    targetKeywords: [
      "embassy legalization in india",
      "difference between apostille and embassy legalization",
      "consular attestation new delhi",
      "non hague country attestation india",
      "mea and embassy attestation",
      "uae qatar kuwait embassy attestation delhi",
      "mofa attestation and embassy legalization",
    ],
    intro:
      "If your destination country is not a member of the Hague Convention, an MEA Apostille is not enough. We coordinate the complete embassy legalization (consular attestation) process for Indian documents.",
    whatsappMessage: "Hi, I need help with Embassy Legalization",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Embassy Legalization" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA)",
        label:
          "Ministry of External Affairs (MEA) — Official Consular Attestation & Apostille Guidelines",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "Official Government of India MEA rules, ₹50 normal attestation stamp fee, and RAC agency list.",
      },
      {
        authority: "Government of India (MEA)",
        label:
          "MEA Protocol Division — Foreign Diplomatic Missions & Embassies in New Delhi",
        url: "https://www.mea.gov.in/",
        description:
          "Official Ministry of External Affairs portal and diplomatic missions information.",
      },
      {
        authority: "NIC / Ministry of External Affairs",
        label: "e-Sanad Portal — Digital Document Verification",
        url: "https://esanad.nic.in/",
        description:
          "Official online portal for digital document authentication in India.",
      },
    ],
    sections: [
      {
        title: "Apostille vs. Embassy Legalization",
        paragraphs: [
          "Apostille: For Hague Convention Countries (e.g., USA, UK, Germany, Australia). A single MEA sticker is usually sufficient.",
          "Embassy Legalization: For Non-Hague Countries (e.g., Saudi Arabia, Qatar, Kuwait, UAE*). Requires MEA stamp followed by physical stamping at the destination country's Embassy in India. *Note: Some UAE employers still request full embassy legalization despite UAE being a Hague member.",
        ],
      },
      {
        title: "Why is it required?",
        paragraphs: [
          "Embassy legalization (or consular legalization) proves to the foreign government that your Indian document is authentic. The destination embassy will only verify and stamp the document if it has already been authenticated by the Indian Ministry of External Affairs (MEA).",
        ],
      },
      {
        title: "The Standard Legalization Process",
        steps: [
          {
            stepNumber: 1,
            heading: "State Verification (SDM/HRD)",
            detail:
              "Preliminary verification by the relevant Indian state authority based on the document type.",
          },
          {
            stepNumber: 2,
            heading: "MEA Attestation",
            detail:
              "The document is authenticated by the Ministry of External Affairs in New Delhi.",
          },
          {
            stepNumber: 3,
            heading: "Embassy Submission",
            detail:
              "The MEA-attested document is submitted to the specific foreign embassy (e.g., Saudi Embassy, Qatar Embassy) in India.",
          },
          {
            stepNumber: 4,
            heading: "Final Delivery",
            detail:
              "Once the embassy stamps the document, it is securely couriered back to you, ready for use abroad.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "What is the difference between embassy attestation and legalization?",
        answer:
          "They generally mean the same thing. Embassy legalization (or consular legalization) is the process of getting a document stamped by the embassy of the destination country in India to make it legally valid there.",
      },
      {
        question:
          "How do I know if I need an apostille or embassy legalization?",
        answer:
          "It depends on the destination country. If it is a member of the Hague Convention (like the UK, USA, or France), an apostille is usually sufficient. If it is a non-Hague country (like Saudi Arabia or Kuwait), it needs embassy legalization.",
      },
      {
        question: "Can I submit my documents directly to the embassy?",
        answer:
          "Most foreign embassies in India do not accept documents directly from individuals. They require submissions through authorized agencies or specific VFS centers. We handle this submission process for you.",
      },
      {
        question: "Does the embassy keep my original document?",
        answer:
          "In most cases, the embassy stamps the original document or attaches a sticker and returns it. We ensure the safe return of your original documents.",
      },
      {
        question:
          "Why does Qatar Embassy require mark sheets and a bonafide letter along with the degree certificate?",
        answer:
          "For educational degree attestation, the Embassy of the State of Qatar in New Delhi strictly requires the Original Degree Certificate, Original Final Year Marksheet/Transcript, and a University Verification/Bonafide Certificate to be attested together as a complete academic set.",
      },
      {
        question:
          "What is MOFA attestation and is it required after Embassy Legalization in India?",
        answer:
          "MOFA stands for the Ministry of Foreign Affairs of your destination country (such as UAE MOFA, Qatar MOFA, or Kuwait MOFA). After your document is attested by the MEA and legalized by the destination Embassy in New Delhi, the final step upon arrival abroad is MOFA counter-attestation. For UAE, we also coordinate UAE MOFA attestation.",
      },
      {
        question:
          "Can NRIs living in the Gulf or Asia get Indian documents legalized by an embassy in New Delhi without visiting India?",
        answer:
          "Yes. Expatriates residing in the UAE, Qatar, Kuwait, Saudi Arabia, Vietnam, Malaysia, or elsewhere can dispatch their original Indian certificates via international courier (or through a family member in India). Fatima Global Attestation completes the SDM/HRD, MEA, and Foreign Embassy legalization in New Delhi and couriers the legalized originals back safely.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "UAE MOFA Attestation from India",
        slug: "/countries/uae-mofa-attestation",
        category: "Country Procedure",
      },
      {
        title: "Saudi Arabia Document Attestation",
        slug: "/countries/saudi-arabia-attestation",
        category: "Country Procedure",
      },
      {
        title: "Commercial Document Attestation",
        slug: "/services/commercial-document-attestation",
        category: "Business Documents",
      },
      {
        title: "Document Translation Services",
        slug: "/services/document-translation",
        category: "Certified Translation",
      },
    ],
  },

  // 5. /guides/e-sanad
  {
    slug: "/guides/e-sanad",
    aliases: ["/e-sanad-guide", "/e-sanad-status", "/e-sanad-paper-documents"],
    category: "guide",
    kicker: "Official Portal Reference • MEA & NIC Digital Attestation",
    h1: "e-Sanad Guide: Application, Status, and Document IDs",
    seoTitle:
      "e-Sanad Guide & Status Check India | Fatima Global Attestation",
    metaDescription:
      "Complete guide to India's e-Sanad portal. Verify MEA Apostille Document ID vs sticker number, check the ₹50 fee, DigiLocker rules & fast physical SDM fallback.",
    targetKeywords: [
      "e-sanad guide",
      "esanad.nic.in status check",
      "e-sanad document id",
      "how to apply on e-sanad portal",
      "verify e-sanad apostille",
      "esanad check status document id vs sticker number",
      "e-sanad pending with issuing authority solution",
      "mea apostille verification online india",
    ],
    intro:
      "e-Sanad is an initiative by the Ministry of External Affairs (MEA) and NIC to provide contactless, paperless, and faceless document attestation and apostille services in India. Learn how to navigate the online portal.",
    whatsappMessage: "Hi, I need help with e-Sanad document processing",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Guides", path: "/#services" },
      { label: "e-Sanad Guide" },
    ],
    officialLinks: [
      {
        authority: "Government of India (MEA & NIC)",
        label: "e-Sanad Official Portal",
        url: "https://esanad.nic.in",
        description:
          "Official Government of India portal for e-Sanad registration and online attestation.",
      },
      {
        authority: "Government of India (e-Sanad)",
        label: "e-Sanad Status Check",
        url: "https://esanad.nic.in/checkStatus",
        description:
          "Official status tracking utility on the e-Sanad portal.",
      },
      {
        authority: "Government of India (e-Sanad)",
        label: "e-Sanad FAQs",
        url: "https://esanad.nic.in/faq",
        description:
          "Frequently asked questions on the official e-Sanad portal.",
      },
    ],
    sections: [
      {
        title: "What is e-Sanad?",
        paragraphs: [
          "e-Sanad is an online portal (esanad.nic.in) designed to simplify the document attestation process. Instead of physically visiting multiple government offices, eligible digital documents can be uploaded, verified by the issuing authority, and digitally signed by the MEA.",
        ],
      },
      {
        title: "How to Check Your Application Status",
        paragraphs: [
          "If you have already applied for an e-Sanad document, you can track its progress online.",
        ],
        steps: [
          {
            stepNumber: 1,
            heading: "Find your Document ID",
            detail:
              "Check the official e-Sanad portal. Use the 'Document ID' next to 'no' on the portal. (Do NOT use the bottom Sticker Serial Number if you have a physical copy).",
          },
          {
            stepNumber: 2,
            heading: "Go to the Official Status Page",
            detail:
              "Visit the official e-Sanad portal and click on 'Check Status'.",
          },
          {
            stepNumber: 3,
            heading: "Enter Details",
            detail:
              "Enter your Application ID OR Document ID, type the Captcha, and click Submit to view the current status.",
          },
        ],
      },
    ],
    faqs: [
      {
        question: "Can all Indian documents be attested through e-Sanad?",
        answer:
          "No. Only documents issued by authorities, boards, or universities that are officially integrated with the e-Sanad digital repository (such as CBSE or specific state portals) can be processed completely online. Most older degrees, private documents, and state-issued certificates still require the physical attestation route.",
      },
      {
        question: "Why is my e-Sanad status not showing when I enter my sticker number?",
        answer:
          "A common mistake is entering the 7 or 8-digit serial number printed at the very bottom of the Apostille sticker. You must enter the 'Document ID' printed next to 'no.' in the middle-left section of the sticker (or your e-Sanad Application ID).",
      },
      {
        question: "How long does e-Sanad verification take?",
        answer:
          "For documents already available in a linked digital repository (NAD/DigiLocker), it can take a few working days. However, if the Issuing Authority must manually verify the record online, timelines depend entirely on that state department or university.",
      },
      {
        question: "What if my university is not listed on e-Sanad?",
        answer:
          "If your university or issuing authority is not integrated with e-Sanad, you must use the physical attestation route (State HRD or Delhi SDM verification followed by physical MEA submission through an authorized agency).",
      },
      {
        question: "Is the ₹50 government fee paid on esanad.nic.in refundable if my document is rejected?",
        answer:
          "No. According to official Ministry of External Affairs (MEA) e-Sanad guidelines, once the government fee (₹50 for Apostille / ₹40 for Normal Attestation) is paid via BharatKosh, it is strictly non-refundable—even if the Pre-Verification Issuing Authority (PIA) rejects the document.",
      },
      {
        question: "What should I do if my e-Sanad application is stuck at 'Pending with Issuing Authority'?",
        answer:
          "If you have a university admission or work visa deadline and your university PIA is not verifying online, the fastest solution is to submit your physical original document through the Delhi SDM + MEA route (completed in 2–3 working days).",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Apostille Services in India",
        slug: "/services/apostille",
        category: "Physical MEA Apostille",
      },
      {
        title: "Degree Certificate Apostille",
        slug: "/services/degree-certificate-apostille",
        category: "Educational Documents",
      },
      {
        title: "Notary Public & SDM Attestation",
        slug: "/services/notary-public",
        category: "Pre-Authentication",
      },
      {
        title: "Track & Verify Document Order",
        slug: "/apostille-tracking",
        category: "Verification Tool",
      },
    ],
  },

  // 6. /countries/uae-mofa-attestation
  {
    slug: "/countries/uae-mofa-attestation",
    category: "country",
    kicker: "Embassy + MOFA Route • United Arab Emirates",
    h1: "UAE MOFA Attestation Services from India",
    seoTitle:
      "UAE MOFA Attestation from India | Embassy & Ministry Services",
    metaDescription:
      "Understand UAE MOFA attestation from India. Learn the steps: Indian authentication, UAE Embassy attestation, and UAE Ministry of Foreign Affairs (MOFA) stamp.",
    targetKeywords: [
      "uae mofa attestation from india",
      "uae embassy attestation india",
      "degree attestation for uae employment visa",
      "marriage certificate attestation for dubai visa",
      "how to verify uae mofa attestation",
    ],
    intro:
      "Complete assistance for authenticating Indian documents for use in the United Arab Emirates. We coordinate the mandatory chain: Indian State Verification, MEA, UAE Embassy, and the final UAE Ministry of Foreign Affairs (MOFA) stamping.",
    whatsappMessage: "Hi, I need help with UAE MOFA Attestation",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Countries", path: "/#services" },
      { label: "UAE MOFA Attestation" },
    ],
    officialLinks: [
      {
        authority: "UAE Ministry of Foreign Affairs (MOFA)",
        label: "UAE MOFA Verification Portal",
        url: "https://www.mofa.gov.ae/en/services/attestation",
        description:
          "Once the process is complete, you can verify the authenticity of the UAE MOFA stamp online.",
      },
    ],
    sections: [
      {
        title: "Why UAE MOFA Attestation is Required",
        paragraphs: [
          "The UAE Ministry of Foreign Affairs (MOFA) is the final authority that legalizes foreign documents for use inside the UAE. Whether you are moving for a job, sponsoring your family, or doing business, the UAE government requires documents to be fully authenticated to ensure their authenticity.",
        ],
      },
      {
        title: "The Step-by-Step Process",
        steps: [
          {
            stepNumber: 1,
            heading: "Indian State Verification (HRD/SDM)",
            detail:
              "For educational documents, State HRD attestation is often required. For personal documents like birth/marriage certificates, SDM/Home Department attestation is needed. (Commercial docs need Chamber of Commerce).",
          },
          {
            stepNumber: 2,
            heading: "MEA Attestation",
            detail:
              "The document is submitted to the Ministry of External Affairs (MEA) in India for official stamping.",
          },
          {
            stepNumber: 3,
            heading: "UAE Embassy Attestation",
            detail:
              "The Indian document is then stamped by the UAE Embassy in New Delhi.",
          },
          {
            stepNumber: 4,
            heading: "UAE MOFA Attestation",
            detail:
              "The final validation is done digitally/by the Ministry of Foreign Affairs and International Cooperation (MOFA) within the UAE.",
          },
        ],
      },
      {
        title: "Document Categories",
        bullets: [
          "Educational Documents: Degrees, Diplomas, Mark Sheets (Requires HRD + MEA + UAE Embassy + MOFA)",
          "Personal Documents: Birth, Marriage, PCC (Requires SDM + MEA + UAE Embassy + MOFA)",
          "Commercial Documents: Invoices, POA, Incorporation (Requires Chamber + MEA + UAE Embassy + MOFA)",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I verify my UAE MOFA attestation online?",
        answer:
          "The UAE Ministry of Foreign Affairs provides a digital verification portal on their official website where you can enter the document details (like the sticker number) to check the validity of the stamp.",
      },
      {
        question: "Can I skip the UAE Embassy and just get MOFA?",
        answer:
          "No. For Indian-issued documents, the UAE Embassy in India must stamp the document first. The UAE MOFA will only attest a document that already carries the UAE Embassy stamp.",
      },
      {
        question: "Is an MEA Apostille enough for UAE?",
        answer:
          "While UAE is a Hague member, many employers and government departments still strictly require the full Embassy and MOFA attestation chain. It is highly recommended to get the full MOFA attestation for work and family visas.",
      },
      {
        question: "How long does the full UAE MOFA process take?",
        answer:
          "Timelines vary based on the document type and current embassy processing times. It generally takes a few weeks. We provide an estimated timeline after reviewing your documents.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Consular Chain",
      },
      {
        title: "Saudi Arabia Document Attestation",
        slug: "/countries/saudi-arabia-attestation",
        category: "GCC Country Guide",
      },
      {
        title: "Commercial Document Attestation",
        slug: "/services/commercial-document-attestation",
        category: "UAE Business Setup",
      },
      {
        title: "Document Translation Services (Arabic)",
        slug: "/services/document-translation",
        category: "Arabic Translation",
      },
    ],
  },

  // 7. /countries/saudi-arabia-attestation
  {
    slug: "/countries/saudi-arabia-attestation",
    category: "country",
    kicker: "Apostille & Embassy Routes • Kingdom of Saudi Arabia (KSA)",
    h1: "Saudi Arabia Document Attestation Services from India",
    seoTitle:
      "Saudi Arabia Attestation from India | Fatima Global Attestation",
    metaDescription:
      "Saudi Arabia document attestation and MEA Apostille from India. State HRD, SDM, Arabic translation & Saudi Embassy legalization for work and family visas.",
    targetKeywords: [
      "saudi arabia document attestation india",
      "saudi embassy attestation new delhi",
      "degree attestation for saudi employment visa",
      "marriage certificate attestation for saudi family visa",
      "saudi culture attestation india",
    ],
    intro:
      "Complete guidance and assistance for authenticating Indian educational, personal, legal, and commercial documents for use in the Kingdom of Saudi Arabia (KSA). We help you navigate State HRD/SDM verification, MEA Apostille, Arabic translation, and Royal Embassy of Saudi Arabia legalization.",
    whatsappMessage:
      "Hi, I need help with Saudi Arabia Document Attestation",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Countries", path: "/#services" },
      { label: "Saudi Arabia Attestation" },
    ],
    officialLinks: [
      {
        authority: "Saudi Ministry of Foreign Affairs (MOFA)",
        label: "Saudi MOFA Official Portal",
        url: "https://www.mofa.gov.sa/en",
        description:
          "Reference the official Ministry of Foreign Affairs portal of the Kingdom of Saudi Arabia for consular and attestation information.",
      },
    ],
    sections: [
      {
        title: "MEA Apostille vs. Saudi Embassy Attestation: What You Should Know",
        paragraphs: [
          "Saudi Arabia is a member of the Hague Apostille Convention. As a result, many Indian personal and educational documents are now accepted in Saudi Arabia with an MEA Apostille sticker (often preceded by State HRD or SDM verification).",
          "However, specific categories—such as commercial export documents, Powers of Attorney (Wakala), legal heir and death claim files, or specific employer/ministry mandates—still require full Royal Embassy of Saudi Arabia legalization in New Delhi along with certified Arabic translation. We review your sponsor or authority checklist before initiating the process.",
        ],
      },
      {
        title: "The Step-by-Step Process",
        steps: [
          {
            stepNumber: 1,
            heading: "Indian State Verification (State HRD / SDM / Chamber)",
            detail:
              "Educational degrees often require State HRD verification (especially for work visas and professional licensing). Personal documents require SDM/Home Department authentication, and commercial documents require Chamber of Commerce attestation.",
          },
          {
            stepNumber: 2,
            heading: "MEA Apostille or Normal Attestation",
            detail:
              "The document is submitted to the Ministry of External Affairs (MEA) in India for the Hague Apostille sticker or normal attestation stamp depending on the required route.",
          },
          {
            stepNumber: 3,
            heading: "Certified Arabic Translation (Where Required)",
            detail:
              "Legal documents, Powers of Attorney (Wakala), inheritance/death claim files, and specific certificates often require certified English-to-Arabic translation.",
          },
          {
            stepNumber: 4,
            heading: "Saudi Embassy Legalization (When Mandated)",
            detail:
              "For commercial records, legal claims, or cases where the Saudi authority explicitly requires consular legalization, the document is stamped by the Royal Embassy of Saudi Arabia in New Delhi.",
          },
        ],
      },
      {
        title: "Document Categories",
        bullets: [
          "Educational Documents: Degrees, Diplomas, Mark Sheets for Employment Visas, Saudi Council of Engineers (SCE), SCFHS, and professional verification.",
          "Personal & Family Documents: Marriage Certificates, Birth Certificates, PCC, and Affidavits for Family Residence (Iqama) and Dependent Visas.",
          "Commercial & Legal Documents: Power of Attorney (Wakala), Legal Heir & Death Claim Files, Commercial Invoices, Certificates of Origin, and Agency Agreements.",
        ],
      },
    ],
    faqs: [
      {
        question:
          "Is an MEA Apostille accepted for Saudi Arabia, or do I need Saudi Embassy attestation?",
        answer:
          "Saudi Arabia is a member of the Hague Apostille Convention, so an MEA Apostille is widely accepted for many personal and educational documents. However, certain employers, commercial chambers, and Saudi courts (for Wakala or death claim cases) still require full Saudi Embassy attestation. Always confirm the exact requirement with your Saudi sponsor or employer.",
      },
      {
        question:
          "Is State HRD mandatory for engineering and medical degrees for Saudi Arabia?",
        answer:
          "For most Saudi employment visas and professional registrations (such as Saudi Council of Engineers or SCFHS), State HRD attestation from the state where your university is located is strongly recommended or mandatory before MEA authentication.",
      },
      {
        question: "Do documents for Saudi Arabia require Arabic translation?",
        answer:
          "Standard English educational degrees usually do not require translation for MEA Apostille, though some Saudi authorities may ask for Arabic translation upon arrival. However, legal documents like Powers of Attorney (Wakala), Legal Heir Certificates, and court documents generally require certified Arabic translation.",
      },
      {
        question:
          "How long does the Saudi Arabia document authentication process take?",
        answer:
          "Timelines depend on whether your document follows the SDM + MEA Apostille route, the State HRD + MEA route, or full Saudi Embassy legalization. State HRD timelines vary by university and state. We provide a clear estimate after reviewing your document scans.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Saudi Arabia Death Claim Assistance",
        slug: "/services/saudi-death-claim",
        category: "Specialized Saudi Service",
      },
      {
        title: "UAE MOFA Attestation from India",
        slug: "/countries/uae-mofa-attestation",
        category: "GCC Country Guide",
      },
      {
        title: "Document Translation Services (Arabic)",
        slug: "/services/document-translation",
        category: "Certified Arabic Translation",
      },
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Consular Legalization",
      },
    ],
  },

  // 8. /services/document-translation
  {
    slug: "/services/document-translation",
    aliases: [
      "/document-translation-services",
      "/language-translation-services",
      "/services/language-translation",
    ],
    category: "service",
    kicker: "International & Regional Language Translation • Embassy & MEA Support",
    h1: "Professional Language Translation Services in India",
    seoTitle:
      "Language Translation Services in India | Fatima Global Attestation",
    metaDescription:
      "Professional document translation services in India for educational, personal, legal & commercial records across 14 international & 12 Indian regional languages.",
    targetKeywords: [
      "language translation services in india",
      "document translation services in india",
      "arabic translation services in india",
      "hindi to english translation",
      "document translation for visa",
      "document translation for apostille",
      "document translation for embassy attestation",
      "educational document translation",
      "marriage certificate translation",
      "birth certificate translation",
      "degree certificate translation",
      "legal document translation",
      "commercial document translation",
    ],
    intro:
      "Fatima Global Attestation provides professional document translation services for educational, personal, legal, immigration and commercial documents. We assist customers with international language translation, Arabic translation and Indian regional language to English translation.",
    whatsappMessage: "Hi, I need a quote for professional language translation services",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Professional Language Translation Services in India" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA)",
        label:
          "Ministry of External Affairs (MEA) — Official Apostille & Attestation Guidelines",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "Official Government of India MEA rules for translating and authenticating regional-language certificates prior to Apostille.",
      },
      {
        authority: "NIC / Ministry of External Affairs",
        label: "e-Sanad Portal — Digital Document Verification",
        url: "https://esanad.nic.in/",
        description:
          "Official online portal for digital document authentication in India.",
      },
      {
        authority: "HCCH (Hague Conference on Private International Law)",
        label: "HCCH — Official Hague Apostille Member Countries",
        url: "https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille",
        description:
          "Official directory of countries accepting Hague Convention Apostille stickers.",
      },
    ],
    sections: [
      {
        title: "International Language Translation",
        bullets: [
          "Czech, Spanish, Dutch, Chinese, Portuguese, German, Russian, Korean, Vietnamese, Arabic, Italian, French, Hebrew, and Serbian document translation.",
          "Arabic Translation: Formatted personal, educational, Wakala (POA), Legal Heir, death claim, and commercial translations for Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, and Egypt.",
        ],
      },
      {
        title: "Indian Regional Language to English Translation",
        bullets: [
          "Hindi to English, Punjabi to English, Marathi to English, Tamil to English, Kannada to English, Gujarati to English, Bangla to English, Urdu to English, Malayalam to English, Telugu to English, Assamese to English, and Odia to English translation.",
        ],
      },
      {
        title: "Documents We Translate",
        bullets: [
          "Educational Documents: Degree Certificates, Diplomas, Mark Sheets, Academic Transcripts, School Certificates.",
          "Personal Documents: Birth Certificates, Marriage Certificates, Death Certificates, Affidavits, Passports, Driving Licences.",
          "Legal Documents: Power of Attorney, Court Documents, Agreements, Legal Notices.",
          "Commercial Documents: Invoices, Business Agreements, Company Documents, Certificates of Incorporation.",
        ],
      },
      {
        title: "The Translation & Attestation Route",
        steps: [
          {
            stepNumber: 1,
            heading: "Source Document & Passport Spelling Verification",
            detail:
              "We review your original document scan and cross-verify all personal names and dates against your Passport copy.",
          },
          {
            stepNumber: 2,
            heading: "Mirror-Layout Document Translation",
            detail:
              "Our language specialists translate the document in a structured layout matching your source certificate and share a draft for review.",
          },
          {
            stepNumber: 3,
            heading: "Notary, SDM, MEA Apostille or Embassy Coordination",
            detail:
              "Where required for your destination country, we coordinate Notary verification, SDM authentication, MEA Apostille, or Foreign Embassy attestation.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "What documents are required to start a language translation order? Do I need to submit original physical certificates?",
        answer:
          "To start a document translation, you only need to share a clear PDF scan or high-resolution photo of all pages of your document (front and back, including stamps) along with a copy of the applicant's Passport on WhatsApp or Email. Original physical certificates are only required if your destination authority also mandates physical SDM, State HRD, MEA Apostille, or Foreign Embassy stamps on the original document.",
      },
      {
        question:
          "Why is sharing a Passport copy mandatory before translating a certificate into English or an international language?",
        answer:
          "Phonetic spelling of Indian names from regional scripts into English, Arabic, or European languages can vary. Cross-checking against your Passport copy before finalization ensures that the applicant's name, spouse's name, and parents' names in the translated document match your Passport character-for-character, preventing embassy or visa queries.",
      },
      {
        question:
          "How is translation certification and verification handled for visa, MEA Apostille, and embassy submissions?",
        answer:
          "Every translation is prepared in a structured A4 mirror-layout matching your source document line-by-line (including registration numbers, dates, and seal notations) and issued with a formal translation verification statement. Where required by your destination country, we also coordinate Notary Public attestation, SDM authentication, Ministry of External Affairs (MEA) Apostille, or Foreign Embassy legalization.",
      },
      {
        question:
          "When does a translated document require Notary, SDM, MEA Apostille, or Embassy attestation?",
        answer:
          "If your original certificate is in a regional Indian language (such as Hindi, Urdu, Punjabi, Marathi, Tamil, or Gujarati), the MEA requires a notarized and SDM-authenticated English translation before issuing an Apostille or Normal Attestation stamp. Similarly, for countries like Italy, Spain, Germany, Saudi Arabia, UAE, or China, embassies and municipal authorities often require the translated copy to be notarized, apostilled, or attested alongside the original certificate.",
      },
      {
        question:
          "What is the delivery timeline for document translation services in India?",
        answer:
          "Standard 1–2 page personal or educational certificates (such as Birth Certificates, Marriage Certificates, PCC, or Degree Certificates) typically take 24 to 48 working hours for Indian regional-to-English translation and 1 to 3 working days for international languages (Arabic, German, Spanish, Italian, French, Chinese, Russian, etc.). Multi-page legal agreements, court decrees, academic transcripts, or commercial dossiers generally take 2 to 4 working days depending on word count and formatting.",
      },
      {
        question:
          "How do I review the translation draft, and how are the final translated documents delivered?",
        answer:
          "Before printing or notarization, we share a digital PDF draft on WhatsApp or Email so you can verify all names, dates, and certificate details. Once approved, you receive the final high-resolution PDF immediately on WhatsApp/Email, and physical hard copies (including notarized, apostilled, or embassy-attested sets) are dispatched across India and abroad via tracked courier.",
      },
      {
        question:
          "Which international and Indian regional languages do you translate?",
        answer:
          "We provide professional document translation for 14 international languages (Czech, Spanish, Dutch, Chinese, Portuguese, German, Russian, Korean, Vietnamese, Arabic, Italian, French, Hebrew, and Serbian) and 12 Indian regional languages into English (Hindi, Punjabi, Marathi, Tamil, Kannada, Gujarati, Bangla, Urdu, Malayalam, Telugu, Assamese, and Odia to English).",
      },
      {
        question:
          "Can the MEA apostille a certificate that is issued only in Hindi, Punjabi, Marathi, or Urdu?",
        answer:
          "The Ministry of External Affairs (MEA) requires documents issued solely in regional Indian languages to be accompanied by a complete English translation, duly notarized and authenticated by the SDM or State Home Department, before the MEA Apostille or Normal Attestation stamp is applied.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Apostille Services in India",
        slug: "/services/apostille",
        category: "Core Service",
      },
      {
        title: "Saudi Arabia Death Claim Assistance",
        slug: "/services/saudi-death-claim",
        category: "Arabic Legal Translation",
      },
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Consular Submission",
      },
      {
        title: "Notary Public Attestation",
        slug: "/services/notary-public",
        category: "Notarization",
      },
    ],
  },

  // 9. /services/saudi-death-claim
  {
    slug: "/services/saudi-death-claim",
    aliases: [
      "/saudi-arabia-death-claim-assistance",
      "/saudi-death-claim-assistance",
      "/saudi-death-compensation-documents",
    ],
    category: "service",
    kicker: "Humanitarian & Legal Documentation • KSA Claims & Inheritance",
    h1: "Saudi Arabia Death Claim Documentation Assistance",
    seoTitle:
      "Saudi Arabia Death Claim Assistance | Fatima Global Attestation",
    metaDescription:
      "Assistance for Saudi death claims, end-of-service benefits, Diyyah & GOSI. Documentation, Arabic translation & Wakala legal heir attestation via Saudi Embassy.",
    targetKeywords: [
      "saudi death claim assistance india",
      "saudi arabia death compensation documents",
      "wakala power of attorney saudi embassy attestation",
      "legal heir certificate attestation for saudi arabia",
      "saudi death claim procedure from india",
      "warisana certificate arabic translation saudi embassy",
      "blood money diyyah claim documents saudi arabia india",
      "gosi death benefit claim documents india",
      "walayatnama guardianship certificate attestation saudi arabia",
    ],
    intro:
      "When an Indian national passes away while working or residing in the Kingdom of Saudi Arabia, the bereaved family in India must complete a specific chain of legal documentation to claim unpaid salary, end-of-service benefits, GOSI/insurance settlements, bank balances, or court-awarded compensation. We provide careful, step-by-step assistance in preparing, translating, and legalizing the required family documents through Indian authorities and the Royal Embassy of Saudi Arabia in New Delhi.",
    whatsappMessage:
      "Hello Fatima Global Attestation, our family requires guidance and documentation assistance for a Saudi Arabia Death Claim / Legal Heir & Wakala attestation process.",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Saudi Arabia Death Claim Assistance" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA) — Consular / MADAD",
        label: "MEA Consular Services & Overseas Indian Welfare",
        url: "https://www.mea.gov.in",
        description:
          "Official Ministry of External Affairs portal for consular grievances and overseas Indian documentation guidance.",
      },
      {
        authority: "Embassy of India, Riyadh (Saudi Arabia)",
        label: "Embassy of India Riyadh — Death Case & Compensation Guidelines",
        url: "https://www.eoiriyadh.gov.in",
        description:
          "Official checklist and guidelines published by the Indian Embassy in Riyadh for legal heirs claiming dues in Saudi Arabia.",
      },
    ],
    sections: [
      {
        title: "Core Documents Required for Saudi Death Claim Dossiers",
        subtitle:
          "While exact requirements depend on the nature of the case (natural death vs. traffic/workplace accident), standard dossiers include:",
        bullets: [
          "Legal Heir Certificate (Warisana / Succession Certificate): Issued by the competent Tehsildar, District Magistrate/Collector, or Civil Court in India listing all surviving legal heirs.",
          "Special Power of Attorney (Wakala / Shariah Wakala): Executed by all adult legal heirs (and natural guardian on behalf of minor children) authorizing either the Indian Embassy in Riyadh/Jeddah or a designated representative in Saudi Arabia to pursue and receive the claim.",
          "Guardianship Certificate (Walayatnama): Required if the deceased left behind minor children.",
          "Death Certificate, Police Report, Medical Report & Passport Copy of the Deceased.",
          "Cancelled Cheque / Bank Account Details & Identity Proofs (Passport / Aadhaar) of all Legal Heirs.",
        ],
      },
      {
        title: "End-to-End Authentication & Saudi Embassy Routing",
        steps: [
          {
            stepNumber: 1,
            heading: "Document Scrutiny & Name Consistency Check",
            detail:
              "Even a minor spelling discrepancy in the deceased's name or father's name across the Passport, Death Certificate, and Legal Heir Certificate can halt proceedings in Saudi courts. We verify all records upfront.",
          },
          {
            stepNumber: 2,
            heading: "Certified Arabic Translation",
            detail:
              "All Indian legal heir certificates, affidavits, and Powers of Attorney (Wakala) are translated into formal legal Arabic.",
          },
          {
            stepNumber: 3,
            heading: "State Home Department / SDM + MEA Attestation",
            detail:
              "The original Indian certificates and translations are authenticated by the designated State Home Department / SDM and attested by the Ministry of External Affairs (MEA) in New Delhi.",
          },
          {
            stepNumber: 4,
            heading: "Royal Embassy of Saudi Arabia Legalization (New Delhi)",
            detail:
              "The complete dossier is submitted for consular legalization at the Royal Embassy of Saudi Arabia in New Delhi so it is legally admissible before Saudi Sharia courts, labour offices, and GOSI.",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "What are the legal dues (HUQOOQ) that the family can claim from the Saudi employer?",
        answer:
          "As per Indian Embassy guidelines, the legal dues include unpaid salary, End of Service Benefits (EOSB), and any other admissible allowances. It is the duty of the Saudi sponsor/employer to settle these dues with the family (Next of Kin). If the employer delays, the Indian Embassy can intervene through the Saudi Labour Office.",
      },
      {
        question:
          "What is the process for claiming Death Compensation (Blood Money/Diyya)?",
        answer:
          "Death compensation is applicable in cases of murder or unnatural deaths (accidents, fire, etc.), depending on the degree of responsibility. The legal heirs must file a case in the Shariah Court in Saudi Arabia. The Indian Embassy can pursue this case on your behalf through its empanelled lawyers, or you can appoint a representative via a Power of Attorney.",
      },
      {
        question:
          "What is a Wakala (Power of Attorney) and who should it be made in favor of?",
        answer:
          "Wakala is a legal document authorizing someone to act on your behalf in Saudi Arabia. You can execute the Wakala in favor of a trusted relative in Saudi Arabia, or in favor of the Ambassador of India in Riyadh. This document must be attested by the State Govt, MEA, and the Saudi Embassy in India.",
      },
      {
        question: "How do I get a Legal Heir Certificate for a Saudi claim?",
        answer:
          "The Legal Heir Certificate (LHC) is issued by the revenue authorities in India (Tehsildar, SDM, or District Collector). Crucially, all names must be written in full (no initials or short forms like \"Mohd\" for Mohamed), as Saudi courts reject documents with initials.",
      },
      {
        question:
          "Does the Indian government bear the cost of transporting the mortal remains?",
        answer:
          "If the family is unable to bear the cost and the employer/sponsor does not cover it, the Indian Embassy can provide financial assistance through the Indian Community Welfare Fund (ICWF) on a means-tested basis. You need to contact the Indian Embassy in Riyadh or the Consulate in Jeddah for this.",
      },
      {
        question: "How long does the entire claim process take?",
        answer:
          "For natural deaths, repatriation formalities may take 2-4 weeks. However, for death compensation claims (unnatural deaths), the process involves Shariah Court hearings and can take several months or even years. It is a complex legal process.",
      },
      {
        question:
          "What is the first step the family should take after a death in Saudi Arabia?",
        answer:
          "Contact the Indian Embassy in Riyadh (24x7 helpline: +966-11-488-4697) or the Consulate in Jeddah immediately. They will guide you on the required documents and coordinate with the Saudi employer. Do not send any documents for attestation until the embassy confirms the exact requirements.",
      },
      {
        question:
          "What if the deceased left behind minor children (under 18 years of age)?",
        answer:
          "Under Saudi Sharia court procedures, minor children cannot sign a Power of Attorney (Wakala) directly. The family must obtain a formal Guardianship Certificate (Walayatnama) from the District Magistrate/Collector or competent Court in India appointing the mother (or legal guardian) as the guardian of the minor children, which is then translated into Arabic and attested alongside the Legal Heir Certificate and Wakala.",
      },
      {
        question:
          "Is an MEA Apostille sufficient for a Saudi Arabia Death Claim, or is Royal Embassy of Saudi Arabia legalization required?",
        answer:
          "While Saudi Arabia accepts MEA Apostille for many routine visa documents, Death Claim dossiers—specifically Legal Heir Certificates (Warisana), Special Powers of Attorney (Shariah Wakala), and Guardianship Certificates (Walayatnama) submitted to Saudi Sharia Courts, Labour Courts, and the Indian Mission in Riyadh/Jeddah—regularly require Certified Arabic Translation, MEA Attestation, and consular legalization by the Royal Embassy of Saudi Arabia in New Delhi.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
      {
        question: "Does Fatima Global Attestation guarantee approval of a death claim in Saudi Arabia?",
        answer:
          "No. Claim eligibility, assessment, and payout approvals are decided exclusively by the competent authorities, courts, insurance bodies (such as GOSI), and employers in Saudi Arabia. Our role is strictly to assist families with accurate document preparation, translation, attestation, and procedural guidance.",
      },
    ],
    relatedLinks: [
      {
        title: "Saudi Arabia Document Attestation",
        slug: "/countries/saudi-arabia-attestation",
        category: "Saudi General Guide",
      },
      {
        title: "Certified Document Translation (Arabic)",
        slug: "/services/document-translation",
        category: "Arabic Translation",
      },
      {
        title: "Notary Public & Affidavit Services",
        slug: "/services/notary-public",
        category: "Affidavit & POA",
      },
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Consular Chain",
      },
    ],
  },

  // 10. /services/notary-public
  {
    slug: "/services/notary-public",
    aliases: ["/notary-attestation-india", "/notary-public-attestation"],
    category: "service",
    kicker: "Foundational Legal Step • Affidavits, POA & True Copies",
    h1: "Notary Public Attestation & Affidavit Services in India",
    seoTitle:
      "Notary Public Attestation in India | Fatima Global Attestation",
    metaDescription:
      "Notary Public attestation in India for affidavits, Power of Attorney & legal agreements. Fast pre-notarization for SDM, MEA Apostille & embassy attestation.",
    targetKeywords: [
      "notary public attestation india",
      "notary attestation for apostille",
      "single status affidavit notarization",
      "power of attorney notary delhi",
      "notary before sdm and mea",
      "e stamp affidavit notary new delhi",
      "wakala power of attorney notarization india",
    ],
    intro:
      "Notary Public attestation is the foundational first step in India's document legalization hierarchy. Issued by a government-appointed Advocate Notary under the Notaries Act, 1952, notarization certifies the execution of affidavits, powers of attorney, and document copies before they proceed to Sub-Divisional Magistrate (SDM), State Home Department, and Ministry of External Affairs (MEA) authentication.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Notary Public Attestation / Affidavit / POA preparation for international use.",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "Notary Public Attestation" },
    ],
    officialLinks: [
      {
        authority: "Ministry of External Affairs (MEA)",
        label:
          "Ministry of External Affairs (MEA) — Official Apostille & Attestation Guidelines",
        url: "https://mea.gov.in/apostille-menu.htm",
        description:
          "Official Government of India MEA rules requiring preliminary notarization and SDM/State authentication prior to Apostille.",
      },
      {
        authority: "Ministry of Law & Justice (Government of India)",
        label: "Department of Legal Affairs — Notaries Cell (Notaries Act, 1952)",
        url: "https://legalaffairs.gov.in/",
        description:
          "Official Department of Legal Affairs portal overseeing Central Government Advocate Notaries in India.",
      },
      {
        authority: "SHCIL (Stock Holding Corporation of India)",
        label: "SHCIL — Official Non-Judicial e-Stamping Portal",
        url: "https://www.shcilestamp.com/",
        description:
          "Official portal for verifying Non-Judicial e-Stamp certificates used for affidavits and Powers of Attorney.",
      },
    ],
    sections: [
      {
        title: "Why Notary Attestation Matters for International Documents",
        paragraphs: [
          "Neither the Sub-Divisional Magistrate (SDM) nor the Ministry of External Affairs (MEA) accepts unverified personal declarations or raw personal documents without preliminary notarial verification.",
          "A proper Notary attestation for international use requires the Advocate Notary's official circular embossed/ink seal, registration number, notary welfare stamp, signature, and date.",
        ],
        bullets: [
          "Single Status / Bachelorhood / Unmarried Affidavits for marriage abroad.",
          "Name Discrepancy / One-and-the-Same Person Affidavits.",
          "Date of Birth & No-Objection Affidavits (NOC) for child passport or visa sponsorship.",
          "General and Special Power of Attorney (POA) for property, banking, or overseas legal representation.",
          "Preliminary Notarization of Birth, Marriage, PCC, and Educational Certificates prior to SDM + MEA Apostille.",
        ],
      },
      {
        title: "Is Notary Attestation Alone Valid Abroad?",
        paragraphs: [
          "No. A standalone Indian Notary Public stamp is purely a domestic certification and is not recognized by foreign immigration authorities, embassies, or overseas courts on its own. To make a notarized document legally valid outside India, it must subsequently be authenticated by the Sub-Divisional Magistrate (SDM) / State Home Department and then receive an MEA Apostille (for Hague countries) or MEA + Foreign Embassy Legalization (for Non-Hague countries).",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I get a Single Status Affidavit drafted, notarized, and apostilled in one workflow?",
        answer:
          "Yes. Once you share the required text format or destination country guidelines along with your passport and Aadhaar copies, we assist with e-Stamp paper execution, Notary attestation, SDM authentication, and MEA Apostille.",
      },
      {
        question: "Does a Power of Attorney executed in India for use in the UAE or Saudi Arabia need more than Notary?",
        answer:
          "Yes. A Power of Attorney executed in India for use in the UAE or Saudi Arabia must be notarized, authenticated by SDM/State authorities, attested by the Ministry of External Affairs (MEA), and legalized by the respective Embassy in New Delhi.",
      },
      {
        question: "Is an Indian Notary Public stamp alone valid in foreign countries?",
        answer:
          "No. Under international document legalization rules, a standalone Indian Notary Public stamp is only valid within India. For use in any foreign country, the notarized document must be counter-authenticated by the Sub-Divisional Magistrate (SDM) or State Home Department and then attested by the Ministry of External Affairs (MEA) via an Apostille sticker (for Hague countries) or Normal Attestation + Embassy Legalization (for non-Hague countries).",
      },
      {
        question:
          "What elements must be present on a valid Notary Public attestation for SDM and MEA acceptance?",
        answer:
          "For the Sub-Divisional Magistrate (SDM) and Ministry of External Affairs (MEA) to accept a notarized document, it must carry the Advocate Notary's circular seal (showing name, jurisdiction, and Government registration number), the 'ATTESTED — NOTARY PUBLIC' endorsement stamp, Notarial Welfare/Fee stamp, Notarial Register Entry Number, date, and official signature.",
      },
      {
        question:
          "What denomination of Non-Judicial e-Stamp paper is used for international affidavits and Powers of Attorney?",
        answer:
          "In Delhi NCR and most Indian states, personal affidavits (such as Single Status, Name Discrepancy, Date of Birth, or NOC declarations) are typically executed on ₹10 to ₹100 Non-Judicial e-Stamp paper, while General or Special Powers of Attorney (POA / Wakala) are executed on ₹100 to ₹500 e-Stamp paper depending on state stamp duty rules.",
      },
      {
        question:
          "Why do Birth, Marriage, and Police Clearance Certificates require Notary attestation before SDM?",
        answer:
          "Under the fast-track Delhi SDM route, the Sub-Divisional Magistrate authenticates the document following preliminary verification and endorsement by a licensed Advocate Notary Public in Delhi, which then enables the Ministry of External Affairs (MEA) to affix the ₹50 Apostille sticker or Normal Attestation stamp.",
      },
      {
        question:
          "How long does it take to complete Notary + Delhi SDM + MEA Apostille?",
        answer:
          "Standalone Notary attestation and e-Stamp affidavit preparation can be completed on the same working day (2–4 hours). When combined with Delhi SDM verification and MEA Apostille or Normal Attestation, the complete process typically takes 2–3 working days.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "Apostille Services in India",
        slug: "/services/apostille",
        category: "SDM + MEA Apostille",
      },
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "Consular Chain",
      },
      {
        title: "Saudi Arabia Death Claim Assistance",
        slug: "/services/saudi-death-claim",
        category: "Wakala & Legal Heir",
      },
      {
        title: "Apostille Agent in Connaught Place, Delhi",
        slug: "/locations/apostille-agent-delhi",
        category: "New Delhi Desk",
      },
    ],
  },

  // 11. /services/mofa-attestation (MOFA Attestation Services — UAE, Qatar, Kuwait, Saudi, Oman, Bahrain)
  {
    slug: "/services/mofa-attestation",
    aliases: [
      "/mofa-attestation",
      "/mofa-attestation-services",
      "/gulf-mofa-attestation",
    ],
    category: "service",
    kicker: "MEA + Gulf Embassy + Destination MOFA Route",
    h1: "MOFA Attestation Services from India (Ministry of Foreign Affairs)",
    seoTitle:
      "MOFA Attestation Services in India | Fatima Global Attestation",
    metaDescription:
      "Complete MOFA Attestation Services from India for UAE, Qatar, Kuwait & Saudi Arabia. Coordinate State HRD/SDM, Indian MEA, Gulf Embassy & digital MOFA stamps.",
    targetKeywords: [
      "mofa attestation",
      "mofa attestation in india",
      "uae mofa attestation",
      "qatar mofa attestation",
      "kuwait mofa attestation",
      "saudi mofa attestation",
      "ministry of foreign affairs attestation",
      "mea and mofa attestation difference",
    ],
    intro:
      "Complete end-to-end assistance for authenticating Indian educational, personal, legal, and commercial documents for Gulf & Non-Hague countries. We coordinate Indian State HRD/SDM verification, Ministry of External Affairs (MEA) stamping, Foreign Embassy legalization in New Delhi, and final Ministry of Foreign Affairs (MOFA) attestation.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need help with MOFA Attestation (MEA + Gulf Embassy + MOFA) from India.",
    breadcrumbs: [
      { label: "Home", path: "/" },
      { label: "Services", path: "/#services" },
      { label: "MOFA Attestation Services" },
    ],
    sections: [
      {
        title: "How MOFA Attestation Works from India (4-Step Official Chain)",
        steps: [
          {
            stepNumber: 1,
            heading: "State HRD / Delhi SDM / Chamber of Commerce",
            detail:
              "Educational degrees are verified by State HRD or Delhi SDM; personal certificates by SDM/Home Dept; commercial papers by Chamber of Commerce.",
          },
          {
            stepNumber: 2,
            heading: "Ministry of External Affairs (MEA, New Delhi)",
            detail:
              "Official Indian MEA Normal Attestation ink stamp & signature (₹50 government fee).",
          },
          {
            stepNumber: 3,
            heading: "Destination Gulf Embassy Attestation (New Delhi)",
            detail:
              "Consular legalization by the UAE, Qatar, Kuwait, Saudi, Oman, or Bahrain Embassy in New Delhi.",
          },
          {
            stepNumber: 4,
            heading: "Ministry of Foreign Affairs (MOFA) Attestation",
            detail:
              "Final verification by the destination country's Ministry of Foreign Affairs (including UAE Combined Digital MOFA e-Attestation).",
          },
        ],
      },
    ],
    faqs: [
      {
        question:
          "What is the difference between MEA Attestation in India and MOFA Attestation?",
        answer:
          "In India, the foreign ministry is the Ministry of External Affairs (MEA, New Delhi). In Gulf countries (UAE, Qatar, Kuwait, Saudi Arabia), it is the Ministry of Foreign Affairs (MOFA). An Indian document must first receive State/SDM + Indian MEA + Gulf Embassy (New Delhi) stamps before it can be attested by the destination country's MOFA.",
      },
      {
        question: "How can I verify my UAE MOFA attestation online?",
        answer:
          "Once issued, you can verify your UAE digital MOFA attestation online at https://verify.mofa.gov.ae using the Issue Date and Reference Number.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedLinks: [
      {
        title: "UAE MOFA Attestation",
        slug: "/countries/uae-mofa-attestation",
        category: "UAE Digital MOFA",
      },
      {
        title: "Saudi Arabia Attestation",
        slug: "/countries/saudi-arabia-attestation",
        category: "Saudi Embassy & MOFA",
      },
      {
        title: "Embassy Legalization Services",
        slug: "/services/embassy-legalization",
        category: "All Non-Hague Embassies",
      },
      {
        title: "Degree Certificate Apostille & HRD",
        slug: "/services/degree-certificate-apostille",
        category: "Educational Docs",
      },
    ],
  },

  ...([
    // Top Metro Cities
    { name: "Delhi", slugSuffix: "delhi" },
    {
      name: "Bangalore",
      slugSuffix: "bangalore",
      aliases: ["/locations/apostille-agent-bengaluru"],
    },
    { name: "Chennai", slugSuffix: "chennai" },
    { name: "Kolkata", slugSuffix: "kolkata" },
    { name: "Mumbai", slugSuffix: "mumbai" },
    // Highlighted States & Regions Requested
    {
      name: "Kashmir",
      slugSuffix: "kashmir",
      aliases: [
        "/locations/apostille-agent-jammu-kashmir",
        "/locations/apostille-agent-jk",
      ],
    },
    { name: "Jammu & Kashmir", slugSuffix: "jammu-and-kashmir" },
    { name: "Punjab", slugSuffix: "punjab" },
    { name: "Goa", slugSuffix: "goa" },
    { name: "Kerala", slugSuffix: "kerala" },
    { name: "Tamil Nadu", slugSuffix: "tamil-nadu" },
    { name: "Bihar", slugSuffix: "bihar" },
    // All Major Indian States & UTs
    { name: "Uttar Pradesh", slugSuffix: "uttar-pradesh" },
    { name: "Maharashtra", slugSuffix: "maharashtra" },
    { name: "Gujarat", slugSuffix: "gujarat" },
    { name: "Telangana", slugSuffix: "telangana" },
    { name: "Karnataka", slugSuffix: "karnataka" },
    { name: "Rajasthan", slugSuffix: "rajasthan" },
    { name: "Haryana", slugSuffix: "haryana" },
    { name: "Andhra Pradesh", slugSuffix: "andhra-pradesh" },
    { name: "West Bengal", slugSuffix: "west-bengal" },
    { name: "Madhya Pradesh", slugSuffix: "madhya-pradesh" },
    { name: "Odisha", slugSuffix: "odisha" },
    { name: "Assam", slugSuffix: "assam" },
    { name: "Uttarakhand", slugSuffix: "uttarakhand" },
    { name: "Himachal Pradesh", slugSuffix: "himachal-pradesh" },
    { name: "Jharkhand", slugSuffix: "jharkhand" },
    { name: "Chhattisgarh", slugSuffix: "chhattisgarh" },
    // High-Intent Regional & Diaspora Cities + State HRD Capitals
    { name: "Hyderabad", slugSuffix: "hyderabad" },
    { name: "Pune", slugSuffix: "pune" },
    { name: "Ahmedabad", slugSuffix: "ahmedabad" },
    { name: "Kochi", slugSuffix: "kochi" },
    { name: "Chandigarh", slugSuffix: "chandigarh" },
    { name: "Lucknow", slugSuffix: "lucknow" },
    { name: "Patna", slugSuffix: "patna" },
    { name: "Srinagar", slugSuffix: "srinagar" },
    { name: "Jaipur", slugSuffix: "jaipur" },
    { name: "Bhopal", slugSuffix: "bhopal" },
    { name: "Bhubaneswar", slugSuffix: "bhubaneswar" },
    { name: "Dehradun", slugSuffix: "dehradun" },
    { name: "Ranchi", slugSuffix: "ranchi" },
    { name: "Raipur", slugSuffix: "raipur" },
    { name: "Guwahati", slugSuffix: "guwahati" },
    { name: "Shimla", slugSuffix: "shimla" },
    { name: "Varanasi", slugSuffix: "varanasi" },
    { name: "Kanpur", slugSuffix: "kanpur" },
    { name: "Jalandhar", slugSuffix: "jalandhar" },
    { name: "Ludhiana", slugSuffix: "ludhiana" },
    { name: "Amritsar", slugSuffix: "amritsar" },
    { name: "Kozhikode", slugSuffix: "kozhikode" },
    { name: "Thiruvananthapuram", slugSuffix: "thiruvananthapuram" },
    { name: "Surat", slugSuffix: "surat" },
    { name: "Gurugram", slugSuffix: "gurugram" },
    { name: "Noida", slugSuffix: "noida" },
  ] as const).map(
    (loc): DedicatedSeoPageData => {
      const city = loc.name;
      const cityLower = city.toLowerCase();
      const baseAliases = "aliases" in loc ? [...loc.aliases] : [];
      const hrdAliases = [
        `/locations/hrd-attestation-${loc.slugSuffix}`,
        `/hrd-attestation-${loc.slugSuffix}`,
        `/hrd-service-${loc.slugSuffix}`,
      ];
      const isDelhi = loc.slugSuffix === "delhi";
      return {
        slug: `/locations/apostille-agent-${loc.slugSuffix}`,
        aliases: [...baseAliases, ...hrdAliases],
        category: "location",
        kicker: "PAN India Service • Secure Courier • MEA & Embassy Routes",
        h1: isDelhi
          ? "Apostille & Attestation Services in Delhi NCR"
          : `Apostille & Attestation Agent in ${city}`,
        seoTitle: isDelhi
          ? "Apostille Agent in Delhi | Delhi SDM, HRD & MEA Services"
          : city.length > 13
          ? `${city} Apostille | Fatima Global Attestation`
          : `Apostille & Attestation in ${city} | Fatima Global Attestation`,
        metaDescription: isDelhi
          ? "Looking for apostille in Delhi? We handle Delhi SDM, State HRD verification, and MEA Apostille. Secure document pickup in Delhi NCR and Pan-India courier."
          : `Document attestation & MEA Apostille in ${city}. State HRD, SDM, translation & Embassy attestation with secure doorstep pickup & tracked courier.`,
        targetKeywords: [
          `apostille agent in ${cityLower}`,
          `attestation services in ${cityLower}`,
          `attestation agent in ${cityLower}`,
          `mea apostille ${cityLower}`,
          `embassy attestation ${cityLower}`,
          `hrd sdm verification ${cityLower}`,
          `hrd service in ${cityLower}`,
          `hrd attestation in ${cityLower}`,
          `${cityLower} hrd attestation agent`,
          `degree certificate hrd attestation ${cityLower}`,
          `state hrd verification ${cityLower}`,
          `home department attestation ${cityLower}`,
        ],
        intro: `Professional assistance for MEA Apostille, Embassy Attestation, and document translation. Based in New Delhi, we serve clients across ${city} with secure doorstep document pickup and tracked courier delivery.`,
        whatsappMessage: `Hi, I am from ${city}. I need help with attestation.`,
        breadcrumbs: [
          { label: "Home", path: "/" },
          { label: "Locations", path: "/contact-us" },
          { label: `Apostille & Attestation Agent in ${city}` },
        ],
        sections: [
          {
            title: `How We Help Clients in ${city}`,
            paragraphs: [
              `Whether you are in South Delhi, Koramangala (Bangalore), or anywhere in ${city}, you don't need to visit government offices in New Delhi. We coordinate the entire process, from State HRD/SDM verification to MEA Apostille and Embassy legalization. You can share your document scans on WhatsApp for pre-submission review.`,
            ],
          },
          {
            title: "Step-by-Step Process",
            steps: [
              {
                stepNumber: 1,
                heading: "Share Document Scans",
                detail: "Via WhatsApp for initial check.",
              },
              {
                stepNumber: 2,
                heading: "Secure Pickup",
                detail: `We arrange a courier to pick up your original documents from ${city}.`,
              },
              {
                stepNumber: 3,
                heading: "Processing in Delhi",
                detail: "We handle State, MEA, and Embassy submissions.",
              },
              {
                stepNumber: 4,
                heading: `Delivery to ${city}`,
                detail:
                  "Your fully attested documents are couriered back to you.",
              },
            ],
          },
        ],
        faqs: [
          {
            question: "Do I need to travel to Delhi for attestation?",
            answer: `No. You can send us your documents via courier from ${city}. We process them in New Delhi and courier them back to you securely.`,
          },
          {
            question: "How long does courier pickup and delivery take?",
            answer:
              "Courier transit usually takes 2-4 business days each way, depending on the city. We provide tracking details.",
          },
          {
            question: `Are you a government office in ${city}?`,
            answer: `No, we are a private assistance agency based in Delhi, providing coordination and logistics support for clients in ${city}.`,
          },
          {
            question: `How do I get State HRD attestation in ${city} for my degree certificate?`,
            answer: `For universities in ${city}, we coordinate both authentic State Higher Education Department (HRD) verification (where required by the university or foreign employer) and the fast-track 2–3 working day Delhi SDM + MEA route when State HRD is not strictly mandated.`,
          },
          {
            question: "Do I need to send the original document, or can I send a color copy?",
            answer:
              "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
          },
        ],
        relatedLinks: [
          {
            title: "MEA Apostille",
            slug: "/services/apostille",
            category: "Hague Countries",
          },
          {
            title: "UAE & Saudi Embassy Attestation",
            slug: "/countries/uae-mofa-attestation",
            category: "Gulf Visas",
          },
          {
            title: "HRD / SDM Verification",
            slug: "/services/degree-certificate-apostille",
            category: "State Documents",
          },
          {
            title: "Commercial Document Attestation",
            slug: "/services/commercial-document-attestation",
            category: "Export / Import",
          },
        ],
      };
    }
  ),
];

export const PAN_INDIA_LOCATION_PAGES: DedicatedSeoPageData[] =
  DEDICATED_SEO_PAGES.filter((p) => p.category === "location");

function formatLocationSlugToName(slugSuffix: string): string {
  return slugSuffix
    .split("-")
    .filter(Boolean)
    .map((word) =>
      word.toLowerCase() === "and"
        ? "&"
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

export function resolveLocationRoute(
  path: string
): { cityName: string; slug: string } | null {
  const clean = !path || path === "/" ? "/" : path.replace(/\/+$/, "");
  const matched = PAN_INDIA_LOCATION_PAGES.find(
    (p) => p.slug === clean || (p.aliases && p.aliases.includes(clean))
  );
  if (matched) {
    const cityName = matched.h1.replace(
      /^Apostille & Attestation Agent in\s+/i,
      ""
    );
    return { cityName, slug: matched.slug };
  }

  const prefixes = [
    "/locations/apostille-agent-",
    "/locations/hrd-attestation-",
    "/hrd-attestation-",
    "/hrd-service-",
  ];
  for (const prefix of prefixes) {
    if (clean.startsWith(prefix) && clean.length > prefix.length) {
      const suffix = clean.slice(prefix.length);
      const cityName = formatLocationSlugToName(suffix);
      return { cityName, slug: `/locations/apostille-agent-${suffix}` };
    }
  }

  return null;
}

export function getDedicatedPageByPath(
  path: string
): DedicatedSeoPageData | undefined {
  const clean = !path || path === "/" ? "/" : path.replace(/\/+$/, "");
  // Check exact slug first so dedicated services take precedence
  const exact = DEDICATED_SEO_PAGES.find((p) => p.slug === clean);
  if (exact) return exact;

  // Dynamic fallback for any /locations/apostille-agent-[state-or-city] or HRD route URL
  const dynamicLoc = resolveLocationRoute(clean);
  if (dynamicLoc) {
    const city = dynamicLoc.cityName;
    const cityLower = city.toLowerCase();
    return {
      slug: dynamicLoc.slug,
      category: "location",
      kicker: "PAN India Service • Secure Courier • MEA & Embassy Routes",
      h1: `Apostille & Attestation Agent in ${city}`,
      seoTitle:
        city.length > 13
          ? `${city} Apostille | Fatima Global Attestation`
          : `Apostille & Attestation in ${city} | Fatima Global Attestation`,
      metaDescription: `Document attestation & MEA Apostille in ${city}. State HRD, SDM, translation & Embassy attestation with secure doorstep pickup & tracked courier.`,
      targetKeywords: [
        `apostille agent in ${cityLower}`,
        `attestation services in ${cityLower}`,
        `mea apostille ${cityLower}`,
        `embassy attestation ${cityLower}`,
        `hrd service in ${cityLower}`,
        `hrd attestation in ${cityLower}`,
        `degree certificate hrd attestation ${cityLower}`,
      ],
      intro: `Professional assistance for MEA Apostille, Embassy Attestation, and document translation. Based in New Delhi, we serve clients across ${city} with secure doorstep document pickup and tracked courier delivery.`,
      whatsappMessage: `Hi, I am from ${city}. I need help with attestation.`,
      breadcrumbs: [
        { label: "Home", path: "/" },
        { label: "Locations", path: "/contact-us" },
        { label: `Apostille & Attestation Agent in ${city}` },
      ],
      sections: [],
      faqs: [
        {
          question: "Do I need to travel to Delhi for attestation?",
          answer: `No. You can send us your documents via courier from ${city}. We process them in New Delhi and courier them back to you securely.`,
        },
        {
          question: "How long does courier pickup and delivery take?",
          answer:
            "Courier transit usually takes 2-4 business days each way, depending on the city. We provide tracking details.",
        },
        {
          question: `Are you a government office in ${city}?`,
          answer: `No, we are a private assistance agency based in Delhi, providing coordination and logistics support for clients in ${city}.`,
        },
        {
          question: `How do I get State HRD attestation in ${city} for my degree certificate?`,
          answer: `For universities in ${city}, we coordinate both authentic State Higher Education Department (HRD) verification and the fast-track 2–3 working day Delhi SDM + MEA route when State HRD is not strictly mandated.`,
        },
        {
          question: "Do I need to send the original document, or can I send a color copy?",
          answer:
            "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
        },
      ],
      relatedLinks: [],
    };
  }

  // Fallback to aliases for non-service routes
  const aliasMatch = DEDICATED_SEO_PAGES.find(
    (p) => p.aliases && p.aliases.includes(clean)
  );
  if (aliasMatch) return aliasMatch;

  return undefined;
}

