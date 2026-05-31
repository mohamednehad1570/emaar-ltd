'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/whyChooseUs';
import { fadeUp, viewportOnce } from '@/lib/motion';
import { getWhatsAppURL } from '@/lib/whatsapp';

export default function CTASection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const t = whyChooseUsData[language];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-brand-red via-brand-red-dark to-brand-red text-white relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.cta.title}</h2>
          <p className="text-xl text-white/90 mb-8">{t.cta.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href={getWhatsAppURL({ page: 'why-choose-us' })}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-none bg-white hover:bg-cream text-brand-red font-semibold text-lg shadow-warm-xl transition-colors"
              style={{ color: 'var(--color-brand-red)' }}
            >
              {t.cta.button}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.a>
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                className="px-8 py-4 rounded-none bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border-2 border-white/40 hover:bg-white/20 hover:border-white/60 transition-colors"
              >
                {t.cta.secondary}
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
