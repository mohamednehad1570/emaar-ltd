'use client';

/**
 * components/ui/PageHeader.tsx
 *
 * Shared compact page header for all inner pages.
 * Sits directly below the fixed site header (height = var(--header-h)).
 * Replaces every full-viewport hero on inner pages.
 *
 * Copy comes from PAGE_HEADERS (lib/data/pageHeaders.ts): every string is bilingual, so
 * /ar pages carry no English eyebrows, descriptions or chips. Data chips (phone numbers)
 * are isolated in LtrText so their digit groups never swap in RTL.
 */

import { cn } from '@/lib/cn';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/lib/i18n/localizePath';
import type { PageHeaderCopy } from '@/lib/data/uiStrings';
import LtrText from './LtrText';

interface AnchorLink {
  label: string;
  labelAr?: string;
  href: string;
}

interface PageHeaderProps {
  /** Eyebrow, H1, description and trust chips — both languages */
  copy: PageHeaderCopy;
  /** Hash-anchor quick links to sections further down the page */
  anchors?: AnchorLink[];
  /** When true the anchor row scrolls horizontally instead of wrapping */
  scrollable?: boolean;
  className?: string;
}

export default function PageHeader({ copy, anchors, scrollable, className }: PageHeaderProps) {
  const { language: lang, isRTL } = useLanguage();
  const { eyebrow, title, description, chips } = copy;

  return (
    <div
      className={cn(
        // Clears the 72px bar plus the logo plate's overhang, so the plate never covers the H1
        'bg-white border-b border-border-light pt-[calc(var(--header-h)+var(--logo-overhang))]',
        className,
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">

        {/* Eyebrow label */}
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-ink-muted mb-2">
            {eyebrow[lang]}
          </p>
        )}

        {/* H1 — page title */}
        <h1 className="text-4xl font-bold font-cairo text-ink-heading leading-tight">
          {title[lang]}
        </h1>

        {/* Subtitle / description */}
        {description && (
          <p className="text-ink-body text-base mt-2">{description[lang]}</p>
        )}

        {/* Trust chips */}
        {chips && chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {chips.map((chip) => (
              <span
                key={chip.en}
                className="bg-surface-cream text-ink-muted text-xs px-3 py-1 rounded-sm border border-border-light"
              >
                {chip.ltr ? <LtrText>{chip[lang]}</LtrText> : chip[lang]}
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
                // Same-page '#hash' passes through; a '/path#hash' gets the language prefix
                href={localizePath(anchor.href, lang)}
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
