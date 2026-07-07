"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Icons — small lucide-style strokes, 18px                            */
/* ------------------------------------------------------------------ */
type IconProps = { className?: string };
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const Icons = {
  home: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <path d="M3 9.5 12 3l9 6.5" />
      <path d="M5 9v11h14V9" />
    </svg>
  ),
  about: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
    </svg>
  ),
  work: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <rect x="2.5" y="7" width="19" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  contact: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  linkedin: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 13v4" />
    </svg>
  ),
  chevron: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  menu: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  close: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} {...stroke}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
};

const nav = [
  { href: "/", label: "Home", icon: Icons.home },
  { href: "/about", label: "About", icon: Icons.about },
  { href: "/work", label: "Work", icon: Icons.work },
];

const contactLinks = [
  {
    href: "mailto:kieranjohnson262@gmail.com",
    label: "Email",
    icon: Icons.contact,
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/kieran-johnson-28b372359/",
    label: "LinkedIn",
    icon: Icons.linkedin,
    external: true,
  },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="flex flex-col gap-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors ${
                active
                  ? "bg-surface font-medium text-charcoal shadow-sm"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? "text-sky" : ""}`} />
              {label}
            </Link>
          );
        })}
      </nav>

      <p className="mt-8 mb-2 px-2 text-xs font-semibold text-charcoal">Contact</p>
      <nav className="flex flex-col gap-1">
        {contactLinks.map(({ href, label, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            onClick={onNavigate}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-muted transition-colors hover:text-charcoal"
          >
            <Icon className="h-[18px] w-[18px]" />
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}

function Header() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <img
        src="/profile/kieran.jpg"
        alt="Kieran Johnson"
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-charcoal">Kieran Johnson</span>
        <span className="text-xs text-muted">Communications Student</span>
      </span>
    </Link>
  );
}

function ResumeButton({ onNavigate }: { onNavigate?: () => void }) {
  // Filler — point this at your résumé PDF in /public when it's ready.
  return (
    <Link
      href="#"
      onClick={onNavigate}
      className="flex items-center justify-between rounded-full bg-charcoal px-5 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.02]"
    >
      Read Résumé
      <Icons.chevron className="h-4 w-4" />
    </Link>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ---------- Mobile top bar ---------- */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-hairline bg-bg/80 px-4 py-3 backdrop-blur md:hidden">
        <Header />
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="rounded-md p-1.5 text-charcoal"
        >
          <Icons.menu className="h-6 w-6" />
        </button>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col bg-bg p-5 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Header />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-md p-1.5 text-charcoal"
              >
                <Icons.close className="h-6 w-6" />
              </button>
            </div>
            <NavItems onNavigate={() => setOpen(false)} />
            <div className="mt-auto pt-8">
              <ResumeButton onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ---------- Desktop sidebar ---------- */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-hairline px-5 py-8 md:flex">
        <Header />
        <div className="mt-10 flex-1">
          <NavItems />
        </div>
        <ResumeButton />
      </aside>
    </>
  );
}
