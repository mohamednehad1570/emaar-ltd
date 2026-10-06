'use client';

/**
 * components/home/FeaturedProductCard.tsx
 *
 * One tile in the homepage 4-up featured products grid. The whole card is a
 * single <Link> so the hit area is the full tile (well over 44px).
 *
 * Motion split:
 *   • Entrance (opacity / y) lives on the parent motion.li — Framer Motion.
 *   • Hover lift / border / shadow / image zoom / arrow nudge are Tailwind
 *     `hover:` utilities on the Link, so they never fight Framer's transform
 *     and only fire on hover-capable pointers (v4 wraps hover: in
 *     @media (hover: hover)).
 */

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import ImageSlot from '@/components/ui/ImageSlot';
import { useTranslation } from '@/contexts/LanguageContext';
import type { FeaturedProduct } from '@/lib/data/uiStrings';
import { cn } from '@/lib/cn';

interface FeaturedProductCardProps {
  product: FeaturedProduct;
  /** Reduced motion drops the lift, image zoom and arrow nudge — colour changes stay */
  reduceMotion: boolean;
}

export default function FeaturedProductCard({ product, reduceMotion }: FeaturedProductCardProps) {
  const t = useTranslation();
  const name = t(product.name.en, product.name.ar);

  return (
    <Link
      href={product.href}
      aria-label={name}
      className={cn(
        // 0.5px hairline per spec; rounded-sm = 8px card radius in globals.css
        'group flex h-full flex-col overflow-hidden rounded-sm border-[0.5px] border-border-light bg-surface-white shadow-warm-sm',
        // Only border / shadow / transform transition — ≤0.4s per interaction budget
        'transition-[border-color,box-shadow,translate,scale] duration-300 ease-out',
        'hover:border-silver-material hover:shadow-warm-md',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-material',
        // Touch feedback — active fires on tap where hover never does
        'active:scale-98',
        !reduceMotion && 'hover:-translate-y-0.5',
      )}
    >
      {/* ── Image ───────────────────────────────────────────── */}
      <div className="overflow-hidden">
        <div
          className={cn(
            'transition-[scale] duration-400 ease-out',
            !reduceMotion && 'group-hover:scale-103',
          )}
        >
          {/* Square on phones keeps two columns from turning into thin strips; 4:3 from md */}
          <ImageSlot
            src={product.image}
            alt={name}
            ratio="4/3"
            className="aspect-square rounded-none md:aspect-4/3"
            sizes="(min-width:1024px) 25vw, 50vw"
          />
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-3 md:p-4">
        {/* text-ink-body (not muted) — muted on silver fails contrast at this size */}
        <span className="self-start bg-silver-material px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-body">
          {t(product.material.en, product.material.ar)}
        </span>

        <h3 className="mt-2 text-base font-bold leading-snug text-ink-heading md:text-xl">
          {name}
        </h3>

        {/* Tagline hidden on phones — the 2-col cards are too narrow for a second line */}
        <p className="mt-1 hidden text-sm leading-relaxed text-ink-body md:block">
          {t(product.tagline.en, product.tagline.ar)}
        </p>

        {/* mt-auto pins the arrow to the card foot so rows align despite tagline length */}
        <span className="mt-auto flex justify-end pt-2">
          <ArrowRight
            size={16}
            aria-hidden="true"
            className={cn(
              'text-ink-muted transition-[translate,color] duration-300 group-hover:text-ink-heading',
              // Arrow points toward the reading direction: mirrored in RTL
              'rtl:-scale-x-100',
              // Nudge follows reading direction — right in LTR, left in RTL
              !reduceMotion && 'ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1',
            )}
          />
        </span>
      </div>
    </Link>
  );
}
