'use client';

/**
 * components/technical/TechDocumentList.tsx
 *
 * Category tabs + document rows for /technical. Every document is
 * "Available on request": there are no files, so each row's action opens the
 * technical-page WhatsApp thread instead of downloading anything.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText } from '@phosphor-icons/react';
import { ArrowForward } from '@/components/ui/DirectionalIcon';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { getWhatsAppURL } from '@/lib/whatsapp';
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { Localized, TechDocument, TechDocumentCategory } from '@/lib/types';

interface TechDocumentListProps {
  documents: TechDocument[];
  categories: Record<TechDocumentCategory, Localized<string>>;
}

type Filter = TechDocumentCategory | 'all';

export default function TechDocumentList({ documents, categories }: TechDocumentListProps) {
  const { language } = useLanguage();
  const l = useTranslation();
  const [active, setActive] = useState<Filter>('all');

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: l('All Documents', 'جميع الوثائق') },
    ...(Object.keys(categories) as TechDocumentCategory[]).map((key) => ({ key, label: categories[key][language] })),
  ];
  const visible = active === 'all' ? documents : documents.filter((d) => d.category === active);
  // One shared URL — the 'technical' message already says the visitor is reviewing specs
  const requestHref = getWhatsAppURL({ page: 'technical', locale: language });

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Category tabs ─────────────────────────────────────── */}
        <div role="tablist" aria-label={l('Document categories', 'فئات الوثائق')} className="flex flex-wrap gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active === tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                'px-5 py-2 min-h-[44px] rounded-none text-sm font-semibold border transition-colors duration-150',
                active === tab.key
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-surface-white text-ink-body border-border-light hover:border-silver-material',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Document rows ─────────────────────────────────────── */}
        {/* key={active} remounts the list so each tab switch replays the stagger */}
        <motion.ul
          key={active}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="divide-y divide-border-light border border-border-light bg-surface-white"
        >
          {visible.map((doc) => (
            <motion.li key={doc.id} variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 bg-surface-cream flex items-center justify-center shrink-0">
                  <FileText size={24} className="text-brand-red" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  {/* dir="auto" keeps Latin model codes (W 632, CW-50) reading LTR inside Arabic rows */}
                  <p dir="auto" className="font-semibold text-ink-heading">{doc.title[language]}</p>
                  <p className="text-sm text-ink-muted">{categories[doc.category][language]}</p>
                </div>
              </div>

              <span className="self-start sm:self-center px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted bg-surface-cream border border-border-light">
                {l('Available on request', 'متاح عند الطلب')}
              </span>

              <a
                href={requestHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-brand-red hover:underline underline-offset-4"
              >
                {l('Request via WhatsApp', 'اطلب عبر واتساب')}
                {/* Arrow rotates 180° in RTL — points toward the reading-end edge */}
                <ArrowForward size={16} aria-hidden="true" />
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
