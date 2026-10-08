/**
 * lib/data/catalog/productTypes/facades.ts
 * Cladding description reused from the former materialContent.ts (acp-cladding, spelling normalised);
 * curtain-wall copy is new — both existing curtain-wall texts were material-specific.
 * AR copy machine-translated — needs native review.
 */

import type { ProductType } from '../types';

export const FACADE_TYPES: ProductType[] = [
  {
    slug: 'curtain-wall', group: 'facades', mechanism: 'fixed',
    name: { en: 'Curtain Wall', ar: 'جدار ستائري' },
    description: {
      en: 'A non-load-bearing glazed facade hung from the building structure, enclosing towers and commercial buildings in glass.',
      ar: 'واجهة زجاجية غير حاملة للأحمال تُعلَّق على هيكل المبنى، وتكسو الأبراج والمباني التجارية بالزجاج.',
    },
    bestFor: [{ en: 'Towers', ar: 'الأبراج' }, { en: 'Commercial buildings', ar: 'المباني التجارية' }],
    heroImage: null, hotspots: [],
    availability: [
      { material: 'upvc', configurations: [], profileSystemIds: [] },
      {
        material: 'aluminum',
        configurations: [
          { en: 'Conventional', ar: 'تقليدي' },
          { en: 'Two-way capping', ar: 'غطاء باتجاهين' },
          { en: 'Four-way structural', ar: 'إنشائي بأربعة اتجاهات' },
        ],
        profileSystemIds: ['cw-50'], glassRangeMm: [6, 32],
      },
    ],
  },
  {
    slug: 'cladding', group: 'facades', mechanism: 'fixed',
    name: { en: 'Aluminum Cladding (ACP)', ar: 'كسوة ألمنيوم (ACP)' },
    description: {
      en: 'Aluminum composite panels (ACP) are the dominant façade cladding material across UAE commercial and residential towers. Emaar supplies and installs complete ACP cladding systems.',
      ar: 'تُعدّ ألواح الألومنيوم المركبة (ACP) مادة الكسوة السائدة على واجهات الأبراج التجارية والسكنية في الإمارات. تورّد إعمار أنظمة كسوة ACP متكاملة وتتولى تركيبها.',
    },
    bestFor: [],
    heroImage: null, hotspots: [],
    availability: [{ material: 'aluminum', configurations: [], profileSystemIds: [] }],
  },
];
