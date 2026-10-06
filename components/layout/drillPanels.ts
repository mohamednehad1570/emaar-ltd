/**
 * components/layout/drillPanels.ts
 *
 * Maps nav data onto the mobile drill-down tree:
 *   root → Our Solutions → Products → uPVC → items
 *                        → Projects / Accessories → items
 *        → About → items
 * Derived entirely from lib/data/nav.ts so desktop and mobile can never drift.
 */

import {
  NAV, SOLUTIONS, SOLUTIONS_VIEW_ORDER, MATERIAL_ORDER,
  type Localized, type MaterialKey, type NavBranch, type NavLink, type SolutionsViewKey,
} from '@/lib/data/nav'

export type PanelId =
  | 'root'
  | 'solutions'
  | `view:${SolutionsViewKey}`
  | `material:${MaterialKey}`
  | `drop:${string}`

export type DrillRow =
  | { kind: 'link';  link: NavLink }
  | { kind: 'panel'; label: Localized; to: PanelId }
  | { kind: 'label'; label: Localized }

export interface DrillPanel {
  title: Localized
  rows:  DrillRow[]
}

const MENU = { en: 'Menu', ar: 'القائمة' }
const SOLUTIONS_LABEL = NAV.find(n => n.megaMenu) ?? { en: 'Our Solutions', ar: 'حلولنا' }

/** Group micro-labels, then items, then the branch's "View all" link */
function branchRows(b: NavBranch): DrillRow[] {
  return [
    ...b.groups.flatMap<DrillRow>(g => [
      ...(g.label ? [{ kind: 'label' as const, label: g.label }] : []),
      ...g.items.map(link => ({ kind: 'link' as const, link })),
    ]),
    { kind: 'link', link: b.viewAll },
  ]
}

export function getPanel(id: PanelId): DrillPanel {
  if (id === 'root') {
    return {
      title: MENU,
      rows: NAV.map<DrillRow>(item =>
        item.megaMenu ? { kind: 'panel', label: item, to: 'solutions' }
        : item.dropdown ? { kind: 'panel', label: item, to: `drop:${item.en}` }
        : { kind: 'link', link: item }),
    }
  }
  if (id === 'solutions') {
    return {
      title: SOLUTIONS_LABEL,
      rows: SOLUTIONS_VIEW_ORDER.map(v => ({ kind: 'panel', label: SOLUTIONS[v].label, to: `view:${v}` })),
    }
  }
  if (id === 'view:products') {
    const p = SOLUTIONS.products
    return {
      title: p.label,
      rows: [
        ...MATERIAL_ORDER.map<DrillRow>(m => ({ kind: 'panel', label: p.materials[m].label, to: `material:${m}` })),
        { kind: 'link', link: p.viewAll },
      ],
    }
  }
  if (id === 'view:projects' || id === 'view:accessories') {
    const b = SOLUTIONS[id === 'view:projects' ? 'projects' : 'accessories']
    return { title: b.label, rows: branchRows(b) }
  }
  if (id.startsWith('material:')) {
    const b = SOLUTIONS.products.materials[id.slice('material:'.length) as MaterialKey]
    return { title: b.label, rows: branchRows(b) }
  }
  // drop:<en> — compact dropdowns such as About
  const item = NAV.find(n => `drop:${n.en}` === id)
  return {
    title: item ?? MENU,
    rows: (item?.dropdown ?? []).map(link => ({ kind: 'link', link })),
  }
}

/** Every href reachable from a panel — used to mark the row that leads to the current page */
export function panelHrefs(id: PanelId): string[] {
  return getPanel(id).rows.flatMap(r =>
    r.kind === 'link' ? [r.link.href] : r.kind === 'panel' ? panelHrefs(r.to) : [])
}
