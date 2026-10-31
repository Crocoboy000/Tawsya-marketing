import { gsap } from '@/lib/animations/setup';
import { heroMotion as config } from './config';
import { prepareDrawing } from './draw';

export function buildVisuals(root: HTMLElement) {
  const timeline = gsap.timeline();
  const restore: Array<() => void> = [];
  const cards = Array.from(root.querySelectorAll<HTMLImageElement>('[data-hero-card]')).sort(
    (a, b) => Number(a.dataset.heroCard) - Number(b.dataset.heroCard),
  );
  // Batch style reads before writing any card transforms.
  const baselines = cards.map((card) => ({
    card,
    previousTransform: card.style.getPropertyValue('transform'),
    previousPriority: card.style.getPropertyPriority('transform'),
    computed: getComputedStyle(card).transform,
  }));

  for (const { card, previousTransform, previousPriority, computed } of baselines) {
    // Add a multiplicative transform without touching Tailwind's scale property.
    // Handles both CSS individual scale and a scale inside a transform matrix.
    const base = computed === 'none' ? '' : computed;
    const state = { factor: config.card.startScale as number };
    const reset = () => {
      if (previousTransform)
        card.style.setProperty('transform', previousTransform, previousPriority);
      else card.style.removeProperty('transform');
    };
    const render = () => {
      card.style.transform = `${base} scale(${state.factor})`;
    };
    restore.push(reset);
    render();

    const entrance = gsap.timeline();
    entrance.to(
      state,
      {
        factor: 1,
        duration: config.card.duration,
        ease: config.card.ease,
        onUpdate: render,
        onComplete: reset,
      },
      0,
    );
    timeline.add(entrance);

    const connector = root.querySelector<SVGSVGElement>(
      `[data-hero-path="${card.dataset.heroCard}"]`,
    );
    if (!connector) continue;

    const drawing = prepareDrawing(connector);
    restore.push(drawing.restore);
    gsap.set(connector, { autoAlpha: 0 });
    const connection = gsap.timeline();

    if (drawing.strokes.length) {
      gsap.set(drawing.strokes, { drawSVG: 0 });
      connection.set(connector, { autoAlpha: 1 });
      connection.to(drawing.strokes, {
        drawSVG: '100%',
        duration: config.connector.duration,
        ease: config.connector.ease,
      });
    } else {
      // Some SVG exports turn dashed lines into filled outlines.
      // Fading is an honest fallback, not a claimed stroke-drawing effect.
      connection.to(connector, { autoAlpha: 1, duration: config.connector.duration });
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Hero connector needs a stroke-only SVG route for DrawSVG:', connector);
      }
    }

    connection.eventCallback('onComplete', drawing.restore);
    timeline.add(connection);
  }

  return {
    timeline,
    restore: () => {
      for (const reset of restore) reset();
    },
  };
}
