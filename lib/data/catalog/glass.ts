/**
 * lib/data/catalog/glass.ts
 *
 * Glass options offered on both materials. Hex values are approximate swatch tints
 * only (blue is allowed here — product swatches are the sole exception to the
 * no-blue rule). Notes are deliberately generic; no performance figures are given
 * because the catalog prints none.
 * AR copy machine-translated — needs native review.
 */

import type { GlassOption, Localized } from './types';

const AGC = 'AGC Belgium';
const EFG = 'Emirates Float Glass';
const GUARDIAN = 'Guardian USA';

const TINTED: Localized = { en: 'Body-tinted solar-control glass', ar: 'زجاج ملوّن للتحكم الشمسي' };
const REFLECTIVE: Localized = { en: 'Coated solar-control glass that reduces heat gain', ar: 'زجاج مطلي للتحكم الشمسي يقلل اكتساب الحرارة' };
const CLARITY: Localized = { en: 'Clear coated glass for high clarity', ar: 'زجاج شفاف مطلي لوضوح عالٍ' };
const LOW_E: Localized = { en: 'Low-E coated glass for thermal insulation', ar: 'زجاج مطلي منخفض الانبعاثية للعزل الحراري' };

function perf(id: string, supplier: string, en: string, ar: string, note: Localized, hex: string): GlassOption {
  return { id, group: 'performance', supplier, name: { en, ar }, note, image: null, hex };
}

export const GLASS: GlassOption[] = [
  // ── Performance — AGC Belgium ─────────────────────────────
  perf('agc-classic-blue', AGC, 'Classic Blue', 'كلاسيك أزرق', TINTED, '#6E8FA8'),
  perf('agc-classic-green', AGC, 'Classic Green', 'كلاسيك أخضر', TINTED, '#7FA38E'),
  perf('agc-classic-grey', AGC, 'Classic Grey', 'كلاسيك رمادي', TINTED, '#7D8285'),

  // ── Performance — Emirates Float Glass ────────────────────
  perf('efg-usa-bronze', EFG, 'USA Bronze', 'برونزي USA', TINTED, '#8C7560'),
  perf('efg-clear-vitracool', EFG, 'Clear Vitracool', 'فيتراكول شفاف', REFLECTIVE, '#C9D3D2'),
  perf('efg-clear-vitralite', EFG, 'Clear Vitralite', 'فيترالايت شفاف', CLARITY, '#D6DEDD'),
  perf('efg-grey-vitracool', EFG, 'Grey Vitracool', 'فيتراكول رمادي', REFLECTIVE, '#6F7477'),

  // ── Performance — Guardian USA ────────────────────────────
  perf('guardian-hd-bronze', GUARDIAN, 'HD Bronze', 'HD برونزي', TINTED, '#8A7058'),
  perf('guardian-hd-blue', GUARDIAN, 'HD Blue', 'HD أزرق', TINTED, '#5F7F9E'),
  perf('guardian-hd-grey', GUARDIAN, 'HD Grey', 'HD رمادي', TINTED, '#6B6F72'),
  perf('guardian-hd-green', GUARDIAN, 'HD Green', 'HD أخضر', TINTED, '#6E9078'),
  perf('guardian-silver20', GUARDIAN, 'Silver20', 'سيلفر 20', REFLECTIVE, '#A9B0B4'),
  perf('guardian-hd-plus-grey', GUARDIAN, 'HD Plus Grey', 'HD بلس رمادي', TINTED, '#5A5E61'),
  perf('guardian-low-en-70', GUARDIAN, 'Low EN 70', 'Low EN 70', LOW_E, '#CFD8D6'),

  // ── Decorative ────────────────────────────────────────────
  {
    id: 'stained-glass', group: 'decorative',
    name: { en: 'Stained Glass', ar: 'زجاج معشّق' },
    note: { en: 'Made in-house', ar: 'يُصنع داخل مصانعنا' }, image: null,
  },
  {
    id: 'sandblasted-glass', group: 'decorative',
    name: { en: 'Sandblasted Glass', ar: 'زجاج مصنفر' },
    note: { en: 'Frosted finish for privacy with diffused light', ar: 'تشطيب مصنفر للخصوصية مع ضوء منتشر' }, image: null,
  },
  {
    id: 'decorative-georgian-islamic', group: 'decorative',
    name: { en: 'Decorative Glass with Georgian Bar & Islamic Design', ar: 'زجاج زخرفي بقضبان جورجية وتصاميم إسلامية' },
    note: { en: 'Georgian bars and Islamic designs set within the glazing', ar: 'قضبان جورجية وتصاميم إسلامية ضمن الزجاج' }, image: null,
  },
];
