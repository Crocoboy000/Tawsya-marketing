import { SplitText, gsap } from '@/lib/animations/setup';
import { heroMotion as config } from './config';

export function buildContent(root: HTMLElement) {
  const timeline = gsap.timeline({ delay: 0.7 });
  const splits: SplitText[] = [];

  const title = root.querySelector<HTMLElement>('[data-motion="hero-title"]');
  const keyword = root.querySelector<HTMLElement>('[data-motion="hero-keyword"]');
  const subtitle = root.querySelector<HTMLElement>('[data-motion="hero-subtitle"]');

  function splitWords(
    element: HTMLElement,
    at: number,
    duration: number,
    stagger: number,
    yPercent: number,
  ) {
    const split = SplitText.create(element, {
      type: 'words',
      mask: 'words',
      tag: 'span',
      aria: 'auto',
      autoSplit: true,

      onSplit(self) {
        for (const mask of self.masks) {
          (mask as HTMLElement).style.overflowClipMargin = '0.15em';
        }

        const tween = gsap.from(self.words, {
          yPercent,
          opacity: 0,
          duration,
          stagger,
          ease: config.text.ease,
        });

        timeline.add(tween, at);
        return tween;
      },
    });

    splits.push(split);
  }

  // Words descend into their stationary masks.
  if (title) {
    splitWords(title, 0, config.text.duration, config.text.stagger, -120);
  }

  // Move the complete keyword, keeping the V and shapes together.
  if (keyword) {
    timeline.from(
      keyword,
      {
        yPercent: -110,
        opacity: 0,
        duration: config.keyword.duration,
        ease: config.text.ease,
      },
      config.keyword.start,
    );
  }

  // Subtitle words rise into their masks.
  if (subtitle) {
    splitWords(
      subtitle,
      config.subtitle.start,
      config.subtitle.duration,
      config.subtitle.stagger,
      110,
    );
  }

  return {
    timeline,
    restoreText: () => {
      for (const split of splits) split.revert();
    },
  };
}
