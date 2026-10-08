/** RAL colour dots exactly as printed on catalog pp.174–178. */

import type { ColourDot } from '../types';

export const WHITE: ColourDot = { name: { en: 'White', ar: 'أبيض' }, ral: '9016' };
export const BROWN: ColourDot = { name: { en: 'Brown', ar: 'بني' }, ral: '8017' };
export const BLACK: ColourDot = { name: { en: 'Black', ar: 'أسود' }, ral: '9005' };
export const IVORY_BEIGE: ColourDot = { name: { en: 'Ivory/Beige', ar: 'عاجي/بيج' }, ral: '1015' };
// "901.1" is the catalog's own notation — kept verbatim, not normalised to a standard RAL
export const SILVER: ColourDot = { name: { en: 'Silver', ar: 'فضي' }, ral: '901.1' };

// Roller wheel colours carry no RAL reference in the catalog
export const RED: ColourDot = { name: { en: 'Red', ar: 'أحمر' } };
export const GREEN: ColourDot = { name: { en: 'Green', ar: 'أخضر' } };
