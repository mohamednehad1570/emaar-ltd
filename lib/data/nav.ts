/**
 * lib/data/nav.ts
 *
 * Single source of truth for all navigation data.
 *
 * Structure:
 *   NAV       — top-level items (Home · Our Solutions▾ · Technical · About▾ · Contact)
 *   SOLUTIONS — (navSolutions.ts) the three "Our Solutions" views consumed by the desktop mega-menu
 *               (View → Material → Items) and the mobile drill-down (same tree).
 *
 * Every sub-item href is a hash anchor on an existing page — no sub-routes exist.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Localized {
  en: string
  ar: string
}

/** A single navigable link with bilingual labels */
export interface NavLink extends Localized {
  href: string
  /** When true, a visual divider renders above this item (compact dropdowns only) */
  dividerBefore?: boolean
}

/** A run of links; `label` renders as a micro-label (e.g. Aluminum "Core Systems") */
export interface NavGroup {
  label?: Localized
  items:  NavLink[]
}

export type MaterialKey      = 'upvc' | 'aluminum' | 'glass'
export type SolutionsViewKey = 'products' | 'projects' | 'accessories'

/** A list of item groups closed by a "View all …" link */
export interface NavBranch {
  label:   Localized
  viewAll: NavLink
  groups:  NavGroup[]
}

export interface SolutionsTree {
  /** Products is the only view with a Material level */
  products:    { label: Localized; viewAll: NavLink; materials: Record<MaterialKey, NavBranch> }
  projects:    NavBranch
  accessories: NavBranch
}

/** A top-level nav item */
export interface NavItem extends Localized {
  href:      string
  dropdown?: NavLink[]
  /** True for Our Solutions — desktop opens the mega-menu, mobile drills into SOLUTIONS */
  megaMenu?: boolean
}

// Display order — Record keys don't guarantee iteration order across consumers
// Tree data lives in navSolutions.ts to keep both files under the 150-line limit.
// Only types flow back from that file, so the import graph has no runtime cycle.
import { SOLUTIONS } from './navSolutions'
export { SOLUTIONS }

export const SOLUTIONS_VIEW_ORDER: SolutionsViewKey[] = ['products', 'projects', 'accessories']
export const MATERIAL_ORDER:       MaterialKey[]      = ['upvc', 'aluminum', 'glass']

// ─── Primary navigation ────────────────────────────────────────────────────────

export const NAV: NavItem[] = [
  { en: 'Home', ar: 'الرئيسية', href: '/' },
  // href '' — the item is a menu trigger, never a link; active state comes from SOLUTIONS_HREFS
  { en: 'Our Solutions', ar: 'حلولنا', href: '', megaMenu: true },
  { en: 'Technical', ar: 'المواصفات', href: '/technical' },
  {
    en: 'About', ar: 'من نحن', href: '',
    dropdown: [
      { en: 'About Us',      ar: 'من نحن',          href: '/about'         },
      { en: 'Why Choose Us', ar: 'لماذا نحن',       href: '/why-choose-us' },
      { en: 'Careers',       ar: 'الوظائف',         href: '/careers'       },
      { en: 'FAQ',           ar: 'الأسئلة الشائعة', href: '/faq', dividerBefore: true },
    ],
  },
  { en: 'Contact', ar: 'اتصل بنا', href: '/contact' },
]

// ─── isActive helper ──────────────────────────────────────────────────────────

export function isActive(
  pathname:    string,
  href:        string,
  childHrefs?: string[],
): boolean {
  if (href === '/') return pathname === '/'
  const base = href.split('#')[0]
  if (base && pathname.startsWith(base)) return true
  return childHrefs?.some(h => {
    const b = h.split('#')[0]
    return b && pathname.startsWith(b)
  }) ?? false
}

// ─── Derived ──────────────────────────────────────────────────────────────────

/** Every link under a branch, groups flattened, "View all" last */
export function branchLinks(branch: NavBranch): NavLink[] {
  return [...branch.groups.flatMap(g => g.items), branch.viewAll]
}

// Flat, de-duplicated base paths for "Our Solutions" active-state detection
export const SOLUTIONS_HREFS: string[] = [
  SOLUTIONS.products.viewAll,
  ...MATERIAL_ORDER.flatMap(m => branchLinks(SOLUTIONS.products.materials[m])),
  ...branchLinks(SOLUTIONS.projects),
  ...branchLinks(SOLUTIONS.accessories),
]
  .map(l => l.href.split('#')[0])
  .filter((v, i, a) => v && a.indexOf(v) === i)
