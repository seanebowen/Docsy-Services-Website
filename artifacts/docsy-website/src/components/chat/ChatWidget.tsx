import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";

const BG   = "#131929";
const BLUE  = "#4D9FDB";
const IVORY = "#F5EFE6";
const DIV   = "#1e2a3a";
const PANEL_BG = "#0d1320";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  action?: { kind: string; url: string; label: string };
}

const SUGGESTED = [
  "How much does a RON cost?",
  "What is an apostille?",
  "Can I book for today?",
  "Tell me about Business+ plans",
  "What's the Document Check?",
  "What ID do I need?",
];

function uid() {
  return Math.random().toString(36).slice(2);
}

/* ── Simple inline markdown renderer ────────────────────────────── */
function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  const nodes: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("* ")) {
      nodes.push(
        <li key={key++} className="ml-4 list-disc" style={{ color: "rgba(245,239,230,0.85)" }}>
          {inlineMarkdown(line.replace(/^[•\-*] /, ""), key)}
        </li>
      );
    } else if (/^\d+\. /.test(line)) {
      nodes.push(
        <li key={key++} className="ml-4 list-decimal" style={{ color: "rgba(245,239,230,0.85)" }}>
          {inlineMarkdown(line.replace(/^\d+\. /, ""), key)}
        </li>
      );
    } else if (line.trim() === "") {
      nodes.push(<div key={key++} className="h-2" />);
    } else {
      nodes.push(
        <p key={key++} className="leading-relaxed" style={{ color: "rgba(245,239,230,0.9)" }}>
          {inlineMarkdown(line, key)}
        </p>
      );
    }
  }
  return nodes;
}

