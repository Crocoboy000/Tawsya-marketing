import { gsap } from '@/lib/animations/setup';
import { motion } from '@/lib/animations/tokens';

type BurstOptions = {
  onComplete: () => void;
};

export function buildLeafBurst(root: HTMLElement, { onComplete }: BurstOptions) {
  const leaf = root.querySelector<HTMLElement>('[data-leaf="body"]');

  const particles = Array.from(root.querySelectorAll<SVGSVGElement>('[data-leaf-particle]'));

  if (!leaf || !particles.length) return null;

  const config = motion.cursor.burst;

  let active = false;
  let lastStarted = Number.NEGATIVE_INFINITY;

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  const setRootX = gsap.quickSetter(root, 'x', 'px');
  const setRootY = gsap.quickSetter(root, 'y', 'px');

  gsap.set(leaf, {
    opacity: motion.opacity.visible,
    scale: motion.scale.rest,
    transformOrigin: motion.origin.center,
  });

  gsap.set(particles, {
    xPercent: 0,
    yPercent: 0,
    x: 0,
    y: 0,
    rotation: 0,
    scale: motion.scale.rest,
    opacity: motion.opacity.hidden,
    transformOrigin: motion.origin.center,
  });

  const items = particles.map((element, index) => {
    const angle = (index / particles.length) * Math.PI * 2;

    const lane = (index / Math.max(1, particles.length - 1)) * 2 - 1;

    return {
      element,
      progress: { value: 0 },

      startOffsetX: Math.cos(angle) * config.split.radius,
      startOffsetY: Math.sin(angle) * config.split.radius,

      lane,

      setX: gsap.quickSetter(element, 'x', 'px'),
      setY: gsap.quickSetter(element, 'y', 'px'),
      setRotation: gsap.quickSetter(element, 'rotation', 'deg'),
    };
  });

  function renderParticle(index: number) {
    const item = items[index];
    const p = item.progress.value;

    const dx = endX - startX;
    const dy = endY - startY;

    const length = Math.hypot(dx, dy) || 1;
    const normalX = -dy / length;
    const normalY = dx / length;

    const arc = Math.sin(Math.PI * p) * item.lane * config.travel.spread;

    item.setX(item.startOffsetX * (1 - p) + dx * p + normalX * arc);

    item.setY(item.startOffsetY * (1 - p) + dy * p + normalY * arc);

    item.setRotation(Math.sin(Math.PI * p) * item.lane * config.travel.rotation);
  }

  let travelling = false;
  let reforming = false;

  function updateTarget(x: number, y: number) {
    if (!active) return;

    endX = x;
    endY = y;

    if (travelling) {
      // Update every particle, including those that already arrived.
      items.forEach((_, index) => renderParticle(index));
      return;
    }

    if (reforming) {
      // Keep the reforming leaf beside the current pointer position.
      setRootX(endX);
      setRootY(endY);
    }
  }

  function placeAtDestination() {
    travelling = false;
    reforming = true;

    setRootX(endX);
    setRootY(endY);

    for (const item of items) {
      item.setX(0);
      item.setY(0);
    }
  }

  const timeline = gsap.timeline({
    paused: true,

    onComplete: () => {
      active = false;
      travelling = false;
      reforming = false;
      onComplete();
    },
  });

  // 1. The main leaf contracts as the small leaves spread out.
  timeline.fromTo(
    leaf,
    {
      opacity: motion.opacity.visible,
      scale: motion.scale.rest,
    },
    {
      opacity: motion.opacity.hidden,
      scale: config.split.leafScale,
      duration: config.split.duration,
      ease: config.split.ease,
    },
    0,
  );

  for (const item of items) {
    timeline.fromTo(
      item.element,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: motion.scale.rest,
        opacity: motion.opacity.hidden,
      },
      {
        x: item.startOffsetX,
        y: item.startOffsetY,
        scale: config.split.particleScale,
        opacity: motion.opacity.visible,
        duration: config.split.duration,
        ease: config.split.ease,
        immediateRender: false,
      },
      0,
    );
  }

  // 2. Each leaf begins its own curved flight 0.08s later.
  timeline.addLabel('travel');

  timeline.call(
    () => {
      travelling = true;
    },
    [],
    'travel',
  );

  items.forEach((item, index) => {
    timeline.fromTo(
      item.progress,
      { value: 0 },
      {
        value: 1,
        duration: config.travel.duration,
        ease: config.travel.ease,
        immediateRender: false,

        onUpdate: () => {
          renderParticle(index);
        },
      },
      `travel+=${index * config.travel.stagger}`,
    );
  });

  // This label follows the LAST particle's arrival.
  timeline.addLabel('reform');

  timeline.call(placeAtDestination, [], 'reform');

  // 3. Small leaves collapse while the original leaf reforms.
  timeline.to(
    particles,
    {
      opacity: motion.opacity.hidden,
      duration: config.reform.duration,
      ease: config.reform.ease,
    },
    'reform',
  );

  timeline.fromTo(
    leaf,
    {
      opacity: motion.opacity.hidden,
      scale: motion.scale.rest,
    },
    {
      opacity: motion.opacity.visible,
      scale: motion.scale.rest,
      duration: config.reform.duration,
      ease: config.reform.ease,
      immediateRender: false,
    },
    'reform',
  );

  function shouldStart(x: number, y: number) {
    if (active) return false;

    const now = performance.now() / 1000;

    if (now - lastStarted < config.cooldown) {
      return false;
    }

    const currentX = Number(gsap.getProperty(root, 'x'));
    const currentY = Number(gsap.getProperty(root, 'y'));

    return Math.hypot(x - currentX, y - currentY) >= config.threshold;
  }

  function start(x: number, y: number) {
    if (active) return;

    timeline.pause(0, true);

    travelling = false;
    reforming = false;

    // Reset progress for particles whose staggered flight hasn't started yet.
    for (const item of items) {
      item.progress.value = 0;
    }

    startX = Number(gsap.getProperty(root, 'x'));
    startY = Number(gsap.getProperty(root, 'y'));

    endX = x;
    endY = y;

    active = true;
    lastStarted = performance.now() / 1000;

    timeline.restart();
  }

  function reset() {
    timeline.pause(0, true);

    travelling = false;
    reforming = false;
    active = false;

    for (const item of items) {
      item.progress.value = 0;
    }
  }

  return {
    shouldStart,
    start,
    reset,
    updateTarget,
    isActive: () => active,
  };
}
