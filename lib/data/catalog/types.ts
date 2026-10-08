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

export interface Material {
  id: MaterialId;
  name: Localized;
  pitch: Localized;
  heroImage: string | null;
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

/** Numbered callout on a hero image; x/y are % of the image box. */
export interface Hotspot {
  n: number;
  label: Localized;
  x: number;
  y: number;
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
  hotspots: Hotspot[];
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

export type AccessoryKind =
  | 'handle' | 'sliding-lock' | 'cylinder' | 'door-lock' | 'hinge'
  | 'roller' | 'closer-stopper' | 'side-arm' | 'flyscreen';

export interface ColourDot {
  name: Localized;
  ral?: string;
}

export interface AccessoryItem {
  id: string;
  kind: AccessoryKind;
  materials: MaterialId[];
  brandId?: string;
  // Used only for unbranded items — branded items take origin from Brand
  origin?: Localized;
  name: Localized;
  code?: string;
  spec?: string;
  note?: Localized;
  colours: ColourDot[];
  image: string | null;
}

export type GlassGroup = 'performance' | 'decorative';

export interface GlassOption {
  id: string;
  group: GlassGroup;
  supplier?: string;
  name: Localized;
  note: Localized;
  image: string | null;
  // Approximate swatch tint — product swatches are the sole exception to the no-blue rule
  hex?: string;
}

export interface ColourOption {
  id: string;
  material: MaterialId;
  group: Localized;
  name: Localized;
  code: string;
  hex: string;
  placeholder?: true;
}

export interface DesignOption {
  id: string;
  material: MaterialId;
  subtype: Localized;
  name: Localized;
  colour: Localized;
  image: string | null;
  placeholder?: true;
}
