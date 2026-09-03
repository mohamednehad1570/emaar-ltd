'use client';
// Hero section: breadcrumb → large H1 title → subtitle → 55/45 image/info grid

import React from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'framer-motion';
import { slideInLeft, slideInRight, viewportOnce } from '@/lib/motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';
import type { SanityProductFull } from '@/lib/sanity/types';
import ProductImagePanel from './ProductImagePanel';
import ProductInfoPanel from './ProductInfoPanel';

interface Props {
  product:       SanityProductFull;       // full product data for panels
  images:        string[];                // mainImage first, gallery after
  selectedImage: string;                  // currently shown image src
  onSelect:      (src: string) => void;  // thumbnail click handler
  materialLabel: string;                  // pre-computed bilingual material label
  categoryLabel: string;                  // pre-computed bilingual category label
}

export default function ProductDetailHero({
  product, images, selectedImage, onSelect, materialLabel, categoryLabel,
}: Props) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  const title       = product.title[language] ?? product.title.en;
  // Subtitle: first 120 chars of description with ellipsis if truncated
  const description = product.description?.[language] ?? product.description?.en ?? '';
  const subtitle    = description.length > 120 ? `${description.slice(0, 120)}…` : description;

  const materialHref = `/products/${product.material}`;           // material landing page
  const categoryHref = `/products/${product.material}/${product.category}`; // category grid

  return (
    <section className="bg-off-white pt-24 pb-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 mb-10 text-sm text-ink-muted">
          {/* "Our Solutions" links to /products — the material catalog root */}
          <Link href="/products" className="hover:text-brand-red transition-colors duration-150 shrink-0">
            {language === 'en' ? 'Our Solutions' : 'حلولنا'}
          </Link>
          <CaretRight className={cn('w-3 h-3 shrink-0', isRTL && 'rotate-180')} aria-hidden="true" />
          <Link href={materialHref} className="hover:text-brand-red transition-colors duration-150 shrink-0">
            {materialLabel}
          </Link>
          <CaretRight className={cn('w-3 h-3 shrink-0', isRTL && 'rotate-180')} aria-hidden="true" />
          <Link href={categoryHref} className="hover:text-brand-red transition-colors duration-150 shrink-0">
            {categoryLabel}
          </Link>
          <CaretRight className={cn('w-3 h-3 shrink-0', isRTL && 'rotate-180')} aria-hidden="true" />
          {/* Current page: non-linked, subtly different colour, truncated on overflow */}
          <span className="text-ink-body font-medium truncate max-w-[200px]">{title}</span>
        </nav>

        {/* ── Hero title block ────────────────────────────────────────────── */}
        {/* 52px desktop / clamps smoothly down — 800 weight (extrabold) on Cairo */}
        <h1
          className="font-cairo font-extrabold text-ink-heading tracking-[-0.02em] mb-4"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', lineHeight: '0.92' }}
        >
          {title}
        </h1>
        {/* Subtitle: capped at 120 chars so it reads as a teaser, not the full description */}
        {subtitle && (
          <p className="text-base text-ink-body max-w-xl mb-12 leading-relaxed">{subtitle}</p>
        )}

        {/* ── Two-column: 55% image | 45% info ───────────────────────────── */}
        {/* grid-cols-[55%_1fr] gives explicit 55/45 split per spec */}
        <div className="grid grid-cols-1 md:grid-cols-[55%_1fr] gap-8 md:gap-12 items-start">
          <motion.div
            variants={shouldReduce ? {} : slideInLeft}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            <ProductImagePanel
              images={images}
              selectedImage={selectedImage}
              onSelect={onSelect}
              alt={title}
            />
          </motion.div>
          <motion.div
            variants={shouldReduce ? {} : slideInRight}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {/* ProductInfoPanel is kept as-is per task rules — receives language as prop */}
            <ProductInfoPanel product={product} language={language} isRTL={isRTL} />
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
