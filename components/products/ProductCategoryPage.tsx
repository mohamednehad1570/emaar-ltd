'use client';

/**
 * components/products/ProductCategoryPage.tsx
 *
 * L3 category page — sidebar with locked material+category, spec-tag filters,
 * and the product grid on the opposite side.
 *
 * Sidebar is on the left in LTR and on the right in RTL (reading-start edge)
 * so the filter panel always leads the eye before the product content.
 */

import React, { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { SanityProductTile } from '@/lib/sanity/types';
import Container from '@/components/layout/Container';
import ProductFilterSidebar, { type FilterState } from './ProductFilterSidebar';
import ProductGrid, { type DisplayProduct } from './ProductGrid';

// ── Category label fallback — needed when Sanity category doesn't match map ──

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',         ar: 'نوافذ'        },
  doors:               { en: 'Doors',           ar: 'أبواب'        },
  'doors-and-windows': { en: 'Doors & Windows', ar: 'أبواب ونوافذ' },
  staircases:          { en: 'Staircases',      ar: 'سلالم'        },
  'stained-glass':     { en: 'Stained Glass',   ar: 'زجاج ملون'    },
  sandblast:           { en: 'Sandblast',       ar: 'سندبلاست'     },
  hebeschibe:          { en: 'Hebeschibe',      ar: 'هيبيشيبه'     },
  skylights:           { en: 'Skylights',       ar: 'مناور'        },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toDisplay(p: SanityProductTile, language: 'en' | 'ar'): DisplayProduct {
  return {
    id:          p._id,
    slug:        p.slug,
    material:    p.material,
    category:    p.category,
    title:       p.title[language] ?? p.title.en,
    description: p.description?.[language] ?? p.description?.en ?? '',
    image:       p.mainImage ?? '',
    badge:       p.badge,
  };
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  material:       'upvc' | 'aluminum';
  category:       string;
  sanityProducts: SanityProductTile[];
}

// ── Bilingual strings ─────────────────────────────────────────────────────────

const labels = {
  products:     { en: 'products',                        ar: 'منتج'                 },
  noResults:    { en: 'No products match your filters.', ar: 'لا توجد منتجات تطابق الفلاتر.' },
  clearFilters: { en: 'Clear filters',                   ar: 'مسح الفلاتر'          },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductCategoryPage({ material, category, sanityProducts }: Props) {
  const { language, isRTL } = useLanguage();

  // Sidebar filter state — specTags interactive; material & category are locked
  const [filters, setFilters] = useState<FilterState>({
    material:   material,
    categories: [category],
    specTags:   [],
  });

  // Category label in current language — fallback to slug if not in label map
  const categoryLabel = CATEGORY_LABELS[category]?.[language] ?? category;

  // Apply spec-tag filter only — material and category are locked by route
  const displayProducts = useMemo<DisplayProduct[]>(() => {
    const filtered = filters.specTags.length === 0
      ? sanityProducts
      : sanityProducts.filter((p) => {
          // specTags filter is advisory — products without specTags pass through
          if (!p.specTags?.length) return true;
          return filters.specTags.every((t) => p.specTags!.includes(t));
        });
    return filtered.map((p) => toDisplay(p, language));
  }, [filters.specTags, sanityProducts, language]);

  // Sidebar on reading-start side (left LTR, right RTL)
  const sidebarOrder = isRTL ? 'order-2' : 'order-1';
  const gridOrder    = isRTL ? 'order-1' : 'order-2';

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Page heading ─────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border-light">
        <Container className="py-10">
          <h1 className="text-3xl md:text-4xl font-bold font-cairo text-ink-heading text-wrap-balance">
            {categoryLabel}
          </h1>
          {/* Product count — dir=ltr preserves digit order in RTL context */}
          <p className="mt-2 text-sm text-ink-muted" dir="ltr">
            <span className="tabular-nums">{displayProducts.length}</span>
            {' '}{labels.products[language]}
          </p>
        </Container>
      </div>

      {/* ── Sidebar + grid layout ────────────────────────────────────────── */}
      <Container className="py-12">
        <div className="flex gap-10 items-start">

          {/* ── Filter sidebar ────────────────────────────────────────────── */}
          <div className={`w-56 shrink-0 ${sidebarOrder}`}>
            <ProductFilterSidebar
              filters={filters}
              onChange={setFilters}
              lockedMaterial={material}
              lockedCategory={category}
              isRTL={isRTL}
              language={language}
            />
          </div>

          {/* ── Product grid ──────────────────────────────────────────────── */}
          <div className={`flex-1 min-w-0 ${gridOrder}`}>
            <ProductGrid
              products={displayProducts}
              isLoading={false}
              emptyMessage={labels.noResults[language]}
              emptyCtaLabel={labels.clearFilters[language]}
              isRTL={isRTL}
              language={language}
            />
          </div>

        </div>
      </Container>

    </div>
  );
}
