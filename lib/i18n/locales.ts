/**
 * lib/i18n/locales.ts
 * The two site locales. English is the default and lives at unprefixed URLs (/upvc);
 * Arabic lives under /ar (/ar/upvc). proxy.ts rewrites unprefixed paths to /en/… so
 * both languages render from the same app/[locale] tree.
 */

export const LOCALES = ['en', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** Writing direction per locale — the server renders it on <html dir>. */
export const dirFor = (locale: Locale): 'ltr' | 'rtl' => (locale === 'ar' ? 'rtl' : 'ltr');

/** Open Graph locale codes — UAE market for both languages. */
export const OG_LOCALE: Record<Locale, string> = { en: 'en_AE', ar: 'ar_AE' };

/**
 * Request header proxy.ts stamps on every page request ('en' | 'ar'). Only the root 404
 * (app/not-found.tsx) reads it — it has no [locale] param, but must answer in the
 * language of the URL that missed. Pages never read it, so they stay static.
 */
export const LOCALE_HEADER = 'x-site-locale';
