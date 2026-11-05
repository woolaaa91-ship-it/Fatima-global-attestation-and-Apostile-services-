import React, { useState, useEffect, useRef } from "react";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { CountryFlag } from "./CountryFlag";
import {
  FileCheck2,
  Compass,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Check,
  Phone,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  ClipboardList,
} from "lucide-react";

export interface DirectWhatsAppConsultationBoxProps {
  /** Full name of the country or service, e.g. "State of Israel" or "State of Kuwait" */
  subjectName: string;
  /** Short name for button text, e.g. "Israel" or "Kuwait" */
  shortName?: string;
  /** Optional ISO-2 country code to render the official country flag */
  countryIsoCode?: string;
  /** Optional route badge, e.g. "Hague Apostille" or "Embassy Legalization" */
  routeBadge?: string;
  /** Optional custom kicker badge text */
  kickerText?: string;
}

interface SelectOptionItem {
  label: string;
  value: string;
  shortTag: string;
}

interface ContextProfile {
  inferredIsoCode?: string;
  resolvedShortName: string;
  resolvedSubtitle: string;
  step1Label: string;
  step2Label: string;
  step1Options: SelectOptionItem[];
  step2Options: { label: string; value: string }[];
}

const DEFAULT_DOCUMENT_OPTIONS: SelectOptionItem[] = [
  {
    label: "Educational Certificates (Degree / Diploma / Marksheet)",
    value: "Educational Document (Degree / Diploma / Marksheet / Bonafide)",
    shortTag: "Educational",
  },
  {
    label: "Personal Documents (Birth / Marriage / PCC / Single Status)",
    value: "Personal Document (Birth / Marriage Certificate / PCC)",
    shortTag: "Personal / Civil",
  },
  {
    label: "Legal Documents (Power of Attorney / Wakala / Affidavit)",
    value: "Legal Document (Power of Attorney / Wakala / Affidavit / Legal Heir)",
    shortTag: "Legal / POA",
  },
  {
    label: "Commercial Documents (Invoice / COO / Board Resolution)",
    value: "Commercial Document (Certificate of Origin / Invoice / Board Resolution)",
    shortTag: "Commercial",
  },
  {
    label: "Multiple / Combined Document Set",
    value: "Multiple / Other Documents",
    shortTag: "Multiple Documents",
  },
];

const DEFAULT_PURPOSE_OPTIONS = [
  {
    label: "Employment Visa / Work Permit",
    value: "Employment Visa / Work Permit",
  },
  {
    label: "Higher Education / University Admission",
    value: "Higher Education / University Admission",
  },
  {
    label: "Family / Dependent Visa Sponsorship",
    value: "Family / Dependent Visa Sponsorship",
  },
  {
    label: "Commercial Export / Corporate Branch Setup",
    value: "Commercial Export / Corporate Branch Setup",
  },
  {
    label: "Legal / Property / Court / Heirship Filing",
    value: "Legal / Property / Court / Heirship Filing",
  },
  {
    label: "Permanent Residency / Civil Registration",
    value: "Permanent Residency / Civil Registration",
  },
];

