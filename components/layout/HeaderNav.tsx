'use client';

/**
 * components/layout/HeaderNav.tsx
 *
 * Desktop nav (≥1024px; below that the burger overlay takes over).
 * Order uPVC · Aluminum · Projects · Technical · About · Contact runs in reading order:
 * left→right in EN, right→left in AR (the nav inherits <html dir>).
 * uPVC / Aluminum are plain links (no chevron, no panel); their underline stays lit on
 * the material page and on any /products/[slug] that material offers.
 *
 * Only About has a panel. It opens on hover (with intent delays, useHoverIntent) and on click — a
 * <button> trigger, so Enter/Space work natively. ArrowDown opens and focuses the
 * first link. Close: Esc (focus returns to trigger), outside pointerdown, route change.
 */

import React, { useEffect, useRef } from 'react';
import LocaleLink from '@/components/ui/LocaleLink';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown } from '@phosphor-icons/react';
import { useLocalePathname } from '@/lib/i18n/useLocalePathname';
import { NAV, describeEntry, type HeaderNavData } from '@/lib/data/nav';
import { useHoverIntent } from '@/lib/hooks/useHoverIntent';
import { cn } from '@/lib/cn';
import NavLabel from './NavLabel';
import HeaderDropdown from './HeaderDropdown';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// 'hover' at half opacity so a hovered item never reads as the current page
const underline = {
  rest:   { scaleX: 0, opacity: 0 },
  hover:  { scaleX: 1, opacity: 0.5, transition: { duration: 0.2, ease: EASE } },
  active: { scaleX: 1, opacity: 1,   transition: { duration: 0.2, ease: EASE } },
};

interface HeaderNavProps {
  nav: HeaderNavData;
  language: 'en' | 'ar';
  /** Transparent bar over the homepage hero — labels switch to white */
  onDark: boolean;
}

export default function HeaderNav({ nav, language, onDark }: HeaderNavProps) {
  // Locale-neutral ('/upvc' on /upvc and /ar/upvc) — matches the unprefixed nav hrefs
  const pathname = useLocalePathname();
  const { openKey, enter, leave, hold, toggle, close, open } = useHoverIntent<string>();
  const root = useRef<HTMLElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => { close(); }, [pathname, close]);

  // Esc returns focus to the trigger; a pointerdown outside the nav dismisses
  useEffect(() => {
    if (!openKey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { triggers.current.get(openKey)?.focus(); close(); }
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [openKey, close]);

  function onTriggerKey(e: React.KeyboardEvent, key: string) {
    if (e.key !== 'ArrowDown') return;
    e.preventDefault(); open(key);
    // One frame for the panel to mount before focusing its first link
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-panel-${key} a`)?.focus());
  }

  return (
    <nav ref={root} aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
      className="hidden lg:flex items-center justify-center h-full">
      <div className="flex items-center h-full gap-5 xl:gap-8">
        {NAV.map(entry => {
          const { key, href, label, active } = describeEntry(entry, nav, pathname);
          const panelId = `nav-panel-${key}`;
          const isOpen = openKey === key;
          const hasPanel = entry.kind === 'dropdown';
          const tone = onDark
            ? 'text-white hover:text-white'
            : active || isOpen ? 'text-ink-heading' : 'text-ink-body hover:text-ink-heading';
          const cls = cn('flex items-center gap-1 min-h-11 text-sm font-semibold', tone);

          return (
            <motion.div
              key={key}
              className="relative h-full flex items-center"
              initial="rest" whileHover="hover" animate={active || isOpen ? 'active' : 'rest'}
              onPointerEnter={() => (hasPanel ? enter(key) : close())}
              onPointerLeave={hasPanel ? leave : undefined}
            >
              {/* ── Trigger — button for the About panel, Link for everything else ── */}
              {href ? (
                // aria-current only on the exact page — a type page is "inside" uPVC, not uPVC itself
                <LocaleLink href={href} aria-current={pathname === href ? 'page' : undefined} className={cls}>
                  <NavLabel label={label} language={language} />
                </LocaleLink>
              ) : (
                <button
                  type="button"
                  ref={el => { if (el) triggers.current.set(key, el); else triggers.current.delete(key); }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  aria-haspopup="true"
                  onClick={() => toggle(key)}
                  onKeyDown={e => onTriggerKey(e, key)}
                  className={cls}
                >
                  <NavLabel label={label} language={language} />
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <CaretDown size={12} weight="bold" aria-hidden="true" />
                  </motion.span>
                </button>
              )}

              {/* ── Red underline on the bar's bottom edge ── */}
              <motion.span variants={underline} aria-hidden="true"
                // Grows from the inline-start edge — left in EN, right in AR
                className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-red origin-left rtl:origin-right" />

              {/* ── Panels ── */}
              <AnimatePresence>
                {isOpen && entry.kind === 'dropdown' && (
                  <HeaderDropdown key={key} id={panelId} items={entry.items} language={language}
                    onEnter={hold} onLeave={leave} onNavigate={close} />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
