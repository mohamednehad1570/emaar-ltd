/**
 * lib/data/lightboxCopy.ts
 * Labels for the shared components/ui/Lightbox (type-page gallery now, Options in Batch 5).
 * Components read this through uiStrings.ts, never directly.
 */

export const LIGHTBOX_COPY = {
  dialog:   { en: 'Image viewer', ar: 'عارض الصور' },
  close:    { en: 'Close', ar: 'إغلاق' },
  previous: { en: 'Previous image', ar: 'الصورة السابقة' },
  next:     { en: 'Next image', ar: 'الصورة التالية' },
} as const;
