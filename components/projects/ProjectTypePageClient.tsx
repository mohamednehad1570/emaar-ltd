'use client'

/**
 * components/projects/ProjectTypePageClient.tsx
 *
 * Editorial magazine layout for /projects/villas and /projects/buildings.
 *
 * Desktop:
 *   Sticky sub-nav (project name pills, active updates on scroll)
 *   Alternating spreads:
 *     Odd  — full-bleed image + floating info card (bottom corner)
 *     Even — split: text block 45% | image 55%
 *   Each spread is min-h-screen. Image has parallax.
 *
 * Mobile:
 *   Same sticky sub-nav (horizontally scrollable pills)
 *   Both spread types collapse to stacked layout:
 *     Image fills top (55vw height, no parallax)
 *     Content block below (white bg, normal scroll)
 *   Floating card becomes inline content block below image.
 *
 * CTA: ProductDetailCTA shared component at the end.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion, useReducedMotion,
  useScroll, useTransform,
} from 'framer-motion'
import { MapPin, ArrowRight } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/cn'
import ProductDetailCTA from '@/components/products/ProductDetailCTA'
import type { ProjectSpread } from '@/lib/data/projectContent'

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// ─── Parallax image — desktop only ───────────────────────────────────────────

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref                 = useRef<HTMLDivElement>(null)
  const shouldReduce        = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        // Disable parallax on mobile via media — we can't detect breakpoint in JS
        // cleanly without a hook, so we just apply it and rely on the image being
        // fixed-height on mobile (no overflow to create parallax effect)
        style={shouldReduce ? undefined : { y }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          className="object-cover"
          priority
          // Oversized to cover parallax travel at both extremes
          style={{ scale: 1.25 }}
        />
      </motion.div>
    </div>
  )
}

// ─── Material chip ────────────────────────────────────────────────────────────

function MaterialChip({
  label, dark = false,
}: {
  label: string
  dark?: boolean    // dark=true for chips on image overlay; dark=false for light bg
}) {
  return (
    <span
      className={cn(
        'inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]',
        dark
          ? 'bg-white/15 text-white border border-white/25 backdrop-blur-sm'
          : 'bg-cream text-text-muted border border-border-light',
      )}
      style={{ borderRadius: 4 }}
    >
      {label}
    </span>
  )
}

// ─── Project content block — shared between mobile stacked and split spread ───

function ProjectContentBlock({
  project, language, isRTL, compact = false,
}: {
  project:  ProjectSpread
  language: 'en' | 'ar'
  isRTL:    boolean
  compact?: boolean
}) {
  const title       = language === 'en' ? project.title.en       : project.title.ar
  const location    = language === 'en' ? project.location.en    : project.location.ar
  const description = language === 'en' ? project.description.en : project.description.ar
  const viewLabel   = language === 'en' ? 'View Project'         : 'عرض المشروع'

  return (
    <div className={cn(
      'flex flex-col justify-center',
      compact ? 'px-5 py-8' : 'px-8 md:px-14 py-12 md:py-16',
      isRTL ? 'text-right items-end' : 'text-left items-start',
    )}>

      {/* Red rule */}
      <div className="h-0.5 w-10 bg-brand-red mb-5" aria-hidden="true" />

      {/* Title */}
      <h3 className={cn(
        'font-cairo font-bold text-text-heading leading-snug mb-3 max-w-sm',
        compact ? 'text-xl' : 'text-2xl md:text-3xl',
      )}>
        {title}
      </h3>

      {/* Location + year */}
      <div className={cn(
        'flex items-center gap-2 text-text-muted text-sm mb-5',
        isRTL && 'flex-row-reverse',
      )}>
        <MapPin size={13} className="text-brand-red shrink-0" aria-hidden="true" />
        <span>{location}</span>
        <span aria-hidden="true">·</span>
        <span dir="ltr">{project.year}</span>
      </div>

      {/* Description */}
      <p className={cn(
        'text-text-body leading-relaxed mb-6 max-w-md',
        compact ? 'text-sm' : 'text-sm md:text-base',
      )}>
        {description}
      </p>

      {/* Material chips */}
      <div className={cn('flex flex-wrap gap-2 mb-7', isRTL && 'justify-end')}>
        {project.materials.map((m, i) => (
          <MaterialChip
            key={i}
            label={language === 'en' ? m.en : m.ar}
            dark={false}
          />
        ))}
      </div>

      {/* View project link */}
      <Link
        href={project.href}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-bold text-brand-red',
          'border-b border-brand-red pb-0.5',
          'hover:text-brand-red-dark transition-colors duration-150',
          isRTL && 'flex-row-reverse',
        )}
      >
        <span>{viewLabel}</span>
        <ArrowRight
          size={14}
          weight="bold"
          className={isRTL ? 'rotate-180' : ''}
          aria-hidden="true"
        />
      </Link>

    </div>
  )
}

