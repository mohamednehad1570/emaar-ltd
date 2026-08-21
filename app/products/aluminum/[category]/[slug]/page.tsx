import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { allProductsQuery, productBySlugQuery } from '@/lib/sanity/queries';
import type { SanityProductTile, SanityProductFull } from '@/lib/sanity/types';
import ProductDetailPage from '@/components/products/ProductDetailPage';

export const revalidate = 3600;

type Params = Promise<{ category: string; slug: string }>;

// ── Category set — used for URL validation ─────────────────────────────────────

const ALUMINUM_CATEGORIES = new Set(['windows','doors','doors-and-windows','staircases','skylights','stained-glass','sandblast']);

// ── Static fallback slugs — used when Sanity is empty at build time ───────────

const ALUMINUM_FALLBACK_PARAMS = [
  { category: 'windows',           slug: 'casement-window'     },
  { category: 'windows',           slug: 'tilt-turn-window'    },
  { category: 'doors',             slug: 'sliding-door'        },
  { category: 'doors',             slug: 'bi-fold-door'        },
  { category: 'doors',             slug: 'entrance-door'       },
  { category: 'doors-and-windows', slug: 'curtain-wall'        },
  { category: 'staircases',        slug: 'glass-staircase'     },
  { category: 'skylights',         slug: 'flat-roof-skylight'  },
  { category: 'stained-glass',     slug: 'stained-glass-panel' },
  { category: 'sandblast',         slug: 'sandblast-glass'     },
];

export async function generateStaticParams() {
  try {
    const all = await sanityFetch<SanityProductTile[]>(allProductsQuery);
    const aluminum = all.filter((p) => p.material === 'aluminum');
    if (aluminum.length > 0) return aluminum.map((p) => ({ category: p.category, slug: p.slug }));
  } catch {}
  return ALUMINUM_FALLBACK_PARAMS;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  try {
    const product = await sanityFetch<SanityProductFull | null>(productBySlugQuery, { slug });
    if (product?.title) return { title: `${product.title.en} — Aluminium | Emaar International` };
  } catch {}
  return { title: `${slug} — Aluminium | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category, slug } = await params;

  if (!ALUMINUM_CATEGORIES.has(category)) notFound();

  let product: SanityProductFull | null = null;
  try {
    product = await sanityFetch<SanityProductFull | null>(productBySlugQuery, { slug });
  } catch {}

  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
