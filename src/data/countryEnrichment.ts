/**
 * FATIMA GLOBAL ATTESTATION — Country-Wise SEO & Country Services Enrichment Data
 *
 * Provides comprehensive, verified country-specific SEO metadata, 12 priority country
 * configurations, continent classifications, legal document requirements, supporting
 * documents, step-by-step authentication processes, and country-specific FAQs.
 */

export type CountryContinent =
  | "Middle East & GCC"
  | "Europe"
  | "North America"
  | "Asia-Pacific"
  | "Africa"
  | "South America";

export interface CountryProcessStep {
  stepNumber: number;
  title: string;
  authority: string;
  description: string;
}

export interface CountryFaqItem {
  question: string;
  answer: string;
}

export interface CountryEnrichmentProfile {
  canonicalSlug: string;
  priorityOrder?: number;
  isPriority12?: boolean;
  continent: CountryContinent;
  isApostilleMember: boolean;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  featuredCardTitle: string;
  featuredCardRouteLabel: string;
  featuredCardDescription: string;
  targetKeywords: string[];
  legalGuidance: string;
  supportingDocuments: string[];
  stepByStepProcess: CountryProcessStep[];
  faqs: CountryFaqItem[];
}

export const PRIORITY_12_SLUGS: string[] = [
  "united-arab-emirates",
  "saudi-arabia",
  "qatar",
  "kuwait",
  "germany",
  "italy",
  "israel",
  "united-kingdom",
  "united-states",
  "canada",
  "australia",
  "france",
];

export const COUNTRY_CONTINENT_BY_ISO: Record<string, CountryContinent> = {
  // Middle East & GCC
  AE: "Middle East & GCC",
  SA: "Middle East & GCC",
  QA: "Middle East & GCC",
  KW: "Middle East & GCC",
  OM: "Middle East & GCC",
  BH: "Middle East & GCC",
  IL: "Middle East & GCC",
  JO: "Middle East & GCC",
  IQ: "Middle East & GCC",
  IR: "Middle East & GCC",
  LB: "Middle East & GCC",
  SY: "Middle East & GCC",
  YE: "Middle East & GCC",
  TR: "Middle East & GCC",
  // Europe
  DE: "Europe",
  IT: "Europe",
  GB: "Europe",
  FR: "Europe",
  ES: "Europe",
  PT: "Europe",
  NL: "Europe",
  BE: "Europe",
  AT: "Europe",
  CH: "Europe",
  SE: "Europe",
  NO: "Europe",
  DK: "Europe",
  FI: "Europe",
  IE: "Europe",
  PL: "Europe",
  CZ: "Europe",
  GR: "Europe",
  HU: "Europe",
  RO: "Europe",
  BG: "Europe",
  HR: "Europe",
  SK: "Europe",
  SI: "Europe",
  LT: "Europe",
  LV: "Europe",
  EE: "Europe",
  CY: "Europe",
  MT: "Europe",
  LU: "Europe",
  UA: "Europe",
  RU: "Europe",
  BY: "Europe",
  RS: "Europe",
  // North America
  US: "North America",
  CA: "North America",
  MX: "North America",
  PA: "North America",
  CR: "North America",
  JM: "North America",
  CU: "North America",
  // Asia-Pacific
  AU: "Asia-Pacific",
  NZ: "Asia-Pacific",
  CN: "Asia-Pacific",
  JP: "Asia-Pacific",
  KR: "Asia-Pacific",
  SG: "Asia-Pacific",
  MY: "Asia-Pacific",
  TH: "Asia-Pacific",
  VN: "Asia-Pacific",
  ID: "Asia-Pacific",
  PH: "Asia-Pacific",
  LK: "Asia-Pacific",
  BD: "Asia-Pacific",
  NP: "Asia-Pacific",
  AF: "Asia-Pacific",
  MM: "Asia-Pacific",
  KH: "Asia-Pacific",
  LA: "Asia-Pacific",
  MN: "Asia-Pacific",
  KZ: "Asia-Pacific",
  UZ: "Asia-Pacific",
  KG: "Asia-Pacific",
  TJ: "Asia-Pacific",
  TM: "Asia-Pacific",
  FJ: "Asia-Pacific",
  // Africa
  EG: "Africa",
  ZA: "Africa",
  NG: "Africa",
  KE: "Africa",
  ET: "Africa",
  GH: "Africa",
  TZ: "Africa",
  UG: "Africa",
  ZM: "Africa",
  ZW: "Africa",
  MA: "Africa",
  DZ: "Africa",
  TN: "Africa",
  LY: "Africa",
  SD: "Africa",
  MU: "Africa",
  SC: "Africa",
  RW: "Africa",
  SN: "Africa",
  AO: "Africa",
  MZ: "Africa",
  BW: "Africa",
  NA: "Africa",
  // South America
  BR: "South America",
  AR: "South America",
  CL: "South America",
  CO: "South America",
  PE: "South America",
  VE: "South America",
  EC: "South America",
  UY: "South America",
  PY: "South America",
  BO: "South America",
};

