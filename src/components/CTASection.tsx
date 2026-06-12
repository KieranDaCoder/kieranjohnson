"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { RevealText } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";

const EMAIL = "hello@example.com";

// Closing band used on every page: an always-moving marquee strip,
// a staggered two-line headline, and the contact actions.
export function CTASection() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const strip = (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="display mx-6 inline-flex items-center gap-12 text-5xl text-cream/10 md:text-7xl">
          Let&apos;s talk <span className="text-sky/30">✦</span> Open to internships{" "}
          <span className="text-sky/30">✦</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="overflow-hidden bg-navy pb-28 text-cream md:pb-36">
      {/* Perpetual marquee — the section is never standing still */}
      <div className="whitespace-nowrap border-b border-cream/10 py-8">
        <motion.div
          className="inline-block"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <span className="inline-block">{strip}</span>
          <span className="inline-block">{strip}</span>
        </motion.div>
      </div>

      <div className="px-6 pt-20 md:px-12 md:pt-28">
        <h2 className="display text-5xl md:text-7xl">
          <RevealText as="span" text="Let's make something" className="block" />
          <RevealText
            as="span"
            text="people talk about."
            delay={0.15}
            className="block md:pl-[10vw]"
          />
        </h2>

        <motion.div
          className="mt-14 flex flex-wrap items-center gap-5 md:pl-[10vw]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <ArrowLink href="/contact" variant="light">
            Get in touch
          </ArrowLink>
          <button
            onClick={copy}
            className="flex items-center gap-3 rounded-full border border-cream/25 px-6 py-3 text-sm transition-colors duration-300 hover:border-sky hover:bg-sky"
          >
            <span>{copied ? "Copied!" : EMAIL}</span>
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="5" width="9" height="9" rx="1.5" />
              <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
