'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/animations/setup';
import { motion } from '@/lib/animations/tokens';
import { LeafIcon } from './LeafIcon';
import { buildLeafHover } from './hover';
import { buildLeafClick } from './motion';

import { LeafParticles } from './LeafParticles';
import { buildLeafBurst } from './burst';

const config = motion.cursor;

export function LeafCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add(
        '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
        () => {
          const clickMotion = buildLeafClick(root);
          const hoverMotion = buildLeafHover(root);

          gsap.set(root, {
            ...config.rest,
            autoAlpha: motion.opacity.hidden,
          });

          gsap.set(root, {
            x: 0,
            y: 0,
            autoAlpha: 0,
          });

          const xTo = gsap.quickTo(root, 'x', {
            duration: config.follow.duration,
            ease: config.follow.ease,
          });

          const yTo = gsap.quickTo(root, 'y', {
            duration: config.follow.duration,
            ease: config.follow.ease,
          });

          let visible = false;

          let targetX = 0;
          let targetY = 0;
          let hoveringButton = false;

          const burstMotion = buildLeafBurst(root, {
            onComplete: () => {
              if (!root || !visible) return;

              // Synchronize quickTo with the position changed by the burst.
              const currentX = Number(gsap.getProperty(root, 'x'));
              const currentY = Number(gsap.getProperty(root, 'y'));

              xTo(targetX, currentX);
              yTo(targetY, currentY);

              hoverMotion?.setActive(hoveringButton);
            },
          });

          function isButton(target: EventTarget | null): boolean {
            if (!(target instanceof Element)) return false;

            const button = target.closest('[data-cursor="button"]');

            return button !== null && !button.matches(':disabled, [aria-disabled="true"]');
          }

          function move(event: PointerEvent) {
            if (!root || event.pointerType !== 'mouse') return;

            targetX = event.clientX + config.follow.offset.x;
            targetY = event.clientY + config.follow.offset.y;

            hoveringButton = isButton(event.target);

            if (!visible) {
              xTo(targetX, targetX);
              yTo(targetY, targetY);

              root.style.opacity = config.visibility.visible.opacity;
              root.style.visibility = config.visibility.visible.visibility;

              visible = true;
              hoverMotion?.setActive(hoveringButton);
              return;
            }

            // Continue tracking the destination without moving the burst's origin.
            if (burstMotion?.isActive()) {
              burstMotion.updateTarget(targetX, targetY);
              return;
            }

            if (burstMotion?.shouldStart(targetX, targetY)) {
              xTo.tween.pause();
              yTo.tween.pause();

              hoverMotion?.setActive(false);
              clickMotion?.pause(0);

              burstMotion.start(targetX, targetY);
              return;
            }

            xTo(targetX);
            yTo(targetY);
          }

          function hide() {
            if (!root) return;

            root.style.opacity = config.visibility.hidden.opacity;
            root.style.visibility = config.visibility.hidden.visibility;

            visible = false;

            hoverMotion?.setActive(false);
            hoveringButton = false;
            burstMotion?.reset();
            xTo.tween.pause();
            yTo.tween.pause();
            clickMotion?.pause(0);
          }

          function handlePointerDown(event: PointerEvent) {
            if (!root || event.pointerType !== 'mouse' || event.button !== 0) {
              return;
            }

            move(event);

            if (!burstMotion?.isActive()) {
              clickMotion?.restart();
            }
          }

          function handlePointerOver(event: PointerEvent) {
            if (!root || event.pointerType !== 'mouse') return;

            hoveringButton = isButton(event.target);

            if (!burstMotion?.isActive()) {
              hoverMotion?.setActive(hoveringButton);
            }
          }

          function handlePointerOut(event: PointerEvent) {
            if (!root || event.pointerType !== 'mouse') return;

            hoveringButton = isButton(event.relatedTarget);

            if (!burstMotion?.isActive()) {
              hoverMotion?.setActive(hoveringButton);
            }
          }

          function handleVisibilityChange() {
            if (document.hidden) hide();
          }

          window.addEventListener('pointermove', move, {
            passive: true,
          });

          window.addEventListener('pointerdown', handlePointerDown, {
            passive: true,
          });

          window.addEventListener('pointerover', handlePointerOver, {
            passive: true,
          });

          window.addEventListener('pointerout', handlePointerOut, {
            passive: true,
          });

          document.documentElement.addEventListener('pointerleave', hide);

          window.addEventListener('blur', hide);

          document.addEventListener('visibilitychange', handleVisibilityChange);

          return () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointerover', handlePointerOver);
            window.removeEventListener('pointerout', handlePointerOut);

            document.documentElement.removeEventListener('pointerleave', hide);

            window.removeEventListener('blur', hide);

            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };
        },
        root,
      );

      return () => media.revert();
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-80 h-9 w-9 select-none"
      style={config.visibility.hidden}
    >
      <div data-leaf="body" className="h-full w-full">
        <div data-leaf="orbit" className="h-full w-full">
          <LeafIcon />
        </div>
      </div>

      <LeafParticles />
    </div>
  );
}
