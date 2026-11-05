import React from "react";
import { X, ShieldAlert, FileText, Lock, RefreshCcw } from "lucide-react";
import { BUSINESS_CONFIG } from "../config/business";

interface LegalModalProps {
  type: "privacy" | "terms" | "disclaimer" | "refund" | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {type === "disclaimer" && <ShieldAlert className="w-5 h-5 text-amber-600" />}
            {type === "privacy" && <Lock className="w-5 h-5 text-teal-600" />}
            {type === "terms" && <FileText className="w-5 h-5 text-slate-700" />}
            {type === "refund" && <RefreshCcw className="w-5 h-5 text-blue-600" />}
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              {type === "disclaimer" && "Regulatory Disclaimer"}
              {type === "privacy" && "Privacy Policy"}
              {type === "terms" && "Terms & Conditions"}
              {type === "refund" && "Refund & Cancellation Policy"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-600 space-y-4 leading-relaxed">
          {type === "disclaimer" && (
            <>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium text-xs leading-relaxed">
                {BUSINESS_CONFIG.disclaimer}
              </div>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                1. Independent Facilitation
              </h3>
              <p>
                FATIMA GLOBAL ATTESTATION is a private documentation support agency. We act solely as a consulting and logistical facilitator between our clients and relevant notarization bodies, Sub-Divisional Magistrates, Chambers of Commerce, MEA-designated outsourced centres, translation agencies, and foreign diplomatic missions.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                2. No Guarantee of Sovereign Decisions
              </h3>
              <p>
                We cannot guarantee approvals, as final authorization, stamping, and visa issuance are sovereign functions under the exclusive jurisdiction of the Government of India, designated state authorities, and foreign diplomatic missions.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                3. Variable Timelines & Fee Changes
              </h3>
              <p>
                Processing timelines provided are based on recent operational experience. Government departments and foreign embassies may alter submission criteria, holidays, fee structures, or verification durations without prior advisory.
              </p>
            </>
          )}

          {type === "privacy" && (
            <>
              <p>
                At <strong>FATIMA GLOBAL ATTESTATION</strong>, we treat the personal and commercial information of our clients with the highest degree of confidentiality and data security.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                1. Information We Collect
              </h3>
              <p>
                We only collect necessary client information—including name, telephone/WhatsApp number, email address, document category, and destination country—for the explicit purpose of preparing quotations, providing procedural guidance, and completing agreed-upon document authentication services.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                2. Handling of Sensitive Documents
              </h3>
              <p>
                Digital document scans received via email or WhatsApp are used exclusively for verification assessment and submission preparation. We do not sell, rent, or share customer identification documents with unauthorized third parties or commercial advertising brokers.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                3. Courier & Physical Logistics
              </h3>
              <p>
                Physical documents are dispatched only via recognized trackable courier services or handed over per verified client instructions.
              </p>
            </>
          )}

          {type === "terms" && (
            <>
              <p>
                By engaging <strong>FATIMA GLOBAL ATTESTATION</strong> for document guidance or processing assistance, you agree to the following terms:
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                1. Authenticity of Client Documents
              </h3>
              <p>
                The client affirms that all original documents and certificates provided are genuine, unaltered, and legally issued by the stated authorities. Fatima Global Attestation does not assist with or process fraudulent or fabricated documents under any circumstances.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                2. Procedural Quotations & Payments
              </h3>
              <p>
                Service quotations comprise private consultancy/facilitation charges as well as statutory government, magistrate, Chamber, or embassy fees. Any revision in official statutory tariffs mandated by authorities during processing must be settled by the client.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                3. Limitation of Liability
              </h3>
              <p>
                While we take every reasonable precaution during physical transit and handling, Fatima Global Attestation is not liable for administrative delays caused by government departments, diplomatic closures, postal disruptions, or force majeure events.
              </p>
            </>
          )}

          {type === "refund" && (
            <>
              <p>
                At <strong>FATIMA GLOBAL ATTESTATION</strong>, we operate with complete transparency regarding service tariffs, embassy fees, and administrative procedures.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                1. Order Cancellation Prior to Submission
              </h3>
              <p>
                Clients may request cancellation of their service request at any time before physical documents are formally lodged with the government department (Notary, SDM, HRD/GAD, MEA) or diplomatic embassy/consulate. In such cases:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>100% of any unspent statutory government or embassy consular fees will be refunded in full.</li>
                <li>Our facilitation service charge will be refunded minus any already incurred logistical or document-pickup/courier costs (if physical transit has occurred).</li>
              </ul>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                2. Non-Refundable Statutory Fees Post-Submission
              </h3>
              <p>
                Once an original certificate has been submitted and stamped/registered at a government portal (e.g. e-Sanad, MEA apostille counter) or lodged with a foreign embassy, official fees paid to government bodies and foreign missions become non-refundable and non-recoverable under sovereign regulations.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                3. Document Translation Orders
              </h3>
              <p>
                For certified translation requests, cancellations are accepted with a full refund prior to translation initiation. If translation work has commenced or certified translator stamps have been executed, a pro-rated fee corresponding to the translated pages will apply.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                4. Refund Processing Timelines
              </h3>
              <p>
                Approved refunds are processed back to the client's original payment method (bank account, UPI, or card) within <strong>5 to 7 business days</strong> following written cancellation confirmation.
              </p>
              <h3 className="text-sm font-bold text-slate-900 font-display">
                5. Assistance &amp; Queries
              </h3>
              <p>
                To request cancellation or resolve any billing query, please write to our support desk at <strong className="text-slate-900">{BUSINESS_CONFIG.email}</strong> or contact our official helpline at <strong className="text-slate-900">{BUSINESS_CONFIG.displayPhone}</strong>.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
