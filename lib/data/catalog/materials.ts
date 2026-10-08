/**
 * lib/data/catalog/materials.ts
 * Pitch copy reused from materialContent.ts hero subtitles (spelling normalised to "aluminum").
 */

import type { Material, MaterialId } from './types';

export const MATERIALS: Record<MaterialId, Material> = {
  upvc: {
    id: 'upvc',
    name: { en: 'uPVC', ar: 'يو بي في سي' },
    pitch: {
      en: 'German-engineered profiles delivering thermal comfort, acoustic silence, and lasting beauty for UAE residences.',
      ar: 'قطاعات ذات هندسة ألمانية توفر الراحة الحرارية والصمت الصوتي والجمال الدائم للمساكن الإماراتية.',
    },
    heroImage: null,
  },
  aluminum: {
    id: 'aluminum',
    name: { en: 'Aluminum', ar: 'ألمنيوم' },
    pitch: {
      en: 'Structural-grade aluminum systems engineered for commercial scale, architectural ambition, and UAE climate resilience.',
      ar: 'أنظمة ألومنيوم بدرجة هيكلية مهندسة للحجم التجاري والطموح المعماري والصمود أمام مناخ الإمارات.',
    },
    heroImage: null,
  },
};

// Fixed display order — upvc first, matching the existing nav and landing pages
export const MATERIAL_IDS: MaterialId[] = ['upvc', 'aluminum'];
