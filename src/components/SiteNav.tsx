"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const activeHref = items.find((item) => isActive(pathname, item.href))?.href ?? "/";
  const highlighted = hovered ?? activeHref;

  return (
    <nav
      aria-label="Main"
      className="nav-glass fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 p-1.5"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onMouseEnter={() => setHovered(item.href)}
            onFocus={() => setHovered(item.href)}
            className="relative rounded-full px-3 py-1.5 text-sm font-semibold text-white"
          >
            {highlighted === item.href && (
              <motion.span
                layoutId="nav-bubble"
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: "rgba(143,193,232,0.35)",
                  border: "1px solid #8FC1E8",
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 32 }
                }
              />
            )}
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
