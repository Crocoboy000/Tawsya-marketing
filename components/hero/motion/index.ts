import { gsap } from '@/lib/animations/setup';
import type { SectionMotion } from '@/lib/animations/useSectionMotion';
import { heroMotion as config } from './config';
import { buildContent } from './content';
import { buildVisuals } from './visuals';

export const HeroMotion: SectionMotion = (root) => {
  let disposed = false;
  let finished = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const images = Array.from(root.querySelectorAll<HTMLImageElement>('[data-hero-card]'));
  let imagesReady = images.every((image) => image.complete && image.naturalWidth > 0);
  const ready = Promise.all(images.map((image) => image.decode().catch(() => undefined))).then(
    () => {
      imagesReady = true;
    },
  );

  const content = buildContent(root);
  const visuals = buildVisuals(root);
  const actions = root.querySelector<HTMLElement>('[data-motion="hero-action"]');
  const master = gsap.timeline({ paused: true });

  master.add(content.timeline).addLabel('visuals');

  // The heading starts immediately. Only the visual chapter may wait.
  master.addPause('visuals', () => {
    if (imagesReady) {
      master.play();
      return;
    }
    timer = setTimeout(() => {
      if (!disposed && !finished) master.totalProgress(1, false);
    }, config.imageWaitLimitMs);
    void ready.then(() => {
      if (disposed || finished) return;
      clearTimeout(timer);
      master.play();
    });
  });

  master.add(visuals.timeline, 'visuals');
  if (actions) {
    master.from(actions, {
      autoAlpha: 0,
      y: config.action.y,
      duration: config.action.duration,
      ease: config.action.ease,
    });
  }

  master.eventCallback('onComplete', () => {
    finished = true;
    clearTimeout(timer);
    content.restoreText();
    visuals.restore();
  });
  master.play(0);

  return () => {
    disposed = true;
    clearTimeout(timer);
    master.kill();
    content.restoreText();
    visuals.restore();
  };
};
