// Static, name-forward hero (dennissnellenberg.com-style): a full-bleed looping
// video with the name composited into the footage via a blend mode. No
// parallax, no scroll motion, no mouse tracking — only the video itself moves.
export function Hero() {
  return (
    <section className="relative left-1/2 -ml-[50vw] -mt-14 h-screen w-screen overflow-hidden md:-mt-20">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/hero/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero/waterfall.mp4" type="video/mp4" />
      </video>

      {/* Darkening + centre vignette so the white name stays legible against
          bright water/foliage. */}
      <div className="pointer-events-none absolute inset-0 bg-black/30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 60%)" }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="display text-6xl leading-[0.95] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] sm:text-7xl md:text-8xl lg:text-9xl">
          Kieran Johnson
        </h1>
        <p className="mt-5 text-base text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] md:text-lg">
          PR &amp; Advertising
        </p>
      </div>

      {/* Blend the bottom edge into the page background below. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[var(--color-bg)]" />
    </section>
  );
}
