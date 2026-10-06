/** Hover-intent open/close for header menus — delayed open, longer delayed close, instant click toggle. */

import { useCallback, useEffect, useRef, useState } from 'react'

// 150ms open filters out pointers that merely cross the nav on their way down the page;
// 250ms close gives the pointer time to travel the gap between trigger and panel.
const OPEN_DELAY  = 150
const CLOSE_DELAY = 250

export function useHoverIntent<K extends string>() {
  const [openKey, setOpenKey] = useState<K | null>(null)
  const timer   = useRef<ReturnType<typeof setTimeout> | null>(null)
  // Mirror of openKey so callbacks stay referentially stable
  const current = useRef<K | null>(null)

  const commit = useCallback((key: K | null) => {
    current.current = key
    setOpenKey(key)
  }, [])

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])

  /** Pointer entered a trigger — switch instantly if another menu is already open */
  const enter = useCallback((key: K) => {
    clear()
    if (current.current) { commit(key); return }
    timer.current = setTimeout(() => commit(key), OPEN_DELAY)
  }, [clear, commit])

  /** Pointer left the trigger or panel */
  const leave = useCallback(() => {
    clear()
    timer.current = setTimeout(() => commit(null), CLOSE_DELAY)
  }, [clear, commit])

  /** Click / keyboard fallback — bypasses both delays */
  const toggle = useCallback((key: K) => {
    clear()
    commit(current.current === key ? null : key)
  }, [clear, commit])

  const close = useCallback(() => { clear(); commit(null) }, [clear, commit])

  useEffect(() => clear, [clear])

  // hold = cancel a pending close when the pointer reaches the panel
  return { openKey, enter, leave, hold: clear, toggle, close, open: commit }
}
