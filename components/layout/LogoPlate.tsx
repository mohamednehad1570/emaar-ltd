'use client';

/**
 * components/layout/LogoPlate.tsx
 *
 * Circular white plate carrying the round Emaar mark — no wordmark at any size.
 * Resting plate: 72 / 88 / 96 / 112px (<768 / md / lg / xl), top edge 8px into the
 * 72px bar so it overhangs the bar by var(--logo-overhang). Scrolled ("compact"):
 * 56px, fully inside the bar (8px above and below).
 *
 * The resting size is pure CSS so SSR paints the right box at every breakpoint;
 * the shrink is a Framer scale (56 / measured rest width) with origin top-left,
 * so layout never reflows. The header row is always dir="ltr", hence physical left.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

const COMPACT_PX = 56;
// ≤0.4s ease-out per spec — lands with the header's 0.3s frosted-glass fade
const SHRINK = { duration: 0.3, ease: 'easeOut' as const };
const LABEL = { en: 'Emaar International — Home', ar: 'إعمار الدولية — الصفحة الرئيسية' };

// Literal class strings — Tailwind only generates classes it can read verbatim in source
const PLATE_SIZE  = 'size-[72px] md:size-[88px] lg:size-[96px] xl:size-[112px]';
const PLATE_WIDTH = 'w-[72px] md:w-[88px] lg:w-[96px] xl:w-[112px]';

interface LogoPlateProps {
  compact: boolean;
  language: 'en' | 'ar';
  onNavigate?: () => void;
}

export default function LogoPlate({ compact, language, onNavigate }: LogoPlateProps) {
  const reduce = useReducedMotion();
  const plate = useRef<HTMLDivElement>(null);
  // Resting width is breakpoint-dependent — track it so the compact scale is always 56px
  const [rest, setRest] = useState(112);

  useEffect(() => {
    const el = plate.current;
    if (!el) return;
    // offsetWidth ignores transforms, so this is always the CSS resting size
    const ro = new ResizeObserver(() => setRest(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={LABEL[language]}
      // Reserves the resting plate's width so the nav never slides under it
      className={cn('relative block h-full shrink-0', PLATE_WIDTH)}
    >
      <motion.div
        ref={plate}
        initial={false}
        animate={{ scale: compact ? COMPACT_PX / rest : 1 }}
        transition={reduce ? { duration: 0 } : SHRINK}
        className={cn(
          'absolute top-2 left-0 origin-top-left rounded-full bg-white',
          'border border-border-light shadow-warm-md',
          PLATE_SIZE,
        )}
      >
        {/* 6% inset keeps the mark's outer ring clear of the plate edge */}
        <div className="absolute inset-[6%]">
          <Image src="/emaar-logo.png" alt="" fill sizes="112px" priority className="object-contain" />
        </div>
      </motion.div>
    </Link>
  );
}
