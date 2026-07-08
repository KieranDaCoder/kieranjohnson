"use client";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";

// skiper60-style: each project is a scroll section; a sticky right-hand nav
// highlights whichever project is currently in view. Right side keeps it clear
// of the left icon rail; hidden below lg where sections just stack.
export function WorkSectionNav() {
  const [active, setActive] = useState(projects[0]?.slug ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // Trigger when a section crosses the middle band of the viewport.
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    for (const p of projects) {
      const el = document.getElementById(p.slug);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-12 flex gap-10">
      <div className="flex min-w-0 flex-1 flex-col gap-16">
        {projects.map((project, i) => (
          <section key={project.slug} id={project.slug} className="scroll-mt-24">
            <ProjectCard project={project} index={i} />
          </section>
        ))}
      </div>

      <nav className="hidden w-48 shrink-0 lg:block">
        <ul className="sticky top-20 space-y-2.5 border-l border-hairline pl-4">
          {projects.map((project) => {
            const isActive = active === project.slug;
            return (
              <li key={project.slug}>
                <a
                  href={`#${project.slug}`}
                  className={`block text-sm transition-colors ${
                    isActive ? "font-medium text-sky" : "text-muted hover:text-charcoal"
                  }`}
                >
                  {project.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
