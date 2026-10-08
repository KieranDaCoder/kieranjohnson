"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const CYCLE_MS = 5000;

function SmileFace({ grin }: { grin: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <rect x="28" y="28" width="10" height="10" fill="var(--color-black)" />
      <rect x="62" y="28" width="10" height="10" fill="var(--color-black)" />
      {grin ? (
        <polygon points="22,58 78,58 64,80 36,80" fill="var(--color-black)" />
      ) : (
        <polyline
          points="32,60 44,70 56,70 68,60"
          fill="none"
          stroke="var(--color-black)"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      )}
    </svg>
  );
}

/** One board tile that flips between a small smile and a big grin every
 * ~5s. The only thing that moves once the name has landed. */
export function SmileTile() {
  const reduceMotion = useReducedMotionSafe();
  const [grin, setGrin] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!interval) {
            interval = setInterval(() => setGrin((g) => !g), CYCLE_MS);
          }
        } else if (interval) {
          clearInterval(interval);
          interval = null;
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion]);

  return (
    <div ref={containerRef} aria-hidden="true" className="h-full w-full bg-accent">
      <SmileFace grin={grin} />
    </div>
  );
}
