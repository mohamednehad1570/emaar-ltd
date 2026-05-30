'use client';

/* Wraps the app in Framer Motion's MotionConfig so that
   prefers-reduced-motion: reduce is respected globally.
   All motion.* components inherit reducedMotion="user" without
   needing per-component useReducedMotion() calls.             */
import { MotionConfig } from 'framer-motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
