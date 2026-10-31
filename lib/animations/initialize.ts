import { gsap } from './setup';

let initialized = false;

export function initializeMotion() {
  if (initialized || typeof window === 'undefined') return;

  initialized = true;

  // Application-wide ticker policy for the Lenis integration.
  gsap.ticker.lagSmoothing(0);
}
