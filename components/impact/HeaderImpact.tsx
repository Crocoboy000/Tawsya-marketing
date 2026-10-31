import { Dots } from '@/components/ui/Dots';
import type { ImpactHeadingContent } from '@/types';

type HeaderImpactProps = {
  content: ImpactHeadingContent;
};

export function HeaderImpact({ content }: HeaderImpactProps) {
  return (
    <header
      data-motion="impact-header"
      className="flex w-full flex-col gap-7 md:flex-row md:items-end md:justify-between md:gap-10"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <p className="flex items-center gap-2 text-sm text-neutral/70">
          <Dots />
          <span>{content.eyebrow}</span>
        </p>

        <h2
          id="impact-heading"
          data-motion="impact-title"
          className="max-w-[22ch] text-balance font-manrope text-[clamp(1.875rem,3.2vw,3.5rem)] font-semibold leading-[1.18] tracking-[-0.035em] text-neutral"
        >
          {content.title}
        </h2>
      </div>

      <div
        data-motion="impact-summary"
        className="flex shrink-0 items-center gap-4 md:min-w-44 md:flex-col md:items-start md:gap-2"
      >
        <span className="text-[clamp(4rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-brand">
          {content.metric.value}
        </span>

        <div className="flex flex-col gap-3">
          <p className="max-w-[22ch] text-sm leading-relaxed text-neutral">
            {content.metric.description}
          </p>

          <span aria-hidden="true" className="h-0.5 w-11 rounded-full bg-brand" />
        </div>
      </div>
    </header>
  );
}
