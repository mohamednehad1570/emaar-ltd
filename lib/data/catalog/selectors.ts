/**
 * lib/data/catalog/selectors.ts
 *
 * Pure, typed read helpers over the static catalog — the only API later UI batches
 * should use. Group / subtype filters match on the English label because
 * colour groups and design subtypes are Localized, not keyed ids.
 */

import type {
  AccessoryItem, AccessoryKind, Brand, ColourOption, DesignOption, GlassGroup, GlassOption, Hotspot,
  Localized, Material, MaterialId, MechanismCopy, ProductType, ProfileSystem, TypeGroup,
} from './types';
import { MATERIALS } from './materials';
import { PRODUCT_TYPES } from './productTypes';
import { PROFILE_SYSTEMS } from './profileSystems';
import { BRANDS } from './brands';
import { ACCESSORIES } from './accessories';
import { GLASS } from './glass';
import { COLOURS } from './colours';
import { DESIGNS } from './designs';
import { MECHANISM_DIAGRAMS, MECHANISM_HOTSPOTS } from './hotspots';
import { MECHANISM_COPY } from './mechanisms';

// Dedupe Localized labels by EN text, preserving first-seen order
function uniqueLabels(labels: Localized[]): Localized[] {
  const seen = new Map<string, Localized>();
  for (const l of labels) if (!seen.has(l.en)) seen.set(l.en, l);
  return [...seen.values()];
}

const hasMaterial = (t: ProductType, id: MaterialId) => t.availability.some((a) => a.material === id);

// ── Materials & types ─────────────────────────────────────
export const getMaterial = (id: MaterialId): Material => MATERIALS[id];

export const getTypes = (): ProductType[] => PRODUCT_TYPES;

export const getTypeBySlug = (slug: string): ProductType | undefined =>
  PRODUCT_TYPES.find((t) => t.slug === slug);

export const getTypesByMaterial = (id: MaterialId): ProductType[] =>
  PRODUCT_TYPES.filter((t) => hasMaterial(t, id));

/** `material` undefined = across both materials. */
export const getTypesByGroup = (material: MaterialId | undefined, group: TypeGroup): ProductType[] =>
  PRODUCT_TYPES.filter((t) => t.group === group && (!material || hasMaterial(t, material)));

export const getMaterialsForType = (slug: string): MaterialId[] =>
  getTypeBySlug(slug)?.availability.map((a) => a.material) ?? [];

// Preserves the caller's id order; unknown ids are dropped (the validator catches them)
export const getProfileSystems = (ids: string[]): ProfileSystem[] =>
  ids.flatMap((id) => PROFILE_SYSTEMS.find((s) => s.id === id) ?? []);

/** A type's own hotspots win when non-empty; otherwise its mechanism's shared set. */
export const getHotspots = (type: ProductType): Hotspot[] =>
  type.hotspots.length > 0 ? type.hotspots : MECHANISM_HOTSPOTS[type.mechanism];

export const getDiagramImage = (type: ProductType): string | null => MECHANISM_DIAGRAMS[type.mechanism];

export const getMechanismCopy = (type: ProductType): MechanismCopy | undefined =>
  type.mechanism === 'unspecified' ? undefined : MECHANISM_COPY[type.mechanism];

// ── Options ───────────────────────────────────────────────
export const getAccessories = (material: MaterialId): AccessoryItem[] =>
  ACCESSORIES.filter((a) => a.materials.includes(material));

export const getAccessoriesByKind = (material: MaterialId, kind: AccessoryKind): AccessoryItem[] =>
  getAccessories(material).filter((a) => a.kind === kind);

/** Only kinds that actually have items for this material, in first-seen order. */
export const getAccessoryKinds = (material: MaterialId): AccessoryKind[] =>
  [...new Set(getAccessories(material).map((a) => a.kind))];

export const getGlass = (group?: GlassGroup): GlassOption[] =>
  group ? GLASS.filter((g) => g.group === group) : GLASS;

export const getColours = (material: MaterialId, group?: string): ColourOption[] =>
  COLOURS.filter((c) => c.material === material && (!group || c.group.en === group));

export const getColourGroups = (material: MaterialId): Localized[] =>
  uniqueLabels(getColours(material).map((c) => c.group));

export const getDesigns = (material: MaterialId, subtype?: string): DesignOption[] =>
  DESIGNS.filter((d) => d.material === material && (!subtype || d.subtype.en === subtype));

export const getDesignSubtypes = (material: MaterialId): Localized[] =>
  uniqueLabels(getDesigns(material).map((d) => d.subtype));

export const getBrand = (id: string): Brand | undefined => BRANDS.find((b) => b.id === id);

// The Domus with-key lock reprints K7610X (the no-key brown code) — a catalog misprint.
// Data stays verbatim; only the displayed code list drops it.
const DISPLAY_CODE_OMISSIONS: Record<string, string[]> = { 'domus-sliding-lock-key': ['K7610X'] };

/** Codes as they should be shown to visitors, split from the catalog's " / " notation. */
export const getDisplayCodes = (item: AccessoryItem): string[] => {
  const omit = DISPLAY_CODE_OMISSIONS[item.id] ?? [];
  return (item.code?.split(' / ') ?? []).filter((c) => !omit.includes(c));
};
