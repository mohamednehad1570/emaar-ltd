import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'

export const revalidate = 3600

export const metadata = {
  title:       'Aluminium Systems — Emaar International',
  description: 'Structural-grade aluminium windows, doors, skylights, pergolas, and ACP cladding systems for UAE commercial and residential projects.',
}

export default async function Page() {
  const products = await getProductsByMaterial('aluminum')
  return <MaterialPageClient material="aluminum" sanityProducts={products} />
}
