'use client'

/**
 * components/layout/HeaderDesktopNav.tsx
 *
 * Desktop navigation (≥1280px; below that the burger + drill-down take over).
 *
 *   megaMenu: true → HeaderSolutionsMegaMenu (full-width, 3 cascading columns)
 *   dropdown array → HeaderDropdown (compact list — About)
 *
 * Opening: hover with intent (150ms open / 250ms close, useHoverIntent); click on a
 * trigger toggles instantly as a fallback; ArrowDown on a trigger opens and moves
 * focus into the panel. Esc closes and returns focus to the trigger.
 * Nav order follows the reading direction — reversed in RTL.
 */

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { NAV, isActive, SOLUTIONS_HREFS, type NavItem } from '@/lib/data/nav'
import { useHoverIntent } from '@/lib/hooks/useHoverIntent'
import { cn } from '@/lib/cn'
import HeaderDropdown from './HeaderDropdown'
import HeaderSolutionsMegaMenu from './HeaderSolutionsMegaMenu'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const MEGA_ID = 'solutions-mega-menu'

// 'hover' at half opacity so a hovered item never reads as the current page
const underline = {
  rest:   { scaleX: 0, opacity: 0 },
  hover:  { scaleX: 1, opacity: 0.5, transition: { duration: 0.2, ease: EASE } },
  active: { scaleX: 1, opacity: 1,   transition: { duration: 0.2, ease: EASE } },
}

/** Both language strings stacked in one grid cell — the item keeps the wider width,
    so toggling EN↔AR never reflows the header */
function StackedLabel({ item, language }: { item: NavItem; language: 'en' | 'ar' }) {
  return (
    <span className="inline-grid justify-items-center">
      {(['en', 'ar'] as const).map(l => (
        <span key={l} aria-hidden={language !== l} className={cn('col-start-1 row-start-1', language !== l && 'invisible')}>
          {item[l]}
        </span>
      ))}
    </span>
  )
}

export default function HeaderDesktopNav() {
  const { language, isRTL } = useLanguage()
  const pathname = usePathname()
  const { openKey, enter, leave, hold, toggle, close, open } = useHoverIntent<string>()
  const triggers = useRef(new Map<string, HTMLButtonElement>())

  useEffect(() => { close() }, [pathname, close])

  // Esc closes from anywhere inside the open menu and hands focus back to its trigger
  useEffect(() => {
    if (!openKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { triggers.current.get(openKey)?.focus(); close() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openKey, close])

  function onTriggerKey(e: React.KeyboardEvent, key: string) {
    if (e.key !== 'ArrowDown') return
    e.preventDefault(); open(key)
    // One frame for the panel to mount before focusing its first row
    const sel = key === 'mega' ? `#${MEGA_ID} [data-mm-item]` : `[data-nav-drop="${key}"] a`
    requestAnimationFrame(() => document.querySelector<HTMLElement>(sel)?.focus())
  }

  return (
    <nav className="hidden xl:flex items-center justify-center h-full" aria-label="Primary navigation" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex items-center gap-8 h-full">
        {NAV.map((item) => {
          const key        = item.megaMenu ? 'mega' : item.en
          const hasPanel   = Boolean(item.megaMenu || item.dropdown)
          const childHrefs = item.megaMenu ? SOLUTIONS_HREFS : item.dropdown?.map(d => d.href)
          const active     = isActive(pathname, item.href, childHrefs)
          const isOpen     = openKey === key
          const tone       = active || isOpen ? 'text-ink-heading' : 'text-ink-body hover:text-ink-heading'

          return (
            <motion.div
              key={item.en}
              className="relative h-full flex items-center"
              initial="rest" whileHover="hover" animate={active || isOpen ? 'active' : 'rest'}
              onPointerEnter={() => (hasPanel ? enter(key) : close())}
              onPointerLeave={hasPanel ? leave : undefined}
            >
              {/* ── Label — button for panels, Link for plain items ── */}
              {hasPanel ? (
                <button
                  type="button"
                  ref={el => { if (el) triggers.current.set(key, el); else triggers.current.delete(key) }}
                  aria-expanded={isOpen}
                  aria-controls={item.megaMenu ? MEGA_ID : undefined}
                  aria-haspopup="true"
                  onClick={() => toggle(key)}
                  onKeyDown={e => onTriggerKey(e, key)}
                  className={cn('flex items-center gap-1 min-h-[44px] text-sm font-semibold transition-colors duration-150', tone)}
                >
                  <StackedLabel item={item} language={language} />
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <CaretDown size={12} weight="bold" className="shrink-0" aria-hidden="true" />
                  </motion.span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn('flex items-center min-h-[44px] text-sm font-semibold transition-colors duration-150', tone)}
                >
                  <StackedLabel item={item} language={language} />
                </Link>
              )}

              {/* ── Red underline — grows from the reading-start edge ── */}
              <motion.span variants={underline} aria-hidden="true" className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-red"
                style={{ transformOrigin: isRTL ? 'right' : 'left' }} />

              {/* ── Panels ──────────────────────────────────────────── */}
              <AnimatePresence>
                {isOpen && item.megaMenu && (
                  <HeaderSolutionsMegaMenu key="mega" id={MEGA_ID} onEnter={hold} onLeave={leave} onNavigate={close} />
                )}
                {isOpen && item.dropdown && (
                  <HeaderDropdown
                    key={key} navKey={key} items={item.dropdown} language={language} isRTL={isRTL}
                    onEnter={hold} onLeave={leave}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </nav>
  )
}
