'use client';

/**
 * contexts/LanguageContext.tsx
 *
 * Language state with a brief crossfade window on toggle.
 * isTransitioning fires true for 150 ms before the language commits,
 * giving LanguageTransition.tsx time to fade the page content to 0.
 * pendingLanguage lets the LangToggle reflect the incoming language
 * immediately — before the actual language state settles — so the
 * toggle feels instant even though the content fades.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language:        Language;
  setLanguage:     (lang: Language) => void;
  toggleLanguage:  () => void;
  isRTL:           boolean;
  isTransitioning: boolean;
  /** Set to the incoming language for the 150 ms before language commits. */
  pendingLanguage: Language | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Reads prefers-reduced-motion synchronously — avoids importing Framer Motion into context. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage]               = useState<Language>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  // Load persisted language on mount only.
  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'en' || saved === 'ar') setLanguage(saved);
  }, []);

  // Sync document direction and lang attribute whenever language changes.
  // This is the single source of truth for DOM-level RTL/LTR state.
  useEffect(() => {
    document.documentElement.dir  = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    // DOM updates (dir, lang) are handled exclusively by the effect above.
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'ar' : 'en';

    // OS requested no animation — switch instantly, no fade window.
    if (prefersReducedMotion()) {
      handleSetLanguage(nextLang);
      return;
    }

    // Flip the toggle UI immediately so the header gives instant feedback.
    setPendingLanguage(nextLang);
    setIsTransitioning(true);

    // After fade-out completes, commit the language and begin fade-in.
    setTimeout(() => {
      handleSetLanguage(nextLang);
      setIsTransitioning(false);
      setPendingLanguage(null);
    }, 150);
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, toggleLanguage, isRTL, isTransitioning, pendingLanguage }}
    >
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
