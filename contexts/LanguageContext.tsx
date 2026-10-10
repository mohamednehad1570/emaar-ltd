'use client';

/**
 * contexts/LanguageContext.tsx
 *
 * The language is the URL: app/[locale]/layout.tsx reads the [locale] param on the
 * server and passes it in. The server HTML, the first client render and every later
 * render all see the same value, so there is no stored preference to sync, no
 * hydration reconciliation and no EN first paint on Arabic pages.
 * Switching language = navigating to the other URL (LangToggle), never a state write.
 */

import React, { createContext, useContext } from 'react';
import type { Locale } from '@/lib/i18n/locales';

type Language = Locale;

interface LanguageContextType {
  language: Language;
  isRTL:    boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ locale, children }: { locale: Language; children: React.ReactNode }) {
  return (
    <LanguageContext.Provider value={{ language: locale, isRTL: locale === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

/** Returns a bilingual string resolver bound to the current language. */
export function useTranslation() {
  const { language } = useLanguage();
  return (en: string, ar: string) => (language === 'en' ? en : ar);
}
