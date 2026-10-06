'use client'

/**
 * components/layout/MegaMenuColumn.tsx
 *
 * Column shell for the Our Solutions mega-menu: micro-label heading, the row list,
 * and a closing "View all …" link. Rows are passed as children so the parent owns
 * selection state. `swapKey` re-keys the list so a View/Material change crossfades
 * the contents instead of snapping.
 */

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import type { Localized, NavLink } from '@/lib/data/nav'
import { cn } from '@/lib/cn'

interface Props {
  id:        string
  heading:   string
  /** Omitted where it would repeat a neighbouring column's link */
  viewAll?:  NavLink
  language:  'en' | 'ar'
  swapKey:   string
  onFollow:  (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
  onPointerEnter?: () => void
  /** Grid placement — Projects/Accessories span the empty Material slot */
  className?: string
  children:  React.ReactNode
}

export default function MegaMenuColumn({
  id, heading, viewAll, language, swapKey, onFollow, onPointerEnter, className, children,
}: Props) {
  return (
    <section
      id={id}
      data-mm-col=""
      aria-label={heading}
      onPointerEnter={onPointerEnter}
      className={cn('flex flex-col min-w-0', className)}
    >
      {/* ── Heading ─────────────────────────────────────────── */}
      <p className="mb-3 ps-4 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-ink-muted">
        {heading}
      </p>

      {/* ── Rows — keyed by swapKey so a selection change crossfades ── */}
      <motion.div
        key={swapKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        // 0.15s — fast enough that scanning rows never feels laggy
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="flex-1"
      >
        {children}
      </motion.div>

      {/* ── View all — red underline text link ──────────────── */}
      {viewAll && <Link
        href={viewAll.href}
        data-mm-item=""
        onClick={(e) => onFollow(e, viewAll.href)}
        className={cn(
          'group mt-4 ms-4 inline-flex items-center gap-1.5 self-start min-h-[44px]',
          'text-sm font-semibold text-ink-heading hover:text-brand-red',
          'underline decoration-brand-red decoration-2 underline-offset-[6px]',
          'transition-colors duration-150 focus-visible:outline-none focus-visible:text-brand-red',
        )}
      >
        {viewAll[language]}
        <ArrowRight size={12} weight="bold" aria-hidden="true" className="rtl:rotate-180" />
      </Link>}
    </section>
  )
}

/** Micro-label for a group inside a column (Aluminium "Core Systems" / "Specialty") */
export function GroupLabel({ label, language }: { label: Localized; language: 'en' | 'ar' }) {
  return (
    <li aria-hidden="true" className="ps-4 pt-1 pb-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-dim">
      {label[language]}
    </li>
  )
}
