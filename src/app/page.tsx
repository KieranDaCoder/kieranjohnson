import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { contactLinks } from "@/lib/contact";

// Inline highlight badge — the subtle white pill Sidefolio wraps phrases in.
function Hl({ children }: { children: React.ReactNode }) {
  return <span className="hl">{children}</span>;
}

const keyWorks = projects.slice(0, 2);

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------- Located in Melbourne ---------- */}
      <section className="mt-20 flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:text-left">
        <Reveal>
          <img
            src="/profile/kieran.jpg"
            alt="Kieran Johnson"
            className="h-32 w-32 shrink-0 rounded-full object-cover shadow-sm md:h-40 md:w-40"
          />
        </Reveal>
        <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted md:text-lg">
          <Reveal delay={0.1}>
            <p className="display text-sm uppercase tracking-wide text-accent">
              Located in Melbourne
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              I&apos;m a Communications student at <Hl>RMIT Melbourne</Hl>, double majoring in{" "}
              <Hl>PR &amp; Advertising</Hl>. I build campaigns that live at the intersection of
              earned attention and paid persuasion.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p>
              I&apos;m currently looking for an <Hl>internship</Hl> where I can turn strategy into
              work that actually moves people — and I&apos;ve got the case studies to back it up.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Key works ---------- */}
      <section className="mt-24">
        <Reveal>
          <h2 className="display text-lg text-charcoal">Key works</h2>
        </Reveal>
        <div className="mt-10">
          {keyWorks.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
        <Reveal delay={0.1} className="mt-10">
          <Link href="/work" className="link-sweep text-sm font-medium text-sky">
            See all work →
          </Link>
        </Reveal>
      </section>

      {/* ---------- Connect ---------- */}
      <section className="mt-24 border-t border-hairline pt-16 text-center">
        <Reveal>
          <h2 className="display text-2xl text-charcoal md:text-3xl">Let&apos;s talk</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-3 text-base text-muted">
            Open to internships and opportunities in PR &amp; Advertising.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-6 flex justify-center gap-3">
          {contactLinks.map(({ href, label, icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="glass-pill flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-charcoal transition-transform hover:scale-[1.03]"
            >
              <img src={icon} alt="" aria-hidden="true" className="h-4 w-4 [image-rendering:pixelated]" />
              {label}
            </a>
          ))}
        </Reveal>
      </section>
    </>
  );
}
