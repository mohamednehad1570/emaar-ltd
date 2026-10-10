/**
 * app/sitemap.ts
 * Every page in both languages. Each <url> carries the full hreflang cluster
 * (en · ar · x-default = English), matching the alternates in each page's metadata.
 */

import type { MetadataRoute } from 'next';
import { getTypes } from '@/lib/data/catalog';
import { LOCALES } from '@/lib/i18n/locales';
import { absoluteUrl, languageAlternates } from '@/lib/seo/site';

type Entry = { path: string; changeFrequency: 'weekly' | 'monthly' | 'yearly'; priority: number };

const PAGES: Entry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1.0 },

  // Material landing pages
  { path: '/upvc',     changeFrequency: 'monthly', priority: 0.9 },
  { path: '/aluminum', changeFrequency: 'monthly', priority: 0.9 },

  // Shared product-type pages — one per catalog type
  ...getTypes().map((t): Entry => ({ path: `/products/${t.slug}`, changeFrequency: 'monthly', priority: 0.8 })),

  // Projects — residential/commercial are #anchors on this page, not sub-routes
  { path: '/projects', changeFrequency: 'monthly', priority: 0.8 },

  // Brand / trust pages
  { path: '/about',         changeFrequency: 'yearly', priority: 0.7 },
  { path: '/why-choose-us', changeFrequency: 'yearly', priority: 0.7 },

  // Utility pages
  { path: '/contact',   changeFrequency: 'yearly',  priority: 0.8 },
  { path: '/faq',       changeFrequency: 'monthly', priority: 0.6 },
  { path: '/technical', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/careers',   changeFrequency: 'monthly', priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.flatMap(({ path, changeFrequency, priority }) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(path, locale),
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
