export type StatusState = "available" | "busy" | "closed";

export type DivisionId = "ron" | "mobile" | "loan" | "court" | "apostille";

export interface DivisionCopy {
  h: string;
  s: string;
  btn: string;
}

export interface Division {
  id: DivisionId;
  label: string;
  pill: string;
  color: string;
  home: { h: string; s: string };
  available: DivisionCopy;
  busy: DivisionCopy;
  closed: DivisionCopy;
}

export const BUSINESS_HOURS = { open: 8, close: 18 };

export const BOOKING_HREF = "/calculate";

export const MOCK_NEXT_TIMES: Record<StatusState, string> = {
  available: "Today 2:30 PM",
  busy: "Today 3:45 PM",
  closed: "Tomorrow 8:00 AM",
};

export const HOME_BUSY = {
  h: "In Session",
  s: "Our specialist is with a client right now",
  btn: "Schedule ahead",
};

export const HOME_CLOSED = {
  h: "Closed",
  s: "Book tonight and secure your spot for tomorrow",
  btn: "Book for tomorrow",
};

export const DIVISIONS: Division[] = [
  {
    id: "ron",
    label: "Remote Online Notary",
    pill: "RON",
    color: "#7c3aed",
    home: {
      h: "Available Now",
      s: "Sign securely from anywhere in Texas · No travel required",
    },
    available: {
      h: "Available Now",
      s: "Secure remote session · No travel · Sign from anywhere in Texas",
      btn: "Start your session",
    },
    busy: {
      h: "In Session",
      s: "Remote sessions fill fast — secure your slot now",
      btn: "Reserve your slot",
    },
    closed: {
      h: "Closed",
      s: "Book tonight and lock in your remote session for tomorrow",
      btn: "Book tomorrow's slot",
    },
  },
  {
    id: "mobile",
    label: "Mobile Notary",
    pill: "MOBILE",
    color: "#0891b2",
    home: {
      h: "Available Now",
      s: "We come to you · Same-day dispatch · San Antonio",
    },
    available: {
      h: "Available Now",
      s: "Mobile notary comes to you · Same-day dispatch available",
      btn: "Schedule your visit",
    },
    busy: {
      h: "In Session",
      s: "Leave your address — your stop will be confirmed",
      btn: "Reserve your stop",
    },
    closed: {
      h: "Closed",
      s: "Book tonight and secure your morning stop before routes fill",
      btn: "Book your stop",
    },
  },
  {
    id: "loan",
    label: "Loan Signing",
    pill: "LOAN SIGNING",
    color: "#059669",
    home: {
      h: "Available Now",
      s: "Accurate, professional closings · San Antonio",
    },
    available: {
      h: "Available Now",
      s: "Closings handled accurately and professionally · San Antonio & surrounding areas",
      btn: "Confirm your closing",
    },
    busy: {
      h: "In Session",
      s: "Don't let your closing date slip — hold the next slot now",
      btn: "Hold my next slot",
    },
    closed: {
      h: "Closed",
      s: "Schedule tonight to protect your closing date",
      btn: "Schedule your closing",
    },
  },
  {
    id: "court",
    label: "Electronic Reporting",
    pill: "ELECTRONIC REPORTING",
    color: "#d97706",
    home: {
      h: "Available Now",
      s: "Depositions · Remote & on-site · San Antonio",
    },
    available: {
      h: "Available Now",
      s: "Digital proceedings · Depositions · Remote & on-site · San Antonio",
      btn: "Reserve your proceeding",
    },
    busy: {
      h: "In Session",
      s: "Calendar fills fast — secure your date before it closes",
      btn: "Book next opening",
    },
    closed: {
      h: "Closed",
      s: "Proceedings book out quickly — reserve your date tonight",
      btn: "Reserve your date",
    },
  },
  {
    id: "apostille",
    label: "Apostille Services",
    pill: "APOSTILLE",
    color: "#be185d",
    home: {
      h: "Available Now",
      s: "International documents · Fast turnaround",
    },
    available: {
      h: "Available Now",
      s: "Texas apostille processing · International documents · Fast turnaround",
      btn: "Start your apostille",
    },
    busy: {
      h: "In Session",
      s: "Orders processed in sequence — submit now to hold your place",
      btn: "Submit your documents",
    },
    closed: {
      h: "Closed",
      s: "International deadlines don't wait — submit your request tonight",
      btn: "Submit tonight",
    },
  },
];

export function getDivision(id: DivisionId): Division {
  return DIVISIONS.find((d) => d.id === id)!;
}

export function fmt12(h: number): string {
  return (h % 12 || 12) + ":00 " + (h >= 12 && h < 24 ? "PM" : "AM");
}

export function applyTokens(text: string): string {
  return text.replace(/\{OPEN\}/g, fmt12(BUSINESS_HOURS.open));
}

export function getNextTimeLabel(state: StatusState): {
  prefix: string;
  value: string;
} {
  if (state === "available") {
    return { prefix: "Next slot: ", value: MOCK_NEXT_TIMES.available };
  }
  if (state === "busy") {
    return { prefix: "Next opening: ", value: MOCK_NEXT_TIMES.busy };
  }
  return {
    prefix: "Next available: ",
    value: "Tomorrow " + fmt12(BUSINESS_HOURS.open),
  };
}
