'use client';

/**
 * components/ui/EmaarLogo.tsx
 *
 * Shared brand mark + name. Size presets:
 *   header — 52 / 60 / 72px (mobile / tablet / desktop) at rest; `compact` shrinks
 *            it to 46 / 52 / 56px with transform: scale() only, so the layout box
 *            never changes and nothing around it reflows.
 *   footer — the header's resting size, never compact.
 *
 * The resting box is set in CSS (responsive classes) so SSR paints the right size;
 * JS only supplies the compact scale factor for the current breakpoint.
 *
 * Name: no "LLC" — the legal suffix lives only in the footer copyright line.
 *   EN ≥768px "Emaar International Industry" · EN <768px "Emaar Int. Ind."
 *   AR all sizes "إعمار الدولية للصناعة"
 */

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBreakpoint, type Breakpoint } from '@/lib/hooks/useBreakpoint';
import { cn } from '@/lib/cn';

// [resting, compact] px per breakpoint — the approved Oct 6 2026 spec
const HEADER_SIZES: Record<Breakpoint, [number, number]> = {
  mobile:  [52, 46],
  tablet:  [60, 52],
  desktop: [72, 56],
};

// Same easing/duration as the header's frosted-glass fade so both land together
const SHRINK = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export const BRAND_NAME = {
  en:      'Emaar International Industry',
  enShort: 'Emaar Int. Ind.',
  ar:      'إعمار الدولية للصناعة',
} as const;

interface EmaarLogoProps {
  size?: 'header' | 'footer';
  /** Header only — scrolled state */
  compact?: boolean;
  showText?: boolean;
  // 'md' = header prominence (heading black); 'sm' = footer subdued (muted)
  textSize?: 'sm' | 'md';
  className?: string;
}

export default function EmaarLogo({
  size = 'header', compact = false, showText = true, textSize = 'md', className,
}: EmaarLogoProps) {
  const { language } = useLanguage();
  const bp = useBreakpoint();
  const [rest, small] = HEADER_SIZES[bp];
  const shrink = size === 'header' && compact;

  return (
    <div className={cn('flex flex-row items-center gap-3', className)}>

      {/* ── Mark ───────────────────────────────────────────────── */}
      {/* origin-left: the header is always dir="ltr", so the mark shrinks toward
          the container edge and never drifts away from it */}
      <motion.div
        className="relative shrink-0 size-[52px] md:size-[60px] xl:size-[72px] origin-left"
        animate={{ scale: shrink ? small / rest : 1 }}
        transition={SHRINK}
      >
        <Image
          src="/emaar-logo.png"
          // Decorative beside the visible name; carries the name when shown alone
          alt={showText ? '' : BRAND_NAME.en}
          fill
          // 72px is the largest rendered box; 2× density handled by next/image
          sizes="72px"
          className="object-contain"
          priority={size === 'header'}
        />
      </motion.div>

      {/* ── Name — size never changes; it slides in to close the gap the
             scaled mark leaves behind ─────────────────────────────── */}
      {showText && (
        <motion.span
          className={cn(
            'font-bold leading-tight whitespace-nowrap',
            textSize === 'md' ? 'text-base text-ink-heading' : 'text-sm text-ink-muted',
          )}
          animate={{ x: shrink ? small - rest : 0 }}
          transition={SHRINK}
        >
          {language === 'ar' ? BRAND_NAME.ar : (
            <>
              <span className="md:hidden">{BRAND_NAME.enShort}</span>
              <span className="hidden md:inline">{BRAND_NAME.en}</span>
            </>
          )}
        </motion.span>
      )}
    </div>
  );
}
