/** Menu-aim "safe triangle": defers row activation while the pointer travels diagonally toward the next column. */

import { useCallback, useEffect, useRef } from 'react'

interface Point { x: number; y: number }

// Pointer history depth — the oldest sample is the triangle apex. One sample is too
// noisy (sub-pixel jitter); ~4 samples spans roughly 50ms of real movement.
const HISTORY = 4
// If the pointer settles inside the triangle, activate the hovered row anyway after this
const SETTLE_MS = 120

// Sign of the cross product tells which side of edge a→b the point p falls on
function side(p: Point, a: Point, b: Point) {
  return (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y)
}

function inTriangle(p: Point, a: Point, b: Point, c: Point) {
  const d1 = side(p, a, b), d2 = side(p, b, c), d3 = side(p, c, a)
  const neg = d1 < 0 || d2 < 0 || d3 < 0
  const pos = d1 > 0 || d2 > 0 || d3 > 0
  return !(neg && pos)
}

export function useSafeTriangle(isRTL: boolean) {
  const history = useRef<Point[]>([])
  const timer   = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }, [])

  /** Attach to the panel's onPointerMove */
  const track = useCallback((e: React.PointerEvent) => {
    history.current.push({ x: e.clientX, y: e.clientY })
    if (history.current.length > HISTORY) history.current.shift()
  }, [])

  /**
   * Ask to activate a row. `target` is the column the row would reveal; while the
   * pointer is heading into it, activation waits so crossing sibling rows on the
   * diagonal doesn't swap the column out from under the user.
   */
  const request = useCallback((activate: () => void, target: HTMLElement | null) => {
    cancel()
    const pts = history.current
    if (!target || pts.length < 2) { activate(); return }

    const r = target.getBoundingClientRect()
    // Near edge of the next column — its start side, which is physical right in RTL
    const edgeX = isRTL ? r.right : r.left
    const apex  = pts[0]
    const now   = pts[pts.length - 1]

    if (inTriangle(now, apex, { x: edgeX, y: r.top }, { x: edgeX, y: r.bottom })) {
      timer.current = setTimeout(activate, SETTLE_MS)
    } else {
      activate()
    }
  }, [cancel, isRTL])

  useEffect(() => cancel, [cancel])

  return { track, request, cancel }
}
