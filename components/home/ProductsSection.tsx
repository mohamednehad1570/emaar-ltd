'use client'

/**
 * components/home/ProductsSection.tsx
 *
 * Infinite marquee of sub-product cards — all materials mixed.
 * Direction: EN → left (cards move left), AR → right (cards move right).
 *
 * Tagging rule:
 *   Shared sub-products (Doors & Windows, Staircases) appear twice —
 *   once per material — each tagged with their material label.
 *   Unique sub-products (Pergola, Skylights, etc.) appear once, untagged.
 *
 * Hover behaviour:
 *   • Marquee pauses (animation-play-state: paused via CSS variable)
 *   • Hovered card scales up (1.0 → 1.04) + warm shadow appears
 *   • Other cards dim slightly (opacity 1.0 → 0.65)
 *
 * Click: navigates to the sub-product category page.
 *
 * Animation engine:
 *   CSS @keyframes marquee (defined in globals.css via Tailwind @keyframes)
 *   controls the scroll — Framer Motion handles per-card hover micro-effects.
 *   The track is duplicated (renderered twice) so the loop is seamless.
 *
 * Shadows: rgba(45,41,38,x) only. No blue. No rgba(0,0,0,x).
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'

// ─── Card data ────────────────────────────────────────────────────────────────

interface ProductCard {
  id:       string          // Unique key for React — material+slug combo
  label:    { en: string; ar: string }
  href:     string          // Sub-product category route
  image:    string          // Placeholder — replaced pre-launch
  /** Only set for sub-products shared across materials */
  tag?:     { en: string; ar: string }
}

