"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

// Full-width section that fades and lifts in as it enters the viewport and
// fades out again as it leaves. Static under reduced motion.
export function FadeSection({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [48, 0, 0, -48]);

  return (
    <motion.section ref={ref} id={id} style={reduce ? undefined : { opacity, y }} className={className}>
      {children}
    </motion.section>
  );
}
