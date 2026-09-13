/**
 * app/projects/buildings/page.tsx
 * Building projects editorial page — server component.
 */

import { Suspense } from 'react'
import { BUILDING_PROJECTS } from '@/lib/data/projectContent'
import ProjectTypePageClient from '@/components/projects/ProjectTypePageClient'

export const metadata = {
  title:       'Building Projects — Emaar International',
  description: 'Emaar International aluminium curtain wall, ACP cladding, and fenestration systems across commercial towers and mixed-use developments in the UAE.',
}

export default function Page() {
  return (
    <Suspense>
      <ProjectTypePageClient projects={BUILDING_PROJECTS} type="building" />
    </Suspense>
  )
}