// Shared sub-products appear twice (once per material) with a material tag.
// Unique sub-products appear once with no tag.
// Order is intentionally mixed — not grouped by material.
const PRODUCT_CARDS: ProductCard[] = [
  // ── Unique ───────────────────────────────────────────────────────────────
  {
    id: 'pergola',
    label: { en: 'Pergola',          ar: 'برجولة'          },
    href:  '/products/aluminum/pergola',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop',
  },
  {
    id: 'stained-glass',
    label: { en: 'Stained Glass',    ar: 'زجاج ملون'        },
    href:  '/products/glass/stained-glass',
    image: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&h=800&fit=crop',
  },
  // ── Shared — uPVC ────────────────────────────────────────────────────────
  {
    id: 'upvc-doors-windows',
    label: { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'    },
    href:  '/products/upvc/doors-and-windows',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&h=800&fit=crop',
    tag:   { en: 'uPVC',             ar: 'يوبيفيسي'         },
  },
  // ── Unique ───────────────────────────────────────────────────────────────
  {
    id: 'skylights',
    label: { en: 'Skylights',        ar: 'فتحات سقفية'     },
    href:  '/products/aluminum/skylights',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop',
  },
  // ── Shared — Aluminium ───────────────────────────────────────────────────
  {
    id: 'alu-staircases',
    label: { en: 'Staircases',       ar: 'درابزين'          },
    href:  '/products/aluminum/staircases',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop',
    tag:   { en: 'Aluminium',        ar: 'ألومنيوم'         },
  },
  // ── Unique ───────────────────────────────────────────────────────────────
  {
    id: 'hebeschibe',
    label: { en: 'Hebeschibe',       ar: 'نظام رفع وإزاحة' },
    href:  '/products/upvc/hebeschibe',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop',
  },
  {
    id: 'frameless-doors',
    label: { en: 'Frameless Doors',  ar: 'أبواب بلا إطار'  },
    href:  '/products/aluminum/frameless-doors',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=800&fit=crop',
  },
  // ── Shared — Aluminium ───────────────────────────────────────────────────
  {
    id: 'alu-doors-windows',
    label: { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'    },
    href:  '/products/aluminum/doors-and-windows',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop',
    tag:   { en: 'Aluminium',        ar: 'ألومنيوم'         },
  },
  // ── Unique ───────────────────────────────────────────────────────────────
  {
    id: 'security-systems',
    label: { en: 'Security Systems', ar: 'أنظمة الأمان'    },
    href:  '/products/aluminum/security-system',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
  },
  {
    id: 'sandblast',
    label: { en: 'Sandblast',        ar: 'زجاج مسند'        },
    href:  '/products/glass/sandblast',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=800&fit=crop',
  },
  // ── Shared — uPVC ────────────────────────────────────────────────────────
  {
    id: 'upvc-staircases',
    label: { en: 'Staircases',       ar: 'درابزين'          },
    href:  '/products/upvc/staircases',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop',
    tag:   { en: 'uPVC',             ar: 'يوبيفيسي'         },
  },
  // ── Unique ───────────────────────────────────────────────────────────────
  {
    id: 'handrails',
    label: { en: 'Handrails',        ar: 'درابزين يدوي'     },
    href:  '/products/aluminum/handrails',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=800&fit=crop',
  },
  {
    id: 'acp-panels',
    label: { en: 'ACP Panels',       ar: 'ألواح ACP'        },
    href:  '/products/aluminum/acp-panels',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=800&fit=crop',
  },
]

// ─── MarqueeCard ──────────────────────────────────────────────────────────────

interface MarqueeCardProps {
  card:        ProductCard
  language:    'en' | 'ar'
  isAnyHovered: boolean   // True when any card in the track is hovered
  isHovered:   boolean    // True when THIS card is hovered
  onHover:     () => void
  onLeave:     () => void
  shouldReduce: boolean
}

function MarqueeCard({
  card, language, isAnyHovered, isHovered, onHover, onLeave, shouldReduce,
}: MarqueeCardProps) {
  return (
    // motion.div wraps the Link so hover animations don't interfere with navigation
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={shouldReduce ? undefined : {
        // Hovered card: lift + full opacity
        scale:   isHovered ? 1.04 : 1,
        // Sibling cards dim when another is focused
        opacity: isAnyHovered && !isHovered ? 0.65 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      // w-56 = 224px card width — fixed so marquee speed is predictable
      // shrink-0 prevents flex from compressing cards
      className="relative shrink-0 w-56 h-72 overflow-hidden cursor-pointer"
      style={{
        borderRadius: 8,
        // Warm shadow appears on hover — rgba(45,41,38) never rgba(0,0,0)
        boxShadow: isHovered
          ? '0 12px 32px rgba(45,41,38,0.18), 0 4px 8px rgba(45,41,38,0.10)'
          : '0 2px 8px rgba(45,41,38,0.08)',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <Link
        href={card.href}
        className="block w-full h-full"
        // Prevent the marquee animation from making the link inaccessible
        tabIndex={0}
        aria-label={language === 'en' ? card.label.en : card.label.ar}
        style={{ position: 'absolute', inset: 0 }}
      >

        {/* ── Full-bleed background image ─────────────────────────────── */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduce ? undefined : { scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={card.image}
            alt={language === 'en' ? card.label.en : card.label.ar}
            fill
            // All cards same fixed width — 224px + some margin
            sizes="240px"
            className="object-cover"
          />
        </motion.div>

        {/* ── Gradient overlay — warm dark, never cold black ──────────── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.3) 55%, rgba(26,26,26,0) 100%)',
          }}
        />

        {/* ── Card content ─────────────────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-4">

          {/* Material tag — only shown for shared sub-products */}
          {card.tag && (
            <span
              className="inline-block mb-2 px-2 py-0.5 text-[9px] font-bold
                         uppercase tracking-[0.16em] text-white/80
                         border border-white/30 bg-white/10 backdrop-blur-sm"
              style={{ borderRadius: 4 }}
            >
              {language === 'en' ? card.tag.en : card.tag.ar}
            </span>
          )}

          {/* Sub-product name */}
          <h3 className="text-sm font-bold font-cairo text-white leading-snug">
            {language === 'en' ? card.label.en : card.label.ar}
          </h3>

        </div>

      </Link>
    </motion.div>
  )
}

// ─── ProductsSection ──────────────────────────────────────────────────────────

export default function ProductsSection() {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  // Track which card id is hovered — null when none
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // EN: marquee scrolls left (translateX 0 → -50%)
  // AR: marquee scrolls right (translateX -50% → 0), reversing direction
  // We always render two copies of the track — at -50% the second copy
  // is in exactly the same visual position as the first at 0%, creating
  // a seamless loop regardless of direction.
  const copy = {
    en: { eyebrow: 'Product Range', title: 'Our Products',  subtitle: 'Every system, every scale' },
    ar: { eyebrow: 'نطاق المنتجات', title: 'منتجاتنا',      subtitle: 'كل نظام، كل مقياس'         },
  }
  const t = copy[language]

  return (
    <section
      className="py-24 bg-off-white overflow-hidden"
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
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
            {t.eyebrow}
          </p>
          <h2
            id="products-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3"
          >
            {t.title}
          </h2>
          <p className="text-lg text-text-body max-w-lg">{t.subtitle}</p>
        </motion.div>

      </div>

      {/*
        Marquee track wrapper — full viewport width, overflows container-custom.
        overflow-hidden on section clips the track horizontally.
        No padding here — cards bleed to viewport edges for immersive feel.
      */}
      <div
        // Pause the CSS animation when any card is hovered
        // --play-state is read by the @keyframes rule in globals.css
        style={{
          '--marquee-play': hoveredId ? 'paused' : 'running',
        } as React.CSSProperties}
      >
        {/*
          Inner track: flex row, gap between cards.
          Rendered twice (two identical sets) so when the first set scrolls
          fully off-screen, the second set is already in position — seamless loop.
          total width = 2 × (13 cards × 224px + 13 gaps × 12px) ≈ 6188px
          The @keyframes animates translateX over this distance.
        */}
        <motion.div
          className="flex gap-3 w-max"
          style={{
            animation: shouldReduce
              ? 'none'
              : `${isRTL ? 'marquee-right' : 'marquee-left'} 35s linear infinite`,
            animationPlayState: 'var(--marquee-play, running)',
          } as React.CSSProperties}
        >
          {/* First copy of the track */}
          {PRODUCT_CARDS.map((card) => (
            <MarqueeCard
              key={`a-${card.id}`}
              card={card}
              language={language}
              isAnyHovered={hoveredId !== null}
              isHovered={hoveredId === card.id}
              onHover={() => setHoveredId(card.id)}
              onLeave={() => setHoveredId(null)}
              shouldReduce={shouldReduce ?? false}
            />
          ))}

          {/* Second copy — identical, immediately after first.
              When first copy scrolls fully off-screen, this one takes its place. */}
          {PRODUCT_CARDS.map((card) => (
            <MarqueeCard
              // b- prefix distinguishes second copy keys from first
              key={`b-${card.id}`}
              card={card}
              language={language}
              isAnyHovered={hoveredId !== null}
              // Second copy uses same id — both copies pause/highlight together
              isHovered={hoveredId === card.id}
              onHover={() => setHoveredId(card.id)}
              onLeave={() => setHoveredId(null)}
              shouldReduce={shouldReduce ?? false}
            />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
