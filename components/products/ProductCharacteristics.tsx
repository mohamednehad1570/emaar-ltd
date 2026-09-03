'use client';
// Product Characteristics section — specTags + populated spec fields as flat chips

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Container from '@/components/layout/Container';
import type { SanityProductFull } from '@/lib/sanity/types';

// Bilingual display names for Sanity specTags[] values — kept in sync with SPEC_TAGS in product.ts schema
const SPEC_TAG_LABELS: Record<string, { en: string; ar: string }> = {
  'double-glazed':      { en: 'Double Glazed',      ar: 'زجاج مزدوج'                  },
  'triple-glazed':      { en: 'Triple Glazed',       ar: 'زجاج ثلاثي'                 },
  'thermal-insulated':  { en: 'Thermal Insulated',   ar: 'عازل حراري'                 },
  'acoustic-insulated': { en: 'Acoustic Insulated',  ar: 'عازل صوتي'                  },
  'uv-resistant':       { en: 'UV Resistant',        ar: 'مقاوم للأشعة فوق البنفسجية' },
};

interface Props { product: SanityProductFull }

export default function ProductCharacteristics({ product }: Props) {
  const { language, isRTL } = useLanguage();

  // Build spec field chips — each entry is [bilingual label, value|undefined]
  // type predicate in .filter() narrows the undefined away for the .map()
  const specFields: Array<[string, string | undefined]> = [
    [language === 'en' ? 'Dimensions'      : 'الأبعاد',          product.specs?.dimensions    ],
    [language === 'en' ? 'Thermal Value'   : 'القيمة الحرارية', product.specs?.thermalValue  ],
    [language === 'en' ? 'Acoustic Rating' : 'التقييم الصوتي',  product.specs?.acousticRating],
    [language === 'en' ? 'Glass Thickness' : 'سماكة الزجاج',   product.specs?.glassThickness],
  ];
  const specChips = specFields
    .filter((pair): pair is [string, string] => typeof pair[1] === 'string' && pair[1].length > 0)
    .map(([label, value]) => ({ label, value }));

  const specTags = product.specTags ?? [];
  // Nothing to render — skip the section entirely rather than showing an empty container
  if (!specTags.length && !specChips.length) return null;

  return (
    <section
      className="bg-off-white py-14 border-t border-border-light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Container>
        {/* Section eyebrow — brand label scale: 11px, uppercase, tight tracking, red */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-6">
          {language === 'en' ? 'Product Characteristics' : 'مواصفات المنتج'}
        </p>

        {/* Chip row — flex-wrap allows chips to reflow naturally on narrow viewports */}
        <div className="flex flex-wrap gap-3">
          {/* specTag chips — non-clickable, straight from Sanity specTags[] */}
          {specTags.map((tag) => (
            <span
              key={tag}
              className="border border-border-light bg-white text-sm text-ink-body px-4 py-2"
              // rounded-none is the default (radius: 0) per brand rule — no explicit class needed
            >
              {SPEC_TAG_LABELS[tag]?.[language] ?? tag}
            </span>
          ))}
          {/* Spec field chips — "Label: Value" format per task specification */}
          {specChips.map(({ label, value }) => (
            <span
              key={label}
              className="border border-border-light bg-white text-sm text-ink-body px-4 py-2"
            >
              {label}: {value}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
