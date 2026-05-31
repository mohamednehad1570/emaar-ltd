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
import { useLanguage } from '@/contexts/LanguageContext';
import ResidentialContent from '@/components/solutions/ResidentialContent';
import CommercialContent from '@/components/solutions/CommercialContent';

type TabType = 'residential' | 'commercial';

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
          {tab === 'residential' ? <ResidentialContent /> : <CommercialContent />}
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
