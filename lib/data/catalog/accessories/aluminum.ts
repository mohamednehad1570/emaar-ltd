/**
 * lib/data/catalog/accessories/aluminum.ts
 * Aluminum-only hardware plus the flyscreens shared by both materials (catalog pp.174–178).
 * AR copy machine-translated — needs native review.
 */

import type { AccessoryItem } from '../types';
import { WHITE, BLACK, SILVER } from './colours';

export const ALUMINUM_ACCESSORIES: AccessoryItem[] = [
  { id: 'stac-sliding-lock', kind: 'sliding-lock', materials: ['aluminum'], brandId: 'stac',
    name: { en: 'Sliding lock', ar: 'قفل منزلق' }, code: '32000', colours: [WHITE, BLACK, SILVER], image: null },
  { id: 'stac-side-arm', kind: 'side-arm', materials: ['aluminum'], brandId: 'stac',
    name: { en: 'Side arm', ar: 'ذراع جانبي' },
    spec: '16″, 18″, 20″, 24″, 26″, 28″ — stainless steel', colours: [], image: null },
  { id: 'stac-heavy-duty-hinge', kind: 'hinge', materials: ['aluminum'], brandId: 'stac',
    name: { en: 'Heavy-duty hinge', ar: 'مفصلة للأحمال الثقيلة' }, code: '010C2',
    colours: [BLACK, WHITE], image: null },
];

export const SHARED_ACCESSORIES: AccessoryItem[] = [
  { id: 'roll-up-flyscreen', kind: 'flyscreen', materials: ['upvc', 'aluminum'],
    name: { en: 'Roll-up flyscreen', ar: 'شبك حشرات قابل للّف' },
    note: { en: 'Best for windows', ar: 'الأنسب للنوافذ' }, colours: [], image: null },
  { id: 'rolli-pleated-flyscreen', kind: 'flyscreen', materials: ['upvc', 'aluminum'], brandId: 'rolli',
    name: { en: 'Pleated flyscreen', ar: 'شبك حشرات مطوي' },
    note: {
      en: 'Best for doors and wide openings; AA6063 frame, PVC-coated polyester mesh',
      ar: 'الأنسب للأبواب والفتحات العريضة؛ إطار AA6063 وشبك بوليستر مغطى بـ PVC',
    },
    colours: [], image: null },
];
