import { notFound } from 'next/navigation';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';
import { aluminumCategories } from '@/lib/data/products';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

export function generateStaticParams() {
  return aluminumCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const cat = aluminumCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.label.en} — Aluminium | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;
  if (!aluminumCategories.some((c) => c.slug === category)) notFound();
  return <ProductCategoryPage material="aluminum" category={category} />;
}
