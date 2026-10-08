/**
 * lib/data/catalog/materials.ts
 * Pitch copy reused from the former materialContent.ts hero subtitles (spelling normalised to "aluminum").
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
    // Catalog p.41 — doors use `door`, every other type group uses `window`
    sizeLimits: {
      window: { widthMm: [400, 1400], heightMm: [400, 2200] },
      door: { widthMm: [400, 1000], heightMm: [400, 2200] },
      note: {
        en: 'Glass weight 30–50 kg/m² affects max sash area',
        // \u2066…\u2069 (LRI/PDI) isolate the range so RTL bidi never renders it as "50–30"
        ar: 'وزن الزجاج \u206630–50\u2069 كغ/م² يؤثر على أقصى مساحة للضلفة',
      },
    },
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
