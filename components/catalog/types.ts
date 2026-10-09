/** Serializable view-models the server routes hand to the catalog client components. */

import type {
  Hotspot, Localized, MaterialId, Mechanism, MechanismCopy, PictogramVariant, TypeGroup,
} from '@/lib/data/catalog';
import type { PlaceholderTag } from '@/lib/data/placeholderPhotos';
import type { LightboxDetail } from '@/components/ui/lightboxTypes';

/** Mechanisms that have a pictogram + hotspot diagram — 'unspecified' never gets a drawing. */
export type DrawnMechanism = Exclude<Mechanism, 'unspecified'>;

/** Every drawn pictogram: one per mechanism + the type-specific variants. */
export type PictogramId = DrawnMechanism | PictogramVariant;

/** Which pictogram to draw + its opening name (the type page's aria-label). */
export interface PictogramView {
  id: PictogramId;
  name: Localized;
}

/** One card in the material page's type grid. */
export interface TypeCardView {
  slug: string;
  name: Localized;
  group: TypeGroup;
  mechanism?: Localized;
  // Opening pictogram (variant wins over mechanism); absent for 'unspecified' (card shows no icon)
  pictogram?: PictogramView;
  tier?: 'flagship' | 'special';
  heroImage: string | null;
  // Every material the type is offered in — the card's "Available in" swatches
  materials: { id: MaterialId; name: Localized }[];
}

export interface TypeGroupView {
  id: TypeGroup;
  label: Localized;
  types: TypeCardView[];
}

export type OptionTabId = 'colours' | 'designs' | 'glass' | 'accessories';

export interface OptionSubTab {
  id: string;
  label: Localized;
}

export type OptionMedia =
  | { kind: 'swatch'; hex: string }
  | { kind: 'image'; src: string | null; ratio: '4/3' | '1/1'; placeholderKey: string; placeholderTag: PlaceholderTag };

/** Accessory finish dot — hex is a display approximation of the printed RAL / colour name. */
export interface OptionDot {
  name: Localized;
  ral?: string;
  hex: string;
}

/** One Options card; `details` feeds the Lightbox panel. */
export interface OptionCardView {
  id: string;
  // Sub-tab id this card belongs to ('all' is implicit)
  sub: string;
  name: Localized;
  // Muted line under the name: colour, supplier, brand · origin
  meta?: Localized;
  // Printed code(s) or spec — always rendered dir=ltr
  code?: string;
  dots?: OptionDot[];
  note?: Localized;
  media: OptionMedia;
  details: LightboxDetail[];
}

export interface OptionTabView {
  id: OptionTabId;
  label: Localized;
  subs: OptionSubTab[];
  items: OptionCardView[];
}

export interface MaterialPageView {
  id: MaterialId;
  name: Localized;
  pitch: Localized;
  heroImage: string | null;
  groups: TypeGroupView[];
  tabs: OptionTabView[];
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
  // Opening pictogram in "How it opens" (variant wins over mechanism); absent for 'unspecified'
  pictogram?: PictogramView;
  bestFor: Localized[];
  hotspots: Hotspot[];
  diagramImage: string | null;
  // Set only when the pins are the mechanism's shared set — a per-type hotspot override
  // has its own x/y, which the mechanism drawing was never fitted to
  diagramMechanism?: DrawnMechanism;
  // 3–6 entries (null = placeholder); empty for placeholder types
  gallery: (string | null)[];
  materials: MaterialConfigView[];
}
