import Link from "next/link";
import type { Project } from "@/lib/projects";

export function KeyWorkSticker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`mono-label flex -rotate-[8deg] items-center justify-center rounded-full bg-rust text-center text-[9px] leading-tight text-cream ${className}`}
    >
      KEY
      <br />
      WORK
    </span>
  );
}

export function KeyWorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative z-30 flex h-full flex-col rounded-2xl border border-line bg-paper-2 p-4 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber hover:shadow-[0_0_0_2px_var(--color-amber)] focus-visible:-translate-y-1 focus-visible:border-amber focus-visible:shadow-[0_0_0_2px_var(--color-amber)]"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="aspect-square w-full rounded-xl object-cover"
        />
        <KeyWorkSticker className="absolute -right-2 -top-2 h-16 w-16" />
      </div>
      <h3 className="display mt-5 text-[2rem] leading-[1.02] text-ink">{project.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {project.cardOutcome ?? project.description}
      </p>
      <span className="mt-auto pt-5 text-[15px] font-medium text-ink">
        <span className="underline decoration-amber decoration-2 underline-offset-4">
          View case study →
        </span>
      </span>
    </Link>
  );
}
