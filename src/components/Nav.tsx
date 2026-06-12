"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-center justify-between px-6 py-5 md:px-12 bg-cream/80 backdrop-blur-md">
        <Link
          href="/"
          className="display text-xl text-navy transition-colors hover:text-sky"
          onClick={() => setOpen(false)}
        >
          KJ<span className="text-sky">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`link-sweep text-sm tracking-wide uppercase transition-colors hover:text-sky ${
                pathname === link.href ? "text-navy" : "text-charcoal/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-px w-6 bg-charcoal"
            animate={{ rotate: open ? 45 : 0, y: open ? 3.5 : 0 }}
          />
          <motion.span
            className="block h-px w-6 bg-charcoal"
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
            {links.map((link, i) => (
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
                    pathname === link.href ? "text-navy" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
