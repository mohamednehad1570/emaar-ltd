'use client';

/**
 * components/home/TestimonialsSection.tsx
 *
 * 2-column testimonial grid on bg-off-white.
 * Cards are white with a 2px border-border-light — clean, editorial.
 * No shadow per updated shadow spec; 2px radius (--radius-card).
 *
 * Design rules:
 *   • text-gold for stars — the only sanctioned gold usage (CLAUDE.md)
 *   • Decorative quote mark: text-brand-silver/30, top-right corner
 *   • Quote text: italic, text-text-body — testimony, not marketing
 *   • Attribution: name bold, role muted — hierarchy matches the eye's reading order
 *   • bg-off-white section — alternates after the dark WhyChooseUs above
 */

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { Quotes, Star } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Component ─────────────────────────────────────────────────────────── */

export default function TestimonialsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = whyChooseUsData[language].testimonials;

  return (
    <section
      className="py-24 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="testimonials-heading"
    >
      <div className="container-custom">

        {/* ── Section heading — left-aligned ───────────────────────────── */}
        <motion.div
          className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
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

        {/* ── 2-column card grid ───────────────────────────────────────── */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {t.items.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              /* 0.1s stagger — 4 cards, 0.3s total cascade */
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white rounded-sm border-2 border-border-light p-8"
            >
              {/* Decorative quote mark — top-right (top-left in RTL) */}
              <Quotes
                size={52}
                weight="fill"
                className={`
                  absolute top-5
                  ${isRTL ? 'left-5' : 'right-5'}
                  text-brand-silver/30 pointer-events-none
                `}
                aria-hidden="true"
              />

              {/* ── Stars ──────────────────────────────────────────────── */}
              <div
                className={`flex gap-1 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  /* text-gold — the only sanctioned use of the gold token (CLAUDE.md) */
                  <Star key={i} size={16} weight="fill" className="text-gold" aria-hidden="true" />
                ))}
              </div>

              {/* ── Quote body ─────────────────────────────────────────── */}
              <p
                className={`text-base text-text-body italic leading-relaxed mb-6 ${
                  isRTL ? 'text-right' : 'text-left'
                }`}
              >
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* ── Attribution ────────────────────────────────────────── */}
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <p className="text-sm font-bold text-brand-dark">{testimonial.name}</p>
                <p className="text-sm text-text-muted mt-0.5">{testimonial.role}</p>
                <p className="text-sm text-brand-red font-semibold mt-1">{testimonial.project}</p>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
