/**
 * lib/data/catalog/profileSystems.ts
 *
 * Profile systems with exact catalog values only — any figure the catalog does not
 * print is left undefined (never estimated). Ranges that don't fit a single number
 * (sash 60/67, 28.6–35) live in `notes` instead of the numeric field.
 * AR copy machine-translated — needs native review.
 */

import type { Localized, ProfileSystem } from './types';

const CASEMENT_TILT: Localized = { en: 'Casement / tilt', ar: 'مفصلي / قلاب' };
const CASEMENT_TILT_DOOR: Localized = { en: 'Casement / tilt / door', ar: 'مفصلي / قلاب / باب' };

// Every aluminum system shares the same third-party test regime
const ALU_TESTED: Localized = {
  en: 'Tested at Al-Futtaim Exova to ASTM E283 / E331 / E330',
  ar: 'مختبر لدى الفطيم إكسوفا وفق ASTM E283 / E331 / E330',
};
const HEAVY_DUTY: Localized = { en: 'Heavy duty H-HC40', ar: 'تحمّل شديد H-HC40' };

export const PROFILE_SYSTEMS: ProfileSystem[] = [
  // ── uPVC ──────────────────────────────────────────────────
  {
    id: 'w632', name: 'W 632', material: 'upvc', kind: CASEMENT_TILT,
    frameMm: 60, chambers: 3, ufWm2K: 1.58, glassMm: [4, 32],
    profileClass: 'B (TS EN 12608-1)', notes: [],
  },
  {
    id: 'w640', name: 'W 640', material: 'upvc', kind: CASEMENT_TILT,
    frameMm: 60, chambers: 4, ufWm2K: 1.45, glassMm: [4, 32], profileClass: 'B', notes: [],
  },
  {
    id: 'w750', name: 'W 750', material: 'upvc', kind: CASEMENT_TILT_DOOR,
    frameMm: 70, chambers: 5, glassMm: [4, 32],
    notes: [
      { en: 'Staged drainage', ar: 'تصريف متدرّج' },
      { en: 'Blinds compatible (motorised / manual)', ar: 'متوافق مع الستائر (آلية / يدوية)' },
      { en: 'Wood-look laminates', ar: 'رقائق بمظهر الخشب' },
    ],
  },
  {
    id: 'w242', name: 'W 242', material: 'upvc',
    kind: { en: 'Sliding window', ar: 'نافذة منزلقة' },
    // Catalog: "glass up to 20 mm" — 4 mm floor per the batch brief
    glassMm: [4, 20], notes: [],
  },
  {
    id: 'w880', name: 'W 880 Hebeschiebe', material: 'upvc',
    kind: { en: 'Lift & slide', ar: 'رفع وإزاحة' },
    frameMm: 185, sashMm: 80, chambers: 5, ufWm2K: 1.5, glassMm: [24, 42],
    profileClass: 'A (TS EN 12608-1, RAL 716-GZ)', notes: [],
  },
  {
    id: 'klasline-plus', name: 'Klasline Plus', material: 'upvc', kind: CASEMENT_TILT_DOOR,
    frameMm: 70, chambers: 5, ufWm2K: 1.4,
    // glassMm left undefined — catalog prints only an upper bound ("up to 32 mm")
    notes: [
      { en: 'Glass up to 32 mm', ar: 'زجاج حتى 32 مم' },
      { en: 'CE marked', ar: 'يحمل علامة CE' },
      { en: '2.4 mm walls', ar: 'جدران بسماكة 2.4 مم' },
      { en: 'Drip sash', ar: 'ضلفة بحافة تقطير' },
      { en: 'Carbon Matt Black option (Renolit Exofol FX)', ar: 'خيار أسود كربوني مطفي (Renolit Exofol FX)' },
    ],
  },

  // ── Aluminum ──────────────────────────────────────────────
  {
    id: 'cw-50', name: 'CW-50', material: 'aluminum',
    kind: { en: 'Curtain wall', ar: 'جدار ستائري' },
    frameMm: 50, glassMm: [6, 32],
    thermalNote: { en: '18.6 mm polyamide; k 5.7 → 3.0 W/m²K', ar: 'بولي أميد 18.6 مم؛ k من 5.7 إلى 3.0 واط/م²ك' },
    notes: [ALU_TESTED],
  },
  {
    id: 'tb-600', name: 'TB-600', material: 'aluminum',
    kind: { en: 'Thermal-break hinged', ar: 'مفصلي بعازل حراري' },
    frameMm: 60, glassMm: [18, 38],
    thermalNote: { en: '16 mm strip; k 5.7 → 3.3 W/m²K', ar: 'شريط 16 مم؛ k من 5.7 إلى 3.3 واط/م²ك' },
    notes: [{ en: 'Sash 60 / 67 mm', ar: 'ضلفة 60 / 67 مم' }, HEAVY_DUTY, ALU_TESTED],
  },
  {
    id: 'alu-45', name: '45mm Hinged', material: 'aluminum',
    kind: { en: 'Hinged (arch, louvre, pivot, swing)', ar: 'مفصلي (مقوّس، شيش، محوري، متأرجح)' },
    frameMm: 45, sashMm: 52, glassMm: [4, 28], notes: [ALU_TESTED],
  },
  {
    id: 'sliding-105', name: 'Sliding 105', material: 'aluminum',
    kind: { en: 'Thermal-break sliding', ar: 'منزلق بعازل حراري' },
    frameMm: 105, glassMm: [6, 24],
    thermalNote: { en: '16 mm polyamide', ar: 'بولي أميد 16 مم' },
    notes: [
      { en: '125 mm frame option', ar: 'خيار إطار 125 مم' },
      { en: 'Sash 28.6–35 mm', ar: 'ضلفة 28.6–35 مم' },
      ALU_TESTED,
    ],
  },
  {
    id: 'montana-120', name: 'Montana 120', material: 'aluminum',
    kind: { en: 'Thermal-break sliding (2/3/4 sash, arch)', ar: 'منزلق بعازل حراري (2/3/4 ضلف، مقوّس)' },
    frameMm: 120, sashMm: 37.4,
    // Catalog: "glass up to 24 mm" — 6 mm floor per the batch brief
    glassMm: [6, 24],
    thermalNote: { en: 'k 5.7 → 3.3 W/m²K', ar: 'k من 5.7 إلى 3.3 واط/م²ك' },
    notes: [HEAVY_DUTY, ALU_TESTED],
  },
];
