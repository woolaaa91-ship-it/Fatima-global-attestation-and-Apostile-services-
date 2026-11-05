import React, { useState, useRef } from "react";
import {
  ChevronRight,
  Phone,
  MessageCircle,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileText,
  Sparkles,
  FileSearch,
  ZoomIn,
  X,
  ArrowRight,
  Scale,
  Users,
  Landmark,
  Languages,
  Stamp,
  HeartHandshake,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { ContentCard } from "./PageLayout";
import { FAQAccordion } from "./FAQAccordion";
import { QuoteForm, QuotePrefillDetails } from "./QuoteForm";
import { useImagePopupHistory } from "../utils/modalHistory";
import { useSequentialBoxShine } from "../utils/useSequentialBoxShine";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";

interface SaudiDeathClaimPageProps {
  onNavigate: (path: string) => void;
}

const TwoByTwoGrid: React.FC<{
  items: { title: string; description: string }[];
}> = ({ items }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {items.map((item, idx) => (
      <div
        key={idx}
        className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-1.5"
      >
        <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    ))}
  </div>
);

interface ClaimDocCategoryItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  routeSummary: string;
  timeline: string;
  keyRequirement: string;
  whatsappText: string;
}

const SAUDI_CLAIM_DOC_CATEGORIES: ClaimDocCategoryItem[] = [
  {
    id: "legal-heir-warisana",
    title: "1. Legal Heir Certificate (Warisana — Family Heirship Certificate)",
    badge: "Core Family Paper",
    description:
      "Official certificate issued by the Tehsildar, SDM, or District Magistrate in India listing all surviving family members (parents, spouse, and children). Names must be written in full without initials.",
    routeSummary:
      "Local DM / SDM Verification → Certified Arabic Translation → MEA New Delhi → Royal Embassy of Saudi Arabia",
    timeline: "7–10 Working Days (Complete Attestation + Saudi Embassy)",
    keyRequirement:
      "Must list full names and relationships of all surviving family members matching their Passports and Aadhaar (No short forms like 'Mohd').",
    whatsappText:
      "Hello Fatima Global Attestation, I need assistance with Legal Heir Certificate (Warisana) Arabic translation, MEA, and Saudi Embassy attestation for a Saudi Arabia death claim.",
  },
  {
    id: "special-poa-wakala",
    title: "2. Power of Attorney (Wakala — Authority Letter)",
    badge: "Authority Letter",
    description:
      "Legal authority letter signed by all adult family members appointing either the Indian Embassy in Riyadh/Jeddah or a trusted relative in Saudi Arabia to collect the claim on your behalf.",
    routeSummary:
      "Signed by All Heirs on e-Stamp → SDM / DM → Certified Arabic Translation → MEA → Saudi Embassy Legalization",
    timeline: "7–10 Working Days",
    keyRequirement:
      "Every adult family member listed in the Warisana must sign or give thumb impression with photo and ID proof attached.",
    whatsappText:
      "Hello Fatima Global Attestation, our family needs help drafting, translating, and legalizing a Special Power of Attorney (Wakala) for a Saudi Arabia death claim.",
  },
  {
    id: "guardianship-walayatnama",
    title: "3. Guardianship Certificate (Walayatnama — If Children Are Under 18)",
    badge: "If Minors Exist",
    description:
      "Required if the deceased left behind children under 18 years of age. It legally authorizes the mother (or guardian) to sign the Wakala and receive the children's lawful share.",
    routeSummary:
      "District Magistrate / Court Guardianship Order → Certified Arabic Translation → SDM → MEA → Saudi Embassy",
    timeline: "7–10 Working Days",
    keyRequirement:
      "Officially authorizes the mother or legal guardian to receive the minor children's lawful share of compensation.",
    whatsappText:
      "Hello Fatima Global Attestation, the deceased left behind minor children. We need guidance on Guardianship Certificate (Walayatnama) attestation for Saudi Arabia.",
  },
  {
    id: "gosi-esb-dossier",
    title: "4. Company Salary, Bonus & GOSI Insurance Dossier",
    badge: "Pending Salary & Dues",
    description:
      "Preparation of family records (Marriage Certificate, Children's Birth Certificates, Bank letter with IFSC/SWIFT) to claim pending company salary, service bonus, and GOSI insurance.",
    routeSummary:
      "Original Civil Certificates + Bank Details → Certified Arabic Translation → SDM → MEA → Saudi Embassy",
    timeline: "7–12 Working Days",
    keyRequirement:
      "Cancelled bank cheque/letter with SWIFT/IFSC code, and clear ID copies of all family beneficiaries.",
    whatsappText:
      "Hello Fatima Global Attestation, we need documentation and attestation assistance for GOSI death benefits and unpaid employer dues in Saudi Arabia.",
  },
  {
    id: "diyyah-blood-money-file",
    title: "5. Accident & Blood Money File (Diyyah — Court Compensation)",
    badge: "Court Accident Claim",
    description:
      "Complete documentation for fatal road accidents (Muroor traffic cases) or workplace fatalities where financial compensation is decided by a Saudi Sharia court.",
    routeSummary:
      "Warisana + Wakala + Walayatnama → Certified Arabic Translation → DM / SDM → MEA → Saudi Embassy New Delhi",
    timeline: "8–12 Working Days (Priority Handling for Court Deadlines)",
    keyRequirement:
      "Copy of Saudi Death Notification, police traffic accident report, and deceased's Iqama copy.",
    whatsappText:
      "Hello Fatima Global Attestation, we need urgent documentation assistance for a Saudi Arabia accident / Blood Money (Diyyah) death claim dossier.",
  },
  {
    id: "arabic-translation-saudi-claim",
    title: "6. Certified Legal Arabic Translation",
    badge: "Official Saudi Language",
    description:
      "Certified Arabic translation of Warisana, Wakala, Guardianship order, and Death Certificate. Names are carefully matched to the deceased's Saudi Iqama so courts don't reject them.",
    routeSummary:
      "Document Check → Certified Legal Arabic Translation → Authorized Seal → Ready for MEA & Saudi Embassy",
    timeline: "1–2 Working Days (Translation) | 7–10 Days with Full Legalization",
    keyRequirement:
      "Share deceased's Iqama copy or Arabic Death Report so Arabic spelling matches Saudi government records.",
    whatsappText:
      "Hello Fatima Global Attestation, we need Certified Legal Arabic Translation for our Saudi Arabia Death Claim documents (Legal Heir & Wakala).",
  },
];

const CLAIM_CASE_OPTIONS = [
  "Unpaid Salary, End-of-Service Benefits (ESB) & Bank Balance",
  "Traffic Accident / Blood Money (Diyyah) Sharia Court Claim",
  "Workplace Accident & GOSI (Social Insurance) Death Benefit",
  "Natural Death — Legal Heir (Warisana) & Wakala Attestation",
  "Minor Children Involved — Guardianship (Walayatnama) + Wakala",
  "Certified Legal Arabic Translation Only for Death Claim File",
];

const ATTORNEY_OPTIONS = [
  "Embassy of India, Riyadh / Consulate General of India, Jeddah",
  "Trusted Relative or Representative in Saudi Arabia (Valid Iqama Holder)",
  "Not Decided Yet — Need Procedural Guidance on Naming Attorney",
];

const ISSUING_AUTHORITY_OPTIONS = [
  "District Magistrate (DM) / District Collector / SDM Issued Certificate",
  "Tehsildar / Revenue Officer Issued Certificate (Needs DM Counter-Sign)",
  "Civil Court Succession / Legal Heir Certificate",
  "Family Has Not Yet Applied for Legal Heir Certificate in India",
];

