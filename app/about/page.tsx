/**
 * app/about/page.tsx — About page (server component)
 *
 * Static — AboutPageClient reads its copy from lib/data/about.ts via uiStrings.
 */

import type { Metadata } from 'next';
import AboutPageClient from '@/components/about/AboutPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { generatePageMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'About Us — UAE Windows & Doors Manufacturer',
    description: 'Learn about Emaar International\'s story, manufacturing process, certifications, and the team behind the UAE\'s leading uPVC and aluminium systems manufacturer.',
    path:        '/about',
  });
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
      <AboutPageClient />
    </>
  );
}
