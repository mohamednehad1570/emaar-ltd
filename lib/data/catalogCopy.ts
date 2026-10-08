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

/** Labels for the full product-type page (components/catalog/type/*). */
export const TYPE_PAGE_COPY = {
  requestQuote:  { en: 'Request a Quote', ar: 'اطلب عرض سعر' },
  flagship:      { en: 'Flagship', ar: 'الأفضل' },
  special:       { en: 'Special', ar: 'مميز' },
  howItOpens:    { en: 'How it opens', ar: 'طريقة الفتح' },
  bestFor:       { en: 'Best for', ar: 'مثالي لـ' },
  features:      { en: 'Key features', ar: 'أبرز المزايا' },
  diagramAlt:    { en: 'Feature diagram', ar: 'مخطط المزايا' },
  specs:         { en: 'Specifications', ar: 'المواصفات' },
  glassRange:    { en: 'Glass thickness range', ar: 'نطاق سماكة الزجاج' },
  sashLimits:    { en: 'Sash size limits', ar: 'حدود مقاس الضلفة' },
  width:         { en: 'Width', ar: 'العرض' },
  height:        { en: 'Height', ar: 'الارتفاع' },
  frame:         { en: 'Frame', ar: 'الإطار' },
  chambers:      { en: 'Chambers', ar: 'الحجرات' },
  glass:         { en: 'Glass', ar: 'الزجاج' },
  onRequest:     { en: 'Details on request.', ar: 'التفاصيل عند الطلب.' },
  footnote: {
    en: 'Specifications per Emaar catalog. Final sizes confirmed after site measurement.',
    ar: 'المواصفات وفق كتالوج إعمار. تُؤكَّد المقاسات النهائية بعد القياس في الموقع.',
  },
  ctaEyebrow:    { en: 'Get Started', ar: 'ابدأ الآن' },
  // {name} is replaced with the type name in the active language
  ctaHeadline:   { en: 'Planning a {name} project?', ar: 'تخطط لمشروع {name}؟' },
} as const;
