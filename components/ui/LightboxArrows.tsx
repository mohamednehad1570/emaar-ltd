'use client';

/**
 * components/ui/LightboxArrows.tsx
 * Prev / next buttons for Lightbox, pinned to the start / end edges (logical, so they
 * swap sides in Arabic together with their carets). 48px squares — above the 44px minimum.
 */

import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useTranslation } from '@/contexts/LanguageContext';
import { LIGHTBOX_COPY as COPY } from '@/lib/data/uiStrings';

// Ghost-on-dark: brand-red fill on hover (white fill would vanish on the warm overlay)
const BTN = 'absolute top-1/2 -translate-y-1/2 size-12 flex items-center justify-center text-white bg-white/10 border border-white/25 hover:bg-brand-red hover:border-brand-red focus-visible:outline-2 focus-visible:outline-white';

export default function LightboxArrows({ onStep }: { onStep: (step: 1 | -1) => void }) {
  const t = useTranslation();
  return (
    <>
      <button type="button" onClick={() => onStep(-1)} aria-label={t(COPY.previous.en, COPY.previous.ar)} className={`${BTN} start-2 md:start-6`}>
        <CaretLeft size={22} aria-hidden="true" className="rtl:rotate-180" />
      </button>
      <button type="button" onClick={() => onStep(1)} aria-label={t(COPY.next.en, COPY.next.ar)} className={`${BTN} end-2 md:end-6`}>
        <CaretRight size={22} aria-hidden="true" className="rtl:rotate-180" />
      </button>
    </>
  );
}
