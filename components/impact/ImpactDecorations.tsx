import Image from 'next/image';

import { impactDecoration } from '@/content/impact';

export function ImpactDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0  z-0 overflow-hidden select-none"
    >
      <div
        data-motion="impact-olive-top"
        className="absolute -right-10 -top-10 h-40 w-40  sm:h-56 sm:w-56 lg:-right-25 lg:-top-16 lg:h-90 lg:w-90 xl:w-120"
      >
        <Image
          src={impactDecoration.topRight}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 224px, 160px"
          className="object-contain object-top-right"
        />
      </div>

      {/*<div
        data-motion="impact-olive-bottom"
        className="absolute -bottom-10 -left-12 h-44 w-44 sm:h-60 sm:w-60 lg:-bottom-16 lg:-left-16 lg:h-80 lg:w-90 xl:w-120"
      >
        <Image
          src={impactDecoration.bottomLeft}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 240px, 176px"
          className="object-contain object-bottom-left"
        />
      </div>*/}
    </div>
  );
}