function inlineMarkdown(text: string, baseKey: number): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${baseKey}-${i}`} style={{ color: IVORY }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={`${baseKey}-${i}`}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={`${baseKey}-${i}`} className="px-1 rounded text-[11px]" style={{ backgroundColor: DIV, color: BLUE }}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

/* ── Booking action card ─────────────────────────────────────────── */
function BookingCard({ action }: { action: Message["action"] }) {
  if (!action) return null;
  return (
    <Link
      href={action.url}
      className="flex items-center justify-between gap-3 mt-3 px-4 py-3 text-sm font-bold border transition-colors"
      style={{ borderColor: BLUE, color: IVORY, backgroundColor: "rgba(77,159,219,0.12)" }}
    >
      <span>{action.label}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </Link>
  );
}

/* ── Chat bubble ─────────────────────────────────────────────────── */
function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black mr-2 mt-0.5" style={{ backgroundColor: BLUE, color: "#fff" }}>
          S
        </div>
      )}
      <div className={`max-w-[82%] ${isUser ? "order-1" : ""}`}>
        <div
          className="px-3.5 py-2.5 text-sm rounded-sm"
          style={{
            backgroundColor: isUser ? BLUE : DIV,
            color: isUser ? "#fff" : IVORY,
          }}
        >
          {isUser ? (
            <p style={{ color: "#fff" }}>{msg.content}</p>
          ) : (
            <div className="space-y-0.5">
              {msg.content ? renderMarkdown(msg.content) : (
                <span className="flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: BLUE }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: BLUE, animationDelay: "0.2s" }} />
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: BLUE, animationDelay: "0.4s" }} />
                </span>
              )}
            </div>
          )}
        </div>
        {msg.action && <BookingCard action={msg.action} />}
        {msg.streaming && msg.content && (
          <span className="inline-block w-0.5 h-3.5 ml-0.5 animate-pulse" style={{ backgroundColor: BLUE }} />
        )}
      </div>
    </div>
  );
}

/* ── Main widget ─────────────────────────────────────────────────── */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const abortRef  = useRef<AbortController | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{
        id: uid(),
        role: "assistant",
        content: "Hi, I'm **Sage** — Docsy's virtual assistant. I can answer questions about our notary services, give accurate pricing, check availability, and help you start a booking. What can I help you with?",
      }]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;

    setError(null);
    setInput("");

    const userMsg: Message = { id: uid(), role: "user", content };
    const assistantId = uid();
    const assistantMsg: Message = { id: assistantId, role: "assistant", content: "", streaming: true };

    setMessages(prev => [...prev, userMsg, assistantMsg]);
    setLoading(true);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));

      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const json = await resp.json().catch(() => ({}));
        throw new Error(json.error ?? `Server error ${resp.status}`);
      }

      const reader = resp.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finalAction: Message["action"] | undefined;

      if (!reader) throw new Error("No response stream");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          try {
            const evt = JSON.parse(raw) as { type: string; content?: string; message?: string; kind?: string; url?: string; label?: string };

            if (evt.type === "delta" && evt.content) {
              setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, content: m.content + evt.content } : m
              ));
            } else if (evt.type === "action") {
              finalAction = { kind: evt.kind ?? "booking", url: evt.url ?? "/booking", label: evt.label ?? "Book Now →" };
            } else if (evt.type === "error") {
              setError(evt.message ?? "Something went wrong.");
            } else if (evt.type === "done") {
              setMessages(prev => prev.map(m =>
                m.id === assistantId ? { ...m, streaming: false, action: finalAction } : m
              ));
              setLoading(false);
            }
          } catch { /* malformed chunk, skip */ }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      const msg = err instanceof Error ? err.message : "Connection error.";
      setMessages(prev => prev.map(m =>
        m.id === assistantId
          ? { ...m, content: msg, streaming: false }
          : m
      ));
      setLoading(false);
    }
  }, [loading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open Docsy chat assistant"}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: open ? "#0d1320" : BLUE, border: open ? `1.5px solid ${DIV}` : "none" }}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke={IVORY} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 2C6.03 2 2 5.8 2 10.5c0 1.9.67 3.66 1.79 5.09L2.5 19.5l4.38-1.23A9.4 9.4 0 0 0 11 19c4.97 0 9-3.8 9-8.5S15.97 2 11 2Z" fill="#fff"/>
            <circle cx="7.5" cy="10.5" r="1" fill={BLUE}/>
            <circle cx="11" cy="10.5" r="1" fill={BLUE}/>
            <circle cx="14.5" cy="10.5" r="1" fill={BLUE}/>
          </svg>
        )}
      </button>

      {/* ── Unread dot ── */}
      {!open && messages.length === 0 && (
        <span className="fixed bottom-[72px] right-5 z-[9999] w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white" style={{ backgroundColor: BLUE }}>
          1
        </span>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[9997] flex flex-col rounded-sm shadow-2xl overflow-hidden"
          style={{
            width: "min(390px, calc(100vw - 24px))",
            height: "min(580px, calc(100dvh - 120px))",
            backgroundColor: PANEL_BG,
            border: `1px solid ${DIV}`,
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ backgroundColor: BG, borderBottom: `1px solid ${DIV}` }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black" style={{ backgroundColor: BLUE, color: "#fff" }}>S</div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: IVORY }}>Sage · Docsy Assistant</p>
                <p className="text-[10px]" style={{ color: "rgba(245,239,230,0.4)" }}>Answers questions · Checks availability · Starts bookings</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(77,159,219,0.15)", color: BLUE }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BLUE }} />
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}

            {/* Suggested prompts — only when first message showing */}
            {messages.length === 1 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {SUGGESTED.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] font-bold px-3 py-1.5 border transition-colors hover:border-blue-400"
                    style={{ borderColor: DIV, color: "rgba(245,239,230,0.55)", backgroundColor: "transparent" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {error && (
              <p className="text-xs mt-2 px-3 py-2 border" style={{ borderColor: "#e05252", color: "#e05252" }}>
                {error}
              </p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex-shrink-0 flex gap-2 px-3 py-3"
            style={{ backgroundColor: BG, borderTop: `1px solid ${DIV}` }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about pricing, availability, or services…"
              disabled={loading}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-[rgba(245,239,230,0.3)]"
              style={{ color: IVORY, caretColor: BLUE }}
              aria-label="Chat message"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-opacity disabled:opacity-30"
              style={{ backgroundColor: BLUE }}
              aria-label="Send message"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Footer disclaimer */}
          <p className="flex-shrink-0 text-center text-[9px] px-4 py-1.5" style={{ color: "rgba(245,239,230,0.25)", backgroundColor: BG }}>
            Sage may make mistakes. Verify pricing at{" "}
            <a href="/calculate" style={{ color: BLUE }}>docsyservices.com/calculate</a>
            {" "}· Not legal advice.
          </p>
        </div>
      )}
    </>
  );
}
