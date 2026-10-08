'use client';

/**
 * components/ui/EmaarLogo.tsx
 *
 * Footer brand mark + name (the header uses LogoPlate — mark only, no wordmark).
 * Mark: 52 / 60 / 72px (mobile / md / xl), sized in CSS so SSR paints it correctly.
 *
 * Name: no "LLC" — the legal suffix lives only in the footer copyright line.
 *   EN ≥768px "Emaar International Industry" · EN <768px "Emaar Int. Ind."
 *   AR all sizes "إعمار الدولية للصناعة"
 */

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';

export const BRAND_NAME = {
  en:      'Emaar International Industry',
  enShort: 'Emaar Int. Ind.',
  ar:      'إعمار الدولية للصناعة',
} as const;

interface EmaarLogoProps {
  showText?: boolean;
  // 'md' = heading black; 'sm' = footer subdued (muted)
  textSize?: 'sm' | 'md';
  className?: string;
}

export default function EmaarLogo({ showText = true, textSize = 'sm', className }: EmaarLogoProps) {
  const { language } = useLanguage();

  return (
    <div className={cn('flex flex-row items-center gap-3', className)}>
      {/* ── Mark ───────────────────────────────────────────────── */}
      <div className="relative shrink-0 size-[52px] md:size-[60px] xl:size-[72px]">
        <Image
          src="/emaar-logo.png"
          // Decorative beside the visible name; carries the name when shown alone
          alt={showText ? '' : BRAND_NAME.en}
          fill
          sizes="72px"
          className="object-contain"
        />
      </div>

      {/* ── Name ───────────────────────────────────────────────── */}
      {showText && (
        <span
          className={cn(
            'font-bold leading-tight whitespace-nowrap',
            textSize === 'md' ? 'text-base text-ink-heading' : 'text-sm text-ink-muted',
          )}
        >
          {language === 'ar' ? BRAND_NAME.ar : (
            <>
              <span className="md:hidden">{BRAND_NAME.enShort}</span>
              <span className="hidden md:inline">{BRAND_NAME.en}</span>
            </>
          )}
        </span>
      )}
    </div>
  );
}
