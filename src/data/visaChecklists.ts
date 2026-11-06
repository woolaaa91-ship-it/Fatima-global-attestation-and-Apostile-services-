import { COUNTRY_VISA_SPECS, type CountryVisaSpec } from "./visaCountryProfiles.ts";

export interface VisaFaqItem {
  question: string;
  answer: string;
}

export interface VisaHumanTip {
  title: string;
  detail: string;
}

export type VisaTypeSlug = "student-visa" | "work-visa";

export interface VisaRequirementCard {
  id: string;
  categoryTitle: string;
  documentsText: string;
  badgeText: string;
  badgeTone: "teal" | "amber" | "navy";
  helperPoints: string[];
  weProvideService: boolean;
  ourServiceSummary: string;
  ourServiceLinkPath: string;
  ourServiceLinkLabel: string;
  whatsappCtaLabel: string;
}

export interface VisaChecklistData {
  slug: string;
  slugParam: string;
  countrySlug: string;
  countryName: string;
  isoCode: string;
  visaType: VisaTypeSlug;
  visaTypeDisplay: "Student Visa" | "Work Visa";
  visaSubtypeNote: string;
  submissionChannel: string;
  isHagueMember: boolean;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  importantInfoTitle: string;
  importantInfoText: string;
  importantHighlights: {
    label: string;
    value: string;
  }[];
  requirementCards: VisaRequirementCard[];
  humanTips: VisaHumanTip[];
  relatedServiceLinks: {
    label: string;
    path: string;
    description: string;
  }[];
  disclaimerText: string;
  faqs: VisaFaqItem[];
  ctaWhatsappMessage: string;
}

export interface VisaCountryMeta {
  countrySlug: string;
  countryName: string;
  isoCode: string;
  isHagueMember: boolean;
  primaryLanguage: string;
  translationPath: string;
  countryGuidePath: string;
  submissionChannel: string;
}

export const VISA_CHECKLIST_COUNTRIES: VisaCountryMeta[] =
  COUNTRY_VISA_SPECS.map((spec) => ({
    countrySlug: spec.countrySlug,
    countryName: spec.countryName,
    isoCode: spec.isoCode,
    isHagueMember: spec.isHagueMember,
    primaryLanguage: spec.primaryLanguage,
    translationPath: spec.translationPath,
    countryGuidePath: spec.countryGuidePath,
    submissionChannel: spec.submissionChannel,
  }));

const STANDARD_DISCLAIMER =
  "Visa rules change frequently. Fatima Global Attestation is a private document assistance agency. This checklist is for reference only. Verify latest requirements on official VFS/Embassy websites before applying.";

function buildDefaultHumanTips(
  countryName: string,
  visaTypeDisplay: "Student Visa" | "Work Visa",
  isHagueMember: boolean,
  primaryLanguage: string
): VisaHumanTip[] {
  const legalizationTerm = isHagueMember
    ? "MEA Hague Apostille sticker"
    : `MEA Normal Attestation and ${countryName} Embassy stamp`;

  return [
    {
      title: "Do Not Laminate Original Certificates Before Legalization",
      detail: `Government authorities (State HRD, SDM, MEA, and Embassies) affix physical verification stamps and the ${legalizationTerm} directly on the reverse side of your original certificate. If your degree or birth certificate is laminated, we safely remove the lamination before submission.`,
    },
    {
      title: "Check Name & Parent Spelling Across Passport and Certificates",
      detail: `Even a minor initial or surname difference between your Indian Passport, Degree Certificate, Birth Certificate, and PCC can trigger a query during ${countryName} ${visaTypeDisplay.toLowerCase()} verification. Prepare a Notarized & Legalized 'One-and-the-Same Person Affidavit' in advance if any spelling varies.`,
    },
    {
      title: "Time Your Police Clearance Certificate (PCC) & Medical Carefully",
      detail: `While educational degree legalizations remain valid long-term, most embassies and VFS centers for ${countryName} require your RPO/PSK Police Clearance Certificate (PCC) and Medical Fitness Report to be issued within 90 to 180 days of your visa appointment.`,
    },
    {
      title:
        primaryLanguage !== "English"
          ? `Legalize the Original Document First, Then Translate into ${primaryLanguage}`
          : "Keep A4 Single-Sided Photocopies of Both Front & Back Stamps",
      detail:
        primaryLanguage !== "English"
          ? `For ${countryName}, always complete State HRD/SDM and ${legalizationTerm} on the original document first so that the certified ${primaryLanguage} translation includes the Apostille/Attestation serial numbers and stamps.`
          : `At your VFS/Embassy appointment for ${countryName}, submit clear A4 single-sided photocopies of both the front of your certificate and the reverse side showing the ${legalizationTerm} so your original document is returned safely.`,
    },
  ];
}

