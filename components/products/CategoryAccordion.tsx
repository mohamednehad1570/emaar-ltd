'use client'

/**
 * components/products/CategoryAccordion.tsx
 *
 * Two display variants:
 *
 * variant="cards" — Aluminium (8 categories)
 *   Desktop: all cards in one row, equal width, drawer slides below on click.
 *   Mobile:  horizontal scroll row (160px cards), drawer below on tap,
 *            page auto-scrolls so drawer is visible.
 *
 * variant="scroll" — uPVC (3 cats) + Glass (2 cats)
 *   Desktop: sticky sub-nav + full-viewport scroll-snapped panels (image 60% | content 40%).
 *   Mobile:  sticky sub-nav + stacked panels (image top 45vh, content below). No snap.
 *            Parallax disabled on mobile.
 *
 * Hash anchor: reads window.location.hash on mount → auto-expands (cards) or
 * auto-scrolls (scroll) to matching panel.
 *
 * Shadows: rgba(45,41,38,x) only. No blue. No rgba(0,0,0,x).
 */

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion, AnimatePresence, useReducedMotion,
  useScroll, useTransform,
} from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/cn'
import type { CategoryContent } from '@/lib/data/materialContent'

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]
const SPRING = { type: 'spring' as const, stiffness: 220, damping: 28 }

const listContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}
const listItem = {
  hidden:  { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25, ease: EASE } },
}

// ─── Shared content block ─────────────────────────────────────────────────────

function ContentBlock({
  category, language, isRTL, compact = false,
}: {
  category: CategoryContent
  language: 'en' | 'ar'
  isRTL:    boolean
  /** compact=true used inside mobile drawer — tighter spacing */
  compact?: boolean
}) {
  const label       = language === 'en' ? category.label.en       : category.label.ar
  const tagline     = language === 'en' ? category.tagline.en     : category.tagline.ar
  const description = language === 'en' ? category.description.en : category.description.ar

  return (
    <div className={cn(
      'flex flex-col justify-center h-full',
      compact ? 'px-5 py-6' : 'px-8 md:px-14 py-12',
      isRTL ? 'text-right items-end' : 'text-left items-start',
    )}>

      <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-red mb-2">
        {label}
      </p>
      <div className="h-0.5 w-8 bg-brand-red mb-4" aria-hidden="true" />

      <h3 className={cn(
        'font-cairo font-bold text-text-heading leading-snug mb-3 max-w-sm',
        compact ? 'text-lg' : 'text-xl md:text-2xl',
      )}>
        {tagline}
      </h3>

      <p className={cn(
        'text-text-body leading-relaxed mb-6 max-w-md',
        compact ? 'text-sm' : 'text-sm md:text-base',
      )}>
        {description}
      </p>

      <motion.ul
        variants={listContainer}
        initial="hidden"
        animate="visible"
        className="space-y-2 w-full max-w-md"
        role="list"
      >
        {category.characteristics.map((c, i) => (
          <motion.li
            key={i}
            variants={listItem}
            className={cn(
              'flex items-start gap-2.5 text-sm text-text-body',
              isRTL && 'flex-row-reverse',
            )}
          >
            <CheckCircle
              size={14}
              weight="fill"
              className="text-brand-red shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{language === 'en' ? c.en : c.ar}</span>
          </motion.li>
        ))}
      </motion.ul>

    </div>
  )
}

// ─── VARIANT A — Cards with drawer ───────────────────────────────────────────

