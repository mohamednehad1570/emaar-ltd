import ResidentialContent from '@/components/solutions/ResidentialContent';
import CommercialContent from '@/components/solutions/CommercialContent';

interface Props {
  type: 'residential' | 'commercial';
}

export default function SolutionTypePage({ type }: Props) {
  return (
    <div className="min-h-screen bg-off-white pt-[52px]">
      {type === 'residential' ? <ResidentialContent /> : <CommercialContent />}
    </div>
  );
}
