# Tawsya — Marketing Site

Marketing site for Tawsya (Salla merchandising platform), built with Next.js 16,
React 19, Tailwind CSS v4 and GSAP.

## Stack

| Layer      | Choice                                                     |
| ---------- | ---------------------------------------------------------- |
| Framework  | Next.js 16.4 (App Router, Turbopack, Cache Components)      |
| UI         | React 19, Tailwind CSS v4 (via `@tailwindcss/turbopack`)    |
| Motion     | GSAP 3.15 + `@gsap/react`, SplitText, DrawSVG, ScrollTrigger |
| Smoothing  | Lenis                                                      |
| Icons      | lucide-react                                               |
| Type-check | TypeScript 5                                               |

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Production build:

```bash
pnpm build
pnpm start
```

## Project structure

```
app/                 Next.js App Router (layout, page, globals.css)
components/
  cursor/            Leaf cursor: geometry, particles, burst + hover motion
  hero/              Hero section, its GSAP timeline and generated SVG paths
  impact/            Impact section (pinned panel, image reveals)
  value/             Value section (scroll-driven content + visuals)
  layouts/           Navbar
  motion/            Shared nav motion
  providers/         GSAP provider
  ui/                Small primitives (ButtonLink, Dots)
content/             Section copy and nav items
lib/animations/      GSAP setup, tokens, useSectionMotion hook, scroll config
types/               Shared TypeScript types
public/              Images (hero, impact, value) and logos
```

Motion configuration lives next to each section (`components/*/motion/config.ts`)
and shared design tokens (durations, eases, distances) in
`lib/animations/tokens.ts`.

## Accessibility notes

- All decorative SVGs carry `aria-hidden="true"`.
- GSAP runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`,
  so the layout is static for users who ask for reduced motion.

## Deployment

Built for Vercel. This directory is the project root:

- Framework preset: **Next.js**
- Install command: default (`pnpm install`)
- Build command: default (`pnpm build`)
- Node.js: **22.x** (minimum 20.9)
- pnpm version is pinned through the `packageManager` field in `package.json`.

## License

Proprietary — © Tawsya. All rights reserved.
