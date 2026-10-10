"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { layoutTop } from "@/lib/stackLayout";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DESKTOP = "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";
const SHADOW = "0 -24px 60px rgb(0 0 0 / 0.35)";

// "Folder stack": each section sticks (CSS position: sticky, no GSAP pin, so
// nothing is re-parented and the hero's CSS animations never restart) once its
// bottom reaches the viewport bottom; the next one slides up over it while the
// one behind recedes.
export function StackScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = root.current;
      if (!wrap) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP, () => {
        const sections = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll(":scope > [data-stack]"));
        const layers = sections;
        const inners = sections.map((s) => s.querySelector<HTMLElement>("[data-stack-inner]"));

        // A layer sticks when its bottom reaches the viewport bottom (top =
        // viewport - height), or at the top if it is taller than the viewport.
        // Later layers (higher z-index) slide over earlier ones.
        sections.forEach((el, i) => {
          gsap.set(el, { position: "sticky", zIndex: i + 1, boxShadow: SHADOW });
          const inner = inners[i];
          if (inner) inner.style.willChange = "transform";
        });
        const setTops = () => {
          const vh = window.innerHeight;
          sections.forEach((el) => {
            el.style.top = `${Math.min(0, vh - el.getBoundingClientRect().height)}px`;
          });
        };
        setTops();
        ScrollTrigger.addEventListener("refreshInit", setTops);

        sections.forEach((section, i) => {
          const next = layers[i + 1];
          if (!next) return;

          const inner = inners[i];
          const shade = section.querySelector<HTMLElement>("[data-stack-shade]");
          if (!inner || !shade) return;

          // The incoming layer's travel: its top from the viewport bottom up to
          // the top (or as far as it can go if it is shorter than the screen).
          // Positions come from layout, not getBoundingClientRect, because
          // sticky layers move while stuck.
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: next,
              start: () => layoutTop(next) - window.innerHeight,
              end: () =>
                layoutTop(next) - Math.max(0, window.innerHeight - next.getBoundingClientRect().height),
              scrub: true,
              invalidateOnRefresh: true,
              snap: {
                snapTo: (progress: number, self?: ScrollTrigger) =>
                  self && self.isActive ? (progress < 0.5 ? 0 : 1) : progress,
                duration: { min: 0.25, max: 0.6 },
                delay: 0.08,
                ease: "power2.inOut",
                directional: false,
                inertia: false,
              },
            },
          });
          tl.fromTo(
            inner,
            { scale: 1, rotationX: 0, y: 0, transformPerspective: 1200, transformOrigin: "50% 100%" },
            {
              scale: 0.9,
              rotationX: 6,
              y: () => -window.innerHeight * 0.02,
              transformPerspective: 1200,
              transformOrigin: "50% 100%",
            },
            0,
          ).fromTo(shade, { opacity: 0 }, { opacity: 0.55 }, 0);

          // Only the page directly behind should show. Once the layer after
          // next starts rising this one is two back, so hide it. Toggle
          // instantly at that point: the layer in front is still full size
          // and covers it completely, so the switch is never seen.
          const afterNext = layers[i + 2];
          if (afterNext) {
            ScrollTrigger.create({
              trigger: afterNext,
              start: () => layoutTop(afterNext) - window.innerHeight,
              invalidateOnRefresh: true,
              onEnter: () => gsap.set(section, { visibility: "hidden" }),
              onLeaveBack: () => gsap.set(section, { visibility: "visible" }),
            });
          }
        });

        // Layout shifts (fonts, images) change section heights: re-measure.
        // Refresh no longer re-parents anything, but is still debounced.
        let timer = 0;
        const refresh = () => {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
        };
        document.fonts?.ready.then(refresh);

        // Landing on /#section: place the page at the section's layout top.
        const place = () => {
          const hashEl = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
          if (!hashEl || !sections.includes(hashEl)) return;
          window.scrollTo({ top: layoutTop(hashEl), behavior: "instant" });
        };
        window.addEventListener("hashchange", place);
        const placeTimers = [60, 400].map((ms) => window.setTimeout(place, ms));
        wrap.addEventListener("load", refresh, true);
        const ro = new ResizeObserver(() => {
          setTops();
          refresh();
        });
        sections.forEach((s) => ro.observe(s));
        window.addEventListener("resize", setTops);
        return () => {
          window.clearTimeout(timer);
          window.removeEventListener("hashchange", place);
          window.removeEventListener("resize", setTops);
          placeTimers.forEach((t) => window.clearTimeout(t));
          wrap.removeEventListener("load", refresh, true);
          ro.disconnect();
          ScrollTrigger.removeEventListener("refreshInit", setTops);
          sections.forEach((el, i) => {
            el.style.top = "";
            el.style.visibility = "";
            const inner = inners[i];
            if (inner) inner.style.willChange = "";
          });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
