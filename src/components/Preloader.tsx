"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// skiper8-style intro: a sleek white panel with black text that flickers through
// "hello" in different languages, then swipes up to reveal the page. Once per
// session. The word "hello" translated:
const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Olá",
  "こんにちは",
  "안녕하세요",
  "Guten Tag",
];

export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    // Start exactly once (guards against React Strict Mode's double-invoke).
    if (started.current) return;
    started.current = true;

    if (sessionStorage.getItem("introSeen") || reduce) {
      setVisible(false);
      sessionStorage.setItem("introSeen", "1");
      return;
    }

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      i += 1;
      if (i < greetings.length) {
        setIndex(i);
        timers.push(setTimeout(tick, 320));
      } else {
        // Hold on the last greeting a beat, then swipe the panel up.
        timers.push(
          setTimeout(() => {
            sessionStorage.setItem("introSeen", "1");
            setVisible(false);
          }, 420),
        );
      }
    };
    timers.push(setTimeout(tick, 320));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              className="display text-5xl text-black md:text-7xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
            >
              {greetings[index]}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
