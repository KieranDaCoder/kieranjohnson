"use client";

import Link from "next/link";
/* eslint-disable @next/next/no-img-element -- placeholder SVGs don't need optimization */
import { TiltCard } from "@/components/TiltCard";
import type { Project } from "@/lib/projects";

// Noteworthy-style case card: full-bleed artwork in a squircle, title and
// category overlaid on a gradient scrim, 3D tilt + shimmer from TiltCard.
// When the project provides `thumbnailImages`, the artwork becomes a row
// (e.g. a triptych) on a cream backdrop instead of a single cover image.
export function ProjectCard({
  project,
  aspect = "aspect-square",
}: {
  project: Project;
  aspect?: string;
}) {
  return (
    <TiltCard className={aspect}>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="view"
        className="absolute inset-0 block overflow-hidden rounded-[1.75rem]"
      >
        {project.thumbnailImages ? (
          <div className="absolute inset-0 flex gap-1.5 bg-[#f5f0e8] p-1.5">
            {project.thumbnailImages.map((src, i) => (
              <div key={i} className="relative flex-1 overflow-hidden">
                <img
                  src={src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <img
            src={project.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/0 to-black/45" />
        <div className="absolute inset-0 flex flex-col justify-between p-7 text-cream md:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-cream/15 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] backdrop-blur-sm">
              {project.category}
            </span>
            <span className="text-sm text-cream/70">{project.year}</span>
          </div>
          <div>
            <h3 className="display text-3xl md:text-4xl">{project.title}</h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/80 opacity-0 transition-all duration-500 group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
