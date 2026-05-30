'use client';

/**
 * components/home/ProductsSection.tsx
 *
 * Asymmetric bento grid — 5-column desktop layout with Z-pattern distribution.
 * Products 1 & 4 (3/5 width): wide landscape tiles, hero-scale presence.
 * Products 2 & 3 (2/5 width): portrait tiles, full product-height visibility.
 *
 * Each tile is full-bleed: image fills the card, category + title overlay
 * the bottom with a warm gradient (functional for legibility, not decoration).
 *
 * Bento pattern (desktop):
 *   [Product 1 — 3 cols]  [Product 2 — 2 cols]
 *   [Product 3 — 2 cols]  [Product 4 — 3 cols]
 *
 * Mobile: cols-2 grid, Product 1&4 full-width, Product 2&3 half-width stacked.
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Types & data ──────────────────────────────────────────────────────── */

interface ProductTile {
  id:       number;
  title:    { en: string; ar: string };
  category: { en: string; ar: string };
  image:    string;
  href:     string;
  /** true = 3/5 width + landscape; false = 2/5 width + portrait */
  wide:     boolean;
}

const PRODUCTS: ProductTile[] = [
  {
    id:       1,
    wide:     true,
    title:    { en: 'uPVC Windows',    ar: 'نوافذ uPVC'           },
    category: { en: 'Residential & Commercial', ar: 'سكني وتجاري' },
    image:    'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=1200&h=900&fit=crop',
    href:     '/products/upvc',
  },
  {
    id:       2,
    wide:     false,
    title:    { en: 'Sliding Systems', ar: 'أنظمة الانزلاق'        },
    category: { en: 'Modern Solutions', ar: 'حلول عصرية'           },
    image:    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=1067&fit=crop',
    href:     '/products/upvc',
  },
  {
    id:       3,
    wide:     false,
    title:    { en: 'Aluminum Doors',  ar: 'أبواب الألومنيوم'      },
    category: { en: 'Premium Quality', ar: 'جودة ممتازة'           },
    image:    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=1067&fit=crop',
    href:     '/products/aluminum',
  },
  {
    id:       4,
    wide:     true,
    title:    { en: 'Curtain Walls',   ar: 'الجدران الستائرية'     },
    category: { en: 'Commercial', ar: 'تجاري'                      },
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
    href:     '/products/aluminum',
  },
];

const copy = {
  en: { title: 'Our Products', subtitle: 'uPVC and aluminium systems for every project type', cta: 'Browse All Products' },
  ar: { title: 'منتجاتنا',     subtitle: 'أنظمة uPVC والألومنيوم لكل نوع مشروع', cta: 'تصفح كل المنتجات'             },
} as const;

/* ── Component ─────────────────────────────────────────────────────────── */

export default function ProductsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = copy[language];

  return (
    <section
      className="py-24 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="products-heading"
    >
      <div className="container-custom">

        {/* ── Section heading ────────────────────────────────────────────── */}
        <motion.div
          className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
            {language === 'en' ? 'Product Range' : 'نطاق المنتجات'}
          </p>
          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3 text-balance"
          >
            {t.title}
          </h2>
          <p className="text-lg text-text-body max-w-lg">{t.subtitle}</p>
        </motion.div>

        {/* ── Asymmetric bento grid ────────────────────────────────────────
            Desktop: 5-column grid, wide tiles take 3 cols, narrow take 2.
            Z-pattern: wide-left/narrow-right → narrow-left/wide-right.
            Mobile: 2-column grid, wide tiles span both columns.          */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
          variants={staggerContainer}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {PRODUCTS.map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              /* staggerContainer handles sequencing — no per-item delay */
              className={product.wide
                ? 'col-span-2 md:col-span-3'
                : 'col-span-1 md:col-span-2'
              }
            >
              <Link
                href={product.href}
                /* Aspect ratios: wide tiles = landscape 4/3, portrait tiles = 4/3 on mobile, 3/4 on desktop */
                className={`group relative block overflow-hidden ${
                  product.wide
                    ? 'aspect-[4/3]'
                    : 'aspect-[4/3] md:aspect-[3/4]'
                }`}
                aria-label={product.title[language]}
              >
                {/* Full-bleed image */}
                <Image
                  src={product.image}
                  alt={product.title[language]}
                  fill
                  sizes={product.wide
                    ? '(min-width: 768px) 60vw, 100vw'
                    : '(min-width: 768px) 40vw, 50vw'
                  }
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />

                {/* Functional gradient overlay — warm, not cold black */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/25 to-transparent" />

                {/* Text block — bottom aligned, inside the image */}
                <div className={`absolute bottom-0 p-5 z-10 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65 mb-1">
                    {product.category[language]}
                  </p>
                  <h3 className={`font-bold font-cairo text-white leading-snug ${
                    product.wide ? 'text-xl' : 'text-base'
                  }`}>
                    {product.title[language]}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <Link
            href="/products"
            className={`inline-flex items-center gap-2 text-sm font-bold text-brand-dark border-b-2 border-brand-red pb-0.5 hover:text-brand-red transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t.cta}
            <ArrowRight size={16} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
