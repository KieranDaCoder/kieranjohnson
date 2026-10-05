"use client";

import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

type Props = {
  onPlay?: () => void;
  hidden?: boolean;
  className?: string;
};

export function PlayButton({ onPlay, hidden = false, className = "" }: Props) {
  const reduce = useReducedMotionSafe();
  const ringAnim = (delay: string) =>
    reduce ? { opacity: 0.2 } : { animation: `kj-ring-pulse 3.5s ease-in-out ${delay} infinite` };

  return (
    <div
      className={`relative ${className}`}
      style={{
        width: "clamp(150px, 22vw, 340px)",
        height: "clamp(150px, 22vw, 340px)",
        visibility: hidden ? "hidden" : undefined,
      }}
      aria-hidden={hidden || undefined}
    >
      <style>{`@keyframes kj-ring-pulse{0%,100%{opacity:.12}50%{opacity:.35}}
.kj-play{transition:transform 200ms ease,filter 200ms ease}
.kj-play:hover{transform:scale(1.03);filter:brightness(1.06)}`}</style>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-cream"
        style={{
          width: "118%",
          height: "118%",
          transform: "translate(-50%, -50%)",
          ...ringAnim("0s"),
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 rounded-full border border-cream"
        style={{
          width: "138%",
          height: "138%",
          transform: "translate(-50%, -50%)",
          ...ringAnim("1.2s"),
        }}
      />
      <button
        type="button"
        aria-label="Play: start a guided tour of the site"
        onClick={onPlay}
        tabIndex={hidden ? -1 : undefined}
        className="kj-play absolute inset-0 flex items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle at 32% 28%, #F2B45A, #D98E2B 45%, #A8661C 100%)",
          boxShadow:
            "inset 0 -10px 24px rgba(42,27,18,0.45), inset 0 8px 18px rgba(255,230,180,0.35), 0 30px 60px rgba(0,0,0,0.45)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ width: "28%", height: "28%", marginLeft: "4%" }}
        >
          <path
            d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"
            fill="#2A1B12"
            stroke="#2A1B12"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="mono-label pointer-events-none absolute left-1/2 top-full mt-8 w-max -translate-x-1/2 text-center leading-relaxed text-cream/80 lg:mt-12">
        PRESS PLAY
        <br />
        or just scroll ↓
      </p>
    </div>
  );
}
