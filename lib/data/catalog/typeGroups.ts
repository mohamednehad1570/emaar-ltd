/** lib/data/catalog/typeGroups.ts — display order + labels for the four product-type groups. */

import type { Localized, TypeGroup } from './types';

export const TYPE_GROUPS: { id: TypeGroup; label: Localized }[] = [
  { id: 'windows',   label: { en: 'Windows',   ar: 'النوافذ' } },
  { id: 'doors',     label: { en: 'Doors',     ar: 'الأبواب' } },
  { id: 'facades',   label: { en: 'Facades',   ar: 'الواجهات' } },
  { id: 'specialty', label: { en: 'Specialty', ar: 'منتجات متخصصة' } },
];
