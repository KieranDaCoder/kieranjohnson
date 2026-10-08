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

// Scale applied on top of "just cover the hero", to push in on the billboard
// so it fills more of the frame and less brick shows. 1 = no zoom.
export const WALL_ZOOM = 1.2;

// Nudges the whole wall down so the floating nav pill clears the board instead
// of sitting on top of it. Percentage of the hero's height; needs the zoom
// above to have slack to give.
export const WALL_OFFSET_Y = 7;

// Mobile crops to brick only and the frame is drawn in code, because the baked
// panel is a short wide strip that can't hold the rows at a readable size. The
// drawn panel takes its height from the boards rather than a fixed aspect.

// Two separate boards, stacked with a gap, rather than one grid. A single grid
// forces every row to the same cell size, so the title could only ever be as
// big as the name. Splitting them lets the title run on a finer grid — more
// columns across the same width means smaller tiles, so "JUNIOR STRATEGIST"
// fits on one line AND reads as a subtitle.
export const BOARD_NAME = {
  cols: 11,
  rows: ["KIERAN     ", "JOHNSON    "],
} as const;

// 17 characters + 1 for the smile tile, which keeps it bottom-right.
export const BOARD_TITLE = {
  cols: 18,
  rows: ["JUNIOR STRATEGIST "],
} as const;

// Phones get their own, coarser grids. 18 columns across a 300px-wide panel is
// a 17px tile — unreadable. Breaking the title onto two rows lets both boards
// use few enough columns to stay legible while keeping the name clearly the
// larger of the two (7 columns vs 11).
export const BOARD_NAME_STACKED = {
  cols: 7,
  rows: ["KIERAN ", "JOHNSON"],
} as const;

export const BOARD_TITLE_STACKED = {
  cols: 11,
  rows: ["JUNIOR     ", "STRATEGIST "],
} as const;

// Width/height of a single flap tile. Each board derives its own height from
// this and its column count, rather than stretching to fill the panel — two
// rows stretched over a tall panel gives tiles far taller than the letters
// need, which reads as dead space. Below 1 = tiles taller than wide, like a
// real split-flap.
export const TILE_RATIO = 0.8;

// Vertical gap between the name board and the title board, as a share of the
// panel's height.
export const BOARD_GAP = 0.035;

// Viewport width at which the layout swaps from stacked to wide.
export const WIDE_FROM_PX = 820;

// The name must be fully resolved this fast after mount (brief: ~0.7s).
export const FLIP_DURATION_S = 0.7;
