"use client";

import { useEffect } from "react";

const DESKTOP = "(min-width: 768px) and (min-height: 600px)";
const IDLE_MS = 1500;

function docTop(el: HTMLElement) {
  return el.getBoundingClientRect().top + window.scrollY;
}

// Proximity snap only settles when a scroll stops near a page. If the page is
// left still for 1.5s and is not lined up, glide to the nearest page top.
// Desktop only (same screens as the CSS snap); never while reading inside a
// page taller than the screen; off under reduced motion.
export function SnapSettle() {
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;
    let pointerDown = false;

    const settle = () => {
      if (!desktop.matches || reduce.matches || pointerDown) return;
      const pages = Array.from(document.querySelectorAll<HTMLElement>("#home, .screen-section"));
      if (pages.length === 0) return;
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Reading inside a tall page: leave it alone.
      const inside = pages.find((p) => {
        const top = docTop(p);
        return p.offsetHeight > vh + 2 && y > top + 2 && y + vh < top + p.offsetHeight - 2;
      });
      if (inside) return;

      let target = 0;
      let best = Infinity;
      for (const p of pages) {
        const top = docTop(p);
        if (Math.abs(top - y) < best) {
          best = Math.abs(top - y);
          target = top;
        }
      }
      if (best > 2) window.scrollTo({ top: target, behavior: "smooth" });
    };

    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, IDLE_MS);
    };
    // A held mouse button (carousel drag, text selection) is not "still".
    const down = () => {
      pointerDown = true;
      window.clearTimeout(timer);
    };
    const up = () => {
      pointerDown = false;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return null;
}
