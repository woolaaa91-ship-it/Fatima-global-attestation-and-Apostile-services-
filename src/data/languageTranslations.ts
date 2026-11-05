/**
 * FATIMA GLOBAL ATTESTATION — Dedicated Language Translation Services Data
 * Strictly covers the 14 approved International Language Translation services
 * and 12 approved Indian Regional Language to English Translation services.
 * Complies with all SEO, content, and business accuracy guidelines:
 * - No unapproved reverse regional pairs
 * - No false claims of sworn, certified, or government-approved translation
 */

export interface LanguageTranslationFAQ {
  question: string;
  answer: string;
}

export interface LanguageTranslationPageData {
  slug: string; // e.g. "/translation/czech-translation" or "/translation/hindi-to-english"
  id: string; // e.g. "czech-translation" or "hindi-to-english"
  category: "international" | "regional-to-english";
  cardTitle: string; // Exact card label e.g. "Czech Translation" or "Hindi to English Translation"
  languageName: string; // e.g. "Czech" or "Hindi to English"
  shortCardDescription: string; // Concise card summary shown on the main translation hub
  directionBadge: string; // e.g. "International Language Translation" or "Regional Language → English"
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  introParagraphs: string[];
  targetKeywords: string[];
  primaryUseCases: string;
  commonDestinations: string[];
  educationalDescription: string;
  personalDescription: string;
  legalDescription: string;
  immigrationVisaDescription: string;
  commercialDescription: string;
  apostilleAttestationNote: string;
  processSteps: {
    step: number;
    title: string;
    description: string;
  }[];
  faqs: LanguageTranslationFAQ[];
}

export const ACCEPTED_DOCUMENT_CATEGORIES_SPEC = {
  educational: [
    "Degree Certificates",
    "Diplomas",
    "Mark Sheets",
    "Academic Transcripts",
    "School Certificates",
  ],
  personal: [
    "Birth Certificates",
    "Marriage Certificates",
    "Death Certificates",
    "Affidavits",
    "Passports",
    "Driving Licences",
  ],
  legal: [
    "Power of Attorney",
    "Court Documents",
    "Agreements",
    "Legal Notices",
  ],
  immigration: [
    "Police Clearance Certificates (PCC)",
    "Single Status / Bachelorhood Affidavits",
    "Employment & Experience Letters",
    "Bank Statements & Sponsorship Declarations",
    "Family Visa & Residence Permit Dossiers",
  ],
  commercial: [
    "Invoices",
    "Business Agreements",
    "Company Documents",
    "Certificates of Incorporation",
  ],
};

interface RawLanguageSeed {
  id: string;
  slug: string;
  category: "international" | "regional-to-english";
  cardTitle: string;
  languageName: string;
  shortCardDescription: string;
  directionBadge: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroBadge: string;
  introParagraphs: string[];
  targetKeywords: string[];
  primaryUseCases: string;
  commonDestinations: string[];
  apostilleAttestationNote: string;
  customFaqs?: LanguageTranslationFAQ[];
}

