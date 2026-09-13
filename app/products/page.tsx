import { getAllProducts } from '@/lib/sanity/fetch';
import ProductsPageClient from '@/components/products/ProductsPageClient';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: 'Products',
  description: 'Explore Emaar International\'s full range of uPVC windows and doors, aluminium systems, and bespoke glass solutions for UAE residential and commercial projects.',
  path: '/products',
});

export default async function Page() {
  const products = await getAllProducts();
  return <ProductsPageClient products={products} />;
}
