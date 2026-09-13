'use client'

/**
 * components/products/MaterialHero.tsx
 *
 * Cinematic full-viewport hero for material landing pages.
 * Background: Ken Burns slow zoom on a lifestyle image (not a product shot).
 * Text: eyebrow → H1 → subtitle, staggered entrance.
 * Scroll indicator: animated chevron at bottom centre.
 *
 * Animations:
 *   Image: scale 1.0 → 1.08 over 8s on mount (Ken Burns)
 *   Overlay: warm dark gradient, never cold black
 *   Text: staggered fadeUp, 0.15s between each line
 *   Scroll indicator: y bounce loop, 0.8s ease-in-out
 */

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { CaretDown } from '@phosphor-icons/react'
import { useLanguage } from '@/contexts/LanguageContext'
import type { MaterialContent } from '@/lib/data/materialContent'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Stagger container — delays between text lines
const textContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const textItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

interface Props {
  hero: MaterialContent['hero']
}

export default function MaterialHero({ hero }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  return (
    // min-h-[92vh] leaves a sliver of the next section visible — hints to scroll
    <section
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="material-hero-title"
    >

      {/* ── Ken Burns background image ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        // Scale up slowly over 8s — subtle motion that reads as premium
        animate={shouldReduce ? undefined : { scale: 1.08 }}
        transition={{ duration: 8, ease: 'linear' }}
      >
        <Image
          src={hero.image}
          alt=""              // Decorative — aria-labelledby on section handles accessibility
          fill
          priority            // LCP candidate — above the fold
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* ── Warm dark overlay — two-stop gradient ──────────────────────── */}
      {/* rgba(26,26,26) = brand-dark; never rgba(0,0,0) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.5) 50%, rgba(26,26,26,0.2) 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Text content ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-16">
        <motion.div
          variants={shouldReduce ? undefined : textContainer}
          initial={shouldReduce ? undefined : 'hidden'}
          animate={shouldReduce ? undefined : 'visible'}
          // Text aligns to reading-start per language
          className={isRTL ? 'text-right' : 'text-left'}
        >

          {/* Eyebrow — small red uppercase label */}
          <motion.p
            variants={shouldReduce ? undefined : textItem}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red mb-5"
          >
            {language === 'en' ? hero.eyebrow.en : hero.eyebrow.ar}
          </motion.p>

          {/* H1 — large, bold, white */}
          <motion.h1
            id="material-hero-title"
            variants={shouldReduce ? undefined : textItem}
            // clamp: 48px min, 72px fluid, 96px max
            className="font-cairo font-bold text-white leading-none mb-6"
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          >
            {language === 'en' ? hero.title.en : hero.title.ar}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={shouldReduce ? undefined : textItem}
            className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
          >
            {language === 'en' ? hero.subtitle.en : hero.subtitle.ar}
          </motion.p>

        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        // Bounce loop: y oscillates 0 → 8px → 0
        animate={shouldReduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <CaretDown size={28} weight="light" className="text-white/60" />
      </motion.div>

    </section>
  )
}
