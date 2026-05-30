'use client';

/**
 * app/solutions/residential/page.tsx
 *
 * Residential Solutions page: dark hero, 3 key benefits, product pathway
 * tiles (uPVC + Aluminium) with real imagery, and a brand-red CTA strip.
 *
 * Design compliance:
 *   - No gradient overlays or decorative gradients
 *   - Hero motions respect prefers-reduced-motion
 *   - benefit icon containers: sharp 0px radius
 *   - Product tiles: next/image with warm overlay; link text is white for contrast
 *   - CTA: solid bg-brand-red
 *   - text-text-body throughout prose contexts
 */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from '@phosphor-icons/react';
import { residentialData } from '@/lib/data/solutions';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function ResidentialPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = residentialData[language];

  return (
    <div className={`min-h-screen bg-off-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Hero — solid bg-brand-dark; no decorative gradient overlay ── */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className={`relative z-10 max-w-7xl mx-auto px-6 text-center text-white ${isRTL ? 'rtl' : ''}`}>

          {/* Category badge */}
          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block py-1 px-4 bg-brand-red/20 border border-brand-red/40 text-brand-red text-sm font-semibold mb-6"
          >
            {t.hero.subtitle}
          </motion.span>

          {/* h1 — display scale, weight 800 */}
          <motion.h1
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold mb-6 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-white/75 max-w-2xl mx-auto mb-10"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-base transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{ boxShadow: '0 4px 15px rgba(231,76,60,0.20)' }}
            >
              {t.hero.cta}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {t.benefits.map((b, i) => {
              const Icon = resolveIcon(b.icon);
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial={shouldReduce ? {} : 'hidden'}
                  whileInView={shouldReduce ? undefined : 'visible'}
                  viewport={shouldReduce ? undefined : viewportOnce}
                  transition={{ delay: i * 0.1 }}
                  className={isRTL ? 'text-right' : ''}
                >
                  {/* Sharp flat icon box — no rounded container */}
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{b.title}</h3>
                  <p className="text-text-body leading-relaxed text-sm">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Product Pathways ─────────────────────────────────────────── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">{t.products.title}</h2>
            {/* Hairline accent — sharp */}
            <div className="h-0.5 w-12 bg-brand-red" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* uPVC pathway */}
            <div className="group relative overflow-hidden aspect-[4/3] bg-brand-dark">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=800&q=80"
                alt={t.products.upvc.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Warm overlay — brand-dark not cold black */}
              <div className="absolute inset-0 bg-brand-dark/70 z-10" />
              <div className={`absolute inset-0 p-8 z-20 flex flex-col justify-end ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="h-0.5 w-8 bg-brand-red mb-5" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-2">{t.products.upvc.title}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs">{t.products.upvc.description}</p>
                {/* White link — accessible on dark overlay */}
                <Link
                  href="/products/upvc"
                  className={`inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-red transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t.products.upvc.linkText}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Aluminium pathway */}
            <div className="group relative overflow-hidden aspect-[4/3] bg-brand-dark">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                alt={t.products.aluminum.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/70 z-10" />
              <div className={`absolute inset-0 p-8 z-20 flex flex-col justify-end ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="h-0.5 w-8 bg-brand-red mb-5" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-2">{t.products.aluminum.title}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs">{t.products.aluminum.description}</p>
                <Link
                  href="/products/aluminum"
                  className={`inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-red transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t.products.aluminum.linkText}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA — solid brand-red, no gradient ──────────────────────── */}
      <section className="py-20 px-6 bg-brand-red text-white">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">{t.cta.title}</h2>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold text-base hover:bg-off-white transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}
          >
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </section>

    </div>
  );
}
