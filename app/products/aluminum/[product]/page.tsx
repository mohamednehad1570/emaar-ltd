import { notFound } from 'next/navigation';
import { productDetails } from '@/lib/data/productDetails';
import ProductDetailPage from '@/components/products/ProductDetailPage';

type Params = Promise<{ product: string }>;

export function generateStaticParams() {
  return Object.values(productDetails)
    .filter(d => d.material === 'aluminum')
    .map(d => ({ product: d.slug }));
}

export default async function Page({ params }: { params: Params }) {
  const { product } = await params;
  const detail = productDetails[product];
  if (!detail || detail.material !== 'aluminum') notFound();
  return <ProductDetailPage slug={product} />;
}
