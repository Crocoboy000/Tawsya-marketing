import type { gsap } from '@/lib/animations/setup';
import { valueMotion as config } from './config';

export function addContent(timeline: gsap.core.Timeline, root: HTMLElement) {
  const heading = root.querySelector<HTMLElement>('[data-value="heading"]');
  const subtitle = root.querySelector<HTMLElement>('[data-value="subtitle"]');
  const action = root.querySelector<HTMLElement>('[data-value="action"]');

  function slideFromLeft(element: HTMLElement, at: number) {
    timeline.from(
      element,
      {
        x: () => {
          const mask = element.closest<HTMLElement>('[data-value-mask]');

          return -((mask?.clientWidth ?? element.clientWidth) + config.text.extraDistance);
        },
        duration: config.text.duration,
        ease: config.text.ease,
      },
      at,
    );
  }

  if (heading) slideFromLeft(heading, config.sequence.details);
  if (subtitle) slideFromLeft(subtitle, config.sequence.subtitle);

  if (action) {
    timeline.from(
      action,
      {
        y: config.action.y,
        duration: config.action.duration,
        ease: config.action.ease,
      },
      config.sequence.action,
    );
  }
}
