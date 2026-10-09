/**
 * lib/data/catalog/productTypes/specialty.ts
 * All four descriptions reused from the former materialContent.ts aluminum categories (spelling
 * normalised to "aluminum"), so none carry `placeholder`. Figures and standards not in
 * the catalog were stripped in Batch 2 — keep it that way when editing.
 */

import type { Localized, Mechanism, ProductType, TypeAvailability } from '../types';
import { pendingGallery } from './shared';

// Catalog lists no configurations or systems for any specialty item
const ALU_ONLY: TypeAvailability[] = [{ material: 'aluminum', configurations: [], profileSystemIds: [] }];

// Only skylights are glazed (fixed lights); pergola, handrails and security systems have
// no glazing or opening to draw, so they take 'unspecified' — same as frameless-doors
function specialty(
  slug: string, mechanism: Mechanism, name: Localized, description: Localized, subItems?: Localized[],
): ProductType {
  return {
    slug, group: 'specialty', mechanism, name, description, bestFor: [],
    ...(subItems ? { subItems } : {}),
    heroImage: null, hotspots: [], gallery: pendingGallery(), availability: ALU_ONLY,
  };
}

export const SPECIALTY_TYPES: ProductType[] = [
  specialty('skylights', 'fixed', { en: 'Skylights', ar: 'فتحات سقفية' }, {
    en: 'Our skylight systems are engineered for the UAE\'s intense solar load, incorporating solar-control Low-E glazing that transmits daylight while blocking much of the solar heat gain. Available in fixed, manually venting, and motorised configurations with rain and wind sensors.',
    ar: 'أنظمة النور الزجاجي لدينا مهندسة لاستيعاب الحمولة الشمسية الشديدة في الإمارات، وتتضمن زجاجاً Low-E للتحكم الشمسي يسمح بمرور ضوء النهار مع حجب جزء كبير من اكتساب الحرارة الشمسية.',
  }),
  specialty('pergola', 'unspecified', { en: 'Pergola', ar: 'برجولة' }, {
    en: 'Emaar aluminum pergola systems transform outdoor terraces into usable year-round spaces. Louvred aluminum roof blades rotate to allow full sun control and natural ventilation. Integrated lighting and optional side screens complete a fully enclosed outdoor room.',
    ar: 'تحوّل أنظمة البرجولة الألومنيوم من إعمار التراسات الخارجية إلى مساحات صالحة للاستخدام على مدار العام. تدور شفرات السقف الألومنيوم بما يتيح التحكم الكامل في أشعة الشمس والتهوية الطبيعية.',
  }),
  specialty('handrails', 'unspecified', { en: 'Handrails', ar: 'درابزين' }, {
    en: 'Emaar aluminum handrail systems serve both functional and architectural roles — from simple continuous handrails on internal corridors to feature balustrade systems on resort pools and hotel lobbies. All profiles are powder-coated.',
    ar: 'تؤدي أنظمة الدرابزين الألومنيوم من إعمار دورين وظيفياً ومعمارياً — من الدرابزين المتواصل البسيط في الممرات الداخلية إلى أنظمة الحاجز المعمارية على حمامات سباحة المنتجعات وبهوات الفنادق.',
  }),
  specialty('security-systems', 'unspecified', { en: 'Security Systems', ar: 'أنظمة الحماية' }, {
    en: 'Emaar security-rated aluminum systems integrate reinforced profiles, multi-point locking, and laminated glass for added resistance to forced entry. Specified by UAE developers for ground-floor retail, hotel entrances, and high-value residential applications where aesthetics must never be sacrificed for protection.',
    ar: 'تدمج أنظمة الألومنيوم المُصنَّفة أمنياً من إعمار قطاعات معززة وأقفال متعددة النقاط وزجاجاً طبقياً لتوفير مقاومة إضافية للاقتحام.',
  }, [
    { en: 'Amplimesh', ar: 'أمبليمش' },
    { en: 'Grill', ar: 'شبك حماية' },
    { en: 'Claustra', ar: 'كلاوسترا' },
  ]),
];
