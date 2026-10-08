/**
 * lib/data/catalog/productTypes/windows.ts
 * All copy written new from catalog notes (no matching materialContent.ts category).
 * AR copy machine-translated — needs native review.
 */

import type { ProductType } from '../types';
import {
  UPVC_CASEMENT_SYSTEMS, UPVC_CASEMENT_GLASS,
  SOUND_THERMAL, VILLAS, OFFICES, KITCHENS, BATHROOMS,
} from './shared';

export const WINDOW_TYPES: ProductType[] = [
  {
    slug: 'sliding-windows', group: 'windows', mechanism: 'sliding',
    name: { en: 'Sliding Windows', ar: 'نوافذ منزلقة' },
    description: {
      en: 'Sliding windows open along a track without swinging into the room, saving interior space. A fly mesh option is available.',
      ar: 'تُفتح النوافذ المنزلقة على مسار دون أن تتأرجح داخل الغرفة، مما يوفر المساحة الداخلية. يتوفر خيار شبك الحشرات.',
    },
    bestFor: [{ en: 'Apartments', ar: 'الشقق' }, VILLAS, OFFICES],
    heroImage: null, hotspots: [],
    availability: [
      {
        material: 'upvc',
        configurations: [
          { en: '2 Track 2 Panel', ar: 'مساران ولوحان' },
          { en: '2 Track 3 Panel', ar: 'مساران و3 ألواح' },
          { en: '2 Track 4 Panel', ar: 'مساران و4 ألواح' },
        ],
        profileSystemIds: ['w242'], glassRangeMm: [4, 20],
      },
      {
        material: 'aluminum',
        configurations: [{ en: '3-Track', ar: '3 مسارات' }, { en: '4-Track', ar: '4 مسارات' }],
        profileSystemIds: ['sliding-105', 'montana-120'], glassRangeMm: [6, 24],
      },
    ],
  },
  {
    slug: 'single-sash-windows', group: 'windows', mechanism: 'casement',
    name: { en: 'Single Sash Windows', ar: 'نوافذ أحادية الضلفة' },
    description: {
      en: 'A single opening sash available side-hung, top-hung or tilt & turn, suited to rooms of every size.',
      ar: 'ضلفة فتح واحدة متوفرة بتعليق جانبي أو علوي أو بنظام القلاب والدوار، مناسبة للغرف بجميع أحجامها.',
    },
    bestFor: [{ en: 'Bedrooms', ar: 'غرف النوم' }, KITCHENS, BATHROOMS, OFFICES, VILLAS],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [
        { en: 'Side-hung', ar: 'تعليق جانبي' },
        { en: 'Top-hung', ar: 'تعليق علوي' },
        { en: 'Tilt & Turn', ar: 'قلاب ودوار' },
      ],
      profileSystemIds: UPVC_CASEMENT_SYSTEMS, glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
  {
    slug: 'hinged-windows', group: 'windows', mechanism: 'casement',
    name: { en: 'Hinged Windows', ar: 'نوافذ مفصلية' },
    description: {
      en: 'Fixed or outward side-hung windows that seal tightly against the frame for sound and thermal insulation.',
      ar: 'نوافذ ثابتة أو بتعليق جانبي نحو الخارج تُحكم الإغلاق على الإطار لتوفير العزل الصوتي والحراري.',
    },
    bestFor: [SOUND_THERMAL],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Fixed', ar: 'ثابتة' }, { en: 'Side-hung (outward)', ar: 'تعليق جانبي (نحو الخارج)' }],
      profileSystemIds: UPVC_CASEMENT_SYSTEMS, glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
  {
    slug: 'top-hung-windows', group: 'windows', mechanism: 'casement',
    name: { en: 'Top-Hung Windows', ar: 'نوافذ علوية التعليق' },
    description: {
      en: 'Hinged at the top on friction hinges, the sash opens outward from the bottom for ventilation.',
      ar: 'تُعلَّق الضلفة من الأعلى بمفصلات احتكاك وتُفتح نحو الخارج من الأسفل لتوفير التهوية.',
    },
    bestFor: [BATHROOMS, KITCHENS, { en: 'Ventilation', ar: 'التهوية' }],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Top-hung (friction hinges)', ar: 'تعليق علوي (مفصلات احتكاك)' }],
      profileSystemIds: UPVC_CASEMENT_SYSTEMS, glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
  {
    slug: 'tilt-and-slide-windows', group: 'windows', mechanism: 'sliding',
    name: { en: 'Tilt & Slide Windows', ar: 'نوافذ قلابة منزلقة' },
    description: {
      en: 'A two-sash window with one fixed sash: the moving sash tilts for ventilation or slides open fully.',
      ar: 'نافذة بضلفتين إحداهما ثابتة: تميل الضلفة المتحركة للتهوية أو تنزلق لفتح كامل.',
    },
    bestFor: [{ en: 'Wide openings', ar: 'الفتحات العريضة' }, { en: 'Low sills', ar: 'العتبات المنخفضة' }],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [
        { en: 'Tilt position', ar: 'وضع القلب' },
        { en: 'Slide position (2-sash, one fixed)', ar: 'وضع الانزلاق (ضلفتان، واحدة ثابتة)' },
      ],
      profileSystemIds: [],
    }],
  },
  {
    slug: 'tilt-and-turn-windows', group: 'windows', mechanism: 'casement',
    name: { en: 'Tilt & Turn Windows', ar: 'نوافذ قلابة ودوارة' },
    description: {
      en: 'One handle, two functions: tilt the sash inward for ventilation or turn it fully open for cleaning and airflow.',
      ar: 'مقبض واحد ووظيفتان: أمِل الضلفة للداخل للتهوية أو أدِرها لفتح كامل للتنظيف وتدفق الهواء.',
    },
    bestFor: [{ en: 'Two functions, one handle', ar: 'وظيفتان بمقبض واحد' }],
    heroImage: null, hotspots: [],
    availability: [{
      material: 'upvc',
      configurations: [{ en: 'Tilt position', ar: 'وضع القلب' }, { en: 'Turn position', ar: 'وضع الدوران' }],
      profileSystemIds: UPVC_CASEMENT_SYSTEMS, glassRangeMm: UPVC_CASEMENT_GLASS,
    }],
  },
];
