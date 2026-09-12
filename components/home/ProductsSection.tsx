'use client'

/**
 * components/home/ProductsSection.tsx
 *
 * Material Focus Cards — three equal panels that respond to hover with
 * an expand/shrink/dim effect. The hovered card grows (flex-grow 2.5),
 * siblings compress (flex-grow 0.6) and dim (opacity 0.45, scale 0.98).
 * Sub-category chips stagger up inside the expanded card.
 *
 * On click → navigate to /products/[material].
 *
 * Animations (all Framer Motion):
 *   • Flex-grow: motion.div layout prop + spring {stiffness:200, damping:28}
 *   • Sibling dim: opacity + scale animate prop
 *   • Image zoom: scale 1.0→1.07 on parent hover, duration 0.6s
 *   • Perspective tilt: rotateY ±5° via useMotionValue + mouse position
 *   • Chip entrance: staggerChildren 0.05s, y 10→0 + opacity 0→1
 *   • Section entrance: fadeUp scroll-triggered
 *
 * Shadows: rgba(45,41,38,x) — never rgba(0,0,0,x).
 * No blue anywhere — all overlays use rgba(26,26,26,x) warm dark.
 */

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { SOLUTIONS_PRODUCTS } from '@/lib/data/nav'

// ─── Static image map ─────────────────────────────────────────────────────────
// Placeholder Unsplash images — replaced with real photography pre-launch.
// Each image chosen to visually represent the material system at a glance.
const MATERIAL_IMAGES: Record<string, string> = {
  '/products/upvc':
    'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=1200&h=1600&fit=crop',
  '/products/aluminum':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1600&fit=crop',
  '/products/glass':
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1600&fit=crop',
}

// ─── Animation constants ──────────────────────────────────────────────────────

// Spring used for flex-grow expand/compress — feels physical, not timed
const LAYOUT_SPRING = { type: 'spring' as const, stiffness: 200, damping: 28 }

// Ease curve for chip stagger and section entrance
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1]

// Chip container — stagger children at 0.05s intervals
const chipContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

// Individual chip — slides up 10px and fades in
const chipItem = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
}

// ─── MaterialCard ─────────────────────────────────────────────────────────────

interface CardProps {
  /** The material column data from SOLUTIONS_PRODUCTS */
  column:    typeof SOLUTIONS_PRODUCTS[0]
  /** Whether THIS card is the one being hovered */
  isHovered: boolean
  /** Whether ANY card is being hovered (used to dim non-hovered siblings) */
  anyHovered: boolean
  language:  'en' | 'ar'
  isRTL:     boolean
  onHover:   () => void    // Mouse enters this card
  onLeave:   () => void    // Mouse leaves this card
  shouldReduce: boolean    // useReducedMotion result
}

