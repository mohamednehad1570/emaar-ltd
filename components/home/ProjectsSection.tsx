'use client'

/**
 * components/home/ProjectsSection.tsx
 *
 * Infinite marquee of project cards — 4 villas + 4 buildings, all mixed.
 * Direction is OPPOSITE of ProductsSection:
 *   EN → right (cards move right), AR → left (cards move left).
 *
 * All cards are tagged with their project type (Villa / Building).
 *
 * Hover behaviour mirrors ProductsSection:
 *   • Marquee pauses
 *   • Hovered card scales up + warm shadow
 *   • Siblings dim
 *
 * Click: navigates to /projects/villas or /projects/buildings.
 *
 * Uses the same marquee-scroll @keyframes as ProductsSection —
 * direction reversed by swapping --marquee-from and --marquee-to values.
 *
 * Shadows: rgba(45,41,38,x) only. No blue. No rgba(0,0,0,x).
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'

// ─── Card data ────────────────────────────────────────────────────────────────

interface ProjectCard {
  id:       string
  title:    { en: string; ar: string }
  location: { en: string; ar: string }
  year:     string
  image:    string
  /** Always shown — 'villa' or 'building' */
  type:     'villa' | 'building'
  /** Route — all villas → /projects/villas, buildings → /projects/buildings */
  href:     string
}

// 4 villas + 4 buildings, mixed order
const PROJECT_CARDS: ProjectCard[] = [
  {
    id:       'villa-jumeirah',
    type:     'villa',
    href:     '/projects/villas',
    title:    { en: 'Jumeirah Villa',          ar: 'فيلا جميرا'            },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2024',
    image:    'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
  },
  {
    id:       'building-business-bay',
    type:     'building',
    href:     '/projects/buildings',
    title:    { en: 'Business Bay Tower',      ar: 'برج الخليج التجاري'    },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2023',
    image:    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    id:       'villa-palm',
    type:     'villa',
    href:     '/projects/villas',
    title:    { en: 'Palm Residence',          ar: 'إقامة النخيل'           },
    location: { en: 'Abu Dhabi, UAE',          ar: 'أبو ظبي، الإمارات'     },
    year:     '2024',
    image:    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  },
  {
    id:       'building-marina',
    type:     'building',
    href:     '/projects/buildings',
    title:    { en: 'Marina Heights',          ar: 'مرتفعات المارينا'      },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2023',
    image:    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
  },
  {
    id:       'villa-arabian',
    type:     'villa',
    href:     '/projects/villas',
    title:    { en: 'Arabian Ranches Villa',   ar: 'فيلا المرابع العربية'  },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2022',
    image:    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id:       'building-downtown',
    type:     'building',
    href:     '/projects/buildings',
    title:    { en: 'Downtown Complex',        ar: 'مجمع وسط المدينة'      },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2022',
    image:    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  },
  {
    id:       'villa-meadows',
    type:     'villa',
    href:     '/projects/villas',
    title:    { en: 'The Meadows Villa',       ar: 'فيلا ذا ميدوز'         },
    location: { en: 'Dubai, UAE',              ar: 'دبي، الإمارات'         },
    year:     '2023',
    image:    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  },
  {
    id:       'building-sharjah',
    type:     'building',
    href:     '/projects/buildings',
    title:    { en: 'Sharjah Office Park',     ar: 'مجمع مكاتب الشارقة'   },
    location: { en: 'Sharjah, UAE',            ar: 'الشارقة، الإمارات'     },
    year:     '2022',
    image:    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
  },
]

// ─── Type badge colours ───────────────────────────────────────────────────────
// Villa: warm gold tint (luxury residential feel)
// Building: silver tint (commercial/corporate feel)
const TYPE_STYLE = {
  villa:    'bg-gold/20 text-gold border-gold/30',
  building: 'bg-silver-flat/20 text-silver-dark border-silver-flat/40',
} as const

const TYPE_LABEL = {
  villa:    { en: 'Villa',    ar: 'فيلا'  },
  building: { en: 'Building', ar: 'مبنى'  },
} as const

// ─── ProjectMarqueeCard ───────────────────────────────────────────────────────

interface CardProps {
  card:         ProjectCard
  language:     'en' | 'ar'
  isHovered:    boolean
  isAnyHovered: boolean
  onHover:      () => void
  onLeave:      () => void
  shouldReduce: boolean
  isRTL:        boolean
}

