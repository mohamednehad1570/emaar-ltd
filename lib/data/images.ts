/**
 * lib/data/images.ts
 *
 * Values become /images/<path>.webp when real photos are inserted; later written by custom CMS.
 *
 * One key per image slot currently rendered on the site (inventoried from the
 * Unsplash placeholders + next/image call sites). Every value is null today so
 * <ImageSlot> renders its blank cream frame. Keys mirror the ids/slugs already
 * used in materialContent.ts, projectContent.ts and the home sections, so the
 * swap-over in Batch B is a lookup, not a rename.
 */

export type ImageSrc = string | null;

// Widened once here so `as const` keeps the keys readonly without narrowing values to `null`
const BLANK: ImageSrc = null;

export const IMAGES = {
  home: {
    hero: { slide1: BLANK, slide2: BLANK, slide3: BLANK },
    // ProductsSection carousel ids — note 'hebeschibe' spelling matches the existing component id
    products: {
      pergola: BLANK, 'stained-glass': BLANK, 'upvc-doors-windows': BLANK,
      skylights: BLANK, 'alu-staircases': BLANK, hebeschibe: BLANK,
      'frameless-doors': BLANK, 'alu-doors-windows': BLANK, 'security-systems': BLANK,
      sandblast: BLANK, 'upvc-staircases': BLANK, handrails: BLANK, 'acp-panels': BLANK,
    },
    // ProjectsSection marquee ids
    projects: {
      'villa-jumeirah': BLANK, 'building-business-bay': BLANK, 'villa-palm': BLANK,
      'building-marina': BLANK, 'villa-arabian': BLANK, 'building-downtown': BLANK,
      'villa-meadows': BLANK, 'building-sharjah': BLANK,
    },
  },

  products: {
    // /products landing — one tile per material
    landing: { upvc: BLANK, aluminum: BLANK, glass: BLANK },
    showcase: BLANK, // ProductShowcase feature panel
    // Category keys = materialContent.ts slugs = page anchor ids (must stay in sync)
    upvc: {
      hero: BLANK, cta: BLANK,
      categories: {
        doors: BLANK, windows: BLANK, 'curtain-wall': BLANK,
        staircases: BLANK, hebeschiebe: BLANK,
      },
    },
    aluminum: {
      hero: BLANK, cta: BLANK,
      categories: {
        doors: BLANK, windows: BLANK, 'curtain-wall': BLANK, 'acp-cladding': BLANK,
        staircases: BLANK, skylights: BLANK, pergola: BLANK, 'frameless-doors': BLANK,
        'security-system': BLANK, handrails: BLANK,
      },
    },
    glass: {
      hero: BLANK, cta: BLANK,
      categories: {
        'double-glazing': BLANK, 'stained-glass': BLANK,
        'sandblasted-glass': BLANK, 'decorative-glass': BLANK,
      },
    },
  },

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
