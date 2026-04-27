export type IssuingAuthority = "state-vital" | "state-court" | "state-other" | "notary" | "federal";

export interface ApostilleDocType {
  id: string;
  label: string;
  examples: string;
  issuingAuthority: IssuingAuthority;
  countyClerkRequired: boolean;
  federalAuthRequired: boolean;
  notes?: string;
}

export const APOSTILLE_DOC_TYPES: ApostilleDocType[] = [
  {
    id: "birth-cert",
    label: "Birth certificate",
    examples: "Certified copy from a Texas county or state vital records office.",
    issuingAuthority: "state-vital",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "Texas vital records can go directly to TX Secretary of State — no county clerk step required for TX-issued certificates.",
  },
  {
    id: "marriage-cert",
    label: "Marriage certificate / license",
    examples: "Certified copy from the county clerk where the marriage was recorded.",
    issuingAuthority: "state-vital",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "TX-issued marriage certificates go directly to TX SOS.",
  },
  {
    id: "divorce-decree",
    label: "Divorce decree",
    examples: "Court-issued decree from the district clerk.",
    issuingAuthority: "state-court",
    countyClerkRequired: true,
    federalAuthRequired: false,
    notes: "Divorce decrees usually require a county/district clerk certification before TX SOS will apostille them.",
  },
  {
    id: "death-cert",
    label: "Death certificate",
    examples: "Certified copy from a Texas county or state vital records office.",
    issuingAuthority: "state-vital",
    countyClerkRequired: false,
    federalAuthRequired: false,
  },
  {
    id: "diploma",
    label: "Diploma / transcript",
    examples: "School-issued diploma, transcript, or letter of attendance.",
    issuingAuthority: "state-other",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "School documents must be notarized first (TX notary), then apostilled by TX SOS. We can notarize the registrar's signature for you.",
  },
  {
    id: "fbi-bg",
    label: "FBI background check (Identity History Summary)",
    examples: "FBI-issued or Channeler-issued FBI background check.",
    issuingAuthority: "federal",
    countyClerkRequired: false,
    federalAuthRequired: true,
    notes: "Federal-origin documents go to the US Department of State (USDOS) for federal authentication, NOT to TX SOS.",
  },
  {
    id: "poa",
    label: "Power of attorney",
    examples: "Notarized power of attorney signed in Texas.",
    issuingAuthority: "notary",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "Must be signed in front of a Texas notary — Docsy can handle the notarization and apostille in one order.",
  },
  {
    id: "corporate-doc",
    label: "Corporate document (articles, certificates, resolutions)",
    examples: "Articles of incorporation, certificates of good standing, board resolutions, bylaws.",
    issuingAuthority: "state-other",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "TX SOS-issued certificates (e.g. Certificate of Status / Good Standing) go directly to TX SOS for apostille. Internal corporate documents must be notarized first.",
  },
  {
    id: "court-order",
    label: "Court order / judgment",
    examples: "Order, judgment, or final decree issued by a Texas court.",
    issuingAuthority: "state-court",
    countyClerkRequired: true,
    federalAuthRequired: false,
    notes: "Texas court orders require a county/district clerk certification before TX SOS apostille.",
  },
  {
    id: "other",
    label: "Other / not sure",
    examples: "Something not on this list — Docsy will confirm at pre-check.",
    issuingAuthority: "state-other",
    countyClerkRequired: false,
    federalAuthRequired: false,
    notes: "When in doubt, send a photo to the free Pre-Check — Docsy will confirm the right chain before any work is done.",
  },
];

export const INTENDED_USES: { id: string; label: string }[] = [
  { id: "immigration", label: "Immigration / visa / dual citizenship" },
  { id: "marriage", label: "Marriage abroad" },
  { id: "work", label: "Work permit / employment" },
  { id: "education", label: "Education / school enrollment" },
  { id: "adoption", label: "Adoption" },
  { id: "business", label: "Business / corporate transaction" },
  { id: "other", label: "Other / personal" },
];
