/**
 * app/products/[material]/page.tsx
 *
 * Server route — validates the material param and passes it to
 * ProductMaterialPage (client component, needs useLanguage).
 * Replaces the static app/products/upvc/ and app/products/aluminum/ routes.
 */

import { notFound } from 'next/navigation';
import ProductMaterialPage from '@/components/products/ProductMaterialPage';

type Params = Promise<{ material: string }>;

const VALID_MATERIALS = ['upvc', 'aluminum'] as const;

export function generateStaticParams() {
  return VALID_MATERIALS.map(material => ({ material }));
}

export default async function Page({ params }: { params: Params }) {
  const { material } = await params;

  /* Only 'upvc' and 'aluminum' are valid — anything else is a 404 */
  if (!(VALID_MATERIALS as readonly string[]).includes(material)) notFound();

  return <ProductMaterialPage material={material} />;
}
