'use client';

/**
 * components/products/ProductGrid.tsx
 *
 * Shared grid renderer consumed by both ProductCategoryPage (L3) and the
 * unified /products catalog. Owns three states: populated, loading, and empty.
 *
 * Design rules enforced:
 *   • Cards: 2px radius, no shadow at rest, shadow-warm-lg on hover
 *   • Loading: silver shimmer skeleton (never use CSS opacity pulse on color tokens)
 *   • Empty: Phosphor Package icon + bilingual message + CTA to /products
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

// ── Types ─────────────────────────────────────────────────────────────────────

/** Normalised product shape passed into the grid — resolved for current language */
export interface DisplayProduct {
  id:          string;
  slug:        string;
  material:    'upvc' | 'aluminum';
  category:    string;
  title:       string;
  description: string;
  image:       string;
  badge?:      string;
}

interface Props {
  products:     DisplayProduct[];
  isLoading:    boolean;
  emptyMessage: string;
  /** Label on the empty-state CTA button */
  emptyCtaLabel?: string;
  isRTL:        boolean;
}

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-[2px] overflow-hidden" aria-hidden="true">
      {/* Silver shimmer on brand-silver-light base — warm palette, not grey */}
      <div className="h-52 bg-[#E4E2DC] animate-pulse" />
      <div className="p-5 space-y-3 bg-white">
        <div className="h-4 w-3/4 bg-[#E4E2DC] animate-pulse rounded-[1px]" />
        <div className="h-3 w-full  bg-[#E4E2DC] animate-pulse rounded-[1px]" />
        <div className="h-3 w-2/3  bg-[#E4E2DC] animate-pulse rounded-[1px]" />
      </div>
    </div>
  );
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({ product, isRTL }: { product: DisplayProduct; isRTL: boolean }) {
  const href = `/products/${product.material}/${product.category}/${product.slug}`;

  return (
    <Link href={href} className="group block rounded-[2px] overflow-hidden border border-border-light hover:border-silver-material transition-colors duration-300 hover:shadow-warm-lg">
      {/* ── Image ─────────────────────────────────────────────────────────── */}
      <div className="relative h-52 overflow-hidden bg-cream">
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {product.badge && (
          /* Badge pill — reading-start corner so it never overlaps text */
          <span className={cn(
            'absolute top-3 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]',
            'bg-brand-red text-white',
            isRTL ? 'left-3' : 'right-3',
          )}>
            {product.badge}
          </span>
        )}
      </div>

      {/* ── Text ──────────────────────────────────────────────────────────── */}
      <div className={cn('p-5 bg-white', isRTL ? 'text-right' : 'text-left')}>
        <h3 className="text-base font-bold font-cairo text-ink-heading leading-snug mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-ink-body leading-relaxed line-clamp-2">
          {product.description}
        </p>
        {/* Animated accent underline on hover — reading-start edge */}
        <div className={cn('mt-4 h-0.5 w-8 bg-brand-red transition-all duration-300 group-hover:w-12', isRTL ? 'mr-auto' : 'ml-0')} />
      </div>
    </Link>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────

export default function ProductGrid({ products, isLoading, emptyMessage, emptyCtaLabel = 'Browse All', isRTL }: Props) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      /* Centred empty state — direction-agnostic layout */
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <Package size={48} className="text-ink-muted" />
        <p className="text-ink-body text-base max-w-xs">{emptyMessage}</p>
        <Link
          href="/products"
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3 bg-brand-red text-white text-sm font-bold',
            'hover:bg-brand-red-dark transition-colors duration-200',
            isRTL ? 'flex-row-reverse' : '',
          )}
        >
          {emptyCtaLabel}
          <ArrowRight className={cn('w-4 h-4', isRTL ? 'rotate-180' : '')} />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => <ProductCard key={p.id} product={p} isRTL={isRTL} />)}
    </div>
  );
}
