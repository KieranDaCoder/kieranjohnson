import Image from "next/image";
import { PlayButton } from "./PlayButton";

const glowVars =
  "[--gx:50%] [--gy:70%] lg:[--gx:74%] lg:[--gy:46%]";

export function Hero() {
  return (
    <section
      id="home"
      data-section="home"
      className={`relative isolate h-svh min-h-[640px] w-full overflow-hidden bg-leather ${glowVars}`}
    >
      <Image
        src="/img/hero-leather.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, #1A0F08 100%), linear-gradient(to right, rgba(26,15,8,0.55), transparent 55%), radial-gradient(ellipse 75% 70% at 70% 46%, transparent 20%, rgba(26,15,8,0.6) 60%, rgba(26,15,8,0.95) 100%), rgba(26,15,8,0.45)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--gx) var(--gy), rgba(242,180,90,0.75), rgba(217,142,43,0.18) 28%, transparent 55%)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at var(--gx) var(--gy), rgba(242,180,90,0.38), rgba(217,142,43,0.16) 22%, transparent 42%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/img/hero-film.webp)",
          backgroundSize: "cover",
          mixBlendMode: "screen",
          opacity: 0.16,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(/img/grain-256.png)",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
          opacity: 0.05,
        }}
      />

      <div
        className="relative z-10 flex h-full flex-col px-6 pb-10 sm:px-10 lg:justify-end lg:pb-12"
        style={{ paddingTop: "calc(var(--nav-h) + 1rem)" }}
      >
        <div className="lg:max-w-[60vw]">
          <h1
            className="display text-cream max-lg:!text-[min(24vw,30svh)]"
            style={{
              fontSize: "min(17vw, calc((100svh - 76px - 16rem) / 1.9))",
              lineHeight: 0.9,
              textShadow: "0 2px 30px rgba(0,0,0,0.35)",
            }}
          >
            KIERAN
            <br />
            JOHNSON
          </h1>
          <p
            className="mt-5 font-medium text-cream"
            style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
          >
            Comms student, serial <span className="whitespace-nowrap">new-thing-starter.</span>
          </p>
          <p
            className="mt-2 font-normal text-cream/80"
            style={{ fontSize: "clamp(1rem, 1.6vw, 1.4rem)" }}
          >
            If it&apos;s new, I&apos;m probably already learning it.
          </p>
        </div>

        <PlayButton className="mx-auto my-auto mb-24 mt-10 lg:absolute lg:left-[74%] lg:top-[46%] lg:m-0 lg:-translate-x-1/2 lg:-translate-y-1/2 max-lg:!h-[160px] max-lg:!w-[160px]" />

        <p className="mono-label mt-auto text-[0.7rem] text-cream/70 sm:text-xs lg:mt-8">
          SIDE A &nbsp;•&nbsp; KJ-001 &nbsp;•&nbsp; MELBOURNE
        </p>
      </div>
    </section>
  );
}
