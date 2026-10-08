/**
 * lib/data/images.ts
 *
 * Values become /images/<path>.webp when real photos are inserted; later written by custom CMS.
 *
 * One key per image slot currently rendered on the site (inventoried from the
 * stock-photo placeholders + next/image call sites). Every value is null today so
 * <ImageSlot> renders its blank cream frame. Keys mirror the ids/slugs already
 * used in projectContent.ts and the home sections, so the
 * swap-over in Batch B is a lookup, not a rename.
 */

export type ImageSrc = string | null;

// Widened once here so `as const` keeps the keys readonly without narrowing values to `null`
const BLANK: ImageSrc = null;

export const IMAGES = {
  home: {
    hero: { slide1: BLANK, slide2: BLANK, slide3: BLANK },
    // FEATURED_PRODUCTS keys in homeFeatured.ts — 4-card static grid
    products: {
      hebeschiebe: BLANK, 'stained-glass': BLANK, 'curtain-wall': BLANK, 'slide-and-fold': BLANK,
    },
    // FEATURED_PROJECTS types in homeFeatured.ts — one card per project type
    projects: { residential: BLANK, commercial: BLANK },
  },

  // Catalog images (materials, product types, accessories, glass) live on the
  // catalog records themselves (heroImage / image fields in lib/data/catalog)

  // projectContent.ts ids — cover/hero image per featured project
  projects: {
    'jumeirah-villa': BLANK, 'palm-residence': BLANK, 'arabian-ranches-villa': BLANK,
    'meadows-villa': BLANK, 'business-bay-tower': BLANK, 'marina-heights': BLANK,
    'downtown-complex': BLANK, 'sharjah-office-park': BLANK,
  },

  about: {
    banner: BLANK, // AboutPageClient full-width facility banner
    // Team portraits in about.ts order — 1:1 slots
    team: { member1: BLANK, member2: BLANK, member3: BLANK, member4: BLANK },
  },

  // Technical download previews — one shared thumbnail per tech.ts category
  technical: {
    specs: BLANK, cad: BLANK, installation: BLANK,
    maintenance: BLANK, brochures: BLANK, certifications: BLANK,
  },

  // No photography on these pages today — groups reserved so the CMS writes a stable shape
  whyChooseUs: {},
  careers: {},
  contact: {},
} as const;
