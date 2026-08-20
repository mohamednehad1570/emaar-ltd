/**
 * lib/data/productDetails.ts
 * Extended per-product data: specs, gallery images, related slugs.
 * Bilingual title/description/features come from lib/data/products.ts.
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
  /** Category slug matching the taxonomy in lib/data/products.ts */
  category:     string;
  specs:        ProductSpec;
  gallery:      string[];
  relatedSlugs: string[];
}

const u = (id: string) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

export const productDetails: Record<string, ProductDetail> = {
  'upvc-01': {
    slug: 'upvc-01', productId: 'UPVC-01', material: 'upvc', category: 'windows',
    specs: { dimensions: '600–1800 × 400–2400 mm', thermalValue: 'Uw 1.1 W/m²K', acousticRating: 'Rw 42 dB', warranty: '10 Years' },
    gallery: [u('1509644851169-2acc08aa25b5'), u('1628744876497-eb30460be9f6'), u('1534448554229-37f077ee8f8d')],
    relatedSlugs: ['upvc-02', 'upvc-04', 'al-04'],
  },
  'upvc-02': {
    slug: 'upvc-02', productId: 'UPVC-02', material: 'upvc', category: 'doors',
    specs: { dimensions: '1600–4800 × 2000–2500 mm', thermalValue: 'Uw 1.3 W/m²K', acousticRating: 'Rw 38 dB', warranty: '10 Years' },
    gallery: [u('1560185007-cde436f6a4d0'), u('1600607687920-4e2a09cf159d'), u('1595846519845-68e298c2edd8')],
    relatedSlugs: ['upvc-01', 'upvc-03', 'al-02'],
  },
  'upvc-03': {
    slug: 'upvc-03', productId: 'UPVC-03', material: 'upvc', category: 'doors',
    specs: { dimensions: '800–1200 × 2000–2400 mm', thermalValue: 'Uw 0.9 W/m²K', acousticRating: 'Rw 45 dB', warranty: '10 Years' },
    gallery: [u('1595846519845-68e298c2edd8'), u('1534448554229-37f077ee8f8d'), u('1509644851169-2acc08aa25b5')],
    relatedSlugs: ['upvc-05', 'upvc-02', 'al-02'],
  },
  'upvc-04': {
    slug: 'upvc-04', productId: 'UPVC-04', material: 'upvc', category: 'windows',
    specs: { dimensions: '300–3000 × 300–3000 mm', thermalValue: 'Uw 0.8 W/m²K', acousticRating: 'Rw 40 dB', warranty: '10 Years' },
    gallery: [u('1628744876497-eb30460be9f6'), u('1509644851169-2acc08aa25b5'), u('1486406146926-c627a92ad1ab')],
    relatedSlugs: ['upvc-01', 'al-04', 'al-01'],
  },
  'upvc-05': {
    slug: 'upvc-05', productId: 'UPVC-05', material: 'upvc', category: 'doors',
    specs: { dimensions: '1200–2400 × 2000–2200 mm', thermalValue: 'Uw 1.0 W/m²K', acousticRating: 'Rw 38 dB', warranty: '10 Years' },
    gallery: [u('1534448554229-37f077ee8f8d'), u('1595846519845-68e298c2edd8'), u('1560185007-cde436f6a4d0')],
    relatedSlugs: ['upvc-03', 'upvc-02', 'al-03'],
  },
  'al-01': {
    slug: 'al-01', productId: 'AL-01', material: 'aluminum', category: 'doors-and-windows',
    specs: { dimensions: 'Custom panels up to 6000 × 4500 mm', thermalValue: 'Uw 1.5 W/m²K', acousticRating: 'Rw 35 dB', warranty: '15 Years' },
    gallery: [u('1486406146926-c627a92ad1ab'), u('1497366216548-37526070297c'), u('1441986300917-64674bd600d8')],
    relatedSlugs: ['al-02', 'al-05', 'upvc-04'],
  },
  'al-02': {
    slug: 'al-02', productId: 'AL-02', material: 'aluminum', category: 'doors',
    specs: { dimensions: '1800–6000 × 2000–3000 mm', thermalValue: 'Uw 1.4 W/m²K', acousticRating: 'Rw 38 dB', warranty: '15 Years' },
    gallery: [u('1560185007-cde436f6a4d0'), u('1600607687920-4e2a09cf159d'), u('1486406146926-c627a92ad1ab')],
    relatedSlugs: ['al-03', 'upvc-02', 'al-04'],
  },
  'al-03': {
    slug: 'al-03', productId: 'AL-03', material: 'aluminum', category: 'doors',
    specs: { dimensions: '1800–6000 × 2000–3000 mm', thermalValue: 'Uw 1.6 W/m²K', acousticRating: 'Rw 35 dB', warranty: '15 Years' },
    gallery: [u('1600607687920-4e2a09cf159d'), u('1560185007-cde436f6a4d0'), u('1534448554229-37f077ee8f8d')],
    relatedSlugs: ['al-02', 'upvc-05', 'upvc-02'],
  },
  'al-04': {
    slug: 'al-04', productId: 'AL-04', material: 'aluminum', category: 'windows',
    specs: { dimensions: '400–1200 × 600–2000 mm', thermalValue: 'Uw 1.2 W/m²K', acousticRating: 'Rw 40 dB', warranty: '15 Years' },
    gallery: [u('1509644851169-2acc08aa25b5'), u('1628744876497-eb30460be9f6'), u('1497366216548-37526070297c')],
    relatedSlugs: ['upvc-01', 'upvc-04', 'al-02'],
  },
  'al-05': {
    slug: 'al-05', productId: 'AL-05', material: 'aluminum', category: 'doors',
    specs: { dimensions: 'Modular 1000–3000 mm W panels', thermalValue: 'Uw 2.0 W/m²K', acousticRating: 'Rw 32 dB', warranty: '15 Years' },
    gallery: [u('1441986300917-64674bd600d8'), u('1486406146926-c627a92ad1ab'), u('1497366216548-37526070297c')],
    relatedSlugs: ['al-01', 'al-02', 'al-03'],
  },
};
