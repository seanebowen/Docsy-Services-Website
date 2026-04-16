import React from "react";
import { useLocation } from "wouter";
import { HomeStatusBar } from "./HomeStatusBar";
import { DivisionStatusBar } from "./DivisionStatusBar";
import { useAvailability } from "@/hooks/useAvailability";
import { DivisionId } from "@/lib/statusBar";

const ROUTE_TO_DIVISION: { match: RegExp; id: DivisionId }[] = [
  { match: /^\/notary-services(\/|$|#)/,      id: "ron" },
  { match: /^\/ron(\/|$|#)/,                  id: "ron" },
  { match: /^\/mobile-notary(\/|$|#)/,        id: "mobile" },
  { match: /^\/loan-signing(\/|$|#)/,         id: "loan" },
  { match: /^\/apostille(\/|$|#)/,            id: "apostille" },
  { match: /^\/electronic-reporting(\/|$|#)/, id: "court" },
];

export function GlobalStatusBar() {
  const [location] = useLocation();
  const { state } = useAvailability();

  const match = ROUTE_TO_DIVISION.find((r) => r.match.test(location));

  if (!match) {
    return <HomeStatusBar />;
  }

  return <DivisionStatusBar divisionId={match.id} state={state} />;
}
