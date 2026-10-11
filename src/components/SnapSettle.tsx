"use client";

import { useEffect } from "react";

const DESKTOP = "(min-width: 768px) and (min-height: 600px)";
const IDLE_MS = 1500;

// Gentle start and finish; slower than the browser's built-in smooth scroll.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

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
    let frame = 0;
    let gliding = false;
    const html = document.documentElement;

    const stopGlide = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      gliding = false;
      html.style.scrollSnapType = "";
    };

    // Custom glide: CSS snap is paused while it runs (it would otherwise
    // re-snap on every step) and restored when it ends or is interrupted.
    const glideTo = (target: number) => {
      stopGlide();
      const start = window.scrollY;
      const dist = target - start;
      const duration = Math.min(1200, Math.max(600, 450 + Math.abs(dist) * 0.9));
      const t0 = performance.now();
      gliding = true;
      html.style.scrollSnapType = "none";
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / duration);
        // "instant": html has scroll-behavior: smooth, which would start a new
        // browser smooth-scroll on every frame and stall the glide.
        window.scrollTo({ top: start + dist * easeInOutCubic(t), behavior: "instant" });
        if (t < 1) frame = requestAnimationFrame(step);
        else stopGlide();
      };
      frame = requestAnimationFrame(step);
    };

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
      if (best > 2) glideTo(target);
    };

    const schedule = () => {
      if (gliding) return; // our own glide's scroll events
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, IDLE_MS);
    };
    // A held mouse button (carousel drag, text selection) is not "still".
    const down = () => {
      pointerDown = true;
      stopGlide();
      window.clearTimeout(timer);
    };
    // Any user input during a glide hands control straight back.
    const interrupt = () => {
      if (!gliding) return;
      stopGlide();
      schedule();
    };
    const up = () => {
      pointerDown = false;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      window.clearTimeout(timer);
      stopGlide();
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return null;
}