// ─── Full-bleed spread (odd index) ────────────────────────────────────────────

function FullBleedSpread({
  project, language, isRTL, shouldReduce,
}: {
  project:      ProjectSpread
  language:     'en' | 'ar'
  isRTL:        boolean
  shouldReduce: boolean
}) {
  const title     = language === 'en' ? project.title.en    : project.title.ar
  const location  = language === 'en' ? project.location.en : project.location.ar
  const viewLabel = language === 'en' ? 'View Project'      : 'عرض المشروع'

  return (
    <>
      {/* ── Desktop: full-bleed image + floating card ───────────────── */}
      <div className="relative hidden md:flex min-h-screen">
        <ParallaxImage src={project.image} alt={title} />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.3) 45%, rgba(26,26,26,0.05) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Floating card — bottom corner */}
        <motion.div
          className={cn(
            'absolute bottom-12 z-10',
            isRTL ? 'right-8 md:right-16' : 'left-8 md:left-16',
          )}
          initial={shouldReduce ? {} : { y: 32, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22, delay: 0.2 }}
        >
          <div
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 max-w-sm"
            style={{ borderRadius: 8 }}
          >
            <h3 className={cn(
              'font-cairo font-bold text-white text-xl mb-2',
              isRTL ? 'text-right' : 'text-left',
            )}>
              {title}
            </h3>

            <div className={cn(
              'flex items-center gap-2 text-white/70 text-xs mb-4',
              isRTL && 'flex-row-reverse',
            )}>
              <MapPin size={12} aria-hidden="true" />
              <span>{location}</span>
              <span aria-hidden="true">·</span>
              <span dir="ltr">{project.year}</span>
            </div>

            <div className={cn('flex flex-wrap gap-2 mb-5', isRTL && 'justify-end')}>
              {project.materials.map((m, i) => (
                <MaterialChip
                  key={i}
                  label={language === 'en' ? m.en : m.ar}
                  dark={true}
                />
              ))}
            </div>

            <Link
              href={project.href}
              className={cn(
                'inline-flex items-center gap-2 text-xs font-bold text-white',
                'border-b border-white/50 pb-0.5 hover:border-white transition-colors duration-150',
                isRTL && 'flex-row-reverse',
              )}
            >
              <span>{viewLabel}</span>
              <ArrowRight
                size={12}
                weight="bold"
                className={isRTL ? 'rotate-180' : ''}
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile: stacked — image top, content below ──────────────── */}
      <div className="md:hidden flex flex-col">
        {/* Image — fixed height, no parallax */}
        <div className="relative w-full" style={{ height: '55vw', minHeight: 220 }}>
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Gradient at bottom */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(245,244,240,1) 0%, transparent 40%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Content — inline block below image */}
        <div className="bg-off-white">
          <ProjectContentBlock
            project={project}
            language={language}
            isRTL={isRTL}
            compact={true}
          />
        </div>
      </div>
    </>
  )
}

// ─── Split spread (even index) ────────────────────────────────────────────────

