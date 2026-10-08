"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { FlipBoard } from "@/components/FlipBoard";
import { SmileTile } from "@/components/SmileTile";
import {
  BOARD,
  FLIP_DURATION_S,
  PANEL_STACKED_ASPECT,
  PANEL_WIDE,
  WALL_ASPECT,
  WIDE_FROM_PX,
} from "@/components/hero.config";

// Fixed output sizes from scripts/make-hero-images.mjs (desktop: full wall
// resized to 2000w; mobile: brick-only crop resized to 800w). Hardcoded
// rather than threaded through meta.json since the script's resize target
// never changes without this file changing too.
const DESKTOP_W = 2000;
const DESKTOP_H = 1120;
const MOBILE_W = 800;
const MOBILE_H = 1600;

// No PANEL_WIDE-equivalent aspect exists for a standalone drawn panel (the
// no-wall fallback at wide widths), so derive one with the same tile-ratio
// formula hero.config uses for PANEL_STACKED_ASPECT (its comment: tileRatio =
// panelAspect * rows / cols, tuned to ~0.5 so tiles stay near 1:2).
const WIDE_DRAWN_PANEL_ASPECT = (0.5 * BOARD.cols) / BOARD.rows.length;

// The 2px overlap that hides the seam between the baked panel and the real
// board, per brief: "overlap the panel edge by ~2px... background:
// var(--color-black) so the overlap reads as frame, not glare."
const WIDE_FRAME_STYLE: CSSProperties = {
  position: "absolute",
  left: `calc(${PANEL_WIDE.left}% - 2px)`,
  top: `calc(${PANEL_WIDE.top}% - 2px)`,
  width: `calc(${PANEL_WIDE.width}% + 4px)`,
  height: `calc(${PANEL_WIDE.height}% + 4px)`,
  background: "var(--color-black)",
};

const WIDE_PANEL_FACE_STYLE: CSSProperties = {
  position: "absolute",
  inset: "2px",
  background: "var(--color-panel)",
};

function drawnFrame(width: string, aspect: number, board: React.ReactNode) {
  return (
    <div style={{ background: "var(--color-black)", padding: "10px", width }}>
      <div style={{ position: "relative", aspectRatio: String(aspect), background: "var(--color-panel)" }}>
        {board}
      </div>
    </div>
  );
}

export function BillboardHero({
  hasWall,
  blur,
}: {
  hasWall: boolean;
  blur: { desktop?: string; mobile?: string };
}) {
  // null until the first effect resolves the real viewport width, so the
  // FlipBoard never mounts twice (once for a guessed layout, again for the
  // real one) — pre-hydration, no board renders at all, only the CSS-painted
  // frame/panel (handled below, independent of this state).
  const [isWide, setIsWide] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${WIDE_FROM_PX}px)`);
    setIsWide(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const wideBoard = isWide === true && (
    <FlipBoard
      rows={BOARD.rows}
      cols={BOARD.cols}
      duration={FLIP_DURATION_S}
      cornerSlot={<SmileTile />}
    />
  );
  const stackedBoard = isWide === false && (
    <FlipBoard
      rows={BOARD.rows}
      cols={BOARD.cols}
      duration={FLIP_DURATION_S}
      cornerSlot={<SmileTile />}
    />
  );

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={{ "--hero-h": "max(92svh, 600px)", height: "var(--hero-h)" } as CSSProperties}
    >
      {/* Both layouts are always in the markup; a plain CSS media query (not
          a Tailwind arbitrary breakpoint, since WIDE_FROM_PX is a JS value
          Tailwind's scanner can't see) picks which one paints — so the first
          paint, even before hydration, already shows the right one. Only the
          FlipBoard choice needs JS (matchMedia below), to avoid mounting both
          boards at once. */}
      {/* Visible state is `flex`, not `block`: this tag is injected after
          Tailwind's sheet, so at equal specificity it wins over the `flex`
          utility on these same elements — `display: block` silently killed the
          centring on the no-wall fallback. Absolutely-positioned children are
          out of flow, so flex is inert for the layouts that don't want it. */}
      <style>{`
        .bh-stacked { display: flex; }
        .bh-wide { display: none; }
        @media (min-width: ${WIDE_FROM_PX}px) {
          .bh-stacked { display: none; }
          .bh-wide { display: flex; }
        }
      `}</style>

      {hasWall ? (
        <>
          {/* Wide: image plane at the photo's own aspect ratio, board over
              the baked-in panel. */}
          <div className="bh-wide absolute inset-0">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `max(100%, calc(var(--hero-h) * ${WALL_ASPECT}))`,
                aspectRatio: String(WALL_ASPECT),
              }}
            >
              <div
                className="absolute inset-0"
                style={blur.desktop ? { backgroundImage: `url(${blur.desktop})`, backgroundSize: "cover" } : undefined}
              >
                {/* Plain <picture>/<img>, not next/image: the files live in
                    gitignored public/hero and next/image can't see them at
                    build time on a host without the licensed asset. */}
                <picture>
                  <source srcSet="/hero/hero-desktop.avif" type="image/avif" />
                  <source srcSet="/hero/hero-desktop.webp" type="image/webp" />
                  <img
                    src="/hero/hero-desktop.webp"
                    alt=""
                    width={DESKTOP_W}
                    height={DESKTOP_H}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute inset-0 h-full w-full"
                  />
                </picture>
              </div>
              <div style={WIDE_FRAME_STYLE}>
                <div style={WIDE_PANEL_FACE_STYLE}>{wideBoard}</div>
              </div>
            </div>
          </div>

          {/* Stacked: brick-only crop as a plain cover background, frame and
              panel drawn in code and centred over it. */}
          <div className="bh-stacked absolute inset-0">
            <div
              className="absolute inset-0"
              style={blur.mobile ? { backgroundImage: `url(${blur.mobile})`, backgroundSize: "cover" } : undefined}
            >
              <picture>
                <source srcSet="/hero/hero-mobile.avif" type="image/avif" />
                <source srcSet="/hero/hero-mobile.webp" type="image/webp" />
                <img
                  src="/hero/hero-mobile.webp"
                  alt=""
                  width={MOBILE_W}
                  height={MOBILE_H}
                  fetchPriority="high"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </picture>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {drawnFrame("88vw", PANEL_STACKED_ASPECT, stackedBoard)}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Unlicensed-image fallback (deployed previews, etc): no photo at
              all, just the flat black ground from the section's own bg-black,
              with the frame + panel + board still drawn and centred so the
              hero looks deliberate rather than broken. */}
          <div className="bh-wide absolute inset-0 flex items-center justify-center">
            {drawnFrame("min(70vw, 900px)", WIDE_DRAWN_PANEL_ASPECT, wideBoard)}
          </div>
          <div className="bh-stacked absolute inset-0 flex items-center justify-center">
            {drawnFrame("88vw", PANEL_STACKED_ASPECT, stackedBoard)}
          </div>
        </>
      )}
    </div>
  );
}
