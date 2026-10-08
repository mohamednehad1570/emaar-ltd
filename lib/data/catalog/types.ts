/**
 * lib/data/catalog/types.ts
 *
 * Type-only module for the redesigned product catalog:
 * Material → Type (shared /products/[slug] pages, later) + per-material Options
 * (Colours, Designs, Glass, Accessories). Source of truth = the Emaar printed catalog.
 *
 * `placeholder: true` marks records whose values are not from the catalog yet —
 * UI batches can badge or hide them; the validator relies on the flag.
 */

export type Localized = { en: string; ar: string };

// "aluminum" spelling is canonical everywhere (ids, slugs, labels)
export type MaterialId = 'upvc' | 'aluminum';

/** Min/max sash dimensions in mm, as printed in the catalog. */
export interface SashLimits {
  widthMm: [number, number];
  heightMm: [number, number];
}

export interface SizeLimits {
  window: SashLimits;
  door: SashLimits;
  note: Localized;
}

export interface Material {
  id: MaterialId;
  name: Localized;
  pitch: Localized;
  heroImage: string | null;
  // Only uPVC prints sash limits (catalog p.41) — aluminum leaves it undefined
  sizeLimits?: SizeLimits;
}

export type TypeGroup = 'windows' | 'doors' | 'facades' | 'specialty';

export type Mechanism = 'sliding' | 'casement' | 'hinged-door' | 'folding' | 'fixed' | 'unspecified';

/** One material's take on a product type — configurations + the profile systems that build it. */
export interface TypeAvailability {
  material: MaterialId;
  configurations: Localized[];
  profileSystemIds: string[];
  // [min, max] glass thickness in mm; omitted when the catalog gives no range
  glassRangeMm?: [number, number];
}

/** Numbered callout on a diagram; x/y are % of the image box so they survive a photo swap. */
export interface Hotspot {
  n: number;
  label: Localized;
  detail: Localized;
  x: number;
  y: number;
}

/** "How it opens" copy for every mechanism except 'unspecified'. */
export interface MechanismCopy {
  label: Localized;
  how: Localized;
}

export interface ProductType {
  slug: string;
  group: TypeGroup;
  mechanism: Mechanism;
  name: Localized;
  description: Localized;
  bestFor: Localized[];
  tier?: 'flagship' | 'special';
  subItems?: Localized[];
  heroImage: string | null;
  // Per-type override — empty = fall back to the mechanism set (getHotspots)
  hotspots: Hotspot[];
  // 3–6 example photos (null = cream placeholder); placeholder types keep it empty.
  // Real files: /images/products/{slug}/gallery-{n}.webp
  gallery: (string | null)[];
  availability: TypeAvailability[];
  placeholder?: true;
}

export interface ProfileSystem {
  id: string;
  name: string;
  material: MaterialId;
  kind: Localized;
  frameMm?: number;
  sashMm?: number;
  chambers?: number;
  // Uf = frame thermal transmittance, W/m²K
  ufWm2K?: number;
  thermalNote?: Localized;
  glassMm?: [number, number];
  profileClass?: string;
  notes: Localized[];
}

export interface Brand {
  id: string;
  name: string;
  origin: Localized;
}


// Option types live in their own file (150-line limit) — consumers still import from here
export type * from './optionTypes';
