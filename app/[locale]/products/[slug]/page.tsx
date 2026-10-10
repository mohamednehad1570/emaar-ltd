/**
 * app/[locale]/products/[slug]/page.tsx
 * Shared product-type page — one static page per catalog type (22) per locale. Material pages
 * live at /upvc and /aluminum; reserved slugs are guarded by scripts/validate-catalog.ts.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TypePage from '@/components/catalog/type/TypePage';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { getTypeBySlug, getTypes } from '@/lib/data/catalog';
import { typePageProps } from '@/lib/catalogPageData';
import { BRAND } from '@/lib/data/pageMeta';
import { routeLocale } from '@/lib/i18n/routeLocale';

// First sentence only (Latin or Arabic terminator), hard-capped at 155 chars
// (search-snippet length) on a word boundary
function metaDescription(text: string): string {
  const first = text.match(/^.*?[.!?؟](?=\s|$)/)?.[0] ?? text;
  if (first.length <= 155) return first;
  return `${first.slice(0, 154).replace(/\s+\S*$/, '')}…`;
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// Unlisted slugs 404 at request time (localized app/not-found.tsx) instead of rendering on demand
export const dynamicParams = false;

// Runs once per parent locale param → every type is prerendered in both languages
export function generateStaticParams() {
  return getTypes().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await routeLocale(params);
  const type = getTypeBySlug((await params).slug);
  if (!type) return {};
  const name = type.name[locale];
  return generatePageMetadata({
    locale,
    title: name,
    // Placeholder types carry unverified copy — keep it out of search snippets too
    description: type.placeholder
      ? (locale === 'ar' ? `${name} من ${BRAND.ar}.` : `${name} by ${BRAND.en}.`)
      : metaDescription(type.description[locale]),
    path: `/products/${type.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const type = getTypeBySlug((await params).slug);
  if (!type) notFound();
  return <TypePage view={typePageProps(type)} />;
}
