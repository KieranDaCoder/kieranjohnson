"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RevealText } from "@/components/Reveal";
import { ArrowLink } from "@/components/ArrowLink";

const EMAIL = "hello@example.com";

// Closing band used on every page: a warm pulsing "sunrise" glow rising
// behind a big serif invitation.
export function CTASection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="relative overflow-hidden border-t border-sand/60 px-6 py-32 text-center md:px-12 md:py-44">
      {/* Sunrise glow + rays, always gently breathing */}
      <div className="sunrise pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[120%]" />
      <div className="sunrays pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[120%]" />

      <h2 className="display mx-auto max-w-4xl text-5xl text-charcoal md:text-8xl">
        <RevealText as="span" text="Let's make something" className="block" />
        <RevealText as="span" delay={0.15} text="great, together." className="block" />
      </h2>

      <motion.p
        className="mx-auto mt-8 max-w-md text-lg text-charcoal/60"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        Open to internships, freelance briefs and good conversations about campaigns.
      </motion.p>

      <motion.div
        className="mt-12 flex flex-wrap items-center justify-center gap-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <ArrowLink href="/contact">Get in touch</ArrowLink>
        <button
          onClick={copy}
          className="flex items-center gap-3 rounded-full border border-charcoal/20 bg-cream/60 px-6 py-3 text-sm text-charcoal backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <span>{copied ? "Copied!" : EMAIL}</span>
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="5" y="5" width="9" height="9" rx="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
