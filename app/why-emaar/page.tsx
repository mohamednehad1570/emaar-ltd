import HeroSection from './HeroSection';
import AdvantagesSection from './AdvantagesSection';
import ProcessSection from './ProcessSection';
import MaintenanceSection from './MaintenanceSection';
import WarrantySection from './WarrantySection';
import CertificationsSection from './CertificationsSection';
import ComparisonSection from './ComparisonSection';
import TestimonialsSection from './TestimonialsSection';
import CTASection from './CTASection';

export default function WhyEmaarPage() {
  return (
    <div className="min-h-screen bg-off-white">
      <HeroSection />
      <AdvantagesSection />
      <ProcessSection />
      <MaintenanceSection />
      <WarrantySection />
      <CertificationsSection />
      <ComparisonSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
