/**
 * lib/data/catalog/productTypes/specialty.ts
 * All four descriptions reused from materialContent.ts aluminum categories (spelling
 * normalised to "aluminum"), so none carry `placeholder`. Their figures are site copy,
 * not catalog-verified — flagged for review in the Batch 1 report.
 */

import type { Localized, ProductType, TypeAvailability } from '../types';

// Catalog lists no configurations or systems for any specialty item
const ALU_ONLY: TypeAvailability[] = [{ material: 'aluminum', configurations: [], profileSystemIds: [] }];

function specialty(slug: string, name: Localized, description: Localized, subItems?: Localized[]): ProductType {
  return {
    slug, group: 'specialty', mechanism: 'fixed', name, description, bestFor: [],
    ...(subItems ? { subItems } : {}),
    heroImage: null, hotspots: [], availability: ALU_ONLY,
  };
}

export const SPECIALTY_TYPES: ProductType[] = [
  specialty('skylights', { en: 'Skylights', ar: 'فتحات سقفية' }, {
    en: 'Our skylight systems are engineered for the UAE\'s intense solar load, incorporating solar-control Low-E glazing that transmits daylight while blocking up to 70% of solar heat gain. Available in fixed, manually venting, and motorised configurations with rain and wind sensors.',
    ar: 'أنظمة النور الزجاجي لدينا مهندسة لاستيعاب الحمولة الشمسية الشديدة في الإمارات، وتتضمن زجاجاً Low-E للتحكم الشمسي يسمح بمرور ضوء النهار مع حجب ما يصل إلى 70% من اكتساب الحرارة الشمسية.',
  }),
  specialty('pergola', { en: 'Pergola', ar: 'برجولة' }, {
    en: 'Emaar aluminum pergola systems transform outdoor terraces into usable year-round spaces. Louvred aluminum roof blades rotate up to 145°, allowing full sun control and natural ventilation. Integrated LED lighting and optional side screens complete a fully enclosed outdoor room.',
    ar: 'تحوّل أنظمة البرجولة الألومنيوم من إعمار التراسات الخارجية إلى مساحات صالحة للاستخدام على مدار العام. تدور شفرات السقف الألومنيوم حتى 145°، مما يتيح التحكم الكامل في أشعة الشمس والتهوية الطبيعية.',
  }),
  specialty('handrails', { en: 'Handrails', ar: 'درابزين' }, {
    en: 'Emaar aluminum handrail systems serve both functional and architectural roles — from simple continuous handrails on internal corridors to feature balustrade systems on resort pools and hotel lobbies. All profiles are powder-coated and tested to relevant BS and UAE grip-force standards.',
    ar: 'تؤدي أنظمة الدرابزين الألومنيوم من إعمار دورين وظيفياً ومعمارياً — من الدرابزين المتواصل البسيط في الممرات الداخلية إلى أنظمة الحاجز المعمارية على حمامات سباحة المنتجعات وبهوات الفنادق.',
  }),
  specialty('security-systems', { en: 'Security Systems', ar: 'أنظمة الحماية' }, {
    en: 'Emaar security-rated aluminum systems integrate reinforced profiles, multi-point locking, and laminated glass to achieve EN 1627 resistance class ratings. Specified by UAE developers for ground-floor retail, hotel entrances, and high-value residential applications where aesthetics must never be sacrificed for protection.',
    ar: 'تدمج أنظمة الألومنيوم المُصنَّفة أمنياً من إعمار قطاعات معززة وأقفال متعددة النقاط وزجاجاً طبقياً لتحقيق تصنيفات فئة المقاومة وفق EN 1627.',
  }, [
    { en: 'Amplimesh', ar: 'أمبليمش' },
    { en: 'Grill', ar: 'شبك حماية' },
    { en: 'Claustra', ar: 'كلاوسترا' },
  ]),
];
