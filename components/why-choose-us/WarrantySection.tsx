'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle as CheckCircle2, WarningCircle as AlertCircle } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data/uiStrings';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function WarrantySection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const t = servicesData[language];

  return (
    <section ref={ref} className="py-20 px-6 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {t.warranty.title}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-4" />
          <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.warranty.subtitle}</p>
          <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right' : ''}`}>{t.warranty.intro}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 gap-6 mb-10">
          {t.warranty.coverage.map((item, idx) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div key={idx} variants={fadeUp} className="bg-off-white border border-border-light hover:border-brand-silver transition-colors p-8">
                <div className={`flex items-start gap-4 mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-9 h-9 bg-brand-red flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="text-lg font-bold text-brand-dark mb-1.5">{item.title}</h3>
                    <p className="text-sm text-text-body">{item.description}</p>
                  </div>
                </div>
                <ul className={`space-y-2 ${isRTL ? 'text-right' : ''}`}>
                  {item.details.map((detail, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} whileInView={shouldReduce ? undefined : 'visible'} viewport={shouldReduce ? undefined : viewportOnce} className="bg-off-white border border-border-light p-8">
            <h3 className={`text-xl font-bold text-brand-dark mb-5 ${isRTL ? 'text-right' : ''}`}>{t.warranty.exclusions.title}</h3>
            <ul className={`space-y-3 ${isRTL ? 'text-right' : ''}`}>
              {t.warranty.exclusions.items.map((item, idx) => (
                <li key={idx} className={`flex items-start gap-2 text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <AlertCircle className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} whileInView={shouldReduce ? undefined : 'visible'} viewport={shouldReduce ? undefined : viewportOnce} className="bg-cream border border-border-light p-8">
            <h3 className={`text-xl font-bold text-brand-dark mb-5 ${isRTL ? 'text-right' : ''}`}>{t.warranty.claim.title}</h3>
            <ol className={`space-y-4 ${isRTL ? 'text-right' : ''}`}>
              {t.warranty.claim.steps.map((step, idx) => (
                <li key={idx} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-7 h-7 bg-brand-red flex items-center justify-center shrink-0 text-white font-bold text-sm">{idx + 1}</div>
                  <span className="text-text-body pt-0.5 text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
