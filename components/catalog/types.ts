/** Serializable view-models the server routes hand to the bare catalog client components. */

import type { Hotspot, Localized, MaterialId, MechanismCopy, TypeGroup } from '@/lib/data/catalog';

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

/** One material on a type page — feeds both the hero legend and the configurations list.
 *  Profile systems, glass range and sash limits stay in the catalog for the Technical page. */
export interface MaterialConfigView {
  id: MaterialId;
  name: Localized;
  configurations: Localized[];
}

export interface TypePageView {
  slug: string;
  name: Localized;
  description: Localized;
  tier?: 'flagship' | 'special';
  placeholder: boolean;
  heroImage: string | null;
  group: TypeGroup;
  groupLabel: Localized;
  mechanism?: MechanismCopy;
  bestFor: Localized[];
  hotspots: Hotspot[];
  diagramImage: string | null;
  // 3–6 entries (null = placeholder); empty for placeholder types
  gallery: (string | null)[];
  materials: MaterialConfigView[];
}
