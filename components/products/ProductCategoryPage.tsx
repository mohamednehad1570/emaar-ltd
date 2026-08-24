'use client';

/**
 * components/products/ProductCategoryPage.tsx
 *
 * L3 category page — material + category locked by URL, so only the
 * Specifications filter pill is shown. Sort and product count appear on
 * the same horizontal row. Grid is full-width (no sidebar).
 */

import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { SanityProductTile } from '@/lib/sanity/types';
import Container from '@/components/layout/Container';
import ProductFilterDropdown, { CheckOption, RadioOption } from './ProductFilterDropdown';
import ProductGrid, { type DisplayProduct } from './ProductGrid';

type SortOrder = 'relevance' | 'az' | 'za';

const SPECS = [
  { value: 'double-glazed',      en: 'Double Glazed',      ar: 'زجاج مزدوج'                 },
  { value: 'triple-glazed',      en: 'Triple Glazed',      ar: 'زجاج ثلاثي'                 },
  { value: 'thermal-insulated',  en: 'Thermal Insulated',  ar: 'عازل حراري'                 },
  { value: 'acoustic-insulated', en: 'Acoustic Insulated', ar: 'عازل صوتي'                  },
  { value: 'uv-resistant',       en: 'UV Resistant',       ar: 'مقاوم للأشعة فوق البنفسجية' },
] as const;

const SORTS: Array<{ value: SortOrder; en: string; ar: string }> = [
  { value: 'relevance', en: 'Relevance', ar: 'الأهمية'   },
  { value: 'az',        en: 'Name A–Z',  ar: 'الاسم أ–ي' },
  { value: 'za',        en: 'Name Z–A',  ar: 'الاسم ي–أ' },
];

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',         ar: 'نوافذ'        },
  doors:               { en: 'Doors',           ar: 'أبواب'        },
  'doors-and-windows': { en: 'Doors & Windows', ar: 'أبواب ونوافذ' },
  staircases:          { en: 'Staircases',      ar: 'سلالم'        },
  'stained-glass':     { en: 'Stained Glass',   ar: 'زجاج ملون'    },
  sandblast:           { en: 'Sandblast',       ar: 'سندبلاست'     },
  hebeschibe:          { en: 'Hebeschibe',      ar: 'هيبيشيبه'     },
  skylights:           { en: 'Skylights',       ar: 'مناور'        },
};

const L = {
  specs:        { en: 'Specifications',                  ar: 'المواصفات'                     },
  sort:         { en: 'Sort',                            ar: 'ترتيب'                          },
  products:     { en: 'products',                        ar: 'منتج'                           },
  noResults:    { en: 'No products match your filters.', ar: 'لا توجد منتجات تطابق الفلاتر.' },
  clearFilters: { en: 'Clear filters',                   ar: 'مسح الفلاتر'                    },
} as const;

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

interface Props {
  material:       'upvc' | 'aluminum'; // passed by page route — used for type consistency
  category:       string;
  sanityProducts: SanityProductTile[];
}

export default function ProductCategoryPage({ category, sanityProducts }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const [specTags, setSpecTags] = useState<string[]>([]);
  const [sort, setSort]         = useState<SortOrder>('relevance');
  const [panel, setPanel]       = useState<'specs' | 'sort' | null>(null);

  const categoryLabel = CATEGORY_LABELS[category]?.[language] ?? category;
  const tr = (k: keyof typeof L) => L[k][language];

  const toggleSpec = (v: string) =>
    setSpecTags((prev) => prev.includes(v) ? prev.filter((s) => s !== v) : [...prev, v]);

  const displayProducts = useMemo<DisplayProduct[]>(() => {
    const filtered = specTags.length === 0
      ? sanityProducts
      : sanityProducts.filter((p) => {
          if (!p.specTags?.length) return true;
          return specTags.every((tag) => p.specTags!.includes(tag));
        });
    const mapped = filtered.map((p) => toDisplay(p, language));
    if (sort === 'az') return [...mapped].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === 'za') return [...mapped].sort((a, b) => b.title.localeCompare(a.title));
    return mapped;
  }, [specTags, sort, sanityProducts, language]);

  const activeSortLabel = SORTS.find((o) => o.value === sort)?.[language] ?? tr('sort');

  return (
    <div className="min-h-screen bg-off-white pt-20" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Page heading ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border-light">
        <Container className="py-10">
          <motion.h1
            className="text-3xl md:text-4xl font-bold font-cairo text-ink-heading text-wrap-balance"
            variants={fadeUp}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {categoryLabel}
          </motion.h1>
        </Container>
      </div>

      {/* ── Filter row + full-width grid ────────────────────────────── */}
      <Container className="py-12">

        {/* Specs + Sort — material & category are implicit from the URL */}
        <motion.div
          className="flex items-center gap-2 flex-wrap mb-6"
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <ProductFilterDropdown
            label={tr('specs')}
            isOpen={panel === 'specs'}
            isActive={specTags.length > 0}
            activeCount={specTags.length > 0 ? specTags.length : undefined}
            onToggle={() => setPanel((p) => p === 'specs' ? null : 'specs')}
            onClose={() => setPanel(null)}
            isRTL={isRTL}
          >
            {SPECS.map((s) => (
              <CheckOption key={s.value} label={s[language]} checked={specTags.includes(s.value)} onChange={() => toggleSpec(s.value)} />
            ))}
          </ProductFilterDropdown>

          <div className="flex items-center gap-3 ms-auto">
            <span className="text-sm text-text-muted font-medium" dir="ltr">
              {displayProducts.length} {tr('products')}
            </span>
            <ProductFilterDropdown
              label={`${tr('sort')}: ${activeSortLabel}`}
              isOpen={panel === 'sort'}
              isActive={sort !== 'relevance'}
              onToggle={() => setPanel((p) => p === 'sort' ? null : 'sort')}
              onClose={() => setPanel(null)}
              isRTL={isRTL}
            >
              {SORTS.map((o) => (
                <RadioOption key={o.value} label={o[language]} isSelected={sort === o.value} onClick={() => { setSort(o.value); setPanel(null); }} />
              ))}
            </ProductFilterDropdown>
          </div>
        </motion.div>

        <ProductGrid
          products={displayProducts}
          isLoading={false}
          emptyMessage={tr('noResults')}
          emptyCtaLabel={tr('clearFilters')}
          isRTL={isRTL}
          language={language}
        />
      </Container>

    </div>
  );
}
