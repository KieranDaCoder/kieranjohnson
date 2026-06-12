import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, RevealText } from "@/components/Reveal";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return { title: project ? `${project.title} — Kieran Johnson` : "Work" };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.25em] text-sky">
          {project.category} · {project.year}
        </p>
      </Reveal>
      <RevealText
        text={project.title}
        delay={0.15}
        className="display mt-4 text-6xl text-navy md:text-8xl"
      />

      {/* Hero image placeholder — replace with a real campaign visual */}
      <Reveal delay={0.3} className="mt-16">
        <div className="flex aspect-[16/9] items-center justify-center bg-gradient-to-br from-navy/10 via-sky/5 to-navy/5">
          <span className="display text-2xl italic text-navy/30">Campaign visual goes here</span>
        </div>
      </Reveal>

      <div className="mt-20 grid gap-12 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <h2 className="display text-3xl text-navy">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">{project.overview}</p>
        </Reveal>
        <div className="space-y-10">
          <Reveal delay={0.1}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-sky">My role</h3>
            <p className="mt-3 leading-relaxed text-charcoal/80">{project.role}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-sky">Outcome</h3>
            <p className="mt-3 leading-relaxed text-charcoal/80">{project.outcome}</p>
          </Reveal>
        </div>
      </div>

      {/* Next project */}
      <Reveal className="mt-28 border-t border-charcoal/10 pt-12">
        <p className="text-xs uppercase tracking-[0.25em] text-charcoal/50">Next project</p>
        <Link
          href={`/work/${next.slug}`}
          className="display mt-3 inline-block text-4xl text-navy transition-colors hover:text-sky md:text-6xl"
        >
          {next.title} →
        </Link>
      </Reveal>
    </article>
  );
}
