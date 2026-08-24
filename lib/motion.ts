/**
 * lib/motion.ts
 * Shared Framer Motion variants used across the entire project.
 * Import these instead of defining local containerVariants / itemVariants.
 *
 * Easing philosophy (Emil Kowalski):
 *   - Entering elements: ease-out (immediate movement, user sees response at once)
 *   - On-screen movement: ease-in-out (natural acceleration / deceleration)
 *   - Custom curves beat CSS presets — the strong expo-out below has real punch
 *
 * Custom curves used throughout:
 *   [0.22, 1, 0.36, 1]  — strong ease-out, good for reveals and entrances
 *   [0.23, 1, 0.32, 1]  — slightly wider ease-out, good for UI interactions
 */

import type { Variants } from 'framer-motion';

/** Staggered container — animates children one after another */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    /* delayChildren: 0 — no dead time before first item moves */
    /* staggerChildren: 0.06 — 60ms cascade, visible but not sluggish */
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

/** Standard fade + slide up — the most common item animation */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    /* 500ms, strong ease-out — tightened from 600ms without losing marketing rhythm */
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade + scale in — for cards, badges, media */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade in with no vertical movement — for overlays, backgrounds */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/** Slide in from the side — RTL-aware */
export function slideIn(isRTL: boolean): Variants {
  return {
    hidden: { opacity: 0, x: isRTL ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      /* 550ms — tightened from 800ms; strong curve gives snap */
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/** Slide in from left — for the left column of two-column detail layouts */
export const slideInLeft: Variants = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Slide in from right — for the right column of two-column detail layouts */
export const slideInRight: Variants = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/** Slide in for alternating timeline items (left / right sides) */
export function slideInAlt(fromLeft: boolean): Variants {
  return {
    hidden: { opacity: 0, x: fromLeft ? -40 : 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };
}

/** Slower stagger — for large grids */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
};

/** Standard viewport config — fires once when 20% visible */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Viewport config for more in-view context — 30% visible */
export const viewportOnceLarge = { once: true, amount: 0.3 } as const;

/** Hero entrance — slightly slower, used for page-level headings */
export const heroEntrance: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    /* Explicit easing — without it, Framer Motion defaults to a spring with hidden bounce */
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
