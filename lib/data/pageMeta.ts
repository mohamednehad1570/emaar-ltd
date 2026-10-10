/**
 * lib/data/pageMeta.ts
 *
 * Search-result copy (<title> body + meta description) for every static page, in both
 * languages. The brand suffix is NOT part of these titles — the [locale] layout's
 * title.template adds it (" — Emaar International" / " — إعمار الدولية").
 * Arabic strings are interim translations, pending the client's copy review.
 * Product-type pages build theirs from the catalog (name + first description sentence).
 */

import type { Localized } from './nav';

export type PageKey =
  | 'home' | 'upvc' | 'aluminum' | 'projects' | 'technical' | 'about'
  | 'whyChooseUs' | 'careers' | 'contact' | 'faq' | 'notFound';

interface PageMetaEntry {
  title:       Localized;
  description: Localized;
}

export const BRAND: Localized = { en: 'Emaar International', ar: 'إعمار الدولية' };

export const PAGE_META: Record<PageKey, PageMetaEntry> = {
  home: {
    title: { en: 'Premium uPVC & Aluminum Windows and Doors', ar: 'نوافذ وأبواب uPVC والألمنيوم الفاخرة' },
    description: {
      en: 'Emaar International manufactures premium uPVC and aluminum windows, doors, facades, and glass systems in the UAE. Trusted by contractors, architects, and developers across the Gulf.',
      ar: 'تصنّع إعمار الدولية نوافذ وأبواب وواجهات وأنظمة زجاج فاخرة من uPVC والألمنيوم في الإمارات، بثقة المقاولين والمهندسين المعماريين والمطورين في أنحاء الخليج.',
    },
  },
  upvc: {
    title: { en: 'uPVC Windows & Doors', ar: 'نوافذ وأبواب uPVC' },
    description: {
      en: 'Emaar International uPVC window and door systems — sliding, casement, tilt & turn, Hebeschiebe lift & slide and more, with glass and hardware options.',
      ar: 'أنظمة نوافذ وأبواب uPVC من إعمار الدولية — منزلقة ومفصلية وقلّابة ومنزلقة بالرفع (هيبيشيبه) وغيرها، مع خيارات الزجاج والإكسسوارات.',
    },
  },
  aluminum: {
    title: { en: 'Aluminum Windows, Doors & Facades', ar: 'نوافذ وأبواب وواجهات الألمنيوم' },
    description: {
      en: 'Emaar International aluminum systems — sliding and hinged windows and doors, curtain wall, cladding, skylights, pergolas, handrails and security systems.',
      ar: 'أنظمة الألمنيوم من إعمار الدولية — نوافذ وأبواب منزلقة ومفصلية، وجدران ستائرية، وكسوة، ومناور، وبرجولات، ودرابزين، وأنظمة أمان.',
    },
  },
  projects: {
    title: { en: 'Our Projects', ar: 'مشاريعنا' },
    description: {
      en: 'Browse Emaar International\'s portfolio of uPVC and aluminium fenestration projects across residential and commercial developments in the UAE.',
      ar: 'تصفّح مشاريع إعمار الدولية لأنظمة النوافذ والأبواب من uPVC والألمنيوم في المشاريع السكنية والتجارية في الإمارات.',
    },
  },
  technical: {
    title: { en: 'Technical Specifications & CAD Downloads', ar: 'المواصفات الفنية وملفات CAD' },
    description: {
      en: 'Download technical data sheets, CAD files, certificates, and installation guides for Emaar International\'s uPVC and aluminium window and door systems.',
      ar: 'حمّل نشرات البيانات الفنية وملفات CAD والشهادات وأدلة التركيب لأنظمة نوافذ وأبواب uPVC والألمنيوم من إعمار الدولية.',
    },
  },
  about: {
    title: { en: 'About Us — UAE Windows & Doors Manufacturer', ar: 'من نحن — مصنع نوافذ وأبواب في الإمارات' },
    description: {
      en: 'Learn about Emaar International\'s story, manufacturing process, certifications, and the team behind the UAE\'s leading uPVC and aluminium systems manufacturer.',
      ar: 'تعرّف على قصة إعمار الدولية وعمليات التصنيع والشهادات والفريق وراء أنظمة uPVC والألمنيوم الرائدة في الإمارات.',
    },
  },
  whyChooseUs: {
    title: { en: 'Why Choose Emaar — Quality You Can Trust', ar: 'لماذا إعمار — جودة يمكنك الوثوق بها' },
    description: {
      en: 'Discover why UAE contractors, architects, and homeowners choose Emaar International: European-grade profiles, certified quality, and end-to-end project support.',
      ar: 'اكتشف لماذا يختار المقاولون والمهندسون المعماريون وأصحاب المنازل في الإمارات إعمار الدولية: قطاعات بمعايير أوروبية، وجودة معتمدة، ودعم متكامل للمشاريع.',
    },
  },
  careers: {
    title: { en: 'Careers', ar: 'الوظائف' },
    description: {
      en: 'Join Emaar International\'s growing team. Explore open positions in fenestration manufacturing, installation, and sales across the UAE.',
      ar: 'انضم إلى فريق إعمار الدولية المتنامي، واستكشف الوظائف المتاحة في تصنيع النوافذ والأبواب والتركيب والمبيعات في الإمارات.',
    },
  },
  contact: {
    title: { en: 'Contact Us — Get a Quote', ar: 'اتصل بنا — اطلب عرض سعر' },
    description: {
      en: 'Contact Emaar International for custom quotes on uPVC windows, aluminium doors, glass systems, and facades. Reach us by phone, WhatsApp, or our online form.',
      ar: 'تواصل مع إعمار الدولية للحصول على عروض أسعار مخصصة لنوافذ uPVC وأبواب الألمنيوم وأنظمة الزجاج والواجهات، عبر الهاتف أو واتساب أو النموذج الإلكتروني.',
    },
  },
  faq: {
    title: { en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' },
    description: {
      en: 'Answers to common questions about uPVC vs aluminium windows, installation timelines, maintenance, warranties, and ordering from Emaar International.',
      ar: 'إجابات عن الأسئلة الشائعة حول الفرق بين نوافذ uPVC والألمنيوم، ومدة التركيب، والصيانة، والضمانات، والطلب من إعمار الدولية.',
    },
  },
  notFound: {
    title: { en: 'Page Not Found', ar: 'الصفحة غير موجودة' },
    description: {
      en: 'The page you are looking for does not exist or has been moved.',
      ar: 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.',
    },
  },
};
