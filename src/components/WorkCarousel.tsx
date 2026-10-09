"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectTile } from "@/components/ProjectTile";
import type { Project } from "@/lib/content";

type Tile = Pick<Project, "slug" | "title" | "category" | "year" | "tile" | "alt">;

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Full-bleed strip on native scroll snap. ~2.5 tiles on desktop, ~1.15 on
// phone so the next one peeks. Trackpad and touch swipe work natively.
export function WorkCarousel({ projects }: { projects: Tile[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setEdges({
      start: track.scrollLeft <= 1,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  function step(dir: 1 | -1) {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={update}
        className="snap-track gutter flex gap-4 overflow-x-auto scroll-px-4 md:gap-6 md:scroll-px-12 xl:scroll-px-16"
      >
        {projects.map((project) => (
          <li key={project.slug} className="w-[87%] flex-none snap-start md:w-[40%]">
            <ProjectTile project={project} sizes="(max-width: 768px) 87vw, 40vw" />
          </li>
        ))}
      </ul>

      <div className="gutter mt-10 flex gap-3">
        <button
          type="button"
          className="btn-round"
          aria-label="Previous project"
          onClick={() => step(-1)}
          disabled={edges.start}
        >
          <Arrow flip />
        </button>
        <button
          type="button"
          className="btn-round"
          aria-label="Next project"
          onClick={() => step(1)}
          disabled={edges.end}
        >
          <Arrow />
        </button>
      </div>
    </div>
  );
}
