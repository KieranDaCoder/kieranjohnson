// Hero configuration. The billboard is behind one switch so it can be dropped
// for the simple hero at any point without touching layout code (brief §4.2,
// Saturday gate). Flip this to "simple" if the billboard fails on a real phone.
export const HERO_MODE: "billboard" | "simple" = "billboard";

// Where the baked-in white panel sits inside the wall photo, as percentages of
// the image. MEASURED from hero-src/brick-wall.png by scripts/make-hero-images.mjs
// (it reprints these on every run) — not eyeballed. If the licensed file differs
// from the comp, re-run the script and paste the new numbers here.
export const PANEL_WIDE = {
  left: 14.77,
  top: 14.24,
  width: 71.65,
  height: 56.36,
} as const;

// Intrinsic size of the wall photo, used to build an image plane that always
// covers the hero at the photo's own aspect ratio. The board is positioned
// inside that plane, so it stays locked to the panel at every viewport size.
export const WALL_ASPECT = 5888 / 3296;

// Mobile crops to brick only and the frame is drawn in code, because the baked
// panel is a short wide strip that can't hold five rows of readable tiles.
// 1.1 (not the brief's 3:4) keeps tiles near 1:2 so the letters stay big:
// tileRatio = panelAspect * rows / cols.
export const PANEL_STACKED_ASPECT = 1.1;

// Board grids. Trailing blank column on the last row is where the smile tile
// goes, so it always lands in the bottom-right corner.
export const BOARD_WIDE = {
  cols: 18,
  rows: [
    "                  ",
    "KIERAN JOHNSON    ",
    "                  ",
    "JUNIOR STRATEGIST ",
  ],
} as const;

export const BOARD_STACKED = {
  cols: 11,
  rows: ["KIERAN     ", "JOHNSON    ", "           ", "JUNIOR     ", "STRATEGIST "],
} as const;

// Viewport width at which the layout swaps from stacked to wide.
export const WIDE_FROM_PX = 820;

// The name must be fully resolved this fast after mount (brief: ~0.7s).
export const FLIP_DURATION_S = 0.7;
