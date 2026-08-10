import { Suspense } from 'react';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import CTASection from '@/components/home/CTASection';
import { sanityFetch } from '@/lib/sanity/client';
import { projectsQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';

export const revalidate = 3600;

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
