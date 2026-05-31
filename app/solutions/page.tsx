'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';

const content = {
  en: {
    eyebrow: 'Our Solutions',
    heading: 'Tailored for Every Project',
    subheading: 'From private homes to landmark towers — we deliver the right system for your needs.',
    cards: [
      {
        title: 'Residential Solutions',
        description: 'Premium windows and doors for comfort, privacy, and elegance in your home.',
        href: '/solutions/residential',
        cta: 'Explore Residential',
      },
      {
        title: 'Commercial Solutions',
        description: 'High-performance facade and glazing systems for offices, towers, and retail.',
        href: '/solutions/commercial',
        cta: 'Explore Commercial',
      },
    ],
    ctaTitle: 'Not sure which solution fits your project?',
    ctaButton: 'Request a Free Quote',
  },
  ar: {
    eyebrow: 'حلولنا',
    heading: 'مصممة لكل مشروع',
    subheading: 'من المنازل الخاصة إلى الأبراج الشاهقة — نقدم النظام المناسب لاحتياجاتك.',
    cards: [
      {
        title: 'الحلول السكنية',
        description: 'نوافذ وأبواب متميزة للراحة والخصوصية والأناقة في منزلك.',
        href: '/solutions/residential',
        cta: 'استكشف الحلول السكنية',
      },
      {
        title: 'الحلول التجارية',
        description: 'أنظمة واجهات وتزجيج عالية الأداء للمكاتب والأبراج والتجزئة.',
        href: '/solutions/commercial',
        cta: 'استكشف الحلول التجارية',
      },
    ],
    ctaTitle: 'غير متأكد من الحل المناسب لمشروعك؟',
    ctaButton: 'اطلب عرض سعر مجاني',
  },
} as const;

export default function SolutionsPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = content[language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Editorial Hub ──────────────────────────────────────────── */}
      <section className="pt-[52px] pb-20 bg-off-white">
        <div className="max-w-7xl mx-auto px-6 pt-16">
          <motion.span
            initial={shouldReduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block px-3 py-1 bg-brand-red text-white text-xs font-semibold uppercase tracking-widest mb-6"
          >
            {t.eyebrow}
          </motion.span>
          <motion.h1
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-extrabold text-brand-dark mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}
          >
            {t.heading}
          </motion.h1>
          <motion.p
            initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-text-body text-lg max-w-xl mb-16"
          >
            {t.subheading}
          </motion.p>

          {/* ── Entry Cards ──────────────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-2 gap-6"
          >
            {t.cards.map((card) => (
              <motion.div key={card.href} variants={fadeUp}>
                <Link
                  href={card.href}
                  className="group flex flex-col justify-between h-full bg-white border border-border-light p-8 hover:border-brand-red transition-colors duration-300 min-h-[220px]"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-3">{card.title}</h2>
                    <p className="text-text-body text-base">{card.description}</p>
                  </div>
                  <div className={`flex items-center gap-2 mt-8 text-brand-red font-bold text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span>{card.cta}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-brand-void text-white">
        <div className={`max-w-3xl mx-auto px-6 text-center ${isRTL ? 'rtl' : ''}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-8">{t.ctaTitle}</h2>
          <a
            href={getWhatsAppURL({ page: 'products' })}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-brand-red hover:bg-brand-red-dark text-white font-bold text-base transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            {t.ctaButton}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </a>
        </div>
      </section>

    </div>
  );
}
