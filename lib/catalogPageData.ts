/**
 * lib/catalogPageData.ts
 * Server-side builders that turn catalog records into the serializable props the
 * catalog client components expect — keeps the route files thin and identical.
 */

import {
  TYPE_GROUPS, getDiagramImage, getHotspots, getMaterial, getMechanismCopy, getTypesByGroup,
  type MaterialId, type ProductType,
} from '@/lib/data/catalog';
import type { MaterialPageView, TypeCardView, TypeGroupView, TypePageView } from '@/components/catalog/types';
import { buildOptionTabs } from './materialOptionsData';

function typeCard(t: ProductType): TypeCardView {
  const mechanism = getMechanismCopy(t);
  return {
    slug: t.slug,
    name: t.name,
    group: t.group,
    ...(mechanism ? { mechanism: mechanism.label } : {}),
    ...(t.tier ? { tier: t.tier } : {}),
    heroImage: t.heroImage,
    materials: t.availability.map((a) => ({ id: a.material, name: getMaterial(a.material).name })),
  };
}

/** Serializable props for components/catalog/material/MaterialPage — built on the server per material. */
export function materialPageProps(id: MaterialId): { view: MaterialPageView } {
  const groups: TypeGroupView[] = TYPE_GROUPS
    .map((g) => ({ id: g.id, label: g.label, types: getTypesByGroup(id, g.id).map(typeCard) }))
    // uPVC has no specialty types — drop empty groups rather than render bare headings
    .filter((g) => g.types.length > 0);

  const { name, pitch, heroImage } = getMaterial(id);
  return { view: { id, name, pitch, heroImage, groups, tabs: buildOptionTabs(id) } };
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
    group: type.group,
    groupLabel: TYPE_GROUPS.find((g) => g.id === type.group)?.label ?? { en: '', ar: '' },
    ...(mechanism ? { mechanism } : {}),
    bestFor: type.bestFor,
    hotspots: getHotspots(type),
    diagramImage: getDiagramImage(type),
    gallery: type.placeholder ? [] : type.gallery,
    materials: type.availability.map((a) => ({
      id: a.material, name: getMaterial(a.material).name, configurations: a.configurations,
    })),
  };
}
