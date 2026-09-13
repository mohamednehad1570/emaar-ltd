'use client'

/**
 * components/products/MaterialCTA.tsx
 *
 * Request Quote section — full-width, dark background.
 * Image bleeds to one side, text + button on the other.
 * Direction: image left + text right in EN; flips to image right + text left in AR.
 *
 * Animations:
 *   Image: subtle scale on scroll entry
 *   Text block: fadeUp on scroll entry
 *   Button: whileHover lift + shadow
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/cn'
import type { MaterialContent } from '@/lib/data/materialContent'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Props {
  cta: MaterialContent['cta']
}

export default function MaterialCTA({ cta }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  const title    = language === 'en' ? cta.title.en    : cta.title.ar
  const subtitle = language === 'en' ? cta.subtitle.en : cta.subtitle.ar
  const button   = language === 'en' ? cta.button.en   : cta.button.ar

  return (
    <section
      // Dark background — brand-dark (#1A1A1A)
      className="bg-brand-dark overflow-hidden"
      aria-labelledby="material-cta-heading"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div
        className={cn(
          'flex flex-col md:flex-row',
          // EN: image left, text right. AR: flex-row-reverse puts image right
          isRTL ? 'md:flex-row-reverse' : '',
        )}
      >

        {/* ── Image — 45% width, bleeds to viewport edge ─────────────── */}
        <motion.div
          className="relative w-full md:w-[45%] aspect-[4/3] md:aspect-auto md:min-h-[480px] shrink-0"
          initial={shouldReduce ? {} : { opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Image
            src={cta.image}
            alt=""             // Decorative — section heading carries the meaning
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          {/* Gradient toward text side for smooth blend */}
          <div
            className="absolute inset-0"
            style={{
              background: isRTL
                ? 'linear-gradient(to right, transparent 60%, rgba(26,26,26,0.6) 100%)'
                : 'linear-gradient(to left, transparent 60%, rgba(26,26,26,0.6) 100%)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Text + button ───────────────────────────────────────────── */}
        <motion.div
          className={cn(
            'flex-1 flex flex-col justify-center px-8 md:px-16 py-16 md:py-20',
            isRTL ? 'text-right' : 'text-left',
          )}
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >

          {/* Red accent rule */}
          <div
            className={cn('h-0.5 w-10 bg-brand-red mb-8', isRTL ? 'mr-0 ml-auto' : '')}
            aria-hidden="true"
          />

          {/* Heading */}
          <h2
            id="material-cta-heading"
            className="font-cairo font-bold text-white text-2xl md:text-3xl lg:text-4xl leading-snug mb-5 max-w-md"
          >
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-white/70 text-base leading-relaxed mb-10 max-w-sm">
            {subtitle}
          </p>

          {/* CTA button — primary red */}
          <motion.div
            whileHover={shouldReduce ? undefined : { y: -2 }}
            whileTap={shouldReduce ? undefined : { y: 0 }}
            transition={{ duration: 0.15 }}
            className="self-start"
            style={{ alignSelf: isRTL ? 'flex-end' : 'flex-start' }}
          >
            <Link
              href="/contact"
              className={cn(
                'inline-flex items-center gap-3 px-8 py-4',
                'bg-brand-red text-white text-sm font-bold',
                'hover:bg-brand-red-dark transition-colors duration-200',
                isRTL && 'flex-row-reverse',
              )}
              style={{ borderRadius: 4 }}
            >
              <span>{button}</span>
              <ArrowRight
                size={16}
                weight="bold"
                className={isRTL ? 'rotate-180' : ''}
                aria-hidden="true"
              />
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
