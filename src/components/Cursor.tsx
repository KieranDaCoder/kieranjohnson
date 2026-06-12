"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "default" | "link" | "view";

// Custom cursor: a navy dot that grows over links and becomes a
// "View" badge over project cards (elements with data-cursor="view").
export function Cursor() {
  const [variant, setVariant] = useState<Variant>("default");
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });

  useEffect(() => {
    // Only on devices with a real pointer — never on touch screens.
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const el = (e.target as Element).closest("[data-cursor], a, button");
      if (!el) return setVariant("default");
      const kind = el.getAttribute("data-cursor");
      setVariant(kind === "view" ? "view" : "link");
    };
    const out = () => setVariant("default");

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseleave", out);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", out);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = variant === "view" ? 84 : variant === "link" ? 48 : 14;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor:
          variant === "view" ? "rgba(24, 95, 165, 1)" : variant === "link" ? "rgba(55, 138, 221, 0.25)" : "rgba(24, 95, 165, 1)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      <motion.span
        className="text-xs font-medium uppercase tracking-widest text-cream"
        animate={{ opacity: variant === "view" ? 1 : 0, scale: variant === "view" ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
