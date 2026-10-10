"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// On Home these scroll to sections; on inner pages they return to them.
const items = [
  { id: "home", label: "Home", href: "/#home" },
  { id: "about", label: "About", href: "/#about" },
  { id: "work", label: "Work", href: "/#work" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

// Pinned sections move out of flow, so positions come from the element that
// holds their place (GSAP's pin-spacer) when there is one.
function anchorEl(el: HTMLElement) {
  const parent = el.parentElement;
  return parent?.classList.contains("pin-spacer") ? parent : el;
}

function docTop(el: HTMLElement) {
  return anchorEl(el).getBoundingClientRect().top + window.scrollY;
}

// Which Home section is crossing the middle of the viewport, from layout
// positions (not intersection), so pinned and overlapping sections are fine.
function useHomeSection(enabled: boolean) {
  const [current, setCurrent] = useState("home");

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.scrollY + window.innerHeight / 2;
      let active = items[0].id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && docTop(el) <= mid) active = item.id;
      }
      setCurrent(active);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [enabled]);

  return current;
}

export function SiteNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const homeSection = useHomeSection(onHome);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const current = onHome
    ? homeSection
    : pathname.startsWith("/work")
      ? "work"
      : pathname.startsWith("/about")
        ? "about"
        : null;
  const highlighted = hovered ?? current;

  return (
    <nav
      aria-label="Main"
      className="nav-glass fixed left-1/2 top-4 z-50 -translate-x-1/2 p-1"
      onPointerLeave={() => setHovered(null)}
    >
      <ul className="flex items-center">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={item.id === current ? (onHome ? "location" : "page") : undefined}
              // Mouse only: on touch the bubble just marks the current section.
              onClick={(e) => {
                if (!onHome || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                const el = document.getElementById(item.id);
                if (!el) return;
                // Native hash scrolling reads a pinned section's fixed position.
                e.preventDefault();
                const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
                window.history.replaceState(null, "", `#${item.id}`);
                window.scrollTo({ top: Math.max(0, docTop(el) - margin), behavior: "smooth" });
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(item.id)}
              onFocus={() => setHovered(item.id)}
              onBlur={() => setHovered(null)}
              className="relative block rounded-full px-3 py-2.5 text-base font-medium leading-none text-white sm:px-4"
            >
              {highlighted === item.id && (
                <motion.span
                  layoutId="nav-bubble"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/15"
                  transition={
                    reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40 }
                  }
                />
              )}
              <span className="relative">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
