"use client";

import { useEffect, useRef } from "react";

// Real, selectable text. JS only sets CSS vars (scroll depth, light lean); all motion is CSS.
export function HeroName() {
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
    let lFrame = 0;
    let px = 0;
    let py = 0;

    const applyLean = () => {
      lFrame = 0;
      if (!lean) return;
      const travel = window.innerWidth * 0.06;
      const nx = (px / window.innerWidth - 0.5) * 2;
      const ny = (py / window.innerHeight - 0.5) * 2;
      lean.style.setProperty("--lx", `${(nx * travel).toFixed(1)}px`);
      lean.style.setProperty("--ly", `${(ny * travel).toFixed(1)}px`);
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      if (!lFrame) lFrame = requestAnimationFrame(applyLean);
    };
    if (fine) section.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onMove);
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
            <span className="sub-role">Junior Strategist</span>
          </p>
        </div>
      </div>
    </>
  );
}
