'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Quotes as Quote, Star } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { whyChooseUsData } from '@/lib/data/uiStrings';
import { staggerContainer, fadeUp } from '@/lib/motion';

export default function TestimonialsSection() {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const t = whyChooseUsData[language];

  return (
    <section ref={ref} className="py-24 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        <motion.div variants={fadeUp} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">{t.testimonials.title}</h2>
          <div className="w-24 h-1.5 bg-brand-red rounded-full mx-auto mb-4" />
          <p className="text-xl text-brand-gray">{t.testimonials.subtitle}</p>
        </motion.div>

        <motion.div variants={staggerContainer} initial={shouldReduce ? {} : 'hidden'} animate={inView ? 'visible' : 'hidden'} className="grid md:grid-cols-2 gap-8">
          {t.testimonials.items.map((testimonial, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white rounded-sm p-8 border-2 border-transparent hover:border-brand-silver transition-all relative">
              <Quote className="w-12 h-12 text-brand-silver/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-brand-silver fill-current" />
                ))}
              </div>
              <p className="text-brand-gray leading-relaxed mb-6 italic">&quot;{testimonial.text}&quot;</p>
              <div>
                <div className="font-bold text-brand-dark mb-1">{testimonial.name}</div>
                <div className="text-sm text-brand-gray mb-1">{testimonial.role}</div>
                <div className="text-sm text-brand-red font-semibold">{testimonial.project}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
