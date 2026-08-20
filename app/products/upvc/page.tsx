import ProductMaterialPage from '@/components/products/ProductMaterialPage';

export const revalidate = 3600;

export const metadata = {
  title: 'uPVC Systems — Emaar International',
};

export default function Page() {
  return <ProductMaterialPage material="upvc" />;
}
