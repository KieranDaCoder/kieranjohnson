"use client";

import { useEffect, useRef } from "react";

// Real, selectable text. The pointer effect only sets CSS vars; all motion is CSS.
export function HeroName() {
  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = h1.current;
    const section = root?.closest("section");
    if (!root || !section) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = Array.from(root.querySelectorAll<HTMLElement>(".hero-line"));
    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      for (const el of lines) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${((px - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((py - r.top) / r.height) * 100}%`);
      }
    };
    const setGlare = (v: number) => {
      for (const el of lines) el.style.setProperty("--glare", String(v));
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      setGlare(1);
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => setGlare(0);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <h1 ref={h1} className="t-hero">
        <span className="hero-line">KIERAN</span>
        <span className="t-hero-alt hero-line hero-line-2">JOHNSON</span>
      </h1>
      <p className="t-sub hero-sub mt-6 md:mt-8">Junior Strategist</p>
    </>
  );
}
