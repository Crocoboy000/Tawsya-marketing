'use client';

// أبقِ مسارات استيراد بياناتك الفعلية.
import { heroHeader, heroVisuel } from '@/content/hero';
import { useSectionMotion } from '@/lib/animations/useSectionMotion';

import HeroAction from './HeroAction';
import HeroHeader from './HeroHeader';
import HeroVisuel from './HeroVisuel';
import { HeroMotion } from './motion';

export default function Hero() {
  const heroRef = useSectionMotion(HeroMotion);

  return (
    <section
      ref={heroRef}
      className="flex justify-around z-10 px-8 mt-10 flex-col w-full h-full gap-2 items-center"
    >
      <HeroHeader {...heroHeader} />
      <HeroVisuel cards={heroVisuel} />
      <HeroAction />
    </section>
  );
}
