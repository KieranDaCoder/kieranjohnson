import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — Kieran Johnson",
  description: "About Kieran Johnson — Communications student at RMIT Melbourne.",
};

const skills = [
  "Media Relations",
  "Campaign Strategy",
  "Copywriting",
  "Brand Positioning",
  "Social Media Strategy",
  "Audience Research",
  "Press Releases",
  "Content Planning",
  "Adobe Creative Suite",
  "Canva",
];

const certifications = [
  "Placeholder Certification — e.g. Google Digital Marketing",
  "Placeholder Certification — e.g. HubSpot Content Marketing",
  "Placeholder Certification — e.g. Meta Social Media Marketing",
];

export default function AboutPage() {
  return (
    <div className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <RevealText text="About" className="display text-7xl text-navy md:text-9xl" />

      {/* Bio */}
      <section className="mt-20 grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <h2 className="display text-3xl italic text-navy">The short version</h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-charcoal/80">
            <p>
              Placeholder bio — first paragraph. Who you are, what drives you, and the kind of
              work you want to do. Write it the way you&apos;d say it out loud.
            </p>
            <p>
              Placeholder bio — second paragraph. What you&apos;ve done so far: coursework
              highlights, student clubs, freelance projects, anything that shows initiative.
            </p>
            <p>
              Placeholder bio — third paragraph. What you&apos;re looking for: the internship,
              the team, the kind of campaigns you want to be part of.
            </p>
          </div>
        </Reveal>

        {/* Photo placeholder */}
        <Reveal delay={0.2} className="md:col-span-2">
          <div className="flex aspect-[3/4] items-center justify-center bg-gradient-to-br from-navy/10 via-sky/5 to-navy/5">
            <span className="display text-xl italic text-navy/30">Your photo here</span>
          </div>
        </Reveal>
      </section>

      {/* Education */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-navy md:text-5xl">Education</h2>
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
            <span className="text-sm text-charcoal/50">2025 — present</span>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-navy md:text-5xl">Skills</h2>
        </Reveal>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={i * 0.04}>
              <span className="inline-block rounded-full border border-navy/20 px-5 py-2.5 text-sm text-charcoal/80 transition-colors duration-300 hover:border-sky hover:bg-sky hover:text-cream">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-28">
        <Reveal>
          <h2 className="display text-4xl text-navy md:text-5xl">Certifications</h2>
        </Reveal>
        <ul className="mt-8 space-y-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert} delay={i * 0.08}>
              <li className="border-t border-charcoal/10 pt-4 text-lg text-charcoal/80">
                {cert}
              </li>
            </Reveal>
          ))}
        </ul>
      </section>
    </div>
  );
}
