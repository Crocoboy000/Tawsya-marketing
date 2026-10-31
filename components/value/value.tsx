'use client';

import { useSectionMotion } from '@/lib/animations/useSectionMotion';

import ValueAction from './ValueAction';
import ValueHeader from './ValueHeader';
import ValueVisual from './ValueVisual';
import { ValueMotion } from './motion';

function Value() {
  const ref = useSectionMotion(ValueMotion);

  return (
    <section
      ref={ref}
      className="flex h-full w-full flex-col px-1.5 items-center gap-15 max-w-7xl mx-auto lg:flex-row lg:justify-around lg:gap-0"
    >
      <div className="flex w-full z-20 max-w-2xl flex-col items-center gap-9 lg:w-[45%] lg:px-6 lg:max-w-none lg:items-start">
        <ValueHeader />
        <ValueAction />
      </div>

      <ValueVisual />
    </section>
  );
}

export default Value;
