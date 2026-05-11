/**
 * app/projects/[id]/page.tsx
 *
 * Server route — resolves the id param and delegates rendering to
 * ProjectDetailPage (client component, needs useLanguage).
 * generateStaticParams pre-builds one route per project at build time.
 */

import { notFound } from 'next/navigation';
import ProjectDetailPage from '@/components/projects/ProjectDetailPage';
import { projectsData } from '@/lib/data/projects';

type Params = Promise<{ id: string }>;

export async function generateStaticParams() {
  return projectsData.map(p => ({ id: String(p.id) }));
}

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  const numericId = Number(id);

  /* Non-numeric or out-of-range id → 404 rather than a broken page */
  if (isNaN(numericId) || !projectsData.find(p => p.id === numericId)) notFound();

  return <ProjectDetailPage id={numericId} />;
}
