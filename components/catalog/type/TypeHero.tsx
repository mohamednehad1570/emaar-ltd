'use client';

/**
 * components/catalog/type/TypeHero.tsx
 *
 * Product-type hero. Physical layout is FIXED in EN and AR (the section is dir=ltr):
 *  • ≥768 — 16:9 image at 85% width on the physical right; frosted text panel straddles
 *    the image's left edge (~25% outside, ~75% over it), vertically centred.
 *  • <768 — full-bleed 4:3 image; panel overlaps its lower edge (~40% on the image).
 *  • Legend plate — always the image's physical bottom-right corner.
 * Only the panel/legend text follows the language (dir + text-start).
 *
 * Entrance: image fade 0.5s; panel fade + 16px rise 0.5s after 0.1s. MotionConfig
 * (reducedMotion="user") strips the rise so reduced motion gets opacity only.
 */

import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { TYPE_PAGE_COPY as COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import ImageSlot from '@/components/ui/ImageSlot';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import type { TypePageView } from '../types';
import TypeLegend from './TypeLegend';

// Strong ease-out from lib/motion — entrances feel immediate, then settle
const EASE = [0.22, 1, 0.36, 1] as const;

export default function TypeHero({ view }: { view: TypePageView }) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const name = t(view.name.en, view.name.ar);
  const eyebrow = [view.groupLabel, view.mechanism?.label]
    .flatMap((l) => (l && l.en ? [t(l.en, l.ar)] : []))
    .join(' · ');

  return (
    // dir=ltr pins the image/panel/legend geometry; never mirrored in Arabic
    <section dir="ltr" className="bg-off-white pt-[calc(var(--header-h)+var(--logo-overhang)+32px)] pb-12 md:pb-16">
      <Container>
        <div className="relative">
          {/* ── Image ───────────────────────────────────────── */}
          {/* -mx cancels Container gutters (px-4 / sm:px-6) so the phone image bleeds edge to edge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative -mx-4 sm:-mx-6 md:mx-0 md:w-[85%] md:ml-auto overflow-hidden md:rounded-card"
          >
            <ImageSlot
              src={view.heroImage}
              alt={name}
              ratio="16/9"
              className="rounded-none aspect-4/3 md:aspect-video"
              priority
              sizes="(min-width:768px) 85vw, 100vw"
            />
            {/* ── Legend ────────────────────────────────────── */}
            {/* <768 the panel covers the bottom 96px (-mt-24), so the plate lifts to 96+16px
                to stay in the visible bottom-right corner */}
            <div className="absolute right-4 bottom-28 md:bottom-4">
              <TypeLegend materials={view.materials} />
            </div>
          </motion.div>

          {/* ── Text panel ──────────────────────────────────── */}
          {/* Desktop: 40%-wide column at left 5% → image edge (15%) cuts it at ~25% / 75% */}
          <div className="relative -mt-24 md:mt-0 md:absolute md:inset-y-0 md:left-[5%] md:w-[40%] md:flex md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="w-full bg-white/75 backdrop-blur-md border border-border-light shadow-warm-sm rounded-card p-6 lg:p-8 text-start"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted mb-3">{eyebrow}</p>

              {view.tier && (
                <span
                  className={cn(
                    'inline-block mb-3 px-2 py-0.5 border text-[11px] font-semibold uppercase tracking-[0.22em]',
                    // Gold is reserved for distinction — flagship only; "special" stays neutral
                    view.tier === 'flagship' ? 'border-gold text-gold' : 'border-border-medium text-ink-body',
                  )}
                >
                  {view.tier === 'flagship' ? t(COPY.flagship.en, COPY.flagship.ar) : t(COPY.special.en, COPY.special.ar)}
                </span>
              )}

              <h1 className="font-extrabold text-ink-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-[1.05] tracking-[-0.02em]">
                {name}
              </h1>

              {/* Placeholder types carry unverified copy — the description stays off the page */}
              {!view.placeholder && (
                <p className="mt-3 text-ink-body leading-relaxed line-clamp-3">
                  {t(view.description.en, view.description.ar)}
                </p>
              )}

              <Button
                variant="primary"
                size="md"
                href={`/contact?product=${view.slug}`}
                className="mt-6"
                icon={<ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} aria-hidden="true" />}
              >
                {t(COPY.requestQuote.en, COPY.requestQuote.ar)}
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
