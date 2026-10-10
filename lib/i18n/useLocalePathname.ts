/**
 * Locale-neutral pathname ('/upvc' on both /upvc and /ar/upvc).
 *
 * Why not usePathname() directly: English pages are prerendered at /en/upvc but served
 * at /upvc through the proxy rewrite, so the server sees '/en/upvc' while the browser
 * sees '/upvc' — reading the raw value would mismatch on hydration (Next docs:
 * "Avoid hydration mismatch with rewrites"). Stripping the prefix makes both agree.
 */

import { usePathname } from 'next/navigation';
import { stripLocale } from './localizePath';

export function useLocalePathname(): string {
  return stripLocale(usePathname() ?? '/').path;
}
