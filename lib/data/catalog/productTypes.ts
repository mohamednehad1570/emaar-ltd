/**
 * lib/data/catalog/productTypes.ts
 * The 22 shared product types, in nav order: windows → doors → facades → specialty.
 * Split per group under ./productTypes/ to respect the 150-line file limit.
 */

import type { ProductType } from './types';
import { WINDOW_TYPES } from './productTypes/windows';
import { SLIDING_DOOR_TYPES } from './productTypes/doorsSliding';
import { HINGED_DOOR_TYPES } from './productTypes/doorsHinged';
import { FACADE_TYPES } from './productTypes/facades';
import { SPECIALTY_TYPES } from './productTypes/specialty';

export const PRODUCT_TYPES: ProductType[] = [
  ...WINDOW_TYPES,
  ...SLIDING_DOOR_TYPES,
  ...HINGED_DOOR_TYPES,
  ...FACADE_TYPES,
  ...SPECIALTY_TYPES,
];
