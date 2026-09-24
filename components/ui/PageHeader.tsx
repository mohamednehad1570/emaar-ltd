'use client';

/**
 * components/ui/PageHeader.tsx
 *
 * Shared compact page header for all inner pages.
 * Sits directly below the fixed site header (h-[48px] mobile / h-14 desktop).
 * Replaces every full-viewport hero on inner pages.
 *
 * Uses useLanguage() for real-time EN/AR switching.
 * The optional locale prop overrides context (e.g. for preview renders).
 */

import { cn } from '@/lib/cn';
import { useLanguage } from '@/contexts/LanguageContext';

interface AnchorLink {
  label: string;
  labelAr?: string;
  href: string;
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  /** Small trust chips rendered below the description */
  chips?: string[];
  /** Hash-anchor quick links (e.g. to CategoryAccordion sections) */
  anchors?: AnchorLink[];
  /** When true the anchor row scrolls horizontally instead of wrapping */
  scrollable?: boolean;
  /** Override the language from context (useful for static renders) */
  locale?: 'en' | 'ar';
  className?: string;
}

export default function PageHeader({
  eyebrow, title, titleAr, description, descriptionAr,
  chips, anchors, scrollable, locale, className,
}: PageHeaderProps) {
  const { language, isRTL } = useLanguage();
  // locale prop takes precedence over context so callers can lock the language
  const lang = locale ?? language;

  const displayTitle = lang === 'ar' && titleAr ? titleAr : title;
  const displayDesc  = lang === 'ar' && descriptionAr ? descriptionAr : description;

  return (
    <div
      className={cn(
        // pt-[48px] clears mobile header; lg:pt-14 clears desktop header
        'bg-white border-b border-border-light pt-[48px] lg:pt-14',
        className,
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">

        {/* Eyebrow label */}
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2">
            {eyebrow}
          </p>
        )}

        {/* H1 — page title */}
        <h1 className="text-4xl font-bold font-cairo text-ink-heading leading-tight">
          {displayTitle}
        </h1>

        {/* Subtitle / description */}
        {displayDesc && (
          <p className="text-ink-body text-base mt-2">{displayDesc}</p>
        )}

        {/* Trust chips */}
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {chips.map((chip) => (
              <span
                key={chip}
                className="bg-surface-cream text-ink-muted text-xs px-3 py-1 rounded-sm border border-border-light"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Hash-anchor quick links */}
        {anchors && anchors.length > 0 && (
          <div
            className={cn(
              'flex mt-4',
              scrollable
                ? 'overflow-x-auto whitespace-nowrap no-scrollbar'
                : 'flex-wrap',
            )}
          >
            {anchors.map((anchor, i) => (
              <a
                key={anchor.href}
                href={anchor.href}
                className={cn(
                  'text-sm text-ink-muted hover:text-ink-heading transition-colors shrink-0',
                  'min-h-[44px] inline-flex items-center',
                  // Logical border + spacing — last item has no separator
                  i < anchors.length - 1 && 'border-e border-border-light pe-3 me-3',
                )}
              >
                {lang === 'ar' && anchor.labelAr ? anchor.labelAr : anchor.label}
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
