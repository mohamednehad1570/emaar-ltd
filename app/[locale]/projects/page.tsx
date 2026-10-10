import ProjectsGrid from '@/components/projects/ProjectsGrid';
import ProjectCTA from '@/components/projects/ProjectCTA';
import { ALL_PROJECTS } from '@/lib/data/projectContent';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('projects', await routeLocale(params), '/projects');
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-off-white">
      {/* No Suspense: ProjectsGrid no longer reads useSearchParams, so it server-renders */}
      <ProjectsGrid projects={ALL_PROJECTS} />
      <ProjectCTA />
    </div>
  );
}