const SAUDI_DEATH_CLAIM_FAQS = [
  {
    question:
      "What are the legal dues (HUQOOQ) that the family can claim from the Saudi employer?",
    answer:
      "In simple words, 'HUQOOQ' refers to all the legitimate money and benefits earned by the deceased worker from their Saudi company or sponsor (Kafeel). This mainly includes:\n\n1. Pending Salary: Any unpaid monthly wages that were not yet paid.\n2. End of Service Benefits (EOSB / Khidmat): Official gratuity or service bonus for the years worked.\n3. Leave Encashment & Allowances: Payment for unused annual leaves and other company benefits.\n\nUnder Saudi Labour Law, the sponsor/employer is legally required to pay these dues to the family (Next of Kin). If the company delays or refuses, the Indian Embassy can intervene through the Saudi Labour Office to recover the money.",
  },
  {
    question:
      "What is Death Compensation (Blood Money / Diyyah) and how does the family get it?",
    answer:
      "Death Compensation (known as 'Diyyah' or 'Blood Money' in Saudi law) is financial compensation paid to the family if their loved one died due to an unnatural cause—such as a road traffic accident, workplace hazard, or fire—where another driver, company, or third party was at fault.\n\n• Court Hearing: The case is heard in the Saudi Sharia Court, which determines the fault percentage and compensation amount.\n• Representation: The family in India does NOT need to travel to Saudi Arabia. The Indian Embassy can fight the case on your behalf through its panel of lawyers, or you can appoint a trusted relative living in Saudi Arabia.\n• Required Documents: The family in India must provide an attested Legal Heir Certificate (Warisana) and Power of Attorney (Wakala).",
  },
  {
    question:
      "What is a Wakala (Power of Attorney) and who should our family appoint?",
    answer:
      "A 'Wakala' is simply an official Authority Letter (Power of Attorney). Since the family in India cannot personally go to Saudi police stations, courts, and ministries, you authorize someone in Saudi Arabia to represent you and collect the money.\n\nYou have two safe options:\n1. Appoint the Indian Embassy (Recommended if you have no close family in Saudi Arabia): You execute the Wakala in favor of the Ambassador of India in Riyadh. The embassy collects the money and securely sends it to the family's bank account in India.\n2. Appoint a Trusted Relative: You can authorize a brother, son, or close relative living in Saudi Arabia who holds a valid Saudi Iqama (residence card).\n\nEvery adult family heir must sign this Wakala on e-stamp paper, which is then translated into Arabic and stamped by the MEA and Saudi Embassy in New Delhi.",
  },
  {
    question:
      "How do I get a Legal Heir Certificate (Warisana) and what is the biggest mistake to avoid?",
    answer:
      "A Legal Heir Certificate (also called Warisana, Virasat Praman Patra, or Succession Certificate) is an official paper issued by your local Tehsildar, SDM, or District Collector (or Civil Court) in India. It officially lists all surviving family members: Parents, Wife, Sons, and Daughters.\n\n⚠️ THE BIGGEST MISTAKE TO AVOID:\nAll names must be written in FULL, exactly as in their Passports and Aadhaar cards. Never use initials or short names (for example, write 'Mohamed' in full instead of 'Mohd', and 'Abdul Rehman' instead of 'A. Rehman'). Saudi courts reject any certificate that has initials or spelling mismatches with the deceased's passport.",
  },
  {
    question:
      "Does the Indian government help with the cost of bringing the mortal remains home?",
    answer:
      "Under Saudi law, the employer/sponsor is normally responsible for paying the transportation expenses to fly the mortal remains back to India. However, if the employer delays or refuses, and the family in India is in financial distress, the Indian Embassy can provide financial assistance through the Indian Community Welfare Fund (ICWF). You should immediately contact the Indian Embassy in Riyadh (+966-11-488-4697) or the Consulate in Jeddah.",
  },
  {
    question: "How long does the entire death claim process take?",
    answer:
      "It depends on the type of claim:\n\n• Company Salary & Service Bonus (Huqooq): Usually takes 1 to 3 months once your attested documents reach Saudi Arabia.\n• GOSI Insurance Pension: Usually takes 2 to 4 months.\n• Road Accident / Court Compensation (Diyyah): Because it involves police investigation and Saudi Sharia Court hearings, it typically takes 6 to 18 months.\n\nOur team completes the entire Indian documentation chain (Arabic translation + SDM + MEA + Saudi Embassy) in 7 to 10 working days so your file reaches Saudi authorities without delay.",
  },
  {
    question:
      "What is the very first step our family should take after a death in Saudi Arabia?",
    answer:
      "Please stay calm and take these 2 simple steps:\n1. Contact the Indian Embassy in Riyadh (24x7 helpline: +966-11-488-4697) or the Consulate in Jeddah to report the death and request a copy of the Saudi Death Notification and Iqama.\n2. Share a photo of the deceased's Passport and your family documents on WhatsApp with our team. We will review your papers for free and guide you step-by-step in simple words so you avoid costly mistakes.",
  },
  {
    question:
      "What if the deceased left behind minor children (under 18 years of age)?",
    answer:
      "Under Saudi law, children under 18 cannot sign legal papers directly. Therefore, the mother (or legal guardian) must obtain a Guardianship Certificate (Walayatnama) from the local District Magistrate or Court in India. This officially gives the mother legal power to sign the Wakala and receive the children's lawful share on their behalf. We translate this certificate into Arabic and get it stamped by the MEA and Saudi Embassy alongside the other papers.",
  },
  {
    question:
      "Is an MEA Apostille enough, or is the Saudi Embassy stamp required?",
    answer:
      "For death claims, compensation, and inheritance cases, an Apostille alone is usually NOT accepted. Saudi Sharia courts, Labour Offices, and GOSI strictly require full certified Arabic Translation + Indian MEA Attestation + Royal Embassy of Saudi Arabia Legalization Stamp in New Delhi. We complete this entire chain on your behalf.",
  },
  {
    question: "Do I need to send original documents, or can I send a color copy?",
    answer:
      "Original documents are required for MEA and Saudi Embassy stamping.\n\nHowever, do NOT send physical originals immediately! Please share a clear photo/scan on WhatsApp first. We will verify the seals, check the spelling, and confirm the exact route and quote for free. Only once we confirm everything is ready should you courier the documents to our New Delhi desk.",
  },
  {
    question:
      "Does Fatima Global Attestation guarantee approval of a death claim in Saudi Arabia?",
    answer:
      "No agency can guarantee claim approval, because final eligibility, calculation, and payout decisions rest exclusively with the Saudi employers, courts, GOSI, and ministries. Our role is to ensure your Indian family documents are 100% legally correct, properly translated, and officially stamped so your claim is never rejected due to paperwork errors.",
  },
];

