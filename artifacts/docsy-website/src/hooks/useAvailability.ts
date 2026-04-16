import { useEffect, useState } from "react";
import {
  BUSINESS_HOURS,
  StatusState,
  getNextTimeLabel,
} from "@/lib/statusBar";

function readOverride(): StatusState | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const v = params.get("status");
  if (v === "available" || v === "busy" || v === "closed") return v;
  return null;
}

function computeFromHours(): StatusState {
  const h = new Date().getHours();
  return h >= BUSINESS_HOURS.open && h < BUSINESS_HOURS.close
    ? "available"
    : "closed";
}

export function useAvailability(): {
  state: StatusState;
  nextLabel: { prefix: string; value: string };
} {
  const [state, setState] = useState<StatusState>(() => {
    return readOverride() ?? computeFromHours();
  });

  useEffect(() => {
    const update = () => setState(readOverride() ?? computeFromHours());
    update();
    const id = setInterval(update, 60_000);
    const onPop = () => update();
    window.addEventListener("popstate", onPop);
    return () => {
      clearInterval(id);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  return { state, nextLabel: getNextTimeLabel(state) };
}
