'use client';

/**
 * components/catalog/material/LineTabs.tsx
 *
 * One row of Framer-style line tabs (WAI-ARIA tabs, manual activation):
 *  • Full-width 1px border-light divider; the active tab's 2px red underline slides
 *    between tabs via a shared layoutId (spring 500 / 35 — quick, no visible bounce).
 *  • Roving tabindex: only the active tab is in the Tab order; ←/→ (mirrored in RTL),
 *    Home and End move focus; Enter / Space activate (native button behaviour).
 *  • Overflow scrolls horizontally on one line; an end-side fade hints at more, and the
 *    active tab is scrolled into view (horizontal only — never moves the page).
 * Follows reading direction (no dir override), so the row and the underline mirror in Arabic.
 */

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage, useTranslation } from '@/contexts/LanguageContext';
import { cn } from '@/lib/cn';
import type { OptionSubTab } from '../types';

interface LineTabsProps {
  tabs: OptionSubTab[];
  active: string;
  onSelect: (id: string) => void;
  // main = 14/600 uppercase (EN), 32px gaps · sub = 13/500, 24px gaps
  size: 'main' | 'sub';
  label: string;
  idPrefix: string;
  panelId: string;
}

// Spring tuned for a ~200ms glide that settles without overshoot
const UNDERLINE_SPRING = { type: 'spring', stiffness: 500, damping: 35 } as const;

export default function LineTabs({ tabs, active, onSelect, size, label, idPrefix, panelId }: LineTabsProps) {
  const { isRTL } = useLanguage();
  const t = useTranslation();
  const scroller = useRef<HTMLDivElement>(null);
  const [fadeEnd, setFadeEnd] = useState(false);

  // |scrollLeft| because RTL scroll positions run 0 → negative in modern engines
  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setFadeEnd(max > 1 && Math.abs(el.scrollLeft) < max - 1);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure, tabs]);

  // Centre the active tab inside the row. offsetLeft is negative for RTL overflow, which
  // matches RTL's negative scrollLeft, so one formula serves both directions.
  useEffect(() => {
    const el = scroller.current;
    const tab = el?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!el || !tab || el.scrollWidth <= el.clientWidth) return;
    el.scrollTo({ left: tab.offsetLeft - (el.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' });
  }, [active]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const btns = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    // Physical arrows follow reading direction: → is "next" in EN, "previous" in AR
    const step = { ArrowRight: isRTL ? -1 : 1, ArrowLeft: isRTL ? 1 : -1 }[e.key];
    let next: number | null = step ? (i + step + btns.length) % btns.length : null;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = btns.length - 1;
    if (next === null) return;
    e.preventDefault();
    btns[next].focus();
  };

  const main = size === 'main';

  return (
    <div className="relative">
      {/* ── Divider (under the scroller so the underline covers it) ── */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-border-light" />

      {/* layoutScroll lets the shared underline measure correctly inside a scrolled row */}
      <motion.div
        ref={scroller}
        layoutScroll
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        onScroll={measure}
        className={cn(
          'relative flex overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          main ? 'gap-8' : 'gap-6',
        )}
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${idPrefix}-${tab.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(tab.id)}
              data-tab={tab.id}
              className={cn(
                // min-h-11 = 44px touch target
                'relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap transition-colors duration-200',
                'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-red',
                main ? 'text-sm font-semibold' : 'text-[13px] font-medium',
                // Uppercase + tracking for EN only — letter-spacing breaks Arabic letter joining
                main && !isRTL && 'uppercase tracking-[0.08em]',
                selected ? 'text-ink-heading' : 'text-ink-muted hover:text-ink-body',
              )}
            >
              {t(tab.label.en, tab.label.ar)}
              {selected && (
                <motion.span
                  layoutId={`${idPrefix}-underline`}
                  transition={UNDERLINE_SPRING}
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-brand-red"
                />
              )}
            </button>
          );
        })}
      </motion.div>

      {/* ── End-side fade — only while more tabs sit past the end edge ── */}
      {fadeEnd && (
        <div
          aria-hidden="true"
          // Gradient direction flips so the fade always sits on the reading-end edge
          className="pointer-events-none absolute inset-y-0 end-0 w-12 bg-linear-to-l rtl:bg-linear-to-r from-off-white to-transparent"
        />
      )}
    </div>
  );
}
