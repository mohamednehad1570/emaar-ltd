/**
 * app/[locale]/about/page.tsx — About page (server component)
 *
 * Static — AboutPageClient reads its copy from lib/data/about.ts via uiStrings.
 */

import type { Metadata } from 'next';
import AboutPageClient from '@/components/about/AboutPageClient';
import { AWARDS } from '@/lib/data/awards';
import PageHeader from '@/components/ui/PageHeader';
import { PAGE_HEADERS } from '@/lib/data/uiStrings';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('about', await routeLocale(params), '/about');
}

export default function AboutPage() {
  return (
    <>
      <PageHeader copy={PAGE_HEADERS.about} />
      <AboutPageClient awards={AWARDS} />
    </>
  );
}
