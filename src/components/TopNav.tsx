"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { projects } from "@/lib/projects";
import { contactLinks } from "@/lib/contact";

const aboutLinks = [
  { href: "/about#about-me", label: "About Me" },
  { href: "/about#more", label: "A little more…" },
];

function Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

// Apple/skiper38-style floating nav: a glass pill that stays put, with small
// hover-revealed dropdowns per item showing that page's subsections. Résumé is
// a standalone solid-colour pill — never a dropdown. Pure CSS group-hover, no
// extra JS state for the desktop dropdowns.
export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* ---------- Desktop floating pill ---------- */}
      <nav className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-300 ease-out hover:gap-1 hover:px-2.5 hover:py-2 md:flex glass-navbar">
        <Link
          href="/"
          className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive("/") && pathname === "/" ? "font-medium text-sky" : "text-charcoal hover:text-sky"}`}
        >
          Home
        </Link>

        <div className="group relative">
          <Link
            href="/about"
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive("/about") ? "font-medium text-sky" : "text-charcoal hover:text-sky"}`}
          >
            About
          </Link>
          <div className="invisible absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {aboutLinks.map((l) => (
              <a key={l.href} href={l.href} className="block rounded-lg px-3 py-2 text-sm text-charcoal transition-colors hover:bg-sky/10 hover:text-sky">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="group relative">
          <Link
            href="/work"
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive("/work") ? "font-medium text-sky" : "text-charcoal hover:text-sky"}`}
          >
            Work
          </Link>
          <div className="invisible absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {projects.map((p) => (
              <a key={p.slug} href={`/work#${p.slug}`} className="block rounded-lg px-3 py-2 text-sm text-charcoal transition-colors hover:bg-sky/10 hover:text-sky">
                {p.title}
              </a>
            ))}
          </div>
        </div>

        <div className="group relative">
          <span className="cursor-default rounded-full px-3.5 py-1.5 text-sm text-charcoal">Contact</span>
          <div className="invisible absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-charcoal transition-colors hover:bg-sky/10 hover:text-sky"
              >
                <img src={c.icon} alt="" aria-hidden="true" className="h-4 w-4 [image-rendering:pixelated]" />
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <Link
          href="#"
          className="ml-1 rounded-full bg-sky px-3.5 py-1.5 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03]"
        >
          Résumé
        </Link>
      </nav>

      {/* ---------- Mobile trigger ---------- */}
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="glass-navbar relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-charcoal"
        >
          <Icon className="h-4 w-4" />
          Menu
        </button>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-4 top-4 flex max-h-[85vh] flex-col overflow-y-auto rounded-3xl bg-surface p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="display text-lg text-charcoal">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-md p-1.5 text-charcoal">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <Link href="/" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base font-medium text-charcoal">
              Home
            </Link>

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">About</p>
            <Link href="/about" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base text-charcoal">
              About
            </Link>
            {aboutLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-hairline py-2.5 pl-3 text-sm text-muted">
                {l.label}
              </a>
            ))}

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">Work</p>
            <Link href="/work" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base text-charcoal">
              Work
            </Link>
            {projects.map((p) => (
              <a key={p.slug} href={`/work#${p.slug}`} onClick={() => setOpen(false)} className="border-b border-hairline py-2.5 pl-3 text-sm text-muted">
                {p.title}
              </a>
            ))}

            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">Contact</p>
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-hairline py-2.5 text-sm text-charcoal"
              >
                <img src={c.icon} alt="" aria-hidden="true" className="h-4 w-4 [image-rendering:pixelated]" />
                {c.label}
              </a>
            ))}

            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-sky px-4 py-3 text-center text-sm font-medium text-white shadow-sm"
            >
              Résumé
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
