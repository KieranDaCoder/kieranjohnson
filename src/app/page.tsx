import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

// Inline highlight badge — the subtle white pill Sidefolio wraps phrases in.
function Hl({ children }: { children: React.ReactNode }) {
  return <span className="hl">{children}</span>;
}

const toolkit = [
  "Campaign Strategy",
  "Copywriting",
  "Media Relations",
  "Brand Positioning",
  "Audience Research",
  "Adobe Creative Suite",
  "Canva",
  "Social Strategy",
];

export default function Home() {
  return (
    <>
      <PageHeader emoji="👋" title="Hi, I'm Kieran" />

      <div className="mt-6 max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
        <Reveal delay={0.1}>
          <p>
            I&apos;m a Communications student at <Hl>RMIT Melbourne</Hl>, double majoring in{" "}
            <Hl>PR &amp; Advertising</Hl>. I build campaigns that live at the intersection of
            earned attention and paid persuasion.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p>
            I&apos;m currently looking for an <Hl>internship</Hl> where I can turn strategy into
            work that actually moves people — and I&apos;ve got the case studies to back it up.
          </p>
        </Reveal>
      </div>

      {/* ---------- Selected work ---------- */}
      <section className="mt-20">
        <Reveal>
          <h2 className="display text-lg text-charcoal">What I&apos;ve been working on</h2>
        </Reveal>
        <div className="mt-8 flex flex-col gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ---------- Toolkit (adapted from Sidefolio's "Tech Stack") ---------- */}
      <section className="mt-20">
        <Reveal>
          <h2 className="display text-lg text-charcoal">Toolkit</h2>
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {toolkit.map((tool, i) => (
            <Reveal key={tool} delay={Math.min(i * 0.04, 0.3)}>
              <span className="rounded-md bg-surface px-3 py-1.5 text-sm text-muted shadow-sm">
                {tool}
              </span>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
