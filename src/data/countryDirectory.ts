/**
 * FATIMA GLOBAL ATTESTATION — Country-Wise Document Legalization & Apostille Directory
 *
 * Official Reference Starting Points:
 * 1. Ministry of External Affairs (MEA), Government of India — Protocol Division Foreign Missions Directory:
 *    https://idprotocolmea.gov.in/meaprotocol/
 * 2. Ministry of External Affairs (MEA) — Apostille & Attestation Official Guide:
 *    https://www.mea.gov.in/apostille-and-attestation.htm
 * 3. Hague Conference on Private International Law (HCCH) — Convention of 5 October 1961 Status Table:
 *    https://www.hcch.net/en/instruments/conventions/status-table/?cid=41
 *
 * STRICT COMPLIANCE POLICY:
 * - Only verified or reliably sourced treaty/procedural rules are stated as Verified/Partially Verified.
 * - Where specific consular legalization rules, submission channels, or mission jurisdiction vary or are not
 *   independently verified, the country is explicitly marked "Route requires confirmation".
 * - Only countries with substantial, verified country-specific procedural guidance are marked `isIndexable: true`.
 * - No unverified government fees, processing times, or outcome guarantees are published.
 */

import {
  type CountryContinent,
  type CountryProcessStep,
  type CountryFaqItem,
  PRIORITY_COUNTRY_ENRICHMENTS,
  COUNTRY_CONTINENT_BY_ISO,
} from "./countryEnrichment.ts";

export type { CountryContinent, CountryProcessStep, CountryFaqItem };

export type DocumentCategoryKey = "personal" | "educational" | "commercial" | "legal";

export type CountryVerificationStatus =
  | "Verified"
  | "Partially Verified"
  | "Route requires confirmation";

export interface CountryOfficialLink {
  title: string;
  authority: string;
  url: string;
}

export interface CountryCategoryGuidance {
  educational: string;
  personal: string;
  commercial: string;
  legal?: string;
}

export interface RawCountryDirectoryEntry {
  slug: string;
  name: string;
  shortName: string;
  aliases: string[];
  isoCode: string;
  firstLetter: string;
  verificationStatus: CountryVerificationStatus;
  routeBadge: string;
  applicableRoutes: string[];
  documentCategories: ("personal" | "educational" | "commercial")[];
  isIndexable: boolean;
  lastCheckedDate: string;
  summary: string;
  routeOverview: string;
  categoryGuidance: CountryCategoryGuidance;
  translationRequirement: string;
  missionNote: string;
  itemsRequiringConfirmation: string[];
  officialLinks: CountryOfficialLink[];
  relatedServiceSlugs: string[];
}

export interface CountryDirectoryEntry extends RawCountryDirectoryEntry {
  canonicalSlug: string;
  priorityOrder?: number;
  isPriority12: boolean;
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
  supportingDocuments: string[];
  stepByStepProcess: CountryProcessStep[];
  faqs: CountryFaqItem[];
}

export function getCountryFlagUrl(isoCode: string, width: 40 | 80 | 160 = 80): string {
  const code = (isoCode || "in").trim().toLowerCase();
  return `https://flagcdn.com/w${width}/${code}.png`;
}

export const MEA_PROTOCOL_REFERENCE_URL =
  "https://idprotocolmea.gov.in/meaprotocol/";
export const MEA_APOSTILLE_REFERENCE_URL =
  "https://www.mea.gov.in/apostille-and-attestation.htm";
export const HCCH_STATUS_TABLE_URL =
  "https://www.hcch.net/en/instruments/conventions/status-table/?cid=41";

const DEFAULT_OFFICIAL_LINKS: CountryOfficialLink[] = [
  {
    title: "MEA Protocol Division — Foreign Diplomatic Missions in India Directory",
    authority: "Ministry of External Affairs, Government of India",
    url: MEA_PROTOCOL_REFERENCE_URL,
  },
  {
    title: "MEA Official Guide to Apostille & Normal Attestation",
    authority: "Ministry of External Affairs, Government of India",
    url: MEA_APOSTILLE_REFERENCE_URL,
  },
  {
    title: "Hague Convention of 5 October 1961 (Apostille) — Official Status Table",
    authority: "Hague Conference on Private International Law (HCCH)",
    url: HCCH_STATUS_TABLE_URL,
  },
];

