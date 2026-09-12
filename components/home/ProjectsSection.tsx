'use client'

/**
 * components/home/ProjectsSection.tsx
 *
 * Infinite marquee of project cards — 4 villas + 4 buildings mixed.
 * EN: moves right (opposite of products). AR: moves left.
 * Uses InfiniteMarquee shared component — pure Framer Motion, no CSS keyframes.
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import InfiniteMarquee from '@/components/ui/InfiniteMarquee'

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ProjectCard {
  id:       string
  title:    { en: string; ar: string }
  location: { en: string; ar: string }
  year:     string
  image:    string
  type:     'villa' | 'building'
  href:     string
}

const PROJECT_CARDS: ProjectCard[] = [
  {
    id: 'villa-jumeirah', type: 'villa', href: '/projects/villas',
    title:    { en: 'Jumeirah Villa',        ar: 'فيلا جميرا'           },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2024',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
  },
  {
    id: 'building-business-bay', type: 'building', href: '/projects/buildings',
    title:    { en: 'Business Bay Tower',    ar: 'برج الخليج التجاري'   },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
  {
    id: 'villa-palm', type: 'villa', href: '/projects/villas',
    title:    { en: 'Palm Residence',        ar: 'إقامة النخيل'          },
    location: { en: 'Abu Dhabi, UAE',        ar: 'أبو ظبي، الإمارات'    },
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  },
  {
    id: 'building-marina', type: 'building', href: '/projects/buildings',
    title:    { en: 'Marina Heights',        ar: 'مرتفعات المارينا'     },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
  },
  {
    id: 'villa-arabian', type: 'villa', href: '/projects/villas',
    title:    { en: 'Arabian Ranches Villa', ar: 'فيلا المرابع العربية' },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  },
  {
    id: 'building-downtown', type: 'building', href: '/projects/buildings',
    title:    { en: 'Downtown Complex',      ar: 'مجمع وسط المدينة'     },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
  },
  {
    id: 'villa-meadows', type: 'villa', href: '/projects/villas',
    title:    { en: 'The Meadows Villa',     ar: 'فيلا ذا ميدوز'        },
    location: { en: 'Dubai, UAE',            ar: 'دبي، الإمارات'        },
    year: '2023',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  },
  {
    id: 'building-sharjah', type: 'building', href: '/projects/buildings',
    title:    { en: 'Sharjah Office Park',   ar: 'مجمع مكاتب الشارقة'  },
    location: { en: 'Sharjah, UAE',          ar: 'الشارقة، الإمارات'    },
    year: '2022',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
  },
]

const TYPE_LABEL = {
  villa:    { en: 'Villa',    ar: 'فيلا' },
  building: { en: 'Building', ar: 'مبنى' },
}

// ─── Card component ───────────────────────────────────────────────────────────

function ProjectCard({
  card, language, isRTL, isHovered, isAnyHovered, onHover, onLeave, shouldReduce,
}: {
  card:         ProjectCard
  language:     'en' | 'ar'
  isRTL:        boolean
  isHovered:    boolean
  isAnyHovered: boolean
  onHover:      () => void
  onLeave:      () => void
  shouldReduce: boolean
}) {
  const title = language === 'en' ? card.title.en : card.title.ar

  return (
    <motion.div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      animate={shouldReduce ? undefined : {
        scale:   isHovered ? 1.04 : 1,
        opacity: isAnyHovered && !isHovered ? 0.65 : 1,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative shrink-0 w-80 h-52 overflow-hidden"
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
        aria-label={`${title} — ${TYPE_LABEL[card.type][language]}`}
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
            alt={title}
            fill
            sizes="320px"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.90) 0%, rgba(26,26,26,0.35) 50%, rgba(26,26,26,0) 100%)',
          }}
        />

        {/* Type badge — top-left always (track is dir=ltr) */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-block px-2 py-0.5 text-[9px] font-bold
                       uppercase tracking-[0.16em] border backdrop-blur-sm
                       bg-white/15 text-white border-white/30"
            style={{ borderRadius: 4 }}
          >
            {TYPE_LABEL[card.type][language]}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-sm font-bold font-cairo text-white leading-snug mb-1.5">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-white/65">
            <MapPin size={11} className="shrink-0" aria-hidden="true" />
            <span>{language === 'en' ? card.location.en : card.location.ar}</span>
            <span aria-hidden="true">·</span>
            <span dir="ltr">{card.year}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProjectsSection() {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const copy = {
    en: { eyebrow: 'Our Portfolio', title: 'Featured Projects', subtitle: 'Villas and buildings across the Emirates' },
    ar: { eyebrow: 'محفظتنا',       title: 'المشاريع المميزة',  subtitle: 'فلل ومبانٍ عبر الإمارات'                },
  }
  const t = copy[language]

  const cards = PROJECT_CARDS.map((card) => (
    <ProjectCard
      key={card.id}
      card={card}
      language={language}
      isRTL={isRTL}
      isHovered={hoveredId === card.id}
      isAnyHovered={hoveredId !== null}
      onHover={() => setHoveredId(card.id)}
      onLeave={() => setHoveredId(null)}
      shouldReduce={shouldReduce ?? false}
    />
  ))

  const cardsCopy = PROJECT_CARDS.map((card) => (
    <ProjectCard
      key={`b-${card.id}`}
      card={card}
      language={language}
      isRTL={isRTL}
      isHovered={hoveredId === card.id}
      isAnyHovered={hoveredId !== null}
      onHover={() => setHoveredId(card.id)}
      onLeave={() => setHoveredId(null)}
      shouldReduce={shouldReduce ?? false}
    />
  ))

  return (
    <section
      className="py-24 bg-white overflow-hidden"
      aria-labelledby="projects-heading"
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
            id="projects-heading"
            className="text-4xl md:text-5xl font-bold font-cairo text-brand-dark mb-3"
          >
            {t.title}
          </h2>
          <p className="text-lg text-text-body max-w-lg">{t.subtitle}</p>
        </motion.div>
      </div>

      {/* Projects move OPPOSITE direction to products */}
      {!shouldReduce ? (
        <InfiniteMarquee
          duration={40}
          direction={isRTL ? 'left' : 'right'}
          paused={hoveredId !== null}
          childrenCopy={cardsCopy}
        >
          {cards}
        </InfiniteMarquee>
      ) : (
        <div className="flex gap-3 overflow-x-auto px-4 pb-4" dir="ltr">
          {cards}
        </div>
      )}
    </section>
  )
}
