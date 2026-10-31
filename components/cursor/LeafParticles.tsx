import { motion } from '@/lib/animations/tokens';
import { leafFragments } from './leafGeometry';

export function LeafParticles() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {leafFragments.map((fragment) => (
        <svg
          key={fragment.id}
          data-leaf-particle
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="absolute inset-0 text-primary"
          fill="none"
          focusable="false"
          aria-hidden="true"
          style={{
            opacity: motion.opacity.hidden,
            overflow: 'visible',
          }}
        >
          <g
            transform={`
              translate(${fragment.x} ${fragment.y})
              rotate(${fragment.rotation})
              scale(${fragment.size / 24})
              translate(-12 -12)
            `}
          >
            <path
              d="
                M4 20
                C1 10 7 4 15 4
                C18 4 21 2 22 1
                C23 11 19 19 12 21
                C9 22 6 21 4 20
                Z
              "
              fill="currentColor"
            />

            <path
              d="M4 20 C9 14 14 9 20 4"
              stroke="var(--color-background, #F3F1E7)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>
        </svg>
      ))}
    </div>
  );
}
