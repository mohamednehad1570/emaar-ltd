import ProductMaterialPage from '@/components/products/ProductMaterialPage';
import { sanityFetch } from '@/lib/sanity/client';
import { productsByCategoryQuery } from '@/lib/sanity/queries';
import type { SanityProduct } from '@/lib/sanity/types';

export const revalidate = 3600;

export default async function Page() {
  const sanityProducts = await sanityFetch<SanityProduct[]>(productsByCategoryQuery, { category: 'upvc' });
  return <ProductMaterialPage material="upvc" sanityProducts={sanityProducts} />;
}
