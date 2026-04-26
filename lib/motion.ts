/**
 * lib/motion.ts
 * Shared Framer Motion variants used across the entire project.
 * Import these instead of defining local containerVariants / itemVariants.
 */

import type { Variants } from 'framer-motion';

/** Staggered container — animates children one after another */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

/** Standard fade + slide up — the most common item animation */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade + scale in — for cards, badges, media */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Fade in with no vertical movement — for overlays, backgrounds */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

/** Slide in from the side — RTL-aware */
export function slideIn(isRTL: boolean): Variants {
  return {
    hidden: { opacity: 0, x: isRTL ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };
}

/** Slide in for alternating timeline items (left / right sides) */
export function slideInAlt(fromLeft: boolean): Variants {
  return {
    hidden: { opacity: 0, x: fromLeft ? -50 : 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };
}

/** Slower stagger — for large grids */
export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

/** Standard viewport config — fires once when 20% visible */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Viewport config for more in-view context — 30% visible */
export const viewportOnceLarge = { once: true, amount: 0.3 } as const;

/** Hero entrance — extra slow, used for page-level headings */
export const heroEntrance: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};
