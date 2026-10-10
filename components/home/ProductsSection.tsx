'use client';

/**
 * components/home/ProductsSection.tsx
 *
 * Homepage featured products — a static 4-card grid (replaced the marquee).
 * Thin orchestrator: copy + data come from uiStrings, each tile is a
 * FeaturedProductCard. No autoplay; cards cascade in once on scroll.
 */

import LocaleLink from '@/components/ui/LocaleLink';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Container from '@/components/layout/Container';
import FeaturedHeading from '@/components/home/FeaturedHeading';
import FeaturedProductCard from '@/components/home/FeaturedProductCard';
import { useTranslation } from '@/contexts/LanguageContext';
import { FEATURED_PRODUCTS, HOME_FEATURED_COPY } from '@/lib/data/uiStrings';
import { featuredGrid, featuredItem, featuredViewport } from '@/lib/motion';

export default function ProductsSection() {
  const t = useTranslation();
  // Explicit hook (not just MotionConfig) — it also gates the CSS hover lift / zoom in the cards
  const reduce = useReducedMotion() ?? false;
  const copy = HOME_FEATURED_COPY.products;

  return (
    <section className="bg-off-white py-24" aria-labelledby="products-heading">
      <Container>
        <FeaturedHeading id="products-heading" eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

        {/* ── Grid ────────────────────────────────────────────── */}
        {/* 2 cols with 12px gutter on phones, 2 → 4 cols with 24px from md / lg */}
        <motion.ul
          className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4"
          variants={featuredGrid}
          initial="hidden"
          whileInView="visible"
          viewport={featuredViewport}
        >
          {FEATURED_PRODUCTS.map((product) => (
            <motion.li key={product.key} variants={featuredItem(reduce)}>
              <FeaturedProductCard product={product} reduceMotion={reduce} />
            </motion.li>
          ))}
        </motion.ul>

        {/* ── View all ────────────────────────────────────────── */}
        <div className="mt-8 flex justify-end">
          {/* min-h-11 = 44px touch target; explicit red so the a:hover base rule can't recolour it */}
          <LocaleLink
            href="/upvc"
            className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-red hover:text-brand-red-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-silver-material"
          >
            {t(copy.viewAll.en, copy.viewAll.ar)}
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-[translate] duration-300 rtl:-scale-x-100 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
            />
          </LocaleLink>
        </div>
      </Container>
    </section>
  );
}