const RAW_COUNTRY_DIRECTORY: RawCountryDirectoryEntry[] = [
  // ============================================================================
  // 14 SUBSTANTIAL VERIFIED / PARTIALLY VERIFIED COUNTRY PROFILES (INDEXABLE)
  // ============================================================================
  {
    slug: "united-arab-emirates",
    name: "United Arab Emirates (UAE)",
    shortName: "UAE",
    aliases: ["UAE", "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
    isoCode: "AE",
    firstLetter: "U",
    verificationStatus: "Verified",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: [
      "MEA Normal Attestation",
      "Embassy Legalization",
      "Destination MOFA Attestation",
      "Translation (Where Required)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "The UAE is not a signatory to the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Dubai, Abu Dhabi, and across the UAE require state/SDM or Chamber verification, MEA Normal Attestation, UAE Embassy legalization in India, and UAE MOFAIC attestation.",
    routeOverview:
      "Because the United Arab Emirates is outside the 1961 Hague Apostille Convention, an Apostille sticker is not valid for UAE authorities. Instead, Indian documents follow a bilateral diplomatic legalization sequence: preliminary authentication (State HRD, SDM, or Chamber of Commerce depending on document type), Ministry of External Affairs (MEA) Normal Attestation in India, consular legalization at the UAE Embassy / Consulate channel, and final attestation by the UAE Ministry of Foreign Affairs (MOFAIC).",
    categoryGuidance: {
      educational:
        "University degrees, diplomas, and school certificates require preliminary verification (State HRD or SDM route depending on the issuing state and UAE employer/ICP equivalency category), followed by MEA Normal Attestation, UAE Embassy legalization in New Delhi, and UAE MOFAIC attestation.",
      personal:
        "Birth Certificates, Marriage Certificates (for family/dependent visa sponsorship), and Police Clearance Certificates require Notary and SDM / State Home Department verification, MEA Normal Attestation, UAE Embassy legalization, and UAE MOFAIC attestation.",
      commercial:
        "Certificates of Origin, Commercial Invoices, Powers of Attorney, and Board Resolutions require Chamber of Commerce endorsement (and Notary/SDM for POA where applicable), MEA Normal Attestation, and UAE Embassy commercial legalization.",
    },
    translationRequirement:
      "English documents are widely accepted for initial UAE employment and family visa processing; however, legal Powers of Attorney, court filings, or specific UAE federal ministry submissions may require certified Arabic translation.",
    missionNote:
      "Diplomatic representation in India includes the Embassy of the United Arab Emirates in New Delhi (listed in the MEA Protocol Division directory). Note that consular document submissions may operate through designated facilitation centers rather than direct walk-in counters.",
    itemsRequiringConfirmation: [
      "Whether your UAE employer, free-zone authority, or ICP Golden Visa / Equivalency category requires State HRD verification or accepts SDM authentication.",
      "Current UAE Embassy and UAE MOFAIC official consular fee tiers (which differ between personal/educational and commercial documents).",
    ],
    officialLinks: [
      ...DEFAULT_OFFICIAL_LINKS,
      {
        title: "UAE MOFAIC — Official Document Attestation Service Portal",
        authority: "Ministry of Foreign Affairs, United Arab Emirates",
        url: "https://www.mofa.gov.ae/en/Services/attestation-of-official-documents-and-certificates",
      },
    ],
    relatedServiceSlugs: [
      "/uae-attestation-services",
      "/sdm-mea-attestation",
      "/educational-document-attestation",
      "/personal-document-attestation",
      "/chamber-of-commerce-mea-attestation",
    ],
  },
  {
    slug: "saudi-arabia",
    name: "Kingdom of Saudi Arabia (KSA)",
    shortName: "Saudi Arabia",
    aliases: ["KSA", "Saudi", "Riyadh", "Jeddah", "Dammam"],
    isoCode: "SA",
    firstLetter: "S",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille / Specialized Consular Routes",
    applicableRoutes: [
      "Hague Apostille",
      "Preliminary HRD / SDM / Chamber Verification",
      "Arabic Translation (Where Required)",
      "Embassy Legalization (Specific Non-Apostille / Death Claim / Consular Cases)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Saudi Arabia is a contracting party to the 1961 Hague Apostille Convention (effective December 7, 2022). Standard Indian public documents generally follow the MEA Hague Apostille route, though professional licensing (QVP/SCFHS/SCE), Wakala, and death-claim files have specific procedural requirements.",
    routeOverview:
      "Following Saudi Arabia's accession to the Hague Apostille Convention, standard Indian educational and personal public documents bearing an official MEA Hague Apostille sticker generally do not require routine Saudi Embassy legalization for general use. However, depending on your visa category, professional accreditation body (such as QVP — Qualification Verification Program, Saudi Council of Engineers, or SCFHS), or court/ministry submission (such as Wakala or Legal Heirship for death-claim cases), additional verification or certified Arabic translation may apply.",
    categoryGuidance: {
      educational:
        "Degrees and diplomas undergo preliminary State HRD, e-Sanad, or SDM verification followed by MEA Hague Apostille. Employment visa applicants must also verify whether their occupation requires online Qualification Verification Program (QVP) or Saudi Cultural Attaché criteria.",
      personal:
        "Marriage Certificates and Birth Certificates for family residence (Istiqdam) or visit visas undergo SDM / State Home verification followed by MEA Hague Apostille. Legal Heirship, Death Claim dossiers, and Special Powers of Attorney (Wakala) require careful Arabic translation and applicable authentication.",
      commercial:
        "Commercial agreements, Certificates of Origin, and corporate Powers of Attorney require Chamber of Commerce endorsement followed by MEA authentication or Saudi consular/Chamber rules as requested by the Saudi receiving entity.",
    },
    translationRequirement:
      "Arabic translation is frequently required for Powers of Attorney (Wakala), Legal Heirship Certificates, court documents, and specific Saudi ministry filings.",
    missionNote:
      "The Royal Embassy of Saudi Arabia in New Delhi is listed in the official MEA Protocol Division directory. Always confirm whether your specific document category is accepted via direct MEA Hague Apostille or requires designated consular processing.",
    itemsRequiringConfirmation: [
      "Whether your Saudi visa profession mandates Qualification Verification Program (QVP), DataFlow, or State HRD authentication prior to MEA Apostille.",
      "Specific Arabic translation and Wakala formatting requirements for Saudi courts, GOSI, or ministries.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/saudi-arabia-attestation-services",
      "/apostille-services-india",
      "/saudi-arabia-death-claim-assistance",
      "/educational-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "china",
    name: "China (People's Republic of China — Mainland)",
    shortName: "China",
    aliases: ["PRC", "Mainland China", "Beijing", "Shanghai", "Guangzhou"],
    isoCode: "CN",
    firstLetter: "C",
    verificationStatus: "Verified",
    routeBadge: "Special Treaty Exception — Embassy Legalization Required",
    applicableRoutes: [
      "MEA Normal Attestation",
      "Embassy Legalization",
      "Mandarin Chinese Translation",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Important Treaty Exception: Although China acceded to the Hague Apostille Convention in 2023, the Convention is NOT in force between India and Mainland China due to India's formal treaty objection. Indian documents for Mainland China still require MEA Normal Attestation and Chinese Embassy legalization.",
    routeOverview:
      "Do not obtain an MEA Apostille sticker for documents intended for Mainland China. Under Article 12 of the Hague Apostille Convention, the treaty does not apply between India and Mainland China. Consequently, all Indian educational, personal, and commercial documents intended for Mainland China must undergo preliminary state/SDM/Chamber verification, MEA Normal Attestation (ink stamp), and consular legalization by the Embassy of the People's Republic of China in New Delhi (or designated Chinese Visa Application Service Center).",
    categoryGuidance: {
      educational:
        "Original Degree Certificate undergoes State HRD or SDM verification, followed by MEA Normal Attestation and legalization via the Chinese Embassy / CVASC channel in New Delhi for Z-Work Permit or student visa applications.",
      personal:
        "Police Clearance Certificates (Non-Criminal Record), Birth Certificates, and Marriage Certificates require SDM / State Home verification, MEA Normal Attestation, and Chinese Embassy legalization.",
      commercial:
        "Commercial Powers of Attorney, Board Resolutions, and export documents require Chamber of Commerce verification, MEA Normal Attestation, and Chinese Embassy commercial legalization.",
    },
    translationRequirement:
      "Chinese authorities and consular guidelines frequently require certified Mandarin Chinese translations accompanying the English originals.",
    missionNote:
      "The Embassy of the People's Republic of China in New Delhi is listed in the MEA Protocol Division directory. Consular legalization applications are typically lodged through the designated Chinese Visa Application Service Center (CVASC) according to consular jurisdiction.",
    itemsRequiringConfirmation: [
      "Current CVASC / Chinese Embassy appointment availability, photocopy formatting rules, and Mandarin translation specifications.",
      "Note: Hong Kong SAR and Macao SAR have separate treaty arrangements; confirm with our desk if your destination is Hong Kong or Macao rather than Mainland China.",
    ],
    officialLinks: [
      ...DEFAULT_OFFICIAL_LINKS,
      {
        title: "Embassy of the People's Republic of China in India — Official Portal",
        authority: "Embassy of China in New Delhi",
        url: "http://in.china-embassy.gov.cn/eng/",
      },
    ],
    relatedServiceSlugs: [
      "/embassy-legalization-services",
      "/sdm-mea-attestation",
      "/chamber-of-commerce-mea-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "qatar",
    name: "State of Qatar",
    shortName: "Qatar",
    aliases: ["Doha", "State of Qatar"],
    isoCode: "QA",
    firstLetter: "Q",
    verificationStatus: "Verified",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: [
      "MEA Normal Attestation",
      "Embassy Legalization",
      "Destination MOFA Attestation",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Qatar is not a member of the Hague Apostille Convention. Indian documents intended for employment, family residency, or business in Doha require MEA Normal Attestation followed by Embassy of Qatar legalization in New Delhi and Qatar MOFA attestation.",
    routeOverview:
      "Because the State of Qatar is not a signatory to the Hague Apostille Convention, Indian documents must complete multi-stage consular legalization. Notably, for educational degree attestation, Qatari consular and ministry guidelines typically require a complete academic set (Degree Certificate, Consolidated/Final Marksheets, and an original University Bonafide / Mode-of-Study Letter confirming regular full-time attendance).",
    categoryGuidance: {
      educational:
        "Requires the complete 3-document academic set (Degree + Marksheets + University Bonafide Certificate confirming regular study mode) verified via State HRD or SDM, followed by MEA Normal Attestation and Embassy of Qatar legalization in New Delhi.",
      personal:
        "Marriage Certificates and Birth Certificates for Qatar family residence visas require Notary, SDM / State Home verification, MEA Normal Attestation, and Embassy of Qatar legalization.",
      commercial:
        "Commercial contracts, Powers of Attorney, and export certificates require Chamber of Commerce endorsement, MEA Normal Attestation, and Embassy of Qatar commercial legalization.",
    },
    translationRequirement:
      "Arabic translation may be required for specific legal Powers of Attorney, commercial contracts, or Qatari ministry filings.",
    missionNote:
      "The Embassy of the State of Qatar in New Delhi is listed in the official MEA Protocol Division directory. Not all consular offices process walk-in legalization directly; supporting academic bonafide rules are strictly enforced.",
    itemsRequiringConfirmation: [
      "Exact format of the University Bonafide Certificate required for your specific degree and university.",
      "Current Embassy of Qatar consular fee schedule for single vs. multi-document academic sets.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/embassy-legalization-services",
      "/sdm-mea-attestation",
      "/educational-document-attestation",
      "/personal-document-attestation",
    ],
  },
  {
    slug: "kuwait",
    name: "State of Kuwait",
    shortName: "Kuwait",
    aliases: ["Kuwait City", "State of Kuwait"],
    isoCode: "KW",
    firstLetter: "K",
    verificationStatus: "Verified",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: [
      "MEA Normal Attestation",
      "Embassy Legalization",
      "Arabic Translation (Where Required)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Kuwait is not a party to the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Kuwait require preliminary state/SDM/Chamber verification, MEA Normal Attestation, and Embassy of Kuwait legalization in New Delhi.",
    routeOverview:
      "An Apostille sticker is not valid in the State of Kuwait. Documents issued in India must be authenticated through the appropriate preliminary authority (State HRD, SDM, or Chamber of Commerce), attested by the Ministry of External Affairs (MEA) with a Normal Attestation stamp, and legalized by the Embassy of the State of Kuwait in New Delhi, followed by Kuwait MOFA upon arrival.",
    categoryGuidance: {
      educational:
        "Engineering, healthcare, and general degree certificates require preliminary State HRD or SDM verification, MEA Normal Attestation, and Kuwait Embassy legalization. Technical professions should also check Kuwait Society of Engineers (KSE) accreditation rules.",
      personal:
        "Marriage Certificates, Birth Certificates, and Police Clearance Certificates for Kuwait residency (Iqama) require SDM / State Home verification, MEA Normal Attestation, and Kuwait Embassy legalization.",
      commercial:
        "Commercial invoices, Certificates of Origin, and corporate agency agreements require Chamber of Commerce endorsement, MEA Normal Attestation, and Kuwait Embassy legalization.",
    },
    translationRequirement:
      "Arabic translation is commonly required alongside English originals for Kuwaiti consular and ministry submissions.",
    missionNote:
      "The Embassy of the State of Kuwait in New Delhi is listed in the MEA Protocol Division directory. Submissions generally take place through authorized consular channels.",
    itemsRequiringConfirmation: [
      "Whether your Kuwaiti employer or accrediting body (such as KSE for engineers) mandates State HRD verification from the issuing state.",
      "Whether an accompanying Arabic translation must be attested together with the English original.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/embassy-legalization-services",
      "/sdm-mea-attestation",
      "/educational-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "germany",
    name: "Federal Republic of Germany",
    shortName: "Germany",
    aliases: ["Deutschland", "Berlin", "Munich", "Frankfurt"],
    isoCode: "DE",
    firstLetter: "G",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille / Specialized Verification Notes",
    applicableRoutes: [
      "Hague Apostille",
      "APS India Academic Verification (Student Route)",
      "German Translation (Where Required)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Germany is a member of the Hague Apostille Convention, while also maintaining specific bilateral verification requirements in India (such as APS India for student visas and specific embassy verification rules for certain civil registers).",
    routeOverview:
      "For many general and employment purposes (such as EU Blue Card, Opportunity Card / Chancenkarte, or corporate filings), Indian documents are authenticated via the MEA Hague Apostille route. However, students applying for German university visas must complete academic verification through the Academic Evaluation Centre (APS India, New Delhi), and certain German civil registry offices (Standesamt) have specific rules regarding Indian civil status documents.",
    categoryGuidance: {
      educational:
        "Degrees and transcripts for employment or Blue Card routes typically undergo SDM or State HRD verification followed by MEA Hague Apostille (plus Anabin/ZAB check). Student visa applicants must check APS India requirements.",
      personal:
        "Birth Certificates, Marriage Certificates, and Police Clearance Certificates undergo SDM / State Home verification and MEA Hague Apostille; however, check with the receiving German Standesamt or Ausländerbehörde if bilateral document verification applies.",
      commercial:
        "Corporate Powers of Attorney, Handelsregister filings, and commercial documents undergo Chamber of Commerce verification and MEA Hague Apostille.",
    },
    translationRequirement:
      "German civil registries and courts frequently require certified German translations (often by a sworn translator — vereidigter Übersetzer).",
    missionNote:
      "The Embassy of the Federal Republic of Germany in New Delhi and German Consulates General (Mumbai, Bengaluru, Chennai, Kolkata) are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your German university, employer, or ZAB/APS pathway requires APS India certification in addition to or instead of Apostille.",
      "Whether the local German Standesamt accepts an MEA Apostille on civil certificates or requests consular verification.",
    ],
    officialLinks: [
      ...DEFAULT_OFFICIAL_LINKS,
      {
        title: "German Missions in India — Official Consular & Visa Information",
        authority: "Federal Foreign Office, Germany",
        url: "https://india.diplo.de/",
      },
    ],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/sdm-apostille-services",
      "/educational-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "italy",
    name: "Italian Republic (Italy)",
    shortName: "Italy",
    aliases: ["Italia", "Rome", "Milan"],
    isoCode: "IT",
    firstLetter: "I",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille + Italian Translation / DOV",
    applicableRoutes: [
      "Hague Apostille",
      "Certified Italian Translation",
      "Embassy / Consular DOV or Translation Legalization (Where Required)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Italy is a member of the Hague Apostille Convention. Indian documents require an MEA Hague Apostille on the original certificate, often followed by certified Italian translation and Declaration of Value (Dichiarazione di Valore — DOV) or CIMEA for academic studies.",
    routeOverview:
      "For use in Italy, Indian educational, personal, and commercial documents must first receive preliminary verification (State HRD, SDM, or Chamber of Commerce depending on category and consular jurisdiction) and an official MEA Hague Apostille sticker. For university admissions, municipal family registration (Comune), or Nulla Osta family reunification, documents typically also require an accurate Italian translation and consular translation legalization or Declaration of Value (DOV).",
    categoryGuidance: {
      educational:
        "Original Degree and Transcripts require State HRD or SDM verification (depending on whether the Italian university/consulate specifies regional HRD or accepts CIMEA + SDM) followed by MEA Hague Apostille, Italian translation, and DOV / CIMEA.",
      personal:
        "Birth Certificates, Marriage Certificates, and Family Composition certificates for Italy family visa (Nulla Osta) require SDM / State Home verification, MEA Hague Apostille, and certified Italian translation.",
      commercial:
        "Corporate Powers of Attorney and commercial export documents require Chamber of Commerce endorsement and MEA Hague Apostille.",
    },
    translationRequirement:
      "Italian authorities strictly require certified Italian translation of English/Indian documents after the original document has been apostilled.",
    missionNote:
      "The Embassy of Italy in New Delhi and Consulates General of Italy (Mumbai, Kolkata, Bengaluru) are listed in the MEA Protocol Division directory and operate under strict regional territorial jurisdiction.",
    itemsRequiringConfirmation: [
      "Whether your Italian university accepts CIMEA Statement of Comparability or requires a consular Declaration of Value (DOV) from the Italian Mission covering your state.",
      "Whether the translation itself requires a second Apostille or consular stamp from VFS/Italian Consulate.",
    ],
    officialLinks: [
      ...DEFAULT_OFFICIAL_LINKS,
      {
        title: "Embassy of Italy in New Delhi — Official Consular Portal",
        authority: "Ministry of Foreign Affairs and International Cooperation, Italy",
        url: "https://ambnewdelhi.esteri.it/",
      },
    ],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/educational-document-attestation",
      "/personal-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    shortName: "Canada",
    aliases: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    isoCode: "CA",
    firstLetter: "C",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: [
      "Hague Apostille",
      "Preliminary SDM / State HRD / Chamber Verification",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Canada joined the Hague Apostille Convention on January 11, 2024. Indian public documents intended for Canadian authorities now follow the MEA Hague Apostille route rather than High Commission consular legalization.",
    routeOverview:
      "Since the 1961 Hague Apostille Convention entered into force for Canada on January 11, 2024, Indian public documents (birth, marriage, police clearance, educational, and corporate documents) authenticated with an official MEA Hague Apostille sticker are recognized in Canada without requiring legalization at the High Commission of Canada.",
    categoryGuidance: {
      educational:
        "Degrees and marksheets requiring authentication undergo SDM or State HRD verification followed by MEA Hague Apostille. Note: For IRCC Express Entry immigration points, applicants must still check Educational Credential Assessment (ECA via WES/IQAS/ICAS) rules separately.",
      personal:
        "Birth Certificates, Marriage Certificates, Police Clearance Certificates, and Personal Powers of Attorney undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial:
        "Corporate Powers of Attorney, Board Resolutions, and commercial agreements undergo Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement:
      "Documents in English or French do not require translation. Documents in Indian regional languages require a certified English or French translation prior to authentication.",
    missionNote:
      "The High Commission of Canada in New Delhi is listed in the MEA Protocol Division directory; following Canada's accession to the Apostille Convention, routine Indian document authentication is completed via MEA Apostille.",
    itemsRequiringConfirmation: [
      "Whether your Canadian institution requires an Educational Credential Assessment (ECA) directly from the issuing university in addition to or instead of an MEA Apostille.",
    ],
    officialLinks: [
      ...DEFAULT_OFFICIAL_LINKS,
      {
        title: "Global Affairs Canada — Apostille Convention Official Notice",
        authority: "Government of Canada",
        url: "https://www.international.gc.ca/gac-amc/about-a_propos/services/authentication-authentification/apostille-convention.aspx?lang=eng",
      },
    ],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/sdm-apostille-services",
      "/educational-document-attestation",
      "/personal-document-attestation",
    ],
  },
  {
    slug: "oman",
    name: "Sultanate of Oman",
    shortName: "Oman",
    aliases: ["Muscat", "Sultanate of Oman"],
    isoCode: "OM",
    firstLetter: "O",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: [
      "Hague Apostille",
      "Preliminary SDM / State HRD / Chamber Verification",
      "Embassy / Commercial Endorsement (Specific Commercial Cases)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Oman is a member of the Hague Apostille Convention. Indian educational and personal documents intended for Muscat and across Oman are generally authenticated via the MEA Hague Apostille route.",
    routeOverview:
      "Unlike several neighboring Gulf states, the Sultanate of Oman is a contracting party to the 1961 Hague Apostille Convention. As a result, Indian educational degrees and personal civil certificates (such as Birth and Marriage Certificates) are typically authenticated with an official MEA Hague Apostille sticker following preliminary SDM or State HRD verification.",
    categoryGuidance: {
      educational:
        "University degrees and diplomas undergo State HRD or SDM verification followed by MEA Hague Apostille for Oman employment visas and professional licensing.",
      personal:
        "Marriage Certificates and Birth Certificates for Oman family joining visas undergo Notary and SDM / State Home verification followed by MEA Hague Apostille.",
      commercial:
        "Commercial invoices, Certificates of Origin, and agency agreements undergo Chamber of Commerce verification and MEA Apostille / Attestation (confirm with your Omani buyer/customs whether additional consular endorsement is requested).",
    },
    translationRequirement:
      "English documents are widely accepted for visa processing, though court powers of attorney or specific ministry filings in Oman may require Arabic translation.",
    missionNote:
      "The Embassy of the Sultanate of Oman in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Omani employer or licensing body (e.g., Oman Medical Specialty Board / DataFlow) specifies State HRD verification prior to MEA Apostille.",
      "Whether commercial shipment invoices require consular endorsement in addition to Chamber + MEA authentication.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/sdm-apostille-services",
      "/educational-document-attestation",
      "/personal-document-attestation",
    ],
  },
  {
    slug: "united-states",
    name: "United States of America (USA)",
    shortName: "USA",
    aliases: ["US", "USA", "United States", "America", "New York", "California", "Texas"],
    isoCode: "US",
    firstLetter: "U",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: [
      "Hague Apostille",
      "Preliminary SDM / State HRD / Chamber Verification",
      "Certified English Translation (If Non-English)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "The United States is a member of the Hague Apostille Convention. Indian public documents intended for use in the USA are authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    routeOverview:
      "Because both India and the United States are parties to the 1961 Hague Apostille Convention, Indian documents intended for US legal, corporate, academic, or immigration proceedings do not require US Embassy legalization. Instead, they are authenticated with an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational:
        "Degrees, diplomas, and transcripts requiring legal authentication undergo SDM or State HRD verification followed by MEA Hague Apostille.",
      personal:
        "Birth Certificates, Marriage Certificates, Single Status Affidavits, and Personal Powers of Attorney undergo Notary and SDM / State Home verification followed by MEA Hague Apostille.",
      commercial:
        "Corporate Powers of Attorney, Board Resolutions, and commercial agreements undergo Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement:
      "Any document containing text in an Indian regional language (such as Hindi, Punjabi, Gujarati, Tamil, Telugu, or Urdu) must be accompanied by a complete certified English translation for USCIS or US legal acceptance.",
    missionNote:
      "The Embassy of the United States of America in New Delhi and US Consulates in India are listed in the MEA Protocol Division directory. Note that US embassies do not authenticate Indian-issued public documents; MEA Hague Apostille is the applicable treaty procedure.",
    itemsRequiringConfirmation: [
      "Whether your US university or licensing board requires a NACES credential evaluation (such as WES or ECE) in addition to or instead of an Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/sdm-apostille-services",
      "/personal-document-attestation",
      "/chamber-of-commerce-apostille",
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom (UK)",
    shortName: "United Kingdom",
    aliases: ["UK", "Great Britain", "England", "Scotland", "Wales", "London"],
    isoCode: "GB",
    firstLetter: "U",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: [
      "Hague Apostille",
      "Preliminary SDM / State HRD / Chamber Verification",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "The United Kingdom is a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for the UK are authenticated via the MEA Hague Apostille route.",
    routeOverview:
      "Since both India and the United Kingdom are contracting states to the 1961 Hague Apostille Convention, Indian public documents bearing an official MEA Hague Apostille sticker are recognized in the UK without requiring legalization by the British High Commission.",
    categoryGuidance: {
      educational:
        "University degrees, medical/nursing qualifications, and transcripts undergo SDM or State HRD verification followed by MEA Hague Apostille.",
      personal:
        "Birth Certificates, Marriage Certificates, Police Clearance Certificates, and legal affidavits undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial:
        "Corporate Powers of Attorney, Companies House supporting filings, and commercial documents undergo Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement:
      "Documents issued in English do not require translation. Regional-language certificates require a certified English translation prior to authentication.",
    missionNote:
      "The British High Commission in New Delhi is listed in the MEA Protocol Division directory; routine authentication of Indian documents for the UK is completed via MEA Hague Apostille.",
    itemsRequiringConfirmation: [
      "Whether your UK professional regulator (such as GMC, NMC, or Ecctis) requires direct institutional verification alongside apostilled certificates.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/sdm-apostille-services",
      "/educational-document-attestation",
      "/personal-document-attestation",
    ],
  },
  {
    slug: "portugal",
    name: "Portuguese Republic (Portugal)",
    shortName: "Portugal",
    aliases: ["Lisbon", "Porto", "Portuguese Republic"],
    isoCode: "PT",
    firstLetter: "P",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille + Portuguese Translation",
    applicableRoutes: [
      "Hague Apostille",
      "Certified Portuguese Translation",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Portugal is a member of the Hague Apostille Convention. Indian documents such as Police Clearance Certificates (PCC), Birth/Marriage Certificates, and degrees require an MEA Hague Apostille, often accompanied by certified Portuguese translation.",
    routeOverview:
      "For Portugal national visas (work, job-seeker, study, D7/D8 residency) and citizenship/civil registrations, Indian public documents must be authenticated with an official MEA Hague Apostille sticker. Applicants should pay close attention to document validity windows—for example, Portuguese immigration authorities generally require a Police Clearance Certificate (PCC) to be issued within 90 days of submission.",
    categoryGuidance: {
      educational:
        "Degrees and diplomas undergo SDM or State HRD verification followed by MEA Hague Apostille.",
      personal:
        "Police Clearance Certificates (RPO/PSK issued), Birth Certificates, and Marriage Certificates undergo SDM / State Home or RPO verification followed by MEA Hague Apostille.",
      commercial:
        "Powers of Attorney (Procuração) and corporate documents undergo Chamber of Commerce / SDM verification and MEA Hague Apostille.",
    },
    translationRequirement:
      "Portuguese consular and AIMA/civil registry submissions frequently require certified Portuguese translation after the original document is apostilled.",
    missionNote:
      "The Embassy of Portugal in New Delhi and the Consulate General of Portugal in Goa are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Portuguese visa category or lawyer requires the Portuguese translation itself to also carry a separate Apostille.",
      "Ensuring your Police Clearance Certificate (PCC) is within the strict 90-day validity window before visa submission.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/personal-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "spain",
    name: "Kingdom of Spain",
    shortName: "Spain",
    aliases: ["Madrid", "Barcelona", "España"],
    isoCode: "ES",
    firstLetter: "S",
    verificationStatus: "Verified",
    routeBadge: "Hague Apostille + Spanish Translation",
    applicableRoutes: [
      "Hague Apostille",
      "Spanish Translation (Traducción Jurada)",
    ],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Spain is a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Spain require an MEA Hague Apostille sticker and typically a certified Spanish translation.",
    routeOverview:
      "For Spanish work permits, student visas, family reunification, residency, or civil marriage/birth registration, Indian original documents must first be authenticated with an official MEA Hague Apostille sticker. Once apostilled, documents intended for Spanish ministries or consular offices generally require translation into Spanish.",
    categoryGuidance: {
      educational:
        "Academic degrees and transcripts for Spanish university admission or Homologación undergo State HRD or SDM verification followed by MEA Hague Apostille.",
      personal:
        "Police Clearance Certificates (PCC), Medical Fitness Certificates, Birth Certificates, and Marriage Certificates undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial:
        "Corporate Powers of Attorney (Poder Notarial) and commercial documents undergo Chamber of Commerce verification and MEA Hague Apostille.",
    },
    translationRequirement:
      "Spanish authorities generally mandate a Spanish Sworn Translation (Traducción Jurada) or consular-verified Spanish translation performed after the MEA Apostille is affixed.",
    missionNote:
      "The Embassy of Spain in New Delhi and the Consulate General of Spain in Mumbai are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Spanish receiving authority requires a Traducción Jurada registered with the Spanish Ministry (MAEC) or a translation legalized at the Spanish Consulate.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/apostille-services-india",
      "/personal-document-attestation",
      "/educational-document-attestation",
      "/document-translation-services",
    ],
  },
  {
    slug: "egypt",
    name: "Arab Republic of Egypt",
    shortName: "Egypt",
    aliases: ["Cairo", "Alexandria", "Arab Republic of Egypt"],
    isoCode: "EG",
    firstLetter: "E",
    verificationStatus: "Verified",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: [
      "MEA Normal Attestation",
      "Embassy Legalization",
      "Chamber of Commerce / SDM Verification",
    ],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: true,
    lastCheckedDate: "2025-02-15",
    summary:
      "Egypt is not a party to the Hague Apostille Convention. Indian commercial export documents, educational certificates, and personal records intended for Egypt require MEA Normal Attestation and legalization by the Embassy of Egypt in New Delhi.",
    routeOverview:
      "Because the Arab Republic of Egypt is not a member of the 1961 Hague Apostille Convention, Indian documents intended for Egyptian customs, ministries, or employers must follow the bilateral consular legalization chain: preliminary verification (Chamber of Commerce for export/commercial documents, or SDM/HRD for personal/educational certificates), MEA Normal Attestation, and Embassy of Egypt legalization in New Delhi.",
    categoryGuidance: {
      educational:
        "Degrees and diplomas require State HRD or SDM verification, MEA Normal Attestation, and Embassy of Egypt consular legalization.",
      personal:
        "Birth Certificates, Marriage Certificates, and PCCs require Notary, SDM / State Home verification, MEA Normal Attestation, and Embassy of Egypt legalization.",
      commercial:
        "Certificates of Origin, Commercial Invoices, Agency Agreements, and Powers of Attorney require Chamber of Commerce endorsement, MEA Normal Attestation, and Embassy of Egypt commercial legalization.",
    },
    translationRequirement:
      "Arabic translation may be required for legal Powers of Attorney, court filings, or specific Egyptian ministry submissions.",
    missionNote:
      "The Embassy of the Arab Republic of Egypt in New Delhi is listed in the official MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Egypt consular fee tiers (especially for high-value commercial export invoices and Certificates of Origin).",
      "Whether Arabic translation is required by your specific Egyptian bank, customs port, or ministry.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: [
      "/chamber-of-commerce-mea-attestation",
      "/embassy-legalization-services",
      "/sdm-mea-attestation",
    ],
  },

  // ============================================================================
  // ADDITIONAL A–Z FOREIGN MISSIONS IN INDIA (MEA PROTOCOL REFERENCE DIRECTORY)
  // Marked with verified treaty context or "Route requires confirmation" and
  // `isIndexable: false` so search engines never index thin pages.
  // ============================================================================
  {
    slug: "afghanistan",
    name: "Afghanistan",
    shortName: "Afghanistan",
    aliases: ["Kabul"],
    isoCode: "AF",
    firstLetter: "A",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["Route requires confirmation", "MEA Normal Attestation"],
    documentCategories: ["personal", "educational", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Afghanistan is not a party to the Hague Apostille Convention. Because consular operations and diplomatic legalization procedures require case-by-case confirmation, please contact our desk before submitting documents.",
    routeOverview:
      "Route requires confirmation: Afghanistan is outside the Hague Apostille Convention. Whether a specific Indian personal, educational, or commercial document can currently undergo consular legalization in India depends on active diplomatic mission operations and receiving authority instructions.",
    categoryGuidance: {
      educational: "Route requires confirmation based on current consular submission status and receiving institution requirements.",
      personal: "Route requires confirmation based on current consular submission status and receiving authority requirements.",
      commercial: "Route requires confirmation based on Chamber of Commerce, MEA, and active mission acceptance.",
    },
    translationRequirement: "Translation requirements (Dari/Pashto/English) require confirmation with the receiving authority.",
    missionNote:
      "Listed in the MEA Protocol Division reference directory. Do not assume active walk-in consular legalization without prior confirmation.",
    itemsRequiringConfirmation: [
      "Current operational status of consular document legalization services in New Delhi.",
      "Whether MEA Normal Attestation alone is accepted by your receiving organization.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation"],
  },
  {
    slug: "algeria",
    name: "People's Democratic Republic of Algeria",
    shortName: "Algeria",
    aliases: ["Algiers"],
    isoCode: "DZ",
    firstLetter: "A",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["personal", "educational", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Algeria is not a member of the Hague Apostille Convention. Indian documents generally require MEA Normal Attestation and consular legalization, subject to current Embassy of Algeria requirements in New Delhi.",
    routeOverview:
      "Because Algeria is not a contracting state to the 1961 Hague Apostille Convention, an Apostille sticker does not apply. Documents typically follow preliminary SDM/HRD/Chamber verification and MEA Normal Attestation, with specific Embassy of Algeria consular submission rules, French/Arabic translation needs, and supporting documents confirmed per case.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + Embassy of Algeria confirmation.",
      personal: "Notary + SDM / State Home verification + MEA Normal Attestation + Embassy of Algeria confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Algeria commercial legalization confirmation.",
    },
    translationRequirement: "French or Arabic translation requirements should be confirmed based on the receiving Algerian authority.",
    missionNote: "The Embassy of the People's Democratic Republic of Algeria in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Exact supporting documents, French/Arabic translation rules, and current consular submission schedule at the Embassy of Algeria.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "argentina",
    name: "Argentine Republic (Argentina)",
    shortName: "Argentina",
    aliases: ["Buenos Aires"],
    isoCode: "AR",
    firstLetter: "A",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Spanish Translation (Where Required)"],
    documentCategories: ["personal", "educational", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Argentina is a contracting party to the 1961 Hague Apostille Convention. Indian public documents generally follow the MEA Hague Apostille route; any additional Spanish translation or consular requirements require confirmation.",
    routeOverview:
      "Both India and Argentina are parties to the Hague Apostille Convention. Indian educational, personal, and commercial documents generally undergo preliminary verification (SDM, State HRD, or Chamber of Commerce) followed by an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Spanish translation requirements should be confirmed with the receiving authority in Argentina.",
    missionNote: "The Embassy of the Argentine Republic in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether the receiving Argentine authority requires Spanish translation by a certified Public Translator (Traductor Público) in Argentina or prior to submission.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/document-translation-services"],
  },
  {
    slug: "australia",
    name: "Commonwealth of Australia",
    shortName: "Australia",
    aliases: ["Sydney", "Melbourne", "Brisbane", "Perth"],
    isoCode: "AU",
    firstLetter: "A",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Preliminary SDM / State HRD / Chamber Verification"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Australia is a contracting party to the 1961 Hague Apostille Convention. Where formal authentication of Indian public documents is requested for Australia, the MEA Hague Apostille route applies.",
    routeOverview:
      "Because both India and Australia are members of the Hague Apostille Convention, Indian documents requiring formal authentication for Australian legal, corporate, or immigration purposes follow the MEA Hague Apostille pathway without requiring High Commission legalization.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille (confirm if your skills assessment body requires Apostille).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Documents in English do not require translation; regional-language certificates require certified English translation.",
    missionNote: "The Australian High Commission in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Australian visa subclass or skills assessment authority (e.g., VETASSESS, Engineers Australia, AHPRA) requires an MEA Apostille or accepts certified scans.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/educational-document-attestation"],
  },
  {
    slug: "austria",
    name: "Republic of Austria",
    shortName: "Austria",
    aliases: ["Vienna", "Österreich"],
    isoCode: "AT",
    firstLetter: "A",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "German Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Austria is a contracting party to the Hague Apostille Convention. Indian public documents generally follow the MEA Hague Apostille route; specific Red-White-Red Card or university requirements should be confirmed.",
    routeOverview:
      "India and Austria are both parties to the 1961 Hague Apostille Convention. Indian educational, personal, and commercial documents generally undergo preliminary verification followed by an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Certified German translation may be required by Austrian magistrates (MA 35) or universities.",
    missionNote: "The Austrian Embassy in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Austrian university or residence authority requires State HRD verification prior to MEA Apostille and certified German translation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/document-translation-services"],
  },
  {
    slug: "bahrain",
    name: "Kingdom of Bahrain",
    shortName: "Bahrain",
    aliases: ["Manama"],
    isoCode: "BH",
    firstLetter: "B",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Preliminary SDM / State HRD / Chamber Verification"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Bahrain is a contracting party to the 1961 Hague Apostille Convention. Indian educational and personal documents generally follow the MEA Hague Apostille route; commercial or employer-specific consular requirements should be confirmed.",
    routeOverview:
      "As a member of the Hague Apostille Convention, Bahrain recognizes Indian public documents authenticated with an official MEA Hague Apostille sticker. However, certain employers, ministries, or commercial import transactions may specify whether State HRD or additional consular endorsement is requested.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Apostille / Attestation (confirm commercial consular requirements).",
    },
    translationRequirement: "English is widely used for visa documents; Arabic translation may be required for legal POAs or court filings.",
    missionNote: "The Embassy of the Kingdom of Bahrain in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Bahraini employer or commercial buyer accepts MEA Hague Apostille directly or requests Embassy endorsement.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/educational-document-attestation"],
  },
  {
    slug: "bangladesh",
    name: "People's Republic of Bangladesh",
    shortName: "Bangladesh",
    aliases: ["Dhaka"],
    isoCode: "BD",
    firstLetter: "B",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["Route requires confirmation", "Hague Apostille / High Commission Confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Bangladesh has recently acceded to the Hague Apostille Convention framework; however, whether your specific receiving authority in Bangladesh accepts an MEA Apostille or requires High Commission attestation must be confirmed before processing.",
    routeOverview:
      "Route requires confirmation: Due to recent treaty transition updates involving Bangladesh, our documentation desk verifies whether your specific receiving ministry, university, bank, or customs authority in Bangladesh requires an MEA Hague Apostille or High Commission legalization.",
    categoryGuidance: {
      educational: "Route requires confirmation (SDM/HRD + MEA Apostille vs. High Commission attestation).",
      personal: "Route requires confirmation (SDM + MEA Apostille vs. High Commission attestation).",
      commercial: "Route requires confirmation (Chamber of Commerce + MEA authentication + commercial legalization check).",
    },
    translationRequirement: "English documents are generally accepted; confirm any Bengali translation requirements with the receiving entity.",
    missionNote: "The High Commission for the People's Republic of Bangladesh in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether the receiving authority in Bangladesh currently accepts MEA Hague Apostille or requires High Commission legalization.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/apostille-services-india"],
  },
  {
    slug: "belgium",
    name: "Kingdom of Belgium",
    shortName: "Belgium",
    aliases: ["Brussels", "Antwerp"],
    isoCode: "BE",
    firstLetter: "B",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Translation (French / Dutch / German Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Belgium is a contracting party to the Hague Apostille Convention. Indian public documents require an MEA Hague Apostille sticker; language translation (French, Dutch, or German) depends on the receiving Belgian municipality.",
    routeOverview:
      "Because India and Belgium are both parties to the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents are authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Belgian communes typically require sworn translation into French, Dutch, or German depending on the region.",
    missionNote: "The Royal Embassy of Belgium in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Official language (Dutch, French, or German) required by your destination municipality in Belgium and whether the translation also needs an Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/document-translation-services"],
  },
  {
    slug: "brazil",
    name: "Federative Republic of Brazil",
    shortName: "Brazil",
    aliases: ["Brasilia", "Sao Paulo", "Rio de Janeiro"],
    isoCode: "BR",
    firstLetter: "B",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Portuguese Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Brazil is a contracting party to the Hague Apostille Convention. Indian documents intended for Brazil follow the MEA Hague Apostille route; sworn Portuguese translation rules in Brazil should be confirmed.",
    routeOverview:
      "Both India and Brazil are members of the 1961 Hague Apostille Convention. Indian documents intended for Brazilian visas, residency, or commercial registration undergo preliminary verification and receive an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Brazilian authorities frequently require a sworn translation (Tradução Juramentada) in Portuguese.",
    missionNote: "The Embassy of the Federative Republic of Brazil in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether Portuguese translation must be performed in Brazil by a Tradutor Público Juramentado after the Indian document is apostilled.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/document-translation-services"],
  },
  {
    slug: "czech-republic",
    name: "Czech Republic (Czechia)",
    shortName: "Czech Republic",
    aliases: ["Czechia", "Prague"],
    isoCode: "CZ",
    firstLetter: "C",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Czech Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "The Czech Republic is a contracting party to the Hague Apostille Convention. Indian documents intended for Employee Cards, Blue Cards, or study in Czechia require an MEA Hague Apostille sticker.",
    routeOverview:
      "Because India and the Czech Republic are parties to the 1961 Hague Apostille Convention, Indian degrees, Police Clearance Certificates, and civil documents are authenticated via preliminary verification and an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille (for Nostrifikace / university recognition).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Czech immigration and university authorities generally require certified Czech translations.",
    missionNote: "The Embassy of the Czech Republic in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Czech university or employer requires State HRD verification prior to MEA Apostille for degree nostrification.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/document-translation-services"],
  },
  {
    slug: "denmark",
    name: "Kingdom of Denmark",
    shortName: "Denmark",
    aliases: ["Copenhagen"],
    isoCode: "DK",
    firstLetter: "D",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Denmark is a contracting party to the Hague Apostille Convention. Indian documents intended for Denmark follow the MEA Hague Apostille route.",
    routeOverview:
      "Both India and Denmark are parties to the 1961 Hague Apostille Convention. Indian educational, personal, and commercial documents undergo preliminary verification followed by an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents are widely accepted by Danish authorities (SIRI / Familieretshuset); regional-language documents require certified English/Danish translation.",
    missionNote: "The Royal Danish Embassy in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Danish receiving authority specifies State Home / HRD verification prior to MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/personal-document-attestation"],
  },
  {
    slug: "ethiopia",
    name: "Federal Democratic Republic of Ethiopia",
    shortName: "Ethiopia",
    aliases: ["Addis Ababa"],
    isoCode: "ET",
    firstLetter: "E",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Ethiopia is not a member of the Hague Apostille Convention. Indian documents intended for Ethiopia generally require MEA Normal Attestation and Embassy of Ethiopia legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because Ethiopia is not a party to the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents typically follow preliminary verification, MEA Normal Attestation, and consular legalization at the Embassy of Ethiopia in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Ethiopia confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Ethiopia confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Ethiopia commercial legalization confirmation.",
    },
    translationRequirement: "English documents are commonly used; confirm any Amharic translation requirement with the receiving entity.",
    missionNote: "The Embassy of the Federal Democratic Republic of Ethiopia in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Ethiopia supporting document checklist and consular fee schedule in New Delhi.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "finland",
    name: "Republic of Finland",
    shortName: "Finland",
    aliases: ["Helsinki"],
    isoCode: "FI",
    firstLetter: "F",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Finland is a contracting party to the Hague Apostille Convention. Indian documents intended for Finland (Migri residence permits, DVV civil registration, or study) follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Finland are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and commercial documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille (for Migri / DVV).",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Documents in English, Finnish, or Swedish are generally accepted; regional-language certificates require certified translation.",
    missionNote: "The Embassy of Finland in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Finnish residence permit or DVV registration requires specific preliminary verification prior to MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/educational-document-attestation"],
  },
  {
    slug: "france",
    name: "French Republic (France)",
    shortName: "France",
    aliases: ["Paris", "Lyon", "Marseille"],
    isoCode: "FR",
    firstLetter: "F",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille + French Translation",
    applicableRoutes: ["Hague Apostille", "Certified French Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "France is a contracting party to the Hague Apostille Convention. Indian documents intended for France require an MEA Hague Apostille sticker and typically a certified French translation for civil or prefecture filings.",
    routeOverview:
      "Both India and France are parties to the 1961 Hague Apostille Convention. Indian Birth Certificates, Marriage Certificates, degrees, and corporate documents are authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille (check Campus France requirements for students).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "French municipal authorities (Mairie) and prefectures typically require translation into French (often by a Traducteur Assermenté).",
    missionNote: "The Embassy of France in New Delhi and French Consulates General in India are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether the receiving French authority requires translation by a court-sworn translator in France (Traducteur Assermenté) after the Indian document is apostilled.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/document-translation-services"],
  },
  {
    slug: "greece",
    name: "Hellenic Republic (Greece)",
    shortName: "Greece",
    aliases: ["Athens"],
    isoCode: "GR",
    firstLetter: "G",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Greek / English Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Greece is a contracting party to the Hague Apostille Convention. Indian documents intended for Greece require an MEA Hague Apostille sticker; Greek translation requirements should be confirmed.",
    routeOverview:
      "Because India and Greece are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and commercial documents undergo preliminary verification and receive an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Official Greek translation requirements should be confirmed based on the receiving Greek authority.",
    missionNote: "The Embassy of Greece in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Greek work visa, Golden Visa, or family application requires Greek translation after MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/document-translation-services"],
  },
  {
    slug: "indonesia",
    name: "Republic of Indonesia",
    shortName: "Indonesia",
    aliases: ["Jakarta", "Bali"],
    isoCode: "ID",
    firstLetter: "I",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Preliminary SDM / State HRD / Chamber Verification"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Indonesia is a contracting party to the Hague Apostille Convention (effective June 2022). Indian public documents intended for Indonesia generally follow the MEA Hague Apostille route; specific commercial or KITAS requirements should be confirmed.",
    routeOverview:
      "Following Indonesia's accession to the 1961 Hague Apostille Convention, Indian educational, personal, and corporate documents are generally authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille (for KITAS work permit).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille (confirm if Indonesian customs/ministry requests any additional consular endorsement).",
    },
    translationRequirement: "Confirm with your Indonesian sponsor whether Bahasa Indonesia translation is required.",
    missionNote: "The Embassy of the Republic of Indonesia in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Indonesian KITAS sponsor or commercial partner accepts MEA Hague Apostille directly or specifies additional translation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/chamber-of-commerce-apostille"],
  },
  {
    slug: "iran",
    name: "Islamic Republic of Iran",
    shortName: "Iran",
    aliases: ["Tehran"],
    isoCode: "IR",
    firstLetter: "I",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Iran is not a member of the Hague Apostille Convention. Indian commercial, educational, and personal documents generally require MEA Normal Attestation and Embassy of Iran legalization; exact consular requirements require confirmation.",
    routeOverview:
      "Because the Islamic Republic of Iran is outside the Hague Apostille Convention, Indian documents intended for use in Iran follow the bilateral attestation chain: preliminary verification (Chamber of Commerce for trade documents or SDM/HRD for personal/academic documents), MEA Normal Attestation, and Embassy of Iran legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + Embassy of Iran confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Iran confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Iran commercial legalization confirmation.",
    },
    translationRequirement: "Persian (Farsi) translation requirements should be confirmed per document type.",
    missionNote: "The Embassy of the Islamic Republic of Iran in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Iran commercial and personal legalization checklist and consular fees.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation", "/sdm-mea-attestation"],
  },
  {
    slug: "iraq",
    name: "Republic of Iraq",
    shortName: "Iraq",
    aliases: ["Baghdad", "Basra", "Erbil"],
    isoCode: "IQ",
    firstLetter: "I",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Iraq is not a party to the Hague Apostille Convention. Indian documents intended for Iraq require MEA Normal Attestation and Embassy of Iraq legalization in New Delhi; supporting paperwork must be confirmed prior to submission.",
    routeOverview:
      "Because Iraq is not a signatory to the 1961 Hague Apostille Convention, an Apostille sticker is not valid for Iraq. Documents undergo preliminary Chamber of Commerce or SDM/HRD verification, MEA Normal Attestation, and consular legalization at the Embassy of the Republic of Iraq in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Iraq confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Iraq confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Iraq commercial legalization confirmation.",
    },
    translationRequirement: "Arabic translation is frequently required for Iraqi ministry and commercial submissions; confirm before processing.",
    missionNote: "The Embassy of the Republic of Iraq in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Iraq supporting document rules, Arabic translation requirements, and commercial invoice fee slabs.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation", "/document-translation-services"],
  },
  {
    slug: "ireland",
    name: "Ireland (Republic of Ireland)",
    shortName: "Ireland",
    aliases: ["Dublin", "Cork"],
    isoCode: "IE",
    firstLetter: "I",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Ireland is a contracting party to the Hague Apostille Convention. Indian documents intended for Ireland follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Ireland are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents do not require translation; regional-language documents require certified English translation.",
    missionNote: "The Embassy of Ireland in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Irish employer, regulator (e.g., NMBI, Medical Council), or immigration office requires an MEA Apostille on your specific certificate.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/educational-document-attestation"],
  },
  {
    slug: "israel",
    name: "State of Israel",
    shortName: "Israel",
    aliases: ["Tel Aviv", "Jerusalem"],
    isoCode: "IL",
    firstLetter: "I",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["personal", "educational", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Israel is a contracting party to the Hague Apostille Convention. Indian public documents (such as PCC, Birth/Marriage Certificates, and degrees) generally require an MEA Hague Apostille sticker.",
    routeOverview:
      "Both India and Israel are members of the 1961 Hague Apostille Convention. Indian public documents intended for B/1 work visas, caregiver visas, student admissions, or civil filings undergo preliminary verification and receive an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Police Clearance Certificates (RPO issued), Birth Certificates, and Marriage Certificates undergo SDM / RPO verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Confirm with your Israeli sponsor or PIBA authority whether English is accepted or Hebrew translation is required.",
    missionNote: "The Embassy of Israel in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Israeli visa category requires RPO-issued PCC with direct MEA Apostille and specific medical/single-status affidavits.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "japan",
    name: "Japan",
    shortName: "Japan",
    aliases: ["Tokyo", "Osaka"],
    isoCode: "JP",
    firstLetter: "J",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Japanese Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Japan is a contracting party to the Hague Apostille Convention. Indian public documents requiring authentication for Japan follow the MEA Hague Apostille route.",
    routeOverview:
      "Because India and Japan are both parties to the 1961 Hague Apostille Convention, Indian educational, personal, and corporate documents requiring legal authentication are processed via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille (for Marriage/Birth registration or Certificate of Eligibility).",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Japanese municipal offices and immigration bureaus often require a Japanese translation attached to the apostilled document.",
    missionNote: "The Embassy of Japan in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Japanese Certificate of Eligibility (COE) or municipal ward office requires an MEA Apostille or standard translation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/document-translation-services"],
  },
  {
    slug: "jordan",
    name: "Hashemite Kingdom of Jordan",
    shortName: "Jordan",
    aliases: ["Amman"],
    isoCode: "JO",
    firstLetter: "J",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Jordan is not a party to the Hague Apostille Convention. Indian documents intended for Jordan generally require MEA Normal Attestation and Embassy of Jordan legalization in New Delhi.",
    routeOverview:
      "Because the Hashemite Kingdom of Jordan is outside the Hague Apostille Convention, Indian documents intended for Jordan follow preliminary SDM/HRD/Chamber verification, MEA Normal Attestation, and Embassy of Jordan consular legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Jordan confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Jordan confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Jordan commercial legalization confirmation.",
    },
    translationRequirement: "Arabic translation requirements should be confirmed based on the receiving Jordanian authority.",
    missionNote: "The Embassy of the Hashemite Kingdom of Jordan in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Jordan supporting document requirements and consular fee schedule.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "kenya",
    name: "Republic of Kenya",
    shortName: "Kenya",
    aliases: ["Nairobi"],
    isoCode: "KE",
    firstLetter: "K",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Kenya is not a member of the Hague Apostille Convention. Indian documents intended for Kenya generally require MEA Normal Attestation and Kenya High Commission legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because Kenya is outside the 1961 Hague Apostille Convention, Indian documents intended for Kenyan work permits, residency, or trade generally undergo preliminary verification, MEA Normal Attestation, and consular authentication via the High Commission of the Republic of Kenya in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Kenya High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Kenya High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Kenya High Commission confirmation.",
    },
    translationRequirement: "English is an official language in Kenya; regional-language Indian documents require certified English translation.",
    missionNote: "The High Commission of the Republic of Kenya in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Kenyan receiving authority accepts MEA Normal Attestation directly or requires Kenya High Commission legalization.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "lebanon",
    name: "Republic of Lebanon",
    shortName: "Lebanon",
    aliases: ["Beirut"],
    isoCode: "LB",
    firstLetter: "L",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Lebanon is not a member of the Hague Apostille Convention. Indian documents intended for Lebanon require MEA Normal Attestation and Embassy of Lebanon legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because Lebanon is outside the Hague Apostille Convention, Indian commercial, educational, and personal documents follow preliminary verification, MEA Normal Attestation, and consular legalization at the Embassy of Lebanon in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Lebanon confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Lebanon confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Lebanon commercial legalization confirmation.",
    },
    translationRequirement: "Arabic or French translation requirements should be confirmed with the receiving authority in Lebanon.",
    missionNote: "The Embassy of Lebanon in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Lebanon consular submission checklist and fee structure in New Delhi.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation", "/sdm-mea-attestation"],
  },
  {
    slug: "libya",
    name: "State of Libya",
    shortName: "Libya",
    aliases: ["Tripoli", "Benghazi"],
    isoCode: "LY",
    firstLetter: "L",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Arabic Translation", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Libya is not a party to the Hague Apostille Convention. Indian documents intended for Libya require MEA Normal Attestation, Arabic translation where applicable, and Embassy of Libya legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because Libya is outside the 1961 Hague Apostille Convention, Indian documents intended for Libya follow preliminary verification, MEA Normal Attestation, and Embassy of the State of Libya consular legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Arabic translation / Embassy of Libya confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Libya confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Libya commercial legalization confirmation.",
    },
    translationRequirement: "Arabic translation is frequently required by Libyan consular and ministry authorities.",
    missionNote: "The Embassy of the State of Libya in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Libya Arabic translation rules, supporting offer/contract requirements, and consular fees.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/document-translation-services", "/sdm-mea-attestation"],
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    shortName: "Malaysia",
    aliases: ["Kuala Lumpur", "Penang", "Johor Bahru"],
    isoCode: "MY",
    firstLetter: "M",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + High Commission Legalization",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Malaysia is not a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Malaysia require MEA Normal Attestation and High Commission of Malaysia authentication in India.",
    routeOverview:
      "Because Malaysia is not a signatory to the 1961 Hague Apostille Convention, an Apostille sticker is not valid for Malaysia. Indian documents intended for Employment Pass (ESD), family dependent visas, university study, or corporate setup undergo preliminary verification (State HRD, SDM, or Chamber of Commerce), MEA Normal Attestation, and legalization at the High Commission of Malaysia in New Delhi (or regional Consulate).",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + High Commission of Malaysia legalization.",
      personal: "Marriage Certificates, Birth Certificates, and Single Status Affidavits require SDM / State Home verification + MEA Normal Attestation + High Commission of Malaysia legalization.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + High Commission of Malaysia commercial legalization.",
    },
    translationRequirement: "English documents are accepted in Malaysia; regional-language Indian certificates require certified English translation.",
    missionNote: "The High Commission of Malaysia in New Delhi (and Consulates General in Mumbai and Chennai) are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Malaysian Employment Pass or EMGS student category mandates State HRD verification prior to MEA and High Commission attestation.",
      "Current High Commission of Malaysia supporting document requirements (such as visa approval letter or passport copies).",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/educational-document-attestation"],
  },
  {
    slug: "maldives",
    name: "Republic of Maldives",
    shortName: "Maldives",
    aliases: ["Male"],
    isoCode: "MV",
    firstLetter: "M",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "The Maldives is not a party to the Hague Apostille Convention. Indian educational and personal documents for work permits in the Maldives typically require preliminary verification and MEA Normal Attestation; confirm whether High Commission endorsement is requested.",
    routeOverview:
      "Route requires confirmation: Because the Republic of Maldives is not a member of the Hague Apostille Convention, Indian documents generally undergo preliminary HRD/SDM verification and MEA Normal Attestation. Whether your employer or regulator (such as Maldives Medical and Dental Council or Ministry of Education) requires additional High Commission or e-Sanad verification should be confirmed.",
    categoryGuidance: {
      educational: "Preliminary HRD, e-Sanad, or SDM verification + MEA Normal Attestation + High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + High Commission confirmation.",
    },
    translationRequirement: "English documents are widely accepted in the Maldives.",
    missionNote: "The High Commission of the Republic of Maldives in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Maldivian employer or licensing council accepts MEA Normal Attestation directly or requires High Commission endorsement.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/sdm-mea-attestation", "/e-sanad-paper-documents", "/educational-document-attestation"],
  },
  {
    slug: "mauritius",
    name: "Republic of Mauritius",
    shortName: "Mauritius",
    aliases: ["Port Louis"],
    isoCode: "MU",
    firstLetter: "M",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Mauritius is a contracting party to the Hague Apostille Convention. Indian public documents intended for Mauritius follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Mauritius are parties to the 1961 Hague Apostille Convention, Indian educational, personal, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English and French documents are accepted in Mauritius.",
    missionNote: "The High Commission of the Republic of Mauritius in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Mauritian employer or Economic Development Board (EDB) specifies any additional preliminary verification.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services"],
  },
  {
    slug: "mexico",
    name: "United Mexican States (Mexico)",
    shortName: "Mexico",
    aliases: ["Mexico City", "Monterrey", "Guadalajara"],
    isoCode: "MX",
    firstLetter: "M",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Spanish Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Mexico is a contracting party to the Hague Apostille Convention. Indian documents intended for Mexico require an MEA Hague Apostille sticker and typically a Spanish translation.",
    routeOverview:
      "Because India and Mexico are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and corporate documents undergo preliminary verification and receive an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Spanish translation by an authorized translator (Perito Traductor) is commonly required in Mexico.",
    missionNote: "The Embassy of Mexico in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether the Spanish translation must be completed in Mexico by a Perito Traductor after the Indian document is apostilled.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/document-translation-services"],
  },
  {
    slug: "morocco",
    name: "Kingdom of Morocco",
    shortName: "Morocco",
    aliases: ["Rabat", "Casablanca"],
    isoCode: "MA",
    firstLetter: "M",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "French / Arabic Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Morocco is a contracting party to the Hague Apostille Convention. Indian public documents generally follow the MEA Hague Apostille route; French or Arabic translation requirements should be confirmed.",
    routeOverview:
      "Because India and Morocco are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "French or Arabic translation requirements should be confirmed with the receiving authority in Morocco.",
    missionNote: "The Embassy of the Kingdom of Morocco in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Moroccan receiving authority requires certified French or Arabic translation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/document-translation-services", "/chamber-of-commerce-apostille"],
  },
  {
    slug: "myanmar",
    name: "Republic of the Union of Myanmar",
    shortName: "Myanmar",
    aliases: ["Yangon", "Naypyidaw"],
    isoCode: "MM",
    firstLetter: "M",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Myanmar is not a party to the Hague Apostille Convention. Indian documents intended for Myanmar generally require MEA Normal Attestation and Embassy of Myanmar legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because Myanmar is outside the Hague Apostille Convention, Indian commercial, educational, and personal documents follow preliminary verification, MEA Normal Attestation, and Embassy of Myanmar consular legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Myanmar confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Myanmar confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Myanmar commercial legalization confirmation.",
    },
    translationRequirement: "English documents are commonly accepted; confirm any Burmese translation requirements with your receiving entity.",
    missionNote: "The Embassy of the Republic of the Union of Myanmar in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Myanmar supporting document checklist and consular fee schedule.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "nepal",
    name: "Federal Democratic Republic of Nepal",
    shortName: "Nepal",
    aliases: ["Kathmandu"],
    isoCode: "NP",
    firstLetter: "N",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Nepal is not a party to the Hague Apostille Convention. Indian documents requiring official authentication for use in Nepal typically follow MEA Normal Attestation and Embassy of Nepal confirmation.",
    routeOverview:
      "Because Nepal is outside the 1961 Hague Apostille Convention, Indian educational, personal, or commercial documents requiring diplomatic authentication undergo preliminary verification and MEA Normal Attestation, with any Embassy of Nepal endorsement confirmed based on the receiving Nepalese authority.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Nepal confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Nepal confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Nepal confirmation.",
    },
    translationRequirement: "English documents are widely accepted in Nepal.",
    missionNote: "The Embassy of Nepal in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your receiving university, ministry, or bank in Nepal requires MEA Normal Attestation alone or Embassy of Nepal endorsement.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/sdm-mea-attestation", "/embassy-legalization-services", "/educational-document-attestation"],
  },
  {
    slug: "netherlands",
    name: "Kingdom of the Netherlands",
    shortName: "Netherlands",
    aliases: ["Holland", "Amsterdam", "Rotterdam", "The Hague"],
    isoCode: "NL",
    firstLetter: "N",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "The Netherlands is the depository state of the 1961 Hague Apostille Convention. Indian public documents intended for the Netherlands (IND, Gemeente BRP registration, or study) require an MEA Hague Apostille sticker.",
    routeOverview:
      "Because both India and the Netherlands are contracting parties to the Hague Apostille Convention, Indian Birth Certificates, Marriage Certificates, Single Status Affidavits, and degrees are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Birth Certificates, Marriage Certificates, and Single Status Affidavits for Dutch Gemeente (BRP) registration undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Dutch municipalities (Gemeente) and the IND generally accept documents in English, Dutch, German, or French without translation; regional-language Indian documents require certified English or Dutch translation.",
    missionNote: "The Embassy of the Kingdom of the Netherlands in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Note: Dutch Gemeente (BRP) authorities often require recently issued Birth/Marriage extracts (e.g., issued within 6 months) prior to MEA Apostille; confirm with your municipality.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    shortName: "New Zealand",
    aliases: ["Auckland", "Wellington", "Christchurch"],
    isoCode: "NZ",
    firstLetter: "N",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "New Zealand is a contracting party to the Hague Apostille Convention. Where formal authentication of Indian public documents is required for New Zealand, the MEA Hague Apostille route applies.",
    routeOverview:
      "Because both India and New Zealand are parties to the 1961 Hague Apostille Convention, Indian documents requiring formal legal authentication are processed via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille (check NZQA rules separately).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents do not require translation; regional-language documents require certified English translation.",
    missionNote: "The New Zealand High Commission in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether Immigration New Zealand (INZ) or NZQA requires an MEA Apostille for your specific document.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services"],
  },
  {
    slug: "nigeria",
    name: "Federal Republic of Nigeria",
    shortName: "Nigeria",
    aliases: ["Lagos", "Abuja"],
    isoCode: "NG",
    firstLetter: "N",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + High Commission Legalization",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Nigeria is not a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Nigeria require MEA Normal Attestation and Nigeria High Commission legalization in New Delhi.",
    routeOverview:
      "Because the Federal Republic of Nigeria is not a party to the 1961 Hague Apostille Convention, an Apostille sticker is not valid for Nigeria. Documents intended for Nigerian STR/CERPAC work visas, family residency, or NAFDAC/SONCAP commercial trade must undergo preliminary verification, MEA Normal Attestation, and consular legalization at the Nigeria High Commission in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + Nigeria High Commission legalization.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Nigeria High Commission legalization.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Nigeria High Commission commercial legalization (often required for NAFDAC / pharmaceutical / export dossiers).",
    },
    translationRequirement: "English is the official language of Nigeria; regional-language Indian documents require certified English translation.",
    missionNote: "The High Commission of the Federal Republic of Nigeria in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Nigeria High Commission supporting requirements and consular fee tiers for educational vs. NAFDAC/commercial documents.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation", "/sdm-mea-attestation"],
  },
  {
    slug: "norway",
    name: "Kingdom of Norway",
    shortName: "Norway",
    aliases: ["Oslo", "Bergen"],
    isoCode: "NO",
    firstLetter: "N",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Norway is a contracting party to the Hague Apostille Convention. Indian public documents intended for Norway (UDI residence permits, Skatteetaten civil registration, or HK-dir recognition) follow the MEA Hague Apostille route.",
    routeOverview:
      "Because India and Norway are both parties to the 1961 Hague Apostille Convention, Indian personal, educational, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Norwegian authorities generally accept documents in English or Norwegian; regional-language documents require certified translation.",
    missionNote: "The Royal Norwegian Embassy in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Norwegian UDI or Skatteetaten application specifies State Home / HRD verification prior to MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "philippines",
    name: "Republic of the Philippines",
    shortName: "Philippines",
    aliases: ["Manila", "Cebu"],
    isoCode: "PH",
    firstLetter: "P",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "The Philippines is a contracting party to the Hague Apostille Convention (effective May 2019). Indian public documents intended for medical/university admissions, work visas, or corporate use in the Philippines follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and the Philippines are members of the 1961 Hague Apostille Convention, Indian educational certificates (such as Class 12th / NEET / degree records for medical students), PCCs, Birth Certificates, and commercial documents are authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "School board certificates, transcripts, and degrees undergo SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Birth Certificates, Police Clearance Certificates, and Affidavits of Support undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents are accepted throughout the Philippines; regional-language documents require certified English translation.",
    missionNote: "The Embassy of the Philippines in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Specific document checklist requested by your Philippine university (CHED) or Bureau of Immigration.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "poland",
    name: "Republic of Poland",
    shortName: "Poland",
    aliases: ["Warsaw", "Krakow", "Wroclaw"],
    isoCode: "PL",
    firstLetter: "P",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Polish Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Poland is a contracting party to the Hague Apostille Convention. Indian educational degrees, PCCs, and civil certificates intended for Polish work permits, student visas (NAWA), or residency follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Poland are parties to the 1961 Hague Apostille Convention, Indian documents intended for Poland undergo preliminary verification (State HRD, SDM, or Chamber of Commerce) and receive an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Class 12th certificates, diplomas, and degrees for Polish university admissions (NAWA) or work permits undergo State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Police Clearance Certificates, Birth Certificates, and Marriage Certificates undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Polish Voivodeship offices and universities frequently require translation into Polish (often by a Polish Sworn Translator — Tłumacz przysięgły).",
    missionNote: "The Embassy of the Republic of Poland in New Delhi and the Consulate General in Mumbai are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Polish university or NAWA recognition pathway requires State Education Department (HRD) verification prior to MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/document-translation-services"],
  },
  {
    slug: "russia",
    name: "Russian Federation (Russia)",
    shortName: "Russia",
    aliases: ["Moscow", "Saint Petersburg"],
    isoCode: "RU",
    firstLetter: "R",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille + Russian Translation",
    applicableRoutes: ["Hague Apostille", "Russian Translation & Notarization"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "The Russian Federation is a contracting party to the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Russia require an MEA Hague Apostille sticker and typically a notarized Russian translation.",
    routeOverview:
      "Because both India and the Russian Federation are parties to the 1961 Hague Apostille Convention, Indian Class 12th certificates (for MBBS admissions), university degrees, PCCs, and commercial documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Class 12th / NEET / Degree certificates undergo State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Police Clearance Certificates, Birth Certificates, and Medical Certificates undergo SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Russian universities (Glavexpertcenter) and ministries require notarized Russian translation after the MEA Apostille is affixed.",
    missionNote: "The Embassy of the Russian Federation in New Delhi and Russian Consulates General in India are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Russian university requires State HRD verification prior to MEA Apostille and consular translation verification.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/document-translation-services"],
  },
  {
    slug: "singapore",
    name: "Republic of Singapore",
    shortName: "Singapore",
    aliases: ["SG"],
    isoCode: "SG",
    firstLetter: "S",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Singapore is a contracting party to the Hague Apostille Convention (effective September 2021). Indian public documents requiring authentication for Singapore follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Singapore are parties to the 1961 Hague Apostille Convention, Indian educational, personal, and corporate documents are authenticated with an official MEA Hague Apostille sticker without requiring Singapore High Commission legalization.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille (note: MOM Employment Pass may also require separate third-party background screening).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents are accepted in Singapore; regional-language documents require certified English translation.",
    missionNote: "The High Commission of the Republic of Singapore in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether Singapore Ministry of Manpower (MOM) or ICA requires an MEA Apostille or designated background verification agency check for your application.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/sdm-apostille-services", "/chamber-of-commerce-apostille"],
  },
  {
    slug: "south-africa",
    name: "Republic of South Africa",
    shortName: "South Africa",
    aliases: ["Pretoria", "Johannesburg", "Cape Town"],
    isoCode: "ZA",
    firstLetter: "S",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "South Africa is a contracting party to the Hague Apostille Convention. Indian public documents intended for South Africa follow the MEA Hague Apostille route.",
    routeOverview:
      "Because India and South Africa are both parties to the 1961 Hague Apostille Convention, Indian Police Clearance Certificates, Birth/Marriage Certificates, degrees, and corporate records undergo preliminary verification and receive an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille (check SAQA evaluation requirements separately).",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents are accepted in South Africa; regional-language documents require certified English translation.",
    missionNote: "The High Commission of the Republic of South Africa in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your South African visa (VFS / DHA) or SAQA application requires RPO-issued PCC with direct MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "south-korea",
    name: "Republic of Korea (South Korea)",
    shortName: "South Korea",
    aliases: ["Korea", "ROK", "Seoul", "Busan"],
    isoCode: "KR",
    firstLetter: "S",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "South Korea is a contracting party to the Hague Apostille Convention. Indian educational degrees, PCCs, and civil certificates intended for South Korea follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and the Republic of Korea are members of the 1961 Hague Apostille Convention, Indian university degrees (for E-7 work visas or Korean university admissions), Birth/Marriage Certificates, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "English documents are widely accepted for Korean visa submissions; confirm if Korean translation is needed for local family registry filings.",
    missionNote: "The Embassy of the Republic of Korea in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Korean university or E-7 visa sponsor requires State HRD verification prior to MEA Apostille.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "sri-lanka",
    name: "Democratic Socialist Republic of Sri Lanka",
    shortName: "Sri Lanka",
    aliases: ["Colombo"],
    isoCode: "LK",
    firstLetter: "S",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + High Commission Legalization",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Sri Lanka is not a member of the Hague Apostille Convention. Indian documents intended for Sri Lanka generally require MEA Normal Attestation and Sri Lanka High Commission legalization in India.",
    routeOverview:
      "Because Sri Lanka is outside the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents intended for use in Sri Lanka undergo preliminary verification, MEA Normal Attestation, and consular authentication at the High Commission of Sri Lanka in New Delhi (or regional Deputy High Commission).",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Sri Lanka High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Sri Lanka High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Sri Lanka High Commission commercial legalization.",
    },
    translationRequirement: "English documents are accepted; regional-language Indian documents require certified English translation.",
    missionNote: "The High Commission of the Democratic Socialist Republic of Sri Lanka in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Sri Lanka High Commission supporting document checklist and consular fee schedule.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "sudan",
    name: "Republic of the Sudan",
    shortName: "Sudan",
    aliases: ["Khartoum"],
    isoCode: "SD",
    firstLetter: "S",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Sudan is not a party to the Hague Apostille Convention. Indian documents intended for Sudan require MEA Normal Attestation and Embassy of Sudan confirmation in New Delhi.",
    routeOverview:
      "Route requires confirmation: Sudan is outside the Hague Apostille Convention. Documents generally follow preliminary verification, MEA Normal Attestation, and consular legalization at the Embassy of the Republic of the Sudan in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Sudan confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Sudan confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Sudan confirmation.",
    },
    translationRequirement: "Arabic translation requirements should be confirmed with the receiving authority.",
    missionNote: "The Embassy of the Republic of the Sudan in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Sudan consular submission schedule and fee structure in New Delhi.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "sweden",
    name: "Kingdom of Sweden",
    shortName: "Sweden",
    aliases: ["Stockholm", "Gothenburg", "Malmo"],
    isoCode: "SE",
    firstLetter: "S",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Sweden is a contracting party to the Hague Apostille Convention. Indian public documents intended for Sweden (Migrationsverket or Skatteverket) follow the MEA Hague Apostille route.",
    routeOverview:
      "Because India and Sweden are both parties to the 1961 Hague Apostille Convention, Indian Birth Certificates, Marriage Certificates, degrees, and corporate documents are authenticated with an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Swedish authorities generally accept English documents; regional-language Indian documents require certified English or Swedish translation.",
    missionNote: "The Embassy of Sweden in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether Skatteverket (Swedish Tax Agency) or Migrationsverket specifies any additional preliminary verification for your civil status record.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/sdm-apostille-services"],
  },
  {
    slug: "switzerland",
    name: "Swiss Confederation (Switzerland)",
    shortName: "Switzerland",
    aliases: ["Zurich", "Geneva", "Bern", "Basel"],
    isoCode: "CH",
    firstLetter: "S",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Translation (German / French / Italian Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Switzerland is a contracting party to the Hague Apostille Convention. Indian public documents generally follow the MEA Hague Apostille route; cantonal civil registry rules should be confirmed.",
    routeOverview:
      "Because both India and Switzerland are parties to the 1961 Hague Apostille Convention, Indian degrees, commercial documents, and personal certificates generally undergo preliminary verification and receive an MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille (note: Swiss civil status offices — Zivilstandsamt — may have specific verification requirements).",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Depending on the Swiss canton, certified translation into German, French, or Italian may be required.",
    missionNote: "The Embassy of Switzerland in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Swiss cantonal Zivilstandsamt accepts an MEA Apostille directly or requires consular verification for family civil registration.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/personal-document-attestation", "/document-translation-services"],
  },
  {
    slug: "syria",
    name: "Syrian Arab Republic (Syria)",
    shortName: "Syria",
    aliases: ["Damascus"],
    isoCode: "SY",
    firstLetter: "S",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Syria is not a party to the Hague Apostille Convention. Indian documents intended for Syria require MEA Normal Attestation and Embassy of Syria legalization in New Delhi; exact requirements require confirmation.",
    routeOverview:
      "Because the Syrian Arab Republic is outside the Hague Apostille Convention, Indian commercial, educational, and personal documents follow preliminary verification, MEA Normal Attestation, and Embassy of Syria consular legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Syria confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Syria confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Syria commercial legalization confirmation.",
    },
    translationRequirement: "Arabic translation requirements should be confirmed based on the receiving authority.",
    missionNote: "The Embassy of the Syrian Arab Republic in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Syria commercial and personal document legalization fees and supporting requirements.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "taiwan",
    name: "Taiwan (Taipei Economic and Cultural Center)",
    shortName: "Taiwan",
    aliases: ["Taipei", "ROC", "TECC"],
    isoCode: "TW",
    firstLetter: "T",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + TECC Legalization",
    applicableRoutes: ["MEA Normal Attestation", "TECC Consular Authentication", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Taiwan is not a party to the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Taiwan require MEA Normal Attestation followed by authentication at the Taipei Economic and Cultural Center (TECC) in India.",
    routeOverview:
      "An Apostille sticker is not applicable for Taiwan. Indian degrees (for white-collar work permits or university admissions), Marriage/Birth Certificates, Police Clearance Certificates, and commercial Powers of Attorney must undergo preliminary verification (State HRD, SDM, or Chamber of Commerce), MEA Normal Attestation, and authentication by the Taipei Economic and Cultural Center (TECC) in New Delhi or Chennai.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + TECC authentication.",
      personal: "Marriage Certificates, Birth Certificates, and PCCs require SDM / State Home verification + MEA Normal Attestation + TECC authentication.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + TECC commercial authentication.",
    },
    translationRequirement: "Traditional Chinese translation may be required for specific civil registry (Household Registration) filings.",
    missionNote: "Authentication in India is handled via the Taipei Economic and Cultural Center (TECC) according to consular jurisdiction.",
    itemsRequiringConfirmation: [
      "Current TECC jurisdiction (New Delhi vs. Chennai), authorization letter format, and Traditional Chinese translation requirements.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/educational-document-attestation"],
  },
  {
    slug: "tanzania",
    name: "United Republic of Tanzania",
    shortName: "Tanzania",
    aliases: ["Dar es Salaam", "Dodoma"],
    isoCode: "TZ",
    firstLetter: "T",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Tanzania is not a member of the Hague Apostille Convention. Indian documents intended for Tanzania generally require MEA Normal Attestation and Tanzania High Commission confirmation in New Delhi.",
    routeOverview:
      "Because Tanzania is outside the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents generally undergo preliminary verification, MEA Normal Attestation, and consular authentication via the High Commission of the United Republic of Tanzania in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Tanzania High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Tanzania High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Tanzania High Commission confirmation.",
    },
    translationRequirement: "English documents are accepted in Tanzania; regional-language documents require certified English translation.",
    missionNote: "The High Commission of the United Republic of Tanzania in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Tanzanian work permit or receiving organization requires High Commission legalization in addition to MEA Normal Attestation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "thailand",
    name: "Kingdom of Thailand",
    shortName: "Thailand",
    aliases: ["Bangkok", "Phuket"],
    isoCode: "TH",
    firstLetter: "T",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Thailand is not a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for Thailand require MEA Normal Attestation and Royal Thai Embassy / Consulate legalization in India.",
    routeOverview:
      "Because the Kingdom of Thailand is not a party to the 1961 Hague Apostille Convention, an Apostille sticker is not valid in Thailand. Indian degrees (for Thai Non-B work permits and BOI applications), Marriage/Birth Certificates, Single Status Affidavits, and commercial documents must undergo preliminary verification, MEA Normal Attestation, and consular legalization at the Royal Thai Embassy in New Delhi (or Royal Thai Consulate General in Mumbai, Kolkata, or Chennai).",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification + MEA Normal Attestation + Royal Thai Embassy legalization.",
      personal: "Marriage Certificates, Birth Certificates, and Single Status Affidavits require SDM / State Home verification + MEA Normal Attestation + Royal Thai Embassy legalization.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Royal Thai Embassy commercial legalization.",
    },
    translationRequirement: "English documents are accepted by the Royal Thai Embassy in India; Thai translation is typically completed in Thailand prior to Thai MFA endorsement.",
    missionNote: "The Royal Thai Embassy in New Delhi and Royal Thai Consulates General in India are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Royal Thai Embassy submission checklist, jurisdiction rules, and consular fees.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/educational-document-attestation"],
  },
  {
    slug: "turkey",
    name: "Republic of Türkiye (Turkey)",
    shortName: "Turkey",
    aliases: ["Turkiye", "Istanbul", "Ankara"],
    isoCode: "TR",
    firstLetter: "T",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Turkish Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Türkiye (Turkey) is a contracting party to the Hague Apostille Convention. Indian public documents intended for Türkiye generally follow the MEA Hague Apostille route; Turkish translation and notarization rules should be confirmed.",
    routeOverview:
      "Because both India and the Republic of Türkiye are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and commercial documents undergo preliminary verification and receive an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille (confirm if specific trade invoices require Turkish consular endorsement).",
    },
    translationRequirement: "Turkish authorities frequently require certified Turkish translation after the MEA Apostille is affixed.",
    missionNote: "The Embassy of the Republic of Türkiye in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Turkish receiving authority requires the Turkish translation to be notarized at the Turkish Embassy/Consulate or in Türkiye.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/document-translation-services", "/chamber-of-commerce-apostille"],
  },
  {
    slug: "uganda",
    name: "Republic of Uganda",
    shortName: "Uganda",
    aliases: ["Kampala"],
    isoCode: "UG",
    firstLetter: "U",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Uganda is not a member of the Hague Apostille Convention. Indian documents intended for Uganda generally require MEA Normal Attestation and Uganda High Commission confirmation in New Delhi.",
    routeOverview:
      "Because Uganda is outside the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents generally undergo preliminary verification, MEA Normal Attestation, and consular authentication via the Uganda High Commission in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Uganda High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Uganda High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Uganda High Commission confirmation.",
    },
    translationRequirement: "English is an official language in Uganda; regional-language documents require certified English translation.",
    missionNote: "The High Commission of the Republic of Uganda in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Uganda High Commission supporting document checklist and consular fee schedule.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "ukraine",
    name: "Ukraine",
    shortName: "Ukraine",
    aliases: ["Kyiv"],
    isoCode: "UA",
    firstLetter: "U",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Ukrainian Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Ukraine is a contracting party to the Hague Apostille Convention. Indian public documents intended for Ukraine follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Ukraine are parties to the 1961 Hague Apostille Convention, Indian personal, educational, and commercial documents undergo preliminary verification and receive an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Preliminary State HRD or SDM verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Ukrainian translation requirements should be confirmed with the receiving authority.",
    missionNote: "The Embassy of Ukraine in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Ukrainian receiving authority requires notarized Ukrainian translation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/document-translation-services"],
  },
  {
    slug: "uzbekistan",
    name: "Republic of Uzbekistan",
    shortName: "Uzbekistan",
    aliases: ["Tashkent", "Samarkand"],
    isoCode: "UZ",
    firstLetter: "U",
    verificationStatus: "Partially Verified",
    routeBadge: "Hague Apostille",
    applicableRoutes: ["Hague Apostille", "Russian / Uzbek Translation (Where Required)"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Uzbekistan is a contracting party to the Hague Apostille Convention. Indian educational (e.g., MBBS admission), personal, and commercial documents intended for Uzbekistan follow the MEA Hague Apostille route.",
    routeOverview:
      "Because both India and Uzbekistan are parties to the 1961 Hague Apostille Convention, Indian school board certificates, degrees, PCCs, and commercial documents are authenticated via preliminary verification and an official MEA Hague Apostille sticker.",
    categoryGuidance: {
      educational: "Class 12th / NEET / Degree certificates undergo SDM or State HRD verification followed by MEA Hague Apostille.",
      personal: "Preliminary Notary & SDM / State Home verification followed by MEA Hague Apostille.",
      commercial: "Chamber of Commerce verification followed by MEA Hague Apostille.",
    },
    translationRequirement: "Russian or Uzbek translation may be requested by Uzbek universities or ministries.",
    missionNote: "The Embassy of the Republic of Uzbekistan in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Specific translation language (Russian vs. Uzbek) required by your receiving university or ministry in Uzbekistan.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/apostille-services-india", "/educational-document-attestation", "/document-translation-services"],
  },
  {
    slug: "vietnam",
    name: "Socialist Republic of Vietnam",
    shortName: "Vietnam",
    aliases: ["Hanoi", "Ho Chi Minh City", "Saigon"],
    isoCode: "VN",
    firstLetter: "V",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Normal Attestation + Embassy Legalization",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Vietnam is not a member of the Hague Apostille Convention. Indian educational degrees, PCCs, experience letters, and commercial documents intended for Vietnam require MEA Normal Attestation and Embassy of Vietnam legalization in New Delhi.",
    routeOverview:
      "Because the Socialist Republic of Vietnam is not a party to the 1961 Hague Apostille Convention, an Apostille sticker is not valid in Vietnam. Indian documents intended for Vietnamese work permits (such as degrees, Police Clearance Certificates, and work experience certificates), family visas, or commercial trade must undergo preliminary verification (State HRD, SDM, or Chamber of Commerce), MEA Normal Attestation, and consular legalization at the Embassy of the Socialist Republic of Vietnam in New Delhi.",
    categoryGuidance: {
      educational: "University degrees and teaching/engineering diplomas require State HRD or SDM verification + MEA Normal Attestation + Embassy of Vietnam legalization.",
      personal: "Police Clearance Certificates, Birth/Marriage Certificates, and Work Experience Letters require SDM / State Home verification + MEA Normal Attestation + Embassy of Vietnam legalization.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Vietnam commercial legalization.",
    },
    translationRequirement: "Vietnamese translation is frequently required either during consular submission or upon arrival in Vietnam.",
    missionNote: "The Embassy of the Socialist Republic of Vietnam in New Delhi (and Consulate General in Mumbai) are listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Vietnam consular fee schedule and whether Vietnamese translation is required prior to submission.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/educational-document-attestation"],
  },
  {
    slug: "yemen",
    name: "Republic of Yemen",
    shortName: "Yemen",
    aliases: ["Sanaa", "Aden"],
    isoCode: "YE",
    firstLetter: "Y",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["commercial", "educational", "personal"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Yemen is not a party to the Hague Apostille Convention. Indian documents intended for Yemen require MEA Normal Attestation and Embassy of Yemen confirmation in New Delhi.",
    routeOverview:
      "Route requires confirmation: Because Yemen is outside the Hague Apostille Convention, Indian commercial, educational, and personal documents follow preliminary verification, MEA Normal Attestation, and Embassy of the Republic of Yemen consular legalization in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Yemen confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Yemen confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Yemen commercial legalization confirmation.",
    },
    translationRequirement: "Arabic translation requirements should be confirmed with the receiving authority.",
    missionNote: "The Embassy of the Republic of Yemen in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Yemen consular submission schedule and commercial legalization fee structure.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/chamber-of-commerce-mea-attestation"],
  },
  {
    slug: "zambia",
    name: "Republic of Zambia",
    shortName: "Zambia",
    aliases: ["Lusaka"],
    isoCode: "ZM",
    firstLetter: "Z",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "High Commission Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Zambia is not a party to the Hague Apostille Convention. Indian documents intended for Zambia generally require MEA Normal Attestation and Zambia High Commission confirmation in New Delhi.",
    routeOverview:
      "Because Zambia is outside the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents generally undergo preliminary verification, MEA Normal Attestation, and consular authentication via the High Commission of the Republic of Zambia in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Zambia High Commission confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Zambia High Commission confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Zambia High Commission confirmation.",
    },
    translationRequirement: "English is the official language of Zambia; regional-language documents require certified English translation.",
    missionNote: "The High Commission of the Republic of Zambia in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Whether your Zambian work permit authority (ZAQA / Immigration) requires High Commission endorsement in addition to MEA Normal Attestation.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/educational-document-attestation"],
  },
  {
    slug: "zimbabwe",
    name: "Republic of Zimbabwe",
    shortName: "Zimbabwe",
    aliases: ["Harare"],
    isoCode: "ZW",
    firstLetter: "Z",
    verificationStatus: "Route requires confirmation",
    routeBadge: "Route requires confirmation",
    applicableRoutes: ["MEA Normal Attestation", "Embassy Legalization", "Route requires confirmation"],
    documentCategories: ["educational", "personal", "commercial"],
    isIndexable: false,
    lastCheckedDate: "2025-02-15",
    summary:
      "Zimbabwe is not a party to the Hague Apostille Convention. Indian documents intended for Zimbabwe generally require MEA Normal Attestation and Embassy of Zimbabwe confirmation in New Delhi.",
    routeOverview:
      "Because Zimbabwe is outside the 1961 Hague Apostille Convention, Indian educational, personal, and commercial documents generally undergo preliminary verification, MEA Normal Attestation, and consular authentication via the Embassy of the Republic of Zimbabwe in New Delhi.",
    categoryGuidance: {
      educational: "Preliminary HRD or SDM verification + MEA Normal Attestation + Embassy of Zimbabwe confirmation.",
      personal: "Preliminary SDM / State Home verification + MEA Normal Attestation + Embassy of Zimbabwe confirmation.",
      commercial: "Chamber of Commerce endorsement + MEA Normal Attestation + Embassy of Zimbabwe confirmation.",
    },
    translationRequirement: "English documents are accepted in Zimbabwe; regional-language documents require certified English translation.",
    missionNote: "The Embassy of the Republic of Zimbabwe in New Delhi is listed in the MEA Protocol Division directory.",
    itemsRequiringConfirmation: [
      "Current Embassy of Zimbabwe supporting document checklist and consular fee schedule.",
    ],
    officialLinks: [...DEFAULT_OFFICIAL_LINKS],
    relatedServiceSlugs: ["/embassy-legalization-services", "/sdm-mea-attestation", "/chamber-of-commerce-mea-attestation"],
  },
];

