/**
 * app/global-not-found.tsx — the site's 404, localized and fully server-rendered.
 * (experimental.globalNotFound in next.config.ts)
 *
 * Every miss lands here: unknown paths, unknown /products/[slug] (dynamicParams = false)
 * and file-like paths the proxy skips. Why not a not-found.tsx:
 *   • [locale]/not-found.tsx — a notFound() caught by a nested boundary is NOT server-
 *     rendered (the HTML is an empty __next_error__ shell, filled after hydration);
 *   • app/not-found.tsx — sits in every page's tree, so its headers() call made ALL pages ƒ.
 * global-not-found is resolved at routing level, outside the page trees, so pages stay static.
 * It has no params: the language comes from the x-site-locale header proxy.ts sets
 * (missing → English). Next adds <meta name="robots" content="noindex"> itself.
 */

import type { Metadata } from 'next';
import { headers } from 'next/headers';
import SiteShell from '@/components/layout/SiteShell';
import NotFoundView from '@/components/layout/NotFoundView';
import { BRAND, PAGE_META } from '@/lib/data/pageMeta';
import { LOCALE_HEADER, isLocale, type Locale } from '@/lib/i18n/locales';

async function requestLocale(): Promise<Locale> {
  const raw = (await headers()).get(LOCALE_HEADER) ?? '';
  return isLocale(raw) ? raw : 'en';
}

// global-not-found bypasses the [locale] layout, so it carries its own (localized) head tags
export async function generateMetadata(): Promise<Metadata> {
  const locale = await requestLocale();
  return {
    title: `${PAGE_META.notFound.title[locale]} — ${BRAND[locale]}`,
    description: PAGE_META.notFound.description[locale],
  };
}

export default async function GlobalNotFound() {
  const locale = await requestLocale();

  return (
    <SiteShell locale={locale}>
      <NotFoundView />
    </SiteShell>
  );
}
