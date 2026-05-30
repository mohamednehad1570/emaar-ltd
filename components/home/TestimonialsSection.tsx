'use client';

/**
 * components/home/TestimonialsSection.tsx
 *
 * Asymmetric 3-column testimonial grid on bg-off-white.
 * Z-pattern: featured (2 cols) + compact (1 col) / compact (1 col) + featured (2 cols).
 * Featured cards get a larger quote body — their weight commands the row.
 * Compact cards provide volume of evidence.
 *
 * Design rules:
 *   • text-gold for stars — the only sanctioned gold usage (CLAUDE.md)
 *   • Quotes icon: text-brand-silver/30, reading-end corner (RTL-aware)
 *   • Quote text: italic, text-text-body — testimony, not marketing
 *   • staggerContainer handles sequencing — no per-item delay
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Quotes, Star } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Component ─────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = whyChooseUsData[language].testimonials;

  /* Z-pattern: items 0 and 3 are "featured" (col-span-2), items 1 and 2 are compact */
  const isFeatured = (idx: number) => idx === 0 || idx === 3;

  return (
    <section
      className="py-24 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="testimonials-heading"
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
          <h2
            id="testimonials-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3 text-balance"
          >
            {t.title}
          </h2>
          <div className={`h-0.5 w-12 bg-brand-red mb-4 ${isRTL ? 'mr-0 ml-auto md:ml-0' : ''}`} />
          <p className="text-lg text-text-body max-w-xl">{t.subtitle}</p>
        </motion.div>

        {/* ── Z-pattern testimonial grid ──────────────────────────────────
            Desktop grid-cols-3:
              Row 1: [T0 — col-span-2, featured] [T1 — col-span-1, compact]
              Row 2: [T2 — col-span-1, compact]  [T3 — col-span-2, featured]
            Mobile: single column stack (grid-cols-1).                    */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          variants={staggerContainer}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {t.items.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              /* staggerContainer handles sequencing — no per-item delay needed */
              className={`relative bg-white border-2 border-border-light ${
                isFeatured(idx) ? 'md:col-span-2 p-9' : 'md:col-span-1 p-7'
              }`}
            >
              {/* Decorative quote mark — reading-end corner (RTL-aware) */}
              <Quotes
                size={isFeatured(idx) ? 64 : 48}
                weight="fill"
                className={`
                  absolute top-5
                  ${isRTL ? 'left-5' : 'right-5'}
                  text-brand-silver/20 pointer-events-none
                `}
                aria-hidden="true"
              />

              {/* Stars */}
              <div
                className={`flex gap-1 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={isFeatured(idx) ? 18 : 14} weight="fill" className="text-gold" aria-hidden="true" />
                ))}
              </div>

              {/* Quote body — larger on featured cards for visual weight */}
              <p
                className={`italic leading-relaxed mb-7 text-text-body ${
                  isRTL ? 'text-right' : 'text-left'
                } ${isFeatured(idx) ? 'text-lg' : 'text-base'}`}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Attribution */}
              <div className={isRTL ? 'text-right' : 'text-left'}>
                {/* 2px red rule above attribution — grounds the card */}
                <div className={`h-0.5 w-8 bg-brand-red mb-4 ${isRTL ? 'mr-0 ml-auto' : ''}`} aria-hidden="true" />
                <p className="text-sm font-bold text-brand-dark">{testimonial.name}</p>
                <p className="text-xs text-text-muted mt-0.5">{testimonial.role}</p>
                <p className="text-xs text-brand-red font-semibold mt-1">{testimonial.project}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
