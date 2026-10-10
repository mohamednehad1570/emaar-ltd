import { AWARDS } from '@/lib/data/awards';
import PageHeader from '@/components/ui/PageHeader';
import { PAGE_HEADERS } from '@/lib/data/uiStrings';
import AdvantagesSection from '@/components/why-choose-us/AdvantagesSection';
import ProcessSection from '@/components/why-choose-us/ProcessSection';
import WarrantySection from '@/components/why-choose-us/WarrantySection';
import AwardsSection from '@/components/why-choose-us/AwardsSection';
import CTASection from '@/components/why-choose-us/CTASection';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo/metadata';
import { routeLocale, type LocaleParams } from '@/lib/i18n/routeLocale';

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  return pageMetadata('whyChooseUs', await routeLocale(params), '/why-choose-us');
}

export default function WhyChooseUsPage() {
  return (
    <>
      <PageHeader copy={PAGE_HEADERS.whyChooseUs} />
      <div className="min-h-screen bg-off-white">
        <AdvantagesSection />
        <ProcessSection />
        <WarrantySection />
        {/* ClientTestimonialsSection + LogoTickerSection unmounted — no real testimonials/logos yet */}
        <AwardsSection awards={AWARDS} />
        <CTASection />
      </div>
    </>
  );
}
