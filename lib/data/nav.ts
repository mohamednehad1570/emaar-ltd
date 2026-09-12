/**
 * lib/data/nav.ts
 *
 * Single source of truth for all navigation data.
 *
 * Structure:
 *   NAV — top-level nav items for HeaderDesktopNav and MobileNavList
 *   SOLUTIONS_PRODUCTS — three-column Products tab data for the mega-menu
 *   SOLUTIONS_PROJECTS — two-item Projects tab data for the mega-menu
 *   ABOUT_DROPDOWN — simple dropdown items for the About nav item
 *
 * "Our Solutions" is handled separately from NAV.dropdown because it uses
 * a tabbed mega-menu (Products | Projects) rather than a flat dropdown list.
 * Keeping the data separate lets each consumer (desktop mega-menu, mobile
 * accordion) compose the structure it needs without coupling.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single navigable link with bilingual labels */
export interface NavLink {
  en:   string  // English label
  ar:   string  // Arabic label
  href: string  // Route path
}

/** One material column in the Products tab of the mega-menu */
export interface MaterialColumn {
  /** Column header — also a clickable link to the material landing page */
  material: NavLink
  /** Sub-category links listed below the header */
  items:    NavLink[]
}

/** A top-level nav item */
export interface NavItem {
  en:        string        // English label shown in the header bar
  ar:        string        // Arabic label shown in the header bar
  href:      string        // Route; empty string '' for items that open a dropdown
  /** Present only on items that open a simple compact dropdown (e.g. About) */
  dropdown?: NavLink[]
  /** True for "Our Solutions" — signals the desktop nav to open the mega-menu */
  megaMenu?: boolean
}

// ─── Our Solutions — Products tab ─────────────────────────────────────────────
// Three columns: uPVC | Aluminium | Glass
// Column headers are clickable (link to material landing page).
// Windows and Doors removed — consolidated into Doors & Windows.
// Stained Glass and Sandblast moved from uPVC/Aluminium into Glass column.

export const SOLUTIONS_PRODUCTS: MaterialColumn[] = [
  {
    // Column 1 — uPVC Systems
    material: { en: 'uPVC Systems', ar: 'أنظمة uPVC', href: '/products/upvc' },
    items: [
      { en: 'Doors & Windows', ar: 'أبواب ونوافذ',    href: '/products/upvc/doors-and-windows' },
      { en: 'Staircases',      ar: 'درابزين',          href: '/products/upvc/staircases'        },
      { en: 'Hebeschibe',      ar: 'نظام رفع وإزاحة',  href: '/products/upvc/hebeschibe'        },
    ],
  },
  {
    // Column 2 — Aluminium Systems (expanded range)
    material: { en: 'Aluminium Systems', ar: 'أنظمة الألومنيوم', href: '/products/aluminum' },
    items: [
      { en: 'Doors & Windows',   ar: 'أبواب ونوافذ',      href: '/products/aluminum/doors-and-windows' },
      { en: 'Staircases',        ar: 'درابزين',            href: '/products/aluminum/staircases'        },
      { en: 'Skylights',         ar: 'فتحات سقفية',        href: '/products/aluminum/skylights'         },
      { en: 'Pergola',           ar: 'برجولة',             href: '/products/aluminum/pergola'           },
      { en: 'Frameless Doors',   ar: 'أبواب بلا إطار',    href: '/products/aluminum/frameless-doors'   },
      { en: 'Security Systems',  ar: 'أنظمة الأمان',      href: '/products/aluminum/security-system'   },
      { en: 'Handrails',         ar: 'درابزين يدوي',       href: '/products/aluminum/handrails'         },
      { en: 'ACP Panels',        ar: 'ألواح ACP',          href: '/products/aluminum/acp-panels'        },
    ],
  },
  {
    // Column 3 — Glass Systems (new third material track)
    // Stained Glass and Sandblast consolidated here from uPVC and Aluminium
    material: { en: 'Glass Systems', ar: 'أنظمة الزجاج', href: '/products/glass' },
    items: [
      { en: 'Stained Glass', ar: 'زجاج ملون',  href: '/products/glass/stained-glass' },
      { en: 'Sandblast',     ar: 'زجاج مسند',  href: '/products/glass/sandblast'     },
    ],
  },
]

// ─── Our Solutions — Projects tab ─────────────────────────────────────────────
// Single column, two links — intentionally minimal; Projects page is coming soon.

export const SOLUTIONS_PROJECTS: NavLink[] = [
  { en: 'Villa Projects',    ar: 'مشاريع الفلل',   href: '/projects/villas'    },
  { en: 'Building Projects', ar: 'مشاريع المباني', href: '/projects/buildings' },
]

// ─── Primary navigation ────────────────────────────────────────────────────────
// Used by HeaderDesktopNav (desktop bar) and MobileNavList (mobile overlay).
// "Our Solutions" has megaMenu: true — consumers switch rendering accordingly.
// href is '' for items that never navigate directly (they open a panel instead).

export const NAV: NavItem[] = [
  {
    en: 'Home', ar: 'الرئيسية', href: '/',
  },
  {
    // megaMenu: true signals HeaderDesktopNav to render HeaderSolutionsMegaMenu
    // instead of the compact HeaderDropdown used for About.
    en: 'Our Solutions', ar: 'حلولنا', href: '', megaMenu: true,
  },
  {
    en: 'Technical', ar: 'المواصفات', href: '/technical',
  },
  {
    en: 'About', ar: 'من نحن', href: '',
    // Simple compact dropdown — no tabs, no columns
    dropdown: [
      { en: 'About Us',      ar: 'من نحن',           href: '/about'         },
      { en: 'Why Choose Us', ar: 'لماذا نحن',         href: '/why-choose-us' },
      { en: 'Careers',       ar: 'الوظائف',           href: '/careers'       },
      { en: 'FAQ',           ar: 'الأسئلة الشائعة',  href: '/faq'           },
    ],
  },
  {
    en: 'Contact', ar: 'اتصل بنا', href: '/contact',
  },
]

// ─── isActive helper ──────────────────────────────────────────────────────────
// Determines whether a nav item should show its active (red underline) state.
// Used by HeaderDesktopNav and MobileNavList.

export function isActive(
  pathname: string,
  href:     string,
  /** Pass item.dropdown links or SOLUTIONS_PRODUCTS/SOLUTIONS_PROJECTS hrefs
   *  so parent items activate when a child route is current. */
  childHrefs?: string[],
): boolean {
  // Home is only active on exactly '/'
  if (href === '/') return pathname === '/'
  // Direct match on the item's own href
  const base = href.split('?')[0]
  if (base && pathname.startsWith(base)) return true
  // Activate parent if any child route is current
  return childHrefs?.some(h => pathname.startsWith(h.split('?')[0])) ?? false
}

// Convenience: all hrefs nested under "Our Solutions" for the isActive check
export const SOLUTIONS_HREFS: string[] = [
  ...SOLUTIONS_PRODUCTS.flatMap(col => [col.material.href, ...col.items.map(i => i.href)]),
  ...SOLUTIONS_PROJECTS.map(p => p.href),
]
