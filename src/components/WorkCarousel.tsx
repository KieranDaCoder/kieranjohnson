"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { ProjectTile } from "@/components/ProjectTile";
import type { Project } from "@/lib/content";

type Tile = Pick<Project, "slug" | "title" | "category" | "year" | "tile" | "alt">;

const DRAG_THRESHOLD = 6;
const FRICTION = 0.92; // per 60fps frame

function Arrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

// Wrap v into (-size, 0].
function wrapRange(v: number, size: number) {
  if (size <= 0) return 0;
  let m = v % size;
  if (m > 0) m -= size;
  return m === 0 ? 0 : m;
}

// Full-bleed, gapless strip that loops forever. A motion value drives translateX
// on a track holding enough copies of the list; x is wrapped into (-setWidth, 0].
export function WorkCarousel({ projects }: { projects: Tile[] }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const offset = useMotionValue(0); // arrow animation progress, applied as deltas
  const wrapperRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLUListElement>(null);
  const [setW, setSetW] = useState(0);
  const [viewW, setViewW] = useState(0);

  const setWRef = useRef(0);
  const dragging = useRef(false);
  const moved = useRef(false);
  const velocity = useRef(0); // px per 60fps frame
  const arrowAnim = useRef<ReturnType<typeof animate> | null>(null);
  const arrowTarget = useRef(0);
  const arrowPrev = useRef(0);
  const arrowUnsub = useRef<(() => void) | null>(null);

  const move = useCallback(
    (dx: number) => {
      x.set(wrapRange(x.get() + dx, setWRef.current));
    },
    [x],
  );

  const stopArrow = useCallback(() => {
    arrowAnim.current?.stop();
    arrowAnim.current = null;
    arrowUnsub.current?.();
    arrowUnsub.current = null;
  }, []);

  // Measure one copy and the viewport.
  useEffect(() => {
    const set = setRef.current;
    const wrap = wrapperRef.current;
    if (!set || !wrap) return;
    const measure = () => {
      const w = set.getBoundingClientRect().width;
      setWRef.current = w;
      setSetW(w);
      setViewW(wrap.clientWidth);
      x.set(wrapRange(x.get(), w));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(set);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [x]);

  // Horizontal wheel / trackpad.
  useEffect(() => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      stopArrow();
      velocity.current = 0;
      move(-e.deltaX);
    };
    wrap.addEventListener("wheel", onWheel, { passive: false });
    return () => wrap.removeEventListener("wheel", onWheel);
  }, [move, stopArrow]);

  useAnimationFrame((_, delta) => {
    const d = Math.min(delta, 100);
    if (dragging.current) return;
    if (Math.abs(velocity.current) > 0.3) {
      const f = d / (1000 / 60);
      move(velocity.current * f);
      velocity.current *= Math.pow(FRICTION, f);
      return;
    }
    velocity.current = 0;
  });

  // Pointer drag.
  const drag = useRef({ id: -1, startX: 0, lastX: 0, lastT: 0, active: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    moved.current = false;
    drag.current = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: e.timeStamp, active: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (e.pointerId !== d.id) return;
    if (!d.active) {
      if (Math.abs(e.clientX - d.startX) <= DRAG_THRESHOLD) return;
      d.active = true;
      dragging.current = true;
      moved.current = true;
      velocity.current = 0;
      stopArrow();
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const dx = e.clientX - d.lastX;
    const dt = Math.max(e.timeStamp - d.lastT, 1);
    move(dx);
    velocity.current = velocity.current * 0.5 + (dx / dt) * (1000 / 60) * 0.5;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const endDrag = (e: React.PointerEvent) => {
    const d = drag.current;
    if (e.pointerId !== d.id) return;
    if (d.active && e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // A pause before release kills the fling.
    if (e.timeStamp - d.lastT > 80) velocity.current = 0;
    dragging.current = false;
    d.active = false;
    d.id = -1;
  };

  function step(dir: 1 | -1) {
    const tileW = projects.length ? setWRef.current / projects.length : 0;
    if (!tileW) return;
    velocity.current = 0;
    if (reduce) {
      move(-dir * tileW);
      return;
    }
    // Remaining distance of an in-flight animation carries over, so quick clicks add up.
    const remaining = arrowAnim.current ? arrowTarget.current - offset.get() : 0;
    stopArrow();
    arrowTarget.current = remaining - dir * tileW;
    offset.set(0);
    arrowPrev.current = 0;
    arrowUnsub.current = offset.on("change", (v) => {
      move(v - arrowPrev.current);
      arrowPrev.current = v;
    });
    const controls = animate(offset, arrowTarget.current, {
      type: "spring",
      stiffness: 260,
      damping: 32,
    });
    arrowAnim.current = controls;
    controls.finished.then(() => {
      if (arrowAnim.current === controls) {
        arrowAnim.current = null;
        arrowUnsub.current?.();
        arrowUnsub.current = null;
      }
    });
  }

  const onFocusCapture = (e: React.FocusEvent) => {
    const wrap = wrapperRef.current;
    const target = e.target as HTMLElement;
    if (!wrap) return;
    stopArrow();
    velocity.current = 0;
    const r = target.getBoundingClientRect();
    const w = wrap.getBoundingClientRect();
    if (r.left < w.left) move(w.left - r.left);
    else if (r.right > w.right) move(w.right - r.right);
  };
  const copies = setW > 0 ? Math.max(2, Math.ceil(viewW / setW) + 1) : 1;

  return (
    <div className="relative [--tw:78vw] md:[--tw:clamp(260px,31.6vw,520px)]">
      <div
        ref={wrapperRef}
        className="cursor-grab touch-pan-y select-none overflow-clip border-b border-line active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault();
            e.stopPropagation();
            moved.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        onFocusCapture={onFocusCapture}
      >
        <motion.div className="flex w-max will-change-transform" style={{ x }}>
          {Array.from({ length: copies }, (_, c) => (
            <ul
              key={c}
              ref={c === 0 ? setRef : undefined}
              className="flex flex-none"
              aria-hidden={c > 0 ? true : undefined}
            >
              {projects.map((project) => (
                <li
                  key={project.slug}
                  className="w-[var(--tw)] flex-none border-r border-line"
                >
                  <ProjectTile
                    project={project}
                    compact
                    tabIndex={c > 0 ? -1 : undefined}
                    sizes="(max-width: 768px) 78vw, 520px"
                  />
                </li>
              ))}
            </ul>
          ))}
        </motion.div>
      </div>

      <button
        type="button"
        className="btn-round arrow-overlay absolute left-4 top-[calc(var(--tw)*2/3-32px)] z-10 md:left-6"
        aria-label="Previous project"
        onClick={() => step(-1)}
      >
        <Arrow flip />
      </button>
      <button
        type="button"
        className="btn-round arrow-overlay absolute right-4 top-[calc(var(--tw)*2/3-32px)] z-10 md:right-6"
        aria-label="Next project"
        onClick={() => step(1)}
      >
        <Arrow />
      </button>
    </div>
  );
}
