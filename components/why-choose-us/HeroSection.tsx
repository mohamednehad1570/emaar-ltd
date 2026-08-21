'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/uiStrings';
import { resolveIcon } from '@/lib/iconMap';

export default function HeroSection() {
  const { language, isRTL } = useLanguage();
  const t = whyChooseUsData[language];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-brand-red/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-brand-silver/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-brand-red to-brand-silver bg-clip-text text-transparent">
            {t.hero.title}
          </h1>
          <p className="text-3xl md:text-4xl font-semibold text-brand-dark mb-6">{t.hero.subtitle}</p>
          <p className="text-lg md:text-xl text-brand-gray max-w-3xl mx-auto">{t.hero.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.valueProps.map((prop, idx) => {
            const Icon = resolveIcon(prop.icon);
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-white rounded-sm" />
                <div className="relative p-6 text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-brand-red" />
                  <h3 className="font-bold text-lg text-brand-dark mb-2">{prop.title}</h3>
                  <p className="text-sm text-brand-gray mb-3">{prop.description}</p>
                  <div className="text-2xl font-bold text-brand-silver">{prop.stat}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
