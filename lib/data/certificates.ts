/**
 * lib/data/certificates.ts
 * Static certificates list — replaces the Sanity `certificate` document type.
 * No images: `icon` is an iconMap key resolved via resolveIcon() at render time.
 */

import type { Certificate } from '@/lib/types';

export const CERTIFICATES: Certificate[] = [
  {
    id: 'iso-14001',
    name: { en: 'ISO 14001', ar: 'ISO 14001' },
    description: { en: 'Environmental Management', ar: 'نظام الإدارة البيئية' },
    icon: 'Leaf',
  },
  {
    id: 'uae-municipality-civil-defence',
    name: {
      en: 'UAE Municipality & Civil Defence Approval',
      ar: 'اعتماد البلدية والدفاع المدني في الإمارات',
    },
    icon: 'ShieldCheck',
  },
  {
    id: 'german-din',
    name: { en: 'German DIN Standards', ar: 'المعايير الألمانية DIN' },
    icon: 'BadgeCheck',
  },
];
