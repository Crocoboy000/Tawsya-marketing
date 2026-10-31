import type { gsap } from '@/lib/animations/setup';
import { impactMotion as config } from './config';

export function addImages(timeline: gsap.core.Timeline, root: HTMLElement) {
  const images = [
    {
      name: 'kettle',
      ...config.images.kettle,
    },
    {
      name: 'coffee',
      ...config.images.coffee,
    },
  ] as const;

  for (const image of images) {
    const target = root.querySelector<HTMLElement>(`[data-impact-image="${image.name}"]`);

    if (!target) continue;

    timeline.fromTo(
      target,
      {
        xPercent: image.xPercent,
      },
      {
        xPercent: 0,
        duration: config.images.duration,
        ease: config.images.ease,
      },
      image.at,
    );
  }
}
