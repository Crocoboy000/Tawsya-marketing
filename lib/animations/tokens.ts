// --------------------------------------------------
// 1. Published easing curves
// Registered in setup.ts through CustomEase.
// --------------------------------------------------

export const motionCurves = {
  // Emil Kowalski
  'motion.emil.enter': '0.23,1,0.32,1',
  'motion.emil.move': '0.77,0,0.175,1',
  'motion.emil.drawer': '0.32,0.72,0,1',

  // Atlassian
  'motion.ads.enter': '0,0.4,0,1',
  'motion.ads.exit': '0.6,0,0.8,0.6',
  'motion.ads.move': '0.4,0,0,1',
  'motion.ads.practical': '0.4,1,0.6,1',

  // IBM Carbon — productive
  'motion.carbon.productive.enter': '0,0,0.38,0.9',
  'motion.carbon.productive.move': '0.2,0,0.38,0.9',
  'motion.carbon.productive.exit': '0.2,0,1,0.9',

  // IBM Carbon — expressive
  'motion.carbon.expressive.enter': '0,0,0.3,1',
  'motion.carbon.expressive.move': '0.4,0.14,0.3,1',
  'motion.carbon.expressive.exit': '0.4,0.14,1,1',

  // Standard CSS curves
  'motion.css.ease': '0.25,0.1,0.25,1',
  'motion.css.inOut': '0.42,0,0.58,1',
} as const;

// --------------------------------------------------
// 2. Duration — seconds
// --------------------------------------------------

const duration = {
  instant: 0,

  // Your existing section/marketing durations.
  quick: 0.1,
  fast: 0.35,
  base: 0.65,
  slow: 0.9,
  slowed: 1.5,
  // Atlassian interaction/transition durations.
  ui: {
    hover: 0.05,
    press: 0.1,
    small: 0.15,
    exit: 0.2,
    enter: 0.25,
    page: 0.4,
    expressive: 0.6,
  },
} as const;

// --------------------------------------------------
// 3. Distance — pixels
// These are your design values, except list.
// --------------------------------------------------

const distance = {
  none: 0,
  list: 8, // Emil's published staggered-list example.
  small: 12,
  base: 24,
  large: 50,
} as const;

// --------------------------------------------------
// 4. Easing families
// --------------------------------------------------

const ease = {
  // Existing aliases remain available.
  enter: 'power3.out',
  soft: 'power2.out',
  float: 'sine.inOut',
  linear: 'none',

  // New interaction easings.
  blend: 'power2.inOut',
  springBack: 'back.out(1.5)',

  emil: {
    enter: 'motion.emil.enter',
    exit: 'motion.emil.enter',
    move: 'motion.emil.move',
    drawer: 'motion.emil.drawer',
  },

  atlassian: {
    enter: 'motion.ads.enter',
    exit: 'motion.ads.exit',
    move: 'motion.ads.move',
    practical: 'motion.ads.practical',
  },

  carbon: {
    productive: {
      enter: 'motion.carbon.productive.enter',
      move: 'motion.carbon.productive.move',
      exit: 'motion.carbon.productive.exit',
    },

    expressive: {
      enter: 'motion.carbon.expressive.enter',
      move: 'motion.carbon.expressive.move',
      exit: 'motion.carbon.expressive.exit',
    },
  },

  css: {
    hover: 'motion.css.ease',
    loop: 'motion.css.inOut',
  },
} as const;

const cursor = {
  follow: {
    offset: {
      x: 14,
      y: 14,
    },
    duration: 0.22,
    ease: ease.enter,
  },

  visibility: {
    hidden: {
      opacity: '0',
      visibility: 'hidden',
    },
    visible: {
      opacity: '1',
      visibility: 'visible',
    },
  },

  rest: {
    x: distance.none,
    y: distance.none,
    rotation: 0,
  },

  burst: {
    threshold: 180,
    cooldown: 1.6,

    count: 6,
    size: 9,

    split: {
      duration: 0.24,
      radius: 14,
      leafScale: 1,
      particleScale: 1,
      ease: ease.soft,
    },

    travel: {
      duration: 0.65,
      stagger: 0.08,
      spread: 38,
      rotation: 75,
      ease: ease.emil.move,
    },

    reform: {
      duration: 0.28,
      overlap: 0.12,
      leafScale: 0.82,
      ease: ease.soft,
    },
  },
  click: {
    // SVG coordinates tied to LeafIcon's viewBox.
    svgOrigin: '25 70',

    open: {
      duration: 0.14,
      ease: ease.soft,

      left: {
        rotation: -12,
        x: -2,
        y: -1,
      },

      right: {
        rotation: 12,
        x: 2,
        y: 1,
      },
    },

    close: {
      duration: 0.42,
      ease: ease.springBack,
    },
  },

  reform: {
    duration: 0.14,
    ease: ease.soft,
  },

  hover: {
    orbit: {
      duration: duration.slowed,
      ease: ease.linear,
      repeat: -1,

      radius: {
        x: distance.small,
        y: distance.list,
      },

      rotation: 8,
    },

    transition: {
      duration: 0.45,
      ease: ease.blend,
    },

    strength: {
      inactive: 0,
      active: 1,
    },
  },
} as const;

