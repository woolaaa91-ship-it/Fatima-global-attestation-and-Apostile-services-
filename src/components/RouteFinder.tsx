import React, { useState, useEffect, useRef } from "react";
import { getWhatsAppUrl } from "../config/business";
import { scrollToSectionById } from "../utils/modalHistory";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  KnowledgeRecord,
  INITIAL_KNOWLEDGE_RECORDS,
  buildKnowledgeRecordId,
} from "../data/knowledgeBase";
import {
  Compass,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Building2,
  GraduationCap,
  Users,
} from "lucide-react";

interface RouteFinderProps {
  onSelectService?: (slug: string) => void;
  onRequestQuoteWithDetails?: (details: any) => void;
}

export const RouteFinder: React.FC<RouteFinderProps> = ({
  onSelectService,
  onRequestQuoteWithDetails,
}) => {
  const [docCategory, setDocCategory] = useState<
    "" | "personal" | "educational" | "commercial"
  >("personal");
  const [documentType, setDocumentType] = useState<string>("");
  const [customDocumentType, setCustomDocumentType] = useState<string>("");
  const [destinationCountry, setDestinationCountry] = useState<string>("");
  const [customCountry, setCustomCountry] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [customPurpose, setCustomPurpose] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string>("");

  // Scroll-triggered sequential shine state:
  // 1 = Select Document Category box, 2 = 1. Specific Document, 3 = 2. Destination Country, 4 = 3. Primary Purpose, 5 = Check Attestation Route
  const formCardRef = useRef<HTMLDivElement | null>(null);
  const [isFinderInView, setIsFinderInView] = useState<boolean>(false);
  const [userInteractedFinder, setUserInteractedFinder] = useState<boolean>(false);
  const [activeShineBox, setActiveShineBox] = useState<0 | 1 | 2 | 3 | 4 | 5>(0);
  const [activeCategoryBtnShine, setActiveCategoryBtnShine] = useState<0 | 1 | 2 | 3>(0);

  // Local saved knowledge records (seeded with INITIAL_KNOWLEDGE_RECORDS and synced with local server store)
  const [knowledgeRecords, setKnowledgeRecords] = useState<KnowledgeRecord[]>(
    INITIAL_KNOWLEDGE_RECORDS
  );
  const [activeRecord, setActiveRecord] = useState<KnowledgeRecord | null>(null);
  const [matchType, setMatchType] = useState<
    "exact" | "country_category" | "country_general" | "none"
  >("none");

  // Observe when user scrolls to the Document Route Finder form card
  useEffect(() => {
    const el = formCardRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsFinderInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsFinderInView(entry.isIntersecting);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run sequential one-by-one inner box shine when scrolled into view
  useEffect(() => {
    if (!isFinderInView || userInteractedFinder) {
      return;
    }

    const timers: Array<ReturnType<typeof setTimeout>> = [];
    let cycleInterval: ReturnType<typeof setInterval> | null = null;

    const runSequence = () => {
      // Box 1: SELECT DOCUMENT CATEGORY (plus Personal -> Educational -> Commercial sub-highlight)
      setActiveShineBox(1);
      setActiveCategoryBtnShine(1);
      timers.push(setTimeout(() => setActiveCategoryBtnShine(2), 400));
      timers.push(setTimeout(() => setActiveCategoryBtnShine(3), 800));
      timers.push(setTimeout(() => setActiveCategoryBtnShine(0), 1250));

      // Box 2: 1. Specific Document
      timers.push(
        setTimeout(() => {
          setActiveShineBox(2);
        }, 1300)
      );

      // Box 3: 2. Destination Country
      timers.push(
        setTimeout(() => {
          setActiveShineBox(3);
        }, 2600)
      );

      // Box 4: 3. Primary Purpose of Submission
      timers.push(
        setTimeout(() => {
          setActiveShineBox(4);
        }, 3900)
      );

      // Box 5: Check Attestation Route button
      timers.push(
        setTimeout(() => {
          setActiveShineBox(5);
        }, 5200)
      );

      // Calm pause before next cycle
      timers.push(
        setTimeout(() => {
          setActiveShineBox(0);
        }, 6450)
      );
    };

    timers.push(setTimeout(runSequence, 180));
    cycleInterval = setInterval(runSequence, 8200);

    return () => {
      timers.forEach((t) => clearTimeout(t));
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [isFinderInView, userInteractedFinder]);

  const triggerGuidedNextBox = (nextBox: 0 | 1 | 2 | 3 | 4 | 5) => {
    setUserInteractedFinder(true);
    setActiveCategoryBtnShine(0);
    setActiveShineBox(nextBox);
    if (nextBox !== 0) {
      setTimeout(() => {
        setActiveShineBox((prev) => (prev === nextBox ? 0 : prev));
      }, 1500);
    }
  };

  const countryOptions: Array<{ label: string; isHagueLabel?: string }> = [
    { label: "United Arab Emirates (UAE)", isHagueLabel: "Embassy Attestation" },
    { label: "Kingdom of Saudi Arabia (KSA)", isHagueLabel: "Hague Apostille" },
    { label: "Qatar", isHagueLabel: "Embassy Attestation" },
    { label: "Kuwait", isHagueLabel: "Embassy Attestation" },
    { label: "Oman", isHagueLabel: "Hague Apostille" },
    { label: "United States of America (USA)", isHagueLabel: "Hague Apostille" },
    { label: "United Kingdom (UK)", isHagueLabel: "Hague Apostille" },
    { label: "Germany", isHagueLabel: "Hague Apostille" },
    { label: "France", isHagueLabel: "Hague Apostille" },
    { label: "Italy", isHagueLabel: "Hague Apostille" },
    { label: "Portugal", isHagueLabel: "Hague Apostille" },
    { label: "Spain", isHagueLabel: "Hague Apostille" },
    { label: "Australia", isHagueLabel: "Hague Apostille" },
    { label: "Canada", isHagueLabel: "Hague Apostille" },
    { label: "China", isHagueLabel: "Embassy Attestation - Special Rule" },
    { label: "Egypt", isHagueLabel: "Embassy Attestation" },
    { label: "Bahrain", isHagueLabel: "Hague Apostille" },
    { label: "Japan", isHagueLabel: "Hague Apostille" },
    { label: "Other" },
  ];

  const docTypeOptions = {
    personal: [
      "Birth Certificate",
      "Marriage Certificate",
      "Police Clearance Certificate (PCC)",
      "Single Status / Unmarried Affidavit",
      "Power of Attorney (POA - Personal)",
      "Divorce Decree / Court Order",
      "Medical Fitness Certificate",
      "Other",
    ],
    educational: [
      "Bachelor's / Master's Degree Certificate",
      "Diploma Certificate",
      "Consolidated Marksheets & Transcripts",
      "School Leaving / 10th & 12th Board Certificate",
      "Provisional Degree Certificate",
      "Other",
    ],
    commercial: [
      "Commercial Export Invoice",
      "Certificate of Origin (COO)",
      "Commercial Power of Attorney (Export Representation)",
      "Board Resolution & Minutes",
      "Certificate of Incorporation (COI)",
      "Packing List & Shipping Declaration",
      "Other",
    ],
  };

  // Load saved records from local backend store on mount (zero external API calls)
  useEffect(() => {
    fetch("/api/knowledge/records")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.records) && data.records.length > 0) {
          setKnowledgeRecords(data.records);
        }
      })
      .catch(() => {
        // Fallback to bundled seed records
      });
  }, []);

  const effectiveCountry =
    destinationCountry === "Other"
      ? customCountry.trim()
      : destinationCountry;

  const effectiveDocType =
    documentType === "Other"
      ? customDocumentType.trim()
      : documentType;

  const effectivePurpose =
    purpose === "Other"
      ? customPurpose.trim()
      : purpose;

  const isSelectionComplete = Boolean(
    docCategory && effectiveDocType && effectiveCountry && effectivePurpose
  );

  // Match current selection against the saved local knowledge database
  useEffect(() => {
    if (!docCategory || !effectiveCountry || !effectiveDocType) {
      setActiveRecord(null);
      setMatchType("none");
      return;
    }

    const exactId = buildKnowledgeRecordId(
      effectiveCountry,
      docCategory,
      effectiveDocType
    );

    const exact = knowledgeRecords.find((r) => r.id === exactId);
    if (exact) {
      setActiveRecord(exact);
      setMatchType("exact");
      return;
    }

    const catMatch = knowledgeRecords.find(
      (r) =>
        r.destinationCountry.toLowerCase() === effectiveCountry.toLowerCase() &&
        r.documentCategory === docCategory
    );
    if (catMatch) {
      setActiveRecord(catMatch);
      setMatchType("country_category");
      return;
    }

    const countryMatch = knowledgeRecords.find(
      (r) =>
        r.destinationCountry.toLowerCase() === effectiveCountry.toLowerCase()
    );
    if (countryMatch) {
      setActiveRecord(countryMatch);
      setMatchType("country_general");
      return;
    }

    setActiveRecord(null);
    setMatchType("none");
  }, [effectiveCountry, docCategory, effectiveDocType, knowledgeRecords]);

  // Clear validation message once required fields are selected
  useEffect(() => {
    if (isSelectionComplete && validationMessage) {
      setValidationMessage("");
    }
  }, [isSelectionComplete, validationMessage]);

  // A record is displayed as a verified match ONLY if it is an exact match with verificationStatus === "verified"
  const isMatchedVerifiedRecord =
    isSelectionComplete &&
    matchType === "exact" &&
    activeRecord !== null &&
    activeRecord.verificationStatus === "verified";

  const displayDocType =
    documentType === "Other"
      ? customDocumentType.trim()
        ? customDocumentType.trim()
        : "Other (Unspecified Document)"
      : documentType || "Select specific document";

  const displayCountry =
    destinationCountry === "Other"
      ? customCountry.trim()
        ? customCountry.trim()
        : "Other (Unspecified Destination)"
      : destinationCountry || "Select destination country";

  const displayPurpose =
    purpose === "Other"
      ? customPurpose.trim()
        ? customPurpose.trim()
        : "Other (Custom Purpose)"
      : purpose || "Select purpose of submission";

  const getVerificationStatusLabel = (): string => {
    if (isMatchedVerifiedRecord) {
      return "Verified Record";
    }
    if (
      activeRecord &&
      (matchType !== "exact" ||
        activeRecord.verificationStatus === "partially_verified")
    ) {
      return "Partially Verified (Confirmation Required)";
    }
    return "Requires Confirmation";
  };

  const generateWhatsAppInquiry = (): string => {
    if (!isSelectionComplete) {
      return (
        `Hello Fatima Global Attestation, I would like to confirm the document attestation requirements:\n\n` +
        `*Destination Country:* ${effectiveCountry || "Not specified yet"}\n` +
        `*Document Category:* ${docCategory ? docCategory.toUpperCase() : "Not specified yet"}\n` +
        `*Document Type:* ${effectiveDocType || "Not specified yet"}\n` +
        `*Purpose:* ${effectivePurpose || "Not specified yet"}\n\n` +
        `Please guide me with the exact attestation process for my document.`
      );
    }

    const routeLine =
      isMatchedVerifiedRecord && activeRecord
        ? activeRecord.authenticationRouteTitle
        : "Confirmation Required";
    const statusLine = getVerificationStatusLabel();

    return (
      `Hello Fatima Global Attestation, I would like to confirm the document attestation requirements:\n\n` +
      `*Destination Country:* ${displayCountry}\n` +
      `*Document Type:* ${displayDocType} (${docCategory.toUpperCase()})\n` +
      `*Purpose:* ${displayPurpose}\n` +
      `*Recommended Route:* ${routeLine}\n` +
      `*Verification Status:* ${statusLine}\n\n` +
      `Please confirm the exact requirements and procedure for my document.`
    );
  };

  const getRecommendedServiceLink = (): { slug: string; label: string } => {
    const countryLower = effectiveCountry.toLowerCase();
    if (countryLower.includes("united arab emirates") || countryLower.includes("uae")) {
      return {
        slug: "/uae-attestation-services",
        label: "UAE Embassy & MOFA Attestation Services",
      };
    }
    if (countryLower.includes("saudi arabia") || countryLower.includes("ksa")) {
      return {
        slug: "/saudi-arabia-attestation-services",
        label: "Saudi Arabia Document Attestation & Apostille",
      };
    }
    if (docCategory === "commercial") {
      const isNonHague =
        countryLower.includes("qatar") ||
        countryLower.includes("kuwait") ||
        countryLower.includes("egypt") ||
        countryLower.includes("china");
      return isNonHague
        ? {
            slug: "/chamber-of-commerce-mea-attestation",
            label: "Chamber of Commerce + MEA Attestation",
          }
        : {
            slug: "/chamber-of-commerce-apostille",
            label: "Chamber of Commerce + Apostille",
          };
    }
    if (docCategory === "educational") {
      return {
        slug: "/educational-document-attestation",
        label: "Educational Document Attestation & Apostille",
      };
    }
    return {
      slug: "/personal-document-attestation",
      label: "Personal Document Attestation & Apostille",
    };
  };

  const recommendedService = getRecommendedServiceLink();

  const handlePrefillQuoteClick = () => {
    if (!isSelectionComplete) {
      setValidationMessage(
        "Please select a document category, specific document, destination country, and purpose first so we can pre-fill your quotation form."
      );
      return;
    }
    if (onRequestQuoteWithDetails) {
      onRequestQuoteWithDetails({
        serviceSlug: recommendedService.slug,
        destinationCountry: displayCountry,
        purpose: displayPurpose,
        documentDetails: `${displayDocType} (${docCategory.toUpperCase()}) for ${displayCountry} — ${displayPurpose}`,
        timestamp: Date.now(),
      });
    }
    scrollToSectionById("home-quote", "smooth");
  };

  return (
    <section
      id="route-finder"
      className="py-10 sm:py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800 scroll-mt-20"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-7 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span>Document Route Finder</span>
          </div>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight leading-snug">
            Find the Right Attestation Process for Your Document
          </h2>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            Select your document category, specific document, destination country, and purpose to check the recommended authentication route.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start">
          {/* Left Column: Form Controls */}
          <div
            ref={formCardRef}
            className="lg:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 sm:p-7 space-y-4 sm:space-y-5 shadow-xl backdrop-blur-sm min-w-0"
          >
            {/* Category Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  className={`text-xs font-semibold uppercase tracking-wider block transition-colors duration-300 ${
                    activeShineBox === 1 ? "text-teal-300" : "text-slate-300"
                  }`}
                >
                  Select Document Category
                </label>
                {activeShineBox === 1 ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/50 text-[10px] font-bold text-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                    <span>Tap category</span>
                  </span>
                ) : (
                  !docCategory && (
                    <span className="text-[11px] text-slate-400 italic">
                      Select document category
                    </span>
                  )
                )}
              </div>
              <div
                className={`grid grid-cols-3 gap-1.5 sm:gap-2 p-1 bg-slate-900 border border-slate-800 rounded-xl transition-all duration-300 ${
                  activeShineBox === 1 ? "fga-dark-box-shine" : ""
                }`}
              >
                <button
                  type="button"
                  aria-pressed={docCategory === "personal"}
                  onClick={() => {
                    setDocCategory("personal");
                    setDocumentType("");
                    setCustomDocumentType("");
                    triggerGuidedNextBox(2);
                  }}
                  className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none min-w-0 ${
                    docCategory === "personal"
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  } ${
                    activeCategoryBtnShine === 1
                      ? "ring-2 ring-amber-300/90 scale-[1.03] text-white"
                      : ""
                  }`}
                >
                  <Users className="w-4 h-4 mb-1 shrink-0" />
                  <span className="truncate max-w-full">Personal</span>
                </button>

                <button
                  type="button"
                  aria-pressed={docCategory === "educational"}
                  onClick={() => {
                    setDocCategory("educational");
                    setDocumentType("");
                    setCustomDocumentType("");
                    triggerGuidedNextBox(2);
                  }}
                  className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none min-w-0 ${
                    docCategory === "educational"
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  } ${
                    activeCategoryBtnShine === 2
                      ? "ring-2 ring-amber-300/90 scale-[1.03] bg-slate-800/90 text-white"
                      : ""
                  }`}
                >
                  <GraduationCap className="w-4 h-4 mb-1 shrink-0" />
                  <span className="truncate max-w-full">Educational</span>
                </button>

                <button
                  type="button"
                  aria-pressed={docCategory === "commercial"}
                  onClick={() => {
                    setDocCategory("commercial");
                    setDocumentType("");
                    setCustomDocumentType("");
                    triggerGuidedNextBox(2);
                  }}
                  className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer select-none min-w-0 ${
                    docCategory === "commercial"
                      ? "bg-teal-600 text-white shadow-xs"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  } ${
                    activeCategoryBtnShine === 3
                      ? "ring-2 ring-amber-300/90 scale-[1.03] bg-slate-800/90 text-white"
                      : ""
                  }`}
                >
                  <Building2 className="w-4 h-4 mb-1 shrink-0" />
                  <span className="truncate max-w-full">Commercial</span>
                </button>
              </div>
            </div>

            {/* Step 1: Specific Document Type */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="finder-doc-type"
                  className={`text-xs font-semibold block transition-colors duration-300 ${
                    activeShineBox === 2 ? "text-amber-300" : "text-slate-300"
                  }`}
                >
                  1. Specific Document
                </label>
                {activeShineBox === 2 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/50 text-[10px] font-bold text-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping" />
                    <span>Select document</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeShineBox === 2 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  id="finder-doc-type"
                  value={documentType}
                  disabled={!docCategory}
                  onFocus={() => setUserInteractedFinder(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDocumentType(val);
                    if (val !== "Other") {
                      setCustomDocumentType("");
                    }
                    if (val) {
                      triggerGuidedNextBox(3);
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    !docCategory
                      ? "text-slate-400 opacity-75 cursor-not-allowed"
                      : documentType === ""
                      ? "text-slate-400"
                      : "text-white"
                  }`}
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select specific document
                  </option>
                  {docCategory &&
                    docTypeOptions[docCategory].map((doc) => (
                      <option
                        key={doc}
                        value={doc}
                        className="bg-slate-900 text-white"
                      >
                        {doc}
                      </option>
                    ))}
                </select>
              </div>
              {documentType === "Other" && (
                <input
                  type="text"
                  value={customDocumentType}
                  onChange={(e) => setCustomDocumentType(e.target.value)}
                  placeholder="Enter your document name..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900/90 border border-teal-500/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>

            {/* Step 2: Destination Country */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="finder-country"
                  className={`text-xs font-semibold block transition-colors duration-300 ${
                    activeShineBox === 3 ? "text-amber-300" : "text-slate-300"
                  }`}
                >
                  2. Destination Country
                </label>
                {activeShineBox === 3 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/50 text-[10px] font-bold text-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping" />
                    <span>Select country</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeShineBox === 3 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  id="finder-country"
                  value={destinationCountry}
                  onFocus={() => setUserInteractedFinder(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDestinationCountry(val);
                    if (val !== "Other") {
                      setCustomCountry("");
                    }
                    if (val) {
                      triggerGuidedNextBox(4);
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    destinationCountry === "" ? "text-slate-400" : "text-white"
                  }`}
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select destination country
                  </option>
                  {countryOptions.map((c) => (
                    <option
                      key={c.label}
                      value={c.label}
                      className="bg-slate-900 text-white"
                    >
                      {c.label === "Other"
                        ? "Other (Country Not Listed)"
                        : `${c.label} (${c.isHagueLabel})`}
                    </option>
                  ))}
                </select>
              </div>
              {destinationCountry === "Other" && (
                <input
                  type="text"
                  value={customCountry}
                  onChange={(e) => setCustomCountry(e.target.value)}
                  placeholder="Enter destination country name..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900/90 border border-teal-500/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>

            {/* Step 3: Intended Purpose */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="finder-purpose"
                  className={`text-xs font-semibold block transition-colors duration-300 ${
                    activeShineBox === 4 ? "text-amber-300" : "text-slate-300"
                  }`}
                >
                  3. Primary Purpose of Submission
                </label>
                {activeShineBox === 4 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/50 text-[10px] font-bold text-teal-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-ping" />
                    <span>Select purpose</span>
                  </span>
                )}
              </div>
              <div
                className={`relative rounded-xl transition-all duration-300 ${
                  activeShineBox === 4 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  id="finder-purpose"
                  value={purpose}
                  onFocus={() => setUserInteractedFinder(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPurpose(val);
                    if (val !== "Other") {
                      setCustomPurpose("");
                    }
                    if (val) {
                      triggerGuidedNextBox(5);
                    }
                  }}
                  className={`w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    purpose === "" ? "text-slate-400" : "text-white"
                  }`}
                >
                  <option value="" className="bg-slate-900 text-slate-400">
                    Select purpose of submission
                  </option>
                  <option value="Employment Visa / Work Permit" className="bg-slate-900 text-white">
                    Employment Visa / Work Permit
                  </option>
                  <option value="Higher Education / University Admission" className="bg-slate-900 text-white">
                    Higher Education / University Admission
                  </option>
                  <option value="Family Reunification / Dependent Visa" className="bg-slate-900 text-white">
                    Family Reunification / Dependent Visa
                  </option>
                  <option value="Permanent Residency / Citizenship" className="bg-slate-900 text-white">
                    Permanent Residency / Citizenship
                  </option>
                  <option value="Commercial Export & Trade" className="bg-slate-900 text-white">
                    Commercial Export &amp; Trade
                  </option>
                  <option value="Overseas Company Branch Setup / POA" className="bg-slate-900 text-white">
                    Overseas Company Branch Setup / POA
                  </option>
                  <option value="Other" className="bg-slate-900 text-white">
                    Other
                  </option>
                </select>
              </div>
              {purpose === "Other" && (
                <input
                  type="text"
                  value={customPurpose}
                  onChange={(e) => setCustomPurpose(e.target.value)}
                  placeholder="Enter your purpose of submission..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-slate-900/90 border border-teal-500/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            </div>

            {validationMessage && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 text-xs font-medium leading-relaxed"
              >
                {validationMessage}
              </div>
            )}

            {/* Action Buttons: Check Route & Reset */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setUserInteractedFinder(true);
                  setActiveShineBox(0);
                  if (!isSelectionComplete) {
                    setValidationMessage(
                      "Please select a document category, specific document, destination country, and purpose to check the attestation route."
                    );
                    return;
                  }
                  setValidationMessage("");
                  scrollToSectionById("finder-results-card", "smooth");
                }}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-500 active:scale-98 rounded-xl shadow-md transition-all cursor-pointer select-none ${
                  activeShineBox === 5 ? "fga-dark-box-shine ring-2 ring-amber-300/80" : ""
                }`}
              >
                <span>Check Attestation Route</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setDocumentType("");
                  setCustomDocumentType("");
                  setDestinationCountry("");
                  setCustomCountry("");
                  setPurpose("");
                  setCustomPurpose("");
                  setValidationMessage("");
                  triggerGuidedNextBox(2);
                }}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors py-1 shrink-0 cursor-pointer select-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Right Column: Simple, Clean, Mobile-Friendly Result Card */}
          <div
            id="finder-results-card"
            className="lg:col-span-6 scroll-mt-24 min-w-0"
          >
            <div className="bg-white rounded-2xl p-4 sm:p-7 text-slate-900 shadow-xl border border-slate-200 space-y-4 sm:space-y-5">
              {!isSelectionComplete ? (
                /* INITIAL EMPTY / INCOMPLETE SELECTION STATE */
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      <Compass className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Awaiting Document Selection</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Destination Country
                      </span>
                      <span className="font-bold text-slate-700 mt-0.5 block break-words">
                        {effectiveCountry || "Select destination country"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Document Type
                      </span>
                      <span className="font-bold text-slate-700 mt-0.5 block break-words">
                        {effectiveDocType || "Select specific document"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      Please select your document category, specific document, destination country, and purpose of submission on the left to view the recommended attestation route.
                    </p>
                  </div>
                </div>
              ) : isMatchedVerifiedRecord && activeRecord ? (
                /* CASE 1: MATCHED VERIFIED RECORD IN SAVED KNOWLEDGE DATABASE */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Matched Official Route</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {activeRecord.isHagueConventionApplicable
                        ? "Hague Apostille"
                        : "Embassy Attestation"}
                    </span>
                  </div>

                  {/* Destination Country & Document Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Destination Country
                      </span>
                      <span className="font-bold text-slate-900 mt-0.5 block break-words">
                        {displayCountry}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Document Type
                      </span>
                      <span className="font-bold text-slate-900 mt-0.5 block break-words">
                        {displayDocType}
                      </span>
                    </div>
                  </div>

                  {/* Recommended Attestation Route */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 block">
                      Recommended Attestation Route
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug break-words">
                      {activeRecord.authenticationRouteTitle}
                    </h3>
                    {activeRecord.stepByStepSequence.length > 0 && (
                      <p className="text-xs sm:text-sm font-medium text-slate-800 bg-teal-50/70 border border-teal-200/70 rounded-xl p-3 leading-relaxed break-words">
                        {activeRecord.stepByStepSequence
                          .map((step) => `${step.stepNumber}. ${step.authority}`)
                          .join(" → ")}
                      </p>
                    )}
                  </div>

                  {/* Short, Clear Explanation */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                      Route Summary
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                      {activeRecord.treatyStatusNote} Final state-level or embassy submission requirements may vary based on the issuing state and receiving authority; please confirm your document scan on WhatsApp before dispatch.
                    </p>
                  </div>
                </div>
              ) : (
                /* CASE 2: NO MATCHING RECORD OR PARTIALLY VERIFIED / NEEDS FURTHER VERIFICATION */
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Confirmation Required</span>
                    </span>
                  </div>

                  {/* Selected Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs sm:text-sm">
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Destination Country
                      </span>
                      <span className="font-bold text-slate-900 mt-0.5 block break-words">
                        {displayCountry}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                        Document Type
                      </span>
                      <span className="font-bold text-slate-900 mt-0.5 block break-words">
                        {displayDocType}
                      </span>
                    </div>
                  </div>

                  {/* Required Concise Message */}
                  <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-950">
                    <p className="text-sm sm:text-base font-semibold leading-relaxed">
                      We need to confirm the correct requirements for your document. Please contact us on WhatsApp.
                    </p>
                  </div>
                </div>
              )}

              {/* Prominent WhatsApp CTA Button + Pre-Fill Quote & Service Link */}
              <div className="pt-1 space-y-2.5">
                <a
                  href={getWhatsAppUrl(generateWhatsAppInquiry())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 rounded-xl shadow-md transition-all select-none"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white shrink-0" />
                  <span>Confirm on WhatsApp</span>
                </a>

                {isSelectionComplete && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={handlePrefillQuoteClick}
                      className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-[#0B2545] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Pre-Fill Quotation Form</span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                    </button>

                    {onSelectService && (
                      <a
                        href={recommendedService.slug}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectService(recommendedService.slug);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-xl transition-colors text-center"
                      >
                        <span className="truncate">View Service Guide</span>
                        <ArrowRight className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

