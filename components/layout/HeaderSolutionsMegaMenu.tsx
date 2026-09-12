'use client'

/**
 * components/layout/HeaderSolutionsMegaMenu.tsx
 *
 * Full-width tabbed mega-menu for the "Our Solutions" nav item.
 *
 * Tabs:
 *   [Products] — 3-column grid: uPVC | Aluminium | Glass
 *   [Projects] — single column: Villa Projects | Building Projects
 *
 * Animations:
 *   • Panel entry: y -8→0 + opacity 0→1, 0.22s premium ease
 *   • Tab switch: AnimatePresence crossfade + x slide (Products←→Projects)
 *   • Tab indicator: layoutId shared element (slides between tabs smoothly)
 *   • Column header hover: red underline scaleX 0→1
 *   • Category link hover: translateX + color, 0.15s
 *
 * RTL: dir prop on wrapper reverses column order automatically.
 * Shadows: rgba(45,41,38,x) — never rgba(0,0,0,x).
 * Blue: zero tolerance — all colors verified against brand palette.
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { SOLUTIONS_PRODUCTS, SOLUTIONS_PROJECTS } from '@/lib/data/nav'
import { cn } from '@/lib/cn'

// ─── Animation constants ───────────────────────────────────────────────────────

// Premium deceleration curve — aggressive start, feathered landing
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Panel entry/exit — shared by both tab content views
const panelVariants = {
  // Slide up slightly + fade out on exit
  exit:  (dir: number) => ({ opacity: 0, x: dir * 24, transition: { duration: 0.18, ease: EASE } }),
  // Start offset in opposite direction, slide to rest
  enter: (dir: number) => ({ opacity: 0, x: dir * -24 }),
  // Resting position
  rest:  { opacity: 1, x: 0, transition: { duration: 0.22, ease: EASE } },
}

// ─── Sub-components ────────────────────────────────────────────────────────────

/** A single category link row inside a material column */
function CategoryLink({
  label, href, isRTL, pathname,
}: {
  label:    string
  href:     string
  isRTL:    boolean
  pathname: string
}) {
  // Active state: current route starts with this link's path
  const active = pathname.startsWith(href)

  return (
    <motion.div
      // Hover animation: nudge toward reading direction + color shift
      whileHover={{ x: isRTL ? -4 : 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <Link
        href={href}
        className={cn(
          // Base: body text size, smooth color transition
          'block py-[7px] text-sm transition-colors duration-150',
          active
            // Active route: red + semibold — makes current location obvious
            ? 'text-brand-red font-semibold'
            // Default: body gray → red on hover
            : 'text-text-body hover:text-brand-red',
        )}
      >
        {label}
      </Link>
    </motion.div>
  )
}

/** One material column — header (clickable) + category link list */
function MaterialColumn({
  column, language, isRTL, pathname,
}: {
  column:   typeof SOLUTIONS_PRODUCTS[0]
  language: 'en' | 'ar'
  isRTL:    boolean
  pathname: string
}) {
  // Column header active: current route is under this material's path
  const headerActive = pathname.startsWith(column.material.href)

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>

      {/* ── Material header — clickable link to material landing page ────── */}
      <motion.div
        className="relative inline-block mb-4 group"
        // No whileHover here — the underline handles the hover affordance
      >
        <Link
          href={column.material.href}
          className={cn(
            'text-[13px] font-bold uppercase tracking-[0.2em] transition-colors duration-150',
            headerActive
              // Active material: red header
              ? 'text-brand-red'
              // Default: dark heading, hover → red
              : 'text-text-heading hover:text-brand-red',
          )}
        >
          {language === 'en' ? column.material.en : column.material.ar}
        </Link>

        {/* Animated underline — scaleX 0→1 on group hover, origin at reading start */}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-brand-red"
          style={{ transformOrigin: isRTL ? 'right' : 'left' }}
          // Controlled by the parent group hover via CSS — simulated with initial/animate
          initial={{ scaleX: headerActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2, ease: EASE }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Divider below header */}
      <div className="h-px bg-border-light mb-3" aria-hidden="true" />

      {/* ── Category links ────────────────────────────────────────────────── */}
      <ul className="space-y-0" role="list">
        {column.items.map((item) => (
          <li key={item.href}>
            <CategoryLink
              label={language === 'en' ? item.en : item.ar}
              href={item.href}
              isRTL={isRTL}
              pathname={pathname}
            />
          </li>
        ))}
      </ul>

    </div>
  )
}

/** Projects tab content — minimal single-column list */
function ProjectsPanel({
  language, isRTL, pathname,
}: {
  language: 'en' | 'ar'
  isRTL:    boolean
  pathname: string
}) {
  return (
    // Max-width constrains the projects column so it doesn't stretch full-width
    <div className={cn('max-w-xs', isRTL ? 'text-right' : 'text-left')}>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted mb-4">
        {language === 'en' ? 'By Type' : 'حسب النوع'}
      </p>
      <ul className="space-y-1" role="list">
        {SOLUTIONS_PROJECTS.map((project) => {
          const active = pathname.startsWith(project.href)
          return (
            <li key={project.href}>
              <motion.div whileHover={{ x: isRTL ? -4 : 4 }} transition={{ duration: 0.15 }}>
                <Link
                  href={project.href}
                  className={cn(
                    'block py-2 text-base font-semibold transition-colors duration-150',
                    active
                      ? 'text-brand-red'
                      : 'text-text-heading hover:text-brand-red',
                  )}
                >
                  {language === 'en' ? project.en : project.ar}
                </Link>
              </motion.div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

interface Props {
  onEnter: () => void  // Called when mouse enters the panel — cancels close timer
  onLeave: () => void  // Called when mouse leaves the panel — restarts close timer
}

// Tab type — union keeps the tab state strictly typed
type Tab = 'products' | 'projects'

export default function HeaderSolutionsMegaMenu({ onEnter, onLeave }: Props) {
  const { language, isRTL } = useLanguage()
  const pathname            = usePathname()
  const shouldReduce        = useReducedMotion()

  // Active tab state — Products is default per spec
  const [activeTab, setActiveTab] = useState<Tab>('products')
  // Track direction for the slide animation: +1 = going right, -1 = going left
  const [dir, setDir]             = useState<1 | -1>(1)

  // Switch tab and record direction for the AnimatePresence slide
  function switchTab(tab: Tab) {
    if (tab === activeTab) return
    // Products is "left", Projects is "right" — switching determines slide direction
    setDir(tab === 'projects' ? 1 : -1)
    setActiveTab(tab)
  }

  const tabLabels: Record<Tab, { en: string; ar: string }> = {
    products: { en: 'Products', ar: 'المنتجات' },
    projects: { en: 'Projects', ar: 'المشاريع' },
  }

  return (
    <motion.div
      // Panel entry animation — slides down 8px and fades in
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: EASE }}
      style={{
        // Fixed positioning anchors to viewport, not parent — spans full width
        position: 'fixed', top: 56, left: 0, right: 0, zIndex: 40,
        // Warm brand shadow — never rgba(0,0,0,x)
        boxShadow: '0 12px 40px rgba(45,41,38,0.10), 0 2px 8px rgba(45,41,38,0.06)',
      }}
      className="bg-white border-b border-border-light"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      // dir on wrapper: RTL reverses column order visually without DOM reorder
      dir={isRTL ? 'rtl' : 'ltr'}
      role="dialog"
      aria-label={language === 'en' ? 'Our Solutions menu' : 'قائمة حلولنا'}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* ── Tab switcher ─────────────────────────────────────────────────── */}
        <div
          className={cn(
            'flex items-center gap-0 border-b border-border-light',
            // Tab bar sits at the top of the panel
          )}
          role="tablist"
          aria-label={language === 'en' ? 'Solutions categories' : 'فئات الحلول'}
        >
          {(['products', 'projects'] as Tab[]).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isActive}
                // Min touch target 44px — WCAG 2.5.5 AA
                className={cn(
                  'relative px-5 py-4 text-sm font-semibold min-h-[44px]',
                  'transition-colors duration-150 focus-visible:outline-none',
                  'focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-1',
                  isActive
                    ? 'text-text-heading'  // Active: dark heading color
                    : 'text-text-muted hover:text-text-body',  // Inactive: muted, hover lifts
                )}
                onClick={() => switchTab(tab)}
              >
                {language === 'en' ? tabLabels[tab].en : tabLabels[tab].ar}

                {/* Shared-element tab indicator — slides between tabs via layoutId */}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"  // layoutId causes Framer to animate this between positions
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-red"
                    // Layout animations use spring by default — spring feels snappy here
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        {/* overflow-hidden clips the sliding content during AnimatePresence */}
        <div className="relative overflow-hidden py-8 min-h-[200px]">
          <AnimatePresence mode="wait" custom={dir}>
            {activeTab === 'products' ? (
              <motion.div
                key="products"
                custom={dir}
                variants={shouldReduce ? {} : panelVariants}
                initial="enter"
                animate="rest"
                exit="exit"
                // 3-column grid — one column per material system
                className="grid grid-cols-3 gap-12"
              >
                {SOLUTIONS_PRODUCTS.map((column) => (
                  <MaterialColumn
                    key={column.material.href}
                    column={column}
                    language={language}
                    isRTL={isRTL}
                    pathname={pathname}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                custom={dir}
                variants={shouldReduce ? {} : panelVariants}
                initial="enter"
                animate="rest"
                exit="exit"
              >
                <ProjectsPanel
                  language={language}
                  isRTL={isRTL}
                  pathname={pathname}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  )
}
