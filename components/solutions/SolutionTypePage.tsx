'use client';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ResidentialContent from '@/components/solutions/ResidentialContent';
import CommercialContent from '@/components/solutions/CommercialContent';

interface Props {
  type: 'residential' | 'commercial';
}

const BREADCRUMB_ITEMS = {
  residential: [
    { label: 'Solutions', labelAr: 'الحلول', href: '/solutions' },
    { label: 'Residential', labelAr: 'سكني' },
  ],
  commercial: [
    { label: 'Solutions', labelAr: 'الحلول', href: '/solutions' },
    { label: 'Commercial', labelAr: 'تجاري' },
  ],
} as const;

export default function SolutionTypePage({ type }: Props) {
  return (
    <div className="min-h-screen bg-off-white pt-[52px]">
      <Breadcrumbs items={[...BREADCRUMB_ITEMS[type]]} />
      {type === 'residential' ? <ResidentialContent /> : <CommercialContent />}
    </div>
  );
}
