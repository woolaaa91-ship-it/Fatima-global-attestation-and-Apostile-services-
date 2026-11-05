import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Stamp,
  Landmark,
  FileCheck2,
  Briefcase,
  FileSearch,
  Truck,
  ShieldCheck,
  PackageCheck,
  MapPin,
  ArrowRight,
  GraduationCap,
  Clock,
  CheckCircle2,
  Building2,
  Phone,
  FileText,
  Lock,
} from "lucide-react";
import { applyRouteSEO } from "../utils/seo";
import { PAN_INDIA_LOCATION_PAGES } from "../data/dedicatedPages";
import { ContentCard } from "./PageLayout";
import { DisclaimerBox } from "./DisclaimerBox";
import { FAQAccordion, FAQItem } from "./FAQAccordion";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { BUSINESS_CONFIG, getWhatsAppUrl } from "../config/business";
import { SampleEvidenceGallery } from "./SampleEvidenceGallery";
import { WhyChooseUs } from "./WhyChooseUs";
import { QuoteForm } from "./QuoteForm";
import { DocumentSafetyTrustSection } from "./DocumentSafetyTrustSection";

export interface CityLandingPageProps {
  cityName: string;
  slug: string;
  onNavigate?: (path: string) => void;
}

export interface StateHrdAuthorityProfile {
  stateLabel: string;
  hrdAuthorityName: string;
  nodalCity: string;
  homeDeptName: string;
  majorUniversities: string;
  hrdTimeline: string;
  sdmAlternativeNote: string;
}

