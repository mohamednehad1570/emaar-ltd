'use client'

/**
 * components/home/ProductsSection.tsx
 *
 * Infinite marquee of sub-product cards — all materials mixed.
 * EN: moves left. AR: moves right.
 * Uses InfiniteMarquee shared component — pure Framer Motion, no CSS keyframes.
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'

// ─── Card data ────────────────────────────────────────────────────────────────

interface ProductCard {
  id:    string
  label: { en: string; ar: string }
  href:  string
  image: string
  tag?:  { en: string; ar: string }
}

const PRODUCT_CARDS: ProductCard[] = [
  {
    id:    'pergola',
    label: { en: 'Pergola',          ar: 'برجولة'           },
    href:  '/products/aluminum/pergola',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=800&fit=crop',
  },
  {
    id:    'stained-glass',
    label: { en: 'Stained Glass',    ar: 'زجاج ملون'         },
    href:  '/products/glass/stained-glass',
    image: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&h=800&fit=crop',
  },
  {
    id:    'upvc-doors-windows',
    label: { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'     },
    href:  '/products/upvc/doors-and-windows',
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=600&h=800&fit=crop',
    tag:   { en: 'uPVC',             ar: 'يوبيفيسي'          },
  },
  {
    id:    'skylights',
    label: { en: 'Skylights',        ar: 'فتحات سقفية'      },
    href:  '/products/aluminum/skylights',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop',
  },
  {
    id:    'alu-staircases',
    label: { en: 'Staircases',       ar: 'درابزين'           },
    href:  '/products/aluminum/staircases',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=800&fit=crop',
    tag:   { en: 'Aluminium',        ar: 'ألومنيوم'          },
  },
  {
    id:    'hebeschibe',
    label: { en: 'Hebeschibe',       ar: 'نظام رفع وإزاحة'  },
    href:  '/products/upvc/hebeschibe',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop',
  },
  {
    id:    'frameless-doors',
    label: { en: 'Frameless Doors',  ar: 'أبواب بلا إطار'   },
    href:  '/products/aluminum/frameless-doors',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=800&fit=crop',
  },
  {
    id:    'alu-doors-windows',
    label: { en: 'Doors & Windows',  ar: 'أبواب ونوافذ'     },
    href:  '/products/aluminum/doors-and-windows',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=800&fit=crop',
    tag:   { en: 'Aluminium',        ar: 'ألومنيوم'          },
  },
  {
    id:    'security-systems',
    label: { en: 'Security Systems', ar: 'أنظمة الأمان'     },
    href:  '/products/aluminum/security-system',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop',
  },
  {
    id:    'sandblast',
    label: { en: 'Sandblast',        ar: 'زجاج مسند'         },
    href:  '/products/glass/sandblast',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=800&fit=crop',
  },
  {
    id:    'upvc-staircases',
    label: { en: 'Staircases',       ar: 'درابزين'           },
    href:  '/products/upvc/staircases',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=800&fit=crop',
    tag:   { en: 'uPVC',             ar: 'يوبيفيسي'          },
  },
  {
    id:    'handrails',
    label: { en: 'Handrails',        ar: 'درابزين يدوي'      },
    href:  '/products/aluminum/handrails',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=800&fit=crop',
  },
  {
    id:    'acp-panels',
    label: { en: 'ACP Panels',       ar: 'ألواح ACP'         },
    href:  '/products/aluminum/acp-panels',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=800&fit=crop',
  },
]

// ─── Card component ───────────────────────────────────────────────────────────

function ProductCard({
  card, language, isHovered, isAnyHovered, onHover, onLeave, shouldReduce,
}: {
  card:         ProductCard
  language:     'en' | 'ar'
  isHovered:    boolean
  isAnyHovered: boolean
  onHover:      () => void
  onLeave:      () => void
  shouldReduce: boolean
}) {
  const label = language === 'en' ? card.label.en : card.label.ar

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={shouldReduce ? undefined : {
        scale:   isHovered ? 1.04 : 1,
        opacity: isAnyHovered && !isHovered ? 0.65 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 w-56 h-72 overflow-hidden"
      style={{
        borderRadius: 8,
        boxShadow: isHovered
          ? '0 12px 32px rgba(45,41,38,0.18), 0 4px 8px rgba(45,41,38,0.10)'
          : '0 2px 8px rgba(45,41,38,0.08)',
        transition: 'box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
    >
      <Link
        href={card.href}
        aria-label={label}
        style={{ position: 'absolute', inset: 0, display: 'block' }}
      >
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduce ? undefined : { scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={card.image}
            alt={label}
            fill
            sizes="240px"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.88) 0%, rgba(26,26,26,0.3) 55%, rgba(26,26,26,0) 100%)',
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
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
          <h3 className="text-sm font-bold font-cairo text-white leading-snug">
            {label}
          </h3>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductsSection() {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const copy = {
    en: { eyebrow: 'Product Range', title: 'Our Products',  subtitle: 'Every system, every scale' },
    ar: { eyebrow: 'نطاق المنتجات', title: 'منتجاتنا',      subtitle: 'كل نظام، كل مقياس'         },
  }
  const t = copy[language]

  // Cards JSX — rendered twice inside InfiniteMarquee for seamless loop
  const cards = PRODUCT_CARDS.map((card) => (
    <ProductCard
      key={card.id}
      card={card}
      language={language}
      isHovered={hoveredId === card.id}
      isAnyHovered={hoveredId !== null}
      onHover={() => setHoveredId(card.id)}
      onLeave={() => setHoveredId(null)}
      shouldReduce={shouldReduce ?? false}
    />
  ))

  // Second copy uses 'b-' prefix keys to avoid React key conflicts
  const cardsCopy = PRODUCT_CARDS.map((card) => (
    <ProductCard
      key={`b-${card.id}`}
      card={card}
      language={language}
      isHovered={hoveredId === card.id}
      isAnyHovered={hoveredId !== null}
      onHover={() => setHoveredId(card.id)}
      onLeave={() => setHoveredId(null)}
      shouldReduce={shouldReduce ?? false}
    />
  ))

  return (
    <section
      className="py-24 bg-off-white overflow-hidden"
      aria-labelledby="products-heading"
    >
      <div className="container-custom">
        <motion.div
          className={isRTL ? 'text-right mb-14' : 'text-left mb-14'}
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

      {/* Marquee — full viewport width, bleeds past container */}
      {!shouldReduce ? (
        <InfiniteMarquee
          duration={35}
          direction={isRTL ? 'right' : 'left'}
          paused={hoveredId !== null}
          childrenCopy={cardsCopy}
        >
          {cards}
        </InfiniteMarquee>
      ) : (
        // Reduced motion: static horizontal scroll
        <div className="flex gap-3 overflow-x-auto px-4 pb-4" dir="ltr">
          {cards}
        </div>
      )}
    </section>
  )
}
