'use client'

/**
 * components/products/MaterialWhyUs.tsx
 *
 * 3-column icon grid — material-specific advantages.
 * Scroll-triggered stagger: each card fades up with 0.1s delay.
 * Background: off-white to contrast with the dark CTA above it.
 */

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { staggerContainer, fadeUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/cn'
import type { MaterialContent } from '@/lib/data/materialContent'

interface Props {
  items: MaterialContent['whyEmaar']
}

export default function MaterialWhyUs({ items }: Props) {
  const { language, isRTL } = useLanguage()
  const shouldReduce        = useReducedMotion()

  const eyebrow = language === 'en' ? 'Why Emaar'           : 'لماذا إعمار'
  const heading = language === 'en' ? 'The Emaar Difference' : 'ميزة إعمار'

  return (
    <section
      className="py-20 bg-off-white"
      aria-labelledby="why-emaar-heading"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-8">

        {/* Section heading */}
        <motion.div
          className={cn('mb-14', isRTL ? 'text-right' : 'text-left')}
          variants={shouldReduce ? undefined : fadeUp}
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-red mb-3">
            {eyebrow}
          </p>
          <h2
            id="why-emaar-heading"
            className="font-cairo font-bold text-text-heading text-3xl md:text-4xl"
          >
            {heading}
          </h2>
        </motion.div>

        {/* 3-column grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={shouldReduce ? undefined : staggerContainer}
          initial={shouldReduce ? undefined : 'hidden'}
          whileInView={shouldReduce ? undefined : 'visible'}
          viewport={shouldReduce ? undefined : viewportOnce}
        >
          {items.map((item, i) => {
            const Icon  = item.icon
            const title = language === 'en' ? item.title.en       : item.title.ar
            const desc  = language === 'en' ? item.description.en : item.description.ar

            return (
              <motion.div
                key={i}
                variants={shouldReduce ? undefined : fadeUp}
                className={cn(
                  'bg-white p-8',
                  isRTL ? 'text-right' : 'text-left',
                )}
                style={{
                  borderRadius: 8,
                  // Warm shadow — never rgba(0,0,0,x)
                  boxShadow: '0 2px 8px rgba(45,41,38,0.06), 0 1px 2px rgba(45,41,38,0.04)',
                  border: '1px solid #E4E2DC',
                }}
              >
                {/* Icon in red circle */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-6',
                    isRTL ? 'mr-auto' : 'ml-0',  // Align to reading start
                  )}
                  aria-hidden="true"
                >
                  <Icon size={22} weight="duotone" className="text-brand-red" />
                </div>

                {/* Title */}
                <h3 className="font-cairo font-bold text-text-heading text-lg mb-3">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text-body leading-relaxed">
                  {desc}
                </p>

              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
