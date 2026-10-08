"use client";

import { useRef, useState } from "react";
import { ProjectTile } from "@/components/ProjectTile";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };

export function WorkCarousel({ projects }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atEnd, setAtEnd] = useState(false);
  const reduce = useReducedMotionSafe();

  const sorted = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  function handleNext() {
    const track = trackRef.current;
    if (!track) return;
    const tileWidth = track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth;
    track.scrollBy({ left: tileWidth, behavior: reduce ? "auto" : "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 1);
  }

  return (
    <div className="relative w-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory", scrollBehavior: reduce ? "auto" : "smooth" }}
      >
        {sorted.map((project, i) => (
          <div
            key={project.slug}
            className="w-[85vw] flex-none md:w-[30vw]"
            style={{
              scrollSnapAlign: "start",
              borderRight: i < sorted.length - 1 ? "1px solid #fff" : undefined,
            }}
          >
            <ProjectTile project={project} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Next project"
        onClick={handleNext}
        disabled={atEnd}
        className="absolute right-4 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-opacity disabled:opacity-30"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
