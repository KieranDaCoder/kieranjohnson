"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

// Swap for your real email — also used by the copy button.
const EMAIL = "kieranjohnson262@gmail.com";

// Live local time, Noteworthy-style header widget.
function Clock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Australia/Melbourne",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="shadow-widget hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-sm lg:flex">
      <span className="text-charcoal/60">Melbourne</span>
      <span className="font-medium tabular-nums text-charcoal">{time ?? "--:--"}</span>
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      onClick={copy}
      className="shadow-widget hidden items-center gap-3 rounded-full bg-white px-5 py-3 text-sm text-charcoal transition-colors hover:text-accent lg:flex"
    >
      <span>{copied ? "Copied!" : EMAIL}</span>
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="5" width="9" height="9" rx="1.5" />
        <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
      </svg>
    </button>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide on scroll down, reappear on scroll up.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 120 && !open);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5"
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Logo card */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shadow-widget flex h-13 w-13 items-center justify-center rounded-2xl bg-white p-3.5 transition-transform duration-300 hover:scale-105"
        >
          {/* K drops in from the top, J rises from the bottom, meeting on hover */}
          <motion.span
            className="display flex items-center text-xl leading-none text-charcoal"
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <span className="inline-flex overflow-hidden leading-none">
              <motion.span
                className="inline-block"
                variants={{ rest: { y: "0%" }, hover: { y: ["-130%", "0%"] } }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                K
              </motion.span>
            </span>
            <span className="inline-flex overflow-hidden leading-none">
              <motion.span
                className="inline-block"
                variants={{ rest: { y: "0%" }, hover: { y: ["130%", "0%"] } }}
                transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                J
              </motion.span>
            </span>
            <span className="text-accent">.</span>
          </motion.span>
        </Link>

        {/* Centre widgets */}
        <div className="flex items-center gap-3">
          <Clock />
          <CopyEmail />
        </div>

        {/* Nav pill */}
        <nav className="shadow-widget hidden items-center gap-1 rounded-full bg-white p-1.5 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                pathname.startsWith(link.href)
                  ? "bg-charcoal/8 text-charcoal"
                  : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-accent"
          >
            Hi!
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="shadow-widget flex h-13 w-13 flex-col items-center justify-center gap-1.5 rounded-2xl bg-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-5 bg-charcoal"
            animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
          />
          <motion.span
            className="block h-px w-5 bg-charcoal"
            animate={{ rotate: open ? -45 : 0, y: open ? -3.5 : 0 }}
          />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            className="fixed inset-0 -z-10 flex flex-col items-center justify-center gap-8 bg-cream md:hidden"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {[{ href: "/", label: "Home" }, ...links, { href: "/contact", label: "Contact" }].map(
              (link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`display text-5xl ${
                      pathname === link.href ? "text-charcoal" : "text-charcoal"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
