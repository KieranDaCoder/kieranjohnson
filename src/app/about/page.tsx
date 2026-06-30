import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/Reveal";
import { CTASection } from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About — Kieran Johnson",
  description: "About Kieran Johnson — Communications student at RMIT Melbourne.",
};

const skills = [
  "Communication & Stakeholder Relations",
  "Issue & Crisis Management",
  "Qualitative Research & Analysis",
  "Copywriting",
  "Adobe Photoshop",
  "Microsoft Office Suite",
  "AI-Assisted Research & Drafting",
  "POS & Retail Systems",
];

const interests = ["Music", "Hiking", "Football", "Vibe coding"];

export default function AboutPage() {
  return (
    <>
      <div className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <RevealText text="About" className="display text-7xl text-charcoal md:text-9xl" />

      {/* Bio */}
      <section className="mt-20 grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <h2 className="display text-3xl italic text-charcoal">The short version</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/80">
            <p>
              I&apos;m doing a double major in PR and Advertising at RMIT, minoring in Marketing.
              I like the creative side — finding the angle, writing the line, building the
              visual — but I&apos;m just as interested in why something actually works, which is
              probably why I keep ending up on the research and strategy side of group projects
              too.
            </p>
            <p>
              Before uni I spent four years at Macpac, working up to Key Holder and
              person-in-charge. I helped open a new store and ended up informally training a
              team of nine along the way — a lot of that turned out to be the same skill PR
              runs on: explaining things clearly to people, under pressure, without losing them.
            </p>
            <p>
              Right now I&apos;m looking for an internship — somewhere I can run real briefs,
              not just university ones.
            </p>
          </div>
        </Reveal>

        {/* Photo placeholder */}
        <Reveal delay={0.2} className="md:col-span-2">
          <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-charcoal/10 via-accent/5 to-charcoal/5">
            <span className="display text-xl italic text-charcoal/30">Your photo here</span>
          </div>
        </Reveal>
      </section>

      {/* Education */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-charcoal md:text-5xl">Education</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 border-t border-charcoal/10 pt-8">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="text-xl font-medium">Bachelor of Communication</h3>
              <p className="mt-1 text-charcoal/60">
                RMIT University, Melbourne — Double major in Public Relations &amp; Advertising,
                minor in Marketing
              </p>
            </div>
            <span className="text-sm text-charcoal/50">2025 — expected 2027</span>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-charcoal md:text-5xl">Skills</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-charcoal/20 px-5 py-2.5 text-sm text-charcoal/80 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-cream">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-charcoal md:text-5xl">Outside of uni</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {interests.map((interest, i) => (
            <Reveal key={interest} delay={i * 0.06}>
              <span className="inline-block rounded-full border border-charcoal/20 px-5 py-2.5 text-sm text-charcoal/80 transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-cream">
                {interest}
              </span>
            </Reveal>
          ))}
        </div>
      </section>
      </div>
      <CTASection />
    </>
  );
}
