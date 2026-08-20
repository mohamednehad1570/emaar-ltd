'use client';

/**
 * components/products/WarrantyStrip.tsx
 *
 * Horizontal warranty summary strip rendered below product listings when
 * siteSettings.showWarrantyBadge is true. Hides entirely when false — no DOM
 * footprint — so the client can flip it without a redeploy.
 *
 * Design rules:
 *   • bg-surface-cream (#ECEAE4) — sits between sections without full contrast break
 *   • ShieldCheck icon from Phosphor only — no custom SVG
 *   • Pipe-separated warranty points on one line (wraps gracefully on mobile)
 *   • Collapsible terms use CaretDown — single disclosure, no accordion nesting
 */

import React, { useState } from 'react';
import { ShieldCheck, CaretDown } from '@phosphor-icons/react';
import { cn } from '@/lib/cn';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface WarrantyData {
  upvcYears:        number;
  glassYears:       number;
  accessoriesYears: number;
  maintenanceYears: number;
  governingLaw:     { en: string; ar: string };
  exclusions:       { en: string; ar: string };
  footnote:         { en: string; ar: string };
}

interface Props {
  showWarrantyBadge: boolean;
  warrantyData?:     WarrantyData;
  isRTL:             boolean;
  language:          'en' | 'ar';
}

// ── Static labels ─────────────────────────────────────────────────────────────

const labels = {
  upvc:         { en: (y: number) => `${y}-Year uPVC`,         ar: (y: number) => `${y} سنة uPVC`             },
  glass:        { en: (y: number) => `${y}-Year Glass`,        ar: (y: number) => `${y} سنة زجاج`             },
  accessories:  { en: (y: number) => `${y}-Year Accessories`,  ar: (y: number) => `${y} سنة ملحقات`           },
  maintenance:  { en: (y: number) => `${y}-Year Maintenance`,  ar: (y: number) => `${y} سنة صيانة`            },
  seeTerms:     { en: 'See warranty terms',                    ar: 'اطلع على شروط الضمان'                    },
  governing:    { en: 'Governing law:',                        ar: 'القانون الحاكم:'                          },
  exclusions:   { en: 'Exclusions:',                           ar: 'الاستثناءات:'                             },
  footnote:     { en: 'Note:',                                 ar: 'ملاحظة:'                                  },
}

// ── Default data — rendered when CMS returns nothing ─────────────────────────

const DEFAULT: WarrantyData = {
  upvcYears: 25, glassYears: 10, accessoriesYears: 1, maintenanceYears: 1,
  governingLaw: { en: 'UAE Law', ar: 'القانون الإماراتي' },
  exclusions:   { en: 'Fly-screens and roller shutters are not covered', ar: 'لا يشمل الضمان شبكات الذباب والستائر الدوارة' },
  footnote:     { en: 'Warranty is subject to standard terms and conditions', ar: 'الضمان خاضع للشروط والأحكام القياسية' },
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function WarrantyStrip({ showWarrantyBadge, warrantyData, isRTL, language }: Props) {
  const [termsOpen, setTermsOpen] = useState(false);

  // Bail out entirely — no empty strip, no placeholder
  if (!showWarrantyBadge) return null;

  const d = warrantyData ?? DEFAULT;
  const lg = language;

  const points = [
    labels.upvc[lg](d.upvcYears),
    labels.glass[lg](d.glassYears),
    labels.accessories[lg](d.accessoriesYears),
    labels.maintenance[lg](d.maintenanceYears),
  ];

  return (
    <div className={cn('bg-cream border-y border-border-light py-5 px-4 md:px-8', isRTL ? 'dir-rtl' : '')} dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ── Main row ────────────────────────────────────────────────────── */}
      <div className={cn('flex items-start gap-4 flex-wrap', isRTL ? 'flex-row-reverse' : '')}>
        <ShieldCheck size={22} className="text-brand-red mt-0.5 shrink-0" weight="fill" aria-hidden="true" />

        {/* Pipe-separated warranty points — dir=ltr forces consistent pipe layout in RTL context */}
        <div className="flex flex-wrap gap-x-3 gap-y-1" dir="ltr">
          {points.map((point, i) => (
            <React.Fragment key={point}>
              <span className="text-sm font-semibold text-ink-heading">{point}</span>
              {/* Separator pipe between items only */}
              {i < points.length - 1 && <span className="text-ink-muted select-none" aria-hidden="true">|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* ── Toggle for collapsible terms ─────────────────────────────── */}
        <button
          onClick={() => setTermsOpen((o) => !o)}
          className={cn('flex items-center gap-1 text-xs text-ink-muted hover:text-ink-body transition-colors ml-auto', isRTL ? 'flex-row-reverse mr-auto ml-0' : '')}
          aria-expanded={termsOpen}
        >
          {labels.seeTerms[language]}
          {/* 0.3s rotation — custom ease for premium deceleration */}
          <CaretDown
            size={14}
            className={cn('transition-transform duration-300', termsOpen ? 'rotate-180' : '')}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* ── Collapsible terms ────────────────────────────────────────────── */}
      {termsOpen && (
        <div className={cn('mt-4 pt-4 border-t border-border-light space-y-2 text-xs text-ink-body leading-relaxed', isRTL ? 'text-right' : 'text-left')}>
          <p>
            <span className="font-semibold">{labels.governing[language]}</span>{' '}
            {d.governingLaw[language]}
          </p>
          <p>
            <span className="font-semibold">{labels.exclusions[language]}</span>{' '}
            {d.exclusions[language]}
          </p>
          <p className="text-ink-muted">
            <span className="font-semibold">{labels.footnote[language]}</span>{' '}
            {d.footnote[language]}
          </p>
        </div>
      )}

    </div>
  );
}
