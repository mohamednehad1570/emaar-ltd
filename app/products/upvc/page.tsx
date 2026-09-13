/**
 * app/products/upvc/page.tsx
 * uPVC material landing page — server component.
 * Fetches Sanity products then passes to the new MaterialPageClient.
 */

import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'uPVC Systems — Emaar International',
  description: 'German-engineered uPVC windows, doors, staircases, and Hebeschibe lift-and-slide systems for UAE residences.',
}

export default async function Page() {
  const products = await getProductsByMaterial('upvc')
  return <MaterialPageClient material="upvc" sanityProducts={products} />
}
