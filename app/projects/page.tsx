import { Suspense } from 'react';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import CTASection from '@/components/home/CTASection';
import { sanityFetch } from '@/lib/sanity/client';
import { projectsQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title:       'Our Projects',
  description: 'Browse Emaar International\'s portfolio of uPVC and aluminium fenestration projects across UAE villas, buildings, and towers.',
  path:        '/projects',
});

export default async function ProjectsPage() {
  const projects = await sanityFetch<SanityProject[]>(projectsQuery);

  return (
    <div className="min-h-screen bg-off-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center" />}>
        <ProjectsGrid projects={projects} />
      </Suspense>
      <CTASection whatsappContext={{ page: 'projects' }} />
    </div>
  );
}
