'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Clock, CheckCircle as CheckCircle2 } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data/services';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function ProcessSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const t = servicesData[language];

  return (
    <section ref={ref} className="py-20 px-6 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {t.process.title}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-4" />
          <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.process.subtitle}</p>
          <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right' : ''}`}>{t.process.intro}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="space-y-4">
          {t.process.steps.map((step, idx) => {
            const Icon = resolveIcon(step.icon);
            return (
              <motion.div key={idx} variants={fadeUp} className="relative">
                <div className="bg-off-white border border-border-light hover:border-brand-silver transition-colors duration-200 p-6 md:p-8">
                  <div className={`flex flex-col md:flex-row gap-6 items-start ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-12 h-12 bg-brand-red flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                        </div>
                        <div className={`text-4xl font-bold text-brand-silver/25 absolute -top-4 ${isRTL ? '-right-4' : '-left-4'}`} aria-hidden="true">
                          {step.number}
                        </div>
                      </div>
                    </div>
                    <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className="text-xl font-bold text-brand-dark mb-2">{step.title}</h3>
                      <p className="text-text-body leading-relaxed mb-4">{step.description}</p>
                      <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 px-4 py-2 bg-cream ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                          <span className="text-sm font-semibold text-brand-dark">{step.duration}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 bg-cream ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0" aria-hidden="true" />
                          <span className="text-sm font-semibold text-brand-dark">{step.deliverable}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {idx < t.process.steps.length - 1 && (
                  <div className={`absolute ${isRTL ? 'right-[22px]' : 'left-[22px]'} top-full w-px h-4 bg-border-medium`} aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
