import Hero from '@/components/hero/Hero';
import Impact from '@/components/impact/impact';
import Navbar from '@/components/layouts/Navbar';
import Value from '@/components/value/value';

export default function Home() {
  return (
    <div className="relative isolate flex flex-1 flex-col items-center overflow-x-clip gap-25 bg-background">
      {/* Hero background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[clamp(48rem,100svh,72rem)] select-none"
      >
        <div
          className="absolute inset-0 bg-[url('/hero/olive-bg.webp')] bg-cover bg-no-repeat opacity-80"
          style={{
            backgroundPosition: '65% top',
            maskImage: 'linear-gradient(to bottom, black 0%,  transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          }}
        />
      </div>

      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <Hero />

        <div id="value-stage" className="relative isolate z-0 mt-15 w-full">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 select-none"
            style={{
              maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
            }}
          >
            <div className="absolute inset-0 bg-[url('/hero/olive-bg.webp')] bg-cover bg-bottom bg-no-repeat opacity-30" />
          </div>

          <Value />
        </div>

        <Impact />
      </main>
    </div>
  );
}
