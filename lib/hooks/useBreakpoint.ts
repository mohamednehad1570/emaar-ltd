/** Current layout tier from matchMedia — mirrors Tailwind md (768) and xl (1280); 'mobile' during SSR. */

import { useSyncExternalStore } from 'react'

export type Breakpoint = 'mobile' | 'tablet' | 'desktop'

const TABLET  = '(min-width: 768px)'
const DESKTOP = '(min-width: 1280px)'

function read(): Breakpoint {
  if (window.matchMedia(DESKTOP).matches) return 'desktop'
  return window.matchMedia(TABLET).matches ? 'tablet' : 'mobile'
}

function subscribe(cb: () => void) {
  const queries = [TABLET, DESKTOP].map(q => window.matchMedia(q))
  queries.forEach(q => q.addEventListener('change', cb))
  return () => queries.forEach(q => q.removeEventListener('change', cb))
}

export function useBreakpoint(): Breakpoint {
  return useSyncExternalStore(subscribe, read, () => 'mobile')
}
