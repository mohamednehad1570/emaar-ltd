/**
 * lib/catalogPageData.ts
 * Server-side builders that turn catalog records into the serializable props the bare
 * catalog client components expect — keeps the route files thin and identical.
 */

import {
  TYPE_GROUPS, getAccessories, getBrand, getDiagramImage, getDisplayCodes, getGlass, getHotspots, getMaterial,
  getMechanismCopy, getProfileSystems, getTypesByGroup, type MaterialId, type ProductType,
  type TypeAvailability,
} from '@/lib/data/catalog';
import type {
  AccessoryRow, MaterialSpecView, TypeGroupList, TypePageView,
} from '@/components/catalog/types';

export function materialPageProps(id: MaterialId) {
  const groups: TypeGroupList[] = TYPE_GROUPS
    .map((g) => ({
      id: g.id,
      label: g.label,
      types: getTypesByGroup(id, g.id).map((t) => ({ slug: t.slug, name: t.name })),
    }))
    // uPVC has no specialty types — drop empty groups rather than render bare headings
    .filter((g) => g.types.length > 0);

  const accessories: AccessoryRow[] = getAccessories(id).map((a) => ({
    id: a.id,
    name: a.name,
    brand: a.brandId ? getBrand(a.brandId)?.name : undefined,
    codes: getDisplayCodes(a),
  }));

  return { material: getMaterial(id), groups, glass: getGlass(), accessories };
}

function materialSpec(type: ProductType, a: TypeAvailability): MaterialSpecView {
  const material = getMaterial(a.material);
  const limits = material.sizeLimits;
  return {
    id: a.material,
    name: material.name,
    configurations: a.configurations,
    // Only the fields the card shows — keeps notes/thermal copy out of the client payload
    systems: getProfileSystems(a.profileSystemIds).map((sys) => ({
      name: sys.name, frameMm: sys.frameMm, chambers: sys.chambers, ufWm2K: sys.ufWm2K, glassMm: sys.glassMm,
    })),
    ...(a.glassRangeMm ? { glassRangeMm: a.glassRangeMm } : {}),
    // Catalog p.41: doors take door-sash limits, every other group the window limits
    ...(limits ? { sashLimits: { ...limits[type.group === 'doors' ? 'door' : 'window'], note: limits.note } } : {}),
  };
}

/** Serializable props for components/catalog/type/TypePage — built on the server per slug. */
export function typePageProps(type: ProductType): TypePageView {
  const mechanism = getMechanismCopy(type);
  return {
    slug: type.slug,
    name: type.name,
    description: type.description,
    ...(type.tier ? { tier: type.tier } : {}),
    placeholder: type.placeholder === true,
    heroImage: type.heroImage,
    groupLabel: TYPE_GROUPS.find((g) => g.id === type.group)?.label ?? { en: '', ar: '' },
    ...(mechanism ? { mechanism } : {}),
    bestFor: type.bestFor,
    hotspots: getHotspots(type),
    diagramImage: getDiagramImage(type),
    materials: type.availability.map((a) => materialSpec(type, a)),
  };
}
