// ─── ORGANIZATION (homepage) ─────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Emaar International",
    alternateName: "إعمار الدولية للصناعة ذ.م.م",
    url: "https://emaarupvc.ae",
    logo: "https://emaarupvc.ae/emaar-logo.png",
    description:
      "UAE-based manufacturer of premium uPVC and aluminum windows, doors, facades, and specialty glass systems. Serving contractors, architects, and developers across the Gulf.",
    foundingLocation: {
      "@type": "Place",
      name: "Sharjah, UAE",
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

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Emaar International",
    image: "https://emaarupvc.ae/emaar-logo.png",
    url: "https://emaarupvc.ae",
    description:
      "Premium uPVC and aluminum windows, doors, and facade systems manufacturer in the UAE.",
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

export function faqPageSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

// ─── BREADCRUMB LIST ──────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href,
    })),
  };
}
