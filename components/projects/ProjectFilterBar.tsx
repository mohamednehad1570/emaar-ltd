'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type Bilingual = { en: string; ar: string };

interface FilterGroup<T extends string> {
  heading: Bilingual;
  options: readonly { id: T; label: Bilingual }[];
  value: T;
  onChange: (id: T) => void;
}

/** One labelled row of square toggle buttons (type or material). */
export default function ProjectFilterBar<T extends string>({ heading, options, value, onChange }: FilterGroup<T>) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-3" role="group" aria-label={heading[language]}>
      <span className="w-full text-xs font-bold text-ink-muted uppercase tracking-widest mb-2">
        {heading[language]}
      </span>
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onChange(opt.id)}
          aria-pressed={value === opt.id}
          // min-h-[44px] — touch-target minimum; rounded-none per button rule
          className={`px-5 py-2 min-h-[44px] rounded-none text-sm font-medium transition-colors duration-150 ${value === opt.id
            ? 'bg-brand-dark text-white'
            : 'bg-surface-white text-ink-body hover:bg-surface-cream border border-border-light'
          }`}
        >
          {opt.label[language]}
        </button>
      ))}
    </div>
  );
}
