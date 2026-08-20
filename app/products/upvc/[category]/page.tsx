import { notFound } from 'next/navigation';
import ProductCategoryPage from '@/components/products/ProductCategoryPage';
import { upvcCategories } from '@/lib/data/products';

export const revalidate = 3600;

type Params = Promise<{ category: string }>;

// Statically generates one page per uPVC category so the build succeeds without network
export function generateStaticParams() {
  return upvcCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { category } = await params;
  const cat = upvcCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return { title: `${cat.label.en} — uPVC | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category } = await params;
  // Guard against unknown category slugs entered directly in the URL
  if (!upvcCategories.some((c) => c.slug === category)) notFound();
  return <ProductCategoryPage material="upvc" category={category} />;
}
