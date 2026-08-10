import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/projects/ProjectDetailPage';
import { sanityFetch } from '@/lib/sanity/client';
import { projectsQuery, projectBySlugQuery } from '@/lib/sanity/queries';
import { projectsData } from '@/lib/data/projects';
import type { SanityProject } from '@/lib/sanity/types';

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  const projects = await sanityFetch<SanityProject[]>(projectsQuery);
  if (projects.length > 0) {
    return projects.map(p => ({ id: p.slug }));
  }
  // Fallback: static numeric IDs while Sanity is empty
  return projectsData.map(p => ({ id: String(p.id) }));
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  // Try Sanity first (slug-based)
  const sanityProject = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug: id });
  if (sanityProject) {
    return <ProjectDetailPage project={sanityProject} />;
  }

  // Fallback to static data (numeric ID) while Sanity is empty
  const numericId = Number(id);
  const staticProject = !isNaN(numericId) ? projectsData.find(p => p.id === numericId) : null;
  if (!staticProject) notFound();

  const project: SanityProject = {
    _id: String(staticProject.id),
    slug: String(staticProject.id),
    title: staticProject.title,
    type: staticProject.type,
    materialsUsed: [staticProject.material],
    year: parseInt(staticProject.year),
    location: staticProject.location,
    images: [staticProject.image, ...staticProject.gallery],
    stats: [],
    description: staticProject.description,
    client: staticProject.client,
    scope: staticProject.scope,
  };

  return <ProjectDetailPage project={project} />;
}
