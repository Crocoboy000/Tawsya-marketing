import { cn } from '@/lib/utils';
import Image from 'next/image';
import Path from './paths/Path';
import Path2 from './paths/Path2';
import Path3 from './paths/Path3';

const CARD_DIMENSIONS = {
  'chairCard.webp': { width: 509, height: 339 },
  'glassesCard.webp': { width: 713, height: 872 },
  'coffeCard.webp': { width: 750, height: 745 },
  'kettleCard.webp': { width: 442, height: 491 },
} as const;

export type HeroCard = {
  image: keyof typeof CARD_DIMENSIONS;
  isBehind: boolean;
};

export default function HeroVisuel({ cards }: { cards: readonly HeroCard[] }) {
  function renderCard({ image, isBehind }: HeroCard, index: number, frontZ: string) {
    return (
      <Image
        key={image}
        data-hero-card={index}
        src={`/hero/${image}`}
        alt=""
        {...CARD_DIMENSIONS[image]}
        loading="eager"
        className={cn(
          'relative h-auto select-none',
          isBehind
            ? 'scale-90 size-[36%] lg:mb-10 lg:size-[38%]'
            : `${frontZ} size-[60%] lg:mt-20 scale-155 lg:size-[51%]`,
        )}
      />
    );
  }

  return (
    <div
      data-motion="hero-visuel"
      className="mx-auto relative flex w-full mb-25 max-w-lg flex-wrap items-center gap-15 justify-center lg:max-w-6xl lg:flex-nowrap"
    >
      <div className="relative flex h-full w-full justify-end">
        <Path
          data-hero-path="0"
          aria-hidden="true"
          focusable="false"
          width={139}
          height={85}
          className="pointer-events-none absolute h-auto md:rotate-0 lg:rotate-10 left-[30%] lg:left-[40%] top-[2%] z-5 w-[20%] md:w-[20%] lg:w-[32%]"
        />
        {cards.slice(0, 2).map((card, index) => renderCard(card, index, 'z-10'))}
      </div>

      <Path2
        data-hero-path="1"
        aria-hidden="true"
        focusable="false"
        width={89}
        height={55}
        className="pointer-events-none w-auto h-auto absolute top-[32%] z-12"
      />

      <div className="flex relative w-full">
        <Path3
          data-hero-path="2"
          aria-hidden="true"
          focusable="false"
          width={139}
          height={85}
          className="pointer-events-none h-auto z-13 absolute lg:-rotate-30 left-[30%] lg:left-[35%] lg:top-[15%] w-[20%] md:w-[20%] lg:w-[32%]"
        />
        {cards.slice(2, 4).map((card, index) => renderCard(card, index + 2, 'z-15'))}
      </div>
    </div>
  );
}
