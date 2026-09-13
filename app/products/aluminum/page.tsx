import type { Metadata } from 'next'
import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Aluminium Window & Door Systems',
    description: 'Emaar International\'s aluminium systems include curtain walls, pergolas, frameless doors, ACP panels, and more. Engineered for commercial and residential projects.',
    path:        '/products/aluminum',
  })
}

export default async function Page() {
  const products = await getProductsByMaterial('aluminum')
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home',               href: 'https://emaarupvc.ae/' },
        { name: 'Products',           href: 'https://emaarupvc.ae/products' },
        { name: 'Aluminium Systems',  href: 'https://emaarupvc.ae/products/aluminum' },
      ])} />
      <MaterialPageClient material="aluminum" sanityProducts={products} />
    </>
  )
}
