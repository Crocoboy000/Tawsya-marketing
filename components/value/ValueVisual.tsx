import Image from 'next/image';

import { valueVisual } from '@/content/value';
import { valueMotion } from './motion/config';

function ValueVisual() {
  return (
    <div
      data-value="visual"
      className="relative w-full flex items-center justify-center max-w-md lg:w-[44%] lg:max-w-none"
    >
      <div data-value="scene" className="relative flex w-full items-center justify-center">
        <Image
          alt=""
          src={`/value/${valueVisual.image}`}
          width={1377}
          height={1991}
          sizes="(min-width: 1024px) 34vw, 100vw"
          className="h-auto w-full mr-12 select-none"
        />

        {/* Full-size overlay: preserves the original positioning coordinates. */}
        {/* Matches the image's rendered width, excluding its right margin. */}
        <div
          data-value="window"
          className="pointer-events-none absolute inset-y-0 left-0"
          style={{
            right: '3rem',
            clipPath: valueMotion.window.clip,
          }}
        >
          {/*
            Restore the original container width for product positioning.
            Its left:52%, width:64%, and centering remain unchanged.
          */}
          <div
            data-value="product"
            className="absolute inset-y-0 left-0"
            style={{
              width: 'calc(100% + 3rem)',
            }}
          >
            <Image
              alt=""
              src="/value/product.webp"
              width={1277}
              height={1991}
              sizes="(min-width: 1024px) 28vw, 64vw"
              className="absolute bottom-[22%] left-[52%] h-auto w-[64%] -translate-x-1/2 select-none"
            />
          </div>
        </div>
      </div>

      <Image
        data-value="leaf-top"
        alt=""
        src="/value/leaftop.webp"
        width={177}
        height={191}
        sizes="(min-width: 1024px) 9vw, 19vw"
        className="absolute left-[8%] top-[15%] h-auto w-[19%] select-none"
      />

      <Image
        data-value="leaf-bottom"
        alt=""
        src="/value/leafbottom.webp"
        width={177}
        height={191}
        sizes="(min-width: 1024px) 11vw, 24vw"
        className="absolute bottom-[14%] right-[2%] h-auto w-[24%] select-none"
      />
    </div>
  );
}

export default ValueVisual;
