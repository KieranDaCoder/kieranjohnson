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

function BackLink() {
  return (
    <Link
      href="/work"
      className="link-sweep inline-block text-sm text-muted transition-colors hover:text-charcoal"
    >
      ← Work
    </Link>
  );
}

const LABEL = "text-xs font-medium uppercase tracking-[0.25em] text-muted";

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  const NextLink = (
    <Reveal className="mt-24 border-t border-hairline pt-10">
      <p className={LABEL}>Next project</p>
      <Link
        href={`/work/${next.slug}`}
        className="display mt-3 inline-block text-3xl text-charcoal transition-colors hover:text-muted md:text-4xl"
      >
        {next.title} →
      </Link>
    </Reveal>
  );

  const Header = (
    <header>
      <BackLink />
      <RevealText
        text={project.title}
        delay={0.05}
        className="display mt-6 text-4xl text-charcoal md:text-5xl"
      />
      <Reveal delay={0.2}>
        <p className="serif-accent mt-3 text-lg text-muted">
          {project.caseStudy?.discipline ?? project.category} · {project.year}
        </p>
      </Reveal>
    </header>
  );

  // ---------- Analysis / strategy layout ----------
  if (project.caseStudy?.kind === "analysis") {
    const cs = project.caseStudy;
    return (
      <article>
        {Header}

        <Reveal className="mt-16">
          <blockquote className="display text-2xl leading-tight text-charcoal md:text-4xl md:leading-[1.1]">
            <span className="text-muted">“</span>
            {cs.pullquote}
            <span className="text-muted">”</span>
          </blockquote>
        </Reveal>

        <div className="mt-16 max-w-2xl space-y-14">
          {cs.sections.map((section) => (
            <section key={section.heading}>
              <Reveal>
                <p className={LABEL}>{section.heading}</p>
              </Reveal>
              <div className="mt-4 space-y-5">
                {section.body.map((para, i) => (
                  <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                    <p className="text-base leading-relaxed text-muted md:text-lg">{para}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Reveal className="mt-16 max-w-2xl">
          <p className="border-t border-hairline pt-5 text-sm font-medium text-charcoal">
            {cs.result}
          </p>
        </Reveal>

        {NextLink}
      </article>
    );
  }

  // ---------- Rich gallery layout ----------
  if (project.caseStudy) {
    const cs = project.caseStudy;
    return (
      <article>
        {Header}

        {/* Final executions */}
        <Reveal className="mt-14">
          <div className="grid gap-4 sm:grid-cols-3">
            {cs.executions.map((ex) => (
              <img
                key={ex.src}
                src={ex.src}
                alt={ex.alt}
                className="w-full rounded-xl border border-hairline shadow-sm"
              />
            ))}
          </div>
        </Reveal>

        {/* Original concept sketches */}
        <section className="mt-20">
          <Reveal>
            <p className={LABEL}>Original concept sketches</p>
            <p className="mt-3 max-w-xl text-sm text-muted">
              It started on paper: tattoo clichés paired with the punchline of old age,
              scribbled out one line at a time.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {cs.scamps.map((src, i) => (
              <Reveal key={src} delay={i * 0.1}>
                <div className="rounded-xl border border-hairline bg-surface p-3 shadow-sm">
                  <img
                    src={src}
                    alt={`Handwritten scamp: ${cs.conceptBanners[i]?.headline ?? "copy concept"}`}
                    className="w-full rounded-md"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Copy-only web banners */}
        <section className="mt-20">
          <Reveal>
            <p className={LABEL}>Copy-only web banners</p>
            <p className="mt-3 max-w-xl text-sm text-muted">
              The scamps were refined into the first executions: clean, copy-only web banners.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {cs.conceptBanners.map((b, i) => (
              <Reveal key={b.headline} delay={i * 0.1}>
                <div className="flex items-baseline justify-between gap-6 rounded-xl border border-hairline bg-surface px-6 py-5 shadow-sm">
                  <div>
                    <p className="display text-xl text-charcoal md:text-2xl">{b.headline}</p>
                    <p className="mt-1.5 text-sm text-muted md:text-base">{b.subline}</p>
                  </div>
                  <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
                    Removery
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Development process */}
        <section className="mt-20">
          <Reveal>
            <p className={LABEL}>Development process</p>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Each illustration was built in Photoshop through iterative scamping. Left to right:
              rough placement sketch, line art, coloured final, and the working file.
            </p>
          </Reveal>
          <div className="mt-8 space-y-6">
            {cs.developmentRows.map((row, i) => (
              <Reveal key={row.src} delay={i * 0.1}>
                <figure className="rounded-xl border border-hairline bg-surface p-3 shadow-sm">
                  <img
                    src={row.src}
                    alt={`Development progression for the '${row.label}' execution: rough sketch, line art, coloured final, and Photoshop working file`}
                    className="w-full rounded-md"
                  />
                  <figcaption className="px-1 pb-1 pt-3 text-xs uppercase tracking-[0.2em] text-muted">
                    {row.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Written case study */}
        <section className="mt-20 max-w-2xl">
          <Reveal>
            <h2 className="display text-2xl text-charcoal md:text-3xl">{project.title}</h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {cs.body.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <p className="text-base leading-relaxed text-muted md:text-lg">{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-8 border-t border-hairline pt-5 text-sm font-medium text-charcoal">
              {cs.result}
            </p>
          </Reveal>
        </section>

        {NextLink}
      </article>
    );
  }

  // ---------- Simple default layout ----------
  return (
    <article>
      {Header}

      <Reveal delay={0.2} className="mt-12">
        <img
          src={project.image}
          alt=""
          className="aspect-[16/9] w-full rounded-xl border border-hairline object-cover"
        />
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <Reveal className="md:col-span-2">
          <h2 className="display text-xl text-charcoal">Overview</h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            {project.overview}
          </p>
        </Reveal>
        <div className="space-y-8">
          <Reveal delay={0.1}>
            <h3 className={LABEL}>My role</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.role}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className={LABEL}>Outcome</h3>
            <p className="mt-3 leading-relaxed text-muted">{project.outcome}</p>
          </Reveal>
        </div>
      </div>

      {NextLink}
    </article>
  );
}
