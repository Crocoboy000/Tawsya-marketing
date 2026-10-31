import { ScrollTrigger, gsap } from '@/lib/animations/setup';
import type { SectionMotion } from '@/lib/animations/useSectionMotion';

import { impactMotion as config } from './config';
import { pinPreviousSection } from './panel';
import { addImages } from './visuals';

export const ImpactMotion: SectionMotion = (root) => {
  // Create the pin first, before the image ScrollTrigger.
  pinPreviousSection(root);

  const timeline = gsap.timeline({ paused: true });

  addImages(timeline, root);

  ScrollTrigger.create({
    trigger: root,
    animation: timeline,
    start: config.panel.start,
    end: config.panel.end,
    invalidateOnRefresh: true,
  });

  return undefined;
};
