'use client';

/**
 * components/catalog/material/MaterialHero.tsx
 *
 * Material landing hero — same visual language as TypeHero, without the legend.
 * Layout is logical — Arabic is the exact mirror of English:
 *  • ≥768 — 16:9 image at 85% width on the inline-end side (right in EN, left in AR); a
 *    TRANSPARENT text panel straddles its inline-start edge over a warm off-white scrim.
 *  • <768 — full-bleed 4:3 image; panel overlaps its lower edge over a bottom scrim.
 * Panel text aligns with text-start.
 *
 * Entrance: image fade 0.5s; panel fade + 16px rise 0.5s after 0.1s. MotionConfig
 * (reducedMotion="user") strips the rise so reduced motion gets opacity only.
 */

import { motion } from 'framer-motion';
import { ArrowForward } from '@/components/ui/DirectionalIcon';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY, TYPE_PAGE_COPY } from '@/lib/data/uiStrings';
import Container from '@/components/layout/Container';
import ImageSlot from '@/components/ui/ImageSlot';
import Button from '@/components/ui/Button';
import type { MaterialPageView } from '../types';

// Strong ease-out from lib/motion — entrances feel immediate, then settle
const EASE = [0.22, 1, 0.36, 1] as const;

export default function MaterialHero({ view }: { view: MaterialPageView }) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const name = t(view.name.en, view.name.ar);

  return (
    // Geometry is logical (ms-auto / start-[5%]) — Arabic is the exact mirror
    <section className="bg-off-white pt-[calc(var(--header-h)+var(--logo-overhang)+32px)] pb-12 md:pb-16">
      <Container>
        <div className="relative">
          {/* ── Image ───────────────────────────────────────── */}
          {/* -mx cancels Container gutters (px-4 / sm:px-6) so the phone image bleeds edge to edge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            data-hero-image
            className="relative -mx-4 sm:-mx-6 md:mx-0 md:w-[85%] md:ms-auto overflow-hidden md:rounded-card"
          >
            <ImageSlot
              src={view.heroImage}
              alt={name}
              ratio="16/9"
              className="rounded-none aspect-4/3 md:aspect-video"
              priority
              sizes="(min-width:768px) 85vw, 100vw"
              // TEMPORARY review photo while heroImage is null
              placeholderKey={`material-${view.id}`}
              placeholderTag="exterior"
            />
            {/* ── Scrims (mirror with the panel side) ──────────── */}
            {/* ≥768: 0.85 held to 30% (under the panel's text column), clear by 55%; runs from the
                panel side — left→right in EN, right→left in AR */}
            <div aria-hidden="true" className="hidden md:block absolute inset-0 bg-linear-to-r rtl:bg-linear-to-l from-off-white/85 from-30% to-transparent to-55%" />
            {/* <768: same strength rising from the bottom edge the panel overlaps */}
            <div aria-hidden="true" className="md:hidden absolute inset-0 bg-linear-to-t from-off-white/85 from-30% to-transparent to-65%" />
          </motion.div>

          {/* ── Text panel ──────────────────────────────────── */}
          {/* Desktop: 40%-wide column at inline-start 5% → image edge (15%) cuts it at ~25% / 75% */}
          <div data-hero-panel className="relative -mt-24 md:mt-0 md:absolute md:inset-y-0 md:start-[5%] md:w-[40%] md:flex md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              dir={isRTL ? 'rtl' : 'ltr'}
              // No plate (bg/border/shadow/blur) — the image scrim carries readability
              className="w-full p-6 lg:p-8 text-start"
            >
              {/* ink-body, not muted: the eyebrow sits on a photo and needs 4.5:1 */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-body mb-3">
                {t(CATALOG_PAGE_COPY.materialEyebrow.en, CATALOG_PAGE_COPY.materialEyebrow.ar)}
              </p>

              <h1 className="font-extrabold text-ink-heading text-[clamp(2.75rem,5vw,5rem)] leading-[0.9] tracking-[-0.02em]">
                {name}
              </h1>

              <p className="mt-4 text-ink-body leading-relaxed line-clamp-3">{t(view.pitch.en, view.pitch.ar)}</p>

              <Button
                variant="primary"
                size="md"
                href="/contact"
                className="mt-6"
                icon={<ArrowForward className="w-4 h-4" aria-hidden="true" />}
              >
                {t(TYPE_PAGE_COPY.requestQuote.en, TYPE_PAGE_COPY.requestQuote.ar)}
              </Button>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
