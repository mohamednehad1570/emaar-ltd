'use client'

/**
 * components/layout/MobileDrillNav.tsx
 *
 * Mobile/tablet (<1024px) drill-down nav inside HeaderMobileOverlay, fed by the
 * catalog-derived HeaderNavData (uPVC / Aluminum → groups → types).
 * One panel visible at a time; each sub-panel opens with a "‹ Back" row that names
 * its parent. Drilling deeper slides the new panel in from the end side and going
 * back slides it in from the start side — both mirror in RTL.
 *
 * Tapping a link closes the overlay; same-page hash links scroll via
 * followSamePageHash so the overlay's scroll-lock can't swallow the jump.
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { usePanelStack } from '@/lib/hooks/usePanelStack'
import { followSamePageHash } from '@/lib/navigateHash'
import { cn } from '@/lib/cn'
import type { HeaderNavData } from '@/lib/data/nav'
import { getPanel, panelHrefs, type PanelId } from './drillPanels'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// custom = direction × side; side = 1 in LTR (end is physical right), -1 in RTL
const slide = {
  enter:  (d: number) => ({ x: `${d * 100}%`, opacity: 0.6 }),
  center: { x: '0%', opacity: 1 },
  exit:   (d: number) => ({ x: `${d * -30}%`, opacity: 0 }),
}

// ≥48px rows; border-s-2 keeps the active bar on the reading-start edge in both directions
const ROW = 'flex w-full items-center justify-between gap-3 min-h-[52px] ps-4 pe-2 border-s-2 text-base text-start transition-colors duration-150'
const tone = (active: boolean) =>
  active ? 'border-brand-red text-ink-heading font-semibold' : 'border-transparent text-ink-body hover:text-ink-heading'

interface Props {
  nav:      HeaderNavData
  language: 'en' | 'ar'
  isRTL:    boolean
  pathname: string
  onClose:  () => void
}

export default function MobileDrillNav({ nav, language, isRTL, pathname, onClose }: Props) {
  const { current, parent, direction, push, pop } = usePanelStack<PanelId>('root')
  // Overlay mounts per open, so a one-time snapshot of the hash is enough
  const [hash] = useState(() => window.location.hash)
  const panel = getPanel(current, nav)
  const side  = isRTL ? -1 : 1

  // Exact match only — a plain link (e.g. "All uPVC products") must not light up beside the
  // hash item ("Glass options") that is actually current
  const linkActive = (href: string) => {
    const [base, h] = href.split('#')
    return pathname === base && (h ? hash === `#${h}` : !hash)
  }
  const branchActive = (to: PanelId) =>
    panelHrefs(to, nav).some(h => { const b = h.split('#')[0]; return b !== '/' && pathname.startsWith(b) })

  function follow(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (followSamePageHash(href)) e.preventDefault()
    onClose()
  }

  return (
    <div className="relative flex-1 overflow-hidden">
      <AnimatePresence initial={false} custom={direction * side}>
        <motion.div
          key={current}
          custom={direction * side}
          variants={slide}
          initial="enter" animate="center" exit="exit"
          // 0.3s — long enough to read as spatial movement, short enough to chain taps
          transition={{ duration: 0.3, ease: EASE }}
          className="absolute inset-0 overflow-y-auto px-5 py-4"
        >
          {/* ── Back header — names the parent panel ─────────────── */}
          {parent && (
            <div className="mb-2 border-b border-border-light pb-3">
              <button
                type="button" onClick={pop}
                className="flex items-center gap-1.5 min-h-[48px] text-sm font-semibold text-ink-muted hover:text-ink-heading"
              >
                <CaretLeft size={16} weight="bold" aria-hidden="true" className="rtl:rotate-180" />
                {getPanel(parent, nav).title[language]}
              </button>
              <p className="ps-4 pt-1 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-brand-red">
                {panel.title[language]}
              </p>
            </div>
          )}

          {/* ── Rows ──────────────────────────────────────────────── */}
          <ul role="list">
            {panel.rows.map((row, i) => {
              if (row.kind === 'label') {
                return (
                  <li key={i} aria-hidden="true" className={cn('ps-4 pb-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-dim', i > 0 ? 'mt-3 pt-3 border-t border-border-light' : 'pt-2')}>
                    {row.label[language]}
                  </li>
                )
              }
              if (row.kind === 'panel') {
                return (
                  <li key={row.to}>
                    <button type="button" onClick={() => push(row.to)} className={cn(ROW, tone(branchActive(row.to)))}>
                      <span>{row.label[language]}</span>
                      <CaretRight size={16} weight="bold" aria-hidden="true" className="shrink-0 text-dim rtl:rotate-180" />
                    </button>
                  </li>
                )
              }
              const active = linkActive(row.link.href)
              return (
                // Index-prefixed: a branch's "View all" may share an href with one of its items
                <li key={`${i}:${row.link.href}`}>
                  <Link
                    href={row.link.href}
                    onClick={(e) => follow(e, row.link.href)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(ROW, tone(active))}
                  >
                    {row.link[language]}
                  </Link>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
