import { gsap } from '@/lib/animations/setup';
import { motion } from '@/lib/animations/tokens';

export function buildLeafClick(root: HTMLElement) {
  const left = root.querySelector('[data-leaf="body"] [data-leaf="left"]');

  const right = root.querySelector('[data-leaf="body"] [data-leaf="right"]');

  if (!left || !right) return null;

  const { click, rest } = motion.cursor;

  gsap.set([left, right], {
    svgOrigin: click.svgOrigin,
  });

  return gsap
    .timeline({ paused: true })
    .to(left, {
      ...click.open.left,
      duration: click.open.duration,
      ease: click.open.ease,
    })
    .to(
      right,
      {
        ...click.open.right,
        duration: click.open.duration,
        ease: click.open.ease,
      },
      motion.position.together,
    )
    .to([left, right], {
      ...rest,
      ...click.close,
    });
}
