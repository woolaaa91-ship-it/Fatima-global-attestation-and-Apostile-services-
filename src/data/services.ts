/**
 * FATIMA GLOBAL ATTESTATION - Core Services Data
 * 8 Core services with full SEO metadata, workflows, eligibility, and FAQs.
 */

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  badge: string;
  image?: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  whoNeeds: string[];
  eligibleDocuments: {
    category: string;
    items: string[];
  }[];
  stepByStepProcess: {
    step: number;
    title: string;
    description: string;
  }[];
  requiredDocuments: string[];
  importantNotes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedServices: string[];
  whatsappMessage: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "sdm-apostille",
    slug: "/sdm-apostille-services",
    title: "SDM + Apostille Services",
    shortTitle: "SDM + Apostille",
    badge: "Personal & Educational Documents",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-17-63_96b26121e545231a3c569311a54cda96_e0d5ca42.jpg",
    summary:
      "Assistance with Sub-Divisional Magistrate (SDM) authentication followed by Ministry of External Affairs (MEA) Apostille for eligible Indian documents destined for Hague Convention member countries.",
    seoTitle: "SDM + Apostille Services in India | FATIMA GLOBAL ATTESTATION",
    metaDescription:
      "Professional assistance for SDM verification and MEA Apostille for personal and non-educational documents destined for Hague Convention countries.",
    intro:
      "When Indian documents need authentication for use in countries that are signatories to the 1961 Hague Apostille Convention, the SDM + Apostille route is a widely recognized and accepted pathway for eligible personal and certain non-educational certificates. Under this process, the document is first authenticated by a designated Sub-Divisional Magistrate (SDM) before submission to the Ministry of External Affairs (MEA) for the apostille sticker.",
    whoNeeds: [
      "Individuals moving abroad for employment, higher studies, or family settlement in Hague member countries.",
      "Spouses applying for family reunion or dependent visas requiring authenticated marriage certificates.",
      "Parents processing foreign birth registration or international school admissions for their children.",
      "Professionals and expatriates needing personal affidavit, single status, or power of attorney legalization.",
    ],
    eligibleDocuments: [
      {
        category: "Personal Certificates",
        items: [
          "Birth Certificates",
          "Marriage Certificates",
          "Single Status / Unmarried Affidavits",
          "Death Certificates",
          "Divorce Decrees & Court Orders",
        ],
      },
      {
        category: "Legal & Notarial Documents",
        items: [
          "General & Special Power of Attorney (POA)",
          "Personal Affidavits & Declarations",
          "Police Clearance Certificates (PCC) issued by local authorities",
          "Medical Fitness & Health Certificates",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Preliminary Document Verification",
        description:
          "We review clear scanned copies of your original document and passport to ensure eligibility and verify name consistency and issuing authority criteria.",
      },
      {
        step: 2,
        title: "Notary Authentication",
        description:
          "The document undergoes preliminary notarization by an authorized advocate notary where mandated by jurisdiction guidelines.",
      },
      {
        step: 3,
        title: "SDM Legalization",
        description:
          "The document is submitted to the designated Sub-Divisional Magistrate (SDM) for official verification and formal magistrate stamping.",
      },
      {
        step: 4,
        title: "MEA Apostille Sticker Affixation",
        description:
          "Upon SDM completion, the document is presented to the Ministry of External Affairs (MEA) for the official Hague Apostille sticker with a unique verification serial number.",
      },
      {
        step: 5,
        title: "Secure Dispatch or Handover",
        description:
          "The apostilled original document is safely returned to you via trackable secure courier or arranged for direct collection.",
      },
    ],
    requiredDocuments: [
      "Original Document/Certificate requiring Apostille",
      "Clear color copy of the document holder's Passport (first & last pages)",
      "Aadhaar card or Government ID copy (if applicable for address matching)",
      "Authorization letter (where required by designated processing centers)",
    ],
    importantNotes: [
      "Acceptance of the SDM route depends on the receiving destination country's specific guidelines. Some foreign authorities or embassies may specifically request State Home Department / HRD authentication instead.",
      "The document must be physically intact, without lamination on the reverse side where stamps and stickers are affixed.",
      "Processing times and specific department fees depend on the issuing jurisdiction and MEA workload.",
    ],
    faqs: [
      {
        question: "Is SDM Apostille accepted in all Hague Convention countries?",
        answer:
          "While many Hague member nations (such as USA, UK, Australia, France, Germany) commonly accept SDM-based apostilles for personal documents, certain specific consular jurisdictions or employment sectors may request State Home Department verification. We recommend checking with your foreign receiving authority or consulting with us before initiating.",
      },
      {
        question: "Can laminated certificates be processed for SDM Apostille?",
        answer:
          "Apostille stickers and SDM stamps must be applied directly to the physical document paper (usually on the reverse). If your certificate is laminated, professional delamination is required before processing.",
      },
      {
        question: "How is an Apostille verified by foreign authorities?",
        answer:
          "MEA apostilles contain a unique alphanumeric sticker number and QR code which foreign authorities can check via the official government portal.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/apostille-services-india",
      "/sdm-mea-attestation",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with SDM + Apostille services. My document type is [Document Type] and destination country is [Country]. Please share the requirements and quotation.",
  },
  {
    id: "apostille-only",
    slug: "/apostille-services-india",
    title: "Apostille Services in India",
    shortTitle: "Apostille Only",
    badge: "Hague Convention Authentication",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-17-63_96b26121e545231a3c569311a54cda96_e0d5ca42.jpg",
    summary:
      "Dedicated apostille facilitation for documents that have already completed preliminary state-level or designated authority verification and require MEA Hague Apostille stickers.",
    seoTitle: "Apostille Services in India | Hague Convention MEA Assistance",
    metaDescription:
      "Fast, compliant assistance for MEA Apostille in India for personal, educational, and commercial documents used in Hague Convention member countries.",
    intro:
      "An Apostille is an internationally recognized certificate under the 1961 Hague Convention Abolishing the Requirement of Legalisation for Foreign Public Documents. If your document has already received necessary state-level endorsements (such as Home Department, General Administration Department, or Regional Authentication Centre), we assist with the prompt submission and facilitation of the MEA Apostille sticker.",
    whoNeeds: [
      "Individuals whose documents already have State Home Department or HRD attestation and need final MEA Apostille.",
      "Students heading to Hague member countries for undergraduate, master's, or doctoral programs.",
      "Expatriates and professionals requiring apostilled PCCs, medical records, or civil documents.",
      "Businesses needing apostille on board resolutions, powers of attorney, or incorporation filings.",
    ],
    eligibleDocuments: [
      {
        category: "Educational Records (Pre-verified)",
        items: [
          "Degree Certificates & Diplomas",
          "Official Transcripts & Mark Sheets",
          "School Transfer Certificates & Secondary School Leaving Certificates",
        ],
      },
      {
        category: "Civil & Legal Documents",
        items: [
          "Police Clearance Certificates (Passport Office PCC)",
          "Birth, Marriage, and Adoption Certificates",
          "Affidavits, Wills, and Inheritance Documents",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Endorsement Verification",
        description:
          "Our team inspects previous state stamps, signatures, and seals to verify that all mandatory pre-authentications are compliant with MEA guidelines.",
      },
      {
        step: 2,
        title: "MEA Submission Preparation",
        description:
          "We prepare the formal application dossier and register the document details into the designated authentication workflow.",
      },
      {
        step: 3,
        title: "Apostille Sticker Affixing",
        description:
          "The document is officially submitted to the Ministry of External Affairs outsourcing centre for verification and apostille affixing.",
      },
      {
        step: 4,
        title: "Quality Inspection & Return",
        description:
          "We cross-verify the apostille serial number, spelling, and seal clarity before handing over or couriering the document back to you.",
      },
    ],
    requiredDocuments: [
      "Original document bearing requisite state or authority pre-attestation",
      "Clear copy of Passport (biographical pages)",
      "Applicant contact details and receiving country specification",
    ],
    importantNotes: [
      "Only countries that are signatories to the 1961 Hague Convention accept Apostilles. For non-Hague nations (e.g. UAE, Saudi Arabia, Kuwait, Qatar), normal MEA Attestation followed by Embassy Legalization is required.",
      "The Ministry of External Affairs does not accept direct submissions from unaccredited individuals; processing is conducted through authorized facilitation channels.",
    ],
    faqs: [
      {
        question: "Which countries accept documents with an Indian Apostille?",
        answer:
          "Over 120 member countries of the Hague Convention accept apostilles, including the United States, United Kingdom, Australia, New Zealand, Germany, France, Italy, Spain, Japan, South Korea, and South Africa.",
      },
      {
        question: "Does an Apostille have an expiry date?",
        answer:
          "An Apostille sticker itself generally does not expire under Hague guidelines; however, the underlying document (such as a Police Clearance Certificate or Medical Certificate) may have a validity window specified by the receiving foreign authority (often 3 to 6 months).",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/sdm-apostille-services",
      "/e-sanad-paper-documents",
      "/embassy-legalization-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with MEA Apostille Only. My document type is [Document Type] and destination country is [Country]. Please share the requirements and quotation.",
  },
  {
    id: "e-sanad-paper",
    slug: "/e-sanad-paper-documents",
    title: "e-Sanad (Paper Documents) Assistance",
    shortTitle: "e-Sanad Paper Documents",
    badge: "Digital Verification & Document Checks",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-50-30-60_40deb401b9ffe8e1df2f1cc5ba480b12_87546cd1.jpg",
    summary:
      "Step-by-step guidance and support for eligible educational and personal paper documents requiring verification through the government e-Sanad online portal integration.",
    seoTitle: "e-Sanad Verification for Paper Documents | FATIMA GLOBAL ATTESTATION",
    metaDescription:
      "Comprehensive assistance for e-Sanad portal verification and attestation for paper documents and university degree certificates in India.",
    intro:
      "e-Sanad is the Government of India's electronic document verification and attestation framework developed to facilitate contactless, transparent authentication of academic and personal records. For individuals holding physical paper certificates from participating boards, universities, and institutions, we provide hands-on assistance to navigate the portal, verify institution integration, upload documentation, and coordinate the subsequent physical or digital attestation steps.",
    whoNeeds: [
      "Graduates from universities and academic boards integrated with the e-Sanad and DigiLocker repositories.",
      "Applicants requiring expedited verification for higher education admissions or overseas professional licensing.",
      "Individuals whose destination embassies or institutions mandate e-Sanad verified credentials.",
    ],
    eligibleDocuments: [
      {
        category: "Eligible Academic Credentials",
        items: [
          "Degree Certificates from onboarded Central & State Universities",
          "Autonomous College Diplomas integrated with e-Sanad",
          "State Board 10th & 12th Marks Statements (participating boards)",
          "Consolidated Grade Cards & Transcripts",
        ],
      },
      {
        category: "Personal Credentials (Participating Issuers)",
        items: [
          "Digitally signed birth certificates from participating municipal corporations",
          "State government civil registrations onboarded to national portals",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Institution Eligibility Check",
        description:
          "We check whether your awarding university, college, or board is officially integrated and active on the e-Sanad portal repository.",
      },
      {
        step: 2,
        title: "Digital Dossier Assembly",
        description:
          "We assist in formatting high-resolution digital scans and entering accurate registration, roll numbers, and certificate metadata.",
      },
      {
        step: 3,
        title: "Portal Submission & Document Fee Coordination",
        description:
          "Assistance with registering the application under the correct category and tracking institutional verification.",
      },
      {
        step: 4,
        title: "Verification Tracking & Physical Stamping",
        description:
          "Once the institution verifies the record, we assist with physical forwarding or subsequent apostille/attestation stamp affixing.",
      },
    ],
    requiredDocuments: [
      "Clear color scan of Original Degree/Certificate (front and back)",
      "All Year/Semester Mark sheets (for verification reference)",
      "Valid Passport copy of the candidate",
      "University Student ID / Roll Number / Enrollment details",
    ],
    importantNotes: [
      "Not all Indian universities or state boards are currently onboarded onto the e-Sanad platform. If your university is not yet integrated, traditional HRD/State Home Department or SDM verification must be pursued.",
      "Institutional verification fees charged directly by certain universities are independent of our service facilitation fees.",
    ],
    faqs: [
      {
        question: "How can I find out if my university supports e-Sanad?",
        answer:
          "You can share your degree certificate and institution name with us. We check the active list of participating universities on the government e-Sanad repository and inform you immediately.",
      },
      {
        question: "Can e-Sanad replace MEA Apostille or Embassy Legalization?",
        answer:
          "No, e-Sanad is a verification gateway. Once verified via e-Sanad, the document proceeds to the MEA for the required Apostille sticker or regular attestation, which can then be submitted for embassy legalization if required.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/apostille-services-india",
      "/sdm-mea-attestation",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with e-Sanad Paper Documents processing. My university/institution is [University] and document is [Degree/Certificate]. Please share details.",
  },
  {
    id: "sdm-mea",
    slug: "/sdm-mea-attestation",
    title: "SDM + MEA Attestation",
    shortTitle: "SDM + MEA Attestation",
    badge: "Non-Hague Country Authentication",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-58-13-56_96b26121e545231a3c569311a54cda96_dd3adbc9.jpg",
    summary:
      "Comprehensive assistance for SDM verification followed by MEA Normal Attestation for Indian documents destined for non-Hague nations (e.g., UAE, Saudi Arabia, Qatar, Kuwait).",
    seoTitle: "SDM + MEA Attestation Services India | FATIMA GLOBAL ATTESTATION",
    metaDescription:
      "Professional SDM and MEA attestation services in India for personal, educational, and commercial documents headed for Gulf and non-Hague countries.",
    intro:
      "For countries that are NOT members of the Hague Apostille Convention—such as the United Arab Emirates, Kingdom of Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, China, and Egypt—documents cannot be authenticated with an apostille sticker. Instead, they require a two-tier Indian authentication: initial verification by the Sub-Divisional Magistrate (SDM), followed by the official Normal Attestation stamp from the Ministry of External Affairs (MEA), which prepares the document for final Embassy Legalization.",
    whoNeeds: [
      "Job seekers securing employment visas in GCC/Gulf nations requiring authenticated educational certificates.",
      "Couples and families applying for residence visas in the UAE, Saudi Arabia, Kuwait, or Qatar.",
      "Individuals sponsoring family members or applying for commercial representation in non-Hague countries.",
      "Businesses executing contracts, powers of attorney, or branch registrations in the Middle East.",
    ],
    eligibleDocuments: [
      {
        category: "Personal Documents",
        items: [
          "Birth Certificates",
          "Marriage Certificates",
          "Affidavits & Declarations",
          "Experience & Employment Certificates",
          "Medical Reports",
        ],
      },
      {
        category: "Educational Documents (Eligible Categories)",
        items: [
          "Degree & Diploma Certificates (subject to embassy-specific rules)",
          "Provisional Certificates",
          "School Leaving Certificates",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Intake & Eligibility Review",
        description:
          "We examine the document type and confirm whether the target embassy accepts SDM + MEA or requires state-level HRD authentication.",
      },
      {
        step: 2,
        title: "Notary Public Attestation",
        description:
          "Initial verification and notarial endorsement by an authorized advocate notary public.",
      },
      {
        step: 3,
        title: "SDM Legalization",
        description:
          "Presentation to the designated Sub-Divisional Magistrate for physical verification and official seal.",
      },
      {
        step: 4,
        title: "MEA Normal Attestation",
        description:
          "Submission to the Ministry of External Affairs for the official consular attestation stamp and signature.",
      },
      {
        step: 5,
        title: "Embassy Forwarding or Return",
        description:
          "The document is either forwarded directly to our Embassy Legalization desk or securely returned to you.",
      },
    ],
    requiredDocuments: [
      "Original physical certificate/document",
      "Clear color photocopy of the document holder's Passport",
      "Offer letter or visa copy (if required by specific destination protocols)",
    ],
    importantNotes: [
      "Certain embassies (notably Saudi Arabia for educational degrees) maintain strict regulations requiring State HRD/Higher Education Department verification rather than SDM. We provide upfront clarity before starting any process.",
      "Normal MEA Attestation is stamped on the back of the original document; lamination must be removed prior to submission.",
    ],
    faqs: [
      {
        question: "What is the difference between MEA Apostille and MEA Attestation?",
        answer:
          "MEA Apostille is an adhesive square sticker valid only for Hague Convention member countries. MEA Attestation is an official ink stamp and signature designed for non-Hague countries, which must subsequently be legalized by the destination country's embassy.",
      },
      {
        question: "Will UAE embassy accept documents attested via SDM + MEA?",
        answer:
          "Yes, for personal certificates like birth and marriage certificates, UAE Embassy in India widely accepts the SDM + MEA attestation route followed by UAE Embassy legalization.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/embassy-legalization-services",
      "/sdm-apostille-services",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with SDM + MEA Attestation. My document is [Document Type] and destination country is [Country]. Please share the requirements.",
  },
  {
    id: "coc-apostille",
    slug: "/chamber-of-commerce-apostille",
    title: "Chamber of Commerce + Apostille",
    shortTitle: "Chamber + Apostille",
    badge: "Commercial & Trade Documents",
    image: "/assets/images/commercial_chamber_docs_1792412027965.jpg",
    summary:
      "Specialized authentication for commercial invoices, packing lists, board resolutions, and certificates of origin through recognized Chambers of Commerce followed by MEA Apostille.",
    seoTitle: "Chamber of Commerce Apostille India | Commercial Legalization",
    metaDescription:
      "Fast commercial document authentication through Indian Chambers of Commerce and MEA Apostille for exporters, manufacturers, and corporate businesses.",
    intro:
      "Commercial and trade documents cannot follow the standard personal SDM or HRD route. For international commercial activities, export shipments, foreign branch setups, and tenders in Hague Convention member nations, Indian corporate documents must first be verified and stamped by a recognized Chamber of Commerce (such as FICCI, ASSOCHAM, PHD Chamber, or local Indian Chambers) before receiving an MEA Apostille sticker.",
    whoNeeds: [
      "Exporters and manufacturers shipping goods to Hague Convention countries requiring authenticated shipping invoices and certificates of origin.",
      "Indian corporations setting up foreign subsidiaries, joint ventures, or liaison offices abroad.",
      "Companies participating in global procurement tenders or opening overseas corporate bank accounts.",
      "Businesses issuing commercial Powers of Attorney to foreign agents, distributors, or legal counsels.",
    ],
    eligibleDocuments: [
      {
        category: "Export & Shipping Documentation",
        items: [
          "Commercial Invoices",
          "Certificates of Origin (COO)",
          "Packing Lists & Weight Certificates",
          "Bills of Lading & Shipping Declarations",
        ],
      },
      {
        category: "Corporate Legal Filings",
        items: [
          "Board Resolutions & Minutes",
          "Certificate of Incorporation (COI)",
          "Memorandum & Articles of Association (MOA / AOA)",
          "Commercial Power of Attorney (POA)",
          "Audited Financial Statements & Balance Sheets",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Corporate Document Audit",
        description:
          "We inspect company stamp, director signatures, authorized signatory designations, and document formatting.",
      },
      {
        step: 2,
        title: "Chamber of Commerce Endorsement",
        description:
          "The document is submitted to an accredited Indian Chamber of Commerce for verification, seal, and authorized signatory endorsement.",
      },
      {
        step: 3,
        title: "MEA Commercial Apostille",
        description:
          "The Chamber-endorsed document is presented to the Ministry of External Affairs for affixing the official commercial Apostille sticker.",
      },
      {
        step: 4,
        title: "Quality Review & Dispatch",
        description:
          "Serial numbers are recorded, scans are shared with your compliance team, and originals are dispatched securely.",
      },
    ],
    requiredDocuments: [
      "Original commercial document on company letterhead with authorized director signature and corporate seal",
      "Company request letter addressed to the Chamber of Commerce on official letterhead",
      "Director / Authorized Signatory ID copy (Passport or PAN Card)",
      "Certificate of Incorporation copy (for first-time Chamber registrations)",
    ],
    importantNotes: [
      "Every page of a commercial contract or multi-page invoice must bear the original seal and signature of the authorized company officer.",
      "Requirements vary depending on the destination nation's customs or registry regulations.",
    ],
    faqs: [
      {
        question: "Which Chamber of Commerce is used for the attestation?",
        answer:
          "We coordinate with officially recognized Chambers of Commerce in India, including national apex bodies (such as FICCI, ASSOCHAM, or PHDCCI) and affiliated regional trade bodies recognized by the Ministry of External Affairs.",
      },
      {
        question: "Can multiple invoices be apostilled under a single application?",
        answer:
          "Each standalone invoice or document requiring an apostille sticker is treated as an individual document by the MEA; however, related export sets can be processed concurrently.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/chamber-of-commerce-mea-attestation",
      "/document-translation-services",
      "/apostille-services-india",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Chamber of Commerce + Apostille for commercial documents. Document type: [Invoices/POA/COI], Destination: [Country]. Please share the procedure.",
  },
  {
    id: "coc-mea",
    slug: "/chamber-of-commerce-mea-attestation",
    title: "Chamber of Commerce + MEA Attestation",
    shortTitle: "Chamber + MEA Attestation",
    badge: "Non-Hague Commercial Attestation",
    image: "/assets/images/commercial_chamber_docs_1792412027965.jpg",
    summary:
      "Step-by-step authentication for export papers and corporate agreements through the Chamber of Commerce and MEA, ready for Middle East and non-Hague embassy legalizations.",
    seoTitle: "Chamber of Commerce & MEA Attestation | Business Export Papers",
    metaDescription:
      "Reliable commercial attestation via Indian Chamber of Commerce and Ministry of External Affairs for businesses exporting to Gulf & non-Hague countries.",
    intro:
      "When Indian enterprises conduct trade or register business operations in non-Hague jurisdictions—such as the UAE, Saudi Arabia, Kuwait, Egypt, or Qatar—commercial invoices, powers of attorney, agency agreements, and certificates of origin require Chamber of Commerce endorsement followed by MEA Normal Attestation. This dual endorsement is mandatory before the destination country's embassy will accept the document for commercial legalization.",
    whoNeeds: [
      "Indian exporters shipping goods to the Middle East, GCC, Africa, or Asian non-Hague nations.",
      "Companies appointing commercial distributors, agents, or legal representatives in Gulf countries.",
      "Corporates submitting bids for foreign government contracts or infrastructure projects.",
      "Manufacturers needing certificate of origin and free sale authentication for foreign customs clearance.",
    ],
    eligibleDocuments: [
      {
        category: "Trade & Customs Documents",
        items: [
          "Commercial Invoices & Price Lists",
          "Certificate of Origin & Manufacturer Declarations",
          "Certificate of Free Sale & Health Certificates",
          "Halal Certificates & Analysis Reports",
        ],
      },
      {
        category: "Corporate & Legal Agreements",
        items: [
          "Commercial Agency & Distribution Agreements",
          "Commercial Powers of Attorney & Mandates",
          "Memorandum & Articles of Association",
          "Company Master Data & Certificate of Incorporation",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Document Compliance Review",
        description:
          "We review the commercial text, letterhead, signatures, and accompanying company resolution.",
      },
      {
        step: 2,
        title: "Chamber of Commerce Stamping",
        description:
          "The document is presented to a recognized Chamber of Commerce for formal verification and embossed seal.",
      },
      {
        step: 3,
        title: "MEA Normal Consular Attestation",
        description:
          "The MEA attestation division reviews the Chamber stamp and affixes the official MEA attestation stamp.",
      },
      {
        step: 4,
        title: "Embassy Transition / Courier Handover",
        description:
          "We transition the document directly to the relevant embassy legalization wing or return it per your instructions.",
      },
    ],
    requiredDocuments: [
      "Original commercial document on company letterhead, duly signed with rubber stamp",
      "Company request / covering letter on official letterhead",
      "Copy of Certificate of Incorporation & PAN of the company",
      "Authorized Director ID proof",
    ],
    importantNotes: [
      "Foreign embassies often calculate legalization fees for commercial invoices based on the total invoice value or charge fixed commercial tariffs. We provide transparent fee breakdowns based on current embassy schedules.",
      "Translations into Arabic or French may be required by certain destination embassies alongside the English original.",
    ],
    faqs: [
      {
        question: "Is Chamber of Commerce mandatory for all commercial documents?",
        answer:
          "Yes, the Ministry of External Affairs mandates that any commercial, trade, or export document must be authenticated by a recognized Chamber of Commerce before MEA will accept it.",
      },
      {
        question: "Can Fatima Global Attestation also handle the subsequent Embassy Legalization?",
        answer:
          "Yes, we provide end-to-end facilitation: Chamber of Commerce verification, MEA attestation, and subsequent submission to the destination embassy (e.g. UAE, Saudi, Qatar, Kuwait).",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/chamber-of-commerce-apostille",
      "/embassy-legalization-services",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Chamber of Commerce + MEA Attestation for commercial documents. Destination country: [Country], Document: [Document Type]. Please share details.",
  },
  {
    id: "translation",
    slug: "/document-translation-services",
    title: "Document Translation Services — All Languages",
    shortTitle: "Translation Services",
    badge: "Multi-Language Linguistic Services",
    image: "/assets/aistudio/Screenshot_2026-10-24-04-00-06-68_96b26121e545231a3c569311a54cda96_3ea4e10b.jpg",
    summary:
      "Accurate, professional document translation across Arabic, French, German, Spanish, Italian, Russian, Portuguese, and other world languages for legal, visa, and embassy requirements.",
    seoTitle: "Document Translation Services India | Certified Translations",
    metaDescription:
      "Professional document translation for visa, embassy, and legal purposes in Arabic, French, German, Spanish, Italian, and major global languages.",
    intro:
      "Foreign embassies, immigration ministries, universities, and commercial registries frequently require documents to be translated into their official national language before legalization or visa submission. We provide accurate document translation services across major world languages, matching terminology precisely to official administrative, legal, medical, and academic standards.",
    whoNeeds: [
      "Visa applicants presenting Indian civil records (birth, marriage, PCC) to European, Middle Eastern, or Latin American embassies.",
      "Students enrolling in universities where study programs or admissions are conducted in German, French, Spanish, or Italian.",
      "Businesses executing cross-border commercial contracts, joint ventures, and tender submissions requiring dual-language versions.",
      "Immigrants applying for PR, citizenship, or employment in non-English speaking destinations.",
    ],
    eligibleDocuments: [
      {
        category: "Civil & Identity Records",
        items: [
          "Birth & Marriage Certificates",
          "Police Clearance Certificates (PCC)",
          "Divorce Decrees & Court Judgments",
          "Affidavits & Death Certificates",
        ],
      },
      {
        category: "Academic & Corporate Documents",
        items: [
          "Degrees, Diplomas & Academic Transcripts",
          "Syllabus Copies & Course Descriptions",
          "Commercial Contracts & MOUs",
          "Medical Reports & Financial Statements",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Requirement & Language Pair Definition",
        description:
          "You share your document scan, specifying source language, target language, and receiving authority requirements.",
      },
      {
        step: 2,
        title: "Domain-Expert Translation",
        description:
          "Professional linguists specializing in legal, academic, or commercial documentation translate the text preserving precise formatting.",
      },
      {
        step: 3,
        title: "Quality Review & Proofreading",
        description:
          "A second independent linguist checks names, dates, numbers, and legal terminology against original source text.",
      },
      {
        step: 4,
        title: "Delivery & Attestation Alignment",
        description:
          "Translated documents are formatted with translator certification declarations and prepared for notary/embassy submission if required.",
      },
    ],
    requiredDocuments: [
      "High-resolution digital scan or clear photograph of the complete original document",
      "Correct spelling of proper nouns, names, and place names as they appear on the applicant's current passport",
      "Specified target language and destination country name",
    ],
    importantNotes: [
      "Requirements for certified, sworn, or embassy-approved translations vary strictly by destination country. For instance, some European embassies require sworn translators registered directly with their consular panel. We clarify the available translation format prior to commencement.",
      "We do not claim certified or sworn translation status for languages or destinations unless specifically coordinated through accredited linguistic partners.",
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
    relatedServices: [
      "/embassy-legalization-services",
      "/sdm-apostille-services",
      "/sdm-mea-attestation",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Document Translation. Source Language: [Source], Target Language: [Target], Document: [Document Type], Destination: [Country]. Please share details.",
  },
  {
    id: "embassy-legalization",
    slug: "/embassy-legalization-services",
    title: "Embassy Legalization — All Embassies",
    shortTitle: "Embassy Legalization",
    badge: "Diplomatic Mission Authentication",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-58-13-56_96b26121e545231a3c569311a54cda96_dd3adbc9.jpg",
    summary:
      "Comprehensive assistance for submitting MEA-attested documents to foreign embassies and high commissions located in New Delhi and across India for final diplomatic legalization.",
    seoTitle: "Embassy Legalization Services India | Consular Attestation",
    metaDescription:
      "Expert assistance for embassy legalization in New Delhi for UAE, Saudi Arabia, Qatar, Kuwait, Egypt, China, and all foreign missions.",
    intro:
      "For countries that do not participate in the Hague Apostille Convention, the final and definitive step of document authentication in India is Embassy Legalization. After preliminary verification (via SDM, HRD, or Chamber of Commerce) and official MEA attestation, the document must be submitted to the consular section of the destination country's embassy or high commission in New Delhi for diplomatic authentication.",
    whoNeeds: [
      "Professionals moving for employment to the UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain, China, Taiwan, Egypt, etc.",
      "Spouses and family members applying for family visa sponsorship or permanent residency abroad.",
      "Exporters and corporations registering commercial agreements, trademark rights, or trade representation.",
      "Students securing admissions at foreign universities that require consular stamps.",
    ],
    eligibleDocuments: [
      {
        category: "Personal & Vital Records",
        items: [
          "Birth Certificates",
          "Marriage Certificates",
          "Police Clearance Certificates (PCC)",
          "Divorce & Custody Certificates",
          "Medical Fitness Certificates",
        ],
      },
      {
        category: "Educational Credentials",
        items: [
          "Degree & Diploma Certificates",
          "Transcripts & Mark Sheets",
          "Board Certificates",
        ],
      },
      {
        category: "Commercial Trade Documents",
        items: [
          "Commercial Invoices & Certificates of Origin",
          "Power of Attorney & Board Resolutions",
          "Agency Agreements & Company Bylaws",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Consular Pre-Requisite Check",
        description:
          "We inspect the document to ensure all mandatory preceding stamps (Notary, SDM/HRD, and MEA) are complete and valid according to the specific embassy's current guidelines.",
      },
      {
        step: 2,
        title: "Embassy Application & Fee Payment",
        description:
          "We prepare the formal submission dossier, translation (if required by the mission), and coordinate the official consular fees.",
      },
      {
        step: 3,
        title: "Consular Processing & Verification",
        description:
          "The document is lodged with the embassy consular section or designated visa facilitation service for consular stamping.",
      },
      {
        step: 4,
        title: "Safe Handover & Delivery",
        description:
          "Once legalized with the embassy's official seal and consular officer signature, the document is returned securely to you.",
      },
    ],
    requiredDocuments: [
      "Original document with valid MEA attestation stamp",
      "Clear color copy of applicant's Passport (data pages)",
      "Official translation (for embassies requiring Arabic, French, or Spanish versions)",
      "Specific embassy authorization forms or employer offer letters where required",
    ],
    importantNotes: [
      "Embassy requirements, consular fees, supporting paperwork, and processing durations vary significantly by destination country and document category. Embassies may revise fee structures or submission schedules without prior notice.",
      "We provide facilitation and logistics support; final visa or legalization decisions rest entirely with the respective diplomatic missions.",
    ],
    faqs: [
      {
        question: "Which embassies do you assist with in New Delhi?",
        answer:
          "We facilitate submissions for diplomatic missions across India, including UAE, Kingdom of Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Egypt, China, Taiwan, Vietnam, Thailand, Malaysia, and African and Latin American missions.",
      },
      {
        question: "How long does embassy legalization take?",
        answer:
          "Timelines vary by embassy. Some missions complete consular stamping within 3 to 5 business days, while others require 2 to 3 weeks depending on verification procedures and internal embassy schedules. We advise you on current estimated timelines upon reviewing your case.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/sdm-mea-attestation",
      "/chamber-of-commerce-mea-attestation",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Embassy Legalization. Destination Embassy/Country: [Country], Document Type: [Document Type]. Please share current requirements and quotation.",
  },
  {
    id: "saudi-death-claim",
    slug: "/saudi-arabia-death-claim-assistance",
    title: "Saudi Arabia Death Claim Assistance",
    shortTitle: "Saudi Arabia Death Claim Assistance",
    badge: "Specialized Documentation & Claim Guidance",
    image: "/assets/images/embassy_legalization_desk_1792412027907.jpg",
    summary:
      "Guidance with documentation and the claim process for eligible death-related claims involving Saudi Arabia.",
    seoTitle:
      "Saudi Death Claim Assistance | Fatima Global Attestation",
    metaDescription:
      "Procedural guidance with documentation, Arabic translation, attestation & paperwork preparation for eligible death-related claims involving Saudi Arabia.",
    intro:
      "Families of Indian nationals who passed away while employed or residing in the Kingdom of Saudi Arabia often need structured documentation support to pursue eligible end-of-service benefits, unpaid dues, GOSI (General Organization for Social Insurance) death benefits, or legal compensation claims. Fatima Global Attestation provides careful, compassionate procedural guidance to help legal heirs prepare, translate, authenticate, and organize the required Indian civil and legal documents for submission to the relevant authorities in India and Saudi Arabia.",
    whoNeeds: [
      "Legal heirs and immediate family members preparing documentation for eligible death-related claims involving Saudi Arabia.",
      "Families requiring authentication of Death Certificates, Legal Heir / Surviving Member Certificates, and Family Tree records.",
      "Claimants needing Power of Attorney (Wakala) preparation, Arabic translation, MEA attestation, and Saudi Embassy / Apostille processing.",
      "Families seeking procedural clarity on coordinating paperwork required by employers, labour authorities, or consular channels.",
    ],
    eligibleDocuments: [
      {
        category: "Civil & Legal Heirship Documents",
        items: [
          "Legal Heir Certificate / Surviving Member Certificate / Succession Certificate",
          "Death Certificate & Medical / Police Report Copies",
          "Marriage Certificate (for spouse claims) & Birth Certificates (for minor/dependent children)",
          "Guardianship Certificate (where minor children are legal beneficiaries)",
        ],
      },
      {
        category: "Authorization & Claim Filings",
        items: [
          "Special Power of Attorney (Wakala) in favour of authorized representative",
          "No-Objection Affidavits / Family Consent Declarations",
          "Bank Account & KYC Verification Letters of Legal Heirs",
          "Certified Arabic Translations of Supporting Claim Documents",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Free Initial Guidance & Document Checklist Review",
        description:
          "We review the existing case paperwork (such as death notification, Iqama/passport copies, and Indian family certificates) and explain the general documentation sequence required.",
      },
      {
        step: 2,
        title: "Affidavit, Wakala (POA) & Arabic Translation Support",
        description:
          "Assistance with formatting required declarations or Powers of Attorney and coordinating accurate English-to-Arabic translation where required by Saudi authorities.",
      },
      {
        step: 3,
        title: "State / SDM & MEA Authentication",
        description:
          "Facilitation of state-level / SDM verification and Ministry of External Affairs (MEA) attestation or apostille on the Indian legal heirship and civil documents.",
      },
      {
        step: 4,
        title: "Consular Legalization & Dossier Organization",
        description:
          "Assistance with required Saudi Embassy / consular attestation steps in India and organizing the complete authenticated dossier for the family's submission.",
      },
    ],
    requiredDocuments: [
      "Copy of the deceased person's Indian Passport and Saudi Iqama (Residence Permit), if available",
      "Death Certificate and official police/hospital report issued in Saudi Arabia or India",
      "Legal Heir Certificate / Surviving Member Certificate issued by the competent Indian revenue or judicial authority",
      "Valid ID proofs (Passport / Aadhaar / PAN) of the claiming legal heirs",
    ],
    importantNotes: [
      "Fatima Global Attestation is an independent documentation and procedural guidance consultancy. We do NOT invent eligibility rules, determine compensation amounts, or guarantee claim approval or disbursement timelines.",
      "Final eligibility, document acceptance, and claim settlement decisions rest solely with the relevant Saudi Arabian ministries, courts, GOSI, employers, and diplomatic authorities.",
      "Initial enquiry guidance is provided to help families understand documentation steps; government fees, translation, attestation, and formal processing services are quoted transparently before work begins.",
    ],
    faqs: [
      {
        question: "What documents are commonly needed from India for a Saudi Arabia death-related claim?",
        answer:
          "Commonly requested Indian documents include an authenticated Legal Heir or Surviving Member Certificate, Special Power of Attorney (Wakala), Marriage and Birth Certificates establishing family relationship, and bank particulars of the beneficiaries, duly translated into Arabic and authenticated through MEA and consular channels as applicable.",
      },
      {
        question: "Does Fatima Global Attestation guarantee approval of a death claim in Saudi Arabia?",
        answer:
          "No. Claim eligibility, assessment, and payout approvals are decided exclusively by the competent authorities, courts, insurance bodies (such as GOSI), and employers in Saudi Arabia. Our role is strictly to assist families with accurate document preparation, translation, attestation, and procedural guidance.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/saudi-arabia-attestation-services",
      "/document-translation-services",
      "/embassy-legalization-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need Free Initial Guidance regarding Saudi Arabia Death Claim Assistance and documentation requirements.",
  },
  {
    id: "educational-attestation",
    slug: "/educational-document-attestation",
    title: "Educational Document Attestation & Apostille Services in India",
    shortTitle: "Educational Document Attestation",
    badge: "Degrees, Diplomas & Academic Records",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-38-66_96b26121e545231a3c569311a54cda96_f517e0b0.jpg",
    summary:
      "Complete authentication for Indian university degrees, diplomas, marksheets, and school certificates via State HRD, SDM, e-Sanad, MEA Apostille, and Embassy Legalization.",
    seoTitle:
      "Educational Document Attestation | Fatima Global Attestation",
    metaDescription:
      "Educational document attestation & degree apostille in India. State HRD, SDM, e-Sanad & MEA Apostille assistance for overseas admissions and employment visas.",
    intro:
      "When applying for overseas employment visas, higher education admissions, professional licensing (such as healthcare, engineering, or teaching), or residence permits, foreign ministries and universities require your Indian academic qualifications to be formally authenticated. Fatima Global Attestation assists students, graduates, and working professionals across Delhi NCR and India with the appropriate authentication route—whether State HRD/Higher Education Department verification, SDM authentication, or e-Sanad portal verification—followed by Ministry of External Affairs (MEA) Apostille or Embassy Legalization.",
    whoNeeds: [
      "Graduates and professionals moving to the UAE, Saudi Arabia, Qatar, Kuwait, or Oman for employment visas and work permits.",
      "Students applying for Master's, PhD, or undergraduate admissions at universities in Germany, Italy, France, Spain, the UK, USA, Canada, or Australia.",
      "Doctors, nurses, pharmacists, and engineers completing credential evaluation or licensing processes abroad.",
      "Teachers and academic staff relocating to international schools and ministries of education overseas.",
    ],
    eligibleDocuments: [
      {
        category: "University & Higher Education Credentials",
        items: [
          "Bachelor's Degree Certificates (B.Tech, B.E., B.Sc, B.Com, B.A., BBA, MBBS, B.Pharm)",
          "Master's & Postgraduate Degree Certificates (MBA, M.Tech, M.Sc, M.A., MD/MS)",
          "Engineering, Nursing, Pharmacy & Technical Diploma Certificates",
          "Consolidated Marksheets, Semester Transcripts & Provisional Certificates",
        ],
      },
      {
        category: "School & Board Certificates",
        items: [
          "CBSE, ICSE & State Board Class 10th (SSC) and Class 12th (HSC) Certificates",
          "Transfer Certificates (TC), Bonafide & Medium of Instruction (MOI) Letters",
          "National Institute of Open Schooling (NIOS) & Recognized Vocational Certificates",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Academic Document & Destination Route Assessment",
        description:
          "We review a digital scan of your degree or certificate, check the issuing university/board and destination country rules, and confirm whether State HRD, SDM, or e-Sanad verification is required.",
      },
      {
        step: 2,
        title: "Preliminary Verification (State HRD / SDM / e-Sanad)",
        description:
          "Depending on the destination country's embassy or university rules, the document undergoes State Education Department (HRD) verification, Sub-Divisional Magistrate (SDM) authentication, or online e-Sanad verification.",
      },
      {
        step: 3,
        title: "Ministry of External Affairs (MEA) Apostille or Attestation",
        description:
          "The verified certificate is submitted to the MEA for a Hague Apostille sticker (for Hague member nations) or an MEA Normal Attestation ink stamp (for non-Hague nations).",
      },
      {
        step: 4,
        title: "Embassy Legalization & Translation (Where Required)",
        description:
          "For non-Hague destinations such as the UAE, Qatar, or Kuwait, we coordinate consular legalization at the respective embassy in New Delhi and certified translation if required.",
      },
    ],
    requiredDocuments: [
      "Original Degree, Diploma, or Board Certificate to be attested (without lamination)",
      "Clear copies of all year/semester marksheets or academic transcripts",
      "Clear color copy of the applicant's Passport (front and back pages)",
      "Offer letter, university admission letter, or visa copy (if requested by the specific state HRD or embassy)",
    ],
    importantNotes: [
      "Only genuine educational certificates issued by UGC/AICTE-recognized universities, statutory central/state boards, or government-approved councils are eligible for MEA authentication.",
      "Do not remove tight factory lamination yourself, as tearing the certificate surface or seal can invalidate the document. Share a scan with our team first for safe handling advice.",
      "Whether a destination accepts SDM + MEA/Apostille or strictly mandates State HRD verification depends on the receiving foreign authority, university, or embassy.",
    ],
    faqs: [
      {
        question: "Do I need State HRD or SDM attestation for my degree certificate?",
        answer:
          "It depends on your destination country and receiving institution. Many Hague Convention countries and certain Gulf visa categories accept the SDM + MEA route, whereas specific universities, licensing bodies, or embassies strictly require State Higher Education Department (HRD) authentication from the state where the university is located. We verify the applicable requirement before processing.",
      },
      {
        question: "Can my degree be attested if I am currently living abroad (NRI)?",
        answer:
          "Yes. Many of our clients reside in the UAE, Saudi Arabia, Europe, or North America. Once we review your digital scans on WhatsApp, you or a family member in India can courier the original certificate to our New Delhi desk for processing.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/apostille-services-india",
      "/e-sanad-paper-documents",
      "/uae-attestation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Educational Document Attestation / Degree Apostille. My qualification is [Degree/Diploma], issuing university/board is [University], and destination country is [Country]. Please share the process and quotation.",
  },
  {
    id: "personal-attestation",
    slug: "/personal-document-attestation",
    title: "Personal Document Attestation & Apostille Services in India",
    shortTitle: "Personal Document Attestation",
    badge: "Birth, Marriage, PCC & Civil Records",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-17-63_96b26121e545231a3c569311a54cda96_e0d5ca42.jpg",
    summary:
      "Authentication assistance for Birth Certificates, Marriage Certificates, Police Clearance Certificates (PCC), Single Status Affidavits, and Personal Powers of Attorney.",
    seoTitle:
      "Personal Document Attestation in India | Fatima Global Attestation",
    metaDescription:
      "Reliable personal document attestation & apostille in India for Birth Certificates, Marriage Certificates, PCC, Single Status Affidavits and Personal POA.",
    intro:
      "Personal and civil status documents are mandatory when sponsoring a spouse or child for a family residence visa, registering a marriage or birth abroad, applying for permanent residency, or executing a personal Power of Attorney overseas. Fatima Global Attestation provides structured assistance to verify and authenticate Indian personal certificates through Notary, Sub-Divisional Magistrate (SDM) or State Home Department channels, followed by Ministry of External Affairs (MEA) Apostille or Embassy Legalization.",
    whoNeeds: [
      "Residents in the UAE, Saudi Arabia, Qatar, Kuwait, Oman, or Europe sponsoring their spouse, children, or parents on family/dependent visas.",
      "Applicants submitting Police Clearance Certificates (PCC) and Birth Certificates for European work permits, residency (e.g., Portugal, Germany, Spain, Italy), or immigration.",
      "Indian nationals getting married abroad who require an authenticated Single Status / Bachelorhood / Unmarried Affidavit.",
      "NRIs and families executing personal Powers of Attorney (POA) for property management, banking, or legal representation.",
    ],
    eligibleDocuments: [
      {
        category: "Vital & Family Relationship Certificates",
        items: [
          "Birth Certificates (Municipal Corporation, Gram Panchayat, or Hospital/Registrar issued)",
          "Marriage Certificates (Civil Registrar, SDM, or recognized Marriage Registration Authority)",
          "Death Certificates & Legal Heir / Surviving Member Certificates",
          "Divorce Decrees & Family Court Custody Orders",
        ],
      },
      {
        category: "Identity, Clearance & Sworn Declarations",
        items: [
          "Police Clearance Certificates (PCC issued by Regional Passport Office / PSK or Police Dept)",
          "Single Status / Unmarried / Bachelorhood Affidavits",
          "Personal Power of Attorney (POA) & Gift Deeds",
          "Medical Fitness Certificates & Employment Experience Letters",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Document Scan & Name-Consistency Check",
        description:
          "We check your certificate scan to verify registrar seals, legibility, and name/date consistency against your passport.",
      },
      {
        step: 2,
        title: "Notary & SDM / State Home Department Verification",
        description:
          "The original personal document undergoes initial notarial verification and authentication by the designated Sub-Divisional Magistrate (SDM) or State Home Department.",
      },
      {
        step: 3,
        title: "MEA Apostille or Normal Attestation",
        description:
          "Submission to the Ministry of External Affairs for the official Hague Apostille sticker or MEA Normal Attestation stamp.",
      },
      {
        step: 4,
        title: "Translation & Embassy Legalization (If Applicable)",
        description:
          "Where required by the destination country (such as UAE, Qatar, Kuwait, or non-English European authorities), we coordinate certified translation and embassy legalization.",
      },
    ],
    requiredDocuments: [
      "Original personal certificate (Birth, Marriage, PCC, or duly executed Affidavit/POA)",
      "Clear color copy of the applicant's Passport (and spouse's passport for Marriage Certificate attestation)",
      "Destination country and visa category details (e.g., Family Residence Visa, Work Permit, PR)",
    ],
    importantNotes: [
      "For Regional Passport Office (RPO) issued Police Clearance Certificates (PCC), MEA Apostille can often be processed directly against the RPO signature or via the SDM route depending on destination requirements.",
      "Older hand-written certificates or certificates in regional languages may require a certified English translation or re-issuance of a legible extract before foreign embassy submission.",
    ],
    faqs: [
      {
        question: "How do I get my Indian Marriage Certificate attested for a UAE or Gulf family visa?",
        answer:
          "For a UAE or Gulf family residence visa, your original Indian Marriage Certificate is authenticated sequentially via Notary, SDM (or State Home Department), Ministry of External Affairs (MEA) Normal Attestation, and finally the destination country's Embassy in New Delhi (followed by MOFA in the destination country).",
      },
      {
        question: "Does a Police Clearance Certificate (PCC) apostille expire?",
        answer:
          "While the Apostille sticker itself does not carry an expiration date, immigration authorities in Europe and worldwide typically require a PCC to have been issued within the last 3 to 6 months at the time of visa submission.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/sdm-apostille-services",
      "/sdm-mea-attestation",
      "/document-translation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Personal Document Attestation / Apostille. My document is [Birth/Marriage/PCC/Affidavit] and destination country is [Country]. Please share the requirements and quotation.",
  },
  {
    id: "uae-attestation",
    slug: "/uae-attestation-services",
    title: "UAE Embassy Attestation & MOFA Assistance in India (Delhi)",
    shortTitle: "UAE Attestation Services",
    badge: "Dubai, Abu Dhabi & UAE Visa Compliance",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-58-13-56_96b26121e545231a3c569311a54cda96_dd3adbc9.jpg",
    summary:
      "End-to-end document authentication for Dubai, Abu Dhabi, and Sharjah visas: Notary, SDM/HRD/Chamber verification, MEA Attestation, UAE Embassy New Delhi, and UAE MOFA.",
    seoTitle:
      "UAE Embassy Attestation in India | Fatima Global Attestation",
    metaDescription:
      "Complete UAE document attestation services in India for employment, Golden Visa, family visa & business. SDM, MEA, UAE Embassy & digital MOFA assistance.",
    intro:
      "The United Arab Emirates (UAE) is not a member of the Hague Apostille Convention. Therefore, any Indian educational degree, personal certificate (birth or marriage), or commercial document intended for use in Dubai, Abu Dhabi, Sharjah, or any other Emirate must undergo a multi-stage consular legalization process. Fatima Global Attestation coordinates the complete authentication chain from New Delhi—covering preliminary SDM, State HRD, or Chamber of Commerce verification, Ministry of External Affairs (MEA) Normal Attestation, UAE Embassy Legalization in New Delhi, and final UAE Ministry of Foreign Affairs (MOFA) attestation.",
    whoNeeds: [
      "Professionals securing employment visas, work permits, or Golden Visas in Dubai, Abu Dhabi, Sharjah, and across the UAE.",
      "UAE residents sponsoring their spouse (Marriage Certificate) or children (Birth Certificate) for family residence visas.",
      "Students and graduates applying for UAE Ministry of Education equivalency or higher studies in the UAE.",
      "Indian companies opening mainland or free-zone branches, registering Powers of Attorney, or exporting goods to the UAE.",
    ],
    eligibleDocuments: [
      {
        category: "Educational & Personal Certificates for UAE",
        items: [
          "University Degrees, Engineering & Nursing Diplomas, and School Transfer Certificates",
          "Marriage Certificates (for Spouse Visa Sponsorship)",
          "Birth Certificates (for Child Dependent Visa Sponsorship)",
          "Medical Certificates, Experience Certificates & Police Clearance Certificates",
        ],
      },
      {
        category: "Commercial & Corporate Documents for UAE",
        items: [
          "Board Resolutions, Powers of Attorney (POA) & Memorandum/Articles of Association",
          "Certificate of Incorporation, Commercial Invoices & Certificates of Origin",
          "Agency Agreements & Corporate Bank Opening Dossiers",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Preliminary Verification (SDM / State HRD / Chamber of Commerce)",
        description:
          "Personal and eligible educational documents are verified via Notary and SDM (or State HRD where required), while commercial documents are endorsed by a recognized Chamber of Commerce.",
      },
      {
        step: 2,
        title: "Ministry of External Affairs (MEA) Normal Attestation",
        description:
          "The document is submitted to the MEA in New Delhi for the official Normal Attestation ink stamp and signature.",
      },
      {
        step: 3,
        title: "UAE Embassy Legalization (New Delhi)",
        description:
          "Following MEA attestation, the document is submitted to the UAE Embassy consular channel in New Delhi for official diplomatic legalization.",
      },
      {
        step: 4,
        title: "UAE MOFA Attestation Coordination (Optional / End-to-End)",
        description:
          "Where requested, we also assist with coordinating the final UAE Ministry of Foreign Affairs (MOFA) digital attestation certificate.",
      },
    ],
    requiredDocuments: [
      "Original certificate or commercial document to be attested",
      "Clear color copy of the applicant's Passport (and spouse's passport for marriage certificates)",
      "Copy of UAE Visa / Emirates ID or Offer Letter (if available or requested for specific categories)",
      "Company covering letter and incorporation proof (for commercial documents)",
    ],
    importantNotes: [
      "An Apostille sticker is NOT valid for the UAE. Documents for the UAE must receive MEA Normal Attestation followed by UAE Embassy legalization.",
      "Consular fees charged by the UAE Embassy and MOFA are governed by official UAE schedules (and differ significantly between personal/educational certificates and commercial documents).",
    ],
    faqs: [
      {
        question: "Why is an Apostille not accepted in Dubai or the UAE?",
        answer:
          "Because the United Arab Emirates is not a signatory to the 1961 Hague Apostille Convention. All Indian documents for the UAE must go through MEA Normal Attestation, UAE Embassy attestation in India, and UAE MOFA attestation.",
      },
      {
        question: "Can Fatima Global Attestation handle both UAE Embassy in Delhi and UAE MOFA attestation?",
        answer:
          "Yes. You can opt for Indian-side completion (Notary + SDM/HRD + MEA + UAE Embassy New Delhi) or complete end-to-end facilitation including UAE MOFA digital attestation.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/sdm-mea-attestation",
      "/embassy-legalization-services",
      "/educational-document-attestation",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with UAE Embassy & MOFA Attestation. My document is [Document Type] for [Employment/Family/Business] in the UAE. Please share the procedure and quotation.",
  },
  {
    id: "saudi-attestation",
    slug: "/saudi-arabia-attestation-services",
    title: "Saudi Arabia Document Attestation & Apostille Services in India",
    shortTitle: "Saudi Arabia Attestation",
    badge: "KSA Employment, Family & Business Docs",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-54-66_96b26121e545231a3c569311a54cda96_d5370a86.jpg",
    summary:
      "Specialized guidance for Saudi Arabia (KSA) document authentication: MEA Hague Apostille, SDM/HRD verification, Arabic translation, and Saudi Embassy / Cultural procedures.",
    seoTitle:
      "Saudi Arabia Attestation in India | Fatima Global Attestation",
    metaDescription:
      "Saudi Arabia document attestation and MEA Apostille in India. Degree attestation, family visa certificates, Arabic translation & Saudi Embassy legalization.",
    intro:
      "The Kingdom of Saudi Arabia (KSA) acceded to the 1961 Hague Apostille Convention, transforming how many Indian public documents are authenticated for use in Saudi Arabia. Depending on your specific visa category, employer requirements, professional council (such as SCFHS, SCE, or QVP), or consular transaction, your documents may require an MEA Hague Apostille, State HRD/SDM verification, certified Arabic translation, or specific Saudi Embassy / Cultural Attaché processing. Fatima Global Attestation provides clear, up-to-date procedural verification and end-to-end assistance from New Delhi.",
    whoNeeds: [
      "Engineers, healthcare professionals, technicians, and executives applying for Saudi Arabia employment visas.",
      "Saudi Iqama holders sponsoring their spouse and children for family residence (Istiqdam) or family visit visas.",
      "Families and legal heirs preparing Powers of Attorney (Wakala), Legal Heir Certificates, or civil records for Saudi authorities.",
      "Indian exporters and corporations authenticating commercial invoices, agency agreements, and company incorporation documents for Saudi Arabia.",
    ],
    eligibleDocuments: [
      {
        category: "Academic & Personal Documents for KSA",
        items: [
          "University Degrees (B.Tech, B.E., MBBS, B.Sc Nursing, MBA, B.Com, B.A.) & Diplomas",
          "Marriage Certificates & Birth Certificates (for Saudi Family Visa / Istiqdam)",
          "Police Clearance Certificates (PCC) & Medical Reports",
          "Power of Attorney (Wakala), Legal Heirship & Death Claim Documentation",
        ],
      },
      {
        category: "Commercial & Export Documents for KSA",
        items: [
          "Commercial Invoices, Certificates of Origin & Packing Lists",
          "Corporate Powers of Attorney, Board Resolutions & Agency Contracts",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "KSA Route & Employer/Portal Requirement Check",
        description:
          "We review your document scan and confirm whether your case requires MEA Hague Apostille (standard under KSA's Hague accession) or specific HRD / Saudi Embassy / Arabic translation steps.",
      },
      {
        step: 2,
        title: "Preliminary Authentication (SDM / State HRD / Chamber)",
        description:
          "We coordinate the required preliminary verification through the designated Sub-Divisional Magistrate (SDM), State Education Department (HRD), or Chamber of Commerce.",
      },
      {
        step: 3,
        title: "MEA Apostille or Consular Attestation",
        description:
          "Submission to the Ministry of External Affairs (MEA) for affixing the official Hague Apostille sticker or consular attestation stamp.",
      },
      {
        step: 4,
        title: "Arabic Translation & Consular Support (Where Applicable)",
        description:
          "Where requested by Saudi ministries, courts, or employers, we coordinate accurate English-to-Arabic translation and any applicable consular formalities.",
      },
    ],
    requiredDocuments: [
      "Original Degree, Marriage Certificate, Birth Certificate, Wakala, or Commercial Document",
      "Clear color copy of the applicant's Indian Passport",
      "Copy of Saudi Iqama, Visa document, or Employer Offer Letter (where applicable)",
      "All semester marksheets (for educational degree verification)",
    ],
    importantNotes: [
      "Following Saudi Arabia's accession to the Hague Apostille Convention, standard public documents bearing an Indian MEA Apostille generally do not require routine Saudi Embassy legalization; however, certain professional verification programs (e.g., QVP, DataFlow, SCFHS, Saudi Engineering Council) or specific consular cases have distinct verification rules.",
      "Always verify with your Saudi employer, visa agent, or receiving ministry whether SDM + Apostille or State HRD + Apostille is specified for your academic degree.",
    ],
    faqs: [
      {
        question: "Does Saudi Arabia accept MEA Apostille on Indian documents now?",
        answer:
          "Yes, Saudi Arabia is a member of the Hague Apostille Convention, and Indian documents authenticated with an official MEA Apostille sticker are widely accepted for Saudi visa and official purposes. However, certain professional licensing portals or specific consular matters may have additional verification requirements, which we clarify before starting.",
      },
      {
        question: "Do I also need Arabic translation for Saudi Arabia documents?",
        answer:
          "Many Saudi government ministries, courts, and labour authorities require documents (especially Powers of Attorney/Wakala, Legal Heir Certificates, and civil records) to be accompanied by an accurate Arabic translation. We provide both attestation/apostille and Arabic translation support.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/apostille-services-india",
      "/saudi-arabia-death-claim-assistance",
      "/embassy-legalization-all-countries",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Saudi Arabia (KSA) Document Attestation / Apostille. My document is [Document Type] for [Employment/Family Visa/Business]. Please share the current procedure and quote.",
  },
  {
    id: "embassy-legalization-all-countries",
    slug: "/embassy-legalization-all-countries",
    title: "Embassy Legalization — All Countries",
    shortTitle: "Embassy Legalization — All Countries",
    badge: "Country-Wise Route Directory",
    image: "/assets/aistudio/Screenshot_2026-10-24-03-59-54-66_96b26121e545231a3c569311a54cda96_d5370a86.jpg",
    summary:
      "We provide document-route guidance and private documentation assistance for personal, educational, and commercial documents intended for use in foreign countries.",
    seoTitle:
      "Embassy Legalization — All Countries | Fatima Global Attestation",
    metaDescription:
      "Searchable country-wise directory for embassy legalization, MEA normal attestation, and Hague Apostille in India. Verified document routes for 100+ countries.",
    intro:
      "Different foreign countries apply distinct international treaty and consular rules when accepting Indian documents. While contracting parties to the 1961 Hague Convention generally accept an MEA Apostille sticker, non-Hague nations (and treaty-exception jurisdictions such as Mainland China) require Ministry of External Affairs (MEA) Normal Attestation followed by diplomatic legalization at the destination country's Embassy or High Commission in India. Fatima Global Attestation is an independent private consultancy providing document-route guidance and documentation assistance for personal, educational, and commercial documents intended for use abroad.",
    whoNeeds: [
      "Applicants who want to check whether their destination country requires Hague Apostille, MEA Normal Attestation, Embassy Legalization, or Certified Translation.",
      "Professionals, students, and families preparing Indian educational or civil certificates for visas, work permits, or residency in foreign countries.",
      "Exporters and corporations authenticating Certificates of Origin, Commercial Invoices, Powers of Attorney, or agency agreements for international trade.",
      "NRI and domestic applicants seeking transparent route confirmation before submitting original certificates.",
    ],
    eligibleDocuments: [
      {
        category: "Personal & Civil Status Documents",
        items: [
          "Birth Certificates & Marriage Certificates",
          "Police Clearance Certificates (PCC) & Single Status Affidavits",
          "Personal Powers of Attorney (POA), Death & Legal Heir Certificates",
        ],
      },
      {
        category: "Educational & Commercial Documents",
        items: [
          "University Degrees, Diplomas, Marksheets & School Certificates",
          "Commercial Invoices, Certificates of Origin & Packing Lists",
          "Corporate Powers of Attorney, Board Resolutions & Agency Contracts",
        ],
      },
    ],
    stepByStepProcess: [
      {
        step: 1,
        title: "Country & Receiving Authority Route Check",
        description:
          "Use our country directory below or share your document details on WhatsApp. We verify whether Hague Apostille, MEA Normal Attestation, Embassy Legalization, or translation applies to your destination and purpose.",
      },
      {
        step: 2,
        title: "Preliminary Verification (SDM / State HRD / Chamber of Commerce)",
        description:
          "Depending on the document category and destination rules, the document undergoes preliminary authentication via SDM, State Education/Home Department, e-Sanad, or Chamber of Commerce.",
      },
      {
        step: 3,
        title: "Ministry of External Affairs (MEA) Authentication",
        description:
          "The verified document is submitted to the MEA in New Delhi for an official Hague Apostille sticker or Normal Attestation stamp.",
      },
      {
        step: 4,
        title: "Embassy Legalization & Translation (Where Applicable)",
        description:
          "Where consular legalization or certified translation is required by the foreign mission or receiving authority, we coordinate submission and safe return of your documents.",
      },
    ],
    requiredDocuments: [
      "Original personal, educational, or commercial document to be authenticated",
      "Clear color copy of the applicant's Passport (and supporting academic marksheets or company letter where applicable)",
      "Destination country and intended purpose (e.g., Employment, Higher Education, Family Visa, Commercial Export)",
    ],
    importantNotes: [
      "Independent Private Consultancy: Fatima Global Attestation is an independent private documentation consultancy and is not an embassy, government department, or the Ministry of External Affairs (MEA).",
      "Reference Starting Point: Our directory uses the official MEA Protocol Division foreign missions list (https://idprotocolmea.gov.in/meaprotocol/) and HCCH treaty status tables as reference starting points. Not every listed embassy, high commission, consulate, or honorary consulate handles document legalization directly.",
      "The exact authentication route depends on the specific document type, issuing state/university, destination country, and receiving authority. Where a country's specific consular procedure cannot be independently verified in advance, it is marked 'Route requires confirmation'.",
    ],
    faqs: [
      {
        question: "Does every foreign embassy or consulate in India handle document legalization?",
        answer:
          "No. First, countries that are active members of the Hague Apostille Convention generally accept an MEA Apostille sticker without requiring embassy legalization. Second, even among listed foreign missions in the MEA Protocol Division directory, honorary consulates or certain regional consulates may not process legalization directly, or submissions may be routed through designated consular centers in New Delhi or Mumbai.",
      },
      {
        question: "What does 'Route requires confirmation' mean in the country directory?",
        answer:
          "We never guess or publish unverified embassy rules, fees, or timelines. When a destination country's specific consular checklist, translation rule, or diplomatic submission channel depends on case-by-case mission confirmation, we mark it 'Route requires confirmation' and verify the exact requirement for your document before any processing begins.",
      },
      {
        question: "Do I need to send the original document, or can I send a color copy?",
        answer:
          "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
      },
    ],
    relatedServices: [
      "/embassy-legalization-services",
      "/uae-attestation-services",
      "/saudi-arabia-attestation-services",
    ],
    whatsappMessage:
      "Hello Fatima Global Attestation, I need document-route guidance under Embassy Legalization — All Countries. Destination Country: [Country], Document Type: [Personal/Educational/Commercial], Intended Purpose: [Purpose]. Please confirm the applicable route.",
  },
];


