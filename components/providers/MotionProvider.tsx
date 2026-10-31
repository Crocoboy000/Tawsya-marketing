// components/providers/MotionProvider.tsx

'use client';

import Lenis from 'lenis';
import { type ReactNode, useEffect } from 'react';

import { initializeMotion } from '@/lib/animations/initialize';
import { scrollConfig } from '@/lib/animations/scroll-config';
import { ScrollTrigger, gsap } from '@/lib/animations/setup';

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  useEffect(() => {
    initializeMotion();

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

    let disposeLenis: (() => void) | undefined;

    function syncPreference() {
      disposeLenis?.();
      disposeLenis = undefined;

      // Native scrolling when reduced motion is requested.
      if (preference.matches) {
        ScrollTrigger.refresh();
        return;
      }

      const lenis = new Lenis(scrollConfig);

      function updateScrollTrigger() {
        ScrollTrigger.update();
      }

      function tick(time: number) {
        lenis.raf(time * 1000);
      }

      function resizeLenis() {
        lenis.resize();
      }

      lenis.on('scroll', updateScrollTrigger);
      gsap.ticker.add(tick);

      ScrollTrigger.addEventListener('refresh', resizeLenis);
      ScrollTrigger.refresh();

      disposeLenis = () => {
        gsap.ticker.remove(tick);

        ScrollTrigger.removeEventListener('refresh', resizeLenis);

        lenis.off('scroll', updateScrollTrigger);
        lenis.destroy();
      };
    }

    syncPreference();

    preference.addEventListener('change', syncPreference);

    return () => {
      preference.removeEventListener('change', syncPreference);
      disposeLenis?.();
    };
  }, []);

  return <>{children}</>;
}
