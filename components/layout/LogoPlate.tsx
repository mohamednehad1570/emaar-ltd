/**
 * components/layout/LogoPlate.tsx
 *
 * Circular white plate carrying the round Emaar mark — no wordmark at any size.
 * STATIC: 72 / 88 / 96 / 112px (<768 / md / lg / xl) at every scroll position, top
 * edge 8px into the 72px bar so it overhangs the bar by var(--logo-overhang).
 * Pure CSS sizing, so SSR paints the final box and nothing animates on scroll.
 * The header row is always dir="ltr", hence the physical left anchor.
 */

import LocaleLink from '@/components/ui/LocaleLink';
import Image from 'next/image';
import { cn } from '@/lib/cn';

const LABEL = { en: 'Emaar International — Home', ar: 'إعمار الدولية — الصفحة الرئيسية' };

// Literal class strings — Tailwind only generates classes it can read verbatim in source
const PLATE_SIZE  = 'size-[72px] md:size-[88px] lg:size-[96px] xl:size-[112px]';
const PLATE_WIDTH = 'w-[72px] md:w-[88px] lg:w-[96px] xl:w-[112px]';

interface LogoPlateProps {
  language: 'en' | 'ar';
  onNavigate?: () => void;
}

export default function LogoPlate({ language, onNavigate }: LogoPlateProps) {
  return (
    <LocaleLink
      href="/"
      onClick={onNavigate}
      aria-label={LABEL[language]}
      // Reserves the plate's width so the nav never slides under it
      className={cn('relative block h-full shrink-0', PLATE_WIDTH)}
    >
      <div
        data-logo-plate
        className={cn(
          'absolute top-2 left-0 rounded-full bg-white',
          'border border-border-light shadow-warm-md',
          PLATE_SIZE,
        )}
      >
        {/* 6% inset keeps the mark's outer ring clear of the plate edge */}
        <div className="absolute inset-[6%]">
          {/* Dev log flags this as the LCP element. Next 16 deprecates `priority`, and its docs
              prefer eager + fetchPriority over `preload` (never combine them) */}
          <Image src="/emaar-logo.png" alt="" fill sizes="112px" loading="eager" fetchPriority="high" className="object-contain" />
        </div>
      </div>
    </LocaleLink>
  );
}
