/**
 * lib/data/nav.ts
 *
 * Single source of truth for all navigation data.
 *
 * Structure:
 *   NAV — top-level nav items for HeaderDesktopNav and MobileNavList
 *   SOLUTIONS_PRODUCTS — three-column Products mega-menu data
 *   SOLUTIONS_PROJECTS — Projects compact dropdown data
 */

// ─── Types ────────────────────────────────────────────────────────────────────

/** A single navigable link with bilingual labels */
export interface NavLink {
  en:   string
  ar:   string
  href: string
  /** When true, a visual divider renders above this item */
  dividerBefore?: boolean
  /** Optional section label rendered above this item (after dividerBefore) */
  groupLabel?: { en: string; ar: string }
}

/** One material column in the Products mega-menu */
export interface MaterialColumn {
  /** Column header — clickable link to the material landing page */
  material: NavLink
  /** All sub-category links; dividerBefore + groupLabel split them into visual groups */
  items:    NavLink[]
}

/** A top-level nav item */
export interface NavItem {
  en:        string
  ar:        string
  href:      string
  dropdown?: NavLink[]
  /** True for Products — signals desktop nav to render the mega-menu */
  megaMenu?: boolean
}

// ─── Products mega-menu — 3 columns ───────────────────────────────────────────
// Column headers are clickable material landing-page links.
// All sub-item hrefs are hash anchors — no sub-routes exist.

export const SOLUTIONS_PRODUCTS: MaterialColumn[] = [
  {
    // Column 1 — uPVC Systems
    material: { en: 'uPVC Systems', ar: 'أنظمة uPVC', href: '/products/upvc' },
    items: [
      { en: 'Doors',        ar: 'أبواب',             href: '/products/upvc#doors'        },
      { en: 'Windows',      ar: 'نوافذ',             href: '/products/upvc#windows'      },
      { en: 'Curtain Wall', ar: 'جدار ستارة',        href: '/products/upvc#curtain-wall' },
      { en: 'Hebeschiebe',  ar: 'نظام رفع وإزاحة',  href: '/products/upvc#hebeschibe'   },
      { en: 'Staircases',   ar: 'درابزين',           href: '/products/upvc#staircases'   },
    ],
  },
  {
    // Column 2 — Aluminium Systems — two visual groups separated by dividerBefore
    material: { en: 'Aluminium Systems', ar: 'أنظمة الألومنيوم', href: '/products/aluminum' },
    items: [
      // Group 1 — Core Systems
      {
        en: 'Doors',        ar: 'أبواب',         href: '/products/aluminum#doors',
        groupLabel: { en: 'Core Systems', ar: 'الأنظمة الأساسية' },
      },
      { en: 'Windows',      ar: 'نوافذ',         href: '/products/aluminum#windows'      },
      { en: 'Curtain Wall', ar: 'جدار ستارة',    href: '/products/aluminum#curtain-wall' },
      { en: 'ACP Cladding', ar: 'كسوة ACP',      href: '/products/aluminum#acp-cladding' },
      { en: 'Skylights',    ar: 'فتحات سقفية',   href: '/products/aluminum#skylights'    },
      // Group 2 — Specialty (dividerBefore triggers border-t + label)
      {
        en: 'Security Systems', ar: 'أنظمة الأمان', href: '/products/aluminum#security-system',
        dividerBefore: true,
        groupLabel: { en: 'Specialty', ar: 'منتجات متخصصة' },
      },
      { en: 'Pergola',          ar: 'برجولة',          href: '/products/aluminum#pergola'          },
      { en: 'Handrails',        ar: 'درابزين يدوي',    href: '/products/aluminum#handrails'        },
      { en: 'Frameless Doors',  ar: 'أبواب بلا إطار', href: '/products/aluminum#frameless-doors'  },
      { en: 'Staircases',       ar: 'درابزين',         href: '/products/aluminum#staircases'       },
    ],
  },
  {
    // Column 3 — Glass Systems
    material: { en: 'Glass Systems', ar: 'أنظمة الزجاج', href: '/products/glass' },
    items: [
      { en: 'Double Glazing',    ar: 'زجاج مزدوج',  href: '/products/glass#double-glazing'    },
      { en: 'Stained Glass',     ar: 'زجاج ملون',    href: '/products/glass#stained-glass'     },
      { en: 'Sandblasted Glass', ar: 'زجاج مسند',    href: '/products/glass#sandblasted-glass' },
      { en: 'Decorative Glass',  ar: 'زجاج زخرفي',   href: '/products/glass#decorative-glass'  },
    ],
  },
]

// ─── Projects dropdown ────────────────────────────────────────────────────────
// Compact dropdown used by the "Projects" nav item on desktop.
// "All Projects" gets a visual divider above it via dividerBefore.

export const SOLUTIONS_PROJECTS: NavLink[] = [
  { en: 'Villa Projects',    ar: 'مشاريع الفلل',   href: '/projects#villas'    },
  { en: 'Building Projects', ar: 'مشاريع المباني', href: '/projects#buildings' },
  { en: 'All Projects',      ar: 'جميع المشاريع',  href: '/projects', dividerBefore: true },
]

// ─── Primary navigation ────────────────────────────────────────────────────────
// Products (mega-menu) · Projects (dropdown) · Accessories · Technical · About · Contact
// Home removed — the logo serves as the home link.

export const NAV: NavItem[] = [
  {
    // Products: signals HeaderDesktopNav to open HeaderSolutionsMegaMenu
    en: 'Products', ar: 'المنتجات', href: '', megaMenu: true,
  },
  {
    // Projects: compact dropdown — Villas / Buildings / All Projects
    en: 'Projects', ar: 'المشاريع', href: '',
    dropdown: SOLUTIONS_PROJECTS,
  },
  {
    en: 'Accessories', ar: 'الإكسسوارات', href: '/accessories',
  },
  {
    en: 'Technical', ar: 'المواصفات', href: '/technical',
  },
  {
    en: 'About', ar: 'من نحن', href: '',
    dropdown: [
      { en: 'About Us',      ar: 'من نحن',          href: '/about'         },
      { en: 'Why Choose Us', ar: 'لماذا نحن',        href: '/why-choose-us' },
      { en: 'Careers',       ar: 'الوظائف',          href: '/careers'       },
      { en: 'FAQ',           ar: 'الأسئلة الشائعة', href: '/faq', dividerBefore: true },
    ],
  },
  {
    en: 'Contact', ar: 'اتصل بنا', href: '/contact',
  },
]

// ─── isActive helper ──────────────────────────────────────────────────────────

export function isActive(
  pathname: string,
  href:     string,
  childHrefs?: string[],
): boolean {
  if (!href) return childHrefs?.some(h => pathname.startsWith(h.split('#')[0].replace(/\/$/, '') || '/')) ?? false
  if (href === '/') return pathname === '/'
  const base = href.split('#')[0]
  if (base && pathname.startsWith(base)) return true
  return childHrefs?.some(h => {
    const b = h.split('#')[0]
    return b && pathname.startsWith(b)
  }) ?? false
}

// Flat href list for "Our Solutions" active-state detection on the Products nav item
export const SOLUTIONS_HREFS: string[] = [
  ...SOLUTIONS_PRODUCTS.flatMap(col => [
    col.material.href,
    ...col.items.map(i => i.href.split('#')[0]),
  ]).filter((v, i, a) => v && a.indexOf(v) === i),
  ...SOLUTIONS_PROJECTS.map(p => p.href.split('#')[0]).filter(Boolean),
]
