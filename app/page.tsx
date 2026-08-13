/**
 * app/page.tsx — Homepage (server component)
 *
 * Fetches CMS settings once at request time and passes CMS content as props
 * to the relevant client sections. All sections fall back to their hardcoded
 * strings when the CMS returns null or empty data.
 *
 * Section order:
 *   Hero → Stats + Certs → Products → Solutions → Projects → Why → Testimonials → CTA
 */

import { getSiteSettings } from '@/lib/sanity/fetch';
import HeroSection           from '@/components/home/HeroSection';
import StatsSection          from '@/components/home/StatsSection';
import CertificationsSection from '@/components/home/CertificationsSection';
import ProductsSection       from '@/components/home/ProductsSection';
import SolutionsSection      from '@/components/home/SolutionsSection';
import ProjectsSection       from '@/components/home/ProjectsSection';
import WhyChooseUsSection    from '@/components/home/WhyChooseUsSection';
import TestimonialsSection   from '@/components/home/TestimonialsSection';
import CTASection            from '@/components/home/CTASection';
import SectionDivider        from '@/components/home/SectionDivider';

export const revalidate = 3600;

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <div className="min-h-screen">

      <HeroSection
        heroTagline={settings?.heroTagline}
        heroSubtitle={settings?.heroSubtitle}
        heroCTAPrimary={settings?.heroCTAPrimary}
        heroCTASecondary={settings?.heroCTASecondary}
      />

      {/* Stats and certifications open without a divider — the numerals introduce themselves */}
      <StatsSection stats={settings?.stats} />
      <CertificationsSection />

      <SectionDivider en="Our Products" ar="منتجاتنا" />
      <ProductsSection />

      <SectionDivider en="Built For You" ar="صُمِّم لك" />
      <SolutionsSection />

      <SectionDivider en="Our Projects" ar="مشاريعنا" />
      <ProjectsSection />

      <SectionDivider en="Why Emaar" ar="لماذا إعمار" />
      <WhyChooseUsSection />

      <SectionDivider en="Client Stories" ar="قصص العملاء" />
      <TestimonialsSection />

      <CTASection />

    </div>
  );
}
