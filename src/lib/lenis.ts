import type Lenis from "lenis";

// Holds the active Lenis instance so other components can pause/resume scrolling.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
