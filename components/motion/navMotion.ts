import { gsap } from '@/lib/animations/setup';
import { motion } from '@/lib/animations/tokens';
import type { SectionMotion } from '@/lib/animations/useSectionMotion';

export const NavMotion: SectionMotion = (root) => {
  const logo = root.querySelector('img');
  const links = root.querySelectorAll('nav li');
  const action = root.querySelector(':scope > a, :scope > button');

  const timeline = gsap.timeline({
    defaults: {
      ...motion.preset.navbar,
    },
  });

  // الحركة الأساسية: نزول سريع ثم استقرار ناعم.
  timeline.from(
    root,
    {
      ...motion.from.fade,
      ...motion.from.above(motion.distance.large),

      duration: motion.duration.base,
      ease: motion.ease.emil.enter,
    },
    0,
  );

  // الشعار يظهر أثناء النزول.
  if (logo) {
    timeline.from(
      logo,
      {
        ...motion.from.fade,
        ...motion.from.scale,

        transformOrigin: motion.origin.center,
      },
      0.1,
    );
  }

  // الروابط تتكشف كموجة قصيرة.
  if (links.length) {
    timeline.from(
      links,
      {
        ...motion.from.fade,
        ...motion.from.above(motion.distance.list),

        stagger: { ...motion.stagger.tight },
      },
      0.15,
    );
  }

  // ظهور الزر دون التنافس مع hover transforms.
  if (action) {
    timeline.from(
      action,
      {
        ...motion.from.fade,
      },
      0.2,
    );
  }

  return undefined;
};
