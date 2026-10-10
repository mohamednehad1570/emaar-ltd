/**
 * lib/i18n/localizePath.ts
 *
 * Pure path helpers shared by LocaleLink, the language toggle, metadata and the sitemap.
 *   localizePath('/upvc#glass', 'ar')  → '/ar/upvc#glass'
 *   localizePath('/ar/upvc', 'en')     → '/upvc'          (English is never prefixed)
 *   localizePath('/', 'ar')            → '/ar'
 * Query strings and hash fragments are preserved. Anything that is not an internal
 * absolute path (hash-only, mailto:, tel:, https://, protocol-relative //) is returned untouched.
 */

import { DEFAULT_LOCALE, isLocale, type Locale } from './locales';

/** True for site-internal absolute paths ('/x'), false for '//host', '#x', 'mailto:' … */
export const isInternalPath = (href: string): boolean => href.startsWith('/') && !href.startsWith('//');

/** Splits '/a/b?q=1#h' into its pathname and the untouched '?q=1#h' suffix. */
function splitSuffix(href: string): [string, string] {
  const cut = href.search(/[?#]/);
  return cut === -1 ? [href, ''] : [href.slice(0, cut), href.slice(cut)];
}

/**
 * Locale prefix + locale-neutral pathname for a raw pathname.
 * '/ar/upvc' → { locale: 'ar', path: '/upvc' }; '/en' → { locale: 'en', path: '/' };
 * '/upvc' → { locale: null, path: '/upvc' } (no prefix = English after the proxy rewrite).
 */
export function stripLocale(pathname: string): { locale: Locale | null; path: string } {
  const first = pathname.split('/')[1] ?? '';
  if (!isLocale(first)) return { locale: null, path: pathname || '/' };
  return { locale: first, path: pathname.slice(first.length + 1) || '/' };
}

export function localizePath(href: string, locale: Locale): string {
  if (!isInternalPath(href)) return href;
  const [pathname, suffix] = splitSuffix(href);
  const { path } = stripLocale(pathname);
  if (locale === DEFAULT_LOCALE) return `${path}${suffix}`;
  // '/' maps to the bare '/ar' — never '/ar/' (trailing slash would 308 first)
  return `/${locale}${path === '/' ? '' : path}${suffix}`;
}
