'use client';

/**
 * app/page.tsx
 *
 * Homepage composition.
 * Section dividers sit between every major section — thin ruled lines
 * with centred label text. They create visual breathing room and give
 * the reader a textual signal of what's coming next, like a chapter heading.
 *
 * Divider anatomy:
 *   bg-white border-y border-border-light  — blends into any section bg
 *   h-px flex-1 bg-border-light           — hairline rules on each side
 *   text-xs uppercase tracking-[0.25em]   — editorial label register
 *
 * Section order rationale:
 *   Hero → credentials (Stats + Certs) → products → audience split (Solutions)
 *   → portfolio (Projects) → argument (Why) → evidence (Testimonials) → convert (CTA)
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroSection           from '@/components/home/HeroSection';
import StatsSection          from '@/components/home/StatsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ProductsSection       from '@/components/home/ProductsSection';
import SolutionsSection      from '@/components/home/SolutionsSection';
import ProjectsSection       from '@/components/home/ProjectsSection';
import WhyChooseUsSection    from '@/components/home/WhyChooseUsSection';
import TestimonialsSection   from '@/components/home/TestimonialsSection';
import CTASection            from '@/components/home/CTASection';

/* ── Section divider ───────────────────────────────────────────────────── */

function SectionDivider({ label }: { label: string }) {
  return (
    /* border-y on a white bg gives a hairline above and below the label row */
    <div className="flex items-center gap-6 px-8 md:px-24 py-5 bg-white border-y border-border-light">
      <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted select-none">
        {label}
      </span>
      <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const { isRTL, language } = useLanguage();

  /* Bilingual divider labels — ordered as they appear on the page */
  const labels = language === 'en'
    ? {
        numbers:  'By The Numbers',
        quality:  'Quality Assured',
        products: 'Our Products',
        built:    'Built For You',
        projects: 'Our Projects',
        why:      'Why Emaar',
        stories:  'Client Stories',
      }
    : {
        numbers:  'بالأرقام',
        quality:  'جودة مضمونة',
        products: 'منتجاتنا',
        built:    'صُمِّم لك',
        projects: 'مشاريعنا',
        why:      'لماذا إعمار',
        stories:  'قصص العملاء',
      };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      <HeroSection />

      <SectionDivider label={labels.numbers} />
      <StatsSection />

      <SectionDivider label={labels.quality} />
      <CertificationsSection />

      <SectionDivider label={labels.products} />
      <ProductsSection />

      <SectionDivider label={labels.built} />
      <SolutionsSection />

      <SectionDivider label={labels.projects} />
      <ProjectsSection />

      <SectionDivider label={labels.why} />
      <WhyChooseUsSection />

      <SectionDivider label={labels.stories} />
      <TestimonialsSection />

      <CTASection />

    </div>
  );
}
