/**
 * lib/fonts.ts
 * Cairo — the site's only typeface. Declared once here because two documents use it:
 * the [locale] layout and the root not-found page (both render their own <html>).
 */

import { Cairo } from 'next/font/google';

export const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});
