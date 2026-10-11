"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  enableBlur?: boolean;
  start?: string;
  end?: string;
};

// Adapted from React Bits ScrollReveal. The text is fully visible in the server
// markup; the hidden start state is set in the effect, so no-JS and reduced
// motion both see plain text. Only this component's own triggers are cleaned up.
export function ScrollReveal({
  children,
  as = "h2",
  className = "",
  baseOpacity = 0.15,
  baseRotation = 3,
  blurStrength = 6,
  enableBlur = true,
  start = "top bottom-=10%",
  end = "top 35%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const words = el.querySelectorAll<HTMLElement>("[data-word]");
      const trigger = { trigger: el, start, end, scrub: true };

      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        { rotate: 0, ease: "none", scrollTrigger: trigger },
      );
      gsap.fromTo(
        words,
        { opacity: baseOpacity, ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}) },
        {
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          ease: "none",
          stagger: 0.05,
          scrollTrigger: trigger,
        },
      );
    },
    { scope: ref, dependencies: [baseOpacity, baseRotation, blurStrength, enableBlur, start, end] },
  );

  const Tag = as as "div";
  const parts = children.split(/(\s+)/);
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {parts.map((part, i) =>
        part === "" || /^\s+$/.test(part) ? (
          part
        ) : (
          <span key={i} data-word className="inline-block">
            {part}
          </span>
        ),
      )}
    </Tag>
  );
}