const RAW_LANGUAGE_SEEDS: RawLanguageSeed[] = [
  // ============================================================================
  // SECTION 2: 14 INTERNATIONAL LANGUAGE TRANSLATION SERVICES
  // ============================================================================
  {
    id: "czech-translation",
    slug: "/translation/czech-translation",
    category: "international",
    cardTitle: "Czech Translation",
    languageName: "Czech",
    shortCardDescription:
      "Professional Czech document translation for educational, personal, legal, visa, and commercial records required for Czech Republic submissions.",
    directionBadge: "International Language • Czech",
    seoTitle:
      "Czech Translation Services in India | Czech Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Czech translation services in India for educational, personal, legal, visa and commercial documents. Coordinate Czech document translation with apostille and attestation support.",
    h1: "Czech Translation Services in India",
    heroBadge: "International Language Translation • Czech Republic Submissions",
    introParagraphs: [
      "Fatima Global Attestation provides professional Czech translation services in India for individuals, students, families, and businesses preparing documents for the Czech Republic. Whether you need English to Czech translation or Czech to English translation for long-term visa applications, employee card filings, university admissions, or corporate registrations in Prague and across the Czech Republic, we coordinate accurate, mirror-formatted document translations.",
      "Every Czech document translation is formatted to match the layout of your original certificate while cross-checking all personal names, passport numbers, and dates against your passport copy. Where required, we also assist with Notary verification, SDM authentication, and MEA Apostille coordination in New Delhi.",
    ],
    targetKeywords: [
      "Czech translation services in India",
      "Czech document translation",
      "Czech to English translation",
      "English to Czech translation",
      "document translation for Czech visa",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Czech Republic Employee Card, student visa, family reunification, university nostrification, and corporate branch documentation.",
    commonDestinations: ["Czech Republic", "European Union", "India"],
    apostilleAttestationNote:
      "The Czech Republic is a member of the Hague Apostille Convention. Indian educational, personal, and commercial documents intended for use in the Czech Republic generally require State HRD/SDM authentication and an MEA Apostille sticker alongside professional Czech translation.",
  },
  {
    id: "spanish-translation",
    slug: "/translation/spanish-translation",
    category: "international",
    cardTitle: "Spanish Translation",
    languageName: "Spanish",
    shortCardDescription:
      "Professional Spanish document translation for Spain and Latin American visa dossiers, birth and marriage certificates, PCC, degrees, and export records.",
    directionBadge: "International Language • Spanish",
    seoTitle:
      "Spanish Translation Services in India | Spanish Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Spanish translation services in India for birth, marriage, PCC, degree, legal and commercial documents. Spanish document translation for visa, apostille and embassy use.",
    h1: "Spanish Translation Services in India",
    heroBadge: "International Language Translation • Spain & Latin America",
    introParagraphs: [
      "Fatima Global Attestation offers professional Spanish translation services in India for applicants submitting educational, personal, legal, immigration, and commercial documents to Spain, Mexico, Chile, Colombia, Argentina, and other Spanish-speaking jurisdictions. We assist with both English to Spanish translation and Spanish to English translation formatted clearly for consular and institutional review.",
      "From Police Clearance Certificates (PCC), birth certificates, and marriage certificates for Spain residency and family visas to academic transcripts, powers of attorney, and commercial export invoices, our team ensures accurate terminology and exact passport spelling alignment, alongside complete MEA Apostille and embassy attestation guidance.",
    ],
    targetKeywords: [
      "Spanish translation services in India",
      "Spanish document translation",
      "Spanish to English translation",
      "English to Spanish translation",
      "document translation for Spain visa",
      "marriage certificate Spanish translation",
    ],
    primaryUseCases:
      "Spain study visa, work residence permit, family reunification, non-lucrative visa, and Latin American commercial trade filings.",
    commonDestinations: ["Spain", "Mexico", "Chile", "Colombia", "Argentina"],
    apostilleAttestationNote:
      "For Spain and other Hague Convention countries, original Indian certificates typically undergo SDM/HRD authentication and MEA Apostille before or alongside Spanish document translation.",
  },
  {
    id: "dutch-translation",
    slug: "/translation/dutch-translation",
    category: "international",
    cardTitle: "Dutch Translation",
    languageName: "Dutch",
    shortCardDescription:
      "Professional Dutch document translation for Netherlands and Belgium immigration, municipal registration, academic records, and corporate files.",
    directionBadge: "International Language • Dutch",
    seoTitle:
      "Dutch Translation Services in India | Dutch Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Dutch translation services in India for birth certificates, marriage certificates, degrees, legal and commercial documents for Netherlands and Belgium submissions.",
    h1: "Dutch Translation Services in India",
    heroBadge: "International Language Translation • Netherlands & Belgium",
    introParagraphs: [
      "Fatima Global Attestation provides professional Dutch translation services in India for personal, educational, legal, immigration, and commercial documents required in the Netherlands and Belgium. We coordinate English to Dutch translation and Dutch to English translation with clean tabular formatting that mirrors your source certificates.",
      "Applicants relocating to the Netherlands (IND / BRP municipal registration) or Belgium frequently require Dutch translation of birth certificates, marriage certificates, single status affidavits, degree certificates, and corporate incorporation records. We coordinate both the translation and the prerequisite SDM and MEA Apostille process.",
    ],
    targetKeywords: [
      "Dutch translation services in India",
      "Dutch document translation",
      "Dutch to English translation",
      "English to Dutch translation",
      "document translation for Netherlands visa",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Netherlands BRP municipal registration, MVV family & highly skilled migrant visas, Belgium work permits, and European corporate filings.",
    commonDestinations: ["Netherlands", "Belgium", "European Union"],
    apostilleAttestationNote:
      "Both the Netherlands and Belgium are Hague Apostille countries. We assist with obtaining the MEA Apostille on your original Indian certificates and preparing the accompanying Dutch translation.",
  },
  {
    id: "chinese-translation",
    slug: "/translation/chinese-translation",
    category: "international",
    cardTitle: "Chinese Translation",
    languageName: "Chinese",
    shortCardDescription:
      "Professional Chinese document translation for China work visas, student admissions, commercial trade contracts, certificates of incorporation, and personal records.",
    directionBadge: "International Language • Chinese",
    seoTitle:
      "Chinese Translation Services in India | Chinese Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Chinese translation services in India for degrees, PCC, marriage certificates, commercial invoices and legal documents for China visa, apostille and embassy use.",
    h1: "Chinese Translation Services in India",
    heroBadge: "International Language Translation • China & Taiwan Submissions",
    introParagraphs: [
      "Fatima Global Attestation provides professional Chinese translation services in India for educational, personal, legal, visa, and commercial documents. Whether you require English to Chinese translation or Chinese to English translation for employment permits, university admissions, family visas, or bilateral trade documentation, we deliver structured, accurate translations.",
      "Following China's accession to the Hague Apostille Convention, Indian documents submitted for use in mainland China generally require MEA Apostille along with accurate Chinese translation of degrees, police clearance certificates, marriage certificates, powers of attorney, and commercial agreements.",
    ],
    targetKeywords: [
      "Chinese translation services in India",
      "Chinese document translation",
      "Chinese to English translation",
      "English to Chinese translation",
      "document translation for China visa",
      "commercial document Chinese translation",
    ],
    primaryUseCases:
      "China Z-visa (work permit), X-visa (student admission), family reunion, WFOE company registration, and import-export documentation.",
    commonDestinations: ["China", "Taiwan", "Hong Kong SAR", "Singapore"],
    apostilleAttestationNote:
      "Mainland China accepts MEA Hague Apostille on Indian documents. Where required by Chinese employers, universities, or municipal authorities, we coordinate both MEA Apostille and Chinese document translation.",
  },
  {
    id: "portuguese-translation",
    slug: "/translation/portuguese-translation",
    category: "international",
    cardTitle: "Portuguese Translation",
    languageName: "Portuguese",
    shortCardDescription:
      "Professional Portuguese document translation for Portugal and Brazil visas, citizenship files, PCC, birth and marriage certificates, and academic degrees.",
    directionBadge: "International Language • Portuguese",
    seoTitle:
      "Portuguese Translation Services in India | Portuguese Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Portuguese translation services in India for PCC, birth, marriage, degree, legal and commercial documents. Coordinate Portuguese translation and MEA apostille.",
    h1: "Portuguese Translation Services in India",
    heroBadge: "International Language Translation • Portugal & Brazil",
    introParagraphs: [
      "Fatima Global Attestation provides professional Portuguese translation services in India for personal, educational, legal, immigration, and commercial documents destined for Portugal, Brazil, and other Lusophone countries. We handle both English to Portuguese translation and Portuguese to English translation with strict attention to passport name spellings, registration dates, and document structure.",
      "Applicants applying for Portugal D-visas, job seeker visas, family reunification, Portuguese nationality registration, or Brazilian work permits regularly require Portuguese translation of Police Clearance Certificates (PCC), birth certificates, marriage certificates, and educational degrees alongside MEA Apostille authentication.",
    ],
    targetKeywords: [
      "Portuguese translation services in India",
      "Portuguese document translation",
      "Portuguese to English translation",
      "English to Portuguese translation",
      "document translation for Portugal visa",
      "PCC Portuguese translation",
    ],
    primaryUseCases:
      "Portugal residence & work visas, Portuguese nationality/citizenship dossiers, Brazil visa filings, and commercial agreements.",
    commonDestinations: ["Portugal", "Brazil", "Angola", "Mozambique"],
    apostilleAttestationNote:
      "Portugal and Brazil are Hague Convention members. We coordinate SDM/HRD authentication, MEA Apostille on your original Indian certificates, and professional Portuguese document translation.",
  },
  {
    id: "german-translation",
    slug: "/translation/german-translation",
    category: "international",
    cardTitle: "German Translation",
    languageName: "German",
    shortCardDescription:
      "Professional German document translation for Germany & Austria study visas, Opportunity Card, EU Blue Card, family reunion, degrees, and personal certificates.",
    directionBadge: "International Language • German",
    seoTitle:
      "German Translation Services in India | German Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional German translation services in India for degree certificates, transcripts, marriage & birth certificates, legal and commercial documents for Germany and Austria.",
    h1: "German Translation Services in India",
    heroBadge: "International Language Translation • Germany, Austria & Switzerland",
    introParagraphs: [
      "Fatima Global Attestation provides professional German translation services in India for students, healthcare professionals, engineers, families, and companies preparing documents for Germany, Austria, and Switzerland. We coordinate English to German translation and German to English translation for academic, personal, legal, visa, and commercial records.",
      "Whether you are applying for a German student visa, Chancenkarte (Opportunity Card), EU Blue Card, professional licensing recognition (Anerkennung), marriage registration at a Standesamt, or Austrian residence permit, we ensure your German translation preserves the exact structure and passport spellings of your original certificates.",
    ],
    targetKeywords: [
      "German translation services in India",
      "German document translation",
      "German to English translation",
      "English to German translation",
      "degree certificate German translation",
      "document translation for Germany visa",
    ],
    primaryUseCases:
      "Germany study & work visas, nursing/medical professional recognition (Anerkennung), Austria red-white-red card, and corporate contracts.",
    commonDestinations: ["Germany", "Austria", "Switzerland"],
    apostilleAttestationNote:
      "For Austria, Switzerland, and European authorities, we coordinate State HRD/SDM authentication and MEA Apostille on your original certificates along with professional German document translation.",
  },
  {
    id: "russian-translation",
    slug: "/translation/russian-translation",
    category: "international",
    cardTitle: "Russian Translation",
    languageName: "Russian",
    shortCardDescription:
      "Professional Russian document translation for Russia and CIS university admissions, medical degrees, personal certificates, PoA, and commercial export files.",
    directionBadge: "International Language • Russian",
    seoTitle:
      "Russian Translation Services in India | Russian Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Russian translation services in India for educational, personal, legal, visa and commercial documents. Coordinate Russian document translation and MEA apostille.",
    h1: "Russian Translation Services in India",
    heroBadge: "International Language Translation • Russia & CIS Countries",
    introParagraphs: [
      "Fatima Global Attestation offers professional Russian translation services in India for educational, personal, legal, immigration, and commercial documents. We assist students, medical graduates, families, and exporters with English to Russian translation and Russian to English translation across India.",
      "From Indian school certificates, NEET/academic transcripts, and Police Clearance Certificates required for Russian university admissions to Russian-issued diplomas, birth certificates, powers of attorney, and pharmaceutical/commercial export documentation, we coordinate accurate translation alongside Notary, SDM, and MEA Apostille procedures.",
    ],
    targetKeywords: [
      "Russian translation services in India",
      "Russian document translation",
      "Russian to English translation",
      "English to Russian translation",
      "document translation for Russia student visa",
      "commercial document Russian translation",
    ],
    primaryUseCases:
      "Russian medical & engineering university admissions, employment visas, FMGE/NExT foreign degree evaluation, and Indo-Russian trade documents.",
    commonDestinations: ["Russian Federation", "Kazakhstan", "Uzbekistan", "Belarus"],
    apostilleAttestationNote:
      "Russia, Kazakhstan, Uzbekistan, and Belarus are members of the Hague Apostille Convention. We coordinate SDM/HRD authentication and MEA Apostille on your Indian documents together with Russian translation.",
  },
  {
    id: "korean-translation",
    slug: "/translation/korean-translation",
    category: "international",
    cardTitle: "Korean Translation",
    languageName: "Korean",
    shortCardDescription:
      "Professional Korean document translation for South Korea study, E-7 work visas, F-6 marriage visas, academic transcripts, family records, and corporate files.",
    directionBadge: "International Language • Korean",
    seoTitle:
      "Korean Translation Services in India | Korean Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Korean translation services in India for educational, personal, legal, visa and commercial documents. Coordinate Korean translation and MEA apostille.",
    h1: "Korean Translation Services in India",
    heroBadge: "International Language Translation • South Korea Submissions",
    introParagraphs: [
      "Fatima Global Attestation provides professional Korean translation services in India for educational, personal, legal, visa, and commercial documents required in South Korea. We assist applicants with English to Korean translation and Korean to English translation formatted cleanly for Korean embassies, universities, and corporate authorities.",
      "Whether you are preparing degree certificates and academic transcripts for GKS scholarships or Korean universities, birth and marriage certificates for F-6 spouse/family visas, or corporate agreements for South Korean business operations, we handle both the translation and MEA Apostille coordination.",
    ],
    targetKeywords: [
      "Korean translation services in India",
      "Korean document translation",
      "Korean to English translation",
      "English to Korean translation",
      "document translation for South Korea visa",
      "document translation for apostille",
    ],
    primaryUseCases:
      "South Korea student admission, E-7 professional employment visa, F-6 family/marriage visa, and corporate subsidiary registration.",
    commonDestinations: ["South Korea", "India"],
    apostilleAttestationNote:
      "South Korea is a Hague Apostille Convention country. Indian documents submitted to South Korean authorities typically require State HRD/SDM verification and MEA Apostille along with Korean or English documentation.",
  },
  {
    id: "vietnamese-translation",
    slug: "/translation/vietnamese-translation",
    category: "international",
    cardTitle: "Vietnamese Translation",
    languageName: "Vietnamese",
    shortCardDescription:
      "Professional Vietnamese document translation for Vietnam work permits, TRC applications, degree certificates, PCC, marriage records, and commercial trade files.",
    directionBadge: "International Language • Vietnamese",
    seoTitle:
      "Vietnamese Translation Services in India | Vietnamese Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Vietnamese translation services in India for degree certificates, PCC, experience letters, marriage certificates and commercial documents with embassy attestation.",
    h1: "Vietnamese Translation Services in India",
    heroBadge: "International Language Translation • Vietnam Work Permit & Embassy",
    introParagraphs: [
      "Fatima Global Attestation provides professional Vietnamese translation services in India for professionals, teachers, engineers, families, and exporters submitting documents to Vietnam. We coordinate English to Vietnamese translation and Vietnamese to English translation for educational, personal, legal, visa, and commercial records.",
      "Indian professionals applying for a Vietnam Work Permit or Temporary Residence Card (TRC) regularly need degree certificates, work experience letters, Police Clearance Certificates (PCC), and marriage/birth certificates translated and legalized. Because Vietnam is a non-Hague country, we also coordinate SDM/HRD authentication, MEA Normal Attestation, and Vietnam Embassy legalization in New Delhi.",
    ],
    targetKeywords: [
      "Vietnamese translation services in India",
      "Vietnamese document translation",
      "Vietnamese to English translation",
      "English to Vietnamese translation",
      "document translation for Vietnam work permit",
      "document translation for embassy attestation",
    ],
    primaryUseCases:
      "Vietnam Work Permit, Temporary Residence Card (TRC), family dependent visas, and bilateral export/import commercial invoices.",
    commonDestinations: ["Vietnam", "India"],
    apostilleAttestationNote:
      "Vietnam is not a member of the Hague Apostille Convention. Indian documents for Vietnam require State HRD/SDM authentication, MEA Normal Attestation, and Embassy of Vietnam legalization in New Delhi, alongside Vietnamese document translation where required.",
  },
  {
    id: "arabic-translation",
    slug: "/translation/arabic-translation",
    category: "international",
    cardTitle: "Arabic Translation",
    languageName: "Arabic",
    shortCardDescription:
      "Professional Arabic document translation in India for Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain, and Egypt visa, Wakala, MOFA, and embassy submissions.",
    directionBadge: "International Language • Arabic (Middle East & Gulf)",
    seoTitle:
      "Arabic Translation Services in India | Arabic Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Arabic translation services in India for marriage, birth, degree, Wakala, death claim, legal and commercial documents for Saudi Arabia, UAE, Qatar & Kuwait.",
    h1: "Arabic Translation Services in India",
    heroBadge: "International Language Translation • Gulf, MOFA & Arab Embassy Submissions",
    introParagraphs: [
      "Fatima Global Attestation provides dedicated Arabic translation services in India for personal, educational, legal, immigration, death claim, and commercial documents intended for Saudi Arabia, the United Arab Emirates (UAE), Qatar, Kuwait, Oman, Bahrain, Egypt, Iraq, Jordan, and other Arabic-speaking nations. We assist clients with both English to Arabic translation and Arabic to English translation.",
      "Arabic document translation for Gulf embassies, courts, and Ministries of Foreign Affairs (MOFA) requires strict formatting accuracy. Our translators mirror the tabular structure of your Indian marriage certificate, birth certificate, degree, Power of Attorney (Wakala), Legal Heir certificate, or commercial invoice while ensuring every name, passport number, and date matches your passport copy without discrepancy.",
    ],
    targetKeywords: [
      "Arabic translation services in India",
      "Arabic document translation",
      "English to Arabic translation",
      "Arabic to English translation",
      "marriage certificate Arabic translation",
      "Wakala Arabic translation",
      "document translation for embassy attestation",
    ],
    primaryUseCases:
      "Saudi Arabia family/work visas & death claim files (Wakala & Warisana), UAE/Qatar/Kuwait embassy legalization, MOFA attestation, and Arab export documentation.",
    commonDestinations: [
      "Saudi Arabia",
      "United Arab Emirates (UAE)",
      "Qatar",
      "Kuwait",
      "Oman",
      "Bahrain",
      "Egypt",
    ],
    apostilleAttestationNote:
      "Depending on the destination (such as Saudi Arabia or Oman under the Hague Convention, or UAE, Qatar, Kuwait, and Egypt via Normal MEA + Embassy Legalization + MOFA), we coordinate the complete attestation chain alongside your Arabic document translation.",
    customFaqs: [
      {
        question:
          "Why is passport-exact name matching important for Arabic document translation?",
        answer:
          "When translating an Indian certificate into Arabic for Saudi Arabia, UAE, Qatar, or Kuwait, phonetic transliteration of names must correspond accurately to your passport details. We cross-check every name, father's name, and passport number against your passport scan so there is no mismatch during embassy or MOFA verification.",
      },
      {
        question:
          "Do you translate Wakala (Power of Attorney) and Legal Heir documents into Arabic for Saudi Arabia?",
        answer:
          "Yes. We regularly assist families with English to Arabic translation of Legal Heir (Warisana) certificates, Death Certificates, Guardianship orders, and Wakala (Power of Attorney) documents, as well as Arabic to English translation of Saudi police, hospital, and court records.",
      },
      {
        question:
          "Can you coordinate both Arabic translation and MEA / Embassy attestation?",
        answer:
          "Yes. We provide complete coordination including Arabic document translation, Notary verification, SDM authentication, MEA Apostille or Normal Attestation, and Embassy legalization in New Delhi.",
      },
      {
        question:
          "How long does Arabic translation take for marriage, birth, or degree certificates?",
        answer:
          "Standard Arabic translation of personal and educational certificates is typically completed within 24 to 48 working hours. Multi-page legal powers of attorney or commercial agreements take 2 to 3 working days.",
      },
    ],
  },
  {
    id: "italian-translation",
    slug: "/translation/italian-translation",
    category: "international",
    cardTitle: "Italian Translation",
    languageName: "Italian",
    shortCardDescription:
      "Professional Italian document translation for Italy study visas, DOV / CIMEA academic dossiers, Nulla Osta family reunion, birth & marriage certificates.",
    directionBadge: "International Language • Italian",
    seoTitle:
      "Italian Translation Services in India | Italian Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Italian translation services in India for degree certificates, transcripts, birth & marriage certificates, affidavits and commercial documents for Italy visas.",
    h1: "Italian Translation Services in India",
    heroBadge: "International Language Translation • Italy Study, Work & Family Visas",
    introParagraphs: [
      "Fatima Global Attestation provides professional Italian translation services in India for students, workers, families, and businesses submitting documents to Italian diplomatic missions, universities, and municipalities (Comune). We coordinate both English to Italian translation and Italian to English translation.",
      "Applicants seeking an Italy student visa (Dichiarazione di Valore / DOV), family reunification visa (Nulla Osta al Ricongiungimento Familiare), Decreto Flussi work permit, or Italian municipality registration require accurate Italian translation of apostilled birth certificates, marriage certificates, family composition affidavits, degrees, and mark sheets.",
    ],
    targetKeywords: [
      "Italian translation services in India",
      "Italian document translation",
      "Italian to English translation",
      "English to Italian translation",
      "document translation for Italy visa",
      "birth and marriage certificate Italian translation",
    ],
    primaryUseCases:
      "Italy student visa & DOV academic evaluation, family reunification (Ricongiungimento Familiare), Decreto Flussi work visa, and corporate contracts.",
    commonDestinations: ["Italy", "Switzerland (Ticino)", "San Marino"],
    apostilleAttestationNote:
      "Italy is a Hague Apostille member. Indian original documents must first receive State HRD/SDM authentication and the MEA Apostille sticker before or alongside Italian translation for consular or municipal use.",
  },
  {
    id: "french-translation",
    slug: "/translation/french-translation",
    category: "international",
    cardTitle: "French Translation",
    languageName: "French",
    shortCardDescription:
      "Professional French document translation for France, Canada (Quebec / IRCC), Belgium, Switzerland, and Francophone country visa, academic, and legal submissions.",
    directionBadge: "International Language • French",
    seoTitle:
      "French Translation Services in India | French Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional French translation services in India for birth certificates, marriage certificates, degrees, PCC, legal and commercial documents for France, Canada & Belgium.",
    h1: "French Translation Services in India",
    heroBadge: "International Language Translation • France, Canada & Francophone Nations",
    introParagraphs: [
      "Fatima Global Attestation offers professional French translation services in India for educational, personal, legal, immigration, and commercial documents. We coordinate English to French translation and French to English translation for submissions to France, Canada, Belgium, Switzerland, Luxembourg, and Francophone African nations.",
      "Whether you need French translation of birth and marriage certificates for French long-stay visas and OFII/prefecture procedures, academic transcripts for Campus France, Police Clearance Certificates, or corporate export documents, our team delivers formatted translations paired with SDM and MEA Apostille assistance.",
    ],
    targetKeywords: [
      "French translation services in India",
      "French document translation",
      "French to English translation",
      "English to French translation",
      "document translation for France visa",
      "birth certificate French translation",
    ],
    primaryUseCases:
      "France long-stay visa & prefecture registration, Campus France admissions, Canada/Quebec immigration files, and Francophone export documentation.",
    commonDestinations: ["France", "Canada", "Belgium", "Switzerland", "Luxembourg"],
    apostilleAttestationNote:
      "France, Canada, Belgium, and Switzerland are members of the Hague Apostille Convention. We coordinate SDM/HRD authentication and MEA Apostille on your original certificates along with French document translation.",
  },
  {
    id: "hebrew-translation",
    slug: "/translation/hebrew-translation",
    category: "international",
    cardTitle: "Hebrew Translation",
    languageName: "Hebrew",
    shortCardDescription:
      "Professional Hebrew document translation for Israel employment visas, caregiver & construction permits, family documentation, PCC, birth and marriage certificates.",
    directionBadge: "International Language • Hebrew",
    seoTitle:
      "Hebrew Translation Services in India | Hebrew Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Hebrew translation services in India for PCC, birth certificates, marriage certificates, educational, legal and commercial documents for Israel submissions.",
    h1: "Hebrew Translation Services in India",
    heroBadge: "International Language Translation • Israel Visa & Legal Submissions",
    introParagraphs: [
      "Fatima Global Attestation provides professional Hebrew translation services in India for personal, educational, legal, immigration, and commercial documents required in Israel. We assist applicants and businesses with both English to Hebrew translation and Hebrew to English translation.",
      "With high demand for Israel B/1 work visas, caregiving and construction sector employment, academic research programs, and family status registration with the Population and Immigration Authority (PIBA), we coordinate accurate Hebrew document translation alongside SDM verification and MEA Apostille on your Indian certificates.",
    ],
    targetKeywords: [
      "Hebrew translation services in India",
      "Hebrew document translation",
      "Hebrew to English translation",
      "English to Hebrew translation",
      "document translation for Israel visa",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Israel B/1 employment visa, caregiver & skilled worker documentation, family status registration, and bilateral technology/commercial contracts.",
    commonDestinations: ["Israel", "India"],
    apostilleAttestationNote:
      "Israel is a member of the Hague Apostille Convention. Indian PCC, birth, marriage, and educational documents for Israel require SDM/HRD authentication and MEA Apostille alongside any required Hebrew translation.",
  },
  {
    id: "serbian-translation",
    slug: "/translation/serbian-translation",
    category: "international",
    cardTitle: "Serbian Translation",
    languageName: "Serbian",
    shortCardDescription:
      "Professional Serbian document translation for Serbia work permits, temporary residence filings, PCC, educational diplomas, and corporate registration records.",
    directionBadge: "International Language • Serbian",
    seoTitle:
      "Serbian Translation Services in India | Serbian Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Serbian translation services in India for educational, personal, PCC, legal, visa and commercial documents. Coordinate Serbian translation and MEA apostille.",
    h1: "Serbian Translation Services in India",
    heroBadge: "International Language Translation • Serbia Residence & Work Permits",
    introParagraphs: [
      "Fatima Global Attestation provides professional Serbian translation services in India for educational, personal, legal, visa, and commercial documents intended for use in the Republic of Serbia. We assist individuals and companies with English to Serbian translation and Serbian to English translation.",
      "Indian professionals, students, and businesses applying for Serbian Type D employment visas, temporary residence permits, diploma recognition, or company incorporation in Belgrade frequently require Serbian translation of Police Clearance Certificates, diplomas, marriage/birth certificates, and corporate documents alongside MEA Apostille authentication.",
    ],
    targetKeywords: [
      "Serbian translation services in India",
      "Serbian document translation",
      "Serbian to English translation",
      "English to Serbian translation",
      "document translation for Serbia visa",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Serbia Type D employment visa, temporary residence permit, academic diploma recognition, and corporate branch registration.",
    commonDestinations: ["Serbia", "Montenegro", "Bosnia and Herzegovina"],
    apostilleAttestationNote:
      "Serbia is a Hague Apostille Convention member. We assist with obtaining State HRD/SDM authentication and MEA Apostille on your Indian documents together with professional Serbian translation.",
  },

  // ============================================================================
  // SECTION 3: 12 INDIAN REGIONAL LANGUAGE TO ENGLISH TRANSLATION SERVICES
  // (Strictly Regional Language -> English direction only)
  // ============================================================================
  {
    id: "hindi-to-english",
    slug: "/translation/hindi-to-english",
    category: "regional-to-english",
    cardTitle: "Hindi to English Translation",
    languageName: "Hindi to English",
    shortCardDescription:
      "Professional Hindi to English document translation for birth, marriage, death, tehsil, affidavit, educational, and court records for MEA Apostille and foreign visas.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Hindi to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Hindi to English translation services in India for birth certificates, marriage certificates, affidavits, degrees, legal and commercial documents for visa & apostille.",
    h1: "Hindi to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Visa, MEA Apostille & Embassy Ready",
    introParagraphs: [
      "Fatima Global Attestation provides professional Hindi to English translation services in India for personal, educational, legal, immigration, and commercial documents. Many civil, municipal, tehsil, and judicial records issued across Uttar Pradesh, Bihar, Madhya Pradesh, Rajasthan, Haryana, Himachal Pradesh, Uttarakhand, Jharkhand, Chhattisgarh, and Delhi are issued in Hindi (Devanagari script) and must be translated into English before they can be accepted by the Ministry of External Affairs (MEA), foreign embassies, or overseas immigration authorities.",
      "We prepare formatted Hindi to English document translations that preserve the exact tabular layout of your original Hindi certificate while matching all names, parent names, and dates with your Passport copy. Where required for overseas use, we also coordinate Notary Public verification, SDM authentication, MEA Apostille, and Embassy legalization.",
    ],
    targetKeywords: [
      "Hindi to English translation services in India",
      "Hindi to English document translation",
      "Hindi to English translation",
      "marriage certificate Hindi to English translation",
      "birth certificate Hindi to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Converting Hindi-issued birth certificates, marriage certificates, death certificates, tehsil/domicile records, FIRs, court orders, and mark sheets into English for MEA Apostille, embassy attestation, and overseas visa filings.",
    commonDestinations: [
      "USA, UK, Canada & Australia Visas",
      "European Schengen Countries (Hague Apostille)",
      "UAE, Saudi Arabia, Qatar & Kuwait Embassies",
    ],
    apostilleAttestationNote:
      "The Ministry of External Affairs (MEA) does not apostille or attest certificates written only in Hindi unless accompanied by an English translation duly notarized and authenticated by the SDM or State Home Department. We handle the complete Hindi to English translation + Notary + SDM + MEA workflow.",
  },
  {
    id: "punjabi-to-english",
    slug: "/translation/punjabi-to-english",
    category: "regional-to-english",
    cardTitle: "Punjabi to English Translation",
    languageName: "Punjabi to English",
    shortCardDescription:
      "Professional Punjabi to English document translation for Gurmukhi birth, marriage (Anand Karaj), land/fard, revenue, affidavit, and court records for visas & MEA.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Punjabi to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Punjabi to English translation services in India for birth, marriage, Jamabandi/land records, affidavits, legal and educational documents for visa and apostille.",
    h1: "Punjabi to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Gurmukhi Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Punjabi to English translation services in India for certificates and official records issued in Punjabi (Gurmukhi script). Applicants from Punjab and Chandigarh applying for overseas student visas, spouse sponsorships, permanent residency, or visitor visas frequently hold birth certificates, marriage certificates, revenue records (Jamabandi / Fard), affidavits, and panchayat/municipal documents written in Punjabi.",
      "Foreign embassies, immigration departments (such as IRCC Canada, UKVI, USCIS, Home Affairs Australia, and European missions), and the Ministry of External Affairs (MEA) require Punjabi documents to be translated into English. We deliver accurate Punjabi to English translations with exact passport name matching and full Notary, SDM, and MEA Apostille assistance.",
    ],
    targetKeywords: [
      "Punjabi to English translation services in India",
      "Punjabi to English document translation",
      "Punjabi to English translation",
      "birth certificate Punjabi to English translation",
      "marriage certificate Punjabi to English translation",
      "document translation for visa",
    ],
    primaryUseCases:
      "Translating Punjabi birth/marriage certificates, Anand Karaj records, Jamabandi/Fard land valuation papers, police reports, and affidavits into English for visa and MEA Apostille submissions.",
    commonDestinations: [
      "Canada (IRCC), UK, USA, Australia & New Zealand",
      "Italy, Germany, Portugal & Schengen Europe",
      "UAE, Saudi Arabia & Gulf Countries",
    ],
    apostilleAttestationNote:
      "For Hague Apostille or Embassy Attestation, Punjabi-language certificates are translated into English, verified by a Notary Public, authenticated by the SDM, and then stamped by the MEA in New Delhi.",
  },
  {
    id: "marathi-to-english",
    slug: "/translation/marathi-to-english",
    category: "regional-to-english",
    cardTitle: "Marathi to English Translation",
    languageName: "Marathi to English",
    shortCardDescription:
      "Professional Marathi to English document translation for Maharashtra birth, marriage, 7/12 extract, domicile, school leaving, and legal records for MEA & visas.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Marathi to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Marathi to English translation services in India for birth, marriage, school leaving certificates, 7/12 extracts, legal and commercial documents for visa & apostille.",
    h1: "Marathi to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Maharashtra Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Marathi to English translation services in India for educational, personal, legal, immigration, and commercial documents issued in Marathi across Maharashtra. Municipal corporations, Gram Panchayats, schools, sub-registrar offices, and revenue departments in Mumbai, Pune, Nagpur, Nashik, Aurangabad, and Thane often issue records in Marathi.",
      "To use Marathi-language birth certificates, marriage registration certificates, school leaving certificates, 7/12 (Satbara) revenue extracts, property agreements, or court documents for overseas visas, university admissions, or MEA Apostille, an accurate Marathi to English translation is essential. We ensure every detail mirrors your source document and matches your passport spelling.",
    ],
    targetKeywords: [
      "Marathi to English translation services in India",
      "Marathi to English document translation",
      "Marathi to English translation",
      "marriage certificate Marathi to English translation",
      "birth certificate Marathi to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Translating Marathi municipal birth/marriage certificates, school leaving certificates, 7/12 land extracts, affidavits, and agreements into English for overseas visas and MEA legalization.",
    commonDestinations: [
      "USA, UK, Germany, Netherlands & Europe",
      "Canada & Australia Immigration",
      "UAE, Saudi Arabia, Qatar & Oman",
    ],
    apostilleAttestationNote:
      "When a Maharashtra-issued certificate is in Marathi, we coordinate Marathi to English translation followed by Notary verification, SDM authentication, and MEA Apostille or Embassy legalization.",
  },
  {
    id: "tamil-to-english",
    slug: "/translation/tamil-to-english",
    category: "regional-to-english",
    cardTitle: "Tamil to English Translation",
    languageName: "Tamil to English",
    shortCardDescription:
      "Professional Tamil to English document translation for Tamil Nadu birth, marriage, legal heir, community, property, educational, and court records.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Tamil to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Tamil to English translation services in India for birth, marriage, legal heir, educational, legal and commercial documents for visa, apostille & embassy use.",
    h1: "Tamil to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Tamil Nadu Document Translation",
    introParagraphs: [
      "Fatima Global Attestation offers professional Tamil to English translation services in India for personal, educational, legal, immigration, and commercial documents issued in Tamil across Tamil Nadu and Puducherry. While many modern certificates are bilingual, numerous older municipal birth records, Hindu/Christian/Muslim marriage records, Tahsildar legal heir certificates, property deeds, and court orders contain Tamil text or stamps.",
      "For submission to the Ministry of External Affairs (MEA), foreign embassies, or international immigration bodies, any Tamil-only entries or certificates must be accompanied by a clear Tamil to English translation. We format every translation to match the original document layout and coordinate Notary, SDM, and MEA Apostille or Embassy attestation.",
    ],
    targetKeywords: [
      "Tamil to English translation services in India",
      "Tamil to English document translation",
      "Tamil to English translation",
      "marriage certificate Tamil to English translation",
      "birth certificate Tamil to English translation",
      "document translation for visa",
    ],
    primaryUseCases:
      "Translating Tamil birth/marriage certificates, Tahsildar legal heir & community certificates, property settlement deeds, and court decrees into English for visa and MEA authentication.",
    commonDestinations: [
      "Singapore, Malaysia, UAE, Saudi Arabia & Qatar",
      "USA, UK, Canada, Germany & Europe",
      "Australia & New Zealand",
    ],
    apostilleAttestationNote:
      "We coordinate Tamil to English translation along with Notary endorsement, SDM verification, and MEA Apostille or Foreign Embassy legalization for all Tamil Nadu documents.",
  },
  {
    id: "kannada-to-english",
    slug: "/translation/kannada-to-english",
    category: "regional-to-english",
    cardTitle: "Kannada to English Translation",
    languageName: "Kannada to English",
    shortCardDescription:
      "Professional Kannada to English document translation for Karnataka birth, marriage, Nadakacheri/revenue, school, affidavit, and legal records for visas & MEA.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Kannada to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Kannada to English translation services in India for birth, marriage, Nadakacheri revenue records, degrees, legal and commercial documents for visa & apostille.",
    h1: "Kannada to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Karnataka Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Kannada to English translation services in India for personal, educational, legal, visa, and commercial documents issued in Kannada across Karnataka. Certificates issued by local municipalities, Gram Panchayats, Nadakacheri (Atalji Janasnehi Kendra), sub-registrar offices, and courts in Bengaluru, Mysuru, Mangaluru, Hubballi, and Belagavi frequently contain Kannada text.",
      "To submit Kannada-language birth certificates, marriage certificates, caste/income/domicile certificates, RTC/Pahani land records, or legal affidavits to foreign embassies, overseas universities, or the MEA for Apostille, an accurate Kannada to English translation is required. We ensure precise formatting and passport spelling consistency.",
    ],
    targetKeywords: [
      "Kannada to English translation services in India",
      "Kannada to English document translation",
      "Kannada to English translation",
      "birth certificate Kannada to English translation",
      "marriage certificate Kannada to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Translating Kannada municipal birth/marriage certificates, Nadakacheri revenue certificates, RTC land records, and legal deeds into English for overseas visas and MEA Apostille.",
    commonDestinations: [
      "USA, UK, Germany & European Union",
      "UAE, Saudi Arabia, Qatar & Kuwait",
      "Canada & Australia",
    ],
    apostilleAttestationNote:
      "We assist clients across Karnataka and pan-India with Kannada to English document translation, Notary verification, SDM authentication, and MEA Apostille or Embassy legalization.",
  },
  {
    id: "gujarati-to-english",
    slug: "/translation/gujarati-to-english",
    category: "regional-to-english",
    cardTitle: "Gujarati to English Translation",
    languageName: "Gujarati to English",
    shortCardDescription:
      "Professional Gujarati to English document translation for Gujarat birth, marriage, school leaving, 7/12 & 8A revenue, pedigree (Pedhinama), and legal documents.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Gujarati to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Gujarati to English translation services in India for birth, marriage, school leaving, Pedhinama, 7/12 revenue, legal and commercial documents for visa & apostille.",
    h1: "Gujarati to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Gujarat Document Translation",
    introParagraphs: [
      "Fatima Global Attestation offers professional Gujarati to English translation services in India for individuals, families, students, and businesses holding documents issued in Gujarati across Ahmedabad, Surat, Vadodara, Rajkot, Anand, Mehsana, and Kutch. Many municipal birth certificates, marriage registration certificates, school leaving certificates (LC), Pedhinama (family tree), and 7/12 & 8A revenue extracts are issued in Gujarati.",
      "When applying for immigrant or non-immigrant visas (USCIS, NVC, UKVI, IRCC Canada, Schengen Europe, Australia) or submitting documents for MEA Hague Apostille, Gujarati records must be accompanied by an accurate Gujarati to English translation. We format the English translation to mirror the Gujarati original and cross-verify all names against your passport.",
    ],
    targetKeywords: [
      "Gujarati to English translation services in India",
      "Gujarati to English document translation",
      "Gujarati to English translation",
      "birth certificate Gujarati to English translation",
      "marriage certificate Gujarati to English translation",
      "document translation for visa",
    ],
    primaryUseCases:
      "Translating Gujarati birth/marriage certificates, school leaving certificates, Pedhinama, 7/12 land records, and partnership deeds into English for USA/UK/Canada/Europe visas and MEA Apostille.",
    commonDestinations: [
      "USA (USCIS / NVC), UK, Canada & Australia",
      "Portugal, Germany, Italy & Schengen Europe",
      "UAE, Oman & East Africa",
    ],
    apostilleAttestationNote:
      "For Gujarati documents requiring MEA Apostille or Embassy attestation, we coordinate Gujarati to English translation, Notary verification, SDM authentication, and MEA stamping in New Delhi.",
  },
  {
    id: "bangla-to-english",
    slug: "/translation/bangla-to-english",
    category: "regional-to-english",
    cardTitle: "Bangla to English Translation",
    languageName: "Bangla to English",
    shortCardDescription:
      "Professional Bangla to English document translation for Bengali birth, marriage, Khatian/land, educational, affidavit, and legal records for MEA & visas.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Bangla to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Bangla to English translation services in India for birth certificates, marriage certificates, degrees, legal and commercial documents for visa and apostille.",
    h1: "Bangla to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Bangla / Bengali Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Bangla to English translation services in India for personal, educational, legal, immigration, and commercial documents written in Bangla (Bengali script). Certificates issued by panchayats, municipalities, marriage registrars, boards, and courts across West Bengal and Tripura frequently contain Bangla entries.",
      "To use Bangla-language birth certificates, marriage certificates, legal heir certificates, Khatian/Porcha land deeds, or court decrees for international visa applications, overseas higher education, or MEA Apostille, we prepare a mirror-formatted Bangla to English document translation and coordinate Notary, SDM, and MEA authentication.",
    ],
    targetKeywords: [
      "Bangla to English translation services in India",
      "Bangla to English document translation",
      "Bangla to English translation",
      "marriage certificate Bangla to English translation",
      "birth certificate Bangla to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Translating Bangla municipal/panchayat birth and marriage certificates, Khatian land records, affidavits, and academic certificates into English for visa and MEA legalization.",
    commonDestinations: [
      "UK, USA, Germany, Italy & Europe",
      "Canada & Australia",
      "UAE, Saudi Arabia & Qatar",
    ],
    apostilleAttestationNote:
      "Bangla-only certificates must be translated into English and notarized prior to SDM and MEA Apostille or Embassy attestation. We coordinate the entire process from start to finish.",
  },
  {
    id: "urdu-to-english",
    slug: "/translation/urdu-to-english",
    category: "regional-to-english",
    cardTitle: "Urdu to English Translation",
    languageName: "Urdu to English",
    shortCardDescription:
      "Professional Urdu to English document translation for Nikahnama (marriage certificates), Qazi records, birth/death certificates, succession/Warisana, and revenue records.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Urdu to English Translation Services in India | Nikahnama & Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Urdu to English translation services in India for Nikahnama, marriage certificates, birth records, Warisana, revenue and legal documents for visa & apostille.",
    h1: "Urdu to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Nikahnama, Civil & Revenue Records",
    introParagraphs: [
      "Fatima Global Attestation specializes in professional Urdu to English translation services in India for personal, legal, revenue, and civil documents written in Urdu script. One of the most common requirements for spouse visa, family residence visa, and passport endorsement applications is the accurate Urdu to English translation of an Islamic Marriage Certificate (Nikahnama) issued by a Qazi, Shahi Imam, or Waqf Board.",
      "In addition to Nikahnama translation, we translate Urdu revenue and land records (Siyaha, Intekhab, Jamabandi, Mutation registers), succession/Warisana certificates, birth and death records, and judicial documents from Jammu & Kashmir, Telangana, Uttar Pradesh, Bihar, and Delhi into clear, structured English matched character-for-character with your passport.",
    ],
    targetKeywords: [
      "Urdu to English translation services in India",
      "Urdu to English document translation",
      "Urdu to English translation",
      "Nikahnama Urdu to English translation",
      "marriage certificate Urdu to English translation",
      "document translation for embassy attestation",
    ],
    primaryUseCases:
      "Translating Urdu Nikahnama (marriage certificates), Divorce/Talaqnama deeds, Warisana/Legal Heir certificates, and Urdu revenue/tehsil records into English for MEA Apostille, Gulf Embassies, and western family visas.",
    commonDestinations: [
      "Saudi Arabia, UAE, Qatar, Kuwait, Oman & Bahrain",
      "UK, USA, Canada & Australia Spouse Visas",
      "Germany, Italy, France & Schengen Europe",
    ],
    apostilleAttestationNote:
      "An Urdu Nikahnama or Urdu civil certificate cannot be directly stamped by the MEA or foreign embassies without an accompanying English translation. We coordinate Urdu to English translation, Notary verification, SDM authentication, and MEA Apostille or Gulf Embassy attestation.",
    customFaqs: [
      {
        question:
          "Can you translate an Urdu Nikahnama into English for a UAE, Saudi, UK, or US spouse visa?",
        answer:
          "Yes. We regularly translate Urdu Nikahnama documents into formatted English while matching the bride's, groom's, and parents' names exactly with their passports. We can also coordinate Notary, SDM, MEA, and Embassy attestation on the document.",
      },
      {
        question:
          "Do you also translate Urdu revenue, land, or Jammu & Kashmir tehsil records into English?",
        answer:
          "Yes. We provide Urdu to English translation for revenue extracts, Jamabandi, Intekhab, domicile certificates, birth/death records, and court documents.",
      },
      {
        question:
          "What documents do I need to share for Urdu to English Nikahnama translation?",
        answer:
          "Please share a clear scan or photo of the complete Urdu Nikahnama along with passport copies of both the husband and wife so we can lock in exact English spellings before finalizing the translation.",
      },
    ],
  },
  {
    id: "malayalam-to-english",
    slug: "/translation/malayalam-to-english",
    category: "regional-to-english",
    cardTitle: "Malayalam to English Translation",
    languageName: "Malayalam to English",
    shortCardDescription:
      "Professional Malayalam to English document translation for Kerala birth, marriage, family membership, village office, property, and court records for visas & MEA.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Malayalam to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Malayalam to English translation services in India for birth, marriage, village office, property, legal and educational documents for visa, apostille & embassy use.",
    h1: "Malayalam to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Kerala Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Malayalam to English translation services in India for personal, educational, legal, immigration, and commercial documents issued in Malayalam across Kerala. Village office certificates, panchayat/municipal birth and marriage entries, Thandaper/possession certificates, relationship certificates, property settlement deeds, and judicial records often contain Malayalam text.",
      "When submitting Kerala-issued Malayalam documents for Gulf employment/family visas, European Schengen visas, UK/US/Canada/Australia immigration, or MEA Apostille, a clear and structured Malayalam to English translation is required. We ensure accurate formatting and coordinate Notary, SDM, and MEA legalization.",
    ],
    targetKeywords: [
      "Malayalam to English translation services in India",
      "Malayalam to English document translation",
      "Malayalam to English translation",
      "marriage certificate Malayalam to English translation",
      "birth certificate Malayalam to English translation",
      "document translation for visa",
    ],
    primaryUseCases:
      "Translating Malayalam village office certificates, older birth/marriage records, relationship & legal heir certificates, and property deeds into English for overseas visas and MEA authentication.",
    commonDestinations: [
      "UAE, Saudi Arabia, Qatar, Kuwait, Oman & Bahrain",
      "UK, Ireland, Germany, Italy & Malta",
      "USA, Canada, Australia & New Zealand",
    ],
    apostilleAttestationNote:
      "We coordinate Malayalam to English translation along with Notary verification, SDM authentication, and MEA Apostille or Gulf Embassy legalization in New Delhi.",
  },
  {
    id: "telugu-to-english",
    slug: "/translation/telugu-to-english",
    category: "regional-to-english",
    cardTitle: "Telugu to English Translation",
    languageName: "Telugu to English",
    shortCardDescription:
      "Professional Telugu to English document translation for Telangana & Andhra Pradesh birth, marriage, MeeSeva/revenue, Pahani, property, and legal records.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Telugu to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Telugu to English translation services in India for birth, marriage, MeeSeva revenue records, property deeds, legal and educational documents for visa & apostille.",
    h1: "Telugu to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Telangana & Andhra Pradesh Records",
    introParagraphs: [
      "Fatima Global Attestation offers professional Telugu to English translation services in India for personal, educational, legal, immigration, and commercial documents written in Telugu from Telangana and Andhra Pradesh. Many municipal/gram panchayat birth and marriage records, MeeSeva revenue certificates, Adangal/Pahani land records, sub-registrar property deeds, and court orders are issued in Telugu.",
      "For F-1/H-1B/green card filings in the USA, Canada PR, UK/Australia visas, European Schengen applications, or MEA Apostille, any Telugu-language certificate must be accompanied by an accurate Telugu to English translation. We prepare mirror-layout translations and coordinate complete Notary, SDM, and MEA attestation.",
    ],
    targetKeywords: [
      "Telugu to English translation services in India",
      "Telugu to English document translation",
      "Telugu to English translation",
      "birth certificate Telugu to English translation",
      "marriage certificate Telugu to English translation",
      "document translation for visa",
    ],
    primaryUseCases:
      "Translating Telugu birth/marriage certificates, MeeSeva/revenue records, Adangal/Pahani land documents, property sale deeds, and affidavits into English for visa and MEA submissions.",
    commonDestinations: [
      "USA (USCIS / Consular), Canada, UK & Australia",
      "Germany, Italy & European Union",
      "UAE, Saudi Arabia & Qatar",
    ],
    apostilleAttestationNote:
      "For Telugu documents requiring MEA Apostille or Embassy attestation, we handle the Telugu to English translation, Notary verification, SDM authentication, and MEA stamping.",
  },
  {
    id: "assamese-to-english",
    slug: "/translation/assamese-to-english",
    category: "regional-to-english",
    cardTitle: "Assamese to English Translation",
    languageName: "Assamese to English",
    shortCardDescription:
      "Professional Assamese to English document translation for Assam birth, marriage, Gaonburah/circle officer, Jamabandi, academic, and legal records for visas & MEA.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Assamese to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Assamese to English translation services in India for birth, marriage, circle office revenue records, degrees, legal and commercial documents for visa & apostille.",
    h1: "Assamese to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Assam Document Translation",
    introParagraphs: [
      "Fatima Global Attestation provides professional Assamese to English translation services in India for personal, educational, legal, immigration, and commercial documents issued in Assamese across Assam. Certificates issued by municipal boards, Circle Officers, Gaonburahs, marriage registrars, and courts in Guwahati, Dibrugarh, Silchar, Jorhat, and Tezpur frequently contain Assamese script.",
      "To submit Assamese-language birth certificates, marriage certificates, Next-of-Kin/legal heir certificates, Jamabandi land records, or academic documents to the Ministry of External Affairs (MEA) or foreign embassies, we prepare accurate Assamese to English translations and coordinate Notary, SDM, and MEA Apostille or Embassy legalization.",
    ],
    targetKeywords: [
      "Assamese to English translation services in India",
      "Assamese to English document translation",
      "Assamese to English translation",
      "birth certificate Assamese to English translation",
      "marriage certificate Assamese to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Translating Assamese birth/marriage certificates, Circle Office/revenue certificates, Jamabandi land records, and legal affidavits into English for overseas visas and MEA legalization.",
    commonDestinations: [
      "UK, USA, Germany & European Union",
      "UAE, Saudi Arabia, Qatar & Kuwait",
      "Australia, Canada & Southeast Asia",
    ],
    apostilleAttestationNote:
      "Assamese certificates intended for international use are translated into English, verified by a Notary Public, authenticated by the SDM, and then apostilled or attested by the MEA in New Delhi.",
  },
  {
    id: "odia-to-english",
    slug: "/translation/odia-to-english",
    category: "regional-to-english",
    cardTitle: "Odia to English Translation",
    languageName: "Odia to English",
    shortCardDescription:
      "Professional Odia to English document translation for Odisha birth, marriage, Tahasildar/e-District, RoR (Patta), academic, and legal records for visas & MEA.",
    directionBadge: "Indian Regional Language → English",
    seoTitle:
      "Odia to English Translation Services in India | Document Translation | Fatima Global Attestation",
    metaDescription:
      "Professional Odia to English translation services in India for birth, marriage, Tahasildar revenue records, legal heir, educational and commercial documents for visa & apostille.",
    h1: "Odia to English Translation Services in India",
    heroBadge: "Indian Regional Language to English • Odisha Document Translation",
    introParagraphs: [
      "Fatima Global Attestation offers professional Odia to English translation services in India for personal, educational, legal, immigration, and commercial documents written in Odia script across Odisha. Municipal bodies, Gram Panchayats, Tahasildar offices, sub-registrars, and courts in Bhubaneswar, Cuttack, Rourkela, Berhampur, and Sambalpur frequently issue certificates or endorsements in Odia.",
      "Whether you need Odia to English translation for a birth certificate, marriage certificate, legal heir certificate, Record of Rights (RoR / Khatian / Patta), or school leaving record for overseas visa submission or MEA Apostille, we prepare clean mirror-formatted translations matched with your passport spelling.",
    ],
    targetKeywords: [
      "Odia to English translation services in India",
      "Odia to English document translation",
      "Odia to English translation",
      "birth certificate Odia to English translation",
      "marriage certificate Odia to English translation",
      "document translation for apostille",
    ],
    primaryUseCases:
      "Translating Odia birth/marriage certificates, Tahasildar legal heir & residence records, RoR/Patta land documents, and court orders into English for visa and MEA authentication.",
    commonDestinations: [
      "USA, UK, Germany, Italy & Europe",
      "UAE, Saudi Arabia, Qatar, Oman & Bahrain",
      "Canada & Australia",
    ],
    apostilleAttestationNote:
      "We coordinate Odia to English document translation together with Notary verification, SDM authentication, and MEA Apostille or Foreign Embassy legalization.",
  },
];

function buildLanguagePageData(seed: RawLanguageSeed): LanguageTranslationPageData {
  const isRegional = seed.category === "regional-to-english";
  const label = seed.languageName;

  const educationalDescription = isRegional
    ? `We provide accurate ${label} translation for educational documents including Degree Certificates, Diplomas, Mark Sheets, Academic Transcripts, School Certificates, Transfer Certificates, and Board Passing Certificates. All university names, subjects, roll numbers, and grading scales are formatted clearly in English for overseas universities, credential evaluation agencies (WES / IQAS / Anabin), and MEA Apostille.`
    : `We provide professional ${label} translation for educational documents including Degree Certificates, Diplomas, Mark Sheets, Academic Transcripts, and School Certificates. Whether you are applying to universities abroad, seeking professional qualification recognition, or submitting foreign academic records in India, every subject, grade table, and institutional seal annotation is accurately formatted.`;

  const personalDescription = isRegional
    ? `Civil and personal documents issued by state municipalities, panchayats, or tehsil offices in regional script require ${label} translation before visa or MEA submission. We translate Birth Certificates, Marriage Certificates, Death Certificates, Affidavits, Passports, Driving Licences, Domicile Certificates, and Family Relationship records while matching every name and date with your Passport copy.`
    : `Personal status documents for family reunification, spouse visas, residence permits, and civil registration abroad often require ${label} translation. We translate Birth Certificates, Marriage Certificates, Death Certificates, Single Status Affidavits, Passports, and Driving Licences with mirror-layout formatting and strict passport spelling verification.`;

  const legalDescription = isRegional
    ? `Legal and judicial records written in regional script must be translated into clear English for use before foreign embassies, the MEA, or higher courts. We handle ${label} translation for Power of Attorney (PoA), Court Documents, Legal Heir / Succession Certificates, Property & Land Agreements, FIRs, and Legal Notices.`
    : `Cross-border legal matters, inheritance claims, and international authorizations require precise ${label} legal document translation. We translate Power of Attorney (PoA / Wakala), Court Judgments & Decrees, Legal Heir Certificates, Contracts, Agreements, and Legal Notices while preserving clause numbering and legal terminology.`;

  const immigrationVisaDescription = isRegional
    ? `Foreign embassies, consulates, and immigration departments worldwide require non-English Indian documents to be accompanied by a complete English translation. Our ${label} translation service prepares Police Clearance Certificates (PCC), Sponsorship Declarations, Employment & Experience Letters, Bank/Financial Statements, and Civil Status records for smooth visa processing.`
    : `Consular missions and immigration authorities require supporting visa dossiers to be presented in their official language or English. We assist visa applicants with ${label} document translation for Police Clearance Certificates (PCC), Employment Contracts, Experience Certificates, Medical Fitness Reports, and Residence Permit files.`;

  const commercialDescription = isRegional
    ? `Businesses, exporters, and proprietors submitting state-issued trade licenses, partnership deeds, or local tax/revenue records for international banking or Chamber of Commerce endorsement rely on our ${label} commercial document translation for Invoices, Business Agreements, Company Documents, and Certificates of Incorporation.`
    : `International trade, branch setup, customs clearance, and overseas tender filings require accurate ${label} commercial translation. We translate Commercial Invoices, Certificates of Origin, Business Agreements, Memorandum & Articles of Association (MoA/AoA), Company Documents, Board Resolutions, and Certificates of Incorporation.`;

  const processSteps = [
    {
      step: 1,
      title: "Share Document Scan & Passport Copy",
      description: `Send a clear PDF scan or photo of your original document along with a copy of your Passport on WhatsApp or Email so our team can confirm the ${label} translation scope and lock in exact English passport name spellings.`,
    },
    {
      step: 2,
      title: "Structured Translation & Formatting",
      description: `Our language specialists prepare the ${label} translation in a clean mirror layout that corresponds section-by-section to your original certificate, including all registration numbers, dates, and seal notations.`,
    },
    {
      step: 3,
      title: "Draft Review & Accuracy Check",
      description:
        "We share a digital draft with you to verify that all personal names, parent names, dates, and document particulars match your passport and supporting records without any discrepancy.",
    },
    {
      step: 4,
      title: "Notary, SDM, MEA Apostille or Embassy Coordination (If Required)",
      description:
        "Depending on your destination country and purpose, we deliver the final translated document via PDF/courier and can also coordinate Notary verification, SDM authentication, MEA Apostille, or Foreign Embassy attestation in New Delhi.",
    },
  ];

  const defaultFaqs: LanguageTranslationFAQ[] = [
    {
      question: `What documents can be submitted for ${seed.cardTitle}?`,
      answer: `We accept Educational documents (Degree Certificates, Diplomas, Mark Sheets, Academic Transcripts, School Certificates), Personal documents (Birth Certificates, Marriage Certificates, Death Certificates, Affidavits, Passports, Driving Licences), Legal documents (Power of Attorney, Court Documents, Agreements, Legal Notices), Immigration/Visa files, and Commercial documents (Invoices, Business Agreements, Company Documents, Certificates of Incorporation).`,
    },
    {
      question: `Why do you ask for a Passport copy before starting ${seed.cardTitle}?`,
      answer: `Matching the exact spelling of your name, spouse's name, and parents' names with your Passport is critical for visa, MEA Apostille, and embassy submissions. Cross-checking against your Passport copy ensures zero spelling discrepancy in the translated document.`,
    },
    {
      question: `Can Fatima Global Attestation also assist with Apostille or Embassy Attestation after ${seed.cardTitle}?`,
      answer: `Yes. In addition to ${seed.cardTitle.toLowerCase()}, we assist clients with Notary Public verification, SDM/State authentication, Ministry of External Affairs (MEA) Hague Apostille, and Foreign Embassy or MOFA attestation depending on your destination country.`,
    },
    {
      question: `Do I need to send the original physical certificate for ${seed.cardTitle}?`,
      answer: `If you only require document translation, a clear PDF scan or high-resolution photo sent on WhatsApp or Email is sufficient. Original physical certificates are only needed if your destination authority also requires physical SDM, MEA Apostille, or Embassy stamps on the original document.`,
    },
    {
      question: `How long does ${seed.cardTitle} take in India?`,
      answer: `Standard 1–2 page personal or educational certificates typically take 24 to 48 working hours for translation. Multi-page legal agreements, academic transcripts, or commercial dossiers generally take 2 to 4 working days depending on word count and formatting.`,
    },
  ];

  const optimizedTitle = `${seed.cardTitle} in India | Fatima Global Attestation`;
  const optimizedDescription = seed.metaDescription
    .replace(/\s*Coordinate\s.*$/i, " Coordinate translation with MEA apostille & attestation.")
    .replace(" for educational, personal, legal, visa and commercial documents", " for educational, personal, legal & commercial records")
    .replace(" for birth, marriage, Jamabandi/land records, affidavits, legal and educational documents", " for birth, marriage, land records, affidavits & legal records")
    .replace(" for birth, marriage, school leaving certificates, 7/12 extracts, legal and commercial documents", " for birth, marriage, 7/12 extracts & legal documents")
    .replace(" for birth, marriage, school leaving, Pedhinama, 7/12 revenue, legal and commercial documents", " for birth, marriage, 7/12 revenue & legal documents")
    .replace(" for birth, marriage, Nadakacheri revenue records, degrees, legal and commercial documents", " for birth, marriage, revenue records & legal documents")
    .replace(" for birth, marriage, MeeSeva revenue records, property deeds, legal and educational documents", " for birth, marriage, MeeSeva records & degrees")
    .replace(" for birth, marriage, village office, property, legal and educational documents", " for birth, marriage, village revenue & degree records")
    .replace(" for birth, marriage, circle office revenue records, degrees, legal and commercial documents", " for birth, marriage, circle revenue & legal documents")
    .replace(" for birth, marriage, Tahasildar revenue records, legal heir, educational and commercial documents", " for birth, marriage, Tahasildar records & degrees")
    .replace(" for birth certificates, marriage certificates, affidavits, degrees, legal and commercial documents", " for birth, marriage, affidavits, degrees & legal records")
    .replace(" for birth certificates, marriage certificates, degrees, legal and commercial documents", " for birth, marriage, degrees & legal records")
    .replace(" for birth, marriage, PCC, degree, legal and commercial documents. Spanish document translation for visa, apostille and embassy use.", " for birth, marriage, PCC, degree & legal records. Spanish translation with MEA apostille.")
    .replace(" for degrees, PCC, marriage certificates, commercial invoices and legal documents for China visa, apostille and embassy use.", " for degrees, PCC, marriage & corporate papers. Chinese translation with MEA apostille.")
    .replace(" for degree certificates, transcripts, marriage & birth certificates, legal and commercial documents for Germany and Austria.", " for degrees, transcripts, marriage & birth records. German translation with MEA apostille.")
    .replace(" for degree certificates, PCC, experience letters, marriage certificates and commercial documents with embassy attestation.", " for degrees, PCC, marriage & corporate papers. Vietnamese translation with embassy attestation.")
    .replace(" for marriage, birth, degree, Wakala, death claim, legal and commercial documents for Saudi Arabia, UAE, Qatar & Kuwait.", " for marriage, birth, degree, Wakala & commercial records for Saudi Arabia, UAE, Qatar & Kuwait.")
    .replace(" for degree certificates, transcripts, birth & marriage certificates, affidavits and commercial documents for Italy visas.", " for degrees, transcripts, birth & marriage records. Italian translation with MEA apostille.")
    .replace(" for birth certificates, marriage certificates, degrees, PCC, legal and commercial documents for France, Canada & Belgium.", " for birth, marriage, degrees & PCC. French translation with MEA apostille.")
    .replace(" for PCC, birth certificates, marriage certificates, educational, legal and commercial documents for Israel submissions.", " for PCC, birth, marriage & degree records. Hebrew translation with MEA apostille.")
    .replace(" for PCC, birth, marriage, degree, legal and commercial documents. Coordinate translation with MEA apostille & attestation.", " for PCC, birth, marriage & degrees. Portuguese translation with MEA apostille.")
    .replace(" for educational, personal, PCC, legal, visa and commercial documents. Coordinate translation with MEA apostille & attestation.", " for educational, personal, PCC & legal documents. Serbian translation with MEA apostille.")
    .replace(" for Nikahnama, marriage certificates, birth records, Warisana, revenue and legal documents for visa & apostille.", " for Nikahnama, marriage, birth, Warisana, revenue & legal records for visa and apostille.")
    .replace(" for birth, marriage, legal heir, educational, legal and commercial documents for visa, apostille & embassy use.", " for birth, marriage, legal heir & degree records for visa, apostille and embassy use.");

  return {
    id: seed.id,
    slug: seed.slug,
    category: seed.category,
    cardTitle: seed.cardTitle,
    languageName: seed.languageName,
    shortCardDescription: seed.shortCardDescription,
    directionBadge: seed.directionBadge,
    seoTitle: optimizedTitle,
    metaDescription: optimizedDescription,
    h1: seed.h1,
    heroBadge: seed.heroBadge,
    introParagraphs: seed.introParagraphs,
    targetKeywords: seed.targetKeywords,
    primaryUseCases: seed.primaryUseCases,
    commonDestinations: seed.commonDestinations,
    educationalDescription,
    personalDescription,
    legalDescription,
    immigrationVisaDescription,
    commercialDescription,
    apostilleAttestationNote: seed.apostilleAttestationNote,
    processSteps,
    faqs: seed.customFaqs
      ? [...seed.customFaqs, ...defaultFaqs]
      : defaultFaqs,
  };
}

export const ALL_LANGUAGE_TRANSLATION_PAGES: LanguageTranslationPageData[] =
  RAW_LANGUAGE_SEEDS.map(buildLanguagePageData);

export const INTERNATIONAL_LANGUAGE_PAGES: LanguageTranslationPageData[] =
  ALL_LANGUAGE_TRANSLATION_PAGES.filter((p) => p.category === "international");

export const REGIONAL_TO_ENGLISH_LANGUAGE_PAGES: LanguageTranslationPageData[] =
  ALL_LANGUAGE_TRANSLATION_PAGES.filter(
    (p) => p.category === "regional-to-english"
  );

export function getLanguageTranslationByPath(
  rawPath: string
): LanguageTranslationPageData | undefined {
  const clean = (rawPath || "").split("?")[0].replace(/\/+$/, "");
  return ALL_LANGUAGE_TRANSLATION_PAGES.find((p) => p.slug === clean);
}