const SAUDI_DEATH_CLAIM_STATE_GUIDES = [
  {
    key: "up",
    buttonLabel: "Uttar Pradesh (Lucknow / Gorakhpur / Azamgarh)",
    stateName: "Uttar Pradesh",
    districts:
      "Lucknow, Gorakhpur, Azamgarh, Deoria, Basti, Jaunpur, Mau, Siddharthnagar, Kushinagar, Bareilly, Varanasi, Kanpur, Prayagraj & all UP districts",
    warisanaAuthority:
      "Tehsildar / SDM / District Magistrate (Collectorate) — UP e-District Vaaris Praman Patra (Legal Heir / Surviving Family Member Certificate)",
    localProcessNote:
      "In UP, obtain the Vaaris Praman Patra (Warisana) from your Tehsil/Collectorate and get it counter-signed by the SDM/DM. Execute the Special Power of Attorney (Wakala) on Non-Judicial e-Stamp paper signed by all adult legal heirs.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-uttar-pradesh",
  },
  {
    key: "bihar",
    buttonLabel: "Bihar (Patna / Siwan / Gopalganj)",
    stateName: "Bihar",
    districts:
      "Patna, Siwan, Gopalganj, Saran (Chhapra), Darbhanga, Madhubani, Muzaffarpur, Champaran, Purnia, Kishanganj, Gaya, Bhagalpur & all Bihar districts",
    warisanaAuthority:
      "Circle Officer (CO / Anchal Adhikari) & Sub-Divisional Officer (SDO) / District Magistrate (Collectorate) Legal Heir / Vanshavali Certificate",
    localProcessNote:
      "In Bihar, ensure the Family List / Legal Heir Certificate (Parivarik Suchi / Warisana) issued by the Circle Officer (CO) is counter-signed by the SDO or District Magistrate (DM) before sending it with your signed Wakala to our New Delhi desk.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-bihar",
  },
  {
    key: "kerala",
    buttonLabel: "Kerala (Kochi / Kozhikode / Malappuram)",
    stateName: "Kerala",
    districts:
      "Malappuram, Kozhikode (Calicut), Kochi (Ernakulam), Kannur, Thrissur, Kasaragod, Palakkad, Kollam, Thiruvananthapuram & all Kerala districts",
    warisanaAuthority:
      "Tahsildar / Taluk Office (via e-District Kerala after Village Officer verification & Gazette Notification) or Family Relationship Certificate",
    localProcessNote:
      "For Kerala families, ensure all initials in the Legal Heirship Certificate and Wakala are expanded to match the full names on the deceased's Indian Passport and Saudi Iqama.",
    courierTimeline: "7–12 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-kerala",
  },
  {
    key: "telangana",
    buttonLabel: "Telangana (Hyderabad / Nizamabad / Karimnagar)",
    stateName: "Telangana",
    districts:
      "Hyderabad, Nizamabad, Karimnagar, Jagtial, Kamareddy, Nirmal, Adilabad, Warangal, Khammam, Mahbubnagar & all Telangana districts",
    warisanaAuthority:
      "Tahsildar / Mandal Revenue Officer (MRO) via Telangana MeeSeva (Family Member Certificate) & District Collectorate",
    localProcessNote:
      "In Telangana, the MeeSeva Family Member Certificate issued by the Tahsildar/MRO along with the signed Wakala is sent via courier to our New Delhi desk for Certified Arabic Translation, MEA, and Royal Embassy of Saudi Arabia stamping.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-telangana",
  },
  {
    key: "tn",
    buttonLabel: "Tamil Nadu (Chennai / Madurai / Trichy)",
    stateName: "Tamil Nadu",
    districts:
      "Chennai, Madurai, Tiruchirappalli (Trichy), Ramanathapuram, Thanjavur, Pudukkottai, Nagapattinam, Cuddalore, Coimbatore, Tirunelveli & all TN districts",
    warisanaAuthority:
      "Tahsildar (Taluk Office via TN e-Sevai Rev-114 Legal Heir Certificate) & District Collectorate",
    localProcessNote:
      "In Tamil Nadu, avoid single-letter initials on the Rev-114 Legal Heir Certificate and Wakala—ensure full expanded names matching the Indian Passport are printed or clarified via a Same-Name Affidavit.",
    courierTimeline: "7–12 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-tamil-nadu",
  },
  {
    key: "rajasthan",
    buttonLabel: "Rajasthan (Jaipur / Sikar / Jhunjhunu)",
    stateName: "Rajasthan",
    districts:
      "Jaipur, Sikar, Jhunjhunu, Churu, Nagaur, Jodhpur, Bikaner, Alwar, Ajmer, Kota, Udaipur & all Rajasthan districts",
    warisanaAuthority:
      "Tehsildar / Sub-Divisional Magistrate (SDM) / District Collectorate (Succession / Surviving Member / Warisana Certificate)",
    localProcessNote:
      "Families in Shekhawati (Sikar, Jhunjhunu, Churu) and across Rajasthan can courier their SDM/Collector-attested Warisana and signed Wakala directly to our Connaught Place, New Delhi desk.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-rajasthan",
  },
  {
    key: "wb",
    buttonLabel: "West Bengal (Kolkata / Murshidabad)",
    stateName: "West Bengal",
    districts:
      "Kolkata, Murshidabad, Malda, Nadia, North & South 24 Parganas, Howrah, Hooghly, Bardhaman, Birbhum & all West Bengal districts",
    warisanaAuthority:
      "District Magistrate (DM) / Sub-Divisional Officer (SDO) / Collectorate Legal Heir Certificate",
    localProcessNote:
      "Note: A simple Panchayat Pradhan letter alone is not accepted by the Saudi Embassy—ensure your Legal Heir Certificate is issued or counter-signed by the SDO/DM office before sending it to our New Delhi desk.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-west-bengal",
  },
  {
    key: "mh",
    buttonLabel: "Maharashtra (Mumbai / Pune)",
    stateName: "Maharashtra",
    districts:
      "Mumbai, Thane, Navi Mumbai, Pune, Ratnagiri, Raigad, Aurangabad (Chhatrapati Sambhajinagar), Nashik, Nagpur & all Maharashtra districts",
    warisanaAuthority:
      "Tahsildar / Sub-Divisional Officer (SDO) / District Collectorate (Varas Pramanpatra / Legal Heir Certificate)",
    localProcessNote:
      "Once your Tahsildar/Collectorate Legal Heir Certificate and Wakala are ready in Maharashtra, send them via insured courier to our New Delhi desk for Arabic translation, MEA, and Royal Embassy of Saudi Arabia attestation.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-maharashtra",
  },
  {
    key: "ka",
    buttonLabel: "Karnataka (Bangalore / Mangalore)",
    stateName: "Karnataka",
    districts:
      "Bengaluru, Mangaluru (Dakshina Kannada), Udupi, Bhatkal, Kalaburagi (Gulbarga), Bidar, Mysuru, Hubballi & all Karnataka districts",
    warisanaAuthority:
      "Tahsildar (Nadakacheri / Atalji Janasnehi Kendra Surviving Family Member Certificate) & Deputy Commissioner (DC) Office",
    localProcessNote:
      "Your Nadakacheri Surviving Family Member Certificate and signed Wakala are translated into certified legal Arabic and legalized through MEA and the Saudi Embassy at our New Delhi desk.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-karnataka",
  },
  {
    key: "punjab",
    buttonLabel: "Punjab (Jalandhar / Ludhiana / Amritsar)",
    stateName: "Punjab",
    districts:
      "Jalandhar, Ludhiana, Amritsar, Hoshiarpur, Kapurthala, Nawanshahr, Gurdaspur, Patiala, Mohali & all Punjab districts",
    warisanaAuthority:
      "Tehsildar / Sub-Divisional Magistrate (SDM) / Deputy Commissioner (DC) Office Legal Heir Certificate (via Sewa Kendra)",
    localProcessNote:
      "Once your Sewa Kendra / SDM / DC Legal Heir Certificate and Wakala are ready in Punjab, courier them to our Connaught Place, New Delhi desk—no need for bereaved family members to travel to Delhi.",
    courierTimeline: "7–10 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-punjab",
  },
  {
    key: "jk",
    buttonLabel: "Jammu & Kashmir (Srinagar / Jammu)",
    stateName: "Jammu & Kashmir",
    districts:
      "Srinagar, Jammu, Anantnag, Baramulla, Budgam, Pulwama, Kupwara, Rajouri, Poonch & all J&K districts",
    warisanaAuthority:
      "Tehsildar (Revenue Department Legal Heir Certificate) counter-signed by the Deputy Commissioner (DC) / District Magistrate",
    localProcessNote:
      "We assist families across Kashmir and Jammu divisions with complete Arabic translation, SDM/Home authentication, MEA stamping, and Royal Embassy of Saudi Arabia legalization in New Delhi.",
    courierTimeline: "7–12 Working Days via Tracked Courier to our New Delhi CP Desk",
    locationPath: "/locations/apostille-agent-kashmir",
  },
  {
    key: "delhi",
    buttonLabel: "Delhi NCR",
    stateName: "Delhi NCR (New Delhi / Noida / Gurgaon / Ghaziabad / Faridabad)",
    districts:
      "New Delhi, Central/South/North/East/West Delhi, Noida, Greater Noida, Gurugram, Ghaziabad & Faridabad",
    warisanaAuthority:
      "Sub-Divisional Magistrate (SDM — Delhi Revenue Dept e-District Surviving Member Certificate) / NCR District Collectorate",
    localProcessNote:
      "Families in Delhi NCR can either visit our walk-in office at Barakhamba Road, Connaught Place, New Delhi with their Surviving Member Certificate & Wakala, or book doorstep courier pickup.",
    courierTimeline: "7–10 Working Days (Walk-in or Doorstep Pickup at CP Desk)",
    locationPath: "/locations/apostille-agent-delhi",
  },
];

