'use client';

/**
 * components/products/ProductCard.tsx
 *
 * Individual product card extracted from ProductGrid to keep both files under 150 lines.
 * Adds a "Material · Category" metadata chip above the title so catalog browsers
 * can identify a product's system at a glance without opening the detail page.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';
import type { DisplayProduct } from './ProductGrid';

// ── Label lookup maps ──────────────────────────────────────────────────────────

const MATERIAL_LABELS: Record<'upvc' | 'aluminum', { en: string; ar: string }> = {
  upvc:     { en: 'uPVC',      ar: 'uPVC'      },
  // Brand name "uPVC" is kept in Arabic; full Arabic name used for aluminum
  aluminum: { en: 'Aluminium', ar: 'الألومنيوم' },
};

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',         ar: 'نوافذ'          },
  doors:               { en: 'Doors',           ar: 'أبواب'          },
  'doors-and-windows': { en: 'Doors & Windows', ar: 'أبواب ونوافذ'   },
  staircases:          { en: 'Staircases',      ar: 'سلالم'          },
  'stained-glass':     { en: 'Stained Glass',   ar: 'زجاج ملون'      },
  sandblast:           { en: 'Sandblast',       ar: 'سندبلاست'       },
  hebeschibe:          { en: 'Hebeschibe',      ar: 'هيبيشيبه'       },
  skylights:           { en: 'Skylights',       ar: 'مناور'          },
};

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  product:  DisplayProduct;
  isRTL:    boolean;
  language: 'en' | 'ar';
}

export default function ProductCard({ product, isRTL, language }: Props) {
  const r    = useReducedMotion();
  const href = `/products/${product.material}/${product.category}/${product.slug}`;
  // Fall back to raw slug segments if the label map doesn't cover an edge-case value
  const materialLabel  = MATERIAL_LABELS[product.material]?.[language]        ?? product.material;
  const categoryLabel  = CATEGORY_LABELS[product.category]?.[language]        ?? product.category;

  return (
    <Link href={href} className={cn(
      'group block rounded-[2px] overflow-hidden border border-border-light',
      'hover:border-silver-material hover:shadow-warm-lg transition-all duration-300',
      !r && 'hover:-translate-y-0.5',
    )}>

      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden bg-cream">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn('object-cover transition-transform duration-700', !r && 'group-hover:scale-[1.03]')}
          />
        )}
        {product.badge && (
          /* Badge: reading-start corner so it never overlaps the title text */
          <span className={cn(
            'absolute top-3 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] bg-brand-red text-white',
            isRTL ? 'left-3' : 'right-3',
          )}>
            {product.badge}
          </span>
        )}
      </div>

      {/* ── Text ──────────────────────────────────────────────────────────── */}
      <div className={cn('p-5 bg-white', isRTL ? 'text-right' : 'text-left')}>
        {/* Metadata chip: uppercase tracking gives it label-scale weight without bold */}
        <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2">
          {materialLabel} · {categoryLabel}
        </p>
        <h3 className="text-base font-bold font-cairo text-ink-heading leading-snug mb-2 transition-colors duration-300 group-hover:text-brand-red">
          {product.title}
        </h3>
        <p className="text-sm text-ink-body leading-relaxed line-clamp-2">
          {product.description}
        </p>
        {/* Accent underline grows on hover from reading-start edge */}
        <div className={cn('mt-4 h-0.5 w-8 bg-brand-red transition-all duration-300 group-hover:w-12', isRTL ? 'mr-auto' : 'ml-0')} />
      </div>

    </Link>
  );
}
