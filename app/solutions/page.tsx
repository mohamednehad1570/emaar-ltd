'use client';

/**
 * app/solutions/page.tsx
 *
 * Unified solutions hub with a tab switcher.
 * URL param: ?type=residential (default) | ?type=commercial
 *
 * Tab bar design:
 *   - Sticky top-[52px] (sits flush below the 52px fixed header)
 *   - Sharp corners — no pills, no rounded tabs
 *   - Underline active indicator using Framer Motion layoutId spring
 *   - Bilingual labels, RTL-aware flex direction
 *
 * useSearchParams requires a Suspense boundary. SolutionsContent (inner) does
 * the real work; SolutionsPage (default export) wraps it in Suspense so the
 * static shell renders without hydration errors.
 */

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Gear as Cog } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { residentialData, commercialData } from '@/lib/data/solutions';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';
import type { SolutionData, CommercialData } from '@/lib/data/solutions';

type TabType = 'residential' | 'commercial';

/* ─────────────────────────────────────────────────────────────────────────
   Residential content
────────────────────────────────────────────────────────────────────────── */

interface ResidentialProps {
  t: SolutionData;
  isRTL: boolean;
  language: 'en' | 'ar';
  shouldReduce: boolean | null;
}

function ResidentialContent({ t, isRTL, language, shouldReduce }: ResidentialProps) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className={`relative z-10 max-w-7xl mx-auto px-6 text-center text-white ${isRTL ? 'rtl' : ''}`}>
          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block py-1 px-4 bg-brand-red/20 border border-brand-red/40 text-brand-red text-sm font-semibold mb-6"
          >
            {t.hero.subtitle}
          </motion.span>
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

      {/* ── Benefits ──────────────────────────────────────────────────── */}
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

      {/* ── Product Pathways ──────────────────────────────────────────── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-3">{t.products.title}</h2>
            <div className="h-0.5 w-12 bg-brand-red" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* uPVC */}
            <div className="group relative overflow-hidden aspect-[4/3] bg-brand-dark">
              <Image
                src="https://images.unsplash.com/photo-1600596542815-22b5c1275efb?w=800&q=80"
                alt={t.products.upvc.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-dark/70 z-10" />
              <div className={`absolute inset-0 p-8 z-20 flex flex-col justify-end ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
                <div className="h-0.5 w-8 bg-brand-red mb-5" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-white mb-2">{t.products.upvc.title}</h3>
                <p className="text-white/70 text-sm mb-6 max-w-xs">{t.products.upvc.description}</p>
                <Link
                  href="/products/upvc"
                  className={`inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-red transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {t.products.upvc.linkText}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                </Link>
              </div>
            </div>
            {/* Aluminium */}
            <div className="group relative overflow-hidden aspect-[4/3] bg-brand-dark">
              <Image
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                alt={t.products.aluminum.title}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-red text-white">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">{t.cta.title}</h2>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold text-base hover:bg-cream transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}
          >
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Commercial content
────────────────────────────────────────────────────────────────────────── */

interface CommercialProps {
  t: CommercialData;
  isRTL: boolean;
  language: 'en' | 'ar';
  shouldReduce: boolean | null;
}

function CommercialContent({ t, isRTL, shouldReduce }: CommercialProps) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className={`relative z-10 max-w-7xl mx-auto px-6 text-center text-white ${isRTL ? 'rtl' : ''}`}>
          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block py-1 px-4 bg-brand-silver/20 border border-brand-silver/40 text-brand-silver text-sm font-semibold mb-6"
          >
            {t.hero.subtitle}
          </motion.span>
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
            className="flex gap-4 justify-center"
          >
            <Link
              href="/contact?type=commercial"
              className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-base transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{ boxShadow: '0 4px 15px rgba(231,76,60,0.20)' }}
            >
              {t.hero.cta}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {t.capabilities.map((cap, i) => {
              const Icon = resolveIcon(cap.icon);
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
                  <div className="w-8 h-8 bg-brand-red flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3">{cap.title}</h3>
                  <p className="text-text-body leading-relaxed text-sm">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Tech Hub ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-dark text-white overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-12 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <div className={`md:w-1/2 ${isRTL ? 'text-right' : ''}`}>
              <h2 className="text-2xl md:text-3xl font-bold mb-5">{t.techHub.title}</h2>
              <p className="text-white/75 text-base mb-7 leading-relaxed">{t.techHub.description}</p>
              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 bg-white/10 px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <FileText className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  <span className="text-sm">{t.techHub.pdfLabel}</span>
                </div>
                <div className={`flex items-center gap-2 bg-white/10 px-4 py-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Cog className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                  <span className="text-sm">{t.techHub.cadLabel}</span>
                </div>
              </div>
            </div>
            <div className="md:w-auto shrink-0">
              <Link
                href="/tech"
                className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark font-bold text-base hover:bg-cream transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t.techHub.button}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-red text-white">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">{t.cta.title}</h2>
          <Link
            href="/contact"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold text-base hover:bg-cream transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}
          >
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Tab switcher — uses useSearchParams, must sit inside Suspense
────────────────────────────────────────────────────────────────────────── */

const TABS: { id: TabType; en: string; ar: string }[] = [
  { id: 'residential', en: 'Residential Solutions', ar: 'الحلول السكنية'  },
  { id: 'commercial',  en: 'Commercial Solutions',  ar: 'الحلول التجارية' },
];

function SolutionsContent() {
  const router      = useRouter();
  const params      = useSearchParams();
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();

  /* Default to residential; reject any unknown param value */
  const raw = params.get('type');
  const tab: TabType = raw === 'commercial' ? 'commercial' : 'residential';

  const tRes = residentialData[language];
  const tCom = commercialData[language];

  const switchTab = (next: TabType) => {
    /* scroll: false keeps the viewport position when switching tabs */
    router.push(`/solutions?type=${next}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Tab bar — sticky below 52px fixed header ────────────────── */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex ${isRTL ? 'flex-row-reverse' : ''}`}
            role="tablist"
            aria-label={language === 'en' ? 'Solution type' : 'نوع الحل'}
          >
            {TABS.map(({ id, en, ar }) => {
              const isActive = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => switchTab(id)}
                  className={`relative px-6 py-4 text-sm font-semibold min-h-[52px] transition-colors duration-150 ${
                    isActive
                      ? 'text-brand-dark'
                      : 'text-text-muted hover:text-brand-dark'
                  }`}
                >
                  {language === 'en' ? en : ar}

                  {/* Underline slides between tabs with a critically-damped spring (no bounce) */}
                  {isActive && (
                    <motion.div
                      layoutId="solutions-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                      transition={{ type: 'spring', stiffness: 500, damping: 48 }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab content — cross-fades on switch ─────────────────────── */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {tab === 'residential'
            ? <ResidentialContent t={tRes} isRTL={isRTL} language={language} shouldReduce={shouldReduce} />
            : <CommercialContent  t={tCom} isRTL={isRTL} language={language} shouldReduce={shouldReduce} />
          }
        </motion.div>
      </AnimatePresence>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Page export — wraps inner component in Suspense so useSearchParams
   doesn't break static pre-rendering of the shell.
────────────────────────────────────────────────────────────────────────── */

export default function SolutionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-off-white" aria-hidden="true" />}>
      <SolutionsContent />
    </Suspense>
  );
}
