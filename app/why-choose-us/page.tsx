import { getTestimonials, getAwards, getClientLogos } from '@/lib/sanity/fetch';
import AdvantagesSection from '@/components/why-choose-us/AdvantagesSection';
import ProcessSection from '@/components/why-choose-us/ProcessSection';
import WarrantySection from '@/components/why-choose-us/WarrantySection';
import ClientTestimonialsSection from '@/components/why-choose-us/ClientTestimonialsSection';
import AwardsSection from '@/components/why-choose-us/AwardsSection';
import LogoTickerSection from '@/components/why-choose-us/LogoTickerSection';
import CTASection from '@/components/why-choose-us/CTASection';
import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo/metadata';

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return generatePageMetadata({
    title:       'Why Choose Emaar — Quality You Can Trust',
    description: 'Discover why UAE contractors, architects, and homeowners choose Emaar International: European-grade profiles, certified quality, and end-to-end project support.',
    path:        '/why-choose-us',
  });
}

export default async function WhyChooseUsPage() {
  const [testimonials, awards, clientLogos] = await Promise.all([
    getTestimonials(),
    getAwards(),
    getClientLogos(),
  ]);

  return (
    <div className="min-h-screen bg-off-white">
      <AdvantagesSection />
      <ProcessSection />
      <WarrantySection />
      <ClientTestimonialsSection testimonials={testimonials} />
      <AwardsSection awards={awards} />
      <LogoTickerSection clientLogos={clientLogos} />
      <CTASection />
    </div>
  );
}
