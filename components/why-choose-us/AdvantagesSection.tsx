'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle as CheckCircle2 } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/uiStrings';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function AdvantagesSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const t = whyChooseUsData[language];

  return (
    <section ref={ref} className="py-24 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.advantages.title}</h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
          <p className="text-xl text-brand-gray">{t.advantages.subtitle}</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial={shouldReduce ? {} : 'hidden'}
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {t.advantages.items.map((item, idx) => {
            const Icon = resolveIcon(item.icon);
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-white rounded-sm p-8 border-2 border-transparent hover:border-brand-silver transition-all"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-red to-brand-red-dark flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-brand-dark mb-3">{item.title}</h3>
                    <p className="text-brand-gray mb-4 leading-relaxed">{item.description}</p>
                    <ul className="space-y-2">
                      {item.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-brand-gray">
                          <CheckCircle2 className="w-4 h-4 text-brand-red flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
