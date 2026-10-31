import { motion } from '@/lib/animations/tokens';

export const heroMotion = {
  text: {
    duration: motion.duration.slow,
    ease: motion.ease.enter,
    yPercent: -110,
    stagger: 0.3,
  },

  keyword: {
    start: 0.5,
    duration: motion.duration.fast,

    hiddenClip: 'inset(100% -25% 0% -25%)',
    visibleClip: 'inset(-25% -25% -25% -25%)',
  },

  subtitle: {
    start: 0.8,
    duration: motion.duration.fast,
    stagger: 0.015,
  },

  card: {
    startScale: 0,
    duration: motion.duration.quick,
    ease: 'bounce.inOut',
  },

  connector: {
    duration: 0.2,
    ease: 'none',
  },

  action: {
    duration: motion.duration.fast,
    y: motion.distance.base,
    ease: motion.ease.emil.enter,
  },

  imageWaitLimitMs: 1500,
} as const;
