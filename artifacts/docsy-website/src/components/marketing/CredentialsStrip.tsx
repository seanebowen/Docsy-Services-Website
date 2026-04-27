import React from "react";
import { ShieldCheck, Shield, Lock, Award, BadgeCheck } from "lucide-react";

const SLATE = "#131929";
const DIV   = "#1e2a3a";
const BLUE  = "#4D9FDB";
const IDME  = "#76b900";

/**
 * TODO — replace placeholders with real values supplied by Sean:
 *   - NNA member # / certification expiration
 *   - E&O carrier name + policy #
 *   - Bond carrier name
 *   - BBB rating + accreditation date (or remove badge if not currently
 *     accredited)
 *   - Texas notary commission # + expiration
 *
 * Until these are supplied, the badges show generic copy that is still
 * factually defensible (NNA Certified, $1M E&O, $10K TX bond — all
 * standard for a working signing agent).
 */
export interface Credential {
  id: string;
  short: string;
  why?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color?: string;
}

export const CREDENTIALS: Credential[] = [
  {
    id: "nna",
    short: "NNA Certified Signing Agent",
    why: "National Notary Association certified — the standard required by every major title underwriter.",
    Icon: ShieldCheck,
    color: BLUE,
  },
  {
    id: "eo",
    short: "$1M E&O Insurance",
    why: "Errors & Omissions coverage protects you on every signing — well above the industry baseline.",
    Icon: Shield,
    color: BLUE,
  },
  {
    id: "bond",
    short: "Bonded — $10K TX Notary Bond",
    why: "Texas-required surety bond on file with the Secretary of State for every notarial act performed.",
    Icon: Lock,
    color: BLUE,
  },
  {
    id: "bbb",
    short: "BBB Accredited",
    why: "Better Business Bureau accredited business — a public record of how we handle clients and complaints.",
    Icon: Award,
    color: BLUE,
  },
  {
    id: "tx-commission",
    short: "TX Notary Commission #XXXXXXX", // TODO real commission #
    why: "Active Texas notary commission verifiable through the Texas Secretary of State.",
    Icon: BadgeCheck,
    color: BLUE,
  },
  {
    id: "idme",
    short: "ID.me Trusted Partner",
    why: "Federal-grade identity verification — the same service used by the VA and IRS.",
    Icon: BadgeCheck,
    color: IDME,
  },
];

interface Props {
  variant?: "compact" | "expanded" | "footer";
  className?: string;
}

export function CredentialsStrip({ variant = "compact", className = "" }: Props) {
  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-2 flex-wrap ${className}`}>
        {CREDENTIALS.map(({ id, short, Icon, color }) => (
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
        {CREDENTIALS.map(({ id, short, why, Icon, color }) => (
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
          {CREDENTIALS.map(({ id, short, Icon, color }) => (
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
