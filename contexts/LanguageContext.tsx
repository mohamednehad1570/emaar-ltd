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
 *
 * Hydration safety: 'language' is driven by useSyncExternalStore so that
 * the server snapshot ('en') and client snapshot (localStorage) are kept
 * separate. React uses getServerSnapshot for SSR and the initial hydration
 * reconciliation pass, so the server HTML (English) and the first client
 * render agree — no hydration mismatch warning, even when the user had
 * previously selected Arabic.
 */

import React, { createContext, useContext, useState, useEffect, useSyncExternalStore } from 'react';

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

// ── External language store ────────────────────────────────────────────────────
// Module-level listener set for same-tab notifications; the 'storage' event
// covers cross-tab sync automatically. Both paths share the same callback shape.
const langListeners = new Set<() => void>();

function langSubscribe(callback: () => void): () => void {
  langListeners.add(callback);
  // Cross-tab sync: another tab wrote to localStorage.language
  window.addEventListener('storage', callback);
  return () => {
    langListeners.delete(callback);
    window.removeEventListener('storage', callback);
  };
}

function langGetSnapshot(): Language {
  const saved = localStorage.getItem('language') as Language;
  return saved === 'en' || saved === 'ar' ? saved : 'en';
}

// Server snapshot is always 'en': the server never has localStorage.
// React uses getServerSnapshot for both SSR rendering AND the initial
// hydration reconciliation pass, so the server HTML ('en') and the first
// client render agree — no hydration mismatch warning.
function langGetServerSnapshot(): Language {
  return 'en';
}
// ──────────────────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // useSyncExternalStore: server snapshot 'en'; after hydration, client reads
  // localStorage. If the stored value is 'ar', React re-renders synchronously
  // (before paint) — no flash, no warning.
  const language = useSyncExternalStore(langSubscribe, langGetSnapshot, langGetServerSnapshot);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingLanguage, setPendingLanguage] = useState<Language | null>(null);

  // Sync document direction and lang attribute whenever language changes.
  // This is the single source of truth for DOM-level RTL/LTR state.
  useEffect(() => {
    document.documentElement.dir  = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    // Notify same-tab subscribers — the 'storage' event only fires in other tabs.
    langListeners.forEach(fn => fn());
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
