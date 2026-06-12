"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Link href={`/work/${project.slug}`} className="group block">
        {/* Image placeholder — swap for a real image later */}
        <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy/10 via-sky/5 to-transparent transition-transform duration-700 ease-out group-hover:scale-105"
          >
            <span className="display text-8xl text-navy/10 transition-colors duration-500 group-hover:text-navy/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </motion.div>
          <div className="absolute inset-0 bg-navy opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
          <span className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-cream text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            →
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-sky">{project.category}</p>
            <h3 className="display mt-2 text-3xl text-charcoal transition-colors duration-300 group-hover:text-navy">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal/60">
              {project.description}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-sm text-charcoal/40">{project.year}</span>
        </div>
      </Link>
    </motion.div>
  );
}
