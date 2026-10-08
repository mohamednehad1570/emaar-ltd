/**
 * components/layout/drillPanels.ts
 *
 * Maps nav data onto the mobile drill-down tree:
 *   root → uPVC / Aluminum → group labels + types + option links
 *        → Projects · Technical · Contact (links)
 *        → About → items
 * Material panels come from the catalog-derived HeaderNavData (the same props the
 * desktop panels use), so desktop and mobile can never drift.
 */

import {
  NAV, materialOptionLinks,
  type HeaderNavData, type Localized, type NavLink,
} from '@/lib/data/nav'
import type { MaterialId } from '@/lib/data/catalog'

export type PanelId = 'root' | `material:${MaterialId}` | `drop:${string}`

export type DrillRow =
  | { kind: 'link';  link: NavLink }
  | { kind: 'panel'; label: Localized; to: PanelId }
  | { kind: 'label'; label: Localized }

export interface DrillPanel {
  title: Localized
  rows:  DrillRow[]
}

const MENU = { en: 'Menu', ar: 'القائمة' }

export function getPanel(id: PanelId, nav: HeaderNavData): DrillPanel {
  if (id === 'root') {
    return {
      title: MENU,
      rows: NAV.flatMap<DrillRow>(e => {
        if (e.kind === 'material') {
          const m = nav.materials.find(x => x.id === e.id)
          return m ? [{ kind: 'panel', label: m.label, to: `material:${m.id}` }] : []
        }
        if (e.kind === 'dropdown') return [{ kind: 'panel', label: e.label, to: `drop:${e.key}` }]
        return [{ kind: 'link', link: { ...e.label, href: e.href } }]
      }),
    }
  }
  if (id.startsWith('material:')) {
    const m = nav.materials.find(x => `material:${x.id}` === id)
    if (!m) return { title: MENU, rows: [] }
    return {
      title: m.label,
      rows: [
        ...m.groups.flatMap<DrillRow>(g => [
          { kind: 'label', label: g.label },
          ...g.types.map(t => ({ kind: 'link' as const, link: { ...t.name, href: `/products/${t.slug}` } })),
        ]),
        { kind: 'label', label: { en: 'Options', ar: 'الخيارات' } },
        ...materialOptionLinks(m).map(link => ({ kind: 'link' as const, link })),
      ],
    }
  }
  // drop:<key> — compact dropdowns such as About
  const item = NAV.find(e => e.kind === 'dropdown' && `drop:${e.key}` === id)
  return {
    title: item && item.kind === 'dropdown' ? item.label : MENU,
    rows: item && item.kind === 'dropdown' ? item.items.map(link => ({ kind: 'link', link })) : [],
  }
}

/** Every href reachable from a panel — used to mark the row that leads to the current page */
export function panelHrefs(id: PanelId, nav: HeaderNavData): string[] {
  return getPanel(id, nav).rows.flatMap(r =>
    r.kind === 'link' ? [r.link.href] : r.kind === 'panel' ? panelHrefs(r.to, nav) : [])
}
