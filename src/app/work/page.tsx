import type { Metadata } from "next";
import { Reveal, RevealText } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Kieran Johnson",
  description: "Selected PR, advertising and campaign work by Kieran Johnson.",
};

export default function WorkPage() {
  return (
    <>
      <div className="px-6 pt-36 pb-28 md:px-12 md:pt-48 md:pb-40">
      <RevealText text="Work" className="display text-7xl text-charcoal md:text-9xl" />
      <Reveal delay={0.3}>
        <p className="mt-6 max-w-xl text-lg text-charcoal/70">
          Campaigns, strategies and analyses — a selection of projects from my studies and
          beyond. Each one opens into a full case study.
        </p>
      </Reveal>

      {/* Asymmetric collage grid — sizes/offsets alternate down the page */}
      <div className="mt-20 grid gap-8 md:grid-cols-12">
        {projects.map((project, i) => {
          const layouts = [
            "md:col-span-7",
            "md:col-span-5 md:mt-28",
            "md:col-span-5 md:col-start-2 md:-mt-12",
            "md:col-span-6 md:col-start-7 md:mt-16",
          ];
          return (
            <div key={project.slug} className={layouts[i % layouts.length]}>
              <ProjectCard project={project} aspect="aspect-square" />
            </div>
          );
        })}
        </div>
      </div>
      <CTASection />
    </>
  );
}
