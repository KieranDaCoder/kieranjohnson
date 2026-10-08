import Image from "next/image";
import { HERO_MODE } from "@/components/hero.config";

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

export function Hero() {
  // HERO_MODE switch — "billboard" renders the same fallback for now;
  // tomorrow's agent fills in the billboard-panel branch here.
  if (HERO_MODE === "billboard") {
    return <SimpleHero />;
  }
  return <SimpleHero />;
}
