'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from '@/components/ui/Button';
import { whyChooseUsData } from '@/lib/data/uiStrings';
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
            {/* ghost on red-gradient section bg */}
            <Button
              variant="ghost" size="lg"
              href={getWhatsAppURL({ page: 'why-choose-us' })}
              target="_blank" rel="noopener noreferrer"
              icon={<ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />}
            >
              {t.cta.button}
            </Button>
            <Button variant="ghost" size="lg" href="/about">
              {t.cta.secondary}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
