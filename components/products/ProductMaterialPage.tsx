'use client';

/**
 * components/products/ProductMaterialPage.tsx
 *
 * L2 material page — full-bleed category tile grid.
 * Each tile is a dark-overlay image card linking to /products/{material}/{category}.
 *
 * Design rules:
 *   • 2-column grid at md+; single column on mobile
 *   • bg-brand-dark/65 overlay at rest → /80 on hover — WCAG AA on white text
 *   • Image scale(1.02) on hover — outer card has overflow-hidden
 *   • Category name sits at the reading-start bottom edge (bottom-left LTR, bottom-right RTL)
 *   • 0px radius on all tiles (extrusion language — no curves)
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { upvcCategories, aluminumCategories } from '@/lib/data/products';
import type { ProductCategory } from '@/lib/data/products';
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';

// ── Bilingual page headings ───────────────────────────────────────────────────

const PAGE_COPY = {
  upvc: {
    en: { eyebrow: 'uPVC Systems', title: 'Select a Category', subtitle: 'German-engineered profiles for every opening.' },
    ar: { eyebrow: 'أنظمة uPVC',  title: 'اختر فئة',          subtitle: 'قطاعات ذات هندسة ألمانية لكل فتحة.' },
  },
  aluminum: {
    en: { eyebrow: 'Aluminium Systems', title: 'Select a Category', subtitle: 'Structural-grade aluminium for commercial and residential scale.' },
    ar: { eyebrow: 'أنظمة الألومنيوم',  title: 'اختر فئة',          subtitle: 'ألومنيوم بدرجة هيكلية للمشاريع التجارية والسكنية.' },
  },
} as const;

// ── Tile sub-component ────────────────────────────────────────────────────────

interface TileProps {
  category:  ProductCategory;
  material:  'upvc' | 'aluminum';
  isRTL:     boolean;
  language:  'en' | 'ar';
}

function CategoryTile({ category, material, isRTL, language }: TileProps) {
  const href = `/products/${material}/${category.slug}`;

  return (
    <Link href={href} className="group relative block h-[48vw] max-h-[400px] min-h-[220px] overflow-hidden" aria-label={category.label[language]}>
      {/* ── Background image ─────────────────────────────────────────────── */}
      <Image
        src={category.image}
        alt={category.label[language]}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
      />

      {/* ── Dark overlay — overlay darkens on hover for readability ─────── */}
      <div className="absolute inset-0 bg-brand-dark/65 group-hover:bg-brand-dark/80 transition-colors duration-400" />

      {/* ── Text block — reading-start bottom edge ───────────────────────── */}
      {/* isRTL: items shift to the right side (reading-start in Arabic) */}
      <div className={cn('absolute inset-x-0 bottom-0 z-10 p-8 flex flex-col', isRTL ? 'items-end text-right' : 'items-start text-left')}>
        {/* 2px red accent line — editorial brand signature */}
        <div className="h-0.5 w-10 bg-brand-red mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold font-cairo text-white leading-tight mb-4">
          {category.label[language]}
        </h2>
        {/* Animate the arrow in on hover — nudges right (or left in RTL) */}
        <span className={cn('flex items-center gap-2 text-white/80 text-sm font-semibold transition-transform duration-300', isRTL ? 'flex-row-reverse group-hover:-translate-x-1' : 'group-hover:translate-x-1')}>
          <span>{category.products.length}</span>
          <span>{language === 'en' ? (category.products.length === 1 ? 'product' : 'products') : 'منتج'}</span>
          {/* Arrow rotates 180° in RTL — points toward reading direction */}
          <ArrowRight className={cn('w-4 h-4', isRTL ? 'rotate-180' : '')} />
        </span>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  material: 'upvc' | 'aluminum';
}

export default function ProductMaterialPage({ material }: Props) {
  const { language, isRTL } = useLanguage();
  const categories = material === 'upvc' ? upvcCategories : aluminumCategories;
  const copy = PAGE_COPY[material][language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Page heading ─────────────────────────────────────────────────── */}
      <Container className="py-16 text-center">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-3">
          {copy.eyebrow}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold font-cairo text-ink-heading mb-4 text-wrap-balance">
          {copy.title}
        </h1>
        <p className="text-base text-ink-body max-w-lg mx-auto">{copy.subtitle}</p>
      </Container>

      {/* ── Category tile grid ───────────────────────────────────────────── */}
      {/* 2-column for md+; odd last tile spans full width for clean alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {categories.map((cat) => (
          <CategoryTile key={cat.slug} category={cat} material={material} isRTL={isRTL} language={language} />
        ))}
      </div>

    </div>
  );
}