function SplitSpread({
  project, language, isRTL, shouldReduce, index,
}: {
  project:      ProjectSpread
  language:     'en' | 'ar'
  isRTL:        boolean
  shouldReduce: boolean
  index:        number
}) {
  const title = language === 'en' ? project.title.en : project.title.ar

  return (
    <>
      {/* ── Desktop: text 45% | image 55% ──────────────────────────── */}
      <div
        className={cn(
          'hidden md:flex min-h-screen',
          isRTL ? 'flex-row-reverse' : 'flex-row',
        )}
      >
        {/* Text */}
        <motion.div
          className={cn(
            'w-[45%] shrink-0 flex flex-col justify-center',
            index % 4 === 0 ? 'bg-off-white' : 'bg-white',
          )}
          initial={shouldReduce ? {} : { opacity: 0, x: isRTL ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <ProjectContentBlock
            project={project}
            language={language}
            isRTL={isRTL}
            compact={false}
          />
        </motion.div>

        {/* Image */}
        <div className="relative flex-1 overflow-hidden">
          <ParallaxImage src={project.image} alt={title} />
        </div>
      </div>

      {/* ── Mobile: stacked — image top, content below ──────────────── */}
      <div className="md:hidden flex flex-col">
        <div className="relative w-full" style={{ height: '55vw', minHeight: 220 }}>
          <Image
            src={project.image}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(255,255,255,1) 0%, transparent 40%)',
            }}
            aria-hidden="true"
          />
        </div>
        <div className="bg-white">
          <ProjectContentBlock
            project={project}
            language={language}
            isRTL={isRTL}
            compact={true}
          />
        </div>
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface Props {
  projects: ProjectSpread[]
  type:     'villa' | 'building'
}

export default function ProjectTypePageClient({ projects, type }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()
  const [activeId, setActiveId] = useState<string>(projects[0]?.id ?? '')
  const panelRefs = useRef<Map<string, HTMLElement>>(new Map())

  const setRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) panelRefs.current.set(id, el)
    else panelRefs.current.delete(id)
  }, [])

  function scrollToPanel(id: string) {
    const el = panelRefs.current.get(id)
    if (!el) return
    // 56px header + 48px sub-nav
    const top = el.getBoundingClientRect().top + window.scrollY - 104
    window.scrollTo({ top, behavior: 'smooth' })
  }

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    panelRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.35 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [projects])

  const typeLabel = language === 'en'
    ? (type === 'villa' ? 'Villa Projects'    : 'Building Projects')
    : (type === 'villa' ? 'مشاريع الفلل'      : 'مشاريع المباني')

  const subNavLabel = language === 'en' ? 'Projects' : 'المشاريع'

  return (
    <main>

      {/* ── Sticky sub-nav ─────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-30 bg-white border-b border-border-light"
        dir={isRTL ? 'rtl' : 'ltr'}
        role="navigation"
        aria-label={subNavLabel}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">

            {/* Type label */}
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-text-muted px-2 py-2 border-r border-border-light mr-2">
              {typeLabel}
            </span>

            {/* Project pills */}
            {projects.map((project) => {
              const isActive = activeId === project.id
              const title    = language === 'en' ? project.title.en : project.title.ar
              return (
                <button
                  key={project.id}
                  onClick={() => scrollToPanel(project.id)}
                  className={cn(
                    'relative shrink-0 px-4 py-2 min-h-[44px] text-sm font-semibold',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red',
                    isActive ? 'text-brand-red' : 'text-text-muted hover:text-text-body',
                  )}
                  style={{ borderRadius: 4 }}
                >
                  {title}
                  {isActive && (
                    <motion.span
                      layoutId="project-subnav-indicator"
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

      {/* ── Project spreads ─────────────────────────────────────────── */}
      {projects.map((project, i) => (
        <div
          key={project.id}
          id={project.id}
          ref={(el) => setRef(project.id, el)}
        >
          {i % 2 === 0 ? (
            <FullBleedSpread
              project={project}
              language={language}
              isRTL={isRTL}
              shouldReduce={shouldReduce ?? false}
            />
          ) : (
            <SplitSpread
              project={project}
              language={language}
              isRTL={isRTL}
              shouldReduce={shouldReduce ?? false}
              index={i}
            />
          )}
        </div>
      ))}

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <ProductDetailCTA />

    </main>
  )
}
