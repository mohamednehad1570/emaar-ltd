'use client';

/**
 * components/home/TestimonialsSection.tsx
 *
 * Client testimonials on a bg-brand-dark ground.
 * Glass cards (bg-white/5 + border-white/10) create depth without colour.
 * Stars use text-gold — the only sanctioned gold usage per CLAUDE.md.
 * Quote icon is decorative and flips side based on reading direction.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Quotes, Star } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function TestimonialsSection() {
  const { language, isRTL } = useLanguage();
  const t = whyChooseUsData[language].testimonials;

  return (
    <section
      className="py-20 px-6 bg-brand-dark"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={t.title}
    >
      <div className="container-custom">

        {/* ── Section heading ──────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-cairo text-white mb-4">
            {t.title}
          </h2>
          {/* Red accent line — same pattern as all section headings */}
          <div className="h-1 w-24 bg-brand-red rounded-full mx-auto mb-4" />
          <p className="text-xl text-white/70 max-w-2xl mx-auto">{t.subtitle}</p>
        </motion.div>

        {/* ── Testimonial cards ─────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
          {t.items.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              /* 0.1 s stagger — each card enters 100 ms after the previous */
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              {/* Decorative quote — right in LTR, left in RTL so it stays
                  at the reading-end corner rather than the reading-start */}
              <Quotes
                size={48}
                weight="fill"
                className={`absolute top-6 ${isRTL ? 'left-6' : 'right-6'} text-brand-silver/20`}
                aria-hidden="true"
              />

              {/* Star rating — text-gold (certs + stars are the only gold uses) */}
              <div className={`flex gap-1 mb-5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-gold" />
                ))}
              </div>

              {/* Quote body */}
              <p className={`text-white/80 leading-relaxed mb-6 italic ${isRTL ? 'text-right' : 'text-left'}`}>
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Attribution */}
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <div className="font-bold text-white mb-0.5">{testimonial.name}</div>
                <div className="text-sm text-white/60 mb-1">{testimonial.role}</div>
                <div className="text-sm text-brand-red font-semibold">{testimonial.project}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
