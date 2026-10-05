"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { projects } from "@/lib/projects";
import { contactLinks } from "@/lib/contact";

const aboutLinks = [{ href: "/about#about-me", label: "About Me" }];

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

const linkBase = "nav-link nav-ink rounded-full px-3.5 py-1.5 text-sm transition-colors";
const dropItem = "nav-link nav-ink block rounded-lg px-3 py-2 text-sm transition-colors";

// Floating glass pill with hover-revealed dropdowns. Its colours follow the
// ground behind it: white-on-navy over the hero, navy-on-white everywhere else
// (theme is written to <html data-nav-theme> by the effect below).
export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  useEffect(() => {
    const root = document.documentElement;
    const hero = document.querySelector("[data-hero]");
    if (!hero) {
      root.dataset.navTheme = "light";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        root.dataset.navTheme = entry.isIntersecting ? "dark" : "light";
      },
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => {
      io.disconnect();
      root.dataset.navTheme = "light";
    };
  }, [pathname]);

  return (
    <>
      {/* ---------- Desktop floating pill ---------- */}
      <nav className="fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-0.5 rounded-full px-1.5 py-1 transition-all duration-300 ease-out hover:gap-1 hover:px-2.5 hover:py-2 md:flex glass-navbar">
        <Link href="/" data-active={pathname === "/"} className={linkBase}>
          Home
        </Link>

        <div className="group relative">
          <Link href="/about" data-active={isActive("/about")} className={linkBase}>
            About
          </Link>
          <div className="invisible absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {aboutLinks.map((l) => (
              <a key={l.href} href={l.href} className={dropItem}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

        <div className="group relative">
          <Link href="/work" data-active={isActive("/work")} className={linkBase}>
            Work
          </Link>
          <div className="invisible absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {projects.map((p) => (
              <a key={p.slug} href={`/work#${p.slug}`} className={dropItem}>
                {p.title}
              </a>
            ))}
          </div>
        </div>

        <div className="group relative">
          <span className="nav-ink cursor-default rounded-full px-3.5 py-1.5 text-sm">Contact</span>
          <div className="invisible absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-2xl p-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 glass-navbar">
            {contactLinks.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className={`${dropItem} flex items-center gap-2`}
              >
                <img src={c.icon} alt="" aria-hidden="true" className="nav-icon h-4 w-4 [image-rendering:pixelated]" />
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <a
          href="/KieranJohnson_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-cta ml-1 rounded-full px-3.5 py-1.5 text-sm font-semibold shadow-sm transition-transform hover:scale-[1.03]"
        >
          Résumé
        </a>
      </nav>

      {/* ---------- Mobile trigger ---------- */}
      <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 md:hidden">
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="glass-navbar nav-ink relative flex min-h-11 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium"
        >
          <Icon className="h-4 w-4" />
          Menu
        </button>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-4 top-4 flex max-h-[85vh] flex-col overflow-y-auto border-2 border-charcoal bg-white p-6 shadow-[8px_8px_0_0_var(--color-hero)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="display text-2xl text-charcoal">Menu</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="p-1.5 text-charcoal">
                <CloseIcon className="h-6 w-6" />
              </button>
            </div>

            <Link href="/" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base font-medium text-charcoal">
              Home
            </Link>

            <p className="caption mt-3 text-muted">About</p>
            <Link href="/about" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base text-charcoal">
              About
            </Link>
            {aboutLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-hairline py-2.5 pl-3 text-sm text-muted">
                {l.label}
              </a>
            ))}

            <p className="caption mt-3 text-muted">Work</p>
            <Link href="/work" onClick={() => setOpen(false)} className="border-b border-hairline py-3 text-base text-charcoal">
              Work
            </Link>
            {projects.map((p) => (
              <a key={p.slug} href={`/work#${p.slug}`} onClick={() => setOpen(false)} className="border-b border-hairline py-2.5 pl-3 text-sm text-muted">
                {p.title}
              </a>
            ))}

            <p className="caption mt-3 text-muted">Contact</p>
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

            <a
              href="/KieranJohnson_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-charcoal px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Résumé
            </a>
          </div>
        </div>
      )}
    </>
  );
}
