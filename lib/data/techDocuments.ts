/**
 * lib/data/techDocuments.ts
 * Technical documents shown as "Available on request" — replaces the Sanity
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
const sheet = (model: string): Localized<string> => ({
  en: `${model} — Technical Data Sheet`,
  ar: `${model} — النشرة الفنية`,
});

// Model names stay Latin in Arabic — they are manufacturer system codes
const PROFILE_MODELS = [
  'W 632', 'W 640', 'W 750', 'W 880 Hebeschiebe', 'Klasline Plus',
  'CW-50', 'TB-600', '45mm Hinged', 'Sliding 105mm', 'Montana 120mm',
] as const;

export const TECH_DOCUMENTS: TechDocument[] = [
  ...PROFILE_MODELS.map((model): TechDocument => ({
    id: model.toLowerCase().replace(/\s+/g, '-'),
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
