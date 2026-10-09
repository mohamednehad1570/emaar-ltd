/**
 * lib/data/catalog/productTypes/doorsSliding.ts
 * Sliding / folding door types. Hebeschiebe description reused from the former materialContent.ts
 * (typo "Hebeschibe" corrected); the rest is new copy from catalog notes.
 * AR copy machine-translated — needs native review.
 */

import type { ProductType } from '../types';
import { UPVC_SLIDING_DOOR_CONFIGS, pendingGallery } from './shared';

const BALCONIES = { en: 'Balconies', ar: 'الشرفات' };

export const SLIDING_DOOR_TYPES: ProductType[] = [
  {
    slug: 'sliding-doors', group: 'doors', mechanism: 'sliding',
    name: { en: 'Sliding Doors', ar: 'أبواب منزلقة' },
    description: {
      en: 'Sliding doors glide along a track to open onto balconies and verandas without taking up floor space.',
      ar: 'تنزلق الأبواب على مسار لتفتح على الشرفات والتراسات دون أن تشغل مساحة من الأرضية.',
    },
    bestFor: [BALCONIES, { en: 'Verandas', ar: 'التراسات' }],
    heroImage: null, hotspots: [], gallery: pendingGallery(),
    availability: [
      { material: 'upvc', configurations: UPVC_SLIDING_DOOR_CONFIGS, profileSystemIds: [] },
      {
        material: 'aluminum', configurations: [],
        profileSystemIds: ['sliding-105', 'montana-120'], glassRangeMm: [6, 24],
      },
    ],
  },
  {
    slug: 'large-sliding-doors', group: 'doors', mechanism: 'sliding',
    name: { en: 'Large Sliding Doors', ar: 'أبواب منزلقة كبيرة' },
    description: {
      en: 'Large-format sliding doors for wide, panoramic openings that connect interiors with the view outside.',
      ar: 'أبواب منزلقة كبيرة الحجم للفتحات العريضة والبانورامية التي تصل الداخل بالمنظر الخارجي.',
    },
    bestFor: [{ en: 'Wide panoramic openings', ar: 'الفتحات البانورامية العريضة' }],
    heroImage: null, hotspots: [], gallery: pendingGallery(),
    availability: [
      { material: 'upvc', configurations: UPVC_SLIDING_DOOR_CONFIGS, profileSystemIds: [] },
      { material: 'aluminum', configurations: [], profileSystemIds: ['montana-120'], glassRangeMm: [6, 24] },
    ],
  },
  {
    slug: 'tilt-and-slide-doors', group: 'doors', mechanism: 'sliding', pictogramVariant: 'tilt-slide',
    name: { en: 'Tilt & Slide Doors', ar: 'أبواب قلابة منزلقة' },
    description: {
      en: 'A sliding door paired with a fixed panel; the sliding sash can tilt for ventilation or slide open.',
      ar: 'باب منزلق مع لوح ثابت؛ يمكن للضلفة المنزلقة أن تميل للتهوية أو تنزلق للفتح.',
    },
    bestFor: [],
    heroImage: null, hotspots: [], gallery: pendingGallery(),
    availability: [{
      material: 'upvc',
      configurations: [{ en: '1 sliding + 1 fixed panel', ar: 'لوح منزلق + لوح ثابت' }],
      profileSystemIds: [],
    }],
  },
  {
    slug: 'slide-and-fold-doors', group: 'doors', mechanism: 'folding',
    name: { en: 'Slide & Fold Doors', ar: 'أبواب منزلقة قابلة للطي' },
    description: {
      en: 'Multi-panel bi-fold doors that fold and stack to one side, opening the full width for indoor-outdoor living.',
      ar: 'أبواب قابلة للطي متعددة الألواح تنطوي وتتراص على جانب واحد، لتفتح العرض بالكامل وتربط الداخل بالخارج.',
    },
    bestFor: [{ en: 'Indoor-outdoor living', ar: 'الربط بين الداخل والخارج' }],
    heroImage: null, hotspots: [], gallery: pendingGallery(),
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Multi-panel bi-fold', ar: 'طي ثنائي متعدد الألواح' }],
      profileSystemIds: [],
    }],
  },
  {
    slug: 'hebeschiebe', group: 'doors', mechanism: 'sliding', pictogramVariant: 'lift-slide', tier: 'flagship',
    name: { en: 'Hebeschiebe Lift & Slide', ar: 'هيبشيبه للرفع والإزاحة' },
    description: {
      en: 'The Hebeschiebe lift-and-slide system allows large floor-to-ceiling glass panels to glide effortlessly with a single handle turn. It is the preferred choice for luxury living rooms and terraces where the boundary between inside and outside must disappear entirely.',
      ar: 'يتيح نظام الرفع والإزاحة Hebeschiebe لألواح الزجاج الكبيرة الممتدة من الأرض إلى السقف أن تنزلق بسهولة تامة بدوران مقبض واحد. إنه الخيار المفضل لغرف المعيشة والتراسات الفاخرة حيث يجب أن تختفي الحدود بين الداخل والخارج كلياً.',
    },
    bestFor: [{ en: 'Floor-to-ceiling openings', ar: 'الفتحات من الأرض إلى السقف' }],
    heroImage: null, hotspots: [], gallery: pendingGallery(),
    availability: [{
      material: 'upvc',
      configurations: [
        { en: 'Lift & slide', ar: 'رفع وإزاحة' },
        // Catalog lists the shutter box as an option of the same system, not a separate type
        { en: 'Lift & slide with integrated roller shutter box (optional)', ar: 'رفع وإزاحة مع صندوق شتر مدمج (اختياري)' },
      ],
      profileSystemIds: ['w880'], glassRangeMm: [24, 42],
    }],
  },
];
