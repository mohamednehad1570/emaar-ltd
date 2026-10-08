/**
 * lib/data/catalog/designs.ts
 *
 * PLACEHOLDER DATA — replace before launch.
 * Generated "Design 01"-style stand-ins (10 per subtype) so the Designs UI can be
 * built; nothing here is from the catalog. Every record carries `placeholder: true`.
 * AR copy machine-translated — needs native review.
 */

import type { DesignOption, Localized, MaterialId } from './types';

// Subtype order per material is the display order of the Designs tabs
const SUBTYPES: Record<MaterialId, { key: string; label: Localized }[]> = {
  upvc: [
    { key: 'doors', label: { en: 'Doors', ar: 'أبواب' } },
    { key: 'windows', label: { en: 'Windows', ar: 'نوافذ' } },
  ],
  aluminum: [
    { key: 'doors', label: { en: 'Doors', ar: 'أبواب' } },
    { key: 'windows', label: { en: 'Windows', ar: 'نوافذ' } },
    { key: 'pergola', label: { en: 'Pergola', ar: 'برجولة' } },
    { key: 'handrails', label: { en: 'Handrails', ar: 'درابزين' } },
    { key: 'security', label: { en: 'Security', ar: 'حماية' } },
  ],
};

// Cycled across the 10 designs so each subtype shows a spread of finishes
const COLOURS: Localized[] = [
  { en: 'White', ar: 'أبيض' },
  { en: 'Anthracite', ar: 'أنثراسايت' },
  { en: 'Golden Oak', ar: 'بلوط ذهبي' },
  { en: 'Black', ar: 'أسود' },
  { en: 'Bronze', ar: 'برونزي' },
];

const PER_SUBTYPE = 10;

function build(material: MaterialId): DesignOption[] {
  return SUBTYPES[material].flatMap(({ key, label }) =>
    Array.from({ length: PER_SUBTYPE }, (_, i) => {
      const n = String(i + 1).padStart(2, '0');
      return {
        id: `${material}-${key}-${n}`,
        material,
        subtype: label,
        name: { en: `Design ${n}`, ar: `تصميم ${n}` },
        colour: COLOURS[i % COLOURS.length],
        image: null,
        placeholder: true as const,
      };
    }),
  );
}

export const DESIGNS: DesignOption[] = [...build('upvc'), ...build('aluminum')];
