'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function ComparisonSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = whyChooseUsData[language];

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-brand-bg to-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
          className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4"
        >
          {t.comparison.title}
        </motion.h2>
        <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-16" />

        <div className="overflow-x-auto">
          <div className="bg-white rounded-sm overflow-hidden border border-border-light">
            <div className={`grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-brand-red to-brand-red-dark text-white font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
              <div>{language === 'en' ? 'Metric' : 'المقياس'}</div>
              <div className="text-center">EMAAR</div>
              <div className="text-center">{language === 'en' ? 'Industry Avg' : 'متوسط الصناعة'}</div>
            </div>
            {t.comparison.items.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={shouldReduce ? undefined : viewportOnce}
                  transition={{ delay: idx * 0.05 }}
                  className={`grid grid-cols-3 gap-4 p-6 border-b border-brand-silver/10 last:border-0 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-brand-silver" />
                    <span className="font-medium text-brand-gray">{item.metric}</span>
                  </div>
                  <div className="text-center font-bold text-brand-red">{item.emaar}</div>
                  <div className="text-center text-brand-gray">{item.industry}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
