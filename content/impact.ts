import type { ImpactGridContent, ImpactHeadingContent, ImpactJourneyContent } from '@/types';

export const headingContent = {
  eyebrow: 'Why Tawsya?',
  title: 'What happens after the recommendation?',

  metric: {
    value: '3',
    description: 'Signals. One clear journey',
  },
} satisfies ImpactHeadingContent;

export const gridContent = {
  ranking: {
    value: '8+',
    description: 'Ranked list of your recommended products',

    items: [
      {
        id: 'clicked',
        label: 'Most clicked products',
      },
      {
        id: 'ordered',
        label: 'Top ordered products',
      },
      {
        id: 'profit',
        label: 'Best profit products',
      },
    ],
  },

  images: {
    kettle: {
      src: '/impact/impact-kettle.webp',
      alt: 'Olive-green kettle on a sunlit stone countertop',
      position: '50% 65%',
    },

    coffee: {
      src: '/impact/impact-coffe.webp',
      alt: 'Coffee bags and an espresso cup in warm natural light',
      position: '50% 65%',
    },
  },

  insight: {
    title: 'Turn interest into insight.',
    description: 'See which recommendations earn attention, then the next click.',
  },

  analytics: {
    title: 'One journey. Every signal',
    description: 'Follow shoppers from discovery to cart',

    metrics: [
      {
        id: 'views',
        value: '2,400',
        label: 'Views',
      },
      {
        id: 'clicks',
        value: '168',
        label: 'Clicks',
      },
      {
        id: 'cart',
        value: '42',
        label: 'Cart adds',
      },
    ],

    footer: 'Know what gets seen, chosen, and added.',
  },
} satisfies ImpactGridContent;

export const journeyContent = {
  eyebrow: 'Your next discovery',
  title: 'Make the next click count.',
  description: 'Explore how a thoughtful recommendation turns browsing into a shopping journey.',
  action: {
    label: 'Explore the demo',
    href: '#demo',
  },
  background: '/impact/impact-banner.webp',
} satisfies ImpactJourneyContent;

export const impactDecoration = {
  topRight: '/impact/olive-top.webp',
  bottomLeft: '/impact/olive-bottom.webp',
} as const;
