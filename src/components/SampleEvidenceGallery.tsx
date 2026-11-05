import React, { useState, useRef, useCallback } from "react";
import { getWhatsAppUrl } from "../config/business";
import { useImagePopupHistory } from "../utils/modalHistory";
import { WhatsAppIcon } from "./WhatsAppIcon";
import {
  CheckCircle2,
  X,
  ZoomIn,
  Layers,
} from "lucide-react";

export interface EvidenceSample {
  id: string;
  title: string;
  category: "apostille" | "sdm" | "mofa" | "chamber";
  image: string;
  additionalPages?: { label: string; image: string; caption: string }[];
  badge: string;
  privacyLabel: string;
  destinationOrUse: string;
  elementsVerified: string[];
  description: string;
  whatsappMessage: string;
}

export const EVIDENCE_SAMPLES: EvidenceSample[] = [
  {
    id: "sample-1",
    title: "Government of India MEA Hague Apostille on Degree Certificate",
    category: "apostille",
    image: "/assets/aistudio/apostille_specimen_clean.jpg",
    badge: "Official MEA Hague Apostille",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Hague Convention Member Countries (Europe, USA, Australia, Japan)",
    elementsVerified: [
      "Government of India Ministry of External Affairs (MEA) Apostille Sticker",
      "Red Notarial / Authentication Embossed Rosette Seal",
      "State General Administration Dept Verification Endorsement",
      "Personal Names, Certificate Numbers, QR Code & Signatures Permanently Masked",
    ],
    description:
      "Degree certificate specimen showing the layout of a Government of India MEA Hague Apostille sticker, state administration endorsement, and red embossed seal. All personal names, certificate numbers, QR codes, signatures, and handwritten notes are permanently masked for privacy protection.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I saw your MEA Apostille degree sample on the website and need assistance with an Apostille process for my document.",
  },
  {
    id: "sample-2",
    title: "SDM Verification + MEA Hague Apostille Certificate",
    category: "apostille",
    image: "/samples/sample_sdm_apostille_qr.jpg",
    badge: "SDM + MEA Apostille",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "Hague Convention Member Countries (Italy, Germany, Spain, France, Netherlands)",
    elementsVerified: [
      "Notary Public Official Circular Seal Layout",
      "Sub-Divisional Magistrate (SDM) Official Emblem Seal",
      "Ministry of External Affairs (MEA) Hague Apostille Sticker Layout",
      "Personal Names, Serial Numbers, QR Code & Signatures Permanently Masked",
    ],
    description:
      "Complete SDM + MEA Hague Apostille chain showing the placement of the Notary Public seal, Sub-Divisional Magistrate (SDM) stamp, and MEA Apostille sticker. All personal names, addresses, certificate numbers, QR codes, and handwritten notes are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with SDM + MEA Apostille for my document.",
  },
  {
    id: "sample-flagship-mofa-chain",
    title:
      "Complete UAE Legalization Chain: Notary + SDM + MEA + UAE Embassy + MOFA",
    category: "mofa",
    image: "/samples/mofa_sdm_page_002.jpg",
    additionalPages: [
      {
        label: "Page 1: UAE MOFA & Embassy Digital Certificate",
        image: "/samples/mofa_sdm_page_002.jpg",
        caption:
          "Illustrative Sample — Personal Details Protected: UAE Ministry of Foreign Affairs (MOFA) Digital Attestation & UAE Embassy New Delhi Stamp (Reference Numbers & Signatures Masked)",
      },
      {
        label: "Page 2: Indian Chain (Notary + SDM + MEA)",
        image: "/samples/mofa_sdm_page_001.jpg",
        caption:
          "Illustrative Sample — Personal Details Protected: Notary Public + Sub-Divisional Magistrate (SDM) + MEA CPV Division Stamp (Names, Serial Numbers & Handwritten Notes Masked)",
      },
    ],
    badge: "Full 4-Stage UAE Chain",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "United Arab Emirates (Dubai, Abu Dhabi, Sharjah - Employment & Residence)",
    elementsVerified: [
      "UAE Ministry of Foreign Affairs (MOFA) Crest & Bilingual Layout",
      "UAE Embassy Consular Mission Stamp in New Delhi",
      "Sub-Divisional Magistrate (SDM) & MEA CPV Division Consular Stamp",
      "All Reference Numbers, Personal Names & Signatures Permanently Masked",
    ],
    description:
      "Multi-stage authentication chain for UAE employment and residence permits, illustrating the UAE MOFA digital certificate alongside Indian Notary, SDM, and MEA consular stamps. All reference numbers, signatures, addresses, and handwritten notes are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I saw your UAE MOFA + SDM + MEA attestation sample on the website. Please provide guidance and a quote for my documents.",
  },
  {
    id: "sample-3",
    title: "SDM + MEA Normal Consular Attestation (Non-Hague Gulf Pathway)",
    category: "sdm",
    image: "/samples/sample_sdm_mea_attestation.jpg",
    badge: "SDM + MEA Consular Stamp",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse: "GCC & Non-Hague Countries (Kuwait, Qatar, Libya, China)",
    elementsVerified: [
      "Notary Public Circular Seal & Attestation Stamp",
      "Sub-Divisional Magistrate (SDM) Official Emblem Stamp",
      "MEA Consular Section (CPV Division) Circular Stamp",
      "Serial Numbers, Officer Signatures & Addresses Permanently Masked",
    ],
    description:
      "Close-up of the standard Indian authentication chain for non-Hague destinations, showing the SDM emblem seal and Ministry of External Affairs (MEA) circular stamp prior to embassy submission. All identifying numbers and signatures are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with SDM and MEA Normal Attestation for visa submission.",
  },
  {
    id: "sample-6",
    title: "Police Clearance Certificate (PCC) MEA Apostille",
    category: "apostille",
    image: "/samples/sample_pcc_mea_apostille.jpg",
    badge: "PCC Apostille",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "European Residence & Immigration Permits (Portugal, Germany, Poland)",
    elementsVerified: [
      "Ministry of External Affairs (MEA) Apostille Sticker on PCC",
      "Official CPV Division Circular Consular Stamp",
      "Hague Convention Standard Header & Guilloche Pattern",
      "Applicant Name, Certificate No. & Signatures Permanently Masked",
    ],
    description:
      "Police Clearance Certificate (PCC) reverse side showing the placement of the MEA Apostille sticker and CPV Division circular seal for European immigration submissions. Applicant name, certificate number, serial number, and signatures are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need MEA Apostille for my Police Clearance Certificate (PCC) for European visa submission.",
  },
  {
    id: "sample-7",
    title: "Marriage Certificate SDM Verification & MEA Apostille",
    category: "apostille",
    image: "/samples/sample_marriage_certificate_apostille.jpg",
    badge: "Marriage Certificate Apostille",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse: "Spouse & Dependent Family Visas Abroad",
    elementsVerified: [
      "Notary Public & Sub-Divisional Magistrate (SDM) Official Seals",
      "Ministry of External Affairs (MEA) Hague Apostille Sticker",
      "CPV Division Consular Circular Stamp",
      "Holder Name, Certificate No., Address & Notes Permanently Masked",
    ],
    description:
      "Marriage certificate reverse side illustrating SDM authentication and MEA Apostille sticker placement for family visa sponsorship. All personal names, certificate numbers, addresses, signatures, and handwritten notes are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Marriage Certificate SDM and Apostille for family visa sponsorship.",
  },
  {
    id: "sample-4",
    title: "Chamber of Commerce Commercial Document Endorsement",
    category: "chamber",
    image: "/samples/sample_chamber_of_commerce_attestation.jpg",
    badge: "Chamber of Commerce",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse:
      "International Commercial Operations & Overseas Branches",
    elementsVerified: [
      "Chamber of Commerce Industry & Agriculture Oval Date Stamp",
      "Chamber Authorized Signatory Attestation Block",
      "Notary Public Commercial Document Verification Seal",
      "Company Name, Executive/Witness Names & Signatures Permanently Masked",
    ],
    description:
      "Commercial document specimen showing Chamber of Commerce endorsement and Notary attestation prior to MEA legalization. All company names, executive names, witness names, handwritten notes, and signatures are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I represent a company and need Chamber of Commerce authentication for commercial documents.",
  },
  {
    id: "sample-5",
    title: "MEA Commercial Apostille on Chamber-Endorsed Document",
    category: "chamber",
    image: "/samples/sample_chamber_apostille_commercial.jpg",
    badge: "Commercial Apostille",
    privacyLabel: "Illustrative Sample — Personal Details Protected",
    destinationOrUse: "Hague Convention Export & Corporate Markets",
    elementsVerified: [
      "Ministry of External Affairs Commercial Document Apostille Sticker",
      "Chamber of Commerce Capacity Endorsement Line",
      "MEA CPV Division Official Circular Stamp",
      "Corporate Name, Document ID, Serial No. & Signatures Permanently Masked",
    ],
    description:
      "Commercial Apostille specimen showing the MEA Apostille sticker and CPV Division circular stamp applied to a Chamber-endorsed corporate document. Corporate entity names, document numbers, serial numbers, and signatures are permanently masked.",
    whatsappMessage:
      "Hello Fatima Global Attestation, I need assistance with Chamber of Commerce + MEA Commercial Apostille for trade documents.",
  },
];

