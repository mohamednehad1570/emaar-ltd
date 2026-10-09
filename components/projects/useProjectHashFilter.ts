'use client';

/** Syncs the /projects type filter with #residential / #commercial and re-scrolls after the grid reflows. */

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { PROJECT_TYPES, type ProjectType } from '@/lib/data/projectContent';

export type SectorFilter = 'all' | ProjectType;

const isProjectType = (v: string): v is ProjectType =>
  (PROJECT_TYPES as readonly string[]).includes(v);

// ── External hash store ────────────────────────────────────────────────────────
function hashSubscribe(callback: () => void): () => void {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function hashGetSnapshot(): SectorFilter {
  const hash = window.location.hash.replace('#', '');
  return isProjectType(hash) ? hash : 'all';
}

// Server never has a hash, so the filter starts at 'all'.
// React uses this for SSR and hydration reconciliation — the server HTML
// (showing all projects) matches the first client render, so there is no
// hydration mismatch even when the URL carries #residential.
function hashGetServerSnapshot(): SectorFilter {
  return 'all';
}
// ──────────────────────────────────────────────────────────────────────────────

export function useProjectHashFilter(categoryParam: string | null) {
  const sector = useSyncExternalStore(hashSubscribe, hashGetSnapshot, hashGetServerSnapshot);
  const pendingScroll = useRef<ProjectType | null>(null);
  // Guard so the ?category= init effect runs only once across re-renders.
  const hasSetInitialHash = useRef(false);

  // One-time: if ?category= was given and the URL has no hash yet, promote it
  // to a hash so the external store picks it up without a hydration conflict.
  useEffect(() => {
    if (hasSetInitialHash.current) return;
    if (!categoryParam || !isProjectType(categoryParam)) return;
    if (window.location.hash.replace('#', '')) return; // hash already present
    hasSetInitialHash.current = true;
    history.replaceState(null, '', `#${categoryParam}`);
    // replaceState does not fire 'hashchange' — notify the store manually.
    window.dispatchEvent(new Event('hashchange'));
  }, [categoryParam]);

  // Changing the filter re-renders the grid and moves the anchor, so the
  // browser's own jump lands in the wrong place — scroll again after layout.
  useEffect(() => {
    const id = pendingScroll.current;
    if (!id) return;
    pendingScroll.current = null;
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  }, [sector]);

  // Stable callback: writes window.location.hash (fires hashchange naturally)
  // or removes the hash (replaceState + manual dispatch) so the store re-reads.
  const setSector = useCallback((next: SectorFilter) => {
    if (next === 'all') {
      const plain = window.location.pathname + window.location.search;
      history.replaceState(null, '', plain);
      window.dispatchEvent(new Event('hashchange'));
    } else {
      pendingScroll.current = next;
      // Direct hash assignment fires 'hashchange', notifying the store.
      window.location.hash = next;
    }
  }, []);

  return [sector, setSector] as const;
}
