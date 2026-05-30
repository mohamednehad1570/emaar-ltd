'use client';

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, FileText, Gear as Cog } from '@phosphor-icons/react';
import Link from 'next/link';
import { commercialData } from '@/lib/data/solutions';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function CommercialPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = commercialData[language];

  return (
    <div className={`min-h-screen bg-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-dark-mid" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block py-1 px-4 rounded-none bg-brand-silver/20 border border-brand-silver/50 text-brand-silver text-sm font-semibold mb-6">
            {t.hero.subtitle}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6">{t.hero.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{t.hero.description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex gap-4 justify-center">
            <Link href="/contact?type=commercial" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white rounded-none font-bold text-lg hover:bg-brand-red-dark transition-all shadow-warm-red">
              {t.hero.cta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.capabilities.map((cap, i) => {
              const Icon = resolveIcon(cap.icon);
              return (
                <motion.div key={i} variants={fadeUp} initial={shouldReduce ? {} : "hidden"} whileInView={shouldReduce ? undefined : "visible"} viewport={shouldReduce ? undefined : viewportOnce} transition={{ delay: i * 0.1 }} className="bg-brand-bg border border-border-light p-8 rounded-sm">
                  <div className="mb-6 p-4 bg-white rounded-sm inline-block"><Icon className="w-8 h-8 text-brand-red" /></div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{cap.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{cap.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Hub */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">{t.techHub.title}</h2>
              <p className="text-white/70 text-lg mb-8">{t.techHub.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm"><FileText className="w-4 h-4 text-brand-red" /><span>{t.techHub.pdfLabel}</span></div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-sm"><Cog className="w-4 h-4 text-brand-red" /><span>{t.techHub.cadLabel}</span></div>
              </div>
            </div>
            <div className="md:w-auto">
              <Link href="/tech" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-dark rounded-none font-bold text-lg hover:bg-brand-bg transition-all">
                {t.techHub.button} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-red text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">{t.cta.title}</h2>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red rounded-none font-bold text-lg hover:shadow-warm-xl transition-all">
            {t.cta.button} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
