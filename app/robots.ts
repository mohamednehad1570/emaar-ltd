import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo/site';

// One sitemap lists both languages (see app/sitemap.ts), so one pointer covers /ar too
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/preview/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
