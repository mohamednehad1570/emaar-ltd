'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { residentialData } from '@/lib/data/solutions';
import { upvcData } from '@/lib/data/products';
import { projectsData } from '@/lib/data/projects';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';
import SolutionProductsSection from './SolutionProductsSection';
import SolutionProjectsSection from './SolutionProjectsSection';

const residentialProjects = projectsData.filter((p) => p.type === 'residential');

const labels = {
  en: { products: 'Recommended for Your Home', viewAll: 'View All uPVC Products', projects: 'Residential Projects' },
  ar: { products: 'موصى به لمنزلك', viewAll: 'عرض جميع منتجات uPVC', projects: 'المشاريع السكنية' },
} as const;

export default function ResidentialContent() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = residentialData[language];
  const lb = labels[language];

  return (
    <>
      {/* ── Type-only Hero ─────────────────────────────────────────── */}
      <section className="py-20 bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-3 py-1 bg-brand-red text-white text-xs font-semibold uppercase tracking-widest mb-6"
          >
            {t.hero.subtitle}
          </motion.span>
          <motion.h1
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold text-brand-dark mb-5 text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-body text-lg max-w-2xl mb-10"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={getWhatsAppURL({ page: 'solutions-residential' })}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-base transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t.hero.cta}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 3 Key Benefits ─────────────────────────────────────────── */}
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

      {/* ── Recommended Products ───────────────────────────────────── */}
      <SolutionProductsSection
        products={upvcData[language].products}
        material="upvc"
        sectionTitle={lb.products}
        viewAllHref="/products/upvc"
        viewAllLabel={lb.viewAll}
      />

      {/* ── Featured Residential Projects ──────────────────────────── */}
      <SolutionProjectsSection projects={residentialProjects} sectionTitle={lb.projects} />

      {/* ── CTA (void bg) ──────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-brand-void text-white">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-balance">{t.cta.title}</h2>
          <a
            href={getWhatsAppURL({ page: 'solutions-residential' })}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-white font-bold text-base hover:bg-cream transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ color: 'var(--color-brand-dark)' }}
          >
            {t.cta.button}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
