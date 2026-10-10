/**
 * lib/seo/jsonld.ts
 * schema.org blocks, one per locale: name / description in the page's language,
 * `inLanguage` set, and `url` pointing at that language's home. The other-language
 * name rides along as alternateName so both spellings resolve to one entity.
 */

import type { Locale } from '@/lib/i18n/locales';
import { SITE_URL, absoluteUrl } from './site';

const ORG_NAME = { en: 'Emaar International Industry', ar: 'إعمار الدولية للصناعة' } as const;
const LANG_TAG: Record<Locale, string> = { en: 'en-AE', ar: 'ar-AE' };
const other = (locale: Locale): Locale => (locale === 'en' ? 'ar' : 'en');

// ─── ORGANIZATION (homepage) ─────────────────────────────────────────────────

export function organizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME[locale],
    alternateName: ORG_NAME[other(locale)],
    inLanguage: LANG_TAG[locale],
    url: absoluteUrl('/', locale),
    logo: `${SITE_URL}/emaar-logo.png`,
    description: locale === 'ar'
      ? 'مصنع إماراتي لنوافذ وأبواب وواجهات وأنظمة زجاج فاخرة من uPVC والألمنيوم، يخدم المقاولين والمهندسين المعماريين والمطورين في أنحاء الخليج.'
      : 'UAE-based manufacturer of premium uPVC and aluminum windows, doors, facades, and specialty glass systems. Serving contractors, architects, and developers across the Gulf.',
    foundingLocation: {
      "@type": "Place",
      name: locale === 'ar' ? 'الشارقة، الإمارات' : 'Sharjah, UAE',
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      areaServed: "AE",
      availableLanguage: ["English", "Arabic"],
    },
    sameAs: [],
  };
}

// ─── LOCAL BUSINESS (contact page) ───────────────────────────────────────────

export function localBusinessSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: locale === 'ar' ? 'إعمار الدولية' : 'Emaar International',
    inLanguage: LANG_TAG[locale],
    image: `${SITE_URL}/emaar-logo.png`,
    url: absoluteUrl('/', locale),
    description: locale === 'ar'
      ? 'مصنع نوافذ وأبواب وأنظمة واجهات فاخرة من uPVC والألمنيوم في الإمارات.'
      : 'Premium uPVC and aluminum windows, doors, and facade systems manufacturer in the UAE.',
    address: {
      "@type": "PostalAddress",
      streetAddress: "SAIF Zone",
      addressLocality: "Sharjah",
      addressRegion: "Sharjah",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.3284,
      longitude: 55.5136,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 25.3284,
        longitude: 55.5136,
      },
      geoRadius: "500000",
    },
    priceRange: "$$$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };
}

// ─── FAQ PAGE (/faq) ──────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqPageSchema(faqs: FAQItem[], locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: LANG_TAG[locale],
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
