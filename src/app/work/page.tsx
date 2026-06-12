import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Kieran Johnson",
  description: "Selected PR, advertising and campaign work by Kieran Johnson.",
};

export default function WorkPage() {
  return (
    <div className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <RevealText text="Work" className="display text-7xl text-navy md:text-9xl" />
      <Reveal delay={0.3}>
        <p className="mt-6 max-w-xl text-lg text-charcoal/70">
          Campaigns, strategies and analyses — a selection of projects from my studies and
          beyond. Each one opens into a full case study.
        </p>
      </Reveal>

      <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-x-12 md:gap-y-24">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
