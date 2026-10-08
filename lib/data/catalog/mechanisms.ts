/**
 * lib/data/catalog/mechanisms.ts
 * "How it opens" copy per mechanism — 'unspecified' is deliberately absent so the
 * type page hides the block instead of guessing. AR machine-translated — needs native review.
 */

import type { Mechanism, MechanismCopy } from './types';

export const MECHANISM_COPY: Record<Exclude<Mechanism, 'unspecified'>, MechanismCopy> = {
  sliding: {
    label: { en: 'Sliding', ar: 'منزلق' },
    how: {
      en: 'Sashes glide sideways along a track — nothing swings into the room.',
      ar: 'تنزلق الضلف جانبياً على مسار دون أن يتأرجح شيء داخل الغرفة.',
    },
  },
  casement: {
    label: { en: 'Casement', ar: 'مفصلي' },
    how: {
      en: 'The sash swings on hinges at its side or top and seals tight when closed.',
      ar: 'تدور الضلفة على مفصلات جانبية أو علوية وتُحكم الإغلاق عند غلقها.',
    },
  },
  'hinged-door': {
    label: { en: 'Hinged', ar: 'مفصلي' },
    how: {
      en: 'The door leaf swings open on side hinges, like a classic door.',
      ar: 'يُفتح جناح الباب على مفصلات جانبية كالباب التقليدي.',
    },
  },
  folding: {
    label: { en: 'Folding', ar: 'قابل للطي' },
    how: {
      en: 'Panels fold and stack to one side to open up the full width.',
      ar: 'تنطوي الألواح وتتراص إلى جانب واحد لفتح العرض بالكامل.',
    },
  },
  fixed: {
    label: { en: 'Fixed', ar: 'ثابت' },
    how: {
      en: 'Non-opening glazing that frames the view and seals the building envelope.',
      ar: 'زجاج غير قابل للفتح يؤطّر الإطلالة ويُحكم غلاف المبنى.',
    },
  },
};
