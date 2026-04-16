import React from "react";
import Booking from "./Booking";

const BG = "#131929";
const BLUE = "#4D9FDB";
const DIV = "#1e2a3a";

export default function InternalBook() {
  React.useEffect(() => {
    sessionStorage.setItem("docsy_internal_booking", "1");
    document.title = "Internal Booking | Docsy Services";
    return () => { sessionStorage.removeItem("docsy_internal_booking"); };
  }, []);

  return (
    <div className="w-full" style={{ backgroundColor: BG }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: DIV, backgroundColor: "#0b1220" }}>
        <div className="max-w-5xl mx-auto flex items-center gap-3 flex-wrap">
          <span
            className="text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 border"
            style={{ borderColor: BLUE, color: BLUE }}
          >
            ⊙ Internal Booking — Staff Only
          </span>
          <span className="text-xs text-white/35">
            All payment methods (check, ACH, wire, Zelle, card, cash) available at checkout. No public marketing copy.
          </span>
        </div>
      </div>
      <Booking />
    </div>
  );
}
