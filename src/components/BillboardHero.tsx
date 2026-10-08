"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { FlipBoard } from "@/components/FlipBoard";
import { SmileTile } from "@/components/SmileTile";
import {
  BOARD_NAME,
  BOARD_NAME_STACKED,
  BOARD_TITLE,
  BOARD_TITLE_STACKED,
  FLIP_DURATION_S,
  BOARD_GAP,
  TILE_RATIO,
  PANEL_WIDE,
  WALL_ASPECT,
  WALL_OFFSET_Y,
  WALL_ZOOM,
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

// Aspect of the drawn panel in the no-wall fallback at wide widths. Matches
// the real billboard's 2.27 closely enough that the fallback reads as the same
// object, without depending on the photo being present.
const WIDE_DRAWN_PANEL_ASPECT = 2.2;

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

// Reads as a board recessed behind the frame rather than a flat sticker: a
// hard dark rim, then a soft cast shadow falling from the top edge, then a
// faint lift along the bottom where light would bounce back up.
const RECESS: CSSProperties = {
  boxShadow:
    "inset 0 0 0 1px rgba(0,0,0,0.55), inset 0 14px 28px -6px rgba(0,0,0,0.55), inset 0 -6px 14px -6px rgba(255,255,255,0.35)",
};

const WIDE_PANEL_FACE_STYLE: CSSProperties = {
  position: "absolute",
  inset: "2px",
  background: "var(--color-panel)",
};

const cn = (...a: (string | false | undefined)[]) => a.filter(Boolean).join(" ");

// `aspect: null` lets the panel take its height from the boards inside it, so
// the frame hugs the content instead of leaving dead space around it.
function drawnFrame(
  width: string,
  aspect: number | null,
  board: React.ReactNode,
) {
  return (
    <div
      style={{
        background: "var(--color-black)",
        padding: "10px",
        width,
        boxShadow: "0 18px 40px -12px rgba(0,0,0,0.7)",
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: aspect === null ? undefined : String(aspect),
          background: "var(--color-panel)",
          ...RECESS,
        }}
      >
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

  // Name above, title below, with a blank gap between them. Two boards rather
  // than two rows of one board, so the title gets its own finer grid and so
  // reads smaller. The smile tile lives on the title board's last cell.
  // Each board gets a height derived from its own column count and TILE_RATIO,
  // then the pair is centred in the panel. Stretching them to fill the panel
  // instead makes tiles much taller than the letters, which reads as dead
  // space. boardAspect = cols / rows * TILE_RATIO.
  const boardAspect = (b: { cols: number; rows: readonly string[] }) =>
    String((b.cols / b.rows.length) * TILE_RATIO);

  type Cfg = { cols: number; rows: readonly string[] };
  const boardStack = (name: Cfg, title: Cfg, fill: boolean) => (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-[3%]",
        // Wide sits over the baked panel, so it fills it; stacked drives the
        // height of a frame drawn around it, so it flows instead.
        fill ? "absolute inset-0" : "w-full py-[4%]",
      )}
    >
      <div className="w-full" style={{ aspectRatio: boardAspect(name) }}>
        <FlipBoard rows={name.rows} cols={name.cols} duration={FLIP_DURATION_S} />
      </div>
      {/* Margin, not flex `gap`: a percentage gap resolves against the
          container's height, which is `auto` in the stacked layout, so it
          collapsed to nothing there. Percentage margins resolve against width,
          which is definite in both layouts. */}
      <div
        className="w-full"
        style={{
          aspectRatio: boardAspect(title),
          marginTop: `${BOARD_GAP * 100}%`,
        }}
      >
        <FlipBoard
          rows={title.rows}
          cols={title.cols}
          duration={FLIP_DURATION_S}
          cornerSlot={<SmileTile />}
        />
      </div>
    </div>
  );

  const wideBoard = isWide === true && boardStack(BOARD_NAME, BOARD_TITLE, true);
  const stackedBoard =
    isWide === false &&
    boardStack(BOARD_NAME_STACKED, BOARD_TITLE_STACKED, false);

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
              className="absolute left-1/2 top-1/2"
              style={{
                // Cover the hero, then scale past it to push in on the
                // billboard; the overflow is what gives the Y nudge its slack.
                width: `calc(max(100%, calc(var(--hero-h) * ${WALL_ASPECT})) * ${WALL_ZOOM})`,
                aspectRatio: String(WALL_ASPECT),
                transform: `translate(-50%, calc(-50% + ${WALL_OFFSET_Y}svh))`,
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
                <div style={{ ...WIDE_PANEL_FACE_STYLE, ...RECESS }}>
                  {wideBoard}
                </div>
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
              {drawnFrame("88vw", null, stackedBoard)}
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
            {drawnFrame("88vw", null, stackedBoard)}
          </div>
        </>
      )}
    </div>
  );
}
