import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { SanityProductTile } from '@/lib/sanity/types';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

// ── Category taxonomy — hardcoded so generateStaticParams works without network ──

// stained-glass and sandblast moved to /products/glass
const UPVC_CATEGORIES = ['windows','doors','doors-and-windows','staircases','hebeschibe'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  windows:             'Windows',
  doors:               'Doors',
  'doors-and-windows': 'Doors & Windows',
  staircases:          'Staircases',
  hebeschibe:          'Hebeschibe',
}

// Statically generates one page per uPVC category — build succeeds without network
export function generateStaticParams() {
  return UPVC_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};
  return { title: `${label} — uPVC | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;

  // Guard against unknown category slugs entered directly in the URL
  if (!(UPVC_CATEGORIES as readonly string[]).includes(category)) notFound();

  let products: SanityProductTile[] = [];
  try {
    products = await sanityFetch<SanityProductTile[]>(productsByCategoryQuery, { material: 'upvc', category });
  } catch {}

  return <ProductCategoryPage material="upvc" category={category} sanityProducts={products} />;
}
