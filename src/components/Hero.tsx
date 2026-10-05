"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import { HeroBadge } from "@/components/HeroBadge";

const ease = [0.21, 0.47, 0.32, 0.98] as const;
const focus = ["Advertising", "Public Relations", "Marketing"];

// Poster-style hero: navy ground, huge Anton name, draggable 3D badge on the right.
// The nav watches [data-hero] to flip its theme once this section scrolls away.
export function Hero() {
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const promptOpacity = useTransform(scrollY, [0, 160], [1, 0]);

  const line = (text: string, delay: number) => (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease }}
      >
        {text}
      </motion.span>
    </span>
  );

  return (
    <section
      data-hero
      className="grain relative h-svh min-h-[600px] w-full overflow-hidden border-b-[6px] border-sky bg-hero text-white"
    >
      {/* Edge-roughening filter: gives the name a printed, slightly worn edge. */}
      <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
        <filter id="hero-rough" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <HeroBadge />

      <div className="pointer-events-none relative z-[2] flex h-full flex-col justify-end px-6 pb-8 pt-24 md:px-10 md:pb-10 md:pt-28">
        <div>
          <h1
            className="hero-name hero-name-size pointer-events-auto w-fit"
            style={{ filter: "url(#hero-rough)" }}
          >
            {line("Kieran", 0.1)}
            {line("Johnson", 0.2)}
          </h1>

          <motion.ul
            className="pointer-events-auto mt-5 flex w-fit flex-col items-start gap-y-1 text-[clamp(1.35rem,3.1vw,2.9rem)] font-light leading-tight md:mt-6 md:flex-row md:items-center md:gap-x-6"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          >
            {focus.map((item, i) => (
              <li key={item} className="flex items-center gap-6">
                {i > 0 && <span aria-hidden="true" className="hidden h-[0.4em] w-[0.4em] rounded-full bg-sky md:block" />}
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <motion.a
        href="#content"
        aria-label="Scroll to content"
        style={{ opacity: promptOpacity }}
        className="caption absolute bottom-8 right-6 z-[3] flex items-center gap-3 text-white md:bottom-10 md:right-10"
      >
        Scroll
        <svg aria-hidden="true" viewBox="0 0 24 24" className="nudge h-5 w-5 text-sky" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v16M6 14l6 6 6-6" />
        </svg>
      </motion.a>
    </section>
  );
}