function buildEnrichedCountryEntry(raw: RawCountryDirectoryEntry): CountryDirectoryEntry {
  const priority = PRIORITY_COUNTRY_ENRICHMENTS[raw.slug];
  const continent: CountryContinent =
    priority?.continent ||
    COUNTRY_CONTINENT_BY_ISO[raw.isoCode.toUpperCase()] ||
    "Asia-Pacific";

  const isApostilleMember =
    priority !== undefined
      ? priority.isApostilleMember
      : raw.routeBadge.toLowerCase().includes("apostille") &&
        !raw.routeBadge.toLowerCase().includes("exception");

  const canonicalSlug = priority?.canonicalSlug || raw.slug;
  const isIndexable = priority ? true : raw.isIndexable;
  const verificationStatus: CountryVerificationStatus = priority
    ? "Verified"
    : raw.verificationStatus;

  const defaultLegalGuidance = isApostilleMember
    ? `Powers of Attorney (POA), Single Status Affidavits, Legal Heirship Certificates, and judicial declarations intended for ${raw.name} undergo notarization, preliminary SDM / State Home or Chamber of Commerce verification, and an official MEA Hague Apostille sticker.`
    : `Powers of Attorney (POA), affidavits, Legal Heirship Certificates, and court documents intended for ${raw.name} undergo notarization, preliminary SDM / State Home or Chamber of Commerce verification, MEA Normal Attestation, and consular legalization via the diplomatic mission of ${raw.shortName}.`;

  const defaultSupportingDocs: string[] = [
    `Original certificate(s) requiring authentication for ${raw.name} (Educational, Personal, Legal, or Commercial).`,
    "Clear passport copy (front and back pages) of the document holder.",
    isApostilleMember
      ? `Supporting transcripts or translation (if required by the receiving institution in ${raw.shortName}).`
      : `Visa copy, employer offer letter, or commercial covering letter as requested by the ${raw.shortName} Embassy/Consulate in India.`,
  ];

  const defaultSteps: CountryProcessStep[] = isApostilleMember
    ? [
        {
          stepNumber: 1,
          title: "Document Inspection & Route Assessment",
          authority: "Pre-Verification Desk",
          description: `We review your original Indian certificate and verify the exact authentication requirements for ${raw.name}.`,
        },
        {
          stepNumber: 2,
          title: "Preliminary State HRD, SDM, or Chamber Verification",
          authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
          description:
            "Educational and personal documents undergo SDM or State HRD/Home verification; commercial documents receive Chamber of Commerce endorsement.",
        },
        {
          stepNumber: 3,
          title: "MEA Hague Apostille Sticker Issuance",
          authority: "Ministry of External Affairs (MEA), Government of India",
          description: `Because ${raw.shortName} is a contracting party to the 1961 Hague Apostille Convention, the Ministry of External Affairs affixes the official Hague Apostille sticker on the document.`,
        },
        {
          stepNumber: 4,
          title: "Certified Translation (Where Required) & Dispatch",
          authority: "Authorized Translator & Documentation Desk",
          description: `${raw.translationRequirement} Documents are verified and securely dispatched.`,
        },
      ]
    : [
        {
          stepNumber: 1,
          title: "Preliminary State HRD, SDM, or Chamber Verification",
          authority: "State HRD / SDM (New Delhi) / State Home Dept / Chamber of Commerce",
          description:
            "Educational certificates undergo State HRD or SDM verification; personal documents undergo Notary and SDM/State Home verification; commercial documents receive Chamber of Commerce endorsement.",
        },
        {
          stepNumber: 2,
          title: "Ministry of External Affairs (MEA) Normal Attestation",
          authority: "Ministry of External Affairs, Government of India",
          description: `Because ${raw.shortName} requires consular legalization from India, the Ministry of External Affairs affixes its official Normal Attestation stamp.`,
        },
        {
          stepNumber: 3,
          title: `${raw.shortName} Embassy / High Commission Legalization in India`,
          authority: `Diplomatic Mission of ${raw.name} in India`,
          description: `The MEA-attested document is submitted to the ${raw.shortName} diplomatic mission in New Delhi for official consular legalization.`,
        },
        {
          stepNumber: 4,
          title: `Destination Ministry of Foreign Affairs (MOFA) / Final Check`,
          authority: `Receiving Authority in ${raw.shortName}`,
          description: `Upon completion of Indian consular legalization, the document is ready for submission (and destination MOFA attestation where applicable in ${raw.shortName}).`,
        },
      ];

  const defaultFaqs: CountryFaqItem[] = [
    {
      question: `Does ${raw.name} require an MEA Hague Apostille or Embassy Legalization from India?`,
      answer: raw.routeOverview,
    },
    {
      question: `How are Educational and Personal documents authenticated for ${raw.shortName}?`,
      answer: `${raw.categoryGuidance.educational} ${raw.categoryGuidance.personal}`,
    },
    {
      question: `Is document translation required for ${raw.shortName}?`,
      answer: raw.translationRequirement,
    },
  ];

  const optimizedCountryTitle = isApostilleMember
    ? `${raw.shortName} Apostille & Attestation | Fatima Global Attestation`
    : `${raw.shortName} Attestation & Legalization | Fatima Global Attestation`;

  const defaultH1 = isApostilleMember
    ? `${raw.shortName} Apostille & Document Attestation from India`
    : `${raw.shortName} Certificate Attestation & Legalization from India`;

  const optimizedCountryDesc = isApostilleMember
    ? `MEA Hague Apostille & document attestation for ${raw.shortName} from India. Degree, birth & marriage certificate apostille, translation & secure courier.`
    : `Document attestation & Embassy legalization for ${raw.shortName} from India. Degree, birth, marriage & commercial document attestation with MEA verification.`;

  return {
    ...raw,
    canonicalSlug,
    priorityOrder: priority?.priorityOrder,
    isPriority12: Boolean(priority?.isPriority12),
    continent,
    isApostilleMember,
    verificationStatus,
    isIndexable,
    seoTitle: optimizedCountryTitle,
    metaDescription:
      priority?.metaDescription && priority.metaDescription.length <= 165
        ? priority.metaDescription
        : optimizedCountryDesc,
    h1: priority?.h1 || defaultH1,
    heroBadge: priority?.heroBadge || raw.routeBadge,
    featuredCardTitle: priority?.featuredCardTitle || raw.name,
    featuredCardRouteLabel: priority?.featuredCardRouteLabel || raw.routeBadge,
    featuredCardDescription: priority?.featuredCardDescription || raw.summary,
    targetKeywords: priority?.targetKeywords || [
      `${raw.shortName.toLowerCase()} attestation from india`,
      `${raw.shortName.toLowerCase()} apostille india`,
      `degree attestation for ${raw.shortName.toLowerCase()}`,
    ],
    categoryGuidance: {
      ...raw.categoryGuidance,
      legal: priority?.legalGuidance || defaultLegalGuidance,
    },
    supportingDocuments: priority?.supportingDocuments || defaultSupportingDocs,
    stepByStepProcess: priority?.stepByStepProcess || defaultSteps,
    faqs: priority?.faqs || defaultFaqs,
  };
}

