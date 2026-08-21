'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { CheckCircle as CheckCircle2 } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/uiStrings';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function CertificationsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const t = whyChooseUsData[language];

  return (
    <section ref={ref} className="py-24 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.certifications.title}</h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
          <p className="text-xl text-brand-gray mb-6">{t.certifications.subtitle}</p>
          <p className="text-brand-gray max-w-3xl mx-auto">{t.certifications.intro}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 gap-8 mb-12">
          {t.certifications.items.map((cert, idx) => {
            const Icon = resolveIcon(cert.icon);
            return (
              <motion.div key={idx} variants={fadeUp} className="bg-white rounded-sm p-8 border-2 border-transparent hover:border-brand-silver transition-all">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-silver to-brand-red flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-brand-dark">{cert.name}</h3>
                      <span className="px-3 py-1 rounded-none bg-brand-silver/10 text-brand-dark text-sm font-semibold">{cert.year}</span>
                    </div>
                    <p className="text-brand-gray leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} whileInView={shouldReduce ? undefined : 'visible'} viewport={shouldReduce ? undefined : viewportOnce} className="bg-gradient-to-br from-brand-bg to-white rounded-sm p-8 md:p-12 border-2 border-transparent hover:border-brand-silver transition-all">
          <h3 className="text-3xl font-bold text-brand-dark mb-8 text-center">{t.certifications.standards.title}</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.certifications.standards.items.map((standard, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-sm p-4 border border-border-light">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
                <span className="text-brand-gray">{standard}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
