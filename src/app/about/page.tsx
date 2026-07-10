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

const certifications = [
  "Filler Certification — e.g. Google Digital Marketing",
  "Filler Certification — e.g. HubSpot Content Marketing",
  "Filler Certification — e.g. Meta Social Media Marketing",
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
            Filler bio — second paragraph. What you&apos;ve done so far: coursework highlights,
            student clubs, freelance projects, anything that shows initiative.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p>
            Filler bio — third paragraph. What you&apos;re looking for: the internship, the team,
            the kind of campaigns you want to be part of.
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

      {/* Certifications */}
      <section className="mt-16">
        <Reveal>
          <h2 className="display text-lg text-charcoal">Certifications</h2>
        </Reveal>
        <ul className="mt-6 space-y-3">
          {certifications.map((cert, i) => (
            <Reveal key={cert} delay={Math.min(i * 0.08, 0.3)}>
              <li className="border-t border-hairline pt-3 text-sm text-muted">{cert}</li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* A little more — casual, non-professional */}
      <section id="more" className="mt-16 scroll-mt-24">
        <Reveal>
          <h2 className="display text-lg text-charcoal">A little more…</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-6 max-w-2xl space-y-4 border-t border-hairline pt-6 text-base leading-relaxed text-muted">
          <p>
            Filler — outside of coursework: hobbies, the shows you can&apos;t stop watching, the
            hikes you go on, the music taste nobody asked for. Whatever makes you feel like a
            person and not just a résumé.
          </p>
          <p>
            Filler — a fun fact or two. The kind of thing that comes up in an interview and makes
            people remember you.
          </p>
        </Reveal>
      </section>
    </>
  );
}
