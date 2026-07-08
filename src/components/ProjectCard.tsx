"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

// Dennis-list-style row: title, category/year, one-line description. No
// thumbnail, no hover-reveals-image — just a text/underline shift on hover.
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3), ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="group block border-b border-hairline py-6 transition-colors first:pt-0"
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="display link-sweep text-2xl text-charcoal md:text-3xl">
            {project.title}
          </h3>
          <span className="shrink-0 text-sm text-muted">{project.year}</span>
        </div>
        <p className="mt-1.5 text-sm font-medium uppercase tracking-wide text-muted">
          {project.category}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{project.description}</p>
      </Link>
    </motion.div>
  );
}
