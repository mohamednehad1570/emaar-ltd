import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react';

interface ProductDetailHeroProps {
  heroImage: string;
  title: string;
  description: string;
  materialLabel: string;
  category: string;
  backHref: string;
  backLabel: string;
  isRTL: boolean;
}

export default function ProductDetailHero({
  heroImage, title, description, materialLabel, category,
  backHref, backLabel, isRTL,
}: ProductDetailHeroProps) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src={heroImage} alt={title} fill className="object-cover" priority sizes="100vw" />
        {/* Gradient direction mirrors reading direction so title stays on readable side */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-r' : 'bg-gradient-to-l'} from-brand-dark/90 via-brand-dark/60 to-transparent`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-12">
        <Link
          href={backHref}
          className={`inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          {/* rotate-180 flips arrow so it always points "back" in RTL */}
          <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          {backLabel}
        </Link>

        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-brand-red text-white text-xs font-bold uppercase tracking-wider">
            {materialLabel}
          </span>
          <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold">
            {category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
        <p className="text-lg text-white/80 max-w-2xl">{description}</p>
      </div>
    </section>
  );
}
