"use client";

import { motion, useReducedMotion } from "framer-motion";

// Infinite horizontal ticker — editorial filler strip between sections.
export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const row = (
    <>
      {items.map((item, i) => (
        <span key={i} className="display mx-8 inline-flex items-center gap-8 text-4xl text-navy/20 md:text-6xl">
          {item}
          <span className="text-sky/40">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-charcoal/10 py-6">
      <motion.div
        className="inline-block"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <span className="inline-block">{row}</span>
        <span className="inline-block">{row}</span>
      </motion.div>
    </div>
  );
}
