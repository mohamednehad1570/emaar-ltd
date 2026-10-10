/**
 * Anchors an absolutely-positioned dropdown to its trigger's inline-start edge (left in EN,
 * right in AR) and nudges it back inside the viewport (16px gutter) when it would overflow
 * on the inline-end side.
 */

import { useLayoutEffect, type RefObject } from 'react';

const GUTTER = 16;

export function usePanelClamp(ref: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Direction comes from <html dir> — read once here instead of threading isRTL through props
    const rtl = getComputedStyle(el).direction === 'rtl';
    // Written straight to style (not state) — measured before paint, no extra render
    if (rtl) {
      el.style.right = '0px';
      const overflow = GUTTER - el.getBoundingClientRect().left;
      if (overflow > 0) el.style.right = `${-overflow}px`;
    } else {
      el.style.left = '0px';
      const overflow = el.getBoundingClientRect().right - (window.innerWidth - GUTTER);
      if (overflow > 0) el.style.left = `${-overflow}px`;
    }
  }, [ref]);
}
