import { Link } from "wouter";

const IVORY = "#F5EFE6";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-5 py-20 text-center" style={{ backgroundColor: "#131929" }}>
      <div className="flex justify-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border" style={{ borderColor: "#4D9FDB", color: "#4D9FDB" }}>
          ✕ 404
        </span>
      </div>
      <h1 className="text-[6rem] sm:text-[10rem] font-black leading-none text-white mb-4" style={{ letterSpacing: "-0.04em" }}>
        404
      </h1>
      <p className="text-xl text-white/40 mb-10 max-w-sm">
        This page doesn't exist. But your notary does.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/" className="px-8 py-4 text-sm font-bold text-black" style={{ backgroundColor: IVORY }}>
          Back to Home
        </Link>
        <Link href="/faq" className="px-8 py-4 text-sm font-bold text-white border border-[#222]">
          Help Center
        </Link>
      </div>
    </div>
  );
}
