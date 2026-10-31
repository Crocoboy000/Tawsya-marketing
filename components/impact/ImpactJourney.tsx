import Image from 'next/image';

import { ButtonLink } from '@/components/ui/button-link';
import type { ImpactJourneyContent } from '@/types';

type ImpactJourneyProps = {
  content: ImpactJourneyContent;
};

export function ImpactJourney({ content }: ImpactJourneyProps) {
  return (
    <aside
      aria-labelledby="impact-journey-title"
      data-motion="impact-journey"
      className="relative isolate min-h-[30%] overflow-hidden rounded-2xl"
    >
      <Image
        src={content.background}
        alt=""
        fill
        sizes="(min-width: 1280px) 1216px, 100vw"
        className="inset-0 absolute "
      />

      {/*<div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r"
      />*/}

      <div className="relative flex flex-col items-start gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-10 lg:py-9">
        <div className="flex max-w-xl flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {content.eyebrow}
          </p>

          <h3
            id="impact-journey-title"
            className="text-balance text-2xl font-semibold leading-tight text-neutral md:text-3xl"
          >
            {content.title}
          </h3>

          <p className="max-w-[48ch] text-pretty text-sm leading-relaxed text-neutral/80 sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="shrink-0">
          <ButtonLink href={content.action.href} variant="dark" className="px-5 py-3">
            {content.action.label}
          </ButtonLink>
        </div>
      </div>
    </aside>
  );
}
