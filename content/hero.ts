import type { heroContentType, heroVisuelType } from '@/types';

export const heroHeader: heroContentType = {
  title: 'Turn glances into',
  heading: 'Revenue',
  subtitle: 'Recommend the right products, then follow every glance to checkout.',
};

// Left-to-right order; Seen and Ordered sit behind the pair in front.
export const heroVisuel: heroVisuelType = [
  { image: 'chairCard.webp', isBehind: true },
  { image: 'glassesCard.webp', isBehind: false },
  { image: 'coffeCard.webp', isBehind: false },
  { image: 'kettleCard.webp', isBehind: true },
];