export const COUNTRY_DIRECTORY: CountryDirectoryEntry[] = RAW_COUNTRY_DIRECTORY.map(
  buildEnrichedCountryEntry
).sort((a, b) => a.name.localeCompare(b.name));

export const PRIORITY_12_COUNTRIES: CountryDirectoryEntry[] = COUNTRY_DIRECTORY.filter(
  (c) => c.isPriority12
).sort((a, b) => (a.priorityOrder || 99) - (b.priorityOrder || 99));

export function getCountryBySlug(slug: string): CountryDirectoryEntry | undefined {
  const clean = slug
    .replace(/^\/+/, "")
    .replace(/^countries\//i, "")
    .replace(/^country\//i, "")
    .replace(/\/+$/, "")
    .toLowerCase();

  if (!clean) return undefined;

  const aliasMap: Record<string, string> = {
    uae: "united-arab-emirates",
    "uae-mofa-attestation": "united-arab-emirates",
    "saudi-arabia-attestation": "saudi-arabia",
    usa: "united-states",
    uk: "united-kingdom",
  };

  const resolvedSlug = aliasMap[clean] || clean;

  return COUNTRY_DIRECTORY.find(
    (c) =>
      c.slug === resolvedSlug ||
      c.canonicalSlug === resolvedSlug ||
      c.canonicalSlug === clean
  );
}

export const INDEXABLE_COUNTRIES: CountryDirectoryEntry[] = COUNTRY_DIRECTORY.filter(
  (c) => c.isIndexable
);

