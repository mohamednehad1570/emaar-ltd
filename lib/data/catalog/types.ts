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

// 'unspecified' = no opening to draw: non-glazed types (pergola, handrails, cladding,
// security systems) and types whose catalog entry names no mechanism (frameless doors)
export type Mechanism = 'sliding' | 'casement' | 'hinged-door' | 'folding' | 'fixed' | 'unspecified';

/** Type-specific opening symbol that refines its mechanism's pictogram (pictograms only —
 *  the hotspot diagram stays one per mechanism). Allowed mechanism per variant: PICTOGRAM_VARIANTS. */
export type PictogramVariant = 'top-hung' | 'tilt-turn' | 'lift-slide' | 'tilt-slide';

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
  /** Short label used in the type-hero eyebrow ("group · shortLabel"). Falls back to label. */
  shortLabel?: Localized;
}

/** A variant's host mechanism + its opening name (the pictogram's aria-label on the type page). */
export interface PictogramVariantCopy {
  mechanism: 'casement' | 'sliding';
  label: Localized;
  /** Variant-specific "how it opens" text. Falls back to the host mechanism's how when absent. */
  how?: Localized;
  /** Short label used in the type-hero eyebrow ("group · shortLabel"). Falls back to label. */
  shortLabel?: Localized;
}

export interface ProductType {
  slug: string;
  group: TypeGroup;
  mechanism: Mechanism;
  // Omitted = the mechanism's own pictogram; validator checks it matches the mechanism
  pictogramVariant?: PictogramVariant;
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
