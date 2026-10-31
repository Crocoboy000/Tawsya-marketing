import { ScrollTrigger, gsap } from '@/lib/animations/setup';
import type { SectionMotion } from '@/lib/animations/useSectionMotion';

import { valueMotion as config } from './config';
import { addContent } from './content';
import { addVisuals } from './visuals';

export const ValueMotion: SectionMotion = (root) => {
  const media = gsap.matchMedia();

  media.add(
    {
      desktop: '(min-width: 1024px)',
      mobile: '(max-width: 1023px)',
    },
    (context) => {
      const desktop = Boolean(context.conditions?.desktop);

      let disposed = false;
      let finished = false;

      const timeline = gsap.timeline({ paused: true });

      const visuals = addVisuals(timeline, root, desktop ? 1 : 0.55);

      addContent(timeline, root);

      // بعد إضافة جميع حركات القسم.
      timeline.call(() => {
        visuals.startFloating();
      });

      function lockFinishedAnimation() {
        if (disposed || finished || timeline.totalProgress() < 1 || !trigger) {
          return;
        }

        finished = true;
        finished = true;

        trigger.disable(false);
        visuals.startFloating();
      }

      timeline.eventCallback('onComplete', lockFinishedAnimation);

      lockFinishedAnimation();

      const trigger = ScrollTrigger.create({
        trigger: root,
        animation: timeline,
        start: config.scroll.start,

        end: () => {
          const distance = gsap.utils.clamp(
            config.scroll.minDistance,
            config.scroll.maxDistance,
            window.innerHeight * config.scroll.viewportDistance,
          );

          return `clamp(+=${distance})`;
        },
        invalidateOnRefresh: true,
      });

      // Covers initial loading at an already-completed scroll position.
      lockFinishedAnimation();

      function refresh() {
        if (!disposed && !finished) trigger?.refresh();
      }

      const images = Array.from(root.querySelectorAll<HTMLImageElement>('img'));

      for (const image of images) {
        image.addEventListener('load', refresh);
      }

      void document.fonts.ready.then(refresh);

      // Keyboard navigation must never leave the focused CTA clipped.
      function revealOnFocus() {
        if (finished) return;
        timeline.totalProgress(1);
        lockFinishedAnimation();
      }

      root.addEventListener('focusin', revealOnFocus);

      return () => {
        disposed = true;

        root.removeEventListener('focusin', revealOnFocus);

        for (const image of images) {
          image.removeEventListener('load', refresh);
        }

        // GSAP's matchMedia context reverts its animations/triggers.
      };
    },
    root,
  );

  return () => media.revert();
};
