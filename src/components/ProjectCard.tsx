"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

// Numbered block row: hard navy rule on top, fills navy on hover.
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
        className="group block border-t-2 border-ink px-1 py-7 transition-colors hover:bg-ink hover:text-white md:px-5"
      >
        <div className="flex items-baseline gap-5">
          <span className="caption text-ink-muted transition-colors group-hover:text-amber">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="display flex-1 text-2xl md:text-4xl">{project.title}</h3>
          <span className="shrink-0 text-sm text-ink-muted transition-colors group-hover:text-amber">{project.year}</span>
        </div>
        <p className="caption mt-3 text-ink-muted transition-colors group-hover:text-amber md:pl-10">{project.category}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted transition-colors group-hover:text-white/80 md:pl-10">
          {project.description}
        </p>
      </Link>
    </motion.div>
  );
}
