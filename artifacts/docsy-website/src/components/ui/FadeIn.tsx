import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  distance?: number;
}

function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
  style = {},
  threshold = 0.1,
  distance = 30,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => getPrefersReducedMotion());

  /* Honor the user's prefers-reduced-motion system setting; subscribe to changes. */
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (typeof mq.addEventListener === "function") mq.addEventListener("change", handler);
    else if (typeof mq.addListener === "function") mq.addListener(handler);
    return () => {
      if (typeof mq.removeEventListener === "function") mq.removeEventListener("change", handler);
      else if (typeof mq.removeListener === "function") mq.removeListener(handler);
    };
  }, []);

  /*
   * useLayoutEffect fires synchronously after DOM mutations but BEFORE the
   * browser paints. If the element is already in the viewport at mount time
   * (e.g. a hero section), we mark it visible immediately so the user never
   * sees the invisible/translated-down state — not even for one frame.
   */
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
    }
  }, []);

  /*
   * For elements below the fold, use IntersectionObserver to reveal them
   * as they scroll into view. Skip if already visible from above.
   */
  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  /*
   * When the user prefers reduced motion: skip the slide-up + long fade,
   * render content visible immediately with no transition.
   */
  if (reducedMotion) {
    return (
      <div ref={ref} className={className} style={{ ...style, opacity: 1, transform: "none" }}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.1s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