function MaterialCard({
  column, isHovered, anyHovered, language, isRTL, onHover, onLeave, shouldReduce,
}: CardProps) {
  // Mouse position for perspective tilt — tracked relative to the card element
  const cardRef  = useRef<HTMLDivElement>(null)
  const mouseX   = useMotionValue(0)   // -0.5 to +0.5 relative to card width
  const mouseY   = useMotionValue(0)   // -0.5 to +0.5 relative to card height

  // Map mouse position to rotation: ±5° on Y axis, ±3° on X axis
  // useTransform maps the 0→1 input range to the degree output range
  const rotateY  = useTransform(mouseX, [-0.5, 0.5], [5, -5])
  const rotateX  = useTransform(mouseY, [-0.5, 0.5], [-3, 3])

  // Track mouse position within the card for the tilt effect
  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduce || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    // Normalise to -0.5→0.5 range centered on card midpoint
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  // Reset tilt when mouse leaves
  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
    onLeave()
  }

  const label    = language === 'en' ? column.material.en : column.material.ar
  const imgSrc   = MATERIAL_IMAGES[column.material.href] ?? MATERIAL_IMAGES['/products/upvc']

  return (
    // layout prop: Framer animates flex-grow changes between renders using LAYOUT_SPRING
    <motion.div
      ref={cardRef}
      layout
      // Expand hovered card, compress siblings; all equal at rest (flex-grow 1)
      animate={shouldReduce ? undefined : {
        // Hovered: wide. Sibling while something is hovered: narrow. Rest: equal.
        flexGrow:  isHovered ? 2.5 : anyHovered ? 0.6 : 1,
        // Siblings dim when another card is active
        opacity:   !isHovered && anyHovered ? 0.45 : 1,
        // Siblings scale very slightly inward — depth cue
        scale:     !isHovered && anyHovered ? 0.98 : 1,
      }}
      transition={LAYOUT_SPRING}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // perspective enables the 3D tilt — applied on the wrapper not the Link
      // so the tilt doesn't interfere with Next.js Link's click handling
      style={shouldReduce ? undefined : {
        perspective: 800,
        rotateY:     isHovered ? rotateY : 0,
        rotateX:     isHovered ? rotateX : 0,
      }}
      // min-w-0 prevents flex children from overflowing their container
      className="relative min-w-0 min-h-[480px] md:min-h-[560px] overflow-hidden cursor-pointer"
    >
      <Link
        href={column.material.href}
        className="block w-full h-full"
        aria-label={label}
        // Stretch to fill the motion.div at all flex-grow sizes
        style={{ position: 'absolute', inset: 0 }}
      >

        {/* ── Full-bleed background image ─────────────────────────────── */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduce ? undefined : {
            // Image zooms in when its card is hovered
            scale: isHovered ? 1.07 : 1,
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Image
            src={imgSrc}
            alt={label}
            fill
            // sizes: expanded card ≈ 50vw, compressed ≈ 15vw, equal ≈ 33vw
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover"
            priority={column.material.href === '/products/upvc'} // LCP candidate — first card
          />
        </motion.div>

        {/* ── Gradient overlay — warm dark, never cold black ──────────── */}
        {/* Two-stop gradient: heavy at bottom for text legibility, fades out at top */}
        <div
          className="absolute inset-0"
          style={{
            background: isHovered
              // Hovered: stronger gradient — more text visible
              ? 'linear-gradient(to top, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.4) 50%, rgba(26,26,26,0.05) 100%)'
              // Rest: lighter gradient — image breathes
              : 'linear-gradient(to top, rgba(26,26,26,0.75) 0%, rgba(26,26,26,0.2) 60%, rgba(26,26,26,0) 100%)',
            transition: 'background 0.4s ease',
          }}
        />

        {/* ── Card content — pinned to bottom ─────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6 md:p-8"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >

          {/* Material label — always visible */}
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 mb-2">
            {language === 'en' ? 'Material System' : 'نظام المواد'}
          </p>

          {/* Material name — H3 scale, bold */}
          <h3 className="text-2xl md:text-3xl font-bold font-cairo text-white leading-tight mb-3">
            {label}
          </h3>

          {/* ── Sub-category chips — appear on hover ─────────────────── */}
          <AnimatePresence>
            {isHovered && !shouldReduce && (
              <motion.div
                key="chips"
                variants={chipContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                // flex-wrap so chips wrap on narrow expanded cards
                className="flex flex-wrap gap-2 mb-5"
              >
                {column.items.map((item) => (
                  <motion.span
                    key={item.href}
                    variants={chipItem}
                    className="inline-block px-3 py-1 text-xs font-semibold rounded-sm
                               bg-white/15 text-white border border-white/25
                               backdrop-blur-sm"
                    // 4px radius per brand system — buttons/tags use 4px
                    style={{ borderRadius: 4 }}
                  >
                    {language === 'en' ? item.en : item.ar}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Explore CTA — appears on hover ──────────────────────── */}
          <motion.div
            animate={shouldReduce ? undefined : {
              opacity: isHovered ? 1 : 0,
              y:       isHovered ? 0 : 8,
            }}
            transition={{ duration: 0.25, ease: EASE }}
            className={`inline-flex items-center gap-2 text-sm font-bold text-white
                        border-b border-white/50 pb-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}
            aria-hidden={!isHovered} // Hidden from screen readers when not visible
          >
            <span>{language === 'en' ? 'Explore Products' : 'استعرض المنتجات'}</span>
            <ArrowRight
              size={14}
              weight="bold"
              className={isRTL ? 'rotate-180' : ''}
            />
          </motion.div>

        </div>

      </Link>
    </motion.div>
  )
}

// ─── ProductsSection ──────────────────────────────────────────────────────────

export default function ProductsSection() {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  // Track which material is hovered — null when no card is active
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  const copy = {
    en: {
      eyebrow:  'Product Range',
      title:    'Our Products',
      subtitle: 'uPVC, aluminium, and glass systems for every project scale',
    },
    ar: {
      eyebrow:  'نطاق المنتجات',
      title:    'منتجاتنا',
      subtitle: 'أنظمة uPVC والألومنيوم والزجاج لكل مقياس مشروع',
    },
  }
  const t = copy[language]

  return (
    <section
      className="py-24 bg-off-white"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="products-heading"
    >
      <div className="container-custom">

        {/* ── Section heading ──────────────────────────────────────────────── */}
        <motion.div
          className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {/* Eyebrow label — small red uppercase */}
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
            {t.eyebrow}
          </p>

          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3 text-balance"
          >
            {t.title}
          </h2>

          <p className="text-lg text-text-body max-w-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* ── Material focus cards ─────────────────────────────────────────── */}
        {/*
          flex layout drives the expand/compress behaviour.
          gap-3 gives visible breathing room between cards.
          min-h ensures cards have presence even before hover.
          overflow-hidden clips the image zoom to card bounds.
        */}
        <motion.div
          className="flex flex-col md:flex-row gap-3 overflow-hidden"
          // Rounded corners on the container clip all three cards together
          style={{ borderRadius: 8 }}
          variants={fadeUp}
          initial={shouldReduce ? {} : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {SOLUTIONS_PRODUCTS.map((column) => (
            <MaterialCard
              key={column.material.href}
              column={column}
              isHovered={hoveredHref === column.material.href}
              anyHovered={hoveredHref !== null}
              language={language}
              isRTL={isRTL}
              onHover={() => setHoveredHref(column.material.href)}
              onLeave={() => setHoveredHref(null)}
              shouldReduce={shouldReduce ?? false}
            />
          ))}
        </motion.div>

        {/* ── Mobile fallback note ─────────────────────────────────────────── */}
        {/*
          The expand/compress effect requires horizontal space — on mobile,
          cards stack vertically (flex-col) and hover is replaced by tap-to-navigate.
          This is handled by Tailwind's responsive prefixes below.
        */}

      </div>
    </section>
  )
}
