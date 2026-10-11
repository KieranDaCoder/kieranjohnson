"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const INTERVAL = 3000; // visible time per image
const IMG_CLASS = "object-cover";

// Shared wall clock: tiles with the same offset always show the same image,
// so duplicate carousel copies stay in sync.
function clockIndex(n: number, offset: number) {
  return Math.floor((Date.now() + offset) / INTERVAL) % n;
}

type Props = {
  images: string[];
  alt: string;
  sizes: string;
  eager?: boolean;
  offset?: number;
};

export function TileImages({ images, alt, sizes, eager = false, offset = 0 }: Props) {
  if (images.length < 2) {
    const src = images[0];
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        draggable={false}
        loading={eager ? "eager" : undefined}
        unoptimized={src.endsWith(".svg")}
        className={`${IMG_CLASS} transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
      />
    );
  }
  return <Rotator images={images} alt={alt} sizes={sizes} eager={eager} offset={offset} />;
}

function Rotator({ images, alt, sizes, eager, offset = 0 }: Props) {
  const n = images.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // True for one frame when a tile re-enters at the edge: switch without a visible fade.
  const [snap, setSnap] = useState(false);
  const loaded = useRef<boolean[]>(images.map(() => false));
  const [loadedTick, setLoadedTick] = useState(0);

  const markLoaded = (i: number) => {
    if (loaded.current[i]) return;
    loaded.current[i] = true;
    setLoadedTick((t) => t + 1);
  };

  // Images that finished loading before hydration never fire onLoad.
  useEffect(() => {
    ref.current?.querySelectorAll("img").forEach((img, i) => {
      if (img.complete && img.naturalWidth > 0) markLoaded(i);
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let inView = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const sync = (instant = false) => {
      if (instant) {
        setSnap(true);
        requestAnimationFrame(() => requestAnimationFrame(() => setSnap(false)));
      }
      const target = clockIndex(n, offset);
      // Only advance to an image that has loaded; otherwise keep the current one.
      setActive((cur) => (loaded.current[target] ? target : cur));
    };
    const stop = () => {
      if (timer) clearTimeout(timer);
      timer = undefined;
    };
    const schedule = () => {
      stop();
      if (!inView || document.hidden) return;
      const wait = INTERVAL - ((Date.now() + offset) % INTERVAL);
      timer = setTimeout(() => {
        sync();
        schedule();
      }, wait + 5);
    };
    const resume = (instant = false) => {
      if (inView && !document.hidden) {
        sync(instant);
        schedule();
      } else stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const entering = entry.isIntersecting && !inView;
        inView = entry.isIntersecting;
        resume(entering && entry.intersectionRatio < 0.5);
      },
      { threshold: [0, 0.5] },
    );
    io.observe(el);
    const onVis = () => resume();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      stop();
    };
  }, [n, offset, loadedTick]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? alt : ""}
          aria-hidden={i === 0 ? undefined : true}
          fill
          sizes={sizes}
          draggable={false}
          loading={i === 0 && !eager ? undefined : "eager"}
          unoptimized={src.endsWith(".svg")}
          onLoad={() => markLoaded(i)}
          className={IMG_CLASS}
          style={{
            opacity: i === active ? 1 : 0,
            transition: snap ? "none" : "opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      ))}
    </div>
  );
}
