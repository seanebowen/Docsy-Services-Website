import React from "react";
import { Link } from "wouter";
import {
  LegalShell, Section, P, SubH, UL,
  IVORY, BLUE, DIV, MUTE, type LegalSectionEntry,
} from "@/components/legal/LegalShell";

const LAST_UPDATED  = "April 27, 2026";
const EFFECTIVE     = "April 27, 2026";
const TRADE_NAME    = "Docsy";
const PRIVACY_EMAIL = "privacy@docsynotary.com";

const TOC: LegalSectionEntry[] = [
  { id: "what-cookies",    n: "01", title: "What Cookies Are" },
  { id: "categories",      n: "02", title: "Categories We Use" },
  { id: "specific-list",   n: "03", title: "Specific Cookies & Local Storage" },
  { id: "third-party",     n: "04", title: "Third-Party Cookies" },
  { id: "your-choices",    n: "05", title: "Your Choices & How to Opt Out" },
  { id: "do-not-track",    n: "06", title: "Do Not Track & Global Privacy Control" },
  { id: "changes",         n: "07", title: "Changes to This Policy" },
  { id: "contact",         n: "08", title: "Contact Us About Cookies" },
];

interface StorageRow {
  name: string;
  storage: "localStorage" | "sessionStorage";
  type: "Functional";
  purpose: string;
  duration: string;
}

const STORAGE_TABLE: StorageRow[] = [
  { name: "docsy_auth_token",         storage: "localStorage",   type: "Functional", purpose: "Keeps you signed in to your account between visits and across tabs.",                       duration: "Until you sign out" },
  { name: "docsy_auth_user",          storage: "localStorage",   type: "Functional", purpose: "Caches your account profile (name, email, membership tier) so the header renders instantly.", duration: "Until you sign out" },
  { name: "docsy_idme_verification",  storage: "localStorage",   type: "Functional", purpose: "Holds a pending HonorPass (ID.me) verification while you finish creating your account.",     duration: "Until your account is created or cleared" },
  { name: "docsy_calc_state_v1",      storage: "sessionStorage", type: "Functional", purpose: "Remembers your in-progress price calculator selections during the tab session.",             duration: "Until the tab is closed" },
  { name: "docsy_estimate",           storage: "sessionStorage", type: "Functional", purpose: "Carries your finalized estimate from the calculator into the booking flow.",                  duration: "Until the tab is closed" },
  { name: "docsy_booking",            storage: "sessionStorage", type: "Functional", purpose: "Stores your in-progress booking (date, contact info, options) until you reach confirmation.", duration: "Until the tab is closed" },
  { name: "docsy_idme_state",         storage: "sessionStorage", type: "Functional", purpose: "Anti-CSRF state value used during the ID.me OAuth verification round-trip.",                  duration: "Until the round-trip completes" },
  { name: "docsy_idme_return_to",     storage: "sessionStorage", type: "Functional", purpose: "Remembers the page to return you to after ID.me verification finishes.",                       duration: "Until the round-trip completes" },
  { name: "docsy_auth_identifier",    storage: "sessionStorage", type: "Functional", purpose: "Holds the email or phone you typed at sign-in so the verification page can show it.",         duration: "Until verification completes" },
  { name: "docsy_auth_masked",        storage: "sessionStorage", type: "Functional", purpose: "Holds the masked version of that email or phone for display on the verification page.",       duration: "Until verification completes" },
  { name: "docsy_internal_booking",   storage: "sessionStorage", type: "Functional", purpose: "Marks an internal-staff booking session so the flow uses staff defaults rather than retail.", duration: "Until the tab is closed" },
];

