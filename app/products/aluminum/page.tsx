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
      <PageHeader
        eyebrow="Products"
        title="Aluminum Systems"
        titleAr="أنظمة الألمنيوم"
        description="Tested at Al-Futtaim Exova labs. German DIN standards."
        chips={['10 categories', 'DIN certified', 'Exova tested']}
        scrollable={true}
        anchors={[
          { label: 'Doors',          href: '#doors'          },
          { label: 'Windows',        href: '#windows'        },
          { label: 'Curtain Wall',   href: '#curtain-wall'   },
          { label: 'ACP Cladding',   href: '#acp-cladding'   },
          { label: 'Skylights',      href: '#skylights'      },
          { label: 'Security System',href: '#security-system'},
          { label: 'Pergola',        href: '#pergola'        },
          { label: 'Handrails',      href: '#handrails'      },
          { label: 'Frameless Doors',href: '#frameless-doors'},
          { label: 'Staircases',     href: '#staircases'     },
        ]}
      />
      <MaterialPageClient material="aluminum" sanityProducts={products} />
    </>
  )
}
