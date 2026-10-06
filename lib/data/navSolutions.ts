/**
 * lib/data/navSolutions.ts
 *
 * The "Our Solutions" tree: Products (→ Material → Items), Projects, Accessories.
 * Consumed via lib/data/nav.ts, which re-exports SOLUTIONS alongside the types.
 * Every item is a hash anchor on an existing page; slugs must match the ids
 * rendered there (materialContent.ts slugs, ProjectsGrid, accessories sections).
 */

import type { SolutionsTree } from './nav'

export const SOLUTIONS: SolutionsTree = {
  products: {
    label:   { en: 'Products', ar: 'المنتجات' },
    viewAll: { en: 'View all products', ar: 'عرض كل المنتجات', href: '/products' },
    materials: {
      upvc: {
        label:   { en: 'uPVC Systems', ar: 'أنظمة uPVC' },
        viewAll: { en: 'View all uPVC', ar: 'عرض كل أنظمة uPVC', href: '/products/upvc' },
        groups: [{
          items: [
            { en: 'Doors',        ar: 'أبواب',            href: '/products/upvc#doors'        },
            { en: 'Windows',      ar: 'نوافذ',            href: '/products/upvc#windows'      },
            { en: 'Curtain Wall', ar: 'جدار ستارة',       href: '/products/upvc#curtain-wall' },
            // Slug must match materialContent.ts ("hebeschiebe") or the anchor misses
            { en: 'Hebeschiebe',  ar: 'نظام رفع وإزاحة', href: '/products/upvc#hebeschiebe'  },
            { en: 'Staircases',   ar: 'درابزين',          href: '/products/upvc#staircases'   },
          ],
        }],
      },
      aluminum: {
        label:   { en: 'Aluminium Systems', ar: 'أنظمة الألومنيوم' },
        viewAll: { en: 'View all aluminium', ar: 'عرض كل أنظمة الألومنيوم', href: '/products/aluminum' },
        groups: [
          {
            label: { en: 'Core Systems', ar: 'الأنظمة الأساسية' },
            items: [
              { en: 'Doors',        ar: 'أبواب',       href: '/products/aluminum#doors'        },
              { en: 'Windows',      ar: 'نوافذ',       href: '/products/aluminum#windows'      },
              { en: 'Curtain Wall', ar: 'جدار ستارة',  href: '/products/aluminum#curtain-wall' },
              { en: 'ACP Cladding', ar: 'كسوة ACP',    href: '/products/aluminum#acp-cladding' },
              { en: 'Skylights',    ar: 'فتحات سقفية', href: '/products/aluminum#skylights'    },
            ],
          },
          {
            label: { en: 'Specialty', ar: 'منتجات متخصصة' },
            items: [
              { en: 'Security Systems', ar: 'أنظمة الأمان',   href: '/products/aluminum#security-system' },
              { en: 'Pergola',          ar: 'برجولة',         href: '/products/aluminum#pergola'         },
              { en: 'Handrails',        ar: 'درابزين يدوي',   href: '/products/aluminum#handrails'       },
              { en: 'Frameless Doors',  ar: 'أبواب بلا إطار', href: '/products/aluminum#frameless-doors' },
              { en: 'Staircases',       ar: 'درابزين',        href: '/products/aluminum#staircases'      },
            ],
          },
        ],
      },
      glass: {
        label:   { en: 'Glass Systems', ar: 'أنظمة الزجاج' },
        viewAll: { en: 'View all glass', ar: 'عرض كل أنظمة الزجاج', href: '/products/glass' },
        groups: [{
          items: [
            { en: 'Double Glazing',    ar: 'زجاج مزدوج', href: '/products/glass#double-glazing'    },
            { en: 'Stained Glass',     ar: 'زجاج ملون',  href: '/products/glass#stained-glass'     },
            { en: 'Sandblasted Glass', ar: 'زجاج مسند',  href: '/products/glass#sandblasted-glass' },
            { en: 'Decorative Glass',  ar: 'زجاج زخرفي', href: '/products/glass#decorative-glass'  },
          ],
        }],
      },
    },
  },
  projects: {
    label:   { en: 'Projects', ar: 'المشاريع' },
    viewAll: { en: 'View all projects', ar: 'عرض كل المشاريع', href: '/projects' },
    groups: [{
      items: [
        // Anchors must match ProjectType values — ProjectsGrid renders them as section ids
        { en: 'Residential Projects', ar: 'المشاريع السكنية',  href: '/projects#residential' },
        { en: 'Commercial Projects',  ar: 'المشاريع التجارية', href: '/projects#commercial'  },
      ],
    }],
  },
  accessories: {
    label:   { en: 'Accessories', ar: 'الإكسسوارات' },
    viewAll: { en: 'View all accessories', ar: 'عرض كل الإكسسوارات', href: '/accessories' },
    groups: [{
      items: [
        { en: 'Our Brands',         ar: 'علاماتنا التجارية',  href: '/accessories#brands'   },
        { en: 'uPVC Hardware',      ar: 'إكسسوارات uPVC',     href: '/accessories#upvc'     },
        { en: 'Aluminium Hardware', ar: 'إكسسوارات الألومنيوم', href: '/accessories#aluminum' },
        { en: 'Quality Standards',  ar: 'معايير الجودة',      href: '/accessories#quality'  },
      ],
    }],
  },
}
