/* eslint-disable @next/next/no-img-element -- portfolio imagery is pre-optimized */
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal, RevealText } from "@/components/Reveal";
import { projects, getProject } from "@/lib/projects";
import type { ThemeIcon } from "@/lib/projects";

// Inline SVGs for the research findings grid — keeps the page dependency-free
// (the site has no icon library) and inherits the accent colour via currentColor.
function ThemeGlyph({ name }: { name: ThemeIcon }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "coolness": // shield — the social "cost" of standing out
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        </svg>
      );
    case "credibility": // speech bubble, struck through — a message that doesn't land
      return (
        <svg {...common} aria-hidden>
          <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.8-5.8A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M6 6l12 12" />
        </svg>
      );
    case "identity": // overlapping circles — self and group fused
      return (
        <svg {...common} aria-hidden>
          <circle cx="9" cy="12" r="6" />
          <circle cx="15" cy="12" r="6" />
        </svg>
      );
    case "gatekeeping": // hourglass — oversight running out at the wrong moment
      return (
        <svg {...common} aria-hidden>
          <path d="M6 3h12M6 21h12" />
          <path d="M7 3c0 4 4 5 5 9-1 4-5 5-5 9M17 3c0 4-4 5-5 9 1 4 5 5 5 9" />
        </svg>
      );
  }
}

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

  // ---------- Analysis / strategy layout ----------
  if (project.caseStudy?.kind === "analysis") {
    const cs = project.caseStudy;
    return (
      <article className="bg-[#f5f0e8] px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
        {/* Title + discipline */}
        <header className="mx-auto max-w-4xl">
          <RevealText text={project.title} className="display text-5xl text-charcoal md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="serif-accent mt-5 text-2xl text-charcoal/60 md:text-3xl">
              {cs.discipline} · {project.year}
            </p>
          </Reveal>
        </header>

        {/* Opening pullquote */}
        <Reveal className="mx-auto mt-24 max-w-5xl md:mt-32">
          <blockquote className="display text-3xl leading-tight text-charcoal md:text-6xl md:leading-[1.05]">
            <span className="text-accent">“</span>
            {cs.pullquote}
            <span className="text-accent">”</span>
          </blockquote>
        </Reveal>

        {/* Labelled prose sections */}
        <div className="mx-auto mt-28 max-w-2xl space-y-20 md:mt-36">
          {cs.sections.map((section) => (
            <section key={section.heading}>
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  {section.heading}
                </p>
              </Reveal>
              <div className="mt-6 space-y-6">
                {section.body.map((para, i) => (
                  <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                    <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Result */}
        <section className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <p className="border-t border-charcoal/15 pt-6 text-sm font-medium uppercase tracking-[0.18em] text-charcoal/70">
              {cs.result}
            </p>
          </Reveal>
        </section>

        <div className="mx-auto max-w-2xl">{NextLink}</div>
      </article>
    );
  }

  // ---------- Consumer-research layout ----------
  if (project.caseStudy?.kind === "research") {
    const cs = project.caseStudy;
    return (
      <article className="bg-[#f5f0e8] px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
        {/* Title + discipline */}
        <header className="mx-auto max-w-4xl">
          <RevealText text={project.title} className="display text-5xl text-charcoal md:text-8xl" />
          <Reveal delay={0.2}>
            <p className="serif-accent mt-5 text-2xl text-charcoal/60 md:text-3xl">
              {cs.discipline} · {project.year}
            </p>
          </Reveal>
        </header>

        {/* Lead prose — The Brief, My Role */}
        <div className="mx-auto mt-24 max-w-2xl space-y-20 md:mt-32">
          {cs.intro.map((section) => (
            <section key={section.heading}>
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                  {section.heading}
                </p>
              </Reveal>
              <div className="mt-6 space-y-6">
                {section.body.map((para, i) => (
                  <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                    <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* What we found — four-theme grid (2x2 desktop, stacked mobile) */}
        <section className="mx-auto mt-28 max-w-5xl md:mt-36">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {cs.themesHeading}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {cs.themes.map((theme, i) => (
              <Reveal key={theme.title} delay={Math.min(i * 0.08, 0.24)}>
                <div className="h-full rounded-2xl border border-charcoal/12 bg-[#fcfaf4] p-7 md:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <ThemeGlyph name={theme.icon} />
                  </span>
                  <h3 className="display mt-5 text-xl text-charcoal md:text-2xl">{theme.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                    {theme.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* From insight to campaign strategy — prose, recommendations, mockup */}
        <section className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {cs.strategyHeading}
            </p>
          </Reveal>
          <div className="mt-6 space-y-6">
            {cs.strategyIntro.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
              </Reveal>
            ))}
          </div>
          <ol className="mt-8 space-y-5">
            {cs.recommendations.map((rec, i) => (
              <Reveal key={rec.title} delay={Math.min(i * 0.08, 0.24)}>
                <li className="flex gap-4">
                  <span className="display mt-0.5 text-2xl leading-none text-accent">{i + 1}</span>
                  <p className="text-lg leading-relaxed text-charcoal/80">
                    <span className="font-semibold text-charcoal">{rec.title}</span> {rec.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Phone-frame concept mockup — illustrative only, no real platform marks */}
        <Reveal className="mx-auto mt-16 max-w-2xl">
          <figure className="flex flex-col items-center">
            <div className="w-full max-w-[20rem] rounded-[2.25rem] border-[6px] border-charcoal/85 bg-white p-3 shadow-xl">
              <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-charcoal/15" />
              <div className="flex items-center gap-3 px-1">
                <span className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-accent to-amber" />
                <span className="text-sm font-semibold text-charcoal">{cs.mockup.username}</span>
              </div>
              <div className="mt-3 flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-peach to-sand text-5xl">
                🛴
              </div>
              <div className="mt-3 flex items-center gap-4 px-1 text-charcoal/70">
                {/* generic engagement glyphs — no platform-specific logos */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
                </svg>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.8-5.8A8.5 8.5 0 1 1 21 11.5z" />
                </svg>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d="M4 12l16-7-7 16-2.5-6.5L4 12z" />
                </svg>
              </div>
              <p className="mt-2 px-1 text-xs font-semibold text-charcoal">
                {cs.mockup.likes} likes
              </p>
              <p className="mt-1 px-1 text-sm leading-snug text-charcoal/80">
                <span className="font-semibold text-charcoal">{cs.mockup.username}</span>{" "}
                {cs.mockup.caption}
              </p>
              <p className="mt-1 px-1 text-xs text-charcoal/45">
                View all {cs.mockup.comments} comments
              </p>
            </div>
            <figcaption className="mt-4 text-sm italic text-charcoal/50">
              Concept mockup, not an actual published post.
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto mt-10 max-w-2xl space-y-6">
          {cs.strategyOutro.map((para, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
              <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
            </Reveal>
          ))}
        </div>

        {/* Outcome — prose, certificate, pull-quote */}
        <section className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {cs.outcomeHeading}
            </p>
          </Reveal>
          <div className="mt-6 space-y-6">
            {cs.outcome.map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
                <p className="text-lg leading-relaxed text-charcoal/80">{para}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Certificate — framed document, modest width, not full-bleed */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <figure className="rounded-2xl border border-charcoal/12 bg-white p-3 shadow-sm md:p-4">
            <img src={cs.certificate.src} alt={cs.certificate.alt} className="w-full rounded-lg" />
          </figure>
        </Reveal>

        {/* Pull-quote */}
        <Reveal className="mx-auto mt-20 max-w-3xl">
          <blockquote className="border-l-2 border-accent pl-6 md:pl-8">
            <p className="display text-2xl leading-snug text-charcoal md:text-4xl">
              <span className="text-accent">“</span>
              {cs.pullquote.quote}
              <span className="text-accent">”</span>
            </p>
            <footer className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-charcoal/55">
              — {cs.pullquote.attribution}
            </footer>
          </blockquote>
        </Reveal>

        {/* What I took from it */}
        <section className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              {cs.takeawayHeading}
            </p>
          </Reveal>
          <div className="mt-6 space-y-6">
            {cs.takeaway.map((para, i) => (
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
              Each illustration was built in Photoshop through iterative scamping. Left to
              right: rough placement sketch, line art, coloured final, and the working file.
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {cs.developmentRows.map((row, i) => (
              <Reveal key={row.src} delay={i * 0.1}>
                <figure className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-charcoal/5">
                  <img
                    src={row.src}
                    alt={`Development progression for the '${row.label}' execution: rough sketch, line art, coloured final, and Photoshop working file`}
                    className="w-full rounded-lg"
                  />
                  <figcaption className="px-2 pb-1 pt-3 text-xs uppercase tracking-[0.2em] text-charcoal/45">
                    {row.label}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
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
