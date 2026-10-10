/**
 * app/[locale]/layout.tsx — the document for every page, one prerendered tree per language.
 *
 * English is served at unprefixed URLs (proxy.ts rewrites /upvc → /en/upvc) and Arabic at
 * /ar/…, so <html lang dir> and every string are correct in the server HTML — before any
 * JavaScript runs, and for crawlers. SiteShell renders the document; the locale reaches
 * client components through LanguageProvider, and server components read it from params.
 */

import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import { BRAND, PAGE_META } from '@/lib/data/pageMeta';
import { OG_LOCALE } from '@/lib/i18n/locales';
import { localeStaticParams, routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';
import { SITE_URL } from '@/lib/seo/site';

// Only /en and /ar are prerendered; any other value 404s instead of rendering on demand
// (proxy.ts never forwards one — unknown first segments are rewritten under /en)
export const dynamicParams = false;
export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await routeLocale(params);
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default:  `${PAGE_META.home.title[locale]} — ${BRAND[locale]}`,
      template: `%s — ${BRAND[locale]}`,
    },
    description: PAGE_META.home.description[locale],
    openGraph: { siteName: BRAND[locale], locale: OG_LOCALE[locale], type: 'website' },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: LocaleParams }>) {
  return <SiteShell locale={await routeLocale(params)}>{children}</SiteShell>;
}
