/**
 * lib/seo/site.ts
 * Production origin — the ONE place it is defined. Metadata (canonical + hreflang),
 * the sitemap, robots.txt and JSON-LD all build absolute URLs from it.
 * NEXT_PUBLIC_SITE_URL overrides it (e.g. a Vercel preview); no trailing slash.
 */

import { localizePath } from '@/lib/i18n/localizePath';
import type { Locale } from '@/lib/i18n/locales';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://emaarupvc.ae').replace(/\/$/, '');

/** Absolute URL of a locale-neutral path in one language: absoluteUrl('/upvc', 'ar') → https://…/ar/upvc */
export const absoluteUrl = (path: string, locale: Locale): string => `${SITE_URL}${localizePath(path, locale)}`;

/** hreflang map for one page — x-default points at the English URL. */
export function languageAlternates(path: string): Record<'en' | 'ar' | 'x-default', string> {
  return { en: absoluteUrl(path, 'en'), ar: absoluteUrl(path, 'ar'), 'x-default': absoluteUrl(path, 'en') };
}
