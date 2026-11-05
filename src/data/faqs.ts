/**
 * FATIMA GLOBAL ATTESTATION - General FAQs
 * Accurate, cautious answers explaining procedures, requirements, and compliance.
 */

export interface FAQItem {
  id: string;
  category: "General" | "Apostille & SDM" | "Commercial" | "Embassy & Translation" | "Process & Quotes";
  question: string;
  answer: string;
}

export const GENERAL_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "Apostille & SDM",
    question: "What is an apostille?",
    answer:
      "An Apostille is a standardized certificate issued under the 1961 Hague Apostille Convention. In India, it is affixed by the Ministry of External Affairs (MEA) in the form of a square sticker containing a unique registration number, date, and security features. An apostille verifies the authenticity of the signature, seal, or stamp on an Indian public document so that it is accepted in all member countries of the Hague Convention without needing bilateral embassy legalization.",
  },
  {
    id: "faq-2",
    category: "General",
    question: "What is the difference between apostille and attestation?",
    answer:
      "The primary distinction lies in the destination country: An Apostille is exclusively valid in countries that are signatories to the Hague Convention (e.g., USA, UK, Germany, France, Australia). In contrast, Document Attestation is a multi-tier authentication process (Notary → SDM/HRD → MEA → Destination Embassy) required for countries that have NOT signed the Hague Convention, such as the United Arab Emirates, Saudi Arabia, Kuwait, Qatar, and Egypt.",
  },
  {
    id: "faq-3",
    category: "Apostille & SDM",
    question: "When may SDM attestation be required?",
    answer:
      "Sub-Divisional Magistrate (SDM) attestation is a widely utilized administrative verification step in New Delhi for personal certificates (such as birth, marriage, and personal affidavits) and certain educational documents when state-level Home Department or HRD attestation is not feasible due to administrative delays or jurisdictional rules. The document is verified by an SDM before being submitted to the MEA for either an Apostille or MEA normal attestation.",
  },
  {
    id: "faq-4",
    category: "General",
    question: "What is e-Sanad?",
    answer:
      "e-Sanad is an electronic verification and attestation initiative launched by the Ministry of External Affairs, Government of India, integrated with DigiLocker and academic repositories. It allows paper and digital educational documents from onboarded universities and boards to undergo direct online verification before apostille or attestation. However, participation is limited to integrated institutions; paper documents from non-participating universities continue through conventional state/SDM routes.",
  },
  {
    id: "faq-5",
    category: "Commercial",
    question: "What documents may require Chamber of Commerce processing?",
    answer:
      "All commercial, export, financial, and trade-related documents must be authenticated by a recognized Chamber of Commerce (such as FICCI, ASSOCHAM, PHD Chamber, or affiliated bodies) before the MEA will accept them. This includes commercial invoices, certificates of origin, packing lists, corporate powers of attorney, board resolutions, distribution contracts, and articles of association.",
  },
  {
    id: "faq-6",
    category: "Embassy & Translation",
    question: "What is embassy legalization?",
    answer:
      "Embassy legalization is the final consular authentication performed by the diplomatic mission (Embassy or High Commission) of the destination country located in India. After an Indian document is attested by the Ministry of External Affairs (MEA), the destination embassy inspects the MEA stamp and affixes their official consular seal, authorizing the document for legal and administrative recognition in their home country.",
  },
  {
    id: "faq-7",
    category: "General",
    question: "Do requirements vary by destination country?",
    answer:
      "Yes, significantly. Authentication protocols, eligible preliminary verification pathways (State HRD vs. SDM), translation requirements (such as Arabic for Gulf nations or French/German for European states), and consular fees depend entirely on the destination country, the document category, and the specific foreign institution requesting it. We strongly recommend sharing your destination country before starting.",
  },
  {
    id: "faq-8",
    category: "Process & Quotes",
    question: "How can I request a quotation?",
    answer:
      "You can request a tailored quotation by filling out our Quote Request Form on the website or by sending a message on WhatsApp. Simply specify your document type, destination country, and intended purpose (e.g. employment, study, commercial export). We will review the requirements and share a transparent quotation outlining applicable facilitation fees and statutory government/consular charges.",
  },
  {
    id: "faq-9",
    category: "Process & Quotes",
    question: "What information should I provide before sending my documents?",
    answer:
      "Before sending original documents, please provide: 1) A clear scan or photo of the front and back of the document, 2) A copy of the passport biographical pages of the document holder, 3) The exact destination country and purpose, and 4) Any specific guidance given by your foreign employer, university, or embassy. This ensures we confirm the correct legal workflow before handling physical papers.",
  },
  {
    id: "faq-10",
    category: "Process & Quotes",
    question: "How can I check the applicable processing time?",
    answer:
      "Because processing times depend on third-party government departments, magistrate calendars, MEA workload, and individual embassy submission schedules, turnaround times cannot be guaranteed. However, we provide realistic estimates based on recent processing averages when you submit your enquiry.",
  },
  {
    id: "faq-11",
    category: "General",
    question: "Do I need to send the original document, or can I send a color copy?",
    answer:
      "It depends strictly on your destination country and the receiving authority.\n\n• For MEA Apostille (Hague countries like UK, USA) and Gulf Embassy attestations (UAE, Saudi Arabia), original documents are generally required.\n• For certain countries or specific visa processes, notarized color copies might be accepted.\n• Do NOT send physical documents via courier before confirming with our team. Please share a clear scan of your document on WhatsApp first, and we will confirm the exact requirement for your specific destination.",
  },
  {
    id: "faq-12",
    category: "Process & Quotes",
    question: "Is it safe to send my original documents via courier? What if they get lost?",
    answer:
      "We understand original certificates are irreplaceable. We strongly recommend using a reputable, insured courier service (like Blue Dart or DTDC) with tracking. Once received at our Connaught Place desk, your documents are stored securely. We provide a unique FGA Tracking ID so you know exactly where your document is at every stage.",
  },
  {
    id: "faq-13",
    category: "Apostille & SDM",
    question: "Can I submit my documents directly to the MEA myself?",
    answer:
      "No. As per official MEA guidelines, individuals cannot submit documents directly at the MEA counter. The collection and delivery of documents for attestation/apostille have been outsourced to authorized agencies. We act as your authorized coordinator to handle this submission for you.",
  },
  {
    id: "faq-14",
    category: "Process & Quotes",
    question: "What if my document is rejected by MEA or the Embassy?",
    answer:
      "We do a \"Pre-Submission Scan Check\" before you send originals. We check for common rejection reasons like laminated certificates, name mismatches, or unclear seals. If we spot an issue, we inform you immediately, saving you time and courier costs.",
  },
  {
    id: "faq-15",
    category: "Process & Quotes",
    question: "Are there any hidden charges after I send my documents?",
    answer:
      "No. We provide a transparent quote before starting. The MEA government fee is fixed at ₹50 per document. Our service charge covers the coordination, SDM/HRD routing, and logistics. There are no surprise fees.",
  },
  {
    id: "faq-16",
    category: "Apostille & SDM",
    question: "How do I verify that the Apostille sticker on my document is genuine?",
    answer:
      "Once the process is complete, you can verify the MEA Apostille sticker using the unique Document ID printed on it. We have provided a step-by-step guide on this page under \"Verify Government Apostille\" with the official e-Sanad portal link.",
  },
  {
    id: "faq-17",
    category: "Process & Quotes",
    question: "Why is my document stuck at HRD or Embassy for so many days?",
    answer:
      "Government processing times at State HRD and Embassies vary and are outside our direct control. However, your FGA Tracking ID will show you exactly which stage your document is at. You can also WhatsApp us for a specific update.",
  },
];
