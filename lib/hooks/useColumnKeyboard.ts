/** Arrow-key roving focus across `[data-mm-col]` columns of `[data-mm-item]` rows; ←/→ mirror in RTL. */

const items = (c: HTMLElement) => Array.from(c.querySelectorAll<HTMLElement>('[data-mm-item]'))

export function useColumnKeyboard(panel: React.RefObject<HTMLElement | null>, isRTL: boolean) {
  // No useCallback — the React Compiler memoizes this, and a manual dep list over a ref trips it
  return (e: React.KeyboardEvent) => {
    const el   = document.activeElement as HTMLElement | null
    const cols = Array.from(panel.current?.querySelectorAll<HTMLElement>('[data-mm-col]') ?? [])
    const ci   = cols.findIndex(c => el && c.contains(el))
    if (ci < 0 || !el) return

    const list = items(cols[ci])
    const i    = list.indexOf(el)
    // "Forward" is toward the next column — physical left when reading right-to-left
    const fwd  = isRTL ? 'ArrowLeft'  : 'ArrowRight'
    const back = isRTL ? 'ArrowRight' : 'ArrowLeft'
    let next: HTMLElement | undefined

    switch (e.key) {
      case 'ArrowDown': next = list[(i + 1) % list.length]; break
      case 'ArrowUp':   next = list[(i - 1 + list.length) % list.length]; break
      case 'Home':      next = list[0]; break
      case 'End':       next = list[list.length - 1]; break
      case fwd:
      case back: {
        const target = cols[ci + (e.key === fwd ? 1 : -1)]
        // Land on the row that is currently selected in that column, else its first row
        if (target) next = target.querySelector<HTMLElement>('[data-selected]') ?? items(target)[0]
      }
    }
    if (next) { e.preventDefault(); next.focus() }
  }
}
