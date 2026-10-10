/**
 * app/[locale]/page.tsx — Homepage (server component)
 *
 * Fully static — section copy lives in each client section; certificate
 * trust chips come from lib/data/certificates.ts.
 *
 * Section order:
 *   Hero → Stats + Certs → Products → Projects → Why → CTA
 */

import type { Metadata } from 'next';
import { CERTIFICATES } from '@/lib/data/certificates';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';
import { BRAND, PAGE_META } from '@/lib/data/pageMeta';
import { organizationSchema } from '@/lib/seo/jsonld';
import JsonLd from '@/components/seo/JsonLd';
import HeroSection           from '@/components/home/HeroSection';
import StatsSection          from '@/components/home/StatsSection';
import ProductsSection       from '@/components/home/ProductsSection';
import ProjectsSection       from '@/components/home/ProjectsSection';
import WhyChooseUsSection    from '@/components/home/WhyChooseUsSection';
import CTASection            from '@/components/home/CTASection';
import SectionDivider        from '@/components/home/SectionDivider';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const locale = await routeLocale(params);
  const meta = pageMetadata('home', locale, '/');
  // The layout's title.template only applies to child segments, never to this
  // page (same segment) — so the brand suffix is added here, once, as an absolute title
  return { ...meta, title: { absolute: `${PAGE_META.home.title[locale]} — ${BRAND[locale]}` } };
}

export default async function HomePage({ params }: { params: LocaleParams }) {
  const locale = await routeLocale(params);
  return (
    <>
    <JsonLd data={organizationSchema(locale)} />
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

      {/* TestimonialsSection unmounted — placeholder copy; no fake testimonials until real ones exist */}

      <CTASection />

    </div>
    </>
  );
}
