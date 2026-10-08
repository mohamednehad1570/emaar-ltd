/** lib/data/catalog/accessories.ts — all hardware; filter by material via selectors, not here. */

import type { AccessoryItem } from './types';
import { UPVC_ACCESSORIES } from './accessories/upvc';
import { ALUMINUM_ACCESSORIES, SHARED_ACCESSORIES } from './accessories/aluminum';

export const ACCESSORIES: AccessoryItem[] = [
  ...UPVC_ACCESSORIES,
  ...ALUMINUM_ACCESSORIES,
  ...SHARED_ACCESSORIES,
];
