import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/projects/ProjectDetailPage';
import { sanityFetch } from '@/lib/sanity/client';
import { projectsQuery, projectBySlugQuery } from '@/lib/sanity/queries';
import type { SanityProject } from '@/lib/sanity/types';

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  try {
    const projects = await sanityFetch<SanityProject[]>(projectsQuery);
    return projects.map((p) => ({ id: p.slug }));
  } catch {
    // If Sanity is unreachable at build time, return empty — pages are rendered
    // on-demand at request time (no pre-rendering, no build failure)
    return [];
  }
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  let project: SanityProject | null = null;
  try {
    project = await sanityFetch<SanityProject | null>(projectBySlugQuery, { slug: id });
  } catch {}

  if (!project) notFound();
  return <ProjectDetailPage project={project} />;
}
