/** Serializable view-models the server routes hand to the bare catalog client components. */

import type { Hotspot, Localized, MaterialId, MechanismCopy, SashLimits, TypeGroup } from '@/lib/data/catalog';

export interface TypeLink {
  slug: string;
  name: Localized;
}

export interface TypeGroupList {
  id: TypeGroup;
  label: Localized;
  types: TypeLink[];
}

export interface AccessoryRow {
  id: string;
  name: Localized;
  brand?: string;
  codes: string[];
}

/** Profile-system card — every numeric field is optional because the catalog omits many. */
export interface SystemCardView {
  name: string;
  frameMm?: number;
  chambers?: number;
  ufWm2K?: number;
  glassMm?: [number, number];
}

/** One material column on a type page — legend row + specs column share it. */
export interface MaterialSpecView {
  id: MaterialId;
  name: Localized;
  configurations: Localized[];
  systems: SystemCardView[];
  glassRangeMm?: [number, number];
  // uPVC only; already resolved to door vs window limits for this type
  sashLimits?: SashLimits & { note: Localized };
}

export interface TypePageView {
  slug: string;
  name: Localized;
  description: Localized;
  tier?: 'flagship' | 'special';
  placeholder: boolean;
  heroImage: string | null;
  groupLabel: Localized;
  mechanism?: MechanismCopy;
  bestFor: Localized[];
  hotspots: Hotspot[];
  diagramImage: string | null;
  materials: MaterialSpecView[];
}
