/**
 * app/projects/villas/page.tsx
 * Villa projects editorial page — server component.
 */

import { Suspense } from 'react'
import { VILLA_PROJECTS } from '@/lib/data/projectContent'
import ProjectTypePageClient from '@/components/projects/ProjectTypePageClient'

export const metadata = {
  title:       'Villa Projects — Emaar International',
  description: 'Emaar International uPVC and aluminium fenestration installations across luxury villas in Dubai, Abu Dhabi, and the wider UAE.',
}

export default function Page() {
  return (
    <Suspense>
      <ProjectTypePageClient projects={VILLA_PROJECTS} type="villa" />
    </Suspense>
  )
}
