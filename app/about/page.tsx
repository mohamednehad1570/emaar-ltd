/**
 * app/about/page.tsx — About page (server component)
 *
 * Fetches CMS data and passes it down to the client component.
 * If the CMS is empty, AboutPageClient falls back to static lib/data/about.ts.
 */

import { getSiteSettings, getTeamMembers } from '@/lib/sanity/fetch';
import AboutPageClient from '@/components/about/AboutPageClient';

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
