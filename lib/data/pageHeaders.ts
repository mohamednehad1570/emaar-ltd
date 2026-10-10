/**
 * lib/data/pageHeaders.ts
 *
 * Copy for the compact PageHeader on inner pages (eyebrow, H1, description, trust chips),
 * one bilingual record per page. EN is the text the pages used to pass inline.
 * AR machine-translated — needs native review.
 * `ltr: true` marks a chip that is data (a phone number): PageHeader isolates it in LtrText,
 * otherwise RTL would swap its digit groups ("800 2226" → "2226 800").
 */

import type { Localized } from './nav';

export interface PageHeaderChip extends Localized {
  ltr?: true;
}

export interface PageHeaderCopy {
  eyebrow?: Localized;
  title: Localized;
  description?: Localized;
  chips?: PageHeaderChip[];
}

export const PAGE_HEADERS = {
  about: {
    eyebrow: { en: 'Company', ar: 'الشركة' },
    title: { en: 'About Emaar', ar: 'عن إعمار' },
    description: {
      en: '26 years manufacturing uPVC, Aluminum, and Glass systems in the UAE.',
      ar: '26 عاماً في تصنيع أنظمة uPVC والألومنيوم والزجاج في الإمارات.',
    },
    chips: [
      { en: 'Est. 2000', ar: 'تأسست عام 2000' },
      { en: 'SAIF Zone Sharjah', ar: 'المنطقة الحرة لمطار الشارقة' },
      { en: '50,000 sqft factory', ar: 'مصنع بمساحة 50,000 قدم مربع' },
    ],
  },
  technical: {
    eyebrow: { en: 'Resources', ar: 'الموارد' },
    title: { en: 'Technical Documentation', ar: 'الوثائق التقنية' },
    description: {
      en: 'Specifications, CAD files, brochures, and certificates for all product systems.',
      ar: 'المواصفات وملفات CAD والكتيبات والشهادات لجميع أنظمة المنتجات.',
    },
    chips: [
      { en: 'Specs PDFs', ar: 'مواصفات بصيغة PDF' },
      { en: 'CAD files', ar: 'ملفات CAD' },
      { en: 'Certificates', ar: 'الشهادات' },
    ],
  },
  careers: {
    eyebrow: { en: 'Join Us', ar: 'انضم إلينا' },
    title: { en: 'Careers at Emaar', ar: 'وظائف في إعمار' },
    description: {
      en: 'Join a 26-year manufacturing leader in the UAE.',
      ar: 'انضم إلى شركة رائدة في التصنيع منذ 26 عاماً في الإمارات.',
    },
    chips: [
      { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات' },
      { en: 'SAIF Zone', ar: 'المنطقة الحرة لمطار الشارقة' },
    ],
  },
  faq: {
    eyebrow: { en: 'Support', ar: 'الدعم' },
    title: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
    description: {
      en: 'Everything you need to know about our products, installation, and warranties.',
      ar: 'كل ما تحتاج معرفته عن منتجاتنا والتركيب والضمانات.',
    },
  },
  contact: {
    eyebrow: { en: 'Get in Touch', ar: 'ابقَ على تواصل' },
    title: { en: 'Contact Us', ar: 'تواصل معنا' },
    description: { en: 'We Care. We Listen. We Deliver.', ar: 'نهتم. نستمع. ننجز.' },
    chips: [
      { en: '800 2226', ar: '800 2226', ltr: true },
      // Reads right-to-left as "Sunday–Thursday, 8 am–6 pm"
      { en: 'Sun–Thu 8am–6pm', ar: 'الأحد–الخميس، 8 ص–6 م' },
    ],
  },
  whyChooseUs: {
    eyebrow: { en: 'Why Choose Us', ar: 'لماذا تختارنا' },
    title: { en: 'Built Different.', ar: 'نحن مختلفون' },
    description: {
      en: 'German engineering standards. European hardware. 26 years in the UAE.',
      ar: 'معايير هندسية ألمانية. تجهيزات أوروبية. 26 عاماً في الإمارات.',
    },
    chips: [
      { en: 'ISO 14001', ar: 'ISO 14001' },
      { en: 'DIN certified', ar: 'معتمد وفق DIN' },
      { en: 'UAE Municipality approved', ar: 'معتمد من البلديات في الإمارات' },
    ],
  },
} satisfies Record<string, PageHeaderCopy>;
