/**
 * lib/data/headerNav.ts
 * Server-side builder for the header's material menus. Called once in app/layout.tsx;
 * the result is plain serializable data, so client components get only the type
 * names and slugs — not the whole catalog (accessories, colours, designs…).
 */

import { MATERIAL_IDS, TYPE_GROUPS, getMaterial, getTypes, getTypesByGroup, getMaterialsForType } from './catalog'
import type { HeaderNavData } from './nav'

export function buildHeaderNav(): HeaderNavData {
  return {
    materials: MATERIAL_IDS.map(id => ({
      id,
      label: getMaterial(id).name,
      groups: TYPE_GROUPS
        .map(g => ({
          id: g.id,
          label: g.label,
          types: getTypesByGroup(id, g.id).map(t => ({ slug: t.slug, name: t.name })),
        }))
        // Only groups with items become columns (uPVC has no Specialty)
        .filter(g => g.types.length > 0),
    })),
    typeMaterials: Object.fromEntries(getTypes().map(t => [t.slug, getMaterialsForType(t.slug)])),
  }
}
