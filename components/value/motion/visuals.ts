import { gsap } from '@/lib/animations/setup';
import { valueMotion as config } from './config';

export function addVisuals(timeline: gsap.core.Timeline, root: HTMLElement, distanceScale = 1) {
  const select = gsap.utils.selector(root);

  timeline.from(
    select('[data-value="product"]'),
    {
      yPercent: 100,
      duration: config.product.duration,
      ease: config.product.ease,
    },
    config.sequence.product,
  );

  const layers = [
    { target: 'scene', y: config.parallax.sceneY },
    { target: 'leaf-top', y: config.parallax.topLeafY },
    { target: 'leaf-bottom', y: config.parallax.bottomLeafY },
  ];

  for (const layer of layers) {
    timeline.from(
      select(`[data-value="${layer.target}"]`),
      {
        y: layer.y * distanceScale,
        duration: config.parallax.duration,
        ease: 'none',
      },
      config.sequence.details,
    );
  }

  const distance = config.float.distance * distanceScale;

  const floating = gsap.timeline({
    paused: true,
    repeat: -1,
    yoyo: true,
    defaults: {
      duration: config.float.duration,
      ease: config.float.ease,
    },
  });

  floating
    .to(select('[data-value="leaf-top"]'), { y: -distance }, 0)
    .to(select('[data-value="leaf-bottom"]'), { y: distance }, 0);

  return {
    startFloating: () => {
      floating.play();
    },
  };
}
