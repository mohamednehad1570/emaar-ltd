/**
 * app/about/page.tsx — About page (server component)
 *
 * Fetches CMS data and passes it down to the client component.
 * If the CMS is empty, AboutPageClient falls back to static lib/data/about.ts.
 */

import type { Metadata } from 'next';
import { getSiteSettings, getTeamMembers } from '@/lib/sanity/fetch';
import AboutPageClient from '@/components/about/AboutPageClient';
import { generatePageMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'About Us — UAE Windows & Doors Manufacturer',
    description: 'Learn about Emaar International\'s story, manufacturing process, certifications, and the team behind the UAE\'s leading uPVC and aluminium systems manufacturer.',
    path:        '/about',
  });
}

export const revalidate = 3600;

export default async function AboutPage() {
  const [settings, teamMembers] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
  ]);

  return (
    <AboutPageClient
      companyBio={settings?.companyBio}
      foundedYear={settings?.foundedYear}
      teamMembers={teamMembers}
    />
  );
}
