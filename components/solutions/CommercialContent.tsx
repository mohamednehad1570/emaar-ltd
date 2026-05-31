'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, Gear as Cog } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { commercialData } from '@/lib/data/solutions';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function CommercialContent() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = commercialData[language];

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
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} aria-hidden="true" />
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
              <Link href="/technical" className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark font-bold text-base hover:bg-cream transition-colors ${isRTL ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--color-brand-dark)' }}>
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
            style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)', color: 'var(--color-brand-red)' }}
          >
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
