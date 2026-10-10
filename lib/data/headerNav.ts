/**
 * lib/data/headerNav.ts
 * Server-side builder for the header's catalog-derived data. Called once in app/layout.tsx;
 * the result is plain serializable data (labels + slug lookups), so client components
 * never receive the catalog itself.
 */

import { MATERIAL_IDS, getMaterial, getMaterialsForType, getTypes } from './catalog'
import type { HeaderNavData } from './nav'

export function buildHeaderNav(): HeaderNavData {
  const types = getTypes()
  return {
    materials: MATERIAL_IDS.map(id => ({ id, label: getMaterial(id).name })),
    typeMaterials: Object.fromEntries(types.map(t => [t.slug, getMaterialsForType(t.slug)])),
    typeNames: Object.fromEntries(types.map(t => [t.slug, { en: t.name.en, ar: t.name.ar }])),
  }
}
