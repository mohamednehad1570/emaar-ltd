'use client'

/**
 * components/layout/MobileNavList.tsx
 *
 * Mobile navigation list — renders inside HeaderMobileOverlay.
 *
 * "Our Solutions" uses pattern B (confirmed):
 *   Tap → expands accordion showing all materials + project links in a flat list.
 *   No tabs. All items visible immediately after expansion.
 *   Structure:
 *     ─ uPVC Systems (header link) + its sub-items
 *     ─ Aluminium Systems (header link) + its sub-items
 *     ─ Glass Systems (header link) + its sub-items
 *     ─ divider
 *     ─ Villa Projects
 *     ─ Building Projects
 *
 * "About" uses the same accordion pattern with its dropdown items.
 *
 * Animation:
 *   Accordion: height 0→auto via Framer Motion layout + overflow hidden
 *   Items stagger: 0.04s delay per item, y 8→0 + opacity 0→1
 *   Caret: rotates 180° when open
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  NAV, SOLUTIONS_PRODUCTS, SOLUTIONS_PROJECTS, isActive, SOLUTIONS_HREFS,
} from '@/lib/data/nav'
import { cn } from '@/lib/cn'

// Stagger animation for accordion child items
const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  // Each item delays via staggerChildren on the parent
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

const containerVariants = {
  hidden:  {},
  // 0.04s between each child — 10 items = 0.36s total cascade
  visible: { transition: { staggerChildren: 0.04 } },
}

interface Props {
  language: 'en' | 'ar'
  pathname: string
  onClose:  () => void  // Called when a link is tapped — closes the overlay
}

export default function MobileNavList({ language, pathname, onClose }: Props) {
  const { isRTL }   = useLanguage()
  const shouldReduce = useReducedMotion()

  // Track which accordion is open — only one at a time
  const [openKey, setOpenKey] = useState<string | null>(null)

  function toggleAccordion(key: string) {
    setOpenKey(prev => (prev === key ? null : key))
  }

  return (
    // flex-1 + overflow-y-auto: nav list fills remaining height and scrolls if needed
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <ul className="space-y-1" role="list">

        {NAV.map((item) => {
          // Determine active state for the parent item
          const childHrefs = item.megaMenu ? SOLUTIONS_HREFS : item.dropdown?.map(d => d.href)
          const active     = isActive(pathname, item.href, childHrefs)
          const isOpen     = openKey === item.en
          const label      = language === 'en' ? item.en : item.ar

          // ── Items with accordion (megaMenu or dropdown) ──────────────────
          if (item.megaMenu || item.dropdown) {
            return (
              <li key={item.en}>

                {/* Accordion trigger button */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.en)}
                  aria-expanded={isOpen}
                  // 52px min-height — comfortable touch target on mobile
                  className={cn(
                    'w-full flex items-center justify-between py-3 min-h-[52px]',
                    'text-base font-semibold transition-colors duration-150',
                    // Left border indicator when active (mirrored for RTL)
                    active
                      ? 'text-brand-red'
                      : 'text-text-heading',
                    // Active left-border accent — same as production Main design
                    active && (isRTL ? 'border-r-2 border-brand-red pr-3' : 'border-l-2 border-brand-red pl-3'),
                  )}
                >
                  <span>{label}</span>
                  <motion.span
                    animate={shouldReduce ? undefined : { rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-text-muted"
                  >
                    <CaretDown size={16} weight="bold" />
                  </motion.span>
                </button>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="accordion-body"
                      // Height animation: 0 → auto using layout
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={shouldReduce
                        ? { duration: 0 }
                        : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
                      }
                      // overflow-hidden clips children during height animation
                      className="overflow-hidden"
                    >
                      <motion.ul
                        variants={shouldReduce ? undefined : containerVariants}
                        initial={shouldReduce ? undefined : 'hidden'}
                        animate={shouldReduce ? undefined : 'visible'}
                        // pb-3 gives breathing room before the next top-level item
                        className={cn(
                          'pb-3 space-y-0',
                          isRTL ? 'pr-4 border-r border-border-light' : 'pl-4 border-l border-border-light',
                        )}
                        role="list"
                      >

                        {/* Our Solutions: render all three material columns flat */}
                        {item.megaMenu && (
                          <>
                            {SOLUTIONS_PRODUCTS.map((column) => (
                              <React.Fragment key={column.material.href}>

                                {/* Material header — links to material landing page */}
                                <motion.li variants={itemVariants}>
                                  <Link
                                    href={column.material.href}
                                    onClick={onClose}
                                    className={cn(
                                      'block pt-4 pb-1 text-[11px] font-bold uppercase tracking-[0.18em]',
                                      'transition-colors duration-150',
                                      pathname.startsWith(column.material.href)
                                        ? 'text-brand-red'
                                        : 'text-text-muted hover:text-brand-red',
                                    )}
                                  >
                                    {language === 'en' ? column.material.en : column.material.ar}
                                  </Link>
                                </motion.li>

                                {/* Sub-category links */}
                                {column.items.map((sub) => (
                                  <motion.li key={sub.href} variants={itemVariants}>
                                    <Link
                                      href={sub.href}
                                      onClick={onClose}
                                      className={cn(
                                        'block py-2 text-sm transition-colors duration-150',
                                        pathname.startsWith(sub.href)
                                          ? 'text-brand-red font-semibold'
                                          : 'text-text-body hover:text-brand-red',
                                      )}
                                    >
                                      {language === 'en' ? sub.en : sub.ar}
                                    </Link>
                                  </motion.li>
                                ))}
                              </React.Fragment>
                            ))}

                            {/* Divider before projects */}
                            <motion.li variants={itemVariants} aria-hidden="true">
                              <div className="my-3 h-px bg-border-light" />
                            </motion.li>

                            {/* Project links */}
                            {SOLUTIONS_PROJECTS.map((project) => (
                              <motion.li key={project.href} variants={itemVariants}>
                                <Link
                                  href={project.href}
                                  onClick={onClose}
                                  className={cn(
                                    'block py-2 text-sm font-semibold transition-colors duration-150',
                                    pathname.startsWith(project.href)
                                      ? 'text-brand-red'
                                      : 'text-text-heading hover:text-brand-red',
                                  )}
                                >
                                  {language === 'en' ? project.en : project.ar}
                                </Link>
                              </motion.li>
                            ))}
                          </>
                        )}

                        {/* About: render flat dropdown items */}
                        {item.dropdown && !item.megaMenu && item.dropdown.map((child) => (
                          <motion.li key={child.href} variants={itemVariants}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={cn(
                                'block py-2 text-sm transition-colors duration-150',
                                pathname.startsWith(child.href)
                                  ? 'text-brand-red font-semibold'
                                  : 'text-text-body hover:text-brand-red',
                              )}
                            >
                              {language === 'en' ? child.en : child.ar}
                            </Link>
                          </motion.li>
                        ))}

                      </motion.ul>
                    </motion.div>
                  )}
                </AnimatePresence>

              </li>
            )
          }

          // ── Plain link items (Home, Technical, Contact) ──────────────────
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
                    : 'text-text-heading hover:text-brand-red',
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
