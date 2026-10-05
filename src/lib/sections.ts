"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";

let active: string | null = null;
const listeners = new Set<() => void>();

function setActive(id: string | null) {
  if (id === active) return;
  active = id;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function useActiveSection(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => active,
    () => null,
  );
}

// One IntersectionObserver over every [data-section] element; picks the most visible one.
export function SectionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (els.length === 0) {
      setActive(null);
      return;
    }
    const ratios = new Map<Element, number>();

    const pick = () => {
      if (window.scrollY < 40) {
        setActive("home");
        return;
      }
      let best: HTMLElement | null = null;
      let bestRatio = 0;
      let bestTop = Infinity;
      for (const el of els) {
        const r = ratios.get(el) ?? 0;
        if (r <= 0) continue;
        const top = el.getBoundingClientRect().top;
        if (r > bestRatio || (r === bestRatio && top < bestTop)) {
          best = el;
          bestRatio = r;
          bestTop = top;
        }
      }
      if (best) setActive(best.dataset.section ?? null);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
        }
        pick();
      },
      { rootMargin: "-76px 0px -40% 0px", threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));

    // Crossing the top threshold produces no intersection event, so watch scroll cheaply.
    const onScroll = () => {
      if (window.scrollY < 40) setActive("home");
      else if (active === "home") pick();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    pick();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
