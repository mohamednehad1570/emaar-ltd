/**
 * app/products/[slug]/page.tsx
 * Shared product-type page — one static page per catalog type (22). Material pages
 * live at /upvc and /aluminum; reserved slugs are guarded by scripts/validate-catalog.ts.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TypePageBare from '@/components/catalog/TypePageBare';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getTypeBySlug, getTypes } from '@/lib/data/catalog';
import { typeAvailability } from '@/lib/catalogPageData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Unlisted slugs 404 at request time instead of rendering on demand
export const dynamicParams = false;

export function generateStaticParams() {
  return getTypes().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const type = getTypeBySlug((await params).slug);
  if (!type) return {};
  return generatePageMetadata({
    title: type.name.en,
    // Placeholder types carry unverified copy — keep it out of search snippets too
    description: type.placeholder ? `${type.name.en} by Emaar International.` : type.description.en,
    path: `/products/${type.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const type = getTypeBySlug((await params).slug);
  if (!type) notFound();
  return <TypePageBare type={type} availability={typeAvailability(type)} />;
}