export const SaudiDeathClaimPage: React.FC<SaudiDeathClaimPageProps> = ({
  onNavigate,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    SAUDI_CLAIM_DOC_CATEGORIES[0].id
  );
  const [selectedStateKey, setSelectedStateKey] = useState<string>("up");
  const [finderState, setFinderState] = useState<{
    claimCase: string;
    attorneyType: string;
    issuingAuthority: string;
  }>({
    claimCase: CLAIM_CASE_OPTIONS[0],
    attorneyType: ATTORNEY_OPTIONS[0],
    issuingAuthority: ISSUING_AUTHORITY_OPTIONS[0],
  });
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefillDetails | null>(
    null
  );
  const [activeSampleModal, setActiveSampleModal] = useState<{
    src: string;
    title: string;
    subtitle: string;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const inlineAskNowRef = useRef<HTMLDivElement | null>(null);
  const stateGuideDetailRef = useRef<HTMLDivElement | null>(null);
  const {
    containerRef: finderBoxRef,
    activeStep: activeFinderStep,
    guideToStep,
  } = useSequentialBoxShine(3);

  useImagePopupHistory(
    Boolean(activeSampleModal),
    () => {
      setActiveSampleModal(null);
      setIsZoomed(false);
    },
    "saudi-death-claim-specimen-popup"
  );

  const selectedCategory =
    SAUDI_CLAIM_DOC_CATEGORIES.find((c) => c.id === selectedCategoryId) ||
    SAUDI_CLAIM_DOC_CATEGORIES[0];

  const handleSelectCategory = (id: string) => {
    setSelectedCategoryId(id);
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        inlineAskNowRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 60);
    }
  };

  // Dynamic outcome for the 3-Dropdown Saudi Death Claim Route Finder
  const getClaimFinderOutcome = () => {
    const isTranslationOnly = finderState.claimCase.includes("Translation Only");
    const needsGuardianship = finderState.claimCase.includes("Minor Children");
    const isNotAppliedYet = finderState.issuingAuthority.includes("Not Yet Applied");
    const isTehsildarOnly = finderState.issuingAuthority.includes("Tehsildar");

    if (isTranslationOnly) {
      return {
        badge: "Certified Legal Arabic Translation Route",
        routeTitle:
          "Source Document Name Check → Certified Legal Arabic Translation → Translator Seal & Notary",
        estimatedTime: "1–2 Working Days (Soft Copy + Stamped Hard Copy)",
        feeSummary:
          "Per-page Certified Legal Arabic Translation Fee (Can be combined with MEA & Saudi Embassy)",
        explanation:
          "We translate your Legal Heir Certificate (Warisana), Special Power of Attorney (Wakala), Guardianship Certificate, and Death Certificate into formal legal Arabic matching the deceased's Saudi Iqama and Passport spelling.",
      };
    }

    if (isNotAppliedYet) {
      return {
        badge: "Step 1 Guidance: Obtain Legal Heir & Execute Wakala First",
        routeTitle:
          "Apply for DM/Collector Legal Heir Certificate → Draft Shariah Wakala → Arabic Translation → SDM/Home + MEA + Saudi Embassy",
        estimatedTime:
          "Free Initial Checklist Review | 7–10 Working Days once Indian certificates are issued",
        feeSummary:
          "Free Initial Checklist Review • Transparent Attestation & Consular Quote Upon Document Issuance",
        explanation:
          "Before MEA and Saudi Embassy attestation can begin, the bereaved family must obtain an official Legal Heir / Surviving Member Certificate from the District Magistrate / Collector (or Court) listing all surviving heirs, and execute a Special Power of Attorney (Wakala). Share the deceased's Passport and Death Report on WhatsApp so we can guide you on the exact format.",
      };
    }

    return {
      badge: needsGuardianship
        ? "Complete Dossier Route (Warisana + Wakala + Walayatnama)"
        : "Complete Saudi Embassy Death Claim Legalization Chain",
      routeTitle: `${
        isTehsildarOnly ? "DM / Collector Counter-Sign → " : ""
      }Certified Arabic Translation → State Home / SDM → MEA Attestation → Royal Embassy of Saudi Arabia (New Delhi)`,
      estimatedTime: "7–12 Working Days (Complete End-to-End Legalization)",
      feeSummary:
        "Certified Arabic Translation + SDM/Home Verification + MEA Fee + Official Saudi Embassy Consular Fee",
      explanation: `For ${finderState.claimCase}, your Legal Heir Certificate and Special Power of Attorney (Wakala in favor of ${
        finderState.attorneyType.includes("Embassy of India")
          ? "Embassy of India Riyadh / CGI Jeddah"
          : "your designated KSA representative"
      })${
        needsGuardianship
          ? " along with the Minor Guardianship Certificate (Walayatnama)"
          : ""
      } must be translated into legal Arabic, authenticated by the State Home Dept / SDM and MEA, and legalized by the Royal Embassy of Saudi Arabia in New Delhi.`,
    };
  };

  const outcome = getClaimFinderOutcome();

  const handlePrefillQuoteFromFinder = () => {
    setQuotePrefill({
      destinationCountry: "Kingdom of Saudi Arabia (KSA)",
      purpose: "Saudi Arabia Death Claim Assistance",
      documentDetails: `Claim Category: ${finderState.claimCase} | Attorney (Wakil): ${finderState.attorneyType} | Issuing Authority: ${finderState.issuingAuthority} | Route: ${outcome.routeTitle}`,
      timestamp: Date.now(),
    });
    const el = document.getElementById("saudi-death-claim-quote");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* JSON-LD Structured Data for SEO (Service + FAQPage + HowTo) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                name: "Saudi Arabia Death Claim Documentation Assistance in India",
                provider: {
                  "@type": "LocalBusiness",
                  name: "Fatima Global Attestation",
                  telephone: BUSINESS_CONFIG.telPhone,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Connaught Place, New Delhi",
                    addressRegion: "Delhi",
                    addressCountry: "IN",
                  },
                },
                areaServed: "India",
                serviceType:
                  "Saudi Arabia Death Claim Documentation, Legal Heir (Warisana), Wakala POA, Arabic Translation, MEA & Saudi Embassy Legalization",
                description:
                  "Specialized documentation assistance for Saudi Arabia death claims, end-of-service benefits, blood money (Diyyah), GOSI insurance, and legal heir & Wakala attestation via MEA and Royal Embassy of Saudi Arabia in New Delhi.",
              },
              {
                "@type": "FAQPage",
                mainEntity: SAUDI_DEATH_CLAIM_FAQS.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Bar */}
      <div className="bg-[#0B2545] text-slate-300 text-xs pt-3.5 pb-1 px-4">
        <nav
          aria-label="Breadcrumb"
          className="max-w-5xl mx-auto flex flex-wrap items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <button
            type="button"
            onClick={() => onNavigate("/#services")}
            className="hover:text-white transition-colors cursor-pointer text-slate-400"
          >
            Services
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-teal-400 font-semibold">
            Saudi Arabia Death Claim Assistance
          </span>
        </nav>
      </div>

      {/* Hero Section (Preserves Exact H1, Kicker, Intro & Dual CTAs) */}
      <section className="bg-[#0B2545] text-white pt-6 pb-10 sm:pt-8 sm:pb-14 px-4 border-b-4 border-teal-600 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-4">
            Humanitarian &amp; Legal Documentation • KSA Claims &amp; Inheritance
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 font-display">
            Saudi Arabia Death Claim Documentation Assistance
          </h1>
          <p className="text-slate-200 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed mb-4">
            When an Indian national passes away while working or residing in the Kingdom of Saudi Arabia, the bereaved family in India must complete a specific chain of legal documentation to claim unpaid salary, end-of-service benefits, GOSI/insurance settlements, bank balances, or court-awarded compensation. We provide careful, step-by-step assistance in preparing, translating, and legalizing the required family documents through Indian authorities and the Royal Embassy of Saudi Arabia in New Delhi.
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed mb-8">
            Families of Indian nationals who passed away while employed or residing in the Kingdom of Saudi Arabia often need structured documentation support to pursue eligible end-of-service benefits, unpaid dues, GOSI (General Organization for Social Insurance) death benefits, or legal compensation claims. Fatima Global Attestation provides careful, compassionate procedural guidance to help legal heirs prepare, translate, authenticate, and organize the required Indian civil and legal documents for submission to the relevant authorities in India and Saudi Arabia.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href={getWhatsAppUrl(
                "Hello Fatima Global Attestation, our family requires guidance and documentation assistance for a Saudi Arabia Death Claim / Legal Heir & Wakala attestation process."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us for Death Claim Guidance
            </a>
            <a
              href={`tel:${BUSINESS_CONFIG.telPhone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              Call {BUSINESS_CONFIG.displayPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* 1. CRITICAL NOTICE BOX (Placed right below Hero) */}
        <div
          role="alert"
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 sm:p-6 shadow-xs"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-700" />
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-red-100 text-red-900 text-[11px] font-extrabold uppercase tracking-wider">
                Important Rule for Grieving Families
              </div>
              <div className="text-red-950 text-xs sm:text-sm space-y-1.5 leading-relaxed">
                <p className="font-bold text-sm sm:text-base">
                  Please keep these 2 essential rules in mind to avoid rejection in Saudi Arabia:
                </p>
                <ul className="space-y-1.5 list-disc pl-4 font-medium text-red-900">
                  <li>
                    <strong>Saudi Embassy Stamp Is Mandatory:</strong> For death compensation, company dues, and court claims, a normal Apostille alone is not accepted. Documents must have <em>Certified Arabic Translation + MEA (Delhi) + Royal Embassy of Saudi Arabia Legalization</em>.
                  </li>
                  <li>
                    <strong>All Family Members Must Sign:</strong> Every adult family member listed in the Legal Heir Certificate (Warisana) must sign the Power of Attorney (Wakala). If any children are under 18, a Guardianship Certificate (Walayatnama) in the mother's name is required.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Plain-Language Guide for Grieving Families (Aam Bhasha Me Samajhiye) */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/70 to-white border-2 border-emerald-300/80 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                💡
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[#0B2545] font-display">
                  Simple Guide for Families (Aam Bhasha Me Samajhiye)
                </h2>
                <p className="text-xs text-slate-600">
                  Legal words can feel confusing during difficult times. Here is what your family needs to know in 3 simple steps:
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto inline-flex items-center px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-extrabold uppercase tracking-wide">
              Family-Friendly Summary
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 1. What money can you claim? */}
            <div className="bg-white rounded-xl border border-emerald-200/90 p-4 space-y-2 shadow-2xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                1. What Money Can Be Claimed?
              </span>
              <h3 className="text-sm font-bold text-[#0B2545]">
                Paisa Kis Cheez Ka Milta Hai?
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>Pending Salary &amp; Bonus (Huqooq):</strong> Unpaid salary, end-of-service gratuity/bonus, and leave balance from the Saudi company.</li>
                <li>• <strong>GOSI Insurance:</strong> Government workplace injury or social insurance pension if the worker was registered.</li>
                <li>• <strong>Blood Money / Accident Claim (Diyyah):</strong> Court compensation if the death was caused by a traffic accident, fire, or third party.</li>
              </ul>
            </div>

            {/* 2. What 2 main documents are needed from India? */}
            <div className="bg-white rounded-xl border border-emerald-200/90 p-4 space-y-2 shadow-2xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                2. Which 2 Main Papers Do You Need?
              </span>
              <h3 className="text-sm font-bold text-[#0B2545]">
                India Se Kaunse 2 Kagaz Chahiye?
              </h3>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>Legal Heir Certificate (Warisana):</strong> Official paper from Tehsildar/DM listing all family members (Parents, Wife, Children) with <em>full names</em> (No initials).</li>
                <li>• <strong>Power of Attorney (Wakala):</strong> Signed authority letter appointing the <em>Indian Embassy in Riyadh</em> or a trusted relative in Saudi Arabia to collect the claim for you.</li>
              </ul>
            </div>

            {/* 3. How do the documents get stamped? */}
            <div className="bg-white rounded-xl border border-emerald-200/90 p-4 space-y-2 shadow-2xs">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                3. How Are Documents Stamped?
              </span>
              <h3 className="text-sm font-bold text-[#0B2545]">
                Mohar (Stamps) Kaise Lagti Hain?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                You do NOT need to travel to Delhi. Once your local papers are ready, our desk handles:
              </p>
              <div className="text-[11px] font-bold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200 space-y-1">
                <div>① State SDM / DM Verification</div>
                <div>② Certified Arabic Legal Translation</div>
                <div>③ MEA (Foreign Ministry, Delhi) Stamp</div>
                <div>④ Saudi Embassy (New Delhi) Stamp</div>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold pt-0.5">
                ✓ We handle all Delhi steps for your family.
              </p>
            </div>
          </div>
        </div>

        {/* Mandatory Private Consultancy Disclaimer & Important Notes */}
        <div className="bg-amber-50/90 border border-amber-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5 text-amber-950 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
              <p className="font-bold text-amber-950">
                Independent Documentation Consultancy Disclaimer:
              </p>
              <ul className="list-disc pl-4 space-y-1 font-medium text-amber-900">
                <li>
                  Fatima Global Attestation is an independent documentation and procedural guidance consultancy. We do NOT invent eligibility rules, determine compensation amounts, or guarantee claim approval or disbursement timelines.
                </li>
                <li>
                  Final eligibility, document acceptance, and claim settlement decisions rest solely with the relevant Saudi Arabian ministries, courts, GOSI, employers, and diplomatic authorities.
                </li>
                <li>
                  Initial enquiry guidance is provided to help families understand documentation steps; government fees, translation, attestation, and formal processing services are quoted transparently before work begins.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Content Block 1: Core Documents & The 3 Saudi Death Claim Routes */}
        <ContentCard
          title="Core Documents Required for Saudi Death Claim Dossiers & Claim Routes"
          subtitle="While exact requirements depend on the nature of the case (natural death vs. traffic/workplace accident), standard dossiers include:"
        >
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-6">
            {[
              "Legal Heir Certificate (Warisana / Succession Certificate): Issued by your local Tehsildar, SDM, or Court in India listing all surviving family members with full names.",
              "Special Power of Attorney (Wakala / Authority Letter): Signed by all adult family heirs authorizing the Indian Embassy in Riyadh/Jeddah or a trusted relative in Saudi Arabia to collect the claim.",
              "Guardianship Certificate (Walayatnama): Required if the deceased left behind children under 18 years, giving the mother authority to represent them.",
              "Death Certificate, Police / Hospital Report & Passport Copy of the deceased person.",
              "Cancelled Bank Cheque / Bank Verification Letter (with IFSC / SWIFT code) and ID proofs of the family heirs.",
            ].map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* 3 Claim Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            {/* Route 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <Landmark className="w-3.5 h-3.5" />
                  Route 1 • Company Salary &amp; Service Dues
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  Unpaid Salary, End-of-Service (ESB) &amp; Bank Balances
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For claiming pending monthly wages, end-of-service gratuity/bonus,
                  and frozen bank balances in Saudi Arabia. Requires Legal Heir
                  Certificate (Warisana) and Power of Attorney (Wakala)
                  translated into Arabic and stamped by MEA and the Saudi
                  Embassy.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] font-bold text-teal-800">
                Chain: Local SDM → Arabic Translation → MEA → Saudi Embassy
              </div>
            </div>

            {/* Route 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Route 2 • Government Insurance (GOSI)
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  GOSI Social Insurance &amp; Workplace Death Claims
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For workers covered under Saudi Arabia's Social
                  Insurance (GOSI). Requires authenticated
                  Warisana, Marriage &amp; Children's Birth Certificates, GOSI claim
                  forms, and verified bank account details with SWIFT/IFSC code.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-200/80 text-[11px] font-bold text-amber-800">
                Chain: Family Certificates + Bank Letter → Arabic → MEA → Saudi Embassy
              </div>
            </div>

            {/* Route 3 */}
            <div className="bg-teal-50/60 border-2 border-teal-500/30 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-teal-600 text-white text-[11px] font-bold uppercase tracking-wider mb-2.5">
                  <Scale className="w-3.5 h-3.5" />
                  Route 3 • Accident &amp; Blood Money (Diyyah)
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-1.5">
                  Traffic Accident &amp; Court Compensation Claims
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  For fatal road traffic accidents (Muroor police cases) or accidental
                  deaths where compensation is decided by a Saudi Sharia court. Requires
                  Sharia-compliant Wakala, Legal Heir Certificate, and
                  Guardianship Certificate (Walayatnama) for minor children.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-teal-200 text-[11px] font-extrabold text-teal-900">
                Chain: Local Papers → Arabic Translation → SDM → MEA → Saudi Embassy
              </div>
            </div>
          </div>
        </ContentCard>

        {/* 3. Interactive Saudi Death Claim Route & Dossier Finder (Dark Gradient 3-Dropdown Tool) */}
        <section
          ref={finderBoxRef}
          className="bg-gradient-to-br from-[#0B2545] via-[#0f3159] to-[#133b69] text-white rounded-3xl p-5 sm:p-8 shadow-lg border border-teal-500/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Saudi Death Claim Dossier Finder
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 font-display">
                Check Your Exact Saudi Death Claim Attestation &amp; Wakala Route
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm">
              Select the claim category, who is being appointed in the Wakala,
              and your current Indian Legal Heir Certificate status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Dropdown 1 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                1. Claim / Case Category
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 1 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={finderState.claimCase}
                  onChange={(e) => {
                    setFinderState((prev) => ({
                      ...prev,
                      claimCase: e.target.value,
                    }));
                    guideToStep(2);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {CLAIM_CASE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 2 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                2. Attorney (Wakil) Named in Wakala
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 2 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={finderState.attorneyType}
                  onChange={(e) => {
                    setFinderState((prev) => ({
                      ...prev,
                      attorneyType: e.target.value,
                    }));
                    guideToStep(3);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {ATTORNEY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropdown 3 */}
            <div>
              <label className="block text-xs font-bold text-teal-200 uppercase tracking-wider mb-1.5">
                3. Indian Legal Heir Certificate Status
              </label>
              <div
                className={`rounded-xl transition-all duration-300 ${
                  activeFinderStep === 3 ? "fga-dark-box-shine" : ""
                }`}
              >
                <select
                  value={finderState.issuingAuthority}
                  onChange={(e) => {
                    setFinderState((prev) => ({
                      ...prev,
                      issuingAuthority: e.target.value,
                    }));
                    guideToStep(0, 0);
                  }}
                  className="w-full rounded-xl bg-white/10 border border-white/25 text-white text-xs sm:text-sm px-3.5 py-3 font-medium focus:outline-none focus:border-teal-400"
                >
                  {ISSUING_AUTHORITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="text-slate-900">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Result Card */}
          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-2xl p-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-extrabold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                {outcome.badge}
              </span>
              <span className="text-xs font-bold text-teal-300">
                Est. Time: {outcome.estimatedTime}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-white mb-2">
              {outcome.routeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
              {outcome.explanation}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/15">
              <div className="text-xs text-slate-300">
                <span className="font-bold text-teal-300">Cost Components:</span>{" "}
                {outcome.feeSummary}
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrefillQuoteFromFinder}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Request Free Checklist Review
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Hello Fatima Global Attestation, I checked the Saudi Death Claim Dossier Finder:\n• Claim Type: ${finderState.claimCase}\n• Attorney (Wakil): ${finderState.attorneyType}\n• Legal Heir Certificate Status: ${finderState.issuingAuthority}\nPlease guide our family on the required documents and attestation process.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Our Desk
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Claim Document Selector with Inline "Ask now" Bar */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
                Select Specific Death Claim Document
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] mt-1 font-display">
                Warisana, Shariah Wakala, Walayatnama &amp; Arabic Translation Support
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Tap any document card to view its exact Saudi Embassy route and ask
              our team
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {SAUDI_CLAIM_DOC_CATEGORIES.map((item) => {
              const isSelected = item.id === selectedCategoryId;
              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectCategory(item.id)}
                    className={`text-left rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-[#0B2545] text-white border-teal-500 shadow-md ring-2 ring-teal-500/30"
                        : "bg-slate-50/80 hover:bg-white text-slate-800 border-slate-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            isSelected
                              ? "bg-teal-500/20 text-teal-300 border border-teal-400/30"
                              : "bg-teal-50 text-teal-800 border border-teal-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                        <span
                          className={`text-[11px] font-bold ${
                            isSelected ? "text-amber-300" : "text-teal-700"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select →"}
                        </span>
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-extrabold leading-snug mb-1.5 ${
                          isSelected ? "text-white" : "text-[#0B2545]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed ${
                          isSelected ? "text-slate-200" : "text-slate-600"
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </button>

                  {/* Mobile Inline "Ask now" Panel right below selected card */}
                  {isSelected && (
                    <div
                      ref={inlineAskNowRef}
                      className="sm:hidden col-span-1 bg-teal-50/90 border-2 border-teal-600 rounded-xl p-4 space-y-3 shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal-900">
                          Selected Document Details
                        </span>
                        <span className="text-[11px] font-bold text-[#0B2545]">
                          {selectedCategory.timeline}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-[#0B2545]">
                        Route: {selectedCategory.routeSummary}
                      </p>
                      <p className="text-xs text-slate-700">
                        <span className="font-bold">Mandatory Rule:</span>{" "}
                        {selectedCategory.keyRequirement}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={getWhatsAppUrl(selectedCategory.whatsappText)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-[#25D366] text-white font-extrabold text-xs shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Ask now on WhatsApp
                        </a>
                        <a
                          href={`tel:${BUSINESS_CONFIG.telPhone}`}
                          className="inline-flex items-center justify-center gap-1 px-3 py-2.5 rounded-lg bg-[#0B2545] text-white font-bold text-xs"
                        >
                          <Phone className="w-3.5 h-3.5 text-teal-300" />
                          Call
                        </a>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Desktop/Tablet Inline "Ask now" Bar below grid */}
          <div className="hidden sm:flex mt-5 bg-gradient-to-r from-teal-50 via-white to-teal-50/70 border-2 border-teal-600/40 rounded-xl p-4 sm:p-5 items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#0B2545] text-teal-300 text-[11px] font-extrabold uppercase tracking-wider">
                  {selectedCategory.badge}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                  {selectedCategory.title}
                </h4>
              </div>
              <p className="text-xs text-slate-700">
                <span className="font-bold text-[#0B2545]">Legalization Chain:</span>{" "}
                {selectedCategory.routeSummary} •{" "}
                <span className="font-bold text-teal-800">
                  {selectedCategory.timeline}
                </span>
              </p>
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Key Rule:</span>{" "}
                {selectedCategory.keyRequirement}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <a
                href={getWhatsAppUrl(selectedCategory.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs sm:text-sm shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Ask now
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.telPhone}`}
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs sm:text-sm transition-all"
              >
                <Phone className="w-4 h-4 text-teal-300" />
                {BUSINESS_CONFIG.displayPhone}
              </a>
            </div>
          </div>
        </section>

        {/* 5. Content Block 2: Official Fees, Consular Rules & Timelines (2x2 Grid from Homepage) */}
        <ContentCard title="Official MEA & Saudi Embassy Consular Rules, Fees & Timelines">
          <TwoByTwoGrid
            items={[
              {
                title: "MEA & Saudi Embassy Consular Fees",
                description:
                  "Each document in a death claim dossier (Legal Heir Certificate, Wakala, Guardianship Certificate) undergoes statutory MEA attestation plus official Royal Embassy of Saudi Arabia consular stamping in New Delhi.",
              },
              {
                title: "Certified Legal Arabic Translation",
                description:
                  "Saudi Sharia Courts, GOSI, and the Indian Mission in Riyadh/Jeddah require every Indian certificate and Wakala to be accompanied by a Certified Legal Arabic Translation matching the deceased's Iqama spelling.",
              },
              {
                title: "Processing Time (7–12 Working Days)",
                description:
                  "Once your original Indian Legal Heir Certificate and signed Wakala reach our New Delhi desk, complete Arabic translation, SDM/Home authentication, MEA attestation, and Saudi Embassy legalization typically take 7–12 working days.",
              },
              {
                title: "Each Document Is Treated Separately",
                description:
                  "The Original English/Hindi Certificate and its Certified Arabic Translation, as well as the Warisana, Wakala, and Walayatnama, are treated as separate legal documents by the MEA and Saudi Embassy.",
              },
            ]}
          />
        </ContentCard>

        {/* 6. Who Needs This Service & Eligible Document Categories (Preserved from services.ts) */}
        <ContentCard title="Who Needs Saudi Arabia Death Claim Documentation Assistance?">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
            {[
              "Legal heirs and immediate family members preparing documentation for eligible death-related claims involving Saudi Arabia.",
              "Families requiring authentication of Death Certificates, Legal Heir / Surviving Member Certificates, and Family Tree records.",
              "Claimants needing Power of Attorney (Wakala) preparation, Arabic translation, MEA attestation, and Saudi Embassy / Apostille processing.",
              "Families seeking procedural clarity on coordinating paperwork required by employers, labour authorities, or consular channels.",
            ].map((who, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-slate-50 border border-slate-200 rounded-xl p-3.5"
              >
                <Users className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {who}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-2.5">
                Civil &amp; Legal Heirship Documents
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {[
                  "Legal Heir Certificate / Surviving Member Certificate / Succession Certificate",
                  "Death Certificate & Medical / Police Report Copies",
                  "Marriage Certificate (for spouse claims) & Birth Certificates (for minor/dependent children)",
                  "Guardianship Certificate (where minor children are legal beneficiaries)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] mb-2.5">
                Authorization &amp; Claim Filings
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {[
                  "Special Power of Attorney (Wakala) in favour of authorized representative",
                  "No-Objection Affidavits / Family Consent Declarations",
                  "Bank Account & KYC Verification Letters of Legal Heirs",
                  "Certified Arabic Translations of Supporting Claim Documents",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ContentCard>

        {/* 7. Detailed Comparison Table: Wakala in Favor of Indian Embassy vs Private KSA Attorney vs Direct GOSI */}
        <ContentCard title="Comparison: Appointing Indian Embassy (Riyadh/Jeddah) vs. Relative/Attorney in Saudi Arabia">
          <div className="overflow-x-auto -mx-1 px-1">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0B2545] text-white">
                  <th className="py-3 px-3.5 rounded-tl-xl font-bold">
                    Criterion
                  </th>
                  <th className="py-3 px-3.5 font-bold text-teal-300">
                    Option A: Wakala in Favor of Embassy of India (Riyadh / CGI Jeddah)
                  </th>
                  <th className="py-3 px-3.5 rounded-tr-xl font-bold">
                    Option B: Wakala in Favor of Relative / Representative in KSA
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-white">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    When Recommended
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 bg-teal-50/40">
                    When the family in India has no close relative in Saudi Arabia
                    who can personally attend Sharia Courts, Labour Offices, and
                    Police stations
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    When a trusted brother, son, or relative holds a valid Saudi
                    Iqama and can actively follow up in person with the employer
                    and courts in KSA
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Attorney Details Needed in Wakala
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 bg-teal-50/40">
                    Executed in the official designation of the Embassy of India,
                    Riyadh or Consulate General of India, Jeddah (Community
                    Welfare / Death Claim Wing)
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Exact Full Name, Passport Number, and 10-digit Saudi Iqama
                    Number of the appointed representative in Saudi Arabia
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Required Attestation Chain in India
                  </td>
                  <td className="py-3 px-3.5 text-emerald-800 font-bold bg-teal-50/40">
                    DM / SDM / Home Dept → Certified Arabic Translation → MEA →
                    Royal Embassy of Saudi Arabia (New Delhi)
                  </td>
                  <td className="py-3 px-3.5 text-emerald-800 font-bold">
                    DM / SDM / Home Dept → Certified Arabic Translation → MEA →
                    Royal Embassy of Saudi Arabia (New Delhi)
                  </td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    Claim Disbursement Channel
                  </td>
                  <td className="py-3 px-3.5 text-slate-800 bg-teal-50/40">
                    Collected by the Indian Mission in KSA and remitted through
                    the District Collector / Magistrate in India to the legal
                    heirs
                  </td>
                  <td className="py-3 px-3.5 text-slate-700">
                    Collected via Saudi Court / GOSI / Employer cheque or direct
                    bank transfer per the powers granted in the Shariah Wakala
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ContentCard>

        {/* 8. Step-by-Step End-to-End Authentication & Saudi Embassy Routing (Preserves both sets of steps) */}
        <ContentCard title="End-to-End Authentication & Saudi Embassy Routing">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: "Step 1",
                title: "1. Free Name Check & Document Review",
                desc: "We check the deceased person's passport and your family's papers to ensure all names match 100% without initials, preventing costly delays and rejections in Saudi courts.",
              },
              {
                step: "Step 2",
                title: "2. Legal Drafting & Certified Arabic Translation",
                desc: "We help draft the Power of Attorney (Wakala) and translate all Indian certificates into formal Arabic matching the deceased's Saudi Iqama records.",
              },
              {
                step: "Step 3",
                title: "3. State SDM & Ministry of External Affairs (MEA)",
                desc: "Your original documents and Arabic translations are officially authenticated by the SDM and stamped by the Ministry of External Affairs (MEA) in New Delhi.",
              },
              {
                step: "Step 4",
                title: "4. Royal Embassy of Saudi Arabia Legalization",
                desc: "The final official legalization stamp is obtained from the Saudi Embassy in New Delhi, making your documents 100% legally valid for Saudi courts, GOSI, and employers.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#0B2545] text-teal-300 font-extrabold text-xs mb-3">
                    {item.step}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#0B2545] mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 9. Required Documents Checklist (Preserving all items from services.ts + dedicatedPages.ts) */}
        <ContentCard title="Required Documents Checklist from the Family in India">
          <p className="text-xs sm:text-sm text-slate-600 mb-4">
            Please keep clear scans or originals of the following documents ready
            for our initial verification:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {[
              "Copy of the deceased person's Indian Passport and Saudi Iqama (Residence Permit), if available",
              "Death Certificate and official police/hospital report issued in Saudi Arabia or India",
              "Legal Heir Certificate / Surviving Member Certificate issued by the competent Indian revenue or judicial authority",
              "Valid ID proofs (Passport / Aadhaar / PAN) of the claiming legal heirs",
              "Special Power of Attorney (Wakala) signed and thumb-impressed by all adult legal heirs with passport-size photographs",
              "Guardianship Certificate (Walayatnama) issued by the DM/Collector or Court if any legal heir is a minor (under 18)",
              "Marriage Certificate of the surviving spouse and Birth Certificates of dependent children (for GOSI claims)",
              "Cancelled Cheque & Bank Account Verification Letter (with SWIFT / IFSC code) of the legal heirs",
            ].map((req, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-slate-50 border border-slate-200/90 rounded-xl p-3.5"
              >
                <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                  {req}
                </span>
              </div>
            ))}
          </div>
        </ContentCard>

        {/* 10. Reference Specimens Gallery: Pre-MEA Notary/SDM Seal & Certified Arabic Translation Format */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700">
                Authentic Verification &amp; Translation Specimens
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2545] mt-1 font-display">
                How Pre-MEA Notarization, SDM Stamping &amp; Arabic Translation Look
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Click any specimen below to inspect in 2x zoom
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Specimen 1: Notary + SDM Authentication */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                  Stage 1 &amp; 2 • Indian Pre-Authentication
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                  Advocate Notary &amp; Delhi SDM Authentication (Prior to MEA &amp; Saudi Embassy)
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Shows how Indian legal documents and translations receive the
                  circular Government of India Notary seal and Sub-Divisional
                  Magistrate (SDM) endorsement before MEA and Saudi Embassy
                  submission.
                </p>
              </div>
              <div
                onClick={() =>
                  setActiveSampleModal({
                    src: "/samples/notary_sdm_attestation_specimen.jpg",
                    title:
                      "Advocate Notary Public & Delhi SDM Authentication Specimen",
                    subtitle:
                      "Preliminary notarization and magistrate verification required prior to MEA and Royal Embassy of Saudi Arabia legalization.",
                  })
                }
                className="p-4 flex items-center justify-center bg-slate-100/80 cursor-zoom-in relative group"
              >
                <img
                  src="/samples/notary_sdm_attestation_specimen.jpg"
                  alt="Advocate Notary Public and Delhi SDM authentication stamps prior to MEA and Saudi Embassy legalization"
                  className="max-h-72 w-auto object-contain rounded-xl border border-slate-200 bg-white shadow-xs group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
                <span className="absolute bottom-6 right-6 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545]/85 text-white text-[11px] font-semibold">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  2x Zoom
                </span>
              </div>
            </div>

            {/* Specimen 2: Certified Arabic Translation */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between">
              <div className="p-4 bg-white border-b border-slate-100">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-extrabold uppercase tracking-wider mb-1.5">
                  Stage 2 • Formal Arabic Legal Format
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545]">
                  Certified English-to-Arabic Civil &amp; Legal Translation Layout
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Illustrates structured Arabic translation formatting where
                  personal names, registration numbers, and family details are
                  aligned for Gulf Embassy and Sharia Court review.
                </p>
              </div>
              <div
                onClick={() =>
                  setActiveSampleModal({
                    src: "/assets/aistudio/arabic_marriage_certificate_original_style_A4_f4196b02.png",
                    title: "Structured English-to-Arabic Legal & Civil Translation Specimen",
                    subtitle:
                      "All Saudi Death Claim documents (Warisana, Wakala, Walayatnama, Marriage/Birth records) require accurate Arabic translation.",
                  })
                }
                className="p-4 flex items-center justify-center bg-slate-100/80 cursor-zoom-in relative group"
              >
                <img
                  src="/assets/aistudio/arabic_marriage_certificate_original_style_A4_f4196b02.png"
                  alt="Certified Arabic translation specimen for Saudi Arabia embassy and court submission"
                  className="max-h-72 w-auto object-contain rounded-xl border border-slate-200 bg-white shadow-xs group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
                <span className="absolute bottom-6 right-6 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B2545]/85 text-white text-[11px] font-semibold">
                  <ZoomIn className="w-3.5 h-3.5 text-teal-300" />
                  2x Zoom
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 11. Pan-India Doorstep Support for Bereaved Families (Interactive State-Wise Death Claim Guide) */}
        <ContentCard title="PAN-India Documentation Support for Bereaved Families (No Need to Travel to Delhi)">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            Bereaved families do not need to travel in person to New Delhi to
            visit the Ministry of External Affairs or the Royal Embassy of Saudi
            Arabia. Once your local Legal Heir Certificate (Warisana) and Wakala
            are issued in your home district, you can send them via tracked
            courier to our Connaught Place, New Delhi desk.{" "}
            <strong className="text-[#0B2545]">
              Tap your state below to see where to get your Warisana &amp; how we assist your family:
            </strong>
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {SAUDI_DEATH_CLAIM_STATE_GUIDES.map((loc) => {
              const isSelected = loc.key === selectedStateKey;
              return (
                <button
                  key={loc.key}
                  type="button"
                  onClick={() => {
                    setSelectedStateKey(loc.key);
                    if (typeof window !== "undefined" && window.innerWidth < 768) {
                      setTimeout(() => {
                        stateGuideDetailRef.current?.scrollIntoView({
                          behavior: "smooth",
                          block: "nearest",
                        });
                      }, 50);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#0B2545] text-white border-[#0B2545] shadow-xs ring-2 ring-teal-500/30"
                      : "bg-slate-50 hover:bg-teal-50 border-slate-200 hover:border-teal-400 text-[#0B2545]"
                  }`}
                >
                  <MapPin
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSelected ? "text-teal-300" : "text-teal-600"
                    }`}
                  />
                  <span>{loc.buttonLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Selected State Saudi Death Claim Guide Card */}
          {(() => {
            const activeState =
              SAUDI_DEATH_CLAIM_STATE_GUIDES.find(
                (s) => s.key === selectedStateKey
              ) || SAUDI_DEATH_CLAIM_STATE_GUIDES[0];

            return (
              <div
                ref={stateGuideDetailRef}
                className="rounded-2xl bg-gradient-to-br from-teal-50/90 via-white to-slate-50 border-2 border-teal-600/40 p-4 sm:p-5 space-y-3.5 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-teal-200/80 pb-3">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0B2545] text-teal-300 text-[10.5px] font-extrabold uppercase tracking-wider mb-1">
                      Saudi Death Claim Guide • {activeState.stateName}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#0B2545] font-display">
                      How Families in {activeState.stateName} Complete Saudi Death Claim Papers
                    </h3>
                  </div>
                  <span className="self-start sm:self-auto text-[11px] font-bold text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-lg border border-teal-200">
                    ⏱ {activeState.courierTimeline}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-teal-800 block">
                      1. Where to Get Warisana (Legal Heir Certificate) in {activeState.stateName}:
                    </span>
                    <p className="font-bold text-[#0B2545] leading-relaxed">
                      {activeState.warisanaAuthority}
                    </p>
                    <p className="text-slate-600 leading-relaxed pt-1">
                      {activeState.localProcessNote}
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-1.5 flex flex-col justify-between">
                    <div>
                      <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-teal-800 block mb-1">
                        2. Districts Covered via Tracked Courier Pickup:
                      </span>
                      <p className="text-slate-700 font-medium leading-relaxed">
                        {activeState.districts}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-semibold">
                      ✓ Send via BlueDart / DTDC / SpeedPost to our Connaught Place, New Delhi desk. We handle Certified Arabic Translation + SDM + MEA + Saudi Embassy Legalization.
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <a
                      href={getWhatsAppUrl(
                        `Hello Fatima Global Attestation, our family is in ${activeState.stateName} and we need guidance for Saudi Arabia Death Claim (Legal Heir Warisana, Wakala & Saudi Embassy attestation).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-xs transition-all"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      <span>WhatsApp for {activeState.stateName} Death Claim Help</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setQuotePrefill({
                          destinationCountry: "Kingdom of Saudi Arabia (KSA)",
                          purpose: `Saudi Arabia Death Claim Assistance (${activeState.stateName})`,
                          documentDetails: `Family State: ${activeState.stateName} | Local Authority: ${activeState.warisanaAuthority} | Need guidance for Warisana, Wakala, Arabic Translation, MEA & Saudi Embassy Legalization.`,
                          timestamp: Date.now(),
                        });
                        const el = document.getElementById("saudi-death-claim-quote");
                        if (el) {
                          el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-slate-900 text-white font-bold text-xs transition-all cursor-pointer"
                    >
                      <span>Get Free {activeState.stateName} Checklist</span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-300" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(activeState.locationPath)}
                    className="self-start sm:self-auto text-[11px] font-semibold text-slate-500 hover:text-teal-700 underline underline-offset-2 cursor-pointer"
                  >
                    View General {activeState.stateName} Attestation Desk →
                  </button>
                </div>
              </div>
            );
          })()}
        </ContentCard>

        {/* 12. Official Government & Indian Embassy Portals */}
        <ContentCard title="Official Indian Embassy (Riyadh / Jeddah), MEA & GOSI Reference Links">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              {
                authority: "Embassy of India, Riyadh (Saudi Arabia)",
                label: "Embassy of India Riyadh — Death Case & Compensation Guidelines",
                url: "https://www.eoiriyadh.gov.in",
                desc: "Official checklist and guidelines published by the Indian Embassy in Riyadh for legal heirs claiming dues in Saudi Arabia.",
              },
              {
                authority: "Ministry of External Affairs (MEA) — Consular / MADAD",
                label: "MEA Consular Services & Overseas Indian Welfare",
                url: "https://www.mea.gov.in",
                desc: "Official Ministry of External Affairs portal for consular grievances and overseas Indian documentation guidance.",
              },
              {
                authority: "Consulate General of India, Jeddah",
                label: "CGI Jeddah — Community Welfare & Death Claim Wing",
                url: "https://cgijeddah.gov.in",
                desc: "Official Indian Consulate portal for death cases in Western Region of Saudi Arabia (Jeddah, Makkah, Madinah, Taif).",
              },
              {
                authority: "GOSI (Kingdom of Saudi Arabia)",
                label: "General Organization for Social Insurance (GOSI) Portal",
                url: "https://www.gosi.gov.sa",
                desc: "Official Saudi social insurance authority handling occupational injury and death benefit claims.",
              },
            ].map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-50 hover:bg-[#0B2545] border border-slate-200 hover:border-[#0B2545] rounded-xl p-4 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 group-hover:text-teal-300">
                      {portal.authority}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-300 shrink-0" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#0B2545] group-hover:text-white mb-1">
                    {portal.label}
                  </h3>
                  <p className="text-xs text-slate-600 group-hover:text-slate-200 leading-relaxed">
                    {portal.desc}
                  </p>
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-amber-300 mt-2 truncate">
                  {portal.url}
                </span>
              </a>
            ))}
          </div>
        </ContentCard>

        {/* 13. Related Services Internal Links */}
        <ContentCard title="Related Saudi Arabia, Arabic Translation & Legalization Services">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                title: "Saudi Arabia Document Attestation",
                desc: "General KSA Apostille, work visa & family residence guide",
                path: "/countries/saudi-arabia-attestation",
              },
              {
                title: "Certified Document Translation (Arabic)",
                desc: "Legal English/Hindi-to-Arabic translation for Wakala & Warisana",
                path: "/services/document-translation",
              },
              {
                title: "Notary Public & Affidavit Services",
                desc: "Non-Judicial e-Stamp POA, NOC & Affidavit execution",
                path: "/services/notary-public",
              },
              {
                title: "Embassy Legalization Services",
                desc: "Consular legalization at Royal Embassy of Saudi Arabia, Delhi",
                path: "/services/embassy-legalization",
              },
            ].map((link) => (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className="text-left bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-500/40 rounded-xl p-3.5 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-extrabold text-[#0B2545] group-hover:text-teal-800">
                    {link.title}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-700 shrink-0" />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {link.desc}
                </p>
              </button>
            ))}
          </div>
        </ContentCard>

        {/* 14. FAQs Section (Preserves all 4 existing FAQs + 4 new high-intent SEO FAQs) */}
        <ContentCard title="Frequently Asked Questions: Saudi Arabia Death Claim Documentation">
          <div className="flex items-center gap-2 text-teal-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Legal Heir, Wakala, Guardianship &amp; Saudi Embassy FAQs</span>
          </div>
          <FAQAccordion items={SAUDI_DEATH_CLAIM_FAQS} />
        </ContentCard>

        {/* 15. Quote / Free Initial Checklist Assessment Form */}
        <section id="saudi-death-claim-quote" className="scroll-mt-20">
          <QuoteForm
            title="Request Free Initial Guidance for Saudi Arabia Death Claim Documentation"
            subtitle="Share the case details and available documents below. Our team will review your Legal Heir Certificate and Wakala requirements and provide a clear, transparent attestation checklist."
            initialServiceSlug="/saudi-arabia-death-claim-assistance"
            prefillDetails={quotePrefill}
          />
        </section>
      </div>

      {/* 2x Zoom Lightbox Modal */}
      {activeSampleModal && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => {
            setActiveSampleModal(null);
            setIsZoomed(false);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 sm:px-6 py-3.5 bg-[#0B2545] text-white flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold">
                  {activeSampleModal.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">
                  {activeSampleModal.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsZoomed((z) => !z)}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-teal-300 transition-colors cursor-pointer"
                >
                  {isZoomed ? "1x Fit" : "2x Zoom"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSampleModal(null);
                    setIsZoomed(false);
                  }}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 overflow-auto flex-1 bg-slate-100 flex items-center justify-center">
              <img
                src={activeSampleModal.src}
                alt={activeSampleModal.title}
                onClick={() => setIsZoomed((z) => !z)}
                className={`rounded-xl border border-slate-200 bg-white shadow-md transition-transform duration-200 cursor-zoom-in ${
                  isZoomed
                    ? "scale-150 sm:scale-175 origin-top cursor-zoom-out my-12"
                    : "max-h-[72vh] w-auto object-contain"
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
