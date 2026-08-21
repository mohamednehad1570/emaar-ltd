import { getAllProducts } from '@/lib/sanity/fetch';
import ProductsPageClient from '@/components/products/ProductsPageClient';

export const revalidate = 3600;

export const metadata = { title: 'Products — Emaar International' };

export default async function Page() {
  const products = await getAllProducts();
  return <ProductsPageClient products={products} />;
}
