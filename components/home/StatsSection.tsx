'use client';

/**
 * components/home/StatsSection.tsx
 *
 * Four-column stat display on a clean white field.
 * No cards, borders, or shadows — raw numerals carry the authority.
 * A 2px brand-red top stroke above each stat grounds it to the grid.
 *
 * Design rules:
 *   • tabular-nums keeps digit columns aligned as numbers animate in
 *   • stagger delay 0.12s — enough separation without feeling slow
 *   • uppercase + tracking-wide on labels: editorial, not technical
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

/* ── Data ──────────────────────────────────────────────────────────────── */

const content = {
  en: [
    { number: '20+',  label: 'Years Experience'    },
    { number: '500+', label: 'Projects Completed'  },
    { number: '50+',  label: 'Expert Team'         },
    { number: '100%', label: 'Client Satisfaction' },
  ],
  ar: [
    { number: '20+',  label: 'سنة خبرة'     },
    { number: '500+', label: 'مشروع مكتمل'   },
    { number: '50+',  label: 'فريق خبراء'    },
    { number: '100%', label: 'رضا العملاء'   },
  ],
} as const;

/* ── Component ─────────────────────────────────────────────────────────── */

export default function StatsSection() {
  const { language, isRTL } = useLanguage();
  const stats = content[language];

  return (
    <section
      className="py-24 bg-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={language === 'en' ? 'Key statistics' : 'الإحصاءات الرئيسية'}
    >
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              /* 0.12s stagger — readable without feeling mechanical */
              transition={{ delay: idx * 0.12 }}
              className="flex flex-col"
            >
              {/* 2px red stroke — grounds the stat, links back to brand accent */}
              <div className="w-8 h-0.5 bg-brand-red mb-5" aria-hidden="true" />

              {/* Numeral — tabular-nums keeps '100%' same width as '500+' */}
              <span
                className="text-5xl font-extrabold font-cairo tabular-nums text-brand-dark leading-none mb-3"
                /* dir=ltr so digit order is always left-to-right, even in Arabic mode */
                dir="ltr"
              >
                {stat.number}
              </span>

              <span className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
