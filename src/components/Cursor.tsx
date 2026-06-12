"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Variant = "default" | "link" | "view";

// Custom cursor: a white dot in difference blend mode, so it inverts
// whatever sits beneath it. Barely grows on links; becomes a labelled
// window over project cards (data-cursor="view").
export function Cursor() {
  const [variant, setVariant] = useState<Variant>("default");
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 38, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 38, mass: 0.5 });

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

  // Subtle: 14px at rest, 22px on links. Only the card "view" state is big.
  const size = variant === "view" ? 72 : variant === "link" ? 22 : 14;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-white"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: "difference",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <motion.span
        className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-black"
        animate={{ opacity: variant === "view" ? 1 : 0, scale: variant === "view" ? 1 : 0.5 }}
        transition={{ duration: 0.2 }}
      >
        View
      </motion.span>
    </motion.div>
  );
}
