import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { FadeIn } from "@/components/ui/FadeIn";

const IVORY = "#F5EFE6";
const BG    = "#131929";
const BLUE  = "#4D9FDB";
const DIV   = "#1e2a3a";
const MUTE  = "rgba(255,255,255,0.55)";
const SOFT  = "rgba(255,255,255,0.42)";

const HI = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundColor: "rgba(77,159,219,0.35)", color: "inherit", padding: "0 5px" }}>{children}</span>
);

interface Entry {
  term: string;
  slug: string;
  short: string;
  long?: string;
  related?: string[];
}

const GLOSSARY: Entry[] = [
  {
    term: "Acknowledgment",
    slug: "acknowledgment",
    short: "A notarial act in which the signer declares to the notary, without taking an oath, that they signed the document willingly and for the purposes stated.",
    long: "An acknowledgment confirms identity and willingness — it does not vouch for the truth of the document's contents. Most real-estate, business, and power-of-attorney signings use an acknowledgment certificate. The signer may sign the document before appearing in front of the notary, then formally 'acknowledge' the signature in person.",
    related: ["jurat", "notarial-certificate", "oath-affirmation"],
  },
  {
    term: "Apostille",
    slug: "apostille",
    short: "A certificate that authenticates a US document for legal use in another country that is a member of the 1961 Hague Convention.",
    long: "Issued in Texas by the Secretary of State, an apostille is attached to or affixed onto the document itself. It confirms the authenticity of the notary's signature and seal — it does not certify the document's contents. Documents bound for non-Hague countries instead need consular authentication or legalization through that country's embassy.",
    related: ["hague-convention", "authentication-federal", "certified-copy", "exemplification"],
  },
  {
    term: "Authentication (federal)",
    slug: "authentication-federal",
    short: "The federal-level equivalent of an apostille, issued by the U.S. Department of State for federally-issued documents like FBI background checks.",
    long: "Federal documents (FBI background checks, SSA letters, IRS letters) cannot be apostilled at the state level. They require a USDOS authentication or apostille from the U.S. Department of State Office of Authentications in Washington, D.C. Docsy handles federal apostille submissions for clients.",
    related: ["apostille", "hague-convention"],
  },
  {
    term: "Bonded notary",
    slug: "bonded-notary",
    short: "A notary public who has filed a surety bond with the state — Texas requires a $10,000 bond before commissioning.",
    long: "The bond protects the public, not the notary. If the notary commits an error or misconduct that harms the signer, the bond can be claimed against. The bond is separate from E&O insurance, which protects the notary themselves.",
    related: ["notary-commission", "eo-insurance"],
  },
  {
    term: "Certified copy",
    slug: "certified-copy",
    short: "A copy of a document that has been certified by the issuing authority (or, for some documents, a notary) as a true and complete reproduction of the original.",
    long: "Vital records (birth, marriage, death certificates) issued by the county or state with a raised or printed seal qualify as certified copies. A photocopy from your home printer does not. Apostille submissions for vital records require a state-issued certified copy.",
    related: ["apostille", "exemplification"],
  },
  {
    term: "Court reporter (CSR / TX certified)",
    slug: "court-reporter",
    short: "A trained, certified professional who creates a verbatim written record of legal proceedings using stenography, voice writing, or certified digital capture.",
    long: "Texas-licensed Certified Shorthand Reporters (CSR) traditionally used stenotype machines. AAERT-certified electronic reporters use multi-channel audio capture and produce certified transcripts. Both can administer oaths, mark exhibits, and certify the record; admissibility of the resulting transcript depends on the venue's rules and the parties' stipulations.",
    related: ["electronic-reporting"],
  },
  {
    term: "Credible witness",
    slug: "credible-witness",
    short: "A person used to vouch, under oath, for a signer's identity when the signer has no acceptable photo ID.",
    long: "Texas notarial practice generally accepts one credible witness who personally knows both the signer and the notary, or two witnesses who personally know the signer and can present their own valid IDs. The credible-witness option is governed by Texas Government Code Chapter 406 and related Secretary of State rules; whether it is appropriate for your specific document depends on the document, the receiving party, and current rules. Docsy will confirm whether a credible-witness signing is workable before booking.",
    related: ["acknowledgment", "oath-affirmation"],
  },
  {
    term: "eNote / eClosing",
    slug: "enote-eclosing",
    short: "An eNote is a digitally-signed promissory note; an eClosing is a real estate closing in which the loan documents (or some of them) are executed electronically.",
    long: "Hybrid eClosings sign most documents electronically and only the security instrument (deed of trust) on paper. Full eClosings sign every document electronically, often via RON. The eNote is registered in the MERS eRegistry to establish its legal status as a transferable record.",
    related: ["ron", "loan-signing-agent"],
  },
  {
    term: "Electronic reporting",
    slug: "electronic-reporting",
    short: "Capturing the verbatim record of a legal proceeding using certified digital audio equipment and a trained reporter, then producing a certified transcript.",
    long: "Electronic reporting is widely accepted in depositions, examinations under oath, board meetings, arbitrations, and remote proceedings. AAERT (American Association of Electronic Reporters and Transcribers) certifies practitioners. Whether the resulting transcript is admissible in a particular court depends on that court's rules and the parties' stipulations — Docsy will confirm acceptance criteria with the noticing party before the proceeding.",
    related: ["court-reporter"],
  },
  {
    term: "E&O insurance",
    slug: "eo-insurance",
    short: "Errors and Omissions insurance — protects the notary or signing agent from liability for unintentional mistakes made while performing their professional duties.",
    long: "Distinct from a notary bond (which protects the public), E&O insurance protects the notary's own assets if a signer sues over a notarial error. Title companies and lenders typically require loan signing agents to carry at least $25,000 of E&O coverage.",
    related: ["bonded-notary", "loan-signing-agent", "signing-agent"],
  },
  {
    term: "Exemplification",
    slug: "exemplification",
    short: "An additional layer of certification applied to a court-issued document, attesting to the authority of the certifying clerk under the seal of the presiding judge.",
    long: "Exemplification is sometimes required before a court document can be apostilled, or before a court order can be recognized in another jurisdiction. It is, in effect, a certification of the certifier.",
    related: ["certified-copy", "apostille"],
  },
  {
    term: "Hague Convention",
    slug: "hague-convention",
    short: "The 1961 multilateral treaty that abolished the requirement of consular legalization for foreign public documents in member countries — replacing it with the apostille.",
    long: "Over 120 countries are parties to the Hague Apostille Convention. A document apostilled in any member country is automatically accepted in any other. Non-member countries instead require consular legalization through that country's embassy or consulate.",
    related: ["apostille", "authentication-federal"],
  },
  {
    term: "Jurat",
    slug: "jurat",
    short: "A notarial act in which the signer signs the document in the notary's presence and swears, under oath or affirmation, that the contents are true.",
    long: "Unlike an acknowledgment, a jurat requires the signer to sign in front of the notary AND to swear an oath or affirmation about the truth of the document. Affidavits and sworn statements use a jurat. The notary administers the oath and signs the jurat certificate.",
    related: ["acknowledgment", "oath-affirmation", "notarial-certificate"],
  },
  {
    term: "Loan signing agent",
    slug: "loan-signing-agent",
    short: "A notary public who is specifically trained and certified to handle the notarization and execution of mortgage and real-estate loan documents.",
    long: "A loan signing agent (sometimes called a 'notary signing agent' or NSA) walks borrowers through 80–150+ pages of closing documents, identifies which require notarization, witnesses signatures, applies notary seals where appropriate, and returns the executed package to the title company. Most carry E&O insurance and pass an annual background check.",
    related: ["signing-agent", "eo-insurance", "enote-eclosing"],
  },
  {
    term: "Notarial certificate",
    slug: "notarial-certificate",
    short: "The wording the notary completes and signs that records what notarial act was performed, when, where, and for whom.",
    long: "Every notarial act produces a certificate — most commonly an acknowledgment certificate or a jurat certificate. The certificate is either preprinted on the document or attached as a loose certificate. It includes venue (state and county), date, signer's name, the notary's signature, and the notary's official seal.",
    related: ["acknowledgment", "jurat"],
  },
  {
    term: "Notary commission",
    slug: "notary-commission",
    short: "The official appointment by a state authority that authorizes a person to act as a notary public for a fixed term.",
    long: "In Texas, notary commissions are issued by the Secretary of State for a four-year term. The commission carries a unique notary ID number that appears on every official seal. A commission can be revoked for misconduct, and the notary must surrender the seal upon expiration or revocation.",
    related: ["bonded-notary"],
  },
  {
    term: "Oath / affirmation",
    slug: "oath-affirmation",
    short: "A solemn declaration that a statement is true. An oath invokes a deity; an affirmation has the same legal weight without the religious reference.",
    long: "Notaries administer oaths and affirmations as a stand-alone notarial act and as part of a jurat. Either form is accepted by Texas law. The signer chooses; the notary cannot require one over the other. Knowingly swearing or affirming falsely is perjury.",
    related: ["jurat", "credible-witness"],
  },
  {
    term: "RON (Remote Online Notarization)",
    slug: "ron",
    short: "A notarization conducted entirely via secure live audio-video session, with the signer and notary in different locations.",
    long: "Texas authorized RON in 2018 under Government Code Chapter 406, Subchapter C. The session is recorded and retained; the signer's identity is verified through credential analysis (ID scan) and knowledge-based authentication (KBA). The notarization is legally equivalent to an in-person act for the documents and jurisdictions that accept it.",
    related: ["enote-eclosing", "acknowledgment", "jurat"],
  },
  {
    term: "Signing agent",
    slug: "signing-agent",
    short: "A general term for a notary who facilitates the execution of a document package on behalf of a third party — most often, but not exclusively, real-estate loan documents.",
    long: "All loan signing agents are signing agents, but not all signing agents are loan signing agents — the term also covers structured-settlement signings, annuity acceptances, and trust funding signings. Signing agents work as independent contractors for title companies, lenders, signing services, or directly for the client.",
    related: ["loan-signing-agent", "eo-insurance"],
  },
  {
    term: "Translator's affidavit",
    slug: "translators-affidavit",
    short: "A sworn statement signed by a translator attesting that their translation of a document is accurate and complete to the best of their professional knowledge.",
    long: "Often required when a foreign-language document (or its translation) is filed with a US court, a US government agency, or used in an apostille submission. The affidavit is itself notarized — the notary administers the oath and completes a jurat certificate. The translator is responsible for the translation; the notary is responsible only for the oath.",
    related: ["jurat", "apostille"],
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const VALID_SLUGS = new Set(GLOSSARY.map((e) => e.slug));

export default function Glossary() {
  const params = useParams<{ slug?: string }>();
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string>("");
  const [missingSlug, setMissingSlug] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Notary Glossary | Docsy Services";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "A plain-English glossary of notary, RON, apostille, loan signing, and electronic reporting terms used by Docsy Services."
    );
  }, []);

  // Resolve target slug from /glossary/:slug OR /glossary#slug, validate, and scroll.
  // Re-runs on slug param change AND on hashchange events.
  useEffect(() => {
    const resolveAndScroll = () => {
      const fromParam = params?.slug ?? "";
      const fromHash =
        typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
      const targetSlug = (fromParam || fromHash).trim();
      if (!targetSlug) {
        setMissingSlug(null);
        return;
      }
      if (!VALID_SLUGS.has(targetSlug)) {
        setMissingSlug(targetSlug);
        // Scroll to top so the inline notice is visible.
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }
      setMissingSlug(null);
      const el = document.getElementById(targetSlug);
      if (!el) return;
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 80);
    };
    resolveAndScroll();
    if (typeof window === "undefined") return;
    window.addEventListener("hashchange", resolveAndScroll);
    return () => window.removeEventListener("hashchange", resolveAndScroll);
  }, [params?.slug]);

  // Filter entries
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.short.toLowerCase().includes(q) ||
        (e.long ?? "").toLowerCase().includes(q)
    );
  }, [query]);

  // Group by first letter
  const groups = useMemo(() => {
    const map: Record<string, Entry[]> = {};
    filtered.forEach((e) => {
      const letter = (e.term[0] ?? "#").toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(e);
    });
    return map;
  }, [filtered]);

  const lettersWithEntries = ALPHABET.filter((L) => groups[L]?.length);

  // Active letter on scroll
  useEffect(() => {
    if (!lettersWithEntries.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const letter = visible[0].target.getAttribute("data-letter");
          if (letter) setActiveLetter(letter);
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    lettersWithEntries.forEach((L) => {
      const el = document.getElementById(`letter-${L}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [lettersWithEntries.join(",")]);

  const slugToTerm = useMemo(() => {
    const m: Record<string, string> = {};
    GLOSSARY.forEach((e) => {
      m[e.slug] = e.term;
    });
    return m;
  }, []);

  const handleJump = (L: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(`letter-${L}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>
      {/* Hero */}
      <section className="px-5 pt-16 pb-12 sm:pt-20 sm:pb-14" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn delay={0}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5 text-black/55">
              ⊙ Reference · Glossary
            </p>
            <h1
              className="text-[3rem] sm:text-[4.5rem] md:text-[6rem] font-black leading-none text-black mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Notary <HI>Glossary.</HI>
            </h1>
          </FadeIn>
          <FadeIn delay={80}>
            <p className="text-xl sm:text-2xl text-black/55 max-w-3xl font-medium leading-snug">
              The terms a notary, signing agent, apostille processor, or court reporter will throw at you — explained in plain English. Bookmark this page; every other page links here.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Sticky control bar (search + alphabet jump). Offset clears Navbar(56) + StatusBar(~46). */}
      <section
        className="sticky z-30 border-b border-t backdrop-blur"
        style={{
          borderColor: DIV,
          backgroundColor: "rgba(19,25,41,0.94)",
          top: "var(--docsy-header-h, 102px)",
        }}
      >
        <div className="max-w-5xl mx-auto px-5 py-4">
          <div className="flex flex-col gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search glossary…"
              className="w-full px-4 py-2.5 text-sm bg-transparent border outline-none focus:border-white/40"
              style={{ borderColor: DIV, color: IVORY }}
              data-testid="glossary-search"
              aria-label="Search glossary"
            />
            <nav aria-label="Jump by letter" className="flex flex-wrap gap-1.5">
              {ALPHABET.map((L) => {
                const has = !!groups[L]?.length;
                const isActive = activeLetter === L && has;
                if (!has) {
                  return (
                    <span
                      key={L}
                      aria-hidden="true"
                      data-testid={`glossary-jump-${L}`}
                      className="inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold border opacity-25 cursor-not-allowed select-none"
                      style={{ borderColor: DIV, color: SOFT }}
                    >
                      {L}
                    </span>
                  );
                }
                return (
                  <a
                    key={L}
                    href={`#letter-${L}`}
                    onClick={handleJump(L)}
                    data-testid={`glossary-jump-${L}`}
                    aria-current={isActive ? "true" : undefined}
                    className="inline-flex items-center justify-center w-7 h-7 text-[11px] font-bold border transition-colors hover:bg-white/5 cursor-pointer"
                    style={{
                      borderColor: isActive ? BLUE : DIV,
                      color: isActive ? BLUE : IVORY,
                      backgroundColor: isActive ? "rgba(77,159,219,0.10)" : "transparent",
                    }}
                  >
                    {L}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          {missingSlug ? (
            <div
              role="status"
              data-testid="glossary-invalid-slug"
              className="mb-10 border-l-2 pl-5 py-3"
              style={{ borderColor: BLUE, backgroundColor: "rgba(77,159,219,0.06)" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: BLUE }}>
                ⊙ Term not found
              </p>
              <p className="text-sm leading-relaxed" style={{ color: MUTE }}>
                We couldn&rsquo;t find <span className="font-bold">&ldquo;{missingSlug}&rdquo;</span> in the glossary.
                It may have been renamed or removed. Browse the full A–Z list below or use the search bar above.
              </p>
            </div>
          ) : null}
          {lettersWithEntries.length === 0 ? (
            <p className="text-base text-white/50" data-testid="glossary-empty">
              No terms match &ldquo;{query}&rdquo;. Try a different word.
            </p>
          ) : (
            lettersWithEntries.map((L) => (
              <div
                key={L}
                id={`letter-${L}`}
                data-letter={L}
                className="scroll-mt-44 mb-12"
              >
                <h2
                  className="text-3xl font-black mb-6 pb-3 border-b"
                  style={{ color: BLUE, borderColor: DIV, letterSpacing: "-0.02em" }}
                >
                  {L}
                </h2>
                <div className="space-y-10">
                  {groups[L].map((entry) => (
                    <article
                      key={entry.slug}
                      id={entry.slug}
                      data-testid={`glossary-entry-${entry.slug}`}
                      className="scroll-mt-44"
                    >
                      <FadeIn delay={0}>
                        <h3
                          className="text-xl sm:text-2xl font-black leading-tight mb-3"
                          style={{ color: IVORY, letterSpacing: "-0.01em" }}
                        >
                          {entry.term}
                        </h3>
                        <p
                          className="text-[15px] leading-relaxed font-light mb-3"
                          style={{ color: MUTE }}
                        >
                          {entry.short}
                        </p>
                        {entry.long && (
                          <p
                            className="text-[14px] leading-relaxed font-light mb-3"
                            style={{ color: SOFT }}
                          >
                            {entry.long}
                          </p>
                        )}
                        {entry.related?.length ? (
                          <p
                            className="text-[11px] uppercase tracking-[0.16em] font-bold mt-2"
                            style={{ color: SOFT }}
                          >
                            <span style={{ color: SOFT }}>Related:</span>{" "}
                            {entry.related.map((relSlug, i) => (
                              <React.Fragment key={relSlug}>
                                <Link
                                  href={`/glossary#${relSlug}`}
                                  className="underline normal-case tracking-normal font-light hover:opacity-80"
                                  style={{ color: BLUE }}
                                >
                                  {slugToTerm[relSlug] ?? relSlug}
                                </Link>
                                {i < entry.related!.length - 1 ? (
                                  <span style={{ color: SOFT }}> · </span>
                                ) : null}
                              </React.Fragment>
                            ))}
                          </p>
                        ) : null}
                      </FadeIn>
                    </article>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Bottom nav */}
      <section className="border-t px-5 py-12" style={{ borderColor: DIV }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3"
            style={{ color: SOFT }}
          >
            ⊙ Want more depth?
          </p>
          <p className="text-base font-light mb-2" style={{ color: MUTE }}>
            The{" "}
            <Link href="/faq" className="underline" style={{ color: BLUE }}>
              FAQ &amp; Guides
            </Link>{" "}
            page covers walk-throughs (how to book RON, what ID is accepted, how to send documents for apostille). The{" "}
            <Link href="/terms" className="underline" style={{ color: BLUE }}>
              Terms of Service
            </Link>{" "}
            covers the legal definitions you&rsquo;ll see in your invoice.
          </p>
        </div>
      </section>
    </div>
  );
}
