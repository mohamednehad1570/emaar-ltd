'use client';

/**
 * Syncs the /projects type filter with #residential / #commercial and re-scrolls after the
 * grid reflows. Also reads the ?category= / ?material= deep-link params — in the browser
 * only, so ProjectsGrid needs no useSearchParams (which would bail it out of SSR).
 */

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import { PROJECT_TYPES, type ProjectType } from '@/lib/data/projectContent';

export type SectorFilter = 'all' | ProjectType;
export type MaterialFilter = 'all' | 'upvc' | 'aluminum';

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

// ── ?material= deep link ──────────────────────────────────────────────────────
// The query never changes without a navigation, so there is nothing to subscribe to.
// Server snapshot null → SSR and hydration render 'all'; the client then applies the param.
const noSubscribe = () => () => {};
function materialParamSnapshot(): MaterialFilter | null {
  const m = new URLSearchParams(window.location.search).get('material');
  return m === 'upvc' || m === 'aluminum' ? m : null;
}
const materialParamServerSnapshot = (): MaterialFilter | null => null;

export function useMaterialParam(): MaterialFilter | null {
  return useSyncExternalStore(noSubscribe, materialParamSnapshot, materialParamServerSnapshot);
}

export function useProjectHashFilter() {
  const sector = useSyncExternalStore(hashSubscribe, hashGetSnapshot, hashGetServerSnapshot);
  const pendingScroll = useRef<ProjectType | null>(null);
  // Guard so the ?category= init effect runs only once across re-renders.
  const hasSetInitialHash = useRef(false);

  // One-time: if ?category= was given and the URL has no hash yet, promote it
  // to a hash so the external store picks it up without a hydration conflict.
  useEffect(() => {
    if (hasSetInitialHash.current) return;
    const categoryParam = new URLSearchParams(window.location.search).get('category');
    if (!categoryParam || !isProjectType(categoryParam)) return;
    if (window.location.hash.replace('#', '')) return; // hash already present
    hasSetInitialHash.current = true;
    history.replaceState(null, '', `#${categoryParam}`);
    // replaceState does not fire 'hashchange' — notify the store manually.
    window.dispatchEvent(new Event('hashchange'));
  }, []);

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
