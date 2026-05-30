import { notFound } from 'next/navigation';
import { productDetails } from '@/lib/data/productDetails';
import ProductDetailPage from '@/components/products/ProductDetailPage';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(productDetails).map(slug => ({ slug }));
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  if (!productDetails[slug]) notFound();
  return <ProductDetailPage slug={slug} />;
}
