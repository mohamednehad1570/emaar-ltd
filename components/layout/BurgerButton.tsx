'use client';

/**
 * components/layout/BurgerButton.tsx
 *
 * 3-bar burger → ✕ for the <1024px header. Bars are 2px tall with a 5px gap, so
 * centre-to-centre is 7px: the outer bars translate ±7px onto the middle bar and
 * rotate ±45° to form the cross while the middle bar fades and collapses.
 */

import { motion } from 'framer-motion';

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 25 };
const BAR = 'block w-6 h-0.5 rounded-full origin-center';

interface Props {
  open:     boolean;
  controls: string;
  onToggle: () => void;
  /** White bars over the homepage hero while the header bar is transparent */
  onDark?:  boolean;
}

export default function BurgerButton({ open, controls, onToggle, onDark = false }: Props) {
  const bar = `${BAR} ${onDark ? 'bg-white' : 'bg-brand-dark'}`;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls={controls}
      // 44×44 touch target; -me-2 pulls the bars flush with the container's end edge
      className="flex flex-col items-center justify-center gap-[5px] w-11 h-11 -me-2"
    >
      <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} transition={SPRING} className={bar} />
      <motion.span animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} transition={SPRING} className={bar} />
      <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} transition={SPRING} className={bar} />
    </button>
  );
}