export const SampleEvidenceGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedSample, setSelectedSample] = useState<EvidenceSample | null>(
    null
  );
  const [modalActivePageIndex, setModalActivePageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const viewerScrollRef = useRef<HTMLDivElement | null>(null);
  const modalBodyScrollRef = useRef<HTMLDivElement | null>(null);

  const filteredSamples =
    activeCategory === "all"
      ? EVIDENCE_SAMPLES
      : EVIDENCE_SAMPLES.filter((s) => s.category === activeCategory);

  const handleOpenModal = (sample: EvidenceSample, pageIndex = 0) => {
    setIsZoomed(false);
    setModalActivePageIndex(pageIndex);
    setSelectedSample(sample);
  };

  const handleCloseModal = useCallback(() => {
    setIsZoomed(false);
    if (viewerScrollRef.current) {
      viewerScrollRef.current.scrollTo(0, 0);
    }
    if (modalBodyScrollRef.current) {
      modalBodyScrollRef.current.scrollTo(0, 0);
    }
    setSelectedSample(null);
  }, []);

  const handleToggleZoom = () => {
    setIsZoomed((prev) => {
      const next = !prev;
      if (!next && viewerScrollRef.current) {
        viewerScrollRef.current.scrollTo(0, 0);
      }
      return next;
    });
  };

  useImagePopupHistory(
    Boolean(selectedSample),
    handleCloseModal,
    "sample-evidence-popup"
  );

  return (
    <section
      id="proof-gallery"
      className="py-9 sm:py-14 bg-white border-b border-slate-200 overflow-x-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-2 mb-6 sm:mb-9">
          <div className="text-[11px] font-bold tracking-wider text-[#008DA8] uppercase">
            Privacy-Protected Reference Specimens
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2545] font-display tracking-tight">
            Attestation &amp; Apostille Reference Samples
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Tap any specimen below to inspect the layout of Notary stamps, SDM
            seals, MEA Apostille stickers, and Embassy/MOFA endorsements.
          </p>
          <div className="inline-block px-3.5 py-2 rounded-lg bg-amber-50/80 border border-amber-200 text-[10px] sm:text-[11px] text-amber-950 leading-relaxed max-w-2xl mx-auto">
            <strong className="font-bold">
              Illustrative Sample — Personal Details Protected:
            </strong>{" "}
            All personal names, handwritten notes, signatures, certificate
            numbers, QR codes, addresses, and phone numbers are permanently
            masked before public display.
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6 sm:mb-8">
          {[
            { id: "all", label: "All Samples" },
            { id: "apostille", label: "MEA Apostille" },
            { id: "mofa", label: "UAE MOFA & Embassy" },
            { id: "sdm", label: "SDM & Notary" },
            { id: "chamber", label: "Chamber (Commercial)" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 text-[11px] sm:text-xs font-semibold rounded-lg transition-all cursor-pointer select-none ${
                activeCategory === tab.id
                  ? "bg-[#0B2545] text-white shadow-2xs"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Distinct, Clear Gallery Grid: 2 cols on mobile, 4 cols on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-teal-400 shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between overflow-hidden group min-w-0"
            >
              {/* Sharp Document Thumbnail (PII permanently masked inside the image file itself) */}
              <div
                className="relative bg-slate-50 cursor-pointer overflow-hidden aspect-[3/3.6] border-b border-slate-100 flex items-center justify-center p-1.5 sm:p-2"
                onClick={() => handleOpenModal(sample, 0)}
              >
                <img
                  src={sample.image}
                  alt={`${sample.title} (${sample.privacyLabel})`}
                  className="w-full h-full object-contain rounded border border-slate-200/70 bg-white group-hover:scale-[1.02] transition-transform duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Top-Right Badge */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-[#0B2545]/90 text-[9px] sm:text-[10px] font-semibold text-teal-300 shadow-2xs truncate max-w-[85%] pointer-events-none">
                  {sample.badge}
                </span>

                {/* Bottom Privacy Label + Zoom Indicator */}
                <div className="absolute bottom-2 inset-x-2 flex items-center justify-between gap-1 pointer-events-none">
                  <span className="px-1.5 py-0.5 rounded bg-amber-950/85 text-[8px] sm:text-[9px] font-semibold text-amber-200 truncate">
                    Personal Details Protected
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-white bg-[#0B2545]/90 px-1.5 py-0.5 rounded shrink-0">
                    <ZoomIn className="w-2.5 h-2.5 text-teal-300" />
                    <span>Inspect</span>
                  </span>
                </div>
              </div>

              {/* Compact Document Details Card Body */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 min-w-0">
                <div className="space-y-1 min-w-0">
                  <span className="block text-[9px] sm:text-[10px] font-semibold text-amber-800 truncate">
                    {sample.privacyLabel}
                  </span>
                  <h3
                    onClick={() => handleOpenModal(sample, 0)}
                    className="text-xs sm:text-sm font-bold text-[#0B2545] group-hover:text-teal-800 font-display leading-snug line-clamp-2 cursor-pointer break-words"
                  >
                    {sample.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-medium text-teal-800 line-clamp-1">
                    {sample.destinationOrUse}
                  </p>
                </div>

                {/* Compact Action Footer */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenModal(sample, 0)}
                    className="text-[11px] sm:text-xs font-semibold text-[#0B2545] hover:text-teal-700 transition-colors inline-flex items-center gap-1 cursor-pointer select-none min-w-0 truncate"
                  >
                    <ZoomIn className="w-3 h-3 text-teal-700 shrink-0" />
                    <span className="truncate">View Sample</span>
                  </button>

                  <a
                    href={getWhatsAppUrl(sample.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 flex items-center justify-center text-[#25D366] hover:bg-emerald-50 rounded-md transition-colors shrink-0"
                    title="Enquire on WhatsApp"
                    aria-label="Enquire on WhatsApp"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Inspector for Zoomed Specimen */}
        {selectedSample && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedSample.title}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Bar */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50 shrink-0">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                    {selectedSample.privacyLabel}
                  </span>
                  <h3 className="text-sm sm:text-lg font-bold text-[#0B2545] font-display leading-snug mt-0.5">
                    {selectedSample.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleToggleZoom}
                    className="px-2.5 py-1.5 text-[11px] font-bold text-[#0B2545] bg-white hover:bg-slate-100 border border-slate-300 rounded-lg inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-teal-700" />
                    <span>{isZoomed ? "Fit Screen" : "Zoom 2x"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Multi-Page Navigation if available */}
              {selectedSample.additionalPages &&
                selectedSample.additionalPages.length > 1 && (
                  <div className="px-4 sm:px-6 py-2 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center gap-2 shrink-0">
                    <span className="text-[11px] font-bold text-slate-700 mr-1 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-teal-700" />
                      <span>Select Page:</span>
                    </span>
                    {selectedSample.additionalPages.map((page, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setModalActivePageIndex(idx);
                          setIsZoomed(false);
                          if (viewerScrollRef.current) {
                            viewerScrollRef.current.scrollTo(0, 0);
                          }
                        }}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                          modalActivePageIndex === idx
                            ? "bg-[#0B2545] text-white shadow-2xs"
                            : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-300"
                        }`}
                      >
                        {page.label}
                      </button>
                    ))}
                  </div>
                )}

              {/* Scrollable Modal Body */}
              <div
                ref={modalBodyScrollRef}
                className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6"
              >
                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                  {/* 1. Specimen Image Viewer */}
                  <div className="w-full lg:col-span-7 bg-slate-100 rounded-xl border border-slate-200/90 overflow-hidden">
                    <div
                      ref={viewerScrollRef}
                      onClick={handleToggleZoom}
                      className={`w-full p-2 sm:p-3 flex items-center justify-center ${
                        isZoomed
                          ? "overflow-auto max-h-[65vh] items-start justify-start cursor-zoom-out"
                          : "overflow-hidden cursor-zoom-in"
                      }`}
                    >
                      <img
                        src={
                          selectedSample.additionalPages
                            ? selectedSample.additionalPages[
                                modalActivePageIndex
                              ]?.image || selectedSample.image
                            : selectedSample.image
                        }
                        alt={`${selectedSample.title} (${selectedSample.privacyLabel})`}
                        className={`block rounded-lg border border-slate-200 bg-white shadow-2xs transition-all duration-200 ${
                          isZoomed
                            ? "w-[200%] max-w-none h-auto"
                            : "w-full h-auto max-h-[48vh] sm:max-h-[62vh] object-contain"
                        }`}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="px-3 py-2 bg-slate-900 text-white text-[11px] flex items-center justify-between gap-2">
                      <span className="font-medium text-amber-300 truncate">
                        {selectedSample.privacyLabel}
                      </span>
                      <button
                        type="button"
                        onClick={handleToggleZoom}
                        className="text-teal-300 font-bold shrink-0 underline underline-offset-2 cursor-pointer"
                      >
                        {isZoomed ? "Reset Zoom" : "Zoom In +"}
                      </button>
                    </div>
                  </div>

                  {/* 2. Details Breakdown */}
                  <div className="w-full lg:col-span-5 space-y-4 text-xs sm:text-sm text-slate-700 pt-1 lg:pt-0">
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-[#0B2545] font-display text-sm sm:text-base">
                        Verification Scope &amp; Route
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-xs">
                        {selectedSample.description}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
                      <span className="font-bold text-[#0B2545] text-[11px] uppercase tracking-wide block">
                        Layout &amp; Privacy Features Shown:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {selectedSample.elementsVerified.map((elem, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                            <span>{elem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={getWhatsAppUrl(selectedSample.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] rounded-xl shadow-xs transition-colors"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-white" />
                      <span>Inquire About This Process on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
