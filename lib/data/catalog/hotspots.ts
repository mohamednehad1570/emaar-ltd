/**
 * lib/data/catalog/hotspots.ts
 *
 * Material-neutral feature callouts keyed by opening mechanism — every type with the
 * same mechanism shares one set until a type gets its own `hotspots` override.
 * x/y are % of the 4:3 diagram box. The SVG elevations in components/catalog/hotspotDiagrams
 * are drawn to these exact points — move a pin here and that drawing must be redrawn.
 * Hardware brands come from the catalog accessories pages.
 * AR numeric ranges are wrapped in \u2066…\u2069 (LRI/PDI) so they never flip in RTL.
 * AR copy machine-translated — needs native review.
 */

import type { Hotspot, Localized, Mechanism } from './types';

const DOUBLE_SEAL: Pick<Hotspot, 'label' | 'detail'> = {
  label: { en: 'Double seal system', ar: 'نظام إحكام مزدوج' },
  detail: {
    en: 'Two seal lines keep out dust, sand and wind-driven rain.',
    ar: 'خطّا إحكام يمنعان دخول الغبار والرمال والأمطار مع الرياح.',
  },
};

// Builds a numbered set so `n` always matches list order
function set(points: [Localized, Localized, number, number][]): Hotspot[] {
  return points.map(([label, detail, x, y], i) => ({ n: i + 1, label, detail, x, y }));
}

export const MECHANISM_HOTSPOTS: Record<Mechanism, Hotspot[]> = {
  sliding: set([
    [{ en: 'Sliding lock', ar: 'قفل منزلق' },
      { en: 'Domus, GIESSE or STAC hardware secures the sash at the interlock.', ar: 'أقفال Domus أو GIESSE أو STAC تؤمّن الضلفة عند نقطة التداخل.' }, 50, 45],
    [{ en: 'Rollers up to 100 kg', ar: 'بكرات حتى 100 كغ' },
      { en: 'Double rollers carry heavy sashes smoothly along the track.', ar: 'بكرات مزدوجة تحمل الضلف الثقيلة بسلاسة على المسار.' }, 25, 88],
    [DOUBLE_SEAL.label, DOUBLE_SEAL.detail, 82, 20],
    [{ en: 'Fly-mesh option', ar: 'خيار شبك الحشرات' },
      { en: 'An optional insect screen runs in its own track.', ar: 'شبك حشرات اختياري يتحرك على مساره الخاص.' }, 75, 65],
  ]),
  casement: set([
    [{ en: 'Window handle', ar: 'مقبض النافذة' },
      { en: 'Roto handle drives the locking points around the sash.', ar: 'مقبض Roto يحرّك نقاط القفل حول الضلفة.' }, 78, 50],
    [{ en: 'Hinges / friction stays', ar: 'مفصلات / أذرع احتكاك' },
      { en: 'Carry the sash and hold it steady when open.', ar: 'تحمل الضلفة وتثبّتها في وضع الفتح.' }, 20, 25],
    [DOUBLE_SEAL.label, DOUBLE_SEAL.detail, 50, 12],
    [{ en: 'Steel reinforcement', ar: 'تقوية فولاذية' },
      { en: 'Galvanised steel 1.5–2.0 mm inside the profile keeps it rigid.', ar: 'فولاذ مجلفن \u20661.5–2.0\u2069 مم داخل القطاع يحافظ على صلابته.' }, 30, 80],
  ]),
  // Leaf drawn 120×240 units (1:2) centred in the 400×300 box (x 140–260, y 30–270): lock at
  // mid-height on the latch edge, top hinge at 25% of the leaf on the hinge edge, closer on
  // the top rail, threshold under the foot. Our own layout, not from the printed catalog.
  'hinged-door': set([
    [{ en: 'Multi-point lock', ar: 'قفل متعدد النقاط' },
      { en: 'Schüring locking engages the frame at several points.', ar: 'قفل Schüring يُحكم الإغلاق على الإطار في عدة نقاط.' }, 62, 50],
    [{ en: 'Door hinges', ar: 'مفصلات الباب' },
      { en: 'Schüring MTEC III or STAC hinges carry heavy leaves.', ar: 'مفصلات Schüring MTEC III أو STAC تحمل الأجنحة الثقيلة.' }, 35, 30],
    [{ en: 'Aluminum threshold', ar: 'عتبة ألمنيوم' },
      { en: 'A low threshold seals the base of the door.', ar: 'عتبة منخفضة تُحكم إغلاق أسفل الباب.' }, 50, 92],
    [{ en: 'Door closer option', ar: 'خيار مغلق الباب' },
      { en: 'Dormakaba TS 77/3 closer returns the door gently.', ar: 'مغلق Dormakaba TS 77/3 يعيد الباب بهدوء.' }, 52, 11],
  ]),
  folding: set([
    [{ en: 'Multi-panel fold', ar: 'طي متعدد الألواح' },
      { en: 'Panels fold and stack neatly to one side.', ar: 'تنطوي الألواح وتتراص بترتيب إلى جانب واحد.' }, 30, 45],
    [{ en: 'Smooth sliding track', ar: 'مسار انزلاق سلس' },
      { en: 'Panels glide on a guided track as they fold.', ar: 'تنزلق الألواح على مسار موجّه أثناء الطي.' }, 55, 90],
    [DOUBLE_SEAL.label, DOUBLE_SEAL.detail, 80, 18],
    [{ en: 'Full-width opening', ar: 'فتحة بكامل العرض' },
      { en: 'Clears almost the whole opening when fully folded.', ar: 'تُخلي الفتحة بالكامل تقريباً عند الطي التام.' }, 70, 60],
  ]),
  fixed: set([
    [{ en: 'Structural frame', ar: 'إطار إنشائي' },
      { en: 'A rigid frame carries the glass and transfers loads to the building.', ar: 'إطار صلب يحمل الزجاج وينقل الأحمال إلى المبنى.' }, 15, 20],
    [{ en: 'Insulated glass unit', ar: 'وحدة زجاج عازل' },
      { en: 'Double glazing cuts heat gain and outside noise.', ar: 'الزجاج المزدوج يقلل اكتساب الحرارة والضوضاء الخارجية.' }, 50, 50],
    [{ en: 'EPDM gaskets', ar: 'حشوات EPDM' },
      { en: 'Durable EPDM gaskets seal the glass against weather.', ar: 'حشوات EPDM متينة تُحكم عزل الزجاج ضد العوامل الجوية.' }, 82, 30],
    [{ en: 'Thermal break (aluminum)', ar: 'عازل حراري (ألمنيوم)' },
      { en: 'Polyamide strips separate inner and outer aluminum to limit heat flow.', ar: 'شرائح بولي أميد تفصل الألمنيوم الداخلي عن الخارجي للحد من انتقال الحرارة.' }, 35, 85],
  ]),
  // No mechanism → no diagram; the section hides itself on an empty list
  unspecified: [],
};

// Diagram file per mechanism for the hotspot section — null = the SVG elevation from
// components/catalog/hotspotDiagrams. A file set here wins; retune the x/y above to match it.
export const MECHANISM_DIAGRAMS: Record<Mechanism, string | null> = {
  sliding: null, casement: null, 'hinged-door': null, folding: null, fixed: null, unspecified: null,
};
