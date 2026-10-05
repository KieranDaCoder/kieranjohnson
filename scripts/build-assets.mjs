// Reproducible asset build. Run from repo root: node scripts/build-assets.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const HOME = os.homedir();
const LEATHER = path.join(HOME, "Downloads", "AdobeStock_402579646.jpeg");
const FILM = path.join(HOME, "Downloads", "AdobeStock_2061685160.jpeg");
const RECORD = path.join(HOME, "Downloads", "files", "KJ_record_lowglare.png");
const OUT = path.resolve("public", "img");
fs.mkdirSync(OUT, { recursive: true });

// Grading parameters (tuned): desaturate to luminance, gain, then multiply by cognac tint
const G = { gain: 0.9, offset: -8, gamma: 1.0, tint: [255, 180, 134], keepOriginal: 0.18 };

const rows = [];
const report = async (file, extra = "") => {
  const p = path.join(OUT, file);
  const m = await sharp(p).metadata();
  rows.push([file, `${m.width}x${m.height}`, (fs.statSync(p).size / 1024).toFixed(1), extra]);
};
const meanRGB = async (buf) => {
  const s = await sharp(buf).stats();
  return s.channels.slice(0, 3).map((c) => c.mean);
};

// 1. Leather
const lm = await sharp(LEATHER).metadata();
const cw = lm.width, ch = Math.round((lm.width * 9) / 16);
const crop = await sharp(LEATHER)
  .extract({ left: 0, top: Math.round((lm.height - ch) / 2), width: cw, height: ch })
  .resize(1920, 1080).toBuffer();
await sharp(crop).resize(960).jpeg({ quality: 85 }).toFile(path.join(OUT, "_review-leather-original.jpg"));

const gray = await sharp(crop).greyscale().gamma(G.gamma).linear(G.gain, G.offset).toColourspace('srgb').toBuffer();
const tint = await sharp({ create: { width: 1920, height: 1080, channels: 3, background: { r: G.tint[0], g: G.tint[1], b: G.tint[2] } } }).png().toBuffer();
const colourised = await sharp(gray).composite([{ input: tint, blend: 'multiply' }]).toBuffer();
// blend a little of the original red for organic hue variation
const orig = await sharp(crop).modulate({ brightness: 0.4, saturation: 0.6 }).ensureAlpha(G.keepOriginal).png().toBuffer();
const final = await sharp(colourised).composite([{ input: orig }]).toBuffer();
await sharp(final).webp({ quality: 72 }).toFile(path.join(OUT, "hero-leather.webp"));
const mean = (await meanRGB(final)).map((v) => v.toFixed(0));
const lum = (0.2126 * mean[0] + 0.7152 * mean[1] + 0.0722 * mean[2]) / 255;
await report("hero-leather.webp", `mean RGB ${mean.join(",")} (lum ${(lum * 100).toFixed(1)}%)`);

// 2. Film
for (let q = 60; q >= 30; q -= 5) {
  await sharp(FILM).resize(1920, 960).webp({ quality: q }).toFile(path.join(OUT, "hero-film.webp"));
  if (fs.statSync(path.join(OUT, "hero-film.webp")).size <= 175 * 1024) break;
}
await report("hero-film.webp");

// 3. Record
const { data, info } = await sharp(RECORD).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height;
let x0 = W, y0 = H, x1 = -1, y1 = -1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (data[(y * W + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
}
const dw = x1 - x0 + 1, dh = y1 - y0 + 1, side = Math.max(dw, dh);
const left = Math.max(0, Math.min(W - side, Math.round(x0 - (side - dw) / 2)));
const top = Math.max(0, Math.min(H - side, Math.round(y0 - (side - dh) / 2)));
// label: rust pixels (~#9B4027) in central region
let lx0 = W, lx1 = -1, ly0 = H, ly1 = -1;
const cx = x0 + dw / 2, cy = y0 + dh / 2;
for (let y = y0; y <= y1; y += 1) for (let x = x0; x <= x1; x += 1) {
  if (Math.hypot(x - cx, y - cy) > side * 0.3) continue;
  const i = (y * W + x) * 4;
  if (data[i + 3] < 200) continue;
  const d = Math.hypot(data[i] - 0x9b, data[i + 1] - 0x40, data[i + 2] - 0x27);
  if (d < 45) { if (x < lx0) lx0 = x; if (x > lx1) lx1 = x; if (y < ly0) ly0 = y; if (y > ly1) ly1 = y; }
}
const labelFrac = (((lx1 - lx0 + 1) + (ly1 - ly0 + 1)) / 2) / side;
const offC = Math.hypot((lx0 + lx1) / 2 - cx, (ly0 + ly1) / 2 - cy);
const trimmed = await sharp(RECORD).extract({ left, top, width: side, height: side }).png().toBuffer();
await sharp(trimmed).resize(1400, 1400).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(OUT, "record-1400.webp"));
await sharp(trimmed).resize(700, 700).webp({ quality: 80, alphaQuality: 90 }).toFile(path.join(OUT, "record-700.webp"));
const note = `disc ${dw}x${dh} bbox@(${x0},${y0}); disc centre (${cx.toFixed(1)},${cy.toFixed(1)}) vs image centre (${W / 2},${H / 2}); label frac ${labelFrac.toFixed(3)}; label-centre offset ${offC.toFixed(1)}px`;
await report("record-1400.webp", note);
await report("record-700.webp");

// 4/5. Tileable noise (per-pixel random is inherently seamless)
const noise = async (file, fn) => {
  const buf = Buffer.alloc(256 * 256 * 4);
  for (let i = 0; i < 256 * 256; i++) { const px = fn(); buf.set(px, i * 4); }
  await sharp(buf, { raw: { width: 256, height: 256, channels: 4 } }).png({ compressionLevel: 9, palette: true, colours: 64 }).toFile(path.join(OUT, file));
  await report(file);
};
let seed = 1337;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
await noise("grain-256.png", () => { const v = rnd() > 0.5 ? 255 : 0; return [v, v, v, Math.floor(rnd() * 8) * 20]; });
await noise("paper-grain.png", () => {
  const r = rnd();
  const a = r > 0.55 ? Math.ceil(((r - 0.55) / 0.45) * 4) * 9 : 0;
  const k = 0.7 + Math.floor(rnd() * 3) * 0.15;
  return [Math.round(110 * k), Math.round(80 * k), Math.round(50 * k), a];
});

// Review sheet
const th = 540;
const parts = [
  await sharp(path.join(OUT, "hero-leather.webp")).resize({ height: th, width: 960 }).png().toBuffer(),
  await sharp(path.join(OUT, "hero-film.webp")).resize({ height: th, width: 1080, fit: "cover" }).png().toBuffer(),
  await sharp(path.join(OUT, "record-700.webp")).resize(th, th).png().toBuffer(),
];
const xs = [20, 20 + 960 + 20, 20 + 960 + 20 + 1080 + 20];
await sharp({ create: { width: xs[2] + th + 20, height: th + 40, channels: 3, background: "#0b0b0c" } })
  .composite(parts.map((input, i) => ({ input, left: xs[i], top: 20 })))
  .jpeg({ quality: 85 }).toFile(path.join(OUT, "_review-sheet.jpg"));

console.log("\nfile | dims | KB | notes");
for (const r of rows) console.log(r.join(" | "));
