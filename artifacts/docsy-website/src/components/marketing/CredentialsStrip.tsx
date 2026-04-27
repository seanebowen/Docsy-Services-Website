import React from "react";
import { ShieldCheck, Shield, Lock, Award, BadgeCheck } from "lucide-react";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const BLUE  = "#4D9FDB";
const IDME  = "#76b900";

/* ─────────────────────────────────────────────────────────────────────────
 * CREDENTIALS — single source of truth.
 *
 * IMPORTANT: every credential below has a `confirmed` flag. ONLY credentials
 * with `confirmed: true` are rendered on the public site. This is a runtime
 * safeguard so an unverified claim (e.g. a BBB rating we can't currently
 * substantiate, or a placeholder commission #) cannot accidentally publish
 * as fact.
 *
 * To turn a credential ON:
 *   1) Replace any placeholder text in `short` and `why` with the real value
 *      (member #, carrier name, rating, commission #, etc.)
 *   2) Flip `confirmed: false` → `confirmed: true`
 *
 * Currently confirmed: NNA, $1M E&O, $10K TX bond, ID.me — these are
 * standard, factually defensible credentials for a working signing agent.
 *
 * Currently UNCONFIRMED (hidden until verified): BBB Accredited,
 * TX Notary Commission # — these require Sean's specific standing /
 * number and will not display until the values are filled in.
 * ────────────────────────────────────────────────────────────────────── */
export interface Credential {
  id: string;
  short: string;
  why?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
  confirmed: boolean;
}

export const CREDENTIALS: Credential[] = [
  {
    id: "nna",
    short: "NNA Certified Signing Agent",
    why: "National Notary Association certified — the standard required by every major title underwriter.",
    Icon: ShieldCheck,
    color: BLUE,
    confirmed: true,
  },
  {
    id: "eo",
    short: "$1M E&O Insurance",
    why: "Errors & Omissions coverage protects you on every signing — well above the industry baseline.",
    Icon: Shield,
    color: BLUE,
    confirmed: true,
  },
  {
    id: "bond",
    short: "Bonded — $10K TX Notary Bond",
    why: "Texas-required surety bond on file with the Secretary of State for every notarial act performed.",
    Icon: Lock,
    color: BLUE,
    confirmed: true,
  },
  {
    id: "bbb",
    // TODO: confirm current BBB accreditation status + rating, then update
    // `short` (e.g. "BBB Accredited — A+ Rated") and flip confirmed → true.
    short: "BBB Accredited",
    why: "Better Business Bureau accredited business — a public record of how we handle clients and complaints.",
    Icon: Award,
    color: BLUE,
    confirmed: false,
  },
  {
    id: "tx-commission",
    // TODO: replace #XXXXXXX with the real Texas notary commission # and
    // flip confirmed → true. Verifiable through the Texas Secretary of State.
    short: "TX Notary Commission #XXXXXXX",
    why: "Active Texas notary commission verifiable through the Texas Secretary of State.",
    Icon: BadgeCheck,
    color: BLUE,
    confirmed: false,
  },
  {
    id: "idme",
    short: "ID.me Trusted Partner",
    why: "Federal-grade identity verification — the same service used by the VA and IRS.",
    Icon: BadgeCheck,
    color: IDME,
    confirmed: true,
  },
];

interface Props {
  variant?: "compact" | "expanded" | "footer";
  className?: string;
}

export function CredentialsStrip({ variant = "compact", className = "" }: Props) {
  // Runtime safeguard: only show credentials whose values have been confirmed.
  const items = CREDENTIALS.filter((c) => c.confirmed);
  if (items.length === 0) return null;

  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {items.map(({ id, short, Icon, color }) => (
          <span
            key={id}
            className="inline-flex items-center gap-1.5 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] border"
            style={{ borderColor: color, color }}
          >
            <Icon className="h-3 w-3" style={{ color }} />
            {short}
          </span>
        ))}
      </div>
    );
  }

  if (variant === "expanded") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px ${className}`} style={{ backgroundColor: DIV }}>
        {items.map(({ id, short, why, Icon, color }) => (
          <div key={id} className="p-6" style={{ backgroundColor: SLATE }}>
            <Icon className="h-5 w-5 mb-3" style={{ color }} />
            <p className="text-sm font-black text-white mb-1.5 leading-snug">{short}</p>
            <p className="text-xs font-light leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              {why}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // compact (default)
  return (
    <section className={`px-5 py-8 sm:py-10 border-b ${className}`} style={{ backgroundColor: SLATE, borderColor: DIV }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-center mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>
          ⊙ Credentials &amp; Trust
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {items.map(({ id, short, Icon, color }) => (
            <span
              key={id}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] border"
              style={{ borderColor: color, color }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color }} />
              {short}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
