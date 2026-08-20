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
import { upvcCategories, aluminumCategories } from '@/lib/data/products';
import type { ProductItem } from '@/lib/data/products';
import Container from '@/components/layout/Container';
import ProductFilterSidebar, { type FilterState } from './ProductFilterSidebar';
import ProductGrid, { type DisplayProduct } from './ProductGrid';

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Normalises ProductItem to DisplayProduct for the current language */
function toDisplay(item: ProductItem, language: 'en' | 'ar'): DisplayProduct {
  return {
    id:          item.id,
    slug:        item.slug,
    material:    item.material,
    category:    item.category,
    title:       item.title[language],
    description: item.description[language],
    image:       item.image,
    badge:       item.badge,
  };
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface Props {
  material: 'upvc' | 'aluminum';
  category: string;
}

// ── Bilingual strings ─────────────────────────────────────────────────────────

const labels = {
  products:     { en: 'products',    ar: 'منتج'          },
  noResults:    { en: 'No products match your filters.', ar: 'لا توجد منتجات تطابق الفلاتر.' },
  clearFilters: { en: 'Clear filters', ar: 'مسح الفلاتر' },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductCategoryPage({ material, category }: Props) {
  const { language, isRTL } = useLanguage();

  const allCategories = material === 'upvc' ? upvcCategories : aluminumCategories;
  const cat = allCategories.find((c) => c.slug === category);

  // Sidebar filter state — specTags interactive; material & category are locked
  const [filters, setFilters] = useState<FilterState>({
    material:   material,
    categories: [category],
    specTags:   [],
  });

  // Category label in current language — fallback to slug if not found
  const categoryLabel = cat?.label[language] ?? category;

  // All products in this category from static data
  const categoryProducts: ProductItem[] = cat?.products ?? [];

  // Apply spec-tag filter only — material and category are locked by route
  // specTags filter is advisory: products without a specTags field pass through
  const displayProducts = useMemo<DisplayProduct[]>(() => {
    const filtered = filters.specTags.length === 0
      ? categoryProducts
      : categoryProducts.filter((p) => {
          // Static products don't carry specTags — they pass through unfiltered
          // so the filter only narrows when Sanity products with specTags are used
          const tags = (p as ProductItem & { specTags?: string[] }).specTags;
          if (!tags) return true;
          return filters.specTags.every((t) => tags.includes(t));
        });
    return filtered.map((p) => toDisplay(p, language));
  }, [filters.specTags, categoryProducts, language]);

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
            />
          </div>

        </div>
      </Container>

    </div>
  );
}
