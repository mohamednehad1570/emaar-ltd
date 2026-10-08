/**
 * lib/data/catalogCopy.ts
 * Static labels for the bare material + product-type pages (Batch 2).
 * Components read this through uiStrings.ts, never directly.
 */

export const CATALOG_PAGE_COPY = {
  materialEyebrow: { en: 'Material', ar: 'الخامة' },
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
  // {name} is replaced with the type name in the active language
  galleryTitle:  { en: 'Examples of {name}', ar: 'أمثلة على {name}' },
  example:       { en: 'example', ar: 'مثال' },
  openImage:     { en: 'Open image', ar: 'فتح الصورة' },
  configsTitle:  { en: 'Available configurations', ar: 'التكوينات المتاحة' },
  customSizes:   { en: 'Custom sizes on request', ar: 'مقاسات حسب الطلب' },
  // Arrow is an icon (flips in RTL), so the label carries no arrow glyph
  techLink:      { en: 'Technical specifications', ar: 'المواصفات الفنية' },
  ctaEyebrow:    { en: 'Get Started', ar: 'ابدأ الآن' },
  // {name} is replaced with the type name in the active language
  ctaHeadline:   { en: 'Planning a {name} project?', ar: 'تخطط لمشروع {name}؟' },
  // AR below machine-translated — needs native review.
  // "How it opens" pictogram aria-label; {name} = the mechanism label (Sliding, Casement …)
  openingSymbol: { en: 'Opening symbol: {name}', ar: 'رمز طريقة الفتح: {name}' },
  // Hotspot diagram aria-labels, keyed by mechanism — each names what the drawing shows
  diagramLabels: {
    'sliding':     { en: 'Diagram of a sliding window or door', ar: 'مخطط نافذة أو باب منزلق' },
    'casement':    { en: 'Diagram of a casement window', ar: 'مخطط نافذة مفصلية' },
    'hinged-door': { en: 'Diagram of a hinged door', ar: 'مخطط باب مفصلي' },
    'folding':     { en: 'Diagram of a folding door', ar: 'مخطط باب قابل للطي' },
    'fixed':       { en: 'Diagram of a fixed glazing panel', ar: 'مخطط لوح زجاج ثابت' },
  },
} as const;

/** Labels for the full material page (components/catalog/material/*). */
export const MATERIAL_PAGE_COPY = {
  // {material} is replaced with the material name in the active language
  typesTitle:   { en: '{material} products', ar: 'منتجات {material}' },
  ctaHeadline:  { en: 'Planning a {material} project?', ar: 'تخطط لمشروع {material}؟' },
  optionsTitle: { en: 'Options & finishes', ar: 'الخيارات والتشطيبات' },
  optionsTabs:  { en: 'Option categories', ar: 'فئات الخيارات' },
  optionsSub:   { en: 'Filter', ar: 'تصفية' },
  all:          { en: 'All', ar: 'الكل' },
  openItem:     { en: 'View details', ar: 'عرض التفاصيل' },
  // Main option tabs — order is the tab order
  tabs: {
    colours:     { en: 'Colours', ar: 'الألوان' },
    designs:     { en: 'Designs', ar: 'التصاميم' },
    glass:       { en: 'Glass', ar: 'الزجاج' },
    accessories: { en: 'Accessories', ar: 'الإكسسوارات' },
  },
  glassGroups: {
    performance: { en: 'Performance', ar: 'عالي الأداء' },
    decorative:  { en: 'Decorative', ar: 'زخرفي' },
  },
  // Accessory sub-tabs, keyed by AccessoryKind (only kinds with items are shown)
  kinds: {
    'handle':         { en: 'Handles', ar: 'المقابض' },
    'sliding-lock':   { en: 'Sliding locks', ar: 'أقفال منزلقة' },
    'cylinder':       { en: 'Cylinders', ar: 'الأسطوانات' },
    'door-lock':      { en: 'Door locks', ar: 'أقفال الأبواب' },
    'hinge':          { en: 'Hinges', ar: 'المفصلات' },
    'roller':         { en: 'Rollers', ar: 'البكرات' },
    'closer-stopper': { en: 'Closers & stoppers', ar: 'المُغلقات والمصدّات' },
    'side-arm':       { en: 'Side arms', ar: 'الأذرع الجانبية' },
    'flyscreen':      { en: 'Flyscreens', ar: 'شبك الحشرات' },
  },
  // Lightbox detail-panel labels
  detail: {
    collection: { en: 'Collection', ar: 'المجموعة' },
    code:       { en: 'Code', ar: 'الرمز' },
    category:   { en: 'Category', ar: 'الفئة' },
    colour:     { en: 'Colour', ar: 'اللون' },
    colours:    { en: 'Colours', ar: 'الألوان' },
    supplier:   { en: 'Supplier', ar: 'المورّد' },
    type:       { en: 'Type', ar: 'النوع' },
    brand:      { en: 'Brand', ar: 'العلامة التجارية' },
    origin:     { en: 'Origin', ar: 'بلد المنشأ' },
    spec:       { en: 'Specification', ar: 'المواصفات' },
    note:       { en: 'Note', ar: 'ملاحظة' },
  },
} as const;
