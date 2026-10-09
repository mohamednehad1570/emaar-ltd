'use client';

/**
 * components/catalog/type/TypeHero.tsx
 *
 * Product-type hero. Physical layout is FIXED in EN and AR (the section is dir=ltr):
 *  • ≥768 — 16:9 image at 85% width on the physical right; a TRANSPARENT text panel
 *    straddles the image's left edge (~25% outside, ~75% over it), vertically centred.
 *    Readability comes from a warm off-white scrim on the image's physical left side.
 *  • <768 — full-bleed 4:3 image; panel overlaps its lower edge, scrim rises from the bottom.
 *  • Legend — no plate; sits on a radial corner scrim at the image's physical bottom-right.
 * Only the panel/legend text follows the language (dir + text-start). Scrims use the
 * off-white token (245,244,240) — never black — so they read as light, not shadow.
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
import { TYPE_HERO_TAG } from '@/lib/data/placeholderPhotos';

// Strong ease-out from lib/motion — entrances feel immediate, then settle
const EASE = [0.22, 1, 0.36, 1] as const;

export default function TypeHero({ view }: { view: TypePageView }) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const name = t(view.name.en, view.name.ar);
  // Short label trims "نافذة مفصلية" → "مفصلي" in AR; EN typically stays the same.
  // Falls back to label when shortLabel is not defined for that mechanism/variant.
  const eyebrowMechLabel = view.mechanism?.shortLabel ?? view.mechanism?.label;
  const eyebrow = [view.groupLabel, eyebrowMechLabel]
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
              // TEMPORARY review photo while heroImage is null — slot 0 of the gallery's key spread
              placeholderKey={`${view.slug}-g0`}
              placeholderTag={TYPE_HERO_TAG[view.group]}
            />
            {/* ── Scrims (physical, never mirrored) ─────────────── */}
            {/* ≥768: 0.85 held to 30% (under the panel's text column), clear by 55% */}
            <div aria-hidden="true" className="hidden md:block absolute inset-0 bg-linear-to-r from-off-white/85 from-30% to-transparent to-55%" />
            {/* <768: same strength rising from the bottom edge the panel overlaps */}
            <div aria-hidden="true" className="md:hidden absolute inset-0 bg-linear-to-t from-off-white/85 from-30% to-transparent to-65%" />

            {/* ── Legend on a 280×180 radial corner scrim ──────── */}
            {/* Ellipse radii = box size so it fades to 0 at the box edges (no hard seams);
                280×180 (brief: ~220×140) because the legend text reaches ~80% of a 220×140
                ellipse, where the scrim fell to 2.6:1 over a dark photo; 0.8 held to 60% */}
            {/* <768 the panel text covers the bottom 96px (-mt-24), so the legend lifts 96px (pb-28)
                but the box still reaches the image bottom and the ellipse is centred 96px up —
                it fades on downward instead of ending in a seam over the bottom scrim */}
            <div className="absolute right-0 bottom-0 w-[280px] h-[276px] md:h-[180px] flex items-end justify-end p-4 pb-28 md:pb-4 bg-radial-[280px_180px_at_100%_calc(100%_-_96px)] md:bg-radial-[280px_180px_at_100%_100%] from-off-white/80 from-60% to-transparent to-100%">
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
              // No plate (bg/border/shadow/blur) — the image scrim carries readability
              className="w-full p-6 lg:p-8 text-start"
            >
              {/* ink-body, not muted: the eyebrow sits on a photo now and needs 4.5:1 */}
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-body mb-3">{eyebrow}</p>

              {view.tier && (
                <span
                  className={cn(
                    'inline-block mb-3 px-2 py-0.5 border text-[11px] font-semibold uppercase tracking-[0.22em]',
                    // Gold is reserved for distinction — flagship only; "special" stays neutral.
                    // Gold FILL + ink text: gold text on a light scrim measured 2.1:1 (fails 4.5:1)
                    view.tier === 'flagship' ? 'bg-gold border-gold text-ink-heading' : 'border-border-medium text-ink-body',
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
