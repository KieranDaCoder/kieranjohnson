// Generates the billboard hero's responsive images from the Adobe Stock source.
//
// Source and output are BOTH gitignored: the comp is unlicensed until Kieran
// buys it, and preview URLs are public. When the images are absent the hero
// renders a flat dark ground instead (see Hero.tsx), so the build never breaks.
//
//   npm run hero:images
//
// Desktop = the full wall, board sits over the baked-in panel.
// Mobile  = a brick-only crop; the frame and panel are drawn in code, because
//           the baked panel is a short wide strip that can't hold 5 tall rows.

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const SRC = "hero-src/brick-wall.png";
const OUT = "public/hero";

// Brick-only region of the source, left of the billboard frame. Measured: the
// frame's outer edge starts at ~11% width, the pavement at ~78% height.
const MOBILE_CROP = { left: 0, top: 0, width: 618, height: 1236 };

if (!existsSync(SRC)) {
  console.error(`✗ ${SRC} not found — drop the licensed wall image there first.`);
  process.exit(1);
}

await mkdir(OUT, { recursive: true });

const base = sharp(SRC);
const { width, height } = await base.metadata();

// Quality is tuned down hard: brick is high-frequency texture that eats bytes,
// and it sits behind a billboard, so detail loss is invisible in place.
const variants = [
  {
    name: "hero-desktop",
    pipe: () => sharp(SRC).resize(2000),
    budget: 250,
    q: { avif: 50, webp: 62 },
  },
  {
    name: "hero-mobile",
    pipe: () => sharp(SRC).extract(MOBILE_CROP).resize(800),
    budget: 120,
    q: { avif: 46, webp: 52 },
  },
];

const meta = { width, height, panel: null, blur: {} };

for (const { name, pipe, budget, q } of variants) {
  for (const fmt of ["avif", "webp"]) {
    const info = await pipe()[fmt]({ quality: q[fmt] }).toFile(`${OUT}/${name}.${fmt}`);
    const kb = Math.round(info.size / 1024);
    const flag = kb > budget ? `✗ OVER ${budget}KB` : "✓";
    console.log(`${flag} ${name}.${fmt}  ${kb}KB  ${info.width}x${info.height}`);
  }

  // Tiny inline blur-up placeholder, base64'd into the markup.
  const buf = await pipe().resize(16).blur(1).webp({ quality: 40 }).toBuffer();
  meta.blur[name] = `data:image/webp;base64,${buf.toString("base64")}`;
}

// Panel rect as percentages of the desktop image, measured from the source so
// the board lands exactly on the baked-in white face at any viewport.
meta.panel = await measurePanel();

await writeFile(`${OUT}/meta.json`, JSON.stringify(meta, null, 2));
console.log(`✓ ${OUT}/meta.json  panel`, meta.panel);

// Finds the solid bright face inside the frame: the rows/columns that are
// majority-bright, which excludes the grey pavement and the mortar highlights.
async function measurePanel() {
  const W = 589;
  const H = Math.round((W * height) / width);
  const { data } = await sharp(SRC)
    .resize(W, H, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const bright = (x, y) => {
    const i = (y * W + x) * 3;
    return data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200;
  };

  const rows = [];
  const cols = [];
  for (let y = 0; y < H; y++) {
    let c = 0;
    for (let x = 0; x < W; x++) if (bright(x, y)) c++;
    if (c > W * 0.5) rows.push(y);
  }
  for (let x = 0; x < W; x++) {
    let c = 0;
    for (let y = 0; y < H; y++) if (bright(x, y)) c++;
    if (c > H * 0.5) cols.push(x);
  }

  const round = (n) => +n.toFixed(2);
  return {
    left: round((cols[0] / W) * 100),
    top: round((rows[0] / H) * 100),
    width: round(((cols.at(-1) - cols[0] + 1) / W) * 100),
    height: round(((rows.at(-1) - rows[0] + 1) / H) * 100),
  };
}
