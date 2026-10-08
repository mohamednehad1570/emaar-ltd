/**
 * lib/data/navSolutions.ts
 *
 * The "Our Solutions" tree: Products (→ Material → Items), Projects, Accessories.
 * Consumed via lib/data/nav.ts, which re-exports SOLUTIONS alongside the types.
 * Material items are derived from lib/data/catalog so nav links can never drift
 * from the 22 /products/[slug] pages. Glass and Accessories point at the #glass /
 * #accessories sections on the material pages until they become tabs.
 */

import type { NavBranch, NavGroup, SolutionsTree } from './nav'
import { TYPE_GROUPS, getTypesByGroup, type MaterialId } from './catalog'

// One labelled column per type group that has items for this material
function typeGroups(material: MaterialId): NavGroup[] {
  return TYPE_GROUPS
    .map(g => ({
      label: g.label,
      items: getTypesByGroup(material, g.id).map(t => ({ ...t.name, href: `/products/${t.slug}` })),
    }))
    .filter(g => g.items.length > 0)
}

// Glass + accessories items differ in hash target per material, so mobile row keys stay unique
function optionBranch(
  label: NavBranch['label'], hash: string, viewAll: { en: string; ar: string },
): NavBranch {
  return {
    label,
    viewAll: { ...viewAll, href: `/upvc#${hash}` },
    groups: [{
      items: [
        { en: 'For uPVC',     ar: 'لأنظمة uPVC',     href: `/upvc#${hash}`     },
        { en: 'For Aluminum', ar: 'لأنظمة الألمنيوم', href: `/aluminum#${hash}` },
      ],
    }],
  }
}

export const SOLUTIONS: SolutionsTree = {
  products: {
    label:   { en: 'Products', ar: 'المنتجات' },
    // No all-products page any more — uPVC is the default material (matches mega-menu default)
    viewAll: { en: 'View all products', ar: 'عرض كل المنتجات', href: '/upvc' },
    materials: {
      upvc: {
        label:   { en: 'uPVC Systems', ar: 'أنظمة uPVC' },
        viewAll: { en: 'View all uPVC', ar: 'عرض كل أنظمة uPVC', href: '/upvc' },
        groups:  typeGroups('upvc'),
      },
      aluminum: {
        label:   { en: 'Aluminum Systems', ar: 'أنظمة الألمنيوم' },
        viewAll: { en: 'View all aluminum', ar: 'عرض كل أنظمة الألمنيوم', href: '/aluminum' },
        groups:  typeGroups('aluminum'),
      },
      glass: optionBranch(
        { en: 'Glass', ar: 'الزجاج' }, 'glass',
        { en: 'View all glass', ar: 'عرض كل أنواع الزجاج' },
      ),
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
  accessories: optionBranch(
    { en: 'Accessories', ar: 'الإكسسوارات' }, 'accessories',
    { en: 'View all accessories', ar: 'عرض كل الإكسسوارات' },
  ),
}
