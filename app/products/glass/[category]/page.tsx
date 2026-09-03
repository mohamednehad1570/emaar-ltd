import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { SanityProductTile } from '@/lib/sanity/types';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

// ── Glass category taxonomy — hardcoded so generateStaticParams works without network ──

const GLASS_CATEGORIES = ['double-glazing','stained-glass','sandblast','georgian-bar'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  'double-glazing': 'Double Glazing',
  'stained-glass':  'Stained Glass',
  sandblast:        'Sandblast',
  'georgian-bar':   'Georgian Bar & Islamic Design',
};

export function generateStaticParams() {
  return GLASS_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};
  return { title: `${label} — Glass | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;

  // Guard against unknown category slugs entered directly in the URL
  if (!(GLASS_CATEGORIES as readonly string[]).includes(category)) notFound();

  let products: SanityProductTile[] = [];
  try {
    products = await sanityFetch<SanityProductTile[]>(productsByCategoryQuery, { material: 'glass', category });
  } catch {}

  return <ProductCategoryPage material="glass" category={category} sanityProducts={products} />;
}
