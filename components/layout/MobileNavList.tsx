'use client'

/**
 * components/layout/MobileNavList.tsx
 *
 * Mobile navigation list — renders inside HeaderMobileOverlay.
 *
 * "Products" (megaMenu: true):
 *   Accordion → all 3 material columns flat (no tabs).
 *   Each material: header link + sub-items. No projects here.
 *
 * "Projects" (dropdown array):
 *   Accordion → Villas / Buildings / (divider) / All Projects.
 *   dividerBefore items render a thin separator line.
 *
 * "About" and any other dropdown array items use the same accordion pattern.
 *
 * Plain link items (Accessories, Technical, Contact) render as direct links.
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  NAV, SOLUTIONS_PRODUCTS, isActive, SOLUTIONS_HREFS,
} from '@/lib/data/nav'
import { cn } from '@/lib/cn'

const itemVariants = {
  hidden:  { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04 } },
}

interface Props {
  language: 'en' | 'ar'
  pathname: string
  onClose:  () => void
}

export default function MobileNavList({ language, pathname, onClose }: Props) {
  const { isRTL }    = useLanguage()
  const shouldReduce = useReducedMotion()

  // Only one accordion open at a time
  const [openKey, setOpenKey] = useState<string | null>(null)

  function toggleAccordion(key: string) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <ul className="space-y-1" role="list">

        {NAV.map((item) => {
          const childHrefs = item.megaMenu ? SOLUTIONS_HREFS : item.dropdown?.map(d => d.href)
          const active     = isActive(pathname, item.href, childHrefs)
          const isOpen     = openKey === item.en
          const label      = language === 'en' ? item.en : item.ar

          // ── Accordion items (megaMenu or dropdown) ───────────────────────
          if (item.megaMenu || item.dropdown) {
            return (
              <li key={item.en}>

                <button
                  type="button"
                  onClick={() => toggleAccordion(item.en)}
                  aria-expanded={isOpen}
                  className={cn(
                    'w-full flex items-center justify-between py-3 min-h-[52px]',
                    'text-base font-semibold transition-colors duration-150',
                    active ? 'text-brand-red' : 'text-ink-heading',
                    active && (isRTL
                      ? 'border-r-2 border-brand-red pr-3'
                      : 'border-l-2 border-brand-red pl-3'),
                  )}
                >
                  <span>{label}</span>
                  <motion.span
                    animate={shouldReduce ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-ink-muted"
                  >
                    <CaretDown size={16} weight="bold" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="accordion-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={shouldReduce
                        ? { duration: 0 }
                        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="overflow-hidden"
                    >
                      <motion.ul
                        variants={shouldReduce ? undefined : containerVariants}
                        initial={shouldReduce ? undefined : 'hidden'}
                        animate={shouldReduce ? undefined : 'visible'}
                        className={cn(
                          'pb-3 space-y-0',
                          isRTL ? 'pr-4 border-r border-border-light' : 'pl-4 border-l border-border-light',
                        )}
                        role="list"
                      >

                        {/* Products mega-menu: render 3 material columns flat */}
                        {item.megaMenu && SOLUTIONS_PRODUCTS.map((column) => (
                          <React.Fragment key={column.material.href}>
                            {/* Material header link */}
                            <motion.li variants={itemVariants}>
                              <Link
                                href={column.material.href}
                                onClick={onClose}
                                className={cn(
                                  'block pt-4 pb-1 text-[11px] font-bold uppercase tracking-[0.18em]',
                                  'transition-colors duration-150',
                                  pathname.startsWith(column.material.href)
                                    ? 'text-brand-red'
                                    : 'text-ink-muted hover:text-brand-red',
                                )}
                              >
                                {language === 'en' ? column.material.en : column.material.ar}
                              </Link>
                            </motion.li>

                            {/* Sub-category links — respect dividerBefore */}
                            {column.items.map((sub) => (
                              <React.Fragment key={sub.href}>
                                {sub.dividerBefore && (
                                  <motion.li variants={itemVariants} aria-hidden="true">
                                    <div className="my-1 h-px bg-border-light" />
                                  </motion.li>
                                )}
                                <motion.li variants={itemVariants}>
                                  <Link
                                    href={sub.href}
                                    onClick={onClose}
                                    className={cn(
                                      'flex items-center py-2 min-h-[44px] text-sm',
                                      'transition-colors duration-150',
                                      pathname.startsWith(sub.href.split('#')[0])
                                        ? 'text-brand-red font-semibold'
                                        : 'text-ink-body hover:text-brand-red',
                                    )}
                                  >
                                    {language === 'en' ? sub.en : sub.ar}
                                  </Link>
                                </motion.li>
                              </React.Fragment>
                            ))}
                          </React.Fragment>
                        ))}

                        {/* Dropdown items (Projects, About) — respect dividerBefore */}
                        {item.dropdown && !item.megaMenu && item.dropdown.map((child) => (
                          <React.Fragment key={child.href}>
                            {child.dividerBefore && (
                              <motion.li variants={itemVariants} aria-hidden="true">
                                <div className="my-1 h-px bg-border-light" />
                              </motion.li>
                            )}
                            <motion.li variants={itemVariants}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className={cn(
                                  'flex items-center py-2 min-h-[44px] text-sm',
                                  'transition-colors duration-150',
                                  pathname.startsWith(child.href.split('#')[0])
                                    ? 'text-brand-red font-semibold'
                                    : 'text-ink-body hover:text-brand-red',
                                )}
                              >
                                {language === 'en' ? child.en : child.ar}
                              </Link>
                            </motion.li>
                          </React.Fragment>
                        ))}

                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>

              </li>
            )
          }

          // ── Plain link items (Accessories, Technical, Contact) ───────────
          return (
            <li key={item.en}>
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center py-3 min-h-[52px] text-base font-semibold',
                  'transition-colors duration-150',
                  active
                    ? cn('text-brand-red', isRTL
                        ? 'border-r-2 border-brand-red pr-3'
                        : 'border-l-2 border-brand-red pl-3')
                    : 'text-ink-heading hover:text-brand-red',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}

      </ul>
    </div>
  )
}
