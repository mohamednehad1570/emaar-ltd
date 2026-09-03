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
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';
import type { SanityProductTile } from '@/lib/sanity/types';

// ── Category label map — taxonomy order matches CLAUDE.md Product taxonomy ────

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',                       ar: 'نوافذ'               },
  doors:               { en: 'Doors',                         ar: 'أبواب'               },
  'doors-and-windows': { en: 'Doors & Windows',               ar: 'أبواب ونوافذ'        },
  staircases:          { en: 'Staircases',                    ar: 'سلالم'               },
  hebeschibe:          { en: 'Hebeschibe',                    ar: 'هيبيشيبه'            },
  skylights:           { en: 'Skylights',                     ar: 'مناور'               },
  pergola:             { en: 'Pergola',                       ar: 'برجولا'              },
  'frameless-doors':   { en: 'Frameless Doors',               ar: 'أبواب بدون إطار'     },
  'security-system':   { en: 'Security System',               ar: 'نظام أمني'           },
  handrails:           { en: 'Handrails',                     ar: 'درابزين'             },
  'acp-panels':        { en: 'ACP Panels',                    ar: 'ألواح ACP'           },
  'double-glazing':    { en: 'Double Glazing',                ar: 'زجاج مزدوج'          },
  'stained-glass':     { en: 'Stained Glass',                 ar: 'زجاج ملون'           },
  sandblast:           { en: 'Sandblast',                     ar: 'سندبلاست'            },
  'georgian-bar':      { en: 'Georgian Bar & Islamic Design', ar: 'تصميم جورجي وإسلامي' },
}

// Canonical category order per material — tiles appear in this sequence
const CATEGORY_ORDER: Record<'upvc' | 'aluminum' | 'glass', string[]> = {
  upvc:     ['windows','doors','doors-and-windows','staircases','hebeschibe'],
  aluminum: ['windows','doors','doors-and-windows','staircases','skylights','pergola','frameless-doors','security-system','handrails','acp-panels'],
  glass:    ['double-glazing','stained-glass','sandblast','georgian-bar'],
}

// ── Bilingual page headings ───────────────────────────────────────────────────

const PAGE_COPY: Record<'upvc' | 'aluminum' | 'glass', { en: { eyebrow: string; title: string; subtitle: string }; ar: { eyebrow: string; title: string; subtitle: string } }> = {
  upvc: {
    en: { eyebrow: 'uPVC Systems',      title: 'Select a Category', subtitle: 'German-engineered profiles for every opening.' },
    ar: { eyebrow: 'أنظمة uPVC',        title: 'اختر فئة',          subtitle: 'قطاعات ذات هندسة ألمانية لكل فتحة.' },
  },
  aluminum: {
    en: { eyebrow: 'Aluminium Systems', title: 'Select a Category', subtitle: 'Structural-grade aluminium for commercial and residential scale.' },
    ar: { eyebrow: 'أنظمة الألومنيوم',  title: 'اختر فئة',          subtitle: 'ألومنيوم بدرجة هيكلية للمشاريع التجارية والسكنية.' },
  },
  glass: {
    en: { eyebrow: 'Glass Systems',     title: 'Select a Category', subtitle: 'Premium glass solutions for architectural and decorative applications.' },
    ar: { eyebrow: 'أنظمة الزجاج',      title: 'اختر فئة',          subtitle: 'حلول زجاجية راقية للتطبيقات المعمارية والزخرفية.' },
  },
};

// ── Tile sub-component ────────────────────────────────────────────────────────

interface TileData {
  slug:         string;
  label:        { en: string; ar: string };
  coverImage?:  string;
  productCount: number;
}

interface TileProps {
  tile:      TileData;
  material:  'upvc' | 'aluminum' | 'glass';
  isRTL:     boolean;
  language:  'en' | 'ar';
}

function CategoryTile({ tile, material, isRTL, language }: TileProps) {
  const href  = `/products/${material}/${tile.slug}`;
  const label = tile.label[language];

  return (
    <Link href={href} className="group relative block h-[48vw] max-h-[400px] min-h-[220px] overflow-hidden" aria-label={label}>
      {/* ── Background image ─────────────────────────────────────────────── */}
      {tile.coverImage && (
        <Image
          src={tile.coverImage}
          alt={label}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      )}
      {/* Fallback solid colour when Sanity has no image yet */}
      {!tile.coverImage && <div className="absolute inset-0 bg-brand-dark" />}

      {/* ── Dark overlay — overlay darkens on hover for readability ─────── */}
      <div className="absolute inset-0 bg-brand-dark/65 group-hover:bg-brand-dark/80 transition-colors duration-400" />

      {/* ── Text block — reading-start bottom edge ───────────────────────── */}
      {/* isRTL: items shift to the right side (reading-start in Arabic) */}
      <div className={cn('absolute inset-x-0 bottom-0 z-10 p-8 flex flex-col', isRTL ? 'items-end text-right' : 'items-start text-left')}>
        {/* 2px red accent line — editorial brand signature */}
        <div className="h-0.5 w-10 bg-brand-red mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold font-cairo text-white leading-tight mb-4">
          {label}
        </h2>
        {/* Animate the arrow in on hover — nudges right (or left in RTL) */}
        <span className={cn('flex items-center gap-2 text-white/80 text-sm font-semibold transition-transform duration-300', isRTL ? 'flex-row-reverse group-hover:-translate-x-1' : 'group-hover:translate-x-1')}>
          <span dir="ltr">{tile.productCount}</span>
          <span>{language === 'en' ? (tile.productCount === 1 ? 'product' : 'products') : 'منتج'}</span>
          {/* Arrow rotates 180° in RTL — points toward reading direction */}
          <ArrowRight className={cn('w-4 h-4', isRTL ? 'rotate-180' : '')} />
        </span>
      </div>
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

interface Props {
  material:      'upvc' | 'aluminum' | 'glass';
  sanityProducts: SanityProductTile[];
}

export default function ProductMaterialPage({ material, sanityProducts }: Props) {
  const { language, isRTL } = useLanguage();
  const copy = PAGE_COPY[material][language];

  // Group Sanity products by category, then derive ordered tile list
  const categoryMap = new Map<string, SanityProductTile[]>();
  for (const p of sanityProducts) {
    const arr = categoryMap.get(p.category) ?? [];
    arr.push(p);
    categoryMap.set(p.category, arr);
  }

  const tiles: TileData[] = CATEGORY_ORDER[material]
    .filter((slug) => categoryMap.has(slug))
    .map((slug) => {
      const products = categoryMap.get(slug)!;
      return {
        slug,
        label:        CATEGORY_LABELS[slug] ?? { en: slug, ar: slug },
        coverImage:   products[0]?.mainImage,
        productCount: products.length,
      };
    });

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
        {tiles.map((tile) => (
          <CategoryTile key={tile.slug} tile={tile} material={material} isRTL={isRTL} language={language} />
        ))}
      </div>

    </div>
  );
}
