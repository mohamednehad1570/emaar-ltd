'use client';
// FAQ accordion — up to 5 product/technical questions from static faq.ts
// One item open at a time; border-bottom rows, no box shadows

import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { faqData } from '@/lib/data/faq';
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';

// Only 'products' and 'technical' categories are pertinent on a product detail page
const RELEVANT = new Set(['products', 'technical']);
const MAX = 5; // focused subset — full FAQ lives at /faq

export default function ProductDetailFAQ() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  // null = all collapsed; number = index of the open row
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Filter to relevant FAQ categories, cap at MAX — done here not at render-time
  const faqs = faqData[language].faqs
    .filter((f) => RELEVANT.has(f.category))
    .slice(0, MAX);

  if (!faqs.length) return null;

  return (
    <section className="bg-surface-white py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        {/* Section eyebrow */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-3">
          {language === 'en' ? 'Support' : 'الدعم'}
        </p>
        <h2 className="font-cairo font-bold text-ink-heading text-2xl md:text-3xl mb-10">
          {language === 'en' ? 'Frequently Asked Questions' : 'الأسئلة الشائعة'}
        </h2>

        {/* max-w-3xl keeps the text line length comfortable for reading */}
        <div className="max-w-3xl">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="border-b border-border-light">

                {/* ── Question button ──────────────────────────────────── */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)} // toggle: close if already open
                  aria-expanded={isOpen}
                  className={cn(
                    'w-full flex items-start gap-4 py-5 cursor-pointer',
                    isRTL ? 'flex-row-reverse text-right' : 'text-left',
                  )}
                >
                  <span className="flex-1 text-base font-semibold text-ink-heading font-cairo">
                    {faq.question}
                  </span>
                  {/* Caret icon rotates 180° when the row is open — pure duration, no spring */}
                  <motion.span
                    animate={shouldReduce ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 mt-0.5"
                  >
                    <CaretDown className="w-5 h-5 text-ink-muted" />
                  </motion.span>
                </button>

                {/* ── Answer — height-animated expand/collapse ─────────── */}
                {/* AnimatePresence initial=false prevents animation on first mount */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={shouldReduce ? undefined : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={shouldReduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      {/* pb-6 creates visual breathing room before the next border */}
                      <p className="pb-6 text-sm leading-relaxed text-ink-body">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
