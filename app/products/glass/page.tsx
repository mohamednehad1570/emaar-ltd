import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'Glass Systems — Emaar International',
  description: 'Bespoke architectural glass: stained glass, sandblast glass, and double glazing crafted in our SAIF Zone studio for UAE residences and hospitality.',
}

export default async function Page() {
  const products = await getProductsByMaterial('glass')
  return <MaterialPageClient material="glass" sanityProducts={products} />
}
