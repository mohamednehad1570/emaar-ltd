'use client';

/**
 * components/home/CertificationsSection.tsx
 *
 * Trust band — deliberately compact and understated.
 * bg-white with border-y reads as a divider strip, not a full section.
 * Icons use text-gold — certs are the only sanctioned gold usage per CLAUDE.md.
 * Desktop: 4-column flex. Mobile: horizontal scroll so all 4 remain visible.
 */

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function CertificationsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = whyChooseUsData[language].certifications;

  return (
    <section
      className="py-10 px-6 bg-white border-y border-border-light"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-label={t.title}
    >
      <div className="container-custom">

        {/* ── Trust band label ──────────────────────────────────────── */}
        {/* Styled like Footer column headers — uppercase, wide tracking, muted */}
        <motion.p
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted text-center mb-8"
          variants={fadeUp}
          initial={shouldReduce ? {} : "hidden"}
          whileInView={shouldReduce ? undefined : "visible"}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {t.title}
        </motion.p>

        {/* ── Cert items ────────────────────────────────────────────── */}
        {/* overflow-x-auto enables horizontal scroll on mobile;
            md:overflow-visible lets the 4-column grid breathe on desktop */}
        <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-1 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {t.items.map((cert, idx) => {
            const Icon = resolveIcon(cert.icon);
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial={shouldReduce ? {} : "hidden"}
                whileInView={shouldReduce ? undefined : "visible"}
                viewport={shouldReduce ? undefined : viewportOnce}
                /* 0.08 s stagger — quick, trust-band items shouldn't linger */
                transition={{ delay: idx * 0.08 }}
                /* min-w keeps mobile items from collapsing in the scroll row */
                className={`flex items-start gap-3 min-w-[200px] md:min-w-0 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {/* Icon in gold — awards/certs only per CLAUDE.md */}
                <Icon size={28} weight="fill" className="text-gold shrink-0 mt-0.5" />

                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-bold text-brand-dark text-sm leading-tight mb-0.5">
                    {cert.name}
                  </div>
                  <div className="text-xs text-text-muted">{cert.year}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
