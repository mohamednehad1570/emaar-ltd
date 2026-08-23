'use client';

/**
 * components/products/ProductsPageClient.tsx
 *
 * Client shell for the /products index page.
 * Top: editorial two-card material navigation (original design preserved).
 * Below: full product catalog with ProductFilterBar (horizontal) + full-width ProductGrid.
 */

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import Container from '@/components/layout/Container';
import type { SanityProductTile } from '@/lib/sanity/types';
import { type FilterState } from './ProductFilterSidebar';
import ProductFilterBar, { type SortOrder } from './ProductFilterBar';
import ProductGrid, { type DisplayProduct } from './ProductGrid';

// ── Editorial card data ────────────────────────────────────────────────────────

const EDITORIAL = {
  en: {
    eyebrow: 'Our Systems', title: 'Choose Your Material',
    subtitle: "Window and door systems precision-engineered for the Gulf's climate and structural standards.",
    cards: [
      { title: 'uPVC Systems',      desc: 'Energy-efficient thermal profiles. German-engineered. Zero maintenance.',      cta: 'Explore uPVC',      href: '/products/upvc',     image: 'https://images.unsplash.com/photo-1542385412-42e58a804825?w=1200&q=80', alt: 'uPVC window system' },
      { title: 'Aluminium Systems', desc: 'Structural-grade facades and curtain walls. Built for high-rise and commercial scale.', cta: 'Explore Aluminium', href: '/products/aluminum', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'Aluminium commercial facade' },
    ],
  },
  ar: {
    eyebrow: 'أنظمتنا', title: 'اختر المادة',
    subtitle: 'أنظمة نوافذ وأبواب عالمية المستوى مصممة لمناخ الخليج ومعايير العمارة فيه.',
    cards: [
      { title: 'أنظمة uPVC',       desc: 'قطاعات حرارية موفرة للطاقة. هندسة ألمانية. صيانة صفرية.',             cta: 'استكشف uPVC',      href: '/products/upvc',     image: 'https://images.unsplash.com/photo-1542385412-42e58a804825?w=1200&q=80', alt: 'نظام نوافذ uPVC' },
      { title: 'أنظمة الألومنيوم', desc: 'واجهات هيكلية وستائرية. مصممة للأبراج والمشاريع التجارية.',           cta: 'استكشف الألومنيوم', href: '/products/aluminum', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', alt: 'واجهة ألومنيوم تجارية' },
    ],
  },
} as const;

// ── Catalog labels ─────────────────────────────────────────────────────────────

const CATALOG = {
  en: { heading: 'Full Product Catalog', noResults: 'No products match your filters.', clear: 'Clear filters' },
  ar: { heading: 'الكتالوج الكامل',       noResults: 'لا توجد منتجات تطابق الفلاتر.',  clear: 'مسح الفلاتر'    },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

interface Props { products: SanityProductTile[] }

export default function ProductsPageClient({ products }: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t  = EDITORIAL[language];
  const ct = CATALOG[language];

  const [filters, setFilters] = useState<FilterState>({ material: null, categories: [], specTags: [] });
  const [sort, setSort] = useState<SortOrder>('relevance');

  const displayProducts = useMemo<DisplayProduct[]>(() => {
    return products
      .filter((p) => {
        const matOk = filters.material === null || p.material === filters.material;
        const catOk = filters.categories.length === 0 || filters.categories.includes(p.category);
        // specTags advisory: products without specTags pass through regardless
        const tagOk = filters.specTags.length === 0 || !p.specTags?.length
          ? true
          : filters.specTags.every((tag) => p.specTags!.includes(tag));
        return matOk && catOk && tagOk;
      })
      .map((p) => ({
        id:          p._id,
        slug:        p.slug,
        material:    p.material,
        category:    p.category,
        title:       p.title[language] ?? p.title.en,
        description: p.description?.[language] ?? p.description?.en ?? '',
        image:       p.mainImage ?? '',
        badge:       p.badge,
      }))
      .sort((a, b) => {
        if (sort === 'az') return a.title.localeCompare(b.title);
        if (sort === 'za') return b.title.localeCompare(a.title);
        return 0; // relevance = original insertion order from Sanity
      });
  }, [products, filters, language, sort]);

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Editorial header ─────────────────────────────────────────────── */}
      <motion.div
        className="py-20 text-center px-6"
        variants={fadeUp}
        initial={shouldReduce ? {} : 'hidden'}
        animate="visible"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-4 block">{t.eyebrow}</span>
        <h1 className="text-5xl md:text-6xl font-bold font-cairo text-brand-dark mb-5">{t.title}</h1>
        <p className="text-lg text-ink-body max-w-xl mx-auto">{t.subtitle}</p>
      </motion.div>

      {/* ── Two-column editorial split ────────────────────────────────────── */}
      <motion.div
        className="grid md:grid-cols-2 md:min-h-[80vh]"
        variants={staggerContainer}
        initial={shouldReduce ? {} : 'hidden'}
        whileInView={shouldReduce ? undefined : 'visible'}
        viewport={shouldReduce ? undefined : viewportOnce}
      >
        {t.cards.map((card) => (
          <motion.div key={card.href} variants={fadeUp} className="group relative h-[60vh] md:h-auto overflow-hidden">
            <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* bg-brand-dark/75 — ensures ≥ 4.5:1 contrast ratio for white text */}
            <div className="absolute inset-0 bg-brand-dark/75 group-hover:bg-brand-dark/65 transition-colors duration-500" />
            <div className={`absolute inset-0 z-10 flex flex-col justify-end p-10 md:p-14 ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
              <div className="h-0.5 w-12 bg-brand-red mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold font-cairo text-white mb-4">{card.title}</h2>
              <p className="text-white/70 text-base mb-8 max-w-xs">{card.desc}</p>
              {/* hover:bg-brand-red — white fill was too close to bg on dark overlays */}
              <Link href={card.href} className={`px-8 py-4 font-bold bg-white hover:bg-brand-red hover:text-white transition-all duration-200 inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--color-brand-dark)' }}>
                <span>{card.cta}</span>
                {/* Arrow rotates 180° in RTL — pointing toward reading-end edge */}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ── Full product catalog ──────────────────────────────────────────── */}
      {products.length > 0 && (
        <div className="bg-off-white border-t border-border-light">
          <Container className="py-12">
            <h2 className={`text-2xl md:text-3xl font-bold font-cairo text-ink-heading mb-6 ${isRTL ? 'text-right' : ''}`}>
              {ct.heading}
            </h2>
            <ProductFilterBar
              filters={filters}
              onChange={setFilters}
              sort={sort}
              onSortChange={setSort}
              filteredCount={displayProducts.length}
              isRTL={isRTL}
              language={language}
            />
            <ProductGrid
              products={displayProducts}
              isLoading={false}
              emptyMessage={ct.noResults}
              emptyCtaLabel={ct.clear}
              isRTL={isRTL}
              language={language}
            />
          </Container>
        </div>
      )}

    </div>
  );
}
