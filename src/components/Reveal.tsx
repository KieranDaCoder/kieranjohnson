"use client";

import { useEffect } from "react";

// Section arrival: a [data-reveal-section] gets is-in once 45% of it is on
// screen, and loses it only when it is completely out of view, so the
// animation replays on every arrival but never blinks while visible.
// Hidden only once js-reveal is set, so no-JS and reduced motion see everything.
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-section]"));
    const thresholds = [0, 0.001, ...Array.from({ length: 20 }, (_, i) => (i + 1) / 20)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const tall = entry.intersectionRect.height >= window.innerHeight * 0.45;
          if (entry.intersectionRatio >= 0.45 || tall) entry.target.classList.add("is-in");
          else if (entry.intersectionRatio === 0 || entry.intersectionRect.height < 1) entry.target.classList.remove("is-in");
        }
      },
      { threshold: thresholds },
    );
    root.classList.add("js-reveal");
    sections.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);
  return null;
}
