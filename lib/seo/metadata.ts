/**
 * lib/seo/metadata.ts
 *
 * One Metadata object per page per locale:
 *   canonical            → this URL in this language (self)
 *   alternates.languages → en + ar + x-default (= English URL) — the hreflang cluster
 *   openGraph.locale     → en_AE / ar_AE, alternateLocale the other one
 * `path` is always locale-neutral ('/upvc'); the locale prefix is added here.
 */

import type { Metadata } from 'next';
import { OG_LOCALE, type Locale } from '@/lib/i18n/locales';
import { BRAND, PAGE_META, type PageKey } from '@/lib/data/pageMeta';
import { SITE_URL, absoluteUrl, languageAlternates } from './site';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

export interface PageMetadataInput {
  locale:      Locale;
  title:       string;
  description: string;
  path:        string;
  ogImage?:    string;
  noIndex?:    boolean;
}

export function generatePageMetadata({
  locale, title, description, path, ogImage, noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path, locale);
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  // Brand suffix lives only in the [locale] layout's title.template — adding it here too
  // produced "X — Emaar International — Emaar International". OG/Twitter titles
  // don't pass through the template, so they keep the suffix explicitly.
  const brandedTitle = `${title} — ${BRAND[locale]}`;

  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title: brandedTitle,
      description,
      url: canonical,
      siteName: BRAND[locale],
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === 'en' ? 'ar' : 'en'],
      type: 'website',
      images: [{ url: resolvedOgImage, width: 1200, height: 630, alt: brandedTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: brandedTitle,
      description,
      images: [resolvedOgImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Static pages: copy comes from PAGE_META, so a route file is one line. */
export function pageMetadata(key: PageKey, locale: Locale, path: string): Metadata {
  const { title, description } = PAGE_META[key];
  return generatePageMetadata({ locale, title: title[locale], description: description[locale], path });
}
