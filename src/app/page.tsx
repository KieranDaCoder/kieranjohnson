"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealText } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { ArrowLink } from "@/components/ArrowLink";
import { CTASection } from "@/components/CTASection";
import { projects } from "@/lib/projects";

// Serif-italic accent word inside a sans sentence — the typographic signature.
function Em({ children }: { children: React.ReactNode }) {
  return <em className="serif-accent text-accent">{children}</em>;
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Parallax: hero text drifts up slower than the scroll, orbs drift down.
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12"
      >
        {/* Slow-breathing background orbs */}
        <motion.div style={{ y: orbY }} className="absolute inset-0 -z-10">
          <motion.div
            className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-peach/70 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-amber/30 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="mb-6 text-sm uppercase tracking-[0.3em] text-accent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PR · Advertising · Melbourne
          </motion.p>

          {/* Staggered headline lines — second line steps in for separation */}
          <h1 className="display text-[17vw] leading-[0.92] text-charcoal md:text-[11vw]">
            <RevealText as="span" text="Kieran" className="block" />
            <RevealText as="span" text="Johnson" delay={0.12} className="block md:pl-[12vw]" />
          </h1>

          <motion.h2
            className="mt-8 max-w-3xl text-2xl font-semibold leading-snug text-charcoal md:text-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            I study comms at RMIT. Here&apos;s what I&apos;ve been{" "}
            <Em>making</Em>.
          </motion.h2>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <ArrowLink href="/work">Explore the work</ArrowLink>
            <ArrowLink href="/about" variant="outline">
              About me
            </ArrowLink>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ opacity: fade }}
        >
          <span className="block h-12 w-px bg-charcoal/30" />
        </motion.div>
      </section>

      {/* ---------- Intro statement ---------- */}
      <section className="px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <p className="max-w-4xl text-2xl font-semibold leading-snug text-charcoal md:text-4xl">
            I&apos;m doing a double major in PR and Advertising at{" "}
            <Em>RMIT Melbourne</Em>. Most of what I make sits somewhere between{" "}
            <Em>strategy</Em> and <Em>creative</Em> — I like the part where those two
            overlap. Currently looking for an internship.
          </p>
        </Reveal>
      </section>

      {/* ---------- Featured work: asymmetric collage ---------- */}
      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <Reveal className="mb-16 flex items-end justify-between">
          <h2 className="display text-5xl text-charcoal md:text-7xl">Selected Work</h2>
          <Link
            href="/work"
            className="link-sweep hidden text-sm uppercase tracking-wide text-charcoal/70 hover:text-accent md:block"
          >
            All projects →
          </Link>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-12">
          {/* One large feature card, two smaller offset cards */}
          <div className="md:col-span-7">
            <ProjectCard project={projects[0]} aspect="aspect-square" />
          </div>
          <div className="md:col-span-5 md:mt-24">
            <ProjectCard project={projects[1]} aspect="aspect-square" />
          </div>
          <div className="md:col-span-5 md:col-start-2 md:-mt-10">
            <ProjectCard project={projects[2]} aspect="aspect-square" />
          </div>
        </div>

        <Reveal className="mt-16 md:hidden">
          <ArrowLink href="/work" variant="outline">
            All projects
          </ArrowLink>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <CTASection />
    </>
  );
}
