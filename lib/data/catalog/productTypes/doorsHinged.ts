/**
 * lib/data/catalog/productTypes/doorsHinged.ts
 * Hinged / swing door types. Frameless-doors description reused from the former materialContent.ts;
 * the rest is new copy from catalog notes.
 * AR copy machine-translated — needs native review.
 */

import type { ProductType } from '../types';
import {
  UPVC_CASEMENT_SYSTEMS, UPVC_CASEMENT_GLASS, ALU_HINGED_SYSTEMS, ALU_HINGED_GLASS, SOUND_THERMAL,
} from './shared';

export const HINGED_DOOR_TYPES: ProductType[] = [
  {
    slug: 'standard-doors', group: 'doors', mechanism: 'hinged-door',
    name: { en: 'Standard Doors', ar: 'أبواب قياسية' },
    description: {
      en: 'Single-sash hinged doors built on multi-chamber uPVC profiles for sound and thermal insulation.',
      ar: 'أبواب مفصلية أحادية الضلفة مبنية على قطاعات uPVC متعددة الحجرات للعزل الصوتي والحراري.',
    },
    bestFor: [SOUND_THERMAL],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Single sash', ar: 'ضلفة واحدة' }],
      profileSystemIds: UPVC_CASEMENT_SYSTEMS, glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
  {
    slug: 'hinged-doors', group: 'doors', mechanism: 'hinged-door',
    name: { en: 'Hinged Doors', ar: 'أبواب مفصلية' },
    description: {
      en: 'Aluminum hinged doors built on thermal-break and 45 mm hinged profile systems.',
      ar: 'أبواب ألمنيوم مفصلية مبنية على أنظمة قطاعات بعازل حراري وقطاعات مفصلية 45 مم.',
    },
    bestFor: [],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'aluminum', configurations: [],
      profileSystemIds: ALU_HINGED_SYSTEMS, glassRangeMm: ALU_HINGED_GLASS,
    }],
  },
  {
    slug: 'swing-doors', group: 'doors', mechanism: 'hinged-door',
    name: { en: 'Swing Doors', ar: 'أبواب متأرجحة' },
    description: {
      en: 'Aluminum doors that swing in either direction, available as single or double leaf.',
      ar: 'أبواب ألمنيوم تتأرجح في الاتجاهين، متوفرة بضلفة واحدة أو ضلفتين.',
    },
    bestFor: [],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'aluminum',
      configurations: [{ en: 'Single swing', ar: 'تأرجح مفرد' }, { en: 'Double swing', ar: 'تأرجح مزدوج' }],
      profileSystemIds: ALU_HINGED_SYSTEMS, glassRangeMm: ALU_HINGED_GLASS,
    }],
  },
  {
    slug: 'arched-doors', group: 'doors', mechanism: 'hinged-door', tier: 'special',
    name: { en: 'Arched Doors', ar: 'أبواب مقوّسة' },
    description: {
      en: 'A single-sash door crowned with a fixed arched top, suited to traditional and luxury villa entrances.',
      ar: 'باب أحادي الضلفة يعلوه قوس ثابت، مناسب لمداخل الفلل التقليدية والفاخرة.',
    },
    bestFor: [
      { en: 'Villa entrances', ar: 'مداخل الفلل' },
      { en: 'Traditional and luxury designs', ar: 'التصاميم التقليدية والفاخرة' },
    ],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Single sash + fixed arch top', ar: 'ضلفة واحدة + قوس علوي ثابت' }],
      profileSystemIds: ['w632', 'w640', 'w750'], glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
  {
    slug: 'frameless-doors', group: 'doors', mechanism: 'unspecified', placeholder: true,
    name: { en: 'Frameless Doors', ar: 'أبواب بلا إطار' },
    // Reused site copy — the catalog has no description; figures not in the catalog were removed
    description: {
      en: 'Frameless glass door systems create the illusion of a glass wall that opens. Suspended on concealed stainless-steel tracks with floor-spring pivots, toughened glass panels can swing, slide, or fold across wide openings — with no visible frame to interrupt the view.',
      ar: 'تخلق أنظمة الأبواب الزجاجية بلا إطار وهم جدار زجاجي يفتح. معلقة على مسارات فولاذية مخفية مع محاور نابض أرضية، يمكن لألواح الزجاج المقسّى أن تتأرجح أو تنزلق أو تطوى عبر فتحات واسعة.',
    },
    bestFor: [],
    heroImage: null, hotspots: [],
    availability: [{ material: 'aluminum', configurations: [], profileSystemIds: [] }],
  },
];
