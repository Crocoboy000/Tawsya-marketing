import { AlignLeft, Flame, MousePointerClick } from 'lucide-react';
import Image from 'next/image';

import type { ImpactGridContent } from '@/types';

type GridImpactProps = {
  content: ImpactGridContent;
};

export function GridImpact({ content }: GridImpactProps) {
  return (
    <div
      data-motion="impact-grid"
      className="grid isolate  w-full grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)_minmax(0,1fr)] md:gap-5 lg:gap-6"
    >
      {/* Ranking */}
      <article
        data-motion="impact-card"
        className="flex z-10 min-w-0 flex-col rounded-2xl bg-[#F7F6F2] p-5 sm:p-6 lg:p-7"
      >
        <div className="flex items-center gap-5">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"
          >
            <AlignLeft className="size-6" strokeWidth={1.8} />
          </span>

          <span className="text-4xl font-manrope leading-none tracking-tight text-neutral lg:text-5xl">
            {content.ranking.value}
          </span>
        </div>

        <h3 className="mt-5 max-w-[24ch] text-xl font-medium leading-snug text-neutral">
          {content.ranking.description}
        </h3>

        <ul className="mt-auto flex flex-col gap-2 pt-6">
          {content.ranking.items.map((item) => (
            <li key={item.id} className="text-sm font-semibold leading-relaxed text-[#075C49]">
              {item.label}
            </li>
          ))}
        </ul>
      </article>

      {/* Kettle */}
      <div
        data-motion="impact-image"
        data-impact-image="kettle"
        className="relative z-0 min-w-0 overflow-hidden rounded-2xl aspect-4/3 md:aspect-auto md:min-h-64"
      >
        <Image
          src={content.images.kettle.src}
          alt={content.images.kettle.alt}
          fill
          sizes="(min-width: 1280px) 320px, (min-width: 768px) 27vw, 100vw"
          className="object-cover"
          style={{
            objectPosition: content.images.kettle.position,
          }}
        />
      </div>

      {/* Insight */}
      <article
        data-motion="impact-card"
        className="flex z-10 min-w-0 flex-col rounded-2xl bg-[#075C49] p-5 text-background sm:p-6 lg:p-7"
      >
        <MousePointerClick aria-hidden="true" className="mb-4 size-15 self-end" strokeWidth={1.6} />

        <h3 className="max-w-[15ch] text-balance text-[clamp(1.5rem,8.4vw,2.25rem)] font-semibold leading-[1.15] tracking-tight">
          {content.insight.title}
        </h3>

        <p className="mt-auto max-w-[28ch] pt-6 text-base leading-relaxed text-background/90">
          {content.insight.description}
        </p>
      </article>

      {/* Coffee */}
      <div
        data-motion="impact-image"
        data-impact-image="coffee"
        className="relative z-0 min-w-0 overflow-hidden rounded-2xl aspect-4/3 md:aspect-auto md:min-h-72"
      >
        <Image
          src={content.images.coffee.src}
          alt={content.images.coffee.alt}
          fill
          sizes="(min-width: 1280px) 440px, (min-width: 768px) 37vw, 100vw"
          className="object-cover"
          style={{
            objectPosition: content.images.coffee.position,
          }}
        />
      </div>

      {/* Analytics */}
      <article
        data-motion="impact-card"
        className="flex z-10 min-w-0 flex-col rounded-2xl bg-[#F7F6F2] p-5 sm:p-6 md:col-span-2 lg:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-neutral lg:text-3xl">
              {content.analytics.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-neutral/70 lg:text-base">
              {content.analytics.description}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-background"
          >
            <Flame className="size-6" strokeWidth={1.8} />
          </span>
        </div>

        <dl className="my-7 grid grid-cols-3 divide-x divide-neutral/20 lg:my-9">
          {content.analytics.metrics.map((metric) => (
            <div
              key={metric.id}
              className="flex min-w-0 flex-col gap-2 px-2 first:pl-0 last:pr-0 sm:px-4"
            >
              <dt className="order-2 text-xs leading-relaxed text-neutral/70 sm:text-sm lg:text-base">
                {metric.label}
              </dt>

              <dd
                data-motion="impact-number"
                className="order-1 font-merriweather whitespace-nowrap text-[clamp(1.625rem,3.6vw,3.5rem)] font-bold leading-none tracking-tight tabular-nums text-[#075C49]"
              >
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-auto border-t border-neutral/15 pt-4 text-sm leading-relaxed text-neutral/80">
          {content.analytics.footer}
        </p>
      </article>
    </div>
  );
}
