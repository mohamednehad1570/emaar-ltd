/**
 * lib/data/techDocuments.ts
 * Technical documents shown as "Available on request" — replaces the old CMS
 * `techDocument` type. No file URLs on purpose: every card routes to a
 * request (WhatsApp/contact) instead of a download until files are approved.
 */

import type { Localized, TechDocument, TechDocumentCategory } from '@/lib/types';

export const TECH_DOCUMENT_CATEGORIES: Record<TechDocumentCategory, Localized<string>> = {
  'profile-systems': { en: 'Profile Systems', ar: 'أنظمة القطاعات' },
  glass: { en: 'Glass', ar: 'الزجاج' },
  accessories: { en: 'Accessories', ar: 'الإكسسوارات' },
  certificates: { en: 'Certificates', ar: 'الشهادات' },
};

// Shared suffix keeps the 10 profile entries uniform in both languages
const sheet = (model: Localized<string>): Localized<string> => ({
  en: `${model.en} — Technical Data Sheet`,
  ar: `${model.ar} — النشرة الفنية`,
});

// Model names stay Latin in Arabic — they are manufacturer system codes (W 632, Klasline Plus,
// Montana). The two names built from a generic English word get an Arabic form; the width
// stays a Latin code. AR machine-translated — needs native review.
const PROFILE_MODELS: Localized<string>[] = [
  ...['W 632', 'W 640', 'W 750', 'W 880 Hebeschiebe', 'Klasline Plus', 'CW-50', 'TB-600']
    .map((code) => ({ en: code, ar: code })),
  { en: '45mm Hinged', ar: 'مفصلي 45mm' },
  { en: 'Sliding 105mm', ar: 'منزلق 105mm' },
  { en: 'Montana 120mm', ar: 'Montana 120mm' },
];

export const TECH_DOCUMENTS: TechDocument[] = [
  ...PROFILE_MODELS.map((model): TechDocument => ({
    // id from the EN name — unchanged from before the AR forms existed
    id: model.en.toLowerCase().replace(/\s+/g, '-'),
    title: sheet(model),
    category: 'profile-systems',
  })),
  {
    id: 'glass-specifications',
    title: { en: 'Glass Specifications & Performance', ar: 'مواصفات الزجاج وأداؤه' },
    category: 'glass',
  },
  {
    id: 'accessories-catalogue',
    title: { en: 'Hardware & Accessories Catalogue', ar: 'كتالوج الإكسسوارات والملحقات' },
    category: 'accessories',
  },
  {
    id: 'iso-14001-certificate',
    title: { en: 'ISO 14001 Certificate', ar: 'شهادة ISO 14001' },
    category: 'certificates',
  },
  {
    id: 'civil-defence-approval',
    title: {
      en: 'UAE Municipality & Civil Defence Approval',
      ar: 'اعتماد البلدية والدفاع المدني في الإمارات',
    },
    category: 'certificates',
  },
];
