/**
 * app/page.tsx — Homepage (server component)
 *
 * Fully static — section copy lives in each client section; certificate
 * trust chips come from lib/data/certificates.ts.
 *
 * Section order:
 *   Hero → Stats + Certs → Products → Projects → Why → Testimonials → CTA
 */

import type { Metadata } from 'next';
import { CERTIFICATES } from '@/lib/data/certificates';
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

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Premium uPVC & Aluminum Windows and Doors',
    description: 'Emaar International manufactures premium uPVC and aluminum windows, doors, facades, and glass systems in the UAE. Trusted by contractors, architects, and developers across the Gulf.',
    path:        '/',
  });
}

export default function HomePage() {
  return (
    <>
    <JsonLd data={organizationSchema()} />
    <div className="min-h-screen">

      <HeroSection />

      {/* Stats and certification trust badges — numerals + chips in one section */}
      <StatsSection certificates={CERTIFICATES} />

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
