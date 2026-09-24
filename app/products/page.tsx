import { getAllProducts } from '@/lib/sanity/fetch';
import ProductsPageClient from '@/components/products/ProductsPageClient';
import PageHeader from '@/components/ui/PageHeader';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export const metadata = generatePageMetadata({
  title: 'Products',
  description: 'Explore Emaar International\'s full range of uPVC windows and doors, aluminium systems, and bespoke glass solutions for UAE residential and commercial projects.',
  path: '/products',
});

export default async function Page() {
  const products = await getAllProducts();
  return (
    <>
      <PageHeader
        eyebrow="Our Products"
        title="Three Systems. One Manufacturer."
        titleAr="ثلاثة أنظمة. مصنّع واحد."
        description="uPVC, Aluminum, and Glass — designed, manufactured, and installed in the UAE."
      />
      <ProductsPageClient products={products} />
    </>
  );
}
