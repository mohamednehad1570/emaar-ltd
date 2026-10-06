'use client'

/**
 * components/layout/MegaMenuItem.tsx
 *
 * One row in the Our Solutions mega-menu. Two shapes:
 *   branch — a button that selects the next column (View / Material); hover goes
 *            through the safe-triangle in the parent, focus and click select instantly.
 *   link   — a leaf link in the Items column.
 *
 * Active row: red start border + heading-black text; resting rows stay muted.
 */

import React from 'react'
import Link from 'next/link'
import { CaretRight } from '@phosphor-icons/react'
import { cn } from '@/lib/cn'

// Shared row skin — border-s-2 is logical, so the red bar sits on the reading-start edge
// in both directions; min-h-[44px] keeps every row a full touch target.
const ROW = 'flex w-full items-center justify-between gap-3 min-h-[44px] ps-4 pe-2 border-s-2 text-sm text-start transition-colors duration-150 focus-visible:outline-none focus-visible:bg-surface-cream'

function rowState(active: boolean) {
  return active
    ? 'border-brand-red text-ink-heading font-semibold'
    : 'border-transparent text-ink-muted hover:text-ink-heading'
}

interface BranchProps {
  kind:       'branch'
  label:      string
  selected:   boolean
  controls:   string
  onHover:    () => void
  onSelect:   () => void
}

interface LinkProps {
  kind:     'link'
  label:    string
  href:     string
  active:   boolean
  onFollow: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}

export default function MegaMenuItem(props: BranchProps | LinkProps) {
  if (props.kind === 'branch') {
    const { label, selected, controls, onHover, onSelect } = props
    return (
      <li>
        <button
          type="button"
          data-mm-item=""
          data-selected={selected || undefined}
          aria-expanded={selected}
          aria-controls={controls}
          onPointerEnter={onHover}
          onFocus={onSelect}
          onClick={onSelect}
          className={cn(ROW, rowState(selected))}
        >
          <span>{label}</span>
          {/* Chevron points toward the next column — mirrored in RTL */}
          <CaretRight
            size={14}
            weight="bold"
            aria-hidden="true"
            className={cn('shrink-0 rtl:rotate-180', selected ? 'text-brand-red' : 'text-dim')}
          />
        </button>
      </li>
    )
  }

  const { label, href, active, onFollow } = props
  return (
    <li>
      <Link
        href={href}
        data-mm-item=""
        data-selected={active || undefined}
        aria-current={active ? 'page' : undefined}
        onClick={(e) => onFollow(e, href)}
        className={cn(ROW, rowState(active))}
      >
        {label}
      </Link>
    </li>
  )
}
