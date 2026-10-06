/** Drill-down navigation stack — push/pop panel ids and remember which way the last move went. */

import { useCallback, useState } from 'react'

export function usePanelStack<T extends string>(root: T) {
  const [stack, setStack] = useState<T[]>([root])
  // 1 = drilled deeper, -1 = went back; drives which side the panels slide from
  const [direction, setDirection] = useState<1 | -1>(1)

  const push = useCallback((id: T) => {
    setDirection(1)
    setStack(s => [...s, id])
  }, [])

  const pop = useCallback(() => {
    setDirection(-1)
    setStack(s => (s.length > 1 ? s.slice(0, -1) : s))
  }, [])

  return {
    current: stack[stack.length - 1],
    parent:  stack.length > 1 ? stack[stack.length - 2] : null,
    depth:   stack.length - 1,
    direction,
    push,
    pop,
  }
}
