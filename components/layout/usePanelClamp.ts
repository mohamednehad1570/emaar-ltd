/** Keeps an absolutely-positioned dropdown inside the viewport by nudging it left (16px gutter). */

import { useLayoutEffect, type RefObject } from 'react';

const GUTTER = 16;

export function usePanelClamp(ref: RefObject<HTMLElement | null>): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Written straight to style (not state) — measured before paint, no extra render
    el.style.left = '0px';
    const overflow = el.getBoundingClientRect().right - (window.innerWidth - GUTTER);
    if (overflow > 0) el.style.left = `${-overflow}px`;
  }, [ref]);
}
