import ProductMaterialPage from '@/components/products/ProductMaterialPage';

export const revalidate = 3600;

export const metadata = {
  title: 'Aluminium Systems — Emaar International',
};

export default function Page() {
  return <ProductMaterialPage material="aluminum" />;
}
