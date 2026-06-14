/* eslint-disable @next/next/no-img-element -- portfolio imagery is pre-optimized */
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

  const NextLink = (
    <Reveal className="mt-28 border-t border-charcoal/10 pt-12">
      <p className="text-xs uppercase tracking-[0.25em] text-charcoal/50">Next project</p>
      <Link
        href={`/work/${next.slug}`}
        className="display mt-3 inline-block text-4xl text-charcoal transition-colors hover:text-accent md:text-6xl"
      >
        {next.title} →
      </Link>
    </Reveal>
  );

  // ---------- Rich gallery layout ----------
  if (project.caseStudy) {
    const cs = project.caseStudy;
    return (
      <article className="bg-[#f5f0e8] px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
        {/* Title block */}
        <header className="mx-auto max-w-6xl">
          <RevealText text={project.title} className="display text-5xl text-charcoal md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="serif-accent mt-5 text-2xl text-charcoal/60 md:text-3xl">
              {cs.discipline} · {project.year}
            </p>
          </Reveal>
        </header>

        {/* Final executions, large, side by side */}
        <Reveal className="mx-auto mt-20 max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {cs.executions.map((ex) => (
              <img
                key={ex.src}
                src={ex.src}
                alt={ex.alt}
                className="w-full rounded-2xl shadow-sm ring-1 ring-charcoal/5"
              />
            ))}
          </div>
        </Reveal>

        {/* Original concept sketches — the real handwritten scamps */}
        <section className="mx-auto mt-32 max-w-5xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Original concept sketches
            </p>
            <p className="mt-3 max-w-2xl text-base text-charcoal/55">
              It started on paper — tattoo clichés paired with the punchline of old age,
              scribbled out one line at a time.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {cs.scamps.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="rounded-2xl border border-charcoal/10 bg-white p-3 shadow-sm">
                  <img
                    src={src}
                    alt={`Handwritten scamp: ${cs.conceptBanners[i]?.headline ?? "copy concept"}`}
                    className="w-full rounded-lg"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Copy-only web banners — refined first executions */}
        <section className="mx-auto mt-32 max-w-4xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Copy-only web banners
            </p>
            <p className="mt-3 max-w-2xl text-base text-charcoal/55">
              The scamps were refined into the first executions: clean, copy-only web banners.
            </p>
          </Reveal>
          <div className="mt-10 space-y-5">
            {cs.conceptBanners.map((b, i) => (
              <Reveal key={b.headline} delay={i * 0.1}>
                <div className="flex items-baseline justify-between gap-6 rounded-2xl border border-charcoal/15 bg-[#fcfaf4] px-8 py-7 md:px-10 md:py-8">
                  <div>
                    <p className="display text-2xl text-charcoal md:text-3xl">{b.headline}</p>
                    <p className="mt-2 text-base text-charcoal/60 md:text-lg">{b.subline}</p>
                  </div>
                  <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-charcoal/35 sm:block">
                    Removery
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Development process — Photoshop sketch-to-final progression */}
        <section className="mx-auto mt-32 max-w-6xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Development process
            </p>
            <p className="mt-3 max-w-2xl text-base text-charcoal/55">
              Each illustration was built in Photoshop through iterative scamping — rough
              placement sketches, to line art, to coloured finals.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <img
              src={cs.developmentImage}
              alt="Photoshop development sheet showing each poster progressing from rough placement sketch to line art to coloured final"
              className="w-full rounded-2xl bg-white p-3 shadow-sm ring-1 ring-charcoal/5"
            />
          </Reveal>
        </section>

        {/* Written case study */}
        <section className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <h2 className="display text-4xl text-charcoal md:text-5xl">{project.title}</h2>
            <p className="serif-accent mt-3 text-xl text-charcoal/60">{cs.discipline}</p>
          </Reveal>
          <div className="mt-10 space-y-6">
            {cs.body.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-10 border-t border-charcoal/15 pt-6 text-sm font-medium uppercase tracking-[0.18em] text-charcoal/70">
              {cs.result}
            </p>
          </Reveal>
        </section>

        <div className="mx-auto max-w-2xl">{NextLink}</div>
      </article>
    );
  }

  // ---------- Simple default layout ----------
  return (
    <article className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <RevealText text={project.title} className="display text-5xl text-charcoal md:text-8xl" />
      <Reveal delay={0.25}>
        <p className="serif-accent mt-5 text-2xl text-charcoal/60 md:text-3xl">
          {project.category} — {project.year}
        </p>
      </Reveal>

      {/* Hero artwork — swap the placeholder in projects.ts for a real campaign visual */}
      <Reveal delay={0.3} className="mt-16">
        <img
          src={project.image}
          alt=""
          className="aspect-[16/9] w-full rounded-[1.75rem] object-cover"
        />
      </Reveal>

      <div className="mt-20 grid gap-12 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <h2 className="display text-3xl text-charcoal">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">{project.overview}</p>
        </Reveal>
        <div className="space-y-10">
          <Reveal delay={0.1}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">My role</h3>
            <p className="mt-3 leading-relaxed text-charcoal/80">{project.role}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="text-xs uppercase tracking-[0.25em] text-accent">Outcome</h3>
            <p className="mt-3 leading-relaxed text-charcoal/80">{project.outcome}</p>
          </Reveal>
        </div>
      </div>

      {NextLink}
    </article>
  );
}
