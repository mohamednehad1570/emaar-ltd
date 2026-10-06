/**
 * lib/data/homeFeatured.ts
 *
 * Homepage featured grids — 4 products + 2 projects, replacing the old marquees.
 * Every href is a hash anchor on a landing page; the fragment must match an id
 * the target page actually renders (materialContent.ts slugs / ProjectsGrid
 * type ids) — see CLAUDE.md "Routing rules".
 */

import { IMAGES, type ImageSrc } from './images';

export interface Bilingual {
  en: string;
  ar: string;
}

export interface FeaturedProduct {
  key:      keyof typeof IMAGES.home.products;
  material: Bilingual;
  name:     Bilingual;
  tagline:  Bilingual;
  href:     string;
  image:    ImageSrc;
}

export interface FeaturedProject {
  type:  keyof typeof IMAGES.home.projects;
  label: Bilingual;
  line:  Bilingual;
  href:  string;
  image: ImageSrc;
}

// Shared chip copy so both uPVC cards read identically
const UPVC: Bilingual = { en: 'uPVC', ar: 'يو بي في سي' };

// Order matters — it is the visual order in the grid (mirrored by dir in AR)
export const FEATURED_PRODUCTS: readonly FeaturedProduct[] = [
  {
    key: 'hebeschiebe',
    material: UPVC,
    name:    { en: 'Hebeschiebe Lift & Slide', ar: 'أبواب هيبيشيبه للرفع والانزلاق' },
    tagline: {
      en: 'Floor-to-ceiling panoramas on a lift-and-slide system',
      ar: 'إطلالات بانورامية من الأرض إلى السقف بنظام الرفع والانزلاق',
    },
    href:  '/products/upvc#hebeschiebe',
    image: IMAGES.home.products.hebeschiebe,
  },
  {
    key: 'stained-glass',
    material: { en: 'Glass', ar: 'زجاج' },
    name:    { en: 'Stained Glass', ar: 'الزجاج المعشّق' },
    tagline: { en: 'Crafted in-house, colour by hand', ar: 'مصنوع يدوياً في مصنعنا' },
    href:  '/products/glass#stained-glass',
    image: IMAGES.home.products['stained-glass'],
  },
  {
    key: 'curtain-wall',
    material: { en: 'Aluminium', ar: 'ألمنيوم' },
    name:    { en: 'Curtain Wall', ar: 'الواجهات الزجاجية' },
    tagline: {
      en: 'Structural glazing for towers and facades',
      ar: 'واجهات زجاجية إنشائية للأبراج والمباني',
    },
    href:  '/products/aluminum#curtain-wall',
    image: IMAGES.home.products['curtain-wall'],
  },
  {
    key: 'slide-and-fold',
    material: UPVC,
    name:    { en: 'Slide & Fold', ar: 'أبواب الطي والانزلاق' },
    tagline: { en: 'Open an entire wall to the outdoors', ar: 'افتح الجدار بالكامل نحو الخارج' },
    // No dedicated slide-and-fold category — it lives under uPVC doors
    href:  '/products/upvc#doors',
    image: IMAGES.home.products['slide-and-fold'],
  },
];

export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    type:  'residential',
    label: { en: 'Residential', ar: 'سكني' },
    line:  { en: 'Villas and homes across the Emirates', ar: 'فلل ومنازل في أنحاء الإمارات' },
    href:  '/projects#residential',
    image: IMAGES.home.projects.residential,
  },
  {
    type:  'commercial',
    label: { en: 'Commercial', ar: 'تجاري' },
    line:  { en: 'Towers, offices and facades', ar: 'أبراج ومكاتب وواجهات' },
    href:  '/projects#commercial',
    image: IMAGES.home.projects.commercial,
  },
];

// Section headers — copy carried over verbatim from the old marquee sections
export const HOME_FEATURED_COPY = {
  products: {
    eyebrow:  { en: 'Product Range', ar: 'نطاق المنتجات' },
    title:    { en: 'Our Products', ar: 'منتجاتنا' },
    subtitle: { en: 'Every system, every scale', ar: 'كل نظام، كل مقياس' },
    viewAll:  { en: 'View all products', ar: 'عرض جميع المنتجات' },
  },
  projects: {
    eyebrow:  { en: 'Our Portfolio', ar: 'محفظتنا' },
    title:    { en: 'Featured Projects', ar: 'المشاريع المميزة' },
    subtitle: {
      en: 'Residential and commercial projects across the Emirates',
      ar: 'مشاريع سكنية وتجارية عبر الإمارات',
    },
    explore:  { en: 'Explore', ar: 'استكشف' },
  },
} as const;
