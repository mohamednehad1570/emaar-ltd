'use client';
// Dark "Discover Other [Material] Products" section — category tile grid on brand-dark bg

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';
import Container from '@/components/layout/Container';

// Canonical category order per material — mirrors CATEGORY_ORDER in ProductMaterialPage.tsx
// Must be kept in sync when taxonomy changes
const CATEGORY_ORDER: Record<'upvc' | 'aluminum' | 'glass', readonly string[]> = {
  upvc:     ['windows','doors','doors-and-windows','staircases','hebeschibe'],
  aluminum: ['windows','doors','doors-and-windows','staircases','skylights','pergola','frameless-doors','security-system','handrails','acp-panels'],
  glass:    ['double-glazing','stained-glass','sandblast','georgian-bar'],
};

const CATEGORY_LABELS: Record<string, { en: string; ar: string }> = {
  windows:             { en: 'Windows',                       ar: 'نوافذ'               },
  doors:               { en: 'Doors',                         ar: 'أبواب'               },
  'doors-and-windows': { en: 'Doors & Windows',               ar: 'أبواب ونوافذ'        },
  staircases:          { en: 'Staircases',                    ar: 'سلالم'               },
  hebeschibe:          { en: 'Hebeschibe',                    ar: 'هيبيشيبه'            },
  skylights:           { en: 'Skylights',                     ar: 'مناور'               },
  pergola:             { en: 'Pergola',                       ar: 'برجولا'              },
  'frameless-doors':   { en: 'Frameless Doors',               ar: 'أبواب بدون إطار'     },
  'security-system':   { en: 'Security System',               ar: 'نظام أمني'           },
  handrails:           { en: 'Handrails',                     ar: 'درابزين'             },
  'acp-panels':        { en: 'ACP Panels',                    ar: 'ألواح ACP'           },
  'double-glazing':    { en: 'Double Glazing',                ar: 'زجاج مزدوج'          },
  'stained-glass':     { en: 'Stained Glass',                 ar: 'زجاج ملون'           },
  sandblast:           { en: 'Sandblast',                     ar: 'سندبلاست'            },
  'georgian-bar':      { en: 'Georgian Bar & Islamic Design', ar: 'تصميم جورجي وإسلامي' },
};

const MATERIAL_LABELS: Record<string, { en: string; ar: string }> = {
  upvc:     { en: 'uPVC',      ar: 'uPVC'      },
  aluminum: { en: 'Aluminium', ar: 'الألومنيوم' },
  glass:    { en: 'Glass',     ar: 'زجاج'       },
};

interface Props {
  material:        'upvc' | 'aluminum' | 'glass'; // controls which category list is used
  currentCategory: string;                         // excluded so we only show OTHER categories
}

export default function ProductDiscoverSection({ material, currentCategory }: Props) {
  const { language, isRTL } = useLanguage();
  // Filter out the current category — this section shows only OTHER categories
  const categories = CATEGORY_ORDER[material].filter((c) => c !== currentCategory);
  if (!categories.length) return null;

  const materialLabel = MATERIAL_LABELS[material]?.[language] ?? material;

  return (
    <section className="bg-brand-dark py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <Container>
        {/* Section eyebrow */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-red mb-3">
          {language === 'en' ? 'Explore More' : 'اكتشف المزيد'}
        </p>
        {/* Section heading — white text on dark bg */}
        <h2 className="font-cairo font-bold text-white text-2xl md:text-3xl mb-10">
          {language === 'en'
            ? `Discover other ${materialLabel} products`
            : `اكتشف منتجات ${materialLabel} الأخرى`}
        </h2>

        {/* 4-column grid on lg+; 2-col on sm; 1-col on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((slug) => {
            const label = CATEGORY_LABELS[slug]?.[language] ?? slug;
            return (
              <Link
                key={slug}
                href={`/products/${material}/${slug}`}
                aria-label={label}
                className="group relative block h-48 overflow-hidden"
              >
                {/* Tile fill — bg-white/5 separates tile from section bg; /10 on hover */}
                <div className="absolute inset-0 bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300" />
                {/* 2px red accent line — editorial brand signature, reading-start aligned */}
                <div className={cn('absolute bottom-5 h-0.5 w-8 bg-brand-red', isRTL ? 'right-5' : 'left-5')} />
                {/* Category name — sits just above the accent line */}
                <div className={cn('absolute bottom-9 px-5 w-full', isRTL && 'text-right')}>
                  <span className="font-cairo font-bold text-white text-base leading-snug">{label}</span>
                </div>
                {/* Arrow — nudges toward reading direction on hover, rotates 180° in RTL */}
                <ArrowRight className={cn(
                  'absolute top-5 w-5 h-5 text-white/40 transition-transform duration-300',
                  isRTL
                    ? 'left-5 rotate-180 group-hover:-translate-x-1'
                    : 'right-5 group-hover:translate-x-1',
                )} />
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
