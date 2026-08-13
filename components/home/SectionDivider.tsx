'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface SectionDividerProps {
  en: string
  ar: string
}

export default function SectionDivider({ en, ar }: SectionDividerProps) {
  const { isRTL } = useLanguage();
  const label = isRTL ? ar : en;

  return (
    <div className="flex items-center gap-6 px-8 md:px-24 py-5 bg-white border-y border-border-light">
      <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-text-muted select-none">
        {label}
      </span>
      <div className="h-px flex-1 bg-border-light" aria-hidden="true" />
    </div>
  );
}
