import { getTestimonials, getAwards, getClientLogos } from '@/lib/sanity/fetch';
import HeroSection from '@/components/why-choose-us/HeroSection';
import AdvantagesSection from '@/components/why-choose-us/AdvantagesSection';
import ProcessSection from '@/components/why-choose-us/ProcessSection';
import MaintenanceSection from '@/components/why-choose-us/MaintenanceSection';
import WarrantySection from '@/components/why-choose-us/WarrantySection';
import ClientTestimonialsSection from '@/components/why-choose-us/ClientTestimonialsSection';
import AwardsSection from '@/components/why-choose-us/AwardsSection';
import LogoTickerSection from '@/components/why-choose-us/LogoTickerSection';
import ComparisonSection from '@/components/why-choose-us/ComparisonSection';
import TestimonialsSection from '@/components/why-choose-us/TestimonialsSection';
import CTASection from '@/components/why-choose-us/CTASection';

export const revalidate = 3600;

export default async function WhyChooseUsPage() {
  const [testimonials, awards, clientLogos] = await Promise.all([
    getTestimonials(),
    getAwards(),
    getClientLogos(),
  ]);

  return (
    <div className="min-h-screen bg-off-white">
      <HeroSection />
      <AdvantagesSection />
      <ProcessSection />
      <MaintenanceSection />
      <WarrantySection />
      <ClientTestimonialsSection testimonials={testimonials} />
      <AwardsSection awards={awards} />
      <LogoTickerSection clientLogos={clientLogos} />
      <ComparisonSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
