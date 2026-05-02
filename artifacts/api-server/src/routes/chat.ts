import { Router, type Request, type Response } from "express";
import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";
import { buildKnowledgeBlock, SERVICES, HOURS, BUSINESS_PLUS, PROMOTIONS, CONTACT } from "../lib/siteKnowledge.js";
import { getAvailableSlots } from "../lib/getAvailableSlots.js";

const router = Router();

const FALLBACK_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];

/* ── OpenAI client (lazy, Replit AI Integrations proxy) ─────────── */
let _openai: OpenAI | null = null;
function getOpenAI(): OpenAI | null {
  if (_openai) return _openai;
  const baseURL = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
  const apiKey  = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];
  if (!baseURL || !apiKey) return null;
  _openai = new OpenAI({ baseURL, apiKey });
  return _openai;
}

/* ── Rate limiting: 40 messages per IP per 10 min ───────────────── */
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT = 40;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

/* ── OpenAI tools the assistant can call ────────────────────────── */
const TOOLS: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_availability",
      description: "Check available appointment slots for a given date and service type. Returns a list of available time slots (24-hour HH:MM strings). Use this before suggesting a booking time.",
      parameters: {
        type: "object",
        properties: {
          date: { type: "string", description: "Date in YYYY-MM-DD format, e.g. 2025-06-15" },
          service: {
            type: "string",
            enum: ["RON", "Mobile_Local", "Mobile_Travel", "LSA_Local", "LSA_Travel", "Apostille", "Deposition", "EUO"],
            description: "Service type key. Default to RON if unsure.",
          },
        },
        required: ["date", "service"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_booking_link",
      description: "Generate a booking page URL with service pre-selected. Call this when the user is ready to book — after you have confirmed the service type and ideally a preferred date/time. Returns a URL to hand off to the user.",
      parameters: {
        type: "object",
        properties: {
          service: {
            type: "string",
            enum: ["RON", "Mobile_Local", "Mobile_Travel", "LSA_Local", "LSA_Travel", "Apostille", "Deposition", "EUO"],
            description: "Service type the user wants to book",
          },
          date: { type: "string", description: "Preferred date YYYY-MM-DD (optional)" },
          time: { type: "string", description: "Preferred time in 12-hour format e.g. '10:00 AM' (optional)" },
        },
        required: ["service"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_pricing",
      description: "Get authoritative pricing for a specific service. Always use this rather than quoting from memory to ensure accuracy.",
      parameters: {
        type: "object",
        properties: {
          service: {
            type: "string",
            enum: ["RON", "Mobile", "LoanSigning", "Apostille", "CourtReporting", "DocumentCheck", "BusinessPlus"],
            description: "Service to get pricing for",
          },
        },
        required: ["service"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_promotions",
      description: "Get list of currently active promotions and discounts",
      parameters: { type: "object", properties: {} },
    },
  },
];

/* ── Tool execution ─────────────────────────────────────────────── */
async function executeTool(name: string, args: Record<string, string>): Promise<{ result: string; action?: { kind: string; url: string; label: string } }> {
  if (name === "get_availability") {
    const { date, service } = args;
    try {
      const slots = await getAvailableSlots(date, service ?? "RON", false);
      const visible = (slots as string[]).filter((s: string) => {
        const [h] = s.split(":").map(Number);
        return h >= 9 && h <= 20;
      });
      if (visible.length === 0) {
        return { result: `No availability found for ${service} on ${date} within standard 9 AM–9 PM hours. Suggest the user try a different date.` };
      }
      const formatted = visible.map((s: string) => {
        const [h24, m] = s.split(":").map(Number);
        const ampm = h24 >= 12 ? "PM" : "AM";
        const h12 = h24 === 0 ? 12 : h24 > 12 ? h24 - 12 : h24;
        return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
      });
      return { result: `Available slots for ${service} on ${date}: ${formatted.join(", ")}` };
    } catch {
      const visible = FALLBACK_SLOTS.filter((s: string) => {
        const [h] = s.split(":").map(Number);
        return h >= 9 && h <= 20;
      });
      return { result: `Available slots for ${service} on ${date} (demo): ${visible.slice(0, 8).join(", ")} (and more)` };
    }
  }

  if (name === "get_booking_link") {
    const { service, date, time } = args;
    const params = new URLSearchParams({ service: service ?? "RON" });
    if (date) params.set("date", date);
    if (time) params.set("time", time);
    const url = `/booking?${params.toString()}`;
    return {
      result: `Booking link generated for ${service}${date ? ` on ${date}` : ""}${time ? ` at ${time}` : ""}. Present this as a call-to-action button.`,
      action: { kind: "booking", url, label: `Book ${service === "RON" ? "RON" : service?.replace("_", " ")} →` },
    };
  }

  if (name === "get_pricing") {
    const { service } = args;
    switch (service) {
      case "RON":
        return { result: `RON pricing: ${SERVICES.RON.basePrice}. Duration: ${SERVICES.RON.duration}. Promotions: ${SERVICES.RON.promotions.join("; ")}.` };
      case "Mobile":
        return { result: `Mobile Notary pricing: $10 notary fee + travel tier. Travel: Local (0–15 mi) $30 · Standard (15–30 mi) $45 · Extended (30–50 mi) $65 · Long range (50+ mi) $85+. Promotions: ${SERVICES.Mobile_Local.promotions.join("; ")}.` };
      case "LoanSigning":
        return { result: `Loan Signing pricing: ${SERVICES.LoanSigning.basePrice}. Duration: ${SERVICES.LoanSigning.duration}. Promotions: ${SERVICES.LoanSigning.promotions.join("; ")}.` };
      case "Apostille":
        return { result: `Apostille pricing: Standard ${SERVICES.Apostille.pricing.standard} · Rush ${SERVICES.Apostille.pricing.rush} · Sprint ${SERVICES.Apostille.pricing.sprint}. ${SERVICES.Apostille.preCheck}` };
      case "CourtReporting":
        return { result: `Court Reporting transcript pricing: Standard $8.50/page · Rough Draft $0.75/page · Expedited $9.50/page · Rush $12/page · Certified Copies $2.50/page. ${SERVICES.CourtReporting.includes}` };
      case "DocumentCheck":
        return { result: `Document Check is FREE — no booking required. ${SERVICES.DocumentCheck.description} URL: ${SERVICES.DocumentCheck.url}` };
      case "BusinessPlus":
        return { result: `Docsy Business+ tiers: Solo $15/mo · Pro $30/mo · Elite $49/mo · Firm (custom quoted). ${BUSINESS_PLUS.overview}` };
      default:
        return { result: "Service not found. Please specify one of: RON, Mobile, LoanSigning, Apostille, CourtReporting, DocumentCheck, BusinessPlus." };
    }
  }

  if (name === "get_promotions") {
    return {
      result: `Active promotions:\n${PROMOTIONS.map(p => `• ${p.name}: ${p.desc} (${p.eligibility})`).join("\n")}`,
    };
  }

  return { result: "Unknown tool." };
}

/* ── System prompt ──────────────────────────────────────────────── */
const SYSTEM_PROMPT = `You are Sage, the Docsy Services virtual assistant. Docsy is a Texas notary services company based in San Antonio offering RON (Remote Online Notarization), mobile notary, loan signing, apostille, and court reporting services statewide.

YOUR ROLE:
- Answer questions about Docsy's services, pricing, availability, and policies with precision and warmth.
- Help customers understand what service they need, how much it costs, and how to book.
- Guide users to start bookings when they're ready (use the get_booking_link tool).
- Check real availability when users ask about specific dates (use the get_availability tool).
- Direct users to the free Document Check (/document-check) whenever a document question comes up — it's free and highly recommended.

STRICT COMPLIANCE RULES:
1. NEVER invent prices, hours, or policies. Use the tools (get_pricing, get_promotions) to confirm before quoting. The knowledge base below is authoritative.
2. NEVER give legal advice. Always say "I can't give legal advice — please consult a licensed attorney" and redirect to a notary if appropriate.
3. NEVER claim Docsy can notarize documents outside Texas law (e.g., wills via RON, vital records, I-9s for employment). Be clear about limitations.
4. NEVER promise turnaround times for TX SOS apostille processing — Docsy doesn't control the Secretary of State's queue.
5. If you're unsure about something, say so clearly and offer to connect the user with the team: ${CONTACT.phone} or ${CONTACT.email}.
6. Keep responses concise and friendly. Use short paragraphs. Use bullet points for lists of 3+ items. Avoid excessive hedging.
7. When quoting prices, always cite the source ("Per our current pricing...") and note that the calculator at /calculate gives exact estimates.

TONE: Warm, confident, efficient. Think knowledgeable paralegal who respects people's time.

BOOKING HANDOFF RULE: When a user is ready to book — or when you've collected enough info (service type, preferred date) — call get_booking_link to generate a CTA. Always do this rather than just saying "go to the booking page."

AVAILABLE HOURS: Standard consumer hours are ${HOURS.standard}. Business+ Firm accounts get extended hours. Do NOT offer slots outside 9 AM–9 PM to individual customers.

${buildKnowledgeBlock()}`;

/* ── POST /api/chat ─────────────────────────────────────────────── */
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const ip = req.ip ?? "unknown";
  if (!checkRateLimit(ip)) {
    res.status(429).json({ ok: false, error: "Too many messages. Please wait a few minutes." });
    return;
  }

  const openai = getOpenAI();
  if (!openai) {
    res.status(503).json({ ok: false, error: "AI service not configured." });
    return;
  }

  const { messages } = req.body as { messages?: { role: string; content: string }[] };
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ ok: false, error: "messages array is required." });
    return;
  }

  const sanitized = messages
    .filter(m => m.role === "user" || m.role === "assistant")
    .slice(-20)
    .map(m => ({ role: m.role as "user" | "assistant", content: String(m.content).slice(0, 4000) }));

  const chatMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...sanitized,
  ];

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const send = (data: Record<string, unknown>) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  let collectedAction: { kind: string; url: string; label: string } | null = null;

  /* ── Helper: accumulate one streaming OpenAI response ──────────── */
  type ToolAccum = { id: string; name: string; args: string };

  async function streamOnce(
    msgs: ChatCompletionMessageParam[],
    forceNoTools: boolean,
  ): Promise<{ content: string; toolCalls: ToolAccum[] }> {
    const response = await openai!.chat.completions.create({
      model: "gpt-5.1",
      messages: msgs,
      tools: TOOLS,
      tool_choice: forceNoTools ? "none" : "auto",
      stream: true,
      max_completion_tokens: 1200,
      temperature: 0.4,
    });

    let content = "";
    /* Key: index (always present in streaming chunks); value: accumulator */
    const byIndex: Record<number, ToolAccum> = {};

    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta;
      if (!delta) continue;

      if (delta.content) {
        content += delta.content;
        send({ type: "delta", content: delta.content });
      }

      if (delta.tool_calls) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index ?? 0;
          if (!byIndex[idx]) byIndex[idx] = { id: "", name: "", args: "" };
          if (tc.id)                byIndex[idx].id   = tc.id;
          if (tc.function?.name)    byIndex[idx].name += tc.function.name;
          if (tc.function?.arguments) byIndex[idx].args += tc.function.arguments;
        }
      }
    }

    /* Only return calls that have a non-empty name and id */
    const toolCalls = Object.values(byIndex).filter(t => t.name && t.id);
    return { content, toolCalls };
  }

  try {
    let loopMessages = [...chatMessages];
    const MAX_ITERATIONS = 5;

    for (let iteration = 0; iteration < MAX_ITERATIONS; iteration++) {
      const isLast = iteration === MAX_ITERATIONS - 1;
      const { content, toolCalls } = await streamOnce(loopMessages, isLast);

      if (toolCalls.length === 0 || isLast) {
        if (collectedAction) send({ type: "action", ...collectedAction });
        send({ type: "done" });
        res.end();
        return;
      }

      /* Append assistant message with its tool_calls */
      const assistantMsg: ChatCompletionMessageParam = {
        role: "assistant",
        content: content || null,
        tool_calls: toolCalls.map(tc => ({
          id: tc.id,
          type: "function" as const,
          function: { name: tc.name, arguments: tc.args },
        })),
      };

      /* Execute each tool and append results */
      const toolResultMsgs: ChatCompletionMessageParam[] = [];
      for (const tc of toolCalls) {
        let args: Record<string, string> = {};
        try { args = JSON.parse(tc.args); } catch { /* use empty */ }
        const result = await executeTool(tc.name, args);
        if (result.action) collectedAction = result.action;
        toolResultMsgs.push({
          role: "tool",
          tool_call_id: tc.id,
          content: result.result,
        });
      }

      loopMessages = [...loopMessages, assistantMsg, ...toolResultMsgs];
    }

    if (collectedAction) send({ type: "action", ...collectedAction });
    send({ type: "done" });
    res.end();
  } catch (err) {
    req.log?.error({ err }, "chat error");
    send({ type: "error", message: "Something went wrong. Please try again or call us at (210) 417-9614." });
    send({ type: "done" });
    res.end();
  }
});

export default router;
