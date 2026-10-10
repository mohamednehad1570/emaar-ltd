'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FileText } from '@phosphor-icons/react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import type { TechContent } from '@/lib/data/uiStrings';
import type { Localized, TechDocument, TechDocumentCategory } from '@/lib/types';
import TechDocumentList from './TechDocumentList';

interface TechnicalPageClientProps {
  documents: TechDocument[];
  categories: Record<TechDocumentCategory, Localized<string>>;
  staticData: Record<'en' | 'ar', TechContent>;
}

export default function TechnicalPageClient({ documents, categories, staticData }: TechnicalPageClientProps) {
  const { language, isRTL } = useLanguage();
  const shouldReduce = useReducedMotion();
  // staticData still supplies the stats strip and CTA copy
  const sd = staticData[language];

  return (
    <div className="min-h-screen bg-off-white" dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Stats — hero replaced by PageHeader in page.tsx ─────────── */}
      <section className="pt-10 pb-10 px-6 bg-off-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={shouldReduce ? {} : staggerContainer}
            initial={shouldReduce ? {} : 'hidden'}
            whileInView={shouldReduce ? undefined : 'visible'}
            viewport={shouldReduce ? undefined : viewportOnce}
          >
            {sd.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={shouldReduce ? {} : fadeUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-brand-red mb-2">{stat.number}</div>
                <div className="text-ink-body font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Documents — "Available on request", no downloads ─────── */}
      <TechDocumentList documents={documents} categories={categories} />

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <FileText className="w-16 h-16 mx-auto mb-6 text-silver-material" />
            <h2 className="text-4xl font-bold mb-4">{sd.cta.title}</h2>
            <p className="text-xl text-white/70 mb-8">{sd.cta.description}</p>
            {/* ghost on dark section bg */}
            <Button
              variant="ghost" size="lg"
              href={getWhatsAppURL({ page: 'technical', locale: language })}
              target="_blank" rel="noopener noreferrer"
            >
              {sd.cta.button}
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
