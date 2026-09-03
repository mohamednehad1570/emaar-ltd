import { getProductsByMaterial } from '@/lib/sanity/fetch';
import ProductMaterialPage from '@/components/products/ProductMaterialPage';

export const revalidate = 3600;

export const metadata = { title: 'Glass Systems — Emaar International' };

export default async function Page() {
  const products = await getProductsByMaterial('glass');
  return <ProductMaterialPage material="glass" sanityProducts={products} />;
}
