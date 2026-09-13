/**
 * app/projects/buildings/page.tsx
 * Building projects editorial page — server component.
 */

import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BUILDING_PROJECTS } from '@/lib/data/projectContent'
import ProjectTypePageClient from '@/components/projects/ProjectTypePageClient'
import { generatePageMetadata } from '@/lib/seo/metadata'
import { breadcrumbSchema } from '@/lib/seo/jsonld'
import JsonLd from '@/components/seo/JsonLd'

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Building Projects — Aluminium Facades & Curtain Walls',
    description: 'Emaar International\'s commercial building projects showcase aluminium curtain walls, façade cladding, and glass systems across residential towers and commercial complexes in the UAE.',
    path:        '/projects/buildings',
  })
}

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: 'Home',      href: 'https://emaarupvc.ae/' },
        { name: 'Projects',  href: 'https://emaarupvc.ae/projects' },
        { name: 'Buildings', href: 'https://emaarupvc.ae/projects/buildings' },
      ])} />
      <Suspense>
        <ProjectTypePageClient projects={BUILDING_PROJECTS} type="building" />
      </Suspense>
    </>
  )
}
