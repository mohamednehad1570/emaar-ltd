/**
 * lib/catalogPageData.ts
 * Server-side builders that turn catalog records into the serializable props the bare
 * catalog client components expect — keeps the route files thin and identical.
 */

import {
  TYPE_GROUPS, getAccessories, getBrand, getDisplayCodes, getGlass, getMaterial,
  getProfileSystems, getTypesByGroup, type MaterialId, type ProductType,
} from '@/lib/data/catalog';
import type { AccessoryRow, AvailabilityView, TypeGroupList } from '@/components/catalog/types';

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

export function typeAvailability(type: ProductType): AvailabilityView[] {
  return type.availability.map((a) => ({
    material: getMaterial(a.material).name,
    configurations: a.configurations,
    systems: getProfileSystems(a.profileSystemIds).map((s) => s.name),
    ...(a.glassRangeMm ? { glassRangeMm: a.glassRangeMm } : {}),
  }));
}