export default function Cookies() {
  return (
    <LegalShell
      documentTitle="Cookie Policy | Docsy Services"
      metaDescription="The cookies and similar technologies Docsy Services uses on our website, what they do, and how to control them in your browser."
      eyebrow="Legal · Cookie Policy"
      titleLead="Cookie"
      titleHighlight="Policy."
      intro="The cookies and local-storage items we use, what each one does, and how to disable them. We keep this list short on purpose."
      lastUpdated={LAST_UPDATED}
      effective={EFFECTIVE}
      contactEmail={PRIVACY_EMAIL}
      summary={
        <>
          The {TRADE_NAME} site itself does not currently set any HTTP cookies. Instead, we use your browser's <strong style={{ color: IVORY }}>local storage and session storage</strong> for strictly functional purposes — keeping you signed in, remembering your in-progress price calculator quote, and carrying your booking through checkout. We do not run third-party advertising, analytics, or marketing trackers today. The full list of storage items we set is below; you can clear it from your browser at any time, but parts of the site (sign-in, the calculator, the booking flow) will not work without it.
        </>
      }
    >

      <Section entry={TOC[0]}>
        <P>
          A cookie is a small text file that a website asks your browser to store on your device, so the site can recognize you, remember your preferences, or keep you signed in on later visits. Browsers also expose related, similarly-purposed APIs called <em>local storage</em> and <em>session storage</em>. This Policy treats all three the same way — anything the site stores on your device — because the privacy considerations are the same.
        </P>
      </Section>

      <Section entry={TOC[1]}>
        <P>We use three categories. We are transparent about which we use today and which we do not.</P>
        <SubH>Functional (always on, no advertising)</SubH>
        <P>
          These are required for the site to work correctly — keeping you signed in, holding your draft quote in the calculator, carrying your booking through checkout, and securing the ID.me verification round-trip. Disabling these (by clearing storage, blocking storage for the site, or browsing in a strict private mode) will break sign-in, the calculator, and the booking flow. There is no consent option to disable them because the site cannot deliver the requested service without them.
        </P>
        <SubH>Analytics (limited and aggregated)</SubH>
        <P>
          We may collect basic, aggregated usage statistics (page views, anonymized device class, referrer) on the server side to understand which pages people use and where the experience breaks. We do not currently run client-side analytics tools such as Google Analytics, Mixpanel, or PostHog. If we add one in the future, we will list it here at least thirty (30) days before deployment and update our consent flow accordingly.
        </P>
        <SubH>Marketing (not in use)</SubH>
        <P>
          We do not currently use advertising cookies, retargeting pixels, or social-media tracking pixels (such as the Meta Pixel, the LinkedIn Insight Tag, or Google Ads conversion tags). If we ever add one, it will appear in the table below and an opt-in consent banner will be required before it loads.
        </P>
      </Section>

      <Section entry={TOC[2]}>
        <P>
          The following list is current as of the date at the top of this page. We update it whenever we add, remove, or change a storage item. All items below are <strong style={{ color: IVORY }}>first-party</strong> (set by {TRADE_NAME} itself) and strictly functional. If we later add HTTP cookies — for example, when we integrate a hosted payment processor — they will be added here at that time.
        </P>
        <div className="overflow-x-auto -mx-5 sm:mx-0 my-6">
          <table className="w-full border" style={{ borderColor: DIV }}>
            <thead>
              <tr style={{ backgroundColor: "rgba(77,159,219,0.08)" }}>
                {["Name", "Storage", "Type", "Purpose", "Duration"].map(h => (
                  <th key={h} className="px-3 py-2 text-left text-[10px] font-bold uppercase tracking-[0.14em] border-b" style={{ borderColor: DIV, color: BLUE }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STORAGE_TABLE.map(c => (
                <tr key={c.name} className="border-b" style={{ borderColor: DIV }}>
                  <td className="px-3 py-3 text-[13px] font-mono" style={{ color: IVORY }}>{c.name}</td>
                  <td className="px-3 py-3 text-[13px] font-light whitespace-nowrap" style={{ color: MUTE }}>{c.storage}</td>
                  <td className="px-3 py-3 text-[13px] font-medium" style={{ color: BLUE }}>{c.type}</td>
                  <td className="px-3 py-3 text-[13px] font-light" style={{ color: MUTE }}>{c.purpose}</td>
                  <td className="px-3 py-3 text-[13px] font-light whitespace-nowrap" style={{ color: MUTE }}>{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section entry={TOC[3]}>
        <P>
          No third party currently sets cookies on the {TRADE_NAME} site. The two integrations we rely on — described below — load on their own domains rather than ours.
        </P>
        <P>
          <strong style={{ color: IVORY }}>ID.me</strong>, used for HonorPass military / veteran / first-responder / nurse / teacher verification, opens its own page in a separate window when you initiate verification. ID.me sets cookies only on the <code style={{ color: BLUE }}>id.me</code> domain. We never see those cookies. ID.me's privacy practices are governed at <a href="https://www.id.me/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>id.me/privacy</a>.
        </P>
        <P>
          When we add a hosted payment processor in the future, that processor's payment fields and fraud-prevention scripts will set their own cookies during checkout. We will list the processor here, link to its privacy policy, and explain what its cookies do — before that integration ships.
        </P>
      </Section>

      <Section entry={TOC[4]}>
        <SubH>Browser Controls</SubH>
        <P>
          All major browsers let you view and clear cookies, local storage, and session storage, and block sites from using them. Search your browser's help for "manage site data" or "clear site data." If you block storage for {TRADE_NAME} entirely, sign-in, the price calculator, and the booking flow will stop working.
        </P>
        <SubH>Calculator Draft Persistence</SubH>
        <P>
          The price calculator stores your draft quote in <code style={{ color: BLUE }}>sessionStorage</code>, which the browser clears automatically when you close the tab. To clear it sooner, close the tab or use your browser's "Clear site data" tool for {TRADE_NAME}.
        </P>
        <SubH>Sign-In Storage</SubH>
        <P>
          Signing out of your account immediately clears the {TRADE_NAME} sign-in keys (<code style={{ color: BLUE }}>docsy_auth_token</code> and <code style={{ color: BLUE }}>docsy_auth_user</code>) from your browser. You can sign out at any time from the account menu in the site header.
        </P>
        <SubH>Booking-in-Progress Storage</SubH>
        <P>
          The in-progress booking key (<code style={{ color: BLUE }}>docsy_booking</code>) lives only for the duration of the tab session and is removed when you complete the booking confirmation page. To abandon a booking and clear the storage immediately, close the tab or click "Start over" in the booking flow.
        </P>
      </Section>

      <Section entry={TOC[5]}>
        <P>
          We honor browser-based privacy signals where they are technically meaningful for the categories of cookies we run. Today, every cookie we set is functional and required for the service you are actively using; there is no targeted advertising or cross-site tracking to suppress. If we add an analytics or marketing cookie in the future, we will respect the Global Privacy Control (GPC) signal where supported and update this section accordingly.
        </P>
      </Section>

      <Section entry={TOC[6]}>
        <P>
          We may update this Policy when we add, remove, or change a cookie or related technology, or when the law changes. Updates take effect on the date posted at the top of the page; material changes will be announced with at least thirty (30) days' notice in-site. Continued use of the site after the effective date constitutes acceptance.
        </P>
      </Section>

      <Section entry={TOC[7]}>
        <P>
          For questions about cookies or any other privacy topic, contact our privacy team:
        </P>
        <UL items={[
          <>Email: <a href={`mailto:${PRIVACY_EMAIL}`} className="underline" style={{ color: BLUE }}>{PRIVACY_EMAIL}</a></>,
          <>See also our full <Link href="/privacy" className="underline" style={{ color: BLUE }}>Privacy Policy</Link>.</>,
        ]} />
      </Section>

    </LegalShell>
  );
}
