'use client';

/**
 * components/catalog/material/OptionGrid.tsx
 *
 * The Options tab panel. A tab or sub-tab change swaps the grid through
 * AnimatePresence mode="wait": old grid fades out in 0.15s, new cards fade + rise 16px
 * over 0.4s with a 0.05s stagger. MotionConfig (reducedMotion="user") strips the rise,
 * leaving opacity only. Stagger follows DOM order, so it runs right-to-left in Arabic.
 *
 * Layout shift: the wrapper's min-height is pinned to the outgoing grid's height when the
 * key changes and released once the last card has landed, so the page below never jumps
 * mid-animation.
 */

import { useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import type { OptionCardView } from '../types';
import OptionCard from './OptionCard';

const EASE = [0.22, 1, 0.36, 1] as const;
// Stagger capped at 12 steps (0.55s) — a 30-swatch tab would otherwise take 1.5s to fill
const STAGGER_CAP = 11;

const GRID: Variants = {
  hidden: {},
  visible: {},
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
const ITEM: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: EASE, delay: Math.min(i, STAGGER_CAP) * 0.05 },
  }),
};

interface OptionGridProps {
  gridKey: string;
  items: OptionCardView[];
  reduceMotion: boolean;
  // Lightbox index for a card, or null when it has nothing to enlarge
  lightboxIndex: (card: OptionCardView) => number | null;
  onOpen: (index: number) => void;
  panelId: string;
  labelledBy: string;
}

export default function OptionGrid({ gridKey, items, reduceMotion, lightboxIndex, onOpen, panelId, labelledBy }: OptionGridProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const firstKey = useRef(gridKey);

  // Runs before paint while the outgoing grid is still in the DOM (mode="wait") — pin its height
  useLayoutEffect(() => {
    if (gridKey === firstKey.current || !wrap.current) return;
    wrap.current.style.minHeight = `${wrap.current.offsetHeight}px`;
  }, [gridKey]);

  const release = () => { if (wrap.current) wrap.current.style.minHeight = ''; };

  return (
    <div ref={wrap} id={panelId} role="tabpanel" aria-labelledby={labelledBy} data-testid="option-grid">
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={gridKey}
          variants={GRID}
          initial="hidden" animate="visible" exit="exit"
          // 16px gaps; 2 / 3 / 4 columns at <768 / ≥768 / ≥1280
          className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4"
        >
          {items.map((card, i) => {
            const idx = lightboxIndex(card);
            return (
              <motion.li
                key={card.id}
                variants={ITEM}
                custom={i}
                // The last card lands last (largest delay), so its 'visible' completion releases the
                // lock — the outgoing grid's cards also report completion when exit starts, so filter
                onAnimationComplete={i === items.length - 1 ? (def) => { if (def === 'visible') release(); } : undefined}
              >
                <OptionCard card={card} reduceMotion={reduceMotion} onOpen={idx === null ? undefined : () => onOpen(idx)} />
              </motion.li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
