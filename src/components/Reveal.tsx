"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Content is visible in the server HTML (works without JavaScript). After mount,
// anything still below the fold is hidden and fades/lifts in when it scrolls into view.
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "shown";
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{ "--reveal-y": `${y}px`, "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{ "--reveal-y": "24px", "--reveal-delay": `${delay}s` } as React.CSSProperties}
    >
      {text}
    </Tag>
  );
}
