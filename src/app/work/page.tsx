import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Kieran Johnson",
  description: "Selected PR, advertising and campaign work by Kieran Johnson.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader emoji="⚡" title="What I've been working on">
        Campaigns, strategies and analyses from my studies and beyond. Each one opens into a
        full case study.
      </PageHeader>

      <div className="mt-12 flex flex-col gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </>
  );
}
