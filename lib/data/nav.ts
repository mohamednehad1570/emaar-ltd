/**
 * lib/data/nav.ts
 *
 * Single source of truth for site navigation.
 *
 *   NAV           — header items in their FIXED physical order (identical in EN and AR):
 *                   uPVC▾ · Aluminum▾ · Projects · Technical · About▾ · Contact
 *   HeaderNavData — the catalog-derived material menus; built server-side by
 *                   lib/data/headerNav.ts and passed down as props, so the client
 *                   bundle never ships the full catalog.
 *   PRODUCT_LINKS — footer "Products" column.
 */

import type { MaterialId } from './catalog'

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

export type NavEntry =
  | { kind: 'material'; id: MaterialId }
  | { kind: 'link'; key: string; label: Localized; href: string }
  | { kind: 'dropdown'; key: string; label: Localized; items: NavLink[] }

export interface NavTypeLink {
  slug: string
  name: Localized
}

export interface NavTypeGroup {
  id: string
  label: Localized
  types: NavTypeLink[]
}

export interface NavMaterial {
  id: MaterialId
  label: Localized
  groups: NavTypeGroup[]
}

export interface HeaderNavData {
  materials: NavMaterial[]
  /** slug → materials offering it; drives the active underline on /products/[slug] */
  typeMaterials: Record<string, MaterialId[]>
}

// ─── Primary navigation ────────────────────────────────────────────────────────

const ABOUT_ITEMS: NavLink[] = [
  { en: 'About Us',      ar: 'من نحن',          href: '/about'         },
  { en: 'Why Choose Us', ar: 'لماذا نحن',       href: '/why-choose-us' },
  { en: 'Careers',       ar: 'الوظائف',         href: '/careers'       },
  { en: 'FAQ',           ar: 'الأسئلة الشائعة', href: '/faq', dividerBefore: true },
]

// Existing short AR labels kept (المواصفات, اتصل بنا) — the header stacks both
// languages in one cell, so the longer AR variants would widen the 1024px bar
export const NAV: NavEntry[] = [
  { kind: 'material', id: 'upvc' },
  { kind: 'material', id: 'aluminum' },
  { kind: 'link',     key: 'projects',  label: { en: 'Projects',  ar: 'المشاريع'  }, href: '/projects'  },
  { kind: 'link',     key: 'technical', label: { en: 'Technical', ar: 'المواصفات' }, href: '/technical' },
  { kind: 'dropdown', key: 'about',     label: { en: 'About',     ar: 'من نحن'    }, items: ABOUT_ITEMS },
  { kind: 'link',     key: 'contact',   label: { en: 'Contact',   ar: 'اتصل بنا'  }, href: '/contact'   },
]

/** Footer row of a material panel: landing page, glass and accessories sections */
export function materialOptionLinks(m: NavMaterial): NavLink[] {
  return [
    { en: `All ${m.label.en} products`, ar: `كل منتجات ${m.label.ar}`, href: `/${m.id}` },
    { en: 'Glass options', ar: 'خيارات الزجاج', href: `/${m.id}#glass` },
    { en: 'Accessories', ar: 'الإكسسوارات', href: `/${m.id}#accessories` },
  ]
}

export const PRODUCT_LINKS: NavLink[] = [
  { en: 'uPVC Systems',     ar: 'أنظمة uPVC',      href: '/upvc'             },
  { en: 'Aluminum Systems', ar: 'أنظمة الألمنيوم', href: '/aluminum'         },
  { en: 'Glass',            ar: 'الزجاج',          href: '/upvc#glass'       },
  { en: 'Accessories',      ar: 'الإكسسوارات',     href: '/upvc#accessories' },
]

/** English type name for a /products/[slug] path — names the product in WhatsApp messages */
export function typeNameForPath(nav: HeaderNavData, pathname: string): string | undefined {
  const slug = pathname.startsWith('/products/') ? pathname.slice('/products/'.length) : ''
  for (const m of nav.materials) for (const g of m.groups) {
    const t = g.types.find(x => x.slug === slug)
    if (t) return t.name.en
  }
  return undefined
}

// ─── Active state ─────────────────────────────────────────────────────────────

/** Material tab is current on its landing page or on any type it offers */
export function isMaterialActive(pathname: string, id: MaterialId, nav: HeaderNavData): boolean {
  if (pathname === `/${id}`) return true
  const slug = pathname.startsWith('/products/') ? pathname.slice('/products/'.length) : ''
  return nav.typeMaterials[slug]?.includes(id) ?? false
}

/** Plain links match their path prefix; dropdowns match any child path */
export function isPathActive(pathname: string, hrefs: string[]): boolean {
  return hrefs.some(h => {
    const base = h.split('#')[0]
    return base !== '' && (pathname === base || pathname.startsWith(`${base}/`))
  })
}

/** Key, label, matched material and active flag for one header entry */
export function describeEntry(entry: NavEntry, nav: HeaderNavData, pathname: string) {
  if (entry.kind === 'material') {
    const material = nav.materials.find(m => m.id === entry.id)
    return {
      key: entry.id, material,
      label: material?.label ?? { en: entry.id, ar: entry.id },
      active: isMaterialActive(pathname, entry.id, nav),
    }
  }
  const hrefs = entry.kind === 'link' ? [entry.href] : entry.items.map(i => i.href)
  return { key: entry.key, label: entry.label, material: undefined, active: isPathActive(pathname, hrefs) }
}
