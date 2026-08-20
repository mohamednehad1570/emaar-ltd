import { notFound } from 'next/navigation';
import { aluminumCategories } from '@/lib/data/products';
import { productDetails } from '@/lib/data/productDetails';
import { getProductBySlug } from '@/lib/sanity/fetch';
import ProductDetailPage from '@/components/products/ProductDetailPage';

export const revalidate = 3600;

type Params = Promise<{ category: string; slug: string }>;

export function generateStaticParams() {
  return aluminumCategories.flatMap((cat) =>
    cat.products.map((p) => ({ category: cat.slug, slug: p.slug })),
  );
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const detail = productDetails[slug];
  if (!detail) return {};
  return { title: `${slug} — Aluminium | Emaar International` };
}

export default async function Page({ params }: { params: Params }) {
  const { category, slug } = await params;

  const validCategory = aluminumCategories.some((c) => c.slug === category);
  if (!validCategory) notFound();

  const detail = productDetails[slug];
  const sanityProduct = await getProductBySlug(slug, 'aluminum');
  if (!detail && !sanityProduct) notFound();

  return <ProductDetailPage slug={slug} sanityProduct={sanityProduct} />;
}
