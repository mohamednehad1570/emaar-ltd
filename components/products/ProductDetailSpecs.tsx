'use client';

import { motion } from 'framer-motion';
import { Ruler, Thermometer, SpeakerHigh, ShieldCheck } from '@phosphor-icons/react';
import { fadeUp, viewportOnce } from '@/lib/motion';

// One icon per spec in declaration order — index maps directly to specEntries
const SPEC_ICONS = [Ruler, Thermometer, SpeakerHigh, ShieldCheck] as const;

interface ProductDetailSpecsProps {
  specs: Array<{ label: string; value: string }>;
  isRTL: boolean;
  language: 'en' | 'ar';
}

export default function ProductDetailSpecs({ specs, isRTL, language }: ProductDetailSpecsProps) {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-2xl md:text-3xl font-bold text-brand-dark mb-3 ${isRTL ? 'text-right' : ''}`}>
          {language === 'en' ? 'Specifications' : 'المواصفات'}
        </h2>
        <div className="h-0.5 w-12 bg-brand-red mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {specs.map((spec, idx) => {
            const Icon = SPEC_ICONS[idx];
            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                transition={{ delay: idx * 0.08 }}
                className={`bg-off-white border border-border-light p-6 ${isRTL ? 'text-right' : ''}`}
              >
                <Icon className="w-6 h-6 text-brand-red mb-3" aria-hidden="true" />
                <div className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">
                  {spec.label}
                </div>
                <div className="text-base font-bold text-brand-dark">{spec.value}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
