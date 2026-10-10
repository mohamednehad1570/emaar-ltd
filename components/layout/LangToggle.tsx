'use client';

/**
 * components/layout/LangToggle.tsx
 *
 * EN | ع switch shared by the header bar and the mobile overlay. The current language is
 * a plain label; the other one is a real, crawlable <a hreflang> to the SAME page in that
 * language, carrying the query + hash: /upvc#glass ↔ /ar/upvc#glass.
 *
 * Hash is browser-only, so the server renders the bare path and the hash joins after
 * hydration (useSyncExternalStore — same pattern as useProjectHashFilter). Option tabs
 * rewrite the hash with replaceState, which fires no event, so the click re-reads it.
 * The click is a full document load on purpose: the new page arrives with its own
 * server-rendered <html lang dir>, and the browser lands on the hash target (or the top).
 */

import React, { useSyncExternalStore } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { localizePath } from '@/lib/i18n/localizePath';
import { useLocalePathname } from '@/lib/i18n/useLocalePathname';
import type { Locale } from '@/lib/i18n/locales';
import { cn } from '@/lib/cn';
import LocaleLink from '@/components/ui/LocaleLink';

const LANGS: { lang: Locale; label: string; aria: string }[] = [
  { lang: 'en', label: 'EN', aria: 'Switch to English' },
  { lang: 'ar', label: 'ع',  aria: 'Switch to Arabic'  },
];

// ── URL suffix store (?query#hash) ─────────────────────────────────────────────
const suffixSubscribe = (cb: () => void) => {
  window.addEventListener('hashchange', cb);
  window.addEventListener('popstate', cb);
  return () => { window.removeEventListener('hashchange', cb); window.removeEventListener('popstate', cb); };
};
const suffixSnapshot = () => window.location.search + window.location.hash;
// Server never sees the hash; '' keeps SSR and the hydration pass identical
const suffixServerSnapshot = () => '';

// 44×44 touch target; identical box for the label and the link so nothing shifts
const CELL = 'min-w-[44px] min-h-[44px] flex items-center justify-center text-xs transition-colors duration-150';

// onDark: white text over the homepage hero while the header bar is transparent
export default function LangToggle({ onDark = false }: { onDark?: boolean }) {
  const { language } = useLanguage();
  const path = useLocalePathname();
  const suffix = useSyncExternalStore(suffixSubscribe, suffixSnapshot, suffixServerSnapshot);

  function follow(e: React.MouseEvent<HTMLAnchorElement>, lang: Locale) {
    // Modified clicks (new tab / window) keep the browser default on the rendered href
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    window.location.assign(localizePath(`${path}${suffixSnapshot()}`, lang));
  }

  return (
    // dir=ltr keeps "EN | ع" in the same order in both languages
    <div className="flex items-center" dir="ltr">
      {LANGS.map(({ lang, label, aria }, i) => (
        <React.Fragment key={lang}>
          {i > 0 && <span className={cn('text-xs select-none', onDark ? 'text-white/60' : 'text-dim')} aria-hidden="true">|</span>}
          {lang === language ? (
            <span aria-current="true" className={cn(CELL, 'font-bold', onDark ? 'text-white' : 'text-ink-heading')}>
              {label}
            </span>
          ) : (
            <LocaleLink
              href={`${path}${suffix}`}
              locale={lang}
              hrefLang={lang}
              lang={lang}
              aria-label={aria}
              // The other language is rarely visited — don't prefetch it on every page view
              prefetch={false}
              onClick={(e) => follow(e, lang)}
              className={cn(CELL, 'font-normal', onDark ? 'text-white/70 hover:text-white' : 'text-ink-muted hover:text-ink-body')}
            >
              {label}
            </LocaleLink>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
