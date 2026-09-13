/**
 * app/products/upvc/page.tsx
 * uPVC material landing page — server component.
 * Fetches Sanity products then passes to the new MaterialPageClient.
 */

import type { Metadata } from 'next'
import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'uPVC Windows & Doors Systems',
    description: 'Explore Emaar International\'s full range of uPVC window and door systems — casement, sliding, tilt-and-turn, and more. Energy-efficient profiles built for Gulf climates.',
    path:        '/products/upvc',
  })
}

export default async function Page() {
  const products = await getProductsByMaterial('upvc')
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home',         href: 'https://emaarupvc.ae/' },
        { name: 'Products',     href: 'https://emaarupvc.ae/products' },
        { name: 'uPVC Systems', href: 'https://emaarupvc.ae/products/upvc' },
      ])} />
      <MaterialPageClient material="upvc" sanityProducts={products} />
    </>
  )
}
