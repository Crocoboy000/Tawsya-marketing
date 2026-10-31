'use client';

import { gridContent, headingContent, journeyContent } from '@/content/impact';

import { useSectionMotion } from '@/lib/animations/useSectionMotion';

import { GridImpact } from './GridImpact';
import { HeaderImpact } from './HeaderImpact';
import { ImpactDecorations } from './ImpactDecorations';
import { ImpactJourney } from './ImpactJourney';
import { ImpactMotion } from './motion';

export default function Impact() {
  const ref = useSectionMotion(ImpactMotion);

  return (
    <section
      ref={ref}
      id="impact"
      aria-labelledby="impact-heading"
      data-motion="impact-trigger"
      className="relative isolate z-10 w-full bg-background"
    >
      <div
        data-motion="impact-panel"
        className="relative isolate flex w-full flex-col justify-start bg-background py-12 md:py-16 lg:min-h-svh lg:py-20"
      >
        <ImpactDecorations />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-8 md:gap-10 lg:gap-12">
          <HeaderImpact content={headingContent} />

          <GridImpact content={gridContent} />

          <ImpactJourney content={journeyContent} />
        </div>
      </div>
    </section>
  );
}
