'use client';

/**
 * components/products/ProductsPageClient.tsx
 *
 * Client shell for the /products index page.
 * Three-column editorial material navigation. The filterable catalog that used to
 * sit below was removed with the old CMS — there is no static product data to render.
 */

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import ImageSlot from '@/components/ui/ImageSlot';
import { IMAGES } from '@/lib/data/images';

// ── Editorial card data ────────────────────────────────────────────────────────

const EDITORIAL = {
  en: {
    cards: [
      { title: 'uPVC Systems',      desc: 'Energy-efficient thermal profiles. German-engineered. Zero maintenance.',                   cta: 'Explore uPVC',      href: '/products/upvc',     image: IMAGES.products.landing.upvc, alt: 'uPVC window system' },
      { title: 'Aluminium Systems', desc: 'Structural-grade facades and curtain walls. Built for high-rise and commercial scale.',      cta: 'Explore Aluminium', href: '/products/aluminum', image: IMAGES.products.landing.aluminum, alt: 'Aluminium commercial facade' },
      { title: 'Glass Systems',     desc: 'Double glazing, stained, sandblasted and decorative glass.',                                  cta: 'Explore Glass',     href: '/products/glass',    image: IMAGES.products.landing.glass, alt: 'Glass architectural systems' },
    ],
  },
  ar: {
    cards: [
      { title: 'أنظمة uPVC',       desc: 'قطاعات حرارية موفرة للطاقة. هندسة ألمانية. صيانة صفرية.',             cta: 'استكشف uPVC',      href: '/products/upvc',     image: IMAGES.products.landing.upvc, alt: 'نظام نوافذ uPVC' },
      { title: 'أنظمة الألومنيوم', desc: 'واجهات هيكلية وستائرية. مصممة للأبراج والمشاريع التجارية.',           cta: 'استكشف الألومنيوم', href: '/products/aluminum', image: IMAGES.products.landing.aluminum, alt: 'واجهة ألومنيوم تجارية' },
      { title: 'أنظمة الزجاج',     desc: 'زجاج مزدوج وملون ومسند وزخرفي.',                                       cta: 'استكشف الزجاج',     href: '/products/glass',    image: IMAGES.products.landing.glass, alt: 'أنظمة الزجاج المعمارية' },
    ],
  },
} as const;

// ── Component ─────────────────────────────────────────────────────────────────

export default function ProductsPageClient() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t  = EDITORIAL[language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Three-column material split — header replaced by PageHeader in page.tsx ── */}
      <motion.div
        className="grid md:grid-cols-3 md:min-h-[80vh]"
        variants={staggerContainer}
        initial={shouldReduce ? {} : 'hidden'}
        whileInView={shouldReduce ? undefined : 'visible'}
        viewport={shouldReduce ? undefined : viewportOnce}
      >
        {t.cards.map((card) => (
          <motion.div key={card.href} variants={fadeUp} className="group relative h-[60vh] md:h-auto overflow-hidden">
            {/* Full-bleed column background — aspect-auto lets the 60vh / 80vh column set the height */}
            <ImageSlot
              src={card.image}
              alt={card.alt}
              ratio="4/3"
              className="absolute inset-0 h-full w-full aspect-auto rounded-none transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 768px) 33vw, 100vw"
            />
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

    </div>
  );
}
