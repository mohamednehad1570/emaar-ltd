/**
 * lib/data/catalog/optionTypes.ts
 * Per-material option types (accessories, glass, colours, designs) — split from
 * types.ts for the 150-line limit; re-exported there so imports stay unchanged.
 */

import type { Localized, MaterialId } from './types';

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
