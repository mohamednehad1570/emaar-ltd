import type { Metadata } from 'next'
import { getProductsByMaterial } from '@/lib/sanity/fetch'
import MaterialPageClient from '@/components/products/MaterialPageClient'
import PageHeader from '@/components/ui/PageHeader'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export const revalidate = 3600

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Specialty Glass Systems',
    description: 'From tempered and laminated glass to stained and sandblasted decorative glass, Emaar International supplies premium glass systems for architectural projects across the UAE.',
    path:        '/products/glass',
  })
}

export default async function Page() {
  const products = await getProductsByMaterial('glass')
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home',          href: 'https://emaarupvc.ae/' },
        { name: 'Products',      href: 'https://emaarupvc.ae/products' },
        { name: 'Glass Systems', href: 'https://emaarupvc.ae/products/glass' },
      ])} />
      <PageHeader
        eyebrow="Products"
        title="Glass Systems"
        titleAr="أنظمة الزجاج"
        description="AGC Belgium · Emirates Float Glass · Guardian USA — sourced globally."
        chips={['4 categories', 'Double glazing', 'ISO 14001']}
        anchors={[
          { label: 'Double Glazing',    href: '#double-glazing'    },
          { label: 'Stained Glass',     href: '#stained-glass'     },
          { label: 'Sandblasted Glass', href: '#sandblasted-glass' },
          { label: 'Decorative Glass',  href: '#decorative-glass'  },
        ]}
      />
      <MaterialPageClient material="glass" sanityProducts={products} />
    </>
  )
}
