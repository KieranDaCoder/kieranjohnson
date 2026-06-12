"use client";

import Link from "next/link";

// Pill button with an arrow in a circle. On hover the arrow swaps through
// the circle (exits right, re-enters from left) and the pill recolours.
export function ArrowLink({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light";
}) {
  const pill =
    variant === "solid"
      ? "bg-charcoal text-cream hover:bg-accent"
      : variant === "light"
        ? "bg-cream text-charcoal hover:bg-accent hover:text-cream"
        : "border border-charcoal/25 text-charcoal hover:border-accent hover:bg-accent hover:text-cream";

  const circle =
    variant === "solid" || variant === "light"
      ? "bg-cream/20"
      : "bg-charcoal/10 group-hover/arrow:bg-cream/20";

  return (
    <Link
      href={href}
      className={`group/arrow inline-flex items-center gap-3 rounded-full py-2.5 pl-6 pr-2.5 text-sm font-medium uppercase tracking-wide transition-colors duration-300 ${pill}`}
    >
      <span>{children}</span>
      <span className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full transition-colors duration-300 ${circle}`}>
        <span className="absolute transition-transform duration-300 ease-out group-hover/arrow:translate-x-8">→</span>
        <span className="absolute -translate-x-8 transition-transform duration-300 ease-out group-hover/arrow:translate-x-0">→</span>
      </span>
    </Link>
  );
}
