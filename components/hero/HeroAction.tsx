// Keep the import path / named-vs-default export used in YOUR existing project.
import { ButtonLink } from '@/components/ui/button-link';
import { CirclePlay, Sparkles } from 'lucide-react';

export default function HeroAction() {
  return (
    <div
      data-motion="hero-action"
      className="flex flex-col gap-8 md:flex-row md:gap-8 w-full justify-center items-center"
    >
      <ButtonLink className="w-full max-w-60 px-2 py-3" icon={Sparkles} variant="primary" href="">
        Start your free 14 day trial
      </ButtonLink>
      <ButtonLink
        className="w-full max-w-50 md:max-w-40"
        icon={CirclePlay}
        variant="secondary"
        href=""
      >
        How it works?
      </ButtonLink>
    </div>
  );
}
