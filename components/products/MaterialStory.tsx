'use client'

/**
 * components/products/MaterialStory.tsx
 *
 * Alternating stat + body panels — replaces a wall of text with
 * punchy typographic numbers that communicate faster.
 *
 * Each panel: large red stat left, body paragraph right (flips in RTL).
 * Odd-indexed panels reverse the layout (stat right, body left) for rhythm.
 * Scroll-triggered per panel: slide in from the reading-start side.
 *
 * Background alternates: off-white → white → off-white
 */

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { fadeUp, viewportOnce } from '@/lib/motion'
import type { MaterialContent } from '@/lib/data/materialContent'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Slide in from left or right depending on panel index and RTL
function slideVariant(fromLeft: boolean) {
  return {
    hidden:  { opacity: 0, x: fromLeft ? -40 : 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
  }
}

interface Props {
  panels: MaterialContent['story']
}

export default function MaterialStory({ panels }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  return (
    // Section wraps all panels — no extra padding, each panel has its own
    <section aria-label={language === 'en' ? 'About this material' : 'عن هذه المادة'}>
      {panels.map((panel, i) => {
        // Alternate layout: even = stat left, odd = stat right
        // In RTL the visual order flips automatically via flex-row-reverse
        const statOnLeft = i % 2 === 0
        const bg         = i % 2 === 0 ? 'bg-off-white' : 'bg-white'

        return (
          <div
            key={i}
            className={`${bg} py-20 md:py-28`}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div
              className={`max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-center
                ${statOnLeft ? '' : 'md:flex-row-reverse'}`}
            >

              {/* ── Stat block ─────────────────────────────────────────── */}
              <motion.div
                className="md:w-2/5 shrink-0"
                variants={shouldReduce ? undefined : slideVariant(statOnLeft)}
                initial={shouldReduce ? undefined : 'hidden'}
                whileInView={shouldReduce ? undefined : 'visible'}
                viewport={shouldReduce ? undefined : viewportOnce}
              >
                {/* Large typographic stat — red, display scale */}
                <p
                  className="font-cairo font-bold text-brand-red leading-none mb-4"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
                  aria-hidden="true"   // Decorative — body paragraph carries the meaning
                >
                  {language === 'en' ? panel.stat.en : panel.stat.ar}
                </p>

                {/* One-line context label */}
                <p className="text-base font-semibold text-text-heading leading-snug max-w-xs">
                  {language === 'en' ? panel.label.en : panel.label.ar}
                </p>
              </motion.div>

              {/* ── Body paragraph ─────────────────────────────────────── */}
              <motion.div
                className="md:w-3/5"
                variants={shouldReduce ? undefined : slideVariant(!statOnLeft)}
                initial={shouldReduce ? undefined : 'hidden'}
                whileInView={shouldReduce ? undefined : 'visible'}
                viewport={shouldReduce ? undefined : viewportOnce}
              >
                {/* Decorative red rule above body */}
                <div className="h-0.5 w-10 bg-brand-red mb-6" aria-hidden="true" />

                <p className="text-base md:text-lg text-text-body leading-relaxed">
                  {language === 'en' ? panel.body.en : panel.body.ar}
                </p>
              </motion.div>

            </div>
          </div>
        )
      })}
    </section>
  )
}
