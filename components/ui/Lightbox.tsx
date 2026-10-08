'use client';

/**
 * components/ui/Lightbox.tsx
 *
 * Generic full-screen viewer — type-page gallery and the material page's Options module.
 * Controlled: the parent owns `index` (null = closed) and receives index changes.
 *  • Warm overlay rgba(45,41,38,0.92) + blur; image letterboxed (contain) inside a 4:3 frame.
 *  • Items may instead carry `swatchHex` (flat colour block) and `details` (label/value
 *    panel beside the media, below it <768) — see lightboxTypes.ts / LightboxBody.
 *  • Close: 48px button at the top-end corner, Esc, or a click on the backdrop.
 *  • Prev/next: buttons, ← / → keys and horizontal swipe — all follow reading direction
 *    (in Arabic "next" is to the left).
 *  • Focus is trapped while open and returns to the opener on close (useFocusTrap).
 * Rendered through a portal on <body> so transformed ancestors can't clip `fixed`.
 */

import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, type PanInfo } from 'framer-motion';
import { X } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { LIGHTBOX_COPY as COPY } from '@/lib/data/uiStrings';
import { useFocusTrap } from '@/lib/hooks/useFocusTrap';
import { useIsClient } from '@/lib/hooks/useIsClient';
import LightboxArrows from './LightboxArrows';
import LightboxBody from './LightboxBody';
import type { LightboxItem } from './lightboxTypes';

export type { LightboxDetail, LightboxItem } from './lightboxTypes';

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

// 60px of horizontal drag reads as an intentional swipe, not a wobbly tap
const SWIPE_PX = 60;

export default function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const isClient = useIsClient();
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const open = index !== null && items.length > 0;
  const count = items.length;
  useFocusTrap(dialog, open, closeBtn);

  // step +1 = next in reading order; modulo wraps both ends
  const go = useCallback((step: 1 | -1) => {
    if (index === null || count < 2) return;
    onIndexChange((index + step + count) % count);
  }, [index, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    // Physical keys map to reading direction: → is "next" in EN, "previous" in AR
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') go(isRTL ? -1 : 1);
      else if (e.key === 'ArrowLeft') go(isRTL ? 1 : -1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, go, onClose, isRTL]);

  // Swipe left = next in LTR; mirrored in RTL to match the arrow keys
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) < SWIPE_PX) return;
    const towardStart = info.offset.x < 0;
    go(towardStart !== isRTL ? 1 : -1);
  };

  if (!isClient) return null;
  const item = index !== null ? items[index] : undefined;

  return createPortal(
    <AnimatePresence>
      {open && item && (
        <motion.div
          key="lightbox"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={t(COPY.dialog.en, COPY.dialog.ar)}
          dir={isRTL ? 'rtl' : 'ltr'}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          // 0.2s — fast enough that the viewer feels like part of the click
          transition={{ duration: 0.2 }}
          // z-[90]: above the header (50), quote bar (40) and mobile overlay (60/70).
          // overflow-y-auto: media + details stacked on a phone can outgrow the viewport
          className="fixed inset-0 z-[90] overflow-y-auto bg-warm-ink/92 backdrop-blur-md"
          onClick={(e) => { if ((e.target as HTMLElement).dataset.backdrop) onClose(); }}
          data-backdrop="true"
        >
          {/* ── Close (top-end corner) ──────────────────────── */}
          <button
            ref={closeBtn}
            type="button"
            onClick={onClose}
            aria-label={t(COPY.close.en, COPY.close.ar)}
            className="absolute top-4 end-4 z-10 size-12 flex items-center justify-center text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* ── Media (+ details) ───────────────────────────── */}
          {/* min-h-full centres short content; py-16 clears the 48px close button when it scrolls */}
          <div data-backdrop="true" className="flex min-h-full items-center justify-center px-4 py-16">
            <LightboxBody item={item} index={index ?? 0} count={count} onDragEnd={onDragEnd} />
          </div>

          {/* ── Prev / next (start / end edges) ─────────────── */}
          {count > 1 && <LightboxArrows onStep={go} />}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
