'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from './setup';

export type SectionMotion = (root: HTMLElement) => (() => void) | undefined;

export function useSectionMotion(build: SectionMotion) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => build(root), root);

      return () => mm.revert();
    },
    { scope: ref, dependencies: [build], revertOnUpdate: true },
  );

  return ref;
}
