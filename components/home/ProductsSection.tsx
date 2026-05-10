'use client';

/**
 * components/home/ProductsSection.tsx
 *
 * Static 4-column product grid on bg-off-white.
 * Replaces the previous horizontal carousel — static grids perform better
 * on mobile and avoid the JS overhead of auto-scroll hooks.
 *
 * Tile design:
 *   • aspect-[4/3] image, rounded-none (--radius-image: 0px)
 *   • 2px solid border-border-light at rest
 *   • Hover: border-brand-silver (2px), image scales 1.04 — subtle, not flashy
 *   • Category label sits below the image frame, no overlay
 *
 * Design rules:
 *   • bg-off-white on section — alternates with the white hero above
 *   • No shadow on tiles per updated shadow spec
 *   • sizes prop tuned to actual rendered widths at each breakpoint
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
}

const PRODUCTS: ProductTile[] = [
  {
    id:       1,
    title:    { en: 'uPVC Windows',    ar: 'نوافذ uPVC'           },
    category: { en: 'Residential & Commercial', ar: 'سكني وتجاري' },
    image:    'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800&h=600&fit=crop',
    href:     '/products/upvc',
  },
  {
    id:       2,
    title:    { en: 'Sliding Systems', ar: 'أنظمة الانزلاق'        },
    category: { en: 'Modern Solutions',        ar: 'حلول عصرية'    },
    image:    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
    href:     '/products/upvc',
  },
  {
    id:       3,
    title:    { en: 'Aluminum Doors',  ar: 'أبواب الألومنيوم'      },
    category: { en: 'Premium Quality',         ar: 'جودة ممتازة'   },
    image:    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    href:     '/products/aluminum',
  },
  {
    id:       4,
    title:    { en: 'Curtain Walls',   ar: 'الجدران الستائرية'     },
    category: { en: 'Commercial',              ar: 'تجاري'          },
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    href:     '/products/aluminum',
  },
];

const copy = {
  en: { title: 'Our Products', subtitle: 'Premium quality for every application', cta: 'Browse All Products' },
  ar: { title: 'منتجاتنا',     subtitle: 'جودة ممتازة لكل تطبيق',                cta: 'تصفح كل المنتجات'  },
} as const;

/* ── Component ─────────────────────────────────────────────────────────── */

export default function ProductsSection() {
  const { language, isRTL } = useLanguage();
  const t = copy[language];

  return (
    <section
      className="py-24 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="products-heading"
    >
      <div className="container-custom">

        {/* ── Section heading ──────────────────────────────────────────── */}
        <motion.div
          className="mb-14 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-4"
          >
            {t.title}
          </h2>
          {/* Accent line — same weight as section divider strokes */}
          <div className="h-0.5 w-12 bg-brand-red mx-auto mb-5" />
          <p className="text-lg text-text-body max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* ── 4-column product grid ────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              transition={{ delay: idx * 0.08 }}
            >
              <Link
                href={product.href}
                className="group block border-2 border-border-light hover:border-brand-silver transition-colors duration-300"
                aria-label={product.title[language]}
              >
                {/* Image — 0px radius (--radius-image), no overlay gradient */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title[language]}
                    fill
                    /* 25vw = quarter of viewport at md+; 50vw on mobile 2-col */
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* Text below image — separated from the image frame */}
                <div className="pt-3 pb-4 px-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
                    {product.category[language]}
                  </p>
                  <h3 className="text-sm font-bold font-cairo text-brand-dark leading-snug">
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
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Link
            href="/products/upvc"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-dark border-b-2 border-brand-red pb-0.5 hover:text-brand-red transition-colors duration-200"
          >
            {t.cta}
            {/* Arrow rotates 180° in RTL — pointing left instead of right */}
            <ArrowRight size={16} weight="bold" className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
