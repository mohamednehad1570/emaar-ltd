'use client';

/**
 * components/products/ProductGrid.tsx
 *
 * Shared grid renderer consumed by ProductCategoryPage (L3) and the unified
 * /products catalog. Handles three states: populated, loading, and empty.
 * ProductCard is extracted to ProductCard.tsx to keep each file under 150 lines.
 *
 * Design rules enforced:
 *   • Loading: silver shimmer skeleton using brand-silver-light (#E4E2DC)
 *   • Empty: Package icon + bilingual message + CTA to /products
 */

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Package, ArrowRight } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';
import { staggerContainerSlow, fadeUp, viewportOnce } from '@/lib/motion';
import ProductCard from './ProductCard';

// ── Types ─────────────────────────────────────────────────────────────────────

/** Normalised product shape — language-resolved before passing to the grid */
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
  products:       DisplayProduct[];
  isLoading:      boolean;
  emptyMessage:   string;
  emptyCtaLabel?: string;
  isRTL:          boolean;
  /** Passed to ProductCard for bilingual metadata chip rendering */
  language?:      'en' | 'ar';
}

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-[2px] overflow-hidden" aria-hidden="true">
      {/* Silver shimmer on brand-silver-light base — warm palette, not grey */}
      <div className="h-52 bg-[#E4E2DC] animate-pulse" />
      <div className="p-5 space-y-3 bg-white">
        <div className="h-3 w-1/3 bg-[#E4E2DC] animate-pulse rounded-[1px]" />
        <div className="h-4 w-3/4 bg-[#E4E2DC] animate-pulse rounded-[1px]" />
        <div className="h-3 w-full  bg-[#E4E2DC] animate-pulse rounded-[1px]" />
        <div className="h-3 w-2/3  bg-[#E4E2DC] animate-pulse rounded-[1px]" />
      </div>
    </div>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────

export default function ProductGrid({
  products, isLoading, emptyMessage, emptyCtaLabel = 'Browse All', isRTL, language = 'en',
}: Props) {
  const shouldReduce = useReducedMotion();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            isRTL && 'flex-row-reverse',
          )}
        >
          {emptyCtaLabel}
          <ArrowRight className={cn('w-4 h-4', isRTL && 'rotate-180')} />
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={staggerContainerSlow}
      initial={shouldReduce ? {} : 'hidden'}
      whileInView={shouldReduce ? undefined : 'visible'}
      viewport={shouldReduce ? undefined : viewportOnce}
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={shouldReduce ? {} : fadeUp}>
          <ProductCard product={p} isRTL={isRTL} language={language} />
        </motion.div>
      ))}
    </motion.div>
  );
}
