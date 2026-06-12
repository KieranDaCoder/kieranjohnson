"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Fades + lifts children into view when they scroll into the viewport.
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

// Splits a string into words and staggers each one up from behind a mask.
export function RevealText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: reduce ? 0 : "110%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: delay + i * 0.06,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