// --------------------------------------------------
// 5. Complete motion API
// --------------------------------------------------

export const motion = {
  duration,
  distance,
  ease,
  cursor,

  opacity: {
    hidden: 0,
    visible: 1,
  },

  impact: {
    panel: {
      start: 'top 55%',
      end: 'top top',
      offsetY: 72,
      duration: 1,
      ease: ease.linear,
    },

    images: {
      duration: 0.85,
      ease: ease.emil.enter,

      kettle: {
        xPercent: -110,
        at: 0.12,
      },

      coffee: {
        xPercent: 110,
        at: 0.25,
      },
    },
  },

  scale: {
    enter: 0.95,
    pressed: 0.97,
    rest: 1,
  },

  // Geometric values, not recommended reveal distances.
  percent: {
    none: 0,
    full: 100,
  },

  // Choose according to the element's actual anchor.
  origin: {
    center: '50% 50%',
    top: '50% 0%',
    bottom: '50% 100%',
    left: '0% 50%',
    right: '100% 50%',
    topLeft: '0% 0%',
    topRight: '100% 0%',
    bottomLeft: '0% 100%',
    bottomRight: '100% 100%',
  },

  // Emil's published range: 30–80ms between items.
  // The names are organizational labels.
  stagger: {
    none: 0,

    tight: {
      each: 0.03,
      from: 'start',
      ease: 'none',
    },

    base: {
      each: 0.05,
      from: 'start',
      ease: 'none',
    },

    relaxed: {
      each: 0.08,
      from: 'start',
      ease: 'none',
    },

    // Supply your own total start-time spread.
    // This excludes each item's duration.
    spread: (seconds: number) => ({
      amount: seconds,
      from: 'start' as const,
      ease: 'none',
    }),
  },

  // Starting states for gsap.from().
  // Combine fade with ONE movement or scale.
  from: {
    fade: {
      opacity: 0,
    },

    scale: {
      scale: 0.95,
    },

    above: (pixels: number = distance.small) => ({
      y: -pixels,
    }),

    below: (pixels: number = distance.small) => ({
      y: pixels,
    }),

    left: (pixels: number = distance.small) => ({
      x: -pixels,
    }),

    right: (pixels: number = distance.small) => ({
      x: pixels,
    }),
  },

  // GSAP timeline positions.
  position: {
    together: '<',
    after: '>',
  },

  // Behavior only. Duration/amplitude remain explicit.
  repeat: {
    once: {
      repeat: 0,
    },

    continuous: {
      repeat: -1,
    },

    pingPong: {
      repeat: -1,
      yoyo: true,
    },
  },

  // Project choices, not universal expert thresholds.
  scroll: {
    reveal: {
      start: 'top 85%',
      once: true,
    },

    parallax: {
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  },

  preset: {
    // Site-specific timing/easing combinations.
    navbar: {
      duration: duration.slow,
      ease: ease.emil.enter,
    },

    heroContent: {
      duration: duration.base,
      ease: ease.emil.enter,
    },

    heroVisual: {
      duration: duration.slow,
      ease: ease.carbon.expressive.enter,
    },

    sectionTitle: {
      duration: duration.base,
      ease: ease.emil.enter,
    },

    body: {
      duration: duration.fast,
      ease: ease.soft,
    },

    card: {
      duration: duration.base,
      ease: ease.emil.enter,
    },

    illustration: {
      duration: duration.base,
      ease: ease.carbon.expressive.enter,
    },

    // Based on Atlassian component timing/easing guidance.
    popupEnter: {
      duration: duration.ui.small,
      ease: ease.atlassian.enter,
    },

    popupExit: {
      duration: duration.ui.press,
      ease: ease.atlassian.exit,
    },

    modalEnter: {
      duration: duration.ui.enter,
      ease: ease.atlassian.move,
    },

    modalExit: {
      duration: duration.ui.exit,
      ease: ease.atlassian.exit,
    },
  },
} as const;

// --------------------------------------------------
// Cursor — project-specific interaction tokens
// Distances: px; rotations: degrees; durations: seconds.
// --------------------------------------------------
