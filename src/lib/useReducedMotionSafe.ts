"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribe = () => () => {};

// framer-motion reads the media query during the first client render, which
// differs from the server HTML. Report the preference only once hydrated so the
// first render always matches and hydration stays clean.
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return hydrated && !!reduce;
}
