/**
 * lib/data/catalog/mechanisms.ts
 * "How it opens" copy per mechanism — 'unspecified' is deliberately absent so the
 * type page hides the block instead of guessing — plus the pictogram variants' opening names.
 * Every label is unique per language (validate-catalog checks it).
 * AR machine-translated — needs native review.
 */

import type { Mechanism, MechanismCopy, PictogramVariant, PictogramVariantCopy } from './types';

export const MECHANISM_COPY: Record<Exclude<Mechanism, 'unspecified'>, MechanismCopy> = {
  sliding: {
    label: { en: 'Sliding', ar: 'منزلق' },
    how: {
      en: 'Sashes glide sideways along a track — nothing swings into the room.',
      ar: 'تنزلق الضلف جانبياً على مسار دون أن يتأرجح شيء داخل الغرفة.',
    },
  },
  casement: {
    // Interim AR (machine-translated): "hinged window" — plain مفصلي collided with hinged-door
    label: { en: 'Casement', ar: 'نافذة مفصلية' },
    // Short label for eyebrow — avoids "نوافذ · نافذة مفصلية" being redundant
    shortLabel: { en: 'Casement', ar: 'مفصلي' },
    how: {
      en: 'The sash swings on side hinges and seals tight when closed.',
      ar: 'تدور الضلفة على مفصلات جانبية وتُحكم الإغلاق عند غلقها.',
    },
  },
  'hinged-door': {
    // Interim AR (machine-translated): "hinged door"
    label: { en: 'Hinged', ar: 'باب مفصلي' },
    // Short label for eyebrow — avoids "أبواب · باب مفصلي" being redundant
    shortLabel: { en: 'Hinged', ar: 'مفصلي' },
    how: {
      en: 'The door leaf swings open on side hinges, like a classic door.',
      ar: 'يُفتح جناح الباب على مفصلات جانبية كالباب التقليدي.',
    },
  },
  folding: {
    label: { en: 'Folding', ar: 'قابل للطي' },
    shortLabel: { en: 'Folding', ar: 'طي' },
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

// Host mechanism = the only mechanism the variant may refine (validator-enforced).
// AR copy is machine-translated — needs native review.
export const PICTOGRAM_VARIANTS: Record<PictogramVariant, PictogramVariantCopy> = {
  'top-hung': {
    mechanism: 'casement',
    label: { en: 'Top-hung', ar: 'علوي التعليق' },
    shortLabel: { en: 'Top-hung', ar: 'علوي' },
    // Replaces casement's "side or top" how — top-hung uses top-edge hinges only.
    // Previous casement text was false here: no side hinges on a top-hung sash.
    how: {
      en: 'The sash pivots open at the top, tilting inward at the bottom for ventilation.',
      ar: 'تنفتح الضلفة محوريًّا من أعلاها، مائلةً للداخل من الأسفل لتهوية المكان.',
    },
  },
  'tilt-turn': {
    mechanism: 'casement',
    label: { en: 'Tilt & turn', ar: 'قلاب ودوار' },
    shortLabel: { en: 'Tilt & turn', ar: 'قلاب' },
    // Replaces casement's generic text — tilt-turn has two opening modes.
    how: {
      en: 'One handle position tilts the top inward for ventilation; another rotates it fully open on side hinges.',
      ar: 'وضع واحد يُمِيل الأعلى للداخل للتهوية، ووضع آخر يُدِير الضلفة بالكامل على مفصلات جانبية.',
    },
  },
  'lift-slide': {
    mechanism: 'sliding',
    label: { en: 'Lift & slide', ar: 'رفع وإزاحة' },
    // Extends sliding text — describes the lift-off step the generic text misses.
    how: {
      en: 'The sash lifts slightly off its threshold seal, then glides smoothly along the track.',
      ar: 'تُرفع الضلفة قليلاً عن عتبة الإغلاق، ثم تنزلق بسلاسة على المسار.',
    },
  },
  'tilt-slide': {
    mechanism: 'sliding',
    label: { en: 'Tilt & slide', ar: 'قلاب منزلق' },
    // Extends sliding text — describes both the tilt-for-ventilation and the slide-open modes.
    how: {
      en: 'The sash tilts inward at the bottom for ventilation, or lifts clear of its threshold to slide fully open.',
      ar: 'تميل الضلفة للداخل من الأسفل للتهوية، أو تُرفع عن العتبة لتنزلق وتفتح بالكامل.',
    },
  },
};
