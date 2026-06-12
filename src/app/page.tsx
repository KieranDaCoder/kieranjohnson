"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal, RevealText } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

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
            className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-sky/15 blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-navy/10 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="mb-6 text-sm uppercase tracking-[0.3em] text-sky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            PR · Advertising · Melbourne
          </motion.p>

          <RevealText
            text="Kieran Johnson"
            className="display text-[16vw] leading-[0.9] text-navy md:text-[11vw]"
          />

          <RevealText
            as="h2"
            text="Stories that move people. Campaigns that move markets."
            delay={0.5}
            className="display mt-8 max-w-3xl text-3xl italic text-charcoal/80 md:text-5xl"
          />

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link
              href="/work"
              className="group relative overflow-hidden rounded-full bg-navy px-8 py-4 text-sm uppercase tracking-wide text-cream transition-colors duration-300 hover:bg-sky"
            >
              <span className="relative z-10">View the work</span>
            </Link>
            <Link href="/about" className="link-sweep text-sm uppercase tracking-wide text-charcoal/70 hover:text-sky">
              About me
            </Link>
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

      {/* ---------- Ticker ---------- */}
      <Marquee items={["Public Relations", "Advertising", "Brand Strategy", "Campaign Analysis"]} />

      {/* ---------- Intro statement ---------- */}
      <section className="px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <p className="max-w-4xl text-2xl leading-snug text-charcoal/80 md:text-4xl">
            I&apos;m a Communications student at{" "}
            <span className="display italic text-navy">RMIT Melbourne</span>, double majoring in
            PR and Advertising. I build campaigns at the intersection of{" "}
            <span className="display italic text-navy">earned attention</span> and{" "}
            <span className="display italic text-navy">paid persuasion</span> — and I&apos;m
            looking for an internship where I can prove it.
          </p>
        </Reveal>
      </section>

      {/* ---------- Featured work ---------- */}
      <section className="px-6 pb-28 md:px-12 md:pb-40">
        <Reveal className="mb-16 flex items-end justify-between">
          <h2 className="display text-5xl text-navy md:text-7xl">Selected Work</h2>
          <Link href="/work" className="link-sweep hidden text-sm uppercase tracking-wide text-charcoal/70 hover:text-sky md:block">
            All projects →
          </Link>
        </Reveal>

        <div className="grid gap-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24">
          {projects.slice(0, 2).map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Reveal className="mt-16 md:hidden">
          <Link href="/work" className="link-sweep text-sm uppercase tracking-wide text-charcoal/70">
            All projects →
          </Link>
        </Reveal>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-navy px-6 py-28 text-cream md:px-12 md:py-40">
        <RevealText
          as="h2"
          text="Let's make something people talk about."
          className="display max-w-4xl text-5xl md:text-7xl"
        />
        <Reveal delay={0.4}>
          <Link
            href="/contact"
            className="mt-12 inline-block rounded-full border border-cream/40 px-8 py-4 text-sm uppercase tracking-wide transition-all duration-300 hover:border-sky hover:bg-sky"
          >
            Get in touch
          </Link>
        </Reveal>
      </section>
    </>
  );
}
