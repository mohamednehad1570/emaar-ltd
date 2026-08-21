import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { SanityProductTile } from '@/lib/sanity/types';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

// ── Category taxonomy — hardcoded so generateStaticParams works without network ──

const ALUMINUM_CATEGORIES = ['windows','doors','doors-and-windows','staircases','skylights','stained-glass','sandblast'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  windows:             'Windows',
  doors:               'Doors',
  'doors-and-windows': 'Doors & Windows',
  staircases:          'Staircases',
  skylights:           'Skylights',
  'stained-glass':     'Stained Glass',
  sandblast:           'Sandblast',
}

export function generateStaticParams() {
  return ALUMINUM_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};
  return { title: `${label} — Aluminium | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;

  if (!(ALUMINUM_CATEGORIES as readonly string[]).includes(category)) notFound();

  let products: SanityProductTile[] = [];
  try {
    products = await sanityFetch<SanityProductTile[]>(productsByCategoryQuery, { material: 'aluminum', category });
  } catch {}

  return <ProductCategoryPage material="aluminum" category={category} sanityProducts={products} />;
}
