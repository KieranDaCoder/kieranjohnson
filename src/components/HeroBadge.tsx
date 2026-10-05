"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

const FRONT = "/assets/3d/card-front.jpg";
const BACK = "/assets/3d/card-back.png";
const STRAP = "/assets/3d/strap.png";
const CAM_Z = 21;
const FOV = 20;
const ANCHOR_AT = 0.9;

// Static card shown while the 3D scene loads, on small screens, and for reduced motion.
function StaticCard({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FRONT}
        alt="Kieran Johnson"
        className="w-full rotate-3 shadow-2xl"
      />
    </div>
  );
}

const Lanyard = dynamic(() => import("@/components/react-bits/Lanyard"), {
  ssr: false,
  loading: () => <StaticCard className="absolute right-[6%] top-24 w-[min(18rem,22%)]" />,
});

// Draggable physics badge (desktop). Pauses when scrolled out of view.
export function HeroBadge() {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [anchorX, setAnchorX] = useState(3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);

    // The canvas spans the whole hero so the badge can be dragged anywhere; hang
    // it from a point ANCHOR_AT of the way across (world units at the camera's depth).
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const halfWidth = Math.tan((FOV * Math.PI) / 360) * CAM_Z * (width / height);
      setAnchorX((ANCHOR_AT * 2 - 1) * halfWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* Phones: static card in the empty space above the name. */}
      <StaticCard className="absolute right-6 top-40 w-[44%] max-w-[13rem] md:hidden" />

      <div ref={ref} className="absolute inset-0 z-[3] hidden md:block">
        {reduce ? (
          <StaticCard className="absolute right-[6%] top-24 w-[min(18rem,22%)]" />
        ) : (
          <Lanyard
            position={[0, 0, CAM_Z]}
            fov={FOV}
            anchorX={anchorX}
            scrollSwing
            frontImage={FRONT}
            backImage={BACK}
            lanyardImage={STRAP}
            lanyardWidth={1.5}
            imageFit="cover"
            frameloop={visible ? "always" : "never"}
          />
        )}
      </div>
    </>
  );
}
