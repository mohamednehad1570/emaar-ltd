'use client';

/**
 * components/catalog/material/TypeCard.tsx
 *
 * One product type in the material page grid — the whole card is a single <Link> to
 * /products/[slug]. Hover lift / border / shadow / image zoom are Tailwind `hover:` utilities
 * (same split as FeaturedProductCard) so they never fight Framer's entrance transform and only
 * fire on hover-capable pointers; MaterialTypes passes `reduceMotion` to drop the movement.
 */

import Link from 'next/link';
import { useTranslation } from '@/contexts/LanguageContext';
import { CATALOG_PAGE_COPY, TYPE_PAGE_COPY } from '@/lib/data/uiStrings';
import { TYPE_HERO_TAG } from '@/lib/data/placeholderPhotos';
import ImageSlot from '@/components/ui/ImageSlot';
import { cn } from '@/lib/cn';
import MaterialSwatch from '../type/MaterialSwatch';
import { getPictogram } from '../pictograms';
import type { TypeCardView } from '../types';

export default function TypeCard({ type, reduceMotion }: { type: TypeCardView; reduceMotion: boolean }) {
  const t = useTranslation();
  const name = t(type.name.en, type.name.ar);
  // Decorative (no label) — the mechanism name is the text beside it. Muted → heading on card hover
  const pictogram = getPictogram(type.mechanismId, {
    size: 40,
    className: 'text-ink-muted transition-colors duration-300 group-hover:text-ink-heading',
  });

  return (
    <Link
      href={`/products/${type.slug}`}
      data-testid="type-card"
      className={cn(
        // rounded-card = 2px card token; no resting shadow (CLAUDE.md)
        'group relative flex h-full flex-col overflow-hidden rounded-card border border-border-light bg-surface-white',
        // Only border / shadow / translate transition — 0.3s sits inside the 0.4s interaction budget
        'transition-[border-color,box-shadow,translate] duration-300 ease-out',
        'hover:border-silver-material hover:shadow-warm-md',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red',
        !reduceMotion && 'hover:-translate-y-0.5',
      )}
    >
      {/* ── Image ───────────────────────────────────────────── */}
      <div className="overflow-hidden">
        {/* 0.4s zoom — slow enough to read as a camera push, not a jump */}
        <div className={cn('transition-[scale] duration-400 ease-out', !reduceMotion && 'group-hover:scale-103')}>
          <ImageSlot
            src={type.heroImage}
            alt={name}
            ratio="4/3"
            className="rounded-none"
            sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
            // TEMPORARY — same key + tag as the type page hero, so card and hero show one photo
            placeholderKey={`${type.slug}-g0`}
            placeholderTag={TYPE_HERO_TAG[type.group]}
          />
        </div>
      </div>

      {/* ── Tier badge (top-start corner) ─────────────────── */}
      {type.tier && (
        <span
          className={cn(
            'absolute top-2 start-2 px-2 py-0.5 border text-[11px] font-semibold uppercase tracking-[0.22em]',
            // Matches TypeHero: gold fill + ink text for flagship only; "special" stays neutral
            type.tier === 'flagship' ? 'bg-gold border-gold text-ink-heading' : 'bg-surface-white border-border-medium text-ink-body',
          )}
        >
          {type.tier === 'flagship' ? t(TYPE_PAGE_COPY.flagship.en, TYPE_PAGE_COPY.flagship.ar) : t(TYPE_PAGE_COPY.special.en, TYPE_PAGE_COPY.special.ar)}
        </span>
      )}

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        {/* Pictogram sits at the inline-end corner (left in AR); only its position flips, never the drawing */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-base md:text-lg font-bold leading-snug text-ink-heading">{name}</h4>
            {type.mechanism && (
              <p className="mt-0.5 text-xs md:text-sm text-ink-muted">{t(type.mechanism.en, type.mechanism.ar)}</p>
            )}
          </div>
          {pictogram}
        </div>

        {/* Static "Available in" row — mt-auto pins it to the card foot so rows align */}
        <div className="mt-auto pt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-body">
          <span className="sr-only">{t(CATALOG_PAGE_COPY.availableIn.en, CATALOG_PAGE_COPY.availableIn.ar)}</span>
          {type.materials.map((m) => (
            <span key={m.id} className="inline-flex items-center gap-1.5 font-semibold">
              <MaterialSwatch id={m.id} className="size-2.5" />
              {t(m.name.en, m.name.ar)}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
