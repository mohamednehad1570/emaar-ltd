'use client'

/**
 * components/layout/HeaderDesktopNav.tsx
 *
 * Desktop navigation bar — hidden below lg breakpoint.
 *
 * Two dropdown types:
 *   megaMenu: true  → HeaderSolutionsMegaMenu (tabbed, full-width, 3-column)
 *   dropdown array  → HeaderDropdown (compact vertical list, e.g. About)
 *
 * Hover intent: 120ms close delay prevents accidental closure when the mouse
 * travels from the nav label into the dropdown panel.
 *
 * Underline animation: scaleX spring from reading-start edge.
 * Active state: current route or any child route active → full opacity underline.
 */

import React, { useState, useRef, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  NAV, isActive, SOLUTIONS_HREFS,
} from '@/lib/data/nav'
import { cn } from '@/lib/cn'
import HeaderDropdown from './HeaderDropdown'
import HeaderSolutionsMegaMenu from './HeaderSolutionsMegaMenu'

// Premium deceleration ease — matches header and mega-menu
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Underline variants — 'active' full opacity, 'hover' 50% so they stay distinct
const underlineVariants = {
  rest:   { scaleX: 0,   opacity: 0 },
  hover:  { scaleX: 1,   opacity: 0.5, transition: { duration: 0.2, ease: EASE } },
  active: { scaleX: 1,   opacity: 1,   transition: { duration: 0.2, ease: EASE } },
}

export default function HeaderDesktopNav() {
  const { language, isRTL }      = useLanguage()
  const pathname                 = usePathname()
  const [openDrop, setOpenDrop]  = useState<string | null>(null)
  const closeTimeout             = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldReduceMotion       = useReducedMotion()

  // openPanel: clear any pending close timer, then open the named panel
  const openPanel = useCallback((key: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setOpenDrop(key)
  }, [])

  // scheduleClose: wait 150ms before closing — lets mouse travel diagonally into panel
  const scheduleClose = useCallback(() => {
    closeTimeout.current = setTimeout(() => setOpenDrop(null), 150)
  }, [])

  // cancelClose: abort a pending close — called when mouse enters the panel
  const cancelClose = useCallback(() => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
  }, [])

  // Close all panels on route change
  useEffect(() => { setOpenDrop(null) }, [pathname])

  return (
    <nav
      className="hidden lg:flex items-center justify-center h-full"
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-8 h-full">

        {NAV.map((item) => {
          // Determine if this item's route (or a child route) is currently active
          const childHrefs = item.megaMenu
            // Our Solutions: check all nested product + project hrefs
            ? SOLUTIONS_HREFS
            // About dropdown: check each dropdown item's href
            : item.dropdown?.map(d => d.href)

          const active  = isActive(pathname, item.href, childHrefs)
          const isOpen  = openDrop === item.en
          // Framer variant key: active/open → 'active', hover via parent whileHover → 'hover'
          const variant = active || isOpen ? 'active' : 'rest'

          return (
            <motion.div
              key={item.en}
              className="relative h-full flex items-center"
              initial="rest"
              whileHover={shouldReduceMotion ? undefined : 'hover'}
              animate={shouldReduceMotion ? undefined : variant}
              onMouseEnter={() => {
                // Only open panels for items that have a dropdown or mega-menu
                if (item.megaMenu || item.dropdown) {
                  openPanel(item.en)
                } else {
                  // Plain links: cancel any open panel
                  cancelClose()
                  setOpenDrop(null)
                }
              }}
              onMouseLeave={scheduleClose}
            >

              {/* ── Nav label — button for dropdowns, Link for plain items ── */}
              {item.megaMenu || item.dropdown ? (
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup={item.megaMenu ? 'dialog' : 'listbox'}
                  className={cn(
                    'flex items-center gap-1 text-sm font-semibold',
                    'transition-colors duration-150',
                    active || isOpen
                      ? 'text-text-heading'
                      : 'text-text-body hover:text-text-heading',
                  )}
                >
                  {/* Bilingual label — both strings stacked at same width to prevent
                      header reflow on EN↔AR toggle */}
                  <span className="inline-grid justify-items-center">
                    <span
                      className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')}
                      aria-hidden={language !== 'en'}
                    >
                      {item.en}
                    </span>
                    <span
                      className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')}
                      aria-hidden={language !== 'ar'}
                    >
                      {item.ar}
                    </span>
                  </span>

                  {/* Caret — rotates 180° when panel is open */}
                  <motion.span
                    animate={shouldReduceMotion ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CaretDown size={12} weight="bold" className="shrink-0" />
                  </motion.span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-semibold transition-colors duration-150',
                    active
                      ? 'text-text-heading'
                      : 'text-text-body hover:text-text-heading',
                  )}
                >
                  <span className="inline-grid justify-items-center">
                    <span
                      className={cn('col-start-1 row-start-1', language !== 'en' && 'invisible')}
                      aria-hidden={language !== 'en'}
                    >
                      {item.en}
                    </span>
                    <span
                      className={cn('col-start-1 row-start-1', language !== 'ar' && 'invisible')}
                      aria-hidden={language !== 'ar'}
                    >
                      {item.ar}
                    </span>
                  </span>
                </Link>
              )}

              {/* ── Red underline indicator ───────────────────────────────── */}
              {shouldReduceMotion ? (
                (active || isOpen) && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                    aria-hidden="true"
                  />
                )
              ) : (
                <motion.span
                  variants={underlineVariants}
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                  style={{ transformOrigin: isRTL ? 'right' : 'left' }}
                  aria-hidden="true"
                />
              )}

              {/* ── Dropdowns ────────────────────────────────────────────── */}
              <AnimatePresence>

                {/* Mega-menu — only for Our Solutions (megaMenu: true) */}
                {isOpen && item.megaMenu && (
                  <HeaderSolutionsMegaMenu
                    key="solutions-mega"
                    onEnter={cancelClose}
                    onLeave={scheduleClose}
                  />
                )}

                {/* Compact dropdown — only for About (dropdown array, no megaMenu) */}
                {isOpen && item.dropdown && !item.megaMenu && (
                  <HeaderDropdown
                    key={item.en + '-drop'}
                    items={item.dropdown}
                    language={language}
                    isRTL={isRTL}
                    onEnter={cancelClose}
                    onLeave={scheduleClose}
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
