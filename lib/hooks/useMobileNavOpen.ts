/** Shared open state of the mobile nav overlay — lets StickyQuoteBar (mounted separately) hide while it's open. */

import { useSyncExternalStore } from 'react'

let open = false
const listeners = new Set<() => void>()

export function setMobileNavOpen(next: boolean): void {
  if (open === next) return
  open = next
  listeners.forEach(l => l())
}

function subscribe(cb: () => void) {
  listeners.add(cb)
  return () => { listeners.delete(cb) }
}

export function useMobileNavOpen(): boolean {
  return useSyncExternalStore(subscribe, () => open, () => false)
}
