'use client';

/** Syncs the /projects type filter with #residential / #commercial and re-scrolls after the grid reflows. */

import { useEffect, useRef, useState } from 'react';
import { PROJECT_TYPES, type ProjectType } from '@/lib/data/projectContent';

export type SectorFilter = 'all' | ProjectType;

const isProjectType = (v: string): v is ProjectType =>
  (PROJECT_TYPES as readonly string[]).includes(v);

export function useProjectHashFilter(categoryParam: string | null) {
  const [sector, setSector] = useState<SectorFilter>('all');
  const pendingScroll = useRef<ProjectType | null>(null);

  // ?category=residential deep links (legacy query form) still preselect a tab
  useEffect(() => {
    if (categoryParam && isProjectType(categoryParam)) setSector(categoryParam);
  }, [categoryParam]);

  // Also follows later hash changes, which same-page menu links dispatch via
  // followSamePageHash. The extra frame matters on client navigation: this effect
  // runs before Next has written the new #hash, so a same-tick read sees the old one.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace('#', '');
      if (!isProjectType(hash)) return;
      pendingScroll.current = hash;
      setSector(hash);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener('hashchange', sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', sync); };
  }, []);

  // Changing the filter re-renders the grid and moves the anchor, so the browser's
  // own jump lands in the wrong place — scroll again once the new layout is in
  useEffect(() => {
    const id = pendingScroll.current;
    if (!id) return;
    pendingScroll.current = null;
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }, [sector]);

  return [sector, setSector] as const;
}
