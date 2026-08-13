'use client'

import { motion } from 'framer-motion'
import Container from '@/components/layout/Container'

interface Props {
  title: string
  subtitle: string
  description: string
}

// Hero for the Careers page — no blur orbs, no gradient text per CLAUDE.md
export default function CareersHero({ title, subtitle, description }: Props) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-off-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1
            className="font-extrabold text-ink-heading mb-6"
            style={{ fontSize: 'clamp(2.75rem, 5vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.02em' }}
          >
            {title}
          </h1>
          <p className="text-2xl font-semibold text-ink-heading mb-4">{subtitle}</p>
          <p className="text-lg text-ink-muted max-w-2xl mx-auto">{description}</p>
        </motion.div>
      </Container>
    </section>
  )
}
