import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { getProject, getProjects } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary } : {};
}

function Figure({ src, alt, ratio, priority = false }: { src: string; alt: string; ratio: string; priority?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden bg-line" style={{ aspectRatio: ratio }}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        unoptimized={src.endsWith(".svg")}
        className="object-cover"
      />
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const all = getProjects();
  const index = all.findIndex((p) => p.slug === slug);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <article>
      <PageHeader title={project.title} meta={[project.category, project.year]} />

      <Section tone="white">
        <Figure src={project.hero} alt={project.alt} ratio="16 / 9" priority />

        <div className="gutter py-16 md:py-32">
          <div className="mx-auto max-w-[640px] space-y-16 md:space-y-24">
            {project.sections.map((section, i) => {
              const image = project.images[i];
              return (
                <div key={section.heading} className="space-y-16 md:space-y-24">
                  <section>
                    <h2 className="t-label">{section.heading}</h2>
                    <div className="t-body mt-6 space-y-6">
                      {section.body.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </section>
                  {image && i < project.sections.length - 1 && (
                    <Figure src={image.src} alt={image.alt} ratio="var(--image-ratio)" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <Section tone="white" as="div" className="gutter pb-16 md:pb-32">
        <nav aria-label="Projects" className="grid border-t border-line md:grid-cols-3">
          <Link href={`/work/${prev.slug}`} className="group border-b border-line py-8 md:border-b-0 md:border-r md:pr-8">
            <span className="t-label">Previous project</span>
            <span className="t-title mt-3 block underline decoration-transparent underline-offset-[0.2em] group-hover:decoration-current">
              {prev.title}
            </span>
          </Link>
          <Link href={`/work/${next.slug}`} className="group border-b border-line py-8 md:border-b-0 md:border-r md:px-8">
            <span className="t-label">Next project</span>
            <span className="t-title mt-3 block underline decoration-transparent underline-offset-[0.2em] group-hover:decoration-current">
              {next.title}
            </span>
          </Link>
          <div className="flex items-center py-8 md:justify-end md:pl-8">
            <Link href="/work" className="btn">
              Back to all work
            </Link>
          </div>
        </nav>
      </Section>
    </article>
  );
}
