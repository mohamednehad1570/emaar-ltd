'use client'

import { motion } from 'framer-motion'
import { resolveIcon } from '@/lib/iconMap'
import { fadeUp, viewportOnce } from '@/lib/motion'
import Container from '@/components/layout/Container'

interface CultureValue { icon: string; title: string; description: string }
interface CultureStat  { number: string; label: string }

interface Props {
  title: string
  subtitle: string
  values: CultureValue[]
  stats: CultureStat[]
}

// Culture values grid and stats strip for the Careers page
export default function CareersCulture({ title, subtitle, values, stats }: Props) {
  return (
    <section className="py-24 bg-surface-white">
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <h2
            className="font-bold text-ink-heading mb-4"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.01em' }}
          >
            {title}
          </h2>
          <p className="text-lg text-ink-muted max-w-3xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value, idx) => {
            const Icon = resolveIcon(value.icon)
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-off-white p-8 border-2 border-transparent hover:border-silver-flat transition-all"
              >
                <div className="w-14 h-14 bg-brand-red/10 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-brand-red" />
                </div>
                <h3 className="text-xl font-bold text-ink-heading mb-2">{value.title}</h3>
                <p className="text-ink-muted">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats strip — solid brand-red numbers, no gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                className="font-extrabold text-brand-red mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {stat.number}
              </div>
              <div className="text-ink-muted font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
