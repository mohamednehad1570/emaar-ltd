/**
 * lib/data/catalogCopy.ts
 * Static labels for the bare material + product-type pages (Batch 2).
 * Components read this through uiStrings.ts, never directly.
 */

export const CATALOG_PAGE_COPY = {
  materialEyebrow: { en: 'Material', ar: 'المادة' },
  typeEyebrow:     { en: 'Product', ar: 'المنتج' },
  bestFor:         { en: 'Best for', ar: 'الأنسب لـ' },
  availableIn:     { en: 'Available in', ar: 'متوفر بـ' },
  configurations:  { en: 'Configurations', ar: 'التكوينات' },
  profileSystems:  { en: 'Profile systems', ar: 'أنظمة القطاعات' },
  glassRange:      { en: 'Glass thickness', ar: 'سماكة الزجاج' },
  comingSoon:      { en: 'Details coming soon.', ar: 'التفاصيل قريباً.' },
  glass:           { en: 'Glass', ar: 'الزجاج' },
  glassPerformance:{ en: 'Performance glass', ar: 'زجاج عالي الأداء' },
  glassDecorative: { en: 'Decorative glass', ar: 'زجاج زخرفي' },
  accessories:     { en: 'Accessories', ar: 'الإكسسوارات' },
  mm:              { en: 'mm', ar: 'مم' },
} as const;
