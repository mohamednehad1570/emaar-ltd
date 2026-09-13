'use client'

/**
 * components/products/MaterialPageClient.tsx
 *
 * Assembles material page sections.
 * Aluminium → CategoryAccordion variant="cards" (Option A)
 * uPVC + Glass → CategoryAccordion variant="scroll" (Option C)
 * CTA: reuses existing ProductDetailCTA component (consistent with product detail pages).
 */

import React from 'react'
import { MATERIAL_CONTENT } from '@/lib/data/materialContent'
import MaterialHero      from './MaterialHero'
import MaterialStory     from './MaterialStory'
import CategoryAccordion from './CategoryAccordion'
import MaterialWhyUs     from './MaterialWhyUs'
import ProductDetailCTA  from './ProductDetailCTA'
import type { SanityProductTile } from '@/lib/sanity/types'

interface Props {
  material:       'upvc' | 'aluminum' | 'glass'
  sanityProducts: SanityProductTile[]
}

export default function MaterialPageClient({ material }: Props) {
  const content = MATERIAL_CONTENT[material]

  // Aluminium has 8 categories — card drawer variant
  // uPVC (3) and Glass (2) use scroll-snap variant
  const accordionVariant = material === 'aluminum' ? 'cards' : 'scroll'

  return (
    <main>
      {/* 1 — Cinematic hero */}
      <MaterialHero hero={content.hero} />

      {/* 2 — Alternating stat + body panels */}
      <MaterialStory panels={content.story} />

      {/* 3 — Category explorer */}
      <CategoryAccordion
        categories={content.categories}
        material={material}
        variant={accordionVariant}
      />

      {/* 4 — Request Quote CTA (shared component — consistent with product detail pages) */}
      <ProductDetailCTA />

      {/* 5 — Material-specific Why Emaar advantages */}
      <MaterialWhyUs items={content.whyEmaar} />
    </main>
  )
}
