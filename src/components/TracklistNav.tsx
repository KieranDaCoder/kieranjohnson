"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useActiveSection } from "@/lib/sections";
import { getLenis } from "@/lib/lenis";

const TRACKS = [
  { id: "key-works", num: "01", name: "KEY WORKS" },
  { id: "crate", num: "02", name: "CRATE" },
  { id: "about", num: "03", name: "ABOUT" },
  { id: "contact", num: "04", name: "CONTACT" },
] as const;

const RESUME = "/KieranJohnson_Resume.pdf";

function routeSection(pathname: string): string | null {
  if (pathname.startsWith("/key-works")) return "key-works";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/contact")) return "contact";
  return null;
}

export function TracklistNav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const sectionActive = useActiveSection();
  const activeId = onHome ? sectionActive : routeSection(pathname);
  const reduce = useReducedMotion();

  // Open state is tied to the pathname it was opened on, so route changes close it.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const menuBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  const close = useCallback(() => setOpenPath(null), []);

  // Scroll lock, focus in, focus return.
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      document.documentElement.style.overflow = "hidden";
      getLenis()?.stop();
      dialog.current?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      document.documentElement.style.overflow = "";
      getLenis()?.start();
      menuBtn.current?.focus();
    }
    return () => {
      if (open) {
        document.documentElement.style.overflow = "";
        getLenis()?.start();
      }
    };
  }, [open]);

  // Escape closes; Tab is trapped inside the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialog.current) return;
      const items = Array.from(
        dialog.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const cur = document.activeElement;
      if (!dialog.current.contains(cur)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && cur === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && cur === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  const dur = reduce ? 0 : 0.25;
  const sora = { fontFamily: "var(--font-sora)" };

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
        style={{
          height: "var(--nav-h)",
          background: "rgba(26,15,8,0.78)",
          borderBottomColor: "rgba(217,142,43,0.35)",
        }}
      >
        <div className="flex h-full items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            aria-label="Kieran Johnson, home"
            className="display flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rust text-[20px] leading-none text-cream shadow-[inset_0_0_0_3px_rgba(0,0,0,0.18),inset_0_2px_4px_rgba(255,255,255,0.15)]"
          >
            KJ
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {TRACKS.map((t) => {
                const isActive = activeId === t.id;
                return (
                  <li key={t.id}>
                    <a
                      href={hrefFor(t.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={`mono-label flex min-h-11 items-center text-[13px] transition-colors hover:text-cream ${
                        isActive ? "font-semibold text-cream" : "text-cream/85"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="inline-block w-4 text-[10px] text-amber"
                      >
                        {isActive ? "▶" : ""}
                      </span>
                      <span className="mr-2">{t.num}</span>
                      {t.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center">
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center rounded-full bg-amber px-5 text-[14px] font-medium text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-colors hover:bg-amber-light lg:inline-flex"
              style={sora}
            >
              Résumé ↗
            </a>
            <button
              ref={menuBtn}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenPath(pathname)}
              className="min-h-11 min-w-11 px-2 text-[15px] font-medium text-cream lg:hidden"
              style={sora}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-leather px-6 pb-8 lg:hidden"
            initial={{ opacity: 0, y: reduce ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -12 }}
            transition={{ duration: dur, ease: "easeOut" }}
          >
            <div
              className="flex items-center justify-end"
              style={{ height: "var(--nav-h)" }}
            >
              <button
                type="button"
                onClick={close}
                className="min-h-11 min-w-11 px-2 text-[15px] font-medium text-cream"
                style={sora}
              >
                Close
              </button>
            </div>
            <ul className="mt-2 flex-1">
              {TRACKS.map((t) => {
                const isActive = activeId === t.id;
                return (
                  <li
                    key={t.id}
                    className="border-b border-cognac/40 first:border-t"
                  >
                    <a
                      href={hrefFor(t.id)}
                      onClick={close}
                      aria-current={isActive ? "location" : undefined}
                      className="flex min-h-11 items-center gap-4 py-5"
                    >
                      <span
                        aria-hidden="true"
                        className="w-4 text-[14px] text-amber"
                      >
                        {isActive ? "▶" : ""}
                      </span>
                      <span
                        className={`mono-label text-[18px] ${
                          isActive ? "text-amber" : "text-cream/50"
                        }`}
                      >
                        {t.num}
                      </span>
                      <span className="display text-[44px] leading-none text-cream">
                        {t.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <a
              href={RESUME}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-amber px-5 text-[16px] font-medium text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] hover:bg-amber-light"
              style={sora}
            >
              Résumé ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
