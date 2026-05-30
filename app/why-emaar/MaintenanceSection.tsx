'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Phone, CheckCircle as CheckCircle2, WarningCircle as AlertCircle } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { servicesData } from '@/lib/data/services';
import { resolveIcon } from '@/lib/iconMap';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';

export default function MaintenanceSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const t = servicesData[language];

  return (
    <section ref={ref} className="py-20 px-6 bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
            {t.maintenance.title}
          </h2>
          <div className="h-0.5 w-12 bg-brand-red mb-4" />
          <p className={`text-lg text-text-body mb-3 ${isRTL ? 'text-right' : ''}`}>{t.maintenance.subtitle}</p>
          <p className={`text-text-body max-w-2xl ${isRTL ? 'text-right' : ''}`}>{t.maintenance.intro}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="grid md:grid-cols-3 gap-6 mb-14">
          {t.maintenance.plans.map((plan, idx) => {
            const Icon = resolveIcon(plan.icon);
            return (
              <motion.div key={idx} variants={fadeUp} className="relative mt-4">
                {plan.popular && (
                  <div className={`absolute -top-4 ${isRTL ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'} px-5 py-1.5 bg-brand-red text-white font-bold text-xs uppercase tracking-wide z-10`}>
                    {language === 'en' ? 'Most Popular' : 'الأكثر شعبية'}
                  </div>
                )}
                <div className={`bg-white p-8 border h-full ${plan.popular ? 'border-2 border-brand-red' : 'border border-border-light'}`}>
                  <Icon className="w-10 h-10 text-brand-red mb-4" aria-hidden="true" />
                  <h3 className={`text-xl font-bold text-brand-dark mb-2 ${isRTL ? 'text-right' : ''}`}>{plan.name}</h3>
                  <div className={`text-2xl font-bold text-brand-red mb-6 ${isRTL ? 'text-right' : ''}`}>{plan.price}</div>
                  <ul className={`space-y-3 mb-8 ${isRTL ? 'text-right' : ''}`}>
                    {plan.features.map((feature, i) => (
                      <li key={i} className={`flex items-start gap-2 text-text-body ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <CheckCircle2 className="w-4 h-4 text-brand-red shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full px-6 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-semibold transition-colors">
                      {language === 'en' ? 'Request a Quote' : 'طلب عرض سعر'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} whileInView={shouldReduce ? undefined : 'visible'} viewport={shouldReduce ? undefined : viewportOnce} className="bg-brand-red p-8 md:p-12 text-white">
          <div className={`text-center mb-8 ${isRTL ? 'rtl' : ''}`}>
            <AlertCircle className="w-14 h-14 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-bold mb-3">{t.maintenance.emergency.title}</h3>
            <p className="text-lg text-white/90">{t.maintenance.emergency.description}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {t.maintenance.emergency.features.map((feature, idx) => {
              const FIcon = resolveIcon(feature.icon);
              return (
                <div key={idx} className={`text-center ${isRTL ? 'rtl' : ''}`}>
                  <div className="w-14 h-14 bg-white/20 flex items-center justify-center mx-auto mb-3">
                    <FIcon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h4 className="font-bold mb-1 text-sm">{feature.title}</h4>
                  <p className="text-xs text-white/80">{feature.description}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <p className={`text-lg font-bold mb-4 ${isRTL ? 'rtl' : ''}`}>{t.maintenance.emergency.contact}</p>
            <a href="tel:+971501234567">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red font-bold text-base ${isRTL ? 'flex-row-reverse' : ''}`} style={{ boxShadow: '0 4px 20px rgba(45,41,38,0.15)' }}>
                <Phone className="w-5 h-5" aria-hidden="true" />
                {language === 'en' ? 'Call Now' : 'اتصل الآن'}
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
