import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectTile } from "@/components/ProjectTile";
import { Section } from "@/components/Section";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Work by Kieran Johnson.",
};

export default function WorkPage() {
  const projects = getProjects();
  const odd = projects.length % 2 === 1;

  return (
    <>
      <PageHeader title="Work" />
      <Section tone="white" className="gutter pb-20 pt-10 md:pb-40 md:pt-14">
        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => {
            // An odd last tile spans the full row, at the same height.
            const wide = odd && i === projects.length - 1;
            return (
              <li key={project.slug} className={wide ? "md:col-span-2" : undefined}>
                <ProjectTile
                  project={project}
                  wide={wide}
                  heading="h2"
                  sizes={wide ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                />
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
