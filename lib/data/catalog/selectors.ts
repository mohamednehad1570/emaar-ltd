/**
 * lib/data/catalog/selectors.ts
 *
 * Pure, typed read helpers over the static catalog — the only API later UI batches
 * should use. Group / subtype filters match on the English label because
 * colour groups and design subtypes are Localized, not keyed ids.
 */

import type {
  AccessoryItem, AccessoryKind, Brand, ColourOption, DesignOption, GlassGroup, GlassOption,
  Localized, Material, MaterialId, ProductType, ProfileSystem, TypeGroup,
} from './types';
import { MATERIALS } from './materials';
import { PRODUCT_TYPES } from './productTypes';
import { PROFILE_SYSTEMS } from './profileSystems';
import { BRANDS } from './brands';
import { ACCESSORIES } from './accessories';
import { GLASS } from './glass';
import { COLOURS } from './colours';
import { DESIGNS } from './designs';

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
