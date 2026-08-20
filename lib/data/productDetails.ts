/**
 * lib/data/productDetails.ts
 * Extended per-product data: specs, gallery images, related slugs.
 * Bilingual title/description/features come from lib/data/products.ts.
 *
 * gallery and relatedSlugs are intentionally empty — real assets come from Sanity.
 * This file exists as a static fallback: productDetails[slug] is checked in the
 * [slug]/page.tsx route handlers; if truthy the page renders instead of 404-ing.
 *
 * casement-window and tilt-turn-window exist in both uPVC and aluminum. A single
 * entry per slug is enough for the existence check. Sanity (material-aware fetch)
 * is the authoritative source for rendered L4 content.
 */

export interface ProductSpec {
  dimensions:    string;
  thermalValue:  string;
  acousticRating: string;
  warranty:      string;
}

export interface ProductDetail {
  slug:         string;
  productId:    string;
  material:     'upvc' | 'aluminum';
  category:     string;
  specs:        ProductSpec;
  gallery:      string[];
  relatedSlugs: string[];
}

const WIN_UPVC:   ProductSpec = { dimensions: '600–2400 × 400–2800 mm',      thermalValue: 'Uw 1.1 W/m²K', acousticRating: 'Rw 42 dB', warranty: '25 Years' };
const WIN_AL:     ProductSpec = { dimensions: 'Custom up to 3000 × 4000 mm', thermalValue: 'Uw 1.4 W/m²K', acousticRating: 'Rw 38 dB', warranty: '15 Years' };
const STAIR:      ProductSpec = { dimensions: 'Custom per project',           thermalValue: 'N/A',           acousticRating: 'N/A',      warranty: '10 Years' };
const SKYLIGHT:   ProductSpec = { dimensions: 'Custom up to 4000 × 6000 mm', thermalValue: 'Uw 1.2 W/m²K', acousticRating: 'Rw 35 dB', warranty: '15 Years' };
const DECORATIVE: ProductSpec = { dimensions: 'Custom per design',           thermalValue: 'N/A',           acousticRating: 'N/A',      warranty: '10 Years' };

export const productDetails: Record<string, ProductDetail> = {
  // ── uPVC ──────────────────────────────────────────────────────────────────

  'tilt-turn-window': {
    slug: 'tilt-turn-window', productId: 'UPVC-W-01', material: 'upvc', category: 'windows',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'casement-window': {
    slug: 'casement-window', productId: 'UPVC-W-02', material: 'upvc', category: 'windows',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'fixed-light-window': {
    slug: 'fixed-light-window', productId: 'UPVC-W-03', material: 'upvc', category: 'windows',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'front-door': {
    slug: 'front-door', productId: 'UPVC-D-01', material: 'upvc', category: 'doors',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'french-door': {
    slug: 'french-door', productId: 'UPVC-D-02', material: 'upvc', category: 'doors',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'sliding-patio-door': {
    slug: 'sliding-patio-door', productId: 'UPVC-D-03', material: 'upvc', category: 'doors',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'residential-suite': {
    slug: 'residential-suite', productId: 'UPVC-DW-01', material: 'upvc', category: 'doors-and-windows',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },
  'pvc-balustrade': {
    slug: 'pvc-balustrade', productId: 'UPVC-S-01', material: 'upvc', category: 'staircases',
    specs: STAIR, gallery: [], relatedSlugs: [],
  },
  'stained-glass-window': {
    slug: 'stained-glass-window', productId: 'UPVC-SG-01', material: 'upvc', category: 'stained-glass',
    specs: DECORATIVE, gallery: [], relatedSlugs: [],
  },
  'sandblast-panel': {
    slug: 'sandblast-panel', productId: 'UPVC-SB-01', material: 'upvc', category: 'sandblast',
    specs: DECORATIVE, gallery: [], relatedSlugs: [],
  },
  'lift-slide-door': {
    slug: 'lift-slide-door', productId: 'UPVC-H-01', material: 'upvc', category: 'hebeschibe',
    specs: WIN_UPVC, gallery: [], relatedSlugs: [],
  },

  // ── Aluminum ──────────────────────────────────────────────────────────────

  'sliding-door': {
    slug: 'sliding-door', productId: 'AL-D-01', material: 'aluminum', category: 'doors',
    specs: WIN_AL, gallery: [], relatedSlugs: [],
  },
  'bi-fold-door': {
    slug: 'bi-fold-door', productId: 'AL-D-02', material: 'aluminum', category: 'doors',
    specs: WIN_AL, gallery: [], relatedSlugs: [],
  },
  'entrance-door': {
    slug: 'entrance-door', productId: 'AL-D-03', material: 'aluminum', category: 'doors',
    specs: WIN_AL, gallery: [], relatedSlugs: [],
  },
  'curtain-wall': {
    slug: 'curtain-wall', productId: 'AL-DW-01', material: 'aluminum', category: 'doors-and-windows',
    specs: WIN_AL, gallery: [], relatedSlugs: [],
  },
  'glass-staircase': {
    slug: 'glass-staircase', productId: 'AL-S-01', material: 'aluminum', category: 'staircases',
    specs: STAIR, gallery: [], relatedSlugs: [],
  },
  'flat-roof-skylight': {
    slug: 'flat-roof-skylight', productId: 'AL-SK-01', material: 'aluminum', category: 'skylights',
    specs: SKYLIGHT, gallery: [], relatedSlugs: [],
  },
  'pitched-skylight': {
    slug: 'pitched-skylight', productId: 'AL-SK-02', material: 'aluminum', category: 'skylights',
    specs: SKYLIGHT, gallery: [], relatedSlugs: [],
  },
  'stained-glass-facade': {
    slug: 'stained-glass-facade', productId: 'AL-SG-01', material: 'aluminum', category: 'stained-glass',
    specs: DECORATIVE, gallery: [], relatedSlugs: [],
  },
  'sandblast-door': {
    slug: 'sandblast-door', productId: 'AL-SB-01', material: 'aluminum', category: 'sandblast',
    specs: DECORATIVE, gallery: [], relatedSlugs: [],
  },
};
