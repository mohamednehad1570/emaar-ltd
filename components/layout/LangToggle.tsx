'use client';

/**
 * components/layout/LangToggle.tsx
 *
 * EN | ع switch shared by the header bar and the mobile overlay.
 * Active language uses `pendingLanguage ?? language` so the toggle highlights the
 * incoming language during the 150ms LanguageTransition crossfade, before the
 * context commits. Each button is a full 44×44 touch target.
 */

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';

const LANGS = [
  { lang: 'en' as const, label: 'EN', aria: 'Switch to English' },
  { lang: 'ar' as const, label: 'ع',  aria: 'Switch to Arabic'  },
];

export default function LangToggle() {
  const { language, toggleLanguage, pendingLanguage } = useLanguage();
  const displayLang = pendingLanguage ?? language;

  return (
    // dir=ltr keeps "EN | ع" in the same order in both languages
    <div className="flex items-center" dir="ltr">
      {LANGS.map(({ lang, label, aria }, i) => (
        <React.Fragment key={lang}>
          {i > 0 && <span className="text-dim text-xs select-none" aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={displayLang !== lang ? toggleLanguage : undefined}
            aria-label={aria}
            aria-pressed={displayLang === lang}
            className={cn(
              'min-w-[44px] min-h-[44px] flex items-center justify-center text-xs transition-colors duration-150',
              displayLang === lang
                ? 'font-bold text-ink-heading'
                : 'font-normal text-ink-muted hover:text-ink-body',
            )}
          >
            {label}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
}
