import { getProductsByMaterial } from '@/lib/sanity/fetch';
import ProductMaterialPage from '@/components/products/ProductMaterialPage';

export const revalidate = 3600;

export const metadata = { title: 'Aluminium Systems — Emaar International' };

export default async function Page() {
  const products = await getProductsByMaterial('aluminum');
  return <ProductMaterialPage material="aluminum" sanityProducts={products} />;
}