function ProjectMarqueeCard({
  card, language, isHovered, isAnyHovered, onHover, onLeave, shouldReduce, isRTL,
}: CardProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={shouldReduce ? undefined : {
        scale:   isHovered ? 1.04 : 1,
        opacity: isAnyHovered && !isHovered ? 0.65 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      // w-80 = 320px — wider than product cards (16:9 landscape ratio)
      className="relative shrink-0 w-80 h-52 overflow-hidden cursor-pointer"
      style={{
        borderRadius: 8,
        boxShadow: isHovered
          ? '0 12px 32px rgba(45,41,38,0.18), 0 4px 8px rgba(45,41,38,0.10)'
          : '0 2px 8px rgba(45,41,38,0.08)',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <Link
        href={card.href}
        className="block w-full h-full"
        tabIndex={0}
        aria-label={`${language === 'en' ? card.title.en : card.title.ar} — ${TYPE_LABEL[card.type][language]}`}
        style={{ position: 'absolute', inset: 0 }}
      >

        {/* ── Full-bleed image ─────────────────────────────────────────── */}
        <motion.div
          className="absolute inset-0"
          animate={shouldReduce ? undefined : { scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={card.image}
            alt={language === 'en' ? card.title.en : card.title.ar}
            fill
            sizes="320px"
            className="object-cover"
          />
        </motion.div>

        {/* ── Gradient — warm dark bottom fade ────────────────────────── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.90) 0%, rgba(26,26,26,0.35) 50%, rgba(26,26,26,0) 100%)',
          }}
        />

        {/* ── Type badge — top corner ──────────────────────────────────── */}
        {/* Positioned at reading-start corner (top-left LTR, top-right RTL) */}
        <div className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'}`}>
          <span
            className={`inline-block px-2 py-0.5 text-[9px] font-bold
                        uppercase tracking-[0.16em] border backdrop-blur-sm
                        ${TYPE_STYLE[card.type]}`}
            style={{ borderRadius: 4 }}
          >
            {TYPE_LABEL[card.type][language]}
          </span>
        </div>

        {/* ── Card content — bottom ────────────────────────────────────── */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4"
          style={{ textAlign: isRTL ? 'right' : 'left' }}
        >
          {/* Project title */}
          <h3 className="text-sm font-bold font-cairo text-white leading-snug mb-1.5">
            {language === 'en' ? card.title.en : card.title.ar}
          </h3>

          {/* Location + year meta row */}
          <div
            className={`flex items-center gap-1.5 text-xs text-white/65
                        ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
          >
            <MapPin size={11} className="shrink-0" aria-hidden="true" />
            <span>{language === 'en' ? card.location.en : card.location.ar}</span>
            <span aria-hidden="true">·</span>
            {/* dir=ltr keeps year digits in correct order inside RTL context */}
            <span dir="ltr">{card.year}</span>
          </div>
        </div>

      </Link>
    </motion.div>
  )
}

// ─── ProjectsSection ──────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // OPPOSITE direction to ProductsSection:
  // EN → moves right (from -50% to 0%) — ProductsSection moves left (0% to -50%)
  // AR → moves left  (from 0% to -50%) — ProductsSection moves right (-50% to 0%)
  const copy = {
    en: { eyebrow: 'Our Portfolio', title: 'Featured Projects', subtitle: 'Villas and buildings across the Emirates' },
    ar: { eyebrow: 'محفظتنا',       title: 'المشاريع المميزة',  subtitle: 'فلل ومبانٍ عبر الإمارات'                },
  }
  const t = copy[language]

  return (
    <section
      className="py-24 bg-white overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
      aria-labelledby="projects-heading"
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
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3"
          >
            {t.title}
          </h2>
          <p className="text-lg text-text-body max-w-lg">{t.subtitle}</p>
        </motion.div>

      </div>

      {/* ── Marquee track ─────────────────────────────────────────────────── */}
      <div
        style={{
          '--marquee-play': hoveredId ? 'paused' : 'running',
        } as React.CSSProperties}
      >
        <motion.div
          className="flex gap-3 w-max"
          style={{
            animation: shouldReduce
              ? 'none'
              : `${isRTL ? 'marquee-left' : 'marquee-right'} 40s linear infinite`,
            animationPlayState: 'var(--marquee-play, running)',
          } as React.CSSProperties}
        >
          {/* First copy */}
          {PROJECT_CARDS.map((card) => (
            <ProjectMarqueeCard
              key={`a-${card.id}`}
              card={card}
              language={language}
              isHovered={hoveredId === card.id}
              isAnyHovered={hoveredId !== null}
              onHover={() => setHoveredId(card.id)}
              onLeave={() => setHoveredId(null)}
              shouldReduce={shouldReduce ?? false}
              isRTL={isRTL}
            />
          ))}

          {/* Second copy — seamless loop */}
          {PROJECT_CARDS.map((card) => (
            <ProjectMarqueeCard
              key={`b-${card.id}`}
              card={card}
              language={language}
              isHovered={hoveredId === card.id}
              isAnyHovered={hoveredId !== null}
              onHover={() => setHoveredId(card.id)}
              onLeave={() => setHoveredId(null)}
              shouldReduce={shouldReduce ?? false}
              isRTL={isRTL}
            />
          ))}
        </motion.div>
      </div>

    </section>
  )
}
