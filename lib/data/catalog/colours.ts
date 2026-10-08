/**
 * lib/data/catalog/colours.ts
 *
 * PLACEHOLDER DATA — replace before launch.
 * Names, codes and hex values are invented stand-ins so the Colours UI can be built;
 * none come from the catalog. Every record carries `placeholder: true`.
 * AR copy machine-translated — needs native review.
 */

import type { ColourOption, Localized, MaterialId } from './types';

const UPVC_STANDARD: Localized = { en: 'Standard', ar: 'قياسي' };
const UPVC_WOOD: Localized = { en: 'Wood-look', ar: 'بمظهر الخشب' };
const UPVC_DARK: Localized = { en: 'Dark finishes', ar: 'تشطيبات داكنة' };
const ALU_RAL: Localized = { en: 'Standard RAL', ar: 'RAL قياسي' };
const ALU_TEXTURED: Localized = { en: 'Textured', ar: 'محبّب' };
const ALU_METALLIC: Localized = { en: 'Metallic', ar: 'معدني' };

function c(material: MaterialId, group: Localized, en: string, ar: string, code: string, hex: string): ColourOption {
  return { id: `${material}-${code.toLowerCase()}`, material, group, name: { en, ar }, code, hex, placeholder: true };
}

export const COLOURS: ColourOption[] = [
  // ── uPVC — Standard ───────────────────────────────────────
  c('upvc', UPVC_STANDARD, 'Pure White', 'أبيض نقي', 'US-01', '#F4F4F0'),
  c('upvc', UPVC_STANDARD, 'Cream White', 'أبيض كريمي', 'US-02', '#EEE8D8'),
  c('upvc', UPVC_STANDARD, 'Ivory', 'عاجي', 'US-03', '#E9DFC4'),
  c('upvc', UPVC_STANDARD, 'Light Grey', 'رمادي فاتح', 'US-04', '#C9CACB'),
  c('upvc', UPVC_STANDARD, 'Agate Grey', 'رمادي عقيقي', 'US-05', '#B5B8B1'),
  c('upvc', UPVC_STANDARD, 'Sand Beige', 'بيج رملي', 'US-06', '#D6C6A5'),
  c('upvc', UPVC_STANDARD, 'Silk Grey', 'رمادي حريري', 'US-07', '#BDBBB2'),
  c('upvc', UPVC_STANDARD, 'Pebble', 'حصوي', 'US-08', '#A9A396'),
  c('upvc', UPVC_STANDARD, 'Stone', 'حجري', 'US-09', '#9C978B'),
  c('upvc', UPVC_STANDARD, 'Clay', 'طيني', 'US-10', '#B39B82'),
  // ── uPVC — Wood-look ──────────────────────────────────────
  c('upvc', UPVC_WOOD, 'Golden Oak', 'بلوط ذهبي', 'UW-01', '#B07A3E'),
  c('upvc', UPVC_WOOD, 'Walnut', 'جوز', 'UW-02', '#6B4A33'),
  c('upvc', UPVC_WOOD, 'Mahogany', 'ماهوغني', 'UW-03', '#6E3328'),
  c('upvc', UPVC_WOOD, 'Rosewood', 'خشب الورد', 'UW-04', '#5C2E24'),
  c('upvc', UPVC_WOOD, 'Light Oak', 'بلوط فاتح', 'UW-05', '#C9A273'),
  c('upvc', UPVC_WOOD, 'Teak', 'ساج', 'UW-06', '#9A6B3F'),
  c('upvc', UPVC_WOOD, 'Cherry', 'كرز', 'UW-07', '#8A4632'),
  c('upvc', UPVC_WOOD, 'Douglas Fir', 'تنوب دوغلاس', 'UW-08', '#B4865A'),
  c('upvc', UPVC_WOOD, 'Winchester', 'وينشستر', 'UW-09', '#A87B4F'),
  c('upvc', UPVC_WOOD, 'Swamp Oak', 'بلوط المستنقعات', 'UW-10', '#5E4B3C'),
  // ── uPVC — Dark finishes ──────────────────────────────────
  c('upvc', UPVC_DARK, 'Anthracite', 'أنثراسايت', 'UD-01', '#3B3E40'),
  c('upvc', UPVC_DARK, 'Basalt Grey', 'رمادي بازلتي', 'UD-02', '#4E5052'),
  c('upvc', UPVC_DARK, 'Jet Black', 'أسود فاحم', 'UD-03', '#1C1C1C'),
  c('upvc', UPVC_DARK, 'Carbon Matt', 'كربوني مطفي', 'UD-04', '#262626'),
  c('upvc', UPVC_DARK, 'Slate', 'أردوازي', 'UD-05', '#545454'),
  c('upvc', UPVC_DARK, 'Umber', 'بني داكن', 'UD-06', '#4A3B31'),
  c('upvc', UPVC_DARK, 'Graphite', 'غرافيت', 'UD-07', '#3F3F3D'),
  c('upvc', UPVC_DARK, 'Bronze Dark', 'برونزي داكن', 'UD-08', '#4D3F33'),
  c('upvc', UPVC_DARK, 'Moss Dark', 'طحلبي داكن', 'UD-09', '#3E4537'),
  c('upvc', UPVC_DARK, 'Iron', 'حديدي', 'UD-10', '#47494B'),
  // ── Aluminum — Standard RAL ───────────────────────────────
  c('aluminum', ALU_RAL, 'Signal White', 'أبيض إشاري', 'AR-01', '#F1F0EA'),
  c('aluminum', ALU_RAL, 'Traffic White', 'أبيض مروري', 'AR-02', '#F2F1EB'),
  c('aluminum', ALU_RAL, 'Light Ivory', 'عاجي فاتح', 'AR-03', '#E6D2A5'),
  c('aluminum', ALU_RAL, 'Pebble Grey', 'رمادي حصوي', 'AR-04', '#B8B4A8'),
  c('aluminum', ALU_RAL, 'Window Grey', 'رمادي النوافذ', 'AR-05', '#9DA3A6'),
  c('aluminum', ALU_RAL, 'Quartz Grey', 'رمادي كوارتز', 'AR-06', '#6C6960'),
  c('aluminum', ALU_RAL, 'Umbra Grey', 'رمادي ظلي', 'AR-07', '#4C4F51'),
  c('aluminum', ALU_RAL, 'Sepia Brown', 'بني داكن', 'AR-08', '#3E3028'),
  c('aluminum', ALU_RAL, 'Olive Grey', 'رمادي زيتوني', 'AR-09', '#6E6F5E'),
  c('aluminum', ALU_RAL, 'Jet Black', 'أسود فاحم', 'AR-10', '#1E1E1E'),
  // ── Aluminum — Textured ───────────────────────────────────
  c('aluminum', ALU_TEXTURED, 'Sable Black', 'أسود رملي', 'AT-01', '#232323'),
  c('aluminum', ALU_TEXTURED, 'Sable Grey', 'رمادي رملي', 'AT-02', '#5A5B5C'),
  c('aluminum', ALU_TEXTURED, 'Sable Bronze', 'برونزي رملي', 'AT-03', '#5B4636'),
  c('aluminum', ALU_TEXTURED, 'Fine Sand', 'رمل ناعم', 'AT-04', '#C8B898'),
  c('aluminum', ALU_TEXTURED, 'Dune', 'كثيب', 'AT-05', '#B49E7C'),
  c('aluminum', ALU_TEXTURED, 'Granite', 'جرانيتي', 'AT-06', '#6B6A66'),
  c('aluminum', ALU_TEXTURED, 'Ash', 'رمادي', 'AT-07', '#8E8C86'),
  c('aluminum', ALU_TEXTURED, 'Cedar Texture', 'أرز محبّب', 'AT-08', '#7A5A3F'),
  c('aluminum', ALU_TEXTURED, 'Charcoal', 'فحمي', 'AT-09', '#36383A'),
  c('aluminum', ALU_TEXTURED, 'Limestone', 'حجر جيري', 'AT-10', '#D3CBB8'),
  // ── Aluminum — Metallic ───────────────────────────────────
  c('aluminum', ALU_METALLIC, 'Champagne', 'شمبانيا', 'AM-01', '#C9B68E'),
  c('aluminum', ALU_METALLIC, 'Silver Anodised', 'فضي مؤكسد', 'AM-02', '#B9BCBD'),
  c('aluminum', ALU_METALLIC, 'Bronze Anodised', 'برونزي مؤكسد', 'AM-03', '#6F563F'),
  c('aluminum', ALU_METALLIC, 'Gunmetal', 'رصاصي معدني', 'AM-04', '#53565A'),
  c('aluminum', ALU_METALLIC, 'Titanium', 'تيتانيوم', 'AM-05', '#8F8D88'),
  c('aluminum', ALU_METALLIC, 'Copper', 'نحاسي', 'AM-06', '#9A5F3E'),
  c('aluminum', ALU_METALLIC, 'Pewter', 'قصديري', 'AM-07', '#7B7A75'),
  c('aluminum', ALU_METALLIC, 'Satin Gold', 'ذهبي ساتان', 'AM-08', '#B79A5B'),
  c('aluminum', ALU_METALLIC, 'Stainless Look', 'مظهر ستانلس', 'AM-09', '#A8AAA9'),
  c('aluminum', ALU_METALLIC, 'Dark Bronze', 'برونزي داكن', 'AM-10', '#4A3B2E'),
];
