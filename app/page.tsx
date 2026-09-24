/**
 * app/page.tsx — Homepage (server component)
 *
 * Fetches CMS settings once at request time and passes CMS content as props
 * to the relevant client sections. All sections fall back to their hardcoded
 * strings when the CMS returns null or empty data.
 *
 * Section order:
 *   Hero → Stats + Certs → Products → Projects → Why → Testimonials → CTA
 */

import type { Metadata } from 'next';
import { getSiteSettings } from '@/lib/sanity/fetch';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import HeroSection           from '@/components/home/HeroSection';
import StatsSection          from '@/components/home/StatsSection';
import ProductsSection       from '@/components/home/ProductsSection';
import ProjectsSection       from '@/components/home/ProjectsSection';
import WhyChooseUsSection    from '@/components/home/WhyChooseUsSection';
import TestimonialsSection   from '@/components/home/TestimonialsSection';
import CTASection            from '@/components/home/CTASection';
import SectionDivider        from '@/components/home/SectionDivider';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Premium uPVC & Aluminum Windows and Doors',
    description: 'Emaar International manufactures premium uPVC and aluminum windows, doors, facades, and glass systems in the UAE. Trusted by contractors, architects, and developers across the Gulf.',
    path:        '/',
  });
}

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
    <JsonLd data={organizationSchema()} />
    <div className="min-h-screen">

      <HeroSection
        heroTagline={settings?.heroTagline}
        heroSubtitle={settings?.heroSubtitle}
        heroCTAPrimary={settings?.heroCTAPrimary}
        heroCTASecondary={settings?.heroCTASecondary}
      />

      {/* Stats and certification trust badges — numerals + chips in one section */}
      <StatsSection stats={settings?.stats} />

      <SectionDivider en="Our Products" ar="منتجاتنا" />
      <ProductsSection />

      <SectionDivider en="Our Projects" ar="مشاريعنا" />
      <ProjectsSection />

      <SectionDivider en="Why Emaar" ar="لماذا إعمار" />
      <WhyChooseUsSection />

      <SectionDivider en="Client Stories" ar="قصص العملاء" />
      <TestimonialsSection />

      <CTASection />

    </div>
    </>
  );
}