export function getStateHrdAuthorityProfile(
  cityName: string
): StateHrdAuthorityProfile {
  const key = cityName.toLowerCase();

  if (
    key.includes("lucknow") ||
    key.includes("uttar pradesh") ||
    key.includes("noida") ||
    key.includes("varanasi") ||
    key.includes("kanpur")
  ) {
    return {
      stateLabel: "Uttar Pradesh (Lucknow HRD Secretariat)",
      hrdAuthorityName:
        "Department of Higher Education, UP Secretariat (Vidhan Bhawan, Lucknow) & Directorate of Higher Education",
      nodalCity: "Lucknow, Uttar Pradesh",
      homeDeptName: "UP Home Department / General Administration (Lucknow)",
      majorUniversities:
        "Lucknow University, Dr. A.P.J. Abdul Kalam Technical University (AKTU), BHU Varanasi, AMU Aligarh, CCSU Meerut, CSJMU Kanpur, DDU Gorakhpur, MJPRU Bareilly, Integral University, Amity University Noida",
      hrdTimeline: "10–18 working days (depends on university registrar confirmation)",
      sdmAlternativeNote:
        "For UP degrees where the foreign employer or Hague university does not strictly mandate Lucknow State HRD, our Delhi SDM + MEA route completes in 2–3 working days.",
    };
  }

  if (key.includes("patna") || key.includes("bihar")) {
    return {
      stateLabel: "Bihar (Patna Vikash Bhawan HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education, Education Department, Vikash Bhawan (New Secretariat, Patna)",
      nodalCity: "Patna, Bihar",
      homeDeptName: "Home (Special) Department, Government of Bihar (Patna)",
      majorUniversities:
        "Patna University, Magadh University (Bodh Gaya), LNMU Darbhanga, Babasaheb Bhimrao Ambedkar Bihar University (Muzaffarpur), Aryabhatta Knowledge University (AKU), TMBU Bhagalpur, Jai Prakash University",
      hrdTimeline: "12–20 working days (subject to university verification reply)",
      sdmAlternativeNote:
        "If Patna HRD takes too long for your visa slot, we also offer the 2–3 working day Delhi SDM + MEA Apostille/Attestation route accepted across Europe, UAE, and Qatar.",
    };
  }

  if (
    key.includes("mumbai") ||
    key.includes("pune") ||
    key.includes("maharashtra")
  ) {
    return {
      stateLabel: "Maharashtra (Mantralaya Mumbai HRD)",
      hrdAuthorityName:
        "Department of Higher & Technical Education, Mantralaya (Madam Cama Road, Mumbai)",
      nodalCity: "Mumbai, Maharashtra",
      homeDeptName: "Home Department / General Administration Dept (Mantralaya, Mumbai)",
      majorUniversities:
        "University of Mumbai, Savitribai Phule Pune University (SPPU), RTM Nagpur University, Symbiosis International, SNDT Women's University, Shivaji University Kolhapur, BAMU Aurangabad, MSBTE",
      hrdTimeline: "7–14 working days",
      sdmAlternativeNote:
        "Both authentic Mantralaya Mumbai HRD + MEA and the 2–3 working day Delhi SDM + MEA route are coordinated with doorstep courier pickup from Mumbai and Pune.",
    };
  }

  if (
    key.includes("kerala") ||
    key.includes("kochi") ||
    key.includes("kozhikode") ||
    key.includes("thiruvananthapuram")
  ) {
    return {
      stateLabel: "Kerala (NORKA-Roots HRD Attestation)",
      hrdAuthorityName:
        "NORKA-Roots (Department of Non-Resident Keralites Affairs — Thiruvananthapuram, Ernakulam/Kochi & Kozhikode Regional Centres)",
      nodalCity: "Thiruvananthapuram / Kochi / Kozhikode",
      homeDeptName: "Home Department, Government Secretariat (Thiruvananthapuram)",
      majorUniversities:
        "University of Kerala, Mahatma Gandhi (MG) University Kottayam, University of Calicut, CUSAT Kochi, APJ Abdul Kalam Technological University (KTU), KUHS Thrissur, Kannur University",
      hrdTimeline: "5–12 working days via NORKA-Roots",
      sdmAlternativeNote:
        "We coordinate both NORKA-Roots HRD + MEA Embassy Legalization (for Saudi, Kuwait, UAE, Qatar) and 2–3 working day Delhi SDM + MEA Apostille.",
    };
  }

  if (
    key.includes("hyderabad") ||
    key.includes("telangana") ||
    key.includes("andhra")
  ) {
    return {
      stateLabel: "Telangana & Andhra Pradesh (GAD / Secretariat HRD)",
      hrdAuthorityName:
        "General Administration Department (GAD) / Higher Education Secretariat (Hyderabad & Velagapudi/Amaravati) & e-Sanad Nodal Desk",
      nodalCity: "Hyderabad / Amaravati",
      homeDeptName: "General Administration Department (GAD NRI Cell)",
      majorUniversities:
        "Osmania University, JNTU Hyderabad (JNTUH), JNTU Kakinada (JNTUK), Andhra University Visakhapatnam, Kakatiya University Warangal, University of Hyderabad, SVU Tirupati, GITAM",
      hrdTimeline: "7–15 working days (online/offline university verification)",
      sdmAlternativeNote:
        "For urgent USA/Europe Apostille or UAE/Qatar work visas, our 2–3 working day Delhi SDM + MEA route provides a rapid, legally valid alternative.",
    };
  }

  if (key.includes("chennai") || key.includes("tamil nadu")) {
    return {
      stateLabel: "Tamil Nadu (Fort St. George Secretariat HRD)",
      hrdAuthorityName:
        "Higher Education Department / Public (Foreigners) Department, Secretariat (Fort St. George, Chennai)",
      nodalCity: "Chennai, Tamil Nadu",
      homeDeptName: "Public (Foreigners) Department, Secretariat, Chennai",
      majorUniversities:
        "Anna University Chennai, University of Madras, Bharathiar University Coimbatore, Bharathidasan University Trichy, SRM Institute, VIT Vellore, Madurai Kamaraj University, Tamil Nadu Dr. M.G.R. Medical University",
      hrdTimeline: "10–18 working days (with university genuineness certificate)",
      sdmAlternativeNote:
        "When Tamil Nadu Secretariat HRD genuineness takes 2–3 weeks, ask our team whether your destination country accepts the 2–3 working day Delhi SDM + MEA route.",
    };
  }

  if (key.includes("bangalore") || key.includes("bengaluru") || key.includes("karnataka")) {
    return {
      stateLabel: "Karnataka (Bengaluru Higher Education / Regional Commissioner HRD)",
      hrdAuthorityName:
        "Department of Higher Education / Office of the Regional Commissioner (Shantinagar, Bengaluru)",
      nodalCity: "Bengaluru, Karnataka",
      homeDeptName: "Home Department, Vidhana Soudha / Vikasa Soudha, Bengaluru",
      majorUniversities:
        "Visvesvaraya Technological University (VTU Belagavi), Bangalore University, Rajiv Gandhi University of Health Sciences (RGUHS), University of Mysore, Manipal Academy (MAHE), Christ University, Jain University",
      hrdTimeline: "7–15 working days",
      sdmAlternativeNote:
        "We coordinate both Bengaluru Regional Commissioner HRD and the 2–3 working day Delhi SDM + MEA fast-track route with doorstep courier across Bengaluru.",
    };
  }

  if (
    key.includes("punjab") ||
    key.includes("chandigarh") ||
    key.includes("jalandhar") ||
    key.includes("ludhiana") ||
    key.includes("amritsar") ||
    key.includes("haryana") ||
    key.includes("gurugram")
  ) {
    return {
      stateLabel: "Punjab, Haryana & Chandigarh (Higher Education HRD)",
      hrdAuthorityName:
        "Department of Higher Education (Sector 17, Chandigarh & Shiksha Sadan, Panchkula)",
      nodalCity: "Chandigarh / Panchkula",
      homeDeptName: "Home Department, Punjab / Haryana Civil Secretariat, Chandigarh",
      majorUniversities:
        "Panjab University Chandigarh, I.K. Gujral Punjab Technical University (PTU Jalandhar), Guru Nanak Dev University (GNDU Amritsar), Punjabi University Patiala, Lovely Professional University (LPU), Kurukshetra University, MDU Rohtak",
      hrdTimeline: "7–14 working days",
      sdmAlternativeNote:
        "For Europe study visas (Italy, Germany, Poland, Lithuania) and Gulf work visas, we also execute the 2–3 working day Delhi SDM + MEA route.",
    };
  }

  if (key.includes("kolkata") || key.includes("west bengal")) {
    return {
      stateLabel: "West Bengal (Bikash Bhavan Salt Lake HRD)",
      hrdAuthorityName:
        "Department of Higher Education, Bikash Bhavan (Salt Lake City, Kolkata)",
      nodalCity: "Kolkata, West Bengal",
      homeDeptName: "Home & Hill Affairs Department (Nabanna / Writers' Buildings, Kolkata)",
      majorUniversities:
        "University of Calcutta, Jadavpur University, MAKAUT (formerly WBUT), University of Burdwan, University of Kalyani, Visva-Bharati, West Bengal University of Health Sciences",
      hrdTimeline: "10–18 working days",
      sdmAlternativeNote:
        "We handle both Bikash Bhavan Kolkata HRD coordination and 2–3 working day Delhi SDM + MEA verification.",
    };
  }

  if (
    key.includes("ahmedabad") ||
    key.includes("surat") ||
    key.includes("gujarat")
  ) {
    return {
      stateLabel: "Gujarat (Gandhinagar Commissionerate of Higher Education HRD)",
      hrdAuthorityName:
        "Commissionerate of Higher Education, Dr. Jivraj Mehta Bhavan / New Sachivalaya (Gandhinagar)",
      nodalCity: "Gandhinagar / Ahmedabad",
      homeDeptName: "General Administration Department (GAD), Sachivalaya, Gandhinagar",
      majorUniversities:
        "Gujarat University Ahmedabad, Gujarat Technological University (GTU), M.S. University of Baroda (Vadodara), Veer Narmad South Gujarat University (Surat), Saurashtra University, Nirma University",
      hrdTimeline: "7–14 working days",
      sdmAlternativeNote:
        "We support both Gandhinagar HRD + MEA and the 2–3 working day Delhi SDM + MEA route for Gujarat degrees.",
    };
  }

  if (key.includes("jaipur") || key.includes("rajasthan")) {
    return {
      stateLabel: "Rajasthan (Jaipur Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of College Education (Shiksha Sankul, JLN Marg, Jaipur) & Higher Education Secretariat",
      nodalCity: "Jaipur, Rajasthan",
      homeDeptName: "Home Department, Government Secretariat, Jaipur",
      majorUniversities:
        "University of Rajasthan (Jaipur), Rajasthan Technical University (RTU Kota), RUHS Jaipur, Jai Narain Vyas University (Jodhpur), MLSU Udaipur, MDSU Ajmer, BITS Pilani",
      hrdTimeline: "8–16 working days",
      sdmAlternativeNote:
        "We coordinate both Jaipur HRD verification and the fast-track 2–3 working day Delhi SDM + MEA route.",
    };
  }

  if (key.includes("bhopal") || key.includes("madhya pradesh")) {
    return {
      stateLabel: "Madhya Pradesh (Bhopal Higher Education HRD)",
      hrdAuthorityName:
        "Department of Higher Education, Satpura Bhawan / Vallabh Bhawan (Bhopal)",
      nodalCity: "Bhopal, Madhya Pradesh",
      homeDeptName: "Home Department, Mantralaya (Vallabh Bhawan, Bhopal)",
      majorUniversities:
        "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV Bhopal), Barkatullah University Bhopal, Devi Ahilya Vishwavidyalaya (DAVV Indore), Jiwaji University Gwalior, Rani Durgavati University Jabalpur",
      hrdTimeline: "8–15 working days",
      sdmAlternativeNote:
        "Choose between Bhopal State HRD + MEA or our 2–3 working day Delhi SDM + MEA route based on your embassy requirement.",
    };
  }

  if (
    key.includes("kashmir") ||
    key.includes("srinagar") ||
    key.includes("jammu")
  ) {
    return {
      stateLabel: "Jammu & Kashmir (Civil Secretariat Higher Education HRD)",
      hrdAuthorityName:
        "Higher Education Department, J&K Civil Secretariat (Srinagar / Jammu)",
      nodalCity: "Srinagar / Jammu",
      homeDeptName: "General Administration Department (GAD) / Home Department, J&K",
      majorUniversities:
        "University of Kashmir (Srinagar), University of Jammu, Islamic University of Science & Technology (IUST Awantipora), Cluster University Srinagar, SKUAST, NIT Srinagar",
      hrdTimeline: "10–18 working days",
      sdmAlternativeNote:
        "We assist students and professionals from Srinagar and Jammu with both J&K HRD + Saudi/UAE Embassy legalization and the 2–3 working day Delhi SDM + MEA route.",
    };
  }

  if (key.includes("goa")) {
    return {
      stateLabel: "Goa (Porvorim Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education, Government of Goa (SCERT Building, Alto-Porvorim, Goa)",
      nodalCity: "Panaji / Porvorim, Goa",
      homeDeptName: "Home Department (Secretariat, Porvorim, Goa)",
      majorUniversities:
        "Goa University (Taleigao Plateau), BITS Pilani Goa Campus, Goa Institute of Management (GIM), NIT Goa",
      hrdTimeline: "7–14 working days",
      sdmAlternativeNote:
        "We assist Goa degree holders with both Porvorim State HRD + MEA and the 2–3 working day Delhi SDM + MEA route for European (Portugal, Germany) and Gulf visas.",
    };
  }

  if (key.includes("bhubaneswar") || key.includes("odisha")) {
    return {
      stateLabel: "Odisha (Bhubaneswar Higher Education HRD)",
      hrdAuthorityName:
        "Department of Higher Education, Government of Odisha, Lok Seva Bhawan (Secretariat, Bhubaneswar)",
      nodalCity: "Bhubaneswar, Odisha",
      homeDeptName: "Home Department, Lok Seva Bhawan, Bhubaneswar",
      majorUniversities:
        "Utkal University (Bhubaneswar), Ravenshaw University (Cuttack), BPUT Rourkela, KIIT Deemed University, Siksha 'O' Anusandhan (SOA), Sambalpur University, Berhampur University, VSSUT Burla",
      hrdTimeline: "8–16 working days",
      sdmAlternativeNote:
        "Both Bhubaneswar State HRD verification and the 2–3 working day Delhi SDM + MEA fast-track route are coordinated with secure courier pickup from Bhubaneswar and Cuttack.",
    };
  }

  if (key.includes("guwahati") || key.includes("assam")) {
    return {
      stateLabel: "Assam & Northeast (Guwahati Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education, Government of Assam (Kahilipara, Guwahati)",
      nodalCity: "Guwahati, Assam",
      homeDeptName: "Home & Political Department, Assam Secretariat (Janata Bhawan, Dispur, Guwahati)",
      majorUniversities:
        "Gauhati University, Dibrugarh University, Tezpur University, Assam University (Silchar), Assam Science & Technology University (ASTU), Assam Don Bosco University, Assam Down Town University",
      hrdTimeline: "10–18 working days",
      sdmAlternativeNote:
        "For students from Assam traveling abroad, we handle both Guwahati HRD authentication and the fast-track 2–3 working day Delhi SDM + MEA Apostille route.",
    };
  }

  if (key.includes("dehradun") || key.includes("uttarakhand")) {
    return {
      stateLabel: "Uttarakhand (Dehradun Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education / Higher Education Secretariat (Subhash Road, Dehradun)",
      nodalCity: "Dehradun, Uttarakhand",
      homeDeptName: "Home Department, Uttarakhand Secretariat (4 Subhash Road, Dehradun)",
      majorUniversities:
        "Hemwati Nandan Bahuguna (HNB) Garhwal University, Kumaun University Nainital, Uttarakhand Technical University (UTU Dehradun), Graphic Era University, UPES Dehradun, DIT University, Gurukula Kangri Haridwar",
      hrdTimeline: "8–15 working days",
      sdmAlternativeNote:
        "We arrange doorstep courier pickup in Dehradun and Haridwar for both Uttarakhand State HRD and 2–3 working day Delhi SDM + MEA Apostille.",
    };
  }

  if (key.includes("shimla") || key.includes("himachal")) {
    return {
      stateLabel: "Himachal Pradesh (Shimla Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education, Government of Himachal Pradesh (Lalpani, Shimla)",
      nodalCity: "Shimla, Himachal Pradesh",
      homeDeptName: "Home Department, HP Civil Secretariat, Shimla",
      majorUniversities:
        "Himachal Pradesh University (HPU Shimla), HP Technical University (HPTU Hamirpur), Dr. Y.S. Parmar UHF Nauni, Jaypee University of Information Technology (Waknaghat), Shoolini University Solan",
      hrdTimeline: "8–16 working days",
      sdmAlternativeNote:
        "We handle both Shimla State HRD verification and the 2–3 working day Delhi SDM + MEA route with doorstep courier pickup across Himachal.",
    };
  }

  if (key.includes("ranchi") || key.includes("jharkhand")) {
    return {
      stateLabel: "Jharkhand (Ranchi Higher Education HRD)",
      hrdAuthorityName:
        "Department of Higher & Technical Education, Government of Jharkhand (Yojna Bhawan / Nepal House, Doranda, Ranchi)",
      nodalCity: "Ranchi, Jharkhand",
      homeDeptName: "Home, Prison & Disaster Management Department, Project Building, Dhurwa, Ranchi",
      majorUniversities:
        "Ranchi University, Birla Institute of Technology (BIT Mesra), Kolhan University Chaibasa, Vinoba Bhave University (VBU Hazaribagh), Sido Kanhu Murmu University (Dumka), Jharkhand University of Technology (JUT)",
      hrdTimeline: "10–18 working days",
      sdmAlternativeNote:
        "We coordinate both Ranchi State HRD verification and the 2–3 working day Delhi SDM + MEA fast-track route with courier pickup from Ranchi and Jamshedpur.",
    };
  }

  if (key.includes("raipur") || key.includes("chhattisgarh")) {
    return {
      stateLabel: "Chhattisgarh (Nawa Raipur Higher Education HRD)",
      hrdAuthorityName:
        "Directorate of Higher Education, Block-3, Indravati Bhawan (Nawa Raipur, Atal Nagar)",
      nodalCity: "Raipur / Nawa Raipur, Chhattisgarh",
      homeDeptName: "Home Department, Mahanadi Bhawan (Mantralaya, Nawa Raipur)",
      majorUniversities:
        "Pt. Ravishankar Shukla University (PRSU Raipur), Chhattisgarh Swami Vivekanand Technical University (CSVTU Bhilai), Bilaspur University (ABVV), Guru Ghasidas Vishwavidyalaya (GGU Bilaspur), ITM University Raipur",
      hrdTimeline: "8–16 working days",
      sdmAlternativeNote:
        "We support both Nawa Raipur State HRD authentication and the 2–3 working day Delhi SDM + MEA route with doorstep pickup in Raipur and Bhilai.",
    };
  }

  if (key.includes("delhi")) {
    return {
      stateLabel: "Delhi NCR (NCT of Delhi Higher Education HRD & SDM)",
      hrdAuthorityName:
        "Directorate of Higher Education, Govt. of NCT of Delhi (Muni Maya Ram Marg, Pitampura) & Delhi SDM Office",
      nodalCity: "New Delhi",
      homeDeptName: "Home Department / SDM (NCT of Delhi)",
      majorUniversities:
        "University of Delhi (DU), Jawaharlal Nehru University (JNU), Jamia Millia Islamia (JMI), GGSIPU (IP University), DTU, NSUT, Ambedkar University Delhi (AUD), NIFT Delhi, IGNOU, Jamia Hamdard, AIIMS",
      hrdTimeline: "5–10 working days (Delhi HRD) or 2–3 working days (Delhi SDM)",
      sdmAlternativeNote:
        "With our main coordination desk in Connaught Place, New Delhi, we provide same-day pickup across Delhi NCR for both Delhi HRD and 2–3 day SDM + MEA routes.",
    };
  }

  return {
    stateLabel: `${cityName} State Higher Education (HRD) & SDM Desk`,
    hrdAuthorityName: `State Department of Higher Education (HRD Secretariat) covering ${cityName}`,
    nodalCity: cityName,
    homeDeptName: `State Home Department / General Administration Department (GAD) — ${cityName}`,
    majorUniversities: `All UGC/AICTE recognized State, Central, and Private Universities in ${cityName}`,
    hrdTimeline: "7–15 working days (State HRD) or 2–3 working days (Delhi SDM)",
    sdmAlternativeNote: `We coordinate both authentic State HRD verification for ${cityName} degrees and the fast-track 2–3 working day Delhi SDM + MEA route.`,
  };
}

