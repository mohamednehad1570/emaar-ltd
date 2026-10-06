import { Suspense } from 'react';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectCTA from '@/components/projects/ProjectCTA';
import { ALL_PROJECTS } from '@/lib/data/projectContent';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const metadata = generatePageMetadata({
  title:       'Our Projects',
  description: 'Browse Emaar International\'s portfolio of uPVC and aluminium fenestration projects across UAE villas, buildings, and towers.',
  path:        '/projects',
});

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center" />}>
        <ProjectsGrid projects={ALL_PROJECTS} />
      </Suspense>
      <ProjectCTA />
    </div>
  );
}
