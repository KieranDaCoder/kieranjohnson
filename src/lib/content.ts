import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// All visible copy lives in /content (written by Kieran). This module only
// reads it; it never supplies wording of its own.

const ROOT = path.join(process.cwd(), "content");

function read(file: string) {
  return readFileSync(path.join(ROOT, file), "utf8");
}

// Plain paragraphs separated by blank lines. No markdown beyond that.
function paragraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);
}

export type Home = { quote: string; coreInfo: string; contactLine: string };

export function getHome(): Home {
  return JSON.parse(read("home.json"));
}

export function getAbout(): string[] {
  return paragraphs(read("about.md"));
}

export type ContactLink = { platform: string; handle: string; url: string };

export function getContacts(): ContactLink[] {
  return JSON.parse(read("contact.json"));
}

export type ProjectImage = { src: string; alt: string; width: number; height: number };

// Pixel size of a PNG or JPEG in /public, read from the file header, so pages can
// reserve the right box before the image loads (next/image needs real dimensions).
function imageSize(src: string): { width: number; height: number } {
  const buf = readFileSync(path.join(process.cwd(), "public", src));
  if (buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
    }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  throw new Error(`Cannot read image size: ${src}`);
}

export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  order: number;
  type: "strategy" | "creative";
  tile: string;
  hero: string;
  // "whole": show the hero at its own proportions (never cropped or stretched), centred, instead of a full-width 16:9 frame.
  heroFit: "cover" | "whole";
  heroSize: { width: number; height: number } | null;
  alt: string;
  summary: string;
  // Optional images shown between body sections, in order.
  images: ProjectImage[];
  // Text before the first "##" heading, shown under the hero image.
  intro: string[];
  // Body split on "## " headings: Challenge / Insight / Solution (strategy)
  // or Insight / Big idea / Execution (creative).
  sections: { heading: string; body: string[] }[];
};

function parseSections(body: string) {
  return body
    .split(/^##\s+/m)
    .slice(1)
    .map((chunk) => {
      const [heading, ...rest] = chunk.split("\n");
      return { heading: heading.trim(), body: paragraphs(rest.join("\n")) };
    });
}

let cache: Project[] | null = null;

export function getProjects(): Project[] {
  if (cache) return cache;
  const dir = path.join(ROOT, "projects");
  cache = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(read(path.join("projects", f)));
      return {
        title: String(data.title),
        slug: String(data.slug ?? f.replace(/\.md$/, "")),
        category: data.category ? String(data.category) : "",
        year: data.year ? String(data.year) : "",
        order: Number(data.order ?? 0),
        type: data.type === "creative" ? "creative" : "strategy",
        tile: String(data.tile),
        hero: String(data.hero ?? data.tile),
        heroFit: data.heroFit === "whole" ? "whole" : "cover",
        heroSize:
          data.heroFit === "whole" && !String(data.hero).endsWith(".svg") ? imageSize(String(data.hero)) : null,
        // Empty alt falls back to the project title so images are never unlabelled.
        alt: String(data.alt || data.title),
        summary: String(data.summary ?? ""),
        images: (Array.isArray(data.images) ? data.images : []).map((i: { src: string; alt?: string }) => ({
          ...i,
          alt: i.alt || String(data.title),
          ...imageSize(i.src),
        })),
        intro: paragraphs(content.split(/^##\s+/m)[0]),
        sections: parseSections(content),
      } satisfies Project;
    })
    .sort((a, b) => a.order - b.order);
  return cache;
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}
