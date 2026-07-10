import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

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

export default function AboutPage() {
  return (
    <>
      <PageHeader icon="/icons/about.svg" title="About Me" />

      <Reveal delay={0.1} className="mt-10">
        <img
          src="/profile/kieran.jpg"
          alt="Kieran Johnson"
          className="h-56 w-40 rounded-md border border-hairline object-cover shadow-sm"
        />
      </Reveal>

      {/* Bio */}
      <section id="about-me" className="mt-14 max-w-2xl scroll-mt-24 space-y-5 text-base leading-relaxed text-muted md:text-lg">
        <Reveal>
          <p>
            Hey, I&apos;m Kieran, a Communications student at RMIT Melbourne, double majoring in
            Public Relations and Advertising. I&apos;m happiest somewhere between the strategy
            deck and the finished ad.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            I moved to Melbourne on my own a year ago for uni, and most of what I&apos;ve picked
            up outside class has come from just working things out myself. This year that&apos;s
            meant teaching myself to build with AI tools, going from a bit of casual coding to
            actually shipping things, like the Summit Signal dashboard on this site.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p>
            I&apos;m looking for an internship or a permanent role in PR or advertising, somewhere
            I can keep working across both the strategy and the creative side, the way I have on
            the projects in this portfolio.
          </p>
        </Reveal>
      </section>

      {/* Education */}
      <section className="mt-20">
        <Reveal>
          <h2 className="display text-lg text-charcoal">Education</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 border-t border-hairline pt-6">
          <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
            <div>
              <h3 className="font-medium text-charcoal">Bachelor of Communication</h3>
              <p className="mt-1 text-sm text-muted">
                RMIT University, Melbourne — Double major in Public Relations &amp; Advertising,
                minor in Marketing
              </p>
            </div>
            <span className="text-sm text-muted">2025 — present</span>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="mt-16">
        <Reveal>
          <h2 className="display text-lg text-charcoal">Skills</h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {skills.map((skill, i) => (
            <Reveal key={skill} delay={Math.min(i * 0.04, 0.3)}>
              <span className="glass-pill rounded-md px-3 py-1.5 text-sm font-medium text-sky">
                {skill}
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
