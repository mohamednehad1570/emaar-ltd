/**
 * lib/i18n/rtlFlip.ts
 * The one class that mirrors a graphic on Arabic pages: `scale: -1 1` under [dir=rtl], a
 * no-op in English. Tailwind v4 writes it to the standalone CSS `scale` property, so it
 * composes with rotate/translate utilities and Framer Motion transforms. Shared by
 * DirectionalIcon (arrows, carets) and the catalog drawings (pictograms, hotspot diagrams).
 * Kept free of imports so server components can use it too.
 */
export const RTL_FLIP = 'rtl:-scale-x-100';
