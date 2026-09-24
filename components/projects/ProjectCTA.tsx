'use client';

import { motion } from 'framer-motion';
import { WhatsappLogo } from '@phosphor-icons/react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { fadeUp, viewportOnce } from '@/lib/motion';

const COPY = {
  en: {
    eyebrow: 'Your Project',
    heading: 'Working on your own project?',
    body: 'From initial measurements to final installation — we handle the full process. 26 years of completed projects across the UAE.',
    chips: ['End-to-end service', 'UAE-wide', '26+ years'],
    primary: 'Request a Quote',
    whatsapp: 'WhatsApp Us',
  },
  ar: {
    eyebrow: 'مشروعك',
    heading: 'هل لديك مشروع خاص؟',
    body: 'من القياسات الأولى إلى التركيب النهائي — نتولى العملية الكاملة. 26 عاماً من المشاريع المنجزة في جميع أنحاء الإمارات.',
    chips: ['خدمة شاملة', 'في كل الإمارات', '+26 عاماً'],
    primary: 'اطلب عرض سعر',
    whatsapp: 'واتساب',
  },
} as const;

export default function ProjectCTA() {
  const { language } = useLanguage();
  const t = COPY[language];

  return (
    <section className="bg-off-white border-t border-border-light py-16">
      <motion.div
        className="max-w-4xl mx-auto px-6 text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs uppercase tracking-widest text-ink-muted">{t.eyebrow}</p>
        <h2 className="text-3xl font-bold text-ink-heading mt-2">{t.heading}</h2>
        <p className="text-ink-body text-base mt-4 max-w-2xl mx-auto">{t.body}</p>

        <div className="flex justify-center gap-2 flex-wrap mt-6">
          {t.chips.map((chip) => (
            <span key={chip} className="bg-surface-cream text-ink-muted text-xs px-3 py-1 border border-border-light">
              {chip}
            </span>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Button variant="primary" size="lg" href="/contact">{t.primary}</Button>
          <Button
            variant="outline" size="lg"
            href={getWhatsAppURL({ page: 'projects' })}
            target="_blank" rel="noopener noreferrer"
            icon={<WhatsappLogo size={20} weight="fill" />}
          >
            {t.whatsapp}
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
