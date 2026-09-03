import { notFound } from 'next/navigation';
import { sanityFetch } from '@/lib/sanity/client';
// productStaticParamsQuery is a minimal query with its own CDN cache key — avoids the
// stale CDN cache that was returning raw slug objects instead of plain strings.
import { productStaticParamsQuery, productBySlugQuery } from '@/lib/sanity/queries';
import type { SanityProductParam, SanityProductFull } from '@/lib/sanity/types';
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
    // productStaticParamsQuery fetches ONLY slug/material/category — no asset joins.
    // Its unique query string gives the Sanity CDN a fresh cache key, bypassing any
    // stale cached response from allProductsQuery that returned slug as an object.
    const all = await sanityFetch<SanityProductParam[]>(productStaticParamsQuery);

    // Type predicate narrows SanityProductParam (nullable fields) to a guaranteed
    // { slug: string; category: string } shape so the map needs no casts.
    const upvc = all.filter(
      (p): p is { slug: string; material: 'upvc'; category: string } =>
        p.material === 'upvc' &&
        typeof p.slug === 'string'     && p.slug.length > 0 &&
        typeof p.category === 'string' && p.category.length > 0,
    );

    if (upvc.length > 0) {
      // Both fields are guaranteed strings by the type predicate above — no casts needed.
      return upvc.map((p) => ({ category: p.category, slug: p.slug }));
    }
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
