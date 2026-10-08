import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { HERO_MODE } from "@/components/hero.config";
import { BillboardHero } from "@/components/BillboardHero";

// Fallback hero: near-black ground, name + title beside a square portrait.
// No scene, no animation beyond the page-load fade-in. This is the version
// guaranteed to ship; billboard mode (HERO_MODE === "billboard") falls back
// to this same markup until that branch is built.
function SimpleHero() {
  return (
    <section
      data-hero
      data-dark
      className="fade-in flex h-[92svh] min-h-[600px] w-full flex-col justify-center bg-black px-6 py-16 text-white md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative order-1 aspect-square w-full max-w-[420px] overflow-hidden md:order-2 md:ml-auto md:max-w-none">
          <Image
            src="/profile/kieran.jpg"
            alt="Kieran Johnson"
            fill
            priority
            sizes="(max-width: 768px) 90vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="order-2 md:order-1">
          <h1
            className="font-semibold"
            style={{ fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 1, fontWeight: 600 }}
          >
            Kieran Johnson
          </h1>
          <p className="t-body mt-3 text-white/80">Junior Strategist</p>
        </div>
      </div>
    </section>
  );
}

type HeroMeta = {
  blur?: { "hero-desktop"?: string; "hero-mobile"?: string };
};

// public/hero/ is gitignored (the wall photo is unlicensed until bought), so
// on Vercel these files don't exist. Read the filesystem directly — never
// `import` from public/hero, that would fail the build when it's absent.
function readHeroMeta(): HeroMeta | null {
  try {
    const dir = path.join(process.cwd(), "public", "hero");
    const hasDesktop =
      existsSync(path.join(dir, "hero-desktop.avif")) && existsSync(path.join(dir, "hero-desktop.webp"));
    const hasMobile =
      existsSync(path.join(dir, "hero-mobile.avif")) && existsSync(path.join(dir, "hero-mobile.webp"));
    const metaPath = path.join(dir, "meta.json");
    if (!hasDesktop || !hasMobile || !existsSync(metaPath)) return null;
    return JSON.parse(readFileSync(metaPath, "utf8"));
  } catch {
    return null;
  }
}

export function Hero() {
  if (HERO_MODE === "simple") {
    return <SimpleHero />;
  }

  const meta = readHeroMeta();

  return (
    <section data-hero data-dark className="relative">
      {/* Accessibility/SEO: the board is aria-hidden tiles, so the real
          heading lives here instead, visually hidden with the standard
          clip-rect sr-only pattern (stays in the a11y tree, unlike
          display:none/opacity:0). */}
      <h1 className="sr-only">Kieran Johnson</h1>
      <p className="sr-only">Junior Strategist</p>
      <BillboardHero
        hasWall={meta !== null}
        blur={{ desktop: meta?.blur?.["hero-desktop"], mobile: meta?.blur?.["hero-mobile"] }}
      />
    </section>
  );
}
