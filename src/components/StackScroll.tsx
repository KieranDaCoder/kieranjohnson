"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DESKTOP = "(min-width: 768px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";
const SHADOW = "0 -24px 60px rgb(0 0 0 / 0.35)";

// "Folder stack": each section is pinned once its bottom reaches the viewport
// bottom; the next one slides up over it while the one behind recedes.
export function StackScroll({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = root.current;
      if (!wrap) return;
      const mm = gsap.matchMedia();

      mm.add(DESKTOP, () => {
        const sections = gsap.utils.toArray<HTMLElement>(wrap.querySelectorAll(":scope > [data-stack]"));
        const footer = document.querySelector<HTMLElement>("main + footer");
        const layers = footer ? [...sections, footer] : sections;

        layers.forEach((el, i) => {
          gsap.set(el, { position: "relative", zIndex: i + 1, boxShadow: SHADOW });
        });

        sections.forEach((section, i) => {
          const next = layers[i + 1];
          ScrollTrigger.create({
            trigger: section,
            start: "bottom bottom",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
          });
          if (!next) return;

          const inner = section.querySelector<HTMLElement>("[data-stack-inner]");
          const shade = section.querySelector<HTMLElement>("[data-stack-shade]");
          if (!inner || !shade) return;

          // The incoming layer's travel: its top from the viewport bottom up to
          // the top (or as far as it can go if it is shorter than the screen).
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: next,
              start: "top bottom",
              end: () => `top top+=${Math.max(0, window.innerHeight - next.offsetHeight)}`,
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

          // Only the page directly behind should show: once the layer after
          // next starts rising, this one (now two back) fades out.
          const afterNext = layers[i + 2];
          if (afterNext) {
            gsap.to(section, {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power1.out",
              scrollTrigger: {
                trigger: afterNext,
                start: "top bottom",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            });
          }
        });

        // Layout shifts (fonts, images) move pin positions: re-measure.
        let timer = 0;
        const refresh = () => {
          window.clearTimeout(timer);
          timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
        };
        document.fonts?.ready.then(refresh);

        // Landing on /#section: native hash scrolling reads a pinned section's
        // fixed position, so place the page from the section's layout slot.
        const place = () => {
          const hashEl = window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null;
          if (!hashEl || !sections.includes(hashEl)) return;
          const slot = hashEl.parentElement?.classList.contains("pin-spacer") ? hashEl.parentElement : hashEl;
          window.scrollTo({ top: slot.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
        };
        window.addEventListener("hashchange", place);
        const placeTimers = [60, 400].map((ms) => window.setTimeout(place, ms));
        wrap.addEventListener("load", refresh, true);
        const ro = new ResizeObserver(refresh);
        sections.forEach((s) => ro.observe(s));
        return () => {
          window.clearTimeout(timer);
          window.removeEventListener("hashchange", place);
          placeTimers.forEach((t) => window.clearTimeout(t));
          wrap.removeEventListener("load", refresh, true);
          ro.disconnect();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
