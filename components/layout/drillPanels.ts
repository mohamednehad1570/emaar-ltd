/**
 * components/layout/drillPanels.ts
 *
 * Maps nav data onto the mobile drill-down tree:
 *   root → uPVC · Aluminum · Projects · Technical · Contact (plain links)
 *        → About → items (the only drill panel)
 * Material labels come from the catalog-derived HeaderNavData, the same props the
 * desktop nav uses, so desktop and mobile can never drift.
 */

import { NAV, type HeaderNavData, type Localized, type NavLink } from '@/lib/data/nav'
import type { MaterialId } from '@/lib/data/catalog'

export type PanelId = 'root' | `drop:${string}`

export type DrillRow =
  // `material` marks uPVC / Aluminum rows so they stay active on the types they offer
  | { kind: 'link';  link: NavLink; material?: MaterialId }
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
          return m ? [{ kind: 'link', link: { ...m.label, href: `/${m.id}` }, material: m.id }] : []
        }
        if (e.kind === 'dropdown') return [{ kind: 'panel', label: e.label, to: `drop:${e.key}` }]
        return [{ kind: 'link', link: { ...e.label, href: e.href } }]
      }),
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
