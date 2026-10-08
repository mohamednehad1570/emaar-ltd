'use client';

/**
 * Deep links for the Options module: #colours / #designs / #glass / #accessories select that
 * main tab and scroll to #options (the header offset comes from scroll-padding-top on <html>).
 * Tab clicks rewrite the hash with replaceState — no history entry, no scroll jump.
 * Without JS, the zero-height #colours … #accessories anchors in MaterialOptions do the scroll.
 */

import { useEffect, useRef } from 'react';
import type { OptionTabId } from '../types';

export const OPTION_TAB_IDS: readonly OptionTabId[] = ['colours', 'designs', 'glass', 'accessories'];
const isTabId = (v: string): v is OptionTabId => (OPTION_TAB_IDS as readonly string[]).includes(v);

export function useOptionsHash(onTab: (id: OptionTabId) => void, sectionId: string) {
  // Latest callback without re-binding the listener on every render
  const onTabRef = useRef(onTab);
  useEffect(() => { onTabRef.current = onTab; });

  useEffect(() => {
    const sync = (smooth: boolean) => {
      const hash = window.location.hash.slice(1);
      if (!isTabId(hash)) return;
      onTabRef.current(hash);
      // One frame so the new tab's grid is committed before we measure the landing point
      requestAnimationFrame(() =>
        document.getElementById(sectionId)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' }));
    };
    // Two frames on mount: on client navigation Next writes the #hash after this effect runs,
    // and its own jump to the zero-height #glass fallback anchor must land before ours
    // (same spot as #options, so the second scroll never visibly moves)
    let inner = 0;
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => sync(false)); });
    // Same-page links (footer, mobile menu) dispatch hashchange via followSamePageHash
    const onChange = () => sync(true);
    window.addEventListener('hashchange', onChange);
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
      window.removeEventListener('hashchange', onChange);
    };
  }, [sectionId]);
}

/** Mirror the selected tab in the URL without adding history or scrolling. */
export function writeOptionsHash(id: OptionTabId) {
  window.history.replaceState(null, '', `#${id}`);
}