// Single card button — shared between desktop row and mobile scroll row
function CategoryCard({
  category, isActive, isAnyActive, onClick, language, isRTL, shouldReduce,
  cardWidth, cardHeight,
}: {
  category:     CategoryContent
  isActive:     boolean
  isAnyActive:  boolean
  onClick:      () => void
  language:     'en' | 'ar'
  isRTL:        boolean
  shouldReduce: boolean
  cardWidth:    string   // CSS width value e.g. '160px' or '0'(flex)
  cardHeight:   number   // px
}) {
  const label = language === 'en' ? category.label.en : category.label.ar

  return (
    <motion.button
      id={category.slug}
      onClick={onClick}
      aria-expanded={isActive}
      aria-label={label}
      animate={shouldReduce ? undefined : {
        opacity: isAnyActive && !isActive ? 0.55 : 1,
      }}
      whileHover={shouldReduce ? undefined : { y: isActive ? 0 : -3 }}
      transition={{ duration: 0.2, ease: EASE }}
      className={cn(
        'relative overflow-hidden shrink-0 cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
      )}
      style={{
        width:        cardWidth,
        flex:         cardWidth === 'auto' ? '1 1 0' : undefined,
        height:       cardHeight,
        borderRadius: 8,
        boxShadow: isActive
          ? '0 0 0 2px #E74C3C'
          : '0 2px 8px rgba(45,41,38,0.08)',
        minWidth: cardWidth === 'auto' ? 0 : undefined,
      }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={shouldReduce ? undefined : { scale: isActive ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <Image
          src={category.image}
          alt={label}
          fill
          sizes="180px"
          className="object-cover"
        />
      </motion.div>

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: isActive
            ? 'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.4) 60%, rgba(26,26,26,0.1) 100%)'
            : 'linear-gradient(to top, rgba(26,26,26,0.80) 0%, rgba(26,26,26,0.2) 70%, rgba(26,26,26,0) 100%)',
          transition: 'background 0.3s ease',
        }}
        aria-hidden="true"
      />

      {/* Active top bar */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="absolute top-0 left-0 right-0 h-0.5 bg-brand-red"
            style={{ transformOrigin: isRTL ? 'right' : 'left' }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Label + chevron */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs font-bold font-cairo text-white text-center leading-snug">
          {label}
        </p>
        <motion.div
          className="flex justify-center mt-1.5"
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg width="10" height="7" viewBox="0 0 12 8" fill="none" aria-hidden="true">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </motion.button>
  )
}

// Drawer content — shared between desktop and mobile
function DrawerContent({
  category, material, language, isRTL, mobile = false,
}: {
  category: CategoryContent
  material: 'upvc' | 'aluminum' | 'glass'
  language: 'en' | 'ar'
  isRTL:    boolean
  mobile?:  boolean
}) {
  return (
    <div
      className={cn(
        'flex overflow-hidden bg-off-white border border-border-light',
        // Mobile: stack vertically. Desktop: side by side.
        mobile ? 'flex-col' : (isRTL ? 'flex-row-reverse' : 'flex-row'),
      )}
      style={{ borderRadius: 8, minHeight: mobile ? 'auto' : 400 }}
    >
      {/* Image */}
      <div
        className={cn(
          'relative overflow-hidden shrink-0',
          mobile ? 'w-full aspect-video' : 'w-[45%]',
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={category.slug + '-img'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <Image
              src={category.image}
              alt=""
              fill
              sizes={mobile ? '100vw' : '40vw'}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={category.slug + '-content'}
          className="flex-1"
          initial={{ opacity: 0, x: mobile ? 0 : (isRTL ? -16 : 16) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <ContentBlock
            category={category}
            language={language}
            isRTL={isRTL}
            compact={mobile}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function CardsVariant({
  categories, material, language, isRTL, shouldReduce, initialSlug,
}: {
  categories:   CategoryContent[]
  material:     'upvc' | 'aluminum' | 'glass'
  language:     'en' | 'ar'
  isRTL:        boolean
  shouldReduce: boolean
  initialSlug:  string | null
}) {
  const [activeSlug, setActiveSlug]   = useState<string | null>(initialSlug)
  const drawerRef                     = useRef<HTMLDivElement>(null)
  const mobileDrawerRef               = useRef<HTMLDivElement>(null)

  function handleClick(slug: string) {
    const isClosing = slug === activeSlug
    setActiveSlug(isClosing ? null : slug)

    // Auto-scroll: after state update, scroll drawer into view
    if (!isClosing) {
      setTimeout(() => {
        // Desktop drawer
        drawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        // Mobile drawer
        mobileDrawerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 120)   // Short delay — let AnimatePresence start rendering first
    }
  }

  const activeCategory = categories.find(c => c.slug === activeSlug) ?? null
  const sectionLabel   = language === 'en' ? 'Product categories' : 'فئات المنتجات'
  const headingLabel   = language === 'en' ? 'Explore Categories'  : 'استعرض الفئات'

  return (
    <section
      className="py-20 bg-white"
      aria-labelledby="accordion-heading"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Heading */}
        <div className={cn('mb-10', isRTL ? 'text-right' : 'text-left')}>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
            {sectionLabel}
          </p>
          <h2
            id="accordion-heading"
            className="font-cairo font-bold text-text-heading text-3xl md:text-4xl"
          >
            {headingLabel}
          </h2>
        </div>

        {/* ── Desktop card row (md+) ──────────────────────────────────── */}
        <div className="hidden md:block">
          <div className="flex gap-2 w-full" style={{ minHeight: 260 }}>
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                isActive={activeSlug === category.slug}
                isAnyActive={activeSlug !== null}
                onClick={() => handleClick(category.slug)}
                language={language}
                isRTL={isRTL}
                shouldReduce={shouldReduce}
                cardWidth="auto"   // flex-1 — fills row equally
                cardHeight={260}
              />
            ))}
          </div>

          {/* Desktop drawer */}
          <div ref={drawerRef}>
            <AnimatePresence>
              {activeCategory && (
                <motion.div
                  key={activeCategory.slug}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={shouldReduce
                    ? { duration: 0 }
                    : { height: SPRING, opacity: { duration: 0.25, ease: EASE } }
                  }
                  className="overflow-hidden mt-2"
                >
                  <motion.div
                    initial={shouldReduce ? {} : { y: 12 }}
                    animate={{ y: 0 }}
                    exit={shouldReduce ? {} : { y: 8 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <DrawerContent
                      category={activeCategory}
                      material={material}
                      language={language}
                      isRTL={isRTL}
                      mobile={false}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile horizontal scroll row (<md) ─────────────────────── */}
        <div className="md:hidden">
          {/* Scrollable card row */}
          <div
            className="flex gap-3 overflow-x-auto pb-3 no-scrollbar"
            dir="ltr"   // Always LTR — scroll direction must not flip in RTL
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                isActive={activeSlug === category.slug}
                isAnyActive={activeSlug !== null}
                onClick={() => handleClick(category.slug)}
                language={language}
                isRTL={isRTL}
                shouldReduce={shouldReduce}
                cardWidth="160px"  // Fixed width — scrollable
                cardHeight={200}
              />
            ))}
          </div>

          {/* Mobile drawer — full width, stacked vertically */}
          <div ref={mobileDrawerRef}>
            <AnimatePresence>
              {activeCategory && (
                <motion.div
                  key={activeCategory.slug + '-mobile'}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={shouldReduce
                    ? { duration: 0 }
                    : { height: SPRING, opacity: { duration: 0.2, ease: EASE } }
                  }
                  className="overflow-hidden mt-3"
                >
                  <DrawerContent
                    category={activeCategory}
                    material={material}
                    language={language}
                    isRTL={isRTL}
                    mobile={true}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── VARIANT B — Scroll-snap panels (uPVC + Glass) ───────────────────────────

function ParallaxImage({ src, alt, desktopOnly }: {
  src:          string
  alt:          string
  desktopOnly?: boolean   // Skip parallax on mobile — too heavy
}) {
  const ref                 = useRef<HTMLDivElement>(null)
  const shouldReduce        = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y                   = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        // Disable parallax on mobile (desktopOnly) or reduced motion
        style={(shouldReduce || desktopOnly) ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
          style={{ scale: 1.2 }}
        />
      </motion.div>
    </div>
  )
}

function ScrollVariant({
  categories, material, language, isRTL, shouldReduce, initialSlug,
}: {
  categories:   CategoryContent[]
  material:     'upvc' | 'aluminum' | 'glass'
  language:     'en' | 'ar'
  isRTL:        boolean
  shouldReduce: boolean
  initialSlug:  string | null
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    initialSlug ?? categories[0]?.slug ?? null,
  )
  const panelRefs = useRef<Map<string, HTMLElement>>(new Map())

  const setRef = useCallback((slug: string, el: HTMLElement | null) => {
    if (el) panelRefs.current.set(slug, el)
    else panelRefs.current.delete(slug)
  }, [])

  function scrollToPanel(slug: string) {
    const el = panelRefs.current.get(slug)
    if (!el) return
    // 56px header + 48px sub-nav = 104px total offset
    const top = el.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    panelRefs.current.forEach((el, slug) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSlug(slug) },
        { threshold: 0.4 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [categories])

  useEffect(() => {
    if (!initialSlug) return
    setTimeout(() => scrollToPanel(initialSlug), 400)
  }, [initialSlug])

  const subNavLabel = language === 'en' ? 'Categories' : 'الفئات'

  return (
    <>
      {/* ── Sticky sub-nav ─────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-30 bg-white border-b border-border-light"
        dir={isRTL ? 'rtl' : 'ltr'}
        role="navigation"
        aria-label={subNavLabel}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {categories.map((category) => {
              const isActive = activeSlug === category.slug
              const label    = language === 'en' ? category.label.en : category.label.ar
              return (
                <button
                  key={category.slug}
                  onClick={() => scrollToPanel(category.slug)}
                  className={cn(
                    'relative shrink-0 px-4 py-2 min-h-[44px] text-sm font-semibold',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                    isActive
                      ? 'text-brand-red'
                      : 'text-text-muted hover:text-text-body',
                  )}
                  style={{ borderRadius: 4 }}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="subnav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-red"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Panels ─────────────────────────────────────────────────── */}
      {categories.map((category, i) => {
        const imageOnLeft = i % 2 === 0
        const label       = language === 'en' ? category.label.en : category.label.ar

        return (
          <section
            key={category.slug}
            id={category.slug}
            ref={(el) => setRef(category.slug, el)}
            className={cn(
              // Desktop: full-viewport horizontal split
              // Mobile: stacked, image top then content below
              'flex flex-col md:min-h-screen',
              // Desktop flex direction
              'md:flex',
              !isRTL && (imageOnLeft
                ? 'md:flex-row'
                : 'md:flex-row-reverse'),
              isRTL  && (imageOnLeft
                ? 'md:flex-row-reverse'
                : 'md:flex-row'),
            )}
            dir={isRTL ? 'rtl' : 'ltr'}
            aria-label={label}
          >

            {/* Image */}
            {/* Mobile: fixed height. Desktop: 60% width, full height */}
            <div className="relative h-[45vh] md:h-auto md:w-[60%] md:shrink-0">
              <ParallaxImage
                src={category.image}
                alt={label}
                // Only apply parallax on desktop — mobile parallax is jarring
                desktopOnly={false}
              />
              {/* Gradient toward content on desktop */}
              <div
                className="absolute inset-0 hidden md:block"
                style={{
                  background: imageOnLeft
                    ? 'linear-gradient(to right, transparent 70%, rgba(245,244,240,0.4) 100%)'
                    : 'linear-gradient(to left, transparent 70%, rgba(245,244,240,0.4) 100%)',
                }}
                aria-hidden="true"
              />
              {/* Mobile: gradient at bottom for visual separation */}
              <div
                className="absolute inset-0 md:hidden"
                style={{
                  background:
                    'linear-gradient(to top, rgba(245,244,240,1) 0%, transparent 40%)',
                }}
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            {/* Mobile: natural height, white bg. Desktop: 40% width, alternating bg */}
            <motion.div
              className={cn(
                'flex-1 flex flex-col justify-center',
                // Mobile always white bg
                'bg-off-white',
                // Desktop alternates
                'md:bg-transparent',
                i % 2 === 0 ? 'md:bg-off-white' : 'md:bg-white',
              )}
              initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <ContentBlock
                category={category}
                language={language}
                isRTL={isRTL}
                compact={false}
              />
            </motion.div>

          </section>
        )
      })}
    </>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface Props {
  categories: CategoryContent[]
  material:   'upvc' | 'aluminum' | 'glass'
  variant:    'cards' | 'scroll'
}

export default function CategoryAccordion({ categories, material, variant }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()
  const [initialSlug, setInitialSlug] = useState<string | null>(null)

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash && categories.some(c => c.slug === hash)) {
      setInitialSlug(hash)
    }
  }, [categories])

  return variant === 'cards' ? (
    <CardsVariant
      categories={categories}
      material={material}
      language={language}
      isRTL={isRTL}
      shouldReduce={shouldReduce ?? false}
      initialSlug={initialSlug}
    />
  ) : (
    <ScrollVariant
      categories={categories}
      material={material}
      language={language}
      isRTL={isRTL}
      shouldReduce={shouldReduce ?? false}
      initialSlug={initialSlug}
    />
  )
}
