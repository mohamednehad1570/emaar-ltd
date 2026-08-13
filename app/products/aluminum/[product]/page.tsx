import { notFound } from 'next/navigation';
import { productDetails } from '@/lib/data/productDetails';
import { getProductBySlug } from '@/lib/sanity/fetch';
import ProductDetailPage from '@/components/products/ProductDetailPage';

export const revalidate = 3600;

type Params = Promise<{ product: string }>;

// Static params built from lib/data so pages build even when CMS is empty
export function generateStaticParams() {
  return Object.values(productDetails)
    .filter(d => d.material === 'aluminum')
    .map(d => ({ product: d.slug }));
}

export default async function Page({ params }: { params: Params }) {
  const { product } = await params;
  const detail = productDetails[product];
  if (!detail || detail.material !== 'aluminum') notFound();

  // Fetch CMS data; null when Sanity is empty — component falls back to static
  const sanityProduct = await getProductBySlug(product, 'aluminum');

  return <ProductDetailPage slug={product} sanityProduct={sanityProduct} />;
}
