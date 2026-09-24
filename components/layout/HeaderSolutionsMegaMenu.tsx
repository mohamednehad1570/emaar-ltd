'use client'

/**
 * components/layout/HeaderSolutionsMegaMenu.tsx
 *
 * Full-width 3-column Products mega-menu.
 * No tabs — columns render directly on open.
 *
 * Layout: grid-cols-[1fr_1.3fr_1fr] — Aluminium column is 30% wider
 * because it has 10 items split into two visual groups.
 *
 * Group rendering in Aluminium column:
 *   Items with groupLabel but no dividerBefore → section header above first group
 *   Items with dividerBefore + groupLabel → border-t divider + new section header
 *
 * Shadows: rgba(45,41,38,x) only. No blue. No rgba(0,0,0,x).
 */

import React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { SOLUTIONS_PRODUCTS } from '@/lib/data/nav'
import { cn } from '@/lib/cn'

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// ─── Sub-components ────────────────────────────────────────────────────────────

/** A single category link row — hover nudge + color shift */
function CategoryLink({
  label, href, isRTL, pathname,
}: {
  label:    string
  href:     string
  isRTL:    boolean
  pathname: string
}) {
  // Hash-anchor links: active when the base path matches (ignore #fragment)
  const base   = href.split('#')[0]
  const active = base ? pathname.startsWith(base) : false

  return (
    <motion.div
      whileHover={{ x: isRTL ? -4 : 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className={cn(
          'block py-[7px] text-sm transition-colors duration-150',
          active
            ? 'text-brand-red font-semibold'
            : 'text-ink-body hover:text-brand-red',
        )}
      >
        {label}
      </Link>
    </motion.div>
  )
}

/** One material column — header, optional group labels, items, "View all" footer link */
function MaterialColumn({
  column, language, isRTL, pathname,
}: {
  column:   typeof SOLUTIONS_PRODUCTS[0]
  language: 'en' | 'ar'
  isRTL:    boolean
  pathname: string
}) {
  const headerActive = pathname.startsWith(column.material.href)

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>

      {/* ── Column header — clickable link to material landing page ── */}
      <motion.div className="relative inline-block mb-4 group">
        <Link
          href={column.material.href}
          className={cn(
            'text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-150',
            headerActive ? 'text-brand-red' : 'text-ink-heading hover:text-brand-red',
          )}
        >
          {language === 'en' ? column.material.en : column.material.ar}
        </Link>
        {/* Animated underline — scaleX 0→1 on hover */}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-brand-red"
          style={{ transformOrigin: isRTL ? 'right' : 'left' }}
          initial={{ scaleX: headerActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: EASE }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Thin divider below header */}
      <div className="h-px bg-border-light mb-3" aria-hidden="true" />

      {/* ── Category links — renders group labels and dividers from data ── */}
      <ul className="space-y-0" role="list">
        {column.items.map((item) => {
          const label = language === 'en' ? item.en : item.ar
          const groupLabelText = item.groupLabel
            ? (language === 'en' ? item.groupLabel.en : item.groupLabel.ar)
            : null

          return (
            <React.Fragment key={item.href}>
              {/* Border-t divider before specialty group */}
              {item.dividerBefore && (
                <li aria-hidden="true">
                  <div className="border-t border-border-light my-2" />
                </li>
              )}
              {/* Section micro-label (e.g. "Core Systems" / "Specialty") */}
              {groupLabelText && (
                <li aria-hidden="true">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-muted mb-1 mt-0.5">
                    {groupLabelText}
                  </p>
                </li>
              )}
              <li>
                <CategoryLink
                  label={label}
                  href={item.href}
                  isRTL={isRTL}
                  pathname={pathname}
                />
              </li>
            </React.Fragment>
          )
        })}
      </ul>

      {/* ── "View all" footer link ─────────────────────────────────── */}
      <div className="mt-4 pt-3 border-t border-border-light">
        <Link
          href={column.material.href}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-semibold',
            'text-ink-muted hover:text-brand-red transition-colors duration-150',
            isRTL && 'flex-row-reverse',
          )}
        >
          {language === 'en'
            ? `View all ${column.material.en}`
            : `عرض كل ${column.material.ar}`}
          <ArrowRight
            size={11}
            weight="bold"
            className={cn(isRTL && 'rotate-180')}
            aria-hidden="true"
          />
        </Link>
      </div>

    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  onEnter: () => void
  onLeave: () => void
}

export default function HeaderSolutionsMegaMenu({ onEnter, onLeave }: Props) {
  const { language, isRTL } = useLanguage()
  const pathname            = usePathname()
  const shouldReduce        = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: EASE }}
      style={{
        position: 'fixed', top: 56, left: 0, right: 0, zIndex: 40,
        boxShadow: '0 12px 40px rgba(45,41,38,0.10), 0 2px 8px rgba(45,41,38,0.06)',
      }}
      className="bg-white border-b border-border-light"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      dir={isRTL ? 'rtl' : 'ltr'}
      role="dialog"
      aria-label={language === 'en' ? 'Products menu' : 'قائمة المنتجات'}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Aluminium column is 1.3fr — wider to accommodate 2 groups of 5 items */}
        <div className="grid gap-10" style={{ gridTemplateColumns: '1fr 1.3fr 1fr' }}>
          {SOLUTIONS_PRODUCTS.map((column) => (
            <MaterialColumn
              key={column.material.href}
              column={column}
              language={language}
              isRTL={isRTL}
              pathname={pathname}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
