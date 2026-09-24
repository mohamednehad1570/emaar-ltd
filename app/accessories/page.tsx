// Server component — all content is static, no CMS fetch needed yet
import PageHeader from '@/components/ui/PageHeader';
import BrandGrid from '@/components/accessories/BrandGrid';
import AccessoriesBySystem from '@/components/accessories/AccessoriesBySystem';
import QualityPillars from '@/components/accessories/QualityPillars';
import AccessoriesCTA from '@/components/accessories/AccessoriesCTA';

export const metadata = {
  title: 'Accessories — Emaar International',
  description: 'Premium European hardware across all uPVC and Aluminum product systems.',
};

export default function AccessoriesPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Hardware & Accessories"
        title="Premium Hardware. Global Brands."
        titleAr="أجهزة متميزة. علامات عالمية."
        description="European-sourced accessories across all uPVC and Aluminum product systems."
        descriptionAr="إكسسوارات أوروبية المصدر لجميع أنظمة PVC والألمنيوم."
        chips={['6 European brands', 'Germany · Italy · Spain · Turkey · Greece', 'All systems covered']}
      />
      <QualityPillars />
      <BrandGrid />
      <AccessoriesBySystem />
      <AccessoriesCTA />
    </main>
  );
}
