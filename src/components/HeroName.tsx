"use client";

import { useEffect, useRef } from "react";

// Real, selectable text. The pointer effect only sets CSS vars; all motion is CSS.
export function HeroName({ usp }: { usp: string }) {
  const h1 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = h1.current;
    const section = root?.closest("section");
    const depth = root?.parentElement;
    const lean = section?.querySelector<HTMLElement>(".hero-lean");
    if (!root || !section || !depth) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Scroll depth: the name and subline ease back as the hero scrolls out.
    let sFrame = 0;
    const applyDepth = () => {
      sFrame = 0;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      depth.style.setProperty("--depth", p.toFixed(4));
    };
    const onScroll = () => {
      if (!sFrame) sFrame = requestAnimationFrame(applyDepth);
    };
    applyDepth();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    let lFrame = 0;
    let px = 0;
    let py = 0;
    const lines = Array.from(root.querySelectorAll<HTMLElement>(".hero-line"));

    const apply = () => {
      frame = 0;
      for (const el of lines) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--gx", `${((px - r.left) / r.width) * 100}%`);
        el.style.setProperty("--gy", `${((py - r.top) / r.height) * 100}%`);
      }
    };
    const applyLean = () => {
      lFrame = 0;
      if (!lean) return;
      const travel = window.innerWidth * 0.06;
      const nx = (px / window.innerWidth - 0.5) * 2;
      const ny = (py / window.innerHeight - 0.5) * 2;
      lean.style.setProperty("--lx", `${(nx * travel).toFixed(1)}px`);
      lean.style.setProperty("--ly", `${(ny * travel).toFixed(1)}px`);
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
      if (!lFrame) lFrame = requestAnimationFrame(applyLean);
    };
    const onLeave = () => setGlare(0);

    if (fine) {
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      if (lFrame) cancelAnimationFrame(lFrame);
      if (sFrame) cancelAnimationFrame(sFrame);
    };
  }, []);

  return (
    <>
      <div className="hero-light" aria-hidden="true">
        <div className="hero-lean">
          <div className="hero-pool" />
        </div>
      </div>
      <div className="hero-depth">
        <h1 ref={h1} className="t-hero">
          <span className="hero-line" data-text="KIERAN">KIERAN</span>
          <span className="t-hero-alt hero-line hero-line-2" data-text="JOHNSON">JOHNSON</span>
        </h1>
        <div className="hero-end hero-sub">
          <p className="t-sub">
            <span className="sub-role">Junior Strategist</span> <span>{usp}</span>
          </p>
        </div>
      </div>
    </>
  );
}
