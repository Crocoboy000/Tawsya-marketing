import { gsap } from '@/lib/animations/setup';
import { motion } from '@/lib/animations/tokens';

export function buildLeafHover(root: HTMLElement) {
  const orbit = root.querySelector<HTMLElement>('[data-leaf="orbit"]');

  if (!orbit) return null;

  const config = motion.cursor.hover;

  const state = {
    angle: 0,
    strength: config.strength.inactive as number,
  };

  let active = false;

  gsap.set(orbit, {
    ...motion.cursor.rest,
  });

  const setX = gsap.quickSetter(orbit, 'x', 'px');
  const setY = gsap.quickSetter(orbit, 'y', 'px');
  const setRotation = gsap.quickSetter(orbit, 'rotation', 'deg');

  function render() {
    const { angle, strength } = state;

    setX(Math.cos(angle) * config.orbit.radius.x * strength);

    setY(Math.sin(angle) * config.orbit.radius.y * strength);

    setRotation(Math.sin(angle) * config.orbit.rotation * strength);
  }

  const loop = gsap.to(state, {
    angle: Math.PI * 2,
    duration: config.orbit.duration,
    ease: config.orbit.ease,
    repeat: config.orbit.repeat,
    paused: true,
    onUpdate: render,
  });

  const strengthTo = gsap.quickTo(state, 'strength', {
    ...config.transition,
    onUpdate: render,

    onComplete: () => {
      if (!active) loop.pause();
    },
  });

  function setActive(next: boolean) {
    if (active === next) return;

    active = next;

    if (active) loop.resume();

    strengthTo(active ? config.strength.active : config.strength.inactive);
  }

  return { setActive };
}
