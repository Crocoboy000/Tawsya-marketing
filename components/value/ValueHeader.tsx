import { valueHeader } from '@/content/value';
import Image from 'next/image';

function ValueHeader() {
  const { title, heading, subtitle } = valueHeader;

  return (
    <div className="flex w-full items-center lg:items-start text-center lg:text-left flex-col gap-[clamp(1.5rem,_1rem_+_1.5vw,_3rem)]">
      {/* Extra right-side room preserves the heading's decorative leaf. */}
      <div
        data-value-mask
        className="w-full"
        style={{
          clipPath: 'inset(-0.25em -6rem -0.25em 0)',
        }}
      >
        <h2
          data-value="heading"
          className="text-value text-center lg:text-left space-y-3 w-full font-serif"
        >
          <span className="block">{title}</span>

          <span className="relative text-center md:text-start isolate w-full bg-primary">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
              <Image
                src="/value/leaf.svg"
                alt=""
                width={100}
                height={106}
                className="absolute left-full top-[0.1em] ml-[0.08em] h-auto w-[0.85em] max-w-none"
              />
            </span>

            <span className="relative z-10 text-background p-2">{heading}</span>
          </span>
        </h2>
      </div>

      <div data-value-mask className="w-full max-w-[32rem]" style={{ clipPath: 'inset(-0.2em 0)' }}>
        <p
          data-value="subtitle"
          className="w-full lg:text-left font-manrope text-[clamp(1rem,_0.975rem_+_1.9vw,_1.5rem)] font-medium text-neutral/80"
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default ValueHeader;