const CURATED_CHECKLISTS: Record<string, VisaChecklistData> = {
  "italy-student-visa": {
    slug: "/visa-checklist/italy-student-visa",
    slugParam: "italy-student-visa",
    countrySlug: "italy",
    countryName: "Italy",
    isoCode: "IT",
    visaType: "student-visa",
    visaTypeDisplay: "Student Visa",
    visaSubtypeNote: "Type D Long-Stay Study Visa · Universitaly, DOV & CIMEA",
    submissionChannel:
      "VFS Global India (Embassy of Italy New Delhi & Consulates in Mumbai, Kolkata, Bengaluru)",
    isHagueMember: true,
    seoTitle: "Italy Student Visa Checklist | Apostille & Translation",
    metaDescription:
      "Simplified Italy Student Visa document checklist for Indian applicants. Check VFS guidelines, mandatory State HRD + MEA Apostille rules, DOV/CIMEA, and Italian translation.",
    h1: "Italy Student Visa Document Checklist",
    subtitle:
      "Simplified guide based on official VFS/Embassy requirements for Indian applicants. Check which documents need MEA Apostille and Translation.",
    importantInfoTitle: "Important Legalization Rule for Italy Student Visas",
    importantInfoText:
      "Italy is a Hague Convention member. Educational documents require State HRD attestation (SDM not accepted) and MEA Apostille, plus Italian translation.",
    importantHighlights: [
      {
        label: "Academic Route",
        value: "State HRD Attestation → MEA Apostille (SDM Not Accepted)",
      },
      {
        label: "Credential Evaluation",
        value: "DOV (Declaration of Value) or CIMEA Comparability",
      },
      {
        label: "Language Requirement",
        value: "Certified English-to-Italian Translation",
      },
    ],
    requirementCards: [
      {
        id: "italy-student-edu",
        categoryTitle: "Educational Documents",
        documentsText:
          "Degree Certificate, Consolidated Transcripts, Class 12 Mark Sheets, and Universitaly Pre-Enrollment Summary.",
        badgeText: "Requires HRD Attestation + MEA Apostille + Italian Translation",
        badgeTone: "teal",
        helperPoints: [
          "Original Bachelor's/Master's Degree or Class 12 certificate authenticated by the issuing State HRD (SDM stamp is not accepted for Italian study visas).",
          "Ministry of External Affairs (MEA) Hague Apostille sticker affixed after State HRD verification.",
          "Certified Italian translation required for DOV (Dichiarazione di Valore) or CIMEA Statement of Comparability.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We handle State HRD coordination, MEA Apostille, and Certified Italian Translation for Indian degrees & mark sheets.",
        ourServiceLinkPath: "/services/degree-certificate-apostille",
        ourServiceLinkLabel: "View Degree HRD + Apostille Guide",
        whatsappCtaLabel: "Book HRD + Apostille + Italian Translation",
      },
      {
        id: "italy-student-personal",
        categoryTitle: "Personal Documents",
        documentsText:
          "Birth Certificate (for family sponsorship proof), Valid Passport, Police Clearance Certificate (if requested).",
        badgeText: "MEA Apostille + Italian Translation",
        badgeTone: "teal",
        helperPoints: [
          "Birth Certificate showing parental relationship when parents sponsor your tuition and living costs.",
          "MEA Apostille + Certified Italian translation on civil certificates submitted to VFS Italy.",
          "Valid Indian passport (at least 2 blank pages) and recent white-background biometric photographs.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We provide fast-track MEA Apostille and Certified Italian Translation for Birth Certificates and PCCs.",
        ourServiceLinkPath: "/services/apostille",
        ourServiceLinkLabel: "View Personal Document Apostille",
        whatsappCtaLabel: "Get Personal Docs Apostilled & Translated",
      },
      {
        id: "italy-student-financial",
        categoryTitle: "Financial & Other Documents",
        documentsText:
          "Parental Sponsorship Affidavit, 6-Month Bank Statements (~€534.41/month), Accommodation Proof & €30,000 Health Insurance.",
        badgeText: "Affidavit Requires Notary / SDM + Apostille",
        badgeTone: "amber",
        helperPoints: [
          "Sponsorship Affidavit on non-judicial stamp paper declaring financial support from parents/guardians.",
          "Bank statements, ITR returns, education loan sanction letter, or DSU regional scholarship documents.",
          "Confirmed Italian accommodation proof, flight itinerary, and minimum €30,000 medical insurance.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We assist with Sponsorship Affidavit notarization, SDM authentication, MEA Apostille, and Italian translation.",
        ourServiceLinkPath: "/services/notary-public",
        ourServiceLinkLabel: "View Notary & Affidavit Services",
        whatsappCtaLabel: "Get Sponsorship Affidavit Legalized",
      },
    ],
    humanTips: [
      {
        title: "Why SDM Apostille is Rejected for Italy Student Visas",
        detail:
          "Italian diplomatic missions in India (New Delhi, Mumbai, Kolkata, Bengaluru) strictly mandate State HRD Education Department authentication before the MEA Apostille sticker on degrees and mark sheets for DOV. Start your State HRD process early as university verification takes time.",
      },
      {
        title: "Complete HRD + Apostille Before Certified Italian Translation",
        detail:
          "Your certified Italian translation must reflect the final document including the HRD and MEA Apostille details so that VFS Italy and the Consulate can verify both the original and translated pages together.",
      },
      {
        title: "DSU Regional Scholarship vs. Visa Financial Proof",
        detail:
          "Even if you are applying for an Italian regional scholarship (DSU), VFS Italy requires your parents' Birth Certificate relationship proof, Sponsorship Affidavit, and 6-month active bank statements + ITRs.",
      },
      {
        title: "Keep Separate Sets for DOV and Visa Application",
        detail:
          "At VFS Global India, carry your original HRD + Apostilled certificates along with clear A4 single-sided photocopies of both front and back (showing the QR Apostille sticker).",
      },
    ],
    relatedServiceLinks: [
      {
        label: "Degree Certificate Apostille",
        path: "/services/degree-certificate-apostille",
        description:
          "State HRD and MEA Apostille processing for Indian university degrees and mark sheets.",
      },
      {
        label: "Certified Italian Translation",
        path: "/translation/italian-translation",
        description:
          "Certified Italian translations formatted for VFS Italy, DOV, and Universitaly submissions.",
      },
      {
        label: "Italy Country Apostille Guide",
        path: "/countries/italy",
        description:
          "Complete document legalization guide for Indian citizens travelling to Italy.",
      },
    ],
    disclaimerText: STANDARD_DISCLAIMER,
    faqs: [
      {
        question: "Do I need to apostille my degree for this visa?",
        answer:
          "Yes. For an Italy Student Visa, your Indian degree or Class 12 certificate and transcripts must first be attested by the respective State HRD (SDM is not accepted by Italian missions for study visas), followed by an MEA Hague Apostille sticker and certified Italian translation for DOV or CIMEA.",
      },
      {
        question:
          "What is the difference between Apostille and Embassy Attestation?",
        answer:
          "An MEA Apostille is a square computer-generated sticker with a QR code issued by the Ministry of External Affairs for countries that belong to the 1961 Hague Convention (like Italy and Germany). Embassy Attestation is a multi-step consular stamping chain required only for Non-Hague countries (like the UAE or Qatar).",
      },
      {
        question: "Can you help with translation for this visa?",
        answer:
          "Yes. We provide certified Italian translations along with State HRD and MEA Apostille coordination for your educational, personal, and sponsorship documents.",
      },
      {
        question: "How long does State HRD and MEA Apostille take for an Italy Student Visa?",
        answer:
          "MEA Apostille and certified Italian translation take 2 to 3 working days once pre-authentication is complete. State HRD authentication timelines depend on the state where your university is located (typically 1 to 4 weeks depending on university verification).",
      },
      {
        question: "Can I send my documents via courier if I live outside Delhi?",
        answer:
          "Yes. Applicants across all Indian states can dispatch their documents via insured courier to our Connaught Place, New Delhi desk, and we return the completed HRD, MEA Apostilled, and Italian-translated set to your doorstep.",
      },
    ],
    ctaWhatsappMessage: "Hi, I need help with Italy Student Visa documents.",
  },

  "germany-work-visa": {
    slug: "/visa-checklist/germany-work-visa",
    slugParam: "germany-work-visa",
    countrySlug: "germany",
    countryName: "Germany",
    isoCode: "DE",
    visaType: "work-visa",
    visaTypeDisplay: "Work Visa",
    visaSubtypeNote:
      "Opportunity Card (Chancenkarte), EU Blue Card & Skilled Worker Visa",
    submissionChannel:
      "VFS Global India & Consular Services Portal (German Missions in India)",
    isHagueMember: true,
    seoTitle: "Germany Work Visa Checklist | Apostille & Translation",
    metaDescription:
      "Simplified Germany Work Visa and Opportunity Card (Chancenkarte) document checklist for Indian applicants. Check Anabin/ZAB, Sperrkonto, MEA Apostille, and German translation.",
    h1: "Germany Work Visa Document Checklist",
    subtitle:
      "Simplified guide based on official VFS/Embassy requirements for Indian applicants. Check which documents need MEA Apostille and Translation.",
    importantInfoTitle:
      "Important Legalization Rule for Germany Work Visas & Opportunity Card",
    importantInfoText:
      "Germany requires degree recognition (Anabin/ZAB) and may need MEA Apostille for certain documents.",
    importantHighlights: [
      {
        label: "Degree Evaluation",
        value: "Anabin (H+ Institution) or ZAB Statement of Comparability",
      },
      {
        label: "Chancenkarte Funds",
        value: "Sperrkonto (€1,091/month = €13,092/year) or Formal Obligation",
      },
      {
        label: "Civil & ZAB Legalization",
        value: "MEA Hague Apostille + Certified German Translation",
      },
    ],
    requirementCards: [
      {
        id: "germany-work-edu",
        categoryTitle: "Educational Documents",
        documentsText:
          "University Degree Certificate, Semester Transcripts, Vocational Diplomas & Work Experience Letters.",
        badgeText:
          "Degree recognition via Anabin/ZAB · Apostille may be needed",
        badgeTone: "teal",
        helperPoints: [
          "Degree recognition via Anabin/ZAB. Apostille may be needed for ZAB application or regulated German licensing (healthcare, engineering, teaching).",
          "Anabin H+ university printout or official ZAB Statement of Comparability.",
          "Certified German translation when submitting non-English academic records or licensing files.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We provide SDM/HRD + MEA Apostille and Certified German Translation for Indian degrees & transcripts.",
        ourServiceLinkPath: "/services/degree-certificate-apostille",
        ourServiceLinkLabel: "View Degree Apostille Guide",
        whatsappCtaLabel: "Check Degree Apostille for Germany on WhatsApp",
      },
      {
        id: "germany-work-personal",
        categoryTitle: "Personal Documents",
        documentsText:
          "Birth Certificate, Marriage Certificate (for Spouse/Family Reunion), Police Clearance Certificate (PCC).",
        badgeText: "Requires MEA Apostille + German Translation",
        badgeTone: "teal",
        helperPoints: [
          "Original Indian Marriage Certificate & Birth Certificates require an MEA Apostille sticker when applying with dependents or family reunion.",
          "Police Clearance Certificate (PCC) with MEA Apostille for healthcare, childcare, and regulated German employers.",
          "Certified German translation of apostilled civil certificates.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We complete MEA Apostille and Certified German Translation for Marriage, Birth, and PCC certificates.",
        ourServiceLinkPath: "/services/apostille",
        ourServiceLinkLabel: "View Personal Document Apostille",
        whatsappCtaLabel: "Get Personal Docs Apostilled & Translated",
      },
      {
        id: "germany-work-financial",
        categoryTitle: "Financial & Other Documents",
        documentsText:
          "Blocked Account (Sperrkonto) or Employment Contract, Name Discrepancy Affidavit, Health Insurance.",
        badgeText: "Sperrkonto (€1,091/month) or Verpflichtungserklärung",
        badgeTone: "amber",
        helperPoints: [
          "For Opportunity Card (Chancenkarte): Sperrkonto showing €1,091/month (€13,092/year) or a formal Verpflichtungserklärung.",
          "For EU Blue Card / Skilled Worker: Signed German employment contract and Declaration of Employment (Erklärung zum Beschäftigungsverhältnis).",
          "Name Discrepancy Affidavit (Notarized + SDM/Apostille) if your name differs across passport and degree.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "Need a Name Mismatch Affidavit or Power of Attorney for Germany? We provide Notary, SDM & MEA Apostille.",
        ourServiceLinkPath: "/services/notary-public",
        ourServiceLinkLabel: "View Notary & Affidavit Services",
        whatsappCtaLabel: "Get Affidavit Notarized & Apostilled",
      },
    ],
    humanTips: buildDefaultHumanTips("Germany", "Work Visa", true, "German"),
    relatedServiceLinks: [
      {
        label: "Degree Certificate Apostille",
        path: "/services/degree-certificate-apostille",
        description:
          "SDM/HRD + MEA Apostille for Indian engineering, IT, and healthcare degrees.",
      },
      {
        label: "Certified German Translation",
        path: "/translation/german-translation",
        description:
          "Certified English-to-German translations for VFS Germany and ZAB/employer submissions.",
      },
      {
        label: "Germany Country Apostille Guide",
        path: "/countries/germany",
        description:
          "Complete Hague Apostille guide for Indian documents going to Germany.",
      },
    ],
    disclaimerText: STANDARD_DISCLAIMER,
    faqs: [
      {
        question: "Do I need to apostille my degree for this visa?",
        answer:
          "If your university and degree are already listed as H+ on Anabin, standard VFS uploads may accept your original degree. However, an MEA Apostille is frequently required for ZAB comparability assessments, regulated medical/nursing licenses, or employer onboarding in Germany.",
      },
      {
        question:
          "What is the difference between Apostille and Embassy Attestation?",
        answer:
          "Germany is a member of the Hague Apostille Convention. Therefore, Indian degrees, marriage certificates, and birth certificates are legalized via an MEA Apostille sticker rather than German Embassy consular attestation.",
      },
      {
        question: "Can you help with translation for this visa?",
        answer:
          "Yes. We provide certified German translations alongside MEA Apostille for your educational, marriage, birth, and PCC documents.",
      },
      {
        question: "What is the Blocked Account (Sperrkonto) requirement for the Germany Opportunity Card?",
        answer:
          "For the Germany Opportunity Card (Chancenkarte), Indian applicants without a formal German obligation letter (Verpflichtungserklärung) or part-time job contract must show a Blocked Account (Sperrkonto) funded with €1,091 per month (€13,092 for 12 months).",
      },
      {
        question: "Do Marriage and Birth Certificates need MEA Apostille when bringing my spouse to Germany?",
        answer:
          "Yes. When applying for a dependent spouse or child visa for Germany, original Indian Marriage and Birth Certificates should be legalized with an MEA Hague Apostille sticker and accompanied by a certified German translation.",
      },
    ],
    ctaWhatsappMessage: "Hi, I need help with Germany Work Visa documents.",
  },

  "israel-work-visa": {
    slug: "/visa-checklist/israel-work-visa",
    slugParam: "israel-work-visa",
    countrySlug: "israel",
    countryName: "Israel",
    isoCode: "IL",
    visaType: "work-visa",
    visaTypeDisplay: "Work Visa",
    visaSubtypeNote:
      "Israel B/1 Work Visa · Caregiver, Construction, Expert & Employment Permit",
    submissionChannel:
      "Israel Visa Application Centre (IVP / VFS India — New Delhi, Mumbai, Bengaluru)",
    isHagueMember: true,
    seoTitle: "Israel Work Visa Checklist | Apostille & Translation",
    metaDescription:
      "Simplified Israel B/1 Work Visa document checklist for Indian applicants. Check mandatory RPO PCC Apostille, ₹100 Family Details Affidavit Apostille, and approved medical tests.",
    h1: "Israel Work Visa Document Checklist",
    subtitle:
      "Simplified guide based on official VFS/Embassy requirements for Indian applicants. Check which documents need MEA Apostille and Translation.",
    importantInfoTitle:
      "Important Legalization Rule for Israel B/1 Work Visas",
    importantInfoText:
      "Israel is a Hague Convention member. For an Israel B/1 Work Visa, your RPO Police Clearance Certificate (PCC), Family Details Self-Affidavit (on ₹100 stamp paper), and Marriage Certificate MUST carry an original MEA Apostille sticker, alongside medical reports from an Embassy-approved clinic.",
    importantHighlights: [
      {
        label: "Mandatory PCC Rule",
        value: "Recent RPO/PSK Police Clearance Certificate with MEA Apostille",
      },
      {
        label: "Family Details Affidavit",
        value: "Self-Affidavit on ₹100 Stamp Paper + Notary + SDM + MEA Apostille",
      },
      {
        label: "Approved Medical Clinics",
        value: "East West Medical Center (Delhi) or V.M. Medical Centre (Mumbai)",
      },
    ],
    requirementCards: [
      {
        id: "israel-work-edu",
        categoryTitle: "Educational Documents",
        documentsText:
          "Caregiver / Nursing Training Diploma, Skill Certificate, or University Degree (for B/1 Expert Visa) & Experience Letters.",
        badgeText: "Requires SDM/HRD + MEA Apostille",
        badgeTone: "teal",
        helperPoints: [
          "Original Caregiver / Nursing training certificate or University Degree (for B/1 Foreign Expert category) verified via SDM/State HRD.",
          "Ministry of External Affairs (MEA) Hague Apostille sticker affixed on the original qualification certificate.",
          "Work experience certificates matching the Israeli employer's PIBA permit category.",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We complete SDM/HRD verification and MEA Apostille for Nursing, Caregiver, Diploma, and Degree certificates for Israel.",
        ourServiceLinkPath: "/services/degree-certificate-apostille",
        ourServiceLinkLabel: "View Degree & Diploma Apostille Guide",
        whatsappCtaLabel: "Book Qualification Apostille for Israel",
      },
      {
        id: "israel-work-personal",
        categoryTitle: "Personal Documents",
        documentsText:
          "RPO Police Clearance Certificate (PCC), Marriage Certificate, Valid & Expired Passports (2–3 Years Validity), Aadhaar/PAN.",
        badgeText: "Mandatory MEA Apostille on PCC & Marriage Cert",
        badgeTone: "teal",
        helperPoints: [
          "Original Police Clearance Certificate (PCC) issued by the Regional Passport Office (RPO/PSK) within the last 1–3 months — MUST carry an MEA Apostille sticker.",
          "Original Marriage Certificate with MEA Apostille sticker (if married; spouse appearance/ID may also be required at IVP submission).",
          "All current and expired original passports (minimum 2–3 years validity remaining) plus white-background photographs (5.5 × 5.5 cm or 3.5 × 4.5 cm per category).",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We provide express MEA Hague Apostille for RPO Police Clearance Certificates (PCC) and Marriage Certificates from our New Delhi desk.",
        ourServiceLinkPath: "/services/apostille",
        ourServiceLinkLabel: "View PCC & Personal Document Apostille",
        whatsappCtaLabel: "Get Israel PCC & Marriage Cert Apostilled",
      },
      {
        id: "israel-work-financial",
        categoryTitle: "Financial & Other Documents",
        documentsText:
          "Family Details Affidavit (₹100 Stamp Paper), Ministry of Interior (PIBA) Permit, Employment Contract & Approved Medical Report.",
        badgeText: "Family Affidavit Needs MEA Apostille + Approved Medical",
        badgeTone: "amber",
        helperPoints: [
          "Family Details Self-Affidavit drafted on ₹100 non-judicial stamp paper, notarized, SDM-authenticated, and legalized with an MEA Apostille sticker.",
          "Prior Work Permit Approval from the Israeli Ministry of Interior (Population and Immigration Authority - PIBA) and signed Employment Contract.",
          "Medical Fitness Report (Chest X-Ray for TB, HIV/AIDS, Hepatitis B/C, Blood Panel) strictly from Embassy-recognized centers: East West Medical Center (New Delhi) or V.M. Medical Centre (Mumbai).",
        ],
        weProvideService: true,
        ourServiceSummary:
          "We draft, notarize, SDM-verify, and MEA-Apostille the mandatory ₹100 Family Details Affidavit for Israel B/1 Work Visa files.",
        ourServiceLinkPath: "/services/notary-public",
        ourServiceLinkLabel: "View Affidavit & Notary Services",
        whatsappCtaLabel: "Get Israel Family Affidavit Apostilled",
      },
    ],
    humanTips: [
      {
        title: "RPO Police Clearance Certificate (PCC) Must Be Fresh & Apostilled",
        detail:
          "Israel Visa Application Centres (IVP/VFS) strictly check that your PCC was issued by the Regional Passport Office (RPO/PSK) — not a local police station — and carries an original MEA Hague Apostille sticker on the reverse.",
      },
      {
        title: "₹100 Stamp Paper Family Details Affidavit Must Also Be Apostilled",
        detail:
          "Many applicants only notarize their Family Details Affidavit and face file rejection at IVP. The ₹100 stamp paper affidavit declaring whether any family members reside in Israel must undergo Notary → SDM → MEA Apostille.",
      },
      {
        title: "Use Only Embassy-Recognized Medical Clinics",
        detail:
          "Medical reports from general hospitals are not accepted for Israel B/1 visas. Complete your medical screening (TB Chest X-Ray, HIV, Hepatitis, Blood tests) only at East West Medical Center (New Delhi) or V.M. Medical Centre (Mumbai).",
      },
      {
        title: "Print All Copies Single-Sided on A4 Paper",
        detail:
          "IVP/VFS Israel requires all passport copies (first and last page on a single A4 sheet), contract copies, and apostilled document copies to be printed strictly single-sided on A4 paper without staples.",
      },
    ],
    relatedServiceLinks: [
      {
        label: "MEA Apostille for PCC & Affidavits",
        path: "/services/apostille",
        description:
          "Fast-track MEA Hague Apostille for RPO PCC, Family Details Affidavit, and Marriage Certificates.",
      },
      {
        label: "Degree & Diploma Apostille",
        path: "/services/degree-certificate-apostille",
        description:
          "SDM/HRD + MEA Apostille for Caregiver, Nursing, and B/1 Expert qualifications.",
      },
      {
        label: "Certified Hebrew Translation",
        path: "/translation/hebrew-translation",
        description:
          "Certified Hebrew & English translation support for Israel visa documents.",
      },
    ],
    disclaimerText: STANDARD_DISCLAIMER,
    faqs: [
      {
        question: "Do I need to apostille my PCC and Family Affidavit for an Israel B/1 Work Visa?",
        answer:
          "Yes. Under official Embassy of Israel / IVP India guidelines, your RPO Police Clearance Certificate (PCC), your Family Details Self-Affidavit (on ₹100 stamp paper), and your Marriage Certificate (if married) must all carry an original MEA Hague Apostille sticker.",
      },
      {
        question:
          "What is the difference between Apostille and Embassy Attestation?",
        answer:
          "Israel is a member of the 1961 Hague Apostille Convention. Therefore, Indian public documents (PCC, affidavits, marriage certificates, and diplomas) are legalized via an MEA Apostille sticker from the Ministry of External Affairs rather than consular stamping.",
      },
      {
        question: "Can you help with translation for this visa?",
        answer:
          "Yes. If any of your civil, marriage, or training certificates are in Hindi or a regional Indian language, we provide certified English/Hebrew translations alongside MEA Apostille processing.",
      },
      {
        question: "How fast can you complete MEA Apostille on my Israel PCC and ₹100 Family Affidavit?",
        answer:
          "We complete Notary, SDM authentication, and official MEA Hague Apostille on your RPO Police Clearance Certificate (PCC), ₹100 Family Details Affidavit, and Marriage Certificate within 2 to 3 working days at our New Delhi desk.",
      },
      {
        question: "Which medical centers in India are approved for the Israel B/1 Work Visa?",
        answer:
          "Medical screenings for Israel B/1 Work Visas must be performed at clinics recognized by the Embassy/Consulate of Israel in India, such as East West Medical Center in New Delhi or V.M. Medical Centre in Mumbai.",
      },
    ],
    ctaWhatsappMessage: "Hi, I need help with Israel Work Visa documents.",
  },
};

function buildSpecChecklist(
  spec: CountryVisaSpec,
  visaType: VisaTypeSlug
): VisaChecklistData {
  const key = `${spec.countrySlug}-${visaType}`;
  if (CURATED_CHECKLISTS[key]) {
    return CURATED_CHECKLISTS[key];
  }

  const isStudent = visaType === "student-visa";
  const visaTypeDisplay = isStudent ? "Student Visa" : "Work Visa";
  const slug = `/visa-checklist/${spec.countrySlug}-${visaType}`;
  const needsTranslation = spec.primaryLanguage !== "English";
  const translationPhrase = needsTranslation
    ? ` + ${spec.primaryLanguage} Translation`
    : " (Certified English Translation if Regional)";

  const legalizationMethod = spec.isHagueMember
    ? "MEA Hague Apostille"
    : `MEA Normal Attestation + ${spec.countryName} Embassy Legalization`;

  const importantInfoText = isStudent
    ? spec.studentImportantRule
    : spec.workImportantRule;

  const badgeAcademic = isStudent
    ? spec.studentBadgeAcademic
    : spec.workBadgeAcademic;

  const badgePersonal = isStudent
    ? spec.studentBadgePersonal
    : spec.workBadgePersonal;

  const badgeFinancial = isStudent
    ? spec.studentBadgeFinancial
    : spec.workBadgeFinancial;

  const academicRuleText = isStudent
    ? spec.studentAcademicRule
    : spec.workAcademicRule;

  const personalRuleText = isStudent
    ? spec.studentPersonalRule
    : spec.workPersonalRule;

  const financialRuleText = isStudent
    ? spec.studentFinancialRule
    : spec.workFinancialRule;

  return {
    slug,
    slugParam: key,
    countrySlug: spec.countrySlug,
    countryName: spec.countryName,
    isoCode: spec.isoCode,
    visaType,
    visaTypeDisplay,
    visaSubtypeNote: isStudent ? spec.studentVisaCode : spec.workVisaCode,
    submissionChannel: spec.submissionChannel,
    isHagueMember: spec.isHagueMember,
    seoTitle: `${spec.countryName} ${visaTypeDisplay} Checklist | ${
      spec.isHagueMember ? "Apostille" : "Attestation"
    } & Translation`,
    metaDescription: `Simplified ${spec.countryName} ${visaTypeDisplay} document checklist for Indian applicants. Check VFS/Embassy rules, PCC, educational documents, and ${legalizationMethod}.`,
    h1: `${spec.countryName} ${visaTypeDisplay} Document Checklist`,
    subtitle:
      "Simplified guide based on official VFS/Embassy requirements for Indian applicants. Check which documents need MEA Apostille and Translation.",
    importantInfoTitle: `Important Legalization Rule for ${spec.countryName} ${visaTypeDisplay}s`,
    importantInfoText,
    importantHighlights: [
      {
        label: "Legalization Route",
        value: spec.specialTreatyNote
          ? "MEA Normal Attestation + Embassy Legalization (No Apostille)"
          : legalizationMethod,
      },
      {
        label: "Submission Channel",
        value: spec.submissionChannel,
      },
      {
        label: "Language & Translation",
        value: needsTranslation
          ? `Certified English to ${spec.primaryLanguage} Translation`
          : "English Accepted (Certified Translation if Regional)",
      },
    ],
    requirementCards: [
      {
        id: `${key}-edu`,
        categoryTitle: "Educational Documents",
        documentsText: isStudent
          ? "Degree Certificate, Consolidated Transcripts, Class 10 & 12 Mark Sheets, Official Admission / Offer Letter."
          : "University Degree Certificate, Technical Diploma, Transcripts & Work Experience Certificates.",
        badgeText: badgeAcademic,
        badgeTone: "teal",
        helperPoints: [
          academicRuleText,
          spec.isHagueMember
            ? `Authenticated via issuing State HRD or SDM followed by an official MEA Hague Apostille sticker.`
            : `Authenticated via issuing State HRD or SDM, MEA Normal Attestation, and ${spec.countryName} Embassy/Consulate legalization.`,
          needsTranslation
            ? `Accompanied by certified ${spec.primaryLanguage} translation for official submission.`
            : "Certified English translation required if any mark sheet or certificate is in a regional Indian language.",
        ],
        weProvideService: true,
        ourServiceSummary: `We handle complete ${legalizationMethod}${translationPhrase} for Indian degrees, diplomas, and mark sheets.`,
        ourServiceLinkPath: "/services/degree-certificate-apostille",
        ourServiceLinkLabel: "View Degree Attestation & Apostille Guide",
        whatsappCtaLabel: `Get Degree Legalized for ${spec.countryName}`,
      },
      {
        id: `${key}-personal`,
        categoryTitle: "Personal Documents",
        documentsText: isStudent
          ? "Birth Certificate, Police Clearance Certificate (PCC), Medical Report, Valid Passport & Biometric Photos."
          : "Police Clearance Certificate (PCC), Marriage Certificate, Children's Birth Certificates & Valid Passport.",
        badgeText: badgePersonal,
        badgeTone: "teal",
        helperPoints: [
          personalRuleText,
          spec.isHagueMember
            ? `Original civil certificates and RPO/PSK PCC receive an MEA Hague Apostille sticker.`
            : `Original civil certificates and PCC undergo SDM/State Home verification, MEA Attestation, and ${spec.countryName} Embassy legalization.`,
          needsTranslation
            ? `Certified ${spec.primaryLanguage} translation of apostilled/attested personal documents.`
            : "Ensure passport has at least 2 blank pages and meets minimum validity rules.",
        ],
        weProvideService: true,
        ourServiceSummary: `We process PCC, Birth & Marriage Certificate ${legalizationMethod} from our Connaught Place, New Delhi desk.`,
        ourServiceLinkPath: spec.isHagueMember
          ? "/services/apostille"
          : "/services/embassy-legalization",
        ourServiceLinkLabel: spec.isHagueMember
          ? "View Personal Document Apostille"
          : "View Embassy Legalization Guide",
        whatsappCtaLabel: `Book PCC / Civil Docs for ${spec.countryName}`,
      },
      {
        id: `${key}-financial`,
        categoryTitle: "Financial & Other Documents",
        documentsText: isStudent
          ? "Parental Sponsorship Affidavit, 6-Month Bank Statements, ITRs, Tuition Receipt, Accommodation & Health Insurance."
          : "Work Permit / Visa Approval, Signed Employment Contract, Name Discrepancy Affidavit & Medical/Insurance Proof.",
        badgeText: badgeFinancial,
        badgeTone: "amber",
        helperPoints: [
          financialRuleText,
          "One-and-the-Same Person / Name Discrepancy Affidavit if your name spelling varies across passport and academic records.",
          spec.isHagueMember
            ? "Supporting stamp-paper affidavits are notarized, SDM-authenticated, and legalized with an MEA Apostille sticker."
            : `Supporting affidavits are notarized, SDM-authenticated, and legalized via MEA and the ${spec.countryName} Embassy.`,
        ],
        weProvideService: true,
        ourServiceSummary:
          "We draft, notarize, and legalize Sponsorship, Family Details & Name Discrepancy Affidavits.",
        ourServiceLinkPath: "/services/notary-public",
        ourServiceLinkLabel: "View Notary & Affidavit Services",
        whatsappCtaLabel: "Get Affidavit Notarized & Legalized",
      },
    ],
    humanTips: buildDefaultHumanTips(
      spec.countryName,
      visaTypeDisplay,
      spec.isHagueMember,
      spec.primaryLanguage
    ),
    relatedServiceLinks: [
      {
        label: spec.isHagueMember
          ? "MEA Apostille Services"
          : "Embassy Legalization & MOFA",
        path: spec.isHagueMember
          ? "/services/apostille"
          : "/services/embassy-legalization",
        description: `Complete ${legalizationMethod} workflow for Indian documents.`,
      },
      {
        label: needsTranslation
          ? `Certified ${spec.primaryLanguage} Translation`
          : "Certified Document Translation",
        path: spec.translationPath,
        description: `Certified translations accepted for ${spec.countryName} visa and official submissions.`,
      },
      {
        label: `${spec.countryName} Country Legalization Guide`,
        path: spec.countryGuidePath,
        description: `Detailed document authentication guide for ${spec.countryName}.`,
      },
    ],
    disclaimerText: STANDARD_DISCLAIMER,
    faqs: [
      {
        question: `Do I need to apostille my degree for a ${spec.countryName} ${visaTypeDisplay}?`,
        answer: spec.specialTreatyNote
          ? `${spec.specialTreatyNote} Your degree must be attested by State HRD/SDM, MEA New Delhi, and legalized by the ${spec.countryName} Embassy.`
          : spec.isHagueMember
          ? `Yes. Since ${spec.countryName} is a member of the 1961 Hague Apostille Convention, Indian educational degrees and personal certificates requiring international authentication must receive an MEA Apostille sticker${
              needsTranslation
                ? ` and certified ${spec.primaryLanguage} translation`
                : ""
            }.`
          : `No—because ${spec.countryName} is a Non-Hague country, an Apostille sticker is not valid. Your degree must go through State HRD/SDM verification, MEA Normal Attestation, and ${spec.countryName} Embassy legalization.`,
      },
      {
        question:
          "What is the difference between Apostille and Embassy Attestation?",
        answer:
          "An MEA Apostille is a QR-coded square sticker issued by the Ministry of External Affairs for Hague Convention member countries (such as Italy, Germany, Israel, UK, USA, Canada, France, Spain, Portugal, Poland, and Saudi Arabia). Embassy Attestation is a multi-step consular stamping process required for Non-Hague countries (such as the UAE, Qatar, Kuwait, China, Malaysia, Thailand, Vietnam, and Egypt).",
      },
      {
        question: `Can you help with translation for my ${spec.countryName} ${visaTypeDisplay} documents?`,
        answer: needsTranslation
          ? `Yes. We provide certified ${spec.primaryLanguage} translations along with ${legalizationMethod} for all your educational, PCC, civil, and affidavit documents.`
          : "Yes. If any of your birth, marriage, PCC, or academic certificates are in Hindi or a regional Indian language, we provide certified English translations alongside MEA legalization.",
      },
      {
        question: `How many days does document legalization take for a ${spec.countryName} ${visaTypeDisplay}?`,
        answer: spec.isHagueMember
          ? `SDM + MEA Hague Apostille processing takes 2 to 3 working days at our New Delhi desk. If your ${spec.countryName} visa route specifically requires State HRD pre-authentication on educational degrees, the timeline depends on university verification in the issuing state.`
          : `MEA Normal Attestation and ${spec.countryName} Embassy legalization in New Delhi typically take 5 to 10 working days depending on consular processing schedules.`,
      },
      {
        question: `Can I submit my documents from outside Delhi for ${spec.countryName} visa legalization?`,
        answer:
          "Yes. Our central processing desk at Connaught Place, New Delhi supports applicants across all Indian states and abroad via secure, trackable courier.",
      },
    ],
    ctaWhatsappMessage: `Hi, I need help with ${spec.countryName} ${visaTypeDisplay} documents.`,
  };
}

export const VISA_CHECKLIST_PAGES: VisaChecklistData[] =
  COUNTRY_VISA_SPECS.flatMap((spec) => [
    buildSpecChecklist(spec, "student-visa"),
    buildSpecChecklist(spec, "work-visa"),
  ]);

/**
 * Generates static route parameters for every country + visa type slug
 * (e.g. [{ slug: "italy-student-visa" }, { slug: "germany-work-visa" }, ...]).
 */
export function generateStaticParams(): Array<{ slug: string }> {
  return VISA_CHECKLIST_PAGES.map((page) => ({
    slug: page.slugParam,
  }));
}

export function getVisaChecklistBySlug(
  slug: string
): VisaChecklistData | undefined {
  const cleanSlug = slug
    .trim()
    .toLowerCase()
    .replace(/^\/+/, "")
    .replace(/^visa-checklists\//, "")
    .replace(/^visa-checklist\//, "")
    .replace(/\/+$/, "");

  const aliasMap: Record<string, string> = {
    "germany-opportunity-card": "germany-work-visa",
    "uk-skilled-worker": "uk-work-visa",
    "uae-employment-visa": "uae-work-visa",
    "israel-b1-work-visa": "israel-work-visa",
  };
  const resolvedSlug = aliasMap[cleanSlug] || cleanSlug;

  return VISA_CHECKLIST_PAGES.find(
    (item) => item.slugParam === resolvedSlug
  );
}

export function getVisaChecklistByCountryAndType(
  countrySlug: string,
  visaType: VisaTypeSlug
): VisaChecklistData | undefined {
  return VISA_CHECKLIST_PAGES.find(
    (item) => item.countrySlug === countrySlug && item.visaType === visaType
  );
}

export function getVisaChecklistByPath(
  path: string
): VisaChecklistData | undefined {
  const clean = path.replace(/\/+$/, "").toLowerCase();
  if (clean === "/visa-checklist" || clean === "/visa-checklists") {
    return VISA_CHECKLIST_PAGES[0];
  }

  if (
    !clean.startsWith("/visa-checklist/") &&
    !clean.startsWith("/visa-checklists/")
  ) {
    return undefined;
  }

  return getVisaChecklistBySlug(clean);
}
