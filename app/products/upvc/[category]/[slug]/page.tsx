import { notFound } from 'next/navigation';
import { upvcCategories } from '@/lib/data/products';
import { productDetails } from '@/lib/data/productDetails';
import { getProductBySlug } from '@/lib/sanity/fetch';
import ProductDetailPage from '@/components/products/ProductDetailPage';

export const revalidate = 3600;

type Params = Promise<{ category: string; slug: string }>;

// Static params from lib/data — build succeeds when Sanity is empty
export function generateStaticParams() {
  return upvcCategories.flatMap((cat) =>
    cat.products.map((p) => ({ category: cat.slug, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = productDetails[slug];
  if (!detail) return {};
  return { title: `${slug} — uPVC | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category, slug } = await params;

  // Validate that this category is a known uPVC category
  const validCategory = upvcCategories.some((c) => c.slug === category);
  if (!validCategory) notFound();

  // Sanity-first: if no CMS record and no static record, 404
  const detail = productDetails[slug];
  const sanityProduct = await getProductBySlug(slug, 'upvc');
  if (!detail && !sanityProduct) notFound();

  return <ProductDetailPage slug={slug} sanityProduct={sanityProduct} />;
}
