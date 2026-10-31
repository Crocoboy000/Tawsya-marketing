import { motion } from '@/lib/animations/tokens';

export const valueMotion = {
  scroll: {
    start: 'top 45%',
    viewportDistance: 0.7,
    minDistance: 360,
    maxDistance: 640,
  },

  sequence: {
    product: 0,
    details: 0.4,
    subtitle: 0.6,
    action: 0.7,
  },

  product: {
    duration: 0.9,
    ease: motion.ease.emil.move,
  },

  text: {
    duration: 0.82,
    ease: 'power3.out',
    // Also clears the decorative leaf extending beyond the heading.
    extraDistance: 160,
  },

  action: {
    y: 70,
    duration: 0.58,
    ease: 'power2.out',
  },

  parallax: {
    duration: 0.95,
    sceneY: 18,
    topLeafY: 42,
    bottomLeafY: -32,
  },
  zoom: {
    scale: 1.08,

    // Bottom-center of the actual portal, measured from the image.
    originX: 0.5773,
    originY: 0.7981,
  },

  window: {
    clip: `polygon(
      57.73% 5.22%,
      63.25% 5.52%,
      68.70% 6.28%,
      74.00% 7.53%,
      78.43% 9.04%,
      82.86% 11.05%,
      87.15% 13.56%,
      90.99% 16.57%,
      94.41% 20.09%,
      97.10% 24.11%,
      98.84% 28.13%,
      99.78% 32.14%,
      99.78% 35.16%,
      99.78% 77.85%,
      99.35% 78.60%,
      98.33% 79.36%,
      96.59% 79.81%,
      18.52% 79.81%,
      17.07% 79.36%,
      16.05% 78.60%,
      15.76% 77.85%,
      15.69% 35.16%,
      15.69% 32.14%,
      16.56% 28.13%,
      18.23% 24.11%,
      20.99% 20.09%,
      24.40% 16.57%,
      28.25% 13.56%,
      32.68% 11.05%,
      37.04% 9.04%,
      41.98% 7.53%,
      46.77% 6.28%,
      52.21% 5.52%
    )`,
  },

  float: {
    distance: 7.8,
    duration: 0.8,
    ease: motion.ease.float,
  },
} as const;