export const PRIORITY_COUNTRY_ENRICHMENTS: Record<string, CountryEnrichmentProfile> = {
  "united-arab-emirates": {
    canonicalSlug: "uae",
    priorityOrder: 1,
    isPriority12: true,
    continent: "Middle East & GCC",
    isApostilleMember: false,
    seoTitle: "UAE Certificate Attestation from India | Fatima Global Attestation",
    metaDescription:
      "Professional UAE certificate attestation from India for educational degrees, birth & marriage certificates, PCC, and commercial documents via State HRD/SDM, MEA, UAE Embassy, and UAE MOFA.",
    h1: "UAE Certificate Attestation from India",
    heroBadge: "Non-Hague Route • State/SDM → MEA → UAE Embassy → UAE MOFA",
    featuredCardTitle: "United Arab Emirates (UAE)",
    featuredCardRouteLabel: "State/SDM → MEA → UAE Embassy → UAE MOFA",
    featuredCardDescription:
      "End-to-end UAE Embassy & MOFA attestation for employment visas, Golden Visa equivalency, family sponsorship, and Dubai/Abu Dhabi corporate setup.",
    targetKeywords: [
      "uae attestation in india",
      "degree attestation for uae",
      "marriage certificate attestation for uae",
      "birth certificate attestation for uae",
      "commercial document attestation for uae",
      "uae embassy attestation india",
    ],
    legalGuidance:
      "Personal and Corporate Powers of Attorney (POA), affidavits, court decrees, single status declarations, and succession/heirship documents intended for UAE courts, Dubai Land Department, or banks must be notarized, verified via SDM/State Home or Chamber of Commerce, attested by MEA India, legalized by the UAE Embassy in New Delhi, and stamped by UAE MOFA (often requiring certified Arabic translation).",
    supportingDocuments: [
      "Original certificate(s) requiring UAE attestation (Degree, Birth, Marriage, PCC, POA, or Commercial Invoice/COI).",
      "Clear passport copy (front and back pages) of the document holder.",
      "Final-year marksheets / consolidated transcript copy (for educational degree certificates).",
      "Spouse passport copy (where applicable for Marriage Certificate attestation for UAE family residence visa).",
      "Covering letter and company authorization on letterhead (for commercial export & corporate POA documents).",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Preliminary State / SDM / Chamber Verification",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "Educational documents are authenticated by the respective State HRD (mandatory for ICP Golden Visa / MOE equivalency) or Sub-Divisional Magistrate (SDM). Personal documents undergo Notary + SDM/State Home verification, while commercial documents are endorsed by a recognized Chamber of Commerce.",
      },
      {
        stepNumber: 2,
        title: "Ministry of External Affairs (MEA) Normal Attestation",
        authority: "Ministry of External Affairs, Government of India",
        description:
          "Once preliminary state/SDM/Chamber authentication is complete, the Ministry of External Affairs (MEA) affixes its official Normal Attestation stamp and signature on the document (note: UAE is a non-Hague destination, so Normal Attestation applies instead of an Apostille).",
      },
      {
        stepNumber: 3,
        title: "UAE Embassy Consular Legalization in India",
        authority: "Embassy of the United Arab Emirates, New Delhi / Consular Channel",
        description:
          "The MEA-attested document is submitted through the authorized UAE diplomatic channel in India for official UAE Embassy legalization stamp and security sticker.",
      },
      {
        stepNumber: 4,
        title: "UAE Ministry of Foreign Affairs (MOFA) Attestation",
        authority: "UAE Ministry of Foreign Affairs (MOFA)",
        description:
          "As the final legal step required by UAE employers, MOHRE, ICP immigration, and free zones, the document receives the UAE MOFA attestation stamp for full validity across Dubai, Abu Dhabi, Sharjah, and all Emirates.",
      },
    ],
    faqs: [
      {
        question: "Is an Apostille valid for the United Arab Emirates (UAE)?",
        answer:
          "No. The United Arab Emirates is not a member of the 1961 Hague Apostille Convention. Indian documents intended for use in Dubai, Abu Dhabi, or any Emirate must undergo the full embassy attestation route: State HRD/SDM or Chamber verification, MEA Normal Attestation, UAE Embassy legalization in India, and UAE MOFA attestation.",
      },
      {
        question: "When is State HRD mandatory instead of SDM for UAE degree attestation?",
        answer:
          "While many mainland and free-zone employers accept the SDM + MEA + UAE Embassy + MOFA route for standard work permits, State HRD authentication from the state where your university is located is strictly mandatory when applying for UAE Ministry of Education (MOE) Certificate Equivalency, Golden Visa (ICP) skilled professional categories, and certain regulated healthcare or teaching roles.",
      },
      {
        question: "Do I need original documents for UAE Embassy and MOFA attestation?",
        answer:
          "Yes. Indian State HRD/SDM authorities, the Ministry of External Affairs (MEA), the UAE Embassy in New Delhi, and UAE MOFA only place official attestation stamps on original physical certificates (accompanied by a passport copy of the holder).",
      },
      {
        question: "Which personal documents require UAE attestation for a family residence visa?",
        answer:
          "To sponsor a spouse or children in the UAE, residents must present an attested original Marriage Certificate (for spouse sponsorship) and attested original Birth Certificates (for children) carrying MEA, UAE Embassy, and UAE MOFA stamps.",
      },
    ],
  },

  "saudi-arabia": {
    canonicalSlug: "saudi-arabia",
    priorityOrder: 2,
    isPriority12: true,
    continent: "Middle East & GCC",
    isApostilleMember: true,
    seoTitle: "Saudi Arabia Certificate Attestation & Legalization from India",
    metaDescription:
      "Complete Saudi Arabia certificate attestation, MEA Hague Apostille, Wakala & POA legalization, QVP guidance, and Arabic translation services from India.",
    h1: "Saudi Arabia Certificate Attestation & Legalization from India",
    heroBadge: "Hague Apostille + Specialized Saudi Consular & Wakala Routes",
    featuredCardTitle: "Saudi Arabia",
    featuredCardRouteLabel: "MEA Hague Apostille & Saudi Consular Routes",
    featuredCardDescription:
      "Degree, marriage & birth certificate Apostille, QVP/SCFHS/SCE guidance, Wakala (POA) & Saudi death claim documentation.",
    targetKeywords: [
      "saudi attestation in india",
      "degree attestation for saudi arabia",
      "saudi embassy attestation india",
      "wakala attestation for saudi arabia",
      "marriage certificate attestation for saudi",
    ],
    legalGuidance:
      "Special Powers of Attorney (Wakala), Legal Heirship (Waris) Certificates, Death Claim dossiers, court affidavits, and guardianship documents for Saudi courts, GOSI, and ministries require notarization, certified Arabic translation, SDM/State Home verification, MEA authentication, and—where mandated by Saudi judicial/consular rules—Royal Embassy of Saudi Arabia legalization.",
    supportingDocuments: [
      "Original educational, personal, legal (Wakala/Heirship), or commercial document.",
      "Clear passport copy and Saudi Iqama / Visa copy (if applicable) of the applicant.",
      "All-semester marksheets and University Bonafide / verification details (where State HRD or Cultural Attaché / QVP verification applies).",
      "Certified Arabic translation for Wakala, Legal Heirship, court decrees, and Saudi ministry submissions.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document & Route Assessment (Apostille vs. Consular / QVP)",
        authority: "Issuing State / Regulatory Check",
        description:
          "We verify whether your document qualifies for the standard MEA Hague Apostille route (in force for Saudi Arabia since December 2022) or requires specialized Saudi Embassy / Cultural Attaché / Chamber legalization (such as Wakala, Death Claim files, or specific commercial shipments).",
      },
      {
        stepNumber: 2,
        title: "Preliminary State HRD, SDM, or Chamber Verification",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "Educational degrees are verified via State HRD, e-Sanad, or SDM; personal and civil documents undergo Notary and SDM/State Home verification; commercial documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille or MEA Normal Attestation",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "The Ministry of External Affairs affixes the official Hague Apostille sticker (for standard civil, academic, and corporate documents) or MEA Normal Attestation stamp (for files destined for Saudi Embassy consular legalization).",
      },
      {
        stepNumber: 4,
        title: "Arabic Translation / Saudi Embassy Endorsement (Where Applicable)",
        authority: "Certified Arabic Translator / Royal Embassy of Saudi Arabia, New Delhi",
        description:
          "For Wakala, Legal Heirship, Death Claim files, and specific commercial or non-Apostille consular cases, certified Arabic translations are prepared and processed through the designated Saudi consular channel.",
      },
    ],
    faqs: [
      {
        question: "Does Saudi Arabia accept an MEA Hague Apostille from India?",
        answer:
          "Yes. Saudi Arabia joined the 1961 Hague Apostille Convention effective December 7, 2022. For most standard personal certificates (Birth, Marriage, PCC) and general educational documents, an official MEA Hague Apostille sticker is recognized without routine Saudi Embassy stamping. However, applicants must still comply with Saudi professional verification (such as QVP, SCFHS, or SCE) and specific consular rules for Wakala or death-claim cases.",
      },
      {
        question: "What is QVP (Qualification Verification Program) for Saudi employment visas?",
        answer:
          "Alongside physical degree authentication (HRD/SDM + MEA Apostille), Saudi authorities require many skilled foreign workers to obtain an online Qualification Verification Program (QVP) certificate verifying their academic credentials directly with the issuing university before work visa issuance.",
      },
      {
        question: "How are Wakala (Power of Attorney) and Death Claim documents attested for Saudi Arabia?",
        answer:
          "Saudi Death Claim and compensation files require a coordinated set of documents—including the Legal Heirship Certificate, Special Power of Attorney (Wakala) in favor of a representative in KSA, and family ID proofs—translated into Arabic, authenticated by SDM/State Home and MEA, and processed per Saudi consular and court specifications.",
      },
      {
        question: "Is Arabic translation required for Saudi Arabia documents?",
        answer:
          "While English educational degrees are widely accepted for initial visa processing, Arabic translation is mandatory for Powers of Attorney (Wakala), Legal Heirship Certificates, court affidavits, and documents submitted to Saudi courts or ministries.",
      },
    ],
  },

  qatar: {
    canonicalSlug: "qatar",
    priorityOrder: 3,
    isPriority12: true,
    continent: "Middle East & GCC",
    isApostilleMember: false,
    seoTitle: "Qatar Certificate Attestation from India | Fatima Global Attestation",
    metaDescription:
      "Complete Qatar certificate attestation from India. Degree, bonafide letter, marksheet, birth & marriage certificate attestation via MEA and Qatar Embassy in New Delhi.",
    h1: "Qatar Certificate Attestation from India",
    heroBadge: "Non-Hague Route • State/SDM → MEA → Qatar Embassy → Qatar MOFA",
    featuredCardTitle: "Qatar",
    featuredCardRouteLabel: "State/SDM → MEA → Qatar Embassy → Qatar MOFA",
    featuredCardDescription:
      "Complete 3-document academic set (Degree, Marksheets & Bonafide), personal & commercial attestation via Qatar Embassy New Delhi.",
    targetKeywords: [
      "qatar attestation in india",
      "degree attestation for qatar",
      "qatar embassy attestation india",
      "marriage certificate attestation for qatar",
      "bonafide certificate attestation for qatar",
    ],
    legalGuidance:
      "Powers of Attorney, commercial agency contracts, affidavits, and judicial documents intended for Doha and across the State of Qatar require notarization, preliminary SDM or Chamber of Commerce authentication, MEA Normal Attestation, and Embassy of the State of Qatar consular legalization in New Delhi (often accompanied by certified Arabic translation).",
    supportingDocuments: [
      "For Educational Attestation (Mandatory 3-Document Set): (1) Original Degree/Diploma Certificate, (2) Original Final-Year / Consolidated Marksheet, and (3) Original University Bonafide / Mode-of-Study Certificate confirming full-time regular attendance.",
      "For Personal Attestation: Original Birth Certificate, Marriage Certificate, or PCC plus clear passport copies.",
      "For Commercial Attestation: Original Chamber-attested Commercial Invoice, Certificate of Origin, POA, or Board Resolution.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Preliminary State HRD, SDM, or Chamber Authentication",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "For educational qualifications, all three components of the academic set (Degree + Marksheet + Original Bonafide Certificate) undergo State HRD or SDM verification. Personal documents undergo Notary + SDM/State Home verification; commercial documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 2,
        title: "Ministry of External Affairs (MEA) Normal Attestation",
        authority: "Ministry of External Affairs, Government of India",
        description:
          "Because Qatar is not a member of the Hague Apostille Convention, the Ministry of External Affairs (MEA) affixes its official Normal Attestation ink stamp and signature on each verified document.",
      },
      {
        stepNumber: 3,
        title: "Embassy of the State of Qatar Legalization in New Delhi",
        authority: "Embassy of the State of Qatar, New Delhi",
        description:
          "The MEA-attested originals (including the complete 3-document academic set for degrees) are submitted to the Embassy of the State of Qatar in New Delhi for consular legalization.",
      },
      {
        stepNumber: 4,
        title: "Qatar Ministry of Foreign Affairs (MOFA) Attestation",
        authority: "Ministry of Foreign Affairs, State of Qatar (Doha)",
        description:
          "Upon arrival in Doha, the Qatar-Embassy-legalized documents receive final attestation from the Qatari Ministry of Foreign Affairs (MOFA) for work residency (QID), UPDA/MMUP engineering registration, or family visa sponsorship.",
      },
    ],
    faqs: [
      {
        question: "Why does Qatar require a 3-document set for degree certificate attestation?",
        answer:
          "The Embassy of the State of Qatar in New Delhi and Qatari ministries strictly verify that academic degrees were earned through regular full-time study rather than distance learning. Therefore, degree attestation requires submitting: (1) Original Degree Certificate, (2) Original Final/Consolidated Marksheets, and (3) an Original University Bonafide Certificate explicitly stating the mode of study as Regular.",
      },
      {
        question: "Does Qatar accept an Apostille sticker on Indian documents?",
        answer:
          "No. The State of Qatar is not a signatory to the Hague Apostille Convention. Indian documents intended for Qatar must follow the MEA Normal Attestation + Qatar Embassy legalization + Qatar MOFA attestation chain.",
      },
      {
        question: "Which documents are needed for a Qatar family residence visa?",
        answer:
          "To sponsor a spouse and children in Qatar, applicants typically require an original Marriage Certificate and original Birth Certificates attested by SDM/State Home, MEA India, the Embassy of Qatar in New Delhi, and Qatar MOFA.",
      },
      {
        question: "Do engineers moving to Qatar need State HRD verification?",
        answer:
          "Engineers applying for MMUP / UPDA registration in Qatar should carefully check whether their employer or university pathway requires State HRD verification on the Degree and Marksheets prior to MEA and Qatar Embassy attestation.",
      },
    ],
  },

  kuwait: {
    canonicalSlug: "kuwait",
    priorityOrder: 4,
    isPriority12: true,
    continent: "Middle East & GCC",
    isApostilleMember: false,
    seoTitle: "Kuwait Certificate Attestation from India | Fatima Global Attestation",
    metaDescription:
      "Reliable Kuwait certificate attestation from India for degrees, marriage & birth certificates, PCC, and commercial documents via State HRD/SDM, MEA, and Kuwait Embassy.",
    h1: "Kuwait Certificate Attestation from India",
    heroBadge: "Non-Hague Route • State/SDM → MEA → Kuwait Embassy → Kuwait MOFA",
    featuredCardTitle: "Kuwait",
    featuredCardRouteLabel: "State/SDM → MEA → Kuwait Embassy → Kuwait MOFA",
    featuredCardDescription:
      "Degree, PCC, birth & marriage certificate attestation via MEA and Kuwait Embassy in New Delhi for Visa 18, KSE & family residency.",
    targetKeywords: [
      "kuwait attestation in india",
      "degree attestation for kuwait",
      "kuwait embassy attestation india",
      "marriage certificate attestation for kuwait",
      "pcc attestation for kuwait",
    ],
    legalGuidance:
      "Powers of Attorney (Tawkeel), legal affidavits, heirship certificates, and corporate authorizations intended for Kuwaiti courts or ministries require notarization, SDM/State Home or Chamber verification, certified Arabic translation, MEA Normal Attestation, and Embassy of the State of Kuwait legalization in New Delhi.",
    supportingDocuments: [
      "Original Degree/Diploma Certificate, Marriage Certificate, Birth Certificate, PCC, or Commercial Document.",
      "Clear passport copy of the applicant (and spouse passport copy for Marriage Certificate attestation).",
      "All-year marksheets copy (and NBA/KSE verification details for engineering degrees where applicable).",
      "Kuwait Visa copy / Civil ID copy of sponsor (if requested by the consular submission channel).",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Preliminary State HRD, SDM, or Chamber Verification",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "Educational certificates undergo State HRD or SDM verification (engineers should check Kuwait Society of Engineers / KSE rules). Personal documents (Marriage, Birth, PCC) undergo SDM/State Home verification; commercial documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 2,
        title: "Ministry of External Affairs (MEA) Normal Attestation",
        authority: "Ministry of External Affairs, Government of India",
        description:
          "Because Kuwait is not a party to the Hague Apostille Convention, the Ministry of External Affairs (MEA) authenticates the document with an official Normal Attestation stamp.",
      },
      {
        stepNumber: 3,
        title: "Embassy of the State of Kuwait Legalization in New Delhi",
        authority: "Embassy of the State of Kuwait, New Delhi",
        description:
          "The MEA-attested document (along with required Arabic translations where applicable) is legalized by the Embassy of the State of Kuwait in New Delhi.",
      },
      {
        stepNumber: 4,
        title: "Kuwait Ministry of Foreign Affairs (MOFA) Stamping",
        authority: "Ministry of Foreign Affairs, State of Kuwait",
        description:
          "In Kuwait, the document receives its final endorsement from the Kuwaiti Ministry of Foreign Affairs (MOFA) for Residency (Iqama / Visa 18 or Dependent Visa 22) processing.",
      },
    ],
    faqs: [
      {
        question: "Is an Apostille accepted in Kuwait?",
        answer:
          "No. The State of Kuwait is not a signatory to the 1961 Hague Apostille Convention. Indian documents intended for Kuwait must undergo MEA Normal Attestation followed by legalization at the Embassy of the State of Kuwait in New Delhi and Kuwait MOFA.",
      },
      {
        question: "How is a Police Clearance Certificate (PCC) attested for a Kuwait work visa?",
        answer:
          "For Kuwait employment visa stamping, an original Passport Office (RPO/PSK) Police Clearance Certificate undergoes preliminary authentication, MEA Normal Attestation, and Kuwait Embassy legalization in New Delhi within its validity window.",
      },
      {
        question: "Do engineers moving to Kuwait have special attestation requirements?",
        answer:
          "Yes. Engineers applying for a Kuwait work permit or residency must satisfy Kuwait Society of Engineers (KSE) and Public Authority for Manpower (PAM) requirements, which frequently include State HRD verification on the original engineering degree, NBA accreditation checks, and Kuwait Embassy attestation.",
      },
      {
        question: "Is Arabic translation required for Kuwait Embassy attestation?",
        answer:
          "Arabic translation is frequently required alongside English originals for personal civil documents, Powers of Attorney, and specific Kuwaiti ministry submissions. Our desk coordinates certified English-to-Arabic translation prior to MEA and Embassy submission.",
      },
    ],
  },

  germany: {
    canonicalSlug: "germany",
    priorityOrder: 5,
    isPriority12: true,
    continent: "Europe",
    isApostilleMember: true,
    seoTitle: "Apostille & Document Attestation for Germany from India",
    metaDescription:
      "MEA Hague Apostille & document attestation for Germany from India. Degree, birth & marriage certificate apostille, German translation, and APS/Blue Card guidance.",
    h1: "Apostille & Document Attestation for Germany from India",
    heroBadge: "Hague Apostille Route • APS India & Standesamt Guidance",
    featuredCardTitle: "Germany",
    featuredCardRouteLabel: "MEA Hague Apostille & APS / German Translation",
    featuredCardDescription:
      "Degree, birth & marriage certificate Apostille for EU Blue Card, Opportunity Card (Chancenkarte), family reunion, and German universities.",
    targetKeywords: [
      "apostille for germany from india",
      "german apostille india",
      "degree apostille for germany",
      "birth certificate apostille for germany",
      "marriage certificate apostille for germany",
      "document attestation for germany from india",
    ],
    legalGuidance:
      "Personal Powers of Attorney (Vollmacht), Single Status / Ehefähigkeitszeugnis affidavits, inheritance disclaimers (Erbausschlagung), and commercial register (Handelsregister) authorizations intended for Germany require notarization, SDM/State Home or Chamber verification, and an official MEA Hague Apostille sticker (plus certified German translation).",
    supportingDocuments: [
      "Original Degree/Diploma Certificate, Transcripts, Birth Certificate, Marriage Certificate, PCC, or Commercial Document.",
      "Clear passport copy (front and back) of the document holder.",
      "Note for German Student Visa Applicants: Academic Evaluation Centre (APS India, New Delhi) certification is mandatory for university admission visas.",
      "Note for German Civil Registries (Standesamt): Confirm whether your local Standesamt accepts an MEA Hague Apostille or requests bilateral consular document verification.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Route & Purpose Check (Apostille vs. APS India / Standesamt)",
        authority: "Destination Authority & Visa Subclass Assessment",
        description:
          "We confirm whether your document is for an EU Blue Card, Opportunity Card (Chancenkarte), employment permit, corporate filing, university study (APS India), or local German Standesamt marriage/birth registration.",
      },
      {
        stepNumber: 2,
        title: "Preliminary State HRD, SDM, or Chamber Verification",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "Educational degrees and marksheets are authenticated via SDM or State HRD; Birth, Marriage, and PCC certificates undergo SDM/State Home verification; corporate documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "The Ministry of External Affairs affixes the official computer-generated Hague Apostille sticker with a unique UID and QR code on the reverse of the original document.",
      },
      {
        stepNumber: 4,
        title: "Certified German Translation (Where Required)",
        authority: "Certified / Sworn German Translator",
        description:
          "Where requested by German Ausländerbehörde (foreigners' office), Standesamt, ZAB, or courts, a certified German translation is prepared after the original document has been apostilled.",
      },
    ],
    faqs: [
      {
        question: "Does Germany accept an MEA Hague Apostille on Indian degrees and certificates?",
        answer:
          "Germany is a member of the 1961 Hague Apostille Convention, and an MEA Hague Apostille is widely used for employment visas, EU Blue Cards, Opportunity Cards (Chancenkarte), ZAB Statement of Comparability, and corporate filings. However, student visa applicants must also obtain an APS India certificate, and certain German civil registry offices (Standesamt) may request specific bilateral document verification.",
      },
      {
        question: "What is the difference between MEA Apostille and APS India for Germany?",
        answer:
          "An MEA Hague Apostille is the Government of India's treaty authentication of a public document's signature and seal. APS India (Academic Evaluation Centre, part of the German Embassy in New Delhi) conducts an academic authenticity check required specifically for Indian students applying for German university study visas.",
      },
      {
        question: "Do I need German translation for Birth and Marriage Certificates?",
        answer:
          "Yes. German municipal registration offices (Bürgeramt / Standesamt) and foreigners' authorities (Ausländerbehörde) generally require Birth and Marriage Certificates to be apostilled on the original Indian document and accompanied by a certified German translation.",
      },
      {
        question: "Should I choose State HRD or SDM before MEA Apostille for Germany?",
        answer:
          "Most employment and Blue Card applicants use the SDM + MEA Apostille route unless their specific German university, professional licensing chamber (e.g., Approbation for doctors/nurses), or state authority explicitly requests State HRD authentication.",
      },
    ],
  },

  italy: {
    canonicalSlug: "italy",
    priorityOrder: 6,
    isPriority12: true,
    continent: "Europe",
    isApostilleMember: true,
    seoTitle: "Degree Certificate Apostille for Italy from India",
    metaDescription:
      "Degree certificate apostille for Italy from India, birth & marriage certificate apostille for Nulla Osta family visa, certified Italian translation, and DOV / CIMEA support.",
    h1: "Degree Certificate Apostille for Italy from India",
    heroBadge: "Hague Apostille + Certified Italian Translation & DOV / CIMEA",
    featuredCardTitle: "Italy",
    featuredCardRouteLabel: "State HRD/SDM → MEA Apostille + Italian Translation",
    featuredCardDescription:
      "Degree & transcript Apostille for Italy student visas, DOV / CIMEA, and Birth/Marriage Apostille with Italian translation for Nulla Osta.",
    targetKeywords: [
      "degree apostille for italy",
      "apostille for italy from india",
      "birth certificate apostille for italy",
      "document translation for italy",
      "attestation for italy student visa",
    ],
    legalGuidance:
      "Powers of Attorney (Procura), Single Status Affidavits, Family Composition declarations, and legal Sponsorship/Sponsorship affidavits for Italian Comune (municipalities), Questura, or courts require notarization, SDM/State Home verification, MEA Hague Apostille on the original document, and certified Italian translation.",
    supportingDocuments: [
      "Original Degree Certificate, Official Transcripts / All-Semester Marksheets (for Italy Student Visa / DOV / CIMEA).",
      "Original Birth Certificate, Marriage Certificate, Family Relationship / PCC (for Italy Nulla Osta family reunion or work visa).",
      "Clear passport copy of the applicant (and family sponsor's Permesso di Soggiorno / ID if applicable).",
      "Confirm territorial jurisdiction (Embassy of Italy in New Delhi vs. Consulates in Mumbai, Kolkata, or Bengaluru) for DOV or consular translation legalization.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Preliminary State HRD, SDM, or Chamber Authentication",
        authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
        description:
          "Original educational degrees and transcripts undergo State HRD or SDM verification (depending on Italian Consulate jurisdiction and CIMEA vs. DOV rules). Personal documents (Birth, Marriage, PCC) undergo SDM or State Home verification.",
      },
      {
        stepNumber: 2,
        title: "MEA Hague Apostille on the Original Document",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "The Ministry of External Affairs affixes the official Hague Apostille sticker directly on the original Indian educational, personal, or commercial document.",
      },
      {
        stepNumber: 3,
        title: "Certified English-to-Italian Translation",
        authority: "Authorized / Empaneled Italian Translator",
        description:
          "After the original certificate carries the MEA Apostille sticker, a complete and accurate Italian translation is prepared covering both the certificate text and the Apostille details.",
      },
      {
        stepNumber: 4,
        title: "Translation Apostille / Consular DOV Legalization (As Required)",
        authority: "MEA / Italian Embassy or Consulate (VFS Italy Channel)",
        description:
          "Depending on your university admission notice or Italian Comune / Prefettura instructions, the Italian translation is either apostilled or submitted for consular Declaration of Value (Dichiarazione di Valore — DOV) / translation legalization.",
      },
    ],
    faqs: [
      {
        question: "What is the process for Degree Certificate Apostille for an Italy Student Visa?",
        answer:
          "For Italian university admission and student visas, your original Bachelor's/Master's Degree and official Transcripts must first be authenticated (via State HRD or SDM as specified by your university/consulate) and receive an MEA Hague Apostille sticker. Thereafter, students either obtain a CIMEA Statement of Comparability or apply for a Declaration of Value (DOV) with certified Italian translation through the Italian Embassy/Consulate.",
      },
      {
        question: "Do I need to translate my Birth or Marriage Certificate into Italian before or after the Apostille?",
        answer:
          "Always obtain the MEA Hague Apostille on your original Indian Birth or Marriage Certificate first. Once the original document has been apostilled, the certified Italian translation is prepared so the translation accurately reflects the apostilled original.",
      },
      {
        question: "Is State HRD mandatory for Italy degree apostille, or is SDM accepted?",
        answer:
          "This depends on whether you are applying for a consular Declaration of Value (DOV) under a specific Italian Consulate's territorial jurisdiction (some consulates specify regional State HRD) or using CIMEA / SDM + MEA Apostille as accepted by your Italian university. Our desk verifies your exact university and consular checklist before processing.",
      },
      {
        question: "Which documents are required for an Italy Family Reunification (Nulla Osta) visa?",
        answer:
          "Family reunification applications typically require original Marriage Certificates, Birth Certificates, and family relationship affidavits authenticated with SDM/State Home verification, MEA Hague Apostille, and certified Italian translation.",
      },
    ],
  },

  israel: {
    canonicalSlug: "israel",
    priorityOrder: 7,
    isPriority12: true,
    continent: "Middle East & GCC",
    isApostilleMember: true,
    seoTitle: "Israel Document Attestation from India | Fatima Global Attestation",
    metaDescription:
      "Israel document attestation and MEA Hague Apostille services from India. Fast-track PCC apostille, birth & marriage certificate apostille, single status affidavit, and degree apostille for Israel visas.",
    h1: "Israel Document Attestation & Apostille from India",
    heroBadge: "Hague Apostille Route • RPO PCC, Caregiver/Work B1 & Civil Documents",
    featuredCardTitle: "Israel",
    featuredCardRouteLabel: "MEA Hague Apostille (PCC, Civil & Academic)",
    featuredCardDescription:
      "MEA Hague Apostille for Passport Office PCC, Birth & Marriage Certificates, Single Status Affidavits, and degrees for Israel B/1 & family visas.",
    targetKeywords: [
      "israel apostille india",
      "pcc apostille for israel",
      "birth certificate apostille for israel",
      "marriage certificate apostille for israel",
      "document attestation for israel",
    ],
    legalGuidance:
      "Single Status (Unmarried / Bachelorhood) Affidavits, Relationship Affidavits, Medical Fitness declarations, and Personal Powers of Attorney intended for Israel PIBA (Population and Immigration Authority) or Israeli ministries require notarization, SDM/State Home authentication, and an official MEA Hague Apostille sticker.",
    supportingDocuments: [
      "Original Regional Passport Office (RPO / PSK) Police Clearance Certificate (PCC).",
      "Original Birth Certificate, Marriage Certificate, Single Status Affidavit, or Educational Degree.",
      "Clear passport copy (front and back pages) of the applicant.",
      "Supporting relationship proofs or medical certificate (where required by the Israeli sponsor / PIBA checklist).",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document Inspection & Validity Check",
        authority: "Pre-Submission Verification Desk",
        description:
          "We verify that your Police Clearance Certificate (PCC) is issued by the Regional Passport Office (RPO/PSK) and that Birth, Marriage, or Single Status certificates contain accurate names matching your passport.",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, RPO, or State HRD Authentication",
        authority: "SDM (New Delhi) / State Home Dept / RPO / State HRD",
        description:
          "Personal certificates and affidavits undergo Notary and SDM / State Home verification; RPO-issued PCCs and verified educational certificates are prepared for MEA submission.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Because both India and Israel are contracting parties to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the original document.",
      },
      {
        stepNumber: 4,
        title: "Final Quality Check & Dispatch for Visa Submission",
        authority: "Fatima Global Attestation Documentation Desk",
        description:
          "Your apostilled originals are verified against Israel B/1 Work Visa, Caregiver Visa, Student Visa, or Family Visa checklists and dispatched securely.",
      },
    ],
    faqs: [
      {
        question: "Does Israel require Embassy Attestation or an MEA Hague Apostille?",
        answer:
          "Israel is a member of the 1961 Hague Apostille Convention. Therefore, Indian public documents intended for Israel—including Police Clearance Certificates (PCC), Birth Certificates, Marriage Certificates, Single Status Affidavits, and Educational Degrees—require an official MEA Hague Apostille sticker rather than routine consular legalization.",
      },
      {
        question: "Which Police Clearance Certificate (PCC) is required for an Israel Work or Caregiver Visa?",
        answer:
          "For Israel B/1 work visas and caregiver visas, applicants must obtain a Police Clearance Certificate (PCC) issued by the Regional Passport Office (RPO / Passport Seva Kendra) and have the original PCC authenticated with an MEA Hague Apostille sticker.",
      },
      {
        question: "Are Single Status Affidavits and Birth Certificates required to be apostilled for Israel?",
        answer:
          "Yes. Israeli immigration (PIBA) and consular authorities frequently require an apostilled original Birth Certificate and an apostilled Single Status / Marital Status Affidavit (or Marriage Certificate) alongside the apostilled PCC.",
      },
      {
        question: "Do documents in English need translation for Israel?",
        answer:
          "English documents bearing an MEA Hague Apostille are widely accepted for Israel visa applications in India. If an Israeli municipal court or ministry specifically requests Hebrew translation, confirm with your sponsor before submission.",
      },
    ],
  },

  "united-kingdom": {
    canonicalSlug: "united-kingdom",
    priorityOrder: 8,
    isPriority12: true,
    continent: "Europe",
    isApostilleMember: true,
    seoTitle: "UK Apostille & Document Legalization from India",
    metaDescription:
      "UK Apostille and document legalization services from India. MEA Hague Apostille for degrees, marriage & birth certificates, PCC, and corporate documents for the United Kingdom.",
    h1: "UK Apostille & Document Legalization from India",
    heroBadge: "Hague Apostille Route • Academic, Personal & UK Corporate Filings",
    featuredCardTitle: "United Kingdom (UK)",
    featuredCardRouteLabel: "MEA Hague Apostille (SDM / HRD / Chamber)",
    featuredCardDescription:
      "MEA Hague Apostille for UK Skilled Worker visas, NHS/GMC/NMC healthcare credentials, family visas, and Companies House filings.",
    targetKeywords: [
      "uk apostille from india",
      "degree apostille for uk",
      "birth certificate apostille for uk",
      "marriage certificate apostille for uk",
    ],
    legalGuidance:
      "Personal Powers of Attorney, Probate / Letters of Administration, Legal Heirship documents, affidavits, and UK property/banking authorizations executed in India require notarization, SDM/State Home or Chamber of Commerce verification, and an official MEA Hague Apostille sticker.",
    supportingDocuments: [
      "Original Degree/Diploma Certificate, Marksheets, Birth Certificate, Marriage Certificate, PCC, or Corporate Document.",
      "Clear passport copy of the document holder.",
      "Certified English translation if any part of a regional civil certificate (e.g., Hindi, Punjabi, Gujarati, Tamil) is not in English.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document Review & Translation Check",
        authority: "Pre-Verification Desk",
        description:
          "We check that your original certificate is legible and in English (if a Birth or Marriage Certificate is in an Indian regional language, a certified English translation is prepared first).",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, State HRD, or Chamber Verification",
        authority: "SDM (New Delhi) / State HRD / State Home Dept / Chamber of Commerce",
        description:
          "Educational and personal documents undergo SDM or State HRD/Home verification; commercial and Companies House documents undergo Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Because both India and the United Kingdom are contracting states to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the document.",
      },
      {
        stepNumber: 4,
        title: "Verification & Secure Dispatch",
        authority: "Fatima Global Attestation Documentation Desk",
        description:
          "Your apostilled document is verified for QR/UID accuracy and returned via secure courier in India or internationally to the UK.",
      },
    ],
    faqs: [
      {
        question: "Do Indian documents need British High Commission attestation for the UK?",
        answer:
          "No. Because both India and the United Kingdom are members of the 1961 Hague Apostille Convention, Indian public documents authenticated with an official MEA Hague Apostille sticker are legally recognized in the UK without British High Commission legalization.",
      },
      {
        question: "When is an Apostille required for UK visas or UK employers?",
        answer:
          "An MEA Hague Apostille is commonly requested for UK Spouse/Dependent visas (Marriage and Birth Certificates), UK citizenship/passport registration for children born abroad, background screening by UK employers, probate/property matters, and corporate subsidiary setup.",
      },
      {
        question: "What if my Indian Marriage or Birth Certificate is in a regional language?",
        answer:
          "UK Visas and Immigration (UKVI) and HM Passport Office require all documents not in English or Welsh to be accompanied by a certified English translation. We coordinate certified translation and MEA Hague Apostille for regional certificates.",
      },
      {
        question: "Do doctors and nurses moving to the UK need an Apostille?",
        answer:
          "Healthcare professionals registering with the GMC, NMC, or HCPC primarily complete primary source verification (such as EPIC/ECFMG or direct council verification), and may also request an MEA Hague Apostille on their degree, registration, or PCC/Good Standing certificates for employer onboarding.",
      },
    ],
  },

  "united-states": {
    canonicalSlug: "usa",
    priorityOrder: 9,
    isPriority12: true,
    continent: "North America",
    isApostilleMember: true,
    seoTitle: "USA Apostille & Document Attestation from India",
    metaDescription:
      "USA Apostille and document attestation services from India. MEA Hague Apostille for birth & marriage certificates, degrees, Powers of Attorney, and USCIS certified English translations.",
    h1: "USA Apostille & Document Attestation from India",
    heroBadge: "Hague Apostille Route • Civil, Academic, POA & USCIS Translations",
    featuredCardTitle: "United States (USA)",
    featuredCardRouteLabel: "MEA Hague Apostille & Certified Translation",
    featuredCardDescription:
      "Birth, marriage & degree certificate Apostille, USCIS-compliant English translations, and corporate POA legalization for the USA.",
    targetKeywords: [
      "usa apostille from india",
      "birth certificate apostille for usa",
      "marriage certificate apostille for usa",
      "degree apostille for usa",
    ],
    legalGuidance:
      "Personal Powers of Attorney, Non-Availability of Birth Certificate (NABC) affidavits, Single Status affidavits, estate/probate documents, and corporate resolutions executed in India for use in the United States require notarization, SDM/State Home or Chamber of Commerce verification, and an official MEA Hague Apostille sticker.",
    supportingDocuments: [
      "Original Birth Certificate, Marriage Certificate, Degree/Transcripts, Power of Attorney, or Corporate Document.",
      "Clear passport copy of the document holder.",
      "Complete Certified English Translation if any portion of the Indian certificate is in Hindi or a regional language.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document Review & Regional Language Assessment",
        authority: "Pre-Verification Desk",
        description:
          "We inspect your original Indian certificate. If the certificate contains regional-language entries, a complete certified English translation is prepared per US acceptance standards.",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, State HRD/Home, or Chamber Verification",
        authority: "SDM (New Delhi) / State HRD / State Home Dept / Chamber of Commerce",
        description:
          "Personal and educational documents undergo SDM or State HRD/Home authentication; commercial and corporate documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Because both India and the United States are parties to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the original document.",
      },
      {
        stepNumber: 4,
        title: "Quality Verification & Domestic / International Courier",
        authority: "Fatima Global Attestation Documentation Desk",
        description:
          "Your apostilled documents (and certified translations where applicable) are verified and dispatched across India or to your address in the USA.",
      },
    ],
    faqs: [
      {
        question: "Does the US Embassy in India attest Indian-issued documents?",
        answer:
          "No. U.S. Embassies and Consulates cannot authenticate public documents issued by Indian authorities. Because both India and the United States are members of the 1961 Hague Apostille Convention, an official MEA Hague Apostille sticker is the recognized legal authentication for Indian documents used in the USA.",
      },
      {
        question: "Do I need an Apostille on my Indian Birth or Marriage Certificate for the USA?",
        answer:
          "Yes, when submitting Indian Birth Certificates, Marriage Certificates, or Powers of Attorney for U.S. legal proceedings, state licensing boards, banking/estate matters, or immigration filings requesting authenticated civil records, an MEA Hague Apostille (plus certified English translation if non-English) is standard.",
      },
      {
        question: "What is the difference between an MEA Apostille and WES / NACES evaluation for the USA?",
        answer:
          "An MEA Hague Apostille authenticates the government/university seal on your original Indian degree. A NACES credential evaluation (such as WES or ECE) converts your Indian academic credits into U.S. equivalency for universities or licensing boards. Depending on your U.S. institution, you may need one or both.",
      },
      {
        question: "Can NRIs living in the USA get Indian documents apostilled without traveling to India?",
        answer:
          "Yes. Applicants residing in the United States can courier their original Indian certificates (or have a family member in India send them) to our New Delhi desk, and we coordinate the complete SDM/HRD + MEA Hague Apostille process.",
      },
    ],
  },

  canada: {
    canonicalSlug: "canada",
    priorityOrder: 10,
    isPriority12: true,
    continent: "North America",
    isApostilleMember: true,
    seoTitle: "Canada Apostille & Document Attestation from India",
    metaDescription:
      "Canada Apostille and document attestation from India (Hague Convention effective Jan 2024). MEA Apostille for degrees, birth & marriage certificates, PCC, and POA for Canada.",
    h1: "Canada Apostille & Document Attestation from India",
    heroBadge: "Hague Apostille Route (Effective Jan 11, 2024) • Civil, Academic & POA",
    featuredCardTitle: "Canada",
    featuredCardRouteLabel: "MEA Hague Apostille (Effective Jan 2024)",
    featuredCardDescription:
      "MEA Hague Apostille for Indian degrees, Birth & Marriage Certificates, PCC, and Powers of Attorney for Canadian authorities.",
    targetKeywords: [
      "canada apostille from india",
      "degree attestation for canada",
      "birth certificate apostille for canada",
      "marriage certificate apostille for canada",
    ],
    legalGuidance:
      "Powers of Attorney for Canadian real estate or banking, probate affidavits, statutory declarations, and corporate documents executed in India are authenticated via Notary, SDM/State Home or Chamber of Commerce verification, and an official MEA Hague Apostille sticker.",
    supportingDocuments: [
      "Original Birth Certificate, Marriage Certificate, Degree/Marksheet, Police Clearance Certificate (PCC), or Power of Attorney.",
      "Clear passport copy of the document holder.",
      "Certified English or French translation if the original Indian certificate is in a regional language.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document & Purpose Verification",
        authority: "Pre-Verification Desk",
        description:
          "We review your Indian document and confirm whether you need an MEA Hague Apostille (for Canadian legal, provincial, employer, or civil use) or also need to check separate IRCC ECA rules.",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, State HRD, or Chamber Authentication",
        authority: "SDM (New Delhi) / State HRD / State Home Dept / Chamber of Commerce",
        description:
          "Educational and personal documents undergo SDM or State HRD/Home verification; commercial and corporate documents undergo Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Following Canada's accession to the Hague Apostille Convention on January 11, 2024, the Ministry of External Affairs affixes the official Hague Apostille sticker directly on the document.",
      },
      {
        stepNumber: 4,
        title: "Certified Translation (If Non-English/French) & Dispatch",
        authority: "Authorized Translator & Documentation Desk",
        description:
          "If the document contains regional Indian script, a certified English or French translation is included before secure dispatch.",
      },
    ],
    faqs: [
      {
        question: "Does Canada now accept an MEA Hague Apostille from India?",
        answer:
          "Yes. The 1961 Hague Apostille Convention entered into force for Canada on January 11, 2024. Indian public documents bearing an official MEA Hague Apostille sticker are now recognized in Canada without requiring consular legalization at the High Commission of Canada.",
      },
      {
        question: "Is an MEA Apostille the same as WES / ECA for Canada Express Entry?",
        answer:
          "No. An Educational Credential Assessment (ECA via WES, IQAS, ICAS, etc.) evaluates the Canadian equivalency of your degree for IRCC immigration points, whereas an MEA Hague Apostille legally authenticates the signatures and seals on original Indian certificates (such as Birth, Marriage, POA, PCC, or degrees when requested by Canadian provincial authorities, courts, or employers).",
      },
      {
        question: "Do I need translation for Indian documents used in Canada?",
        answer:
          "Documents issued in English or French do not require translation. Any certificate containing Hindi, Punjabi, Gujarati, or other regional languages must be accompanied by a certified English or French translation.",
      },
      {
        question: "Can a Power of Attorney signed in India be apostilled for use in Canada?",
        answer:
          "Yes. A Power of Attorney executed and notarized in India can undergo SDM verification and receive an MEA Hague Apostille sticker for legal recognition in Canadian provinces.",
      },
    ],
  },

  australia: {
    canonicalSlug: "australia",
    priorityOrder: 11,
    isPriority12: true,
    continent: "Asia-Pacific",
    isApostilleMember: true,
    seoTitle: "Australia Apostille & Document Attestation from India",
    metaDescription:
      "Australia Apostille and document attestation services from India. MEA Hague Apostille for degrees, transcripts, birth & marriage certificates, PCC, and corporate documents.",
    h1: "Australia Apostille & Document Attestation from India",
    heroBadge: "Hague Apostille Route • Academic, Civil & Corporate Authentication",
    featuredCardTitle: "Australia",
    featuredCardRouteLabel: "MEA Hague Apostille (SDM / HRD / Chamber)",
    featuredCardDescription:
      "MEA Hague Apostille for Indian degrees, Birth & Marriage Certificates, PCC, and Powers of Attorney for Australian legal & visa use.",
    targetKeywords: [
      "australia apostille from india",
      "degree apostille for australia",
      "birth certificate apostille for australia",
      "document attestation for australia",
    ],
    legalGuidance:
      "Personal Powers of Attorney, statutory declarations, property transfer authorizations, probate documents, and commercial agreements executed in India for use in Australia require notarization, SDM/State Home or Chamber of Commerce verification, and an official MEA Hague Apostille sticker.",
    supportingDocuments: [
      "Original Degree/Diploma Certificate, Transcripts, Birth Certificate, Marriage Certificate, PCC, or Power of Attorney.",
      "Clear passport copy of the document holder.",
      "Certified English translation if the original certificate contains non-English regional text.",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document & Skills/Authority Requirement Check",
        authority: "Pre-Verification Desk",
        description:
          "We verify your original certificate and confirm whether your Australian employer, court, state registry, or skills body requires an MEA Hague Apostille.",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, State HRD, or Chamber Verification",
        authority: "SDM (New Delhi) / State HRD / State Home Dept / Chamber of Commerce",
        description:
          "Educational and personal documents undergo SDM or State HRD/Home verification; commercial and corporate documents undergo Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker Issuance",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Because both India and Australia are contracting states to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the document.",
      },
      {
        stepNumber: 4,
        title: "Final Verification & Secure Delivery",
        authority: "Fatima Global Attestation Documentation Desk",
        description:
          "The apostilled original document is checked and dispatched to your address in India or Australia.",
      },
    ],
    faqs: [
      {
        question: "Does Australia accept an MEA Hague Apostille on Indian documents?",
        answer:
          "Yes. Both India and the Commonwealth of Australia are members of the 1961 Hague Apostille Convention. Indian public documents carrying an official MEA Hague Apostille sticker are recognized in Australia without requiring High Commission legalization.",
      },
      {
        question: "Which documents commonly require an Apostille for Australia?",
        answer:
          "Commonly apostilled documents for Australia include Birth Certificates, Marriage Certificates, Single Status Affidavits, Police Clearance Certificates, Powers of Attorney for Australian property/legal matters, corporate documents, and original University Degrees when formal legal authentication is requested.",
      },
      {
        question: "Do Australian skills assessment bodies (like VETASSESS, Engineers Australia, or AHPRA) require an Apostille?",
        answer:
          "Many Australian skills assessment portals accept color scans of original documents or certified true copies, while specific legal, court, citizenship, or employer background checks request an MEA Hague Apostille. Always check your assessing authority's current checklist or confirm with our desk.",
      },
      {
        question: "What if my Indian Birth or Marriage Certificate is in Hindi or a regional language?",
        answer:
          "Australian authorities require a complete certified English translation for any document not in English. We coordinate certified English translation and MEA Hague Apostille.",
      },
    ],
  },

  france: {
    canonicalSlug: "france",
    priorityOrder: 12,
    isPriority12: true,
    continent: "Europe",
    isApostilleMember: true,
    seoTitle: "France Apostille & Document Attestation from India",
    metaDescription:
      "France Apostille and document attestation from India. MEA Hague Apostille for birth & marriage certificates, degrees, PCC, and certified French translation services.",
    h1: "France Apostille & Document Attestation from India",
    heroBadge: "Hague Apostille Route + Certified French Translation",
    featuredCardTitle: "France",
    featuredCardRouteLabel: "MEA Hague Apostille + Certified French Translation",
    featuredCardDescription:
      "Birth & marriage certificate Apostille (Acte de Naissance), degree Apostille, PCC, and certified French translation for France.",
    targetKeywords: [
      "france apostille from india",
      "birth certificate apostille for france",
      "degree apostille for france",
      "french document translation india",
    ],
    legalGuidance:
      "Powers of Attorney (Procuration), Single Status / Coutume & Célibat affidavits, PACS/marriage civil dossiers, and inheritance documents intended for French Mairie (town halls), Prefectures, or Notaires require notarization, SDM/State Home verification, an official MEA Hague Apostille sticker, and certified French translation.",
    supportingDocuments: [
      "Original Birth Certificate (for CAF, OFII, Carte de Séjour, or Marriage/PACS in France), Marriage Certificate, PCC, or Degree Certificate.",
      "Clear passport copy of the document holder.",
      "Note on French Municipal Validity: French Mairies and Prefectures often require foreign Birth Certificates and Single Status affidavits to be recently issued/apostilled (confirm your Mairie's recency rule).",
    ],
    stepByStepProcess: [
      {
        stepNumber: 1,
        title: "Document & French Prefecture / Mairie Checklist Review",
        authority: "Pre-Verification Desk",
        description:
          "We verify your original Indian Birth Certificate, Marriage Certificate, PCC, or Degree and check whether your French Prefecture, Mairie, or university specifies any recency or translation rules.",
      },
      {
        stepNumber: 2,
        title: "Preliminary SDM, State HRD, or Chamber Authentication",
        authority: "SDM (New Delhi) / State HRD / State Home Dept / Chamber of Commerce",
        description:
          "Personal civil documents undergo Notary and SDM / State Home verification; educational degrees undergo SDM or State HRD verification; corporate documents receive Chamber of Commerce endorsement.",
      },
      {
        stepNumber: 3,
        title: "MEA Hague Apostille Sticker on the Original Certificate",
        authority: "Ministry of External Affairs (MEA), Government of India",
        description:
          "Because both India and France are parties to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the original document.",
      },
      {
        stepNumber: 4,
        title: "Certified English-to-French Translation",
        authority: "Certified French Translator",
        description:
          "Once the original Indian certificate is apostilled, a certified French translation is prepared (or guidance is provided if your local French Mairie requires a Traducteur Assermenté in France).",
      },
    ],
    faqs: [
      {
        question: "Why do Indian students and residents in France need a Birth Certificate Apostille?",
        answer:
          "In France, an apostilled original Birth Certificate accompanied by a French translation is routinely required after arrival for CAF housing benefits, CPAM social security registration, OFII / Prefecture residence permit renewals (Titre de Séjour), and civil marriage or PACS registration at a French Mairie.",
      },
      {
        question: "Does France require Embassy Attestation or an MEA Hague Apostille?",
        answer:
          "France is a member of the 1961 Hague Apostille Convention. Indian public documents intended for France are authenticated with an official MEA Hague Apostille sticker rather than French Embassy legalization.",
      },
      {
        question: "Should my document be translated into French before or after the MEA Apostille?",
        answer:
          "Always obtain the MEA Hague Apostille on your original Indian certificate first. The French translation is prepared afterward so that both the original document content and the MEA Apostille stamp/sticker are translated into French.",
      },
      {
        question: "Do Indian students applying to French universities need Campus France as well as an Apostille?",
        answer:
          "Yes, students applying for a French long-stay student visa must complete the mandatory Campus France (Études en France) academic interview procedure, and should also carry an apostilled Birth Certificate (plus French translation) and any apostilled academic degrees requested by their French institution.",
      },
    ],
  },
};
