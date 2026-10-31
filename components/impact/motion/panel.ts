import { ScrollTrigger } from '@/lib/animations/setup';

export function pinPreviousSection(root: HTMLElement) {
  const previous = document.getElementById('value-stage');

  if (!previous) return;

  return ScrollTrigger.create({
    trigger: previous,

    // Tall sections remain readable before being pinned.
    start: () => (previous.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),

    pin: previous,
    pinSpacing: false,

    // Release Value once Impact completely covers the viewport.
    endTrigger: root,
    end: 'top top',

    invalidateOnRefresh: true,
  });
}