function getContextProfile(
  subjectName: string,
  shortName?: string
): ContextProfile {
  const lower = `${subjectName} ${shortName || ""}`.toLowerCase();

  // 1. Specialized Profile: Saudi Arabia Death Claim / Legal Heir / Wakala
  if (
    lower.includes("death claim") ||
    lower.includes("inheritance") ||
    lower.includes("warisana") ||
    lower.includes("wakala")
  ) {
    return {
      inferredIsoCode: "SA",
      resolvedShortName: "Saudi Death Claim",
      resolvedSubtitle:
        "Select the family/legal claim documents you hold and the type of settlement in Saudi Arabia to open a pre-filled WhatsApp consultation with our New Delhi KSA legal desk.",
      step1Label: "Select Claim Document / Dossier Stage",
      step2Label: "Select Claim Type / KSA Authority",
      step1Options: [
        {
          label:
            "Complete Saudi Death Claim Dossier (Legal Heir + Wakala + Death Cert)",
          value:
            "Complete Saudi Death Claim Dossier (Legal Heir Certificate + Sharia Wakala + Death Certificate)",
          shortTag: "Complete Death Claim Dossier",
        },
        {
          label:
            "Special Power of Attorney (Sharia Wakala) for KSA Representative / Embassy",
          value:
            "Special Power of Attorney (Sharia Wakala) for KSA Representative / Indian Embassy",
          shortTag: "Sharia Wakala (POA)",
        },
        {
          label: "Legal Heir / Warisana / Family Succession Certificate",
          value: "Legal Heir / Warisana / Succession Certificate Attestation",
          shortTag: "Legal Heir Certificate",
        },
        {
          label:
            "Guardianship Certificate (Walayatnama — Minor Children Legal Heirs)",
          value:
            "Guardianship Certificate (Walayatnama for Minor Children Legal Heirs)",
          shortTag: "Guardianship (Minors)",
        },
        {
          label:
            "Death Certificate, Police / Medical Report & Certified Arabic Translation",
          value:
            "Death Certificate, Hospital/Police Report & Certified Arabic Translation",
          shortTag: "Death & Medical Records",
        },
      ],
      step2Options: [
        {
          label: "End-of-Service Benefits (EOSB) & Unpaid Employer Dues",
          value: "End-of-Service Benefits (EOSB) & Unpaid Employer Dues",
        },
        {
          label: "GOSI (Social Insurance) Death / Workplace Compensation",
          value: "GOSI (Social Insurance) Death / Workplace Compensation",
        },
        {
          label: "Traffic / Accident Compensation & Sharia Court Claim (Diyyah)",
          value: "Traffic / Accident Compensation & Sharia Court Claim (Diyyah)",
        },
        {
          label: "Saudi Bank Account Closure & Frozen Balance Release",
          value: "Saudi Bank Account Closure & Frozen Balance Release",
        },
        {
          label: "Indian Embassy Riyadh / Consulate Jeddah Welfare Filing",
          value: "Indian Embassy Riyadh / Consulate Jeddah Welfare Filing",
        },
      ],
    };
  }

  // 2. Specialized Profile: Certified Document Translation Services
  if (lower.includes("translation")) {
    return {
      resolvedShortName: "Document Translation",
      resolvedSubtitle:
        "Select your required language pair and document category below to open a pre-filled WhatsApp enquiry for certified translation and MEA/Embassy attestation.",
      step1Label: "Select Required Language Pair",
      step2Label: "Select Document Type for Translation",
      step1Options: [
        {
          label: "Arabic ↔ English Certified Legal Translation (KSA / UAE / GCC)",
          value: "Arabic to/from English Certified Translation",
          shortTag: "Arabic ↔ English",
        },
        {
          label: "Hindi ↔ English Certified Translation (MEA / Visa / Embassy)",
          value: "Hindi to/from English Certified Translation",
          shortTag: "Hindi ↔ English",
        },
        {
          label: "German / Italian / French / Spanish ↔ English Translation",
          value:
            "European Language (German / Italian / French / Spanish) Certified Translation",
          shortTag: "European Language",
        },
        {
          label: "Regional Indian Language → English Certified Translation",
          value: "Regional Indian Language to English Certified Translation",
          shortTag: "Regional → English",
        },
      ],
      step2Options: [
        {
          label: "Personal Certificate (Marriage / Birth / PCC / Affidavit)",
          value: "Personal Certificate + Notary / MEA Apostille",
        },
        {
          label: "Legal / Court Dossier (Wakala / POA / Legal Heir / Agreement)",
          value: "Legal / Wakala / Court Dossier + Embassy Attestation",
        },
        {
          label: "Educational Degree / Transcript / Marksheet",
          value: "Educational Degree / Transcript Translation",
        },
        {
          label: "Commercial / Export / Corporate Registration Document",
          value: "Commercial / Corporate Document Translation",
        },
      ],
    };
  }

  // 3. Specialized Profile: Commercial Documents / Chamber of Commerce
  if (lower.includes("commercial") || lower.includes("chamber of commerce")) {
    return {
      resolvedShortName: "Commercial Attestation",
      resolvedSubtitle:
        "Select your corporate or export document type and international business purpose below for Chamber of Commerce, MEA, and Embassy legalization.",
      step1Label: "Select Commercial / Corporate Document",
      step2Label: "Select International Business Purpose",
      step1Options: [
        {
          label: "Certificate of Origin (COO) & Commercial Export Invoice",
          value: "Certificate of Origin (COO) & Commercial Export Invoice",
          shortTag: "COO & Export Invoice",
        },
        {
          label:
            "Company Power of Attorney / Board Resolution / Agency Agreement",
          value:
            "Company Power of Attorney / Board Resolution / Agency Agreement",
          shortTag: "Board Resolution / POA",
        },
        {
          label:
            "Certificate of Incorporation / MOA & AOA / Audited Financials",
          value: "Certificate of Incorporation / MOA & AOA / Financials",
          shortTag: "Incorporation / MOA",
        },
        {
          label:
            "Free Sale Certificate / GMP / Phytosanitary / Regulatory Docs",
          value: "Free Sale Certificate / GMP / Regulatory Export Documents",
          shortTag: "Free Sale / GMP",
        },
      ],
      step2Options: [
        {
          label: "Export Shipment & Foreign Customs Clearance",
          value: "Export Shipment & Foreign Customs Clearance",
        },
        {
          label: "Overseas Branch / Subsidiary / Corporate Bank Account Setup",
          value: "Overseas Branch / Subsidiary / Corporate Bank Account Setup",
        },
        {
          label: "Foreign Distributor / Commercial Agency Registration",
          value: "Foreign Distributor / Commercial Agency Registration",
        },
        {
          label: "International Tender / Foreign Ministry Registration",
          value: "International Tender / Foreign Ministry Registration",
        },
      ],
    };
  }

  // 4. Specialized Profile: Educational / Degree / HRD Attestation
  if (
    lower.includes("degree") ||
    lower.includes("educational") ||
    lower.includes("hrd")
  ) {
    return {
      resolvedShortName: "Degree Attestation",
      resolvedSubtitle:
        "Select your academic qualification and overseas objective below to check whether SDM + MEA or State HRD + MEA/Embassy is required.",
      step1Label: "Select Educational Qualification",
      step2Label: "Select Overseas Purpose",
      step1Options: [
        {
          label: "Bachelor's / Master's / Doctorate Degree Certificate",
          value: "University Degree Certificate (Bachelor's / Master's / PhD)",
          shortTag: "University Degree",
        },
        {
          label: "Engineering / Medical / Nursing / Pharmacy Degree",
          value:
            "Professional Degree (Engineering / Medical / Nursing / Pharmacy)",
          shortTag: "Professional Degree",
        },
        {
          label: "Diploma / Consolidated Marksheet / Official Transcript",
          value: "Diploma / Marksheet / University Transcript",
          shortTag: "Diploma / Transcript",
        },
        {
          label: "School Transfer / CBSE / ICSE / State Board Certificate",
          value: "School Leaving / Board Certificate",
          shortTag: "School / Board Cert",
        },
      ],
      step2Options: [
        {
          label: "Employment Visa / Overseas Work Permit",
          value: "Employment Visa / Overseas Work Permit",
        },
        {
          label: "Higher Education / Foreign University Admission",
          value: "Higher Education / Foreign University Admission",
        },
        {
          label: "Professional Licensing (SCFHS / SCE / DataFlow / MOH)",
          value: "Professional Licensing (SCFHS / SCE / DataFlow / MOH)",
        },
        {
          label: "Permanent Residency / Skilled Migration",
          value: "Permanent Residency / Skilled Migration",
        },
      ],
    };
  }

  // 5. Specialized Profile: MOFA Attestation Services (UAE, Qatar, Kuwait, Saudi, Oman, Bahrain)
  if (lower.includes("mofa attestation")) {
    return {
      resolvedShortName: "MOFA Attestation",
      resolvedSubtitle:
        "Select your document category and destination Gulf MOFA country below to open a pre-filled WhatsApp enquiry with our New Delhi MEA & Embassy desk.",
      step1Label: "Select Document Category",
      step2Label: "Select Destination MOFA Country",
      step1Options: [
        {
          label: "Educational Certificates (Degree / Diploma / Marksheets)",
          value: "Educational Certificate (Degree / Diploma / Marksheets)",
          shortTag: "Educational Degree",
        },
        {
          label: "Marriage / Birth Certificate (Family Residence Visa)",
          value: "Personal Certificate (Marriage / Birth Certificate for Family Visa)",
          shortTag: "Marriage / Birth",
        },
        {
          label: "Qatar 3-Document Set (Degree + Marksheets + Bonafide)",
          value: "Qatar Complete Set (Degree + Final Marksheets + Bonafide)",
          shortTag: "Qatar 3-Doc Set",
        },
        {
          label: "Power of Attorney (POA / Wakala) & Legal Heir Certificate",
          value: "Legal Document (Power of Attorney / Wakala / Legal Heir)",
          shortTag: "POA / Wakala",
        },
        {
          label: "Commercial Invoice / COO / Company Setup Documents",
          value: "Commercial Document (Invoice / COO / Board Resolution)",
          shortTag: "Commercial",
        },
      ],
      step2Options: [
        {
          label: "UAE MOFA (MOFAIC) + UAE Embassy Attestation",
          value: "UAE MOFA (MOFAIC) + UAE Embassy Attestation",
        },
        {
          label: "Qatar MOFA (Doha) + Qatar Embassy Attestation",
          value: "Qatar MOFA (Doha) + Qatar Embassy Attestation",
        },
        {
          label: "Kuwait MOFA + Kuwait Embassy Attestation",
          value: "Kuwait MOFA + Kuwait Embassy Attestation",
        },
        {
          label: "Saudi Arabia MOFA + Royal Saudi Embassy Attestation",
          value: "Saudi Arabia MOFA + Royal Saudi Embassy Attestation",
        },
        {
          label: "Oman / Bahrain Foreign Ministry & Embassy Attestation",
          value: "Oman / Bahrain Foreign Ministry & Embassy Attestation",
        },
      ],
    };
  }

  // Default Profile for Country Pages & General Attestation / Apostille Pages
  const cleanShort =
    shortName && shortName.length <= 28
      ? shortName
      : subjectName
          .replace(/\s+Services.*$/i, "")
          .replace(/\s+from India.*$/i, "");

  return {
    resolvedShortName: cleanShort,
    resolvedSubtitle:
      "Select your document category and purpose below to open a pre-filled WhatsApp message with our New Delhi documentation desk.",
    step1Label: "Select Document Category",
    step2Label: "Select Intended Purpose",
    step1Options: DEFAULT_DOCUMENT_OPTIONS,
    step2Options: DEFAULT_PURPOSE_OPTIONS,
  };
}