export function buildCityFaqs(cityName: string): FAQItem[] {
  const isDelhi = cityName.toLowerCase().includes("delhi");
  const hrdProfile = getStateHrdAuthorityProfile(cityName);

  if (isDelhi) {
    return [
      {
        question: "What is the difference between Delhi SDM and State HRD attestation?",
        answer:
          "The Delhi SDM route is a fast-track verification done in Delhi, accepted by most Hague countries. State HRD is done by the education department of the state where your university is located, and is only required if your destination specifically demands it. We check your checklist first.",
      },
      {
        question: "Can I get a Delhi University (DU) degree apostilled?",
        answer:
          "Yes. DU degrees can usually be processed via the Delhi SDM route, followed by MEA Apostille. We handle the pickup and submission.",
      },
      {
        question: "Do you provide pickup in Gurugram or Noida?",
        answer:
          "Yes. We serve the entire Delhi NCR region. We arrange courier pickup from your address and deliver the attested documents back to you.",
      },
      {
        question: "Do I need to travel to Delhi for attestation?",
        answer:
          "No. Whether you are in South Delhi, Dwarka, Noida, or Gurugram, you don't need to visit the MEA or SDM office yourself. We coordinate the entire process from our Connaught Place desk.",
      },
      {
        question: "How long does courier pickup and delivery take in Delhi NCR?",
        answer:
          "Same-day or next-day secure document pickup is available across Delhi, Gurugram, and Noida with tracking receipts.",
      },
      {
        question: `Are you a government office in Delhi?`,
        answer:
          "No, we are an independent private document assistance agency based in Connaught Place, New Delhi, providing coordination, submission, and logistics support.",
      },
      {
        question: `Can you attest Birth and Marriage certificates issued in Delhi?`,
        answer:
          "Yes. Personal certificates issued by MCD, NDMC, or Delhi Sub-Registrar are authenticated via Delhi SDM or Delhi Home Department, followed by MEA Apostille and Embassy legalization.",
      },
    ];
  }

  return [
    {
      question: "Do I need to travel to Delhi for attestation?",
      answer: `No. You can send us your documents via courier from ${cityName}. We process them in New Delhi and courier them back to you securely.`,
    },
    {
      question: "How long does courier pickup and delivery take?",
      answer:
        "Courier transit usually takes 2-4 business days each way, depending on the city. We provide tracking details.",
    },
    {
      question: `Are you a government office in ${cityName}?`,
      answer: `No, we are a private assistance agency based in Delhi, providing coordination and logistics support for clients in ${cityName}.`,
    },
    {
      question: `How does HRD attestation service in ${cityName} work for degree certificates?`,
      answer: `For degrees issued in ${cityName} (${hrdProfile.majorUniversities}), State HRD verification is conducted through the ${hrdProfile.hrdAuthorityName}, followed by MEA Apostille or Embassy attestation in New Delhi. You can share your degree scan on WhatsApp so we can confirm whether your target country requires ${cityName} State HRD or accepts the 2–3 working day Delhi SDM route.`,
    },
    {
      question: `When is State HRD in ${cityName} mandatory vs. the 2–3 day Delhi SDM route?`,
      answer: `State HRD from ${hrdProfile.nodalCity} is mandatory for Saudi Arabia Cultural Mission (SACM), Kuwait Embassy, and specific European universities (such as certain Italian DOV or German programs) that explicitly demand State Education Secretariat authentication. For most USA, UK, European Apostille, and UAE/Qatar/Oman work visas, the 2–3 working day Delhi SDM + MEA route is legally accepted.`,
    },
    {
      question: `Can you attest Birth and Marriage certificates issued in ${cityName}?`,
      answer: `Yes. Personal documents (Birth Certificate, Marriage Certificate, Death Certificate, PCC) issued in ${cityName} can be authenticated either via the ${hrdProfile.homeDeptName} or through our fast-track 2–3 working day Delhi SDM + MEA Apostille / Embassy attestation route.`,
    },
  ];
}

