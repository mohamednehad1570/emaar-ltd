import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
import { allProductsQuery, productBySlugQuery } from '@/lib/sanity/queries';
import type { SanityProductTile, SanityProductFull } from '@/lib/sanity/types';
import ProductDetailPage from '@/components/products/ProductDetailPage';

export const revalidate = 3600;

type Params = Promise<{ category: string; slug: string }>;

// ── Category set — used for URL validation ─────────────────────────────────────

const UPVC_CATEGORIES = new Set(['windows','doors','doors-and-windows','staircases','stained-glass','sandblast','hebeschibe']);

// ── Static fallback slugs — used when Sanity is empty at build time ───────────

const UPVC_FALLBACK_PARAMS = [
  { category: 'windows',           slug: 'tilt-turn-window'     },
  { category: 'windows',           slug: 'casement-window'      },
  { category: 'windows',           slug: 'fixed-light-window'   },
  { category: 'doors',             slug: 'front-door'           },
  { category: 'doors',             slug: 'french-door'          },
  { category: 'doors',             slug: 'sliding-patio-door'   },
  { category: 'doors-and-windows', slug: 'residential-suite'    },
  { category: 'staircases',        slug: 'pvc-balustrade'       },
  { category: 'stained-glass',     slug: 'stained-glass-window' },
  { category: 'sandblast',         slug: 'sandblast-panel'      },
  { category: 'hebeschibe',        slug: 'lift-slide-door'      },
];

export async function generateStaticParams() {
  try {
    const all = await sanityFetch<SanityProductTile[]>(allProductsQuery);
    const upvc = all.filter((p) => p.material === 'upvc');
    if (upvc.length > 0) return upvc.map((p) => ({ category: p.category, slug: p.slug }));
  } catch {}
  return UPVC_FALLBACK_PARAMS;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  try {
    const product = await sanityFetch<SanityProductFull | null>(productBySlugQuery, { slug });
    if (product?.title) return { title: `${product.title.en} — uPVC | Emaar International` };
  } catch {}
  return { title: `${slug} — uPVC | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category, slug } = await params;

  // Reject unknown category path segments — 404 rather than invalid product context
  if (!UPVC_CATEGORIES.has(category)) notFound();

  let product: SanityProductFull | null = null;
  try {
    product = await sanityFetch<SanityProductFull | null>(productBySlugQuery, { slug });
  } catch {}

  if (!product) notFound();
  return <ProductDetailPage product={product} />;
}
