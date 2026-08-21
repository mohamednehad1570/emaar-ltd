import { getProductsByMaterial } from '@/lib/sanity/fetch';
import ProductMaterialPage from '@/components/products/ProductMaterialPage';

export const revalidate = 3600;

export const metadata = { title: 'uPVC Systems — Emaar International' };

export default async function Page() {
  const products = await getProductsByMaterial('upvc');
  return <ProductMaterialPage material="upvc" sanityProducts={products} />;
}