export function buildCityFaqSchema(cityName: string) {
  const faqs = buildCityFaqs(cityName);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

interface CityDocRouteDetail {
  id: string;
  tabLabel: string;
  iconType: "degree" | "birth" | "marriage" | "commercial" | "pcc";
  badge: string;
  h3Title: string;
  issuingBodies: string;
  primaryPathTitle: string;
  primaryPathDesc: string;
  processingTime: string;
  officialFee: string;
  steps: string[];
  scanCheckItems: string;
  whatsappMessage: string;
}

export function getCityDocumentCheckOptions(
  cityName: string,
  hrdProfile: StateHrdAuthorityProfile
): CityDocRouteDetail[] {
  const isDelhi = cityName.toLowerCase().includes("delhi");

  if (isDelhi) {
    return [
      {
        id: "degree",
        tabLabel: "Degree & Education",
        iconType: "degree",
        badge: "Fast-Track Available",
        h3Title: "Educational Degrees & Academic Transcripts",
        issuingBodies:
          "DU (Delhi University), JNU, Guru Gobind Singh IPU, DTU, NSUT, Jamia Millia, IGNOU, AIIMS",
        primaryPathTitle: "Delhi SDM Route (2–3 Days Fast-Track) OR State HRD (5–10 Days)",
        primaryPathDesc:
          "For most Hague Apostille destinations (USA, UK, Australia, Germany, France), Delhi SDM attestation is accepted and completes in 2–3 days. If your overseas institution strictly asks for State Department authentication, we coordinate with the state HRD.",
        processingTime: "2 to 3 Working Days (SDM) | 5–10 Days (HRD)",
        officialFee: "₹50 per MEA Apostille sticker",
        steps: [
          "Notary Public Verification in New Delhi",
          "Sub-Divisional Magistrate (SDM) / State HRD Authentication",
          "Ministry of External Affairs (MEA) Apostille Stamping",
          "Embassy Legalization (for Non-Hague countries like UAE, Saudi, Qatar)",
        ],
        scanCheckItems:
          "Original Degree Certificate scan + Passport copy (Front & Back). No physical handover required for initial review.",
        whatsappMessage:
          "Hi Fatima Global, I need Delhi SDM / MEA Apostille route verification for my Degree Certificate from Delhi. Please share the timeline and quotation.",
      },
      {
        id: "birth",
        tabLabel: "Birth Certificate",
        iconType: "birth",
        badge: "MCD / NDMC",
        h3Title: "Birth Certificates (MCD & Delhi Registrar)",
        issuingBodies:
          "MCD (Municipal Corporation of Delhi - North/South/East), NDMC, Delhi Cantonment Board, Sub-Registrar Office",
        primaryPathTitle: "Delhi SDM Route → MEA Apostille / Embassy Legalization",
        primaryPathDesc:
          "Municipal birth certificates issued in Delhi are authenticated by the Sub-Divisional Magistrate (SDM) followed by the Ministry of External Affairs (MEA) Apostille for visa, PR, or family reunion abroad.",
        processingTime: "2 to 3 Working Days",
        officialFee: "₹50 per MEA Apostille sticker",
        steps: [
          "Notary Public Endorsement in New Delhi",
          "Sub-Divisional Magistrate (SDM) Delhi Authentication",
          "Ministry of External Affairs (MEA) Apostille (CPV Division)",
          "Certified Language Translation (if destination is non-English)",
        ],
        scanCheckItems:
          "Original MCD Birth Certificate / Digital QR certificate + Child & Parents' Passport copies.",
        whatsappMessage:
          "Hi Fatima Global, I need MEA Apostille assistance for my MCD Delhi Birth Certificate. Please guide me on procedure.",
      },
      {
        id: "marriage",
        tabLabel: "Marriage Certificate",
        iconType: "marriage",
        badge: "Delhi SDM / Court",
        h3Title: "Marriage Certificates (Delhi Registrar & SDM Court)",
        issuingBodies:
          "Delhi Marriage Registrar, Sub-Divisional Magistrate (Revenue Department), Delhi Govt E-District",
        primaryPathTitle: "Delhi SDM Route → MEA Apostille / Embassy Legalization",
        primaryPathDesc:
          "Required for spouse visa, dependent immigration, and overseas family sponsorship. Authenticated by SDM Delhi and stamped with MEA Apostille or Embassy legalization.",
        processingTime: "2 to 3 Working Days",
        officialFee: "₹50 per MEA Apostille sticker",
        steps: [
          "Notary Public Attestation",
          "Sub-Divisional Magistrate (SDM) Attestation in Delhi",
          "Ministry of External Affairs (MEA) Apostille / Normal Attestation",
          "Consular Legalization at UAE / Saudi Embassy (for Gulf visas)",
        ],
        scanCheckItems:
          "Original Marriage Certificate + Passport copies of both Husband and Wife.",
        whatsappMessage:
          "Hi Fatima Global, I need MEA Apostille / Embassy Attestation for my Delhi Marriage Certificate for a spouse visa.",
      },
      {
        id: "commercial",
        tabLabel: "Commercial & Business",
        iconType: "commercial",
        badge: "Export & Trade",
        h3Title: "Commercial Invoices, Packing Lists & POA",
        issuingBodies:
          "Delhi Chamber of Commerce, FICCI, ASSOCHAM, PHD Chamber, MCA Registrars",
        primaryPathTitle: "Chamber of Commerce (Delhi) → MEA Commercial Legalization",
        primaryPathDesc:
          "For export shipments, international branch registration, tenders, and business contracts. Verified by an authorized Delhi Chamber of Commerce followed by MEA CPV Division.",
        processingTime: "2 to 4 Working Days",
        officialFee: "Official MEA and Embassy commercial rates applicable",
        steps: [
          "Authorized Chamber of Commerce Attestation in New Delhi",
          "Ministry of External Affairs (MEA) Commercial Attestation",
          "Foreign Embassy Consular Legalization (UAE, Qatar, Kuwait, etc.)",
        ],
        scanCheckItems:
          "Signed documents on company letterhead + Director KYC / IEC copy.",
        whatsappMessage:
          "Hi Fatima Global, I need commercial document attestation from the Delhi Chamber of Commerce and MEA for business.",
      },
      {
        id: "pcc",
        tabLabel: "PCC / Police Clearance",
        iconType: "pcc",
        badge: "Immigration / Visas",
        h3Title: "Police Clearance Certificate (PSK / Delhi Police)",
        issuingBodies:
          "Passport Seva Kendra (PSK Delhi) or Delhi Police Special Branch PCC",
        primaryPathTitle: "Direct MEA Apostille (PSK) OR Delhi SDM Route (Local Police)",
        primaryPathDesc:
          "Police Clearance Certificates issued by Passport Seva Kendra are processed directly with the MEA. Local Delhi Police PCCs are routed via SDM verification followed by MEA Apostille.",
        processingTime: "1 to 2 Working Days (PSK PCC) | 2 to 3 Days (Delhi Police)",
        officialFee: "₹50 per MEA Apostille sticker",
        steps: [
          "Passport Seva Kendra / Local Police PCC Verification",
          "Sub-Divisional Magistrate (SDM) if local police certificate",
          "Ministry of External Affairs (MEA) Apostille Stamp",
          "Certified Translation if destination country is non-English",
        ],
        scanCheckItems:
          "Original PCC certificate + Applicant Passport copy.",
        whatsappMessage:
          "Hi Fatima Global, I need MEA Apostille for my Police Clearance Certificate (PCC) in Delhi for visa purposes.",
      },
    ];
  }

  // Non-Delhi: Tailored to that State / City
  return [
    {
      id: "degree",
      tabLabel: "Degree & Education",
      iconType: "degree",
      badge: "State HRD or SDM",
      h3Title: `Educational Degrees & Transcripts (${cityName})`,
      issuingBodies: hrdProfile.majorUniversities,
      primaryPathTitle: `${hrdProfile.stateLabel} HRD OR Delhi SDM (2–3 Days Fast-Track)`,
      primaryPathDesc: `For most Hague Apostille countries (USA, UK, Australia, Germany, France), Delhi SDM attestation is accepted and completes in 2–3 days. If your overseas institution strictly asks for state education verification, we coordinate directly with ${hrdProfile.hrdAuthorityName}.`,
      processingTime: `2 to 3 Working Days (SDM) | ${hrdProfile.hrdTimeline}`,
      officialFee: "₹50 per MEA Apostille sticker",
      steps: [
        `Doorstep Courier Pickup from ${cityName}`,
        `State HRD (${hrdProfile.nodalCity}) OR Delhi SDM Verification`,
        `Ministry of External Affairs (MEA) Apostille Stamping`,
        `Tracked Courier Delivery back to ${cityName}`,
      ],
      scanCheckItems:
        "Degree Certificate / Marksheet scan + Passport copy (Front & Back). Free review before courier dispatch.",
      whatsappMessage: `Hi Fatima Global, I need Apostille / Attestation for my Degree from ${cityName} (${hrdProfile.stateLabel}). Please share the fastest route and quote.`,
    },
    {
      id: "birth",
      tabLabel: "Birth Certificate",
      iconType: "birth",
      badge: "Municipal / Health Dept",
      h3Title: `Birth Certificates (${cityName} & State Registrar)`,
      issuingBodies: `Municipal Corporation / Health Department of ${cityName} or State Registrar of Births & Deaths`,
      primaryPathTitle: "Sub-Divisional Magistrate (SDM) / State Home Dept → MEA Apostille",
      primaryPathDesc: `Birth certificates issued in ${cityName} are authenticated via Sub-Divisional Magistrate (SDM) or State Home Department followed by Ministry of External Affairs (MEA) Apostille or Embassy Legalization for visas and PR abroad.`,
      processingTime: "2 to 3 Working Days",
      officialFee: "₹50 per MEA Apostille sticker",
      steps: [
        `Courier Pickup from your address in ${cityName}`,
        `SDM / State Home Department Verification in New Delhi`,
        `Ministry of External Affairs (MEA) Apostille (CPV Division)`,
        `Tracked Courier Return to ${cityName}`,
      ],
      scanCheckItems:
        `Original ${cityName} Birth Certificate scan + Child & Parents' Passport copies.`,
      whatsappMessage: `Hi Fatima Global, I need MEA Apostille / Embassy Attestation for my Birth Certificate from ${cityName}. Please guide me on procedure.`,
    },
    {
      id: "marriage",
      tabLabel: "Marriage Certificate",
      iconType: "marriage",
      badge: "State Registrar / Court",
      h3Title: `Marriage Certificates (${cityName} Registrar & Court)`,
      issuingBodies: `Sub-Registrar / Marriage Officer in ${cityName}, State Revenue Department, or State E-District Portal`,
      primaryPathTitle: "SDM / State Home Dept → MEA Apostille & Embassy Legalization",
      primaryPathDesc: `Required for spouse visa, dependent immigration, and overseas family sponsorship. Authenticated by SDM or State Home Department and stamped with MEA Apostille or Embassy Legalization.`,
      processingTime: "2 to 3 Working Days",
      officialFee: "₹50 per MEA Apostille sticker",
      steps: [
        `Courier Pickup from your address in ${cityName}`,
        `SDM / State Home Dept Attestation in New Delhi`,
        `Ministry of External Affairs (MEA) Apostille / Normal Attestation`,
        `Consular Legalization at UAE / Saudi Embassy (for Gulf visas)`,
      ],
      scanCheckItems:
        "Original Marriage Certificate scan + Husband and Wife Passport copies.",
      whatsappMessage: `Hi Fatima Global, I need MEA Apostille / Embassy Attestation for my Marriage Certificate from ${cityName} for a spouse visa.`,
    },
    {
      id: "commercial",
      tabLabel: "Commercial & Business",
      iconType: "commercial",
      badge: "Export & Trade",
      h3Title: `Commercial Invoices, Packing Lists & POA (${cityName})`,
      issuingBodies: `State / City Chamber of Commerce in ${cityName}, FICCI, ASSOCHAM, PHD Chamber, MCA Registrars`,
      primaryPathTitle: "Chamber of Commerce → MEA Commercial Legalization",
      primaryPathDesc: `For export shipments, international branch registration, tenders, and business contracts. Verified by an authorized Chamber of Commerce followed by MEA CPV Division.`,
      processingTime: "2 to 4 Working Days",
      officialFee: "Official MEA and Embassy commercial rates applicable",
      steps: [
        `Courier Pickup / Scan review from ${cityName}`,
        `Chamber of Commerce Attestation in New Delhi`,
        `Ministry of External Affairs (MEA) Commercial Attestation`,
        `Foreign Embassy Legalization (UAE, Qatar, Kuwait, etc.)`,
      ],
      scanCheckItems:
        "Signed documents on company letterhead + Director KYC / IEC copy.",
      whatsappMessage: `Hi Fatima Global, I need commercial document attestation from the Chamber of Commerce and MEA for business in ${cityName}.`,
    },
    {
      id: "pcc",
      tabLabel: "PCC / Police Clearance",
      iconType: "pcc",
      badge: "Immigration / Visas",
      h3Title: `Police Clearance Certificate (PSK ${cityName} / Police)`,
      issuingBodies: `Passport Seva Kendra (PSK) in ${cityName} or State Police Commissionerate / Special Branch PCC`,
      primaryPathTitle: "Direct MEA Apostille (PSK PCC) OR SDM Route (State Police)",
      primaryPathDesc: `Police Clearance Certificates issued by Passport Seva Kendra are processed directly with the MEA. Local Police PCCs are routed via SDM verification followed by MEA Apostille.`,
      processingTime: "1 to 2 Working Days (PSK PCC) | 2 to 3 Days (State Police)",
      officialFee: "₹50 per MEA Apostille sticker",
      steps: [
        `Courier Pickup from ${cityName}`,
        `Passport Seva Kendra / Local Police PCC Verification`,
        `Sub-Divisional Magistrate (SDM) if local police certificate`,
        `Ministry of External Affairs (MEA) Apostille Stamp`,
      ],
      scanCheckItems:
        "Original PCC certificate scan + Applicant Passport copy.",
      whatsappMessage: `Hi Fatima Global, I need MEA Apostille for my Police Clearance Certificate (PCC) in ${cityName} for visa purposes.`,
    },
  ];
}

export const CityLandingPage: React.FC<CityLandingPageProps> = ({
  cityName,
  slug,
  onNavigate,
}) => {
  const isDelhi =
    cityName.toLowerCase().includes("delhi") ||
    slug.includes("delhi") ||
    slug.endsWith("-delhi");

  const hrdProfile = getStateHrdAuthorityProfile(cityName);
  const cityFaqs = buildCityFaqs(cityName);
  const docCheckOptions = getCityDocumentCheckOptions(cityName, hrdProfile);

  const [selectedDocType, setSelectedDocType] = useState("degree");
  const activeDoc =
    docCheckOptions.find((opt) => opt.id === selectedDocType) ||
    docCheckOptions[0];

  const delhiCustomWhatsappMsg =
    "Hi Fatima Global, I am from Delhi and need help with Apostille services.";
  const delhiWhatsappHref = getWhatsAppUrl(delhiCustomWhatsappMsg);
  const defaultWhatsappHref = getWhatsAppUrl(
    `Hi, I am from ${cityName}. I need help with attestation.`
  );
  const activeWhatsappHref = isDelhi ? delhiWhatsappHref : defaultWhatsappHref;

  useEffect(() => {
    applyRouteSEO(slug);
    const scriptId = "city-hrd-jsonld-schema";
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = scriptId;
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        buildCityFaqSchema(cityName),
        {
          "@type": "LocalBusiness",
          name: "Fatima Global Attestation",
          description:
            "Professional MEA Apostille, Delhi SDM, State HRD verification, and Embassy Legalization desk in New Delhi.",
          telephone: BUSINESS_CONFIG.displayPhone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Barakhamba Road, Connaught Place",
            addressLocality: "New Delhi",
            postalCode: "110001",
            addressCountry: "IN",
          },
          url: `https://fatimaglobalattestation.com${slug}`,
        },
        {
          "@type": "Service",
          name: isDelhi
            ? "Apostille & Attestation Services in Delhi NCR"
            : `HRD Attestation, MEA Apostille & Embassy Legalization Service in ${cityName}`,
          serviceType: isDelhi
            ? "Delhi SDM, State HRD Verification & MEA Apostille"
            : `State HRD Verification (${hrdProfile.nodalCity}), Delhi SDM & MEA Apostille`,
          provider: {
            "@type": "LocalBusiness",
            name: "Fatima Global Attestation",
            telephone: BUSINESS_CONFIG.displayPhone,
            address: {
              "@type": "PostalAddress",
              streetAddress: "Barakhamba Road, Connaught Place",
              addressLocality: "New Delhi",
              postalCode: "110001",
              addressCountry: "IN",
            },
          },
          areaServed: {
            "@type": "Place",
            name: isDelhi ? "Delhi NCR" : cityName,
          },
          description: isDelhi
            ? "Delhi SDM verification, State HRD coordination, MEA Apostille, and New Delhi Embassy Legalization with physical desk in Connaught Place."
            : `End-to-end State HRD attestation (${hrdProfile.hrdAuthorityName}), Home Department/GAD verification, 2-3 day Delhi SDM fast-track, MEA Apostille, and Embassy legalization for clients in ${cityName}.`,
        },
      ],
    });
    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [slug, cityName, isDelhi, hrdProfile.nodalCity, hrdProfile.hrdAuthorityName]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const cityServices = [
    {
      title: isDelhi ? "MEA Apostille for Hague" : "MEA Apostille",
      subtitle: isDelhi
        ? "For Hague countries like USA, UK, Germany."
        : "For Hague countries like USA, UK, Germany.",
      slug: "/services/apostille",
      icon: <Stamp className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      title: isDelhi ? "UAE & Saudi Embassy" : "UAE & Saudi Embassy Attestation",
      subtitle: isDelhi
        ? "For Gulf visas & consular legalization."
        : "For Gulf visas.",
      slug: "/countries/uae-mofa-attestation",
      icon: <Landmark className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      title: isDelhi ? "HRD/SDM Verification" : "HRD / SDM Verification",
      subtitle: isDelhi
        ? "For state-issued educational & personal documents."
        : "For state-issued documents.",
      slug: "/services/degree-certificate-apostille",
      icon: <FileCheck2 className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      title: isDelhi ? "Commercial Attestation" : "Commercial Document Attestation",
      subtitle: isDelhi
        ? "For export/import, trade invoices, and business POA."
        : "For export/import.",
      slug: "/services/commercial-document-attestation",
      icon: <Briefcase className="w-5 h-5 text-[#0F766E]" />,
    },
  ];

  const cityProcessSteps = [
    {
      step: 1,
      title: "Share Document Scans",
      description: "Via WhatsApp for initial check.",
      icon: <FileSearch className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      step: 2,
      title: "Secure Pickup",
      description: `We arrange a courier to pick up your original documents from ${cityName}.`,
      icon: <Truck className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      step: 3,
      title: "Processing in Delhi",
      description: "We handle State, MEA, and Embassy submissions.",
      icon: <ShieldCheck className="w-5 h-5 text-[#0F766E]" />,
    },
    {
      step: 4,
      title: `Delivery to ${cityName}`,
      description: "Your fully attested documents are couriered back to you.",
      icon: <PackageCheck className="w-5 h-5 text-[#0F766E]" />,
    },
  ];

  return (
    <div className="bg-[#F3F4F6] min-h-screen w-full max-w-full overflow-x-hidden pb-12 sm:pb-16">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-2.5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500"
            aria-label="Breadcrumb"
          >
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, "/")}
              className="hover:text-[#0A192F] transition-colors"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">Locations</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-[#0A192F] font-semibold">
              {isDelhi
                ? "Apostille & Attestation Services in Delhi NCR"
                : `Apostille & Attestation Agent in ${cityName}`}
            </span>
          </nav>
        </div>
      </div>

      {/* 1. Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0D2342] to-[#0E4858] text-white border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-5">
          {/* Badges: "PAN India Service", "Secure Courier", "MEA & Embassy Routes" + Desk badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/35 text-teal-200 text-xs font-bold">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>PAN India Service</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/35 text-teal-200 text-xs font-bold">
              <Truck className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{isDelhi ? "Same-Day CP Desk Pickup" : `Doorstep Courier in ${cityName}`}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/35 text-teal-200 text-xs font-bold">
              <Stamp className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>MEA &amp; Embassy Routes</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{isDelhi ? "Physical Office in Connaught Place" : "Coordinated via New Delhi CP Desk"}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold text-white font-display tracking-tight leading-tight">
            {isDelhi
              ? "Apostille & Attestation Services in Delhi NCR"
              : `Apostille & Attestation Services in ${cityName}`}
          </h1>

          {/* Trust Text for State / City */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-300 bg-teal-950/70 border border-teal-500/40 px-3 py-1.5 rounded-lg w-fit shadow-xs">
            <Building2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              {isDelhi
                ? "Physical Desk: Connaught Place, New Delhi | Serving Gurugram & Noida"
                : `State Coordination: ${hrdProfile.stateLabel} & New Delhi MEA Headquarters Desk`}
            </span>
          </div>

          <p className="text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed max-w-3xl">
            {isDelhi
              ? "Whether you are in South Delhi, Dwarka, or Gurugram NCR, you don't need to visit the MEA or SDM office yourself. We coordinate the entire process from our Connaught Place desk. Whether you need the fast-track Delhi SDM route (2-3 days) or the State HRD route (5-10 days), we check your university and destination country to choose the correct path."
              : `Whether you are in ${cityName}, its surrounding districts, or anywhere in ${hrdProfile.stateLabel}, you don't need to travel to New Delhi yourself. We coordinate the entire process—including ${hrdProfile.hrdAuthorityName} and Ministry of External Affairs (MEA) stamping—from our Connaught Place desk with secure doorstep courier pickup.`}
          </p>

          <div className="pt-1 space-y-2">
            <a
              href={activeWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>Get Free Scan Check on WhatsApp</span>
            </a>
            <p className="text-xs text-slate-300 font-medium">
              No payment required for initial review. ✓ Free scan review before payment. ✓ No hidden charges.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 space-y-6 sm:space-y-8">
        {/* 3. QUICK DOCUMENT CHECK — INSTANT ROUTING (For Every State & City) */}
        <section className="bg-white rounded-3xl border-2 border-teal-500/30 p-5 sm:p-7 shadow-xs space-y-4">
          <div className="space-y-2 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-extrabold uppercase tracking-wider border border-teal-200">
                <Stamp className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>{isDelhi ? "Delhi Local Route Checker" : `${cityName} Local Route Checker`}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                <Clock className="w-3 h-3 text-emerald-600" />
                <span>SDM Fast-Track: 2–3 Days</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              {isDelhi
                ? "Quick Document Check — Instant Delhi Routing"
                : `Quick Document Check — Instant ${cityName} Routing`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Tap your document category below to instantly verify whether your certificate qualifies for the fast-track <strong>Delhi SDM Route (2–3 Days)</strong> or requires <strong>{isDelhi ? "Delhi HRD (5–10 Days)" : hrdProfile.stateLabel}</strong>:
            </p>
          </div>

          {/* Document Selection - Thumb-Friendly Compact Pills */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <span>👉 Tap Document Type to View Route:</span>
              </span>
              <span className="text-[11px] font-semibold text-teal-700 hidden sm:inline">
                Instant Verification
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {docCheckOptions.map((opt) => {
                const isSelected = selectedDocType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedDocType(opt.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border shadow-2xs min-h-[42px] ${
                      isSelected
                        ? "bg-[#0A192F] text-white border-[#0A192F] ring-2 ring-teal-400/50 shadow-md scale-[1.02]"
                        : "bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-teal-500/20 text-teal-300"
                          : "bg-teal-50 text-[#0F766E]"
                      }`}
                    >
                      {opt.iconType === "degree" && <GraduationCap className="w-3.5 h-3.5" />}
                      {opt.iconType === "birth" && <FileText className="w-3.5 h-3.5" />}
                      {opt.iconType === "marriage" && <FileCheck2 className="w-3.5 h-3.5" />}
                      {opt.iconType === "commercial" && <Briefcase className="w-3.5 h-3.5" />}
                      {opt.iconType === "pcc" && <ShieldCheck className="w-3.5 h-3.5" />}
                    </span>
                    <span>{opt.tabLabel}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 ml-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Document Route Detail Card */}
          {activeDoc && (
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-teal-50/20 to-white border-2 border-teal-500/40 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F766E] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{isDelhi ? "Delhi Jurisdiction & Issuing Authorities" : `${cityName} / State Issuing Authorities`}</span>
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0A192F] font-display">
                    {activeDoc.h3Title}
                  </h3>
                  <p className="text-xs text-slate-600">
                    <strong>{isDelhi ? "Common Delhi Issuers:" : `Common ${cityName} Issuers:`}</strong> {activeDoc.issuingBodies}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-900 bg-emerald-100/90 border border-emerald-300 px-3 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{activeDoc.processingTime}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white border border-slate-300 px-2.5 py-1 rounded-lg">
                    <span>Govt Fee: {activeDoc.officialFee}</span>
                  </span>
                </div>
              </div>

              {/* Recommended Route Details */}
              <div className="p-4 rounded-xl bg-white border border-teal-300/80 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#0F766E]">
                  <Stamp className="w-4 h-4 text-[#0F766E] shrink-0" />
                  <span>{isDelhi ? "Recommended Delhi Pathway:" : `Recommended Pathway for ${cityName}:`} {activeDoc.primaryPathTitle}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {activeDoc.primaryPathDesc}
                </p>
              </div>

              {/* Step Sequence */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Official 4-Step Attestation Sequence:
                </span>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {activeDoc.steps.map((st, i) => (
                    <div
                      key={st}
                      className="p-2.5 sm:p-3 rounded-xl bg-white border border-slate-200 text-[11px] sm:text-xs text-slate-700 flex items-start gap-2 shadow-2xs"
                    >
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0A192F] text-white flex items-center justify-center font-extrabold text-[9px] sm:text-[10px] shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="font-semibold leading-snug break-normal hyphens-none">{st}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scan Requirements & Direct CTA */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 block flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                    <span>Required for Free WhatsApp Review:</span>
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {activeDoc.scanCheckItems}
                  </p>
                </div>
                <a
                  href={getWhatsAppUrl(activeDoc.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-all hover:scale-[1.01] whitespace-nowrap shrink-0"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
                  <span>Check Route on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* 5. Disclaimer Box (Important) */}
        <DisclaimerBox
          text={`Fatima Global Attestation is a private assistance agency. We are not a government department or embassy. We have a physical desk in Connaught Place, New Delhi, and serve ${cityName} via secure courier. Government fees and timelines apply.`}
        />

        {/* NEW SECTION: Embassy & MEA Routes via New Delhi Desk (For Every State & City) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              {isDelhi ? "New Delhi Direct Embassy & MEA Processing" : `New Delhi Direct Embassy & MEA Processing for ${cityName}`}
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              {isDelhi ? "Embassy & MEA Routes from Delhi" : `Embassy & MEA Routes for ${cityName} Documents`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                <Stamp className="w-3.5 h-3.5 text-[#0F766E]" />
                <span>Hague Convention Apostille</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                MEA Apostille for Hague Countries
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isDelhi
                  ? "For UK, USA, Australia, Germany. We handle SDM/HRD verification and MEA submission from our Delhi desk."
                  : `For UK, USA, Australia, Germany. We arrange doorstep courier pickup in ${cityName}, coordinate SDM/HRD verification and MEA submission at our Delhi desk, and return via tracked courier.`}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Landmark className="w-3.5 h-3.5 text-amber-700" />
                <span>Consular Legalization</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                Gulf Embassy Attestation
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isDelhi
                  ? "For UAE, Saudi, Qatar, Kuwait. We handle submission to the respective embassies located in New Delhi, followed by MOFA."
                  : `For UAE, Saudi, Qatar, Kuwait. We handle submission to the respective foreign embassies located in New Delhi on behalf of ${cityName} applicants, followed by MOFA.`}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Content Block 1: How We Help Clients in [City] */}
        <ContentCard title={`How We Help Clients in ${cityName}`}>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {isDelhi
              ? "Whether you are in South Delhi, Dwarka, or Gurugram NCR, you don't need to visit the MEA or SDM office yourself. We coordinate the entire process from our Connaught Place desk. Whether you need the fast-track Delhi SDM route (2-3 days) or the State HRD route (5-10 days), we check your university and destination country to choose the correct path."
              : `Whether you are in ${cityName}, its surrounding districts, or anywhere in ${hrdProfile.stateLabel}, you don't need to travel to New Delhi yourself. We coordinate the entire process—including ${hrdProfile.hrdAuthorityName} and Ministry of External Affairs (MEA) stamping—from our Connaught Place desk with secure doorstep courier pickup.`}
          </p>
        </ContentCard>

        {/* 1. DOCUMENT SAFETY JOURNEY (Unified 2x2 Mobile / 4x1 Desktop Grid matching Homepage) */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-7 shadow-xs relative overflow-hidden">
          <DocumentSafetyTrustSection
            onNavigate={onNavigate}
            isEmbedded={true}
            cityName={cityName}
            badgeText="100% Chain-of-Custody Guarantee • Physical CP Desk"
            heading="Is My Original Document Safe?"
            subheading={`We understand that degrees, marriage certificates, and vital records are irreplaceable personal assets. For ${cityName} applicants, our 4-step safety protocol guarantees zero risk before sending any originals.`}
          />
        </section>

        {/* SECTION: Routes Comparison: SDM vs. State HRD (For Every State & City) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Route Comparison &amp; Timelines
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              {isDelhi ? "Delhi Routes: SDM vs. State HRD" : `${cityName} Routes: Delhi SDM vs. State HRD`}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative p-5 rounded-xl bg-slate-50 border border-teal-300 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                  Delhi SDM Route (Fast-Track)
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-extrabold shadow-xs">
                  2-3 Days
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isDelhi
                  ? "Best for most Hague countries (UK, USA, Australia). Your degree is notarized and verified by the SDM in Delhi, then sent for MEA Apostille. Takes 2-3 working days. Accepted by most foreign employers."
                  : `Best for most Hague countries (UK, USA, Australia, Germany). Your degree is verified by the SDM in Delhi, then sent for MEA Apostille. Doorstep courier pickup arranged from ${cityName}. Takes 2-3 working days. Accepted by most foreign employers and universities.`}
              </p>
              <div className="pt-1">
                <a
                  href={activeWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-teal-800 transition-colors"
                >
                  <span>Check if your degree qualifies for this fast-track route on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base sm:text-lg font-bold text-[#0A192F] font-display">
                  State HRD Route — {isDelhi ? "Delhi HRD" : hrdProfile.nodalCity}
                </h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
                  {isDelhi ? "5-10 Days" : hrdProfile.hrdTimeline}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isDelhi
                  ? "Required if your destination specifically asks for state verification (e.g., some Saudi or European universities). We coordinate with the Education Department of the state where your university is located. Takes 5-10 working days."
                  : `Required if your destination specifically asks for state education department verification (e.g., some Saudi universities or European visa rules). We coordinate directly with ${hrdProfile.hrdAuthorityName}.`}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION: Top Documents We Process (2x2 on mobile, 4x1 on desktop) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-7 space-y-3.5 sm:space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Document Categories
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              {isDelhi ? "Top Documents We Process in Delhi" : `Top Documents We Process in ${cityName}`}
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            <div className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-teal-400/80 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors mb-2 sm:mb-2.5 shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] font-display leading-snug break-normal hyphens-none mb-1 sm:mb-1.5 group-hover:text-teal-900 transition-colors">
                  Degree Certificates
                </h3>
                <p className="text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                  {isDelhi ? "DU, JNU, IP University, DTU, NSUT" : hrdProfile.majorUniversities}
                </p>
              </div>
            </div>
            <div className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-teal-400/80 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors mb-2 sm:mb-2.5 shrink-0">
                  <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] font-display leading-snug break-normal hyphens-none mb-1 sm:mb-1.5 group-hover:text-teal-900 transition-colors">
                  Birth &amp; Marriage Certificates
                </h3>
                <p className="text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                  {isDelhi ? "Issued by MCD or Delhi Registrar" : `Issued by ${cityName} Municipal / Sub-Registrar`}
                </p>
              </div>
            </div>
            <div className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-teal-400/80 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors mb-2 sm:mb-2.5 shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] font-display leading-snug break-normal hyphens-none mb-1 sm:mb-1.5 group-hover:text-teal-900 transition-colors">
                  PCC (Police Clearance)
                </h3>
                <p className="text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                  {isDelhi ? "For immigration & overseas visas" : `Passport Seva Kendra & ${cityName} Police`}
                </p>
              </div>
            </div>
            <div className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-teal-400/80 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between group">
              <div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white transition-colors mb-2 sm:mb-2.5 shrink-0">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] font-display leading-snug break-normal hyphens-none mb-1 sm:mb-1.5 group-hover:text-teal-900 transition-colors">
                  Commercial Documents
                </h3>
                <p className="text-[10.5px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                  {isDelhi ? "Invoices, POA for export & business" : `Invoices, POA for ${cityName} exporters & businesses`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Authentication Proof & Specimens Gallery (From Homepage) */}
        <div id="delhi-specimens" className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs">
          <SampleEvidenceGallery />
        </div>

        {/* NEW SEO AUTHORITY SECTION: HRD Service & State Verification in [City/State] */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-2xs">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              State HRD, Home Dept (GAD) &amp; SDM Verification Guide
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              HRD Attestation Service in {cityName} — State Higher Education vs. Delhi SDM Route
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Searching for <strong>HRD service in {cityName}</strong> or degree certificate verification? Under Ministry of External Affairs (MEA) guidelines, educational and personal certificates issued in {cityName} must be authenticated at the State level before final MEA Apostille or Embassy Legalization.
            </p>
          </div>

          {/* Authority Metadata Banner */}
          <div className="rounded-xl bg-teal-50/70 border border-teal-200/80 p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0F766E]">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Designated State HRD Authority ({hrdProfile.nodalCity})</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#0A192F]">
                {hrdProfile.hrdAuthorityName}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Home Dept / Personal Docs:</strong> {hrdProfile.homeDeptName}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-[#0F766E]">
                <Building2 className="w-4 h-4 shrink-0" />
                <span>Major Universities Covered in {cityName}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {hrdProfile.majorUniversities}
              </p>
              <p className="text-[11px] font-semibold text-teal-900">
                Typical HRD Timeline: {hrdProfile.hrdTimeline}
              </p>
            </div>
          </div>

          {/* 3-Column Comparison: State HRD vs Delhi SDM Fast-Track vs Home Dept/GAD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded">
                  Route 1 • State HRD
                </span>
                <Clock className="w-4 h-4 text-[#0F766E]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                {cityName} State HRD + MEA Route
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authentic verification from {hrdProfile.hrdAuthorityName} after university registrar confirmation, followed by MEA stamp in New Delhi. Mandatory for Saudi Embassy (SACM), Kuwait, and select European universities.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-teal-300 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded">
                  Route 2 • 2–3 Days Fast-Track
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#0F766E]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                Delhi SDM + MEA Alternative
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {hrdProfile.sdmAlternativeNote}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-slate-700 bg-slate-200/80 px-2.5 py-0.5 rounded">
                  Route 3 • Personal Docs
                </span>
                <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0A192F] font-display">
                Home Dept / GAD ({cityName})
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                For Birth Certificates, Marriage Certificates, PCC, and Single Status Affidavits issued in {cityName}, we coordinate State Home Department/GAD or Delhi SDM + MEA Apostille &amp; Embassy legalization.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Content Block 2: Services Available in [City] (4 Cards) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              Available Authentication Pathways
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Services Available in {cityName}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {cityServices.map((card) => (
              <a
                key={card.title}
                href={card.slug}
                onClick={(e) => handleLinkClick(e, card.slug)}
                className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50 hover:bg-teal-50/50 border border-slate-200 hover:border-[#0F766E] transition-all flex flex-col justify-between gap-2.5 sm:gap-3 group"
              >
                <div className="space-y-1.5 sm:space-y-2.5">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white border border-teal-100 flex items-center justify-center shadow-2xs">
                    {card.icon}
                  </div>
                  <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] group-hover:text-[#0F766E] font-display leading-snug break-normal hyphens-none">
                    {card.title}
                  </h3>
                  <p className="text-[10px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                    {card.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#0F766E]">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </a>
            ))}
          </div>

          {isDelhi && (
            <div className="p-3.5 bg-teal-50 border border-teal-200/90 rounded-xl text-xs sm:text-sm text-teal-950 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
              <span>Note: For Delhi-issued documents, SDM verification is usually faster than State HRD.</span>
            </div>
          )}

          {/* Specialized Saudi Arabia & Gulf Attestation / Death Claim SEO Cross-Links for [City/State] */}
          <div className="mt-2 pt-3.5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
            <a
              href="/countries/saudi-arabia-attestation"
              onClick={(e) => handleLinkClick(e, "/countries/saudi-arabia-attestation")}
              className="p-3 sm:p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-50 border border-emerald-200/90 hover:border-emerald-500 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                  Saudi Arabia (KSA) Route • {cityName}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-emerald-900 mt-0.5 leading-snug">
                  Saudi Arabia Degree, Marriage &amp; Work Visa Attestation
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>

            <a
              href="/saudi-arabia-death-claim-assistance"
              onClick={(e) => handleLinkClick(e, "/saudi-arabia-death-claim-assistance")}
              className="p-3 sm:p-4 rounded-xl bg-teal-50/70 hover:bg-teal-50 border border-teal-200/90 hover:border-teal-500 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 block">
                  Humanitarian Family Support • {cityName}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-[#0A192F] group-hover:text-teal-900 mt-0.5 leading-snug">
                  Saudi Arabia Death Claim, Warisana &amp; Wakala Assistance
                </h3>
              </div>
              <ArrowRight className="w-4 h-4 text-teal-700 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </a>
          </div>
        </section>

        {/* 4. Content Block 3: Step-by-Step Process (4 Steps) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-7 space-y-3.5 sm:space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              How It Works
            </span>
            <h2 className="text-lg sm:text-2xl font-extrabold text-[#0A192F] font-display tracking-tight">
              Step-by-Step Process for {cityName}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
            {cityProcessSteps.map((item) => (
              <div
                key={item.step}
                className="p-3 min-[380px]:p-3.5 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2 sm:gap-2.5"
              >
                <div className="space-y-1.5 sm:space-y-2.5">
                  <div className="flex items-center justify-between gap-1.5">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white border border-teal-100 flex items-center justify-center shadow-2xs shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[9.5px] sm:text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="text-xs min-[380px]:text-[13px] sm:text-base font-bold text-[#0A192F] font-display leading-snug break-normal hyphens-none">
                    {item.title}
                  </h3>
                  <p className="text-[10px] min-[380px]:text-[11.5px] sm:text-xs text-slate-600 leading-relaxed break-normal hyphens-none">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. TRANSPARENT FEES INFO BOX (Placed near FAQs) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-teal-50/80 border border-teal-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2.5 text-teal-950 font-extrabold text-sm sm:text-base">
            <Landmark className="w-5 h-5 text-[#0F766E] shrink-0" />
            <span>Transparent Fee Breakdown — No Hidden Surcharges</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="font-bold text-slate-900">Government Fee:</strong> ₹50 per MEA Apostille.{" "}
            <strong className="font-bold text-slate-900">Our Service Fee:</strong> Depends on State HRD vs. Delhi SDM routing. We provide an exact, transparent quote before starting the process. No hidden charges.
          </p>
        </div>

        {/* 5. REAL PROOF HIGHLIGHT BANNER */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0A192F] to-[#0E4858] text-white border border-slate-700/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-teal-300">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Genuine Specimens &amp; Verification</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Want to see what a real MEA Apostille looks like?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Inspect genuine Ministry of External Affairs Apostille stickers, Delhi SDM stamps, and embassy attestation specimens with our interactive sample gallery.
            </p>
          </div>
          <a
            href="#delhi-specimens"
            onClick={(e) => {
              const el = document.getElementById("delhi-specimens");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                handleLinkClick(e, "/#samples");
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <span>View Reference Samples</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Why Choose Us Trust Pillars (From Homepage) */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-2xs">
          <WhyChooseUs onNavigate={onNavigate} cityName={cityName} />
        </div>

        {/* Direct Quote Request & Cost Calculator (From Homepage) */}
        <section id="delhi-quote" className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 shadow-2xs">
          <QuoteForm
            title={`Request an Attestation Assessment & Quote — ${isDelhi ? "Delhi NCR" : cityName}`}
            subtitle={`Provide your document details and destination country. Our Connaught Place team reviews official MEA/Embassy rules and provides a transparent fee estimate within hours.`}
            initialServiceSlug="/services/apostille"
          />
        </section>

        {/* 6. FAQs Section (Accordion component) */}
        <FAQAccordion
          title={`Frequently Asked Questions — ${cityName}`}
          subtitle={`Common questions about document pickup, State HRD verification, New Delhi processing, and courier delivery for clients in ${cityName}.`}
          items={cityFaqs}
        />

        {/* PAN India States & Cities Directory (Internal SEO Links) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F766E] block">
              PAN India Doorstep Courier Coverage
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0A192F] font-display tracking-tight">
              All States &amp; Cities We Serve Across India
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your state or city for dedicated MEA Apostille, State HRD/SDM, and Embassy attestation guidance:
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {PAN_INDIA_LOCATION_PAGES.map((locPage) => {
              const label = locPage.h1.replace(
                /^Apostille & Attestation Agent in\s+/i,
                ""
              );
              const isCurrent = locPage.slug === slug;
              return (
                <a
                  key={locPage.slug}
                  href={locPage.slug}
                  onClick={(e) => handleLinkClick(e, locPage.slug)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    isCurrent
                      ? "bg-[#0F766E] text-white border-[#0F766E]"
                      : "bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-[#0F766E] border-slate-200 hover:border-teal-300"
                  }`}
                >
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{label}</span>
                </a>
              );
            })}
          </div>
        </section>

        {/* 7. Call to Action (CTA) */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0A192F] via-[#0E2442] to-[#0D4A56] text-white p-6 sm:p-8 border border-teal-400/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <h2 className="text-lg sm:text-2xl font-extrabold text-white font-display">
              {isDelhi
                ? "Need Document Attestation or Apostille in Delhi NCR?"
                : `Need Document Attestation or Apostille in ${cityName}?`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              Share your document scans on WhatsApp for a pre-submission check,
              doorstep pickup coordination, and transparent timeline estimate.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5 w-full sm:w-auto">
            <a
              href={activeWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors shrink-0"
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>
                {isDelhi
                  ? "Check Your Delhi Route on WhatsApp"
                  : `Check Your ${cityName} Route on WhatsApp`}
              </span>
            </a>
            <p className="text-[11px] text-slate-300 text-center sm:text-right font-medium">
              We are a private assistance agency. Secure doorstep courier pickup &amp; tracked delivery in {isDelhi ? "Delhi NCR" : cityName}.
            </p>
          </div>
        </section>
      </main>

    </div>
  );
};
