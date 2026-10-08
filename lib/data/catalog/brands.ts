/** lib/data/catalog/brands.ts — hardware brands as printed in the catalog (pp.174–178). */

import type { Brand } from './types';

export const BRANDS: Brand[] = [
  { id: 'domus',     name: 'Domus',      origin: { en: 'Greece',    ar: 'اليونان' } },
  { id: 'giesse',    name: 'Giesse',     origin: { en: 'Italy',     ar: 'إيطاليا' } },
  { id: 'kale',      name: 'Kale Kilit', origin: { en: 'Turkey',    ar: 'تركيا' } },
  { id: 'roto',      name: 'Roto',       origin: { en: 'Germany',   ar: 'ألمانيا' } },
  { id: 'schuring',  name: 'Schüring',   origin: { en: 'Germany',   ar: 'ألمانيا' } },
  { id: 'stac',      name: 'STAC',       origin: { en: 'Spain',     ar: 'إسبانيا' } },
  // Origin kept exactly as the catalog prints it, even though dormakaba is Swiss-German
  { id: 'dormakaba', name: 'dormakaba',  origin: { en: 'Australia', ar: 'أستراليا' } },
  { id: 'rolli',     name: 'ROLLi',      origin: { en: 'Italy',     ar: 'إيطاليا' } },
  { id: 'top',       name: 'TOP',        origin: { en: 'Italy',     ar: 'إيطاليا' } },
];
