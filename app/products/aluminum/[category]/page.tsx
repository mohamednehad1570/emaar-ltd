import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { SanityProductTile } from '@/lib/sanity/types';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

// ── Category taxonomy — hardcoded so generateStaticParams works without network ──

// stained-glass and sandblast moved to /products/glass
const ALUMINUM_CATEGORIES = ['windows','doors','doors-and-windows','staircases','skylights','pergola','frameless-doors','security-system','handrails','acp-panels'] as const;

const CATEGORY_LABELS: Record<string, string> = {
  windows:             'Windows',
  doors:               'Doors',
  'doors-and-windows': 'Doors & Windows',
  staircases:          'Staircases',
  skylights:           'Skylights',
  pergola:             'Pergola',
  'frameless-doors':   'Frameless Doors',
  'security-system':   'Security System',
  handrails:           'Handrails',
  'acp-panels':        'ACP Panels',
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
