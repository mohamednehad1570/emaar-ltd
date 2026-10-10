/**
 * app/[locale]/about/page.tsx — About page (server component)
 *
 * Static — AboutPageClient reads its copy from lib/data/about.ts via uiStrings.
 */

import type { Metadata } from 'next';
import AboutPageClient from '@/components/about/AboutPageClient';
import { AWARDS } from '@/lib/data/awards';
import PageHeader from '@/components/ui/PageHeader';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('about', await routeLocale(params), '/about');
}

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company"
        title="About Emaar"
        titleAr="عن إعمار"
        description="26 years manufacturing uPVC, Aluminum, and Glass systems in the UAE."
        chips={['Est. 2000', 'SAIF Zone Sharjah', '50,000 sqft factory']}
      />
      <AboutPageClient awards={AWARDS} />
    </>
  );
}
