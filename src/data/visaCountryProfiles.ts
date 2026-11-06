export interface CountryVisaSpec {
  countrySlug: string;
  countryName: string;
  isoCode: string;
  isHagueMember: boolean;
  specialTreatyNote?: string;
  primaryLanguage: string;
  translationPath: string;
  countryGuidePath: string;
  submissionChannel: string;
  studentVisaCode: string;
  workVisaCode: string;
  studentImportantRule: string;
  workImportantRule: string;
  studentAcademicRule: string;
  workAcademicRule: string;
  studentPersonalRule: string;
  workPersonalRule: string;
  studentFinancialRule: string;
  workFinancialRule: string;
  studentBadgeAcademic: string;
  workBadgeAcademic: string;
  studentBadgePersonal: string;
  workBadgePersonal: string;
  studentBadgeFinancial: string;
  workBadgeFinancial: string;
}

export const COUNTRY_VISA_SPECS: CountryVisaSpec[] = [
  {
    countrySlug: "italy",
    countryName: "Italy",
    isoCode: "IT",
    isHagueMember: true,
    primaryLanguage: "Italian",
    translationPath: "/translation/italian-translation",
    countryGuidePath: "/countries/italy",
    submissionChannel: "VFS Global India (Embassy of Italy / Consulates in Mumbai, Kolkata & Bengaluru)",
    studentVisaCode: "Type D National Study Visa · Universitaly, DOV & CIMEA",
    workVisaCode: "Type D Work Visa · Nulla Osta (Decreto Flussi) & EU Blue Card",
    studentImportantRule:
      "Italy is a Hague Convention member. Educational documents require State HRD attestation (SDM not accepted) and MEA Apostille, plus Italian translation.",
    workImportantRule:
      "Italy is a Hague Convention member. Work visa applicants require a valid Nulla Osta al Lavoro, while EU Blue Card degrees, PCCs, and family certificates require MEA Apostille and certified Italian translation.",
    studentAcademicRule:
      "Original Degree/Class 12 certificate & transcripts authenticated by the issuing State HRD (SDM is not accepted for Italian study visas), followed by MEA Apostille, certified Italian translation, and DOV or CIMEA comparability.",
    workAcademicRule:
      "Original university degree authenticated via State HRD + MEA Apostille + Certified Italian translation for EU Blue Card and regulated Italian professions (DOV/CIMEA).",
    studentPersonalRule:
      "Original Birth Certificate (mandatory when parents sponsor your studies) with MEA Apostille + Certified Italian translation, valid Passport, and Universitaly summary.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC) and Birth/Marriage Certificates (for family reunion) with MEA Apostille + Certified Italian translation.",
    studentFinancialRule:
      "Parental Sponsorship Affidavit (Notarized + SDM/Apostille), 6-month bank statements showing at least €534.41/month (~€6,413/year), ITRs, accommodation proof, and €30,000 medical insurance.",
    workFinancialRule:
      "Official Nulla Osta issued by Sportello Unico per l'Immigrazione, signed Italian employment contract, accommodation proof, and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "Requires State HRD + MEA Apostille + Italian Translation",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Italian Translation",
    studentBadgePersonal: "Requires MEA Apostille + Italian Translation",
    workBadgePersonal: "PCC & Civil Docs Need MEA Apostille + Italian Translation",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Notary + Apostille",
    workBadgeFinancial: "Nulla Osta + Notarized Affidavits (If Applicable)",
  },
  {
    countrySlug: "germany",
    countryName: "Germany",
    isoCode: "DE",
    isHagueMember: true,
    primaryLanguage: "German",
    translationPath: "/translation/german-translation",
    countryGuidePath: "/countries/germany",
    submissionChannel: "VFS Global India & Consular Services Portal (German Missions in India)",
    studentVisaCode: "National D Student Visa · APS India & Sperrkonto",
    workVisaCode: "Opportunity Card (Chancenkarte), EU Blue Card & Skilled Worker Visa",
    studentImportantRule:
      "Germany is a Hague Convention member. Indian students require a mandatory APS Certificate and Blocked Account (Sperrkonto of €992/month = €11,904/year), plus MEA Apostille on civil/enrollment documents.",
    workImportantRule:
      "Germany requires degree recognition (Anabin/ZAB) and may need MEA Apostille for certain documents.",
    studentAcademicRule:
      "Mandatory APS India Certificate, German University Admission Letter (Zulassungsbescheid), and original Degree/Class 12 mark sheets (MEA Apostille requested by universities for matriculation).",
    workAcademicRule:
      "Degree recognition via Anabin (H+ status) or ZAB Statement of Comparability. MEA Apostille + Certified German translation required for ZAB evaluation and regulated healthcare/engineering licenses.",
    studentPersonalRule:
      "Birth Certificate (mandatory for minors or parental proof) and Marriage Certificate (for spouse visa) with MEA Apostille + Certified German translation.",
    workPersonalRule:
      "Police Clearance Certificate (PCC), Marriage Certificate, and Child Birth Certificates with MEA Apostille + Certified German translation.",
    studentFinancialRule:
      "German Student Blocked Account (Sperrkonto of €11,904/year) or Formal Obligation (Verpflichtungserklärung), incoming health insurance, and Notarized Parental/Name Affidavits.",
    workFinancialRule:
      "For Opportunity Card: Sperrkonto (€1,091/month = €13,092/year) or Verpflichtungserklärung. For EU Blue Card/Work Visa: Signed German contract & Erklärung zum Beschäftigungsverhältnis.",
    studentBadgeAcademic: "APS India Mandatory · Apostille for Matriculation",
    workBadgeAcademic: "Anabin / ZAB Recognition · Apostille May Be Needed",
    studentBadgePersonal: "Requires MEA Apostille + German Translation",
    workBadgePersonal: "Requires MEA Apostille + German Translation",
    studentBadgeFinancial: "Sperrkonto (€992/mo) + Notarized Affidavits",
    workBadgeFinancial: "Sperrkonto (€1,091/mo) or German Work Contract",
  },
  {
    countrySlug: "israel",
    countryName: "Israel",
    isoCode: "IL",
    isHagueMember: true,
    primaryLanguage: "Hebrew",
    translationPath: "/translation/hebrew-translation",
    countryGuidePath: "/countries/israel",
    submissionChannel: "Israel Visa Application Centre (IVP / VFS India — New Delhi, Mumbai, Bengaluru)",
    studentVisaCode: "A/2 Student Visa · Recognized Israeli Academic Institution",
    workVisaCode: "B/1 Work Visa (Caregiver, Construction, Agriculture & Expert Visa)",
    studentImportantRule:
      "Israel is a Hague Convention member. Student Visa (A/2) applicants require an official admission letter, financial proof, and MEA Apostille on Birth Certificates, PCC, and educational credentials.",
    workImportantRule:
      "Israel is a Hague Convention member. For an Israel B/1 Work Visa, your RPO Police Clearance Certificate (PCC), Family Details Affidavit (on ₹100 stamp paper), and Marriage Certificate MUST carry an original MEA Apostille sticker, alongside medical clearance from an Embassy-approved clinic.",
    studentAcademicRule:
      "Official Letter of Acceptance from a recognized Israeli university/yeshiva, plus original Indian Degree/Diploma and Transcripts authenticated with an MEA Apostille sticker.",
    workAcademicRule:
      "Skill/Training Certificate, Caregiver/Nursing Diploma, or University Degree (for B/1 Expert Visa) verified via SDM/HRD and legalized with an MEA Hague Apostille sticker.",
    studentPersonalRule:
      "Original Birth Certificate (mandatory for minors/parental proof) and Police Clearance Certificate (PCC) with MEA Apostille sticker, plus valid Passport (minimum 1 year validity).",
    workPersonalRule:
      "Recent RPO/PSK Police Clearance Certificate (PCC) with mandatory MEA Apostille sticker, Family Details Self-Affidavit on ₹100 stamp paper with MEA Apostille, and Apostilled Marriage Certificate (if married).",
    studentFinancialRule:
      "Proof of full tuition payment/scholarship, 6-month bank statements, Parental Sponsorship Affidavit (Notarized + MEA Apostille), and Israeli health insurance.",
    workFinancialRule:
      "Ministry of Interior (PIBA) Work Permit approval, signed Israeli Employment Contract, and Medical Fitness Report (Chest X-Ray, HIV/AIDS, Hepatitis) from East West Medical Center (New Delhi) or V.M. Medical Centre (Mumbai).",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "PCC & Birth Certificate Need MEA Apostille",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Marriage Cert",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Notary + Apostille",
    workBadgeFinancial: "Family Affidavit Needs MEA Apostille + Approved Medical",
  },
  {
    countrySlug: "uk",
    countryName: "United Kingdom (UK)",
    isoCode: "GB",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/united-kingdom",
    submissionChannel: "VFS Global India (UK Visas and Immigration — UKVI)",
    studentVisaCode: "UK Student Visa (CAS Route) · UKVI & VFS India",
    workVisaCode: "UK Skilled Worker & Health and Care Worker Visa (CoS Route)",
    studentImportantRule:
      "The UK is a Hague Convention member. Applicants need a Confirmation of Acceptance for Studies (CAS), TB certificate from a UKVI-approved clinic, and certified English translation + MEA Apostille for regional or civil relationship certificates.",
    workImportantRule:
      "The UK is a Hague Convention member. Skilled Worker & Health Care applicants require a Certificate of Sponsorship (CoS), UK ENIC / regulator verification, criminal record certificate (PCC), and MEA Apostille on dependent Marriage/Birth certificates.",
    studentAcademicRule:
      "CAS Reference Number, original Degree/Class 12 certificates & mark sheets listed on CAS, ATAS certificate (for sensitive STEM subjects), and MEA Apostille if requested by UK professional bodies.",
    workAcademicRule:
      "Certificate of Sponsorship (CoS), Indian Degree Certificate (with UK ENIC comparability or NMC/GMC/HCPC healthcare registration), and MEA Apostille for employer background verification.",
    studentPersonalRule:
      "Original Birth Certificate (mandatory if using parent's bank statements for 28-day funds) with MEA Apostille, plus UKVI-approved Tuberculosis (TB) test certificate.",
    workPersonalRule:
      "PSK Police Clearance Certificate (mandatory for Health & Care, education, and social work roles), TB test certificate, and Marriage/Birth Certificates with MEA Apostille for dependent visas.",
    studentFinancialRule:
      "28-day bank statement or RBI-regulated education loan letter covering 1st-year tuition + living costs (£1,334/month in London or £1,023/month outside London), plus Parental Consent Letter.",
    workFinancialRule:
      "Approved CoS meeting minimum UKVI salary threshold, maintenance funds (£1,270 held for 28 days unless A-rated sponsor certifies maintenance on CoS), and IHS payment receipt.",
    studentBadgeAcademic: "CAS Documents · Apostille + Translation if Regional",
    workBadgeAcademic: "UK ENIC / NMC / GMC · MEA Apostille Recommended",
    studentBadgePersonal: "Birth Cert Needs Apostille (If Parents Sponsor)",
    workBadgePersonal: "PCC + Dependent Docs Need MEA Apostille",
    studentBadgeFinancial: "28-Day Bank Rule + Parental Consent Letter",
    workBadgeFinancial: "CoS Maintenance or 28-Day Bank Statement",
  },
  {
    countrySlug: "usa",
    countryName: "United States (USA)",
    isoCode: "US",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/usa",
    submissionChannel: "U.S. Embassy & Consulates in India (USTravelDocs / VAC Biometrics & Consular Interview)",
    studentVisaCode: "F-1 Academic & M-1 Vocational Student Visa · Form I-20 & SEVIS",
    workVisaCode: "H-1B Specialty Occupation, L-1 Intracompany & O-1 Work Visas · Form I-797",
    studentImportantRule:
      "The USA is a Hague Convention member. While US Visa interviews focus on Form I-20, SEVIS I-901, and financial liquidity, US universities and credential evaluators (WES/ECE) require verified transcripts and MEA Apostille + certified English translation on regional/civil documents.",
    workImportantRule:
      "The USA is a Hague Convention member. H-1B and L-1 applicants require Form I-797 Notice of Action, degree equivalency (NACES/WES), and MEA Apostille on Marriage/Birth certificates for H-4/L-2 dependent filings and green card (I-485) readiness.",
    studentAcademicRule:
      "Signed Form I-20 from SEVP-certified US school, SEVIS I-901 fee receipt, original Bachelor's/Class 12 transcripts, and MEA Apostille if required by your US university registrar.",
    workAcademicRule:
      "Original University Degree Certificate & Semester Transcripts (evaluated for US bachelor's equivalency), plus MEA Apostille for state licensing boards (USMLE, CGFNS/NCLEX, PE, CPA).",
    studentPersonalRule:
      "Valid Passport, DS-160 confirmation page, Birth Certificate with MEA Apostille (plus certified English translation if in a regional language), and F-2 dependent Marriage/Birth certificates.",
    workPersonalRule:
      "Original Marriage Certificate and Child Birth Certificates with MEA Apostille + Certified English translation (essential for H-4 / L-2 dependent visas and USCIS Adjustment of Status).",
    studentFinancialRule:
      "Sponsor Affidavit of Support (Form I-134 / Stamp Paper Affidavit), 6-month liquid bank statements, sanctioned education loan letter, and 3 years' Income Tax Returns (ITR).",
    workFinancialRule:
      "Approved Form I-797B/C Petition, Labor Condition Application (LCA - Form ETA-9035), US employer offer letter, client letter (if consulting), and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "Form I-20 + Sealed Transcripts / Apostille",
    workBadgeAcademic: "Degree + NACES Evaluation & MEA Apostille",
    studentBadgePersonal: "Birth / Dependent Docs Need MEA Apostille",
    workBadgePersonal: "H-4 / L-2 Civil Docs Need MEA Apostille",
    studentBadgeFinancial: "Affidavit of Support + Liquid Funds & ITR",
    workBadgeFinancial: "Form I-797 + LCA + Notarized Affidavits",
  },
  {
    countrySlug: "canada",
    countryName: "Canada",
    isoCode: "CA",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/canada",
    submissionChannel: "IRCC Online Portal & VFS Global India (Canada Visa Application Centre)",
    studentVisaCode: "Canada Study Permit · DLI LOA, PAL/TAL & GIC",
    workVisaCode: "LMIA Work Permit, Francophone Mobility & Global Talent Stream",
    studentImportantRule:
      "Canada joined the Hague Apostille Convention on January 11, 2024. Indian public documents requiring authentication for Canadian institutions or IRCC now receive an MEA Apostille sticker instead of consular legalization.",
    workImportantRule:
      "Canada is a Hague Convention member (since Jan 2024). Indian degrees (for WES/ECA), Police Clearance Certificates (PCC), and Marriage/Birth certificates require MEA Apostille and certified English or French translation.",
    studentAcademicRule:
      "Designated Learning Institution (DLI) Letter of Acceptance (LOA), Provincial/Territorial Attestation Letter (PAL/TAL), and original Indian Degree/Class 12 mark sheets (with MEA Apostille if requested).",
    workAcademicRule:
      "Educational Credential Assessment (ECA via WES/ICAS/IQAS) and original Indian Degree/Diploma legalized with an MEA Apostille sticker for Canadian licensing bodies.",
    studentPersonalRule:
      "Valid Passport, Upfront Immigration Medical Exam (IME), Birth Certificate (with MEA Apostille for minor/relationship proof), and certified English/French translation of non-English docs.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Marriage Certificate, and Birth Certificates with MEA Apostille + Certified English/French translation for spouse open work permit (SOWP).",
    studentFinancialRule:
      "Guaranteed Investment Certificate (GIC of CAD $20,635+), 1st-year tuition fee receipt, Parental Sponsorship Affidavit (Notarized + SDM/Apostille), and 6-month bank statements.",
    workFinancialRule:
      "Positive LMIA (Labour Market Impact Assessment) or LMIA-exempt Offer of Employment number, signed Canadian contract, experience letters, and Name Discrepancy Affidavit.",
    studentBadgeAcademic: "DLI LOA + PAL/TAL · MEA Apostille Supported",
    workBadgeAcademic: "WES ECA + MEA Apostille on Degree",
    studentBadgePersonal: "Requires MEA Apostille + English/French Translation",
    workBadgePersonal: "PCC & Spouse Docs Need MEA Apostille",
    studentBadgeFinancial: "GIC (CAD $20,635+) + Notarized Sponsorship Affidavit",
    workBadgeFinancial: "LMIA / Job Offer + Notarized Experience Affidavits",
  },
  {
    countrySlug: "uae",
    countryName: "United Arab Emirates (UAE)",
    isoCode: "AE",
    isHagueMember: false,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/uae-mofa-attestation",
    submissionChannel: "UAE Embassy New Delhi / Consulate Mumbai & UAE ICP / MOHRE / GDRFA Channels",
    studentVisaCode: "UAE Student Residence Visa · Dubai KHDA / Abu Dhabi ADEK University Sponsor",
    workVisaCode: "UAE Employment Visa, Green Visa & Golden Visa · MOHRE & MOFAIC",
    studentImportantRule:
      "The UAE is a Non-Hague country. An Apostille sticker is NOT valid for the UAE. Educational and personal documents require full Embassy legalization: State HRD/SDM → MEA Normal Attestation → UAE Embassy in India → UAE MOFAIC.",
    workImportantRule:
      "Non-Hague countries like the UAE require full Embassy legalization after MEA Attestation (State HRD/SDM → MEA New Delhi → UAE Embassy Legalization → UAE MOFAIC) for work permits, Golden Visas, and family sponsorship.",
    studentAcademicRule:
      "Original Degree Certificate or Class 12 Transfer/Mark Sheet attested via State HRD/SDM → MEA Normal Attestation → UAE Embassy in India → UAE MOFAIC (mandatory for Ministry of Education Equivalency).",
    workAcademicRule:
      "Original Degree or Diploma Certificate attested via State HRD/SDM → MEA Normal Attestation → UAE Embassy in New Delhi → UAE MOFAIC (mandatory for MOHRE managerial/skilled designations and Golden Visa).",
    studentPersonalRule:
      "Original Birth Certificate attested by SDM/Home → MEA → UAE Embassy → UAE MOFAIC, passport copy, and Emirates ID medical screening upon arrival.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates attested by SDM → MEA → UAE Embassy → UAE MOFAIC (mandatory for UAE family residence visa sponsorship).",
    studentFinancialRule:
      "University Offer Letter, Tuition Fee Receipt, Sponsor Bank Statements, and Notarized Parental Consent / Sponsorship Undertaking.",
    workFinancialRule:
      "MOHRE Offer Letter / Employment Entry Permit, Commercial Power of Attorney (Chamber/Notary → SDM → MEA → UAE Embassy), and Certified Arabic Translation for legal/court filings.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → UAE Embassy → MOFAIC",
    workBadgeAcademic: "Mandatory UAE Embassy + MOFAIC Attestation",
    studentBadgePersonal: "Requires MEA + UAE Embassy + MOFAIC",
    workBadgePersonal: "Family Visa Docs Need UAE Embassy + MOFAIC",
    studentBadgeFinancial: "Parental Undertaking Needs Notary + Embassy",
    workBadgeFinancial: "POA & Affidavits Need UAE Embassy + Arabic Translation",
  },
  {
    countrySlug: "saudi-arabia",
    countryName: "Saudi Arabia",
    isoCode: "SA",
    isHagueMember: true,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/saudi-arabia-attestation",
    submissionChannel: "Tasheer / VFS Global India & Royal Embassy of Saudi Arabia (New Delhi / Mumbai)",
    studentVisaCode: "Saudi Study Visa (Study in Saudi Platform) · Cultural Attaché & Apostille",
    workVisaCode: "Saudi Employment Visa (Qiwa / Enjaz / QVP) & Family Residence (Istiqdam)",
    studentImportantRule:
      "Saudi Arabia is a Hague Apostille member (since Dec 2022). Indian educational and personal certificates require State HRD/SDM authentication followed by an MEA Hague Apostille sticker and certified Arabic translation.",
    workImportantRule:
      "Saudi Arabia is a Hague Convention member. Employment visa applicants require State HRD/SDM + MEA Apostille on degrees (plus QVP / SCE / SCFHS verification for regulated professions) and GAMCA/Wafid medical clearance.",
    studentAcademicRule:
      "Original High School (Class 12) or Bachelor's Degree & Transcripts authenticated by State HRD/SDM + MEA Apostille + Certified Arabic Translation.",
    workAcademicRule:
      "Original Degree/Diploma authenticated via State HRD/SDM + MEA Hague Apostille (or Saudi Cultural Attaché/Embassy route where specifically mandated), plus QVP (Qualification Verification Program) registration.",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (PCC) with MEA Apostille + Certified Arabic translation, plus Wafid (GAMCA) medical fitness report.",
    workPersonalRule:
      "Police Clearance Certificate (PCC), Marriage Certificate, and Birth Certificates (for Istiqdam family residence visa) with MEA Apostille + Certified Arabic translation.",
    studentFinancialRule:
      "Official Saudi Ministry of Education Scholarship / Admission Grant, Parental Consent Affidavit (Notarized + Apostille), and bank statements.",
    workFinancialRule:
      "Saudi Visa Block / Enjaz E-Number, Qiwa Employment Contract, Wafid (GAMCA) Medical Report, and Wakala / Power of Attorney (with Arabic translation).",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Arabic Translation",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille + QVP Check",
    studentBadgePersonal: "PCC & Birth Cert Need MEA Apostille + Arabic",
    workBadgePersonal: "PCC & Family Docs Need MEA Apostille + Arabic",
    studentBadgeFinancial: "Affidavits Need Notary + MEA Apostille",
    workBadgeFinancial: "Enjaz / Wakala + Wafid Medical & Arabic Translation",
  },
  {
    countrySlug: "qatar",
    countryName: "Qatar",
    isoCode: "QA",
    isHagueMember: false,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/qatar",
    submissionChannel: "Qatar Visa Center (QVC India) & Embassy of the State of Qatar, New Delhi",
    studentVisaCode: "Qatar University / Education City Student Residence Permit",
    workVisaCode: "Qatar Employment Visa & Family Residence Permit · QVC & MOFA Doha",
    studentImportantRule:
      "Qatar is a Non-Hague country. Educational and personal documents require MEA Normal Attestation followed by Qatar Embassy legalization in New Delhi and MOFA attestation in Doha.",
    workImportantRule:
      "Qatar is a Non-Hague country. For Qatar Embassy degree attestation in New Delhi, you MUST submit 3 documents together: Original Degree Certificate, Final Year Marksheet, and an Original University Bonafide Certificate.",
    studentAcademicRule:
      "Original Degree or High School Certificate + Final Marksheet + Bonafide Certificate attested by State HRD/SDM → MEA New Delhi → Qatar Embassy → MOFA Qatar.",
    workAcademicRule:
      "Complete 3-document set (Original Degree + Final Year Marksheet + Original University Bonafide Certificate) attested via HRD/SDM → MEA → Qatar Embassy New Delhi → MOFA Doha.",
    studentPersonalRule:
      "Birth Certificate and Police Clearance Certificate (PCC) attested via SDM → MEA → Qatar Embassy → MOFA Qatar.",
    workPersonalRule:
      "Original Marriage Certificate, Children's Birth Certificates, and PSK Police Clearance Certificate (PCC) attested via SDM → MEA → Qatar Embassy → MOFA Doha.",
    studentFinancialRule:
      "Education City / Qatar University Admission & Scholarship Letter, Sponsor Bank Statements, and Notarized Sponsorship Undertaking.",
    workFinancialRule:
      "Qatar Ministry of Interior (MOI) Visa Approval, QVC India Biometrics & Medical Appointment, Employment Contract, and Arabic Translation where required.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Qatar Embassy → MOFA",
    workBadgeAcademic: "Degree + Marksheet + Bonafide → Qatar Embassy",
    studentBadgePersonal: "Requires MEA + Qatar Embassy + MOFA",
    workBadgePersonal: "PCC & Family Docs Need Qatar Embassy + MOFA",
    studentBadgeFinancial: "Sponsorship Docs Need Embassy Legalization",
    workBadgeFinancial: "QVC Medical/Biometrics + Attested Affidavits",
  },
  {
    countrySlug: "kuwait",
    countryName: "Kuwait",
    isoCode: "KW",
    isHagueMember: false,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/kuwait",
    submissionChannel: "Embassy of the State of Kuwait (New Delhi) / Consulate (Mumbai) & Outsourced Agencies",
    studentVisaCode: "Kuwait Student Visa · Academic Admission & Embassy Legalization",
    workVisaCode: "Kuwait Article 18 Work Visa & Article 22 Family Visa · PAM & MOFA Kuwait",
    studentImportantRule:
      "Kuwait is a Non-Hague country. All Indian educational and personal certificates must be legalized through State HRD/SDM, MEA New Delhi, the Embassy of Kuwait, and MOFA in Kuwait.",
    workImportantRule:
      "Kuwait is a Non-Hague country. Work Visa (Article 18) and Family Dependent Visa (Article 22) require State HRD/SDM → MEA Normal Attestation → Kuwait Embassy Legalization → MOFA Kuwait, plus an attested PCC and GAMCA/Wafid medical report.",
    studentAcademicRule:
      "Original Degree/School Certificates attested by State HRD/SDM → MEA Normal Attestation → Kuwait Embassy in India → MOFA Kuwait + Certified Arabic Translation.",
    workAcademicRule:
      "Original University Degree / Engineering or Healthcare Diploma attested via State HRD → MEA Normal Attestation → Kuwait Embassy (mandatory for Kuwait Society of Engineers / MOH licensing).",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) attested by MEA and the Embassy of Kuwait.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC - valid 3 months), Original Marriage Certificate, and Birth Certificates attested by SDM/Home → MEA → Kuwait Embassy → MOFA Kuwait.",
    studentFinancialRule:
      "Institutional Acceptance Letter, Financial Sponsorship Undertaking (Notarized + MEA + Kuwait Embassy), and GAMCA/Wafid Medical Report.",
    workFinancialRule:
      "Original Kuwait Visa Copy (No Objection Certificate / Work Permit issued by PAM), GAMCA/Wafid Medical Fitness Certificate, and Arabic Translation.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Kuwait Embassy",
    workBadgeAcademic: "Mandatory HRD → MEA → Kuwait Embassy → MOFA",
    studentBadgePersonal: "PCC & Birth Cert Need Kuwait Embassy Stamp",
    workBadgePersonal: "PCC & Marriage Cert Need Kuwait Embassy Stamp",
    studentBadgeFinancial: "Wafid Medical + Embassy Attested Affidavits",
    workBadgeFinancial: "PAM Work Permit + Wafid Medical + Arabic Translation",
  },
  {
    countrySlug: "oman",
    countryName: "Oman",
    isoCode: "OM",
    isHagueMember: true,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/oman",
    submissionChannel: "Royal Oman Police (ROP eVisa) & Embassy of the Sultanate of Oman, New Delhi",
    studentVisaCode: "Oman Student Visa · Ministry of Higher Education & ROP eVisa",
    workVisaCode: "Oman Employment Visa & Family Joining Visa · Ministry of Labour & ROP",
    studentImportantRule:
      "Oman is a member of the Hague Apostille Convention. Indian educational and personal documents intended for Oman require State HRD/SDM authentication followed by an MEA Hague Apostille sticker.",
    workImportantRule:
      "Oman is a Hague Convention member. Employment and Family Joining Visas require MEA Hague Apostille on Indian degrees, marriage certificates, and birth certificates, alongside a Wafid (GAMCA) medical fitness report.",
    studentAcademicRule:
      "Original Degree/Class 12 Certificate authenticated by SDM/State HRD and affixed with an MEA Hague Apostille sticker.",
    workAcademicRule:
      "Original Degree or Technical Diploma authenticated via SDM/State HRD + MEA Hague Apostille (plus Oman Medical Specialty Board / DataFlow verification for healthcare roles).",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (PCC) legalized with an MEA Hague Apostille sticker.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Hague Apostille sticker for Oman Family Joining Visas.",
    studentFinancialRule:
      "Oman Institutional Offer Letter, Sponsor Financial Proof, and Notarized Sponsorship Affidavit with MEA Apostille.",
    workFinancialRule:
      "ROP Employment Visa Clearance, Ministry of Labour Clearance, Wafid (GAMCA) Medical Fitness Report, and Arabic Translation (if required for legal filings).",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Hague Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Hague Apostille",
    studentBadgePersonal: "Requires MEA Hague Apostille",
    workBadgePersonal: "Family Visa Docs Need MEA Hague Apostille",
    studentBadgeFinancial: "Affidavits Need Notary + MEA Apostille",
    workBadgeFinancial: "ROP eVisa + Wafid Medical + Apostilled Docs",
  },
  {
    countrySlug: "bahrain",
    countryName: "Bahrain",
    isoCode: "BH",
    isHagueMember: true,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/bahrain",
    submissionChannel: "LMRA Bahrain Portal, Embassy of the Kingdom of Bahrain (New Delhi) & VFS India",
    studentVisaCode: "Bahrain Student Residence Permit · Higher Education Council (HEC)",
    workVisaCode: "Bahrain LMRA Work Visa & Dependent Residence Permit",
    studentImportantRule:
      "Bahrain is a member of the Hague Apostille Convention. Indian academic and civil certificates require State HRD/SDM verification followed by an MEA Hague Apostille sticker.",
    workImportantRule:
      "Bahrain is a Hague Convention member. LMRA Work Permits and family residence visas require MEA Hague Apostille on Indian degrees, PCC, marriage, and birth certificates, plus a Wafid (GAMCA) medical report.",
    studentAcademicRule:
      "Original Degree or High School Certificate authenticated via State HRD/SDM and affixed with an MEA Hague Apostille sticker for HEC Bahrain endorsement.",
    workAcademicRule:
      "Original Degree or Diploma Certificate legalized via SDM/HRD + MEA Hague Apostille for LMRA professional classification and NHRA healthcare licensing.",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (PCC) with MEA Hague Apostille.",
    workPersonalRule:
      "Original Marriage Certificate, Child Birth Certificates, and PSK Police Clearance Certificate (PCC) with MEA Hague Apostille.",
    studentFinancialRule:
      "University Admission Letter, Tuition Receipt, Sponsor Bank Statements, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "LMRA Employment Visa Approval, Signed Employment Contract, Wafid (GAMCA) Medical Report, and Certified Arabic Translation where requested.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Hague Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Hague Apostille",
    studentBadgePersonal: "Requires MEA Hague Apostille",
    workBadgePersonal: "PCC & Family Docs Need MEA Apostille",
    studentBadgeFinancial: "Notarized & Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "LMRA Permit + Wafid Medical + Apostille",
  },
  {
    countrySlug: "france",
    countryName: "France",
    isoCode: "FR",
    isHagueMember: true,
    primaryLanguage: "French",
    translationPath: "/translation/french-translation",
    countryGuidePath: "/countries/france",
    submissionChannel: "France-Visas Portal, Campus France India & VFS Global India",
    studentVisaCode: "VLS-TS Long-Stay Student Visa · Campus France (Études en France)",
    workVisaCode: "Passeport Talent (EU Blue Card), Salarié Work Permit & Family Visa",
    studentImportantRule:
      "France is a Hague Convention member. Indian students require Campus France (Études en France) validation, while Birth Certificates (mandatory for CAF housing subsidy in France) and non-English docs require MEA Apostille and certified French translation.",
    workImportantRule:
      "France is a Hague Convention member. Work Permit (DRIEETS) and Passeport Talent applicants require MEA Apostille and certified French translation on civil certificates (Birth, Marriage, PCC) and degrees.",
    studentAcademicRule:
      "Campus France NOC / EEF Academic Interview Completion Certificate, French University Acceptance Letter, and original Degree/Class 12 mark sheets (with MEA Apostille if requested for ENIC-NARIC France).",
    workAcademicRule:
      "Original Master's/Bachelor's Degree authenticated with SDM/HRD + MEA Apostille + Certified French Translation for Passeport Talent / EU Blue Card and regulated roles.",
    studentPersonalRule:
      "Original Birth Certificate with MEA Apostille + Certified French Translation (strictly required in France for CAF student housing allowance and CPAM registration).",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille + Certified French Translation.",
    studentFinancialRule:
      "Proof of minimum €615/month (€7,380/year) via blocked account/bank statements, Parental Sponsorship Affidavit (Notarized + Apostille), and 3-month France accommodation proof.",
    workFinancialRule:
      "DRIEETS Digital Work Authorization or Passeport Talent employer form, signed French employment contract, and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "Campus France NOC + MEA Apostille (If Requested)",
    workBadgeAcademic: "Requires MEA Apostille + French Translation",
    studentBadgePersonal: "Birth Cert Needs Apostille + French (For CAF)",
    workBadgePersonal: "PCC, Birth & Marriage Need Apostille + French",
    studentBadgeFinancial: "€615/mo Funds + Notarized Sponsorship Affidavit",
    workBadgeFinancial: "DRIEETS Work Permit + French Contract",
  },
  {
    countrySlug: "spain",
    countryName: "Spain",
    isoCode: "ES",
    isHagueMember: true,
    primaryLanguage: "Spanish",
    translationPath: "/translation/spanish-translation",
    countryGuidePath: "/countries/spain",
    submissionChannel: "BLS International India (National Visa) & Embassy/Consulate of Spain (New Delhi / Mumbai)",
    studentVisaCode: "Type D Long-Stay Study Visa (>180 Days) · BLS Spain India",
    workVisaCode: "Type D Highly Qualified Professional, Employee & EU Blue Card Visa",
    studentImportantRule:
      "Spain is a Hague Convention member. Long-stay Spanish visas (>180 days) strictly require an RPO Police Clearance Certificate (PCC) and Medical Certificate of Good Health—both legalized with an MEA Apostille sticker and certified Spanish translation.",
    workImportantRule:
      "Spain is a Hague Convention member. Spanish Work Visas require prior Residence & Work Authorization from Spain, plus an MEA Apostilled Police Clearance Certificate (PCC), Medical Certificate, and Degrees translated into Spanish.",
    studentAcademicRule:
      "Spanish University Admission Letter, proof of tuition payment, and original Indian Degree/Transcripts with State HRD/SDM + MEA Apostille + Spanish Translation (mandatory for Spanish Ministry Homologación).",
    workAcademicRule:
      "Original University Degree or Professional Qualification legalized with State HRD/SDM + MEA Apostille + Certified Spanish Translation.",
    studentPersonalRule:
      "PSK Police Clearance Certificate (PCC) and Medical Certificate (mentioning International Health Regulations 2005) — BOTH must carry an MEA Apostille sticker and Spanish translation.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Medical Certificate (IHR 2005 compliant), and Marriage/Birth Certificates — all with MEA Apostille + Certified Spanish Translation.",
    studentFinancialRule:
      "100% IPREM financial proof (~€600/month = €7,200/year), Parental Sponsorship Affidavit (Notarized + MEA Apostille + Spanish translation), and Spanish public/private health insurance with zero copay (sin copago).",
    workFinancialRule:
      "Spanish Immigration Work & Residence Authorization (Autorización de Residencia y Trabajo), signed Spanish employment contract, and apostilled affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Spanish Translation",
    workBadgeAcademic: "Requires MEA Apostille + Spanish Translation",
    studentBadgePersonal: "PCC & Medical Cert Need MEA Apostille + Spanish",
    workBadgePersonal: "PCC, Medical & Civil Docs Need Apostille + Spanish",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Apostille + Spanish",
    workBadgeFinancial: "Spanish Work Authorization + Apostilled Docs",
  },
  {
    countrySlug: "portugal",
    countryName: "Portugal",
    isoCode: "PT",
    isHagueMember: true,
    primaryLanguage: "Portuguese",
    translationPath: "/translation/portuguese-translation",
    countryGuidePath: "/countries/portugal",
    submissionChannel: "VFS Global India & Embassy of Portugal in New Delhi / Consulate General in Goa",
    studentVisaCode: "Portugal D4 Higher Education Student Visa · VFS India",
    workVisaCode: "Portugal D1 Subordinate Work, D2 Entrepreneur, D3 Highly Qualified & Job Seeker Visa",
    studentImportantRule:
      "Portugal is a Hague Convention member. VFS Portugal strictly requires an RPO Police Clearance Certificate (PCC issued within 3 months), Educational Certificates, and Sponsorship Proofs to carry an MEA Apostille sticker.",
    workImportantRule:
      "Portugal is a Hague Convention member. For Portugal D1/D3 Work Visas and the Job Seeker Visa, your RPO Police Clearance Certificate (PCC) and Educational Degree MUST carry an original MEA Apostille sticker (plus Portuguese/English certification).",
    studentAcademicRule:
      "Portuguese University Enrollment Letter, Tuition Payment Receipt, and original Indian Degree / Class 12 Mark Sheets authenticated via State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree, Diploma, and Work Experience Certificates authenticated via State HRD/SDM + MEA Apostille + Certified Portuguese Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 90 days) and Birth Certificate with mandatory MEA Apostille sticker + Portuguese translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 90 days) and Marriage/Birth Certificates with mandatory MEA Apostille sticker + Certified Portuguese Translation.",
    studentFinancialRule:
      "Proof of means of subsistence (Portuguese minimum wage benchmark), NIF & Portuguese bank/financial proof, 12-month accommodation proof, and Apostilled Parental Sponsorship Affidavit.",
    workFinancialRule:
      "IEFP Work Promise / Employment Contract (or Job Seeker declaration), NIF/Accommodation proof, 6-month bank statements & 3-year ITRs, and Notarized + Apostilled Financial/Name Affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Portuguese",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC (Valid 90 Days)",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Notary + Apostille",
    workBadgeFinancial: "Work Contract + Apostilled Financial Affidavits",
  },
  {
    countrySlug: "poland",
    countryName: "Poland",
    isoCode: "PL",
    isHagueMember: true,
    primaryLanguage: "Polish",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/poland",
    submissionChannel: "e-Konsulat / VFS Global India (Embassy of Poland in New Delhi & Consulate in Mumbai)",
    studentVisaCode: "Poland Type D National Student Visa · NAWA Recognition",
    workVisaCode: "Poland Type D National Work Visa · Voivodeship Work Permit (Zezwolenie na pracę)",
    studentImportantRule:
      "Poland is a Hague Convention member. Polish universities and NAWA require your Indian Class 12 or Bachelor's Degree and Transcripts to carry State HRD/SDM authentication, an MEA Apostille sticker, and certified Polish translation.",
    workImportantRule:
      "Poland is a Hague Convention member. Work visa applicants require an original Voivodeship Work Permit (Zezwolenie na pracę), while educational diplomas, PCC, and experience certificates require MEA Apostille and Polish translation.",
    studentAcademicRule:
      "Original Class 12 Certificate or Bachelor's Degree + Transcripts legalized with State HRD/SDM + MEA Apostille + Certified Polish Translation for NAWA academic recognition.",
    workAcademicRule:
      "Original Degree, Vocational Diploma, and Experience Letters legalized with SDM/HRD + MEA Apostille + Certified Polish Translation to prove job qualification.",
    studentPersonalRule:
      "Original Birth Certificate (for minor/parental sponsorship proof) and PCC with MEA Apostille + Certified Polish translation.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with MEA Apostille + Certified Polish translation.",
    studentFinancialRule:
      "Paid Tuition Fee Receipt (official university confirmation), Bank Credit Card Limit / Bank Certificate (min. PLN 776/month + return ticket + dorm cost), and €30,000 Polish-approved travel insurance.",
    workFinancialRule:
      "Original Polish Work Permit (Type A/B/C) or Seasonal Work Permit, signed Employment Contract in Polish/English, ZUS/Tax proofs, and €30,000 health insurance.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Polish Translation",
    workBadgeAcademic: "Requires MEA Apostille + Polish Translation",
    studentBadgePersonal: "Birth Cert & PCC Need Apostille + Polish",
    workBadgePersonal: "PCC & Civil Docs Need Apostille + Polish",
    studentBadgeFinancial: "Credit Card / Bank Proof + Apostilled Affidavit",
    workBadgeFinancial: "Voivodeship Work Permit + Signed Contract",
  },
  {
    countrySlug: "netherlands",
    countryName: "Netherlands",
    isoCode: "NL",
    isHagueMember: true,
    primaryLanguage: "Dutch",
    translationPath: "/translation/dutch-translation",
    countryGuidePath: "/countries/netherlands",
    submissionChannel: "IND (TEV / MVV Procedure) & VFS Global India (Embassy of the Kingdom of the Netherlands)",
    studentVisaCode: "MVV Study Residence Permit · Dutch University & Nuffic",
    workVisaCode: "Highly Skilled Migrant (Kennismigrant), EU Blue Card & Orientation Year (Zoekjaar)",
    studentImportantRule:
      "The Netherlands is a Hague Convention member. For municipal registration (BRP) in the Netherlands, Indian students and expats MUST bring an original Birth Certificate legalized with an MEA Apostille sticker.",
    workImportantRule:
      "The Netherlands is a Hague Convention member. Highly Skilled Migrants (Kennismigrant) and dependents require an IND approval letter, plus original Birth Certificates, Marriage Certificates, and Single Status Affidavits legalized with an MEA Apostille sticker.",
    studentAcademicRule:
      "Dutch University Admission Letter, Nuffic credential evaluation (if applicable), and original Degree & Transcripts with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate with SDM/HRD + MEA Apostille (mandatory for Orientation Year / Zoekjaar via Nuffic IDW evaluation and EU Blue Card).",
    studentPersonalRule:
      "Original Birth Certificate with MEA Apostille (mandatory for Gemeente / BRP BSN registration upon arrival in the Netherlands) + Antecedents Certificate.",
    workPersonalRule:
      "Original Birth Certificate, Marriage Certificate, and Unmarried/Single Status Affidavit — all legalized with an MEA Apostille sticker for BRP Gemeente registration and dependent MVV.",
    studentFinancialRule:
      "Proof of Dutch living standard (~€1,225/month transferred to university or bank account), Tuition Payment Receipt, and TB test declaration.",
    workFinancialRule:
      "IND Recognised Sponsor MVV Approval Letter, Dutch Employment Contract meeting IND salary criterion, and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Nuffic IDW / Blue Card Needs MEA Apostille",
    studentBadgePersonal: "Birth Cert Needs MEA Apostille (For Gemeente BRP)",
    workBadgePersonal: "Birth, Marriage & Single Status Need MEA Apostille",
    studentBadgeFinancial: "IND Financial Proof + Notarized Affidavits",
    workBadgeFinancial: "IND Sponsor Approval + Employment Contract",
  },
  {
    countrySlug: "austria",
    countryName: "Austria",
    isoCode: "AT",
    isHagueMember: true,
    primaryLanguage: "German",
    translationPath: "/translation/german-translation",
    countryGuidePath: "/countries/austria",
    submissionChannel: "VFS Global India & Austrian Embassy in New Delhi",
    studentVisaCode: "Residence Permit – Student (Aufenthaltsbewilligung Studierender) & Visa D",
    workVisaCode: "Red-White-Red Card (Rot-Weiß-Rot-Karte) & EU Blue Card Austria",
    studentImportantRule:
      "Austria is a Hague Convention member. For an Austrian Student Residence Permit, your Indian Birth Certificate, Police Clearance Certificate (PCC), and University Admission documents MUST carry an MEA Apostille sticker and certified German translation.",
    workImportantRule:
      "Austria is a Hague Convention member. Red-White-Red Card (Rot-Weiß-Rot-Karte) applicants must submit an MEA Apostilled Degree Certificate, Birth Certificate, Marriage Certificate, and PCC (valid 3 months) with certified German translation.",
    studentAcademicRule:
      "Austrian University Admission Letter (Zulassungsbescheid) and original Indian Degree / Class 12 certificates legalized with State HRD/SDM + MEA Apostille + Certified German Translation.",
    workAcademicRule:
      "Original University Degree, Transcripts, and Vocational Certificates legalized with State HRD/SDM + MEA Apostille + Certified German Translation for AMS point calculation.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC valid for 3 months) — BOTH legalized with an MEA Apostille sticker and Certified German Translation.",
    workPersonalRule:
      "Original Birth Certificate, PSK Police Clearance Certificate (PCC), and Marriage Certificate — all with MEA Apostille + Certified German Translation.",
    studentFinancialRule:
      "Proof of sufficient funds (€703.58/month for under 24 years or €1,273.99/month for 24+ years, plus rent above €376.26), Austrian accommodation contract (Wohnrechtsvereinbarung), and Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Employer Declaration (Arbeitgebererklärung), signed Austrian work contract, proof of health insurance, and Notarized + Apostilled Experience/Name Affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + German Translation",
    workBadgeAcademic: "Requires MEA Apostille + German Translation",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille + German",
    workBadgePersonal: "Birth, PCC & Marriage Need Apostille + German",
    studentBadgeFinancial: "Austrian Funds Proof + Apostilled Affidavit",
    workBadgeFinancial: "Arbeitgebererklärung + Apostilled Affidavits",
  },
  {
    countrySlug: "switzerland",
    countryName: "Switzerland",
    isoCode: "CH",
    isHagueMember: true,
    primaryLanguage: "German",
    translationPath: "/translation/german-translation",
    countryGuidePath: "/countries/switzerland",
    submissionChannel: "VFS Global India & Embassy of Switzerland in New Delhi / Consulate in Mumbai",
    studentVisaCode: "Swiss National Type D Study Visa · Cantonal Migration Approval",
    workVisaCode: "Swiss Type D National Work Visa · Cantonal Work Permit & SEM Approval",
    studentImportantRule:
      "Switzerland is a Hague Convention member. Swiss cantonal migration authorities require your Indian academic diplomas, Birth Certificate, and sponsorship affidavits to be authenticated with an MEA Apostille sticker.",
    workImportantRule:
      "Switzerland is a Hague Convention member. Once your Swiss employer obtains Cantonal & SEM work authorization, your Degree, Police Clearance Certificate (PCC), and Marriage/Birth certificates require MEA Apostille and German/French/Italian translation.",
    studentAcademicRule:
      "Official Acceptance Letter from a recognized Swiss university/ETH/EPFL/hospitality school, plus original Indian Degree & Transcripts with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree and Professional Diplomas legalized with SDM/HRD + MEA Apostille + Certified German/French/Italian Translation.",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (if requested by canton) with MEA Apostille, plus signed Written Commitment to Leave Switzerland after studies.",
    workPersonalRule:
      "Original Marriage Certificate, Birth Certificates (for family reunification), and PSK Police Clearance Certificate with MEA Apostille + Swiss official language translation.",
    studentFinancialRule:
      "Bank statements proving CHF 21,000–CHF 30,000/year in a Swiss-recognized bank (FINMA list), Tuition Receipt, Motivation Letter, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Cantonal Authorization to Issue a Visa (Ermächtigung zur Visumerteilung), signed Swiss Employment Contract, CV, and Notarized Affidavits.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires MEA Apostille + Swiss Language Translation",
    studentBadgePersonal: "Civil Docs Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "FINMA Bank Proof (CHF 21,000+) + Apostilled Affidavit",
    workBadgeFinancial: "Cantonal Visa Authorization + Employment Contract",
  },
  {
    countrySlug: "belgium",
    countryName: "Belgium",
    isoCode: "BE",
    isHagueMember: true,
    primaryLanguage: "French",
    translationPath: "/translation/french-translation",
    countryGuidePath: "/countries/belgium",
    submissionChannel: "VFS Global India (Embassy of Belgium in New Delhi & Consulate General in Mumbai)",
    studentVisaCode: "Belgium Long-Stay Type D Student Visa · Annex 32 / Blocked Account",
    workVisaCode: "Belgium Single Permit (Permis Unique / Gecombineerde Vergunning) & EU Blue Card",
    studentImportantRule:
      "Belgium is a Hague Convention member. Applicants over 18 MUST submit an RPO Police Clearance Certificate (PCC) with an MEA Apostille sticker, an Embassy-panel Medical Certificate, and Apostilled educational/sponsorship documents.",
    workImportantRule:
      "Belgium is a Hague Convention member. Single Permit (Annex 46/47) and family reunion applicants must submit an MEA Apostilled Police Clearance Certificate (PCC), Degree, and Marriage/Birth certificates.",
    studentAcademicRule:
      "Admission Letter from a recognized Belgian higher education institution, plus original Indian Degree/Class 12 certificate & transcripts legalized with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate legalized with SDM/HRD + MEA Apostille (mandatory for Belgian Single Permit / EU Blue Card qualification proof).",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 6 months) with mandatory MEA Apostille sticker, plus Medical Certificate from a Belgian Embassy-recognized panel doctor.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) with MEA Apostille, Belgian panel Medical Certificate, and Original Marriage/Birth Certificates with MEA Apostille + French/Dutch/English translation.",
    studentFinancialRule:
      "Belgian University Blocked Account (~€803/month) OR Formal Obligation (Annex 32) with guarantor's 3-month salary slips/ITRs, plus Apostilled Birth Certificate proving family relationship to guarantor.",
    workFinancialRule:
      "Regional Work Authorization + Annex 46/47 Single Permit Decision from Belgian Immigration Office (Office des Étrangers), signed contract, and Administrative Contribution Fee receipt.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC + Panel Medical",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "Blocked Account or Annex 32 (With Apostilled Proofs)",
    workBadgeFinancial: "Annex 46/47 Single Permit + Signed Contract",
  },
  {
    countrySlug: "sweden",
    countryName: "Sweden",
    isoCode: "SE",
    isHagueMember: true,
    primaryLanguage: "Swedish",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/sweden",
    submissionChannel: "Swedish Migration Agency (Migrationsverket) & VFS Global India / Embassy of Sweden New Delhi",
    studentVisaCode: "Residence Permit for Higher Education · Migrationsverket",
    workVisaCode: "Swedish Work Permit & EU Blue Card · Migrationsverket",
    studentImportantRule:
      "Sweden is a Hague Convention member. Swedish university admissions and family/dependent residence permits require MEA Apostille on civil certificates (Birth, Marriage) and non-English academic records.",
    workImportantRule:
      "Sweden is a Hague Convention member. Skilled workers and accompanying family members require MEA Apostille on Marriage Certificates, Children's Birth Certificates, and regulated professional degrees (Socialstyrelsen / UHR).",
    studentAcademicRule:
      "Universityadmissions.se Notification of Selection Results, first tuition installment receipt, and original Indian Degree & Transcripts (with MEA Apostille if requested).",
    workAcademicRule:
      "Original University Degree & Transcripts with SDM/HRD + MEA Apostille for UHR recognition or regulated Swedish professions.",
    studentPersonalRule:
      "Valid Passport (biometrics verified at VFS/Embassy), Birth Certificate with MEA Apostille (for minors/dependents), and Marriage Certificate with MEA Apostille (if bringing spouse).",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Apostille sticker (mandatory for accompanying family residence permits in Sweden).",
    studentFinancialRule:
      "Personal bank statement in the student's own name showing SEK 10,584/month for the entire study period, plus comprehensive health insurance (if study is under 1 year).",
    workFinancialRule:
      "Offer of Employment from Swedish employer (with trade union statement), salary meeting Swedish collective agreement threshold, and Power of Attorney (if employer files on your behalf).",
    studentBadgeAcademic: "University Selection Letter + Apostille (If Requested)",
    workBadgeAcademic: "UHR / Regulated Roles Need MEA Apostille",
    studentBadgePersonal: "Dependent Marriage & Birth Need MEA Apostille",
    workBadgePersonal: "Marriage & Birth Certs Need MEA Apostille",
    studentBadgeFinancial: "Personal Bank Statement (SEK 10,584/Month)",
    workBadgeFinancial: "Migrationsverket Offer of Employment + Union Opinion",
  },
  {
    countrySlug: "ireland",
    countryName: "Ireland",
    isoCode: "IE",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/ireland",
    submissionChannel: "AVATS Online Portal & VFS Global India (Embassy of Ireland in New Delhi)",
    studentVisaCode: "Ireland Long-Stay 'D' Study Visa · Electronic Transfer of Funds (ETF) / Fee Proof",
    workVisaCode: "Critical Skills Employment Permit (CSEP) & General Employment Permit · DETE",
    studentImportantRule:
      "Ireland is a Hague Convention member. VFS Ireland requires full tuition payment proof (minimum €6,000), a 6-month Financial Summary Form, Police Clearance Certificate (PCC), and MEA Apostille on Birth/Sponsorship relationship proofs.",
    workImportantRule:
      "Ireland is a Hague Convention member. Critical Skills (CSEP) and General Employment Permit holders require DETE permit approval, Original Degree Certificate, PCC, and MEA Apostille on Marriage/Birth certificates for family join visas.",
    studentAcademicRule:
      "Letter of Acceptance from an ILEP-listed Irish institution, IELTS/PTE/TOEFL score report, and original Indian Degree/Class 12 certificates & mark sheets (with MEA Apostille if requested).",
    workAcademicRule:
      "Original University Degree Certificate & Transcripts legalized with SDM/HRD + MEA Apostille (plus NMBI/IMC registration for nurses and doctors).",
    studentPersonalRule:
      "Original Birth Certificate (mandatory to prove relationship with financial sponsor) and PSK Police Clearance Certificate (PCC) with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "ETF/Payzone receipt showing €6,000+ tuition paid, access to €10,000/year living funds, 6-month sponsor bank statements, 3-year ITRs, private medical insurance, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "DETE Critical Skills or General Employment Permit, signed Irish employment contract, medical insurance, and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "ILEP Acceptance + Original Academic Certificates",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille on Degree",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "€6,000+ Fee Receipt + €10,000 Funds + Apostilled Affidavit",
    workBadgeFinancial: "DETE Employment Permit + Signed Contract",
  },
  {
    countrySlug: "australia",
    countryName: "Australia",
    isoCode: "AU",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/australia",
    submissionChannel: "Department of Home Affairs (ImmiAccount) & VFS Global India (Biometrics)",
    studentVisaCode: "Subclass 500 Student Visa · CoE, Genuine Student (GS) & OSHC",
    workVisaCode: "Skills in Demand / TSS (Subclass 482), ENS (186) & Skilled Independent (189/190)",
    studentImportantRule:
      "Australia is a Hague Convention member. Subclass 500 applicants require a Confirmation of Enrolment (CoE), OSHC health cover, financial proof (AUD $29,710/year living cost), and MEA Apostille + certified English translation on regional or civil certificates.",
    workImportantRule:
      "Australia is a Hague Convention member. Skilled Worker (Subclass 482/186/189) applicants require a positive Skills Assessment (VETASSESS, ACS, Engineers Australia, AHPRA), PSK Police Clearance Certificate (PCC), and MEA Apostille on civil/academic records.",
    studentAcademicRule:
      "Confirmation of Enrolment (CoE) from CRICOS provider, original Indian Degree & Semester Mark Sheets, IELTS/PTE score, and MEA Apostille if requested by university/AHPRA.",
    workAcademicRule:
      "Positive Skills Assessment (ACS, Engineers Australia, VETASSESS, AHPRA/ANMAC) and original Indian Degree & Transcripts with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate (to establish relationship with sponsoring parents/relatives) with MEA Apostille + Certified English translation if regional.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Children's Birth Certificates with MEA Apostille + Certified English translation.",
    studentFinancialRule:
      "Evidence of AUD $29,710/year living expenses + 1st-year tuition + travel via RBI-approved bank deposits/education loan, ITRs, OSHC policy, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "Approved Employer Nomination (TRN), signed Australian employment contract, reference letters, Form 80/1221, and Notarized Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "CRICOS CoE + Verified Academic Transcripts",
    workBadgeAcademic: "Skills Assessment + MEA Apostille on Degree",
    studentBadgePersonal: "Birth / Relationship Docs Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "AUD $29,710/Yr Funds + Notarized Sponsorship Affidavit",
    workBadgeFinancial: "Employer Nomination + Notarized Experience Proofs",
  },
  {
    countrySlug: "new-zealand",
    countryName: "New Zealand",
    isoCode: "NZ",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/new-zealand",
    submissionChannel: "Immigration New Zealand (INZ Online) & VFS Global India (VAC)",
    studentVisaCode: "Fee Paying Student Visa · NZQA Offer of Place & FTS",
    workVisaCode: "Accredited Employer Work Visa (AEWV) & Straight to Residence Visa",
    studentImportantRule:
      "New Zealand is a Hague Convention member. Student visa applicants require an NZQA Offer of Place, NZD $20,000/year living funds, Police Clearance Certificate (PCC), and MEA Apostille + English translation on civil/sponsorship documents.",
    workImportantRule:
      "New Zealand is a Hague Convention member. AEWV work visa applicants require an Accredited Employer Job Check token, NZQA International Qualification Assessment (IQA), PCC, and MEA Apostille on Degrees, Marriage, and Birth certificates.",
    studentAcademicRule:
      "Offer of Place from an NZQA-approved provider, Tuition Fee Receipt, and original Indian Degree/Class 12 certificates & mark sheets (with MEA Apostille if requested).",
    workAcademicRule:
      "NZQA International Qualification Assessment (IQA) and original Indian Degree/Diploma legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "PSK Police Clearance Certificate (PCC), Chest X-Ray & Medical Certificate (eMedical), and Birth Certificate with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), eMedical Chest X-Ray & General Medical, and Marriage/Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "Evidence of NZD $20,000/year living funds (or ANZ Funds Transfer Scheme - FTS), Financial Undertaking Form (INZ 1014), 6-month bank statements, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "Job Check approval token from INZ-accredited employer, signed employment agreement, work experience proofs, and Notarized Name Affidavit (if applicable).",
    studentBadgeAcademic: "NZQA Offer of Place + Academic Transcripts",
    workBadgeAcademic: "NZQA IQA + MEA Apostille on Degree",
    studentBadgePersonal: "PCC, Medical & Birth Cert Need Verification",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "NZD $20,000/Yr (FTS) + INZ 1014 Undertaking",
    workBadgeFinancial: "AEWV Job Check Token + Signed Agreement",
  },
  {
    countrySlug: "japan",
    countryName: "Japan",
    isoCode: "JP",
    isHagueMember: true,
    primaryLanguage: "Japanese",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/japan",
    submissionChannel: "VFS Global India (Embassy of Japan in New Delhi & Consulates in Mumbai, Chennai, Kolkata, Bengaluru)",
    studentVisaCode: "Japan Student Visa · Certificate of Eligibility (COE)",
    workVisaCode: "Engineer / Specialist in Humanities / International Services & SSW Visa (COE)",
    studentImportantRule:
      "Japan is a Hague Convention member. Applicants must first obtain a Certificate of Eligibility (COE) from the Japanese Immigration Services Agency, while Indian degrees, birth certificates, and sponsorship proofs require MEA Apostille and Japanese translation.",
    workImportantRule:
      "Japan is a Hague Convention member. Work visa applicants require an original/digital Certificate of Eligibility (COE), plus Indian Degree Certificates, Marriage Certificates, and Birth Certificates legalized with an MEA Apostille sticker and Japanese translation.",
    studentAcademicRule:
      "Original/Copy of Certificate of Eligibility (COE), Japanese University/Language School Admission Letter, and original Indian Degree/Class 12 Certificate with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Certificate of Eligibility (COE) and original Indian Bachelor's Degree / Engineering Diploma legalized with SDM/HRD + MEA Apostille + Certified Japanese Translation.",
    studentPersonalRule:
      "Original Birth Certificate (proving relationship with financial guarantor) with MEA Apostille + Japanese translation, Valid Passport, and VFS Japan Visa Form.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates with MEA Apostille + Certified Japanese Translation (mandatory for Dependent COE applications).",
    studentFinancialRule:
      "Sponsor's 3-year Income Tax Returns (ITR), Bank Balance Certificate, Employment Certificate, and Notarized Letter of Guarantee / Sponsorship Affidavit.",
    workFinancialRule:
      "Approved Japanese COE, Employment Contract (RoudouJouken Tsuchisho), Company Registration (Toukihon Tohon) copy, and Notarized Name Affidavit (if applicable).",
    studentBadgeAcademic: "Original COE + MEA Apostille on Degree/12th",
    workBadgeAcademic: "Original COE + MEA Apostille on Degree",
    studentBadgePersonal: "Birth Cert Needs MEA Apostille + Japanese",
    workBadgePersonal: "Dependent Marriage & Birth Need Apostille + Japanese",
    studentBadgeFinancial: "Sponsor ITRs + Bank Balance + Guarantee Letter",
    workBadgeFinancial: "Japanese COE + Employment Terms Notice",
  },
  {
    countrySlug: "south-korea",
    countryName: "South Korea",
    isoCode: "KR",
    isHagueMember: true,
    primaryLanguage: "Korean",
    translationPath: "/translation/korean-translation",
    countryGuidePath: "/countries/south-korea",
    submissionChannel: "Korea Visa Application Center (KVAC / VFS India — New Delhi, Mumbai, Chennai, Kolkata)",
    studentVisaCode: "D-2 University Degree & D-4 Language Training Student Visa · Certificate of Admission",
    workVisaCode: "E-7 Specific Activities (Skilled Engineer/IT) & E-3 Research Work Visa · CCVI",
    studentImportantRule:
      "South Korea is a Hague Convention member. KVAC / Embassy of the Republic of Korea strictly requires your final Indian Degree or High School Certificate & Transcripts to carry State HRD/SDM authentication and an original MEA Apostille sticker.",
    workImportantRule:
      "South Korea is a Hague Convention member. To obtain a Visa Issuance Confirmation Number (CCVI) for an E-7 Work Visa, your Indian University Degree, Experience Certificates, and PCC MUST carry an original MEA Apostille sticker.",
    studentAcademicRule:
      "Standard Certificate of Admission from Korean University, plus original Indian Degree / Class 12 Certificate & Transcripts with mandatory State HRD/SDM + MEA Hague Apostille.",
    workAcademicRule:
      "Original Bachelor's/Master's Degree and Employment Experience Certificates legalized with State HRD/SDM + MEA Hague Apostille for Korean Ministry of Justice (CCVI) filing.",
    studentPersonalRule:
      "Original Birth Certificate / Family Relationship Proof with MEA Apostille, plus Tuberculosis (TB) Test Certificate from an Embassy of Korea designated hospital in India.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille, plus Embassy-designated Hospital TB Test Report.",
    studentFinancialRule:
      "Bank Balance Certificate (minimum USD $10,000–$20,000 held as per university rules), Sponsor's ITR & Occupation Proof, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Certificate for Confirmation of Visa Issuance (CCVI), signed Korean Employment Contract, Korean Business Registration copy, and Apostilled Affidavits.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille on Degree",
    workBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille for CCVI",
    studentBadgePersonal: "Family Proof Needs Apostille + Designated TB Test",
    workBadgePersonal: "PCC & Family Docs Need Apostille + TB Test",
    studentBadgeFinancial: "USD $10,000–$20,000 Bank Proof + Apostilled Affidavit",
    workBadgeFinancial: "Korean CCVI Number + Signed Employment Contract",
  },
  {
    countrySlug: "china",
    countryName: "China",
    isoCode: "CN",
    isHagueMember: false,
    specialTreatyNote:
      "Special Treaty Exception: Although China joined the Hague Convention in 2023, the Convention is NOT in force between India and Mainland China. Do NOT get an Apostille for Mainland China—Indian documents require MEA Normal Attestation + Chinese Embassy Legalization.",
    primaryLanguage: "Chinese (Mandarin)",
    translationPath: "/translation/chinese-translation",
    countryGuidePath: "/countries/china",
    submissionChannel: "Chinese Visa Application Service Center (CVASC — New Delhi, Mumbai, Kolkata)",
    studentVisaCode: "X1 (>180 Days) & X2 Study Visa · JW201 / JW202 Form",
    workVisaCode: "Z Work Visa · Notification Letter of Foreigner's Work Permit",
    studentImportantRule:
      "Important Treaty Rule: The Hague Apostille Convention does NOT apply between India and Mainland China. Indian degrees, transcripts, and PCCs for China require State HRD/SDM → MEA Normal Attestation → Chinese Embassy Legalization.",
    workImportantRule:
      "Important Treaty Rule: Do NOT get an MEA Apostille for Mainland China. For a China Z Work Visa, your original Indian Degree Certificate and Police Clearance Certificate (PCC) MUST undergo State HRD/SDM → MEA Normal Attestation → Chinese Embassy Legalization in New Delhi.",
    studentAcademicRule:
      "Original JW201/JW202 Form, Chinese University Admission Notice, and original Indian Degree/Class 12 Certificate attested via State HRD/SDM → MEA Normal Attestation → Chinese Embassy.",
    workAcademicRule:
      "Original Bachelor's/Master's Degree Certificate attested via State HRD/SDM → MEA Normal Attestation → Embassy of the People's Republic of China (mandatory for Foreigner's Work Permit Notification).",
    studentPersonalRule:
      "Foreigner Physical Examination Form (stamped by a government hospital), PSK Police Clearance Certificate (attested by MEA + Chinese Embassy), and Valid Passport.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates attested via SDM/Home → MEA Normal Attestation → Chinese Embassy Legalization.",
    studentFinancialRule:
      "CSC Scholarship Certificate or 6-month Bank Statement (minimum USD $3,500–$5,000/year), Sponsor ITR, and Notarized Sponsorship Undertaking.",
    workFinancialRule:
      "Notification Letter of Foreigner's Work Permit in the PRC, Chinese Employer Invitation Letter, Foreigner Physical Examination Record, and Mandarin Translation.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Chinese Embassy",
    workBadgeAcademic: "Mandatory HRD/SDM → MEA → Chinese Embassy",
    studentBadgePersonal: "PCC & Physical Exam Need Consular Verification",
    workBadgePersonal: "PCC, Marriage & Birth Need Chinese Embassy Stamp",
    studentBadgeFinancial: "JW201/JW202 + Bank Proof + Sponsorship Letter",
    workBadgeFinancial: "Foreigner Work Permit Notice + Physical Exam",
  },
  {
    countrySlug: "russia",
    countryName: "Russia",
    isoCode: "RU",
    isHagueMember: true,
    primaryLanguage: "Russian",
    translationPath: "/translation/russian-translation",
    countryGuidePath: "/countries/russia",
    submissionChannel: "Russian Visa Center (IFS / VFS India) & Embassy of the Russian Federation (New Delhi, Mumbai, Chennai, Kolkata)",
    studentVisaCode: "Russian Student Visa (MBBS & Engineering) · GUVM MIA Invitation",
    workVisaCode: "Russian Work Visa & Highly Qualified Specialist (HQS) · MVD Work Invitation",
    studentImportantRule:
      "Russia is a Hague Convention member. Indian students (especially MBBS & Engineering applicants) MUST have their Class 12 Mark Sheet / Degree authenticated via State HRD/SDM and affixed with an MEA Apostille sticker plus certified Russian translation for Rosobrnadzor nostrification.",
    workImportantRule:
      "Russia is a Hague Convention member. Work Visa applicants require an official MVD Invitation, HIV-negative medical certificate, and MEA Apostille + Certified Russian translation on degrees and civil documents.",
    studentAcademicRule:
      "Original Class 12 Mark Sheet & Passing Certificate (plus NEET scorecard for MBBS) or Bachelor's Degree legalized with State HRD/SDM + MEA Apostille + Certified Russian Translation.",
    workAcademicRule:
      "Original University Degree or Technical Diploma legalized with State HRD/SDM + MEA Apostille + Certified Russian Translation.",
    studentPersonalRule:
      "Official Electronic/Paper Invitation from GUVM MIA Russia, Medical Certificate confirming negative HIV status (valid for 90 days), and Birth Certificate with MEA Apostille + Russian translation.",
    workPersonalRule:
      "Official MVD Work Visa Invitation, HIV-Negative Medical Certificate (issued within 3 months), and PCC/Marriage/Birth Certificates with MEA Apostille + Certified Russian Translation.",
    studentFinancialRule:
      "Russian University Contract & Fee Receipt, Parental Sponsorship Affidavit (Notarized + Apostille), and bank statements.",
    workFinancialRule:
      "Russian Work Permit & Employment Contract, Russian Medical Insurance Policy, and Notarized + Apostilled Powers of Attorney or Affidavits.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille + Russian",
    workBadgeAcademic: "Requires MEA Apostille + Russian Translation",
    studentBadgePersonal: "HIV-Negative Certificate + Apostilled Birth Cert",
    workBadgePersonal: "HIV-Negative Cert + Apostilled PCC/Civil Docs",
    studentBadgeFinancial: "GUVM MIA Invitation + University Contract",
    workBadgeFinancial: "MVD Work Invitation + Russian Insurance",
  },
  {
    countrySlug: "czech-republic",
    countryName: "Czech Republic",
    isoCode: "CZ",
    isHagueMember: true,
    primaryLanguage: "Czech",
    translationPath: "/translation/czech-translation",
    countryGuidePath: "/countries/czech-republic",
    submissionChannel: "VFS Global India & Embassy of the Czech Republic in New Delhi",
    studentVisaCode: "Czech Long-Term Study Visa (Type D) / Residence Permit · Nostrification",
    workVisaCode: "Czech Employee Card (Zaměstnanecká karta) & EU Blue Card",
    studentImportantRule:
      "The Czech Republic is a Hague Convention member. Czech universities require Nostrification (academic recognition), which mandates an MEA Apostille sticker on your original Indian Degree/Class 12 certificate and Transcripts, plus an Apostilled PCC with certified Czech translation.",
    workImportantRule:
      "The Czech Republic is a Hague Convention member. Employee Card and EU Blue Card applicants MUST submit an RPO Police Clearance Certificate (PCC) and Educational Degree with an MEA Apostille sticker and certified Czech translation.",
    studentAcademicRule:
      "Czech University Admission Letter (in Czech) and original Indian Degree / Class 12 Certificate & Mark Sheets with State HRD/SDM + MEA Apostille + Certified Czech Translation for Nostrification.",
    workAcademicRule:
      "Original University Degree or Diploma legalized with State HRD/SDM + MEA Apostille + Certified Czech Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 180 days) with mandatory MEA Apostille + Certified Czech Translation, plus Valid Passport.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with mandatory MEA Apostille + Certified Czech Translation.",
    studentFinancialRule:
      "Bank statement + international payment card in applicant's name (~CZK 110,000+ / €4,500), Czech Accommodation Proof (Potvrzení o zajištění ubytování with notarized signature), and Travel Medical Insurance.",
    workFinancialRule:
      "Vacancy Reference Number from Czech Labour Office, signed Czech Employment Contract (Pracovní smlouva),Czech Accommodation Proof, and Comprehensive Health Insurance.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille + Czech",
    workBadgeAcademic: "Requires MEA Apostille + Czech Translation",
    studentBadgePersonal: "Mandatory MEA Apostille + Czech on PCC",
    workBadgePersonal: "PCC & Civil Docs Need Apostille + Czech",
    studentBadgeFinancial: "Czech Accommodation Form + Card/Bank Proof",
    workBadgeFinancial: "Employee Card Contract + Czech Accommodation",
  },
  {
    countrySlug: "hungary",
    countryName: "Hungary",
    isoCode: "HU",
    isHagueMember: true,
    primaryLanguage: "Hungarian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "Enter Hungary / VFS Global India (Embassy of Hungary in New Delhi & Consulate in Mumbai)",
    studentVisaCode: "Hungary Type D Residence Permit for Studies · Stipendium Hungaricum",
    workVisaCode: "Hungary Guest Worker / Single Permit for Employment & EU Blue Card",
    studentImportantRule:
      "Hungary is a Hague Convention member. Student visa and Stipendium Hungaricum applicants require an MEA Apostille sticker on their original Indian Degree/Class 12 certificate, Birth Certificate, and Police Clearance Certificate.",
    workImportantRule:
      "Hungary is a Hague Convention member. Work permit and EU Blue Card applicants must submit their original Degree Certificate, Police Clearance Certificate (PCC), and family certificates legalized with an MEA Apostille sticker.",
    studentAcademicRule:
      "Hungarian University Letter of Acceptance, tuition payment proof, and original Indian Degree / Class 12 Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Vocational Certificate legalized with State HRD/SDM + MEA Apostille + Hungarian/English translation.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Marriage Certificate, and Birth Certificates legalized with an MEA Apostille sticker.",
    studentFinancialRule:
      "6-month bank statements, Parental Sponsorship Affidavit (Notarized + MEA Apostille), Hungarian accommodation lease/dorm sheet, and €30,000 travel health insurance.",
    workFinancialRule:
      "Prior Agreement to Establish Employment Relationship (Előzetes megállapodás), Hungarian accommodation proof, and Notarized Affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille",
    studentBadgePersonal: "PCC & Birth Cert Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Notary + Apostille",
    workBadgeFinancial: "Prior Employment Agreement + Accommodation Proof",
  },
  {
    countrySlug: "lithuania",
    countryName: "Lithuania",
    isoCode: "LT",
    isHagueMember: true,
    primaryLanguage: "Lithuanian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "MIGRIS Portal & VFS Global India (Embassy of the Republic of Lithuania in New Delhi)",
    studentVisaCode: "Lithuania Temporary Residence Permit (TRP) for Studies · MIGRIS & SKVC",
    workVisaCode: "Lithuania Temporary Residence Permit (TRP) for Work & EU Blue Card · MIGRIS",
    studentImportantRule:
      "Lithuania is a Hague Convention member. For MIGRIS TRP and SKVC academic recognition, your Indian Degree/Class 12 certificates and RPO Police Clearance Certificate (PCC) MUST carry an original MEA Apostille sticker.",
    workImportantRule:
      "Lithuania is a Hague Convention member. Work TRP applications filed via MIGRIS and VFS India require a Mediation Letter number, an MEA Apostilled Police Clearance Certificate (PCC), and Apostilled educational/experience documents.",
    studentAcademicRule:
      "MIGRIS Mediation Letter number from Lithuanian University, SKVC Academic Recognition certificate, and original Indian Degree/Class 12 Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Vocational Diploma and Work Experience Certificates legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 6 months) and Birth Certificate with mandatory MEA Apostille sticker.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with mandatory MEA Apostille sticker.",
    studentFinancialRule:
      "Proof of living funds (1 MMA minimum monthly wage per month in Lithuania), Parental Sponsorship Affidavit (Notarized + MEA Apostille), and €30,000 Schengen health insurance.",
    workFinancialRule:
      "MIGRIS Employer Mediation Letter number, Employment Contract / Undertaking, and Notarized + Apostilled Affidavits.",
    studentBadgeAcademic: "SKVC Recognition Needs HRD/SDM + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC (MIGRIS Rule)",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "MIGRIS Mediation + Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "MIGRIS Mediation Number + Employment Undertaking",
  },
  {
    countrySlug: "latvia",
    countryName: "Latvia",
    isoCode: "LV",
    isHagueMember: true,
    primaryLanguage: "Latvian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "OCMA (PMLP) Latvia & VFS Global India (Embassy of the Republic of Latvia in New Delhi)",
    studentVisaCode: "Latvia Long-Stay Type D Student Visa & OCMA Residence Permit · AIC",
    workVisaCode: "Latvia Type D Work Visa & EU Blue Card · OCMA (PMLP) Invitation",
    studentImportantRule:
      "Latvia is a Hague Convention member. VFS Latvia and AIC (Academic Information Centre) require your Indian Degree/Class 12 certificates and RPO Police Clearance Certificate (PCC) to carry an original MEA Apostille sticker.",
    workImportantRule:
      "Latvia is a Hague Convention member. Work visa applicants need an OCMA (PMLP) Approved Invitation Number, plus an MEA Apostilled Police Clearance Certificate (PCC valid 6 months) and Apostilled educational/experience certificates.",
    studentAcademicRule:
      "AIC Academic Recognition certificate, Signed Study Agreement with Latvian University, and original Indian Degree/Class 12 Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Technical Qualification and Experience Letters legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates legalized with an MEA Apostille sticker.",
    studentFinancialRule:
      "OCMA Invitation Number, Bank Statement + International Payment Card showing minimum €700/month (€8,400/year), Tuition Fee Receipt, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "OCMA (PMLP) Approved Work Invitation Number, Draft Employment Contract, and €42,600/€30,000 Schengen medical insurance.",
    studentBadgeAcademic: "AIC Recognition Needs HRD/SDM + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "OCMA Invitation + €8,400/Yr Funds + Apostilled Affidavit",
    workBadgeFinancial: "OCMA Work Invitation + Draft Contract",
  },
  {
    countrySlug: "malta",
    countryName: "Malta",
    isoCode: "MT",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "Identità Malta & VFS Global India (High Commission of Malta in New Delhi)",
    studentVisaCode: "Malta National Type D Study Visa · MQRIC & Identità Malta",
    workVisaCode: "Malta Single Permit (Approval in Principle) & Key Employee Initiative",
    studentImportantRule:
      "Malta is a Hague Convention member. VFS Malta requires your Indian educational certificates, Birth Certificate (when sponsored by parents), and Sponsorship Affidavit to be legalized with an MEA Apostille sticker.",
    workImportantRule:
      "Malta is a Hague Convention member. Single Permit applicants holding an Identità Malta Approval in Principle Letter must submit an MEA Apostilled Degree/Diploma, Police Clearance Certificate (PCC), and experience letters.",
    studentAcademicRule:
      "Official Acceptance Letter from a licensed Maltese educational institution, Tuition Receipt, and original Indian Degree/Class 12 Mark Sheets with SDM/HRD + MEA Apostille (for MQRIC).",
    workAcademicRule:
      "MQRIC Qualification Recognition Receipt and original Indian Degree/Diploma legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate (proving relationship with financial sponsor) and PSK Police Clearance Certificate with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "Bank statements proving access to minimum €26/day (or 75% of Maltese national minimum wage), Declaration of Proof of Accommodation (attested by a Maltese Notary/Advocate), and Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Identità Malta 'Approval in Principle' Letter, Jobsplus Engagement Form, Housing Authority Lease Registration, and €30,000 Health Insurance.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille (MQRIC)",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC & Civil Docs Need MEA Apostille",
    studentBadgeFinancial: "Maltese Accommodation Form + Apostilled Affidavit",
    workBadgeFinancial: "Identità Approval in Principle + Housing Lease",
  },
  {
    countrySlug: "cyprus",
    countryName: "Cyprus",
    isoCode: "CY",
    isHagueMember: true,
    primaryLanguage: "Greek",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & High Commission of the Republic of Cyprus in New Delhi",
    studentVisaCode: "Cyprus Student Entry Permit · Ministry of Education & Migration Department",
    workVisaCode: "Cyprus Employment Permit & BCS Foreign Interest Company Visa",
    studentImportantRule:
      "Cyprus is a Hague Convention member. Under official Cyprus High Commission rules, ALL four core Indian documents—Academic Certificates, Police Clearance Certificate (PCC), Medical Fitness Report, and Bank Solvency/Sponsorship Letters—MUST carry an MEA Apostille sticker.",
    workImportantRule:
      "Cyprus is a Hague Convention member. Work permit applicants MUST submit an MEA Apostilled Police Clearance Certificate (PCC), MEA Apostilled Medical Certificate (HIV, Hepatitis B/C, Syphilis, Chest X-Ray), and MEA Apostilled Degree Certificate.",
    studentAcademicRule:
      "Original Class 10, Class 12, and Bachelor's Degree Mark Sheets & Certificates—all authenticated by State HRD/SDM and affixed with an original MEA Hague Apostille sticker.",
    workAcademicRule:
      "Original University Degree / Diploma and Professional Certificates legalized with State HRD/SDM + MEA Hague Apostille.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 6 months) and Medical Fitness Report (HIV, Hep B/C, VDRL, Chest X-Ray) — BOTH legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC), Medical Test Report, and Marriage/Birth Certificates — all legalized with an MEA Apostille sticker.",
    studentFinancialRule:
      "Bank Solvency Letter & 6-Month Bank Statement (minimum €7,000) and Parental Sponsorship Affidavit — legalized via Notary, SDM, and MEA Apostille.",
    workFinancialRule:
      "Cyprus Civil Registry & Migration Department Entry Permit, Stamped Employment Contract (Department of Labour), and Bank Guarantee receipt.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille on All Marksheets",
    workBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille on Degree",
    studentBadgePersonal: "PCC & Medical Report BOTH Need MEA Apostille",
    workBadgePersonal: "PCC, Medical & Civil Docs Need MEA Apostille",
    studentBadgeFinancial: "Bank Letter & Sponsorship Need MEA Apostille",
    workBadgeFinancial: "Cyprus Migration Entry Permit + Stamped Contract",
  },
  {
    countrySlug: "greece",
    countryName: "Greece",
    isoCode: "GR",
    isHagueMember: true,
    primaryLanguage: "Greek",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/greece",
    submissionChannel: "Global Visa Center World (GVCW) / VFS India & Embassy of Greece in New Delhi",
    studentVisaCode: "Greece National Type D Student Visa · Greek Ministry of Education",
    workVisaCode: "Greece Type D National Work Visa · Decentralized Administration Approval",
    studentImportantRule:
      "Greece is a Hague Convention member. Type D National Visa applicants MUST submit an RPO Police Clearance Certificate (PCC), Medical Certificate of Good Health, and Academic Certificates with an MEA Apostille sticker and certified Greek translation.",
    workImportantRule:
      "Greece is a Hague Convention member. Work visa applicants require prefectural Work Approval (Metaklisi) from Greece, plus an MEA Apostilled Police Clearance Certificate (PCC), Medical Certificate, and Degrees with Greek translation.",
    studentAcademicRule:
      "Greek University Enrollment Certificate, Tuition Receipt, and original Indian Degree/Class 12 Certificate with State HRD/SDM + MEA Apostille + Certified Greek Translation.",
    workAcademicRule:
      "Original Degree/Diploma and Experience Certificates legalized with SDM/HRD + MEA Apostille + Certified Greek Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Medical Fitness Certificate — BOTH must carry an MEA Apostille sticker and Certified Greek Translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC), Medical Certificate, and Marriage/Birth Certificates with MEA Apostille + Certified Greek Translation.",
    studentFinancialRule:
      "Proof of minimum €400–€650/month living funds, Parental Sponsorship Affidavit (Notarized + MEA Apostille + Greek translation), and Schengen medical insurance.",
    workFinancialRule:
      "Official Work Invitation Decision (Metaklisi) from Greek Decentralized Administration, signed Greek Employment Contract, and Apostilled Affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Greek Translation",
    workBadgeAcademic: "Requires MEA Apostille + Greek Translation",
    studentBadgePersonal: "PCC & Medical Cert Need MEA Apostille + Greek",
    workBadgePersonal: "PCC, Medical & Civil Docs Need Apostille + Greek",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Apostille + Greek",
    workBadgeFinancial: "Greek Metaklisi Approval + Signed Contract",
  },
  {
    countrySlug: "denmark",
    countryName: "Denmark",
    isoCode: "DK",
    isHagueMember: true,
    primaryLanguage: "Danish",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/denmark",
    submissionChannel: "SIRI (Ny i Danmark) & VFS Global India (Embassy of Denmark in New Delhi)",
    studentVisaCode: "Denmark Higher Education Residence Permit (ST1 Form) · SIRI",
    workVisaCode: "Denmark Pay Limit Scheme, Positive List & Fast-Track Work Permit (AR1/AR6) · SIRI",
    studentImportantRule:
      "Denmark is a Hague Convention member. SIRI ST1 Residence Permit applicants require a Case Order ID, tuition payment proof, and MEA Apostille on civil certificates (Birth, Marriage) and non-English academic records.",
    workImportantRule:
      "Denmark is a Hague Convention member. Pay Limit and Positive List work permit applicants require a SIRI Case Order ID, plus MEA Apostille on Indian Degrees (for regulated professions) and Marriage/Birth certificates for accompanying family.",
    studentAcademicRule:
      "Completed ST1 Form (part 1 by Danish university), Case Order ID fee receipt, and original Indian Degree & Transcripts (with MEA Apostille if requested by Danish Agency for Higher Education).",
    workAcademicRule:
      "Original University Degree Certificate legalized with SDM/HRD + MEA Apostille for Positive List qualification assessment or Danish authorization.",
    studentPersonalRule:
      "Original Birth Certificate and Marriage Certificate (for accompanying family members) legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Apostille sticker (mandatory for accompanying family residence permits under SIRI).",
    studentFinancialRule:
      "Bank statement in student's own name showing DKK 6,820/month (if tuition is not fully covering living costs), Tuition Receipt, and Sworn Declaration.",
    workFinancialRule:
      "AR1/AR6 Application Form with SIRI Case Order ID, Danish Employment Contract meeting Pay Limit threshold (DKK 514,000+/year), and Power of Attorney to employer.",
    studentBadgeAcademic: "SIRI ST1 Form + Apostille on Degree (If Requested)",
    workBadgeAcademic: "Positive List / Regulated Roles Need MEA Apostille",
    studentBadgePersonal: "Family Birth & Marriage Certs Need MEA Apostille",
    workBadgePersonal: "Accompanying Family Docs Need MEA Apostille",
    studentBadgeFinancial: "SIRI Case Order ID + DKK 6,820/Month Funds",
    workBadgeFinancial: "SIRI AR1/AR6 Case Order ID + Employment Contract",
  },
  {
    countrySlug: "norway",
    countryName: "Norway",
    isoCode: "NO",
    isHagueMember: true,
    primaryLanguage: "Norwegian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/norway",
    submissionChannel: "UDI Application Portal & VFS Global India (Royal Norwegian Embassy in New Delhi)",
    studentVisaCode: "Norway Study Permit · UDI & Norwegian Deposit Account",
    workVisaCode: "Norway Skilled Worker Residence Permit · UDI & HK-dir (NOKUT)",
    studentImportantRule:
      "Norway is a Hague Convention member. UDI requires Indian students to deposit living expenses (NOK 151,690/year) into a Norwegian student account and provide MEA Apostille on Birth/Marriage certificates and non-English academic records.",
    workImportantRule:
      "Norway is a Hague Convention member. Skilled Worker Permit applicants require a formal UDI Offer of Employment, plus MEA Apostille on Indian University Degrees, Vocational Certificates, and Marriage/Birth certificates.",
    studentAcademicRule:
      "Official Admission Letter from HK-dir (NOKUT) accredited Norwegian institution, plus original Indian Degree & Transcripts (with SDM/HRD + MEA Apostille if requested).",
    workAcademicRule:
      "Original University Degree or Craft/Vocational Diploma legalized with SDM/HRD + MEA Apostille for UDI Skilled Worker assessment.",
    studentPersonalRule:
      "Original Birth Certificate (mandatory for minors or family immigration) and Marriage Certificate with MEA Apostille.",
    workPersonalRule:
      "Original Marriage Certificate, Birth Certificates, and PSK Police Clearance Certificate with MEA Apostille.",
    studentFinancialRule:
      "Confirmation of NOK 151,690/year living funds + tuition deposited into the Norwegian university's designated bank account, plus Norwegian housing contract.",
    workFinancialRule:
      "UDI Offer of Employment Form signed by Norwegian employer, housing contract in Norway, and Notarized Experience/Name Affidavits.",
    studentBadgeAcademic: "NOKUT / HK-dir Admission + Apostille (If Requested)",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille on Degree",
    studentBadgePersonal: "Birth & Marriage Certs Need MEA Apostille",
    workBadgePersonal: "Family & PCC Docs Need MEA Apostille",
    studentBadgeFinancial: "NOK 151,690 Deposit Proof + Norwegian Housing",
    workBadgeFinancial: "UDI Offer of Employment Form + Housing Proof",
  },
  {
    countrySlug: "finland",
    countryName: "Finland",
    isoCode: "FI",
    isHagueMember: true,
    primaryLanguage: "Finnish",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/finland",
    submissionChannel: "Enter Finland (Migri) & VFS Global India (Embassy of Finland in New Delhi)",
    studentVisaCode: "Finland Residence Permit for Studies · Enter Finland (Migri)",
    workVisaCode: "Finland Specialist & Employed Person Residence Permit (TTOL) · Migri",
    studentImportantRule:
      "Finland is a Hague Convention member. Migri (Finnish Immigration Service) requires original educational certificates at VFS identification and strictly mandates an MEA Apostille sticker on Birth and Marriage certificates for family members.",
    workImportantRule:
      "Finland is a Hague Convention member. Specialist and TTOL work permit applicants require employer terms submitted on Enter Finland, plus MEA Apostille on Degrees, Marriage Certificates, and Birth Certificates.",
    studentAcademicRule:
      "Studyinfo.fi Acceptance Letter from Finnish University/UAS, Tuition Payment/Scholarship Receipt, and original Indian Degree/Class 12 Certificates (with MEA Apostille if requested).",
    workAcademicRule:
      "Original Higher Education Degree & Transcripts legalized with SDM/HRD + MEA Apostille (especially for Finnish National Agency for Education / Valvira healthcare recognition).",
    studentPersonalRule:
      "Original Birth Certificate (mandatory for minor students or family ties) and Marriage Certificate with MEA Apostille.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Apostille sticker (strictly required by Migri for family tie residence permits).",
    studentFinancialRule:
      "Personal bank account statement showing at least €800/month (€9,600/year) for living expenses, Bank Origin of Funds proof/Sponsorship Affidavit (Notarized + Apostille), and Swedbank/SIP health insurance.",
    workFinancialRule:
      "Employer's Terms of Employment entered in Enter Finland, signed Finnish Employment Contract, and Notarized Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "Original Degree at VFS · Apostille if Requested",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Family Birth & Marriage Certs Need MEA Apostille",
    workBadgePersonal: "Mandatory MEA Apostille on Marriage & Birth Certs",
    studentBadgeFinancial: "€9,600/Yr Personal Funds + Apostilled Affidavit",
    workBadgeFinancial: "Enter Finland Employer Terms + Signed Contract",
  },
  {
    countrySlug: "singapore",
    countryName: "Singapore",
    isoCode: "SG",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/singapore",
    submissionChannel: "ICA SOLAR Portal (Student's Pass) & Ministry of Manpower MOM (Employment Pass / S Pass)",
    studentVisaCode: "Singapore Student's Pass (STP) · ICA SOLAR (Form 16 & V36)",
    workVisaCode: "Singapore Employment Pass (EP) & S Pass · MOM COMPASS Verification",
    studentImportantRule:
      "Singapore is a Hague Convention member (since Sep 2021). ICA Student's Pass applicants require Form 16/V36, birth certificate, academic mark sheets, and MEA Apostille + certified English translation if any document is in a regional language.",
    workImportantRule:
      "Singapore is a Hague Convention member. Under MOM's COMPASS framework, all degree-level qualifications declared for an Employment Pass (EP) require mandatory verification and often an MEA Apostille sticker on academic and family certificates.",
    studentAcademicRule:
      "In-Principle Approval (IPA) Letter from ICA, SOLAR registration number, and original Indian Degree/Class 12 mark sheets (with MEA Apostille if requested by Singapore institution).",
    workAcademicRule:
      "Original University Degree & Transcripts verified under MOM COMPASS (via background screening + SDM/HRD & MEA Apostille).",
    studentPersonalRule:
      "Original Birth Certificate (showing parents' names matching passport) with MEA Apostille + Certified English translation if issued in a regional language.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Apostille sticker for Dependant's Pass (DP) and Long-Term Visit Pass (LTVP).",
    studentFinancialRule:
      "Fixed Deposit / Bank Statement showing SGD $30,000+, Sponsor's Employment & Income Proof, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "MOM In-Principle Approval (IPA) Letter, signed Singapore Employment Contract, Medical Examination Report (HIV & TB check), and Name Discrepancy Affidavit (if applicable).",
    studentBadgeAcademic: "ICA SOLAR Forms + Verified Academic Records",
    workBadgeAcademic: "MOM COMPASS Degree Verification + MEA Apostille",
    studentBadgePersonal: "Birth Certificate Needs MEA Apostille",
    workBadgePersonal: "Dependant Pass Docs Need MEA Apostille",
    studentBadgeFinancial: "SGD $30,000+ Bank Proof + Notarized Affidavit",
    workBadgeFinancial: "MOM IPA Letter + Medical Screening",
  },
  {
    countrySlug: "malaysia",
    countryName: "Malaysia",
    isoCode: "MY",
    isHagueMember: false,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/malaysia",
    submissionChannel: "EMGS Portal (Education Malaysia), ESD Portal & VFS Global India (High Commission of Malaysia)",
    studentVisaCode: "Malaysia Student Pass · EMGS Visa Approval Letter (VAL) & Single Entry Visa",
    workVisaCode: "Malaysia Employment Pass (EP Category I/II/III) & Professional Visit Pass · ESD / MDEC",
    studentImportantRule:
      "Malaysia is a Non-Hague country. An Apostille sticker is NOT valid for Malaysia. Indian academic certificates and birth/marriage documents require State HRD/SDM → MEA Normal Attestation → High Commission of Malaysia Legalization in New Delhi.",
    workImportantRule:
      "Malaysia is a Non-Hague country. For ESD/MDEC Employment Pass and Dependent Pass filings, your Indian Degree Certificate, Marriage Certificate, and Birth Certificates MUST be attested by MEA New Delhi and legalized by the High Commission of Malaysia.",
    studentAcademicRule:
      "EMGS eVAL (Electronic Visa Approval Letter), Malaysian University Offer Letter, and original Indian Degree/Class 12 Mark Sheets attested via State HRD/SDM → MEA Normal Attestation → Malaysia High Commission.",
    workAcademicRule:
      "Original University Degree or Diploma Certificate attested via State HRD/SDM → MEA Normal Attestation → High Commission of Malaysia in New Delhi (or Chennai/Mumbai).",
    studentPersonalRule:
      "Original Birth Certificate (attested by SDM → MEA → Malaysia High Commission), Pre-Arrival EMGS Medical Screening Report, and Valid Passport (18+ months validity).",
    workPersonalRule:
      "Original Marriage Certificate, Children's Birth Certificates, and PSK Police Clearance Certificate attested via SDM → MEA Normal Attestation → High Commission of Malaysia (mandatory for Dependent Pass).",
    studentFinancialRule:
      "Tuition Fee Receipt, Personal Bond fee, Sponsor Bank Statements, and Notarized Sponsorship Undertaking.",
    workFinancialRule:
      "ESD / MDEC Employment Pass Approval Letter (VDR - Visa with Reference), stamped Employment Contract, and Attested Affidavits.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Malaysia High Commission",
    workBadgeAcademic: "Mandatory MEA + Malaysia High Commission Stamp",
    studentBadgePersonal: "Requires MEA + Malaysia High Commission + EMGS Medical",
    workBadgePersonal: "Marriage & Birth Need Malaysia High Commission Stamp",
    studentBadgeFinancial: "EMGS eVAL + Sponsor Financial Undertaking",
    workBadgeFinancial: "ESD / MDEC Approval (VDR) + Employment Contract",
  },
  {
    countrySlug: "south-africa",
    countryName: "South Africa",
    isoCode: "ZA",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/south-africa",
    submissionChannel: "VFS Global India (High Commission of South Africa in New Delhi & Consulate in Mumbai)",
    studentVisaCode: "South Africa Study Visa (Section 13) · VFS South Africa India",
    workVisaCode: "South Africa Critical Skills Work Visa & General Work Visa · SAQA Evaluation",
    studentImportantRule:
      "South Africa is a Hague Convention member. VFS South Africa requires an RPO Police Clearance Certificate (PCC), Medical & Radiological Reports (BI-811 & BI-806), Yellow Fever Card (if applicable), and MEA Apostille on Birth/Educational certificates.",
    workImportantRule:
      "South Africa is a Hague Convention member. Critical Skills and General Work Visa applicants MUST obtain a SAQA Evaluation Certificate and submit an MEA Apostilled Degree, Police Clearance Certificate (PCC), and Marriage/Birth certificates.",
    studentAcademicRule:
      "Official Acceptance Letter on South African institution letterhead, plus original Indian Degree/Class 12 certificates legalized with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "SAQA (South African Qualifications Authority) Certificate of Evaluation, Professional Body Registration, and original Indian Degree legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate with MEA Apostille, plus Medical Report (Form BI-811) & Radiological Chest X-Ray Report (Form BI-806).",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC), Form BI-811 Medical & BI-806 Radiological Reports, and Original Marriage/Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "3-month certified bank statements, South African Medical Aid cover (registered with Council for Medical Schemes), Accommodation Proof, and Apostilled Parental Consent/Sponsorship Affidavit.",
    workFinancialRule:
      "Signed Employment Contract / Undertaking of Repatriation from South African employer, Department of Labour proof (for General Work Visa), and Notarized Affidavits.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "SAQA Evaluation + MEA Apostille on Degree",
    studentBadgePersonal: "PCC & Birth Need Apostille + BI-811/806 Medical",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "SA Medical Aid + Bank Statements + Apostilled Affidavit",
    workBadgeFinancial: "Employer Repatriation Undertaking + Contract",
  },
  {
    countrySlug: "turkey",
    countryName: "Turkey (Türkiye)",
    isoCode: "TR",
    isHagueMember: true,
    primaryLanguage: "Turkish",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/turkey",
    submissionChannel: "Gateway International (Official Visa Agency) & Embassy of the Republic of Türkiye in New Delhi",
    studentVisaCode: "Türkiye Education / Student Visa · YÖK Denklik Equivalency",
    workVisaCode: "Türkiye Work Visa & Employment Permit · Ministry of Labour and Social Security",
    studentImportantRule:
      "Turkey (Türkiye) is a Hague Convention member. Turkish universities and YÖK (Council of Higher Education) require your Indian Class 12 or Bachelor's Degree & Transcripts to carry an MEA Apostille sticker and certified Turkish translation.",
    workImportantRule:
      "Turkey is a Hague Convention member. Work visa applicants require an online Ministry of Labour reference number, plus an MEA Apostilled University Degree, Police Clearance Certificate (PCC), and certified Turkish translation.",
    studentAcademicRule:
      "Official Acceptance Letter (Kabul Mektubu) from a Turkish university, plus original Indian Class 12 / Degree & Transcripts with State HRD/SDM + MEA Apostille + Certified Turkish Translation (for YÖK Denklik).",
    workAcademicRule:
      "Original University Degree or Technical Diploma legalized with State HRD/SDM + MEA Apostille + Certified Turkish Translation.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) with MEA Apostille + Certified Turkish Translation.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille + Certified Turkish Translation.",
    studentFinancialRule:
      "6-month bank statements (minimum USD $6,000 balance), Parental Sponsorship Affidavit (Notarized + MEA Apostille + Turkish translation), and Turkish health insurance.",
    workFinancialRule:
      "Turkish Employer Invitation & Signed Employment Contract (allowing Ministry of Labour portal submission within 30 days), Company Tax/Chamber Certificate, and Apostilled Affidavits.",
    studentBadgeAcademic: "YÖK Denklik Needs HRD/SDM + Apostille + Turkish",
    workBadgeAcademic: "Requires MEA Apostille + Turkish Translation",
    studentBadgePersonal: "PCC & Birth Cert Need Apostille + Turkish",
    workBadgePersonal: "PCC & Civil Docs Need Apostille + Turkish",
    studentBadgeFinancial: "Sponsorship Affidavit Needs Apostille + Turkish",
    workBadgeFinancial: "Ministry of Labour Ref + Signed Turkish Contract",
  },
  {
    countrySlug: "croatia",
    countryName: "Croatia",
    isoCode: "HR",
    isHagueMember: true,
    primaryLanguage: "Croatian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of the Republic of Croatia in New Delhi",
    studentVisaCode: "Croatia National Type D Study Visa & Temporary Stay (Privremeni boravak)",
    workVisaCode: "Croatia Stay and Work Permit (Dozvola za boravak i rad) & EU Blue Card",
    studentImportantRule:
      "Croatia is a Hague Convention member and Schengen state. VFS Croatia strictly requires an RPO Police Clearance Certificate (PCC) and Birth/Academic certificates to carry an original MEA Apostille sticker and certified Croatian/English translation.",
    workImportantRule:
      "Croatia is a Hague Convention member. To apply for a Croatian Stay and Work Permit (MUP), your Indian RPO Police Clearance Certificate (PCC) MUST be legalized with an MEA Apostille sticker (issued within 6 months).",
    studentAcademicRule:
      "Croatian University Admission Letter and original Indian Degree / Class 12 Certificate & Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original Degree/Diploma and Experience Certificates legalized with SDM/HRD + MEA Apostille (mandatory for regulated/skilled roles and EU Blue Card).",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate with mandatory MEA Apostille sticker + Croatian/English translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC — mandatory for first-time MUP Work Permit) and Marriage/Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "Proof of means of subsistence in Croatia, Accommodation Lease, €30,000 Schengen health insurance, and Notarized + Apostilled Parental Sponsorship Affidavit.",
    workFinancialRule:
      "Approved Croatian Stay and Work Permit (issued by Ministry of Interior - MUP), signed Croatian Employment Contract, and €30,000 Schengen travel insurance.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC (MUP Rule)",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "Croatian Lease + Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "MUP Work Permit Approval + Employment Contract",
  },
  {
    countrySlug: "romania",
    countryName: "Romania",
    isoCode: "RO",
    isHagueMember: true,
    primaryLanguage: "Romanian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "eVisa Romania Portal & Embassy of Romania in New Delhi",
    studentVisaCode: "Romania D/SD Long-Stay Study Visa · Ministry of Education Letter of Acceptance",
    workVisaCode: "Romania D/AM Long-Stay Employment Visa · IGI Work Permit (Aviz de Angajare)",
    studentImportantRule:
      "Romania is a Hague Convention member. To obtain the Romanian Ministry of Education Letter of Acceptance, your Indian Class 12 or Bachelor's Degree and Transcripts MUST carry State HRD/SDM authentication and an MEA Apostille sticker.",
    workImportantRule:
      "Romania is a Hague Convention member. D/AM Work Visa applicants require an original IGI Work Permit (Aviz de Angajare), plus an RPO Police Clearance Certificate (PCC) and Degree legalized with an MEA Apostille sticker.",
    studentAcademicRule:
      "Romanian Ministry of Education Letter of Acceptance, plus original Indian Class 12 / Bachelor's Degree & Transcripts with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original Education Diploma / Qualification Certificate legalized with State HRD/SDM + MEA Apostille.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate with mandatory MEA Apostille sticker, plus Medical Certificate.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with mandatory MEA Apostille sticker.",
    studentFinancialRule:
      "Proof of full 1st-year tuition fee payment, Bank Statement showing minimum €500/month for the academic year, Accommodation Proof, and €30,000 Medical Insurance.",
    workFinancialRule:
      "IGI Work Permit (Aviz de Angajare issued by General Inspectorate for Immigration), minimum wage financial proof, Accommodation in Romania, and €30,000 Medical Insurance.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille for Acceptance",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC & Birth Cert",
    workBadgePersonal: "Mandatory MEA Apostille on PCC",
    studentBadgeFinancial: "1-Year Tuition Receipt + €500/Mo Bank Proof",
    workBadgeFinancial: "IGI Work Permit (Aviz de Angajare) + Insurance",
  },
  {
    countrySlug: "bulgaria",
    countryName: "Bulgaria",
    isoCode: "BG",
    isHagueMember: true,
    primaryLanguage: "Bulgarian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of the Republic of Bulgaria in New Delhi",
    studentVisaCode: "Bulgaria Type D Long-Stay Student Visa · Ministry of Education Udostoverenie",
    workVisaCode: "Bulgaria Type D Work Visa · Unified Residence and Work Permit (Single Permit) & EU Blue Card",
    studentImportantRule:
      "Bulgaria is a Hague Convention member. To obtain the Bulgarian Ministry of Education Certificate (Udostoverenie), your Indian Class 12 / Degree, Transcripts, and Medical Certificate MUST carry an MEA Apostille sticker and Bulgarian translation.",
    workImportantRule:
      "Bulgaria is a Hague Convention member. Single Permit and EU Blue Card applicants MUST submit an MEA Apostilled Police Clearance Certificate (PCC) and Degree Certificate with certified Bulgarian translation.",
    studentAcademicRule:
      "Bulgarian Ministry of Education Certificate (Udostoverenie), plus original Indian Class 12 / Bachelor's Degree & Mark Sheets with State HRD/SDM + MEA Apostille + Bulgarian Translation.",
    workAcademicRule:
      "Original University Degree or Vocational Diploma legalized with State HRD/SDM + MEA Apostille + Certified Bulgarian Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC), Medical Certificate, and Birth Certificate — all with MEA Apostille + Bulgarian translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with MEA Apostille + Certified Bulgarian Translation.",
    studentFinancialRule:
      "Bulgarian Bank Account / Financial Proof, Notarized Lease Agreement + Landlord Declaration in Bulgaria, and €30,000 Schengen Medical Insurance.",
    workFinancialRule:
      "Bulgarian Employment Agency / Migration Directorate Work Permit Approval, Notarized Accommodation Declaration, and €30,000 Insurance.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille + Bulgarian",
    workBadgeAcademic: "Requires MEA Apostille + Bulgarian Translation",
    studentBadgePersonal: "PCC, Medical & Birth Need Apostille + Bulgarian",
    workBadgePersonal: "PCC & Civil Docs Need Apostille + Bulgarian",
    studentBadgeFinancial: "Bulgarian Notarized Lease + Bank Proof",
    workBadgeFinancial: "Migration Directorate Permit + Notarized Lease",
  },
  {
    countrySlug: "slovakia",
    countryName: "Slovakia",
    isoCode: "SK",
    isHagueMember: true,
    primaryLanguage: "Slovak",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "BLS / VFS India & Embassy of the Slovak Republic in New Delhi",
    studentVisaCode: "Slovakia National D Visa & Temporary Residence for Study",
    workVisaCode: "Slovakia Single Permit for Employment & EU Blue Card",
    studentImportantRule:
      "Slovakia is a Hague Convention member. Slovak Foreign Police strictly require your RPO Police Clearance Certificate (PCC), Academic Certificates (for nostrification), and Financial Bank Confirmation to carry an MEA Apostille sticker and Slovak translation.",
    workImportantRule:
      "Slovakia is a Hague Convention member. For a Slovak Single Permit or EU Blue Card, your Indian Police Clearance Certificate (PCC valid 90 days) and Degree Certificate MUST carry an original MEA Apostille sticker and Slovak translation.",
    studentAcademicRule:
      "Slovak University Acceptance Letter and original Indian Degree / Class 12 Certificate with State HRD/SDM + MEA Apostille + Slovak Translation.",
    workAcademicRule:
      "Original University Degree or Vocational Certificate legalized with State HRD/SDM + MEA Apostille + Certified Slovak Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 90 days) with mandatory MEA Apostille + Official Slovak Translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid for 90 days) and Marriage/Birth Certificates with mandatory MEA Apostille + Official Slovak Translation.",
    studentFinancialRule:
      "Bank Balance Confirmation (12× Slovak subsistence minimum), Notarized Slovak Accommodation Proof (Čestné vyhlásenie), and Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Written Promise of Employment (Prísľub na zamestnanie) / Labour Office Confirmation, Notarized Slovak Accommodation Proof, and Schengen Insurance.",
    studentBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Slovak",
    workBadgeAcademic: "Requires HRD/SDM + MEA Apostille + Slovak",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC (Valid 90 Days)",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "Slovak Accommodation Proof + Apostilled Bank/Affidavit",
    workBadgeFinancial: "Promise of Employment + Slovak Accommodation Form",
  },
  {
    countrySlug: "slovenia",
    countryName: "Slovenia",
    isoCode: "SI",
    isHagueMember: true,
    primaryLanguage: "Slovenian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of the Republic of Slovenia in New Delhi",
    studentVisaCode: "Slovenia First Single Permit for Studies / Type D Visa",
    workVisaCode: "Slovenia Single Residence and Work Permit & EU Blue Card",
    studentImportantRule:
      "Slovenia is a Hague Convention member. Slovenian Administrative Units (Upravna enota) require your RPO Police Clearance Certificate (PCC), Birth Certificate, and Sponsorship Proofs to carry an MEA Apostille sticker and Slovenian translation.",
    workImportantRule:
      "Slovenia is a Hague Convention member. Single Permit and EU Blue Card applications require an MEA Apostilled Police Clearance Certificate (PCC valid 90 days) and Apostilled educational/civil certificates.",
    studentAcademicRule:
      "Slovenian University Admission Confirmation and original Indian Degree / Class 12 Mark Sheets with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Vocational Diploma legalized with SDM/HRD + MEA Apostille + Certified Slovenian Translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate with mandatory MEA Apostille sticker + Slovenian translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with mandatory MEA Apostille sticker + Slovenian translation.",
    studentFinancialRule:
      "Proof of monthly subsistence (~€490/month), Parental Sponsorship Affidavit (Notarized + MEA Apostille), and Health Insurance.",
    workFinancialRule:
      "Signed Slovenian Employment Contract, Employment Service of Slovenia (ZRSZ) Consent, and €30,000 Health Insurance.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille + Slovenian",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC & Birth Cert",
    workBadgePersonal: "Mandatory MEA Apostille on PCC & Civil Docs",
    studentBadgeFinancial: "Subsistence Proof + Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "ZRSZ Consent + Slovenian Employment Contract",
  },
  {
    countrySlug: "estonia",
    countryName: "Estonia",
    isoCode: "EE",
    isHagueMember: true,
    primaryLanguage: "Estonian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of the Republic of Estonia in New Delhi",
    studentVisaCode: "Estonia Long-Stay Type D Student Visa & Temporary Residence Permit · ENIC/NARIC",
    workVisaCode: "Estonia Type D Work Visa (Short-Term Employment Registration - LTR) & EU Blue Card",
    studentImportantRule:
      "Estonia is a Hague Convention member. Estonian ENIC/NARIC and universities require your Indian Degree/Class 12 certificates and Birth/Marriage certificates to carry an MEA Apostille sticker.",
    workImportantRule:
      "Estonia is a Hague Convention member. Work visa applicants require Police and Border Guard Board (PPA) Short-Term Employment Registration, plus MEA Apostille on Degrees, PCC, and Marriage/Birth certificates.",
    studentAcademicRule:
      "Estonian University Admission Confirmation, ENIC/NARIC evaluation, and original Indian Degree/Class 12 Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate & Experience Letters legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate (for minors/family proof) and PCC with MEA Apostille, plus Valid Passport.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "6-month bank statements showing minimum €800/month, Parental Sponsorship Affidavit (Notarized + MEA Apostille), and €30,000 Schengen Health Insurance.",
    workFinancialRule:
      "PPA Short-Term Employment Registration Confirmation from Estonian Police and Border Guard Board, Employment Contract, and €30,000 Health Insurance.",
    studentBadgeAcademic: "ENIC/NARIC Estonia Needs HRD/SDM + Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "€800/Mo Funds + Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "PPA Employment Registration + Signed Contract",
  },
  {
    countrySlug: "luxembourg",
    countryName: "Luxembourg",
    isoCode: "LU",
    isHagueMember: true,
    primaryLanguage: "French",
    translationPath: "/translation/french-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of the Grand Duchy of Luxembourg in New Delhi",
    studentVisaCode: "Luxembourg Temporary Authorization to Stay (AST) & Type D Study Visa",
    workVisaCode: "Luxembourg Salaried Worker / EU Blue Card Authorization to Stay (AST) & Type D Visa",
    studentImportantRule:
      "Luxembourg is a Hague Convention member. Before applying for a Type D Visa at VFS India, you MUST obtain a Temporary Authorization to Stay (Autorisation de séjour temporaire) from the Luxembourg Immigration Directorate using an MEA Apostilled PCC and Birth Certificate.",
    workImportantRule:
      "Luxembourg is a Hague Convention member. For Luxembourg's Temporary Authorization to Stay (AST) and EU Blue Card, your RPO Police Clearance Certificate (PCC), Degree, and Marriage/Birth certificates MUST carry an MEA Apostille sticker.",
    studentAcademicRule:
      "University of Luxembourg Acceptance Letter and original Indian Degree / Class 12 Certificate legalized with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate and CV/Experience Letters legalized with SDM/HRD + MEA Apostille + French/German/English translation.",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Birth Certificate with mandatory MEA Apostille sticker (submitted first to Ministry of Foreign and European Affairs in Luxembourg).",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with mandatory MEA Apostille sticker.",
    studentFinancialRule:
      "Temporary Authorization to Stay (AST), proof of 80% of Luxembourg social minimum wage (~€2,050/month) via blocked account/sponsorship, and Health Insurance.",
    workFinancialRule:
      "Original Temporary Authorization to Stay (AST) from Luxembourg Immigration Directorate, ADEM Certificate / EU Blue Card Contract, and Health Insurance.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC & Birth Cert (For AST)",
    workBadgePersonal: "Mandatory MEA Apostille on PCC, Marriage & Birth",
    studentBadgeFinancial: "Luxembourg AST Approval + Financial Proof",
    workBadgeFinancial: "Luxembourg AST Approval + EU Blue Card Contract",
  },
  {
    countrySlug: "mauritius",
    countryName: "Mauritius",
    isoCode: "MU",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/mauritius",
    submissionChannel: "Passport and Immigration Office (PIO Mauritius) & High Commission of Mauritius in New Delhi",
    studentVisaCode: "Mauritius Student Visa · Higher Education Commission (HEC) & PIO",
    workVisaCode: "Mauritius Occupation Permit (Professional) & Work Permit · EDB Mauritius",
    studentImportantRule:
      "Mauritius is a Hague Convention member. Student visa and medical/university enrollment files require your Indian Class 12/Degree certificates, Birth Certificate, and PCC to carry an MEA Apostille sticker.",
    workImportantRule:
      "Mauritius is a Hague Convention member. Economic Development Board (EDB) Occupation Permits and Ministry of Labour Work Permits require MEA Apostille on your Indian Degree, Birth Certificate, Marriage Certificate, and PCC.",
    studentAcademicRule:
      "Letter of Offer from HEC-registered Mauritian institution and original Indian Class 12 / Degree Mark Sheets with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree, Professional Qualifications, and Experience Letters legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate, PSK Police Clearance Certificate (PCC), and Medical Report (HIV, Hepatitis B, Chest X-Ray) with MEA Apostille.",
    workPersonalRule:
      "Original Birth Certificate, Marriage Certificate, and PSK Police Clearance Certificate (PCC) with MEA Apostille.",
    studentFinancialRule:
      "Tuition Fee Receipt, Bank Statement confirming living funds in Mauritius, Accommodation Proof, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "EDB Occupation Permit Approval in Principle or Work Permit, Employment Contract, and Medical Fitness Certificate.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "Birth, Marriage & PCC Need MEA Apostille",
    studentBadgeFinancial: "HEC Offer + Bank Statement + Sponsorship Affidavit",
    workBadgeFinancial: "EDB Occupation Permit + Employment Contract",
  },
  {
    countrySlug: "thailand",
    countryName: "Thailand",
    isoCode: "TH",
    isHagueMember: false,
    primaryLanguage: "Thai",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/thailand",
    submissionChannel: "Thai e-Visa / VFS Global India & Royal Thai Embassy (New Delhi) / Consulates (Mumbai, Chennai, Kolkata)",
    studentVisaCode: "Thailand Non-Immigrant 'ED' Student Visa · Ministry of Education Thailand",
    workVisaCode: "Thailand Non-Immigrant 'B' Work Visa & BOI Smart Visa · WP.3 / BOI Approval",
    studentImportantRule:
      "Thailand is a Non-Hague country. An Apostille sticker is NOT valid for Thailand. Indian academic certificates and civil documents require State HRD/SDM → MEA Normal Attestation → Royal Thai Embassy Legalization.",
    workImportantRule:
      "Thailand is a Non-Hague country. For a Thailand Non-Immigrant 'B' Work Visa and Thai Work Permit, your Indian Degree Certificate, Police Clearance Certificate (PCC), and Marriage/Birth certificates MUST be attested by MEA New Delhi and legalized by the Royal Thai Embassy.",
    studentAcademicRule:
      "Acceptance Letter from Thai University / Ministry of Education approval, plus original Indian Degree/Class 12 Mark Sheets attested via State HRD/SDM → MEA Normal Attestation → Royal Thai Embassy.",
    workAcademicRule:
      "Original University Degree Certificate & Transcripts attested via State HRD/SDM → MEA Normal Attestation → Royal Thai Embassy (mandatory for Thai Teachers Council / BOI / Department of Employment Work Permit).",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) attested via SDM → MEA Normal Attestation → Royal Thai Embassy.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Child Birth Certificates attested via SDM → MEA Normal Attestation → Royal Thai Embassy (for Non-O Dependent Visa).",
    studentFinancialRule:
      "6-month bank statement (minimum THB 100,000 / ₹2.5L+ balance), Sponsor Letter, and Thai University registration documents.",
    workFinancialRule:
      "WP.3 Pre-Work Permit Approval Letter from Thai Ministry of Labour (or BOI Investment Promotion Letter), Thai Company DBD Registration docs, and Employment Contract.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Royal Thai Embassy",
    workBadgeAcademic: "Mandatory HRD/SDM → MEA → Royal Thai Embassy",
    studentBadgePersonal: "PCC & Birth Cert Need Thai Embassy Legalization",
    workBadgePersonal: "PCC, Marriage & Birth Need Thai Embassy Stamp",
    studentBadgeFinancial: "6-Month Bank Statement + Sponsor Undertaking",
    workBadgeFinancial: "WP.3 / BOI Letter + Thai Corporate Documents",
  },
  {
    countrySlug: "vietnam",
    countryName: "Vietnam",
    isoCode: "VN",
    isHagueMember: false,
    primaryLanguage: "Vietnamese",
    translationPath: "/translation/vietnamese-translation",
    countryGuidePath: "/countries/vietnam",
    submissionChannel: "Embassy of the Socialist Republic of Vietnam in New Delhi & Consulate General in Mumbai",
    studentVisaCode: "Vietnam DH Student Visa · Vietnamese Immigration Approval Letter",
    workVisaCode: "Vietnam LD1 / LD2 Work Visa & TRC · Department of Labour (DOLISA) Work Permit",
    studentImportantRule:
      "Vietnam is a Non-Hague country. An Apostille sticker is NOT valid in Vietnam. Indian educational and personal documents require State HRD/SDM → MEA Normal Attestation → Vietnam Embassy Consular Legalization in New Delhi.",
    workImportantRule:
      "Vietnam is a Non-Hague country. To obtain a Vietnam Work Permit (DOLISA) and Temporary Residence Card (TRC), your Indian University Degree, 3+ Year Work Experience Certificate, and Police Clearance Certificate (PCC) MUST be attested by MEA New Delhi and legalized by the Embassy of Vietnam.",
    studentAcademicRule:
      "Vietnamese University Admission Letter and original Indian Degree / Class 12 Certificate attested via State HRD/SDM → MEA Normal Attestation → Embassy of Vietnam.",
    workAcademicRule:
      "Original University Degree AND minimum 3-Year Work Experience Certificate attested via State HRD/SDM/Notary → MEA Normal Attestation → Embassy of Vietnam in New Delhi.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) attested via SDM → MEA Normal Attestation → Embassy of Vietnam.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC valid for 6 months), Original Marriage Certificate, and Birth Certificates attested via SDM → MEA Normal Attestation → Embassy of Vietnam (for TT Dependent TRC).",
    studentFinancialRule:
      "Vietnamese Immigration Visa Approval Letter (Công văn nhập cảnh), Bank Statements, and Sponsorship Undertaking.",
    workFinancialRule:
      "Vietnam Work Permit / Work Permit Exemption & Immigration Visa Approval Letter (LD1/LD2), Health Checkup Certificate, and Vietnamese Translation.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Vietnam Embassy",
    workBadgeAcademic: "Degree + Experience Cert → MEA → Vietnam Embassy",
    studentBadgePersonal: "PCC & Birth Cert Need Vietnam Embassy Stamp",
    workBadgePersonal: "PCC, Marriage & Birth Need Vietnam Embassy Stamp",
    studentBadgeFinancial: "Vietnam Visa Approval Letter + Financial Proof",
    workBadgeFinancial: "DOLISA Work Permit + LD Visa Approval Letter",
  },
  {
    countrySlug: "georgia",
    countryName: "Georgia",
    isoCode: "GE",
    isHagueMember: true,
    primaryLanguage: "Georgian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "VFS Global India & Embassy of Georgia in New Delhi",
    studentVisaCode: "Georgia D3 Immigration Student Visa (MBBS & Higher Education) · EQE Recognition",
    workVisaCode: "Georgia D1 Immigration Work Visa & Residence Permit",
    studentImportantRule:
      "Georgia is a Hague Convention member. Indian MBBS and university students MUST have their Class 10 & 12 Mark Sheets, NEET Scorecard, Birth Certificate, and Sponsorship Affidavit legalized with an MEA Apostille sticker and Georgian translation for EQE recognition.",
    workImportantRule:
      "Georgia is a Hague Convention member. D1 Work Visa applicants require a Georgian employment contract (meeting minimum turnover/salary rules), plus an MEA Apostilled Police Clearance Certificate (PCC) and Degree Certificate.",
    studentAcademicRule:
      "Georgian University Rector's Order & Ministry of Education (EQE) Recognition, plus original Class 10 & 12 Mark Sheets and NEET Scorecard with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree / Diploma and Professional Certificates legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate (mandatory to prove relationship with sponsoring parents) and PCC with MEA Apostille + Georgian translation.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC) and Marriage/Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "6-month sponsor bank statements, Tuition Fee Receipt, Accommodation Proof in Georgia, and Notarized + MEA Apostilled Parental Sponsorship Affidavit.",
    workFinancialRule:
      "Signed Georgian Employment Contract, Georgian Employer Revenue Service Certificate, Bank Statement, and Travel/Health Insurance.",
    studentBadgeAcademic: "EQE MBBS Recognition Needs HRD/SDM + Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC & Civil Docs Need MEA Apostille",
    studentBadgeFinancial: "Parental Sponsorship Affidavit Needs MEA Apostille",
    workBadgeFinancial: "Georgian D1 Work Contract + Employer Tax Proof",
  },
  {
    countrySlug: "kazakhstan",
    countryName: "Kazakhstan",
    isoCode: "KZ",
    isHagueMember: true,
    primaryLanguage: "Russian",
    translationPath: "/translation/russian-translation",
    countryGuidePath: "/countries",
    submissionChannel: "Embassy of the Republic of Kazakhstan in New Delhi",
    studentVisaCode: "Kazakhstan C9 Student Visa (MBBS & University Study) · Migration Service Invitation",
    workVisaCode: "Kazakhstan C3 Work Visa · Ministry of Labour Work Permit",
    studentImportantRule:
      "Kazakhstan is a Hague Convention member. Indian MBBS and university applicants require their original Class 12 Mark Sheet, NEET Qualification, and Birth/PCC certificates to carry an MEA Apostille sticker with Russian/Kazakh translation.",
    workImportantRule:
      "Kazakhstan is a Hague Convention member. For a Kazakhstan C3 Work Permit, your Indian University Degree, Work Experience Letters, and Police Clearance Certificate (PCC) MUST carry an original MEA Apostille sticker and certified Russian translation.",
    studentAcademicRule:
      "Kazakh University Invitation & Visa Support Number, plus original Class 12 Certificate & Mark Sheet with State HRD/SDM + MEA Apostille + Certified Russian Translation.",
    workAcademicRule:
      "Original University Degree and Diploma Transcripts legalized with State HRD/SDM + MEA Apostille + Certified Russian Translation.",
    studentPersonalRule:
      "Original Birth Certificate, PSK Police Clearance Certificate (PCC), and Medical Fitness Certificate (Form 086/U & HIV test) with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille + Certified Russian Translation.",
    studentFinancialRule:
      "University Tuition Contract & Payment Receipt, Sponsor Bank Statement, and Notarized + Apostilled Parental Sponsorship Affidavit.",
    workFinancialRule:
      "Kazakhstan Ministry of Interior Visa Support Number, Foreign Work Permit copy, and Employment Contract.",
    studentBadgeAcademic: "MBBS Nostrification Needs HRD/SDM + Apostille + Russian",
    workBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille + Russian",
    studentBadgePersonal: "PCC & Birth Cert Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need Apostille + Russian",
    studentBadgeFinancial: "Visa Support Number + Apostilled Affidavit",
    workBadgeFinancial: "Kazakhstan C3 Visa Support + Work Permit",
  },
  {
    countrySlug: "uzbekistan",
    countryName: "Uzbekistan",
    isoCode: "UZ",
    isHagueMember: true,
    primaryLanguage: "Russian",
    translationPath: "/translation/russian-translation",
    countryGuidePath: "/countries/uzbekistan",
    submissionChannel: "Embassy of the Republic of Uzbekistan in New Delhi",
    studentVisaCode: "Uzbekistan A-2 Student Visa (MBBS & Higher Education) · MFA Telex Confirmation",
    workVisaCode: "Uzbekistan E Work Visa · Agency for External Labor Migration Permit",
    studentImportantRule:
      "Uzbekistan is a Hague Convention member. Indian MBBS and university students require State HRD/SDM authentication and an MEA Apostille sticker on their Class 12 Mark Sheets, NEET Scorecard, and Birth Certificate.",
    workImportantRule:
      "Uzbekistan is a Hague Convention member. E Work Visa and Labor License applicants require an MEA Apostille sticker and certified Russian/Uzbek translation on their Indian Degree Certificate and PCC.",
    studentAcademicRule:
      "Uzbek University Admission Contract & MFA Visa Confirmation, plus original Class 12 Mark Sheet with SDM/HRD + MEA Apostille + Russian Translation.",
    workAcademicRule:
      "Original University Degree or Technical Diploma legalized with SDM/HRD + MEA Apostille + Certified Russian Translation.",
    studentPersonalRule:
      "Original Birth Certificate, Police Clearance Certificate (PCC), and HIV-Negative Medical Certificate with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), HIV-Negative Certificate, and Marriage/Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "First-Year Tuition Payment Receipt, Parental Bank Statements, and Notarized Sponsorship Affidavit.",
    workFinancialRule:
      "Confirmation of the Right to Work in Uzbekistan, MFA Visa Telex Number, and Signed Employment Contract.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille + Russian",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille + Russian",
    studentBadgePersonal: "Birth Cert, PCC & Medical Need Verification",
    workBadgePersonal: "PCC & Civil Docs Need MEA Apostille",
    studentBadgeFinancial: "MFA Telex Confirmation + Tuition Receipt",
    workBadgeFinancial: "Uzbekistan Work License + MFA Telex",
  },
  {
    countrySlug: "armenia",
    countryName: "Armenia",
    isoCode: "AM",
    isHagueMember: true,
    primaryLanguage: "Armenian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "Embassy of the Republic of Armenia in New Delhi",
    studentVisaCode: "Armenia Student Visa & Temporary Residence Card (MBBS / University)",
    workVisaCode: "Armenia Work Permit & Temporary Residence Card · Workpermit.am",
    studentImportantRule:
      "Armenia is a Hague Convention member. Indian MBBS and university students MUST get an MEA Apostille sticker on their original Class 12 Mark Sheet, Passing Certificate, and Birth Certificate for Armenian Ministry of Education recognition.",
    workImportantRule:
      "Armenia is a Hague Convention member. Foreign employees applying on the unified Workpermit.am platform require an MEA Apostille sticker on their Indian Degree Certificate and civil documents.",
    studentAcademicRule:
      "Armenian University Admission Letter & Ministry of Education approval, plus original Class 12 Mark Sheets / Degree with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Vocational Diploma legalized with SDM/HRD + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (PCC) legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Marriage Certificate, and Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "Tuition Fee Payment Receipt, Sponsor Bank Statements, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Workpermit.am Electronic Approval Notice, Employment Contract, and Armenian Medical Checkup.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille on 12th/Degree",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "Tuition Receipt + Apostilled Sponsorship Affidavit",
    workBadgeFinancial: "Workpermit.am Confirmation + Signed Contract",
  },
  {
    countrySlug: "serbia",
    countryName: "Serbia",
    isoCode: "RS",
    isHagueMember: true,
    primaryLanguage: "Serbian",
    translationPath: "/translation/serbian-translation",
    countryGuidePath: "/countries",
    submissionChannel: "eForeigners Portal (Welcome to Serbia) & Embassy of the Republic of Serbia in New Delhi",
    studentVisaCode: "Serbia Long-Stay Visa D for Education · ENIC/NARIC Serbia",
    workVisaCode: "Serbia Long-Stay Visa D for Employment & Unified Residence/Work Permit",
    studentImportantRule:
      "Serbia is a Hague Convention member. Student visa and ENIC/NARIC qualification recognition applications require your Indian Degree/Class 12 certificates, Birth Certificate, and PCC to carry an MEA Apostille sticker.",
    workImportantRule:
      "Serbia is a Hague Convention member. Visa D for Employment and Unified Permit applications require an MEA Apostilled Diploma/Degree, Police Clearance Certificate (PCC), and Marriage/Birth certificates.",
    studentAcademicRule:
      "Serbian University Accreditation & Enrollment Certificate, plus original Indian Class 12 / Degree Mark Sheets with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree or Vocational Certificate legalized with SDM/HRD + MEA Apostille + Serbian translation.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) with MEA Apostille.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates with MEA Apostille.",
    studentFinancialRule:
      "Bank statement proving sufficient funds in Serbia, Notarized Landlord Accommodation Proof, and Health Insurance.",
    workFinancialRule:
      "Draft Employment Contract with Serbian Employer, Serbian APR Chamber Registration Extract, Labour Market Test (if applicable), and Accommodation Proof.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "Serbian Accommodation + Financial Proof",
    workBadgeFinancial: "Serbian Employment Contract + APR Extract",
  },
  {
    countrySlug: "philippines",
    countryName: "Philippines",
    isoCode: "PH",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/philippines",
    submissionChannel: "Embassy of the Philippines in New Delhi & Consulates (Mumbai, Chennai, Kolkata)",
    studentVisaCode: "Philippines 9(f) Student Visa (BS-MD / Aviation / University) · CHED & Bureau of Immigration",
    workVisaCode: "Philippines 9(g) Pre-Arranged Employment Visa & Alien Employment Permit (AEP)",
    studentImportantRule:
      "The Philippines is a Hague Convention member (since May 2019). Indian BS-MD (Medical) and aviation students MUST get an MEA Apostille sticker on their original Class 10 & 12 Mark Sheets, Birth Certificate, Police Clearance Certificate (PCC), and Financial Affidavit.",
    workImportantRule:
      "The Philippines is a Hague Convention member. For a 9(g) Work Visa and DOLE Alien Employment Permit (AEP), your Indian Degree Certificate, Police Clearance Certificate (PCC), and Marriage/Birth certificates require an MEA Apostille sticker.",
    studentAcademicRule:
      "Notice of Acceptance (NOA) from Philippine institution, CEA/CHED clearance, NEET Scorecard (for Medical), and original Class 10 & 12 Mark Sheets with State HRD/SDM + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate & Transcripts legalized with State HRD/SDM + MEA Apostille.",
    studentPersonalRule:
      "Original Birth Certificate, PSK Police Clearance Certificate (PCC), and Medical Health Certificate — all legalized with an MEA Apostille sticker.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), Original Marriage Certificate, and Birth Certificates legalized with an MEA Apostille sticker.",
    studentFinancialRule:
      "Affidavit of Support and Guarantee (Notarized + SDM + MEA Apostille) alongside 6-month Parental Bank Statements.",
    workFinancialRule:
      "DOLE Alien Employment Permit (AEP) / Bureau of Immigration 9(g) Order, Philippine SEC Corporate Documents, and Signed Employment Contract.",
    studentBadgeAcademic: "Mandatory HRD/SDM + MEA Apostille on 10th & 12th",
    workBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    studentBadgePersonal: "Birth Cert, PCC & Medical Need MEA Apostille",
    workBadgePersonal: "PCC, Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "Affidavit of Support Needs MEA Apostille",
    workBadgeFinancial: "DOLE AEP + 9(g) Employment Contract",
  },
  {
    countrySlug: "indonesia",
    countryName: "Indonesia",
    isoCode: "ID",
    isHagueMember: true,
    primaryLanguage: "Indonesian",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/indonesia",
    submissionChannel: "Molina / Directorate General of Immigration e-Visa & Embassy of the Republic of Indonesia in New Delhi",
    studentVisaCode: "Indonesia C316 Student Limited Stay Visa (KITAS) · Ministry of Education Study Permit",
    workVisaCode: "Indonesia C312 Work Visa (Working KITAS) · Ministry of Manpower RPTKA",
    studentImportantRule:
      "Indonesia is a Hague Convention member (since June 2022). Indian educational certificates, Birth Certificates, and Police Clearance Certificates intended for Indonesian KITAS applications require an MEA Apostille sticker.",
    workImportantRule:
      "Indonesia is a Hague Convention member. Working KITAS (C312) and RPTKA Foreign Worker Placement approvals require your Indian University Degree, 5-Year Experience Proof, and Marriage/Birth certificates to carry an MEA Apostille sticker.",
    studentAcademicRule:
      "Indonesian Ministry of Education Study Permit (Izin Belajar), University Acceptance Letter, and original Indian Degree/Class 12 Certificate with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original University Degree Certificate and minimum 5-Year Work Experience Letters legalized with SDM/HRD + MEA Apostille (mandatory for Ministry of Manpower RPTKA).",
    studentPersonalRule:
      "Original Birth Certificate and Police Clearance Certificate (PCC) with MEA Apostille, plus Valid Passport (minimum 18 months validity).",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Apostille sticker (mandatory for Dependent Family KITAS C317).",
    studentFinancialRule:
      "Bank Statement showing minimum USD $2,000+, Financial Guarantee Letter, and Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "Ministry of Manpower RPTKA Notification, DKP-TKA Levy Payment Receipt, Indonesian Sponsor Company Documents, and Health Insurance.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille",
    workBadgeAcademic: "RPTKA Needs MEA Apostille on Degree & Experience",
    studentBadgePersonal: "Birth Cert & PCC Need MEA Apostille",
    workBadgePersonal: "Family KITAS Docs Need MEA Apostille",
    studentBadgeFinancial: "USD $2,000+ Bank Proof + Apostilled Affidavit",
    workBadgeFinancial: "RPTKA Notification + DKP-TKA Receipt",
  },
  {
    countrySlug: "egypt",
    countryName: "Egypt",
    isoCode: "EG",
    isHagueMember: false,
    primaryLanguage: "Arabic",
    translationPath: "/translation/arabic-translation",
    countryGuidePath: "/countries/egypt",
    submissionChannel: "Embassy of the Arab Republic of Egypt in New Delhi & Consulate General in Mumbai",
    studentVisaCode: "Egypt Student Residence Visa (Al-Azhar / Medical / University) · Cultural Office",
    workVisaCode: "Egypt Work Visa & Foreign Employee Work Permit · Ministry of Manpower Egypt",
    studentImportantRule:
      "Egypt is a Non-Hague country. An Apostille sticker is NOT valid in Egypt. All Indian educational and personal documents require State HRD/SDM → MEA Normal Attestation → Embassy of Egypt Legalization in New Delhi.",
    workImportantRule:
      "Egypt is a Non-Hague country. For an Egyptian Work Permit, your Indian Degree Certificate, Experience Certificates, Police Clearance Certificate (PCC), and Marriage Certificate MUST be attested by MEA New Delhi and legalized by the Embassy of Egypt.",
    studentAcademicRule:
      "Egyptian University Admission Letter and original Class 12 / Bachelor's Degree Certificate attested via State HRD/SDM → MEA Normal Attestation → Embassy of Egypt.",
    workAcademicRule:
      "Original University Degree and minimum 3-Year Experience Certificates attested via State HRD/SDM → MEA Normal Attestation → Embassy of Egypt + Certified Arabic Translation.",
    studentPersonalRule:
      "Original Birth Certificate and PSK Police Clearance Certificate (PCC) attested via SDM → MEA Normal Attestation → Embassy of Egypt.",
    workPersonalRule:
      "PSK Police Clearance Certificate (PCC), HIV-Negative Medical Certificate, and Marriage/Birth Certificates attested via SDM → MEA → Embassy of Egypt.",
    studentFinancialRule:
      "Sponsor Bank Statements, Tuition Receipt, and Notarized + Embassy-Attested Parental Sponsorship Undertaking.",
    workFinancialRule:
      "Egyptian Ministry of Manpower Work Permit Pre-Approval, Egyptian Company Commercial Registry copy, and Arabic Translation.",
    studentBadgeAcademic: "Requires HRD/SDM → MEA → Egypt Embassy",
    workBadgeAcademic: "Mandatory HRD/SDM → MEA → Egypt Embassy",
    studentBadgePersonal: "PCC & Birth Cert Need Egypt Embassy Stamp",
    workBadgePersonal: "PCC, Marriage & Birth Need Egypt Embassy Stamp",
    studentBadgeFinancial: "Sponsorship Docs Need Embassy Attestation",
    workBadgeFinancial: "Egypt Ministry of Manpower Approval + Arabic",
  },
  {
    countrySlug: "mexico",
    countryName: "Mexico",
    isoCode: "MX",
    isHagueMember: true,
    primaryLanguage: "Spanish",
    translationPath: "/translation/spanish-translation",
    countryGuidePath: "/countries/mexico",
    submissionChannel: "Embassy of Mexico in New Delhi (Consular Appointment via MiConsulado)",
    studentVisaCode: "Mexico Temporary Resident Student Visa (>180 Days)",
    workVisaCode: "Mexico Temporary Resident Visa with Work Permission · INM NUT Number",
    studentImportantRule:
      "Mexico is a Hague Convention member. Indian academic certificates, Birth Certificates (proving relationship with financial sponsor), and affidavits require an MEA Apostille sticker and certified Spanish translation.",
    workImportantRule:
      "Mexico is a Hague Convention member. Work visa applicants holding an INM NUT (Unique Processing Number) require an MEA Apostille sticker and certified Spanish translation on their Indian Degree Certificate, Birth Certificate, and Marriage Certificate.",
    studentAcademicRule:
      "Original Acceptance Letter from a Mexican educational institution (part of the National Education System) and Indian Degree/Class 12 Certificate with SDM/HRD + MEA Apostille + Spanish Translation.",
    workAcademicRule:
      "Original University Degree / Engineering or IT Diploma legalized with SDM/HRD + MEA Apostille + Certified Spanish Translation (for Mexican Cedula Profesional / INM interview).",
    studentPersonalRule:
      "Original Birth Certificate (mandatory if parents under 25 sponsor your studies) with MEA Apostille + Certified Spanish Translation.",
    workPersonalRule:
      "Original Birth Certificate, Marriage Certificate (for family unity visa), and PCC with MEA Apostille + Certified Spanish Translation.",
    studentFinancialRule:
      "12 months of bank statements / pay slips showing monthly income or balance meeting Mexican UMA multiples, plus Notarized + Apostilled Sponsorship Affidavit.",
    workFinancialRule:
      "INM Visa Authorization Letter with NUT Number, Mexican Job Offer on Company Letterhead, and Signatory ID copy.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille + Spanish",
    workBadgeAcademic: "Requires MEA Apostille + Spanish Translation",
    studentBadgePersonal: "Birth Cert Needs MEA Apostille + Spanish",
    workBadgePersonal: "Birth & Marriage Certs Need Apostille + Spanish",
    studentBadgeFinancial: "12-Month Bank Proof + Apostilled Affidavit",
    workBadgeFinancial: "INM NUT Authorization + Mexican Job Offer",
  },
  {
    countrySlug: "brazil",
    countryName: "Brazil",
    isoCode: "BR",
    isHagueMember: true,
    primaryLanguage: "Portuguese",
    translationPath: "/translation/portuguese-translation",
    countryGuidePath: "/countries/brazil",
    submissionChannel: "e-Consular Portal & Embassy of Brazil in New Delhi / Consulate General in Mumbai",
    studentVisaCode: "Brazil VITEM IV Temporary Student Visa · e-Consular",
    workVisaCode: "Brazil VITEM V Temporary Work Visa · MigranteWeb Ministry of Justice Approval",
    studentImportantRule:
      "Brazil is a Hague Convention member. VITEM IV Student Visa applicants MUST submit an RPO Police Clearance Certificate (PCC), Birth Certificate (for Brazilian CPF/Federal Police registration), and Academic Certificates with an MEA Apostille sticker.",
    workImportantRule:
      "Brazil is a Hague Convention member. VITEM V Work Visa applicants require prior MigranteWeb authorization, plus an MEA Apostilled Police Clearance Certificate (PCC), Birth Certificate (mandatory with parents' names for Federal Police registration), and Degree Certificate.",
    studentAcademicRule:
      "Enrollment Letter from Brazilian MEC-recognized institution and original Indian Degree / Class 12 Certificate with SDM/HRD + MEA Apostille + Portuguese Translation.",
    workAcademicRule:
      "Original University Degree and Experience Letters legalized with SDM/HRD + MEA Apostille + Certified Portuguese Translation (submitted to MigranteWeb).",
    studentPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid 90 days) and Original Birth Certificate (showing parents' full names) — BOTH with mandatory MEA Apostille sticker.",
    workPersonalRule:
      "RPO/PSK Police Clearance Certificate (PCC valid 90 days), Original Birth Certificate (mandatory for Brazilian RNE/CRNM registration), and Marriage Certificate with MEA Apostille.",
    studentFinancialRule:
      "Proof of financial scholarship or Notarized + MEA Apostilled Financial Sponsorship Commitment with 3-month bank statements.",
    workFinancialRule:
      "Brazilian Ministry of Justice (MigranteWeb) Work Authorization published in Diário Oficial da União, Employment Contract, and Apostilled Affidavits.",
    studentBadgeAcademic: "Requires SDM/HRD + MEA Apostille + Portuguese",
    workBadgeAcademic: "MigranteWeb Needs MEA Apostille + Portuguese",
    studentBadgePersonal: "Mandatory MEA Apostille on PCC & Birth Cert",
    workBadgePersonal: "PCC, Birth & Marriage Need MEA Apostille",
    studentBadgeFinancial: "Sponsorship Commitment Needs MEA Apostille",
    workBadgeFinancial: "MigranteWeb DOU Publication + Work Contract",
  },
  {
    countrySlug: "taiwan",
    countryName: "Taiwan",
    isoCode: "TW",
    isHagueMember: false,
    primaryLanguage: "Chinese (Traditional)",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries/taiwan",
    submissionChannel: "Taipei Economic and Cultural Center in India (TECC New Delhi & TECC Chennai)",
    studentVisaCode: "Taiwan Resident Visa for Degree Study / Huayu Scholarship · TECC India",
    workVisaCode: "Taiwan Resident Visa for White-Collar Employment & Employment Gold Card · Workforce Development Agency",
    studentImportantRule:
      "Taiwan is a Non-Hague jurisdiction. An Apostille sticker is NOT accepted by TECC India. Indian Degree Certificates, Transcripts, and Health Certificates MUST undergo State HRD/SDM → MEA Normal Attestation → TECC New Delhi/Chennai Authentication.",
    workImportantRule:
      "Taiwan is a Non-Hague jurisdiction. For Taiwan Work Permits and Dependent Visas, your Indian Degree Certificate, Marriage Certificate, Birth Certificate, and PCC require State HRD/SDM → MEA Normal Attestation → TECC Authentication.",
    studentAcademicRule:
      "Taiwanese University Admission Letter and original Highest Indian Degree + Transcripts attested via State HRD/SDM → MEA Normal Attestation → TECC Authentication.",
    workAcademicRule:
      "Original University Degree Certificate attested via State HRD/SDM → MEA Normal Attestation → TECC Authentication.",
    studentPersonalRule:
      "Health Certificate for Residence Application (Form B) from a TECC-approved hospital, attested by Notary → SDM → MEA → TECC.",
    workPersonalRule:
      "Original Marriage Certificate, Birth Certificates, and PSK Police Clearance Certificate attested via SDM → MEA Normal Attestation → TECC Authentication.",
    studentFinancialRule:
      "6-month Bank Statement (minimum USD $6,500+ balance) or Taiwan Government/University Scholarship Certificate, plus Notarized Sponsorship Undertaking.",
    workFinancialRule:
      "Official Work Permit issued by Taiwan Workforce Development Agency (Ministry of Labor) or Taiwan Employment Gold Card approval.",
    studentBadgeAcademic: "Mandatory HRD/SDM → MEA → TECC Authentication",
    workBadgeAcademic: "Requires HRD/SDM → MEA → TECC Authentication",
    studentBadgePersonal: "Form B Health Cert Needs MEA + TECC Stamp",
    workBadgePersonal: "PCC, Marriage & Birth Need TECC Authentication",
    studentBadgeFinancial: "USD $6,500+ Bank Proof or Taiwan Scholarship",
    workBadgeFinancial: "Ministry of Labor Work Permit + Contract",
  },
  {
    countrySlug: "hong-kong",
    countryName: "Hong Kong SAR",
    isoCode: "HK",
    isHagueMember: true,
    primaryLanguage: "English",
    translationPath: "/services/document-translation",
    countryGuidePath: "/countries",
    submissionChannel: "Hong Kong Immigration Department (Online e-Visa Portal)",
    studentVisaCode: "Hong Kong Student Entry Permit · Form ID 995A & 995B",
    workVisaCode: "Hong Kong General Employment Policy (GEP) & Top Talent Pass Scheme (TTPS) · Form ID 990A/B",
    studentImportantRule:
      "Hong Kong SAR is a Hague Convention member (Unlike Mainland China, the 1961 Hague Apostille Convention IS in full force between India and Hong Kong SAR). Indian degrees, transcripts, and civil certificates for Hong Kong accept an MEA Apostille sticker.",
    workImportantRule:
      "Hong Kong SAR is a Hague Convention member. General Employment Policy (GEP), Top Talent Pass (TTPS), and Dependant Visa applications require an MEA Apostille sticker on Indian Degree Certificates, Marriage Certificates, and Birth Certificates.",
    studentAcademicRule:
      "Completed Form ID 995A/995B, Hong Kong University Admission Letter, and original Indian Degree / Class 12 Transcripts with SDM/HRD + MEA Apostille.",
    workAcademicRule:
      "Original Bachelor's/Master's Degree Certificate & Transcripts legalized with SDM/HRD + MEA Hague Apostille.",
    studentPersonalRule:
      "Original Birth Certificate (showing relationship with financial sponsor) with MEA Hague Apostille, plus Pre-Arrival Registration / Passport copies.",
    workPersonalRule:
      "Original Marriage Certificate and Children's Birth Certificates legalized with an MEA Hague Apostille sticker (mandatory for Hong Kong Dependant Visa applications).",
    studentFinancialRule:
      "Sponsor's Bank Statements (HKD 150,000–250,000+/year), Fixed Deposits, ITRs, and Notarized + Apostilled Financial Sponsorship Declaration.",
    workFinancialRule:
      "Form ID 990A & 990B (Sponsoring Hong Kong Employer Form), signed Hong Kong Employment Contract, and Company Business Registration Certificate.",
    studentBadgeAcademic: "Form ID 995A/B + MEA Apostille on Academic Docs",
    workBadgeAcademic: "Requires SDM/HRD + MEA Hague Apostille",
    studentBadgePersonal: "Birth Cert Needs MEA Hague Apostille",
    workBadgePersonal: "Dependant Marriage & Birth Need MEA Apostille",
    studentBadgeFinancial: "HKD Financial Proof + Apostilled Sponsorship",
    workBadgeFinancial: "Form ID 990A/B + Hong Kong Employment Contract",
  },
];

