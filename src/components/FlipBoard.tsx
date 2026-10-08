"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

// ponytail: cn() from @/lib/utils doesn't exist in this repo and isn't worth
// adding clsx/tailwind-merge for — this is the whole thing we need.
function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

// Mirrors hero.config.FLIP_DURATION_S (0.7s). Kept as a local literal rather
// than importing hero.config so this board stays reusable outside the hero.
const DEFAULT_DURATION_S = 0.7;

const MIN_FLIP_S = 0.12;
const MAX_FLIP_S = 0.22;
const MAX_SCRAMBLE_STEPS = 5;

// Sized from the tile's own width (container query), not the viewport, so the
// letters stay proportional at every board size. ~1em per tile width fills the
// face the way a real split-flap does; the widest caps (M/W) still clear it.
// Sized from the tile itself (container query), not the viewport, so letters
// stay proportional at any board size. Constrained on BOTH axes: the glyph is
// centred across the cell's two halves, so it has to clear the cell's height
// as well as its width, whatever aspect the grid gives the cell.
const CELL_TEXT_STYLE: React.CSSProperties = {
  fontSize: "min(95cqw, 80cqh)",
  lineHeight: 1,
};

// ── Individual Split-Flap Character ───────────────────────────────────

const FlapCell = React.memo(function FlapCell({
  target,
  delay,
  stepMs,
  flipDuration,
  reduceMotion,
}: {
  target: string;
  delay: number;
  stepMs: number;
  flipDuration: number;
  reduceMotion: boolean;
}) {
  const normalizedTarget = FLAP_CHARS.includes(target.toUpperCase())
    ? target.toUpperCase()
    : " ";

  const [current, setCurrent] = useState(" ");
  const [prev, setPrev] = useState(" ");
  const [flipId, setFlipId] = useState(0);
  const curRef = useRef(" ");
  const tgtRef = useRef<string | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (startTimer.current) clearTimeout(startTimer.current);
    if (stepTimer.current) clearTimeout(stepTimer.current);
    startTimer.current = null;
    stepTimer.current = null;

    if (reduceMotion) {
      // Land on the final character immediately, no flap at all.
      tgtRef.current = normalizedTarget;
      curRef.current = normalizedTarget;
      setCurrent(normalizedTarget);
      setFlipId(0);
      return;
    }

    if (normalizedTarget === tgtRef.current) return;
    tgtRef.current = normalizedTarget;

    if (normalizedTarget === " " && curRef.current === " ") return;

    const scrambleCount =
      normalizedTarget === " "
        ? 2 + Math.floor(Math.random() * 2) // 2–3 steps to settle blank
        : 3 + Math.floor(Math.random() * 3); // 3–5 steps otherwise

    const runStep = (i: number) => {
      const isLast = i === scrambleCount;
      const ch = isLast
        ? normalizedTarget
        : FLAP_CHARS[1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))];

      setPrev(curRef.current);
      curRef.current = ch;
      setCurrent(ch);
      setFlipId((n) => n + 1);

      if (!isLast) {
        stepTimer.current = setTimeout(() => runStep(i + 1), stepMs);
      }
    };

    startTimer.current = setTimeout(() => runStep(1), delay);

    return () => {
      if (startTimer.current) clearTimeout(startTimer.current);
      if (stepTimer.current) clearTimeout(stepTimer.current);
      startTimer.current = null;
      stepTimer.current = null;
      // Must clear, or a remount (StrictMode's double-invoke in dev, or any
      // re-mount) hits the "already targeting this char" guard above, bails
      // before scheduling, and the tile stays blank forever.
      tgtRef.current = null;
    };
  }, [normalizedTarget, delay, stepMs, reduceMotion]);

  const show = current === " " ? " " : current;
  const showPrev = prev === " " ? " " : prev;

  const textCx =
    "absolute inset-x-0 flex select-none items-center justify-center font-semibold uppercase text-black";

  const bottomDelay = flipDuration * 0.5;

  return (
    <div
      /* No fixed aspect: the grid's rows size the cell, so the board always
         fills the panel exactly. A hard-coded aspect only lines up at one
         column count and overflows at every other. */
      className="relative flex h-full w-full overflow-hidden border border-black/10 perspective-dramatic transform-3d"
      style={{ containerType: "size" }}
    >
      <div className="absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex">
        <div className="h-1/2 w-px bg-black/20" />
        <div className="flex h-px flex-1 bg-black/20" />
        <div className="h-1/2 w-px bg-black/20" />
      </div>

      {/* Static top – new character top half */}
      <div className="absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden bg-panel">
        <div className={cn(textCx, "top-0 h-[200%]")} style={CELL_TEXT_STYLE}>
          {show}
        </div>
      </div>

      {/* Static bottom – new character bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden bg-panel">
        <div className={cn(textCx, "bottom-0 h-[200%]")} style={CELL_TEXT_STYLE}>
          {show}
        </div>
        {flipId > 0 && (
          <motion.div
            key={`s${flipId}`}
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.8),transparent_60%)]"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: flipDuration * 1.3, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Flipping top flap – old character top half, drops down */}
      {flipId > 0 && (
        <motion.div
          key={flipId}
          className="absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden bg-panel backface-hidden transform-3d"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -100 }}
          transition={{
            duration: flipDuration,
            ease: [0.55, 0.055, 0.675, 0.19],
          }}
        >
          <div className={cn(textCx, "top-0 h-[200%]")} style={CELL_TEXT_STYLE}>
            {showPrev}
          </div>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,1))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: flipDuration }}
          />
        </motion.div>
      )}

      {/* Flipping bottom flap – new character bottom half, rises up */}
      {flipId > 0 && (
        <motion.div
          key={`b${flipId}`}
          className="absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden bg-panel backface-hidden transform-3d"
          initial={{ rotateX: 90 }}
          animate={{ rotateX: 0 }}
          transition={{
            duration: flipDuration * 0.85,
            delay: bottomDelay,
            ease: [0.33, 1.55, 0.64, 1],
          }}
        >
          <div className={cn(textCx, "bottom-0 h-[200%]")} style={CELL_TEXT_STYLE}>
            {show}
          </div>
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(255,255,255,0),rgba(255,255,255,0.6))]"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: flipDuration * 0.85,
              delay: bottomDelay,
            }}
          />
        </motion.div>
      )}

      {/* Split line */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-black/25" />
    </div>
  );
},
(prevProps, nextProps) =>
  prevProps.target === nextProps.target &&
  prevProps.delay === nextProps.delay &&
  prevProps.stepMs === nextProps.stepMs &&
  prevProps.flipDuration === nextProps.flipDuration &&
  prevProps.reduceMotion === nextProps.reduceMotion,
);

