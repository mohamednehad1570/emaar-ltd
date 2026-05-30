'use client';

import React from 'react';
import { motion , useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { residentialData } from '@/lib/data/solutions';
import { resolveIcon } from '@/lib/iconMap';
import { fadeUp, viewportOnce } from '@/lib/motion';

export default function ResidentialPage() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = residentialData[language];

  return (
    <div className={`min-h-screen bg-brand-bg ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="w-full h-full bg-gradient-to-r from-brand-dark to-brand-dark-mid" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block py-1 px-4 rounded-none bg-brand-red/20 border border-brand-red/50 text-brand-red text-sm font-semibold mb-6">
            {t.hero.subtitle}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-bold mb-6">{t.hero.title}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-white/70 max-w-2xl mx-auto mb-10">{t.hero.description}</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-red text-white rounded-none font-bold text-lg hover:bg-brand-red-dark transition-all shadow-warm-red">
              {t.hero.cta}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {t.benefits.map((b, i) => {
              const Icon = resolveIcon(b.icon);
              return (
                <motion.div key={i} variants={fadeUp} initial={shouldReduce ? {} : "hidden"} whileInView={shouldReduce ? undefined : "visible"} viewport={shouldReduce ? undefined : viewportOnce} transition={{ delay: i * 0.1 }} className="bg-brand-bg p-8 rounded-sm border-2 border-transparent hover:border-brand-silver transition-all">
                  <div className="mb-6 p-4 bg-brand-red/10 rounded-sm inline-block"><Icon className="w-8 h-8 text-brand-red" /></div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{b.title}</h3>
                  <p className="text-brand-gray leading-relaxed">{b.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Pathways */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">{t.products.title}</h2>
            <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mt-4" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-sm bg-brand-dark aspect-[4/3] text-white">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2">{t.products.upvc.title}</h3>
                <p className="text-white/70 mb-6">{t.products.upvc.description}</p>
                <Link href="/products/upvc" className="inline-flex items-center gap-2 text-brand-red font-bold group-hover:gap-4 transition-all">
                  {t.products.upvc.linkText} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-sm bg-brand-silver aspect-[4/3] text-white">
              <div className="absolute inset-0 bg-black/60 z-10" />
              <div className="absolute inset-0 p-8 z-20 flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2">{t.products.aluminum.title}</h3>
                <p className="text-white/70 mb-6">{t.products.aluminum.description}</p>
                <Link href="/products/aluminum" className="inline-flex items-center gap-2 text-brand-red font-bold group-hover:gap-4 transition-all">
                  {t.products.aluminum.linkText} <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </div>
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
