/** Shared configuration / system constants reused across product-type files. */

import type { Localized } from '../types';

// uPVC casement family — every type built on these shares the [4, 32] mm glass range
export const UPVC_CASEMENT_SYSTEMS = ['w632', 'w640', 'w750', 'klasline-plus'];
export const UPVC_CASEMENT_GLASS: [number, number] = [4, 32];

// Same three uPVC sliding-door layouts apply to standard and large sliding doors
export const UPVC_SLIDING_DOOR_CONFIGS: Localized[] = [
  { en: '2 Track 2 Panel', ar: 'مساران ولوحان' },
  { en: '2 Track 3 Panel (fly mesh)', ar: 'مساران و3 ألواح (مع شبك حشرات)' },
  { en: '3 Track 4 Panel (2 sliding + 2 fixed)', ar: '3 مسارات و4 ألواح (2 منزلق + 2 ثابت)' },
];

export const ALU_HINGED_SYSTEMS = ['tb-600', 'alu-45'];
// Union of TB-600 [18, 38] and 45mm Hinged [4, 28]
export const ALU_HINGED_GLASS: [number, number] = [4, 38];

export const SOUND_THERMAL: Localized = { en: 'Sound and thermal insulation', ar: 'العزل الصوتي والحراري' };
export const VILLAS: Localized = { en: 'Villas', ar: 'الفلل' };
export const OFFICES: Localized = { en: 'Offices', ar: 'المكاتب' };
export const KITCHENS: Localized = { en: 'Kitchens', ar: 'المطابخ' };
export const BATHROOMS: Localized = { en: 'Bathrooms', ar: 'الحمّامات' };