export const DirectWhatsAppConsultationBox: React.FC<
  DirectWhatsAppConsultationBoxProps
> = ({
  subjectName,
  shortName,
  countryIsoCode,
  routeBadge,
  kickerText = "Direct Country Desk Consultation",
}) => {
  const profile = getContextProfile(subjectName, shortName);

  const [selectedDocType, setSelectedDocType] = useState<string>(
    profile.step1Options[0].value
  );
  const [selectedPurpose, setSelectedPurpose] = useState<string>(
    profile.step2Options[0].value
  );

  // Sequential scroll-triggered shine state: 0 = idle, 1 = Step 1 shining, 2 = Step 2 shining
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [activeShineStep, setActiveShineStep] = useState<0 | 1 | 2>(0);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Reset selected values when navigating between pages with different option sets
  useEffect(() => {
    setSelectedDocType(profile.step1Options[0].value);
    setSelectedPurpose(profile.step2Options[0].value);
    setUserInteracted(false);
  }, [subjectName, shortName]);

  // Observe when user scrolls to this consultation box
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [subjectName]);

  // Run sequential Step 1 -> Step 2 shine animation when scrolled into view
  useEffect(() => {
    if (!isInView || userInteracted) {
      return;
    }

    let step1Timer: ReturnType<typeof setTimeout> | null = null;
    let step2Timer: ReturnType<typeof setTimeout> | null = null;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;
    let cycleInterval: ReturnType<typeof setInterval> | null = null;

    const runSequence = () => {
      // 1. Shine Step 1 ("Select Document Category" + inner select box)
      setActiveShineStep(1);

      // 2. After Step 1 finishes (~1.55s), shine Step 2 ("Select Intended Purpose" + inner select box)
      step2Timer = setTimeout(() => {
        setActiveShineStep(2);
      }, 1550);

      // 3. Return to calm idle state before next gentle cycle
      resetTimer = setTimeout(() => {
        setActiveShineStep(0);
      }, 3100);
    };

    step1Timer = setTimeout(runSequence, 180);
    cycleInterval = setInterval(runSequence, 5400);

    return () => {
      if (step1Timer) clearTimeout(step1Timer);
      if (step2Timer) clearTimeout(step2Timer);
      if (resetTimer) clearTimeout(resetTimer);
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isInView, userInteracted]);

  const handleStep1Change = (val: string) => {
    setSelectedDocType(val);
    setUserInteracted(true);
    // Guide user immediately to Step 2 after choosing Step 1
    setActiveShineStep(2);
    setTimeout(() => {
      setActiveShineStep(0);
    }, 1600);
  };

  const handleStep2Change = (val: string) => {
    setSelectedPurpose(val);
    setUserInteracted(true);
    setActiveShineStep(0);
  };

  const effectiveIsoCode = countryIsoCode || profile.inferredIsoCode;
  const displayShortName = profile.resolvedShortName;

  const activeDocOption =
    profile.step1Options.find((d) => d.value === selectedDocType) ||
    profile.step1Options[0];

  const prefilledWhatsAppMessage = [
    `Hello ${BUSINESS_CONFIG.shortName}, I need document authentication guidance and quotation:`,
    ``,
    `• Destination / Service: ${subjectName}`,
    `• ${profile.step1Label.replace(/^Select\s+/i, "")}: ${selectedDocType}`,
    `• ${profile.step2Label.replace(/^Select\s+/i, "")}: ${selectedPurpose}`,
    ...(routeBadge ? [`• Applicable Route: ${routeBadge}`] : []),
    ``,
    `Please confirm the exact procedure, timeline, and requirements for my documents.`,
  ].join("\n");

  const isKuwaitBox =
    (effectiveIsoCode || "").toUpperCase() === "KW" ||
    subjectName.toLowerCase().includes("kuwait") ||
    (shortName || "").toLowerCase().includes("kuwait");

  // ============================================================================
  // BESPOKE PREMIUM COLOURFUL DESIGN FOR KUWAIT COUNTRY ENQUIRY BOX
  // ============================================================================
  if (isKuwaitBox) {
    const kuwaitRouteText =
      routeBadge ||
      "Non-Hague Route · State/SDM → MEA → Kuwait Embassy → Kuwait MOFA";

    return (
      <section
        ref={sectionRef}
        className="w-full rounded-[26px] overflow-hidden border-2 border-[#2AA198]/45 bg-gradient-to-b from-[#071D34] via-[#0E515E] to-[#D8EFECE8] shadow-xl"
      >
        {/* 1 & 2. Deep Navy-to-Teal Gradient Header Section */}
        <div className="relative bg-gradient-to-br from-[#071B30] via-[#0B334E] to-[#0F6366] px-4 pt-5 pb-5 sm:px-6 sm:pt-6 sm:pb-6 text-white overflow-hidden">
          {/* Decorative Gold-Rimmed Atmospheric Arc on Right */}
          <div
            className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full bg-gradient-to-bl from-[#1C7C8C]/45 via-[#0E4863]/30 to-transparent border-l-2 border-b-2 border-[#D49B27]/50"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute top-6 right-6 w-28 h-28 rounded-full bg-amber-300/10 blur-2xl"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-4">
            {/* Green/Teal Consultation Badge */}
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white bg-[#0B4F55]/90 border border-[#22B59B]/70 px-3.5 py-1.5 rounded-full shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#18E299] animate-pulse shrink-0" />
                <span>{kickerText}</span>
              </span>
            </div>

            {/* Kuwait Flag in Attractive Rounded Badge + White/Gold Heading + Light-Blue Supporting Text */}
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="p-2 sm:p-2.5 rounded-2xl bg-[#0E3A4F]/95 border-2 border-[#3C7E8C]/70 shadow-md shrink-0">
                <CountryFlag
                  isoCode="KW"
                  countryName="State of Kuwait"
                  size="lg"
                  className="rounded-lg border-white/25"
                />
              </div>

              <div className="min-w-0 flex-1 space-y-1.5">
                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-extrabold font-serif leading-tight tracking-tight">
                  <span className="text-white block">Kuwait Certificate</span>
                  <span className="text-[#EBCB6B] block">
                    Attestation from India
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-[#CBE7F7] font-medium leading-relaxed">
                  Educational, Personal, Commercial and Legal Document
                  Attestation for Kuwait.
                </p>
              </div>
            </div>

            {/* 3. Authentication Route Dark Teal / Navy Inner Card */}
            <div className="rounded-2xl bg-[#072235]/90 border border-[#D49B27]/75 px-3.5 py-3 sm:px-4 sm:py-3.5 flex items-start sm:items-center gap-3 shadow-inner">
              <div className="w-9 h-9 rounded-xl bg-[#D49B27]/15 border border-[#E5B84B]/45 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                <ShieldCheck className="w-5 h-5 text-[#EBCB6B]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-extrabold text-[#EBCB6B] leading-snug break-words">
                  {kuwaitRouteText.replace(/•/g, "·")}
                </p>
                <p className="text-[11px] sm:text-xs text-[#C7E2F2] mt-0.5 leading-snug">
                  Applicable authentication process for most documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Coordinated Tinted Body Container */}
        <div className="bg-gradient-to-b from-[#E6F4F3] via-[#ECF7F6] to-[#E1F2EE] p-4 sm:p-5 space-y-4">
          {/* 4. Step 1: Document Category Selection — Light Blue Background Card */}
          <div
            className={`rounded-2xl bg-gradient-to-b from-[#DFF0FC] to-[#D4EAFA] border border-[#96C6EA] p-4 sm:p-5 shadow-xs space-y-3 transition-all ${
              activeShineStep === 1 ? "fga-step-card-shine" : ""
            }`}
          >
            <label
              htmlFor="wa-kuwait-doc-type"
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071D36] text-white text-sm sm:text-base font-extrabold flex items-center justify-center shrink-0 shadow-2xs ${
                    activeShineStep === 1 ? "fga-step-badge-active" : ""
                  }`}
                >
                  1
                </span>
                <div className="min-w-0">
                  <span className="block text-sm sm:text-base font-extrabold text-[#071D36] leading-tight">
                    Select Document Category
                  </span>
                  <span className="block text-xs text-[#2B4C6B] mt-0.5">
                    Choose the type of document you need to attest.
                  </span>
                </div>
              </div>

              <div className="pl-3 border-l border-[#9AC7E8] shrink-0">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-[#0B8480]" />
              </div>
            </label>

            <div
              className={`relative rounded-xl ${
                activeShineStep === 1 ? "fga-inner-select-shine" : ""
              }`}
            >
              <select
                id="wa-kuwait-doc-type"
                value={selectedDocType}
                onChange={(e) => handleStep1Change(e.target.value)}
                onFocus={() => setUserInteracted(true)}
                className="w-full appearance-none bg-white border border-[#84B9E3] hover:border-[#0B8480] focus:border-[#0B8480] focus:ring-2 focus:ring-[#0B8480]/20 rounded-xl pl-3.5 pr-10 py-3 text-xs sm:text-sm font-extrabold text-[#071D36] shadow-2xs cursor-pointer transition-all focus:outline-none truncate"
              >
                {profile.step1Options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#0B8480]">
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
          </div>

          {/* 5. Step 2: Intended Purpose Selection — Very Light Teal Background Card */}
          <div
            className={`rounded-2xl bg-gradient-to-b from-[#DCF6F3] to-[#CFF0EC] border border-[#88D3CA] p-4 sm:p-5 shadow-xs space-y-3 transition-all ${
              activeShineStep === 2 ? "fga-step-card-shine" : ""
            }`}
          >
            <label
              htmlFor="wa-kuwait-purpose"
              className="flex items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071D36] text-white text-sm sm:text-base font-extrabold flex items-center justify-center shrink-0 shadow-2xs ${
                    activeShineStep === 2 ? "fga-step-badge-active" : ""
                  }`}
                >
                  2
                </span>
                <div className="min-w-0">
                  <span className="block text-sm sm:text-base font-extrabold text-[#071D36] leading-tight">
                    Select Intended Purpose
                  </span>
                  <span className="block text-xs text-[#265456] mt-0.5">
                    Let us know the purpose of attestation.
                  </span>
                </div>
              </div>

              <div className="pl-3 border-l border-[#88D3CA] shrink-0">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-[#0B8480]" />
              </div>
            </label>

            <div
              className={`relative rounded-xl ${
                activeShineStep === 2 ? "fga-inner-select-shine" : ""
              }`}
            >
              <select
                id="wa-kuwait-purpose"
                value={selectedPurpose}
                onChange={(e) => handleStep2Change(e.target.value)}
                onFocus={() => setUserInteracted(true)}
                className="w-full appearance-none bg-white border border-[#7ACBC1] hover:border-[#0B8480] focus:border-[#0B8480] focus:ring-2 focus:ring-[#0B8480]/20 rounded-xl pl-3.5 pr-10 py-3 text-xs sm:text-sm font-extrabold text-[#071D36] shadow-2xs cursor-pointer transition-all focus:outline-none truncate"
              >
                {profile.step2Options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#0B8480]">
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              </span>
            </div>
          </div>

          {/* 6. Pre-filled Summary — Soft Mint Green Background with Teal Border */}
          <div className="rounded-2xl bg-gradient-to-b from-[#E1F6EC] to-[#D2F0E2] border border-[#5AB893] p-4 sm:p-5 shadow-xs space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#B9E8D2] border border-[#7ECBA9] flex items-center justify-center shrink-0 text-[#0A694C]">
                  <ClipboardList className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#072536] leading-tight">
                    Pre-filled Summary
                  </h3>
                  <p className="text-xs text-[#265348] mt-0.5 leading-snug">
                    Your selections will be included in the WhatsApp message.
                  </p>
                </div>
              </div>

              <span
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0D7A43] text-white flex items-center justify-center shrink-0 shadow-xs"
                aria-hidden="true"
              >
                <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
              </span>
            </div>

            {/* Gold & Teal/Blue Selection Highlights */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4EAFA] border border-[#8FC0E6] text-[#07223B] text-xs sm:text-sm font-extrabold shadow-2xs">
                <GraduationCap className="w-4 h-4 text-[#0A4D78] shrink-0" />
                <span>{activeDocOption.shortTag}</span>
              </span>

              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAECD0] border border-[#DFBF76] text-[#2B2006] text-xs sm:text-sm font-extrabold shadow-2xs">
                <Briefcase className="w-4 h-4 text-[#936814] shrink-0" />
                <span>{selectedPurpose}</span>
              </span>
            </div>

            {/* Ready to send confirmation bar */}
            <div className="rounded-xl bg-[#C1EAD6] border border-[#8BD3B2] px-3.5 py-2.5 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#0D7A43] text-white flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-[#085530]">
                Ready to send on WhatsApp
              </span>
            </div>
          </div>

          {/* 7. WhatsApp CTA — Premium WhatsApp Green Gradient */}
          <div className="pt-0.5">
            <a
              href={getWhatsAppUrl(prefilledWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group inline-flex items-center justify-center sm:justify-between gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-[#098749] via-[#129E57] to-[#08773F] hover:from-[#07743E] hover:via-[#0F8C4C] hover:to-[#066535] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-[#098749]/25 border border-[#38C97F]/45 active:scale-[0.99] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </span>
                <span className="tracking-tight leading-snug text-left">
                  Discuss Kuwait Requirements on WhatsApp
                </span>
              </div>

              <ChevronRight className="w-5 h-5 text-white shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // STANDARD DESIGN FOR ALL OTHER COUNTRY & SERVICE PAGES
  // ============================================================================
  return (
    <section
      ref={sectionRef}
      className="rounded-2xl overflow-hidden border-2 border-[#0F766E]/25 bg-white shadow-md"
    >
      {/* Executive Navy-Teal Header Banner */}
      <div className="relative bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0F5257] px-5 py-5 sm:px-6 sm:py-6 text-white overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-400/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-amber-400/10 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-3">
          {/* Top Status Pill Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-emerald-200 bg-emerald-500/15 border border-emerald-400/35 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>{kickerText}</span>
            </span>

            {routeBadge ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-200 bg-amber-400/15 border border-amber-300/30 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>{routeBadge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
                <span>New Delhi MEA Desk</span>
              </span>
            )}
          </div>

          {/* Heading + Optional Flag */}
          <div className="space-y-2 pt-0.5">
            <div className="flex items-center gap-3.5">
              {effectiveIsoCode ? (
                <div className="p-1.5 rounded-xl bg-white/10 border border-white/20 shrink-0 shadow-xs">
                  <CountryFlag
                    isoCode={effectiveIsoCode}
                    countryName={subjectName}
                    size="md"
                    className="border-white/20"
                  />
                </div>
              ) : (
                <div className="w-11 h-11 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                </div>
              )}

              <h2 className="text-lg sm:text-xl font-extrabold text-white font-serif leading-snug min-w-0 flex-1">
                Enquire on WhatsApp for{" "}
                <span className="text-amber-300">{subjectName}</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed">
              {profile.resolvedSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Selection Body */}
      <div className="p-5 sm:p-6 space-y-4 bg-gradient-to-b from-slate-50/70 to-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Step 1 Card */}
          <div
            className={`rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-2xs hover:border-[#0F766E]/50 focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/15 transition-all ${
              activeShineStep === 1 ? "fga-step-card-shine" : ""
            }`}
          >
            <label
              htmlFor={`wa-doc-type-${displayShortName}`}
              className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0A192F]">
                <span
                  className={`w-5 h-5 rounded-md bg-[#0A192F] text-amber-300 text-[11px] font-extrabold inline-flex items-center justify-center shrink-0 transition-transform ${
                    activeShineStep === 1 ? "fga-step-badge-active" : ""
                  }`}
                >
                  1
                </span>
                <span>{profile.step1Label}</span>
              </span>
              <FileCheck2
                className={`w-4 h-4 shrink-0 transition-colors ${
                  activeShineStep === 1
                    ? "text-emerald-600 scale-110"
                    : "text-[#0F766E]"
                }`}
              />
            </label>

            <div
              className={`relative rounded-lg ${
                activeShineStep === 1 ? "fga-inner-select-shine" : ""
              }`}
            >
              <select
                id={`wa-doc-type-${displayShortName}`}
                value={selectedDocType}
                onChange={(e) => handleStep1Change(e.target.value)}
                onFocus={() => setUserInteracted(true)}
                className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-50 text-xs sm:text-sm text-[#0A192F] font-bold focus:outline-none focus:bg-white focus:border-[#0F766E] cursor-pointer transition-colors truncate"
              >
                {profile.step1Options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
                <span
                  className={`w-7 h-7 rounded-md bg-teal-50 border border-teal-200/70 flex items-center justify-center text-[#0F766E] transition-colors ${
                    activeShineStep === 1 ? "fga-dropdown-arrow-active" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </span>
            </div>
          </div>

          {/* Step 2 Card */}
          <div
            className={`rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-2xs hover:border-[#0F766E]/50 focus-within:border-[#0F766E] focus-within:ring-2 focus-within:ring-[#0F766E]/15 transition-all ${
              activeShineStep === 2 ? "fga-step-card-shine" : ""
            }`}
          >
            <label
              htmlFor={`wa-purpose-${displayShortName}`}
              className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
            >
              <span className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0A192F]">
                <span
                  className={`w-5 h-5 rounded-md bg-[#0A192F] text-amber-300 text-[11px] font-extrabold inline-flex items-center justify-center shrink-0 transition-transform ${
                    activeShineStep === 2 ? "fga-step-badge-active" : ""
                  }`}
                >
                  2
                </span>
                <span>{profile.step2Label}</span>
              </span>
              <Compass
                className={`w-4 h-4 shrink-0 transition-colors ${
                  activeShineStep === 2
                    ? "text-emerald-600 scale-110"
                    : "text-[#0F766E]"
                }`}
              />
            </label>

            <div
              className={`relative rounded-lg ${
                activeShineStep === 2 ? "fga-inner-select-shine" : ""
              }`}
            >
              <select
                id={`wa-purpose-${displayShortName}`}
                value={selectedPurpose}
                onChange={(e) => handleStep2Change(e.target.value)}
                onFocus={() => setUserInteracted(true)}
                className="w-full appearance-none pl-3.5 pr-10 py-2.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-50 text-xs sm:text-sm text-[#0A192F] font-bold focus:outline-none focus:bg-white focus:border-[#0F766E] cursor-pointer transition-colors truncate"
              >
                {profile.step2Options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-1.5 flex items-center">
                <span
                  className={`w-7 h-7 rounded-md bg-teal-50 border border-teal-200/70 flex items-center justify-center text-[#0F766E] transition-colors ${
                    activeShineStep === 2 ? "fga-dropdown-arrow-active" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Pre-Filled Selection Summary Strip */}
        <div className="rounded-xl bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5 text-emerald-950">
            <span className="font-bold text-emerald-800">
              Pre-filled Summary:
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-bold text-[#0A192F]">
              {activeDocOption.shortTag}
            </span>
            <span className="text-emerald-600 font-bold">•</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-emerald-200 font-semibold text-slate-700">
              {selectedPurpose}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800">
            Ready to send on WhatsApp
          </span>
        </div>

        {/* Primary WhatsApp CTA Button */}
        <div className="pt-0.5">
          <a
            href={getWhatsAppUrl(prefilledWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group relative inline-flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#1DA851] via-[#25D366] to-[#179C48] hover:from-[#189647] hover:via-[#20bd5a] hover:to-[#13853D] text-white shadow-md shadow-emerald-600/20 active:scale-[0.99] transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                <WhatsAppIcon className="w-5 h-5 text-white" />
              </span>
              <div className="text-left min-w-0">
                <span className="block text-xs sm:text-base font-extrabold tracking-tight leading-snug">
                  Discuss {displayShortName} Requirements on WhatsApp
                </span>
                <span className="block text-[11px] text-emerald-50 font-medium">
                  Instant response • Pre-filled enquiry with New Delhi desk
                </span>
              </div>
            </div>

            <span className="w-8 h-8 rounded-lg bg-white/20 border border-white/25 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </a>
        </div>

        {/* Bottom Trust & Direct Call Bar */}
        <div className="pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>MEA &amp; Embassy Verified Route</span>
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>PAN-India Pickup &amp; Courier</span>
            </span>
          </div>

          <a
            href={`tel:${BUSINESS_CONFIG.telPhone}`}
            className="inline-flex items-center gap-1.5 font-extrabold text-[#0A192F] hover:text-[#0F766E] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
            <span>Direct Desk: {BUSINESS_CONFIG.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
