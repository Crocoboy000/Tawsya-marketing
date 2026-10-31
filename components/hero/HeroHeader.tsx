import Image from 'next/image';

type Props = { title: string; heading: string; subtitle: string };

export default function HeroHeader({ title, heading, subtitle }: Props) {
  const vIndex = heading.toLowerCase().indexOf('v');
  const headingStart = vIndex === -1 ? heading : heading.slice(0, vIndex);
  const headingEnd = vIndex === -1 ? '' : heading.slice(vIndex + 1);

  return (
    <div
      data-motion="hero-content"
      className="flex w-full text-center items-center justify-center flex-col gap-[clamp(1.5rem,1rem+1.5vw,3rem)]"
    >
      <h1 className="text-hero space-y-3 w-full font-serif">
        <span data-motion="hero-title" className="block">
          {title}
        </span>
        <span className="block overflow-clip [overflow-clip-margin:0.25em]">
          <span data-motion="hero-keyword" className="relative isolate mx-auto block w-fit">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
              <Image
                src="/hero/left-shape.svg"
                alt=""
                width={165}
                height={82}
                preload
                className="absolute left-[-7.65%] top-[0.1092em] h-auto w-[41.03%] max-w-none"
              />
              <Image
                src="/hero/right-shape.svg"
                alt=""
                width={251}
                height={87}
                preload
                className="absolute left-[40.14%] top-[0.1466em] h-auto w-[63.13%] max-w-none"
              />
            </span>
            <span className="relative z-10 block tracking-normal text-background font-heading">
              {headingStart}
              {vIndex !== -1 ? (
                <span className="text-primary ml-1 mr-2 text-[1em]">{heading[vIndex]}</span>
              ) : null}
              {headingEnd}
            </span>
          </span>
        </span>
      </h1>
      <p
        data-motion="hero-subtitle"
        className="w-full max-w-140 text-[clamp(1rem,0.875rem+0.6vw,1.5rem)] text-neutral/60 font-sans text-ink-soft"
      >
        {subtitle}
      </p>
    </div>
  );
}
