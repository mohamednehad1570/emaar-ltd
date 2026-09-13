/**
 * app/projects/villas/page.tsx
 * Villa projects editorial page — server component.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { VILLA_PROJECTS } from '@/lib/data/projectContent'
import ProjectTypePageClient from '@/components/projects/ProjectTypePageClient'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Villa Projects — uPVC & Aluminium Windows',
    description: 'See how Emaar International\'s premium windows, doors, and facade systems transform luxury villas across the UAE. Real projects, real results.',
    path:        '/projects/villas',
  })
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home',     href: 'https://emaarupvc.ae/' },
        { name: 'Projects', href: 'https://emaarupvc.ae/projects' },
        { name: 'Villas',   href: 'https://emaarupvc.ae/projects/villas' },
      ])} />
      <Suspense>
        <ProjectTypePageClient projects={VILLA_PROJECTS} type="villa" />
      </Suspense>
    </>
  )
}
