/** Serializable view-models the server routes hand to the bare catalog client components. */

import type { Localized, TypeGroup } from '@/lib/data/catalog';

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

export interface AvailabilityView {
  material: Localized;
  configurations: Localized[];
  systems: string[];
  glassRangeMm?: [number, number];
}
