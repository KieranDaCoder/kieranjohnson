"use client";

import Link from "next/link";
/* eslint-disable @next/next/no-img-element -- portfolio imagery is pre-optimized */
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

// Sidefolio-style horizontal case card: thumbnail on the left, title +
// description + tags on the right. The whole row links to the case study.
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const thumb = project.thumbnailImages?.[0] ?? project.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3), ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group flex flex-col gap-5 rounded-2xl p-2 transition-colors hover:bg-black/[0.03] md:flex-row"
      >
        <div className="w-full shrink-0 overflow-hidden rounded-xl border border-hairline bg-surface md:w-52">
          <img
            src={thumb}
            alt={project.title}
            className="h-40 w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] md:h-full"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="display text-xl text-charcoal">{project.title}</h3>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>{project.category}</Tag>
            <Tag>{project.year}</Tag>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm bg-surface px-2 py-1 text-xs text-muted shadow-sm">
      {children}
    </span>
  );
}
