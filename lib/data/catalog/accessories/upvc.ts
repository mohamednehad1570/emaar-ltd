/**
 * lib/data/catalog/accessories/upvc.ts
 * uPVC hardware, catalog pp.174–178 — codes and RALs exactly as printed, including
 * apparent duplicates (K7610X on both Domus locks; 496770 on Giesse locks and a Roto handle).
 * AR copy machine-translated — needs native review.
 */

import type { AccessoryItem } from '../types';
import { WHITE, BROWN, BLACK, IVORY_BEIGE, RED, GREEN } from './colours';

const CYL_SPEC = '90 mm SS 45×45 / 100 mm SS 50×50';
const ROLLER_SPEC = 'Double 100 kg / single 50 kg';

export const UPVC_ACCESSORIES: AccessoryItem[] = [
  // ── Sliding locks ─────────────────────────────────────────
  { id: 'domus-sliding-lock-no-key', kind: 'sliding-lock', materials: ['upvc'], brandId: 'domus',
    name: { en: 'Sliding lock without key', ar: 'قفل منزلق بدون مفتاح' },
    code: 'K7610L / K7610X / K7610M', colours: [WHITE, BROWN, BLACK], image: null },
  { id: 'domus-sliding-lock-key', kind: 'sliding-lock', materials: ['upvc'], brandId: 'domus',
    name: { en: 'Sliding lock with key', ar: 'قفل منزلق بمفتاح' },
    code: '7640L / K7610X / 7640M', colours: [WHITE, BROWN, BLACK], image: null },
  { id: 'giesse-sliding-lock-key', kind: 'sliding-lock', materials: ['upvc'], brandId: 'giesse',
    name: { en: 'Sliding lock with key', ar: 'قفل منزلق بمفتاح' },
    code: '496770', colours: [WHITE], image: null },
  { id: 'giesse-sliding-lock-no-key', kind: 'sliding-lock', materials: ['upvc'], brandId: 'giesse',
    name: { en: 'Sliding lock without key', ar: 'قفل منزلق بدون مفتاح' },
    code: '496770', colours: [BLACK], image: null },

  // ── Cylinders ─────────────────────────────────────────────
  { id: 'giesse-wc-cylinder', kind: 'cylinder', materials: ['upvc'], brandId: 'giesse',
    name: { en: 'WC cylinder', ar: 'أسطوانة حمّام' }, spec: CYL_SPEC, colours: [], image: null },
  { id: 'kale-normal-cylinder', kind: 'cylinder', materials: ['upvc'], brandId: 'kale',
    name: { en: 'Normal cylinder', ar: 'أسطوانة عادية' }, spec: CYL_SPEC, colours: [], image: null },

  // ── Handles ───────────────────────────────────────────────
  { id: 'roto-swing-handle-no-key', kind: 'handle', materials: ['upvc'], brandId: 'roto',
    name: { en: 'Window swing handle without key', ar: 'مقبض نافذة مفصلية بدون مفتاح' },
    code: '641111', colours: [WHITE], image: null },
  { id: 'roto-swing-handle-key', kind: 'handle', materials: ['upvc'], brandId: 'roto',
    name: { en: 'Window swing handle with key', ar: 'مقبض نافذة مفصلية بمفتاح' },
    code: '641111', colours: [WHITE], image: null },
  { id: 'roto-window-handle', kind: 'handle', materials: ['upvc'], brandId: 'roto',
    name: { en: 'Window handle', ar: 'مقبض نافذة' }, code: '496770', colours: [WHITE], image: null },
  { id: 'schuring-lever-set', kind: 'handle', materials: ['upvc'], brandId: 'schuring',
    name: { en: 'Door handle lever set 35 mm', ar: 'طقم مقبض باب ذراعي 35 مم' },
    code: 'SC-CP-F', colours: [WHITE, IVORY_BEIGE, BROWN], image: null },

  // ── Door locks ────────────────────────────────────────────
  { id: 'schuring-mortise-lock', kind: 'door-lock', materials: ['upvc'], brandId: 'schuring',
    name: { en: 'Mortise lock', ar: 'قفل غاطس' }, code: '2003003', spec: '35 mm / 16 mm',
    colours: [], image: null },
  { id: 'schuring-gear-lock', kind: 'door-lock', materials: ['upvc'], brandId: 'schuring',
    name: { en: 'Gear lock (multi-point)', ar: 'قفل تروس (متعدد النقاط)' }, spec: 'RVS G 35 mm / 16 mm FP',
    colours: [], image: null },

  // ── Hinges ────────────────────────────────────────────────
  { id: 'schuring-mtec-hinge', kind: 'hinge', materials: ['upvc'], brandId: 'schuring',
    name: { en: 'MTEC III S hinge 16.5 mm', ar: 'مفصلة MTEC III S بمقاس 16.5 مم' },
    code: '2590101 / 2590103 / 2590102', colours: [WHITE, BROWN, IVORY_BEIGE], image: null },
  { id: 'vdv-hinge', kind: 'hinge', materials: ['upvc'], origin: { en: 'China', ar: 'الصين' },
    name: { en: 'VDV hinge', ar: 'مفصلة VDV' }, code: 'GD0016',
    // Brown here is printed as RAL 8019, not the 8017 used elsewhere
    colours: [WHITE, { name: { en: 'Brown', ar: 'بني' }, ral: '8019' }], image: null },

  // ── Rollers ───────────────────────────────────────────────
  { id: 'roller-australia', kind: 'roller', materials: ['upvc'], origin: { en: 'Australia', ar: 'أستراليا' },
    name: { en: 'Sliding roller', ar: 'بكرة انزلاق' }, spec: ROLLER_SPEC, colours: [RED, GREEN], image: null },
  { id: 'top-roller', kind: 'roller', materials: ['upvc'], brandId: 'top',
    name: { en: 'Sliding roller', ar: 'بكرة انزلاق' }, spec: ROLLER_SPEC, colours: [RED, GREEN], image: null },

  // ── Closers & stoppers ────────────────────────────────────
  { id: 'dormakaba-closer-ts77', kind: 'closer-stopper', materials: ['upvc'], brandId: 'dormakaba',
    name: { en: 'Door closer TS 77/3', ar: 'مُغلق باب TS 77/3' }, code: 'TS 77/3',
    colours: [WHITE, BROWN], image: null },
  { id: 'door-stopper-2in', kind: 'closer-stopper', materials: ['upvc'], origin: { en: 'Thailand', ar: 'تايلاند' },
    name: { en: 'Door stopper 2″', ar: 'مصدّ باب 2 بوصة' },
    // Catalog prints RAL 9016 against all three — a misprint, so RAL is deliberately omitted
    colours: [
      { name: { en: 'Ivory', ar: 'عاجي' } },
      { name: { en: 'Brown', ar: 'بني' } },
      { name: { en: 'White', ar: 'أبيض' } },
    ],
    image: null },
];