// ── Main FlipBoard Component ────────────────────────────────────────────

export interface FlipBoardProps {
  /** One string per row, already padded to `cols`. */
  rows: readonly string[];
  cols: number;
  /** Seconds until every tile is fully resolved. Defaults to ~0.7s. */
  duration?: number;
  /** Rendered instead of the last cell of the last row. */
  cornerSlot?: React.ReactNode;
}

export function FlipBoard({
  rows,
  cols,
  duration = DEFAULT_DURATION_S,
  cornerSlot,
}: FlipBoardProps) {
  const reduceMotion = useReducedMotionSafe();
  const rowCount = rows.length;

  // Budget timing backwards from `duration` so the worst case (last column,
  // MAX_SCRAMBLE_STEPS steps) always lands by `duration`: colDelay*(cols-1)
  // covers the stagger, stepMs*MAX_SCRAMBLE_STEPS covers the scramble, and
  // flipDuration covers the final flap's own transition.
  const flipDuration = Math.min(
    MAX_FLIP_S,
    Math.max(MIN_FLIP_S, duration * 0.3),
  );
  const remainingMs = Math.max(0, duration * 1000 - flipDuration * 1000);
  const colDelay = cols > 1 ? (remainingMs * 0.3) / (cols - 1) : 0;
  const stepMs = (remainingMs * 0.7) / MAX_SCRAMBLE_STEPS;

  return (
    <div
      aria-hidden="true"
      className="grid h-full w-full gap-px bg-black"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
      }}
    >
      {rows.flatMap((row, r) =>
        Array.from({ length: cols }, (_, c) => {
          if (cornerSlot && r === rowCount - 1 && c === cols - 1) {
            return (
              <React.Fragment key={`${r}-${c}`}>{cornerSlot}</React.Fragment>
            );
          }
          return (
            <FlapCell
              key={`${r}-${c}`}
              target={row[c] ?? " "}
              delay={c * colDelay}
              stepMs={stepMs}
              flipDuration={flipDuration}
              reduceMotion={reduceMotion}
            />
          );
        }),
      )}
    </div>
  );
}
