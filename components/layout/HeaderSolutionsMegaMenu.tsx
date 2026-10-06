'use client'

/**
 * components/layout/HeaderSolutionsMegaMenu.tsx
 *
 * Full-width "Our Solutions" panel (≥1280px) with three cascading columns:
 *   View (Products / Projects / Accessories) → Material (Products only) → Items.
 * Projects and Accessories skip the Material column; their Items span that slot so
 * the grid template never changes and nothing shifts.
 *
 * Hover selection runs through useSafeTriangle so a diagonal move toward the next
 * column doesn't flip the selection on the rows it crosses. Arrow keys move within
 * and across columns; Esc is handled by HeaderDesktopNav (it owns trigger focus).
 */

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  SOLUTIONS, SOLUTIONS_VIEW_ORDER, MATERIAL_ORDER,
  type MaterialKey, type NavBranch, type SolutionsViewKey,
} from '@/lib/data/nav'
import { useSafeTriangle } from '@/lib/hooks/useSafeTriangle'
import { useColumnKeyboard } from '@/lib/hooks/useColumnKeyboard'
import { followSamePageHash } from '@/lib/navigateHash'
import MegaMenuColumn, { GroupLabel } from './MegaMenuColumn'
import MegaMenuItem from './MegaMenuItem'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const COL_MATERIAL = 'mm-col-material'
const COL_ITEMS    = 'mm-col-items'
const HEADINGS = { view: { en: 'Our Solutions', ar: 'حلولنا' }, material: { en: 'Material', ar: 'المادة' } }

interface Props { id: string; onEnter: () => void; onLeave: () => void; onNavigate: () => void }

export default function HeaderSolutionsMegaMenu({ id, onEnter, onLeave, onNavigate }: Props) {
  const { language, isRTL } = useLanguage()
  // Default on every open: Products → uPVC (component mounts fresh each time)
  const [view, setView]         = useState<SolutionsViewKey>('products')
  const [material, setMaterial] = useState<MaterialKey>('upvc')
  const { track, request, cancel } = useSafeTriangle(isRTL)
  const panelRef  = useRef<HTMLDivElement>(null)
  const onKeyDown = useColumnKeyboard(panelRef, isRTL)
  // Snapshot of the current location — the menu is short-lived, no need to subscribe
  const [here] = useState(() => window.location.pathname + window.location.hash)

  const col = (cid: string) => document.getElementById(cid)
  const branch: NavBranch = view === 'products' ? SOLUTIONS.products.materials[material] : SOLUTIONS[view]

  function follow(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (followSamePageHash(href)) e.preventDefault()
    onNavigate()
  }

  const isProducts = view === 'products'
  const itemsColId = isProducts ? COL_ITEMS : COL_MATERIAL

  return (
    <motion.div
      id={id}
      ref={panelRef}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
      // 0.25s with the house ease — settles before the pointer reaches the rows
      transition={{ duration: 0.25, ease: EASE }}
      // top tracks --header-h so the panel docks to the header at rest and when shrunk
      style={{ top: 'var(--header-h, 56px)', boxShadow: '0 15px 60px rgba(45,41,38,0.16)' }}
      className="fixed inset-x-0 z-40 bg-white border-y border-border-light"
      onPointerEnter={onEnter} onPointerLeave={() => { cancel(); onLeave() }}
      onPointerMove={track} onKeyDown={onKeyDown}
      dir={isRTL ? 'rtl' : 'ltr'} role="region"
      aria-label={language === 'en' ? 'Our Solutions menu' : 'قائمة حلولنا'}
    >
      {/* Fixed column template + min-height = no width or height shift on any swap */}
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-[240px_240px_minmax(0,1fr)] gap-x-10 min-h-[400px]">

        {/* ── Column 1 — View ─────────────────────────────────── */}
        <MegaMenuColumn
          id="mm-col-view" heading={HEADINGS.view[language]} language={language}
          viewAll={isProducts ? SOLUTIONS.products.viewAll : SOLUTIONS[view].viewAll}
          swapKey="view" onFollow={follow}
        >
          <ul>
            {SOLUTIONS_VIEW_ORDER.map(v => (
              <MegaMenuItem
                key={v} kind="branch" label={SOLUTIONS[v].label[language]}
                selected={view === v} controls={COL_MATERIAL}
                onHover={() => request(() => setView(v), col(COL_MATERIAL))}
                onSelect={() => { cancel(); setView(v) }}
              />
            ))}
          </ul>
        </MegaMenuColumn>

        {/* ── Column 2 — Material (Products only) ────────────────── */}
        {isProducts && (
          <MegaMenuColumn
            id={COL_MATERIAL} heading={HEADINGS.material[language]} language={language}
            viewAll={SOLUTIONS.products.viewAll} swapKey="material"
            onFollow={follow} onPointerEnter={cancel}
          >
            <ul>
              {MATERIAL_ORDER.map(m => (
                <MegaMenuItem
                  key={m} kind="branch" label={SOLUTIONS.products.materials[m].label[language]}
                  selected={material === m} controls={COL_ITEMS}
                  onHover={() => request(() => setMaterial(m), col(COL_ITEMS))}
                  onSelect={() => { cancel(); setMaterial(m) }}
                />
              ))}
            </ul>
          </MegaMenuColumn>
        )}

        {/* ── Column 3 — Items ─────────────────────────────────── */}
        <MegaMenuColumn
          id={itemsColId} heading={branch.label[language]} language={language}
          viewAll={branch.viewAll} swapKey={isProducts ? material : view}
          onFollow={follow} onPointerEnter={cancel}
          className={isProducts ? undefined : 'col-span-2'}
        >
          {/* Multi-group branches (Aluminium) sit side by side with a vertical divider,
              which keeps the tallest material at the same height as the others */}
          <ul className={branch.groups.length > 1 ? 'grid grid-cols-2 max-w-[560px]' : 'max-w-[280px]'}>
            {branch.groups.map((g, gi) => (
              <li key={gi} className={gi > 0 ? 'border-s border-border-light ps-6' : undefined}>
                <ul>
                  {g.label && <GroupLabel label={g.label} language={language} />}
                  {g.items.map(it => (
                    <MegaMenuItem
                      key={it.href} kind="link" label={it[language]} href={it.href}
                      active={here === it.href} onFollow={follow}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </MegaMenuColumn>
      </div>
    </motion.div>
  )
}
