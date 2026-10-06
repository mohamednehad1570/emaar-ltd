/**
 * lib/data/awards.ts
 * Static awards list — replaces the old CMS `award` document type.
 * Gold styling is allowed for these entries (awards/certifications only).
 */

import type { Award } from '@/lib/types';

export const AWARDS: Award[] = [
  {
    id: 'sharjah-excellence-2022',
    name: { en: 'Sharjah Excellence Award', ar: 'جائزة الشارقة للتميز' },
    issuedBy: {
      en: 'Sharjah Chamber of Commerce & Industry',
      ar: 'غرفة تجارة وصناعة الشارقة',
    },
    year: 2022,
  },
  {
    id: 'saif-zone-sea-emarati-2012',
    name: {
      en: 'SAIF Zone Excellence Award (SEA Emarati)',
      ar: 'جائزة المنطقة الحرة لمطار الشارقة للتميز (SEA إماراتي)',
    },
    issuedBy: { en: 'SAIF Zone', ar: 'المنطقة الحرة لمطار الشارقة الدولي' },
    year: 2012,
    description: {
      en: 'Recognition for boosting home-grown entrepreneurial capabilities.',
      ar: 'تقديرًا لتعزيز القدرات الريادية الوطنية.',
    },
  },
];
